// import { useLocalSearchParams } from 'expo-router';
// import React from 'react';
// import { View, Text, ScrollView, Pressable } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';  

// import { Button } from '@/components/ui/button';

// const MEETING_DETAILS = {
//   '1': {
//     title: '주말 등산 모임',
//     date: '4월 15일 (토) 오전 8시 - 오후 2시',
//     location: '북한산 국립공원 (3호선 구파발역)',
//     description: '북한산 둘레길을 걸으며 힐링하는 모임입니다. 등산 초보자도 환영하며, 점심은 근처 맛집에서 먹을 예정입니다. 날씨가 좋을 경우 사진도 찍어요!',
//     participants: { current: 5, max: 10 },
//   },
// };

// const MeetingDetailScreen = () => {
//   const router = useRouter();
//   const handleContact = () => {
//     router.push('/contact');
//   };
//   const handleApplication = () => {
//     console.log('참가 신청받기');
//     // router.push('/application');
//   };
//   const handleMission = () => {
//     router.push('/mission');
//   };
//   const handleSharing = () => {
//     router.push('/share');
//   };

//   const { id } = useLocalSearchParams<{ id: string }>();
//   const meeting = MEETING_DETAILS[id ?? '1'];

//   if (!meeting) return <Text>모임 정보를 찾을 수 없습니다.</Text>;

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <ScrollView contentContainerStyle={{ padding: 20 }}>
//         {/* 제목 */}
//         <Text onPress={handleMission} style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>{meeting.title}</Text>

//         {/* 날짜 */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
//           <Feather name="calendar" size={16} color="#666" />
//           <Text style={{ marginLeft: 6, color: '#666' }}>{meeting.date}</Text>
//         </View>

//         {/* 장소 */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
//           <Feather name="map-pin" size={16} color="#666" />
//           <Text style={{ marginLeft: 6, color: '#666' }}>{meeting.location}</Text>
//         </View>

//         {/* 참가 조건 */}
//         <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
//           <Feather name="users" size={16} color="#666" />
//           <Text style={{ marginLeft: 6, color: '#666' }}>{meeting.participants.current}/{meeting.participants.max}명 참여 중</Text>
//         </View>

//         {/* 지도 영역 (임시) */}
//         <View
//           style={{
//             height: 160,
//             backgroundColor: '#eee',
//             borderRadius: 8,
//             marginTop: 12,
//             marginBottom: 24,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Text style={{ color: '#999' }}>지도</Text>
//         </View>

//         {/* 모임 설명 */}
//         <Text onPress={handleSharing} style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>모임 설명</Text>
//         <Text style={{ color: '#444', lineHeight: 22 }}>{meeting.description}</Text>

//         {/* 참가자 리스트 (아이콘으로 표시) */}
//         <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 }}>
//         참가자 ({meeting.participants.current}/{meeting.participants.max}명)
//         </Text>

//         <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//         {Array.from({ length: meeting.participants.current }).map((_, index) => (
//             <View
//             key={index}
//             style={{
//                 width: 40,
//                 height: 40,
//                 borderRadius: 20,
//                 backgroundColor: '#ddd',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 marginRight: 8,
//                 marginBottom: 8,
//             }}
//             >
//             <Feather onPress={handleContact} name="user" size={20} color="#666" />
//             </View>
//         ))}
//         </View>

//       </ScrollView>

//       {/* 하단 버튼 */}
//       <View
//         style={{
//           padding: 16,
//           borderTopWidth: 1,
//           borderColor: '#eee',
//           backgroundColor: '#fff',
//         }}
//       >
//         <Button title='참가 신청하기' onPress={handleApplication}></Button>

//       </View>
//     </View>
//   );
// };

// export default MeetingDetailScreen;

import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '@/components/ui/button';

const MEETING_DETAILS = [
  {
    id: '1',
    title: '주말 등산 모임',
    date: '4월 15일 (토) 오전 8시 - 오후 2시',
    location: '북한산 국립공원 (3호선 구파발역)',
    description:
      '북한산 둘레길을 걸으며 힐링하는 모임입니다. 등산 초보자도 환영하며, 점심은 근처 맛집에서 먹을 예정입니다. 날씨가 좋을 경우 사진도 찍어요!',
    participants: { current: 5, max: 10 },
  },
];

const TABS = ['정보', '자료', '미션'];

const MeetingDetailScreen = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<'정보' | '자료' | '미션'>('정보');
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  const handleContact = () => {
    router.push('/contact');
  };

  const handleEvaluation = () => {
    router.push('/evaluate');
  };

  const handleApplication = () => {
    console.log('참가 신청받기');
    // 추후 알고리즘 추가
  };

  const handleMission = () => {
    router.push('/mission');
  };

  const handleSharing = () => {
    router.push('/share');
  };

  const { id } = useLocalSearchParams<{ id: string }>();
  const meeting = MEETING_DETAILS.find((m) => m.id === (id ?? '1'));
  if (!meeting) return <Text>모임 정보를 찾을 수 없습니다.</Text>;
  
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* 제목 */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>{meeting.title}</Text>

        {/* 탭 메뉴 */}
        <View style={{ flexDirection: 'row', marginBottom: 20, borderBottomWidth: 1, borderColor: '#eee', paddingBottom: 12 }}>
          {/* 탭 버튼들 */}
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab as typeof selectedTab)}
              style={{
                paddingVertical: 6,
                paddingHorizontal: 12,
                marginRight: 8,
                borderRadius: 20,
                backgroundColor: selectedTab === tab ? '#4A90E2' : '#eee',
              }}
            >
              <Text style={{ color: selectedTab === tab ? '#fff' : '#555', fontWeight: '500' }}>{tab}</Text>
            </Pressable>
          ))}
        </View>

        {/* 탭 콘텐츠 */}
        {/* 정보 탭 내용 */}
        {selectedTab === '정보' && (
          <>
            {/* 날짜 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Feather name="calendar" size={16} color="#666" />
              <Text style={{ marginLeft: 6, color: '#666' }}>{meeting.date}</Text>
            </View>

            {/* 장소 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Feather name="map-pin" size={16} color="#666" />
              <Text style={{ marginLeft: 6, color: '#666' }}>{meeting.location}</Text>
            </View>

            {/* 인원 */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <Feather name="users" size={16} color="#666" />
              <Text style={{ marginLeft: 6, color: '#666' }}>
                {meeting.participants.current}/{meeting.participants.max}명 참여 중
              </Text>
            </View>

            {/* 지도 */}
            <View
              style={{
                height: 160,
                backgroundColor: '#eee',
                borderRadius: 8,
                marginTop: 12,
                marginBottom: 24,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#999' }}>지도</Text>
            </View>

            {/* 설명 */}
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>모임 설명</Text>
            <Text style={{ color: '#444', lineHeight: 22 }}>{meeting.description}</Text>

            {/* 참가자 */}
            <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 24, marginBottom: 8 }}>
              참가자 ({meeting.participants.current}/{meeting.participants.max}명)
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {Array.from({ length: meeting.participants.current }).map((_, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedUser(index)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#ddd',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 8,
                    marginBottom: 16,
                  }}
                >
                  <Feather name="user" size={20} color="#666" />
                </Pressable>
              ))}
            </View>

            {/* 하단 버튼 */}
            <View
              style={{
                padding: 16,
                borderTopWidth: 1,
                borderColor: '#eee',
                backgroundColor: '#fff',
              }}
            >
              <Button title="참가 신청하기" onPress={handleApplication} />
            </View>
          </>
        )}

        {selectedTab === '자료' && (
          router.push('/share')
        )}

        {selectedTab === '미션' && (
          router.push('/mission')
        )}

      </ScrollView>

      {/* 참가자 모달 */}
      <Modal visible={selectedUser !== null} transparent animationType="slide">
        <Pressable
          onPress={() => setSelectedUser(null)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              backgroundColor: '#fff',
              padding: 20,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>참가자 행동</Text>
            <Button title="연락하기" onPress={handleContact} />
            <View style={{ height: 12 }} />
            <Button title="평가하기" onPress={handleEvaluation} />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default MeetingDetailScreen;
