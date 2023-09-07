import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import { Fonts, backArrow2, channel, locationSales, totalOrders, totalSales } from '@/assets';
import { COLORS } from '@/theme';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import moment from 'moment';
import { ms } from 'react-native-size-matters';

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

export function TotalDeliveryOrders() {
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

  const getDeliveryOrderList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.           '}</Text>
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
        <TouchableOpacity style={styles.reviewView}>
          <Text style={[styles.revenueDataText, { color: COLORS.primary, fontSize: ms(7) }]}>
            {'Review'}
          </Text>
        </TouchableOpacity>
      </DataTable.Cell>
    </DataTable.Row>
  );

  const HeaderView = ({ image, text, count, style }) => (
    <View style={[styles.subContainer, style]}>
      <Image source={image} resizeMode="contain" style={styles.imageStyle} />
      <Text style={styles.text}>{text}</Text>
      <Text style={styles.text2}>{count}</Text>
    </View>
  );

  return (
    <View style={styles.flex1}>
      <Text style={styles.graphTitle}> {'Total Delivery Orders'}</Text>

      <View style={styles.headerContainer}>
        <HeaderView
          image={locationSales}
          text={'Total Orders'}
          count={deliveryGraph?.ordersOverView?.total_orders}
          style={{ marginHorizontal: ms(5) }}
        />
        <HeaderView
          image={channel}
          text={'Order Frequency'}
          count={
            deliveryGraph?.ordersOverView?.order_frequency
              ? deliveryGraph?.ordersOverView?.order_frequency + '/Hour'
              : 0
          }
        />
        <HeaderView
          image={totalOrders}
          text={'Average order value'}
          count={
            deliveryGraph?.ordersOverView?.averageValue
              ? '$' + deliveryGraph?.ordersOverView?.averageValue?.toFixed(2)
              : 0
          }
        />
        <HeaderView
          image={totalSales}
          text={'Gross Profit'}
          count={
            deliveryGraph?.ordersOverView?.amount
              ? '$' + deliveryGraph?.ordersOverView?.amount?.toFixed(2)
              : 0
          }
        />
      </View>

      <Spacer space={ms(15)} />

      <View style={styles.tableMainView}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          // scrollEnabled={false}
        >
          <DataTable style={styles.tableView}>
            <DataTable.Header style={[styles.tableListHeader]}>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Delivery Orders</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Average Order View</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Order Frequency</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Sales</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}> </Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {deliveryGraph?.ordersListData?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
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
