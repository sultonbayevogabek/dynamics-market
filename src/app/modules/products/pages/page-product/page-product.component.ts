import { Component, OnInit } from '@angular/core';
import { Hierarchy, IProduct } from '@shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Link } from '@shared/interfaces/link';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html',
  styleUrls: [ './page-product.component.scss' ]
})
export class PageProductComponent implements OnInit {
  relatedProducts$!: Observable<IProduct[]>;

  product!: IProduct;
  breadcrumbs: Link[] = [];

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.product = data['product'];
      this.generateBreadCrumbs(this.product.hierarchy);
    });
  }

  generateBreadCrumbs(hierarchy: Hierarchy[]) {
    hierarchy.forEach((item, index) => {
      const breadcrumb: Link = {
        label: item?.categoryName,
        url: '',
        queryParams: null
      };

      if (index !== hierarchy.length - 1) {
        breadcrumb.url = '/products';
        breadcrumb.queryParams = {
          category: item?.categorySlug
        };
      }

      this.breadcrumbs.push(breadcrumb);
    });
  }
}
