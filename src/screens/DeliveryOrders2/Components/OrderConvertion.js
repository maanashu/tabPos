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
import { ProgressChart } from 'react-native-chart-kit';

const OrderConvertion = () => {
  const getData = useSelector(getDelivery);
  const pieChartData = getData?.getOrderstatistics?.data;

  const series = [
    pieChartData?.[0]?.count ?? 0,
    pieChartData?.[1]?.count ?? 0,
    pieChartData?.[2]?.count ?? 0,
    // pieChartData?.[3]?.count ?? 0,
  ];
  let sum = 0;
  series?.forEach((num) => {
    sum += num;
  });

  // const sliceColor = [COLORS.lightGreen, COLORS.pink, COLORS.yellowTweet, COLORS.primary];
  const sliceColor = [COLORS.blur_red, COLORS.yellow, COLORS.extra_purple_300];
  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );
  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(242, 244, 247,${1})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const finalData = {
    data: series,
    colors: sliceColor,
  };
  return (
    <View style={styles.orderConvertionView}>
      <Text style={styles.orderTextStyle}>{strings.shippingOrder.orders}</Text>

      <Spacer space={ms(20)} />
      <View style={styles.piechartViewStyle}>
        <View>
          {/* <PieChart
            coverRadius={0.7}
            widthAndHeight={140}
            coverFill={COLORS.white}
            series={sum > 0 ? series : [100]}
            sliceColor={sum > 0 ? sliceColor : [COLORS.light_sky]}
          /> */}
          <ProgressChart
            data={finalData}
            width={ms(70)}
            height={ms(70)}
            strokeWidth={ms(4)}
            radius={ms(18)}
            chartConfig={chartConfig}
            hideLegend={true}
            withCustomBarColorFromData={true}
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
            {/* <View style={styles.ordersRowView}>
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
            </View> */}

            <View style={styles.ordersRowView}>
              {/* <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.incomingOrders}</Text> */}
              <Text style={[styles.orderTypeTextStyle, { color: COLORS.purple }]}>
                {strings.shippingOrder.delivered}
              </Text>
              <View style={[styles.countContainer]}>
                <View style={styles.deliveredDot}></View>
                <Text style={[styles.countTextStyle, { color: COLORS.purple }]}>
                  {`${parseInt(pieChartData?.[0]?.percentage)}%` ?? '0%'}
                </Text>
              </View>
            </View>

            <View style={styles.ordersRowView}>
              {/* <Text style={styles.orderTypeTextStyle}>
                {strings.shippingOrder.processingOrders}
              </Text> */}
              <Text style={[styles.orderTypeTextStyle, { color: COLORS.extraYellow }]}>
                {strings.shippingOrder.returned}
              </Text>
              <View style={[styles.countContainer, { color: COLORS.light_yellow }]}>
                <View style={styles.returnedDot}></View>
                <Text style={[styles.countTextStyle, { color: COLORS.extraYellow }]}>
                  {`${parseInt(pieChartData?.[1]?.percentage)}%` ?? '0%'}
                </Text>
              </View>
            </View>

            <View style={styles.ordersRowView}>
              {/* <Text style={styles.orderTypeTextStyle}>
                {strings.shippingOrder.readyPickupOrders}
              </Text> */}
              <Text style={[styles.orderTypeTextStyle, { color: COLORS.alert_red }]}>
                {strings.shippingOrder.cancelled}
              </Text>

              <View style={[styles.countContainer, { color: COLORS.light_red }]}>
                <View style={styles.cancelledDot}></View>
                <Text style={[styles.countTextStyle, { color: COLORS.alert_red }]}>
                  {`${parseInt(pieChartData?.[2]?.percentage)}%` ?? '0%'}
                </Text>
              </View>
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
    flex: 1.4,
    borderRadius: ms(10),
    paddingBottom: ms(10),
    backgroundColor: COLORS.white,
    // marginBottom: ms(30),
  },
  orderTextStyle: {
    paddingTop: ms(9),
    fontSize: scale(7),
    paddingLeft: ms(12),
    color: COLORS.navy_blue,
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
