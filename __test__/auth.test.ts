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
          oauthToken: 4,
		      oauthTokenSecret: "<token_secret>"
        })
        .expect(200)
        .expect('Content-Type', /json/)
    });
    test('400 - 로그인 실패 (존재하지 않는 유저)', async () => {
      await request(app)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({
          oauthToken: 2,
		      oauthTokenSecret: "<token_secret>"
        })
        .expect(400)
        .expect('Content-Type', /json/);
    });
  });
});

export {};
