import { Component } from '@angular/core';
import { Order } from '@shared/interfaces/order';
import { orders } from '../../../../../data/account-orders';

@Component({
  selector: 'app-page-orders-list',
  templateUrl: './page-orders-list.component.html'
})

export class PageOrdersListComponent {
  orders: Partial<Order>[] = orders;

  constructor() {
  }
}
