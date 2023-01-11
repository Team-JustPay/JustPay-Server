module.export = {
  clearMocks: true,
  preset: "ts-jest", // ts-jest를 사용
  testEnvironment: "node", // 테스트 환경 'node' 환경을 사용
	testMatch: ["**/__test__/*.test.(ts|tsx)"], //js 파일은 dist에서도 감지가 될 수 있으니 폴더를 조정해서 test이 있는 위치로 잡아준다.
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  }
};