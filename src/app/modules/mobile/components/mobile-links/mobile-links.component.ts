import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MobileMenuItemLink } from '@shared/interfaces/mobile-menu-item';

@Component({
  selector: 'app-mobile-links',
  templateUrl: './mobile-links.component.html'
})

export class MobileLinksComponent {
  @Input() links: MobileMenuItemLink[] = [];
  @Input() level = 0;

  @Output() itemClick: EventEmitter<MobileMenuItemLink> = new EventEmitter();

  constructor(

  ) {
  }

  onItemClick(item: MobileMenuItemLink): void {
    this.itemClick.emit(item);
  }
}
