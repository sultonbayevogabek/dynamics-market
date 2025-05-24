import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { ProductResolverService } from './resolvers/product-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: PageCategoryComponent,
    pathMatch: 'full'
  },
  {
    path: ':productSlug',
    component: PageProductComponent,
    resolve: {
      product: ProductResolverService
    }
  },
  {
    path: 'track-order',
    component: PageTrackOrderComponent
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class ProductsRoutingModule {
}
