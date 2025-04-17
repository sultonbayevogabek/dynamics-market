import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsSidebarService } from '../../services/products-sidebar.service';
import { Link } from '@shared/interfaces/link';
import { RootService } from '@shared/services/root.service';
import { Subject } from 'rxjs';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-grid',
  templateUrl: './page-category.component.html',
  providers: [
    { provide: ProductsSidebarService, useClass: ProductsSidebarService }
  ]
})
export class PageCategoryComponent implements OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  columns: 3 | 4 | 5 = 3;
  viewMode: 'grid' | 'grid-with-features' | 'list' = 'grid';
  sidebarPosition: 'start' | 'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"
  breadcrumbs: Link[] = [];
  pageHeader = '';

  constructor(
    private root: RootService,
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) {
    this.route.data.subscribe(data => {
      this.breadcrumbs = [
        { label: 'Home', url: this.root.home() },
        { label: 'Shop', url: this.root.shop() }
      ];

      this.columns = 'columns' in data ? data['columns'] : this.columns;
      this.viewMode = 'viewMode' in data ? data['viewMode'] : this.viewMode;
      this.sidebarPosition = 'sidebarPosition' in data ? data['sidebarPosition'] : this.sidebarPosition;
    });

    this.productsService.watchQueryParams();
  }

  getProductsViewLayout(): 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full' {
    return 'grid-' + this.columns + '-full' as 'grid-3-sidebar' | 'grid-4-full' | 'grid-5-full';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
