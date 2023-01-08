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

const raisePrice = async (req: Request, res: Response) => {
  const { suggestId } = req.params;
  const { price } = req.body;

  if (!suggestId) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.RAISE_SUGGEST_PRICE_FAIL));
  }

  const data = await suggestService.raisePrice(+suggestId, price);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.RAISE_SUGGEST_PRICE_FAIL));
  }
  return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.RAISE_SUGGEST_PRICE_SUCCESS));
};

const updateInvoiceNumber = async (req: Request, res: Response) => {
  const { suggestId } = req.params;
  const { invoiceNumber } = req.body;

  if (!suggestId) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.UPDATE_INVOICE_NUMBER_FAIL));
  }

  const data = await suggestService.updateInvoiceNumber(+suggestId, invoiceNumber);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.UPDATE_INVOICE_NUMBER_FAIL));
  }
  return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.UPDATE_INVOICE_NUMBER_SUCCESS));
};

const getSuggestPaymentInfo = async (req: Request, res: Response) => {
  const { suggestId } = req.params;

  if (!suggestId) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.GET_SUGGEST_PAYMENT_INFO_FAIL));
  }

  const data = await suggestService.getSuggestPaymentInfo(+suggestId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_SUGGEST_PAYMENT_INFO_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.GET_SUGGEST_PAYMENT_INFO_SUCCESS, data));
};

const suggestController = {
  getShippingInfo,
  deleteSuggest,
  raisePrice,
  updateInvoiceNumber,
  getSuggestPaymentInfo,
};

export default suggestController;
