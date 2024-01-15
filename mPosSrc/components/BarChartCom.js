import { COLORS, SW } from '@/theme';
import { nutralizeNegativeGraphValue } from '@/utils/GlobalMethods';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { ms } from 'react-native-size-matters';

const transformData = (data, spacing, interval, dateInterval, dateTodayInterval) => {
  const dynamicLabels = data?.labels?.filter((label, index) => (index + 1) % interval === 0);
  const transformedData = [];

  for (let i = 0; i < dynamicLabels?.length; i++) {
    const totalValue = data?.datasets?.reduce((sum, dataset) => sum + dataset?.data[i], 1);
    const dataPoint = {
      value: nutralizeNegativeGraphValue(totalValue),
      spacing: spacing,
      label: dynamicLabels[i],
      labelWidth: SW(70),
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 },
      frontColor: i === 0 ? COLORS.primary : i === 1 ? COLORS.violet : COLORS.darkBlue,
      intialSpace: 0,
    };
    transformedData.push(dataPoint);
  }

  const dynamicDateLabels = data?.labels?.filter(
    (label, index) => (index + 1) % dateInterval === 0
  );

  const transformedMonthData = dynamicDateLabels?.flatMap((label, index) => {
    const values = data?.datasets?.map((dataset) => dataset?.data[index]);

    const firstObject = {
      value: nutralizeNegativeGraphValue(values[0]) || 0,
      frontColor: '#102773',
      label: label?.split(' ')[0],
      labelTextStyle: { color: '#626262', fontSize: 11, marginLeft: ms(6) },
      frontColor: COLORS.primary,
      labelWidth: SW(30),
      spacing: 5,
      intialSpace: 0,
    };
    return [
      firstObject,
      ...Array.from({ length: 2 }, (_, i) => ({
        value: nutralizeNegativeGraphValue(values[i + 1]) || 0,
        spacing: i === 0 ? 5 : 15,
        frontColor: i === 0 ? COLORS.violet : COLORS.darkBlue,
      })),
    ];
  });

  const transformedWeekData = data?.labels?.flatMap((label, index) => {
    const values = data?.datasets?.map((dataset) => dataset?.data[index]);

    const firstObject = {
      value: nutralizeNegativeGraphValue(values[0]) || 0,
      frontColor: '#102773',
      label: label?.split(' ')[0],
      labelTextStyle: { color: '#626262', fontSize: 11 },
      frontColor: COLORS.primary,
      labelWidth: SW(30),
      spacing: 5,
      intialSpace: 0,
    };
    return [
      firstObject,
      ...Array.from({ length: 2 }, (_, i) => ({
        value: nutralizeNegativeGraphValue(values[i + 1]) || 0,
        spacing: i === 0 ? 5 : 14,
        frontColor: i === 0 ? COLORS.violet : COLORS.darkBlue,
      })),
    ];
  });
  const dynamicTodayLabels = data?.labels?.filter(
    (label, index) => (index + 1) % dateTodayInterval === 0
  );
  function convertTo24HourFormat(label) {
    const [time, period] = label.split(' ');

    if (period === 'PM' && time !== '12:00') {
      const [hour, minute] = time.split(':');
      return `${parseInt(hour, 10)}`;
    } else if (period === 'AM' && time === '00:00') {
      return '24';
    } else {
      const [hour] = time.split(':');
      return hour.padStart(2, '0');
    }
  }

  const convertedLabels = dynamicTodayLabels?.map(convertTo24HourFormat);

  const transformedTodayData = dynamicTodayLabels?.flatMap((label, index) => {
    const values = data?.datasets?.map((dataset) => dataset?.data[index]);

    const firstObject = {
      value: nutralizeNegativeGraphValue(values[0]) || 0,
      frontColor: '#102773',
      label: convertedLabels[index]?.split(' ')[0],
      labelTextStyle: { color: '#626262', fontSize: 11, marginLeft: ms(4) },
      // value: data?.datasets.reduce((sum, dataset) => sum + dataset?.data[index], 0),
      frontColor: COLORS.primary,
      labelWidth: SW(30),
      spacing: 5,
      intialSpace: 0,
    };
    return [
      firstObject,
      ...Array.from({ length: 2 }, (_, i) => ({
        value: nutralizeNegativeGraphValue(values[i + 1]) || 0,
        spacing: i === 0 ? 5 : 14,
        frontColor: i === 0 ? COLORS.violet : COLORS.darkBlue,
      })),
    ];
  });

  if (data?.labels?.length > 24) {
    return transformedMonthData;
  } else if (data?.labels?.length === 12) {
    return transformedData;
  } else if (data?.labels?.length === 24) {
    return transformedTodayData;
  } else {
    return transformedWeekData;
  }
};

export function BarChartCom({
  barWid,
  barHei,
  barSpacing,
  barW,
  data,
  initialSpacing,
  spacing,
  interval,
  dateInterval,
  dateTodayInterval,
  isLoading,
}) {
  const formattedData = transformData(data, spacing, interval, dateInterval, dateTodayInterval);
  return (
    <View>
      {isLoading ? (
        <View style={styles.loaderView}>
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        </View>
      ) : (
        <BarChart
          data={formattedData}
          barWidth={barW}
          spacing={barSpacing}
          roundedTop
          // hideRules
          xAxisThickness={1}
          yAxisThickness={0}
          xAxisType={'dashed'}
          yAxisType={'dashed'}
          xAxisColor={`rgba(39, 90, 255, 1)`}
          yAxisTextStyle={{ color: COLORS.darkGray, fontSize: 11 }}
          noOfSections={4}
          // maxValue={100}
          yAxisLength={350}
          height={barHei}
          width={barWid}
          initialSpacing={initialSpacing}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: ms(30),
  },
});
