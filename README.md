# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

## BeMo Application

## 설정 가이드

### Google Maps API 키 설정

지도 기능을 사용하기 위해서는 Google Maps API 키가 필요합니다.

#### 1. Google Cloud Console에서 API 키 발급

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 프로젝트를 생성하거나 기존 프로젝트 선택
3. **API 및 서비스 > 라이브러리**로 이동
4. 다음 API들을 활성화:
   - Maps SDK for Android
   - Maps SDK for iOS
   - Places API (선택사항)
   - Geocoding API (선택사항)

#### 2. API 키 생성

1. **API 및 서비스 > 사용자 인증 정보**로 이동
2. **+ 사용자 인증 정보 만들기 > API 키** 클릭
3. 생성된 API 키를 복사

#### 3. API 키 제한 설정 (보안 강화)

1. 생성한 API 키 옆의 편집 버튼 클릭
2. **애플리케이션 제한사항**에서 **Android 앱** 또는 **iOS 앱** 선택
3. **API 제한사항**에서 위에서 활성화한 API들만 선택

#### 4. 환경변수 설정

```bash
# .env.development 파일에 추가
GOOGLE_MAPS_API_KEY=발급받은_API_키_입력

# .env.production 파일에 추가
GOOGLE_MAPS_API_KEY=발급받은_API_키_입력
```

#### 5. 프로젝트 재빌드

```bash
yarn prebuild:android  # Android의 경우
yarn prebuild:ios      # iOS의 경우
```

### 문제 해결

#### "지도를 로드할 수 없습니다" 에러가 발생하는 경우:

1. **API 키 확인**: `.env` 파일에 올바른 API 키가 설정되었는지 확인
2. **API 활성화**: Google Cloud Console에서 필요한 API들이 활성화되었는지 확인
3. **빌링 설정**: Google Cloud에서 빌링이 활성화되었는지 확인
4. **플랫폼 제한**: API 키에 올바른 플랫폼 제한이 설정되었는지 확인

#### Android에서 지도가 표시되지 않는 경우:

1. **SHA-1 인증서 지문**: Android 앱의 SHA-1 인증서 지문을 API 키에 추가
2. **패키지 이름**: 올바른 패키지 이름(`kr.ac.konkuk.bemo.app`)이 설정되었는지 확인

#### 개발 환경에서 테스트:

```bash
# 개발 서버 시작
yarn start:dev

# Android에서 테스트
yarn android:dev

# iOS에서 테스트
yarn ios:dev
```
