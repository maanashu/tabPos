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
  averageOrder,
  backArrow2,
  calendar,
  clay,
  dropdown,
  locationSales,
  margin,
  profit,
  revenueGraph,
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

export function TotalProductSold({ onPress }) {
  const [channel, setChannel] = useState(false);
  const [channelValue, setChannelValue] = useState(null);
  const [channelItem, setChannelItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);

  const getAnalyticsData = useSelector(getAnalytics);
  const soldProduct = getAnalyticsData?.getSoldProduct;

  const interval = 1;
  const maxLabel = 31;
  const daysLength = 31;

  const dataLabelsProductSold = soldProduct?.graph_data?.labels;
  const labelsProductSold = generateLabels(dataLabelsProductSold, interval, maxLabel, daysLength);

  const getSoldProductList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart2}>
        <Text>{index + 1 + '.           '}</Text>
        <Text style={styles.revenueDataText}>{item?.product_name}</Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.upc}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.price}</Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>{item?.order?.total_items}</Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{moment(item?.created_at).format('YYYY-MM-DD')}</Text>
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
  console.log('first', soldProduct);
  return (
    <View style={styles.flex1}>
      <TouchableOpacity onPress={onPress} style={styles.goBack}>
        <Image source={backArrow2} style={styles.backImageStyle} />
        <Text style={styles.graphTitle}> {'Total Proucts Sold'}</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <HeaderView
          image={locationSales}
          text={'Unit Sold'}
          count={
            soldProduct?.productOverview?.totalProducts
              ? soldProduct?.productOverview?.totalProducts
              : 0
          }
          style={{ marginHorizontal: ms(5) }}
        />
        <HeaderView
          image={revenueTotal}
          text={'Total Volume'}
          count={
            soldProduct?.productOverview?.totalVolume
              ? soldProduct?.productOverview?.totalVolume
              : 0
          }
        />
        <HeaderView
          image={margin}
          text={'Profit Margin'}
          count={soldProduct?.productOverview?.margin ? soldProduct?.productOverview?.margin : 0}
        />
        <HeaderView
          image={profit}
          text={'Gross Profit'}
          count={
            soldProduct?.productOverview?.totalProfit
              ? soldProduct?.productOverview?.totalProfit
              : 0
          }
        />
      </View>
      {/* 
      <View style={styles.graphHeaderView}>
        <Text style={styles.graphHeaderText}>{'Total Profits'}</Text>

        <LineChart
          bezier
          data={{
            labels: soldProduct?.graph_data?.labels
              ? labelsProductSold
              : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
              {
                data: soldProduct?.graph_data?.datasets?.[0]?.data,
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
        />
      </View> */}
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
                <Text style={styles.revenueText}>UPC</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Price</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>In Stock</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Last sold date</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={styles.mainListContainer}>
              {soldProduct?.totalProductSoldList?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={soldProduct?.totalProductSoldList}
                    renderItem={getSoldProductList}
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
