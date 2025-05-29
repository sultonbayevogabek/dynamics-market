import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnChanges,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { IProduct } from '@shared/interfaces/product';
import { DirectionService } from '@shared/services/direction.service';
import { isPlatformBrowser } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { BrandsService } from '@shared/services/brands.service';
import { Brand } from '@shared/interfaces/brand';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProductsService } from '@shared/services/products.service';

@Component({
  selector: 'app-block-products-carousel',
  templateUrl: './block-products-carousel.component.html'
})

export class BlockProductsCarouselComponent implements OnChanges, AfterViewInit, OnInit, OnDestroy {
  layout: 'grid-4' | 'grid-4-sm' | 'grid-5' | 'horizontal' = 'grid-4';
  rows = 1;
  popularBrands: Brand[] = [];
  products: IProduct[] = [];
  withSidebar = false;
  loading = true;

  @ViewChild('container', { read: ElementRef }) container!: ElementRef;

  columns: IProduct[][] = [];

  showCarousel = true;

  carouselDefaultOptions: any = {
    items: 4,
    margin: 14,
    nav: false,
    dots: false,
    loop: true,
    stagePadding: 1,
    rtl: this.direction.isRTL()
  };

  carouselOptionsByLayout: any = {
    'grid-4': {
      responsive: {
        1110: { items: 4, margin: 14 },
        930: { items: 4, margin: 10 },
        690: { items: 3, margin: 10 },
        400: { items: 2, margin: 10 },
        0: { items: 1 }
      }
    },
    'grid-4-sm': {
      responsive: {
        820: { items: 4, margin: 14 },
        640: { items: 3, margin: 10 },
        400: { items: 2, margin: 10 },
        0: { items: 1 }
      }
    },
    'grid-5': {
      responsive: {
        1110: { items: 5, margin: 12 },
        930: { items: 4, margin: 10 },
        690: { items: 3, margin: 10 },
        400: { items: 2, margin: 10 },
        0: { items: 1 }
      }
    },
    horizontal: {
      items: 3,
      responsive: {
        1110: { items: 3, margin: 14 },
        930: { items: 3, margin: 10 },
        690: { items: 2, margin: 10 },
        0: { items: 1 }
      }
    }
  };

  carouselOptions: OwlOptions = {};

  private destroy$: Subject<void> = new Subject();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private direction: DirectionService,
    private brandsService: BrandsService,
    private productsService: ProductsService
  ) {
  }

  ngOnInit() {
    this.brandsService.brands$
      .pipe(takeUntil(this.destroy$))
      .subscribe(brands => {
        this.loading = false;
        this.filterPopularBrands(brands);
      });
  }

  filterPopularBrands(brands: Brand[]) {
    this.popularBrands = brands?.filter(brand => brand?.isPopular) || [];
  }

  async getProducts(brand: string) {
    await this.productsService.getProducts({
      brands: [ brand ]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const properties = Object.keys(changes);

    if (properties.includes('products') || properties.includes('row')) {
      this.columns = [];

      if (this.products && this.rows > 0) {
        const products = this.products.slice();

        while (products.length > 0) {
          this.columns.push(products.splice(0, this.rows));
        }
      }
    }

    if ('layout' in changes) {
      this.carouselOptions = Object.assign({}, this.carouselDefaultOptions, this.carouselOptionsByLayout[changes['layout'].currentValue]);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const container = this.container.nativeElement as HTMLElement;
      const containerWidth = container.getBoundingClientRect().width;

      window.addEventListener('load', () => {
        const newContainerWidth = container.getBoundingClientRect().width;

        if (containerWidth !== newContainerWidth) {
          this.showCarousel = false;

          setTimeout(() => this.showCarousel = true, 0);
        }
      });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
