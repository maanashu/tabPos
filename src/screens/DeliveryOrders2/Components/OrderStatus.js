import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { deliveryTypes } from '@/constants/staticData';
import { strings } from '@/localization';
import { Spacer } from '@/components';
import { COLORS, SF, SH, SW } from '@/theme';
import { Fonts } from '@/assets';
import { ms } from 'react-native-size-matters';

const OrderStatus = ({ renderItem, series, sliceColor, widthAndHeight }) => {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={styles.deliveryStatusViewStyle}>
        <Text style={styles.deliveryStatusText}>{strings.deliveryOrders2.orderStatus}</Text>

        <View style={styles.deliveryOrdersViewStyle}>
          <Text style={styles.deliveryOrderText}>{strings.analytics.deliveryOrder}</Text>
          <Text style={styles.deliveryOrderText}>{'23'}</Text>
        </View>

        <View style={styles.deliveryOrdersViewStyle}>
          <Text style={styles.deliveryOrderText}>{strings.deliveryOrders2.pickupOrders}</Text>
          <Text style={styles.deliveryOrderText}>{'10'}</Text>
        </View>
      </View>

      <View style={styles.currentStatusView}>
        <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>
        <FlatList data={deliveryTypes} renderItem={renderItem} />
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  deliveryStatusViewStyle: {
    alignItems: 'flex-start',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingVertical: ms(3),
    // width: ms(184),
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.white,
  },
  deliveryStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.primary,
    paddingLeft: ms(5),
    paddingTop: 5,
  },
  deliveryOrderText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.solid_grey,
    paddingLeft: ms(5),
    paddingTop: ms(2),
  },
  deliveryOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  currentStatusView: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginTop: ms(10),
    paddingVertical: ms(9),
  },
  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.text,
    paddingLeft: ms(10),
    paddingTop: 5,
  },
  orderConvertionView: {
    borderRadius: 10,
    paddingHorizontal: 15,
    flex: 1,
    // paddingBottom: 10,
    // height: Dimensions.get('window').height / 2.25,
    backgroundColor: COLORS.white,
  },
  orderTextStyle: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
    paddingTop: 13,
  },
  piechartViewStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.black,
    position: 'absolute',
    textAlign: 'center',
    top: 90,
  },
  ordersRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(80),
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  orderTypeTextStyle: {
    fontFamily: Fonts.Medium,
    fontSize: SF(14),
    color: COLORS.dark_grey,
  },
  countTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.dark_grey,
  },
});
