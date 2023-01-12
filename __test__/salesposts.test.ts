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
      .field('productCount', 3)
      .field('salesOption', 'BULK')
      .field('priceOption', 'PRICE_OFFER')
      .field('price', 30000)
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', "GS택배")
      .field('shippingOptions', "CU택배")
      .expect(201)
      .expect('Content-Type', /json/);
      
      testSalesPost = _body.data.id;
    });
    test('400 - 판매글 생성 실패', async () => {
      await request(app)
      .post('/salesposts')
      .set('Content-Type', 'multipart/form-data',)
      .set('Authorization', `Bearer ${token}`)
      .attach('certifications', image)
      .attach('certifications', image)
      .attach('mainImage', image)
      .field('price', 30000)
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', "GS택배")
      .field('shippingOptions', "CU택배")
      .expect(400)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .post('/salesposts')
      .set('Content-Type', 'multipart/form-data',)
      .attach('certifications', image)
      .attach('certifications', image)
      .attach('mainImage', image)
      .field('productCount', 3)
      .field('salesOption', 'BULK')
      .field('priceOption', 'PRICE_OFFER')
      .field('price', 30000)
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', "GS택배")
      .field('shippingOptions', "CU택배")
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .post('/salesposts')
      .set('Content-Type', 'multipart/form-data',)
      .set('Authorization', `Bearer differentToken`)
      .attach('certifications', image)
      .attach('certifications', image)
      .attach('mainImage', image)
      .field('productCount', 3)
      .field('salesOption', 'BULK')
      .field('priceOption', 'PRICE_OFFER')
      .field('price', 30000)
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', "GS택배")
      .field('shippingOptions', "CU택배")
      .expect(401)
    });
    test('400 - purchaseOption이 유효하지 않습니다.(BULK, PARTIAL)', async () => {
      await request(app)
      .post('/salesposts')
      .set('Content-Type', 'multipart/form-data',)
      .set('Authorization', `Bearer ${token}`)
      .attach('certifications', image)
      .attach('certifications', image)
      .attach('mainImage', image)
      .field('productCount', 3)
      .field('salesOption', 'BULK')
      .field('priceOption', 'something')
      .field('price', 30000)
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', "GS택배")
      .field('shippingOptions', "CU택배")
      .expect(400)
    });
    test('400 - shippingOption이 유효하지 않습니다.(일반우편, 준등기, 우체국택배, GS택배, CU택배)', async () => {
      await request(app)
      .post('/salesposts')
      .set('Content-Type', 'multipart/form-data',)
      .set('Authorization', `Bearer ${token}`)
      .attach('certifications', image)
      .attach('certifications', image)
      .attach('mainImage', image)
      .field('productCount', 3)
      .field('salesOption', 'BULK')
      .field('priceOption', 'PRICE_OFFER')
      .field('price', 30000)
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', "something")
      .field('shippingOptions', "CU택배")
      .expect(400)
    });
    test('400 - request body에 필요한 값이 없습니다', async () => {
      await request(app)
      .post('/salesposts')
      .set('Content-Type', 'multipart/form-data',)
      .set('Authorization', `Bearer ${token}`)
      .attach('certifications', image)
      .attach('certifications', image)
      .attach('mainImage', image)
      .field('productCount', 3)
      .field('salesOption', 'BULK')
      .field('priceOption', 'PRICE_OFFER')
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', "GS택배")
      .field('shippingOptions', "CU택배")
      .expect(400)
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
    test('404 - salespostId가 없습니다', async () => {
      await request(app)
      .post(`/salesposts/-1/suggest`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', image)
      .field('price', '30000')
      .field('purchaseOption', 'BULK')
      .field('productCount', 2)
      .field('description', '설명')
      .field('shippingOption', '일반우편')
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .post(`/salesposts/${testSalesPost}/suggest`)
      .set('Content-Type', 'multipart/form-data')
      .attach('image', image)
      .field('price', '30000')
      .field('purchaseOption', 'BULK')
      .field('productCount', 2)
      .field('description', '설명')
      .field('shippingOption', '일반우편')
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .post(`/salesposts/${testSalesPost}/suggest`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer differentToken`)
      .attach('image', image)
      .field('price', '30000')
      .field('purchaseOption', 'BULK')
      .field('productCount', 2)
      .field('description', '설명')
      .field('shippingOption', '일반우편')
      .expect(401)
    });
    test('400 - purchaseOption이 유효하지 않습니다.(BULK, PARTIAL)', async () => {
      await request(app)
      .post(`/salesposts/${testSalesPost}/suggest`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', image)
      .field('price', '30000')
      .field('purchaseOption', 'something')
      .field('productCount', 2)
      .field('description', '설명')
      .field('shippingOption', '일반우편')
      .expect(400)
    });
    test('400 - shippingOption이 유효하지 않습니다.(일반우편, 준등기, 우체국택배, GS택배, CU택배)', async () => {
      await request(app)
      .post(`/salesposts/${testSalesPost}/suggest`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', image)
      .field('price', '30000')
      .field('purchaseOption', 'BULK')
      .field('productCount', 2)
      .field('description', '설명')
      .field('shippingOption', '끼리택배')
      .expect(400)
    });
    test('400 - request body에 필요한 값이 없습니다', async () => {
      await request(app)
      .post(`/salesposts/${testSalesPost}/suggest`)
      .set('Content-Type', 'multipart/form-data')
      .set('Authorization', `Bearer ${token}`)
      .attach('image', image)
      .field('purchaseOption', 'BULK')
      .field('productCount', 2)
      .field('description', '설명')
      .field('shippingOption', '일반우편')
      .expect(400)
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
    test('404 - salespostId가 없습니다', async () => {
      await request(app)
      .get(`/salesposts`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}`)
      .set('Content-Type', 'application/json',)
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .expect(401)
    });
  });
  
  describe('인증사진 조회 [GET] ~/salesposts/:salespostId/certifications', () => {
    test('200 - 인증사진 조회 성공', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}/certifications`)
      .set('Content-Type', 'application/json',)
      .expect(200)
      .expect('Content-Type', /json/);
    });
    test('404 - salespostId가 없습니다', async () => {
      await request(app)
      .get(`/salesposts/-1/certifications`)
      .set('Content-Type', 'application/json',)
      .expect(404)
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
    test('404 - salespostId가 없습니다', async () => {
      await request(app)
      .get(`/salesposts/-1/suggests`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .query({isMatched: 'false'})
      .expect(404)
    });
    test('401 - 토큰 값이 없습니다', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}/suggests`)
      .set('Content-Type', 'application/json',)
      .query({isMatched: 'false'})
      .expect(401)
    });
    test('401 - 유효하지 않은 토큰입니다', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}/suggests`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer differentToken`)
      .query({isMatched: 'false'})
      .expect(401)
    });
    test('400 - 파라미터가 true, false가 아닙니다', async () => {
      await request(app)
      .get(`/salesposts/${testSalesPost}/suggests`)
      .set('Content-Type', 'application/json',)
      .set('Authorization', `Bearer ${token}`)
      .query({isMatched: 'something'})
      .expect(400)
    });
  });
  
  describe('판매글 상태 변경 [PATCH] ~/salesposts/:salespostId/status', () => {
    test('204 - 판매글 상태 변경 성공', async () => {
      await request(app)
      .patch(`/salesposts/${testSalesPost}/status`)
      .set('Content-Type', 'application/json',)
      .send({status: 1})
      .expect(204)
    });
    test('404 - salespostId가 없습니다', async () => {
      await request(app)
      .patch(`/salesposts/-1/status`)
      .set('Content-Type', 'application/json',)
      .send({status: 1})
      .expect(404)
    });
    test('400 - status 번호가 유효하지 않습니다', async () => {
      await request(app)
      .patch(`/salesposts/${testSalesPost}/status`)
      .set('Content-Type', 'application/json',)
      .send({status: 5})
      .expect(400)
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
