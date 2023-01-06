import { create } from 'domain';

import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { SalesPostCreateDTO } from '../interfaces/salespost/salespostcreateDTO';
import { SalespostService } from '../service';
const salespostCreate = async (req: Request, res: Response) => {
  const image: Express.MulterS3.File = req.file as Express.MulterS3.File;
  const { location } = image;

  if (!location) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.NO_IMAGE));
  }

  const { userId } = res.locals; // jwt로 userId얻기
  const salesPostCreateDTO: SalesPostCreateDTO = req.body;

  const data = await SalespostService.createSalespost(userId, location, salesPostCreateDTO);
  console.log(data);
  //   // req body type 변경
  //   productCount = parseInt(productCount);
  //   price = parseInt(price);

  //   // test 필요(thunder client에서 안해봄)
  //   shippingOptions = JSON.parse(shippingOptions);
  //   // shippingOptions = ['반값택배', '끼리택배'];

  //   createSalespost();

  //   console.log(userId);
  //   console.log(Array.isArray(shippingOptions));
  //   console.log(
  //     productCount,
  //     typeof productCount,
  //     salesOption,
  //     typeof salesOption,
  //     priceOption,
  //     typeof priceOption,
  //     price,
  //     typeof price,
  //     certificationWord,
  //     typeof certificationWord,
  //     description,
  //     typeof description,
  //     shippingOptions,
  //     typeof shippingOptions,
  //   );

  // const data = await userService.getUserById(+userId);
  return res.status(200).json({ status: 200, message: '유저 조회 성공' });

  //   if (!data) {
  //     return res.status(404).json({ status: 404, message: 'NOT_FOUND' });
  //   }
  //   return res.status(200).json({ status: 200, message: '유저 조회 성공', data });
};

const salespostController = { salespostCreate };

export default salespostController;
