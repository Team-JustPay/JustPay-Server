import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { suggestService } from '../service';

const getShippingInfo = async (req: Request, res: Response) => {
  const { suggestId } = req.params;
  const data = await suggestService.getShippingInfo(+suggestId);
  return res.status(sc.OK).send(success(sc.OK, rm.GET_SHIPPING_INFO, data));
};

const deleteSuggest = async (req: Request, res: Response) => {
  const { suggestId } = req.params;

  if (!suggestId) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.DELETE_SUGGEST_FAIL));
  }
  const data = await suggestService.deleteSuggest(+suggestId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.DELETE_SUGGEST_FAIL));
  }

  return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.DELETE_SUGGEST_SUCCESS));
};

const suggestController = {
  getShippingInfo,
  deleteSuggest,
};

export default suggestController;
