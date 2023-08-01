import React from 'react';
import { View, Text } from 'react-native';

import PieChart from 'react-native-pie-chart';
import { ms } from 'react-native-size-matters';

import { COLORS, SH } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';

import styles from '../styles';

const OrderConvertion = ({ series, sliceColor, widthAndHeight, pieChartData }) => {
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
        <Text style={styles.percentageTextStyle}>{'100%'}</Text>

        <Spacer space={SH(12)} />
        <View style={styles.ordersRowView}>
          <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.incomingOrders}</Text>
          <Text style={styles.countTextStyle}>
            {`${parseInt(pieChartData?.[0]?.percentage)}%` ?? '0%'}
          </Text>
        </View>

        <View style={styles.ordersRowView}>
          <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.processingOrders}</Text>
          <Text style={styles.countTextStyle}>
            {`${parseInt(pieChartData?.[1]?.percentage)}%` ?? '0%'}
          </Text>
        </View>

        <View style={styles.ordersRowView}>
          <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.readyPickupOrders}</Text>
          <Text style={styles.countTextStyle}>
            {`${parseInt(pieChartData?.[2]?.percentage)}%` ?? '0%'}
          </Text>
        </View>

        <View style={styles.ordersRowView}>
          <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.completed}</Text>
          <Text style={styles.countTextStyle}>
            {`${parseInt(pieChartData?.[3]?.percentage)}%` ?? '0'}
          </Text>
        </View>
        <Spacer space={ms(10)} />
      </View>
    </View>
  );
};

export default OrderConvertion;
