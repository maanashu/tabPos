import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {
  cloth,
  crossButton,
  logo_icon,
  newLogo,
  powerAuth,
  search_light,
  sunIcon,
  userImage,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { ms } from 'react-native-size-matters';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Images } from '@/assets/new_icon';

const CustomHeaderPOSUsers = ({
  crossHandler,
  iconShow,
  showUserName = true,
  logoutHandler,
  logoutButton,
}) => {
  const getUserData = useSelector(getUser);
  const getPosUser = getUserData?.posLoginData;
  const [currentTime, setCurrentTime] = useState(moment());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isDaytime = () => {
    const currentHour = currentTime.hour();
    return currentHour >= 6 && currentHour < 18;
  };
  return (
    <View style={styles.searchScreenHeader}>
      <View style={[styles.displayflex, { marginHorizontal: ms(24) }]}>
        <Image
          source={newLogo}
          style={{
            height: ms(35),
            width: ms(25),
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
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ marginRight: ms(3) }}>
              {isDaytime() ? (
                <Image
                  source={Images.sun}
                  style={{ width: ms(15), height: ms(15), tintColor: COLORS.placeHoldeText }}
                />
              ) : (
                <Image
                  source={Images.moon}
                  style={{ width: ms(15), height: ms(15), tintColor: COLORS.placeHoldeText }}
                />
              )}
            </View>
            {/* <Image
              source={sunIcon}
              style={{
                height: ms(18),
                width: ms(18),
                marginRight: ms(6),
              }}
              resizeMode="contain"
            /> */}
            <Text style={styles.cashLabelBold}>{moment().format('hh:mm a')}</Text>
            <View style={styles._border} />
            {/* <Text style={styles.cashLabelBold}>{moment().format('ddd DD MMM, YYYY')}</Text> */}
            <Text style={styles.cashLabelBold}>
              {moment().format('dddd') + ', ' + moment().format('LL')}
            </Text>

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
          {/* {getUserData?.posLoginData?.pos_number && (
          <Text style={styles.cashLabelBold}>POS No. {getUserData?.posLoginData?.pos_number}</Text>
         )} */}
          <View style={[styles.walkinCon]}>
            <Text style={styles.cashLabelBold}>Walk-In</Text>
          </View>

          {/* {iconShow && (
            <TouchableOpacity onPress={crossHandler}>
              <Image source={crossButton} style={styles.crossBg} />
            </TouchableOpacity>
          )} */}
          {logoutButton && (
            <TouchableOpacity style={styles.logoutCon} onPress={() => logoutHandler()}>
              <Image source={powerAuth} style={styles.powerAuth} />
              <Text style={styles.logOut}>{strings.posUsersList.logOut}</Text>
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
    width: ms(55),
    height: ms(25),
    borderRadius: ms(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  crossBg: {
    width: SW(10),
    height: SW(8),
    resizeMode: 'contain',
  },
  logoutCon: {
    backgroundColor: COLORS.white,
    width: SW(40),
    height: ms(25),
    borderRadius: ms(18),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerAuth: {
    width: ms(10),
    height: ms(10),
    resizeMode: 'contain',
    marginRight: 4,
  },
  logOut: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
});
