const request = require('supertest');
import jwtHandler from '../src/modules/jwtHandler';

const app = require('../src/server.ts');
let server = app.listen(4000);

const image = '../assets/img/just_pay.png';
let token;
let testSalesPost;

afterAll(async () => {
  await server.close();
});

beforeAll(async () => {
  token = jwtHandler.sign(4);
});

describe('salesposts 라우터 테스트', ()=>{
  describe('판매글 등록 [POST] ~/salesposts', () => {
    test('201 - 판매글 등록 성공', async () => {
      testSalesPost = await request(app)
      .post('/salesposts')
      .set('Content-Type', 'multipart/form-data',)
      .set('Authorization', `Bearer ${token}`)
      .attach('certifications', [image, image, image])
      .attach('mainImage', image)
      .field('productCount', '3')
      .field('salesOption', 'BULK')
      .field('priceOption', 'PRICE_OFFER')
      .field('price', '30000')
      .field('certificationWord', '테스트')
      .field('description', '테스트 판매글')
      .field('shippingOptions', '["반값택배", "끼리택배"]')
      .expect(201)
      .expect('Content-Type', /json/);
    });
  });

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
