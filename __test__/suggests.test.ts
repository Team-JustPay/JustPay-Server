const request = require('supertest');
import { salespostService } from '../src/service';
import jwtHandler from '../src/modules/jwtHandler';

const {suggest, salesPost} = require('../src/db/data.ts');
const {deleteTestSalesPost} = require('../src/modules/testModule.ts');
const app = require('../src/server.ts');
let server = app.listen(4000);

let token; 
let suggestForTest, salesPostForTest;

afterAll(async () => {
  await deleteTestSalesPost(+salesPostForTest.id);
  await server.close();
});

beforeAll(async () => {
  salesPostForTest = await salespostService.createSalespost(
    4,
    'image',
    ['dnksfl','dkjfs'],
    salesPost
  )
  suggestForTest = await salespostService.createSuggest(
    4,
    salesPostForTest.id,
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
    test('404 - suggestId가 없습니다', async () => {
      await request(app)
      .get(`/suggests/-1/payment`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
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
    test('404 - suggestId가 없습니다', async () => {
      await request(app)
      .get(`/suggests/-1`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .get(`/suggests/${suggestForTest.id}`)
      .set('Content-Type', 'application/json',)
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .get(`/suggests/${suggestForTest.id}`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .expect(401)
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
    test('404 - suggestId가 없습니다', async () => {
      await request(app)
      .get(`/suggests/-1/invoice`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .get(`/suggests/${suggestForTest.id}/invoice`)
      .set('Content-Type', 'application/json',)
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .get(`/suggests/${suggestForTest.id}/invoice`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .expect(401)
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
    test('404 - suggestId가 없습니다', async () => {
      await request(app)
      .get(`/suggests/-1/shippinginfo`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
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
    test('404 - suggestId가 없습니다', async () => {
      await request(app)
      .patch(`/suggests/-1/status`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 2,
      })
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/status`)
      .set('Content-Type', 'application/json',)
      .send({
        status: 2,
      })
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/status`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .send({
        status: 2,
      })
      .expect(401)
    });
    test('400 - status 번호가 유효하지 않습니다', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/status`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 5,
      })
      .expect(400)
    });
    test('400 - status는 1인 경우만 invoiceDeadline 필요', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/status`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 2,
        invoiceDeadline: 3,
      })
      .expect(400)
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
    test('404 - suggestId가 없습니다', async () => {
      await request(app)
      .patch(`/suggests/-1/price`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        price: 30000,
      })
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/price`)
      .set('Content-Type', 'application/json',)
      .send({
        price: 30000,
      })
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/price`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .send({
        price: 30000,
      })
      .expect(401)
    });
    test('400 - price가 없습니다.', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/price`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400)
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
    test('404 - suggestId가 없습니다', async () => {
      await request(app)
      .patch(`/suggests/-1/invoice`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        invoiceNumber: "1234-5678-9123",
      })
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/invoice`)
      .set('Content-Type', 'application/json',)
      .send({
        invoiceNumber: "1234-5678-9123",
      })
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/invoice`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .send({
        invoiceNumber: "1234-5678-9123",
      })
      .expect(401)
    });
    test('400 - price가 없습니다.', async () => {
      await request(app)
      .patch(`/suggests/${suggestForTest.id}/invoice`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .expect(400)
    });
  });

  describe('구매 제시 삭제 [DELETE] ~/suggests/:suggestId', () => {
    test('404 - suggestId가 없습니다', async () => {
      await request(app)
      .delete(`/suggests/-1`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .delete(`/suggests/${suggestForTest.id}`)
      .set('Content-Type', 'application/json',)
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .delete(`/suggests/${suggestForTest.id}`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .expect(401)
    });
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