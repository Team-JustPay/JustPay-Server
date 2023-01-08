import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import jwtHandler from '../modules/jwtHandler';

//* 로그인
const signInUser = async (req: Request, res: Response) => {
  try {
    const userId = 4; // 더미 유저의 id
    const accessToken = jwtHandler.sign(userId);
    const result = {
      id: userId,
      accessToken,
    };

    res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
  } catch (e) {
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

const authController = { signInUser };

export default authController;
