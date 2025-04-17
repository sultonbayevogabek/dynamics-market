import { Inject, Injectable, OnDestroy, PLATFORM_ID } from '@angular/core';
import { IProduct, Product } from '../interfaces/product';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface CompareData {
  items: IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class CompareService implements OnDestroy {
  private data: CompareData = {
    items: []
  };

  private destroy$: Subject<void> = new Subject();
  private itemsSubject$: BehaviorSubject<IProduct[]> = new BehaviorSubject<IProduct[]>([]);
  private onAddingSubject$: Subject<IProduct> = new Subject();

  readonly items$: Observable<IProduct[]> = this.itemsSubject$.pipe(takeUntil(this.destroy$));
  readonly onAdding$: Observable<IProduct> = this.onAddingSubject$.asObservable();

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: any
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    }
  }

  add(product: IProduct): Observable<void> {
    // timer only for demo
    return timer(1000).pipe(map(() => {
      this.onAddingSubject$.next(product);

      const index = this.data.items.findIndex(item => item._id === product._id);

      if (index === -1) {
        this.data.items.push(product);
        this.save();
      }
    }));
  }

  remove(product: IProduct): Observable<void> {
    // timer only for demo
    return timer(1000).pipe(map(() => {
      const index = this.data.items.findIndex(item => item._id === product._id);

      if (index !== -1) {
        this.data.items.splice(index, 1);
        this.save();
      }
    }));
  }

  private save(): void {
    localStorage.setItem('compareItems', JSON.stringify(this.data.items));

    this.itemsSubject$.next(this.data.items);
  }

  private load(): void {
    const items = localStorage.getItem('compareItems');

    if (items) {
      this.data.items = JSON.parse(items);
      this.itemsSubject$.next(this.data.items);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
