import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PageCartComponent } from './components/page-cart/page-cart.component';
import { PageCheckoutComponent } from './components/page-checkout/page-checkout.component';
import { PageOrderSuccessComponent } from './components/page-order-success/page-order-success.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PageCartComponent,
    PageCheckoutComponent,
    PageOrderSuccessComponent
  ],
  imports: [
    // modules (angular)
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class CartModule {
}
