import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import dayjs from 'dayjs';
import { ms } from 'react-native-size-matters';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { NAVIGATION } from '@mPOS/constants';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { navigate } from '@mPOS/navigation/NavigationRef';

export function LoginPosUser({ setPosUserModal, selectedUser }) {
  return (
    <View style={styles.modalViewStyle}>
      <TouchableOpacity onPress={() => setPosUserModal(false)}>
        <Image source={Images.cross} style={styles.crossImageStyle} />
      </TouchableOpacity>

      <View style={styles.userDetailViewStyle}>
        <Text style={styles.confirmLoginTextStyle}>{strings.login.confirmLogin.toUpperCase()}</Text>

        <Spacer space={SH(20)} />

        <Image
          style={styles.profileImageStyle}
          source={
            selectedUser.user?.user_profiles?.profile_photo
              ? { uri: selectedUser.user?.user_profiles?.profile_photo }
              : Images.user
          }
        />

        <Text style={styles.userNameTextStyle}>
          {selectedUser?.user?.user_profiles?.firstname ?? '-'}
        </Text>

        <Text style={styles.roleTextStyle}>
          {selectedUser?.user?.user_roles?.length > 0
            ? selectedUser?.user?.user_roles?.map((roleItem) => roleItem?.role?.name)
            : 'admin'}
        </Text>

        {selectedUser?.user?.api_tokens.length > 0 && (
          <>
            <Text style={styles.datetimeTextStyle}>
              {dayjs(selectedUser?.user?.api_tokens[0].updated_at).format('dddd, DD MMM YYYY')}
            </Text>

            <Text style={styles.datetimeTextStyle}>
              {dayjs(selectedUser?.user?.api_tokens[0].updated_at).format('hh:mm a')}
            </Text>
          </>
        )}
      </View>

      <TouchableOpacity
        onPress={() => {
          setPosUserModal(false);
          navigate(NAVIGATION.login, { posUser: selectedUser });
        }}
        style={styles.buttonStyle}
      >
        <Text style={styles.buttonTextStyle}>{strings.phoneNumber.button}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modalViewStyle: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
  },
  crossImageStyle: {
    width: SW(28),
    height: SW(28),
    marginRight: SW(10),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginVertical: SH(15),
  },
  userDetailViewStyle: {
    alignItems: 'center',
  },
  confirmLoginTextStyle: {
    fontSize: SF(24),
    textAlign: 'center',
    color: COLORS.dark_gray,
    fontFamily: Fonts.MaisonMonoBold,
  },
  profileImageStyle: {
    width: SW(80),
    height: SW(80),
    borderRadius: SW(40),
    resizeMode: 'cover',
  },
  userNameTextStyle: {
    fontSize: SF(16),
    paddingTop: SH(8),
    textAlign: 'center',
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  roleTextStyle: {
    fontSize: SF(14),
    paddingTop: SH(6),
    textAlign: 'center',
    color: COLORS.darkBlue,
    fontFamily: Fonts.SemiBold,
  },
  datetimeTextStyle: {
    fontSize: SF(9),
    paddingTop: SH(6),
    textAlign: 'center',
    color: COLORS.dark_gray,
    fontFamily: Fonts.Regular,
  },
  buttonStyle: {
    height: SH(44),
    width: SW(300),
    borderRadius: 5,
    marginTop: ms(30),
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: ms(20),
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
  },
  buttonTextStyle: {
    fontSize: SF(12),
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
});
