export interface ShippingInfoDTO {
  receiverName: string;
  address: string;
  cuStoreName: string;
  gsStoreName: string;
}

export interface UserInfoDTO {
  email: string;
  nickName: string;
  profileImageUrl: string;
  socialId: string;
  phoneNumber: string;
  accountNumber: string;
  dealCount: number;
  saleCount: number;
  saleMoney: number;
  purchaseCount: number;
  purchaseMoney: number;
  openChatUrl: string;
  twitterMessageUrl: string;
  shippingInfo: ShippingInfoDTO;
}
