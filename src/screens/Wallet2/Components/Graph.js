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

const windowWidth = Dimensions.get('window').width;
const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 1.8;

const Graph = () => {
  const getDeliveryData = useSelector(getDelivery);

  const [graphData, setGraphData] = useState(graphOptions);

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
      label: '12/20/2023',
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
    { value: 66, frontColor: COLORS.darkBlue },
  ];

  return (
    <View style={styles.graphViewStyle}>
      <View style={styles.flexRow}>
        <View style={styles.checkboxViewStyle}>
          <Image source={mark} style={[styles.checkboxIconStyle, { tintColor: COLORS.primary }]} />
          <Text style={styles.varientTextStyle}>JBR Coin</Text>
        </View>
        <View style={styles.checkboxViewStyle}>
          <Image source={mark} style={[styles.checkboxIconStyle, { tintColor: COLORS.darkBlue }]} />
          <Text style={styles.varientTextStyle}>Cash</Text>
        </View>
        <View style={styles.checkboxViewStyle}>
          <Image source={mark} style={[styles.checkboxIconStyle, { tintColor: COLORS.violet }]} />
          <Text style={styles.varientTextStyle}>Card</Text>
        </View>
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
          data={barData}
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
