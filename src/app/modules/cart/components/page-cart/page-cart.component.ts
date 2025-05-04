import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { ICartItem } from '@shared/interfaces/cart';
import { firstValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RootService } from '@shared/services/root.service';
import { AuthService } from '@shared/services/auth.service';
import { IUser } from '@shared/interfaces/user.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './page-cart.component.html'
})
export class PageCartComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  removedItems: any[] = [];
  items: ICartItem[] = [];
  updating = false;
  loading = true;

  constructor(
    public root: RootService,
    public cart: CartService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async user => {
        await this.getCartList(user);
      })
  }

  async getCartList(user: IUser | null) {
    if (!user) {
      this.loading = false;
      return;
    }

    this.items = await firstValueFrom(
      this.cart.getList()
    )

    this.loading = false;
  }

  remove(item: any): void {
    if (this.removedItems.includes(item)) {
      return;
    }
  }

  update(): void {
    this.updating = true;
  }

  needUpdate(): boolean {
    let needUpdate = false;

    return needUpdate;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
