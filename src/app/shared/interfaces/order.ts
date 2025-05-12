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
}
