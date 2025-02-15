import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { ToasterService } from './toaster.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser$ = new BehaviorSubject<IUser | null>(null);
  private _authorized = false;

  constructor(
    private toaster: ToasterService,
    private http: HttpClient,
    private router: Router
  ) {
    (window as any).receiveData = this.receiveData.bind(this);
  }

  set token(token: string) {
    if (!token) return;
    localStorage.setItem('token', token);
  }

  get token(): string {
    return localStorage.getItem('token') ?? '';
  }

  set authorized(auth: boolean) {
    this._authorized = auth;
  }

  get authorized(): boolean {
    return this._authorized;
  }

  openOAuthWindow(): void {
    const { width, height, left, top } = this.calculateWindowDimensions();

    window.open(
      this.buildOAuthUrl(),
      '_blank',
      `width=${width},height=${height},top=${top},left=${left}`
    );
  }

  private calculateWindowDimensions() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    let width: number, height: number;

    if (screenWidth < 768) {
      width = screenWidth;
      height = screenHeight;
    } else if (screenWidth < 1024) {
      width = screenWidth * 0.7;
      height = screenHeight * 0.7;
    } else {
      width = 840;
      height = 500;
    }

    return {
      width,
      height,
      left: (screenWidth - width) / 2,
      top: (screenHeight - height) / 2
    };
  }

  private buildOAuthUrl(): string {
    const params = new URLSearchParams(environment.googleAuthParams);

    return `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  }

  authWithGoogle(idToken: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(environment.host + `auth/google`, { idToken });
  }

  async receiveData(data: { success: boolean; token: string }) {
    if (!data?.success) {
      await this.toaster.warning('an.authorization.error.occurred');
      return;
    }

    this.token = data.token;
    this.getUserWithToken().subscribe();
  }

  getUserWithToken(): Observable<IUser | unknown> {
    if (this.authorized) {
      return of(this.currentUser$);
    }

    return this.http.post<IUser>(environment.host + 'user/get-user-by-token', {}).pipe(
      switchMap(user => {
        this.authorized = true;
        this.currentUser$.next(user);
        return of(user);
      }),
      catchError(() => {
        this.authorized = false;
        this.currentUser$.next(null);
        return of(null);
      })
    );
  }

  isAuthorized(): Observable<boolean> {
    if (!this.token) {
      return of(false);
    }

    return this.getUserWithToken().pipe(
      map(currentUser => {
        return !!currentUser;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authorized = false;
    this.currentUser$.next(null);
    this.router.navigate(['/']);
  }
}
