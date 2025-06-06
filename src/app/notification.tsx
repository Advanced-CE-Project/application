import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const NotificationItem = ({ icon, iconColor, title, subtitle }) => (
  <View style={styles.notificationItem}>
    <View style={[styles.iconCircle, { backgroundColor: iconColor }]}>  
      <Feather name={icon} size={20} color="white" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const NotificationScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.sectionTitle}>오늘</Text>
      <NotificationItem
        icon="calendar"
        iconColor="#dbeafe"
        title="주말 동산 모임"
        subtitle="내일 모임이 예정되어 있습니다. 리더를 확인해보세요. 2시간 전"
      />
      <NotificationItem
        icon="check-circle"
        iconColor="#dcfce7"
        title="참가 신청 완료"
        subtitle="모임에 참가 신청이 완료되었습니다. 3시간 전"
      />

      <Text style={styles.sectionTitle}>어제</Text>
      <NotificationItem
        icon="alert-triangle"
        iconColor="#fef3c7"
        title="미션 만료"
        subtitle="모임의 두번째 체크리스트 만료됨. 어제 오후 3:42"
      />
      <NotificationItem
        icon="message-square"
        iconColor="#fce7f3"
        title="새 댓글"
        subtitle="당신의 게시물에 댓글이 달렸습니다. 어제 오후 2:15"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: '#333',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 20,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
  },
});

export default NotificationScreen;