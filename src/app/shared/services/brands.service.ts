import { Injectable } from '@angular/core';
import { RequestService } from '@shared/services/request.service';
import { Observable } from 'rxjs';
import { Brand } from '@shared/interfaces/brand';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BrandsService extends RequestService {
  getBrandsList(): Observable<Brand[]> {
    return this.request<{ data: Brand[] }>('brand/get-list')
      .pipe(map(res => res.data));
  }
}
