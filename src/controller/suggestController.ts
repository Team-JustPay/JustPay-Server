import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { suggestService } from '../service';

const getShippingInfo = async (req: Request, res: Response) => {
  const { suggestId } = req.params;
  const data = await suggestService.getShippingInfo(+suggestId);
  return res.status(sc.OK).send(success(sc.OK, rm.GET_SHIPPING_INFO, data));
};

const suggestController = {
  getShippingInfo,
};

export default suggestController;
