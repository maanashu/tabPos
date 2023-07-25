import React from 'react';
import { View } from 'react-native';
import { ScreenWrapper } from '@/components';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { useSelector } from 'react-redux';
import { styles } from '../Analytics2.styles';
import { HomeGraph } from '.';

export function MainScreen() {
  const getAnalyticsData = useSelector(getAnalytics);

  const productGraphObject2 = getAnalyticsData?.getTotalGraph;

  return (
    <View>
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Total Profit"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
        <HomeGraph
          header="Total Revenue"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
        <HomeGraph
          header="Total Costs"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
      </View>
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Total POS Orders"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />

        <HomeGraph
          header="Total Delivery Orders"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />

        <HomeGraph
          header="Total Shipping Orders"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
      </View>
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Total Orders"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
        <HomeGraph
          header="Top Sales by Locations"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
        <HomeGraph
          header="Top Selling Products"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
      </View>
    </View>
  );
}
