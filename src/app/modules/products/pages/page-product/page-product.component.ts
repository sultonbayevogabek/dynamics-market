import { Component, OnInit } from '@angular/core';
import { IProduct, Product } from '@shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '@shared/api/shop.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: [ './page-product.component.scss' ]
})
export class PageProductComponent implements OnInit {
  relatedProducts$!: Observable<IProduct[]>;

  product!: IProduct;
  layout: 'standard' | 'columnar' | 'sidebar' = 'standard';
  sidebarPosition: 'start' | 'end' = 'start'; // For LTR scripts "start" is "left" and "end" is "right"

  constructor(
    private shop: ShopService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.layout = data['layout'] || this.layout;
      this.sidebarPosition = data['sidebarPosition'] || this.sidebarPosition;
      this.product = data['product'];

      this.relatedProducts$ = this.shop.getRelatedProducts(data['product']);
    });
  }
}
