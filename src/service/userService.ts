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

const userService = { getMysalespost, getUserInfo, getMyInfo };

export default userService;
