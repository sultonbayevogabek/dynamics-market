import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNewsComponent } from './pages/page-news/page-news.component';
import { PagePostComponent } from './pages/page-post/page-post.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'category-classic'
  },
  {
    path: 'news',
    component: PageNewsComponent,
    data: {
      sidebarPosition: 'end', // one of [start, end]. For LTR scripts "start" is "left" and "end" is "right"
      layout: 'grid' // one of [classic, grid, list]
    },
    pathMatch: 'full'
  },
  {
    path: 'news/:newsSlug',
    component: PagePostComponent,
    data: {
      layout: 'full'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class BlogRoutingModule {
}
