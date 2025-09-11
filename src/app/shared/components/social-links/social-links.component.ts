import { Component, HostBinding, Input } from '@angular/core';

export interface SocialLinksItem {
  type: string;
  url: string;
  icon: string;
}

export type SocialLinksShape = 'circle' | 'rounded';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: [ './social-links.component.scss' ]
})
export class SocialLinksComponent {

  items: SocialLinksItem[] = [
    { type: 'telegram', url: 'https://t.me/dynamicsmarket', icon: 'fab fa-telegram' },
    { type: 'youtube', url: 'https://www.linkedin.com/company/dynamics-engineering-uz/', icon: 'fab fa-linkedin' }
  ];

  @Input() shape: SocialLinksShape = 'circle';

  @HostBinding('class.social-links') classSocialLinks = true;

  @HostBinding('class.social-links--shape--circle') get classSocialLinksShapeCircle(): boolean {
    return this.shape === 'circle';
  }

  @HostBinding('class.social-links--shape--rounded') get classSocialLinksShapeRounded(): boolean {
    return this.shape === 'rounded';
  }

  constructor() {
  }
}
