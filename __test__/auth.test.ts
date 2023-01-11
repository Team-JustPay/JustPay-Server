const request = require('supertest');

const app = require('../src/server.ts');
let server = app.listen(4000);

afterAll(async () => {
  await server.close();
});

describe('auth 라우터 테스트', () => {
  describe('임시 로그인 [GET] ~/auth/login', () => {
    test('200 - 임시 로그인 성공', async () => {
      await request(app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          oauthToken: "<token>",
		      oauthTokenSecret: "<token_secret>"
        })
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });
});

export {};
