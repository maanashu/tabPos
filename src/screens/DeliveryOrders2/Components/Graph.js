import React, { useState, memo, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
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
import { Fonts, blankCheckBox, mark } from '@/assets';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const windowWidth = Dimensions.get('window').width;
const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 2;

const Graph = () => {
  const getDeliveryData = useSelector(getDelivery);

  const [modifyData, setModifyData] = useState([]);
  const [showIncoming, setShowIncoming] = useState(true);
  const [showProcessing, setShowProcessing] = useState(true);
  const [showReadyToPickup, setShowReadyToPickup] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    convertData();
  }, [getDeliveryData?.graphOrders]);

  const isGraphOrder = useSelector((state) => isLoadingSelector([TYPES.GET_GRAPH_ORDERS], state));

  const convertData = () => {
    const DATA = getDeliveryData?.graphOrders;
    const barData = DATA?.labels?.flatMap((day, index) => {
      const values = DATA?.datasets?.map((dataset) => dataset?.data?.[index]);
      const setOfThree = [];
      setOfThree.push({
        value: values[0] || 0,
        spacing: 5,
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
          frontColor: value ? COLORS.primary : COLORS.white,
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
          frontColor: showCompleted ? COLORS.primary : COLORS.white,
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
  };

  return (
    <View style={styles.graphViewStyle}>
      <View>
        <Text style={styles.numberOrdersText}>{strings.deliveryOrders.orderNumber}</Text>

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
              source={showIncoming ? mark : blankCheckBox}
              style={[styles.checkboxIconStyle, showIncoming && { tintColor: COLORS.bluish_green }]}
            />
            <Text style={styles.varientTextStyle}>{strings.shippingOrder.incomingOrders}</Text>
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
              source={showProcessing ? mark : blankCheckBox}
              style={[styles.checkboxIconStyle, showProcessing && { tintColor: COLORS.pink }]}
            />
            <Text style={styles.varientTextStyle}>{strings.shippingOrder.processingOrders}</Text>
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
              source={showReadyToPickup ? mark : blankCheckBox}
              style={[
                styles.checkboxIconStyle,
                showReadyToPickup && { tintColor: COLORS.yellowTweet },
              ]}
            />
            <Text style={styles.varientTextStyle}>{strings.shippingOrder.readyPickupOrders}</Text>
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
              source={showCompleted ? mark : blankCheckBox}
              style={[styles.checkboxIconStyle, showCompleted && { tintColor: COLORS.primary }]}
            />
            <Text style={styles.varientTextStyle}>{strings.shippingOrder.completed}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Spacer space={SH(30)} />

      {isGraphOrder ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
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
    height: twoEqualView,
    paddingHorizontal: 20,
    width: windowWidth * 0.56,
    backgroundColor: COLORS.white,
  },
  numberOrdersText: {
    fontSize: SF(16),
    paddingTop: ms(10),
    paddingHorizontal: 20,
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
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
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  checkboxIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  checkboxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
});
