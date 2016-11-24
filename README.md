# forest-foressst

Ionic framework와 Angular.js을 사용한 하이브리드앱

## 실행 방법

### 직접 실행

 - `nodejs` 와 `npm` 을 설치합니다. 설치 방법은 [nodejs.org](https://nodejs.org) 를 참고하세요.
 - 실행에 필요한 의존성을 설치합니다.

  ```bash
  npm install
  ```
 - 아이오닉 코드 실행를 실행합니다.

  ```bash
  ionic serve
  ```
  - `localhost:8100`으로 실행이 가능합니다
  - 중지하려면, 키보드에서 `Crtl + C`를 누릅니다.

### android build

  - ionic platform list
  - Docker Image 를 빌드합니다.

  ```bash
  docker build -t forest-nodejs:latest .
  ```
  - ionic platform add android

  ```bash
  ionic platform add android
  ```
  - 빌드한 Docker Image 로 부터 컨테이너를 생성하고, 80번 포트에서 컨테이너의 3000번 포트로 포워딩 하여 데몬 모드로 컨테이너를 시작합니다.

  ```bash
  docker run -d -p 80:3000 --name <원하는 컨테이너 이름> forest-nodejs:latest
  ```

  - 컨테이너를 중지하려면 다음 명령을 실행합니다.
  
  ```bash
  docker stop <컨테이너 이름>
  ```
### ios build

  - xcode가 설치된 곳 에서만 가능합니다.
  - ionic platform add ios

  ```bash
  ionic platform add ios
  ```
  - 빌드된 Docker Image 를 확인합니다.

  ```bash
  docker images
  ```
  - 빌드한 Docker Image 로 부터 컨테이너를 생성하고, 80번 포트에서 컨테이너의 3000번 포트로 포워딩 하여 데몬 모드로 컨테이너를 시작합니다.

  ```bash
  docker run -d -p 80:3000 --name <원하는 컨테이너 이름> forest-nodejs:latest
  ```

  - 컨테이너를 중지하려면 다음 명령을 실행합니다.
  
  ```bash
  docker stop <컨테이너 이름>
  ```