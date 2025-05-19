import { Component, Input } from '@angular/core';
import { INews } from '@shared/interfaces/news';

@Component({
  selector: 'app-post-details',
  templateUrl: './post.component.html',
  styleUrls: [ './post.component.scss' ]
})
export class PostComponent {
  @Input() layout: 'classic' | 'full' = 'classic';

  posts: INews[] = [];

  constructor() {
  }
}
