import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MultiLanguageAddress, MultiLanguageGeocodingService } from '@shared/services/multilanguage-geocoding.service';

export interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export interface LocationWithMultiLanguageAddress extends LocationData {
  address?: MultiLanguageAddress;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private readonly geolocationOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000
  };

  constructor(private multiLanguageGeocodingService: MultiLanguageGeocodingService) {}

  getCurrentPosition(): Observable<LocationData> {
    return new Observable(observer => {
      if (!this.isGeolocationSupported()) {
        observer.error('Geolocation bu brauzerde qo\'llab-quvvatlanmaydi');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          observer.next(this.mapPositionToLocationData(position));
          observer.complete();
        },
        (error: GeolocationPositionError) => {
          observer.error(this.getErrorMessage(error));
        },
        this.geolocationOptions
      );
    });
  }

  // Koordinatalar va ko'p tilli manzil ma'lumotlarini olish
  getMultiLanguageAddress(coordinates: LocationData): Observable<MultiLanguageAddress | null> {
    return this.multiLanguageGeocodingService.getMultiLanguageAddress(coordinates);
  }

  // Fallback manzil olish
  getFallbackAddress(coordinates: LocationData): MultiLanguageAddress {
    return this.multiLanguageGeocodingService.getFallbackAddress(coordinates);
  }

  isGeolocationSupported(): boolean {
    return 'geolocation' in navigator;
  }

  private mapPositionToLocationData(position: GeolocationPosition): LocationData {
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy,
      timestamp: position.timestamp
    };
  }

  private getErrorMessage(error: GeolocationPositionError): string {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'Foydalanuvchi geolocation ruxsatini rad etdi';
      case error.POSITION_UNAVAILABLE:
        return 'Joylashuv ma\'lumotlari mavjud emas';
      case error.TIMEOUT:
        return 'Joylashuvni aniqlash vaqti tugadi';
      default:
        return 'Noma\'lum xatolik yuz berdi';
    }
  }
}
