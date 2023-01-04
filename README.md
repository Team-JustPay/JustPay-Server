# JustPay-Server

<img alth="justpay" src="https://user-images.githubusercontent.com/67372977/210496340-6bb69f5d-1834-480f-8040-6d42f6d5fa28.png" width="300px" height="300px"/>

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

## 🕸 API DOCS

↗️ [API 명세서](https://eunbigombi.notion.site/API-Docs-e5893577fcf54f84a3d4cdf634d9a636)

</br>


## 담당 기능 및 Progess Status

- 초기 세팅
| 기능 | 담당자 | 완료 |
| --- | --- | --- |
| AWS 세팅 | 천호영 | ✅ |
| 배포 및 HTTPS 작업 | 천호영 전희선 | ✅ |
| 깃헙 협업 기반 세팅 |  전희선 | ✅ |
| 프로젝트 초기 세팅 | 천호영 전희선 | ✅ |
| ERD 구성 | 천호영 전희선 | ✅ |
| DB migration | 천호영 | 진행중 |
| API명세 작성 | 천호영 전희선 | ✅ |

-
| 기능 | 담당자 | 완료 |
| --- | --- | --- |
| 내 정보 조회 | 천호영 |  |
| 내 정보 수정 | 천호영 |  |
| 프로필 정보 조회(내가 아닌) | 천호영 |  |
| 내 알리미 조회 | 천호영 |  |
| 내 구매중 정보 조회 (구매중/구매완료) | 전희선 |  |
| 내 판매중 정보 조회 (판매중/판매종료) | 천호영 |  |
| 판매글 등록 | 천호영 |  |
| 판매글 정보 조회 | 천호영 |  |
| 판매글 구매 제시 목록 | 전희선 |  |
| 구매 제시하기 | 전희선 |  |
| 판매글 상태 변경 | 천호영 |  |
| 인증사진 조회 | 천호영 |  |
| 구매 제시 정보 조회 | 전희선 |  |
| 구매 제시 삭제 | 전희선 |  |
| 구매 제시 상태변경 | 전희선 |  |
| 구매 제시 가격 올리기 | 전희선 |  |
| 운송장 정보 입력 | 전희선 |  |
| 소셜 로그인 | 천호영 |  |

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
          "node": true
        },
        "extends": [
          "eslint:recommended",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:@typescript-eslint/recommended-requiring-type-checking",
          "plugin:prettier/recommended",
          "prettier/prettier",
          "plugin:import/recommended"
        ],
        "parser": "@typescript-eslint/parser",
        "parserOptions": {
          "project": "./tsconfig.json",
          "ecmaVersion": "latest",
          "sourceType": "module"
        },
        "plugins": ["@typescript-eslint", "prettier"],
        "rules": {
          "camelcase": "error",
          "comma-dangle": ["error", "always-multiline"],
          "no-console": ["warn"],
          "no-constant-condition": ["error", { "checkLoops": true }],
          "no-restricted-syntax": [
            "error",
            {
              "selector": "ForOfStatement",
              "message": "iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations."
            },
            {
              "selector": "LabeledStatement",
              "message": "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand."
            },
            {
              "selector": "WithStatement",
              "message": "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
            }
          ],
          "no-use-before-define": ["error", { "functions": false }],
          "no-unused-expressions": ["error", { "allowTaggedTemplates": true }],
          "prefer-const": [
            "error",
            { "destructuring": "all" }
          ],
          "prefer-destructuring": ["error", { "array": true, "object": true }, { "enforceForRenamedProperties": true }],
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
        "ignorePatterns": ["dist/", "node_modules/"]
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

💡 하나의 이슈를 올리면 이슈 단위로 pr 날리기
💡 코드리뷰 후 merge 하기


## 🏛 프로젝트 폴더 구조

```
src
├── controller
│   ├── boardController.ts
│   ├── index.ts
│   ├── pinController.ts
│   └── userController.ts
├── index.ts
├── router
│   ├── boardRouter.ts
│   ├── index.ts
│   ├── pinRouter.ts
│   └── userRouter.ts
└── service
    ├── boardService.ts
    ├── index.ts
    ├── pinService.ts
    └── userService.ts
```
