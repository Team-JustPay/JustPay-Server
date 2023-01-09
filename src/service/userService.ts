import { PrismaClient } from '@prisma/client';

import { UserInfoDTO } from '../interfaces/user/userUpdateDTO';
import dateParserInNotification from '../modules/dateNotification';

import { getNotificationType } from './../constants/notification';

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
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
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
      nickName: true,
    },
  });
  return data;
};

const getMyInfo = async (userId: number, addressSplit: string) => {
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
      depositorName: true,
      bankName: true,
      shippingInfo: {
        select: {
          receiverName: true,
          zipCode: true,
          address: true,
          detailAddress: true,
          cuStoreName: true,
          gsStoreName: true,
        },
      },
    },
  });

  if (addressSplit === 'false' && data?.shippingInfo) {
    const { shippingInfo, ...dataWithoutShippingInfo } = data;
    const newAddress =
      '(' +
      shippingInfo?.zipCode +
      ') ' +
      shippingInfo?.address +
      ' ' +
      shippingInfo?.detailAddress;

    const { zipCode, detailAddress, ...newShippingInfo } = shippingInfo;
    newShippingInfo.address = newAddress;
    return { ...dataWithoutShippingInfo, shippingInfo: newShippingInfo };
  }

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

const getMyNotifications = async (userId: number) => {
  const notificationsList = await prisma.notification.findMany({
    where: {
      userId,
    },
    select: {
      message: true,
      createdAt: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  const data = notificationsList.map((notification) => {
    return {
      ...notification,
      createdAt: dateParserInNotification(notification.createdAt),
      notificationType: getNotificationType(notification.message),
    };
  });

  return data;
};

const userService = {
  getMysalespost,
  getUserInfo,
  getMyInfo,
  getMysuggests,
  chageMyInfo,
  getMyNotifications,
};

export default userService;
