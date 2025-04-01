import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface RouterData {
  headerLayout?: 'classic' | 'compact';
}

@Component({
  selector: 'app-main',
  templateUrl: './root.component.html',
  styleUrls: [ './root.component.scss' ]
})

export class RootComponent {
  headerLayout: 'classic' | 'compact' = 'classic';

  constructor(
    public route: ActivatedRoute
  ) {
    this.route.data.subscribe((data: RouterData) => {
      this.headerLayout = data.headerLayout || 'classic';
    });
  }
}
