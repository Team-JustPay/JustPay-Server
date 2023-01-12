import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { fail, success } from '../constants/response';
import { CreateSalespostDTO } from '../interfaces/salespost/createSalespostDTO';
import { SuggestCreateDTO } from '../interfaces/salespost/suggestCreateDTO';
import existCheck from '../modules/existCheck';
import sendSlackMessage from '../modules/slack';
import { salespostService } from '../service';

const salespostCreate = async (req: Request, res: Response) => {
  const { mainImage, certifications } = req.files as any;
  const salesPostCreateDTO: CreateSalespostDTO = req.body;

  if (
    !(
      salesPostCreateDTO.salesOption === 'BULK' || salesPostCreateDTO.salesOption === 'BULK_PARTIAL'
    )
  ) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SALES_OPTION_INVALID));
  }

  if (
    !(
      salesPostCreateDTO.priceOption === 'PRICE_OFFER' ||
      salesPostCreateDTO.priceOption === 'DESIGNATED_PRICE'
    )
  ) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.PRICE_OPTION_INVALID));
  }

  if (
    !mainImage ||
    !certifications ||
    !salesPostCreateDTO.productCount ||
    !salesPostCreateDTO.price ||
    !salesPostCreateDTO.certificationWord ||
    !salesPostCreateDTO.shippingOptions
  ) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.REQUEST_BODY_REQUIRED_INVALID));
  } // description은 빈 상태로 올 수 있으니 제외

  if (typeof salesPostCreateDTO.shippingOptions === 'string') {
    const option = salesPostCreateDTO.shippingOptions;
    salesPostCreateDTO.shippingOptions = [option];
  }

  for (const option of salesPostCreateDTO.shippingOptions) {
    if (
      !(
        option === '일반우편' ||
        option === '준등기' ||
        option === '우체국택배' ||
        option === 'GS택배' ||
        option === 'CU택배'
      )
    ) {
      return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SHIPPING_OPTION_INVALID));
    }
  }

  const image = mainImage[0];
  const { location } = image;
  const locations = certifications.map((file: { location: any }) => file.location);

  const { userId } = res.locals; // jwt로 userId 얻기

  const salespost = await salespostService.createSalespost(
    userId,
    location,
    locations,
    salesPostCreateDTO,
  );
  if (!salespost) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CREATE_SALESPOST_FAIL));
  }

  return res.status(sc.CREATED).send(success(sc.CREATED, rm.CREATE_SALESPOST_SUCCESS, salespost));
};

const createSuggest = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { salespostId } = req.params;

  const salespostExist = await existCheck.checksalesPostExist(+salespostId);
  if (!salespostExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SALESPOST_ID_NOT_EXIST));
  }

  const suggestCreateDTO: SuggestCreateDTO = req.body;
  if (
    suggestCreateDTO.purchaseOption &&
    !(suggestCreateDTO.purchaseOption === 'BULK' || suggestCreateDTO.purchaseOption === 'PARTIAL')
  ) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.PURCHASE_OPTION_INVALID));
  }

  if (
    !(
      suggestCreateDTO.shippingOption === '일반우편' ||
      suggestCreateDTO.shippingOption === '준등기' ||
      suggestCreateDTO.shippingOption === '우체국택배' ||
      suggestCreateDTO.shippingOption === 'GS택배' ||
      suggestCreateDTO.shippingOption === 'CU택배'
    )
  ) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.SHIPPING_OPTION_INVALID));
  }

  if (!suggestCreateDTO.price || !suggestCreateDTO.productCount) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.REQUEST_BODY_REQUIRED_INVALID));
  }

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
  if (!data) {
    sendSlackMessage(rm.INTERNAL_SERVER_ERROR);
    return res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.CERTIFICATION_WORD_CREATE_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.CERTIFICATION_WORD_CREATE, data));
};

const getCertifications = async (req: Request, res: Response) => {
  const { salespostId } = req.params;

  const salespostExist = await existCheck.checksalesPostExist(+salespostId);
  if (!salespostExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SALESPOST_ID_NOT_EXIST));
  }

  const data = await salespostService.getCertifications(+salespostId);
  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.CERTIFICATION_GET_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.CERTIFICATION_GET, data));
};

const statusChange = async (req: Request, res: Response) => {
  const { salespostId } = req.params;

  const salespostExist = await existCheck.checksalesPostExist(+salespostId);
  if (!salespostExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SALESPOST_ID_NOT_EXIST));
  }

  const status = req.body.status;
  if (!(status in [0, 1])) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.STATUS_NUMBER_ERROR));
  }

  const data = await salespostService.statusChange(+salespostId, status);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.STATUS_FAIL));
  }
  return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.STATUS_CHANGE));
};

const getPurchaseList = async (req: Request, res: Response) => {
  const { salespostId } = req.params;
  const { isMatched } = req.query;
  const { userId } = res.locals;

  const salespostExist = await existCheck.checksalesPostExist(+salespostId);
  if (!salespostExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SALESPOST_ID_NOT_EXIST));
  }

  if (isMatched !== 'true' && isMatched !== 'false') {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.PARAM_TRUE_FALSE_UNVALID));
  }

  const data = await salespostService.getPurchaseList(userId, +salespostId, isMatched as string);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_SUGGEST_LIST_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.GET_SUGGEST_LIST_SUCCESS, data));
};

const getOneSalespost = async (req: Request, res: Response) => {
  const { salespostId } = req.params;
  const { userId } = res.locals;

  const salespostExist = await existCheck.checksalesPostExist(+salespostId);
  if (!salespostExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SALESPOST_ID_NOT_EXIST));
  }

  const data = await salespostService.getOneSalespost(+salespostId, userId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_ONE_SALESPOST_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.GET_ONE_SALESPOST_SUCCESS, data));
};

const salespostController = {
  createSuggest,
  salespostCreate,
  createCertificationWord,
  getCertifications,
  statusChange,
  getPurchaseList,
  getOneSalespost,
};

export default salespostController;
