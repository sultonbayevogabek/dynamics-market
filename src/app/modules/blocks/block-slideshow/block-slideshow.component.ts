import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DirectionService } from '@shared/services/direction.service';
import { BannerService } from '@shared/services/banner.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '@env/environment';
import { IBanner } from '@shared/interfaces/banner';

@Component({
  selector: 'app-block-slideshow',
  templateUrl: './block-slideshow.component.html'
})
export class BlockSlideshowComponent implements OnInit {
  @Input() withDepartments = false;
  host = environment.host;

  options = {
    nav: false,
    dots: true,
    loop: true,
    responsive: {
      0: { items: 1 }
    },
    rtl: this.direction.isRTL()
  };

  banners: IBanner[] = [];

  constructor(
    public sanitizer: DomSanitizer,
    private direction: DirectionService,
    private bannerService: BannerService,
  ) {
  }

  async ngOnInit() {
    await this.getBanners();
  }

  async getBanners() {
    this.banners = await firstValueFrom(
      this.bannerService.getBanners()
    )
  }
}
