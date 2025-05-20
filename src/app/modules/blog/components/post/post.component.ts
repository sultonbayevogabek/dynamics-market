import { Component, Input } from '@angular/core';
import { INews } from '@shared/interfaces/news';

@Component({
  selector: 'app-post-details',
  templateUrl: './post.component.html'
})

export class PostComponent {
  @Input() layout: 'classic' | 'full' = 'classic';
  @Input() news!: INews;
}
