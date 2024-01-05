import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
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
import { amountFormat, numberFormate } from '@/utils/GlobalMethods';

export function TotalDeliveryOrders({ onPressReview }) {
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticOrderGraphs = getAnalyticsData?.getAnalyticOrderGraphs;
  const deliveryGraph = analyticOrderGraphs?.delivery_graph;

  const isAnalyticOrderGraphLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_ORDER_GRAPHS], state)
  );

  const getDeliveryOrderList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.     '}</Text>
          <Text style={styles.revenueDataText}> {item?.order_date ? item?.order_date : ''}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.count ? numberFormate(item?.count) : 0}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.averageValue
            ? item?.averageValue < 0
              ? '-$' + amountFormat(Math.abs(item?.averageValue), 'notSign')
              : amountFormat(item?.averageValue)
            : '$0'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.order_frequency}
          {' Per Hour'}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>
          {item?.amount
            ? item?.amount < 0
              ? '-$' + amountFormat(Math.abs(item?.amount), 'notSign')
              : amountFormat(item?.amount)
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
          count={
            deliveryGraph?.ordersOverView?.total_orders
              ? numberFormate(deliveryGraph?.ordersOverView?.total_orders)
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={Images.channel}
          text={'Order Frequency'}
          count={
            deliveryGraph?.ordersOverView?.order_frequency
              ? numberFormate(deliveryGraph?.ordersOverView?.order_frequency) + '/Hour'
              : '0/Hour'
          }
          isLoading={isAnalyticOrderGraphLoading}
        />
        <HeaderView
          image={Images.totalOrders}
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
          image={Images.totalSales}
          text={'Total Revenue'}
          count={
            deliveryGraph?.ordersOverView?.total_sales_or_actual_amount
              ? deliveryGraph?.ordersOverView?.total_sales_or_actual_amount < 0
                ? '-$' +
                  amountFormat(
                    Math.abs(deliveryGraph?.ordersOverView?.total_sales_or_actual_amount),
                    'notSign'
                  )
                : amountFormat(deliveryGraph?.ordersOverView?.total_sales_or_actual_amount)
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
          // scrollEnabled={false}
        >
          <DataTable style={[styles.tableView, { width: Dimensions.get('window').width * 1.7 }]}>
            <DataTable.Header
              style={[
                styles.tableListHeader,
                { height: ms(60), width: Dimensions.get('window').width * 1.7 },
              ]}
            >
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView} numberOfLines={3}>
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

            <View
              style={[
                styles.mainListContainer,
                {
                  width: Dimensions.get('window').width * 1.7,
                  height: Platform.OS === 'ios' ? ms(255) : ms(250),
                },
                ,
              ]}
            >
              {isAnalyticOrderGraphLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) : deliveryGraph?.ordersListData?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={[styles.listStyle, { width: Dimensions.get('window').width * 1.7 }]}
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
