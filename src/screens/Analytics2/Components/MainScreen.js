import React from 'react';
import { Platform, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { BarChartCom, ScreenWrapper, Spacer } from '@/components';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useSelector } from 'react-redux';
import { styles } from '../Analytics2.styles';
import { HomeGraph } from '.';
import { COLORS, SF, SH } from '@/theme';

export function MainScreen({
  onPressProfit,
  onPressRevenue,
  onPressCost,
  onPressPosOrder,
  onPressDelivery,
  onPressShipping,
  onPressOrders,
  onPressSellingLocations,
  onPressProducts,
}) {
  const getAnalyticsData = useSelector(getAnalytics);

  const productGraphObject2 = getAnalyticsData?.getTotalGraph;

  return (
    <View>
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Total Profit"
          subHeader={'5193'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressProfit}
        />
        <HomeGraph
          header="Total Revenue"
          subHeader={'5193'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressRevenue}
        />
        <HomeGraph
          header="Total Costs"
          subHeader={'5193'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressCost}
        />
      </View>
      <View style={styles.flexDirectionRow}>
        <View style={styles.totalProductCon}>
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <View>
              <Text style={styles.darkBlackText}>Total POS Orders</Text>
              <Text style={[styles.darkBlackText, { fontSize: SF(24) }]}>$5193</Text>
            </View>
          </View>
          <Spacer space={SH(5)} />

          <TouchableOpacity style={{ overflow: 'hidden' }} onPress={onPressPosOrder}>
            <BarChartCom
              barWid={Platform.OS === 'android' ? Dimensions.get('window').width * 0.24 : SH(380)}
              barHei={SH(135)}
              barSpacing={Platform.OS === 'android' ? 16 : 18}
              barW={Platform.OS === 'android' ? 5 : 7}
              labelTextSty={{ color: COLORS.gerySkies, fontSize: 11 }}
              initialSpacing={SH(10)}
            />
          </TouchableOpacity>
        </View>
        <HomeGraph
          header="Total Delivery Orders"
          subHeader={'5193'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressDelivery}
        />

        <HomeGraph
          header="Total Shipping Orders"
          subHeader={'5193'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressShipping}
        />
      </View>
      <View style={styles.flexDirectionRow}>
        <View style={styles.totalProductCon}>
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <View>
              <Text style={styles.darkBlackText}>Total Orders</Text>
              <Text style={[styles.darkBlackText, { fontSize: SF(24) }]}>$5193</Text>
            </View>
          </View>
          <Spacer space={SH(5)} />

          <TouchableOpacity style={{ overflow: 'hidden' }} onPress={onPressOrders}>
            <BarChartCom
              barWid={Platform.OS === 'android' ? Dimensions.get('window').width * 0.24 : SH(380)}
              barHei={SH(135)}
              barSpacing={Platform.OS === 'android' ? 16 : 18}
              barW={Platform.OS === 'android' ? 5 : 7}
              labelTextSty={{ color: COLORS.gerySkies, fontSize: 11 }}
              initialSpacing={SH(10)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.totalProductCon}>
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <View>
              <Text style={styles.darkBlackText}>{'Top Selling by Locations'}</Text>
              <Text style={[styles.darkBlackText, { fontSize: SF(24) }]}>$5193</Text>
            </View>
          </View>
          <Spacer space={SH(5)} />

          <TouchableOpacity style={{ overflow: 'hidden' }} onPress={onPressSellingLocations}>
            <BarChartCom
              barWid={Platform.OS === 'android' ? Dimensions.get('window').width * 0.24 : SH(380)}
              barHei={SH(135)}
              barSpacing={Platform.OS === 'android' ? 16 : 18}
              barW={Platform.OS === 'android' ? 5 : 7}
              labelTextSty={{ color: COLORS.gerySkies, fontSize: 11 }}
              initialSpacing={SH(10)}
            />
          </TouchableOpacity>
        </View>

        <HomeGraph
          header="Top Selling Products"
          subHeader={'5193'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressProducts}
        />
      </View>
    </View>
  );
}
