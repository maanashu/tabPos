import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  FlatList,
} from 'react-native';
import { BarChartCom, ScreenWrapper } from '@/components';
import { styles } from '../Analytics2.styles';
import { Fonts, backArrow2, calendar, clay, dropdown } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from 'react-native-chart-kit';
import { DataTable } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import moment from 'moment';
import { ms } from 'react-native-size-matters';

export function TotalOrders({ onPress }) {
  const [channel, setChannel] = useState(false);
  const [channelValue, setChannelValue] = useState(null);
  const [channelItem, setChannelItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);
  const getAnalyticsData = useSelector(getAnalytics);
  const totalOrder = getAnalyticsData?.getTotalOrder;

  const data = [
    ...totalOrder?.onlineOrdersData,
    ...totalOrder?.posOrdersData,
    ...totalOrder?.shippingOrdersData,
  ];
  // console.log('first', totalOrder);
  // return false;
  const getTotalOrderList = ({ item, index }) => (
    <DataTable.Row>
      <DataTable.Cell style={styles.dateTablealignStart}>
        <View style={styles.flexDirectionRow}>
          <Text>{index + 1 + '.           '}</Text>
          <Text style={styles.revenueDataText}>{item?.total_items}</Text>
        </View>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {item?.user_details?.user_profiles?.full_phone_number}
        </Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>${item?.payable_amount}</Text>
      </DataTable.Cell>
      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>{item?.total_items}</Text>
      </DataTable.Cell>

      <DataTable.Cell style={styles.dateTableSetting}>
        <Text style={styles.revenueDataText}>
          {moment(item?.user_details?.user_profiles?.updated_at).format('LL')}
        </Text>
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <View style={styles.flex1}>
      <TouchableOpacity onPress={onPress} style={styles.goBack}>
        <Image source={backArrow2} style={styles.backImageStyle} />
        <Text style={styles.currentStatusText}>{'Back'}</Text>
      </TouchableOpacity>
      <Text style={styles.graphTitle}> {'Total Orders'}</Text>

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
        {/* <Text style={styles.graphHeaderText}>{'Total Profits'}</Text> */}
        <View style={{ alignSelf: 'center', height: SH(210) }}>
          <BarChartCom
            barWid={Dimensions.get('window').width - SW(110)}
            barHei={SH(140)}
            barSpacing={SW(40)}
            barW={7}
            labelTextSty={{ color: COLORS.darkGray, fontSize: 11 }}
            initialSpacing={SW(2)}
            data={totalOrder?.graphData}
            spacing={
              totalOrder?.graphData?.labels?.length > 12
                ? SW(6)
                : totalOrder?.graphData?.labels?.length === 12
                ? SW(20)
                : SW(35)
            }
            dateInterval={1}
            interval={1}
          />
        </View>
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
                <Text style={styles.revenueText}>Total Order</Text>
              </DataTable.Title>
              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Order By Type</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Payment Method</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Customer (New/ Returning)</Text>
              </DataTable.Title>

              <DataTable.Title style={styles.dateTableSetting}>
                <Text style={styles.revenueText}>Order Status</Text>
              </DataTable.Title>
            </DataTable.Header>

            <View style={{ zIndex: -99 }}>
              {totalOrder?.onlineOrdersData?.length === 0 &&
              totalOrder?.posOrdersData?.length === 0 &&
              totalOrder?.shippingOrdersData?.length === 0 ? (
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
                <View
                  style={{
                    height: Platform.OS === 'ios' ? ms(202) : ms(210),
                    width:
                      Platform.OS === 'ios'
                        ? Dimensions.get('window').width - ms(80)
                        : Dimensions.get('window').width - ms(150),
                  }}
                >
                  <FlatList
                    style={{ backgroundColor: COLORS.white }}
                    data={data}
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
