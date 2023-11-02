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
import { Spacer } from '@mPOS/components';
import { COLORS } from '@/theme';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { styles } from '../styles';
import { Images } from '@mPOS/assets';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export function TotalShippingOrders({ onPressReview }) {
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticOrderGraphs = getAnalyticsData?.getAnalyticOrderGraphs;
  const shippingGraph = analyticOrderGraphs?.shipping_graph;

  const isAnalyticOrderGraphLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_ORDER_GRAPHS], state)
  );

  const getShippingOrderList = ({ item, index }) => (
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
          count={shippingGraph?.ordersOverView?.total_orders}
          style={{ marginHorizontal: ms(5) }}
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={Images.channel}
          text={'Order Frequency'}
          count={
            shippingGraph?.ordersOverView?.order_frequency
              ? shippingGraph?.ordersOverView?.order_frequency + '/Hour'
              : '0/Hour'
          }
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={Images.totalOrders}
          text={'Average Order Value'}
          count={
            shippingGraph?.ordersOverView?.averageValue
              ? '$' + shippingGraph?.ordersOverView?.averageValue?.toFixed(2)
              : '$0'
          }
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={Images.totalSales}
          text={'Total Sales'}
          count={
            shippingGraph?.ordersOverView?.total_sales_or_actual_amount
              ? '$' + shippingGraph?.ordersOverView?.total_sales_or_actual_amount?.toFixed(2)
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
        >
          <DataTable style={styles.tableView}>
            <DataTable.Header style={[styles.tableListHeader, { height: ms(40) }]}>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Total Shipping Orders</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting} numberOfLines={2}>
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

            <View style={[styles.mainListContainer]}>
              {isAnalyticOrderGraphLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) : shippingGraph?.ordersListData?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={shippingGraph?.ordersListData}
                    renderItem={getShippingOrderList}
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
