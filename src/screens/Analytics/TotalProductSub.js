import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { activeProduct, catPercent } from '@/assets';
import { strings } from '@/localization';
import { styles } from './Analytics.styles';
import { categoryData, inverntrycategoryData } from '@/constants/flatListData';
import CircularProgress from 'react-native-circular-progress-indicator';

import { DaySelector, Spacer } from '@/components';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
  getTotalInventoryCost,
  getTotalProDetail,
} from '@/actions/AnalyticsAction';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TotalProductSub({
  inverntoryUnitViseHandler,
  tableAccCatHandler,
  sellerID,
}) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [productSelectId, setProductSelectId] = useState(2);
  const [inventorySelectId, setInventorySelectId] = useState(2);
  const [selectProTime, setSelectProTime] = useState({ value: 'week' });
  const [selectInventoryTime, setSelectInventoryTime] = useState({
    value: 'week',
  });
  const productTime = selectProTime?.value;
  const inventoryTime = selectInventoryTime?.value;
  const getAnalyticsData = useSelector(getAnalytics);
  const data = {
    totalProduct: getAnalyticsData?.getTotalProDetail?.total_products ?? '0',
    newAdd: getAnalyticsData?.getTotalProDetail?.new_added_products ?? '0',
    discounted:
      getAnalyticsData?.getTotalProDetail?.discontinued_products ?? '0',
    totalActive:
      getAnalyticsData?.getTotalProDetail?.total_active_products ?? '0',
    categoryArray: getAnalyticsData?.getTotalProDetail?.result,

    CatSubBrandArray: getAnalyticsData?.getTotalProDetail?.result,
  };

  const totalInventoryCost = getAnalyticsData?.getTotalInventoryCost;

  const productMulti = data?.newAdd * 100;
  const productScale = productMulti / data?.totalActive;
  const [backTime, setBackTime] = useState();

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('abc', value);
    } catch (e) {
      // saving error
    }
  };
  const storeDataInventory = async value => {
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

  const productOnPress = value => {
    dispatch(getTotalProDetail(sellerID, value));
    storeData(value);
  };
  const inventoryOnPress = value => {
    dispatch(getTotalInventoryCost(sellerID, value));
    storeDataInventory(value);
  };
  const productDetLoad = useSelector(state =>
    isLoadingSelector([TYPES.GET_TOTALPRO_DETAIL], state)
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(getTotalProDetail(sellerID, productTime));
      dispatch(getTotalInventoryCost(sellerID, inventoryTime));
      getData();
    }
  }, [isFocused]);

  const inventoryCostLoad = useSelector(state =>
    isLoadingSelector([TYPES.GET_TOTAL_INVENTORY_COST], state)
  );

  const categoryInventoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => inverntoryUnitViseHandler(item, inventoryTime)}
    >
      <View style={styles.categoryChildCon}>
        {inventoryCostLoad ? (
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
        <Text numberOfLines={1} style={styles.percentText}>
          {item.percentage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const categoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => tableAccCatHandler(item, productTime)}
    >
      <View style={styles.categoryChildCon}>
        {productDetLoad ? (
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
              {strings.analytics.totalProducts}
            </Text>
            <View>
              <DaySelector
                onPresFun={productOnPress}
                setSelectTime={setSelectProTime}
                selectId={productSelectId}
                setSelectId={setProductSelectId}
              />
            </View>
          </View>
          {/* productDetLoad */}
          <Spacer space={SH(2)} />
          <View style={{ height: SH(60), justifyContent: 'center' }}>
            <Text
              style={[
                styles.darkBlackText,
                { fontSize: SF(34), color: COLORS.primary },
              ]}
            >
              {productDetLoad ? (
                <ActivityIndicator color={COLORS.primary} />
              ) : (
                data.totalProduct
              )}
            </Text>
          </View>
          {/* <Spacer space={SH(5)} /> */}
          <View style={styles.productGraphcon}>
            <View style={styles.displayFlex}>
              <View style={styles.productGraphchildcon}>
                <Spacer space={SH(15)} />
                <View style={styles.displayFlex}>
                  <View style={styles.newAddedcon}>
                    <Text style={styles.productDetails}>
                      {strings.analytics.productDetails}
                    </Text>
                    <Spacer space={SH(10)} />
                    <View style={[styles.displayFlex, { height: SH(25) }]}>
                      <Text style={styles.newAddText}>
                        {strings.TotalProSub.newAdd}
                      </Text>
                      <Text style={styles.newAddTextBold}>
                        {productDetLoad ? (
                          <ActivityIndicator color={COLORS.primary} />
                        ) : (
                          data.newAdd
                        )}
                      </Text>
                    </View>
                    <View style={styles.addedhr}></View>
                    <Spacer space={SH(10)} />
                    <View style={[styles.displayFlex, { height: SH(25) }]}>
                      <Text
                        style={[styles.newAddText, { color: COLORS.primary }]}
                      >
                        {strings.TotalProSub.discontinued}
                      </Text>
                      <Text
                        style={[
                          styles.newAddTextBold,
                          { color: COLORS.primary },
                        ]}
                      >
                        {productDetLoad ? (
                          <ActivityIndicator color={COLORS.primary} />
                        ) : (
                          data.discounted
                        )}
                      </Text>
                    </View>
                    <View style={styles.addedhr}></View>
                    <Spacer space={SH(10)} />
                    <View style={[styles.displayFlex, { height: SH(25) }]}>
                      <Text
                        style={[
                          styles.newAddText,
                          { color: COLORS.solid_grey },
                        ]}
                      >
                        {strings.TotalProSub.totalActive}
                      </Text>
                      <Text
                        style={[
                          styles.newAddTextBold,
                          { color: COLORS.solid_grey },
                        ]}
                      >
                        {productDetLoad ? (
                          <ActivityIndicator color={COLORS.primary} />
                        ) : (
                          data.totalActive
                        )}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.totalActiveProductCon}>
                    <Text style={styles.activeProductText}>
                      {strings.analytics.totalActiveProduct}
                    </Text>
                    <Spacer space={SH(15)} />
                    {/* <Image
                      source={activeProduct}
                      style={styles.activeProduct}
                    /> */}
                    <CircularProgress
                      value={productScale ? productScale : 0.0}
                      radius={55}
                      activeStrokeWidth={18}
                      inActiveStrokeWidth={18}
                      activeStrokeColor="#275AFF"
                      inActiveStrokeColor="#EFEFEF"
                      strokeLinecap="butt"
                      valueSuffix={'%'}
                      progressValueStyle={{
                        fontWeight: '600',
                        color: 'black',
                        fontSize: 12,
                      }}
                      progressFormatter={value => {
                        'worklet';
                        return value.toFixed(2);
                      }}
                    />
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.productCategorychildcon,
                  { backgroundColor: 'transparent' },
                ]}
              >
                <View>
                  <FlatList
                    scrollEnabled={false}
                    data={data?.CatSubBrandArray}
                    extraData={data?.CatSubBrandArray}
                    renderItem={categoryItem}
                    // keyExtractor={item => item.id}
                    numColumns={2}
                    contentContainerStyle={styles.contentContainer}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <Spacer space={SH(20)} />
        <View style={[styles.totalProductDetailCon]}>
          <Spacer space={SH(10)} />
          <View style={styles.displayFlex}>
            <View>
              <DaySelector
                onPresFun={inventoryOnPress}
                setSelectTime={setSelectInventoryTime}
                selectId={inventorySelectId}
                setSelectId={setInventorySelectId}
              />
            </View>
            <Text style={styles.trancationHeading}>
              {strings.analytics.totalInvetry}
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
            ${totalInventoryCost?.total_inventory_cost}
          </Text>
          <Spacer space={SH(5)} />
          <View style={styles.productGraphcon}>
            <View style={styles.displayFlex}>
              <View
                style={[
                  styles.productCategorychildcon,
                  { backgroundColor: 'transparent' },
                ]}
              >
                <View>
                  <FlatList
                    scrollEnabled={false}
                    data={totalInventoryCost?.unit_data}
                    renderItem={categoryInventoryItem}
                    //   keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                  />
                </View>
              </View>
              <View style={styles.productGraphchildcon}>
                <Spacer space={SH(15)} />
                <View style={styles.displayFlex}>
                  <View style={styles.newAddedcon}>
                    <Text style={styles.productDetails}>
                      {strings.analytics.invetryDetail}
                    </Text>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text style={styles.newAddText}>
                        {strings.TotalProSub.lowStock}
                      </Text>
                      <Text style={styles.newAddTextBold}>
                        {totalInventoryCost?.low_stock_items}
                      </Text>
                    </View>
                    <View style={styles.addedhr}></View>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text
                        style={[styles.newAddText, { color: COLORS.primary }]}
                      >
                        {strings.TotalProSub.itemAdjust}
                      </Text>
                      <Text
                        style={[
                          styles.newAddTextBold,
                          { color: COLORS.primary },
                        ]}
                      >
                        {totalInventoryCost?.items_to_be_adjusted}
                      </Text>
                    </View>
                    <View style={styles.addedhr}></View>
                    <Spacer space={SH(10)} />
                    <View style={styles.displayFlex}>
                      <Text
                        style={[
                          styles.newAddText,
                          { color: COLORS.solid_grey },
                        ]}
                      >
                        {strings.TotalProSub.itemShipped}
                      </Text>
                      <Text
                        style={[
                          styles.newAddTextBold,
                          { color: COLORS.solid_grey },
                        ]}
                      >
                        {totalInventoryCost?.items_to_be_shipped}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.totalActiveProductCon}>
                    <Text style={styles.activeProductText}>
                      {strings.analytics.activeItem}
                    </Text>
                    <Spacer space={SH(10)} />
                    <CircularProgress
                      value={50}
                      radius={55}
                      activeStrokeWidth={18}
                      inActiveStrokeWidth={18}
                      activeStrokeColor="#275AFF"
                      inActiveStrokeColor="#EFEFEF"
                      strokeLinecap="butt"
                      valueSuffix={'%'}
                      progressValueStyle={{
                        fontWeight: '600',
                        color: 'black',
                        fontSize: 12,
                      }}
                      progressFormatter={value => {
                        'worklet';
                        return value.toFixed(2);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <Spacer space={SH(40)} />
      </View>
    </View>
  );
}
