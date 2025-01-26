import { NgModule } from '@angular/core';
import { OAuthCallbackComponent } from './oauth-callback.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    OAuthCallbackComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'oauth-callback',
        component: OAuthCallbackComponent
      }
    ]),
    SharedModule
  ],
  exports: [
    RouterModule
  ]
})

export class OAuthCallbackModule {
}
