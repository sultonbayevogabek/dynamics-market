import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { IProduct, Product } from '../../interfaces/product';
import { FormControl } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { CompareService } from '../../services/compare.service';
import { RootService } from '../../services/root.service';

export type ProductLayout = 'standard' | 'sidebar' | 'columnar' | 'quickview';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.scss' ]
})
export class ProductComponent {
  @Input() layout: ProductLayout = 'standard';

  @Input() product!: IProduct;

  quantity: FormControl = new FormControl(1);

  addingToCart = false;
  addingToWishlist = false;
  addingToCompare = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private cart: CartService,
    private wishlist: WishlistService,
    private compare: CompareService,
    public root: RootService
  ) {
  }

  addToCart(): void {
    if (!this.addingToCart && this.product && this.quantity.value > 0) {
      this.addingToCart = true;
    }
  }
}
