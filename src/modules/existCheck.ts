import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkSuggestExist = async (suggestId: number) => {
  const num = await prisma.purchaseSuggest.count({
    where: {
      id: suggestId,
    },
  });

  const isExist = num > 0 ? true : false;

  return isExist;
};

const salesPostExist = async (salespostId: number) => {
  const num = await prisma.salesPost.count({
    where: {
      id: salespostId,
    },
  });

  const isExist = num > 0 ? true : false;

  return isExist;
};

export default { checkSuggestExist, salesPostExist };
