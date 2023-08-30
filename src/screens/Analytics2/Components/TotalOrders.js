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
  clay,
  dropdown,
  locationSales,
  profit,
  revenueTotal,
  totalOrders,
} from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from 'react-native-chart-kit';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import moment from 'moment';
import { ms } from 'react-native-size-matters';

export function TotalOrders({ onPress }) {
  const [channel, setChannel] = useState(false);
  const [channelValue, setChannelValue] = useState(null);
  const [channelItem, setChannelItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);
  const getAnalyticsData = useSelector(getAnalytics);
  const totalOrder = getAnalyticsData?.getTotalOrder;

  // const data = [
  //   ...totalOrder?.onlineOrdersData,
  //   ...totalOrder?.posOrdersData,
  //   ...totalOrder?.shippingOrdersData,
  // ];
  // console.log('first', totalOrder?.ordersOverView);
  // return false;

  const getTotalOrderList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.           '}</Text>
          <Text style={styles.revenueDataText}>{moment(item?.date).format('LL')}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_orders}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.new_consumer}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.consumer_returning}</Text>
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
        <Text style={styles.graphTitle}> {'Total Orders'}</Text>
      </TouchableOpacity>
      <View style={styles.headerContainer}>
        <HeaderView
          image={locationSales}
          text={'Total Orders'}
          count={totalOrder?.ordersOverView?.total_orders}
          style={{ marginHorizontal: ms(5) }}
        />
        <HeaderView
          image={revenueTotal}
          text={'Total Volume'}
          count={
            totalOrder?.ordersOverView?.total_volume
              ? '$' + totalOrder?.ordersOverView?.total_volume?.toFixed(2)
              : '0'
          }
        />
        <HeaderView
          image={totalOrders}
          text={'Average order value'}
          count={
            totalOrder?.ordersOverView?.averageValue
              ? '$' + totalOrder?.ordersOverView?.averageValue?.toFixed(2)
              : '0'
          }
        />
        <HeaderView
          image={profit}
          text={'Gross Profit'}
          count={
            totalOrder?.ordersOverView?.total_profit
              ? '$' + totalOrder?.ordersOverView?.total_profit?.toFixed(2)
              : '0'
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
                <Text style={styles.revenueText}>Total Orders</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Customer-New</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Customer-Returning</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Sales</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}> </Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {totalOrder?.order_listing?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={totalOrder?.order_listing}
                    renderItem={getTotalOrderList}
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
