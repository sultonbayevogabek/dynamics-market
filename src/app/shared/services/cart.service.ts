import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ICartItem } from '../interfaces/cart';
import { isPlatformBrowser } from '@angular/common';
import { RequestService } from '@shared/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(
    @Inject(PLATFORM_ID)
    private platformId: any,
    private requestService: RequestService
  ) {
    if (isPlatformBrowser(this.platformId)) {
    }
  }

  add(productId: string, quantity?: number) {
    return this.requestService.request<{ statusCode: number }>('cart/add', {
      productId,
      quantity
    });
  }

  getList(params: { page?: number; limit?: number }) {
    return this.requestService.request<{ data: ICartItem[]; total: number; pages: number }>('cart/list', params);
  }

  remove(_id: string) {
    return this.requestService.request<{ statusCode: number }>('cart/delete', { _id });
  }

  updateCartItem(payload: { _id: string; quantity: number }) {
    return this.requestService.request<{ statusCode: number }>('cart/update', payload);
  }
}
