import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';

import { type SettingItem, type SettingSection, useSettings } from '@/hooks/screens/use-settings';

const SettingsScreen = () => {
  const { insets, settingSections } = useSettings();

  const renderSettingItem = (item: SettingItem) => {
    return (
      <Pressable
        key={item.id}
        onPress={item.onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 16,
          paddingHorizontal: 20,
          backgroundColor: '#fff',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
        }}
      >
        {/* 아이콘 */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: item.color ? `${item.color}15` : '#f8f9fa',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 16,
          }}
        >
          <Feather name={item.icon as any} size={20} color={item.color || '#666'} />
        </View>

        {/* 텍스트 영역 */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: item.color || '#1a1a1a',
              marginBottom: item.subtitle ? 2 : 0,
            }}
          >
            {item.title}
          </Text>
          {item.subtitle && (
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                lineHeight: 18,
              }}
            >
              {item.subtitle}
            </Text>
          )}
        </View>

        {/* 오른쪽 요소 */}
        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={item.onToggle}
            trackColor={{ false: '#e0e0e0', true: '#4A90E2' }}
            thumbColor={'#fff'}
            ios_backgroundColor='#e0e0e0'
          />
        )}
        {item.type === 'navigation' && <Feather name='chevron-right' size={20} color='#999' />}
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        {settingSections.map((section, sectionIndex) => (
          <View key={section.title} style={{ marginTop: sectionIndex === 0 ? 24 : 32 }}>
            {/* 섹션 제목 */}
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#666',
                marginBottom: 8,
                marginHorizontal: 20,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              {section.title}
            </Text>

            {/* 섹션 아이템들 */}
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                marginHorizontal: 16,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              {section.items.map((item, itemIndex) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                  {itemIndex < section.items.length - 1 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#f0f0f0',
                        marginLeft: 76, // 아이콘 + 여백 크기만큼 들여쓰기
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* 하단 여백 */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;
