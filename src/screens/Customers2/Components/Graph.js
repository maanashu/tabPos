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
} from '@/assets';
import { Spacer } from '@/components';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { graphOptions } from '@/constants/flatListData';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { LineChart } from 'react-native-chart-kit';

const windowWidth = Dimensions.get('window').width;
const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 1.8;

const Graph = ({ graphDetail }) => {
  const getDeliveryData = useSelector(getDelivery);
  const [graphData, setGraphData] = useState(graphOptions);
  const [newCustomerCheck, setNewCustomerCheck] = useState(true);
  const [onlineCustomerCheck, setOnlineCustomerCheck] = useState(true);
  const [walkCustomerCheck, setWalkCustomerCheck] = useState(true);

  return (
    <View style={styles.graphViewStyle}>
      <View style={styles.flexRow}>
        <TouchableOpacity
          style={styles.checkboxViewStyle}
          onPress={() => setWalkCustomerCheck((prev) => !prev)}
        >
          <Image
            source={walkCustomerCheck ? incomingOrders : blankCheckBox}
            style={styles.checkboxIconStyle}
          />
          <Text style={styles.varientTextStyle}>Wallking customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkboxViewStyle}
          onPress={() => setOnlineCustomerCheck((prev) => !prev)}
        >
          <Image
            source={onlineCustomerCheck ? onlinecustomer : blankCheckBox}
            style={styles.checkboxIconStyle}
          />
          <Text style={styles.varientTextStyle}>Online Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.checkboxViewStyle}
          onPress={() => setNewCustomerCheck((prev) => !prev)}
        >
          <Image
            source={newCustomerCheck ? returnedOrders : blankCheckBox}
            style={[styles.checkboxIconStyle]}
          />
          <Text style={styles.varientTextStyle}>New Customers</Text>
          {/* returnedOrders */}
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: ms(10) }}>
        <LineChart
          data={{
            labels: graphDetail?.labels,
            datasets:
              !newCustomerCheck && !onlineCustomerCheck && !walkCustomerCheck
                ? [
                    {
                      data: [0],
                      color: () => `rgba(31, 179, 255, 1)`,
                      strokeWidth: 3,
                    },
                    {
                      data: [0],
                      color: () => `rgba(39, 90, 255, 1)`,
                      strokeWidth: 3,
                    },
                    {
                      data: [0],
                      color: () => `rgba(252, 186, 48, 1)`,
                      strokeWidth: 3,
                    },
                  ].filter((el) => el)
                : [
                    walkCustomerCheck && {
                      data: graphDetail?.datasets?.[0]?.data,
                      color: () => `rgba(31, 179, 255, 1)`,
                      strokeWidth: 3,
                    },
                    onlineCustomerCheck && {
                      data: graphDetail?.datasets?.[1]?.data,
                      color: () => `rgba(39, 90, 255, 1)`,
                      strokeWidth: 3,
                    },
                    newCustomerCheck && {
                      data: graphDetail?.datasets?.[2]?.data,
                      color: () => `rgba(252, 186, 48, 1)`,
                      strokeWidth: 3,
                    },
                  ].filter((el) => el),
          }}
          width={Dimensions.get('window').width * 0.86}
          height={Platform.OS === 'android' ? 320 : 390}
          noOfSections={7}
          chartConfig={{
            decimalPlaces: 0,
            backgroundColor: '#000',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: () => `rgba(39, 90, 255, 1)`,
            labelColor: (opacity = 1) => `rgba(98, 98, 98, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: '#CCCCCC',
            },
            propsForDots: {
              r: '0',
              strokeWidth: '2',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withShadow={false}
          fromZero
        />
      </View>
      {/* <FlatList
          horizontal
          data={graphData}
          scrollEnabled={false}
          renderItem={renderGraphItem}
          showsHorizontalScrollIndicator={false}
        /> */}

      {/* <Spacer space={Platform.OS === 'android' ? SH(25) : SH(20)} />

      {isGraphOrder ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <View>
          <BarChart
            roundedTop
            noOfSections={7}
            data={outputData}
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisType={'dashed'}
            yAxisType={'dashed'}
            yAxisTextStyle={styles.yAxistext}
            yAxisLength={350}
            height={ms(130)}
            width={windowWidth * 0.5}
          />
        </View>
      )} */}
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
