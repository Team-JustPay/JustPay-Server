import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getMysalespost = async (userId: number, status: number) => {
  const data = await prisma.salesPost.findMany({
    where: {
      status: status,
      sellorId: userId,
    },
    select: {
      id: true,
      mainImageUrl: true,
      productCount: true,
      salesOption: true,
      priceOption: true,
      price: true,
      status: true,
    },
  });

  return data;
};

const getUserInfo = async (userId: number) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      profileImageUrl: true,
      socialId: true,
      dealCount: true,
      saleCount: true,
      saleMoney: true,
      purchaseCount: true,
      purchaseMoney: true,
      openChatUrl: true,
      twitterMessageUrl: true,
    },
  });
  return data;
};

const getMyInfo = async (userId: number) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      nickName: true,
      profileImageUrl: true,
      socialId: true,
      phoneNumber: true,
      accountNumber: true,
      dealCount: true,
      saleCount: true,
      saleMoney: true,
      purchaseCount: true,
      purchaseMoney: true,
      openChatUrl: true,
      twitterMessageUrl: true,
      shippingInfo: {
        select: {
          id: true,
          receiverName: true,
          address: true,
          cuStoreName: true,
          gsStoreName: true,
        },
      },
    },
  });
  return data;
};

const getMysuggests = async (userId: number, isPurchased: string) => {
  const statusArr = isPurchased === 'true' ? [3] : [0, 1, 2];
  const data = await prisma.purchaseSuggest.findMany({
    where: {
      suggesterId: userId,
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
        createdAt: 'desc',
      },
    ],
  });

  return data;
};

const userService = { getMysalespost, getUserInfo, getMyInfo, getMysuggests };

export default userService;
