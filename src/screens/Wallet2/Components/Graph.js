import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { BarChart } from 'react-native-gifted-charts';

import {
  Fonts,
  incomingOrders,
  returnedOrders,
  cancelledOrders,
  checkedCheckboxSquare,
  blankCheckBox,
  onlinecustomer,
  cashCheckIcon,
  mark,
} from '@/assets';
import { BarChartCom, Spacer } from '@/components';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { graphOptions } from '@/constants/flatListData';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { LineChart } from 'react-native-chart-kit';
import { getWallet } from '@/selectors/WalletSelector';
import { useEffect } from 'react';

const windowWidth = Dimensions.get('window').width;
const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 1.8;

const Graph = () => {
  const getDeliveryData = useSelector(getDelivery);
  const getWalletData = useSelector(getWallet);
  const getTotalTraData = getWalletData?.getTotalTra;
  console.log('sadasdas', JSON.stringify(getTotalTraData));

  const [graphData, setGraphData] = useState(graphOptions);

  const [modifyData, setModifyData] = useState([]);
  const [showJBR, setShowJBR] = useState(true);
  const [showCash, setShowCash] = useState(true);
  const [showCard, setShowCard] = useState(true);

  const isGraphOrder = useSelector((state) => isLoadingSelector([TYPES.GET_GRAPH_ORDERS], state));

  const checkedIndices = graphData
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => parseInt(checkbox.key) - 1);

  const summedValues = Array(getDeliveryData?.graphOrders?.labels?.length).fill(0);

  for (const index of checkedIndices) {
    const dataset = getDeliveryData?.graphOrders?.datasets?.[index].data;
    for (let i = 0; i < dataset?.length; i++) {
      summedValues[i] += dataset[i];
    }
  }

  const barData = [
    {
      value: 10,
      spacing: 2,
      label: '11/20/2023',
      labelWidth: 70,
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 },
      frontColor: COLORS.primary,
      intialSapce: 0,
    },
    {
      value: 56,
      label: '',
      spacing: 2,
      frontColor: COLORS.violet,
    },
    { value: 66, frontColor: COLORS.darkBlue },
    {
      value: 45,
      spacing: 2,
      label: '12/20/2023',
      labelWidth: 70,
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 },
      frontColor: COLORS.primary,
      intialSapce: 0,
    },
    {
      value: 3,
      spacing: 2,
      frontColor: COLORS.violet,
    },
    { value: 7, frontColor: COLORS.darkBlue },
    {
      value: 50,
      spacing: 2,
      label: '13/20/2023',
      labelWidth: 70,
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 },
      frontColor: COLORS.primary,
      intialSapce: 0,
    },
    {
      value: 89,
      spacing: 2,
      frontColor: COLORS.violet,
    },
    { value: 22, frontColor: COLORS.darkBlue },
    {
      value: 88,
      spacing: 2,
      label: '13/20/2023',
      labelWidth: 70,
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 },
      frontColor: COLORS.primary,
      intialSapce: 0,
    },
    {
      value: 44,
      spacing: 2,
      frontColor: COLORS.violet,
    },
    { value: 22, frontColor: COLORS.darkBlue },
    {
      value: 88,
      spacing: 2,
      label: '13/20/2023',
      labelWidth: 70,
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 },
      frontColor: COLORS.primary,
      intialSapce: 0,
    },
    {
      value: 44,
      spacing: 2,
      frontColor: COLORS.violet,
    },
    { value: 22, frontColor: COLORS.darkBlue },
    {
      value: 66,
      spacing: 2,
      label: '13/20/2023',
      labelWidth: 70,
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 },
      frontColor: COLORS.primary,
      intialSapce: 0,
    },
    {
      value: 56,
      spacing: 2,
      frontColor: COLORS.violet,
    },
    { value: 22, frontColor: COLORS.darkBlue },
    {
      value: 23,
      spacing: 2,
      label: '13/20/2023',
      labelWidth: 70,
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 },
      frontColor: COLORS.primary,
      intialSapce: 0,
    },
    {
      value: 1,
      spacing: 2,
      frontColor: COLORS.violet,
    },
    { value: 22, frontColor: COLORS.darkBlue },
  ];
  const getFrontColor = (type, value) => {
    const frontColors = {
      JBR: COLORS.primary,
      CASH: COLORS.darkBlue,
      CARD: COLORS.violet,
    };

    if (value !== undefined) {
      return value ? frontColors[type] : COLORS.white;
    }

    return frontColors[type];
  };
  const convertData = () => {
    const DATA = getTotalTraData?.graphData;
    const barData = DATA.labels.flatMap((day, index) => {
      const values = DATA.datasets.map((dataset) => dataset[index]);
      const setOfThree = [];
      setOfThree.push({
        value: values[0] || 0,
        spacing: 10,
        label: day,
        labelWidth: 80,
        labelTextStyle: { color: COLORS.darkGray, fontSize: 11, marginLeft: ms(10) },
        frontColor: COLORS.primary,
        initialSpace: 0,
        JBR: true,
      });
      setOfThree.push({
        value: values[1] || 0,
        spacing: 10,
        frontColor: COLORS.darkBlue,
        Cash: true,
      });
      setOfThree.push({
        value: values[2] || 0,
        spacing: 25,
        frontColor: COLORS.violet,
        Card: true,
      });

      return setOfThree;
    });

    setModifyData(barData);
  };

  const onClickCheckBox = (type, value) => {
    const DATA = getTotalTraData?.graphData;
    const barData = DATA.labels.flatMap((day, index) => {
      const values = DATA.datasets.map((dataset) => dataset[index]);
      const setOfThree = [];
      if (type === 'JBR') {
        setOfThree.push({
          value: values[0] || 0,
          spacing: 10,
          label: day,
          labelWidth: 80,
          labelTextStyle: { color: COLORS.darkGray, fontSize: 11, marginLeft: ms(10) },
          frontColor: value ? COLORS.primary : COLORS.white,
          initialSpace: 0,
          JBR: true,
        });
      } else {
        setOfThree.push({
          value: values[0] || 0,
          spacing: 10,
          label: day,
          labelWidth: 80,
          labelTextStyle: { color: COLORS.darkGray, fontSize: 11, marginLeft: ms(10) },
          frontColor: showJBR ? COLORS.primary : COLORS.white,
          initialSpace: 0,
          JBR: true,
        });
      }
      if (type === 'CASH') {
        setOfThree.push({
          value: values[1] || 0,
          spacing: 10,
          frontColor: value ? COLORS.darkBlue : COLORS.white,
          Cash: true,
        });
      } else {
        setOfThree.push({
          value: values[1] || 0,
          spacing: 10,
          frontColor: showCash ? COLORS.darkBlue : COLORS.white,
          Cash: true,
        });
      }
      if (type === 'CARD') {
        setOfThree.push({
          value: values[2] || 0,
          spacing: 10,
          frontColor: value ? COLORS.violet : COLORS.white,
          Card: true,
        });
      } else {
        setOfThree.push({
          value: values[2] || 0,
          spacing: 10,
          frontColor: showCard ? COLORS.violet : COLORS.white,
          Card: true,
        });
      }
      return setOfThree;
    });
    setModifyData(barData);
  };

  useEffect(() => {
    convertData();
  }, [getTotalTraData]);

  return (
    <View style={styles.graphViewStyle}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          onPress={() => {
            setShowJBR((prevShowJBR) => {
              const newState = !prevShowJBR;
              onClickCheckBox('JBR', newState);
              return newState;
            });
          }}
          style={styles.checkboxViewStyle}
        >
          <Image
            source={showJBR ? mark : blankCheckBox}
            style={[styles.checkboxIconStyle, showJBR && { tintColor: COLORS.primary }]}
          />
          <Text style={styles.varientTextStyle}>JBR Coin</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowCash((prevShowJBR) => {
              const newState = !prevShowJBR;
              onClickCheckBox('CASH', newState);
              return newState;
            });
          }}
          style={styles.checkboxViewStyle}
        >
          <Image
            source={showCash ? mark : blankCheckBox}
            style={[styles.checkboxIconStyle, showCash && { tintColor: COLORS.darkBlue }]}
          />
          <Text style={styles.varientTextStyle}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowCard((prevShowJBR) => {
              const newState = !prevShowJBR;
              onClickCheckBox('CARD', newState);
              return newState;
            });
          }}
          style={styles.checkboxViewStyle}
        >
          <Image
            source={showCard ? mark : blankCheckBox}
            style={[styles.checkboxIconStyle, showCard && { tintColor: COLORS.violet }]}
          />
          <Text style={styles.varientTextStyle}>Card</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: ms(10) }}>
        {/* <BarChartCom
          barWid={Dimensions.get('window').width * 0.82}
          barHei={Platform.OS === 'android' ? ms(170) : SH(270)}
          barSpacing={SW(35.2)}
          barW={SW(3.5)}
          // labelTextSty={{ color: COLORS.darkGray, fontSize: 11 }}
          initialSpacing={SH(10)}
          // data={dummyData}
          data={getDeliveryData?.graphOrders}
          spacing={SW(45)}
          interval={2}
          dateInterval={5}
        /> */}

        <BarChart
          data={modifyData}
          barWidth={SW(3.5)}
          spacing={SW(35.2)}
          roundedTop
          // hideRules
          xAxisThickness={1}
          yAxisThickness={0}
          xAxisType={'dashed'}
          yAxisType={'dashed'}
          xAxisColor={`rgba(39, 90, 255, 1)`}
          yAxisTextStyle={{ color: COLORS.darkGray, fontSize: 11 }}
          noOfSections={4}
          // maxValue={100}
          yAxisLength={350}
          height={Platform.OS === 'android' ? ms(170) : SH(270)}
          width={Dimensions.get('window').width * 0.82}
          initialSpacing={SH(10)}
        />
      </View>
    </View>
  );
};

export default memo(Graph);

const styles = StyleSheet.create({
  graphViewStyle: {
    borderRadius: 10,
    paddingBottom: 30,
    height: twoEqualView,
    // width: windowWidth * 0.76,
    backgroundColor: COLORS.white,
    padding: ms(10),
    marginTop: ms(10),
  },
  numberOrdersText: {
    fontSize: SF(16),
    paddingTop: ms(10),
    paddingHorizontal: 20,
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  renderItemView: {
    marginLeft: ms(15),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(7),
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
    marginRight: ms(10),
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
