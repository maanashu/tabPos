import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SF, SH, SW } from '@/theme';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { HomeGraph } from '.';
import { ms } from 'react-native-size-matters';
import { getUser } from '@/selectors/UserSelectors';
import { styles } from '../styles';
import { Spacer } from '@/components';
import { BarChartCom } from '@mPOS/components/BarChartCom';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const generateLabels = (dataLabels, interval, maxLabel, daysLength) => {
  // const labelInterval = Math.ceil(dataLabels?.length / daysLength);
  // const dayLabels = Array.from(
  //   { length: Math.ceil(dataLabels?.length / labelInterval) },
  //   (_, index) => {
  //     const labelValue = (index + 1) * labelInterval;
  //     return labelValue <= maxLabel ? labelValue : maxLabel?.toString();
  //   }
  // );

  const labelInterval = Math.floor(maxLabel / daysLength);

  const dayLabels = Array.from({ length: daysLength }, (_, index) =>
    index === daysLength - 1 ? maxLabel : (index + 1) * labelInterval
  );

  const filterMonthsByInterval = (monthsArray) => {
    if (interval <= 0) {
      throw new Error('Interval must be a positive integer.');
    }

    return monthsArray?.filter((_, index) => index % interval === 0);
  };

  const outputMonths = filterMonthsByInterval(dataLabels);
  const shortMonthNames = outputMonths?.map((month) => month?.substr(0, 3));

  if (dataLabels?.length > 12) {
    return dayLabels;
  } else if (dataLabels?.length === 12) {
    return shortMonthNames;
  } else {
    return dataLabels;
  }
};

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
  filter,
  startDated,
  endDated,
}) {
  const getAnalyticsData = useSelector(getAnalytics);
  const analyticStatistics = getAnalyticsData?.getAnalyticStatistics;
  const analyticOrderGraphs = getAnalyticsData?.getAnalyticOrderGraphs;
  const totalOrder = getAnalyticsData?.getTotalOrder;
  const soldProduct = getAnalyticsData?.getSoldProduct;
  const totalInventory = getAnalyticsData?.getTotalInventory;
  const getUserData = useSelector(getUser);
  const getPosUser = getUserData?.posLoginData;

  const interval = 2;
  const maxLabel = analyticStatistics?.profit?.graph_data?.labels?.length;
  const daysLength = 6;

  const dataLabelsProfit = analyticStatistics?.profit?.graph_data?.labels;
  const labelsProfit = generateLabels(dataLabelsProfit, interval, maxLabel, daysLength);

  const dataLabelsRevenue = analyticStatistics?.revenue?.graph_data?.labels;
  const labelsRevenue = generateLabels(dataLabelsRevenue, interval, maxLabel, daysLength);

  const dataLabelsCost = analyticStatistics?.cost?.graph_data?.labels;
  const labelsCost = generateLabels(dataLabelsCost, interval, maxLabel, daysLength);

  const dataLabelsPOS = analyticOrderGraphs?.pos_graph?.graph_data?.labels;
  const labelsPOS = generateLabels(dataLabelsPOS, interval, maxLabel, daysLength);

  const dataLabelsDelivery = analyticOrderGraphs?.delivery_graph?.graph_data?.labels;
  const labelsDelivery = generateLabels(dataLabelsDelivery, interval, maxLabel, daysLength);

  const dataLabelsShipping = analyticOrderGraphs?.shipping_graph?.graph_data?.labels;
  const labelsShipping = generateLabels(dataLabelsShipping, interval, maxLabel, daysLength);

  const dataLabelsInventory = totalInventory?.graph_data?.labels;
  const labelsInvetory = generateLabels(dataLabelsInventory, interval, maxLabel, daysLength);

  const dataLabelsProductSold = soldProduct?.graphData?.labels;
  const labelsProductSold = generateLabels(dataLabelsProductSold, interval, maxLabel, daysLength);

  const isAnalyticStatisticLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_STATISTICS], state)
  );
  const isAnalyticOrderGraphLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ANALYTIC_ORDER_GRAPHS], state)
  );
  const isTotalOrderLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_ORDER], state)
  );
  const isInventoryLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_INVENTORY], state)
  );
  const isSoldProductLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_SOLD_PRODUCT], state)
  );
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: ms(70) }}>
        {getPosUser?.user_roles?.length > 0 ? (
          <View>
            <HomeGraph
              header="Total Revenue"
              subHeader={'0'}
              disabled
              style={{ backgroundColor: COLORS.mid_grey }}
            />
          </View>
        ) : (
          <HomeGraph
            header="Total Revenue"
            subHeader={
              analyticStatistics?.revenue?.total_count
                ? '$' + analyticStatistics?.revenue?.total_count?.toFixed(2)
                : '0'
            }
            analyticGraphObject={analyticStatistics}
            arrayLength={analyticStatistics?.revenue?.graph_data?.datasets?.length}
            onPress={onPressRevenue}
            labels={labelsRevenue}
            data={analyticStatistics?.revenue?.graph_data?.datasets?.[0]?.data}
            isLoading={isAnalyticStatisticLoading}
            filter={filter}
            startDated={startDated}
            endDated={endDated}
          />
        )}
        {getPosUser?.user_roles?.length > 0 ? (
          <View>
            <HomeGraph
              header="Total Costs"
              subHeader={'0'}
              disabled
              style={{ backgroundColor: COLORS.mid_grey }}
            />
          </View>
        ) : (
          <HomeGraph
            header="Total Costs"
            subHeader={
              analyticStatistics?.cost?.total_count
                ? '$' + analyticStatistics?.cost?.total_count?.toFixed(2)
                : '0'
            }
            analyticGraphObject={analyticStatistics}
            arrayLength={analyticStatistics?.cost?.graph_data?.datasets?.length}
            onPress={onPressCost}
            labels={labelsCost}
            data={analyticStatistics?.cost?.graph_data?.datasets?.[0]?.data}
            isLoading={isAnalyticStatisticLoading}
            filter={filter}
            startDated={startDated}
            endDated={endDated}
          />
        )}

        {getPosUser?.user_roles?.length > 0 ? (
          <View>
            <HomeGraph
              header="Gross Profit"
              subHeader={'0'}
              disabled
              style={{ backgroundColor: COLORS.mid_grey }}
            />
          </View>
        ) : (
          <HomeGraph
            header="Gross Profit"
            subHeader={
              analyticStatistics?.profit?.total_count
                ? '$' + analyticStatistics?.profit?.total_count?.toFixed(2)
                : '0'
            }
            analyticGraphObject={analyticStatistics}
            arrayLength={analyticStatistics?.profit?.graph_data?.datasets?.length}
            onPress={onPressProfit}
            labels={labelsProfit}
            data={analyticStatistics?.profit?.graph_data?.datasets?.[0]?.data}
            isLoading={isAnalyticStatisticLoading}
            filter={filter}
            startDated={startDated}
            endDated={endDated}
          />
        )}
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
          labels={labelsPOS}
          data={analyticOrderGraphs?.pos_graph?.graph_data?.datasets?.[0]?.data}
          data1={analyticOrderGraphs?.pos_graph?.graph_data?.datasets?.[1]?.data}
          data2={analyticOrderGraphs?.pos_graph?.graph_data?.datasets?.[2]?.data}
          isLoading={isAnalyticOrderGraphLoading}
          filter={filter}
          startDated={startDated}
          endDated={endDated}
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
          labels={labelsDelivery}
          rightHeader
          data={analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[0]?.data}
          data1={analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[1]?.data}
          data2={analyticOrderGraphs?.delivery_graph?.graph_data?.datasets?.[2]?.data}
          isLoading={isAnalyticOrderGraphLoading}
          filter={filter}
          startDated={startDated}
          endDated={endDated}
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
          labels={labelsShipping}
          rightHeader
          data={analyticOrderGraphs?.shipping_graph?.graph_data?.datasets?.[0]?.data}
          data1={analyticOrderGraphs?.shipping_graph?.graph_data?.datasets?.[1]?.data}
          data2={analyticOrderGraphs?.shipping_graph?.graph_data?.datasets?.[2]?.data}
          bulletText="Shipped"
          isLoading={isAnalyticOrderGraphLoading}
          filter={filter}
          startDated={startDated}
          endDated={endDated}
        />
        <TouchableOpacity
          style={[
            styles.totalProductCon,
            { overflow: 'hidden', paddingBottom: ms(10) },
            isTotalOrderLoading && {
              height: Platform.OS === 'android' ? windowHeight * 0.35 : windowHeight * 0.28,
            },
          ]}
          onPress={onPressOrders}
        >
          <Spacer space={SH(20)} />
          <View style={[styles.displayFlex, { alignItems: 'baseline', paddingBottom: ms(10) }]}>
            <View>
              <Text style={styles.darkBlackText}>Total Orders</Text>
              <Text style={[styles.darkBlackText, { fontSize: SF(24) }]}>
                {isTotalOrderLoading ? (
                  <ActivityIndicator color={COLORS.primary} size={'small'} />
                ) : totalOrder?.total_orders ? (
                  totalOrder?.total_orders
                ) : (
                  '0'
                )}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.flexAlign}>
              <View style={styles.bullets} />
              <Text style={styles.bulletText}>{'POS Orders'}</Text>
            </View>
            <View style={styles.flexAlign}>
              <View style={[styles.bullets, { backgroundColor: COLORS.violet }]} />
              <Text style={styles.bulletText}>{'B2C Orders'}</Text>
            </View>
          </View>
          <Spacer space={SH(5)} />

          <BarChartCom
            barWid={windowWidth * 0.9}
            barHei={Platform.OS === 'android' ? ms(130) : SH(110)}
            barSpacing={SW(4.2)}
            barW={ms(5)}
            labelTextSty={{ color: COLORS.darkGray, fontSize: 11 }}
            initialSpacing={SH(5)}
            data={totalOrder?.graphData}
            spacing={ms(10)}
            interval={2}
            dateInterval={5}
            dateTodayInterval={4}
            isLoading={isTotalOrderLoading}
            filter={filter}
            startDated={startDated}
            endDated={endDated}
          />
        </TouchableOpacity>

        <HomeGraph
          header="Total Inventory"
          subHeader={totalInventory?.total_count ? totalInventory?.total_count : '0'}
          onPress={onPressInventory}
          analyticGraphObject={totalInventory}
          arrayLength={totalInventory?.graph_data?.datasets?.length}
          labels={labelsInvetory}
          data={totalInventory?.graph_data?.datasets?.[0]?.data}
          isLoading={isInventoryLoading}
          filter={filter}
          startDated={startDated}
          endDated={endDated}
        />

        <HomeGraph
          header="Total Product Sold"
          subHeader={soldProduct?.total_count ? soldProduct?.total_count : '0'}
          onPress={onPressProducts}
          analyticGraphObject={soldProduct}
          arrayLength={soldProduct?.graphData?.datasets?.length}
          labels={labelsProductSold}
          data={soldProduct?.graphData?.datasets?.[0]?.data}
          isLoading={isSoldProductLoading}
          filter={filter}
          startDated={startDated}
          endDated={endDated}
        />
      </ScrollView>
    </View>
  );
}
