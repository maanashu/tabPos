import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

import PieChart from 'react-native-pie-chart';
import { ms, scale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SW } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { useSelector } from 'react-redux';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/DeliveringOrderTypes';

const { width, height } = Dimensions.get('window');

const OrderConversion = () => {
  const getOrdersData = useSelector(getDelivery);
  const pieChartData = getOrdersData?.getOrderstatistics?.data;

  const series = [
    pieChartData?.[0]?.count ?? 0,
    pieChartData?.[1]?.count ?? 0,
    pieChartData?.[2]?.count ?? 0,
    pieChartData?.[3]?.count ?? 0,
  ];

  let sum = 0;
  series.forEach((num) => {
    sum += num;
  });

  const sliceColor = [COLORS.primary, COLORS.pink, COLORS.yellowTweet, COLORS.lightGreen];

  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );

  return (
    <View style={styles.orderConvertionView}>
      <Text style={styles.orderTextStyle}>{strings.shippingOrder.orderConvertion}</Text>

      <Spacer space={ms(6)} />
      <View style={styles.piechartViewStyle}>
        <View>
          <PieChart
            series={sum > 0 ? series : [100]}
            coverRadius={0.7}
            sliceColor={sum > 0 ? sliceColor : [COLORS.light_sky]}
            coverFill={COLORS.white}
            widthAndHeight={140}
          />
          <View style={styles.percentageView}>
            <Text style={styles.percentageTextStyle}>{sum > 0 ? '100%' : '0%'}</Text>
          </View>
        </View>

        <Spacer space={ms(8)} />
        {orderConversionLoading ? (
          <View style={styles.loaderViewStyle}>
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
        <Spacer space={ms(10)} />
      </View>
    </View>
  );
};

export default memo(OrderConversion);

const styles = StyleSheet.create({
  orderConvertionView: {
    borderRadius: 10,
    backgroundColor: COLORS.white,
    height: height / 2.35,
  },
  orderTextStyle: {
    fontFamily: Fonts.MaisonBold,
    fontSize: scale(7),
    color: COLORS.solid_grey,
    paddingLeft: ms(12),
    paddingTop: ms(9),
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
  loaderViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(35),
  },
  ordersRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SW(80),
    justifyContent: 'space-between',
    paddingVertical: ms(4),
    paddingHorizontal: ms(12),
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
