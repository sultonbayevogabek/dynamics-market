import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'oauth-callback',
  templateUrl: './oauth-callback.component.html',
  styleUrls: [ './oauth-callback.component.scss' ]
})

export class OAuthCallbackComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    await this.authWithGoogle();
  }

  async authWithGoogle(): Promise<void> {
    if (!this.idToken) {
      this.onAuthFailed();
      return;
    }

    const response = await firstValueFrom(this.authService.authWithGoogle(this.idToken));
    if (!response || !response.token) {
      this.onAuthFailed();
    }

    this.onAuthSucceed(response.token);
  }

  onAuthFailed() {
    window.opener.receiveData({
      success: false
    });
    window.close();
  }

  onAuthSucceed(token: string) {
    window.opener.receiveData({
      success: true,
      token
    });
    window.close();
  }

  get idToken(): string | null {
    const fragment = this.activatedRoute.snapshot.fragment;

    if (!fragment) {
      return null;
    }

    const match = fragment.match(/id_token=([^&]+)/);
    return match ? match[1] : null;
  }
}
