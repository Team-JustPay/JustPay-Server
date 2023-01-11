const request = require('supertest');

const app = require('../src/server.ts');
let server = app.listen(4000);

afterAll(async () => {
  await server.close();
});

describe('auth 라우터 테스트', () => {
  describe('소셜 로그인/회원가입 [GET] ~/auth/login', () => {
    test('200 - 로그인 성공', async () => {
      await request(app)
        .get('/auth/login')
        .set('Content-Type', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });
});

export {};
