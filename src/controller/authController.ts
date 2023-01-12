import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import jwtHandler from '../modules/jwtHandler';
import sendSlackMessage from '../modules/slack';

//* 로그인
const signInUser = async (req: Request, res: Response) => {
  const { oauthToken } = req.body;

  if (!(+oauthToken === 4 || +oauthToken === 10)) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SIGNIN_FAIL));
  }

  try {
    const userId = +oauthToken; // 더미 유저의 id
    const accessToken = jwtHandler.sign(userId);
    const result = {
      id: userId,
      accessToken,
    };

    res.status(sc.OK).send(success(sc.OK, rm.SIGNIN_SUCCESS, result));
  } catch (e) {
    sendSlackMessage(rm.INTERNAL_SERVER_ERROR);
    res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }
};

const authController = { signInUser };

export default authController;
