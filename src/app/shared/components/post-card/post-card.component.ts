import { Component, Input } from '@angular/core';
import { Post } from '../../interfaces/post';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html'
})

export class PostCardComponent {
  @Input() post!: Post;
  @Input() layout: 'grid-nl' | 'grid-lg' | 'list-nl' | 'list-sm' | null = null;

  constructor() {
  }
}
