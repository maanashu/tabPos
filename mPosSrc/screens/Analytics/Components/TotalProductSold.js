import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Spacer } from '@mPOS/components';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { COLORS } from '@/theme';
import { useDebouncedCallback } from 'use-lodash-debounce';
import { styles } from '../styles';
import { Images } from '@mPOS/assets';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getSoldProduct } from '@/actions/AnalyticsAction';
import { amountFormat, numberFormate } from '@/utils/GlobalMethods';

export function TotalProductSold({ sellerID, data }) {
  const dispatch = useDispatch();

  const getAnalyticsData = useSelector(getAnalytics);
  const soldProduct = getAnalyticsData?.getSoldProduct;
  const onEndReachedCalledDuringMomentum = useRef(false);

  const paginationData = {
    total: soldProduct?.totalProductSoldList?.total,
    totalPages: soldProduct?.totalProductSoldList?.total_pages,
    perPage: soldProduct?.totalProductSoldList?.per_page,
    currentPage: soldProduct?.totalProductSoldList?.current_page,
  };

  const isSoldProductLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_SOLD_PRODUCT], state)
  );
  const onLoadMoreProduct = useCallback(() => {
    if (!isSoldProductLoading) {
      if (paginationData?.currentPage < paginationData?.totalPages) {
        dispatch(getSoldProduct(sellerID, data, paginationData?.currentPage + 1));
      }
    }
  }, [paginationData]);

  const debouncedLoadMoreProduct = useDebouncedCallback(onLoadMoreProduct, 300);

  const renderFooter = () => {
    return isSoldProductLoading ? (
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.loaderView} />
    ) : null;
  };

  const getSoldProductList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart2}>
        <Text>{index + 1 + '.    '}</Text>
        <Text style={styles.revenueDataText}>{item?.product_name}</Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.product_upc}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.total_price
            ? item?.total_price < 0
              ? '-$' + amountFormat(Math.abs(item?.total_price), 'notSign')
              : amountFormat(item?.total_price)
            : '$0'}
        </Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting}>
        {/* <Text style={styles.revenueDataText}>{item?.order?.total_items}</Text> */}

        <Text style={styles.revenueDataText}>
          {item?.in_stock_qty ? numberFormate(item?.in_stock_qty) : 0}
        </Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {moment(item?.last_sold_date).format('YYYY-MM-DD')}
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const HeaderView = useCallback(
    ({ image, text, count, style, isLoading }) => (
      <View style={[styles.subContainer, style]}>
        <Image source={image} resizeMode="contain" style={styles.imageStyle} />
        <View style={{ marginLeft: ms(14) }}>
          <Text style={styles.text}>{text}</Text>
          <Spacer space={ms(4)} />
          {isLoading ? (
            <ActivityIndicator
              color={COLORS.primary}
              size={'small'}
              style={{ alignSelf: 'flex-start' }}
            />
          ) : (
            <Text style={styles.text2}>{count}</Text>
          )}
        </View>
      </View>
    ),
    []
  );

  return (
    <View>
      <View style={styles.headerContainer}>
        <HeaderView
          image={Images.locationSales}
          text={'Unit Sold'}
          count={
            soldProduct?.productOverview?.totalProducts
              ? numberFormate(soldProduct?.productOverview?.totalProducts)
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
          isLoading={isSoldProductLoading}
        />
        <HeaderView
          image={Images.revenueTotal}
          text={'Total Volume'}
          count={
            soldProduct?.productOverview?.totalVolume
              ? amountFormat(soldProduct?.productOverview?.totalVolume)
              : '$0'
          }
          isLoading={isSoldProductLoading}
        />
        <HeaderView
          image={Images.margin}
          text={'Profit Margin'}
          count={
            soldProduct?.productOverview?.totalMargin
              ? numberFormate(soldProduct?.productOverview?.totalMargin) + '%'
              : '$0'
          }
          isLoading={isSoldProductLoading}
        />
        <HeaderView
          image={Images.profit}
          text={'Gross Profit'}
          count={
            soldProduct?.productOverview?.totalProfit
              ? amountFormat(soldProduct?.productOverview?.totalProfit)
              : '$0'
          }
          isLoading={isSoldProductLoading}
        />
      </View>

      <Spacer space={ms(15)} />

      <View style={styles.tableMainView}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <DataTable style={styles.tableView}>
            <DataTable.Header style={[styles.tableListHeader]}>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Product Name</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>UPC</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Price</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>In Stock</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Last sold date</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={[styles.mainListContainer]}>
              {/* {isSoldProductLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) :  */}

              {soldProduct?.totalProductSoldList?.data?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={soldProduct?.totalProductSoldList?.data}
                    extraData={soldProduct?.totalProductSoldList?.data}
                    renderItem={getSoldProductList}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    // bounces={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
                    onMomentumScrollBegin={() => {}}
                    onMomentumScrollEnd={() => {
                      if (onEndReachedCalledDuringMomentum.current) {
                        // onLoadMoreProduct();
                        debouncedLoadMoreProduct();
                        onEndReachedCalledDuringMomentum.current = false;
                      }
                    }}
                    removeClippedSubviews={true}
                    ListFooterComponent={renderFooter}
                  />
                </View>
              )}
            </View>
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
}
