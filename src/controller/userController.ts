import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import existCheck from '../modules/existCheck';
import { userService } from '../service';

const getUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const userExist = await existCheck.checkUserExist(+userId);
  if (!userExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.USER_ID_NOT_EXIST));
  }

  const data = await userService.getUserInfo(+userId);
  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.USER_INFO_GET_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.USER_INFO_GET_SUCCESS, data));
};

const getMysalespost = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { isSaled } = req.query;

  if (isSaled !== 'true' && isSaled !== 'false') {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.PARAM_TRUE_FALSE_UNVALID));
  }

  const status = isSaled === 'true' ? 1 : 0; // 1이 판매종료

  const data = await userService.getMysalespost(userId, status);
  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SALESPOST_GET_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.SALESPOST_GET_SUCCESS, data));
};

const geyMyInfo = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { addressSplit } = req.query;

  if (addressSplit !== 'true' && addressSplit !== 'false') {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.PARAM_TRUE_FALSE_UNVALID));
  }

  const data = await userService.getMyInfo(+userId, addressSplit as string);
  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.USER_INFO_GET_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.USER_INFO_GET_SUCCESS, data));
};

const chageMyInfo = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { shippingInfo, ...userInfo } = req.body;
  if (!shippingInfo) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SHIPPING_INFO_NOT_EXIST));
  }

  const data = await userService.chageMyInfo(+userId, userInfo, shippingInfo);
  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.USER_INFO_CHANGE_FAIL));
  }

  return res.status(sc.NO_CONTENT).send();
};

const getMysuggests = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { isPurchased } = req.query;

  if (isPurchased !== 'true' && isPurchased !== 'false') {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.PARAM_TRUE_FALSE_UNVALID));
  }

  const data = await userService.getMysuggests(userId, isPurchased as string);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_MY_SUGGEST_LIST_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.GET_MY_SUGGEST_LIST_SUCCESS, data));
};

const getMyNotifications = async (req: Request, res: Response) => {
  const { userId } = res.locals;

  const data = await userService.getMyNotifications(userId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_NOTIFICATIONS_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.GET_NOTIFICATIONS_SUCCESS, data));
};

const userController = {
  getMysalespost,
  getUserInfo,
  geyMyInfo,
  chageMyInfo,
  getMysuggests,
  getMyNotifications,
};

export default userController;
