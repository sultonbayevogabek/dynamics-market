import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { IUser } from '@shared/interfaces/user.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MobileMenuService } from '@shared/services/mobile-menu.service';

@Component({
  selector: 'app-mobile-auth',
  templateUrl: './mobile-auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MobileAuthComponent implements OnInit, OnDestroy {
  currentUser!: IUser | null;
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthService,
    private mobileMenuService: MobileMenuService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeMobileMenu() {
    this.mobileMenuService.close();
  }

  openAuthWindow() {
    this.authService.openOAuthWindow();
  }
}
