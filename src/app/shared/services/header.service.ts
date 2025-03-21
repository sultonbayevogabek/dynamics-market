import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { NavigationLink } from '@shared/interfaces/navigation-link';
import { RequestService } from '@shared/services/request.service';
import { ICategory } from '@shared/interfaces/category';
import { MegamenuColumn } from '@shared/interfaces/megamenu-column';
import { NestedLink } from '@shared/interfaces/nested-link';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

export type NavPanelPosition = 'static' | 'sticky';

export type NavPanelVisibility = 'hidden' | 'shown';

export interface ILocalCategory {
  data: ICategory[];
  time: number;
  language: string
};

@Injectable({
  providedIn: 'root'
})
export class HeaderService extends RequestService {
  departments$ = new BehaviorSubject<NavigationLink[]>([]);

  private departmentsAreaValue: HTMLElement | null = null;
  private departmentsAreaSubject: BehaviorSubject<HTMLElement | null> = new BehaviorSubject<HTMLElement | null>(null);

  constructor(
    private translateService: TranslateService,
    http: HttpClient
  ) {
    super(http);
  }

  get departmentsArea(): HTMLElement | null {
    return this.departmentsAreaValue;
  }

  set departmentsArea(value: HTMLElement | null) {
    if (this.departmentsAreaValue !== value) {
      this.departmentsAreaValue = value;
      this.departmentsAreaSubject.next(value);
    }
  }

  departmentsArea$: Observable<HTMLElement | null> = this.departmentsAreaSubject.asObservable();


  private navPanelPositionValue: NavPanelPosition = 'static';
  private navPanelPositionSubject: BehaviorSubject<NavPanelPosition | null> = new BehaviorSubject<NavPanelPosition | null>(null);

  get navPanelPosition(): NavPanelPosition {
    return this.navPanelPositionValue;
  }

  set navPanelPosition(value: NavPanelPosition) {
    if (this.navPanelPositionValue !== value) {
      this.navPanelPositionValue = value;
      this.navPanelPositionSubject.next(value);
    }
  }

  navPanelPositionState$: Observable<NavPanelPosition | null> = this.navPanelPositionSubject.asObservable();


  private navPanelVisibilityValue: NavPanelVisibility = 'hidden';
  private navPanelVisibilitySubject: BehaviorSubject<NavPanelVisibility | null> = new BehaviorSubject<NavPanelVisibility | null>(null);

  get navPanelVisibility(): NavPanelVisibility {
    return this.navPanelVisibilityValue;
  }

  set navPanelVisibility(value: NavPanelVisibility) {
    if (this.navPanelVisibilityValue !== value) {
      this.navPanelVisibilityValue = value;
      this.navPanelVisibilitySubject.next(value);
    }
  }

  navPanelVisibility$: Observable<NavPanelVisibility | null> = this.navPanelVisibilitySubject.asObservable();

  async getCategoriesFromServer(): Promise<ICategory[]> {
    const response = await firstValueFrom(
      this.request<{ data: ICategory[] }>('category/front/get-list')
    );

    localStorage.setItem('categories', JSON.stringify({
      data: response.data,
      language: this.translateService.currentLang,
      time: new Date().getTime(),
    }));

    return response.data;
  }

  async setCategories() {
    let categories: ICategory[] = [];
    const currentLang = this.translateService.currentLang;

    if (localStorage.getItem('categories')) {
      const localCategories: ILocalCategory = JSON.parse(localStorage.getItem('categories')!);
      if ((new Date().getTime() - localCategories.time) / 60000 < 60 && localCategories.language === currentLang) {
        categories = localCategories.data;
      } else {
        categories = await this.getCategoriesFromServer();
      }
    } else {
      categories = await this.getCategoriesFromServer();
    }

    const departments: NavigationLink[] = [];
    categories.forEach(category => {
      const department: NavigationLink = {
        label: category.name,
        url: `/products?category=${ category.slug }`
      };

      let size: 'sm' | 'xl' | 'lg' | 'nl' = 'sm';
      let columnsCount = 1;

      if (category.children.length >= 5) {
        size = 'xl';
        columnsCount = 4;
      }

      if (category.children.length === 4) {
        size = 'lg';
        columnsCount = 3;
      }

      if (category.children.length === 3) {
        size = 'nl';
        columnsCount = 2;
      }

      const columns: MegamenuColumn[] = [];

      for (let i = 0; i < columnsCount; i++) {
        const column = {
          size: 12 / columnsCount,
          items: []
        };

        columns.push(column);
      }

      category.children.forEach((category, index) => {
        const i = index % columnsCount;
        columns[i].items.push(this.transformCategory(category));
      });

      department.menu = {
        type: 'megamenu',
        size: size,
        columns: columns
      };


      departments.push(department);
      this.departments$.next(departments);
    });
  }

  transformCategory(category: ICategory): NestedLink {
    return {
      label: category.name,
      url: category.slug,
      items: category.children?.map(c => this.transformCategory(c)) || []
    };
  }
}
