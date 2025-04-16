import { Injectable } from '@angular/core';
import { RequestService } from '@shared/services/request.service';
import { Observable } from 'rxjs';
import { Brand } from '@shared/interfaces/brand';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BrandsService extends RequestService {
  brands: Brand[] = [];

  getBrandsList(): Observable<Brand[]> {
    return this.request<{ data: Brand[] }>('brand/list')
      .pipe(map(res => {
        this.brands = res.data;
        return res.data
      }));
  }
}
