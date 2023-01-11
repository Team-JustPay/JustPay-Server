# JustPay-Server

<img alth="justpay" src="https://user-images.githubusercontent.com/67372977/210496340-6bb69f5d-1834-480f-8040-6d42f6d5fa28.png" width="300px" height="300px"/>
</br>

## ⭐️서비스 한 줄 소개
트위터 DM 없는 아이돌 굿즈 최고가 매칭 서비스

</br>

## ⭐️서비스 핵심기능 소개
1️⃣</br>
포토카드를 쉽게 판매하도록 도와주는 판매옵션이 한눈에 보이는 판매글 피드를 제공합니다.</br>
판매자의 신뢰도를 높여주는 3가지 PAY정보도 함께 제공됩니다.</br>
<img width="200" alt="3 1 1 판매중 GNB" src="https://user-images.githubusercontent.com/67372977/211900938-2fd0b7b3-2f07-4829-84f1-6cc33d7238f4.png"></br></br>
2️⃣</br>
트위터DM 을 일일이 확인할 필요 없이 구매자들의 제시 옵션을 한눈에 파악할 수 있는 매칭 중 목록을 제공합니다.</br>
<img width="200" alt="4 1 판매중 GNB - 판매중 리스트" src="https://user-images.githubusercontent.com/67372977/211901330-e2624a83-b2dd-439a-9324-9f2cc7aa8d9e.png"></br></br>
3️⃣</br>
판매글을 올리고, 판매글에 구매 제시를 하여 쉽고 안전한 거래를 할 수 있도록 도와줍니다.</br>
<img width="200" alt="8 3 2 2개일부+제시가격" src="https://user-images.githubusercontent.com/67372977/211901599-96611bdd-988d-41c7-b322-03c83dc63046.png">
<img width="200" alt="판매글 작성 - 대표사진 등록후 -일부 판매" src="https://user-images.githubusercontent.com/67372977/211901613-82f57e8e-db4a-4287-bd78-953a327f0690.png"></br>

</br>

## 👨‍👩‍👦 R&R(역할분담)

| 역할 | 담당자 |
| --- | --- |
| 협업 툴 관리 | 전희선 |
| 과제 제출 담당 | 천호영 |
| 과제 관리 담당 | 전희선 |
| 데일리 스크럼 업로드/리마인드 | 천호영 |
| 전체 일정 관리 | 천호영 전희선 |
| 회의록 작성 | 천호영 |
| 기술 / 코드관리 / 코드리뷰 | 천호영 전희선 |
| Read Me 작성 | 천호영 전희선 |

</br>

## ✏️ DB ERD
<img width="1481" alt="스크린샷 2023-01-04 오후 3 57 17" src="https://user-images.githubusercontent.com/67372977/210506846-e9329f15-7ed5-4a8c-a5b1-594ef4aa4f58.png">


## 📕 Cloud Service
<img alt="Amazon AWS" src ="https://img.shields.io/badge/Amazon AWS-232F3E.svg?&style=for-the-badge&logo=Amazon AWS&logoColor=white"/>

- AWS EC2 - 클라우드 컴퓨팅 시스템
- AWS RDS - 클라우드 관계형 데이터베이스
- AWS S3 - 클라우드 데이터 저장소
- AWS Route 53 - 클라우드 DNS 웹 서비스

## 📚 기술 스택
<img alt="Node.js" src ="https://img.shields.io/badge/Node.js-339933.svg?&style=for-the-badge&logo=Node.js&logoColor=white"/>  <img alt="Express" src ="https://img.shields.io/badge/Express-000000.svg?&style=for-the-badge&logo=Express&logoColor=white"/>
<img alt="npm" src ="https://img.shields.io/badge/prisma-2D3748.svg?&style=for-the-badge&logo=prisma&logoColor=white"/>
<img alt="PostgreSQL" src ="https://img.shields.io/badge/PostgreSQL-4169E1.svg?&style=for-the-badge&logo=PostgreSQL&logoColor=white"/>

- Node.js
- Express.js
- Prisma
- PostgreSQL

## ⚒ Server Architecture
![아키텍쳐](https://user-images.githubusercontent.com/67372977/211884274-fcc50312-bc4b-45b6-bdd6-e4f713cfb9ce.jpg)


## 🔔 Dependencies
```
"dependencies": {
    "@aws-sdk/client-s3": "^3.216.0",
    "@prisma/client": "^4.5.0",
    "axios": "^1.2.2",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.5-lts.1",
    "multer-s3": "^3.0.1",
    "prisma": "^4.5.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.12",
    "@babel/preset-env": "^7.20.2",
    "@babel/preset-typescript": "^7.18.6",
    "@types/bcryptjs": "^2.4.2",
    "@types/express": "^4.17.14",
    "@types/express-validator": "^3.0.0",
    "@types/jest": "^29.2.5",
    "@types/jsonwebtoken": "^9.0.0",
    "@types/multer": "^1.4.7",
    "@types/multer-s3": "^3.0.0",
    "@types/node": "^18.11.9",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.47.1",
    "@typescript-eslint/parser": "^5.47.1",
    "babel-jest": "^29.3.1",
    "eslint": "^8.30.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-import": "^2.26.0",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^4.2.1",
    "husky": "^8.0.0",
    "jest": "^29.3.1",
    "jest-mock-extended": "^3.0.1",
    "nodemon": "^2.0.20",
    "prettier": "^2.8.1",
    "supertest": "^6.3.3",
    "ts-jest": "^29.0.3",
    "typescript": "^4.9.4"
  }
```

## 🕸 API DOCS

↗️ [API 명세서](https://eunbigombi.notion.site/API-Docs-e5893577fcf54f84a3d4cdf634d9a636)

</br>


## ✏️ 담당 기능 및 Progess Status

초기 세팅 및 

| 기능 | 담당자 | 완료 |
| --- | --- | --- |
| AWS 세팅 | 천호영 | ✅ |
| 배포 및 HTTPS 작업 | 천호영 전희선 | ✅ |
| 깃헙 협업 기반 세팅 |  전희선 | ✅ |
| 프로젝트 초기 세팅 | 천호영 전희선 | ✅ |
| ERD 구성 | 천호영 전희선 | ✅ |
| DB migration | 천호영 | ✅ |
| API명세 작성 | 천호영 전희선 | ✅ |

API

| 기능 | 담당자 | 완료 |
| --- | --- | --- |
| 내 정보 조회 | 천호영 | ✅ |
| 내 정보 수정 | 천호영 | ✅ |
| 프로필 정보 조회(내가 아닌) | 천호영 | ✅ |
| 내 알리미 조회 | 전희선 | ✅ |
| 내 구매중 정보 조회 (구매중/구매완료) | 전희선 | ✅ |
| 내 판매중 정보 조회 (판매중/판매종료) | 천호영 | ✅ |
| 판매글 등록 | 천호영 | ✅ |
| 판매글 정보 조회 | 천호영 | ✅ |
| 판매글 구매 제시 목록 | 전희선 | ✅ |
| 구매 제시하기 | 전희선 | ✅ |
| 판매글 상태 변경 | 천호영 | ✅ |
| 인증사진 조회 | 천호영 | ✅ |
| 구매 제시 내용 조회 | 전희선 | ✅ |
| 구매 제시 삭제 | 전희선 | ✅ |
| 구매 제시 상태변경 | 전희선 | ✅ |
| 구매 제시 가격 올리기 | 전희선 | ✅ |
| 운송장 정보 입력 | 전희선 | ✅ |
| 임시 소셜 로그인 | 천호영 | ✅ |
| 운송장 정보 확인 | 전희선 | ✅ |
| 배송 정보 확인 | 천호영 | ✅ |
| 결제 정보 조회 | 천호영 | ✅ |
| 인증코드 생성 | 전희선 | ✅ |


</br>


## ♟ commit, coding convention, branch 전략

### 📍 Commit Convention

- init: 따단~~ 첫 커밋
- feat: 새로운 기능, UI 구현
- fix: 버그 수정,리포트
- docs: readme 등의 문서 수정
- edit: 파일 삭제 및 수정, 이동
- del: 쓸모없는 코드 삭제
- chore: 기능상 변경 없는 코드 수정, 패키지 관리 등
- refactor: 완성된 기능 구조 변경, 리팩토링 


### 📍 coding convention

- .eslintrc.json

```
    {
        "env": {
          "es2021": true,
          "node": true,
          "jest": true
        },
        "extends": [
          "eslint:recommended",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:prettier/recommended",
          "prettier/prettier",
          "plugin:import/recommended"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
          "project": ["./tsconfig.json", "./jest.config.js"],
          "ecmaVersion": "latest",
          "sourceType": "module"
        },
        "plugins": ["@typescript-eslint", "prettier"],
        "rules": {
          "camelcase": "error",
          "comma-dangle": ["error", "always-multiline"],
          "no-console": ["warn"],
          "@typescript-eslint/no-var-requires": "off",
          "no-constant-condition": ["error", { "checkLoops": true }],
          "no-restricted-syntax": [
            "error",
            {
              "selector": "LabeledStatement",
              "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
            },
            {
              "selector": "WithStatement",
              "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
            }
          ],
          "no-use-before-define": ["off", { "functions": false }],
          "no-unused-expressions": ["error", { "allowTaggedTemplates": true }],
          "prefer-const": [
            "error",
            { "destructuring": "all" }
          ],
          "prefer-destructuring": ["error", { "array": false, "object": false }, { "enforceForRenamedProperties": true }],
          "spaced-comment": ["error", "always"],
          "import/extensions": ["error", "never"],
          "import/no-unresolved": "off",
          "import/order": [
            "error",
            {
              "groups": [
                "builtin",
                "external",
                "internal",
                "parent",
                "sibling"
              ],
              "newlines-between": "always",
              "alphabetize": {
                "order": "asc",
                "caseInsensitive": false
              }
            }
          ],
          "import/prefer-default-export": "off"
        },
        "ignorePatterns": ["dist/", "node_modules/", "jest.config.js", "babel.config.js", "__test__"]
      }
```

- .prettierrc

```
{
  "singleQuote": true,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100,
  "endOfLine": "auto"
}
```

### 📍 Branch 전략

- 배포 브랜치 : `main`
- 개발 브랜치 : `develop`
- pr 단위 브랜치 + 뒤에 이슈 번호 붙이기
    - `feature/`
    - `fix/`
    - `refact/`
    - `hotfix/`


### 📍 PR, 이슈 관리

💡 하나의 이슈를 올리면 이슈 단위로 pr 날리기<br>
💡 코드리뷰 후 merge 하기


## 🏛 프로젝트 폴더 구조

```
__test__
prisma
src
├── config
│   ├── index.ts
│   └── s3Config.ts
├── constants
│   ├── index.ts
│   ├── notification.ts
│   ├── response.ts
│   ├── responseMessage.ts
│   ├── shippingInfo.ts
│   ├── statusCode.ts
│   ├── tokenType.ts
│   └── wordList.ts
├── controller
│   ├── authController.ts
│   ├── index.ts
│   ├── salespostController.ts
│   ├── suggestController.ts
│   └── userController.ts
├── db
│   ├── client.ts
│   └── data.ts
├── index.ts
├── interfaces
│   ├── image
│   │   └── imageCreateResponseDTO.ts
│   ├── salespost
│   │   ├── createSalespostDTO.ts
│   │   ├── getPurchaseListDTO.ts
│   │   └── suggestCreateDTO.ts
│   ├── type
│   │   └── shippingInfo.ts
│   └── user
│       └── userUpdateDTO.ts
├── middlewares
│   ├── auth.ts
│   ├── index.ts
│   └── upload.ts
├── modules
│   ├── date.ts
│   ├── dateNotification.ts
│   ├── jwtHandler.ts
│   ├── notification.ts
│   ├── shippingOption.ts
│   ├── slack.ts
│   └── testModule.ts
├── router
│   ├── authRouter.ts
│   ├── index.ts
│   ├── salespostRouter.ts
│   ├── suggestRouter.ts
│   └── userRouter.ts
├── server.ts
├── service
│   ├── authService.ts
│   ├── index.ts
│   ├── salespostService.ts
│   ├── suggestService.ts
│   └── userService.ts
└── singleton.ts
```
