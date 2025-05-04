import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '@shared/services/cart.service';
import { Subject } from 'rxjs';
import { RootService } from '@shared/services/root.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './page-checkout.component.html',
  styleUrls: [ './page-checkout.component.scss' ]
})
export class PageCheckoutComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  constructor(
    public root: RootService,
    public cart: CartService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
