import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DirectionService } from '@shared/services/direction.service';
import { IProductsFilter } from '@shared/interfaces/filter';
import { RootService } from '@shared/services/root.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderService } from '@shared/services/header.service';
import { ICategory } from '@shared/interfaces/category';
import { ProductsService } from '@shared/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-widget-filters',
  templateUrl: './widget-filters.component.html',
  styleUrls: [ './widget-filters.component.scss' ]
})
export class WidgetFiltersComponent implements OnInit, OnDestroy {
  @Input() offcanvas: 'always' | 'mobile' = 'mobile';

  categories: {
    main: ICategory[];
    middle: ICategory[];
    sub: ICategory[];
  } = {
    main: [],
    middle: [],
    sub: []
  };
  flattenedCategories: { [key: string]: ICategory } = {};
  categoryId!: string;

  destroy$: Subject<void> = new Subject<void>();

  isPlatformBrowser = isPlatformBrowser(this.platformId);
  rightToLeft = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private direction: DirectionService,
    public root: RootService,
    private headerService: HeaderService,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.rightToLeft = this.direction.isRTL();
  }

  ngOnInit(): void {
    this.headerService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories.main = categories;
      });
  }

  get filter(): IProductsFilter {
    return this.productsService.filter;
  }

  reset(): void {

  }

  setCategoryFromQuery() {
    const params = this.activatedRoute.snapshot.queryParams;
    const categorySlug = params['category'];
    this.filter.category = categorySlug;

    if (categorySlug) {
      this.transform(this.categoryId);
    }
  }

  flattenCategories(categories: ICategory[]) {
    categories.forEach(category => {
      this.flattenedCategories[category._id] = category;

      if (category?.children?.length > 0) {
        this.flattenCategories(category.children);
      }
    });
  }

  transform(categoryId: string) {
    const category = this.flattenedCategories[categoryId];
    if (category?.children?.length > 0) {
      category.showChildren = true;
    }
    if (category.parentId) {
      this.transform(category.parentId);
    }
  }

  async selectCategory(category: ICategory, level: 'main' | 'middle' | 'sub') {
    this.filter.category = category.slug;

    category.showChildren = !category?.showChildren;

    if (level === 'main') {
      this.categories.main.forEach(c => {
        if (c._id !== category._id) {
          c.hidden = category.showChildren;
        }
      });

      if (category.showChildren) {
        this.categories.middle = category.children.map(c => {
          return {
            ...c,
            hidden: false,
            showChildren: false
          };
        });
      } else {
        this.categories.middle = [];
      }

      this.categories.sub = [];
    }

    if (level === 'middle') {
      this.categories.middle.forEach(c => {
        if (c._id !== category._id) {
          c.hidden = category.showChildren;
        }
      });

      if (category.showChildren) {
        this.categories.sub = category.children.map(c => {
          return {
            ...c,
            hidden: false,
            showChildren: false
          };
        });
      } else {
        this.categories.sub = [];
      }
    }
  }

  async selectAllCategories() {
    this.filter.category = null;
    await this.productsService.setQueryToParams();
  }

  resetCategories(categories: ICategory[]) {
    categories.forEach(c => {
      c.showChildren = false;

      if (c?.children?.length) {
        this.resetCategories(c.children);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
