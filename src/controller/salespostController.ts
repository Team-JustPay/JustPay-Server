import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { CreateSalespostDTO } from '../interfaces/salespost/createSalespostDTO';
import { SuggestCreateDTO } from '../interfaces/salespost/suggestCreateDTO';
import { salespostService } from '../service';

const salespostCreate = async (req: Request, res: Response) => {
  const { mainImage, certifications } = req.files as any;

  const image = mainImage[0];
  const { location } = image;
  const locations = certifications.map((file: { location: any }) => file.location);

  if (!location || !locations) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_IMAGE));
  }

  const { userId } = res.locals; // jwt로 userId얻기
  const salesPostCreateDTO: CreateSalespostDTO = req.body;

  const salespost = await salespostService.createSalespost(
    userId,
    location,
    locations,
    salesPostCreateDTO,
  );

  return res.status(201).json({ status: 201, message: '판매글 생성 성공', data: salespost });
};

const createSuggest = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { salespostId } = req.params;
  const suggestCreateDTO: SuggestCreateDTO = req.body;
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const location = image ? image.location : '';

  const data = await salespostService.createSuggest(
    userId,
    Number(salespostId),
    suggestCreateDTO,
    location,
  );

  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_SUGGEST_FAIL));
  }

  return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_SUGGEST_SUCCESS, data));
};
const salespostController = { createSuggest, salespostCreate };

export default salespostController;
