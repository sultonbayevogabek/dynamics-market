import { Brand } from './brand';
import { Category } from './category';
import { CustomFields } from './custom-fields';

export interface ProductFeature {
  name: string;
  value: string;
}

export interface ProductFeaturesSection {
  name: string;
  features: ProductFeature[];
}


export interface ProductAttributeValue {
  name: string;
  slug: string;
  customFields: CustomFields;
}

export interface ProductAttribute {
  name: string;
  value: string;
  slug: string;
  featured: boolean;
  values: ProductAttributeValue[];
  customFields: CustomFields;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  sku: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  badges: string[];
  rating: number;
  reviews: number;
  availability: string;
  brand: Brand | null;
  categories: Category[];
  attributes: ProductAttribute[];
  customFields: CustomFields;
}

export interface IProduct {
  _id: string
  sku: string
  oldPrice: number
  currentPrice: number
  quantity: number
  categoryId: string
  brandId: string
  images: Image[]
  status: number
  hierarchyPath: string[]
  views: number
  inStock: boolean
  name: string
  description: string
  slug: string
  attributesx: Attribute[]
  hierarchy: Hierarchy[]

  id: number;
  price: number;
  compareAtPrice: number | null;
  badges: string[];
  rating: number;
  reviews: number;
  availability: 'out_of_stock' | 'in_stock' | 'on_demand';
  brand: Brand | null;
  categories: Category[];
  attributes: ProductAttribute[];
  customFields: CustomFields;
}

export interface Image {
  fieldname: string
  originalname: string
  encoding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
  extension: string
}

export interface Attribute {
  name: string
  value: string
}

export interface Hierarchy {
  categoryId: string
  categorySlug: string
  categoryName: string
}
