import { COLORS, SH, SW } from '@/theme';
import React from 'react';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ms } from 'react-native-size-matters';

export function NewChartKit({
  arrayLength,
  labels,
  data,
  data1,
  data2,
  filter,
  startDated,
  endDated,
}) {
  const resultArr = [];
  const resultArr1 = [];
  const resultArr2 = [];
  let divisor = 0;

  function processAndPopulateResult(data, resultArr) {
    let tempTotal = 0;

    data?.forEach((val, i) => {
      tempTotal += val;

      if ((i + 1) % divisor === 0) {
        resultArr?.push(tempTotal);
        tempTotal = 0;
      }
    });

    resultArr[resultArr?.length - 1] += tempTotal;
  }
  const timeDifference = new Date(endDated) - new Date(startDated);

  // Convert milliseconds to days
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  if (filter === 'today') {
    divisor = 4;
  } else if (filter === 'week') {
    divisor = 1;
  } else if (filter === 'month') {
    divisor = 6;
  } else if (daysDifference <= 7) {
    divisor = 1;
  } else if (daysDifference > 7 || daysDifference < 14) {
    divisor = 2;
  } else if (daysDifference > 14 || daysDifference < 23) {
    divisor = 3;
  } else if (daysDifference < 24) {
    divisor = 4;
  } else if (daysDifference > 24) {
    divisor = 6;
  }
  processAndPopulateResult(data, resultArr);
  processAndPopulateResult(data1, resultArr1);
  processAndPopulateResult(data2, resultArr2);

  return (
    <View>
      {data === undefined ? (
        <LineChart
          bezier
          data={{
            labels: [],
            // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              {
                data: [0, 0, 0, 0, 0, 0, 0],
                // data: [25, 50, 80, 55, 95, 75, 100],
                strokeWidth: 2,
                color: (opacity = 2) => `rgba(39, 90, 255,${opacity})`, // optional
              },
              // {
              //   data: [25, 40, 50, 45, 55, 45, 50],
              //   strokeWidth: 2,
              //   color: (opacity = 1) => `rgba(107, 132, 211, ${opacity})`, // optional
              // },
              // {
              //   data: [25, 35, 45, 40, 50, 40, 40],
              //   strokeWidth: 2,
              //   color: (opacity = 1) => `rgba(251, 70, 108, ${opacity})`, // optional
              // },
            ],
          }}
          width={
            Platform.OS === 'android'
              ? Dimensions.get('window').width * 0.8
              : Dimensions.get('window').width * 0.26
          }
          height={Platform.OS === 'android' ? ms(180) : SH(160)}
          withDots={false}
          chartConfig={{
            backgroundColor: COLORS.red,
            backgroundGradientFrom: COLORS.mid_grey,
            backgroundGradientTo: COLORS.mid_grey,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              backgroundColor: COLORS.mid_grey,
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
            marginLeft: Platform.OS === 'android' ? ms(10) : SW(-8),
            marginTop: ms(10),
          }}
          withShadow={false}
          fromZero
        />
      ) : arrayLength === 3 ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: resultArr,
                strokeWidth: 2,
                color: (opacity = 2) => `rgba(39, 90, 255,${opacity})`, // optional
              },
              {
                data: resultArr1,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(107, 132, 211, ${opacity})`, // optional
              },
              {
                data: resultArr2,
                strokeWidth: 2,
                color: (opacity = 1) => `rgba(251, 70, 108, ${opacity})`, // optional
              },
            ],
          }}
          width={
            Platform.OS === 'android'
              ? Dimensions.get('window').width * 0.9
              : Dimensions.get('window').width * 0.26
          }
          height={Platform.OS === 'android' ? ms(180) : SH(165)}
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
            marginLeft: Platform.OS === 'android' ? ms(-15) : SW(-8),
            marginTop: ms(10),
          }}
          withShadow={false}
          fromZero
          bezier
          // xLabelsOffset={ms(-2)}
        />
      ) : (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: resultArr,
                strokeWidth: 2,
                color: (opacity = 2) => `rgba(39, 90, 255,${opacity})`, // optional
              },
            ],
          }}
          width={
            Platform.OS === 'android'
              ? Dimensions.get('window').width * 0.9
              : Dimensions.get('window').width * 0.26
          }
          height={Platform.OS === 'android' ? ms(180) : SH(165)}
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
            marginLeft: Platform.OS === 'android' ? ms(-15) : SW(-8),
            paddingVertical: 0,
            marginTop: ms(10),
          }}
          // xLabelsOffset={ms(-2)}
          withShadow={false}
          fromZero
          bezier
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
