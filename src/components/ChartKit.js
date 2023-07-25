import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function ChartKit({ productGraphObject, arrayLength, chartStyle }) {
  return (
    <View>
      {productGraphObject === 23 ? (
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [0, 0, 100, 40, 30, 50, 60],
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.24}
          height={SH(172)}
          chartConfig={{
            decimalPlaces: 0,
            backgroundColor: '#000',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: () => `rgba(39, 90, 255, 1)`,
            labelColor: (opacity = 1) => `rgba(98, 98, 98, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: '#CCCCCC',
            },
            propsForDots: {
              r: '0',
              strokeWidth: '2',
            },
          }}
          bezier
          style={{
            borderRadius: 16,
            marginLeft: SW(-3),
          }}
          withVerticalLines={false}
        />
      ) : productGraphObject === undefined ? (
        <LineChart
          bezier
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [25, 50, 80, 55, 95, 75, 100],
                strokeWidth: 2,
                color: (opacity = 2) => `rgba(39, 90, 255,${opacity})`, // optional
              },
              {
                data: [25, 40, 50, 45, 55, 45, 50],
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(167, 167, 167, ${opacity})`, // optional
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.24}
          height={SH(172)}
          withDots={false}
          chartConfig={{
            backgroundColor: COLORS.red,
            backgroundGradientFrom: COLORS.white,
            backgroundGradientTo: COLORS.white,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              backgroundColor: COLORS.white,
            },
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
            borderRadius: 16,
            marginLeft: SW(-3),
          }}
          withShadow={false}
          fromZero
        />
      ) : (
        <LineChart
          data={{
            labels: productGraphObject?.labels,
            datasets: [
              {
                data: productGraphObject?.datasets?.[0]?.data,
                color: () => `rgba(39, 90, 255, 1)`,
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.24}
          height={chartStyle ? 130 : SH(165)}
          chartConfig={{
            decimalPlaces: 0,
            backgroundColor: '#000',
            backgroundGradientFrom: chartStyle ? COLORS.textInputBackground : '#fff',
            backgroundGradientTo: chartStyle ? COLORS.textInputBackground : '#fff',
            decimalPlaces: 2,
            color: () => `rgba(39, 90, 255, 1)`,
            labelColor: (opacity = 1) => `rgba(98, 98, 98, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: '#CCCCCC',
            },
            propsForDots: {
              r: '0',
              strokeWidth: '2',
            },
          }}
          bezier
          style={{
            borderRadius: 16,
            marginLeft: SW(-6),
          }}
          withVerticalLines={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
