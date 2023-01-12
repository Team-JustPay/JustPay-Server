const request = require('supertest');
import jwtHandler from '../src/modules/jwtHandler';

const {userInfo} = require('../src/db/data.ts');
const {createTestUser, deleteTestUser} = require('../src/modules/testModule.ts');
const app = require('../src/server.ts');
let server = app.listen(4000);

let token;
let testUser;

afterAll(async () => {
  await deleteTestUser(+testUser.id);
  await server.close();
});

beforeAll(async () => {
  testUser = await createTestUser();
  token = jwtHandler.sign(testUser.id);
});

describe('users 라우터 테스트', ()=>{
  describe('내 정보 조회 [GET] ~/users/my/info?addressSplit={addressSplit}', () => {
    test('200 - 내 정보 조회 성공', async () => {
      await request(app)
      .get('/users/my/info')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .query({addressSplit: 'true'})
      .expect(200)
      .expect('Content-Type', /json/);
    });
    test('400 - 파라미터가 true, false가 아닙니다', async () => {
      await request(app)
      .get(`/users/my/info`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .query({addressSplit: 'something'})
      .expect(400)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .get(`/users/my/info`)
      .set('Content-Type', 'application/json')
      .query({addressSplit: 'something'})
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .get(`/users/my/info`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .query({addressSplit: 'something'})
      .expect(401)
    });
  });
  
  describe('내 정보 수정 [PUT] ~/users/my/info', () => {
    test('204 - 내 정보 수정 성공', async () => {
      await request(app)
      .put('/users/my/info')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(userInfo)
      .expect(204)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .put('/users/my/info')
      .set('Content-Type', 'application/json')
      .send(userInfo)
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .put('/users/my/info')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer differentToken`)
      .send(userInfo)
      .expect(401)
    });
  });
  
  describe('프로필 정보 조회 [GET] ~/users/:userId', () => {
    test('200 - 프로필 정보 조회 성공', async () => {
      await request(app)
      .get(`/users/${testUser.id}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);
    });
    test('404 - userId가 없습니다', async () => {
      await request(app)
      .get(`/users/-1`)
      .set('Content-Type', 'application/json',)
      .expect(404)
    });
  });
  
  describe('내 알리미 조회 [GET] ~/users/my/notifications', () => {
    test('200 - 내 알리미 조회 성공', async () => {
      await request(app)
      .get('/users/my/notifications')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .get(`/users/my/notifications`)
      .set('Content-Type', 'application/json')
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .get(`/users/my/notifications`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .expect(401)
    });
  });

  describe('내 구매중 정보 조회 [GET] ~/users/my/suggests?isPurchased={isPurchased}', () => {
    test('200 - 내 구매중 정보 조회 성공', async () => {
      await request(app)
      .get('/users/my/suggests')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .query({isPurchased: 'false'})
      .expect(200)
      .expect('Content-Type', /json/);
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .get('/users/my/suggests')
      .set('Content-Type', 'application/json')
      .query({isPurchased: 'false'})
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .get('/users/my/suggests')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer differentToken`)
      .query({isPurchased: 'false'})
      .expect(401)
    });
    test('400 - 파라미터가 true, false가 아닙니다', async () => {
      await request(app)
      .get('/users/my/suggests')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .query({isPurchased: 'something'})
      .expect(400)
    });
  });

  describe('내 판매중 정보 조회 [GET] ~/users/my/salesposts?isSaled={isSaled}', () => {
    test('200 - 내 판매중 정보 조회 성공', async () => {
      await request(app)
      .get('/users/my/salesposts')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .query({isSaled: 'false'})
      .expect(200)
      .expect('Content-Type', /json/);
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .get('/users/my/salesposts')
      .set('Content-Type', 'application/json')
      .query({isSaled: 'false'})
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .get('/users/my/salesposts')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer differentToken`)
      .query({isSaled: 'false'})
      .expect(401)
    });
    test('400 - 파라미터가 true, false가 아닙니다', async () => {
      await request(app)
      .get('/users/my/salesposts')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .query({isSaled: 'something'})
      .expect(400)
    });
  });
  
  
});

export {};
