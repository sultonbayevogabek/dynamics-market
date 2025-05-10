import { IProduct } from '@shared/interfaces/product';

export interface ICartItem  {
  _id: string;
  userId: string;
  quantity: number;
  product: IProduct;
  removing?: boolean;
  updating?: boolean;
}
