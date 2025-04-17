import { Component, Input } from '@angular/core';
import { IProduct, Product } from '@shared/interfaces/product';
import { RootService } from '@shared/services/root.service';

@Component({
  selector: 'app-widget-products',
  templateUrl: './widget-products.component.html',
  styleUrls: [ './widget-products.component.scss' ]
})
export class WidgetProductsComponent {
  @Input() header = '';
  @Input() products: IProduct[] = [];

  constructor(public root: RootService) {
  }
}
