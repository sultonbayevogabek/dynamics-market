import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/user';
import { TranslateService } from '@ngx-translate/core';
import { ToasterService } from './toaster.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser$: Observable<IUser | null> = new BehaviorSubject(null);
  private _authorized = false;

  constructor(
    private toaster: ToasterService,
    private http: HttpClient,
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // @ts-ignore
    window.receiveData = this.receiveData.bind(this);
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

  openOAuthWindow() {
    if (isPlatformBrowser(this.platformId)) {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      let windowWidth: number, windowHeight: number;

      if (screenWidth <= 768) {
        windowWidth = screenWidth;
        windowHeight = screenHeight;
      } else if (screenWidth <= 1024) {
        windowWidth = screenWidth * 0.8;
        windowHeight = screenHeight * 0.8;
      } else {
        windowWidth = screenWidth * 0.6;
        windowHeight = screenHeight * 0.6;
      }

      const left = (screenWidth - windowWidth) / 2;
      const top = (screenHeight - windowHeight) / 2;

      const oauthWindow = window.open(
        `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ environment.clientId }&redirect_uri=${ environment.redirectUri }&${ environment.authUrlParams }`,
        '_blank',
        `width=${ windowWidth },height=${ windowHeight },top=${ top },left=${ left }`
      );
    }
  }

  authWithGoogle(idToken: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(environment.host + `auth/google`, { id_token: idToken });
  }

  async receiveData(data: { success: boolean; token: string }) {
    if (!data.success) {
      await this.toaster.warning('an.authorization.error.occurred');
      return;
    }
    this.getUserWithToken(data.token);
  }

  getUserWithToken(idToken: string) {
    console.log(idToken);
  }
}
