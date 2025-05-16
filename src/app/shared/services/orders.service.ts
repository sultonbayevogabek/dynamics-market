import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RequestService } from '@shared/services/request.service';
import { IOrder, IOrderDetails } from '@shared/interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(
    @Inject(PLATFORM_ID)
    private platformId: any,
    private requestService: RequestService
  ) {
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  create(payload: { [key: string]: string }) {
    return this.requestService.request<{ statusCode: number, orderCode: number }>('order/create', payload);
  }

  getList(params: { page?: number; limit?: number }) {
    return this.requestService.request<{ data: IOrder[]; total: number; pages: number }>('order/list', params);
  }

  remove(_id: string) {
    return this.requestService.request<{ statusCode: number }>('cart/delete', { _id });
  }

  updateCartItem(payload: { _id: string; quantity: number }) {
    return this.requestService.request<{ statusCode: number }>('cart/update', payload);
  }

  getOrderDetails(orderCode: string) {
    return this.requestService.request<IOrderDetails>('order/get-order', { orderCode });
  }
}
