export const notificationMessages = {
  PURCHASE_SUGGEST_DENY:
    '아쉽지만, 구매제시한 상품이 품절됐어요\nTip : 같은 판매자에게 다른 옵션으로 구매를 제시하면 수락가능성이 올라가요',
  SELL_SUGGEST_CANCEL:
    '인증사진을 본 구매자가 제시를 취소했어요\n저스트페이에서 다른 구매자의 제시 내역을 확인해보세요',
  PURCHASE_SUGGEST_ACCEPT:
    '판매자가 나의 구매 제시를 수락했어요\n상품의 인증사진을 확인하고 결제하세요!',
  SELL_PAYMENT_COMPLETE:
    '구매자의 결제 금액이 안전하게 입금되었어요\n상품을 배송접수하고 운송장 번호를 입력해주세요\n운송장 번호를 입력 후, 즉시 판매금이 내 계좌로 입금돼요',
  PURCHASE_INVOICE_NUMBER_INPUT_COMPLETE:
    '판매자가 택배 운송장 번호를 입력했어요\n저스트페이에서 확인해보세요!',
};

const notificationType: { [key: string]: string } = {
  PURCHASE: '구매 알림',
  SELL: '판매 알림',
};

export const getNotificationType = (text: string) => {
  for (const [key, value] of Object.entries(notificationMessages)) {
    if (value === text) {
      return notificationType[key.split('_')[0]];
    }
  }
};
