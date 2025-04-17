import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductsSidebarService } from '../../services/products-sidebar.service';
import { PageCategoryService } from '../../services/page-category.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProductsList } from '@shared/interfaces/list';
import { ProductsService } from '@shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

export type Layout = 'grid' | 'grid-with-features' | 'list';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html'
})

export class ProductsViewComponent implements OnInit, OnDestroy {
  @Input() layout: Layout = 'grid';
  @Input() grid: 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' = 'grid-3-sidebar';
  @Input() offcanvas: 'always' | 'mobile' = 'mobile';

  destroy$: Subject<void> = new Subject<void>();

  filterForm!: FormGroup;
  isQueryUpdatingFromCode = false;
  filtersCount = 0;

  constructor(
    private fb: FormBuilder,
    public sidebar: ProductsSidebarService,
    public pageService: PageCategoryService,
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

    this.pageService.list$.pipe(
      filter((x): x is ProductsList => x !== null),
      takeUntil(this.destroy$)
    ).subscribe(
      ({ page, limit, sort, filterValues }) => {
        this.filtersCount = Object.keys(filterValues).length;
      }
    );
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

  resetFilters(): void {
    this.pageService.updateOptions({ filterValues: {} });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
