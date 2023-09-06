import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { BarChart } from 'react-native-gifted-charts';

import { COLORS, SF, SH } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { blankCheckBox, Fonts, mark } from '@/assets';
import { graphOptions } from '@/constants/flatListData';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const { width } = Dimensions.get('window');

const Graph = () => {
  const getGraphOrderData = useSelector(getDelivery);
  const [graphData, setGraphData] = useState(graphOptions);

  const isDeliveryOrder = useSelector((state) =>
    isLoadingSelector([TYPES.GET_GRAPH_ORDERS], state)
  );

  const changeValue = (index) => {
    setGraphData((prev) => {
      let list = [...prev];
      list[index].checked = !list[index].checked;
      return list;
    });
  };

  const checkedIndices = graphData
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => parseInt(checkbox.key) - 1);

  const summedValues = Array(getGraphOrderData?.graphOrders?.labels?.length).fill(0);

  for (const index of checkedIndices) {
    const dataset = getGraphOrderData?.graphOrders?.datasets?.[index].data;
    for (let i = 0; i < dataset?.length; i++) {
      summedValues[i] += dataset[i];
    }
  }

  const outputData = summedValues.map((value, index) => ({
    label: getGraphOrderData?.graphOrders?.labels?.[index],
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

  const renderGraphItem = ({ item, index }) => {
    const title =
      item?.title === strings.shippingOrder.incomingOrders
        ? strings.shippingOrder.incomingOrders
        : item.title === strings.shippingOrder.processingOrders
        ? strings.shippingOrder.processingOrders
        : item?.title === strings.shippingOrder.readyPickupOrders
        ? strings.shippingOrder.readyPickupOrders
        : strings.shippingOrder.completed;

    const image =
      item?.title === strings.shippingOrder.incomingOrders
        ? COLORS.bluish_green
        : item.title === strings.shippingOrder.processingOrders
        ? COLORS.pink
        : item?.title === strings.shippingOrder.readyPickupOrders
        ? COLORS.yellowTweet
        : COLORS.primary;

    return (
      <View style={styles.checkBoxRowMainView}>
        {item?.checked ? (
          <TouchableOpacity style={styles.checkBoxViewStyle} onPress={() => changeValue(index)}>
            <Image source={mark} style={[styles.checkIconStyle, { tintColor: image }]} />
            <Text style={styles.labelTextStyle}>{title}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.checkBoxViewStyle} onPress={() => changeValue(index)}>
            <Image source={blankCheckBox} style={[styles.checkIconStyle, { tintColor: image }]} />
            <Text style={styles.labelTextStyle}>{title}</Text>
          </TouchableOpacity>
        )}
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

      <Spacer space={SH(20)} />

      {isDeliveryOrder ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <View>
          <BarChart
            data={outputData}
            noOfSections={7}
            roundedTop
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisType={'dashed'}
            yAxisType={'dashed'}
            yAxisLength={350}
            height={ms(130)}
            width={width * 0.48}
            spacing={2}
            initialSpacing={12}
            disableScroll={true}
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
    paddingTop: ms(8),
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
  checkBoxRowMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(10),
    paddingHorizontal: ms(10),
  },
  checkBoxViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  labelTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
});
