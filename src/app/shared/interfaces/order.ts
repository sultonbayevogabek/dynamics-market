import { IFile } from '@shared/interfaces/file';

export interface IOrder {
  _id: string;
  orderCode: string;
  comment: string;
  status: string;
  items: Item[];
  itemsCount: number;
  createdAt: string;
}

export interface Item {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  thumbs: IFile[];
}

export type CustomerType = 'legal' | 'individual';

export type OrderStatus = 'new' | 'pendingReview' | 'cancelled' | 'contractSigned' | 'delivering' | 'completed';

export interface IOrderDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  orderCode: string;
  customerType: CustomerType;
  companyName: string;
  phone: string;
  status: OrderStatus;
  createdAt: string; // ISO date string
  items: Item[];
}
