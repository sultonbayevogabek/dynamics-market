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
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '@shared/interfaces/brand';
import { BrandsService } from '@shared/services/brands.service';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  data: {
    flattenedCategories: { [key: string]: ICategory };
    brands: Brand[];
    categoryId: string | null;
  } = {
    flattenedCategories: {},
    brands: [],
    categoryId: null
  };

  filterForm!: FormGroup;

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
    private brandsService: BrandsService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.rightToLeft = this.direction.isRTL();
  }

  async ngOnInit() {
    this.filterForm = this.fb.group({
      category: null,
      brand: []
    });

    this.headerService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories.main = categories;
        this.flattenCategories(categories);
        this.setCategoryFromQuery();
      });
    this.data.brands = await firstValueFrom(
      this.brandsService.getBrandsList()
    );
    this.setBrandFromQuery();
  }

  flattenCategories(categories: ICategory[]) {
    categories.forEach(category => {
      this.data.flattenedCategories[category._id] = category;

      if (category?.children?.length) {
        this.flattenCategories(category.children);
      }
    });
  }

  async reset() {
    this.filterForm.reset()
    await this.setFilterParamsToQuery({
      ...this.filterForm.value,
      page: null,
      limit: null,
      sort: null
    });
  }

  async setFilterParamsToQuery(queryParams?: IProductsFilter) {
    await this.router.navigate([], {
      queryParams: queryParams || {
        ...this.filterForm.value,
        page: 1
      },
      queryParamsHandling: 'merge',
      relativeTo: this.activatedRoute
    })
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

      this.filterForm.get('category')?.setValue(categorySlug);
      for (const categoryId in this.data.flattenedCategories) {
        const category = this.data.flattenedCategories[categoryId];

        category.showChildren = false;
        category.hidden = false;

        if (category.slug === categorySlug) {
          this.data.categoryId = categoryId;
        }
      }
      if (this.data.categoryId) {
        this.showCategoriesByQuery(this.data.categoryId);
      }
    });
  }

  showCategoriesByQuery(categoryId: string) {
    const selectedCategory = this.data.flattenedCategories[categoryId];
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
      middleCategory = this.data.flattenedCategories[subCategory?.parentId!];
      mainCategory = this.data.flattenedCategories[middleCategory?.parentId!];
    }

    if (level === 'middle') {
      middleCategory = selectedCategory;
      mainCategory = this.data.flattenedCategories[middleCategory?.parentId!];
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
    this.filterForm.get('category')?.setValue(slug);
    await this.setFilterParamsToQuery();
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

    this.filterForm.get('brand')?.setValue(brand);
  }

  async selectBrand($event: Event) {
    const target = $event.target as HTMLInputElement;
    const value = target.value;
    const checked = target.checked;
    if (checked) {
      const brand = this.filterForm.get('brand')?.value || [];
      brand.push(value);
      this.filterForm.get('brand')?.setValue(brand);
    } else {
      let brand: string[] = this.filterForm.get('brand')?.value;
      brand = brand?.filter(b => b !== value);
      this.filterForm.get('brand')?.setValue(brand);
    }
    await this.setFilterParamsToQuery();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
