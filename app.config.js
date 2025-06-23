import 'dotenv/config';

const IS_DEV = process.env.NODE_ENV === 'development';

export default {
  expo: {
    name: IS_DEV ? 'BeMo Dev' : 'BeMo',
    slug: 'BeMo',
    version: '0.0.1',
    orientation: 'portrait',
    icon: './src/assets/images/icon.png',
    scheme: 'bemo',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'kr.ac.konkuk.bemo.app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'kr.ac.konkuk.bemo.app',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './src/assets/images/favicon.png',
    },
    plugins: [
      'expo-router',
      [
        'expo-splash-screen',
        {
          image: './src/assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
        },
      ],
      [
        'expo-location',
        {
          locationAlwaysAndWhenInUsePermission:
            '$(PRODUCT_NAME)이(가) 위치 정보를 사용하도록 허용하시겠습니까?',
          locationAlwaysPermission:
            '$(PRODUCT_NAME)이(가) 위치 정보를 사용하도록 허용하시겠습니까?',
        },
      ],
      [
        'expo-build-properties',
        {
          android: {
            extraMavenRepos: [
              'https://repository.map.naver.com/archive/maven',
              'https://devrepo.kakao.com/nexus/content/groups/public/',
              'https://devrepo.kakao.com/nexus/repository/kakaomap-releases/',
            ],
          },
          ios: {},
        },
      ],
      [
        '@react-native-kakao/core',
        {
          nativeAppKey: '16c50ffe80a99f9dfdbe776c99c84150',
          android: {
            authCodeHandlerActivity: true,
            followChannelHandlerActivity: true,
            forwardKakaoLinkIntentFilterToMainActivity: true,
          },
          ios: {
            handleKakaoOpenUrl: true,
            naviApplicationQuerySchemes: true,
          },
        },
      ],
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme: 'com.googleusercontent.apps.472392046415-iim3qp0v1hlipc2f99vounb0o0m7q0ta',
        },
      ],
      [
        'expo-maps',
        {
          requestLocationPermission: true,
          locationPermission: '$(PRODUCT_NAME)이(가) 위치 정보를 사용하도록 허용하시겠습니까?',
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      // 환경변수를 expo-constants를 통해 접근 가능하도록 설정
      NODE_ENV: process.env.NODE_ENV || 'development',
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
      API_TIMEOUT: parseInt(process.env.API_TIMEOUT || '10000', 10),
      APP_NAME: process.env.APP_NAME || 'BEMO',
      APP_VERSION: process.env.APP_VERSION || '1.0.0',
      DEBUG_MODE: process.env.DEBUG_MODE === 'true',
      LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    },
  },
};
