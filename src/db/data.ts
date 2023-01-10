import { SuggestCreateDTO } from '../interfaces/salespost/suggestCreateDTO';

const suggest: SuggestCreateDTO = {
  price: 20000,
  purchaseOption: 'BULK',
  productCount: 5,
  description: '테스트용 제시글',
  shippingOption: 'GS택배',
};

module.exports = { suggest };
