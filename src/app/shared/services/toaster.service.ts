import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})

export class ToasterService {
  constructor(
    private translateService: TranslateService,
    private toaster: ToastrService
  ) {
  }

  getTranslations(message: string, title: string = ''): Observable<{ [key: string]: string }> {
    return this.translateService.get([ message, title ]);
  }

  async toast(type: 'success' | 'error' | 'warning' | 'info', message: string, title?: string) {
    const translations = await firstValueFrom(this.getTranslations(message, title));
    this.toaster[type](translations[message], title ? translations[title] : '');
  }

  async success(message: string, title?: string): Promise<void> {
    await this.toast('success', message, title);
  }

  async warning(message: string, title?: string): Promise<void> {
    await this.toast('warning', message, title);
  }

  async error(message: string, title?: string): Promise<void> {
    await this.toast('error', message, title);
  }

  async info(message: string, title?: string): Promise<void> {
    await this.toast('info', message, title);
  }
}
