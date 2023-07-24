import React, { useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '@/components';
import { styles } from '../Analytics2.styles';
import { Fonts, calendar, clay, dropdown } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { LineChart } from 'react-native-chart-kit';
import { DataTable } from 'react-native-paper';

export function Revenue() {
  const [channel, setChannel] = useState(false);
  const [channelValue, setChannelValue] = useState(null);
  const [channelItem, setChannelItem] = useState([
    { label: 'Innova', value: 'Innova' },
    { label: 'Maruti', value: 'Maruti' },
  ]);
  return (
    <View>
      <Text
        style={{
          fontFamily: Fonts.MaisonBold,
          fontSize: SF(20),
          color: COLORS.black,
          marginVertical: SH(15),
          marginHorizontal: SW(5),
        }}
      >
        {'Total Revenue'}
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flexDirection: 'row',
            padding: SW(3),
            alignItems: 'center',
            backgroundColor: COLORS.white,
            marginHorizontal: SW(5),
            borderRadius: SW(2),
            borderColor: COLORS.gerySkies,
            borderWidth: 1,
          }}
        >
          <Image source={calendar} style={{ height: SH(20), width: SW(6) }} />
          <Text style={{ marginLeft: SW(3), fontSize: SF(16) }}>{'Oct 23 - Nov 23, 2022'}</Text>
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

      <View
        style={{
          marginVertical: SH(10),
          backgroundColor: COLORS.white,
          width: Dimensions.get('window').width - SW(63),
          marginHorizontal: SW(5),
          borderRadius: SW(5),
        }}
      >
        <Text
          style={{
            paddingHorizontal: SW(10),
            paddingVertical: SH(15),
            fontSize: SF(18),
            fontFamily: Fonts.Bold,
            color: COLORS.black,
          }}
        >
          {'Total Profits'}
        </Text>

        <LineChart
          bezier
          data={{
            labels: [
              '',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            datasets: [
              {
                data: [12, 20, 12, 30, 42, 40, 50, 40],
                strokeWidth: 2,
                color: (opacity = 2) => `rgba(39, 90, 255,${opacity})`, // optional
              },
            ],
          }}
          width={Dimensions.get('window').width - SW(90)}
          height={260}
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
              borderRadius: SW(10),
            }}
          >
            <DataTable.Header
              style={{
                backgroundColor: COLORS.white,
                borderTopRightRadius: SW(4),
                borderTopLeftRadius: SW(4),
                overflow: 'hidden',
              }}
            >
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

            {/* <FlatList
                        data={getOrderListData}
                        renderItem={getOrderListShipping}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                      /> */}

            <DataTable.Row>
              <DataTable.Cell style={styles.dateTablealignStart}>
                <View>
                  <Text style={styles.revenueDataText}>Oct 23, 2023</Text>
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
          </DataTable>
        </ScrollView>
      </View>
    </View>
  );
}
