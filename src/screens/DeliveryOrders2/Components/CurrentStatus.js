import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const CurrentStatus = ({ deliverytypes }) => {
  const isDeliveryOrder = useSelector((state) =>
    isLoadingSelector([TYPES.DELIVERING_ORDER, TYPES.GET_GRAPH_ORDERS], state)
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={item?.image} style={styles.shippingTypeImage} />
      {isDeliveryOrder ? (
        <View style={styles.activityIndicatorStyle}>
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        </View>
      ) : (
        <View style={styles.shippingTypeDetails}>
          <Text style={styles.shippingTypeText}>{item?.delivery_type_title}</Text>
          <Text style={styles.totalTextStyle}>{item?.count}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.currentStatusView}>
      <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>

      <FlatList data={deliverytypes} renderItem={renderItem} />
    </View>
  );
};

export default CurrentStatus;

const styles = StyleSheet.create({
  currentStatusView: {
    width: SW(100),
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingVertical: SH(15),
  },
  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.text,
    paddingLeft: SW(6),
  },
  itemMainViewStyle: {
    borderWidth: 1,
    marginHorizontal: SW(6),
    marginVertical: SH(4),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  shippingTypeImage: {
    width: ms(15),
    height: ms(15),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  activityIndicatorStyle: {
    paddingVertical: ms(6),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: ms(30),
  },
  shippingTypeDetails: {
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  shippingTypeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
    paddingTop: ms(2),
  },
});
