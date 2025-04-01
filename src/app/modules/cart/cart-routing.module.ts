import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCartComponent } from './components/page-cart/page-cart.component';
import { PageCheckoutComponent } from './components/page-checkout/page-checkout.component';
import { PageOrderSuccessComponent } from './components/page-order-success/page-order-success.component';

const routes: Routes = [
  {
    path: 'cart',
    pathMatch: 'full',
    component: PageCartComponent
  },
  {
    path: 'cart/checkout',
    component: PageCheckoutComponent
  },
  {
    path: 'cart/checkout/success',
    component: PageOrderSuccessComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CartRoutingModule {
}
