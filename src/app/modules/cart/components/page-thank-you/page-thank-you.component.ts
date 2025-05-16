import { Component } from '@angular/core';
import { IOrderDetails } from '@shared/interfaces/order';
import { OrdersService } from '@shared/services/orders.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-page-thank-you',
  templateUrl: './page-thank-you.component.html',
})

export class PageThankYouComponent {
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
