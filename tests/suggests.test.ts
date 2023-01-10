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
      .get('/suggests/14')
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });

    test('404 - 구매 제시 내용 조회 실패', async () => {
      await request(app)
      .get('/suggests/0')
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
      .expect('Content-Type', /json/);
    });
  });
});

export {}