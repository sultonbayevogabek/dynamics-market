import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser$: Subject<IUser | null> = new Subject();
  private _authorized = false;

  constructor(
    private toaster: ToasterService,
    private http: HttpClient
  ) {
    // @ts-ignore
    window.receiveData = this.receiveData.bind(this);
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

  openOAuthWindow() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    let windowWidth: number, windowHeight: number;

    if (screenWidth < 768) {
      windowWidth = screenWidth;
      windowHeight = screenHeight;
    } else if (screenWidth >= 768 && screenWidth < 1024) {
      windowWidth = screenWidth * 0.7;
      windowHeight = screenHeight * 0.7;
    } else {
      windowWidth = 840;
      windowHeight = 500;
    }

    const left = (screenWidth - windowWidth) / 2;
    const top = (screenHeight - windowHeight) / 2;

    const oauthWindow = window.open(
      `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ environment.clientId }&redirect_uri=${ environment.redirectUri }&${ environment.authUrlParams }`,
      '_blank',
      `width=${ windowWidth },height=${ windowHeight },top=${ top },left=${ left }`
    );
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
    await this.getUserWithToken();
  }

  async getUserWithToken() {
    if (!this.token) {
      return;
    }

    const response = (await firstValueFrom(
      this.http.post(environment.host + 'user/get-user-by-token', {})
    )) as IUser;

    this.authorized = true;
    this.currentUser$.next(response);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authorized = false;
    this.currentUser$.next(null);
  }
}
