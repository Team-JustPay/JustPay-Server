export interface CreateSalespostDTO {
  productCount: string;
  salesOption: string;
  priceOption: string;
  price: string;
  certificationWord: string;
  description: string;
  shippingOptions: string | string[];
}
