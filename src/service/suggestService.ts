import { PrismaClient } from '@prisma/client';

import dateParser from '../modules/date';
const prisma = new PrismaClient();

const getShippingInfo = async (suggestId: number) => {
  const data = await prisma.purchaseSuggest.findUnique({
    where: {
      id: suggestId,
    },
    select: {
      price: true,
      shippingOption: {
        select: {
          name: true,
          price: true,
        },
      },
      suggester: {
        select: {
          id: true,
          nickName: true,
          profileImageUrl: true,
          phoneNumber: true,
          shippingInfo: {
            select: {
              receiverName: true,
              address: true,
              cuStoreName: true,
              gsStoreName: true,
            },
          },
        },
      },
    },
  });
  //   const {};
  //   data.totalPrice = data?.shippingOption.price;

  if (data?.price && data.shippingOption.price) {
    const totalPrice = data.price + data.shippingOption.price;
    const { price, ...dataWithoutPrice } = data;
    return {
      totalPrice: totalPrice,
      ...dataWithoutPrice,
    };
  }
};

const deleteSuggest = async (suggestId: number) => {
  const data = await prisma.purchaseSuggest.delete({
    where: {
      id: suggestId,
    },
  });

  return data;
};

const raisePrice = async (suggestId: number, price: number) => {
  const data = await prisma.purchaseSuggest.update({
    where: {
      id: suggestId,
    },
    data: {
      price,
    },
  });

  return data;
};

const updateInvoiceNumber = async (suggestId: number, invoiceNumber: string) => {
  const data = await prisma.purchaseSuggest.update({
    where: {
      id: suggestId,
    },
    data: {
      invoiceNumber,
    },
  });

  return data;
};

const updateStatus = async (suggestId: number, status: number) => {
  const data = await prisma.purchaseSuggest.update({
    where: {
      id: suggestId,
    },
    data: {
      status,
    },
  });

  return data;
};

const updateStatusInvoice = async (
  suggestId: number,
  userId: number,
  status: number,
  invoiceDeadline: number,
) => {
  if (status === 1) {
    const suggestInfo = await prisma.purchaseSuggest.findUnique({
      where: {
        id: suggestId,
      },
      select: {
        suggesterId: true,
        productCount: true,
        price: true,
      },
    });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        dealCount: {
          increment: suggestInfo?.productCount,
        },
        saleCount: {
          increment: suggestInfo?.productCount,
        },
        saleMoney: {
          increment: suggestInfo?.price,
        },
      },
    });

    await prisma.user.update({
      where: {
        id: suggestInfo?.suggesterId,
      },
      data: {
        dealCount: {
          increment: suggestInfo?.productCount,
        },
        purchaseCount: {
          increment: suggestInfo?.productCount,
        },
        purchaseMoney: {
          increment: suggestInfo?.price,
        },
      },
    });
  }

  const invoiceDate = new Date();
  invoiceDate.setDate(invoiceDate.getDate() + invoiceDeadline);

  const data = await prisma.purchaseSuggest.update({
    where: {
      id: suggestId,
    },
    data: {
      status,
      invoiceDeadline: invoiceDate,
    },
  });
  return data;
};

const getSuggestPaymentInfo = async (suggestId: number) => {
  const data = await prisma.purchaseSuggest.findUnique({
    where: {
      id: suggestId,
    },
    select: {
      id: true,
      imageUrl: true,
      price: true,
      description: true,
      status: true,
      invoiceDeadline: true,
      suggester: {
        select: {
          phoneNumber: true,
          shippingInfo: {
            select: {
              receiverName: true,
              address: true,
              cuStoreName: true,
              gsStoreName: true,
            },
          },
        },
      },
      shippingOption: {
        select: {
          name: true,
          price: true,
        },
      },
    },
  });

  if (data?.price && data.shippingOption.price) {
    const totalPrice = data.price + data.shippingOption.price;
    const { invoiceDeadline, ...dataWithoutDeadline } = data;

    const parsedDeadline = invoiceDeadline ? dateParser(invoiceDeadline) : null;

    return {
      ...dataWithoutDeadline,
      totalPrice,
      invoiceDeadline: parsedDeadline,
    };
  }
};

const getSuggestDetail = async (suggestId: number, userId: number) => {
  const suggestInfo = await prisma.purchaseSuggest.findUnique({
    where: {
      id: suggestId,
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
          socialId: true,
          nickName: true,
        },
      },
      shippingOption: {
        select: {
          name: true,
        },
      },
    },
  });

  const data = {
    ...suggestInfo,
    isMine: userId === suggestInfo?.suggester.id,
    shippingOption: suggestInfo?.shippingOption.name,
  };

  return data;
};

const suggestService = {
  getShippingInfo,
  deleteSuggest,
  raisePrice,
  updateInvoiceNumber,
  updateStatus,
  updateStatusInvoice,
  getSuggestPaymentInfo,
  getSuggestDetail,
};

export default suggestService;
