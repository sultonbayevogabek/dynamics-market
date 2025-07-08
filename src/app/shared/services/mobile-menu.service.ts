import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { MobileMenuItemLink } from '@shared/interfaces/mobile-menu-item';
import { HeaderService } from '@shared/services/header.service';
import { ICategory } from '@shared/interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {
  private openSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isOpen$: Observable<boolean> = this.openSubject$.asObservable();
  mobileMenu: MobileMenuItemLink[] = [
    {
      type: 'button', label: 'categories', children: [
      ]
    },

    {
      type: 'page-link', label: 'homepage', url: '/'
    },

    {
      type: 'page-link', label: 'about.us', url: '/about-us'
    },
    {
      type: 'page-link', label: 'news', url: '/news'
    },

    {
      type: 'page-link', label: 'contacts', url: '/contact-us'
    },
    {
      type: 'page-link', label: 'terms.of.use', url: '/terms'
    },

    {
      type: 'page-link', label: 'faq', url: '/faq'
    },

    {
      type: 'button', label: 'language', children: [
        { type: 'button', label: 'O\'zbek', data: { language: 'uz' } },
        { type: 'button', label: 'Русский', data: { language: 'ru' } },
        { type: 'button', label: 'English', data: { language: 'en' } },
      ]
    }
  ];


  constructor(
    @Inject(PLATFORM_ID)
    private platformId: any,
    private headerService: HeaderService
  ) {
    this.headerService.categories$.subscribe(categories => {
      this.setCategories(categories);
    })
  }

  open(): void {
    if (isPlatformBrowser(this.platformId)) {
      const bodyWidth = document.body.offsetWidth;

      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = (document.body.offsetWidth - bodyWidth) + 'px';

      this.openSubject$.next(true);
    }
  }

  close(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '';

      this.openSubject$.next(false);
    }
  }

  setCategories(categories: ICategory[]) {
    const categoryItem = this.mobileMenu[0] as {
      type: string;
      label: string;
      children: any[]
    };

    categoryItem.children = categories.map(category => {
      return this.transformCategory(category);
    })
  }

  transformCategory(category: ICategory): MobileMenuItemLink {
    return {
      type: 'category-link',
      label: category.name,
      url: category.slug,
      children: category.children?.map(c => this.transformCategory(c)) || []
    };
  }

  toggle(): void {
    this.openSubject$.next(!this.openSubject$.value);
  }
}
