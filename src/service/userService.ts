import { PrismaClient } from '@prisma/client';

import { ShippingInfoDTO, UserInfoDTO } from '../interfaces/user/userUpdateDTO';

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

const chageMyInfo = async (userId: number, userInfo: UserInfoDTO, shippingInfo: any) => {
  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      ...userInfo,
      shippingInfo: {
        update: {
          ...shippingInfo,
        },
      },
    },
  });
  return data;
};

const userService = { getMysalespost, getUserInfo, getMyInfo, chageMyInfo };

export default userService;
