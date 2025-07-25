
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

export interface MultiLanguageAddress {
  uz: string;
  ru: string;
  en: string;
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
}

interface NominatimResponse {
  address: {
    country?: string;
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    state?: string;
    region?: string;
    county?: string;
    district?: string;
    suburb?: string;
    neighbourhood?: string;
    quarter?: string;
  };
  display_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class MultiLanguageGeocodingService {
  constructor(private http: HttpClient) {
  }

  getMultiLanguageAddress(coordinates: LocationCoordinates): Observable<MultiLanguageAddress | null> {
    const { latitude, longitude } = coordinates;

    // Har bir til uchun alohida API so'rov
    const uzbekRequest = this.getAddressInLanguage(latitude, longitude, 'uz');
    const russianRequest = this.getAddressInLanguage(latitude, longitude, 'ru');
    const englishRequest = this.getAddressInLanguage(latitude, longitude, 'en');

    return forkJoin({
      uz: uzbekRequest,
      ru: russianRequest,
      en: englishRequest
    }).pipe(
      map(responses => {
        // Agar hech bo'lmasa bitta javob mavjud bo'lsa
        if (responses.uz || responses.ru || responses.en) {
          return {
            uz: responses.uz || responses.en || responses.ru || 'Noma\'lum manzil',
            ru: responses.ru || responses.en || responses.uz || 'Неизвестный адрес',
            en: responses.en || responses.ru || responses.uz || 'Unknown address'
          };
        }
        return null;
      }),
      catchError(error => {
        console.error('Multi-language geocoding xatoligi:', error);
        return of(null);
      })
    );
  }

  private getAddressInLanguage(lat: number, lon: number, language: string): Observable<string | null> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=${language},en`;

    return this.http.get<NominatimResponse>(url).pipe(
      map(response => {
        if (response && response.address) {
          // Shahar aniqlash (turli nomlarda bo'lishi mumkin)
          const city = response.address.city ||
            response.address.town ||
            response.address.village ||
            response.address.municipality || '';

          // Tuman aniqlash (turli nomlarda bo'lishi mumkin)
          const district = response.address.county ||
            response.address.district ||
            response.address.suburb ||
            response.address.neighbourhood ||
            response.address.quarter ||
            response.address.region ||
            response.address.state || '';

          // Shahar, Tuman formatida qaytarish
          if (city && district) {
            return `${city}, ${district}`;
          } else if (city) {
            return city;
          } else if (district) {
            return district;
          }
        }
        return null;
      }),
      catchError(error => {
        console.error(`${language} tilida manzil olishda xatolik:`, error);
        return of(null);
      })
    );
  }

  getFallbackAddress(coordinates: LocationCoordinates): MultiLanguageAddress {
    if (this.isInUzbekistan(coordinates)) {
      if (this.isInTashkent(coordinates)) {
        // Sizning koordinatalaringiz asosida Toshkent shahridagi tuman aniqlash
        const district = this.getTashkentDistrict(coordinates);
        return {
          uz: `Toshkent, ${district.uz}`,
          ru: `Ташкент, ${district.ru}`,
          en: `Tashkent, ${district.en}`
        };
      }
      return {
        uz: 'O\'zbekiston',
        ru: 'Узбекистан',
        en: 'Uzbekistan'
      };
    }

    return {
      uz: 'Noma\'lum manzil',
      ru: 'Неизвестный адрес',
      en: 'Unknown address'
    };
  }

  private isInUzbekistan(coordinates: LocationCoordinates): boolean {
    const { latitude, longitude } = coordinates;
    // O'zbekiston chegaralari (taxminiy)
    return latitude >= 37.2 && latitude <= 45.6 &&
      longitude >= 55.9 && longitude <= 73.2;
  }

  private isInTashkent(coordinates: LocationCoordinates): boolean {
    const { latitude, longitude } = coordinates;
    // Toshkent chegaralari (taxminiy)
    return latitude >= 41.1 && latitude <= 41.5 &&
      longitude >= 69.1 && longitude <= 69.4;
  }

  private getTashkentDistrict(coordinates: LocationCoordinates): {uz: string, ru: string, en: string} {
    const { latitude, longitude } = coordinates;

    // Sizning koordinatalaringiz: 41.37063854880367, 69.27561447135209
    // Bu taxminan Yunusobod tumani yaqinida

    // Toshkent tumanlarining taxminiy koordinatlari
    if (latitude >= 41.35 && latitude <= 41.38 && longitude >= 69.25 && longitude <= 69.30) {
      return {
        uz: 'Yunusobod tumani',
        ru: 'Юнусабадский район',
        en: 'Yunusabad district'
      };
    }

    if (latitude >= 41.30 && latitude <= 41.35 && longitude >= 69.23 && longitude <= 69.28) {
      return {
        uz: 'Chilonzor tumani',
        ru: 'Чиланзарский район',
        en: 'Chilanzar district'
      };
    }

    if (latitude >= 41.25 && latitude <= 41.32 && longitude >= 69.20 && longitude <= 69.25) {
      return {
        uz: 'Yakkasaroy tumani',
        ru: 'Яккасарайский район',
        en: 'Yakkasaray district'
      };
    }

    if (latitude >= 41.32 && latitude <= 41.37 && longitude >= 69.20 && longitude <= 69.25) {
      return {
        uz: 'Shayhontohur tumani',
        ru: 'Шайхантахурский район',
        en: 'Shaykhantaur district'
      };
    }

    if (latitude >= 41.28 && latitude <= 41.33 && longitude >= 69.25 && longitude <= 69.30) {
      return {
        uz: 'Mirzo Ulug\'bek tumani',
        ru: 'Мирзо-Улугбекский район',
        en: 'Mirzo Ulugbek district'
      };
    }

    if (latitude >= 41.33 && latitude <= 41.38 && longitude >= 69.30 && longitude <= 69.35) {
      return {
        uz: 'Mirobod tumani',
        ru: 'Мирабадский район',
        en: 'Mirobod district'
      };
    }

    if (latitude >= 41.28 && latitude <= 41.33 && longitude >= 69.15 && longitude <= 69.22) {
      return {
        uz: 'Olmazar tumani',
        ru: 'Алмазарский район',
        en: 'Almazar district'
      };
    }

    if (latitude >= 41.33 && latitude <= 41.40 && longitude >= 69.15 && longitude <= 69.22) {
      return {
        uz: 'Bektemir tumani',
        ru: 'Бектемирский район',
        en: 'Bektemir district'
      };
    }

    if (latitude >= 41.20 && latitude <= 41.28 && longitude >= 69.15 && longitude <= 69.25) {
      return {
        uz: 'Uchtepa tumani',
        ru: 'Учтепинский район',
        en: 'Uchtepa district'
      };
    }

    if (latitude >= 41.35 && latitude <= 41.42 && longitude >= 69.20 && longitude <= 69.28) {
      return {
        uz: 'Sergeli tumani',
        ru: 'Сергелийский район',
        en: 'Sergeli district'
      };
    }

    // Agar aniq tuman aniqlanmasa, umumiy Toshkent tumani
    return {
      uz: 'Toshkent tumani',
      ru: 'Ташкентский район',
      en: 'Tashkent district'
    };
  }
}
