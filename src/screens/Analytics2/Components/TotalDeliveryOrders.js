import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { ScreenWrapper } from '@/components';
import { styles } from '../Analytics2.styles';
import { Fonts, backArrow2, calendar, clay, dropdown } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from 'react-native-chart-kit';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import moment from 'moment';

export function TotalDeliveryOrders({ onPress }) {
  const [channel, setChannel] = useState(false);
  const [channelValue, setChannelValue] = useState(null);
  const [channelItem, setChannelItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);

  const getAnalyticsData = useSelector(getAnalytics);
  const analyticOrderGraphs = getAnalyticsData?.getAnalyticOrderGraphs;
  // console.log('first', JSON.stringify(analyticOrderGraphs));

  const getDeliveryOrderList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '   '}</Text>
          <Text style={styles.revenueDataText}>{moment(item?.created_at).format('LL')}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>3</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>$23,000</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>$560</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>0</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>$560</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>$23.50</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>$450</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>$2300</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>$19,666.50</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText2}>$19,666.50</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.goBack}>
        <Image source={backArrow2} style={styles.backImageStyle} />
        <Text style={styles.currentStatusText}>{'Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.graphTitle}> {'Total Delivery Orders'}</Text>

      <View style={styles.flexDirectionRow}>
        <View style={styles.headerView}>
          <Image source={calendar} style={styles.calenderImage} />
          <Text style={styles.dateText}>{'Oct 23 - Nov 23, 2022'}</Text>
        </View>
        <DropDownPicker
          ArrowDownIconComponent={({ style }) => (
            <Image source={dropdown} style={styles.dropDownIcon} />
          )}
          style={styles.dropdown}
          containerStyle={[styles.containerStyle, { zIndex: Platform.OS === 'ios' ? 100 : 2 }]}
          open={channel}
          value={channelValue}
          items={channelItem}
          setOpen={setChannel}
          setValue={setChannelValue}
          setItems={setChannelItem}
          placeholder="All Channels"
          placeholderStyle={{
            color: '#A7A7A7',
            fontFamily: Fonts.Regular,
            fontSize: SF(14),
          }}
        />
      </View>

      <View style={styles.graphHeaderView}>
        <Text style={styles.graphHeaderText}>{'Total Profits'}</Text>

        <LineChart
          bezier
          data={{
            labels: analyticOrderGraphs?.delivery_graph?.graph_data?.labels
              ? analyticOrderGraphs?.delivery_graph?.graph_data?.labels
              : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
              {
                data: analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[0]?.data
                  ? analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[0]?.data
                  : [12, 20, 12, 30, 60, 40, 50],
                strokeWidth: 2,
                color: (opacity = 2) => `rgba(39, 90, 255,${opacity})`, // optional
              },
              {
                data: analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[1]?.data
                  ? analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[1]?.data
                  : [11, 15, 10, 25, 55, 35, 45],
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(107, 132, 211, ${opacity})`, // optional
              },
              {
                data: analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[2]?.data
                  ? analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[2]?.data
                  : [8, 10, 8, 20, 50, 30, 40],
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(251, 70, 108, ${opacity})`, // optional
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
      </View>

      <View style={styles.tableMainView}>
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <DataTable
            style={{
              zIndex: -99,
            }}
          >
            <DataTable.Header style={styles.tableListHeader}>
              <DataTable.Title style={styles.dateTablealignStart}>
                <Text style={styles.revenueText}>Date</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Orders</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Gross Sales</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Discount</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Returns</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Net Sales</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Shipping/Delivery</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Other Fees</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Tax</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Sales</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Total Revenue</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={{ height: SH(380), zIndex: -99 }}>
              {analyticOrderGraphs?.delivery_graph?.orderListData[0]?.cancelled_data_list?.length ||
              analyticOrderGraphs?.delivery_graph?.orderListData[0]?.deliverd_data_list?.length ||
              analyticOrderGraphs?.delivery_graph?.orderListData[0]?.returned_data_list?.length ===
                0 ? (
                <View style={[styles.listLoader]}>
                  <Text
                    style={{
                      fontSize: SF(20),
                      color: COLORS.black,
                    }}
                  >
                    {'No data found'}
                  </Text>
                </View>
              ) : (
                <View style={{ height: SH(250) }}>
                  <FlatList
                    style={{ backgroundColor: COLORS.white }}
                    data={
                      analyticOrderGraphs?.delivery_graph?.orderListData[0]?.deliverd_data_list ||
                      analyticOrderGraphs?.delivery_graph?.orderListData[0]?.returned_data_list ||
                      analyticOrderGraphs?.delivery_graph?.orderListData[0]?.cancelled_data_list
                    }
                    renderItem={getDeliveryOrderList}
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
