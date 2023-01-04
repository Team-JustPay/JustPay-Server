import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { sc } from '../interfaces/common';
import { UserSignInDTO } from '../interfaces/common/UserSignInDTO';
import { UserCreateDTO } from '../interfaces/common/userCreateDTO';
const prisma = new PrismaClient();

//* userId로 유저 조회
const getUserById = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

const searchUserByName = async (keyword: string, option: string) => {
  if (option === 'desc') {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: keyword,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return data;
  } else if (option === 'asc') {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: keyword,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    return data;
  } else if (option === 'userDesc') {
    const data = await prisma.user.findMany({
      where: {
        userName: {
          contains: keyword,
        },
      },
      orderBy: {
        userName: 'desc',
      },
    });
    return data;
  }
};

//* 유저 생성
// const createUser = async (name: string, email: string, age: number) => {
//   const user = await prisma.user.create({
//     data: {
//       userName: name,
//       email,
//       age,
//     },
//   });
//   return user;
// };

//* 유저 생성
const createUser = async (userCreateDto: UserCreateDTO) => {
  // ? 넘겨받은 password를 bcrypt의 도움을 받아 암호화
  const salt = await bcrypt.genSalt(10); // ^ 매우 작은 임의의 랜덤 텍스트 salt
  const password = await bcrypt.hash(userCreateDto.password, salt); // ^ 위에서 랜덤을 생성한 salt를 이용해 암호화

  const data = await prisma.user.create({
    data: {
      userName: userCreateDto?.name,
      age: userCreateDto?.age,
      email: userCreateDto.email,
      password,
    },
  });

  return data;
};

//* 전체 유저 조회
const getAllUser = async (page: number, limit: number) => {
  const data = await prisma.user.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });
  return data;
};

//* 유저 정보 업데이트
const updateUser = async (userId: number, name: string) => {
  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      userName: name,
    },
  });
};

//* 유저 정보 삭제
const deleteUser = async (userId: number) => {
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

//* 로그인
const signIn = async (userSignInDto: UserSignInDTO) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: userSignInDto.email,
      },
    });
    if (!user) return null;

    // ? bcrypt가 DB에 저장된 기존 password와 넘겨 받은 password를 대조하고,
    // ? match false시 401을 리턴
    const isMatch = await bcrypt.compare(userSignInDto.password, user.password);
    if (!isMatch) return sc.UNAUTHORIZED;

    return user.id;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const userService = {
  getUserById,
  searchUserByName,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  signIn,
};

export default userService;
