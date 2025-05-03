import { NgModule } from '@angular/core';
import { Data, ResolveData, RouterModule, Routes } from '@angular/router';
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { ProductsListResolverService } from './resolvers/products-list-resolver.service';
import { CategoryResolverService } from './resolvers/category-resolver.service';
import { ProductResolverService } from './resolvers/product-resolver.service';

const categoryPageData: Data = {
  // Number of products per row. Possible values: 3, 4, 5.
  columns: 3,
  // Shop view mode by default. Possible values: 'grid', 'grid-with-features', 'list'.
  viewMode: 'grid',
  // Sidebar position. Possible values: 'start', 'end'.
  // It does not matter if the value of the 'columns' parameter is not 3.
  // For LTR scripts "start" is "left" and "end" is "right".
  sidebarPosition: 'start'
};

const categoryPageResolvers: ResolveData = {
  category: CategoryResolverService,
  products: ProductsListResolverService
};

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
