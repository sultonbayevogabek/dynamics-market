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

  getList() {
    return this.requestService.request<ICartItem[]>('cart/list');
  }
}
