import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

import PieChart from 'react-native-pie-chart';
import { ms } from 'react-native-size-matters';

import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { Fonts } from '@/assets';

const result = Dimensions.get('window').height - 50;
const equalPartSize = result / 3;

const OrderConvertion = ({
  series,
  sliceColor,
  widthAndHeight,
  pieChartData,
  sum,
  orderConversionLoading,
}) => {
  return (
    <View style={styles.orderConvertionView}>
      <Text style={styles.orderTextStyle}>{strings.shippingOrder.orderConvertion}</Text>

      <Spacer space={ms(10)} />

      <View style={styles.piechartViewStyle}>
        <View>
          <PieChart
            series={sum > 0 ? series : [100]}
            coverRadius={0.7}
            sliceColor={sum > 0 ? sliceColor : [COLORS.light_sky]}
            coverFill={COLORS.white}
            widthAndHeight={sum > 0 ? widthAndHeight : 140}
          />
          <View style={styles.percentageView}>
            <Text style={styles.percentageTextStyle}>{sum > 0 ? '100%' : '0%'}</Text>
          </View>
        </View>

        <Spacer space={SH(10)} />

        {orderConversionLoading ? (
          <View style={styles.loaderView}>
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
              <Text style={styles.orderTypeTextStyle}>
                {strings.shippingOrder.processingOrders}
              </Text>
              <Text style={styles.countTextStyle}>
                {`${parseInt(pieChartData?.[1]?.percentage)}%` ?? '0%'}
              </Text>
            </View>

            <View style={styles.ordersRowView}>
              <Text style={styles.orderTypeTextStyle}>
                {strings.shippingOrder.readyPickupOrders}
              </Text>
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
      </View>
    </View>
  );
};

export default memo(OrderConvertion);

const styles = StyleSheet.create({
  orderConvertionView: {
    borderRadius: 10,
    paddingBottom: ms(10),
    height: equalPartSize + 120,
    backgroundColor: COLORS.white,
  },
  orderTextStyle: {
    fontSize: SF(18),
    paddingLeft: ms(6),
    paddingTop: ms(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
  },
  piechartViewStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageView: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
  },
  percentageTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(14),
    color: COLORS.black,
    textAlign: 'center',
  },
  ordersRowView: {
    width: SW(80),
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(30),
  },
});
