import { getAllPosUsers } from '@/actions/AuthActions';
import { Fonts, checkArrow } from '@/assets';
import { clay } from '@/assets';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLORS, SH } from '@/theme';
import { string } from 'prop-types';
import React from 'react';
import { useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

export function POSUsers({ navigation }) {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(getAllPosUsers());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
      }}
    >
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
                margin: SH(25),
                padding: SH(10),
                width: SH(306),
                height: SH(370),
                borderRadius: 15,
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
                  borderRadius: 5,
                }}
                onPress={() => navigation.navigate(NAVIGATION.loginIntial)}
              >
                <Image
                  source={checkArrow}
                  style={{ width: SH(30), height: SH(20) }}
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
