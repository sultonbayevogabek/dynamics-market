import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// modules
import { SharedModule } from '@shared/shared.module';

// components
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { HeaderComponent } from './header.component';
import { IndicatorComponent } from './components/indicator/indicator.component';
import { LinksComponent } from './components/links/links.component';
import { MegamenuComponent } from './components/megamenu/megamenu.component';
import { MenuComponent } from './components/menu/menu.component';
import { NavComponent } from './components/nav/nav.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    // components
    AccountMenuComponent,
    DepartmentsComponent,
    HeaderComponent,
    IndicatorComponent,
    LinksComponent,
    MegamenuComponent,
    MenuComponent,
    NavComponent,
    TopbarComponent
  ],
  imports: [
    // modules (angular)
    CommonModule,
    RouterModule,
    // modules
    SharedModule,
    TranslateModule
  ],
  exports: [
    // components
    HeaderComponent
  ]
})
export class HeaderModule {
}
