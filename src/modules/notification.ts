import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createNotification = async (userId: number, message: string) => {
  const data = await prisma.notification.create({
    data: {
      userId: userId,
      message: message,
    },
  });
  return data;
};

export default createNotification;
