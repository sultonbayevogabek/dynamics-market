import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { PageCartComponent } from './components/page-cart/page-cart.component';
import { PageCheckoutComponent } from './components/page-checkout/page-checkout.component';
import { PageThankYouComponent } from './components/page-thank-you/page-thank-you.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PageCartComponent,
    PageCheckoutComponent,
    PageThankYouComponent
  ],
   imports: [
      // modules (angular)
      CommonModule,
      SharedModule,
      RouterModule,
      ReactiveFormsModule,
      CartRoutingModule,
      TranslateModule,
      FormsModule
   ]
})
export class CartModule {
}
