import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { ToasterService } from './toaster.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser$ = new BehaviorSubject<IUser | null>(null);
  private _authorized = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private toaster: ToasterService,
    private http: HttpClient,
    private router: Router
  ) {
    if (isPlatformBrowser(this.platformId)) {
      (window as any).receiveData = this.receiveData.bind(this);
    }
  }

  set token(token: string) {
    if (!token) return;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  get token(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') ?? '';
    }
    return '';
  }

  set authorized(auth: boolean) {
    this._authorized = auth;
  }

  get authorized(): boolean {
    return this._authorized;
  }

  openOAuthWindow(): void {
    const dimensions = this.getOAuthWindowDimensions();
    const oauthUrl = this.getOAuthUrl();

    window.open(
      oauthUrl,
      '_blank',
      this.formatWindowOptions(dimensions)
    );
  }

  private getOAuthWindowDimensions(): { width: number; height: number; left: number; top: number } {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const dimensions = {
      width: 840,
      height: 500
    };

    if (screenWidth < 768) {
      dimensions.width = screenWidth;
      dimensions.height = screenHeight;
    } else if (screenWidth < 1024) {
      dimensions.width = screenWidth * 0.7;
      dimensions.height = screenHeight * 0.7;
    }

    return {
      ...dimensions,
      left: (screenWidth - dimensions.width) / 2,
      top: (screenHeight - dimensions.height) / 2
    };
  }

  private getOAuthUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return `https://accounts.google.com/o/oauth2/v2/auth?${ new URLSearchParams({
        ...environment.googleAuthParams,
        redirect_uri: window.location.origin + '/oauth-callback'
      }) }`;
    }
    return '';
  }

  private formatWindowOptions(dimensions: { width: number; height: number; left: number; top: number }): string {
    return Object.entries(dimensions)
      .map(([ key, value ]) => `${ key }=${ Math.round(value) }`)
      .join(',');
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
      return of(this.currentUser$.value);
    }

    if (!this.token) {
      this.authorized = false;
      this.currentUser$.next(null);
      return of(null);
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
    return !this.token ? of(false) : this.getUserWithToken().pipe(
      map(Boolean)
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.authorized = false;
    this.currentUser$.next(null);
    this.router.navigate([ '/' ]);
  }
}
