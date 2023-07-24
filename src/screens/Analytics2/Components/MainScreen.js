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
          header="Total Sales"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
      </View>
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Sales by Channel"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />

        <HomeGraph
          header="Average Order value"
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
      <View style={styles.flexDirectionRow}>
        <HomeGraph
          header="Sales by Locations"
          subHeader={getAnalyticsData?.getTotalGraph?.totalResult ?? '5193'}
          productGraphObject={productGraphObject2}
          homeGraphHandler={() => {}}
          arrayLength={productGraphObject2?.datasets?.length}
        />
        <HomeGraph
          header="Total Orders"
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
    </View>
  );
}
