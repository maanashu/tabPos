import { Fonts } from '@/assets';
import { COLORS, SF, SH, SW } from '@/theme';
import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function NewChartKit({ analyticGraphObject, arrayLength, chartStyle }) {
  return (
    <View>
      {analyticGraphObject === undefined ? (
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
          width={
            Platform.OS === 'android'
              ? Dimensions.get('window').width * 0.24
              : Dimensions.get('window').width * 0.26
          }
          height={Platform.OS === 'android' ? SH(175) : SH(172)}
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
            marginLeft: Platform.OS === 'android' ? SW(-3) : SW(-8),
          }}
          withShadow={false}
          fromZero
        />
      ) : arrayLength === 2 ? (
        <LineChart
          data={{
            labels: ['Monday', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [0, 0, 100, 40, 30, 50, 60],
                strokeWidth: 2,
              },
            ],
          }}
          width={
            Platform.OS === 'android'
              ? Dimensions.get('window').width * 0.24
              : Dimensions.get('window').width * 0.26
          }
          height={Platform.OS === 'android' ? SH(175) : SH(172)}
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
            marginLeft: Platform.OS === 'android' ? SW(-3) : SW(-8),
          }}
          withShadow={false}
          fromZero
          bezier
        />
      ) : (
        <LineChart
          data={{
            labels: analyticGraphObject?.graph_data?.labels,
            datasets: [
              {
                data: analyticGraphObject?.graph_data?.datasets?.[0]?.data,
                strokeWidth: 2,
                color: (opacity = 2) => `rgba(39, 90, 255,${opacity})`, // optional
              },
            ],
          }}
          width={
            Platform.OS === 'android'
              ? Dimensions.get('window').width * 0.24
              : Dimensions.get('window').width * 0.26
          }
          height={Platform.OS === 'android' ? SH(175) : SH(172)}
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
            marginLeft: Platform.OS === 'android' ? SW(-3) : SW(-8),
          }}
          withShadow={false}
          fromZero
          bezier
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
