import { CustomFields } from './custom-fields';

export interface Category {
  id: number;
  type: 'shop' | 'blog';
  name: string;
  slug: string;
  path: string;
  image: string | null;
  items: number;
  customFields: CustomFields;
  parents?: Category[] | null;
  children?: Category[] | null;
}

export interface ICategory {
  _id: string;
  parentId?: string;
  name: string;
  slug: string;
  slugUz: string;
  slugRu: string;
  slugEn: string;
  children: ICategory[];
  showChildren?: boolean;
  hidden?: boolean;
}
