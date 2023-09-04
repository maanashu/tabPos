import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Spacer } from '@/components';
import { styles } from '../Analytics2.styles';
import { averageOrder, backArrow2, locationSales, profit, totalOrders } from '@/assets';
import { DataTable } from 'react-native-paper';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useSelector } from 'react-redux';
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

export function TotalInventory({ onPress }) {
  const [channel, setChannel] = useState(false);
  const [channelValue, setChannelValue] = useState(null);
  const [channelItem, setChannelItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);

  const getAnalyticsData = useSelector(getAnalytics);
  const totalInventory = getAnalyticsData?.getTotalInventory;

  const interval = 1;
  const maxLabel = 31;
  const daysLength = 31;

  const dataLabelsInventory = totalInventory?.graph_data?.labels;
  const labelsInvetory = generateLabels(dataLabelsInventory, interval, maxLabel, daysLength);
  const getProductList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart2}>
        <Text>{index + 1 + '   '}</Text>

        <Text style={styles.revenueDataText}>{item?.products?.name}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting2}>
        <Text style={styles.revenueDataText}>{item?.products?.category_id}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting2}>
        <Text style={styles.revenueDataText}>{item?.products?.upc}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting2}>
        <Text style={styles.revenueDataText}>${item?.products?.price}</Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting2}>
        <Text style={styles.revenueDataText}>{item?.rest_quantity}</Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting2}>
        <Text style={styles.revenueDataText}>{moment(item?.created_at).format('LL')}</Text>
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
        <Text style={styles.graphTitle}>{' Total Inventory'}</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <HeaderView
          image={locationSales}
          text={'Total Inventory'}
          count={'17'}
          style={{ marginHorizontal: ms(5) }}
        />
        <HeaderView image={averageOrder} text={'Total Inventory Value'} count={'$1700'} />
        <HeaderView image={totalOrders} text={'Average Order Value'} count={'$17'} />
        <HeaderView image={profit} text={'Gross Profit'} count={'$17'} />
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
              {totalInventory?.productData?.length === 0 ? (
                <View style={styles.listLoader}>
                  <Text style={styles.noDataFoundText}>{'No data found'}</Text>
                </View>
              ) : (
                <View style={styles.listView}>
                  <FlatList
                    style={styles.listStyle}
                    data={totalInventory?.productData}
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
