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
  templateUrl: './widget-filters.component.html'
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
        this.flattenCategories(categories);
        this.setCategoryFromQuery(categories);
      });
  }

  get filter(): IProductsFilter {
    return this.productsService.filter;
  }

  reset(): void {

  }

  setCategoryFromQuery(categories: ICategory[]) {
    this.activatedRoute.queryParams.subscribe(params => {
      const categorySlug = params['category'];

      if (!categorySlug) {
        return;
      }

      this.filter.category = categorySlug;

      for (const categoryId in this.flattenedCategories) {
        const category = this.flattenedCategories[categoryId];

        if (category.children?.length) {
          category.showChildren = false;
          category.hidden = false;
        }

        if (category.slug === categorySlug) {
          this.categoryId = categoryId;
        }
      }

      if (this.categoryId) {
        this.showCategoriesByQuery(this.categoryId);
      }
    });
  }

  flattenCategories(categories: ICategory[]) {
    categories.forEach(category => {
      this.flattenedCategories[category._id] = category;

      if (category?.children?.length) {
        this.flattenCategories(category.children);
      }
    });
  }

  showCategoriesByQuery(categoryId: string) {
    const selectedCategory = this.flattenedCategories[categoryId];

    let mainCategory: ICategory;
    let middleCategory: ICategory;
    let subCategory: ICategory;
    let level: 'main' | 'middle' | 'sub' = 'sub';

    if (!selectedCategory.parentId) {
      level = 'main';
    }

    if (selectedCategory.parentId && selectedCategory.children?.length) {
      level = 'middle';
    }

    if (selectedCategory.parentId && !selectedCategory?.children?.length) {
      level = 'sub';
    }

    if (level === 'sub') {
      subCategory = selectedCategory;
      middleCategory = this.flattenedCategories[subCategory.parentId!];
      mainCategory = this.flattenedCategories[middleCategory.parentId!];
    }

    if (level === 'middle') {
      middleCategory = selectedCategory;
      mainCategory = this.flattenedCategories[middleCategory.parentId!];
    }

    if (level === 'main') {
      mainCategory = selectedCategory;
    }

    if (mainCategory!) {
      this.drawCategoriesHierarchy(mainCategory, 'main');
    }

    if (middleCategory!) {
      this.drawCategoriesHierarchy(middleCategory, 'middle');
    }

    if (subCategory!) {
      this.drawCategoriesHierarchy(subCategory, 'sub');
    }
  }

  async selectCategory(category: ICategory, level: 'main' | 'middle' | 'sub') {
    this.filter.category = category.slug;
    this.drawCategoriesHierarchy(category, level);
    await this.productsService.setQueryToParams();
  }

  drawCategoriesHierarchy(category: ICategory, level: 'main' | 'middle' | 'sub') {
    category.showChildren = !category?.showChildren;

    if (level === 'main') {
      this.categories.main.forEach(c => {
        if (c._id !== category._id) {
          c.hidden = category.showChildren;
        }
      });

      if (category.showChildren) {
        this.categories.middle = category.children;
        this.categories.middle.forEach(c => {
          c.hidden = false;
          c.showChildren = false;
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
        this.categories.sub = category.children;
        this.categories.sub.forEach(c => {
          c.hidden = false;
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
