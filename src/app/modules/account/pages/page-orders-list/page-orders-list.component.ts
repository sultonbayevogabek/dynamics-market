import { Component, OnInit } from '@angular/core';
import { IOrder } from '@shared/interfaces/order';
import { OrdersService } from '@shared/services/orders.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-page-orders-list',
  templateUrl: './page-orders-list.component.html'
})

export class PageOrdersListComponent implements OnInit {
  params = {
    page: 1,
    limit: 3,
    pages: 1
  };
  orders: IOrder[] = [];
  loading = true;

  constructor(
    private order: OrdersService
  ) {
  }

  async ngOnInit() {
    await this.getOrdersList();
  }

  async getOrdersList(page?: number) {
    if (page) {
      this.params.page = page;
    }
    const response = await firstValueFrom(
      this.order.getList(this.params)
    );
    this.loading = false;
    this.params.pages = response?.pages;
    this.orders = response?.data;
  }
}
