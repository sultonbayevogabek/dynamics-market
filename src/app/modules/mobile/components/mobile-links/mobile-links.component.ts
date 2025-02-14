import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileMenuItem, MobileMenuItemBase } from '@shared/interfaces/mobile-menu-item';
import { LanguageService } from '@shared/services/language.service';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-mobile-links',
  templateUrl: './mobile-links.component.html',
  styleUrls: [ './mobile-links.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MobileLinksComponent {
  @Input() links: MobileMenuItem[] = [];
  @Input() level = 0;

  @Output() itemClick: EventEmitter<MobileMenuItem> = new EventEmitter();

  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
  ) {
  }

  onItemClick(item: MobileMenuItem): void {
    this.itemClick.emit(item);

    if (item?.data?.language) {
      this.languageService.setLanguage(item.data?.language);
    }
  }
}
