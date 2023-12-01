import React, { useState, memo, useEffect } from 'react';
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
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import {
  Fonts,
  blankCheckBox,
  mark,
  incomingMarked,
  incomingBlank,
  deliveryMarked,
  deliveryBlank,
  returnedMarked,
  returnedBlank,
  cancelledMarked,
  cancelledBlank,
} from '@/assets';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { LineChart } from 'react-native-chart-kit';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 2.09;

const Graph = () => {
  const getDeliveryData = useSelector(getDelivery);

  const [modifyData, setModifyData] = useState([]);
  const [showIncoming, setShowIncoming] = useState(true);
  const [showProcessing, setShowProcessing] = useState(true);
  const [showReadyToPickup, setShowReadyToPickup] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [graphData, setgraphData] = useState(null);
  useEffect(() => {
    convertData();
    // buildDataLineGraph();
  }, [getDeliveryData?.graphOrders]);

  const isGraphOrder = useSelector((state) => isLoadingSelector([TYPES.GET_GRAPH_ORDERS], state));

  const convertData = () => {
    const DATA = getDeliveryData?.graphOrders;
    const barData = DATA?.labels?.flatMap((day, index) => {
      const values = DATA?.datasets?.map((dataset) => dataset?.data?.[index]);
      const setOfThree = [];
      setOfThree.push({
        value: values[0] || 0,
        spacing: 10,
        label: day,
        labelWidth: 90,
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
        frontColor: COLORS.navy_blue,
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

  function transformData(apiData) {
    const transformedData = {
      labels: apiData?.labels,
      //labels: monthLabels,
      datasets: apiData?.datasets?.map((dataset, index) => ({
        // data: fakeData[index],
        data: [...dataset?.data], // Replace this with your dataset values
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
    const DATA = getDeliveryData?.graphOrders;
    const transformed = transformData(DATA);
    setgraphData(transformed);
  };
  const onClickCheckBox = (type, value) => {
    const DATA = getDeliveryData?.graphOrders;
    const barData = DATA?.labels?.flatMap((day, index) => {
      const values = DATA?.datasets?.map((dataset) => dataset?.data?.[index]);
      const setOfThree = [];
      if (type === 'Incoming') {
        setOfThree.push({
          value: values[0] || 0,
          spacing: 10,
          label: day,
          labelWidth: 80,
          labelTextStyle: {
            color: COLORS.darkGray,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
          frontColor: value ? COLORS.bluish_green : COLORS.white,
          initialSpace: 0,
          Incoming: true,
        });
      } else {
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
          frontColor: showIncoming ? COLORS.bluish_green : COLORS.white,
          initialSpace: 0,
          Incoming: true,
        });
      }
      if (type === 'OrderProcessing') {
        setOfThree.push({
          value: values[1] || 0,
          spacing: 10,
          frontColor: value ? COLORS.pink : COLORS.white,
          OrderProcessing: true,
          labelTextStyle: {
            color: COLORS.darkGray,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      } else {
        setOfThree.push({
          value: values[1] || 0,
          spacing: 10,
          frontColor: showProcessing ? COLORS.pink : COLORS.white,
          OrderProcessing: true,
          labelTextStyle: {
            color: COLORS.darkGray,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      }
      if (type === 'ReadyForPickup') {
        setOfThree.push({
          value: values[2] || 0,
          spacing: 10,
          frontColor: value ? COLORS.yellowTweet : COLORS.white,
          ReadyForPickup: true,
          labelTextStyle: {
            color: COLORS.darkGray,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      } else {
        setOfThree.push({
          value: values[2] || 0,
          spacing: 10,
          frontColor: showReadyToPickup ? COLORS.yellowTweet : COLORS.white,
          ReadyForPickup: true,
          labelTextStyle: {
            color: COLORS.darkGray,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      }
      if (type === 'Completed') {
        setOfThree.push({
          value: values[3] || 0,
          spacing: 10,
          frontColor: value ? COLORS.navy_blue : COLORS.white,
          Completed: true,
          labelTextStyle: {
            color: COLORS.darkGray,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      } else {
        setOfThree.push({
          value: values[3] || 0,
          spacing: 10,
          frontColor: showCompleted ? COLORS.navy_blue : COLORS.white,
          Completed: true,
          labelTextStyle: {
            color: COLORS.darkGray,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      }
      return setOfThree;
    });
    setModifyData(barData);
    return;
    if (type == 'Incoming') {
      const updateOpacity = value ? 1 : 0;
      const newColorFunction = () => `rgba(70, 89, 181, ${updateOpacity})`;
      const updatedData = { ...graphData };
      updatedData.datasets[0].color = newColorFunction;
      setgraphData(updatedData);
    } else if (type == 'OrderProcessing') {
      const updateOpacity = value ? 1 : 0;
      const newColorFunction = () => `rgba(114, 51, 194, ${updateOpacity})`;
      const updatedData = { ...graphData };
      updatedData.datasets[1].color = newColorFunction;
      setgraphData(updatedData);
    } else if (type == 'ReadyForPickup') {
      const updateOpacity = value ? 1 : 0;
      const newColorFunction = () => `rgba(240, 192, 26, ${updateOpacity})`;
      const updatedData = { ...graphData };
      updatedData.datasets[2].color = newColorFunction;
      setgraphData(updatedData);
    } else if (type == 'Completed') {
      const updateOpacity = value ? 1 : 0;
      const newColorFunction = () => `rgba(240, 68, 56, ${updateOpacity})`;
      const updatedData = { ...graphData };
      updatedData.datasets[3].color = newColorFunction;
      setgraphData(updatedData);
    }
  };

  return (
    <View style={styles.graphViewStyle}>
      <View>
        <Text style={styles.numberOrdersText}>{strings.deliveryOrders.orderNumber}</Text>

        <View style={[styles.flexRow, { zIndex: 999, marginTop: ms(20) }]}>
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
                onClickCheckBox('OrderProcessing', newState);
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
              {strings.shippingOrder.processingOrders}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowReadyToPickup((prevShowReadyToPickup) => {
                const newState = !prevShowReadyToPickup;
                onClickCheckBox('ReadyForPickup', newState);
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
              {strings.shippingOrder.readyPickupOrders}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setShowCompleted((prevShowCompleted) => {
                const newState = !prevShowCompleted;
                onClickCheckBox('Completed', newState);
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
              {strings.shippingOrder.completed}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Spacer space={SH(30)} />

      {isGraphOrder ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'small'} color={COLORS.navy_blue} />
        </View>
      ) : (
        <View style={{ zIndex: -999 }}>
          <BarChart
            roundedTop
            noOfSections={7}
            data={modifyData}
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisType={'dashed'}
            yAxisType={'dashed'}
            yAxisTextStyle={styles.yAxistext}
            yAxisLength={350}
            height={ms(130)}
            width={windowWidth * 0.49}
            barWidth={SW(3.5)}
          />

          {/* {graphData && (
            <LineChart
              withDots={false}
              withVerticalLines={false}
              data={graphData ?? {}}
              width={windowWidth * 0.5}
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
          )} */}
          {/* <LineChart
            withDots={false}
            withVerticalLines={false}
            data={{
              labels: ['Jan', 'Mar', 'May', 'Jul', 'Sept', 'Nov', 'Dec'],
              datasets: [
                {
                  data: [800, 810, 900, 810, 860, 890, 810],
                  color: () => `rgba(70, 89, 181, 1)`,
                  strokeWidth: 3,
                },
                {
                  data: [500, 600, 550, 590, 630, 650, 700],
                  color: () => `rgba(114, 51, 194, 1)`,
                  strokeWidth: 3,
                },
                {
                  data: [400, 450, 470, 420, 410, 480, 500],
                  color: () => `rgba(240, 192, 26, 1)`,
                  strokeWidth: 3,
                },
                {
                  data: [100, 220, 190, 260, 240, 340, 370],
                  color: () => `rgba(240, 68, 56, 1)`,
                  strokeWidth: 3,
                },
              ].filter((el) => el),
            }}
            width={windowWidth * 0.5}
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
          <Text style={styles.monthStyle}>{moment().format('MMMM')}</Text> */}
        </View>
      )}
    </View>
  );
};

export default memo(Graph);

const styles = StyleSheet.create({
  graphViewStyle: {
    borderRadius: ms(10),
    paddingBottom: 30,
    height: twoEqualView,
    paddingHorizontal: 20,
    width: windowWidth * 0.56,
    backgroundColor: COLORS.white,
  },
  numberOrdersText: {
    fontSize: SF(12),
    paddingTop: ms(16),
    paddingHorizontal: 20,
    color: COLORS.lavender,
    fontFamily: Fonts.Bold,

    // transform: [{ rotate: '-90deg' }],
    // position: 'absolute',
    // left: ms(-50),
    // top: ms(100),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    marginTop: 10,
  },
  loaderView: {
    height: ms(150),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  yAxistext: {
    fontSize: 11,
    color: COLORS.darkGray,
  },
  varientTextStyle: {
    fontSize: SF(11),
    // color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    marginLeft: ms(6),
  },
  checkboxIconStyle: {
    width: SH(18),
    height: SH(18),
    resizeMode: 'contain',
  },
  checkboxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  monthStyle: {
    textAlign: 'center',
    marginTop: ms(-10),
    fontSize: ms(8),
    color: COLORS.lavender,
  },
});
