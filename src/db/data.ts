import { SuggestCreateDTO } from '../interfaces/salespost/suggestCreateDTO';
import { UserInfoDTO } from '../interfaces/user/userUpdateDTO';

import { CreateSalespostDTO } from './../interfaces/salespost/createSalespostDTO';

const suggest: SuggestCreateDTO = {
  price: 20000,
  purchaseOption: 'BULK',
  productCount: 5,
  description: '테스트용 제시글',
  shippingOption: 'GS택배',
};

const userInfo: UserInfoDTO = {
  email: 'xxxxx@gmail.com',
  nickName: '호호',
  profileImageUrl: '<url>',
  socialId: '<social_id>',
  phoneNumber: '010-2925-9585',
  accountNumber: '우리 2223234-234234-232',
  dealCount: 4,
  saleCount: 6,
  saleMoney: 40000,
  purchaseCount: 5,
  purchaseMoney: 50000,
  openChatUrl: '<url>',
  bankName: '카카오뱅크',
  depositorName: '전희선',
  twitterMessageUrl: '<url>',
  shippingInfo: {
    receiverName: '고은비',
    zipCode: '23423',
    address: '서울시 마포구 ...',
    detailAddress: '서울역',
    cuStoreName: '마포 CU점',
    gsStoreName: '종로 gs점',
  },
};

const salesPost: CreateSalespostDTO = {
  productCount: '4',
  salesOption: 'BULK',
  priceOption: 'PRICE_OFFER',
  price: '10000',
  certificationWord: '테스트',
  description: '테스트',
  shippingOptions: ['CU택배', 'GS택배'],
};

module.exports = { suggest, userInfo, salesPost };
