import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import { backArrow2, locationSales, profit, revenueTotal, totalOrders } from '@/assets';
import { COLORS } from '@/theme';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import moment from 'moment';
import { ms } from 'react-native-size-matters';

export function TotalOrders() {
  const getAnalyticsData = useSelector(getAnalytics);
  const totalOrder = getAnalyticsData?.getTotalOrder;

  // const data = [
  //   ...totalOrder?.onlineOrdersData,
  //   ...totalOrder?.posOrdersData,
  //   ...totalOrder?.shippingOrdersData,
  // ];
  // console.log('first', JSON.stringify(totalOrder));
  // return false;

  const getTotalOrderList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.       '}</Text>
          <Text style={styles.revenueDataText}> {item?.order_date ? item?.order_date : ''}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_orders}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.new_consumer}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.consumer_returning?.toFixed(2)}</Text>
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
      <Text style={styles.graphTitle}> {'Total Orders'}</Text>

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
              : '$0'
          }
        />
        <HeaderView
          image={totalOrders}
          text={'Average order value'}
          count={
            totalOrder?.ordersOverView?.averageValue
              ? '$' + totalOrder?.ordersOverView?.averageValue?.toFixed(2)
              : '$0'
          }
        />
        <HeaderView
          image={profit}
          text={'Gross Profit'}
          count={
            totalOrder?.ordersOverView?.total_profit
              ? '$' + totalOrder?.ordersOverView?.total_profit?.toFixed(2)
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
                <Text style={styles.revenueText}>Action</Text>
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
