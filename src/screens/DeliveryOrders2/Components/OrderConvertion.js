import React from 'react';
import { View, Text } from 'react-native';

import PieChart from 'react-native-pie-chart';

import { COLORS, SH } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';

import styles from '../styles';
import { ms } from 'react-native-size-matters';

const OrderConvertion = ({ series, sliceColor, widthAndHeight }) => {
  return (
    <View style={styles.orderConvertionView}>
      <Text style={styles.orderTextStyle}>{strings.shippingOrder.orderConvertion}</Text>

      <Spacer space={ms(15)} />
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

        <View style={styles.ordersRowView}>
          <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.inprogress}</Text>
          <Text style={styles.countTextStyle}>{strings.shippingOrder.returnedCount}</Text>
        </View>
        <Spacer space={SH(7)} />
      </View>
    </View>
  );
};

export default OrderConvertion;
