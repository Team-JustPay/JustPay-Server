import { Request, Response } from 'express';

import { rm, sc } from '../interfaces/common';
import { fail, success } from '../interfaces/common/response';
import { imageService } from '../service';

//* 이미지 업로드API
const uploadImage = async (req: Request, res: Response) => {
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { location } = image;

  if (!location) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_IMAGE));
  }

  const data = await imageService.uploadImage(location);

  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_IMAGE_FAIL));
  }

  return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_IMAGE_SUCCESS, data));
};

const imageController = {
  uploadImage,
};

export default imageController;
