import { Injectable } from '@angular/core';
import { RequestService } from '@shared/services/request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Brand } from '@shared/interfaces/brand';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BrandsService extends RequestService {
  brands: Brand[] = [];
  brands$ = new BehaviorSubject<Brand[]>([]);

  getBrandsList(): Observable<Brand[]> {
    return this.request<{ data: Brand[] }>('brand/list')
      .pipe(map(res => {
        this.brands = res.data;
        this.brands$.next(res.data);
        return res.data
      }));
  }
}
