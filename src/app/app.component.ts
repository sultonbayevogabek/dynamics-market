import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '@shared/services/cart.service';
import { CompareService } from '@shared/services/compare.service';
import { WishlistService } from '@shared/services/wishlist.service';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { CurrencyService } from '@shared/services/currency.service';
import { filter, first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES_SHORTS } from '@shared/constants/languages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})

export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private toaster: ToastrService,
    private cart: CartService,
    private compare: CompareService,
    private wishlist: WishlistService,
    private zone: NgZone,
    private scroller: ViewportScroller,
    private currency: CurrencyService,
    private translate: TranslateService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        this.router.events.pipe(filter(event => event instanceof NavigationEnd), first()).subscribe(() => {
          const preloader = document.querySelector('.site-preloader');

          if (preloader === null) {
            return;
          }

          preloader.addEventListener('transitionend', (event: Event) => {
            if (event instanceof TransitionEvent && event.propertyName === 'opacity') {
              preloader.remove();
            }
          });
          preloader.classList.add('site-preloader__fade');

          // Sometimes, due to unexpected behavior, the browser (in particular Safari) may not play the transition, which leads
          // to blocking interaction with page elements due to the fact that the preloader is not deleted.
          // The following block covers this case.
          if (getComputedStyle(preloader).opacity === '0' && preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        });


        // Language init
        const lang = localStorage.getItem('lang') || 'uz';
        if (LANGUAGES_SHORTS.includes(lang)) {
          this.translate.setDefaultLang(lang);
          this.translate.use(lang);
        }
      });
    }
  }

  async ngOnInit() {
    this.currency.options = {
      code: 'USD'
      // display: 'symbol',
      // digitsInfo: '1.2-2',
      // locale: 'en-US'
    };

    this.router.events.subscribe((event) => {
      if ((event instanceof NavigationEnd)) {
        this.scroller.scrollToPosition([ 0, 0 ]);
      }
    });
    this.cart.onAdding$.subscribe(product => {
      this.toaster.success(`Product "${ product.name }" added to cart!`);
    });
    this.compare.onAdding$.subscribe(product => {
      this.toaster.success(`Product "${ product.name }" added to compare!`);
    });
    this.wishlist.onAdding$.subscribe(product => {
      this.toaster.success(`Product "${ product.name }" added to wish list!`);
    });
  }
}
