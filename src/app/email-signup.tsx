import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";

function CircleCheckbox({
  checked,
  onPress,
  label,
}: {
  checked: boolean;
  onPress: () => void;
  label: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: "#4A90E2",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: checked ? "#4A90E2" : "transparent",
        }}
      >
        {checked && (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: "white",
            }}
          />
        )}
      </View>
      <Text style={{ marginLeft: 12, fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}

export default function SignUpScreen() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const [agreePrivacy, setAgreePrivacy] = useState(false); // 개인정보 처리방침
  const [agreeLocation, setAgreeLocation] = useState(false); // 위치정보 활용동의
  const [agreeMarketing, setAgreeMarketing] = useState(false); // 마케팅 동의(선택)
  const [agreeTerms, setAgreeTerms] = useState(false); // 서비스 이용약관

  const handleSubmit = () => {
    if (!nickname || !email || !password || !roadAddress) {
      Alert.alert("입력 오류", "필수 항목을 모두 입력해주세요.");
      return;
    }

    if (!agreeLocation) {
      Alert.alert(
        "위치정보 활용에 동의하지 않으면 서비스 이용에 제한이 생깁니다."
      );
      return;
    }

    // 가입 처리 로직
    Alert.alert("회원가입 완료");
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ marginBottom: 6, fontWeight: "600", fontSize: 16 }}>
        닉네임
      </Text>
      <TextInput
        placeholder="닉네임을 입력하세요"
        value={nickname}
        onChangeText={setNickname}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      <Text style={{ marginBottom: 6, fontWeight: "600", fontSize: 16 }}>
        이메일
      </Text>
      <TextInput
        placeholder="example@email.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      <Text style={{ marginBottom: 6, fontWeight: "600", fontSize: 16 }}>
        비밀번호
      </Text>
      <TextInput
        placeholder="비밀번호 입력"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      <Text style={{ marginBottom: 6, fontWeight: "600", fontSize: 16 }}>
        주소
      </Text>
      <TextInput
        placeholder="상세 주소를 입력하세요"
        value={detailAddress}
        onChangeText={setDetailAddress}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          marginBottom: 20,
          fontSize: 16,
        }}
      />

      <CircleCheckbox
        checked={agreePrivacy}
        onPress={() => setAgreePrivacy(!agreePrivacy)}
        label="[필수] 서비스 이용약관 동의"
      />

      <CircleCheckbox
        checked={agreePrivacy}
        onPress={() => setAgreePrivacy(!agreePrivacy)}
        label="[필수] 개인정보 처리방침 동의"
      />

      <CircleCheckbox
        checked={agreeLocation}
        onPress={() => setAgreeLocation(!agreeLocation)}
        label="[필수] 위치정보 활용 동의"
      />

      <CircleCheckbox
        checked={agreeMarketing}
        onPress={() => setAgreeMarketing(!agreeMarketing)}
        label="[선택] 마케팅 정보 수신 동의"
      />

      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: "#4A90E2",
          padding: 16,
          borderRadius: 6,
          alignItems: "center",
          marginTop: 12,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          가입하기
        </Text>
      </Pressable>
    </ScrollView>
  );
}
