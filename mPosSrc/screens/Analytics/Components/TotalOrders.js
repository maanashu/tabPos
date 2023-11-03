import React, { useCallback, useState } from 'react';
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
import { COLORS } from '@/theme';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { ms } from 'react-native-size-matters';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AnalyticsTypes';
import { styles } from '../styles';
import { Images } from '@mPOS/assets';

export function TotalOrders({ onPressReview }) {
  const getAnalyticsData = useSelector(getAnalytics);
  const totalOrder = getAnalyticsData?.getTotalOrder;
  const isTotalOrderLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_ORDER], state)
  );

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
        <Text style={styles.revenueDataText}>{item?.new_consumer}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.consumer_returning}</Text>
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
          <Text style={[styles.revenueDataText, { color: COLORS.primary, fontSize: ms(10) }]}>
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
          count={totalOrder?.ordersOverView?.total_orders}
          style={{ marginHorizontal: ms(5) }}
          isLoading={isTotalOrderLoading}
        />
        <HeaderView
          image={Images.revenueTotal}
          text={'Total Volume'}
          count={
            totalOrder?.ordersOverView?.total_volume
              ? totalOrder?.ordersOverView?.total_volume < 0
                ? '-$' + Math.abs(totalOrder?.ordersOverView?.total_volume)?.toFixed(2)
                : '$' + totalOrder?.ordersOverView?.total_volume?.toFixed(2)
              : '$0'
          }
          isLoading={isTotalOrderLoading}
        />
        <HeaderView
          image={Images.totalOrders}
          text={'Average order value'}
          count={
            totalOrder?.ordersOverView?.averageValue
              ? totalOrder?.ordersOverView?.averageValue < 0
                ? '-$' + Math.abs(totalOrder?.ordersOverView?.averageValue)?.toFixed(2)
                : '$' + totalOrder?.ordersOverView?.averageValue?.toFixed(2)
              : '$0'
          }
          isLoading={isTotalOrderLoading}
        />
        <HeaderView
          image={Images.profit}
          text={'Gross Profit'}
          count={
            totalOrder?.ordersOverView?.total_profit
              ? totalOrder?.ordersOverView?.total_profit < 0
                ? '-$' + Math.abs(totalOrder?.ordersOverView?.total_profit)?.toFixed(2)
                : '$' + totalOrder?.ordersOverView?.total_profit?.toFixed(2)
              : '$0'
          }
          isLoading={isTotalOrderLoading}
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
                <Text style={styles.revenueText}>Action</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {isTotalOrderLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) : totalOrder?.order_listing?.length === 0 ? (
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
