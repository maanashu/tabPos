import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import { Fonts, backArrow2, locationSales, revenueTotal, totalOrders, totalSales } from '@/assets';
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

export function TotalProfit() {
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticStatistics = getAnalyticsData?.getAnalyticStatistics;
  const interval = 1;
  const maxLabel = 31;
  const daysLength = 31;

  const dataLabelsProfit = analyticStatistics?.profit?.graph_data?.labels;
  const labelsProfit = generateLabels(dataLabelsProfit, interval, maxLabel, daysLength);
  const getProfitList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.           '}</Text>
          <Text style={styles.revenueDataText}> {item?.order_date ? item?.order_date : ''}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_orders}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          ${item?.transaction ? item?.transaction.toFixed(2) : 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          ${item?.average_value ? item?.average_value.toFixed(2) : 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          ${item?.cost_sum ? item?.cost_sum.toFixed(2) : 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.margin ? item?.margin.toFixed(2) : 0}%</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>
          ${item?.profit_sum ? item?.profit_sum.toFixed(2) : 0}
        </Text>
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
      <Text style={styles.graphTitle}> {'Gross Profit'}</Text>
      <View style={styles.headerContainer}>
        <HeaderView
          image={locationSales}
          text={'Total Orders'}
          count={
            analyticStatistics?.overView?.total_orders
              ? analyticStatistics?.overView?.total_orders
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
        />
        <HeaderView
          image={revenueTotal}
          text={'Total Volume'}
          count={
            analyticStatistics?.overView?.transaction
              ? '$' + analyticStatistics?.overView?.transaction?.toFixed(2)
              : '$0'
          }
        />
        <HeaderView
          image={totalOrders}
          text={'Average order value'}
          count={
            analyticStatistics?.overView?.average_value
              ? '$' + analyticStatistics?.overView?.average_value?.toFixed(2)
              : '$0'
          }
        />
        <HeaderView
          image={totalSales}
          text={'Gross Profit'}
          count={
            analyticStatistics?.overView?.profit_sum
              ? '$' + analyticStatistics?.overView?.profit_sum?.toFixed(2)
              : '$0'
          }
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
            <DataTable.Header style={[styles.tableListHeader, { height: ms(40) }]}>
              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Total Orders</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Transaction Volume</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Average Order value</Text>
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

            <View
              style={[
                styles.mainListContainer,
                { height: Platform.OS === 'ios' ? ms(245) : ms(288) },
              ]}
            >
              {analyticStatistics?.orderData?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={analyticStatistics?.orderData}
                    renderItem={getProfitList}
                    keyExtractor={(item) => item.id}
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
