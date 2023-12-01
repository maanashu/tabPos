import React, { memo, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { BarChart } from 'react-native-gifted-charts';

import { Spacer } from '@/components';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import {
  blankCheckBox,
  cancelledBlank,
  cancelledMarked,
  deliveryBlank,
  deliveryMarked,
  Fonts,
  incomingBlank,
  incomingMarked,
  mark,
  returnedBlank,
  returnedMarked,
} from '@/assets';
import { getShipping } from '@/selectors/ShippingSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const Graph = () => {
  const getGraphOrderData = useSelector(getShipping);

  const [modifyData, setModifyData] = useState([]);
  const [showIncoming, setShowIncoming] = useState(true);
  const [showProcessing, setShowProcessing] = useState(true);
  const [showReadyToPickup, setShowReadyToPickup] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [graphData, setgraphData] = useState(null);
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const d = new Date();
  const CurrentMonth = month[d.getUTCMonth()];

  useEffect(() => {
    //convertData();
    buildDataLineGraph();
  }, [getGraphOrderData?.graphOrders]);

  const isShippingOrder = useSelector((state) =>
    isLoadingSelector([TYPES.GET_GRAPH_ORDERS], state)
  );

  const convertData = () => {
    const DATA = getGraphOrderData?.graphOrders;
    const barData = DATA?.labels?.flatMap((day, index) => {
      const values = DATA?.datasets?.map((dataset) => dataset?.data?.[index]);
      const setOfThree = [];
      setOfThree.push({
        value: values[0] || 0,
        spacing: 10,
        label: day,
        labelWidth: 60,
        labelTextStyle: {
          color: COLORS.darkGray,
          fontSize: 9,
          marginLeft: ms(10),
          fontFamily: Fonts.Regular,
        },
        frontColor: COLORS.bluish_green,
        initialSpace: 0,
        Incoming: true,
      });
      setOfThree.push({
        value: values[1] || 0,
        spacing: 10,
        frontColor: COLORS.pink,
        OrderProcessing: true,
        labelTextStyle: {
          color: COLORS.darkGray,
          fontSize: 9,
          marginLeft: ms(10),
          fontFamily: Fonts.Regular,
        },
      });
      setOfThree.push({
        value: values[2] || 0,
        spacing: 10,
        frontColor: COLORS.yellowTweet,
        ReadyForPickup: true,
        labelTextStyle: {
          color: COLORS.darkGray,
          fontSize: 9,
          marginLeft: ms(10),
          fontFamily: Fonts.Regular,
        },
      });
      setOfThree.push({
        value: values[3] || 0,
        spacing: 10,
        frontColor: COLORS.primary,
        Completed: true,
        labelTextStyle: {
          color: COLORS.darkGray,
          fontSize: 9,
          marginLeft: ms(10),
          fontFamily: Fonts.Regular,
        },
      });

      return setOfThree;
    });

    setModifyData(barData);
  };

  const onClickCheckBox = (type, value) => {
    // const DATA = getGraphOrderData?.graphOrders;
    // const barData = DATA?.labels?.flatMap((day, index) => {
    //   const values = DATA?.datasets?.map((dataset) => dataset?.data?.[index]);
    //   const setOfThree = [];
    //   if (type === 'Incoming') {
    //     setOfThree.push({
    //       value: values[0] || 0,
    //       spacing: 10,
    //       label: day,
    //       labelWidth: 80,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //       frontColor: value ? COLORS.bluish_green : COLORS.white,
    //       initialSpace: 0,
    //       Incoming: true,
    //     });
    //   } else {
    //     setOfThree.push({
    //       value: values[0] || 0,
    //       spacing: 10,
    //       label: day,
    //       labelWidth: 60,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //       frontColor: showIncoming ? COLORS.bluish_green : COLORS.white,
    //       initialSpace: 0,
    //       Incoming: true,
    //     });
    //   }
    //   if (type === 'Delivery') {
    //     setOfThree.push({
    //       value: values[1] || 0,
    //       spacing: 10,
    //       frontColor: value ? COLORS.pink : COLORS.white,
    //       //  OrderProcessing: true,
    //       Delivery: true,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //     });
    //   } else {
    //     setOfThree.push({
    //       value: values[1] || 0,
    //       spacing: 10,
    //       frontColor: showProcessing ? COLORS.pink : COLORS.white,
    //       //  OrderProcessing: true,
    //       Delivery: true,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //     });
    //   }
    //   if (type === 'Returned') {
    //     setOfThree.push({
    //       value: values[2] || 0,
    //       spacing: 10,
    //       frontColor: value ? COLORS.yellowTweet : COLORS.white,
    //       // ReadyForPickup: true,
    //       Returned: true,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //     });
    //   } else {
    //     setOfThree.push({
    //       value: values[2] || 0,
    //       spacing: 10,
    //       frontColor: showReadyToPickup ? COLORS.yellowTweet : COLORS.white,
    //       // ReadyForPickup: true,
    //       Returned: true,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //     });
    //   }
    //   if (type === 'Cancelled') {
    //     setOfThree.push({
    //       value: values[3] || 0,
    //       spacing: 10,
    //       frontColor: value ? COLORS.primary : COLORS.white,
    //       // Completed: true,
    //       Cancelled: true,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //     });
    //   } else {
    //     setOfThree.push({
    //       value: values[3] || 0,
    //       spacing: 10,
    //       frontColor: showCompleted ? COLORS.primary : COLORS.white,
    //       // Completed: true,
    //       Cancelled: true,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //     });
    //   }
    //   return setOfThree;
    // });
    // setModifyData(barData);
    if (type == 'Incoming') {
      const updateOpacity = value ? 1 : 0;
      const newColorFunction = () => `rgba(70, 89, 181, ${updateOpacity})`;
      const updatedData = { ...graphData };
      updatedData.datasets[0].color = newColorFunction;
      setgraphData(updatedData);
    } else if (type == 'Delivery') {
      const updateOpacity = value ? 1 : 0;
      const newColorFunction = () => `rgba(114, 51, 194, ${updateOpacity})`;
      const updatedData = { ...graphData };
      updatedData.datasets[1].color = newColorFunction;
      setgraphData(updatedData);
    } else if (type == 'Returned') {
      const updateOpacity = value ? 1 : 0;
      const newColorFunction = () => `rgba(240, 192, 26, ${updateOpacity})`;
      const updatedData = { ...graphData };
      updatedData.datasets[2].color = newColorFunction;
      setgraphData(updatedData);
    } else if (type == 'Cancelled') {
      const updateOpacity = value ? 1 : 0;
      const newColorFunction = () => `rgba(240, 68, 56, ${updateOpacity})`;
      const updatedData = { ...graphData };
      updatedData.datasets[3].color = newColorFunction;
      setgraphData(updatedData);
    }
  };

  function transformData(apiData) {
    const transformedData = {
      labels: apiData?.labels,
      datasets: apiData?.datasets?.map((dataset, index) => ({
        data: [...dataset?.data],
        color: () => {
          switch (index) {
            case 0:
              return `rgba(70, 89, 181, 1)`;
            case 1:
              return `rgba(114, 51, 194, 1)`;
            case 2:
              return `rgba(240, 192, 26, 1)`;
            case 3:
              return `rgba(240, 68, 56, 1)`;
          }
        },
        strokeWidth: 3,
      })),
    };

    return transformedData;
  }

  const buildDataLineGraph = () => {
    const DATA = getGraphOrderData?.graphOrders;
    const transformed = transformData(DATA);
    setgraphData(transformed);
  };

  return (
    <View style={styles.graphViewStyle}>
      <View>
        {/* <Text style={styles.numberOrdersText}>{strings.deliveryOrders.orderNumber}</Text> */}
        {/* <Spacer space={SH(30)} /> */}
        <View style={[styles.flexRow, { zIndex: 999 }]}>
          <TouchableOpacity
            onPress={() => {
              setShowIncoming((prevShowIncoming) => {
                const newState = !prevShowIncoming;
                onClickCheckBox('Incoming', newState);
                return newState;
              });
            }}
            style={styles.checkboxViewStyle}
          >
            <Image
              source={showIncoming ? incomingMarked : incomingBlank}
              style={[styles.checkboxIconStyle]}
            />
            <Text style={[styles.varientTextStyle, { color: COLORS.navy_blue }]}>
              {strings.shippingOrder.incomingOrders}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowProcessing((prevShowProcessing) => {
                const newState = !prevShowProcessing;
                onClickCheckBox('Delivery', newState);
                return newState;
              });
            }}
            style={styles.checkboxViewStyle}
          >
            <Image
              source={showProcessing ? deliveryMarked : deliveryBlank}
              style={[styles.checkboxIconStyle]}
            />
            <Text style={[styles.varientTextStyle, { color: COLORS.purple }]}>
              {strings.shippingOrder.deliveryOrders}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowReadyToPickup((prevShowReadyToPickup) => {
                const newState = !prevShowReadyToPickup;
                onClickCheckBox('Returned', newState);
                return newState;
              });
            }}
            style={styles.checkboxViewStyle}
          >
            <Image
              source={showReadyToPickup ? returnedMarked : returnedBlank}
              style={[styles.checkboxIconStyle]}
            />
            <Text style={[styles.varientTextStyle, { color: COLORS.extra_yellow_600 }]}>
              {strings.shippingOrder.returnedOrders}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowCompleted((prevShowCompleted) => {
                const newState = !prevShowCompleted;
                onClickCheckBox('Cancelled', newState);
                return newState;
              });
            }}
            style={styles.checkboxViewStyle}
          >
            <Image
              source={showCompleted ? cancelledMarked : cancelledBlank}
              style={[styles.checkboxIconStyle]}
            />
            <Text style={[styles.varientTextStyle, { color: COLORS.alert_red }]}>
              {strings.shippingOrder.cancelledOrders}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Spacer space={SH(30)} />

      {isShippingOrder ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <View style={{ zIndex: -999 }}>
          {/* <BarChart
            data={modifyData}
            noOfSections={7}
            roundedTop
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisType={'dashed'}
            yAxisType={'dashed'}
            yAxisLength={350}
            height={ms(130)}
            width={width * 0.48}
            barWidth={SW(3.5)}
            yAxisTextStyle={styles.yAxisTextStyle}
          /> */}
          <Text
            style={{
              position: 'absolute',
              bottom: ms(95),
              left: ms(-20),
              zIndex: 1,
              transform: [{ rotate: '270deg' }],
              color: COLORS.lavender,
              fontSize: ms(6),
              fontFamily: Fonts.Regular,
            }}
          >
            {strings.deliveryOrders.orderNumber}
          </Text>

          {graphData && (
            <LineChart
              withDots={false}
              withVerticalLines={false}
              data={graphData}
              width={width * 0.5}
              height={ms(160)}
              // noOfSections={8}
              chartConfig={{
                backgroundColor: '#000',
                backgroundGradientFrom: '#fff',
                // backgroundGradientTo: '#f3edf7',
                backgroundGradientTo: '#fff',
                decimalPlaces: 0,
                // horizontalLabelRotation: 45,
                color: () => `rgba(39, 90, 255, 1)`,
                labelColor: (opacity = 1) => `rgba(126, 138, 193, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  stroke: COLORS.sky_grey,
                  strokeDasharray: '', // solid background lines with no dashes
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                // borderRadius: 16,
              }}
              withShadow={false}
              fromZero
              segments={5}
            />
          )}
          <Text
            style={{
              position: 'absolute',
              bottom: 10,
              left: width * 0.22,
              color: COLORS.lavender,
              fontSize: ms(6),
              fontFamily: Fonts.Regular,
            }}
          >
            {CurrentMonth}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(Graph);

const styles = StyleSheet.create({
  graphViewStyle: {
    flex: 0.5,
    backgroundColor: COLORS.white,
    borderRadius: ms(20),
    paddingHorizontal: ms(12),
    paddingBottom: 30,
    marginTop: SH(15),
  },
  numberOrdersText: {
    color: COLORS.navy_blue,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: ms(12),
    paddingTop: ms(13),
  },
  loaderViewStyle: {
    height: ms(150),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yAxisTextStyle: {
    color: COLORS.darkGray,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  checkBoxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  checkboxIconStyle: {
    width: SH(22),
    height: SH(22),
    resizeMode: 'contain',
    marginRight: ms(3),
  },
  checkboxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: ms(10),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    marginTop: ms(10),
  },
  varientTextStyle: {
    fontSize: SF(10),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
});
