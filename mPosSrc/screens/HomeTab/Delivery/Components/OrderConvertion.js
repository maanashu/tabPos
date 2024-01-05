import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import PieChart from 'react-native-pie-chart';
import { ms } from 'react-native-size-matters';

import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH } from '@/theme';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getDelivery } from '@/selectors/DeliverySelector';

const OrderConvertion = () => {
  const getData = useSelector(getDelivery);
  const pieChartData = getData?.getOrderstatistics?.data;

  // const series = [
  //   pieChartData?.[0]?.count ?? 0,
  //   pieChartData?.[1]?.count ?? 0,
  //   pieChartData?.[2]?.count ?? 0,
  //   pieChartData?.[3]?.count ?? 0,
  // ];

  // let sum = 0;
  // series?.forEach((num) => (sum += num));

  const series = [
    pieChartData?.[3]?.count ?? 0,
    pieChartData?.[4]?.count ?? 0,
    pieChartData?.[5]?.count ?? 0,
    pieChartData?.[6]?.count ?? 0,
  ];

  let sum = 0;
  series?.forEach((num) => (sum += num));

  const sliceColor = [COLORS.bluish_green, COLORS.pink, COLORS.yellowTweet, COLORS.primary];

  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );

  return (
    <View style={styles.orderConvertionView}>
      <Text style={styles.orderTextStyle}>{strings.delivery.orders}</Text>

      <Spacer space={ms(20)} />

      <View style={styles.pieChartMainView}>
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
          <View style={{ flex: 1 }}>
            <View style={styles.ordersRowView}>
              <View style={styles.orderLabelView}>
                <Text style={styles.orderTypeTextStyle}>{strings.delivery.incomingOrders}</Text>
              </View>

              <View style={styles.ordersView}>
                <Text style={styles.countTextStyle}>
                  {`${parseInt(pieChartData?.[3]?.percentage)}%` ?? '0%'}
                </Text>
              </View>
            </View>

            <View style={styles.ordersRowView}>
              <View style={styles.orderLabelView}>
                <Text style={styles.orderTypeTextStyle}>{strings.delivery.processingOrders}</Text>
              </View>

              <View style={styles.ordersView}>
                <Text style={styles.countTextStyle}>
                  {`${parseInt(pieChartData?.[4]?.percentage)}%` ?? '0%'}
                </Text>
              </View>
            </View>

            <View style={styles.ordersRowView}>
              <View style={styles.orderLabelView}>
                <Text style={styles.orderTypeTextStyle}>{strings.delivery.readyPickupOrders}</Text>
              </View>

              <View style={styles.ordersView}>
                <Text style={styles.countTextStyle}>
                  {`${parseInt(pieChartData?.[5]?.percentage ?? 0)}%` ?? '0%'}
                </Text>
              </View>
            </View>

            <View style={styles.ordersRowView}>
              <View style={styles.orderLabelView}>
                <Text style={styles.orderTypeTextStyle}>{strings.delivery.completed}</Text>
              </View>

              <View style={styles.ordersView}>
                <Text style={styles.countTextStyle}>
                  {`${parseInt(pieChartData?.[6]?.percentage ?? 0)}%` ?? '0'}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(OrderConvertion);

const styles = StyleSheet.create({
  orderConvertionView: {
    flex: 1,
    borderRadius: 10,
    padding: ms(20),
    marginHorizontal: ms(15),
    marginBottom: ms(10),
    backgroundColor: COLORS.white,
  },
  orderTextStyle: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  pieChartMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    paddingHorizontal: ms(30),
  },
  ordersRowView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(5),
    justifyContent: 'space-between',
    marginLeft: ms(15),
  },
  orderTypeTextStyle: {
    fontSize: SF(12),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Medium,
  },
  countTextStyle: {
    fontSize: SF(12),
    color: COLORS.dark_grey,
    paddingLeft: 10,
    fontFamily: Fonts.SemiBold,
  },
  orderLabelView: { flex: 0.8 },
  ordersView: { flex: 0.3 },
});
