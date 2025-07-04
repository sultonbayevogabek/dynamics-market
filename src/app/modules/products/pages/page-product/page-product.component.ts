import { Component, OnInit } from '@angular/core';
import { Hierarchy, IProduct } from '@shared/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Link } from '@shared/interfaces/link';

@Component({
  selector: 'app-page-product',
  templateUrl: './page-product.component.html'
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
    this.breadcrumbs = [];

    hierarchy.forEach((item) => {
      const categoryBreadcrumb: Link = {
        label: item?.categoryName,
        url: '/products',
        queryParams: {
          category: item?.categorySlug
        }
      };
      this.breadcrumbs.push(categoryBreadcrumb);
    });

    const productBreadcrumb = {
      label: this.product?.name,
      url: '',
      queryParams: null
    };

    this.breadcrumbs.push(productBreadcrumb);
  }
}
