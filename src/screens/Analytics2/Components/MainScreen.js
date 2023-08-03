import React from 'react';
import { Platform, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { BarChartCom, ScreenWrapper, Spacer } from '@/components';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useSelector } from 'react-redux';
import { styles } from '../Analytics2.styles';
import { HomeGraph } from '.';
import { COLORS, SF, SH, SW } from '@/theme';

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
  const analyticStatistics = getAnalyticsData?.getAnalyticStatistics;
  console.log('first', JSON.stringify(analyticStatistics));
  return (
    <View>
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Total Profit"
          subHeader={'$' + analyticStatistics?.profit?.total_count && '0'}
          analyticGraphObject={analyticStatistics}
          arrayLength={analyticStatistics?.profit?.graph_data?.datasets?.length}
          onPress={onPressProfit}
          labels={analyticStatistics?.profit?.graph_data?.labels}
          data={analyticStatistics?.profit?.graph_data?.datasets?.[0]?.data}
        />
        <HomeGraph
          header="Total Revenue"
          subHeader={'$' + analyticStatistics?.revenue?.total_count && '0'}
          analyticGraphObject={analyticStatistics}
          arrayLength={analyticStatistics?.revenue?.graph_data?.datasets?.length}
          onPress={onPressRevenue}
          labels={analyticStatistics?.revenue?.graph_data?.labels}
          data={analyticStatistics?.revenue?.graph_data?.datasets?.[0]?.data}
        />
        <HomeGraph
          header="Total Costs"
          subHeader={'$' + analyticStatistics?.cost?.total_count && '0'}
          analyticGraphObject={analyticStatistics}
          arrayLength={analyticStatistics?.cost?.graph_data?.datasets?.length}
          onPress={onPressCost}
          labels={analyticStatistics?.cost?.graph_data?.labels}
          data={analyticStatistics?.cost?.graph_data?.datasets?.[0]?.data}
        />
      </View>
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Total POS Orders"
          subHeader={'20590'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressPosOrder}
          rightHeader
        />
        <HomeGraph
          header="Total Delivery Orders"
          subHeader={'5193'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressDelivery}
          rightHeader
        />

        <HomeGraph
          header="Total Shipping Orders"
          subHeader={'5193'}
          // productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          // arrayLength={productGraphObject2?.datasets?.length}
          onPress={onPressShipping}
          rightHeader
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
              barWid={Dimensions.get('window').width * 0.24}
              barHei={Platform.OS === 'android' ? SH(135) : SH(130)}
              barSpacing={SW(4.2)}
              barW={SW(1.5)}
              labelTextSty={{ color: COLORS.darkGray, fontSize: 11 }}
              initialSpacing={SH(5)}
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
              barWid={Dimensions.get('window').width * 0.24}
              barHei={Platform.OS === 'android' ? SH(135) : SH(130)}
              barSpacing={SW(4.2)}
              barW={SW(1.5)}
              labelTextSty={{ color: COLORS.darkGray, fontSize: 11 }}
              initialSpacing={SH(5)}
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
