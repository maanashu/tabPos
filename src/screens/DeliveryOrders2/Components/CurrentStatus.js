import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const result = Dimensions.get('window').height - 80;
const equalPartSize = result / 3;

const CurrentStatus = ({ deliverytypes }) => {
  const isDeliveryOrder = useSelector((state) =>
    isLoadingSelector([TYPES.DELIVERING_ORDER], state)
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={item?.image} style={styles.itemImageStyle} />
      {isDeliveryOrder ? (
        <View style={styles.activityIndicatorStyle}>
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        </View>
      ) : (
        <View style={styles.deliveryViewStyle}>
          <Text style={styles.deliveryTypeText}>{item?.delivery_type_title}</Text>
          <Text style={styles.totalTextStyle}>{item?.count}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.currentStatusView}>
      <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>

      <FlatList data={deliverytypes} renderItem={renderItem} showsVerticalScrollIndicator={false} />
    </View>
  );
};

export default memo(CurrentStatus);

const styles = StyleSheet.create({
  currentStatusView: {
    width: SW(100),
    borderRadius: 10,
    height: equalPartSize,
    paddingVertical: SH(10),
    backgroundColor: COLORS.white,
  },
  currentStatusText: {
    fontSize: SF(16),
    color: COLORS.text,
    paddingLeft: SW(6),
    fontFamily: Fonts.SemiBold,
  },
  itemMainViewStyle: {
    borderWidth: 1,
    marginHorizontal: SW(6),
    marginVertical: SH(3),
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
  },
  itemImageStyle: {
    width: ms(15),
    height: ms(15),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  activityIndicatorStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: ms(6),
    justifyContent: 'center',
    paddingHorizontal: ms(30),
  },
  deliveryViewStyle: {
    marginHorizontal: 15,
    justifyContent: 'center',
  },
  deliveryTypeText: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.SemiBold,
  },
  totalTextStyle: {
    fontSize: ms(7.2),
    paddingTop: ms(2),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
});
