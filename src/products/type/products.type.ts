export interface IQuantity {
    colorId: string;
    colorCode: string;
    colorName: string;
    sizeId: string;
    sizeName: string;
    quantity: number;
  }

  export interface Paging<T> {
    content: T[];
    pageable: {
      page: number;
      size: number;
      total: number;
    };
  }
  