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

  await prisma.shippingInfo.create({
    data: {
      userId: testUser.id,
    },
  });

  return testUser;
};

const deleteTestUser = async (userId: number) => {
  const testUser = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return testUser;
};

const deleteTestSalesPost = async (salespostId: number) => {
  await prisma.salesPost.delete({
    where: {
      id: salespostId,
    },
  });
};

module.exports = { createTestUser, deleteTestUser, deleteTestSalesPost };
