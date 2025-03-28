import { Injectable } from '@angular/core';
import { IProductsFilter } from '@shared/interfaces/filter';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  filter: IProductsFilter = {};

  constructor(
    private router: Router,
  ) {
  }

  async setQueryToParams() {
    await this.router.navigate(['/products'], {
      queryParams: this.filter,
      queryParamsHandling: 'merge'
    });
  }
}
