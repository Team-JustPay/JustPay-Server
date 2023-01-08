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

const suggestService = {
  getShippingInfo,
  deleteSuggest,
  raisePrice,
  updateInvoiceNumber,
  getSuggestPaymentInfo,
};

export default suggestService;
