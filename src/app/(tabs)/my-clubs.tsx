// src/app/(tabs)/my-groups.tsx

import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS } from '@/app/theme';

type Group = {
  id: string;
  name: string;
  date: string;
  location: string;
  status: string;
};

const dummyGroups: Group[] = [
  { id: '1', name: '스터디 모임', date: '2025-05-12', location: '강남', status: '진행중' },
  { id: '2', name: '등산 동호회', date: '2025-05-18', location: '북한산', status: '모집중' },
];

export default function MyGroupsScreen() {
  const [groups] = useState<Group[]>(dummyGroups);
  const router = useRouter();

  const handleGroupPress = (groupId: string) => {
    // 상세 화면으로 이동 (예시: /group/[id] 라우트가 있다면)
    router.push(`/group/${groupId}`);
  };

  const handleCreateGroup = () => {
    // 모임 생성 화면으로 이동
    router.push('/create-meeting');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 모임</Text>
      <FlatList
        data={groups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleGroupPress(item.id)}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>{item.date} | {item.location}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>참여 중인 모임이 없습니다.</Text>}
      />
      <Button title="모임 만들기" onPress={handleCreateGroup} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: COLORS.accent,
    fontSize: 20,
    fontWeight: "bold",
  },
});
