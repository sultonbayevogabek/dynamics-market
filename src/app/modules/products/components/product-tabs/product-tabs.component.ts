import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@shared/interfaces/product';
import { reviews } from '../../../../../data/shop-product-reviews';
import { Review } from '@shared/interfaces/review';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: [ './product-tabs.component.scss' ]
})
export class ProductTabsComponent implements OnInit {
  @Input() withSidebar = false;
  @Input() tab: 'description' | 'specification' | 'reviews' = 'description';
  @Input() product!: IProduct;

  reviews: Review[] = reviews;

  constructor() {
  }

  ngOnInit() {
    console.log(this.product);
  }
}
