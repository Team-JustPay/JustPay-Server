import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getShippingOptionId = async (name: string) => {
  const data = await prisma.shippingOption.findUnique({
    where: {
      name: name,
    },
  });
  if (data) {
    return data.id;
  }
};

export default getShippingOptionId;
