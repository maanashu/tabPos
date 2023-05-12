import { getAllPosUsers } from '@/actions/AuthActions';
import { Fonts, checkArrow } from '@/assets';
import { clay } from '@/assets';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLORS, SH } from '@/theme';
import moment from 'moment';
import { string } from 'prop-types';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Image, ScrollView } from 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';

export function POSUsers({ navigation }) {
  const dispatch = useDispatch();
  const [posusers, setposusers] = useState([]);

  useEffect(() => {
    dispatch(
      getAllPosUsers(res => {
        setposusers(res.users);
      })
    );
  }, []);

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 10,
        backgroundColor: '#FFFFFF',
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
        data={posusers}
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
                source={clay}
                style={{ width: SH(100), height: SH(100) }}
              />
              <Text
                style={{
                  fontSize: SH(16),
                  fontFamily: Fonts.SemiBold,
                  color: COLORS.black,
                }}
              >
                {item.user_profiles?.firstname}
              </Text>
              <Text
                style={{
                  fontSize: SH(14),
                  fontFamily: Fonts.SemiBold,
                  color: COLORS.primary,
                }}
              >
                {item.user_profiles?.pos_role}
              </Text>
              {item.api_tokens.length > 0 && (
                <>
                  <Text
                    style={{
                      fontSize: SH(12),
                      color: COLORS.solid_grey,
                      fontFamily: Fonts.Regular,
                      marginTop: SH(40),
                    }}
                  >
                    {moment(item.api_tokens[0].created_at).format(
                      'dddd,DD MMM YYYY'
                    )}
                  </Text>
                  <Text
                    style={{
                      fontSize: SH(12),
                      color: COLORS.solid_grey,
                      fontFamily: Fonts.Regular,
                    }}
                  >
                    {moment(item.api_tokens[0].created_at).format('hh:mm a')}
                  </Text>
                </>
              )}
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
                onPress={() =>
                  navigation.navigate(NAVIGATION.loginIntial, {
                    posuserdata: item,
                  })
                }
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
