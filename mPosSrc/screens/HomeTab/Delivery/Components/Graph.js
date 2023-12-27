import React, { useState, memo, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { BarChart } from 'react-native-gifted-charts';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { LineChart } from 'react-native-chart-kit';
const windowWidth = Dimensions.get('window').width;
const Graph = () => {
  const getDeliveryData = useSelector(getDelivery);

  const [modifyData, setModifyData] = useState([]);
  const [showIncoming, setShowIncoming] = useState(true);
  const [showProcessing, setShowProcessing] = useState(true);
  const [showReadyToPickup, setShowReadyToPickup] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);
  const [graphData, setgraphData] = useState(null);
  // useEffect(() => {
  //   convertData();
  // }, [getDeliveryData?.graphOrders]);

  useEffect(() => {
    //convertData();
    const value = getDeliveryData?.graphOrders;
    const isEmpty = value && Object?.keys?.(value)?.length === 0;
    if (!isEmpty) {
      buildDataLineGraph();
    }
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
        labelWidth: 30,
        labelTextStyle: {
          color: COLORS.darkGray,
          fontSize: 9,
          marginLeft: ms(0),
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

  // const onClickCheckBox = (type, value) => {
  //   const DATA = getDeliveryData?.graphOrders;
  //   const barData = DATA?.labels?.flatMap((day, index) => {
  //     const values = DATA?.datasets?.map((dataset) => dataset?.data?.[index]);
  //     const setOfThree = [];
  //     if (type === 'Incoming') {
  //       setOfThree.push({
  //         value: values[0] || 0,
  //         spacing: 10,
  //         label: day,
  //         labelWidth: 30,
  //         labelTextStyle: {
  //           color: COLORS.darkGray,
  //           fontSize: 9,
  //           marginLeft: ms(0),
  //           fontFamily: Fonts.Regular,
  //         },
  //         frontColor: value ? COLORS.bluish_green : COLORS.white,
  //         initialSpace: 0,
  //         Incoming: true,
  //       });
  //     } else {
  //       setOfThree.push({
  //         value: values[0] || 0,
  //         spacing: 10,
  //         label: day,
  //         labelWidth: 30,
  //         labelTextStyle: {
  //           color: COLORS.darkGray,
  //           fontSize: 9,
  //           marginLeft: ms(0),
  //           fontFamily: Fonts.Regular,
  //         },
  //         frontColor: showIncoming ? COLORS.bluish_green : COLORS.white,
  //         initialSpace: 0,
  //         Incoming: true,
  //       });
  //     }
  //     if (type === 'OrderProcessing') {
  //       setOfThree.push({
  //         value: values[1] || 0,
  //         spacing: 10,
  //         frontColor: value ? COLORS.pink : COLORS.white,
  //         OrderProcessing: true,
  //         labelTextStyle: {
  //           color: COLORS.darkGray,
  //           fontSize: 9,
  //           marginLeft: ms(0),
  //           fontFamily: Fonts.Regular,
  //         },
  //       });
  //     } else {
  //       setOfThree.push({
  //         value: values[1] || 0,
  //         spacing: 10,
  //         frontColor: showProcessing ? COLORS.pink : COLORS.white,
  //         OrderProcessing: true,
  //         labelTextStyle: {
  //           color: COLORS.darkGray,
  //           fontSize: 9,
  //           marginLeft: ms(0),
  //           fontFamily: Fonts.Regular,
  //         },
  //       });
  //     }
  //     if (type === 'ReadyForPickup') {
  //       setOfThree.push({
  //         value: values[2] || 0,
  //         spacing: 10,
  //         frontColor: value ? COLORS.yellowTweet : COLORS.white,
  //         ReadyForPickup: true,
  //         labelTextStyle: {
  //           color: COLORS.darkGray,
  //           fontSize: 9,
  //           marginLeft: ms(10),
  //           fontFamily: Fonts.Regular,
  //         },
  //       });
  //     } else {
  //       setOfThree.push({
  //         value: values[2] || 0,
  //         spacing: 10,
  //         frontColor: showReadyToPickup ? COLORS.yellowTweet : COLORS.white,
  //         ReadyForPickup: true,
  //         labelTextStyle: {
  //           color: COLORS.darkGray,
  //           fontSize: 9,
  //           marginLeft: ms(10),
  //           fontFamily: Fonts.Regular,
  //         },
  //       });
  //     }
  //     if (type === 'Completed') {
  //       setOfThree.push({
  //         value: values[3] || 0,
  //         spacing: 10,
  //         frontColor: value ? COLORS.primary : COLORS.white,
  //         Completed: true,
  //         labelTextStyle: {
  //           color: COLORS.darkGray,
  //           fontSize: 9,
  //           marginLeft: ms(10),
  //           fontFamily: Fonts.Regular,
  //         },
  //       });
  //     } else {
  //       setOfThree.push({
  //         value: values[3] || 0,
  //         spacing: 10,
  //         frontColor: showCompleted ? COLORS.primary : COLORS.white,
  //         Completed: true,
  //         labelTextStyle: {
  //           color: COLORS.darkGray,
  //           fontSize: 9,
  //           marginLeft: ms(10),
  //           fontFamily: Fonts.Regular,
  //         },
  //       });
  //     }
  //     return setOfThree;
  //   });
  //   setModifyData(barData);
  // };

  //TAB

  const onClickCheckBox = (type, value) => {
    // const DATA = getDeliveryData?.graphOrders;
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
    //   if (type === 'OrderProcessing') {
    //     setOfThree.push({
    //       value: values[1] || 0,
    //       spacing: 10,
    //       frontColor: value ? COLORS.pink : COLORS.white,
    //       OrderProcessing: true,
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
    //       OrderProcessing: true,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //     });
    //   }
    //   if (type === 'ReadyForPickup') {
    //     setOfThree.push({
    //       value: values[2] || 0,
    //       spacing: 10,
    //       frontColor: value ? COLORS.yellowTweet : COLORS.white,
    //       ReadyForPickup: true,
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
    //       ReadyForPickup: true,
    //       labelTextStyle: {
    //         color: COLORS.darkGray,
    //         fontSize: 9,
    //         marginLeft: ms(10),
    //         fontFamily: Fonts.Regular,
    //       },
    //     });
    //   }
    //   if (type === 'Completed') {
    //     setOfThree.push({
    //       value: values[3] || 0,
    //       spacing: 10,
    //       frontColor: value ? COLORS.navy_blue : COLORS.white,
    //       Completed: true,
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
    //       frontColor: showCompleted ? COLORS.navy_blue : COLORS.white,
    //       Completed: true,
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
    // return;
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
  return (
    <View style={styles.graphViewStyle}>
      <View>
        <Text style={styles.numberOrdersText}>{strings.delivery.orderNumber}</Text>

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
              source={showIncoming ? Images.mark : Images.blankCheckBox}
              style={[styles.checkboxIconStyle, showIncoming && { tintColor: COLORS.bluish_green }]}
            />
            <Text style={styles.varientTextStyle}>{strings.delivery.incomingOrders}</Text>
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
              source={showProcessing ? Images.mark : Images.blankCheckBox}
              style={[styles.checkboxIconStyle, showProcessing && { tintColor: COLORS.pink }]}
            />
            <Text style={styles.varientTextStyle}>{strings.delivery.processingOrders}</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.flexRow, { zIndex: 999 }]}>
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
              source={showReadyToPickup ? Images.mark : Images.blankCheckBox}
              style={[
                styles.checkboxIconStyle,
                showReadyToPickup && { tintColor: COLORS.yellowTweet },
              ]}
            />
            <Text style={styles.varientTextStyle}>{strings.delivery.readyPickupOrders}</Text>
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
              source={showCompleted ? Images.mark : Images.blankCheckBox}
              style={[styles.checkboxIconStyle, showCompleted && { tintColor: COLORS.primary }]}
            />
            <Text style={styles.varientTextStyle}>{strings.delivery.completed}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Spacer space={SH(30)} />

      {isGraphOrder ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <View style={{ paddingHorizontal: ms(10), zIndex: -999 }}>
          {/* <BarChart
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
            width={SW(260)}
            barWidth={SW(3)}
          /> */}
          {graphData && (
            <LineChart
              withDots={false}
              withVerticalLines={false}
              data={graphData ?? {}}
              width={windowWidth - 50}
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
              style={
                {
                  // borderRadius: 16,
                }
              }
              withShadow={false}
              fromZero
              segments={5}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default memo(Graph);

const styles = StyleSheet.create({
  graphViewStyle: {
    borderRadius: 10,
    paddingBottom: 30,
    marginHorizontal: ms(15),
    backgroundColor: COLORS.white,
  },
  numberOrdersText: {
    fontSize: SF(16),
    paddingTop: ms(10),
    paddingHorizontal: ms(20),
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    marginTop: 10,
    justifyContent: 'center',
  },
  loaderView: {
    height: ms(150),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  yAxistext: {
    fontSize: 11,
    color: COLORS.dark_grey,
  },
  varientTextStyle: {
    fontSize: SF(9),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    paddingLeft: 5,
  },
  checkboxIconStyle: {
    width: SH(14),
    height: SH(14),
    resizeMode: 'contain',
  },
  checkboxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    width: SW(150),
  },
});
