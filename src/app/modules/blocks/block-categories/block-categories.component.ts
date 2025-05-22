import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RootService } from '@shared/services/root.service';
import { HeaderService } from '@shared/services/header.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationLink } from '@shared/interfaces/navigation-link';
import { ICategory } from '@shared/interfaces/category';

@Component({
  selector: 'app-block-categories',
  templateUrl: './block-categories.component.html',
})

export class BlockCategoriesComponent implements OnInit, OnDestroy {
  @Input() header = '';
  @Input() layout: 'classic' | 'compact' = 'classic';
  categories: ICategory[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    public root: RootService,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.headerService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.categories = categories?.slice(0, 6);
        console.log('categories', categories);
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
