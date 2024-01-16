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
import { Spacer } from '@mPOS/components';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { COLORS } from '@/theme';
import { styles } from '../styles';
import { Images } from '@mPOS/assets';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { amountFormat, numberFormate } from '@/utils/GlobalMethods';

export function TotalInventory() {
  const getAnalyticsData = useSelector(getAnalytics);
  const totalInventory = getAnalyticsData?.getTotalInventory;
  const isInventoryLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_INVENTORY], state)
  );

  const getProductList = ({ item, index }) => {
    const price = item?.supplies[0]?.cost_price * item?.supplies[0]?.rest_quantity;
    return (
      <DataTable.Row>
        <DataTable.Cell style={styles.dateTablealignStart2}>
          <Text>{index + 1 + '.   '}</Text>
          <Text style={styles.revenueDataText}>{item?.name}</Text>
        </DataTable.Cell>
        <DataTable.Cell style={styles.dateTableSetting2}>
          <Text style={styles.revenueDataText}>{item?.category?.name}</Text>
        </DataTable.Cell>
        <DataTable.Cell style={styles.dateTableSetting2}>
          <Text style={styles.revenueDataText}>{item?.upc}</Text>
        </DataTable.Cell>
        <DataTable.Cell style={styles.dateTableSetting2}>
          <Text style={styles.revenueDataText}>
            {item?.supplies[0]?.cost_price
              ? item?.supplies[0]?.cost_price < 0
                ? '-$' +
                  amountFormat(
                    Math.abs(item?.supplies[0]?.cost_price * item?.supplies[0]?.rest_quantity),
                    'notSign'
                  )
                : amountFormat(item?.supplies[0]?.cost_price * item?.supplies[0]?.rest_quantity)
              : '$0'}
          </Text>
        </DataTable.Cell>

        <DataTable.Cell style={styles.dateTableSetting2}>
          <Text style={styles.revenueDataText}>
            {item?.supplies[0]?.rest_quantity ? numberFormate(item?.supplies[0]?.rest_quantity) : 0}
          </Text>
        </DataTable.Cell>

        <DataTable.Cell style={styles.dateTableSetting2}>
          <Text style={styles.revenueDataText}>
            {moment(item?.last_sold_date).format('YYYY-MM-DD')}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  };

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
          text={'Total Inventory'}
          count={
            totalInventory?.inventory_overview?.total_inventory
              ? numberFormate(totalInventory?.inventory_overview?.total_inventory)
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
          isLoading={isInventoryLoading}
        />
        <HeaderView
          image={Images.averageOrder}
          text={'Total Inventory Value'}
          count={
            totalInventory?.inventory_overview?.total_inventory_cost
              ? amountFormat(totalInventory?.inventory_overview?.total_inventory_cost)
              : '$0'
          }
          isLoading={isInventoryLoading}
        />
        <HeaderView
          image={Images.totalOrders}
          text={'Average Order Value'}
          count={
            totalInventory?.inventory_overview?.average_value
              ? amountFormat(totalInventory?.inventory_overview?.average_value)
              : '$0'
          }
          isLoading={isInventoryLoading}
        />
        <HeaderView
          image={Images.profit}
          text={'Gross Profit'}
          count={
            totalInventory?.inventory_overview?.total_profit
              ? amountFormat(totalInventory?.inventory_overview?.total_profit)
              : '$0'
          }
          isLoading={isInventoryLoading}
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
                <Text style={styles.revenueText}>Product Name</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Catagory</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>UPC</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Price</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>In stock</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Last sold date</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {isInventoryLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                </View>
              ) : totalInventory?.inventory_list?.data?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={totalInventory?.inventory_list?.data}
                    renderItem={getProductList}
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
