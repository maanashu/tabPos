import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import { backArrow2, channel, locationSales, totalOrders, totalSales } from '@/assets';
import { COLORS } from '@/theme';
import { DataTable } from 'react-native-paper';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { NAVIGATION } from '@/constants';
import { navigate } from '@/navigation/NavigationRef';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

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

export function TotalPosOrder({ onPressReview }) {
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticOrderGraphs = getAnalyticsData?.getAnalyticOrderGraphs;
  const posGraph = analyticOrderGraphs?.pos_graph;
  // const data = [
  //   ...posGraph?.deliverd_data_list,
  //   ...posGraph?.returned_data_list,
  //   ...posGraph?.cancelled_data_list,
  // ];

  const interval = 1;
  const maxLabel = 31;
  const daysLength = 31;

  const dataLabelsPOS = analyticOrderGraphs?.pos_graph?.graph_data?.labels;
  const labelsPOS = generateLabels(dataLabelsPOS, interval, maxLabel, daysLength);

  const isAnalyticOrderGraphLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_ORDER_GRAPHS], state)
  );

  const getPOSOrderList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.        '}</Text>
          <Text style={styles.revenueDataText}> {item?.order_date ? item?.order_date : ''}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.count}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.averageValue
            ? item?.averageValue < 0
              ? '-$' + Math.abs(item?.averageValue)?.toFixed(2)
              : '$' + item?.averageValue?.toFixed(2)
            : '$0'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.order_frequency}
          {' Per Hour'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>
          {item?.amount
            ? item?.amount < 0
              ? '-$' + Math.abs(item?.amount)?.toFixed(2)
              : '$' + item?.amount?.toFixed(2)
            : '$0'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <TouchableOpacity style={styles.reviewView} onPress={() => onPressReview(item?.order_date)}>
          <Text style={[styles.revenueDataText, { color: COLORS.primary, fontSize: ms(7) }]}>
            {'Review'}
          </Text>
        </TouchableOpacity>
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
            color={COLORS.primary}
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

  const averageValue =
    posGraph?.ordersOverView?.averageValue < 0
      ? Math.abs(posGraph?.ordersOverView?.averageValue)
      : posGraph?.ordersOverView?.averageValue;

  const totalSalesValue =
    posGraph?.ordersOverView?.total_sales_or_actual_amount < 0
      ? Math.abs(posGraph?.ordersOverView?.total_sales_or_actual_amount)
      : posGraph?.ordersOverView?.total_sales_or_actual_amount;

  return (
    <View style={styles.flex1}>
      <Text style={styles.graphTitle}> {'Total POS Orders'}</Text>

      <View style={styles.headerContainer}>
        <HeaderView
          image={locationSales}
          text={'Total Orders'}
          count={posGraph?.ordersOverView?.total_orders}
          style={{ marginHorizontal: ms(5) }}
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={channel}
          text={'Order Frequency'}
          count={
            posGraph?.ordersOverView?.order_frequency
              ? posGraph?.ordersOverView?.order_frequency + '/Hour'
              : '0/Hour'
          }
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={totalOrders}
          text={'Average Order Value'}
          count={
            posGraph?.ordersOverView?.averageValue
              ? posGraph?.ordersOverView?.averageValue < 0
                ? '-$' + averageValue?.toFixed(2)
                : '$' + averageValue?.toFixed(2)
              : '$0'
          }
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={totalSales}
          text={'Total Sales'}
          count={
            posGraph?.ordersOverView?.total_sales_or_actual_amount
              ? posGraph?.ordersOverView?.total_sales_or_actual_amount < 0
                ? '-$' + totalSalesValue?.toFixed(2)
                : '$' + totalSalesValue?.toFixed(2)
              : '$0'
          }
          isLoading={isAnalyticOrderGraphLoading}
        />
      </View>

      <Spacer space={ms(15)} />

      <View style={styles.tableMainView}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        >
          <DataTable style={styles.tableView}>
            <DataTable.Header style={[styles.tableListHeader]}>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total POS Orders</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Average Order Value</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Order Frequency</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Sales</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {isAnalyticOrderGraphLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) : posGraph?.ordersListData?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={posGraph?.ordersListData}
                    renderItem={getPOSOrderList}
                    keyExtractor={(_, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
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
