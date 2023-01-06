import { PrismaClient } from '@prisma/client';

import { SalesPostCreateDTO } from '../interfaces/salespost/salespostcreateDTO';
import getShippingOptionId from '../modules/shippingOption';
import { SuggestCreateDTO } from '../interfaces/salespost/suggestCreateDTO';

const prisma = new PrismaClient();

const createSalespost = async (
  userId: number,
  location: string,
  locations: string[],
  salesPostCreateDTO: SalesPostCreateDTO,
) => {
  const shippingOptions = JSON.parse(salesPostCreateDTO.shippingOptions);

  const shippingOptionIds = [];
  for (const option of shippingOptions) {
    const optionId = await getShippingOptionId(option);
    shippingOptionIds.push({ id: optionId });
  }

  const certificationIds = [];
  for (const location of locations) {
    certificationIds.push({ imageUrl: location });
  }

  const salespost = await prisma.salesPost.create({
    data: {
      mainImageUrl: location,
      sellorId: userId,
      productCount: parseInt(salesPostCreateDTO.productCount),
      salesOption: salesPostCreateDTO.salesOption,
      priceOption: salesPostCreateDTO.priceOption,
      price: parseInt(salesPostCreateDTO.price),
      certificationWord: salesPostCreateDTO.certificationWord,
      description: salesPostCreateDTO.description,
      ShippingOptions: {
        connect: shippingOptionIds,
      },
      certifications: {
        createMany: {
          data: certificationIds,
        },
      },
    },
  });

  return salespost;
};

const salespostService = {
  createSalespost,
};

export default salespostService;

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

const salespostService = { createSuggest };

export default salespostService;
