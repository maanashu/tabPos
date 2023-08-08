import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import PieChart from 'react-native-pie-chart';
import { ms } from 'react-native-size-matters';

import { COLORS } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';

import styles from '../ShippingOrder2.styles';

const OrderConversion = ({
  series,
  sliceColor,
  widthAndHeight,
  pieChartData,
  sum,
  orderConversionLoading,
}) => (
  <View style={styles.orderConvertionView}>
    <Text style={styles.orderTextStyle}>{strings.shippingOrder.orderConvertion}</Text>

    <Spacer space={ms(6)} />
    <View style={styles.piechartViewStyle}>
      {sum > 0 ? (
        <PieChart
          series={series}
          coverRadius={0.7}
          sliceColor={sliceColor}
          coverFill={COLORS.white}
          widthAndHeight={widthAndHeight}
        />
      ) : (
        <PieChart
          series={[100]}
          coverRadius={0.7}
          sliceColor={[COLORS.light_sky]}
          coverFill={COLORS.white}
          widthAndHeight={140}
        />
      )}
      <Text style={styles.percentageTextStyle}>{sum > 0 ? '100%' : '0%'}</Text>

      <Spacer space={ms(8)} />
      {orderConversionLoading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: ms(35),
          }}
        >
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        </View>
      ) : (
        <>
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
        </>
      )}
      <Spacer space={ms(10)} />
    </View>
  </View>
);

export default OrderConversion;
