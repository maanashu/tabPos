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
import { blankCheckBox, Fonts, mark } from '@/assets';
import { getShipping } from '@/selectors/ShippingSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const { width } = Dimensions.get('window');

const Graph = () => {
  const getGraphOrderData = useSelector(getShipping);

  const [modifyData, setModifyData] = useState([]);
  const [showIncoming, setShowIncoming] = useState(true);
  const [showProcessing, setShowProcessing] = useState(true);
  const [showReadyToPickup, setShowReadyToPickup] = useState(true);
  const [showCompleted, setShowCompleted] = useState(true);

  useEffect(() => {
    convertData();
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
    const DATA = getGraphOrderData?.graphOrders;
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

      {isShippingOrder ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <View>
          <BarChart
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
          />
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
    borderRadius: 10,
    paddingHorizontal: ms(12),
    paddingBottom: 30,
    marginTop: SH(15),
  },
  numberOrdersText: {
    color: COLORS.dark_grey,
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
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    marginTop: ms(10),
  },
  varientTextStyle: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
});
