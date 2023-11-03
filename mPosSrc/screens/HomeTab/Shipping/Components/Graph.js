import React, { useState, memo, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { BarChart } from 'react-native-gifted-charts';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import { getShipping } from '@mPOS/selectors/ShippingSelector';
import { SHIPPING_TYPES } from '@mPOS/Types/ShippingTypes';

const Graph = () => {
  const getShippingData = useSelector(getShipping);

  const [modifyData, setModifyData] = useState([]);
  const [showIncoming, setShowIncoming] = useState(true);
  const [showProcessing, setShowProcessing] = useState(true);
  const [showReadyToPickup, setShowReadyToPickup] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    convertData();
  }, [getShippingData?.graphOrders]);

  const isGraphOrder = useSelector((state) =>
    isLoadingSelector([SHIPPING_TYPES.GET_GRAPH_ORDERS], state)
  );

  const convertData = () => {
    const DATA = getShippingData?.graphOrders;
    const barData = DATA?.labels?.flatMap((day, index) => {
      const values = DATA?.datasets?.map((dataset) => dataset?.data?.[index]);
      const setOfThree = [];
      setOfThree.push({
        value: values[0] || 0,
        spacing: 10,
        label: day,
        labelWidth: 30,
        labelTextStyle: {
          color: COLORS.grayShade,
          fontSize: 9,
          marginLeft: ms(0),
          fontFamily: Fonts.Regular,
        },
        frontColor: COLORS.lightBlue,
        initialSpace: 0,
        Incoming: true,
      });
      setOfThree.push({
        value: values[1] || 0,
        spacing: 10,
        frontColor: COLORS.pink,
        OrderProcessing: true,
        labelTextStyle: {
          color: COLORS.grayShade,
          fontSize: 9,
          marginLeft: ms(10),
          fontFamily: Fonts.Regular,
        },
      });
      setOfThree.push({
        value: values[2] || 0,
        spacing: 10,
        frontColor: COLORS.yellow,
        ReadyForPickup: true,
        labelTextStyle: {
          color: COLORS.grayShade,
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
          color: COLORS.grayShade,
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
    const DATA = getShippingData?.graphOrders;
    const barData = DATA?.labels?.flatMap((day, index) => {
      const values = DATA?.datasets?.map((dataset) => dataset?.data?.[index]);
      const setOfThree = [];
      if (type === 'Incoming') {
        setOfThree.push({
          value: values[0] || 0,
          spacing: 10,
          label: day,
          labelWidth: 30,
          labelTextStyle: {
            color: COLORS.grayShade,
            fontSize: 9,
            marginLeft: ms(0),
            fontFamily: Fonts.Regular,
          },
          frontColor: value ? COLORS.lightBlue : COLORS.white,
          initialSpace: 0,
          Incoming: true,
        });
      } else {
        setOfThree.push({
          value: values[0] || 0,
          spacing: 10,
          label: day,
          labelWidth: 30,
          labelTextStyle: {
            color: COLORS.grayShade,
            fontSize: 9,
            marginLeft: ms(0),
            fontFamily: Fonts.Regular,
          },
          frontColor: showIncoming ? COLORS.lightBlue : COLORS.white,
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
            color: COLORS.grayShade,
            fontSize: 9,
            marginLeft: ms(0),
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
            color: COLORS.grayShade,
            fontSize: 9,
            marginLeft: ms(0),
            fontFamily: Fonts.Regular,
          },
        });
      }
      if (type === 'ReadyForPickup') {
        setOfThree.push({
          value: values[2] || 0,
          spacing: 10,
          frontColor: value ? COLORS.yellow : COLORS.white,
          ReadyForPickup: true,
          labelTextStyle: {
            color: COLORS.grayShade,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      } else {
        setOfThree.push({
          value: values[2] || 0,
          spacing: 10,
          frontColor: showReadyToPickup ? COLORS.yellow : COLORS.white,
          ReadyForPickup: true,
          labelTextStyle: {
            color: COLORS.grayShade,
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
          frontColor: value ? COLORS.primary : COLORS.white,
          Completed: true,
          labelTextStyle: {
            color: COLORS.grayShade,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      } else {
        setOfThree.push({
          value: values[3] || 0,
          spacing: 10,
          frontColor: showCompleted ? COLORS.primary : COLORS.white,
          Completed: true,
          labelTextStyle: {
            color: COLORS.grayShade,
            fontSize: 9,
            marginLeft: ms(10),
            fontFamily: Fonts.Regular,
          },
        });
      }
      return setOfThree;
    });
    setModifyData(barData);
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
              style={[styles.checkboxIconStyle, showIncoming && { tintColor: COLORS.lightBlue }]}
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
              style={[styles.checkboxIconStyle, showReadyToPickup && { tintColor: COLORS.yellow }]}
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
            width={SW(260)}
            barWidth={SW(3)}
          />
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
    color: COLORS.dark_gray,
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
    color: COLORS.grayShade,
  },
  varientTextStyle: {
    fontSize: SF(9),
    color: COLORS.grayShade,
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
