export default {
  NULL_VALUE: '필요한 값이 없습니다.',
  OUT_OF_VALUE: '파라미터 값이 잘못되었습니다.',
  NOT_FOUND: '잘못된 경로입니다.',
  BAD_REQUEST: '잘못된 요청입니다.',

  // 회원가입 및 로그인
  SIGNUP_SUCCESS: '회원 가입 성공',
  SIGNUP_FAIL: '회원 가입 실패',
  SIGNIN_SUCCESS: '유저 로그인/회원가입 성공',
  SIGNIN_FAIL: '로그인 실패 (존재하지 않는 유저)',
  ALREADY_NICKNAME: '이미 사용중인 닉네임입니다.',
  INVALID_PASSWORD: '잘못된 비밀번호입니다.',

  // 유저
  READ_USER_SUCCESS: '유저 조회 성공',
  READ_ALL_USERS_SUCCESS: '모든 유저 조회 성공',
  UPDATE_USER_SUCCESS: '유저 수정 성공',
  DELETE_USER_SUCCESS: '유저 탈퇴 성공',
  DELETE_USER_FAIL: '유저 탈퇴 실패',
  NO_USER: '탈퇴했거나 가입하지 않은 유저입니다.',
  GET_NOTIFICATIONS_SUCCESS: '알라미 조회 성공',
  GET_NOTIFICATIONS_FAIL: '알라미 조회 실패',

  // 제시글
  CREATE_SUGGEST_FAIL: '구매 제시 실패',
  CREATE_SUGGEST_SUCCESS: '구매 제시 성공',
  GET_SUGGEST_LIST_SUCCESS: '구매 제시 리스트 조회 성공',
  GET_SUGGEST_LIST_FAIL: '구매 제시 리스트 조회 실패',
  DELETE_SUGGEST_SUCCESS: '구매 제시글 삭제 성공',
  DELETE_SUGGEST_FAIL: '구매 제시글 삭제 실패',
  RAISE_SUGGEST_PRICE_SUCCESS: '구매 제시 가격 올리기 성공',
  RAISE_SUGGEST_PRICE_FAIL: '구매 제시 가격 올리기 실패',
  UPDATE_INVOICE_NUMBER_SUCCESS: '운송장 정보 입력 성공',
  UPDATE_INVOICE_NUMBER_FAIL: '운송장 정보 입력 실패',
  GET_MY_SUGGEST_LIST_SUCCESS: '내 구매중 정보 리스트 조회 성공',
  GET_MY_SUGGEST_LIST_FAIL: '내 구매중 정보 리스트 조회 실패',
  UPDATE_SUGGEST_STATUS_SUCCESS: '제시글 상태 변경 성공',
  UPDATE_SUGGEST_STATUS_FAIL: '제시글 상태 변경 실패',
  GET_SUGGEST_DETAIL_SUCCESS: '구매 제시 내용 조회 성공',
  GET_SUGGEST_DETAIL_FAIL: '구매 제시 내용 조회 실패',
  GET_INVOICE_INFO_SUCCESS: '운송장 조회 성공',
  GET_INVOICE_INFO_FAIL: '운송장 조회 실패',

  // 토큰
  CREATE_TOKEN_SUCCESS: '토큰 재발급 성공',
  EXPIRED_TOKEN: '토큰이 만료되었습니다.',
  EXPIRED_ALL_TOKEN: '모든 토큰이 만료되었습니다.',
  INVALID_TOKEN: '유효하지 않은 토큰입니다.',
  VALID_TOKEN: '유효한 토큰입니다.',
  EMPTY_TOKEN: '토큰 값이 없습니다.',

  // 서버 내 오류
  INTERNAL_SERVER_ERROR: '서버 내 오류',

  // 인증
  CERTIFICATION_WORD_CREATE: '인증 코드 생성 성공',
  CERTIFICATION_WORD_CREATE_FAIL: '인증 코드 생성 실패',

  NO_IMAGE: '이미지 없음',
  CERTIFICATION_GET: '인증사진 조회 성공',

  // salespost status 변경
  STATUS_CHANGE: '상태 변경 성공',
  STATUS_NUMBER_ERROR: 'status 번호가 유효하지 않습니다.',
  STATUS_FAIL: '상태 변경 실패',

  SALESPOST_GET_SUCCESS: 'salespost 조회 성공',
  GET_SHIPPING_INFO: '배송 정보 조회 성공',

  GET_ONE_SALESPOST_SUCCESS: 'salespost 세부 정보 조회',
  USER_INFO_GET_SUCCESS: '유저 정보 조회 성공',

  GET_SUGGEST_PAYMENT_INFO_FAIL: '구매 제시 결제 정보 조회 실패',
  GET_SUGGEST_PAYMENT_INFO_SUCCESS: '구매 제시 결제 정보 조회 성공',

  CERTIFICATION_GET_FAIL: '인증사진 조회 실패',
  USER_ID_GET_FAIL: '유저 아이디 조회 실패',

  CREATE_SALESPOST_SUCCESS: 'salespost 생성 성공',
  CREATE_SALESPOST_FAIL: 'salespost 생성 실패',
  SALESPOST_ID_GET_FAIL: 'salespost 아이디 조회 실패',

  GET_ONE_SALESPOST_FAIL: 'salespost 세부 정보 조회 실패',
  USER_INFO_GET_FAIL: '유저 정보 조회 실패',
  IS_SALED_PARAM_NOT_EXIST: 'isSaled 파라미터가 없습니다.',
  SALESPOST_GET_FAIL: 'salespost 조회 실패',
  SHIPPING_INFO_NOT_EXIST: 'request body에  shippingInfo가 없습니다.',
  USER_INFO_CHANGE_FAIL: '유저 정보 변경 실패',
  GET_SHIPPING_INFO_FAIL: '배송 정보 조회 실패',

  SUGGEST_ID_NOT_EXIST: 'suggestId가 없습니다.',
  SALESPOST_ID_NOT_EXIST: 'salespostId가 없습니다.',
  USER_ID_NOT_EXIST: 'userId가 없습니다.',

  PARAM_TRUE_FALSE_UNVALID: '파라미터가 true, false가 아닙니다.',
  INVOICE_DEADLINE_INVALID: 'status는 1인 경우만 invoiceDeadline 필요',
  PRICE_NOT_EXIST: 'price가 없습니다.',
  INVOICE_NUMBER_NOT_EXIST: 'invoiceNumber가 없습니다.',

  PURCHASE_OPTION_INVALID: 'purchaseOption이 유효하지 않습니다.(BULK, PARTIAL)',
  SHIPPING_OPTION_INVALID:
    'shippingOption이 유효하지 않습니다.(일반우편, 준등기, 우체국택배, GS택배, CU택배)',
  REQUEST_BODY_REQUIRED_INVALID: 'request body에 필요한 값이 없습니다.',
  SALES_OPTION_INVALID: 'salesOption이 유효하지 않습니다.(BULK, BULK_PARTIAL)',
  PRICE_OPTION_INVALID: 'priceOption이 유효하지 않습니다.(PRICE_OFFER, DESIGNATED_PRICE)',
};
