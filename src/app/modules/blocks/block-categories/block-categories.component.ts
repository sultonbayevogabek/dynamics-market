import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@shared/services/header.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICategory } from '@shared/interfaces/category';

@Component({
  selector: 'app-block-categories',
  templateUrl: './block-categories.component.html',
})

export class BlockCategoriesComponent implements OnInit, OnDestroy {
  categories: ICategory[] = [];
  loading = true;

  private destroy$ = new Subject<void>();

  constructor(
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.headerService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories?.slice(0, 6);
        this.loading = false;
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
