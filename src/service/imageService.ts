import { PrismaClient } from '@prisma/client';

import { ImageCreateResponseDTO } from '../interfaces/image/imageCreateResponseDTO';

const prisma = new PrismaClient();

//* 이미지 업로드
const uploadImage = async (location: string): Promise<ImageCreateResponseDTO> => {
  const data = await prisma.image.create({
    data: {
      image: location,
    },
  });

  const result: ImageCreateResponseDTO = {
    id: data.id,
    image: data.image as string,
  };

  return result;
};

const imageService = {
  uploadImage,
};

export default imageService;
