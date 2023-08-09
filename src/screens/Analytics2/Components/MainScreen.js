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
  onPressInventory,
  onPressProducts,
}) {
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticStatistics = getAnalyticsData?.getAnalyticStatistics;
  const analyticOrderGraphs = getAnalyticsData?.getAnalyticOrderGraphs;
  const totalOrder = getAnalyticsData?.getTotalOrder;
  const soldProduct = getAnalyticsData?.getSoldProduct;
  const totalInventory = getAnalyticsData?.getTotalInventory;

  return (
    <View>
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Total Profit"
          subHeader={
            analyticStatistics?.cost?.total_count
              ? '$' + analyticStatistics?.profit?.total_count
              : '0'
          }
          analyticGraphObject={analyticStatistics}
          arrayLength={analyticStatistics?.profit?.graph_data?.datasets?.length}
          onPress={onPressProfit}
          labels={analyticStatistics?.profit?.graph_data?.labels}
          data={analyticStatistics?.profit?.graph_data?.datasets?.[0]?.data}
        />
        <HomeGraph
          header="Total Revenue"
          subHeader={
            analyticStatistics?.cost?.total_count
              ? '$' + analyticStatistics?.revenue?.total_count
              : '0'
          }
          analyticGraphObject={analyticStatistics}
          arrayLength={analyticStatistics?.revenue?.graph_data?.datasets?.length}
          onPress={onPressRevenue}
          labels={analyticStatistics?.revenue?.graph_data?.labels}
          data={analyticStatistics?.revenue?.graph_data?.datasets?.[0]?.data}
        />
        <HomeGraph
          header="Total Costs"
          subHeader={
            analyticStatistics?.cost?.total_count
              ? '$' + analyticStatistics?.cost?.total_count
              : '0'
          }
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
          subHeader={
            analyticOrderGraphs?.pos_graph?.total_count
              ? analyticOrderGraphs?.pos_graph?.total_count
              : '0'
          }
          analyticGraphObject={analyticOrderGraphs}
          arrayLength={analyticOrderGraphs?.pos_graph?.graph_data?.datasets?.length}
          onPress={onPressPosOrder}
          rightHeader
          labels={analyticOrderGraphs?.pos_graph?.graph_data?.labels}
          data={analyticOrderGraphs?.pos_graph?.graph_data?.datasets?.[0]?.data}
          data1={analyticOrderGraphs?.pos_graph?.graph_data?.datasets?.[1]?.data}
          data2={analyticOrderGraphs?.pos_graph?.graph_data?.datasets?.[2]?.data}
        />
        <HomeGraph
          header="Total Delivery Orders"
          subHeader={
            analyticOrderGraphs?.delivery_graph?.total_count
              ? analyticOrderGraphs?.delivery_graph?.total_count
              : '0'
          }
          onPress={onPressDelivery}
          arrayLength={analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.length}
          labels={analyticOrderGraphs?.delivery_graph?.graph_data?.labels}
          rightHeader
          data={analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[0]?.data}
          data1={analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[1]?.data}
          data2={analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[2]?.data}
        />

        <HomeGraph
          header="Total Shipping Orders"
          subHeader={
            analyticOrderGraphs?.shipping_graph?.total_count
              ? analyticOrderGraphs?.shipping_graph?.total_count
              : '0'
          }
          onPress={onPressShipping}
          arrayLength={analyticOrderGraphs?.shipping_graph?.graph_data?.datasets?.length}
          labels={analyticOrderGraphs?.shipping_graph?.graph_data?.labels}
          rightHeader
          data={analyticOrderGraphs?.shipping_graph?.graph_data?.datasets?.[0]?.data}
          data1={analyticOrderGraphs?.shipping_graph?.graph_data?.datasets?.[1]?.data}
          data2={analyticOrderGraphs?.shipping_graph?.graph_data?.datasets?.[2]?.data}
          bulletText="Shipped"
        />
      </View>
      <View style={styles.flexDirectionRow}>
        <View style={styles.totalProductCon}>
          <Spacer space={SH(20)} />
          <View style={styles.displayFlex}>
            <View>
              <Text style={styles.darkBlackText}>Total Orders</Text>
              <Text style={[styles.darkBlackText, { fontSize: SF(24) }]}>
                {totalOrder?.totalAmount ? totalOrder?.totalAmount.toFixed(2) : '0'}
              </Text>
            </View>
            <View>
              <View style={styles.flexAlign}>
                <View style={styles.bullets} />
                <Text style={styles.bulletText}>{'POS Orders'}</Text>
              </View>
              <View style={styles.flexAlign}>
                <View style={[styles.bullets, { backgroundColor: COLORS.violet }]} />
                <Text style={styles.bulletText}>{'Online Orders'}</Text>
              </View>
              <View style={styles.flexAlign}>
                <View style={[styles.bullets, { backgroundColor: COLORS.darkBlue }]} />
                <Text style={styles.bulletText}>{'Shipping Orders'}</Text>
              </View>
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
              data={totalOrder?.graphData}
            />
          </TouchableOpacity>
        </View>

        <HomeGraph
          header="Total Inventory"
          subHeader={totalInventory?.total_count ? totalInventory?.total_count : '0'}
          onPress={onPressInventory}
          analyticGraphObject={totalInventory}
          arrayLength={totalInventory?.graph_data?.datasets?.length}
          labels={totalInventory?.graph_data?.labels}
          data={totalInventory?.graph_data?.datasets?.[0]?.data}
        />

        <HomeGraph
          header="Total Product Sold"
          subHeader={soldProduct?.total_count ? soldProduct?.total_count : '0'}
          onPress={onPressProducts}
          analyticGraphObject={soldProduct}
          arrayLength={soldProduct?.graph_data?.datasets?.length}
          labels={soldProduct?.graph_data?.labels}
          data={soldProduct?.graph_data?.datasets?.[0]?.data}
        />
      </View>
    </View>
  );
}
