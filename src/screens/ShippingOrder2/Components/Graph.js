import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

import { ms } from 'react-native-size-matters';
import { BarChart } from 'react-native-chart-kit';

import { COLORS } from '@/theme';
import { strings } from '@/localization';

import styles from '../ShippingOrder2.styles';

const Graph = ({ graphData, renderGraphItem, isDeliveryOrder, graphElements, width }) => {
  return (
    <View style={styles.graphViewStyle}>
      <Text style={styles.numberOrdersText}>{strings.shipingOrder.numberOfOrders}</Text>

      <FlatList
        horizontal
        data={graphData}
        scrollEnabled={false}
        renderItem={renderGraphItem}
        showsHorizontalScrollIndicator={false}
      />

      {isDeliveryOrder ? (
        <View
          style={{
            height: ms(185),
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <BarChart
          // bezier
          fromZero
          height={ms(185)}
          segments={10}
          withDots={false}
          withShadow={false}
          data={graphElements()}
          width={width * 0.5}
          chartConfig={{
            decimalPlaces: 0,
            backgroundColor: COLORS.black,
            backgroundGradientFrom: COLORS.white,
            backgroundGradientTo: COLORS.white,
            propsForLabels: styles.shippingDrawerTitleText,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(60, 68, 77, ${opacity})`,
          }}
        />
      )}
    </View>
  );
};

export default Graph;
