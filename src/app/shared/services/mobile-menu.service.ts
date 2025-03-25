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
        {
          type: 'link', label: 'Power Tools', url: '/shop/catalog', children: [
            { type: 'link', label: 'Engravers', url: '/shop/catalog' },
            { type: 'link', label: 'Wrenches', url: '/shop/catalog' },
            { type: 'link', label: 'Wall Chaser', url: '/shop/catalog' },
            { type: 'link', label: 'Pneumatic Tools', url: '/shop/catalog', children: [
                { type: 'link', label: 'Engravers', url: '/shop/catalog' },
              ] }
          ]
        },
        {
          type: 'link', label: 'Machine Tools', url: '/shop/catalog', children: [
            { type: 'link', label: 'Thread Cutting', url: '/shop/catalog' },
            { type: 'link', label: 'Chip Blowers', url: '/shop/catalog' },
            { type: 'link', label: 'Sharpening Machines', url: '/shop/catalog' },
            { type: 'link', label: 'Pipe Cutters', url: '/shop/catalog' },
            { type: 'link', label: 'Slotting machines', url: '/shop/catalog' },
            { type: 'link', label: 'Lathes', url: '/shop/catalog' }
          ]
        }
      ]
    },

    {
      type: 'link', label: 'homepage', url: '/'
    },

    {
      type: 'link', label: 'about.us', url: '/about-us'
    },
    {
      type: 'link', label: 'news', url: '/news'
    },

    {
      type: 'link', label: 'contacts', url: '/contact-us'
    },
    {
      type: 'link', label: 'privacy.policy', url: '/terms'
    },

    {
      type: 'link', label: 'faq', url: '/faq'
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
      type: 'link',
      label: category.name,
      url: category.slug,
      children: category.children?.map(c => this.transformCategory(c)) || []
    };
  }

  toggle(): void {
    this.openSubject$.next(!this.openSubject$.value);
  }
}
