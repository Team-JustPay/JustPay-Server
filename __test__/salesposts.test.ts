const request = require('supertest');

const app = require('../src/server.ts');
let server = app.listen(4000);

afterAll(async () => {
  await server.close();
});

describe('salesposts 라우터 테스트', ()=>{
  describe('인증코드 생성 [GET]~/salesposts/certificationWord', () => {
    test('200 - 인증코드 생성 성공', async () => {
      await request(app)
      .get('/salesposts/certificationWord')
      .set('Content-Type', 'application/json',)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });
});

export {};
