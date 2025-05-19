import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '@shared/api/blog.service';
import { Category } from '@shared/interfaces/category';
import { INews } from '@shared/interfaces/news';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit {
  @Input() position: 'start' | 'end' = 'start';

  posts: INews[] = [];
  categories: Category[] = [];

  constructor(
    private blog: BlogService
  ) {
  }

  ngOnInit(): void {
    this.blog.getCategories(null, 1).subscribe(x => this.categories = x);
  }
}
