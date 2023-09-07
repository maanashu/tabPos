import { COLORS, SW } from '@/theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const transformData = (data, spacing, interval, dateInterval) => {
  const transformedData = [];
  const dynamicLabels = data?.labels?.filter((label, index) => (index + 1) % interval === 0);
  for (let i = 0; i < dynamicLabels?.length; i++) {
    const totalValue = data?.datasets?.reduce((sum, dataset) => sum + dataset?.data[i], 1);
    const dataPoint = {
      value: totalValue,
      spacing: spacing,
      label: dynamicLabels[i],
      labelWidth: SW(70), // You can adjust this value as needed
      labelTextStyle: { color: COLORS.darkGray, fontSize: 11 }, // You can define your labelTextStyle here
      frontColor: i === 0 ? COLORS.primary : i === 1 ? COLORS.violet : COLORS.darkBlue,
      intialSpace: 0,
    };
    transformedData.push(dataPoint);
  }
  const dynamicDateLabels = data?.labels?.filter(
    (label, index) => (index + 1) % dateInterval === 0
  );
  const transformedMonthData = dynamicDateLabels?.map((label, index) => ({
    frontColor: '#102773',
    label: label?.split(' ')[0], // Extracting only the day part
    labelTextStyle: { color: '#626262', fontSize: 11 },
    value: data?.datasets.reduce((sum, dataset) => sum + dataset?.data[index], 0),
    frontColor: index === 0 ? COLORS.primary : index === 1 ? COLORS.violet : COLORS.darkBlue,
    labelWidth: SW(70),
    spacing: spacing,
  }));

  const transformedWeekData = data?.labels?.map((label, index) => ({
    frontColor: '#102773',
    label: label?.split(' ')[0], // Extracting only the day part
    labelTextStyle: { color: '#626262', fontSize: 11 },
    value: data?.datasets.reduce((sum, dataset) => sum + dataset?.data[index], 0),
    frontColor: index === 0 ? COLORS.primary : index === 1 ? COLORS.violet : COLORS.darkBlue,
    labelWidth: SW(70),
    spacing: spacing,
  }));

  if (data?.labels?.length > 12) {
    return transformedMonthData;
  } else if (data?.labels?.length === 12) {
    return transformedData;
  } else {
    return transformedWeekData;
  }
};

export function BarChartCom({
  barWid,
  barHei,
  barSpacing,
  barW,
  labelTextSty,
  data,
  initialSpacing,
  spacing,
  interval,
  dateInterval,
}) {
  const formattedData = transformData(data, spacing, interval, dateInterval);
  const barData =
    data === undefined
      ? [
          {
            value: 10,
            spacing: 2,
            label: '12/20/2023',
            labelWidth: 70,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
            intialSapce: 0,
          },
          {
            value: 56,
            spacing: 2,
            frontColor: COLORS.violet,
          },
          { value: 66, frontColor: COLORS.darkBlue },
          {
            value: 22,
            spacing: 2,
            label: '12/20/2023',
            labelWidth: 70,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 55,
            spacing: 2,
            frontColor: COLORS.violet,
          },
          { value: 88, frontColor: COLORS.darkBlue },
          {
            value: 99,
            spacing: 2,
            label: '12/20/2023',
            labelWidth: 70,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 22,
            spacing: 2,
            frontColor: COLORS.violet,
          },
          { value: 55, frontColor: COLORS.darkBlue },
          {
            value: 44,
            spacing: 2,
            label: '12/20/2023',
            labelWidth: 70,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 44,
            spacing: 2,
            frontColor: COLORS.violet,
          },
          { value: 22, frontColor: COLORS.darkBlue },
          {
            value: 10,
            spacing: 2,
            label: '12/20/2023',
            labelWidth: 70,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 10,
            spacing: 2,
            frontColor: COLORS.violet,
          },
          { value: 20, frontColor: COLORS.darkBlue },
          {
            value: 30,
            spacing: 2,
            label: '12/20/2023',
            labelWidth: 70,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 11,
            spacing: 2,
            frontColor: COLORS.violet,
          },
          { value: 67, frontColor: COLORS.darkBlue },
          {
            value: 10,
            spacing: 2,
            label: '12/20/2023',
            labelWidth: 70,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 40,
            spacing: 2,
            frontColor: COLORS.violet,
          },
          { value: 20, frontColor: COLORS.darkBlue },
        ]
      : [
          {
            value: value,
            frontColor: COLORS.primary,
            label: label,
          },
          {
            value: data?.datasets?.[1]?.data?.[0],
            spacing: 2,
            label: data?.labels?.[0],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.violet,
          },
          {
            value: data?.datasets?.[2].data?.[0],
            frontColor: COLORS.darkBlue,
          },
          {
            value: data?.datasets?.[0]?.data?.[1],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: data?.datasets?.[1]?.data?.[1],
            spacing: 2,
            label: data?.labels?.[1],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.violet,
          },
          {
            value: data?.datasets?.[2].data?.[1],
            frontColor: COLORS.darkBlue,
          },
          {
            value: data?.datasets?.[0]?.data?.[2],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: data?.datasets?.[1]?.data?.[2],
            spacing: 2,
            label: data?.labels?.[2],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.violet,
          },
          {
            value: data?.datasets?.[2].data?.[2],
            frontColor: COLORS.darkBlue,
          },
          {
            value: data?.datasets?.[0]?.data?.[3],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: data?.datasets?.[1]?.data?.[3],
            spacing: 2,
            label: data?.labels?.[3],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.violet,
          },
          {
            value: data?.datasets?.[2].data?.[3],
            frontColor: COLORS.darkBlue,
          },
          {
            value: data?.datasets?.[0]?.data?.[4],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: data?.datasets?.[1]?.data?.[4],
            spacing: 2,
            label: data?.labels?.[4],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.violet,
          },
          {
            value: data?.datasets?.[2].data?.[4],
            frontColor: COLORS.darkBlue,
          },
          {
            value: data?.datasets?.[0]?.data?.[5],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: data?.datasets?.[1]?.data?.[5],
            spacing: 2,
            label: data?.labels?.[5],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.violet,
          },
          {
            value: data?.datasets?.[2].data?.[5],
            frontColor: COLORS.darkBlue,
          },
          {
            value: data?.datasets?.[0]?.data?.[6],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: data?.datasets?.[1]?.data?.[6],
            spacing: 2,
            label: data?.labels?.[6],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.violet,
          },
          {
            value: data?.datasets?.[2].data?.[6],
            frontColor: COLORS.darkBlue,
          },
        ];
  return (
    <View>
      <BarChart
        data={barData}
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
    </View>
  );
}

const styles = StyleSheet.create({});
