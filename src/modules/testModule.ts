import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTestUser = async () => {
  const testUser = await prisma.user.create({
    data: {
      email: 'test@naver.com',
      nickName: '테스트',
      password: 'test',
      profileImageUrl: 'test',
      socialId: 'test',
    },
  });

  const shippingInfo = await prisma.shippingInfo.create({
    data: {
      userId: testUser.id,
    },
  });

  return testUser;
};

const deleteTestUser = async (userId: number) => {
  await prisma.shippingInfo.delete({
    where: {
      userId: userId,
    },
  });

  const testUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return testUser;
};

module.exports = { createTestUser, deleteTestUser };
