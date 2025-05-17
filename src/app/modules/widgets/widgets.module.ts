import { NgModule } from '@angular/core';

// modules (angular)
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// modules (third-party)
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// modules
import { SharedModule } from '@shared/shared.module';

// widgets
import { WidgetAboutusComponent } from './widget-aboutus/widget-aboutus.component';
import { WidgetFiltersComponent } from './widget-filters/widget-filters.component';
import { WidgetNewsletterComponent } from './widget-newsletter/widget-newsletter.component';
import { WidgetProductsComponent } from './widget-products/widget-products.component';
import { WidgetSearchComponent } from './widget-search/widget-search.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    // widgets
    WidgetAboutusComponent,
    WidgetFiltersComponent,
    WidgetNewsletterComponent,
    WidgetProductsComponent,
    WidgetSearchComponent,
  ],
  imports: [
    // modules (angular)
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // modules (third-party)
    NgxSliderModule,
    // modules
    SharedModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    // widgets
    WidgetAboutusComponent,
    WidgetFiltersComponent,
    WidgetNewsletterComponent,
    WidgetProductsComponent,
    WidgetSearchComponent
  ]
})
export class WidgetsModule {
}
