import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Spacer } from '@mPOS/components';
import { DataTable } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../styles';
import { COLORS } from '@/theme';
import { Images } from '@mPOS/assets';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getAnalyticStatistics } from '@/actions/AnalyticsAction';
import { useDebouncedCallback } from 'use-lodash-debounce';
import { amountFormat, numberFormate } from '@/utils/GlobalMethods';

export function TotalProfit({ sellerID, data }) {
  const dispatch = useDispatch();

  const getAnalyticsData = useSelector(getAnalytics);
  const analyticStatistics = getAnalyticsData?.getAnalyticStatistics;
  const onEndReachedCalledDuringMomentum = useRef(false);

  const profitStatisticsLoader = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_STATISTICS], state)
  );
  const paginationData = {
    total: analyticStatistics?.orderData?.total,
    totalPages: analyticStatistics?.orderData?.total_pages,
    perPage: analyticStatistics?.orderData?.per_page,
    currentPage: analyticStatistics?.orderData?.current_page,
  };

  const onLoadMoreProfit = useCallback(() => {
    if (!profitStatisticsLoader) {
      if (paginationData?.currentPage < paginationData?.totalPages) {
        dispatch(getAnalyticStatistics(sellerID, data, paginationData?.currentPage + 1));
      }
    }
  }, [paginationData]);

  const debouncedLoadMoreProfit = useDebouncedCallback(onLoadMoreProfit, 300);

  const renderFooter = () => {
    return profitStatisticsLoader ? (
      <ActivityIndicator size="large" color={COLORS.primary} style={styles.loaderView} />
    ) : null;
  };

  const getProfitList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={[styles.flexDirectionRow, { alignItems: 'center' }]}>
          <Text>{index + 1}</Text>
          <Text style={styles.revenueDataText}> {item?.order_date ? item?.order_date : ''}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.total_orders ? numberFormate(item?.total_orders) : 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.transaction
            ? item?.transaction < 0
              ? '-$' + amountFormat(Math.abs(item?.transaction), 'notSign')
              : amountFormat(item?.transaction)
            : '$0'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.average_value
            ? item?.average_value < 0
              ? '-$' + amountFormat(Math.abs(item?.average_value), 'notSign')
              : amountFormat(item?.average_value)
            : '$0'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.total_tax
            ? item?.total_tax < 0
              ? '-$' + amountFormat(Math.abs(item?.total_tax), 'notSign')
              : amountFormat(item?.total_tax)
            : '$0'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.cost_sum
            ? item?.cost_sum < 0
              ? '-$' + amountFormat(Math.abs(item?.cost_sum), 'notSign')
              : amountFormat(item?.cost_sum)
            : '$0'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.margin ? item?.margin.toFixed(2) : 0}%</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>
          {item?.profit_sum
            ? item?.profit_sum < 0
              ? '-$' + amountFormat(Math.abs(item?.profit_sum), 'notSign')
              : amountFormat(item?.profit_sum)
            : '$0'}
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
              ? numberFormate(analyticStatistics?.overView?.total_orders)
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
          isLoading={profitStatisticsLoader}
        />
        <HeaderView
          image={Images.revenueTotal}
          text={'Total Volume'}
          count={
            analyticStatistics?.overView?.transaction
              ? analyticStatistics?.overView?.transaction < 0
                ? '-$' +
                  amountFormat(Math.abs(analyticStatistics?.overView?.transaction), 'notSign')
                : amountFormat(analyticStatistics?.overView?.transaction)
              : '$0'
          }
          isLoading={profitStatisticsLoader}
        />
        <HeaderView
          image={Images.totalOrders}
          text={'Average order value'}
          count={
            analyticStatistics?.overView?.average_value
              ? analyticStatistics?.overView?.average_value < 0
                ? '-$' +
                  amountFormat(Math.abs(analyticStatistics?.overView?.average_value), 'notSign')
                : amountFormat(analyticStatistics?.overView?.average_value)
              : '$0'
          }
          isLoading={profitStatisticsLoader}
        />
        <HeaderView
          image={Images.profit}
          text={'Gross Profit'}
          count={
            analyticStatistics?.overView?.profit_sum
              ? analyticStatistics?.overView?.profit_sum < 0
                ? '-$' + amountFormat(Math.abs(analyticStatistics?.overView?.profit_sum), 'notSign')
                : amountFormat(analyticStatistics?.overView?.profit_sum)
              : '$0'
          }
          isLoading={profitStatisticsLoader}
        />
      </View>

      <Spacer space={ms(15)} />

      <View style={styles.tableMainView}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          //   scrollEnabled={false}
        >
          <DataTable style={styles.tableView}>
            <DataTable.Header style={[styles.tableListHeader, { height: ms(60) }]}>
              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Total Orders</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Total Volume</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Average Order value</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Tax</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Total Cost</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Margin</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Gross Profit</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={[styles.mainListContainer]}>
              {/* {profitStatisticsLoader ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) : */}
              {analyticStatistics?.orderData?.data?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={[styles.listView, { width: Dimensions.get('window').width * 2 }]}>
                  <FlatList
                    style={styles.listStyle}
                    data={analyticStatistics?.orderData?.data}
                    renderItem={getProfitList}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
                    onMomentumScrollBegin={() => {}}
                    onMomentumScrollEnd={() => {
                      if (onEndReachedCalledDuringMomentum.current) {
                        debouncedLoadMoreProfit();
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
