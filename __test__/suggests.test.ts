const request = require('supertest');
import jwtHandler from '../src/modules/jwtHandler';
require('dotenv').config();

const app = require('../src/server.ts');
let server = app.listen(4000);

const token = jwtHandler.sign(4);

afterAll(async () => {
  await server.close();
});

describe('suggests 라우터 테스트', ()=>{
  describe('구매 제시 내용 조회 [GET]~/suggests/:suggestId', () => {
    test('200 - 구매 제시 내용 조회 성공', async () => {
      await request(app)
      .get(`/suggests/22`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });

  describe('운송장 정보 수정 [GET]~/suggests/:suggestId/invoice', () => {
      test('204 - 운송장 정보 수정 성공', async () => {
      await request(app)
      .patch(`/suggests/22/invoice`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({
        invoiceNumber: "1234-5678-9123",
      })
      .expect(204)
      .expect('Content-Type', /json/);
    });
  });
});

export {}