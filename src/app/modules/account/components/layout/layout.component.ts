import { Component } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})

export class LayoutComponent {
  constructor(
    private _authService: AuthService,
  ) {
  }

  links: { label: string; url: string }[] = [
    { label: 'edit.profile', url: './profile' },
    { label: 'orders.history', url: './orders' },
    { label: 'order.details', url: './orders/5' },
    { label: 'logout', url: '' }
  ];

  clickNavigation(link: { label: string; url: string }) {
    if (!link.url) {
      this._authService.logout();
    }
  }
}
