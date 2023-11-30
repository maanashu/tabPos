import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { cloth, crossButton, logo_icon, newLogo, search_light, sunIcon, userImage } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';

const CustomHeaderPOSUsers = ({ crossHandler, iconShow, showUserName = true }) => {
  const getUserData = useSelector(getUser);
  const getPosUser = getUserData?.posLoginData;
  return (
    <View style={styles.searchScreenHeader}>
      <View style={[styles.displayflex, { marginHorizontal: ms(24) }]}>
        <Image
          source={newLogo}
          style={{
            height: ms(42),
            width: ms(30),
            borderRadius: ms(60),
            backgroundColor: COLORS.white,
            marginRight: ms(32),
          }}
          resizeMode="contain"
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: ms(32),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={sunIcon}
              style={{
                height: ms(20),
                width: ms(20),
                marginRight: ms(6),
              }}
              resizeMode="contain"
            />
            <Text style={styles.cashLabelBold}>{moment().format('hh:mm a')}</Text>
            <View style={styles._border} />
            {/* <Text style={styles.cashLabelBold}>{moment().format('ddd DD MMM, YYYY')}</Text> */}
            <Text style={styles.cashLabelBold}>{moment().format('LLL')}</Text>

            {/* <View style={styles._border} /> */}
          </View>

          {/* <View style={styles._border} /> */}
          {showUserName ? (
            <View style={styles.displayRow}>
              <Image
                source={
                  getPosUser?.user_profiles?.profile_photo
                    ? { uri: getPosUser?.user_profiles?.profile_photo }
                    : userImage
                }
                style={styles.iconStyle}
              />
              <Text style={styles.cashLabelBold}>
                {getPosUser?.user_profiles?.firstname ?? 'username'}(
                {getPosUser?.user_roles?.length > 0
                  ? getPosUser?.user_roles?.map((item, index) => item.role?.name)
                  : 'admin'}
                )
              </Text>
            </View>
          ) : (
            <View />
          )}
          {/* <View style={styles._border} /> */}
          {getUserData?.posLoginData?.pos_number && (
            <Text style={styles.cashLabelBold}>
              POS No. {getUserData?.posLoginData?.pos_number}
            </Text>
          )}
          <View style={[styles.walkinCon, { borderWidth: 1 }]}>
            <Text style={styles.cashLabelBold}>Walk-In</Text>
          </View>

          {iconShow && (
            <TouchableOpacity onPress={crossHandler}>
              <Image source={crossButton} style={styles.crossBg} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CustomHeaderPOSUsers;

const styles = StyleSheet.create({
  searchScreenHeader: {
    height: SH(60),
    justifyContent: 'center',
  },
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cashLabelBold: {
    color: COLORS.navy_light_blue,
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
  },
  _border: {
    height: ms(10),
    backgroundColor: COLORS.solidGrey,
    width: ms(1),
    marginHorizontal: ms(10),
  },
  cashLabelBold: {
    color: COLORS.navy_light_blue,
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    width: SW(8),
    height: SW(8),
    resizeMode: 'contain',
    borderRadius: 100,
    marginRight: ms(3),
  },
  walkinCon: {
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(10),
    paddingVertical: ms(5),
    borderRadius: ms(30),
  },
  crossBg: {
    width: SW(10),
    height: SW(8),
    resizeMode: 'contain',
  },
});
