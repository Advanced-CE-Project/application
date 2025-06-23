import { Feather } from '@expo/vector-icons';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

interface AddressData {
  address: string;
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
}

interface DaumPostcodeProps {
  visible: boolean;
  onClose: () => void;
  onComplete: (data: AddressData) => void;
}

// 참고 코드를 바탕으로 한 안정적인 HTML 구조
const html = `
<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
	<style> 
	  * { box-sizing: border-box }
	  html, body { width: 100%; height: 100%; margin:0px; padding: 0px; background-color: #ffffff; } 
  </style>
</head>
<body>
	<div id="layer" style="width:100%; min-height: 100%;"></div>
	<script type="text/javascript">
    function callback() {
			var element_layer = document.getElementById('layer');
			element_layer.innerHTML = "";
      try {
        new daum.Postcode({
          ...window.options,
          onsearch: function () {
            window.scrollTo(0, 0);
          },
          oncomplete: function(data) {
            console.log('Postcode completed:', data);
            window.ReactNativeWebView.postMessage(JSON.stringify(data));
          },
          onresize: function(size) {
            document.getElementById('layer').style.height = size.height + 'px';
          },
          onclose: function() {
            console.log('Postcode closed');
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'close' }));
          },
          width : '100%',
          height: '100%',
        }).embed(element_layer);
        console.log('Postcode embedded successfully');
      } catch (error) {
        console.error('Postcode embed error:', error);
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', message: error.toString() }));
      }
    }
		function initOnReady(options) {
    	window.options = options;
			var s = document.createElement('script');
			s.type = 'text/javascript'; 
      s.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
			s.onreadystatechange = callback; 
      s.onload = callback;
      s.onerror = function() {
        console.error('Script load failed');
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', message: 'Script load failed' }));
      };
			var x = document.getElementsByTagName('script')[0]; 
      x.parentNode.insertBefore(s, x);
    }
	</script>
</body>
</html>
`;

export const DaumPostcode: React.FC<DaumPostcodeProps> = ({ visible, onClose, onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Daum Postcode 옵션 설정
  const jsOptions = useMemo(
    () => ({
      hideMapBtn: true,
      hideEngBtn: true,
      alwaysShowEngAddr: false,
    }),
    [],
  );

  // JavaScript 인젝션 코드
  const injectedJavaScript = useMemo(
    () => `initOnReady(${JSON.stringify(jsOptions)});void(0);`,
    [jsOptions],
  );

  const handleMessage = useCallback(
    ({ nativeEvent }: any) => {
      try {
        console.log('WebView message received:', nativeEvent.data);

        if (!nativeEvent.data) return;

        const data = JSON.parse(nativeEvent.data);

        // 에러 처리
        if (data.type === 'error') {
          console.error('Postcode error:', data.message);
          return;
        }

        // 닫기 처리
        if (data.type === 'close') {
          console.log('Postcode should close');
          onClose();
          return;
        }

        // 주소 선택 완료
        if (data.zonecode) {
          console.log('Address selected:', data);
          onComplete({
            address: data.address,
            roadAddress: data.roadAddress,
            jibunAddress: data.jibunAddress,
            zonecode: data.zonecode,
          });
        }
      } catch (error) {
        console.error('Message parsing error:', error);
      }
    },
    [onClose, onComplete],
  );

  const handleLoadEnd = useCallback(() => {
    console.log('WebView load ended');
    setIsLoading(false);
  }, []);

  const handleError = useCallback((syntheticEvent: any) => {
    console.error('WebView error:', syntheticEvent.nativeEvent);
    setIsLoading(false);
  }, []);

  // URL 링크 처리 (참고 코드 방식)
  const handleShouldStartLoadWithRequest = useCallback((request: any) => {
    const isPostcode =
      !request.url?.startsWith('https://postcode.map.daum.net/guide') &&
      (!request.url?.startsWith('http') ||
        request.url?.startsWith('https://postcode.map.daum.net') ||
        request.url?.startsWith('http://postcode.map.daum.net'));

    if (!isPostcode) {
      Linking.openURL(request.url);
      return false;
    } else {
      return true;
    }
  }, []);

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType='slide' onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* 헤더 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#333' }}>주소 검색</Text>
          <Pressable
            onPress={onClose}
            style={{
              padding: 8,
              borderRadius: 20,
              backgroundColor: '#f0f0f0',
            }}
          >
            <Feather name='x' size={20} color='#666' />
          </Pressable>
        </View>

        {/* WebView */}
        <View style={{ flex: 1, position: 'relative' }}>
          <WebView
            source={{ html, baseUrl: 'https://postcode.map.daum.net' }}
            onMessage={handleMessage}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
            injectedJavaScript={injectedJavaScript}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            originWhitelist={['*']}
            allowsInlineMediaPlaybook={true}
            mediaPlaybackRequiresUserAction={false}
            mixedContentMode='compatibility'
            androidLayerType='hardware'
            renderToHardwareTextureAndroid={true}
            useWebKit={true}
          />

          {/* 로딩 인디케이터 */}
          {isLoading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size='large' color='#4A90E2' />
              <Text style={{ marginTop: 12, fontSize: 16, color: '#666' }}>
                주소 검색을 로딩 중...
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
};
