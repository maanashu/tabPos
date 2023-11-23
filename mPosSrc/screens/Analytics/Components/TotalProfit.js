import React, { useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Spacer } from '@mPOS/components';
import { DataTable } from 'react-native-paper';
import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { styles } from '../styles';
import { COLORS } from '@/theme';
import { Images } from '@mPOS/assets';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export function TotalProfit() {
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticStatistics = getAnalyticsData?.getAnalyticStatistics;

  const profitStatisticsLoader = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_STATISTICS], state)
  );

  const getProfitList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '. '}</Text>
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
          ${item?.total_tax ? item?.total_tax.toFixed(2) : 0}
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
            analyticStatistics?.overView?.total_orders
              ? analyticStatistics?.overView?.total_orders
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
          isLoading={profitStatisticsLoader}
        />
        <HeaderView
          image={Images.revenueTotal}
          text={'Total Volume'}
          count={
            analyticStatistics?.overView?.transaction
              ? '$' + analyticStatistics?.overView?.transaction?.toFixed(2)
              : '$0'
          }
          isLoading={profitStatisticsLoader}
        />
        <HeaderView
          image={Images.totalOrders}
          text={'Average order value'}
          count={
            analyticStatistics?.overView?.average_value
              ? '$' + analyticStatistics?.overView?.average_value?.toFixed(2)
              : '$0'
          }
          isLoading={profitStatisticsLoader}
        />
        <HeaderView
          image={Images.profit}
          text={'Gross Profit'}
          count={
            analyticStatistics?.overView?.profit_sum
              ? '$' + analyticStatistics?.overView?.profit_sum?.toFixed(2)
              : '$0'
          }
          isLoading={profitStatisticsLoader}
        />
      </View>

      <Spacer space={ms(15)} />

      <View style={styles.tableMainView}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          //   scrollEnabled={false}
        >
          <DataTable style={styles.tableView}>
            <DataTable.Header style={[styles.tableListHeader, { height: ms(60) }]}>
              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Total Orders</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Total Volume</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Average Order value</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Tax</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Total Cost</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.tableHeaderView}>
                <Text style={styles.revenueText}>Margin</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.tableHeaderView} numberOfLines={2}>
                <Text style={styles.revenueText}>Gross Profit</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={[styles.mainListContainer]}>
              {profitStatisticsLoader ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) : analyticStatistics?.orderData?.data?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={[styles.listView, { width: Dimensions.get('window').width * 2 }]}>
                  <FlatList
                    style={styles.listStyle}
                    data={analyticStatistics?.orderData?.data}
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
