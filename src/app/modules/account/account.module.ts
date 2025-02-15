import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';

// modules
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '@shared/shared.module';

// components
import { LayoutComponent } from './components/layout/layout.component';

// pages
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageOrdersListComponent } from './pages/page-orders-list/page-orders-list.component';
import { PageProfileComponent } from './pages/page-profile/page-profile.component';
import { PageOrderDetailsComponent } from './pages/page-order-details/page-order-details.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    // components
    LayoutComponent,
    // pages
    PageLoginComponent,
    PageOrdersListComponent,
    PageProfileComponent,
    PageOrderDetailsComponent,
  ],
  imports: [
    // modules (angular)
    CommonModule,
    // modules
    AccountRoutingModule,
    SharedModule,
    TranslateModule,
    NgxMaskModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class AccountModule {
}
