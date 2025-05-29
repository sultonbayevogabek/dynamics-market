import { IFile } from '@shared/interfaces/file';

export interface Brand {
  id: number;
  name: string;
  slug: string;
  image: string;

  _id?: string;
  nameUz?: string;
  nameRu?: string;
  nameEn?: string;
  slugUz?: string;
  slugRu?: string;
  slugEn?: string;
  website?: string;
  logo?: IFile;
  status?: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  isPopular?: boolean;
  current?: boolean;
  __v?: number;
}
