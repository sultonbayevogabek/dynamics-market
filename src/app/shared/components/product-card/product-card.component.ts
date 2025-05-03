import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { IProduct } from '../../interfaces/product';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { QuickviewService } from '../../services/quickview.service';
import { RootService } from '../../services/root.service';
import { CurrencyService } from '../../services/currency.service';
import { first, takeUntil } from 'rxjs/operators';
import { firstValueFrom, Subject } from 'rxjs';
import { environment } from '@env/environment.prod';
import { AuthService } from '@shared/services/auth.service';
import { IUser } from '@shared/interfaces/user.interface';
import { ToasterService } from '@shared/services/toaster.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductCardComponent implements OnInit, OnDestroy, OnChanges {
  host = environment.host;
  currentUser!: IUser | null;
  private destroy$: Subject<void> = new Subject();

  @Input() product!: IProduct;
  @Input() layout: 'grid-sm' | 'grid-nl' | 'grid-lg' | 'list' | 'horizontal' | null = null;

  addingToCart = false;

  showingQuickview = false;

  constructor(
    private cd: ChangeDetectorRef,
    public root: RootService,
    public cart: CartService,
    public wishlist: WishlistService,
    public compare: CompareService,
    public quickview: QuickviewService,
    public currency: CurrencyService,
    private authService: AuthService,
    private toaster: ToasterService
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        this.cd.detectChanges();
      });

    this.currency.changes$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cd.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if ('product' in changes) {
    //   this.featuredAttributes = !this.product ? [] : this.product.attributes.filter(x => x.featured);
    // }
  }

  async addToCart() {
    if (!this.currentUser) {
      await this.toaster.info('sign.in.to.add.products.to.your.cart');
      this.authService.openOAuthWindow();
      return;
    }

    if (this.addingToCart) {
      return;
    }

    this.addingToCart = true;

    const response = await firstValueFrom(
      this.cart.add(this.product._id)
    )

    this.addingToCart = false;
    this.cd.detectChanges();

    if (response && response.statusCode === 201) {
      await this.toaster.success('the.product.has.been.successfully.added.to.your.cart');
    }
  }

  showQuickview(): void {
    if (this.showingQuickview) {
      return;
    }

    this.showingQuickview = true;
    this.quickview.show(this.product).subscribe({
      complete: () => {
        this.showingQuickview = false;
        this.cd.markForCheck();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
