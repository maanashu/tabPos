import React, { useCallback } from 'react';
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
  channel,
  deliveryIcon,
  locationSales,
  order_frequency,
  profitIcon,
  soldProduct,
  totalOrders,
  totalSales,
  total_orders,
} from '@/assets';
import { COLORS } from '@/theme';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AnalyticsTypes';
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

export function TotalDeliveryOrders({ onPressReview }) {
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticOrderGraphs = getAnalyticsData?.getAnalyticOrderGraphs;
  const deliveryGraph = analyticOrderGraphs?.delivery_graph;
  // const data = [
  //   ...deliveryGraph?.deliverd_data_list,
  //   ...deliveryGraph?.returned_data_list,
  //   ...deliveryGraph?.cancelled_data_list,
  // ];

  const interval = 1;
  const maxLabel = 31;
  const daysLength = 31;

  const dataLabelsDelivery = analyticOrderGraphs?.delivery_graph?.graph_data?.labels;
  const labelsDelivery = generateLabels(dataLabelsDelivery, interval, maxLabel, daysLength);

  const isAnalyticOrderGraphLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_ORDER_GRAPHS], state)
  );

  const getDeliveryOrderList = ({ item, index }) => (
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
          <Text>{index + 1 + '.        '}</Text>
          <Text style={styles.revenueDataText}> {item?.order_date ? item?.order_date : ''}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.count}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.averageValue.toFixed(2)}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.order_frequency}
          {' Per Hour'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>${item?.amount.toFixed(2)}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <TouchableOpacity style={styles.reviewView} onPress={() => onPressReview(item?.order_date)}>
          <Text style={[styles.revenueDataText, { color: COLORS.navy_blue, fontSize: ms(7) }]}>
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
        <Text style={styles.graphTitle}> {'Total Delivery Orders'}</Text>
      </View>
      <View style={styles.headerContainer}>
        <HeaderView
          image={total_orders}
          text={'Total Orders'}
          count={
            deliveryGraph?.ordersOverView?.total_orders
              ? numberFormate(deliveryGraph?.ordersOverView?.total_orders)
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={order_frequency}
          text={'Order Frequency'}
          count={
            deliveryGraph?.ordersOverView?.order_frequency
              ? numberFormate(deliveryGraph?.ordersOverView?.order_frequency) + '/Hour'
              : '0/Hour'
          }
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={deliveryIcon}
          text={'Average Order Value'}
          count={
            deliveryGraph?.ordersOverView?.averageValue
              ? deliveryGraph?.ordersOverView?.averageValue < 0
                ? '-$' +
                  amountFormat(Math.abs(deliveryGraph?.ordersOverView?.averageValue), 'notSign')
                : amountFormat(deliveryGraph?.ordersOverView?.averageValue)
              : '$0'
          }
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={soldProduct}
          text={'Total Revenue'}
          count={
            deliveryGraph?.ordersOverView?.total_sales_or_actual_amount
              ? '$' + deliveryGraph?.ordersOverView?.total_sales_or_actual_amount?.toFixed(2)
              : '$0'
          }
          isLoading={isAnalyticOrderGraphLoading}
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
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Total Delivery Orders</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Average Order Value</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Order Frequency</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Revenue</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {isAnalyticOrderGraphLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.navy_blue} size={'small'} />
                </View>
              ) : deliveryGraph?.ordersListData?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View
                  style={[styles.listView, { height: Platform.OS === 'ios' ? ms(260) : ms(288) }]}
                >
                  <FlatList
                    style={styles.listStyle}
                    data={deliveryGraph?.ordersListData}
                    renderItem={getDeliveryOrderList}
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
