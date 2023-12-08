import React, { useCallback, useState } from 'react';
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
  backArrow2,
  deliveryIcon,
  locationSales,
  profit,
  profitIcon,
  revenueTotal,
  totalOrders,
  total_orders,
  total_volume,
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

export function TotalOrders({ onPressReview }) {
  const getAnalyticsData = useSelector(getAnalytics);
  const totalOrder = getAnalyticsData?.getTotalOrder;

  // const data = [
  //   ...totalOrder?.onlineOrdersData,
  //   ...totalOrder?.posOrdersData,
  //   ...totalOrder?.shippingOrdersData,
  // ];
  // console.log('first', JSON.stringify(totalOrder));
  // return false;

  const isTotalOrderLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_ORDER], state)
  );

  const getTotalOrderList = ({ item, index }) => (
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
        <Text style={styles.graphTitle}> {'Total Orders'}</Text>
      </View>
      <View style={styles.headerContainer}>
        <HeaderView
          image={total_orders}
          text={'Total Orders'}
          count={totalOrder?.ordersOverView?.total_orders}
          style={{ marginHorizontal: ms(5) }}
          isLoading={isTotalOrderLoading}
        />
        <HeaderView
          image={total_volume}
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
          image={deliveryIcon}
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
          image={profitIcon}
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

      {/* <Spacer space={ms(15)} /> */}

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
              {isTotalOrderLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.navy_blue} size={'small'} />
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
