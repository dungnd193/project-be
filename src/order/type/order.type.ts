export interface IOrderItem {
  id: string;
  colorId: string;
  sizeId: string;
  name: string;
  pirce: number;
  nameUrlImg: string[];
  quantity: number;
}

export enum EOrderStatus {
  NEW_ORDER = 'NEW_ORDER',
  DELIVERING = 'DELIVERING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}
