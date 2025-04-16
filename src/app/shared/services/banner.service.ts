import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBanner } from '@shared/interfaces/banner';
import { RequestService } from '@shared/services/request.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class BannerService extends RequestService {
  getBanners(): Observable<IBanner[]> {
    return this.request<{ data: IBanner[]; total: number }>('banner/list')
      .pipe(map(response => response.data));
  }
}
