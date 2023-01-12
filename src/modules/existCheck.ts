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

const checksalesPostExist = async (salespostId: number) => {
  const num = await prisma.salesPost.count({
    where: {
      id: salespostId,
    },
  });

  const isExist = num > 0 ? true : false;

  return isExist;
};

const checkUserExist = async (userId: number) => {
  const num = await prisma.user.count({
    where: {
      id: userId,
    },
  });

  const isExist = num > 0 ? true : false;

  return isExist;
};

export default { checkSuggestExist, checksalesPostExist, checkUserExist };
