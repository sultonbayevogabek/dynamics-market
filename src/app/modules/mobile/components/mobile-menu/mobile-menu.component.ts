import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MobileMenuService } from '@shared/services/mobile-menu.service';
import { mobileMenu } from '../../../../../data/mobile-menu';
import { MobileMenuItem } from '@shared/interfaces/mobile-menu-item';
import { LanguageService } from '@shared/services/language.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: [ './mobile-menu.component.scss' ]
})

export class MobileMenuComponent implements OnDestroy, OnInit {
  private destroy$: Subject<void> = new Subject();

  isOpen = false;
  links: MobileMenuItem[] = mobileMenu;

  constructor(
    public mobileMenuService: MobileMenuService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
    this.mobileMenuService.isOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isOpen => this.isOpen = isOpen);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onItemClick(event: MobileMenuItem): void {
    if (event.type === 'link') {
      this.mobileMenuService.close();
    }

    if (event.data && event.data.language) {
      this.languageService.setLanguage(event.data.language);
    }
  }
}
