import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { IProduct } from '@shared/interfaces/product';
import { BlockHeaderGroup } from '@shared/interfaces/block-header-group';
import { takeUntil, tap } from 'rxjs/operators';

interface ProductsCarouselGroup extends BlockHeaderGroup {
  products$: Observable<IProduct[]>;
}

interface ProductsCarouselData {
  abort$: Subject<void>;
  loading: boolean;
  products: IProduct[];
  groups: ProductsCarouselGroup[];
}

@Component({
  selector: 'app-home',
  templateUrl: './page-home-one.component.html',
})
export class PageHomeOneComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  columnTopRated$!: Observable<IProduct[]>;
  columnSpecialOffers$!: Observable<IProduct[]>;
  columnBestsellers$!: Observable<IProduct[]>;

  featuredProducts!: ProductsCarouselData;
  latestProducts!: ProductsCarouselData;

  constructor(
  ) {
  }

  ngOnInit(): void {
    // this.groupChange(this.featuredProducts, this.featuredProducts.groups[0]);
    //
    // this.groupChange(this.latestProducts, this.latestProducts.groups[0]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  groupChange(carousel: ProductsCarouselData, group: BlockHeaderGroup): void {
    carousel.loading = true;
    carousel.abort$.next();

    (group as ProductsCarouselGroup).products$.pipe(
      tap(() => carousel.loading = false),
      takeUntil(merge(this.destroy$, carousel.abort$))
    ).subscribe(
      // x => carousel?.products = x
    );
  }
}
