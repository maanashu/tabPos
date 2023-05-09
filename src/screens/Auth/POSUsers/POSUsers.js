import { Fonts, checkArrow } from '@/assets';
import { clay } from '@/assets';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLORS, SH } from '@/theme';
import { string } from 'prop-types';
import React from 'react';
import { Image, ScrollView } from 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

export function POSUsers({ navigation }) {
  const userList = [
    {
      image: clay,
      name: 'Mililcent C.Edward',
      role: 'Admin/Manager',
      date: 'Today Wednesday 11 Aug 2022',
      time: 'Time 3:25 pm',
    },
    {
      image: clay,
      name: 'Mililcent C.Edward',
      role: 'Admin/Manager',
      date: 'Today Wednesday 11 Aug 2022',
      time: 'Time 3:25 pm',
    },
    {
      image: clay,
      name: 'Mililcent C.Edward',
      role: 'Admin/Manager',
      date: 'Today Wednesday 11 Aug 2022',
      time: 'Time 3:25 pm',
    },
    {
      image: clay,
      name: 'Mililcent C.Edward',
      role: 'Admin/Manager',
      date: 'Today Wednesday 11 Aug 2022',
      time: 'Time 3:25 pm',
    },
    {
      image: clay,
      name: 'Mililcent C.Edward',
      role: 'Admin/Manager',
      date: 'Today Wednesday 11 Aug 2022',
      time: 'Time 3:25 pm',
    },
  ];
  return (
    <View style={{ flex: 1, marginHorizontal: 10, backgroundColor: '#FFFFFF' }}>
      <Text
        style={{
          color: COLORS.black,
          fontSize: SH(16),
          fontFamily: Fonts.Bold,
          margin: SH(20),
        }}
      >
        {strings.posUsersList.heading}
      </Text>

      <FlatList
        data={userList}
        scrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ height: '100%' }}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                backgroundColor: COLORS.textInputBackground,
                alignItems: 'center',
                margin: SH(30),
                padding: SH(10),
                width: SH(306),
                height: SH(370),
              }}
            >
              <Image
                source={item.image}
                style={{ width: SH(100), height: SH(100) }}
              />
              <Text
                style={{
                  fontSize: SH(16),
                  fontFamily: Fonts.SemiBold,
                  color: COLORS.black,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: SH(14),
                  fontFamily: Fonts.SemiBold,
                  color: COLORS.primary,
                }}
              >
                {item.role}
              </Text>
              <Text
                style={{
                  fontSize: SH(12),
                  color: COLORS.solid_grey,
                  fontFamily: Fonts.Regular,
                }}
              >
                {item.date}
              </Text>
              <Text
                style={{
                  fontSize: SH(12),
                  color: COLORS.solid_grey,
                  fontFamily: Fonts.Regular,
                }}
              >
                {item.time}
              </Text>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={{
                  bottom: SH(15),
                  backgroundColor: COLORS.primary,
                  width: SH(84),
                  height: SH(44),
                  padding: SH(10),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => navigation.navigate(NAVIGATION.loginIntial)}
              >
                <Image
                  source={checkArrow}
                  style={{ width: SH(45), height: SH(30) }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
        numColumns={4}
      />
    </View>
  );
}
