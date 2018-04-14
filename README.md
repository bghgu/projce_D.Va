# project_foressst

![logo.png](https://github.com/bghgu/project_foressst/blob/master/image/logo.png)

성공회대학교 종합정보시스템 하이브리드 앱

IONIC frameWork1와 Angular.js 1을 사용한 하이브리드 앱 개발 프로젝트

프로젝트 기간 : 2016년 여름 방학

맡은 역할 : PM, 프론트 엔드 개발, 문서 작성, 발표, 유지 보수

사용 기술 : IONCI framework1, Angular.js1

## 구성

![1.jpg](https://github.com/bghgu/project_foressst/blob/master/image/1.jpg)

* 종합 정보 시스템을 크롤링 하는 서버와, 이와 api 통신 하는 하이브리드 앱 으로 구성

![2.jpg](https://github.com/bghgu/project_foressst/blob/master/image/2.jpg)

![3.jpg](./image/4.jpg)

* 크롤링 서버는 앱으로 부터 데이터을 받아들여, forest 웹을 대신 검색해 준다.
* 크롤링 서버는 검색 결과를 크롤링해 파싱한 데이터를 json으로 가공해 앱으로 전달한다.

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

- `SDK`가 설치되어 있어야 합니다
- ionic platform에 안드로이드를 추가합니다

```bash
  ionic cordova platform add android
```

- release용 android apk 빌드

```bash
  ionic cordova build android --release
```

- 키스토어 생성 keytool

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

- `XCODE`가 설치된 맥 에서만 가능합니다.
- ionic platform에 ios를 추가합니다

```bash
  ionic platform add ios
```

- ios build

```bash
  ionic build iOS —release
```



## 사용된 도구

* [Angular.JS](https://angularjs.org/) - 자바스크립트 기반 오픈소스 프론트엔드 웹 애플리케이션 프레임 워크
* [IONIC1](https://ionicframework.com/docs/v1/) - Angular.js기반 하이브리드 앱 프레임 워크
* [NPM](https://www.npmjs.com/) - java script 패키지 관리자
* [Atom](https://atom.io/) - 편집기
* [Xcode](https://developer.apple.com/kr/xcode/) - IDE

## 저자

* **배다슬** - [bghgu](https://github.com/bghgu)


[기여자 목록](https://github.com/bghgu/project/contributors)을 확인하여 이 프로젝트에 참가하신 분들을 보실 수 있습니다.

## 감사 인사

* 아이오닉 인 액션 - 제래미 윌켄 지음 - 에이콘 출판사

---


