import { Injectable } from '@angular/core';
import { IProductsFilter } from '@shared/interfaces/filter';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  filter: IProductsFilter = {};

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  async setQueryToParams() {
    console.log('Filter ====>', this.filter);
    await this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.filter,
      queryParamsHandling: 'merge'
    });
  }
}
