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
  averageOrder,
  backArrow2,
  deliveryIcon,
  inventory_value,
  locationSales,
  profit,
  profitIcon,
  totalOrders,
  total_inventory,
} from '@/assets';
import { DataTable } from 'react-native-paper';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { COLORS } from '@/theme';
import { useRef } from 'react';
import { getTotalInventory } from '@/actions/AnalyticsAction';
import { useDebouncedCallback } from 'use-lodash-debounce';
import { height } from '@/theme/ScalerDimensions';
import { amountFormat, numberFormate } from '@/utils/GlobalMethods';

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

export function TotalInventory({ sellerID, data }) {
  const dispatch = useDispatch();

  const getAnalyticsData = useSelector(getAnalytics);
  const totalInventory = getAnalyticsData?.getTotalInventory;

  const isInventoryLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_INVENTORY], state)
  );

  const onEndReachedCalledDuringMomentum = useRef(false);
  const paginationData = {
    total: totalInventory?.inventory_list?.total,
    totalPages: totalInventory?.inventory_list?.total_pages,
    perPage: totalInventory?.inventory_list?.per_page,
    currentPage: totalInventory?.inventory_list?.current_page,
  };

  const onLoadMoreInventory = useCallback(() => {
    if (!isInventoryLoading) {
      if (paginationData?.currentPage < paginationData?.totalPages) {
        dispatch(getTotalInventory(sellerID, data, paginationData?.currentPage + 1));
      }
    }
  }, [paginationData]);

  const debouncedLoadMoreInventory = useDebouncedCallback(onLoadMoreInventory, 300);

  const renderFooter = () => {
    return isInventoryLoading ? <ActivityIndicator size="large" color={COLORS.navy_blue} /> : null;
  };

  const getProductList = ({ item, index }) => (
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
      <DataTable.Cell style={styles.dateTablealignStart2}>
        <Text>{index + 1 + '.     '}</Text>
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
        <Text style={styles.graphTitle}>{' Total Inventory'}</Text>
      </View>
      <View style={styles.headerContainer}>
        <HeaderView
          image={total_inventory}
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
          image={inventory_value}
          text={'Total Inventory Value'}
          count={
            totalInventory?.inventory_overview?.total_inventory_cost
              ? amountFormat(totalInventory?.inventory_overview?.total_inventory_cost)
              : '$0'
          }
          isLoading={isInventoryLoading}
        />
        <HeaderView
          image={deliveryIcon}
          text={'Average Order Value'}
          count={
            totalInventory?.inventory_overview?.average_value
              ? amountFormat(totalInventory?.inventory_overview?.average_value)
              : '$0'
          }
          isLoading={isInventoryLoading}
        />
        <HeaderView
          image={profitIcon}
          text={'Gross Profit'}
          count={
            totalInventory?.inventory_overview?.total_profit
              ? amountFormat(totalInventory?.inventory_overview?.total_profit)
              : '$0'
          }
          isLoading={isInventoryLoading}
        />
      </View>

      {/* <View style={styles.graphHeaderView}> */}
      {/* <Text style={styles.graphHeaderText}>{'Total Profits'}</Text> */}
      {/* <View style={{ alignSelf: 'center', height: SH(210) }}>
          <BarChartCom
            barWid={Dimensions.get('window').width - SW(110)}
            barHei={SH(140)}
            barSpacing={SW(30)}
            barW={7}
            labelTextSty={{ color: COLORS.darkGray, fontSize: 11 }}
            initialSpacing={SW(20)}
          />
        </View> */}
      {/* <LineChart
          bezier
          data={{
            labels: totalInventory?.graph_data?.labels
              ? labelsInvetory
              : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
              {
                data: totalInventory?.graph_data?.datasets?.[0]?.data
                  ? totalInventory?.graph_data?.datasets?.[0]?.data
                  : [12, 20, 12, 30, 42, 40, 50, 40],
                strokeWidth: 2,
                color: (opacity = 2) => `rgba(39, 90, 255,${opacity})`, // optional
              },
            ],
          }}
          width={Dimensions.get('window').width - SW(80)}
          height={SH(210)}
          withDots={false}
          chartConfig={{
            backgroundColor: COLORS.red,
            backgroundGradientFrom: COLORS.white,
            backgroundGradientTo: COLORS.white,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

            labelColor: (opacity = 1) => `rgba(60, 68, 77, ${opacity})`,
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: '#EFEFEF',
            },
            propsForDots: {
              r: '0',
              strokeWidth: '2',
            },
          }}
          style={{
            marginLeft: SW(-3),
            alignSelf: 'center',
          }}
          withShadow={false}
          fromZero
          withVerticalLines={false}
          initialSpacing={SH(50)}
        /> */}
      {/* </View> */}
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
              {/* {isInventoryLoading ? (
                <View style={styles.loaderView}>
                  <ActivityIndicator color={COLORS.navy_blue} size={'small'} />
                </View>
              ) : */}
              {totalInventory?.inventory_list?.data === undefined ? (
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
                    // bounces={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
                    onMomentumScrollBegin={() => {}}
                    onMomentumScrollEnd={() => {
                      if (onEndReachedCalledDuringMomentum.current) {
                        // onLoadMoreProduct();
                        debouncedLoadMoreInventory();
                        onEndReachedCalledDuringMomentum.current = false;
                      }
                    }}
                    removeClippedSubviews={true}
                    ListFooterComponent={renderFooter}
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
