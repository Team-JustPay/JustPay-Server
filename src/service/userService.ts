import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//* userId로 유저 조회
const getUserById = () => {
    
}

const userService = {
  getUserById,
};

export default userService;