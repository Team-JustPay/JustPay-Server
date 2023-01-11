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
  });
  
  describe('프로필 정보 조회 [GET] ~/users/:userId', () => {
    test('200 - 프로필 정보 조회 성공', async () => {
      await request(app)
      .get(`/users/${testUser.id}`)
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/);
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
  });
  
  
});

export {};
