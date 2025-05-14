import { Component, OnInit } from '@angular/core';
import { OrdersService } from '@shared/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { IOrderDetails } from '@shared/interfaces/order';

@Component({
  selector: 'app-page-order-details',
  templateUrl: './page-order-details.component.html'
})

export class PageOrderDetailsComponent implements OnInit {
  loading = true;
  orderDetails!: IOrderDetails
  constructor(
    private order: OrdersService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    await this.getOrderDetails();
  }

  async getOrderDetails() {
    const orderCode: string = this.activatedRoute.snapshot.params['orderCode'];

    this.orderDetails = await firstValueFrom(
      this.order.getOrderDetails(orderCode)
    );

    this.loading = false;
  }
}
