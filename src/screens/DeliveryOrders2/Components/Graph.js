import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { Fonts } from '@/assets';
import { COLORS, SF } from '@/theme';
import { strings } from '@/localization';
import { legends, labels } from '@/constants/staticData';

const Graph = () => {
  return (
    <View style={styles.graphViewStyle}>
      <Text style={styles.numberOrdersText}>{strings.shipingOrder.numberOfOrders}</Text>

      <LineChart
        bezier
        data={{
          labels: labels,
          legend: legends,
          datasets: [
            {
              data: [32, 48, 33, 49, 94, 79, 87],
              strokeWidth: 5,
              color: (opacity = 1) => `rgba(31, 179, 255,${opacity})`,
            },
            {
              data: [19, 31, 19, 32, 71, 58, 79],
              strokeWidth: 5,
              color: (opacity = 1) => `rgba(39, 90, 255, ${opacity})`,
            },
            {
              data: [15, 20, 15, 20, 35, 30, 38],
              strokeWidth: 5,
              color: (opacity = 1) => `rgba(251, 70, 108, ${opacity})`,
            },
            {
              data: [5, 9, 5, 8, 19, 15, 20],
              strokeWidth: 5,
              color: (opacity = 1) => `rgba(252, 186, 48, ${opacity})`,
            },
          ],
        }}
        height={Dimensions.get('window').height / 2.9}
        withDots={false}
        width={Dimensions.get('window').width * 0.58}
        chartConfig={{
          backgroundColor: COLORS.black,
          backgroundGradientFrom: COLORS.white,
          backgroundGradientTo: COLORS.white,
          propsForLabels: {
            fontFamily: Fonts.Regular,
            fontSize: SF(12),
          },
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
            backgroundColor: COLORS.white,
          },
          labelColor: (opacity = 1) => `rgba(60, 68, 77, ${opacity})`,
        }}
        style={{
          borderRadius: 16,
          backgroundColor: COLORS.white,
        }}
        withShadow={false}
        fromZero
        segments={10}
      />
    </View>
  );
};

export default Graph;

const styles = StyleSheet.create({
  graphViewStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginLeft: 5,
    height: Dimensions.get('window').height / 2.15,
  },
  numberOrdersText: {
    color: COLORS.dark_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});
