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
  popularBrands: Brand[] = [];
  products: IProduct[] = [];
  withSidebar = false;
  loading = true;

  @ViewChild('container', { read: ElementRef }) container!: ElementRef;

  showCarousel = true;

  carouselOptions: OwlOptions = {
    items: 4,
    margin: 14,
    nav: false,
    dots: false,
    loop: true,
    stagePadding: 1,
    rtl: this.direction.isRTL(),
    skip_validateItems: true,
    responsive: {
      1110: { items: 4, margin: 14 },
      930: { items: 4, margin: 10 },
      690: { items: 3, margin: 10 },
      400: { items: 2, margin: 10 },
      0: { items: 1 }
    }
  };

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
        if (!brands || !brands?.length) {
          return;
        }

        this.filterPopularBrands(brands);
      });

    this.productsService.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.products = products?.data || [];
        this.loading = false;
      });
  }

  filterPopularBrands(brands: Brand[]) {
    this.popularBrands = brands?.filter(brand => brand?.isPopular) || [];
    this.popularBrands[0].current = true;
    this.getProducts(this.popularBrands[0]?.slug);
  }

  getProducts(brand: string) {
    this.loading = true;
    this.productsService.getProducts({
      brands: [ brand ],
      page: 1,
      limit: 12
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
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
