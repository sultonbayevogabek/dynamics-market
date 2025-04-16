import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DirectionService } from '@shared/services/direction.service';
import { IProductsFilter } from '@shared/interfaces/filter';
import { RootService } from '@shared/services/root.service';
import { firstValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HeaderService } from '@shared/services/header.service';
import { ICategory } from '@shared/interfaces/category';
import { ProductsService } from '@shared/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Brand } from '@shared/interfaces/brand';
import { BrandsService } from '@shared/services/brands.service';

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
  brands: Brand[] = [];
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
    private activatedRoute: ActivatedRoute,
    private brandsService: BrandsService
  ) {
    this.rightToLeft = this.direction.isRTL();
  }

  async ngOnInit() {
    this.headerService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories.main = categories;
        this.flattenCategories(categories);
        this.setCategoryFromQuery();
      });
    this.brands = await firstValueFrom(
      this.brandsService.getBrandsList()
    );
    this.setBrandFromQuery();
  }

  flattenCategories(categories: ICategory[]) {
    categories.forEach(category => {
      this.flattenedCategories[category._id] = category;

      if (category?.children?.length) {
        this.flattenCategories(category.children);
      }
    });
  }

  get filter(): IProductsFilter {
    return this.productsService.filter;
  }

  async reset() {
    this.filter.category = null;
    this.filter.brand = [];
    await this.productsService.setQueryToParams();
  }

  setCategoryFromQuery() {
    this.activatedRoute.queryParams.subscribe(params => {
      const categorySlug = params['category'];

      if (!categorySlug) {
        this.categories.main.forEach(category => {
          category.hidden = false;
          category.showChildren = false;
        });
        this.categories.middle = [];
        this.categories.sub = [];
        return;
      }

      this.filter.category = categorySlug;
      for (const categoryId in this.flattenedCategories) {
        const category = this.flattenedCategories[categoryId];

        category.showChildren = false;
        category.hidden = false;

        if (category.slug === categorySlug) {
          this.categoryId = categoryId;
        }
      }
      if (this.categoryId) {
        this.showCategoriesByQuery(this.categoryId);
      }
    });
  }

  showCategoriesByQuery(categoryId: string) {
    const selectedCategory = this.flattenedCategories[categoryId];
    let level!: 'main' | 'middle' | 'sub';

    if (!selectedCategory.parentId) {
      level = 'main';
    }

    if (selectedCategory.parentId && selectedCategory.children.length) {
      level = 'middle';
    }

    if (selectedCategory.parentId && !selectedCategory.children.length) {
      level = 'sub';
    }

    let mainCategory: ICategory | null;
    let middleCategory: ICategory | null;
    let subCategory: ICategory | null;

    if (level === 'sub') {
      subCategory = selectedCategory;
      middleCategory = this.flattenedCategories[subCategory?.parentId!];
      mainCategory = this.flattenedCategories[middleCategory?.parentId!];
    }

    if (level === 'middle') {
      middleCategory = selectedCategory;
      mainCategory = this.flattenedCategories[middleCategory?.parentId!];
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

  async selectCategory(slug: string | null) {
    this.filter.category = slug;
    await this.productsService.setQueryToParams();
  }

  drawCategoriesHierarchy(category: ICategory, level: 'main' | 'middle' | 'sub') {
    category.hidden = false;

    if (level === 'main') {
      category.showChildren = true;

      this.categories.main.forEach(c => {
        if (category._id !== c._id) {
          c.hidden = true;
          c.showChildren = false;
        }
      });

      this.categories.middle = category.children;
      this.categories.sub = [];
    }

    if (level === 'middle') {
      category.showChildren = true;

      this.categories.middle.forEach(c => {
        if (category._id !== c._id) {
          c.hidden = true;
          c.showChildren = false;
        }
      });

      this.categories.sub = category.children;
    }
  }

  resetCategories(categories: ICategory[]) {
    categories.forEach(c => {
      c.showChildren = false;

      if (c?.children?.length) {
        this.resetCategories(c.children);
      }
    });
  }

  setBrandFromQuery() {
    let brand = this.activatedRoute.snapshot.queryParams['brand'];

    if (!brand) {
      brand = [];
    }

    if (typeof brand === 'string') {
      brand = [ brand ];
    }

    this.filter.brand = brand;
  }

  async selectBrand($event: Event) {
    const target = $event.target as HTMLInputElement;
    const value = target.value;
    const checked = target.checked;
    if (checked) {
      const brand = this.filter?.brand || [];
      brand.push(value);
      this.filter.brand = brand;
    } else {
      this.filter.brand = this.filter.brand?.filter(b => b !== value);
    }
    await this.productsService.setQueryToParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
