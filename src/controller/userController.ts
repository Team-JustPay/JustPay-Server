import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { userService } from '../service';

const getUserInfo = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.USER_ID_GET_FAIL));
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
  if (!isSaled) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.IS_SALED_PARAM_NOT_EXIST));
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

  const data = await userService.getMyInfo(+userId);
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

  if (!isPurchased) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.GET_MY_SUGGEST_LIST_FAIL));
  }

  const data = await userService.getMysuggests(userId, isPurchased as string);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_MY_SUGGEST_LIST_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.GET_MY_SUGGEST_LIST_SUCCESS, data));
};

const userController = {
  getMysalespost,
  getUserInfo,
  geyMyInfo,
  chageMyInfo,
  getMysuggests,
};

export default userController;
