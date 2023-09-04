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
} from '@/assets';
import { Spacer } from '@/components';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { graphOptions } from '@/constants/flatListData';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const windowWidth = Dimensions.get('window').width;
const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 2;

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
      <View>
        <Text style={styles.numberOrdersText}>{strings.deliveryOrders.orderNumber}</Text>

        <FlatList
          horizontal
          data={graphData}
          scrollEnabled={false}
          renderItem={renderGraphItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Spacer space={Platform.OS === 'android' ? SH(25) : SH(20)} />

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
    justifyContent: 'center',
  },
});
