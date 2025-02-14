import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { PageHomeOneComponent } from './pages/page-home-one/page-home-one.component';
import { RootComponent } from './components/root/root.component';
import { AuthGuard } from './core/guards/auth.guard';
import { InitialResolver } from './core/resolvers/initial.resolver';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    resolve: {
      initialData: InitialResolver
    },
    data: {
      // Header layout. Choose one of ['classic', 'compact'].
      headerLayout: 'classic',
      // Dropcart type. Choose one of ['dropdown', 'offcanvas'].
      dropcartType: 'dropdown'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: PageHomeOneComponent
      },
      {
        path: 'shop',
        loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule)
      },
      {
        path: '',
        loadChildren: () => import('./modules/blog/blog.module').then(m => m.BlogModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule),
        canActivate: [ AuthGuard ]
      },
      {
        path: '',
        loadChildren: () => import('./modules/site/site.module').then(m => m.SiteModule)
      },
      {
        path: '',
        loadChildren: () => import('./modules/oauth-callback/oauth-callback.module').then(m => m.OAuthCallbackModule)
      },
      {
        path: '**',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
  }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
