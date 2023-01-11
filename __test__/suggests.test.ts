const request = require('supertest');
import { salespostService } from '../src/service';
import jwtHandler from '../src/modules/jwtHandler';

const {suggest} = require('../src/db/data.ts');
const app = require('../src/server.ts');
let server = app.listen(4000);

let token; 
let suggestForTest;

afterAll(async () => {
  await server.close();
});

beforeAll(async () => {
  suggestForTest = await salespostService.createSuggest(
    4,
    2,
    suggest,
    '',
  );

  token = jwtHandler.sign(4);
});

describe('suggests 라우터 테스트', ()=>{
  describe('결제 정보 조회 [GET] ~/suggests/:suggestId/payment', () => {
    test('200 - 결제 정보 조회 성공', async () => {
      await request(app)
      .get(`/suggests/${suggestForTest.id}/payment`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });

  describe('구매 제시 내용 조회 [GET] ~/suggests/:suggestId', () => {
    test('200 - 구매 제시 내용 조회 성공', async () => {
      await request(app)
      .get(`/suggests/${suggestForTest.id}`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });

  describe('운송장 정보 확인 [GET] ~/suggests/:suggestId/invoice', () => {
    test('200 - 운송장 정보 확인 성공', async () => {
      await request(app)
      .get(`/suggests/${suggestForTest.id}/invoice`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });

  describe('배송 정보 확인 [GET] ~/suggests/:suggestId/shippinginfo', () => {
    test('200 - 배송 정보 확인 성공', async () => {
      await request(app)
      .get(`/suggests/${suggestForTest.id}/shippinginfo`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });

  describe('구매 제시 상태 변경 [PATCH] ~/suggests/:suggestId/status', () => {
      test('204 - 구매 제시 상태 변경 성공', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/status`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 2,
      })
      .expect(204)
    });
  });

  describe('구매 제시 가격 올리기 [PATCH] ~/suggests/:suggestId/price', () => {
      test('204 - 구매 제시 가격 올리기 성공', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/price`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 30000,
      })
      .expect(204)
    });
  });  

  describe('운송장 정보 입력 [PATCH] ~/suggests/:suggestId/invoice', () => {
      test('204 - 운송장 정보 입력 성공', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/invoice`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        invoiceNumber: "1234-5678-9123",
      })
      .expect(204)
    });
  });

  describe('구매 제시 삭제 [DELETE] ~/suggests/:suggestId', () => {
      test('204 - 구매 제시 삭제 성공', async () => {
      await request(app)
      .delete(`/suggests/${suggestForTest.id}`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    });
  });
});

export {}