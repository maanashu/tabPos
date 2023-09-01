import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import { BarChartCom, ScreenWrapper, Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import {
  Fonts,
  averageOrder,
  backArrow2,
  calendar,
  channel,
  clay,
  dropdown,
  locationSales,
  profit,
  totalOrders,
  totalSales,
} from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from 'react-native-chart-kit';
import { DataTable } from 'react-native-paper';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useSelector } from 'react-redux';
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

export function TotalPosOrder({ onPress }) {
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

  const getPOSOrderList = ({ item, index }) => (
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
        <Text style={styles.revenueDataText}>{item?.order_frequency.toFixed(2)}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.amount.toFixed(2)}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <TouchableOpacity
          style={{
            borderColor: COLORS.primary,
            top: 12,
            paddingHorizontal: ms(10),
            paddingVertical: ms(2),
            borderWidth: 1,
            backgroundColor: COLORS.white,
            borderRadius: ms(2),
          }}
        >
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
      <TouchableOpacity onPress={onPress} style={styles.goBack}>
        <Image source={backArrow2} style={styles.backImageStyle} />
        <Text style={styles.graphTitle}> {'Total POS Orders'}</Text>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <HeaderView
          image={locationSales}
          text={'Total Orders'}
          count={posGraph?.ordersOverView?.total_orders}
          style={{ marginHorizontal: ms(5) }}
        />
        <HeaderView
          image={channel}
          text={'Order Frequency'}
          count={
            posGraph?.ordersOverView?.order_frequency
              ? '$' + posGraph?.ordersOverView?.order_frequency?.toFixed(2)
              : 0
          }
        />
        <HeaderView
          image={totalOrders}
          text={'Average order value'}
          count={
            posGraph?.ordersOverView?.averageValue
              ? '$' + posGraph?.ordersOverView?.averageValue?.toFixed(2)
              : 0
          }
        />
        <HeaderView
          image={totalSales}
          text={'Gross Profit'}
          count={
            posGraph?.ordersOverView?.amount
              ? '$' + posGraph?.ordersOverView?.amount?.toFixed(2)
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
                <Text style={styles.revenueText}>Total POS Orders</Text>
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
              {posGraph?.ordersListData?.length === 0 ? (
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
