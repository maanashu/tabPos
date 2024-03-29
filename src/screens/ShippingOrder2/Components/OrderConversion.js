import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import PieChart from 'react-native-pie-chart';
import { ms, scale } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { Spacer } from '@/components';
import { COLORS, SF, SW } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/ShippingOrderTypes';
import { getShipping } from '@/selectors/ShippingSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { ProgressChart } from 'react-native-chart-kit';

const OrderConversion = () => {
  const getOrdersData = useSelector(getShipping);
  const pieChartData = getOrdersData?.getOrderstatistics?.data;
  const NewSeries = [
    pieChartData?.[0]?.percentage ? pieChartData?.[0]?.percentage / 100 : 0.0,
    pieChartData?.[1]?.percentage ? pieChartData?.[1]?.percentage / 100 : 0.0,
    pieChartData?.[2]?.percentage ? pieChartData?.[2]?.percentage / 100 : 0.0,
  ];
  const series = [
    pieChartData?.[0]?.count ?? 0,
    pieChartData?.[1]?.count ?? 0,
    pieChartData?.[2]?.count ?? 0,
  ];

  let sum = 0;
  series.forEach((num) => {
    sum += num;
  });

  const sliceColor = [COLORS.blur_red, COLORS.yellow, COLORS.tip_blue];

  const orderConversionLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_SHIPPING_ORDERS], state)
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
    data: NewSeries,
    colors: sliceColor,
  };

  return (
    <View style={styles.orderConvertionView}>
      <Text style={styles.orderTextStyle}>{strings.shippingOrder.orders}</Text>

      <Spacer space={ms(15)} />
      <View style={styles.piechartViewStyle}>
        <View>
          {/* <PieChart
            series={sum > 0 ? series : [100]}
            coverRadius={0.7}
            sliceColor={sum > 0 ? sliceColor : [COLORS.light_sky]}
            coverFill={COLORS.white}
            widthAndHeight={140}
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
            <Text style={styles.percentageTextStyle}>{sum}</Text>
            {/* <Text style={styles.percentageTextStyle}>{sum > 0 ? '100%' : '0%'}</Text> */}
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
              <View style={[styles.countContainer, { backgroundColor: COLORS.light_yellow }]}>
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

              <View style={[styles.countContainer, { backgroundColor: COLORS.light_red }]}>
                <View style={styles.cancelledDot}></View>
                <Text style={[styles.countTextStyle, { color: COLORS.alert_red }]}>
                  {`${parseInt(pieChartData?.[2]?.percentage)}%` ?? '0%'}
                </Text>
              </View>
            </View>

            {/* <View style={styles.ordersRowView}>
              <Text style={styles.orderTypeTextStyle}>{strings.shippingOrder.completed}</Text>
              <Text style={styles.countTextStyle}>
                {`${parseInt(pieChartData?.[3]?.percentage)}%` ?? '0'}
              </Text>
            </View> */}
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
    borderRadius: ms(10),
    backgroundColor: COLORS.white,
    paddingBottom: ms(10),
    flex: 1,
  },
  orderTextStyle: {
    fontFamily: Fonts.MaisonBold,
    fontSize: scale(7),
    color: COLORS.navy_blue,
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
    fontSize: SF(12),
    color: COLORS.textBlue,
  },
  countContainer: {
    backgroundColor: COLORS.tip_back,
    borderRadius: ms(9),
    paddingHorizontal: ms(4),
    paddingVertical: ms(2),
    flexDirection: 'row',
    alignItems: 'center',
  },

  deliveredDot: {
    height: ms(6),
    width: ms(6),
    backgroundColor: COLORS.medium_purple,
    borderRadius: ms(3),
    marginEnd: ms(5),
  },
  returnedDot: {
    height: ms(6),
    width: ms(6),
    backgroundColor: COLORS.medium_yellow,
    borderRadius: ms(3),
    marginEnd: ms(5),
  },
  cancelledDot: {
    height: ms(6),
    width: ms(6),
    backgroundColor: COLORS.blur_red,
    borderRadius: ms(3),
    marginEnd: ms(5),
  },
});
