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
  _id: string
  nameUz: string
  nameRu: string
  nameEn: string
  slugUz: string
  slugRu: string
  slugEn: string
  parentId: any
  isDeleted: boolean
  images: any
  hierarchyPath: string[]
  status: number
  createdAt: string
  updatedAt: string
}
