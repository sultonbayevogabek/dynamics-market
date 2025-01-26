import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: [ './account-menu.component.scss' ]
})
export class AccountMenuComponent implements OnInit {
  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
  }

  openAuthWindow() {
    this.authService.openOAuthWindow();
  }
}


