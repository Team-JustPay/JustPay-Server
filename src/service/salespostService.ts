import { PrismaClient } from '@prisma/client';

import { shippingContents } from '../constants/shippingInfo';
import { wordList } from '../constants/wordList';
import { CreateSalespostDTO } from '../interfaces/salespost/createSalespostDTO';
import { GetPurchaseListDTO } from '../interfaces/salespost/getPurchaseListDTO';
import { SuggestCreateDTO } from '../interfaces/salespost/suggestCreateDTO';
import dateParser from '../modules/date';
import getShippingOptionId from '../modules/shippingOption';

const prisma = new PrismaClient();

const createSalespost = async (
  userId: number,
  location: string,
  locations: string[],
  salesPostCreateDTO: CreateSalespostDTO,
) => {
  const shippingOptions = salesPostCreateDTO.shippingOptions;

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

const getCertifications = async (salespostId: number) => {
  // salespostId가 없을때 404처리 필요
  const data = await prisma.salesPost.findUnique({
    where: {
      id: salespostId,
    },
    select: {
      certificationWord: true,
      certifications: {
        select: {
          imageUrl: true,
        },
      },
    },
  });

  const imagesUrls = data?.certifications.map((x) => x.imageUrl);
  return {
    certificationWord: data?.certificationWord,
    imagesUrls: imagesUrls,
  };
};

const statusChange = async (salespostId: number, status: number) => {
  // salespostId가 없을때 404처리 필요
  // 판매자일때만 상태변경할 수 있도록 권한 체크 필요
  const data = await prisma.salesPost.update({
    where: {
      id: salespostId,
    },
    data: {
      status: status,
    },
  });

  return data;
};

const getPurchaseList = async (userId: number, salespostId: number, isMatched: string) => {
  const statusArr = isMatched === 'true' ? [1, 2, 3] : [0];
  const suggestList: GetPurchaseListDTO[] = await prisma.purchaseSuggest.findMany({
    where: {
      salesPostId: salespostId,
      status: {
        in: statusArr,
      },
    },
    select: {
      id: true,
      imageUrl: true,
      productCount: true,
      purchaseOption: true,
      price: true,
      description: true,
      status: true,
      suggester: {
        select: {
          id: true,
          profileImageUrl: true,
        },
      },
    },
    orderBy: [
      {
        price: 'desc',
      },
      {
        createdAt: 'desc',
      },
    ],
  });

  const data = suggestList.map((suggest) => {
    return { ...suggest, isMine: userId === suggest.suggester.id };
  });
  return data;
};

const getOneSalespost = async (salespostId: number, userId: number) => {
  const data = await prisma.salesPost.findUnique({
    where: {
      id: salespostId,
    },
    select: {
      id: true,
      mainImageUrl: true,
      productCount: true,
      salesOption: true,
      priceOption: true,
      price: true,
      certificationWord: true,
      description: true,
      status: true,
      createdAt: true,
      ShippingOptions: {
        select: {
          name: true,
          price: true,
        },
      },
      sellor: {
        select: {
          id: true,
          socialId: true,
          nickName: true,
          profileImageUrl: true,
        },
      },
      purchaseSuggests: {
        select: {
          price: true,
        },
      },
    },
  });

  const isMine = data?.sellor.id === userId;
  const highestPrice = data?.purchaseSuggests
    ? Math.max(...data.purchaseSuggests.map((x) => x.price))
    : null;

  const parsedShippingOptions = data?.ShippingOptions.map((x) => {
    return { ...x, contents: shippingContents[x.name] };
  });

  const { purchaseSuggests, ShippingOptions, ...dataWithtoutSuggests } = data as any;
  return {
    ...dataWithtoutSuggests,
    isMine,
    highestPrice,
    ShippingOptions: parsedShippingOptions,
    createdAt: dateParser(dataWithtoutSuggests.createdAt),
  };
};

const salespostService = {
  createSuggest,
  createSalespost,
  createCertificationWord,
  getCertifications,
  statusChange,
  getPurchaseList,
  getOneSalespost,
};

export default salespostService;
