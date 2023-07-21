import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/screens/PosRetail/PosRetail.styles';
import {
  cloth,
  crossButton,
  logo_icon,
  search_light,
  userImage,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { getUser } from '@/selectors/UserSelectors';

moment.suppressDeprecationWarnings = true;

export function CustomHeader({ crossHandler, iconShow }) {
  const getUserData = useSelector(getUser);
  const getPosUser = getUserData?.posLoginData;
  return (
    <View style={styles.searchScreenHeader}>
      <View style={styles.displayflex}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.cashLabelBold}>
            {moment().format('ddd DD MMM, YYYY')}
          </Text>
          <View style={styles._border} />
          <Text style={styles.cashLabelBold}>{moment().format('hh:mm A')}</Text>
          <View style={styles._border} />
        </View>

        <Text style={styles.cashLabelBold}>Walk-In</Text>
        <View style={styles._border} />
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
            {getPosUser?.user_profiles?.firstname ?? 'username'}
            {/* (
            {getPosUser?.user_profiles?.pos_role === null
              ? 'Merchant'
              : getPosUser?.user_profiles?.pos_role}
            ) */}
          </Text>
        </View>
        <Text style={styles.cashLabelBold}>POS No. #Front-CC01</Text>
        {iconShow ? (
          <TouchableOpacity onPress={crossHandler}>
            <Image source={crossButton} style={styles.crossBg} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
