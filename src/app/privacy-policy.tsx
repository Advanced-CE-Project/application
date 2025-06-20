import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PrivacySection {
  title: string;
  content: string;
}

const PrivacyPolicyScreen = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const privacySections: PrivacySection[] = [
    {
      title: '1. 개인정보의 처리목적',
      content:
        'BeMo(이하 "회사")는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.\n\n가. 회원 가입 및 관리\n   - 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지 목적으로 개인정보를 처리합니다.\n\n나. 재화 또는 서비스 제공\n   - 모임 관리 서비스 제공, 콘텐츠 제공, 맞춤서비스 제공, 본인인증을 목적으로 개인정보를 처리합니다.\n\n다. 마케팅 및 광고에의 활용\n   - 신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공을 목적으로 개인정보를 처리합니다.',
    },
    {
      title: '2. 개인정보의 처리 및 보유기간',
      content:
        '① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.\n\n② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.\n\n가. 회원가입 및 관리: 회원 탈퇴 시까지\n   - 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지\n   - 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료시까지\n   - 서비스 이용에 따른 채권·채무관계 잔존시에는 해당 채권·채무관계 정산시까지\n\n나. 재화 또는 서비스 제공: 재화·서비스 공급완료 및 요금결제·정산 완료시까지\n   - 다만, 다음의 사유에 해당하는 경우에는 해당 기간 종료시까지\n   - "전자상거래 등에서의 소비자 보호에 관한 법률"에 따른 표시·광고, 계약내용 및 이행 등에 관한 기록: 3년',
    },
    {
      title: '3. 처리하는 개인정보의 항목',
      content:
        '① 회사는 다음의 개인정보 항목을 처리하고 있습니다.\n\n가. 회원가입 및 관리\n   필수항목: 이메일주소, 비밀번호, 닉네임\n   선택항목: 전화번호, 프로필 사진\n\n나. 서비스 이용 과정에서 자동으로 생성되는 정보\n   - IP주소, 쿠키, MAC주소, 서비스 이용 기록, 방문 기록, 불량 이용 기록 등\n\n다. 위치정보 서비스 이용 시\n   - GPS 좌표 정보, 위치 기반 서비스 이용 기록\n\n② 다음의 경우에는 해당 개인정보도 함께 처리할 수 있습니다.\n   - 인터넷 서비스 이용과정에서 자동 생성·수집되는 정보\n   - 법령에 의해 수집이 허용되는 개인정보',
    },
    {
      title: '4. 개인정보의 제3자 제공',
      content:
        '① 회사는 정보주체의 개인정보를 개인정보의 처리목적에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.\n\n② 회사는 다음과 같이 개인정보를 제3자에게 제공하고 있습니다.\n\n가. 현재 제3자 제공은 하지 않음\n   - 단, 향후 제3자 제공이 필요한 경우 사전에 동의를 받겠습니다.\n\n나. 다음의 경우는 예외로 합니다.\n   - 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우\n   - 통계작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 개인정보를 제공하는 경우',
    },
    {
      title: '5. 개인정보처리의 위탁',
      content:
        '① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.\n\n가. 클라우드 서비스 제공업체\n   - 위탁업체: Amazon Web Services Korea LLC\n   - 위탁업무: 서버 호스팅 및 데이터 저장\n   - 위탁기간: 서비스 제공 계약기간\n\n나. 인증 서비스 제공업체\n   - 위탁업체: Firebase (Google)\n   - 위탁업무: 사용자 인증 및 분석\n   - 위탁기간: 서비스 제공 계약기간\n\n② 회사는 위탁계약 체결시 개인정보보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.',
    },
    {
      title: '6. 정보주체의 권리·의무 및 행사방법',
      content:
        '① 정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.\n\n가. 개인정보 열람요구\n나. 오류 등이 있을 경우 정정·삭제 요구\n다. 처리정지 요구\n\n② 제1항에 따른 권리 행사는 회사에 대해 개인정보보호법 시행규칙 별지 제8호 서식에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 회사는 이에 대해 지체없이 조치하겠습니다.\n\n③ 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 회사는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.\n\n④ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.',
    },
    {
      title: '7. 개인정보의 파기',
      content:
        '① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.\n\n② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.\n\n③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.\n\n가. 파기절차\n   - 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.\n\n나. 파기방법\n   - 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.\n   - 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.',
    },
    {
      title: '8. 개인정보의 안전성 확보조치',
      content:
        '회사는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.\n\n① 개인정보 취급 직원의 최소화 및 교육\n   - 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화 하여 개인정보를 관리하는 대책을 시행하고 있습니다.\n\n② 정기적인 자체 감사 실시\n   - 개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체 감사를 실시하고 있습니다.\n\n③ 개인정보의 암호화\n   - 이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.\n\n④ 해킹 등에 대비한 기술적 대책\n   - 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고 기술적/물리적으로 감시 및 차단하고 있습니다.',
    },
    {
      title: '9. 개인정보 보호책임자',
      content:
        '① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.\n\n▶ 개인정보 보호책임자\n성명: 홍길동\n직책: CTO\n연락처: privacy@bemo.app\n\n② 정보주체께서는 회사의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.\n\n③ 기타 개인정보침해신고는 아래의 기관에 신고하실 수 있습니다.\n   - 개인정보침해신고센터 (privacy.go.kr / 국번없이 182)\n   - 대검찰청 사이버범죄수사단 (www.spo.go.kr / 02-3480-3573)\n   - 경찰청 사이버테러대응센터 (www.netan.go.kr / 국번없이 182)',
    },
    {
      title: '10. 개인정보 처리방침의 변경',
      content:
        '① 이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.\n\n② 본 방침은 2024년 1월 1일부터 시행됩니다.\n\n③ 이전의 개인정보 처리방침은 아래에서 확인하실 수 있습니다.\n   - 이전 버전 없음 (최초 작성)',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* 헤더 */}
      <View
        style={{
          paddingTop: insets.top,
          paddingHorizontal: 16,
          paddingBottom: 16,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable onPress={() => router.back()}>
            <Feather name='arrow-left' size={24} color='#333' />
          </Pressable>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#333',
            }}
          >
            개인정보처리방침
          </Text>
          <View style={{ width: 24 }} />
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 정보 */}
        <View style={{ padding: 20, backgroundColor: '#fff', marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#333',
              marginBottom: 8,
            }}
          >
            개인정보처리방침
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
              marginBottom: 12,
            }}
          >
            시행일자: 2024년 1월 1일
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
            }}
          >
            BeMo는 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한
            이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.
          </Text>
        </View>

        {/* 개인정보 처리방침 내용 */}
        <View style={{ marginHorizontal: 16 }}>
          {privacySections.map((section, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: 20,
                marginBottom: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#333',
                  marginBottom: 12,
                }}
              >
                {section.title}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#666',
                  lineHeight: 22,
                }}
              >
                {section.content}
              </Text>
            </View>
          ))}
        </View>

        {/* 연락처 정보 */}
        <View
          style={{
            margin: 16,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#333',
              marginBottom: 12,
            }}
          >
            🔒 개인정보 관련 문의
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
              marginBottom: 8,
            }}
          >
            개인정보 보호책임자: 홍길동 (CTO)
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#666',
              lineHeight: 20,
              marginBottom: 8,
            }}
          >
            이메일: privacy@bemo.app
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#999',
              lineHeight: 18,
            }}
          >
            개인정보와 관련한 문의사항이 있으시면 언제든지 연락해주시기 바랍니다.
          </Text>
        </View>

        {/* 신고센터 정보 */}
        <View
          style={{
            margin: 16,
            marginTop: 0,
            padding: 20,
            backgroundColor: '#f8f9fa',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#e9ecef',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#495057',
              marginBottom: 8,
            }}
          >
            📞 개인정보침해 신고센터
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#6c757d',
              lineHeight: 18,
            }}
          >
            • 개인정보침해신고센터: privacy.go.kr (국번없이 182){'\n'}• 대검찰청 사이버범죄수사단:
            www.spo.go.kr{'\n'}• 경찰청 사이버테러대응센터: www.netan.go.kr
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicyScreen;
