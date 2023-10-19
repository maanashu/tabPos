import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import PieChart from 'react-native-pie-chart';
import { ms, scale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const OrderConvertion = () => {
  const getData = useSelector(getDelivery);
  const pieChartData = getData?.getOrderstatistics?.data;

  const series = [
    pieChartData?.[0]?.count ?? 0,
    pieChartData?.[1]?.count ?? 0,
    pieChartData?.[2]?.count ?? 0,
    pieChartData?.[3]?.count ?? 0,
  ];

  let sum = 0;
  series?.forEach((num) => {
    sum += num;
  });

  const sliceColor = [COLORS.lightGreen, COLORS.pink, COLORS.yellowTweet, COLORS.primary];

  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );

  return (
    <View style={styles.orderConvertionView}>
      <Text style={styles.orderTextStyle}>{strings.shippingOrder.orderConvertion}</Text>

      <Spacer space={ms(20)} />
      <View style={styles.piechartViewStyle}>
        <View>
          <PieChart
            coverRadius={0.7}
            widthAndHeight={140}
            coverFill={COLORS.white}
            series={sum > 0 ? series : [100]}
            sliceColor={sum > 0 ? sliceColor : [COLORS.light_sky]}
          />
          <View style={styles.percentageView}>
            <Text style={styles.percentageTextStyle}>{sum > 0 ? '100%' : '0%'}</Text>
          </View>
        </View>

        <Spacer space={SH(20)} />

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
      </View>
    </View>
  );
};

export default memo(OrderConvertion);

const styles = StyleSheet.create({
  orderConvertionView: {
    flex: 1.6,
    borderRadius: 10,
    paddingBottom: ms(10),
    backgroundColor: COLORS.white,
  },
  orderTextStyle: {
    paddingTop: ms(9),
    fontSize: scale(7),
    paddingLeft: ms(12),
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
    fontSize: SF(14),
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
  },
  loaderViewStyle: {
    alignItems: 'center',
    paddingVertical: ms(35),
    justifyContent: 'center',
  },
  ordersRowView: {
    width: SW(80),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(5),
    paddingHorizontal: ms(12),
    justifyContent: 'space-between',
  },
  orderTypeTextStyle: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Medium,
  },
  countTextStyle: {
    fontSize: SF(14),
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
});
