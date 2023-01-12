import { Request, Response } from 'express';

import { rm, sc } from '../constants';
import { notificationMessages } from '../constants/notification';
import { fail, success } from '../constants/response';
import existCheck from '../modules/existCheck';
import createNotification from '../modules/notification';
import sendSlackMessage from '../modules/slack';
import { suggestService } from '../service';

const getShippingInfo = async (req: Request, res: Response) => {
  const { suggestId } = req.params;

  const suggestExist = await existCheck.checkSuggestExist(+suggestId);
  if (!suggestExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SUGGEST_ID_NOT_EXIST));
  }

  const data = await suggestService.getShippingInfo(+suggestId);
  if (!data) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.GET_SHIPPING_INFO_FAIL));
  }

  return res.status(sc.OK).send(success(sc.OK, rm.GET_SHIPPING_INFO, data));
};

const deleteSuggest = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { suggestId } = req.params;

  const suggestExist = await existCheck.checkSuggestExist(+suggestId);
  if (!suggestExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SUGGEST_ID_NOT_EXIST));
  }

  const sellorId = await suggestService.getSellorId(+suggestId);
  const data = await suggestService.deleteSuggest(+suggestId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.DELETE_SUGGEST_FAIL));
  }

  if (data.suggesterId === userId) {
    // 제시자(data.suggesterId)가 제시취소
    // 판매자한테 메시지 전송
    const notification = await createNotification(
      sellorId || 0,
      notificationMessages.SELL_SUGGEST_CANCEL,
    );
    if (!notification) {
      sendSlackMessage(rm.INTERNAL_SERVER_ERROR);
      return res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  } else {
    // 판매자가 제시거절
    // 제시자(data.suggesterId)한테 메시지 전송
    const notification = await createNotification(
      data.suggesterId,
      notificationMessages.PURCHASE_SUGGEST_DENY,
    );
    if (!notification) {
      sendSlackMessage(rm.INTERNAL_SERVER_ERROR);
      return res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
    }
  }

  return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.DELETE_SUGGEST_SUCCESS));
};

const raisePrice = async (req: Request, res: Response) => {
  const { suggestId } = req.params;
  const { price } = req.body;

  const suggestExist = await existCheck.checkSuggestExist(+suggestId);
  if (!suggestExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SUGGEST_ID_NOT_EXIST));
  }

  if (!price) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.PRICE_NOT_EXIST));
  }

  const data = await suggestService.raisePrice(+suggestId, price);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.RAISE_SUGGEST_PRICE_FAIL));
  }
  return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.RAISE_SUGGEST_PRICE_SUCCESS));
};

const updateInvoiceNumber = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { suggestId } = req.params;
  const { invoiceNumber } = req.body;

  const suggestExist = await existCheck.checkSuggestExist(+suggestId);
  if (!suggestExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SUGGEST_ID_NOT_EXIST));
  }

  if (!invoiceNumber) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.INVOICE_NUMBER_NOT_EXIST));
  }

  const data = await suggestService.updateInvoiceNumber(+suggestId, invoiceNumber);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.UPDATE_INVOICE_NUMBER_FAIL));
  }

  const notification = await createNotification(
    userId,
    notificationMessages.PURCHASE_INVOICE_NUMBER_INPUT_COMPLETE,
  );
  if (!notification) {
    sendSlackMessage(rm.INTERNAL_SERVER_ERROR);
    return res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }

  return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.UPDATE_INVOICE_NUMBER_SUCCESS));
};

const updateStatus = async (req: Request, res: Response) => {
  const { suggestId } = req.params;
  const { status, invoiceDeadline } = req.body;
  const { userId } = res.locals;

  const suggestExist = await existCheck.checkSuggestExist(+suggestId);
  if (!suggestExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SUGGEST_ID_NOT_EXIST));
  }

  if (!(status in [0, 1, 2, 3])) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.STATUS_NUMBER_ERROR));
  }

  if (status !== 1) {
    if (invoiceDeadline) {
      return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.INVOICE_DEADLINE_INVALID));
    }
    const data = await suggestService.updateStatus(+suggestId, status);

    if (!data) {
      return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.UPDATE_SUGGEST_STATUS_FAIL));
    }

    if (status === 2) {
      const sellorId = await suggestService.getSellorId(+suggestId);
      const notification = await createNotification(
        sellorId || 0,
        notificationMessages.SELL_PAYMENT_COMPLETE,
      );
      if (!notification) {
        sendSlackMessage(rm.INTERNAL_SERVER_ERROR);
        return res
          .status(sc.INTERNAL_SERVER_ERROR)
          .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
      }
    }
    return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.UPDATE_SUGGEST_STATUS_SUCCESS));
  }

  if (!invoiceDeadline) {
    return res.status(sc.BAD_REQUEST).send(fail(sc.BAD_REQUEST, rm.INVOICE_DEADLINE_INVALID));
  }
  const data = await suggestService.updateStatusInvoice(
    +suggestId,
    userId,
    status,
    invoiceDeadline,
  );

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.UPDATE_SUGGEST_STATUS_FAIL));
  }

  // 제시수락하기
  const notification = await createNotification(
    data.suggesterId,
    notificationMessages.PURCHASE_SUGGEST_ACCEPT,
  );

  if (!notification) {
    sendSlackMessage(rm.INTERNAL_SERVER_ERROR);
    return res
      .status(sc.INTERNAL_SERVER_ERROR)
      .send(fail(sc.INTERNAL_SERVER_ERROR, rm.INTERNAL_SERVER_ERROR));
  }

  return res.status(sc.NO_CONTENT).send(success(sc.NO_CONTENT, rm.UPDATE_SUGGEST_STATUS_SUCCESS));
};

const getSuggestPaymentInfo = async (req: Request, res: Response) => {
  const { suggestId } = req.params;

  const suggestExist = await existCheck.checkSuggestExist(+suggestId);
  if (!suggestExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SUGGEST_ID_NOT_EXIST));
  }

  const data = await suggestService.getSuggestPaymentInfo(+suggestId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_SUGGEST_PAYMENT_INFO_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.GET_SUGGEST_PAYMENT_INFO_SUCCESS, data));
};

const getSuggestDetail = async (req: Request, res: Response) => {
  const { suggestId } = req.params;
  const { userId } = res.locals;

  const suggestExist = await existCheck.checkSuggestExist(+suggestId);
  if (!suggestExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SUGGEST_ID_NOT_EXIST));
  }

  const data = await suggestService.getSuggestDetail(+suggestId, userId);

  if (!data.id) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_SUGGEST_DETAIL_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.GET_SUGGEST_DETAIL_SUCCESS, data));
};

const getInvoiceInfo = async (req: Request, res: Response) => {
  const { suggestId } = req.params;

  const suggestExist = await existCheck.checkSuggestExist(+suggestId);
  if (!suggestExist) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.SUGGEST_ID_NOT_EXIST));
  }

  const data = await suggestService.getInvoiceInfo(+suggestId);

  if (!data) {
    return res.status(sc.NOT_FOUND).send(fail(sc.NOT_FOUND, rm.GET_INVOICE_INFO_FAIL));
  }
  return res.status(sc.OK).send(success(sc.OK, rm.GET_INVOICE_INFO_SUCCESS, data));
};

const suggestController = {
  getShippingInfo,
  deleteSuggest,
  raisePrice,
  updateInvoiceNumber,
  updateStatus,
  getSuggestPaymentInfo,
  getSuggestDetail,
  getInvoiceInfo,
};

export default suggestController;
