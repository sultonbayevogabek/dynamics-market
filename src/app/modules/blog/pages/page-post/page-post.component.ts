import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './page-post.component.html'
})

export class PagePostComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject();

  sidebarPosition: 'start' | 'end' = 'end'; // For LTR scripts "start" is "left" and "end" is "right"
  layout: 'classic' | 'full' = 'full';

  constructor(private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
