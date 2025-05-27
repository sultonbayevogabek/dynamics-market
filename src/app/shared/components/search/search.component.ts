import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { IProduct } from '../../interfaces/product';
import { RootService } from '../../services/root.service';
import { FormBuilder } from '@angular/forms';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { distinctUntilChanged, fromEvent, Subject } from 'rxjs';
import { ICategory } from '../../interfaces/category';
import { DOCUMENT } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { HeaderService } from '@shared/services/header.service';
import { ProductsService } from '@shared/services/products.service';

export type SearchLocation = 'header' | 'indicator' | 'mobile-header';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  exportAs: 'search'
})
export class SearchComponent implements OnChanges, OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  form = this.fb.group({
    category: [ 'all' ],
    search: [ '' ]
  });

  hasSuggestions = false;

  categories: ICategory[] = [];

  suggestedProducts: IProduct[] = [];

  addedToCartProducts: IProduct[] = [];

  @Input() location: SearchLocation = 'header';

  @Output() escape: EventEmitter<void> = new EventEmitter<void>();

  @Output() closeButtonClick: EventEmitter<void> = new EventEmitter<void>();

  @HostBinding('class.search') classSearch = true;

  @HostBinding('class.search--location--header') get classSearchLocationHeader(): boolean {
    return this.location === 'header';
  }

  @HostBinding('class.search--location--indicator') get classSearchLocationIndicator(): boolean {
    return this.location === 'indicator';
  }

  @HostBinding('class.search--location--mobile-header') get classSearchLocationMobileHeader(): boolean {
    return this.location === 'mobile-header';
  }

  @HostBinding('class.search--has-suggestions') get classSearchHasSuggestions(): boolean {
    return this.hasSuggestions;
  }

  @HostBinding('class.search--suggestions-open') classSearchSuggestionsOpen = false;

  @ViewChild('input') inputElementRef!: ElementRef;

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }

  get inputElement(): HTMLElement {
    return this.inputElementRef.nativeElement;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private zone: NgZone,
    private cart: CartService,
    private productsService: ProductsService,
    public root: RootService,
    private headerService: HeaderService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  async ngOnInit() {
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe(async () => {
        await this.search();
      });

    this.zone.runOutsideAngular(() => {
      fromEvent(this.document, 'click').pipe(
        takeUntil(this.destroy$)
      ).subscribe(event => {
        const activeElement = this.document.activeElement;

        // If the inner element still has focus, ignore the click.
        if (activeElement && activeElement.closest('.search') === this.element) {
          return;
        }

        // Close suggestion if click performed outside of component.
        if (event.target instanceof HTMLElement && this.element !== event.target.closest('.search')) {
          this.zone.run(() => this.closeSuggestion());
        }
      });

      fromEvent(this.element, 'focusout').pipe(
        debounceTime(10),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        if (this.document.activeElement === this.document.body) {
          return;
        }

        // Close suggestions if the focus received an external element.
        if (this.document.activeElement && this.document.activeElement.closest('.search') !== this.element) {
          this.zone.run(() => this.closeSuggestion());
        }
      });
    });

    this.headerService.categories$.subscribe(categories => {
      this.categories = categories;
    })
  }

  async search() {
    const searchParams: {
      category?: string,
      search: string
    } = {
      search: ''
    };

    const formValue = this.form.getRawValue();

    if (formValue?.search?.trim()?.length < 2) {
      return;
    }

    searchParams.search = formValue.search?.trim();

    if (formValue.category !== 'all') {
      searchParams.category = formValue.category;
    }

    const response = await this.productsService.searchProduct(searchParams);
    this.suggestedProducts = response?.data;
    this.cdr.detectChanges();
  }

  openSuggestion(): void {
    this.classSearchSuggestionsOpen = true;
  }

  closeSuggestion(): void {
    this.classSearchSuggestionsOpen = false;
  }

  addToCart(product: IProduct): void {
    if (this.addedToCartProducts.includes(product)) {
      return;
    }

    this.addedToCartProducts.push(product);
    // this.cart.add(product, 1).subscribe({
    //   complete: () => {
    //     this.addedToCartProducts = this.addedToCartProducts.filter(eachProduct => eachProduct !== product);
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
