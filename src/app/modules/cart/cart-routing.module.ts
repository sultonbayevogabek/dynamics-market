import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCartComponent } from './components/page-cart/page-cart.component';
import { PageCheckoutComponent } from './components/page-checkout/page-checkout.component';
import { PageThankYouComponent } from './components/page-thank-you/page-thank-you.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PageCartComponent
  },
  {
    path: 'checkout',
    component: PageCheckoutComponent
  },
  {
    path: 'thank-you/:orderCode',
    component: PageThankYouComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CartRoutingModule {
}
