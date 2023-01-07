export interface GetPurchaseListDTO {
  id: number;
  imageUrl: string;
  productCount: number;
  purchaseOption: string;
  price: number;
  description: string;
  status: number;
  suggester: { id: number; profileImageUrl: string };
  isMine?: boolean;
}
