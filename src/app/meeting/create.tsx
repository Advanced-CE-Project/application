import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Slider from '@react-native-community/slider';
import React from 'react';
import { Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { DaumPostcode } from '@/components/ui/daum-postcode';
import { Input } from '@/components/ui/input';
import { useMeetingCreate } from '@/hooks/screens/use-meeting-create';

const CreateMeetingScreen = () => {
  const {
    insets,
    formData,
    setFormData,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
    isCreating,
    isFormValid,
    openAddressSearch,
    closeAddressSearch,
    handleAddressSelect,
    addTag,
    removeTag,
    toggleTagInput,
  } = useMeetingCreate();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 40,
          paddingBottom: insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* 모임명 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#4A90E2',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name='edit-3' size={16} color='#fff' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모임명</Text>
          </View>
          <Input
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder='모임의 이름을 입력하세요'
            style={{
              backgroundColor: '#fff',
              borderColor: formData.name.trim().length >= 2 ? '#4A90E2' : '#e0e0e0',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              fontSize: 16,
            }}
            containerStyle={{ marginBottom: 0 }}
          />
          {formData.name.trim().length > 0 && formData.name.trim().length < 2 && (
            <Text style={{ fontSize: 12, color: '#F44336', marginTop: 4 }}>
              모임명은 2자 이상 입력해주세요
            </Text>
          )}
        </View>

        {/* 날짜 및 시간 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#34c759',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name='calendar' size={16} color='#fff' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>날짜 및 시간</Text>
          </View>

          <View style={{ gap: 12 }}>
            <Pressable
              onPress={() => setFormData({ ...formData, showDatePicker: true })}
              disabled={isCreating}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: isCreating ? 0.6 : 1,
              }}
            >
              <Text style={{ fontSize: 16, color: '#1a1a1a' }}>
                {formData.date.format('YYYY년 MM월 DD일')}
              </Text>
              <Feather name='chevron-down' size={20} color='#666' />
            </Pressable>

            <Pressable
              onPress={() => setFormData({ ...formData, showTimePicker: true })}
              disabled={isCreating}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: isCreating ? 0.6 : 1,
              }}
            >
              <Text style={{ fontSize: 16, color: '#1a1a1a' }}>
                {formData.date.format('A h시 mm분')}
              </Text>
              <Feather name='chevron-down' size={20} color='#666' />
            </Pressable>
          </View>
        </View>

        {/* 모임 장소 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#e74c3c',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name='map-pin' size={16} color='#fff' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모임 장소</Text>
          </View>

          <Pressable
            onPress={openAddressSearch}
            disabled={isCreating}
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: formData.address ? '#4A90E2' : '#e0e0e0',
              borderRadius: 12,
              padding: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              opacity: isCreating ? 0.6 : 1,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: formData.address ? '#1a1a1a' : '#999',
                flex: 1,
                marginRight: 8,
              }}
              numberOfLines={1}
            >
              {formData.address || '주소를 검색하세요'}
            </Text>
            <Feather name='search' size={20} color='#666' />
          </Pressable>

          {formData.address && (
            <View style={{ marginTop: 8 }}>
              <Text style={{ fontSize: 12, color: '#666' }}>우편번호: {formData.zonecode}</Text>
            </View>
          )}
        </View>

        {/* 모집 인원 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#ff9500',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name='users' size={16} color='#fff' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모집 인원</Text>
          </View>

          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 12,
              padding: 20,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: '#4A90E2',
                marginBottom: 8,
              }}
            >
              {formData.participantCount}명
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: '#666',
                marginBottom: 16,
              }}
            >
              최대 모집 인원을 설정하세요
            </Text>
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={1}
              maximumValue={15}
              step={1}
              value={formData.participantCount}
              onValueChange={(value) => setFormData({ ...formData, participantCount: value })}
              minimumTrackTintColor='#4A90E2'
              maximumTrackTintColor='#e0e0e0'
              thumbTintColor='#4A90E2'
              disabled={isCreating}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 8,
              }}
            >
              <Text style={{ fontSize: 12, color: '#999' }}>1명</Text>
              <Text style={{ fontSize: 12, color: '#999' }}>15명</Text>
            </View>
          </View>
        </View>

        {/* 태그 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#2ecc71',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name='tag' size={16} color='#fff' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>태그</Text>
            <Text style={{ fontSize: 14, color: '#666', marginLeft: 8 }}>(선택사항, 최대 5개)</Text>
          </View>

          {/* 추가된 태그들 */}
          {formData.tags.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: 12,
                gap: 8,
              }}
            >
              {formData.tags.map((tag, index) => (
                <Pressable
                  key={index}
                  onPress={() => removeTag(tag)}
                  style={{
                    backgroundColor: '#4A90E2',
                    borderRadius: 20,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#fff', fontSize: 14, marginRight: 4 }}>#{tag}</Text>
                  <Feather name='x' size={14} color='#fff' />
                </Pressable>
              ))}
            </View>
          )}

          {/* 태그 추가 버튼/입력 */}
          {!formData.showTagInput ? (
            <Pressable
              onPress={toggleTagInput}
              disabled={isCreating || formData.tags.length >= 5}
              style={{
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 12,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: isCreating || formData.tags.length >= 5 ? 0.6 : 1,
              }}
            >
              <Feather name='plus' size={20} color='#4A90E2' style={{ marginRight: 8 }} />
              <Text style={{ color: '#4A90E2', fontSize: 16, fontWeight: '500' }}>
                태그 추가하기
              </Text>
            </Pressable>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Input
                value={formData.tagInput}
                onChangeText={(text) => setFormData({ ...formData, tagInput: text })}
                placeholder='태그 입력 (예: 스포츠, 실내활동)'
                style={{
                  backgroundColor: '#fff',
                  borderColor: '#4A90E2',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontSize: 16,
                  flex: 1,
                }}
                containerStyle={{ marginBottom: 0, flex: 1 }}
                onSubmitEditing={addTag}
                autoFocus
                editable={!isCreating}
              />
              <Pressable
                onPress={addTag}
                disabled={!formData.tagInput.trim() || isCreating}
                style={{
                  backgroundColor: formData.tagInput.trim() ? '#4A90E2' : '#e0e0e0',
                  borderRadius: 12,
                  padding: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather name='check' size={20} color='#fff' />
              </Pressable>
              <Pressable
                onPress={toggleTagInput}
                disabled={isCreating}
                style={{
                  backgroundColor: '#e0e0e0',
                  borderRadius: 12,
                  padding: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Feather name='x' size={20} color='#666' />
              </Pressable>
            </View>
          )}
        </View>

        {/* 모임 설명 섹션 */}
        <View
          style={{
            backgroundColor: '#f8f9fa',
            borderRadius: 16,
            padding: 20,
            marginBottom: 32,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#8e44ad',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <Feather name='file-text' size={16} color='#fff' />
            </View>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>모임 설명</Text>
          </View>
          <Input
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder={'모임에 대한 설명을 입력하세요\n예: 등산 초보자도 환영합니다!'}
            multiline
            numberOfLines={4}
            style={{
              backgroundColor: '#fff',
              borderColor: '#e0e0e0',
              borderRadius: 12,
              paddingHorizontal: 16,
              paddingVertical: 14,
              height: 120,
              textAlignVertical: 'top',
              fontSize: 16,
              lineHeight: 22,
            }}
            containerStyle={{ marginBottom: 0 }}
            editable={!isCreating}
          />
          {formData.description.trim().length > 0 && formData.description.trim().length < 5 && (
            <Text style={{ fontSize: 12, color: '#F44336', marginTop: 4 }}>
              모임 설명은 5자 이상 입력해주세요
            </Text>
          )}
        </View>

        {/* 모임 생성 버튼 */}
        <Button
          title={isCreating ? '모임 생성 중...' : '모임 생성하기'}
          onPress={handleSubmit}
          disabled={!isFormValid || isCreating}
        />
      </ScrollView>

      {/* Daum Postcode 모달 */}
      <DaumPostcode
        visible={formData.showAddressSearch}
        onClose={closeAddressSearch}
        onComplete={handleAddressSelect}
      />

      {/* 날짜 선택기 */}
      {formData.showDatePicker && (
        <>
          {Platform.OS === 'ios' && (
            <Pressable
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'flex-end',
              }}
              onPress={() => setFormData({ ...formData, showDatePicker: false })}
            >
              <View style={{ backgroundColor: '#fff', paddingBottom: insets.bottom }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                  }}
                >
                  <Pressable onPress={() => setFormData({ ...formData, showDatePicker: false })}>
                    <Text style={{ color: '#4A90E2', fontSize: 16 }}>취소</Text>
                  </Pressable>
                  <Pressable onPress={() => setFormData({ ...formData, showDatePicker: false })}>
                    <Text style={{ color: '#4A90E2', fontSize: 16, fontWeight: '600' }}>완료</Text>
                  </Pressable>
                </View>
                <DateTimePicker
                  value={formData.date.toDate()}
                  mode='date'
                  display='spinner'
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                />
              </View>
            </Pressable>
          )}
          {Platform.OS === 'android' && (
            <DateTimePicker
              value={formData.date.toDate()}
              mode='date'
              display='default'
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </>
      )}

      {/* 시간 선택기 */}
      {formData.showTimePicker && (
        <>
          {Platform.OS === 'ios' && (
            <Pressable
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'flex-end',
              }}
              onPress={() => setFormData({ ...formData, showTimePicker: false })}
            >
              <View style={{ backgroundColor: '#fff', paddingBottom: insets.bottom }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e0e0e0',
                  }}
                >
                  <Pressable onPress={() => setFormData({ ...formData, showTimePicker: false })}>
                    <Text style={{ color: '#4A90E2', fontSize: 16 }}>취소</Text>
                  </Pressable>
                  <Pressable onPress={() => setFormData({ ...formData, showTimePicker: false })}>
                    <Text style={{ color: '#4A90E2', fontSize: 16, fontWeight: '600' }}>완료</Text>
                  </Pressable>
                </View>
                <DateTimePicker
                  value={formData.date.toDate()}
                  mode='time'
                  display='spinner'
                  onChange={handleTimeChange}
                />
              </View>
            </Pressable>
          )}
          {Platform.OS === 'android' && (
            <DateTimePicker
              value={formData.date.toDate()}
              mode='time'
              display='default'
              onChange={handleTimeChange}
            />
          )}
        </>
      )}
    </View>
  );
};

export default CreateMeetingScreen;
