import { IFile } from '@shared/interfaces/file';

export interface IBanner {
  _id: string
  title: string;
  text: string;
  images: IFile[]
  hierarchy: Hierarchy[]
  product: Product
  brandIds: string[]
  brandSlugs: string[]
  type: string
  status: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

interface Hierarchy {
  categoryId: string
  categorySlug: string
}

interface Product {
  _id: string;
  slug: string;
  slugRu: string;
  slugEn: string;
  slugUz: string;
}
