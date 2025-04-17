import { Injectable } from '@angular/core';
import { IProductsFilter } from '@shared/interfaces/filter';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, distinctUntilChanged, Observable, tap } from 'rxjs';
import { Product } from '@shared/interfaces/product';
import { RequestService } from '@shared/services/request.service';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  filter: IProductsFilter = {};
  products$ = new BehaviorSubject<Product[]>([]);
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private requestService: RequestService
  ) {
  }

  watchQueryParams() {
    this.activatedRoute.queryParams.pipe(distinctUntilChanged()).subscribe(params => {
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

      if (params && ['cheaper', 'more-expensive', 'high-rating'].includes(params['sort'])) {
        this.filter.sort = params['sort'];
      } else {
        this.filter.sort = 'high-rating';
      }

      this.getProducts();
    })
  }

  getProducts() {
    this.loading$.next(true);
    this.requestService.request('product/list', this.filter)
      .pipe(
        tap(res => {
          this.loading$.next(false);
          this.products$.next([]);
        })
      )
      .subscribe()
  }
}
