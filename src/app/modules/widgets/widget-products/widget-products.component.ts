import { Component, Input } from '@angular/core';
import { IProduct } from '@shared/interfaces/product';

@Component({
  selector: 'app-widget-products',
  templateUrl: './widget-products.component.html'
})
export class WidgetProductsComponent {
  @Input() header = '';
  @Input() products: IProduct[] = [];

  constructor() {
  }
}
