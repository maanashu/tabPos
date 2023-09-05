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

  const outputData = summedValues.map((value, index) => ({
    label: getDeliveryData?.graphOrders?.labels?.[index],
    value,
    labelTextStyle: { color: COLORS.gerySkies, fontSize: 11, fontFamily: Fonts.Regular },
    spacing: Platform.OS == 'ios' ? 38 : 62,
    initialSpace: 0,
    frontColor:
      index === 0
        ? COLORS.bluish_green
        : index === 1
        ? COLORS.pink
        : index === 2
        ? COLORS.yellowTweet
        : COLORS.primary,
  }));

  const changeValue = (index) => {
    setGraphData((prev) => {
      let list = [...prev];
      list[index].checked = !list[index].checked;
      return list;
    });
  };

  const renderGraphItem = ({ item, index }) => {
    const getImageSource = () => {
      if (item?.title === strings.shippingOrder.incomingOrders) return incomingOrders;
      if (item?.title === strings.shippingOrder.processingOrders) return cancelledOrders;
      if (item?.title === strings.shippingOrder.readyPickupOrders) return returnedOrders;
      return checkedCheckboxSquare;
    };

    const getIconTintColor = () => {
      switch (item?.title) {
        case strings.shippingOrder.incomingOrders:
          return COLORS.bluish_green;
        case strings.shippingOrder.processingOrders:
          return COLORS.pink;
        case strings.shippingOrder.readyPickupOrders:
          return COLORS.yellowTweet;
        default:
          return COLORS.primary;
      }
    };

    const handlePress = () => changeValue(index);

    return (
      <View style={styles.renderItemView}>
        <TouchableOpacity style={styles.checkboxViewStyle} onPress={handlePress}>
          <Image
            source={item?.checked ? getImageSource() : blankCheckBox}
            style={[
              styles.checkboxIconStyle,
              { tintColor: item?.checked ? undefined : getIconTintColor() },
            ]}
          />

          <Text style={styles.varientTextStyle}>
            {item?.title === strings.shippingOrder.incomingOrders
              ? strings.shippingOrder.incomingOrders
              : item?.title === strings.shippingOrder.processingOrders
              ? strings.shippingOrder.processingOrders
              : item?.title === strings.shippingOrder.readyPickupOrders
              ? strings.shippingOrder.readyPickupOrders
              : strings.shippingOrder.completed}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.graphViewStyle}>
      <View style={styles.flexRow}>
        <View style={styles.checkboxViewStyle}>
          <Image source={incomingOrders} style={styles.checkboxIconStyle} />
          <Text style={styles.varientTextStyle}>Wallking customer</Text>
        </View>
        <View style={styles.checkboxViewStyle}>
          <Image source={onlinecustomer} style={styles.checkboxIconStyle} />
          <Text style={styles.varientTextStyle}>Online Customers</Text>
        </View>
        <View style={styles.checkboxViewStyle}>
          <Image source={returnedOrders} style={[styles.checkboxIconStyle]} />
          <Text style={styles.varientTextStyle}>New Customers</Text>
        </View>
      </View>
      <View style={{ marginTop: ms(10) }}>
        <LineChart
          data={{
            labels: [
              '12/20/2023',
              '12/20/2023',
              '12/20/2023',
              '12/20/2023',
              '12/20/2023',
              '12/20/2023',
              '12/20/2023',
            ],
            datasets: [
              {
                data: [0, 0, 100, 40, 30, 50, 60],
                color: () => `rgba(31, 179, 255, 1)`,
                strokeWidth: 3,
              },
              {
                data: [10, 20, 30, 40, 50, 60, 70, 80],
                color: () => `rgba(39, 90, 255, 1)`,
                strokeWidth: 3,
              },
              {
                data: [0, 10, 20, 30, 40, 50, 60, 70],
                color: () => `rgba(252, 186, 48, 1)`,
                strokeWidth: 3,
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.86}
          height={Platform.OS === 'android' ? 320 : 390}
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
