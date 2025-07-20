import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Brand } from '@shared/interfaces/brand';

@Component({
  selector: 'app-block-header',
  templateUrl: './block-header.component.html'
})
export class BlockHeaderComponent {
  @Input() header = '';
  @Input() arrows = false;
  @Input() groups: Brand[] = [];

  @Output() next: EventEmitter<any> = new EventEmitter();
  @Output() prev: EventEmitter<any> = new EventEmitter();

  @Output() groupChange: EventEmitter<Brand> = new EventEmitter();

  constructor() {
  }

  setGroup(group: Brand): void {
    this.groups.forEach(g => g.current = g === group);
    this.groupChange.emit(group);
  }
}
