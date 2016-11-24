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
  - 
  - 중지하려면, 키보드에서 `Crtl + C`를 누릅니다.

### android build

  - `SDK`가 설치되어 있어야 합니다
  - 
  - ionic platform에 안드로이드를 추가합니다

  ```bash
  ionic platform add android
  ```
  - release용 android apk 빌드

  ```bash
  ionic build --release android
  ```
  - 키스토어 생성 keytool 
  - 
  ```bash
  keytool -genkey -v -keystore key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
  ```
  - apk 사인 jarsigner
  
  ```bash
  jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore key.keystore android-release-unsigned.apk alias_name
  ```
  
  - 확인 jarsigner jar verified
  
  ```bash
  jarsigner -verify -verbose -certs android-release-unsigned.apk
  ```
  
  - optimize zipalign
  
  ```bash
  zipalign -v 4 android-release-unsigned.apk foressst.apk
  ```
### ios build

  - xcode가 설치된 맥 에서만 가능합니다.
  - 
  - ionic platform에 ios를 추가합니다

  ```bash
  ionic platform add ios
  ```
  - ios build

  ```bash
  ionic build iOS —release
  ```