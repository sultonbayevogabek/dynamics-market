import { Component, Input } from '@angular/core';
import { INews } from '@shared/interfaces/news';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html'
})

export class PostCardComponent {
  @Input() post!: INews;
  @Input() layout: 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm' | null = null;

  constructor() {
  }
}
