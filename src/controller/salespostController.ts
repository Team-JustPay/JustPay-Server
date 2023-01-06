import { create } from 'domain';

import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { SalesPostCreateDTO } from '../interfaces/salespost/salespostcreateDTO';
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
  const salesPostCreateDTO: SalesPostCreateDTO = req.body;

  const salespost = await salespostService.createSalespost(
    userId,
    location,
    locations,
    salesPostCreateDTO,
  );

  return res.status(201).json({ status: 201, message: '판매글 생성 성공', data: salespost });
};

const salespostController = { salespostCreate };

export default salespostController;
