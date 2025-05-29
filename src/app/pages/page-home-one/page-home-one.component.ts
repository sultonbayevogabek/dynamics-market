import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '@shared/interfaces/product';

@Component({
  selector: 'app-home',
  templateUrl: './page-home-one.component.html',
})
export class PageHomeOneComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  columnTopRated$!: Observable<IProduct[]>;
  columnSpecialOffers$!: Observable<IProduct[]>;
  columnBestsellers$!: Observable<IProduct[]>;

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
