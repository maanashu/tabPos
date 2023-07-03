import { COLORS } from '@/theme';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function ChartKit({ productGraphObject, arrayLength, chartStyle }) {
  return (
    <View>
      {productGraphObject === undefined ? (
        <LineChart
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                data: [0, 0, 100, 40, 30, 50, 60],
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.41}
          height={190}
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
          // bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      ) : arrayLength === 2 ? (
        <LineChart
          data={{
            labels: productGraphObject?.labels,
            datasets: [
              {
                data: productGraphObject?.datasets?.[0]?.data,
                color: () => `rgba(31, 179, 255, 1)`,
                strokeWidth: 2,
              },
              {
                data: productGraphObject?.datasets?.[1]?.data,
                color: () => `rgba(39, 90, 255, 1)`,
                strokeWidth: 2,
              },
            ],
          }}
          width={Dimensions.get('window').width * 0.41}
          height={190}
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
          // bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
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
          width={Dimensions.get('window').width * 0.41}
          height={190}
          chartConfig={{
            decimalPlaces: 0,
            backgroundColor: '#000',
            backgroundGradientFrom: chartStyle
              ? COLORS.textInputBackground
              : '#fff',
            backgroundGradientTo: chartStyle
              ? COLORS.textInputBackground
              : '#fff',
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
          // bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
