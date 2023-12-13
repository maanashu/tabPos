import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { cloth, crossButton, logo_icon, search_light, userImage } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';
import { useEffect, useState } from 'react';
import { Images } from '@/assets/new_icon';
import { ms } from 'react-native-size-matters';
import { COLORS } from '@/theme';

moment.suppressDeprecationWarnings = true;

export function CalendarCustomHeader({ crossHandler, iconShow }) {
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
      <View style={styles.displayflex}>
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

          <Text style={styles.cashLabelBold}>{moment().format('hh:mm a')}</Text>
          <View style={styles._border} />
          <Text style={styles.cashLabelBold}>
            {moment().format('dddd') + ', ' + moment().format('LL')}
          </Text>
        </View>

        <View style={styles.displayRow}>
          {/* <Image
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
          </Text> */}
        </View>
        {/* <View style={styles._border} /> */}
        <View />
        <Text style={styles.cashLabelBold}>POS No. {getUserData?.posLoginData?.pos_number}</Text>
        <View style={styles.walkinCon}>
          <Text style={styles.cashLabelBold}>Walk-In</Text>
        </View>

        {/* {iconShow ? (
          <TouchableOpacity onPress={crossHandler}>
            <Image source={crossButton} style={styles.crossBg} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )} */}
      </View>
    </View>
  );
}
