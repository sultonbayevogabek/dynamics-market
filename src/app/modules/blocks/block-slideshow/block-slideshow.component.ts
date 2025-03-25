import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DirectionService } from '@shared/services/direction.service';
import { BannerService } from '@shared/services/banner.service';
import { firstValueFrom } from 'rxjs';
import { environment } from '@env/environment';
import { IBanner } from '@shared/interfaces/banner';
import { Router } from '@angular/router';

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
    private router: Router,
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

  async openBanner(banner: IBanner) {
    if (banner.type === 'filter') {
      const queryParams: {
        category?: string;
        brands?: string;
      } = {}

      if (banner.hierarchy && banner.hierarchy.length) {
        queryParams.category = banner.hierarchy[banner.hierarchy.length - 1].categorySlug
      }

      if (banner.brandSlugs && banner.brandSlugs.length) {
        queryParams.brands = banner.brandSlugs.join(',');
      }

      await this.router.navigate(['/products'], { queryParams });
    }

    if (banner.type === 'product') {
      await this.router.navigate(['/product', banner.product.slug]);
    }
  }
}
