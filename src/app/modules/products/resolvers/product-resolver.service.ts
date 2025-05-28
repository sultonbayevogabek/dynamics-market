import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { IProduct } from '@shared/interfaces/product';
import { ProductsService } from '@shared/services/products.service';

@Injectable({
  providedIn: 'root'
})

export class ProductResolverService implements Resolve<IProduct> {
  constructor(
    private productsService: ProductsService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<IProduct> {
    const productSlug = route.params['productSlug'] || route.data['productSlug'];
    return await this.productsService.getProduct(productSlug);
  }
}
