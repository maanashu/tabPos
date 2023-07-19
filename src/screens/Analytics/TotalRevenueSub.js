import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { catPercent, colorFrame, productMap, revenueGraph } from '@/assets';
import { strings } from '@/localization';
import { styles } from './Analytics.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { DaySelector, Spacer } from '@/components';
import { HomeGraph } from './Components';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useDispatch, useSelector } from 'react-redux';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AnalyticsTypes';
import { useEffect } from 'react';
import { getOrderstatistics } from '@/actions/AnalyticsAction';
import { useIsFocused } from '@react-navigation/native';

export function TotalRevenueSub({
  totalOrderViseHandler,
  totalRevenueHandler,
  sellerID,
}) {
  const [selectTime, setSelectTime] = useState();
  const getAnalyticsData = useSelector(getAnalytics);
  const [orderSelectId, setOrderSelectId] = useState(2);
  const [selectOrderTime, setSelectOrderTime] = useState({ value: 'week' });
  const [backTime, setBackTime] = useState();

  const orderTime = selectOrderTime?.value;
  const orderGraphObject = getAnalyticsData?.getOrderGraph;
  const Orderstatistics = getAnalyticsData?.getOrderstatistics;

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('abc', value);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('abc');
      if (value !== null) {
        setBackTime(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  const totalGraphLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_GRAPH], state)
  );
  const orderOnPress = value => {
    dispatch(getOrderstatistics(sellerID, value));
    storeData(value);
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getOrderstatistics(sellerID, orderTime));
      getData();
    }
  }, [isFocused]);

  const totalCostLoad = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_STATISTICS], state)
  );

  const graphHandler = item => {};

  const totalOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => totalOrderViseHandler(item, orderTime)}
    >
      <View style={styles.categoryChildCon}>
        {totalCostLoad ? (
          <ActivityIndicator
            size="small"
            style={{ alignItems: 'flex-start' }}
            color={COLORS.black}
          />
        ) : (
          <Text style={styles.categoryCount}>{item.count}</Text>
        )}
        <Text numberOfLines={1} style={styles.categoryText}>
          {item.title}
        </Text>
      </View>
      <View style={styles.categoryChildPercent}>
        <Image source={catPercent} style={styles.catPercent} />
        <Text style={styles.percentText}>{item.percentage}%</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.totalProductBodyCon}>
      <View>
        <View style={styles.totalProductDetailCon}>
          <Spacer space={SH(10)} />
          <View style={styles.displayFlex}>
            <Text style={styles.trancationHeading}>
              {strings.analytics.totalRevenue}
            </Text>
            <View>
              {/* <DaySelector
             setSelectTime={setSelectTime}
             /> */}
            </View>
          </View>
          <Spacer space={SH(2)} />
          <TouchableOpacity onPress={totalRevenueHandler}>
            <Text
              style={[
                styles.darkBlackText,
                { fontSize: SF(34), color: COLORS.primary },
              ]}
            >
              {getAnalyticsData?.getOrderGraph?.totalResult.toFixed(2) ?? 0}{' '}
            </Text>
          </TouchableOpacity>
          <Spacer space={SH(5)} />
          <View>
            <Image source={colorFrame} style={styles.colorFrame} />
            <Spacer space={SH(5)} />
            <View>
              <Image source={revenueGraph} style={styles.revenueGraph} />
            </View>
          </View>
        </View>
        <Spacer space={SH(15)} />
        <View style={styles.totalProductDetailCon}>
          <Spacer space={SH(10)} />
          <View style={styles.displayFlex}>
            <View>
              <View>
                <DaySelector
                  onPresFun={orderOnPress}
                  setSelectTime={setSelectOrderTime}
                  selectId={orderSelectId}
                  setSelectId={setOrderSelectId}
                />
              </View>
            </View>
            <Text style={styles.trancationHeading}>
              {strings.analytics.totalOrder}
            </Text>
          </View>
          <Spacer space={SH(2)} />
          <Text
            style={[
              styles.darkBlackText,
              {
                fontSize: SF(34),
                color: COLORS.primary,
                alignSelf: 'flex-end',
              },
            ]}
          >
            ${getAnalyticsData?.getOrderGraph?.totalResult.toFixed(2) ?? 0}
          </Text>
          <Spacer space={SH(5)} />
          <View style={styles.productGraphcon}>
            <View style={styles.displayFlex}>
              <View
              // style={[
              //   styles.productCategorychildcon,
              //   { backgroundColor: 'red', height: SH(320) },
              // ]}
              >
                <View>
                  <FlatList
                    data={Orderstatistics?.data}
                    renderItem={totalOrderItem}
                    // keyExtractor={item => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                  />
                </View>
              </View>
              <View>
                <HomeGraph
                  productGraphObject={orderGraphObject}
                  homeGraphHandler={() => graphHandler('Total Orders')}
                  arrayLength={orderGraphObject?.datasets?.length}
                  productLoader={totalGraphLoading}
                  hideHeader
                  chartStyle
                />
                {/* <Image source={productMap} style={styles.totalOrderMap} /> */}
              </View>
            </View>
          </View>
        </View>
        <Spacer space={SH(40)} />
      </View>
    </View>
  );
}
