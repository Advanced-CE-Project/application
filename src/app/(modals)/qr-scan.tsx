import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import services from '@/services';

const { width, height } = Dimensions.get('window');

const QRScanModal: React.FC = () => {
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);

  const verifyQRMutation = useMutation({
    mutationFn: services.attendance.verifyQR,
    onSuccess: (data: { message: string }) => {
      Alert.alert('출석 완료', data.message, [
        {
          text: '확인',
          onPress: () => {
            // 출석 관련 쿼리들 무효화
            queryClient.invalidateQueries({ queryKey: ['club'] });
            queryClient.invalidateQueries({ queryKey: ['attendance'] });
            router.back();
          },
        },
      ]);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || error.message || '출석 처리 중 오류가 발생했습니다.';
      Alert.alert('출석 실패', errorMessage, [
        {
          text: '다시 시도',
          onPress: () => setIsScanning(true),
        },
        {
          text: '취소',
          onPress: () => router.back(),
          style: 'cancel',
        },
      ]);
    },
  });

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!isScanning || verifyQRMutation.isPending) return;

    setIsScanning(false);
    verifyQRMutation.mutate({ qrData: data });
  };

  const handleClose = () => {
    router.back();
  };

  if (!permission) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size='large' color='#4A90E2' />
          <Text style={styles.loadingText}>카메라 권한을 확인하는 중...</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>출석 체크</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>카메라 권한이 필요합니다</Text>
          <Text style={styles.permissionMessage}>
            QR 코드를 스캔하여 출석 체크를 하려면{'\n'}카메라 권한을 허용해주세요.
          </Text>
          <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
            <Text style={styles.permissionButtonText}>권한 허용하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>출석 체크</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 카메라 뷰 */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing='back'
          onBarcodeScanned={isScanning ? handleBarCodeScanned : undefined}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
        >
          {/* 스캔 오버레이 */}
          <View style={styles.overlay}>
            <View style={styles.scanArea}>
              <View style={styles.corner} />
              <View style={[styles.corner, styles.topRight]} />
              <View style={[styles.corner, styles.bottomLeft]} />
              <View style={[styles.corner, styles.bottomRight]} />
            </View>
          </View>
        </CameraView>
      </View>

      {/* 하단 안내 */}
      <View style={styles.bottomContainer}>
        <Text style={styles.instructionTitle}>QR 코드 스캔</Text>
        <Text style={styles.instructionText}>
          모임 주최자가 제공한 QR 코드를{'\n'}
          스캔하여 출석 체크를 완료하세요.
        </Text>

        {verifyQRMutation.isPending && (
          <View style={styles.processingContainer}>
            <ActivityIndicator size='small' color='#4A90E2' />
            <Text style={styles.processingText}>출석 처리 중...</Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setIsScanning(true)}
          style={[styles.rescanButton, !isScanning && styles.rescanButtonActive]}
          disabled={verifyQRMutation.isPending}
        >
          <Text style={[styles.rescanButtonText, !isScanning && styles.rescanButtonTextActive]}>
            다시 스캔하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 10,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 32,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  permissionMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#4A90E2',
    borderWidth: 4,
    borderTopLeftRadius: 8,
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    left: 'auto',
    borderLeftWidth: 0,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 0,
  },
  bottomLeft: {
    bottom: 0,
    top: 'auto',
    borderTopWidth: 0,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    top: 'auto',
    left: 'auto',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
    borderTopLeftRadius: 0,
  },
  bottomContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 32,
    paddingVertical: 24,
    alignItems: 'center',
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  processingText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 8,
    fontWeight: '500',
  },
  rescanButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#666',
  },
  rescanButtonActive: {
    borderColor: '#4A90E2',
  },
  rescanButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  rescanButtonTextActive: {
    color: '#4A90E2',
  },
});

export default QRScanModal;
