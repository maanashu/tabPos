import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { deliveryTypes } from '@/constants/staticData';
import { strings } from '@/localization';
import { Spacer } from '@/components';
import { COLORS, SF, SH, SW } from '@/theme';
import { Fonts } from '@/assets';

const OrderStatus = ({ renderItem, series, sliceColor, widthAndHeight }) => {
  return (
    <View>
      {/* Today status */}
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

      <Spacer space={SH(15)} />

      {/* Current Status */}
      <View style={styles.currentStatusView}>
        <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>
        <FlatList data={deliveryTypes} renderItem={renderItem} />
      </View>

      <Spacer space={SH(15)} />

      {/* Order Convertion */}
      <View style={styles.orderConvertionView}>
        <Text style={styles.orderTextStyle}>{strings.shippingOrder.orderConvertion}</Text>

        <Spacer space={SH(22)} />
        <View style={styles.piechartViewStyle}>
          <PieChart
            series={series}
            coverRadius={0.65}
            sliceColor={sliceColor}
            coverFill={COLORS.white}
            widthAndHeight={widthAndHeight}
          />
          <Text style={styles.percentageTextStyle}>{'97.51%'}</Text>

          <Spacer space={SH(12)} />
          <View style={styles.ordersRowView}>
            <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.deliveredOrders}</Text>
            <Text style={styles.countTextStyle}>{strings.shippingOrder.deliveredCount}</Text>
          </View>

          <View style={styles.ordersRowView}>
            <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.cancelledOrders}</Text>
            <Text style={styles.countTextStyle}>{strings.shippingOrder.cancelledCount}</Text>
          </View>

          <View style={styles.ordersRowView}>
            <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.returnedOrders}</Text>
            <Text style={styles.countTextStyle}>{strings.shippingOrder.returnedCount}</Text>
          </View>
          <Spacer space={SH(7)} />
        </View>
      </View>
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  deliveryStatusViewStyle: {
    alignItems: 'flex-start',
    borderRadius: 10,
    paddingVertical: SH(16),
    backgroundColor: COLORS.white,
  },
  deliveryStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.primary,
    paddingLeft: SW(6),
  },
  deliveryOrderText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.solid_grey,
    paddingLeft: SW(6),
    paddingTop: SH(10),
  },
  deliveryOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentStatusView: {
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
  orderConvertionView: {
    borderRadius: 10,
    paddingHorizontal: 15,
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
    paddingVertical: 8,
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
