import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { FormControl } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { IUser } from '@shared/interfaces/user.interface';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '@shared/services/auth.service';
import { firstValueFrom, Subject } from 'rxjs';
import { ToasterService } from '@shared/services/toaster.service';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})

export class ProductComponent implements OnInit, OnDestroy {
  @Input() layout: ProductLayout = 'standard';
  @Input() product!: IProduct;

  currentUser!: IUser | null;
  quantity: FormControl = new FormControl(1);
  addingToCart = false;
  private destroy$: Subject<void> = new Subject();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private cart: CartService,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private toaster: ToasterService
  ) {
  }

  ngOnInit() {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(currentUser => {
        this.currentUser = currentUser;
        this.cd.detectChanges();
      });
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
      this.cart.add(this.product._id, this.quantity.value)
    );

    this.addingToCart = false;
    this.cd.detectChanges();

    if (response && response.statusCode === 201) {
      await this.toaster.success('the.product.has.been.successfully.added.to.your.cart');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
