// screens/SearchScreen.tsx
import React from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/app/theme';

// import MapView, { Marker } from 'react-native-maps';
//
// const dummyGroups = [
//   { id: '1', name: '런닝 모임', lat: 37.56, lng: 126.97 },
//   // ...
// ];
//
// export default function SearchScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1 }}>
//       {/* 상단 필터 */}
//       <View style={styles.filter}>
//         <TextInput placeholder="위치" style={styles.input} />
//         <TextInput placeholder="카테고리" style={styles.input} />
//         <TextInput placeholder="날짜" style={styles.input} />
//       </View>
//       {/* 지도 뷰 */}
//       <MapView
//         style={{ flex: 1, minHeight: 200 }}
//         initialRegion={{
//           latitude: 37.56,
//           longitude: 126.97,
//           latitudeDelta: 0.05,
//           longitudeDelta: 0.05,
//         }}
//       >
//         {dummyGroups.map(g => (
//           <Marker key={g.id} coordinate={{ latitude: g.lat, longitude: g.lng }} title={g.name} />
//         ))}
//       </MapView>
//       {/* 모임 목록 */}
//       <FlatList
//         data={dummyGroups}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('모임상세', { id: item.id })}>
//             <Text>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   filter: { flexDirection: 'row', justifyContent: 'space-around', padding: 8 },
//   input: { borderBottomWidth: 1, width: 80, fontSize: 14 },
//   card: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
// });

export default function SearchScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>모임 검색 화면</Text>
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