import React, { useCallback, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Spacer } from '@mPOS/components';
import { DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { COLORS } from '@/theme';
import { styles } from '../styles';
import { Images } from '@mPOS/assets';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getAnalyticStatistics } from '@/actions/AnalyticsAction';
import { useDebouncedCallback } from 'use-lodash-debounce';

export function TotalCost({ sellerID, data }) {
  const dispatch = useDispatch();
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticStatistics = getAnalyticsData?.getAnalyticStatistics;

  const costStatisticsLoader = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_STATISTICS], state)
  );
  const onEndReachedCalledDuringMomentum = useRef(false);

  const paginationData = {
    total: analyticStatistics?.orderData?.total,
    totalPages: analyticStatistics?.orderData?.total_pages,
    perPage: analyticStatistics?.orderData?.per_page,
    currentPage: analyticStatistics?.orderData?.current_page,
  };

  const onLoadMoreCost = useCallback(() => {
    if (!costStatisticsLoader) {
      if (paginationData?.currentPage < paginationData?.totalPages) {
        dispatch(getAnalyticStatistics(sellerID, data, paginationData?.currentPage + 1));
      }
    }
  }, [paginationData]);

  const debouncedLoadMoreCost = useDebouncedCallback(onLoadMoreCost, 300);

  const renderFooter = () => {
    return costStatisticsLoader ? (
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.loaderView} />
    ) : null;
  };

  const getCostList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.        '}</Text>
          <Text style={styles.revenueDataText}> {item?.order_date ? item?.order_date : ''}</Text>
        </View>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          ${item?.transaction ? item?.transaction.toFixed(2) : 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_items ? item?.total_items : 0}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          ${item?.total_price ? item?.total_price.toFixed(2) : 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.margin ? item?.margin.toFixed(2) : 0}%</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>
          ${item?.cost_sum ? item?.cost_sum.toFixed(2) : 0}
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
          text={'Total Orders'}
          count={
            analyticStatistics?.overView?.total_orders
              ? analyticStatistics?.overView?.total_orders
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
          isLoading={costStatisticsLoader}
        />
        <HeaderView
          image={Images.revenueTotal}
          text={'Total Volume'}
          count={
            analyticStatistics?.overView?.transaction
              ? '$' + analyticStatistics?.overView?.transaction?.toFixed(2)
              : '$0'
          }
          isLoading={costStatisticsLoader}
        />
        <HeaderView
          image={Images.totalOrders}
          text={'Average order value'}
          count={
            analyticStatistics?.overView?.average_value
              ? '$' + analyticStatistics?.overView?.average_value?.toFixed(2)
              : '$0'
          }
          isLoading={costStatisticsLoader}
        />
        <HeaderView
          image={Images.totalCost}
          text={'Total Cost'}
          count={
            analyticStatistics?.overView?.total_cost
              ? '$' + analyticStatistics?.overView?.total_cost?.toFixed(2)
              : '$0'
          }
          isLoading={costStatisticsLoader}
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
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Volume</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Product</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Price</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Margin</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Cost</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {/* {costStatisticsLoader ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) :  */}
              {analyticStatistics?.orderData?.data?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={analyticStatistics?.orderData?.data}
                    renderItem={getCostList}
                    // keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
                    onMomentumScrollBegin={() => {}}
                    onMomentumScrollEnd={() => {
                      if (onEndReachedCalledDuringMomentum.current) {
                        debouncedLoadMoreCost();
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
