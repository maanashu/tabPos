import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';

import { COLORS, SF, SH } from '@/theme';
import { Fonts, scooter, userImage } from '@/assets';
import { capitalizeFirstLetter } from '@/utils/GlobalMethods';

const CustomerDetails = ({ orderDetail }) => {
  const userDetails = orderDetail?.user_details;

  return (
    <View style={styles.orderDetailViewStyle}>
      <View style={styles.locationViewStyle}>
        <Image
          style={styles.userImageStyle}
          source={userDetails?.profile_photo ? { uri: userDetails?.profile_photo } : userImage}
        />

        <View style={styles.userNameView}>
          <Text style={[styles.totalTextStyle, { color: COLORS.navy_blue }]}>
            {`${capitalizeFirstLetter(userDetails?.firstname)} ${capitalizeFirstLetter(
              userDetails?.lastname
            )}`}
          </Text>

          <Text style={[styles.badgetext, { color: COLORS.lavender }]}>
            {`${userDetails?.current_address?.street_address}, ${userDetails?.current_address?.city}`}
          </Text>

          <Text style={[styles.badgetext, { color: COLORS.lavender }]}>
            {`${userDetails?.current_address?.state}, ${userDetails?.current_address?.country}`}
          </Text>
        </View>
      </View>

      <View style={[styles.locationViewStyle, { flex: 0.55 }]}>
        <Image source={scooter} style={styles.scooterImageStyle} />

        <View style={[styles.userNameView, { paddingLeft: 5 }]}>
          <Text style={[styles.datetextStyle, { color: COLORS.navy_blue }]}>
            {orderDetail?.invoices?.delivery_date
              ? moment.utc(orderDetail?.invoices?.delivery_date).local().format('DD MMM YYYY')
              : '-'}
          </Text>
          <Text style={[styles.preferredTextStyle, { color: COLORS.lavender }]}>
            {`${orderDetail?.preffered_delivery_start_time ?? '-'} - ${
              orderDetail?.preffered_delivery_end_time ?? '-'
            }`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(CustomerDetails);

const styles = StyleSheet.create({
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: ms(10),
    // paddingHorizontal: 20,
    // marginHorizontal: 10,
    // paddingVertical: 10,
    borderRadius: 10,
    // marginTop: ms(10),
    borderBottomWidth: 0.3,
    borderBottomColor: COLORS.light_grey,
    // backgroundColor: COLORS.textInputBackground,
  },
  locationViewStyle: {
    flex: 1,

    flexDirection: 'row',
    alignItems: 'center',
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  userNameView: {
    paddingLeft: 10,
    flex: 1,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
  },
  badgetext: {
    color: COLORS.dark_grey,
    fontSize: ms(5.5),
    fontFamily: Fonts.Medium,
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
  },
  datetextStyle: {
    fontFamily: Fonts.Bold,
    fontSize: ms(7.2),
    color: COLORS.primary,
  },
  preferredTextStyle: {
    fontFamily: Fonts.Medium,
    fontSize: ms(5.5),
    color: COLORS.dark_grey,
  },
});
