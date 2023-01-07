import { shippingContentsType } from '../interfaces/type/shippingInfo';

export const shippingContents: shippingContentsType = {
  반값택배: ['3-5일 소요'],
  끼리택배: ['4-6일 소요'],
  일반우편: ['3-4일 소요', '분실위험'],
  준등기: ['2-3일 소요'],
  우체국택배: ['다음날 배송', '등기소포'],
};
