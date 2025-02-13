import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { IUser } from '@shared/interfaces/user.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: [ './account-menu.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountMenuComponent implements OnInit, OnDestroy {
  @Output() closeMenu: EventEmitter<void> = new EventEmitter<void>();
  currentUser!: IUser | null;
  loading = true;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  openAuthWindow() {
    this.authService.openOAuthWindow();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


