import { PrismaClient } from '@prisma/client';

import { wordList } from '../constants/wordList';
import { SuggestCreateDTO } from '../interfaces/salespost/suggestCreateDTO';
import getShippingOptionId from '../modules/shippingOption';
const prisma = new PrismaClient();

const createSuggest = async (
  userId: number,
  salespostId: number,
  suggestCreateDTO: SuggestCreateDTO,
  location: string,
) => {
  const suggest = {
    imageUrl: location,
    price: Number(suggestCreateDTO.price),
    purchaseOption: suggestCreateDTO.purchaseOption || 'BULK',
    productCount: Number(suggestCreateDTO.productCount),
    description: suggestCreateDTO.description,
    salesPostId: salespostId,
    suggesterId: userId,
    shippingOptionId: (await getShippingOptionId(suggestCreateDTO.shippingOption)) || 0,
  };

  if (suggest.imageUrl === '') {
    const salesPost = await prisma.salesPost.findUnique({
      where: {
        id: salespostId,
      },
    });
    suggest.imageUrl = salesPost?.mainImageUrl || '';
  }

  const data = await prisma.purchaseSuggest.create({
    data: suggest,
  });

  return data;
};

const createCertificationWord = async () => {
  const randomWord = Array.from(Array(2), () => wordList[Math.floor(Math.random() * 40)]);
  const randomNumber = Array.from(Array(4), () => Math.floor(Math.random() * 10));

  const certificationWord = randomWord.join('') + randomNumber.join('');

  const data = {
    certificationWord,
  };

  return data;
};
const salespostService = { createSuggest, createCertificationWord };

export default salespostService;
