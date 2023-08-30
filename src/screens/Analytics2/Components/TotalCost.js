import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import {
  Fonts,
  backArrow2,
  calendar,
  clay,
  dropdown,
  locationSales,
  revenueTotal,
  totalOrders,
  totalSales,
} from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from 'react-native-chart-kit';
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

export function TotalCost({ onPress }) {
  const [channel, setChannel] = useState(false);
  const [channelValue, setChannelValue] = useState(null);
  const [channelItem, setChannelItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticStatistics = getAnalyticsData?.getAnalyticStatistics;

  const interval = 1;
  const maxLabel = 31;
  const daysLength = 31;

  const dataLabelsCost = analyticStatistics?.cost?.graph_data?.labels;
  const labelsCost = generateLabels(dataLabelsCost, interval, maxLabel, daysLength);

  const getCostList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.           '}</Text>
          <Text style={styles.revenueDataText}>
            {' '}
            {item?.date ? moment(item?.date).format('LL') : ''}
          </Text>
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
          ${item?.cost_sum ? item?.cost_sum.toFixed(2) : 0}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.margin ? item?.margin.toFixed(2) : 0}%</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          ${item?.cost_sum ? item?.cost_sum.toFixed(2) : 0}
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
      <TouchableOpacity onPress={onPress} style={styles.goBack}>
        <Image source={backArrow2} style={styles.backImageStyle} />
        <Text style={styles.graphTitle}> {'Total Cost'}</Text>
      </TouchableOpacity>
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
              : 0
          }
        />
        <HeaderView
          image={totalOrders}
          text={'Average order value'}
          count={
            analyticStatistics?.overView?.average_value
              ? '$' + analyticStatistics?.overView?.average_value?.toFixed(2)
              : 0
          }
        />
        <HeaderView
          image={totalSales}
          text={'Gross Profit'}
          count={
            analyticStatistics?.overView?.profit_sum
              ? '$' + analyticStatistics?.overView?.profit_sum?.toFixed(2)
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
                <Text style={styles.revenueText}>Transaction Volume</Text>
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
              {analyticStatistics?.orderData?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={analyticStatistics?.orderData}
                    renderItem={getCostList}
                    // keyExtractor={(_, index) => index.toString()}
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
