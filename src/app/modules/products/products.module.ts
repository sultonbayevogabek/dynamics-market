import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modules (third-party)
import { CarouselModule } from 'ngx-owl-carousel-o';

// modules
import { BlocksModule } from '../blocks/blocks.module';
import { ProductsRoutingModule } from './products-routing.module';
import { WidgetsModule } from '../widgets/widgets.module';

// components
import { ProductsViewComponent } from './components/products-view/products-view.component';
import { ProductTabsComponent } from './components/product-tabs/product-tabs.component';
import { ProductsSidebarComponent } from './components/products-sidebar/products-sidebar.component';

// pages
import { PageCategoryComponent } from './pages/page-category/page-category.component';
import { PageProductComponent } from './pages/page-product/page-product.component';
import { PageTrackOrderComponent } from './pages/page-track-order/page-track-order.component';
import { ProductSidebarComponent } from './components/product-sidebar/product-sidebar.component';
import { SharedModule } from '@shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    // components
    ProductsViewComponent,
    ProductTabsComponent,
    ProductsSidebarComponent,
    // pages
    PageCategoryComponent,
    PageProductComponent,
    PageTrackOrderComponent,
    ProductSidebarComponent,
  ],
  imports: [
    // modules (angular)
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // modules (third-party)
    CarouselModule,
    // modules
    BlocksModule,
    ProductsRoutingModule,
    WidgetsModule,
    SharedModule,
    TranslateModule
  ]
})
export class ProductsModule {
}
