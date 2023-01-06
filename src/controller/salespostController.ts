import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { SuggestCreateDTO } from '../interfaces/salespost/suggestCreateDTO';
import { salespostService } from '../service';

const createSuggest = async (req: Request, res: Response) => {
  const { salespostId } = req.params;
  const { userId } = res.locals;
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

const createCertificationWord = async (req: Request, res: Response) => {
  const data = await salespostService.createCertificationWord();
  return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_SUGGEST_SUCCESS, data));
};

const salespostController = { createSuggest, createCertificationWord };

export default salespostController;
