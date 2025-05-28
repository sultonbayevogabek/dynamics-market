import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { ICartItem } from '@shared/interfaces/cart';
import { firstValueFrom, Subject } from 'rxjs';
import { ToasterService } from '@shared/services/toaster.service';

@Component({
  selector: 'app-cart',
  templateUrl: './page-cart.component.html'
})

export class PageCartComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  items: ICartItem[] = [];
  updating = false;
  loading = true;
  params = {
    page: 1,
    limit: 3,
    pages: 1
  };

  constructor(
    public cart: CartService,
    private toaster: ToasterService
  ) {
  }

  async ngOnInit() {
    await this.getCartList();
  }

  async getCartList() {
    const response = await firstValueFrom(
      this.cart.getList(this.params)
    );

    this.items = response?.data;
    this.params.pages = response?.pages;

    this.loading = false;
  }

  async remove(item: ICartItem) {
    if (item.removing) {
      return;
    }

    item.removing = true;

    const response = await firstValueFrom(
      this.cart.remove(item?._id)
    );

    if (response.statusCode === 200) {
      await this.toaster.success('the.product.has.been.successfully.removed.from.the.cart');
      this.params.page = 1;
      await this.getCartList();
    } else {
      item.removing = false;
    }
  }

  update(): void {
    this.updating = true;
  }

  async updateCount(item: ICartItem) {
    if (item.updating) {
      return;
    }

    item.updating = true;
    const response = await firstValueFrom(
      this.cart.updateCartItem({
        _id: item._id,
        quantity: item.quantity
      })
    )

    item.updating = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
