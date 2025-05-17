import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Post } from '@shared/interfaces/post';
import { posts } from '../../../../../data/blog-posts';

@Component({
  selector: 'app-category',
  templateUrl: './page-category.component.html',
})
export class PageCategoryComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject();

  sidebarPosition: 'start' | 'end' = 'end';
  layout: 'classic' | 'grid' | 'list' = 'grid';

  posts: Post[] = posts;

  constructor() {
  }

  getPostCardLayout(): 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm' {
    return {
      classic: 'grid-lg',
      grid: 'grid-nl',
      list: 'list-nl'
    }[this.layout] as 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
