import { Injectable } from '@angular/core';
import { IProductsFilter } from '@shared/interfaces/filter';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, firstValueFrom, tap } from 'rxjs';
import { IProduct, IProductsListResponse } from '@shared/interfaces/product';
import { RequestService } from '@shared/services/request.service';
import { debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  filter: IProductsFilter = {};
  loading$ = new BehaviorSubject<boolean>(false);
  products$ = new BehaviorSubject<IProductsListResponse | null>(null);

  constructor(
    private requestService: RequestService
  ) {
  }

  watchQueryParams(activatedRoute: ActivatedRoute) {
    activatedRoute.queryParams
      .pipe(
        distinctUntilChanged(),
        debounceTime(300)
      )
      .subscribe(async params => {
        if (params && params['category']) {
          this.filter.category = params['category'];
        } else {
          this.filter.category = null;
        }

        if (params && params['brand']) {
          let brand = params['brand'];

          if (typeof brand === 'string') {
            brand = [ brand ];
          }

          this.filter.brand = brand;
        } else {
          this.filter.brand = [];
        }

        if (params && params['page']) {
          this.filter.page = +params['page'];
        } else {
          this.filter.page = 1;
        }

        if (params && params['limit']) {
          this.filter.limit = +params['limit'];
        } else {
          this.filter.limit = 12;
        }

        if (params && [ 'cheaper', 'more-expensive', 'high-rating' ].includes(params['sort'])) {
          this.filter.sort = params['sort'];
        } else {
          this.filter.sort = 'high-rating';
        }

        await firstValueFrom(this.getProducts());
      });
  }

  getProducts(params = {}) {
    this.loading$.next(true);
    return this.requestService.request<IProductsListResponse>('product/list', {
      ...this.filter,
      brands: this.filter.brand,
      ...params
    })
      .pipe(
        tap(res => {
          this.loading$.next(false);
          this.products$.next(res);
        })
      );
  }

  async getProduct(slug: string): Promise<IProduct> {
    return await firstValueFrom(
      this.requestService.request<IProduct>('product/get-product', { slug })
    );
  }

  async searchProduct(params: { search: string; category?: string }): Promise<{ data: IProduct[]; total: number }> {
    return await firstValueFrom(
      this.requestService.request<{ data: IProduct[]; total: number }>('product/search', params)
    );
  }
}
