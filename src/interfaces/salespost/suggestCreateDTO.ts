export interface SuggestCreateDTO {
  price: number;
  purchaseOption: 'BULK' | 'PARTIAL';
  productCount: number;
  description: string;
  shippingOption: string;
}
