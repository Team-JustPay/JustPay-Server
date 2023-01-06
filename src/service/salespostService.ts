import { PrismaClient } from '@prisma/client';

import { SalesPostCreateDTO } from '../interfaces/salespost/salespostcreateDTO';
const prisma = new PrismaClient();

const createSalespost = async (
  userId: number,
  location: string,
  salesPostCreateDTO: SalesPostCreateDTO,
) => {
  console.log(userId);
  console.log(location);
  console.log(salesPostCreateDTO);
  const salespost = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return salespost;
};

const SalespostService = {
  createSalespost,
};

export default SalespostService;
