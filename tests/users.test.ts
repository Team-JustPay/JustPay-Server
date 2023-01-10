const request = require('supertest');
require('dotenv').config();

const app = require('../src/server.ts');

let server = app.listen(4000);

afterAll(async () => {
  await server.close();
});

describe('users 라우터 테스트', ()=>{
  describe('인증코드 생성 [GET]~/salesposts/certificationWord', () => {
    test('200 - 일간 계획블록 리스트 조회 성공', async () => {
      await request(app)
      .get('/salesposts/certificationWord')
      .set('Content-Type', 'application/json',)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });
});

export {};
