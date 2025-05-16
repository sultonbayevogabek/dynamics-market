import { Component } from '@angular/core';
import { RootService } from '@shared/services/root.service';

@Component({
  selector: 'app-page-order-success',
  templateUrl: './page-order-success.component.html',
})

export class PageOrderSuccessComponent {
  constructor(
    public root: RootService
  ) {
  }
}
