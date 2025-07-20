import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductsSidebarService } from '../../services/products-sidebar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ProductsService } from '@shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '@shared/interfaces/product';
import { takeUntil } from 'rxjs/operators';

export type Layout = 'grid' | 'grid-with-features' | 'list';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html'
})

export class ProductsViewComponent implements OnInit, OnDestroy {
  @Input() layout: Layout = 'grid-with-features';
  @Input() grid: 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' = 'grid-3-sidebar';
  @Input() offcanvas: 'always' | 'mobile' = 'mobile';
  products: {
    data: IProduct[];
    pages: number;
    total: number;
  } = {
    data: [],
    pages: 0,
    total: 0,
  }

  destroy$: Subject<void> = new Subject<void>();

  loaded = false;
  filterForm!: FormGroup;
  isQueryUpdatingFromCode = false;
  filtersCount = 0;

  constructor(
    private fb: FormBuilder,
    public sidebar: ProductsSidebarService,
    public productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      page: this.fb.control(1),
      limit: this.fb.control(12),
      sort: this.fb.control('high-rating')
    });

    this.setValueFromQueryToForm();

    this.productsService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        if (products) {
          this.loaded = true;
          this.products = products;
        }
      })
  }

  async filter(pagination = false) {
    if (!pagination) {
      this.filterForm.get('page')?.setValue(1);
    }
    this.isQueryUpdatingFromCode = true;
    await this.router.navigate(
      [],
      {
        queryParams: this.filterForm.value,
        queryParamsHandling: 'merge',
        relativeTo: this.activatedRoute
      }
    );
    this.isQueryUpdatingFromCode = false;
  }

  async resetFilter() {
    await this.router.navigate(['/products']);
  }

  setValueFromQueryToForm() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      if (this.isQueryUpdatingFromCode) return;

      const params = {
        sort: 'high-rating',
        limit: 12,
        page: 1
      }

      if (queryParams['sort'] && [ 'high-rating', 'cheaper', 'more-expensive' ].includes(queryParams['sort'])) {
        params.sort = queryParams['sort'];
      }

      if (queryParams['limit'] && [ 12, 24, 36, 48 ].includes(+queryParams['limit'])) {
        params.limit = +queryParams['limit'];
      }

      if (queryParams['page']) {
        params.page = +queryParams['page'];
      }

      this.filterForm.setValue(params);
    })
  }

  setLayout(value: Layout): void {
    this.layout = value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
