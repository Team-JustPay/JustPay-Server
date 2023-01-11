const request = require('supertest');
import { suggestService } from '../src/service';
import jwtHandler from '../src/modules/jwtHandler';

const app = require('../src/server.ts');
const {deleteTestSalesPost} = require('../src/modules/testModule.ts');
let server = app.listen(4000);

const image = './assets/img/just_pay.png';
let token;
let testSalesPost, testSuggestPost;

afterAll(async () => {
  await suggestService.deleteSuggest(+testSuggestPost);
  await deleteTestSalesPost(+testSalesPost);
  await server.close();
});

beforeAll(async () => {
  token = jwtHandler.sign(4);
});

describe('salesposts 라우터 테스트', ()=>{
  describe('판매글 등록 [POST] ~/salesposts', () => {
    test('201 - 판매글 등록 성공', async () => {
      const {_body} = await request(app)
      .post('/salesposts')
      .set('Content-Type', 'multipart/form-data',)
      .set('Authorization', `Bearer ${token}`)
      .attach('certifications', image)
      .attach('certifications', image)
      .attach('mainImage', image)
      .field('productCount', '3')
      .field('salesOption', 'BULK')
      .field('priceOption', 'PRICE_OFFER')
      .field('price', '30000')
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', '["GS택배", "일반우편"]')
      .expect(201)
      .expect('Content-Type', /json/);
      
      testSalesPost = _body.data.id;
    });
  });

  describe('구매제시 등록 [POST] ~/salesposts', () => {
    test('201 - 구매제시 등록 성공', async () => {
      const {_body} = await request(app)
      .post(`/salesposts/${testSalesPost}/suggest`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', image)
      .field('price', '30000')
      .field('purchaseOption', 'BULK')
      .field('productCount', 2)
      .field('description', '설명')
      .field('shippingOption', '일반우편')
      .expect(201)
      .expect('Content-Type', /json/);

      testSuggestPost = _body.data.id;
    });
  }); 

  describe('판매글 정보 조회 [GET] ~/salesposts/:salespostId', () => {
    test('200 - 판매글 정보 조회 성공', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });
  
  describe('인증사진 조회 [GET] ~/salesposts/:salespostId/certifications', () => {
    test('200 - 인증사진 조회 성공', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}/certifications`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });
  
  describe('판매글 구매 제시 목록 조회 [GET] ~/salesposts/:salespostId/suggests?isMatched={isMatched}', () => {
    test('200 - 판매글 구매 제시 목록 조회 성공', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}/suggests`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .query({isMatched: 'false'})
      .expect(200)
      .expect('Content-Type', /json/);
    });
  });
  
  describe('판매글 상태 조회 [PATCH] ~/salesposts/:salespostId/status', () => {
    test('204 - 판매글 상태 조회 성공', async () => {
      await request(app)
      .patch(`/salesposts/${testSalesPost}/status`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .send({status: 1})
      .expect(204)
    });
  });

  describe('인증코드 생성 [GET] ~/salesposts/certificationWord', () => {
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
