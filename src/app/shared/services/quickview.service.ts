import { Injectable, OnDestroy } from '@angular/core';
import { IProduct } from '../interfaces/product';
import { Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuickviewService implements OnDestroy {
  private destroy$: Subject<void> = new Subject();
  private showSubject$: Subject<IProduct> = new Subject();

  show$: Observable<IProduct> = this.showSubject$.pipe(takeUntil(this.destroy$));

  constructor() {
  }

  show(product: IProduct): Observable<void> {
    console.log(product);
    // timer only for demo
    return timer(1000).pipe(map(() => {
      this.showSubject$.next(product);
    }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
