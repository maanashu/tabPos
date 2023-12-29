import React, { useCallback, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import {
  Fonts,
  backArrow2,
  deliveryIcon,
  locationSales,
  profit,
  profitIcon,
  revenueTotal,
  totalOrders,
  totalSales,
  total_orders,
  total_volume,
} from '@/assets';
import { DataTable } from 'react-native-paper';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { TYPES } from '@/Types/AnalyticsTypes';
import { COLORS } from '@/theme';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getAnalyticStatistics } from '@/actions/AnalyticsAction';
import { useDebouncedCallback } from 'use-lodash-debounce';
import { height } from '@/theme/ScalerDimensions';
import { amountFormat, numberFormate } from '@/utils/GlobalMethods';

const generateLabels = (dataLabels, interval, maxLabel, daysLength) => {
  const labelInterval = Math.ceil(dataLabels?.length / daysLength);
  const dayLabels = Array.from(
    { length: Math.ceil(dataLabels?.length / labelInterval) },
    (_, index) => {
      const labelValue = (index + 1) * labelInterval;
      return labelValue <= maxLabel ? labelValue.toString() : maxLabel.toString();
    }
  );

  const filterMonthsByInterval = (monthsArray) => {
    if (interval <= 0) {
      throw new Error('Interval must be a positive integer.');
    }

    return monthsArray?.filter((_, index) => index % interval === 0);
  };

  const outputMonths = filterMonthsByInterval(dataLabels);
  const shortMonthNames = outputMonths?.map((month) => month);

  if (dataLabels?.length > 12) {
    return dayLabels;
  } else if (dataLabels?.length === 12) {
    return shortMonthNames;
  } else {
    return dataLabels;
  }
};

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
      <ActivityIndicator size="large" color={COLORS.navy_blue} />
    ) : null;
  };

  const getProfitList = ({ item, index }) => (
    <DataTable.Row
      style={{
        borderColor: COLORS.sky_grey,
        borderWidth: 2,
        borderRadius: ms(25),
        marginBottom: ms(6),
        borderBottomWidth: 2,
        borderBottomColor: COLORS.sky_grey,
      }}
    >
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.     '}</Text>
          <Text style={styles.revenueDataText}> {item?.order_date ? item?.order_date : ''}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_orders}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={[styles.dateTableSetting, { marginHorizontal: ms(5) }]}>
        <Text style={styles.revenueDataText}>
          {item?.transaction < 0
            ? '-$' + Math.abs(item?.transaction)?.toFixed(2)
            : '$' + item?.transaction?.toFixed(2) ?? 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.average_value < 0
            ? '-$' + Math.abs(item?.average_value)?.toFixed(2)
            : '$' + item?.average_value?.toFixed(2) ?? 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.total_tax < 0
            ? '-$' + Math.abs(item?.total_tax)?.toFixed(2)
            : '$' + item?.total_tax?.toFixed(2) ?? 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.cost_sum < 0
            ? '-$' + Math.abs(item?.cost_sum)?.toFixed(2)
            : '$' + item?.cost_sum?.toFixed(2) ?? 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.margin ? item?.margin.toFixed(2) : 0}%</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>
          {item?.profit_sum < 0
            ? '-$' + Math.abs(item?.profit_sum)?.toFixed(2)
            : '$' + item?.profit_sum?.toFixed(2) ?? 0}
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const HeaderView = useCallback(
    ({ image, text, count, style, isLoading }) => (
      <View style={[styles.subContainer, style]}>
        <Image source={image} resizeMode="contain" style={styles.imageStyle} />
        <Text style={styles.text}>{text}</Text>
        {isLoading ? (
          <ActivityIndicator
            color={COLORS.navy_blue}
            size={'small'}
            style={{ alignSelf: 'flex-start' }}
          />
        ) : (
          <Text style={styles.text2}>{count}</Text>
        )}
      </View>
    ),
    []
  );
  return (
    <View
      style={{
        height: Platform.OS === 'android' ? '97%' : height - ms(50),
        backgroundColor: COLORS.white,
        borderRadius: ms(10),
        marginTop: ms(5),
        marginRight: ms(8),
        paddingHorizontal: ms(12),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: ms(10),
        }}
      >
        <Image
          source={profitIcon}
          style={{ height: ms(15), width: ms(15), resizeMode: 'contain' }}
        />
        <Text style={styles.graphTitle}> {'Gross Profit'}</Text>
      </View>
      <View style={styles.headerContainer}>
        <HeaderView
          image={total_orders}
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
          image={total_volume}
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
          image={deliveryIcon}
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
          image={profitIcon}
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

      {/* <Spacer space={ms(15)} /> */}

      <View style={styles.tableMainView}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          <DataTable style={styles.tableView}>
            <DataTable.Header style={[styles.tableListHeader, { height: ms(40) }]}>
              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Total Orders</Text>
              </DataTable.Title>

              <DataTable.Title
                style={[styles.tableHeaderView, { marginHorizontal: ms(5) }]}
                numberOfLines={2}
              >
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

              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Gross Profit</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {/* {profitStatisticsLoader ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.navy_blue} size={'small'} />
                </View>
              ) : */}
              {analyticStatistics?.orderData?.data?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View
                  style={[styles.listView, { height: Platform.OS === 'ios' ? ms(260) : ms(288) }]}
                >
                  <FlatList
                    style={styles.listStyle}
                    data={analyticStatistics?.orderData?.data}
                    extraData={analyticStatistics?.orderData?.data}
                    renderItem={getProfitList}
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
