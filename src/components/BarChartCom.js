import { Fonts } from '@/assets';
import { COLORS } from '@/theme';
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

export function BarChartCom({
  barWid,
  barHei,
  barSpacing,
  barW,
  labelTextSty,
  revenueData,
}) {
  const barData =
    revenueData === undefined
      ?
       [
          {
            value: 44,
            spacing: 2,
            label: 'Saturday',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 56,
            spacing: 2,
            frontColor: COLORS.bluish_green,
          },
          { value: 66, frontColor: COLORS.lightGreen },
          {
            value: 22,
            spacing: 2,
            label: 'Sunday',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 55,
            spacing: 2,
            frontColor: COLORS.bluish_green,
          },
          { value: 88, frontColor: COLORS.lightGreen },
          {
            value: 99,
            spacing: 2,
            label: 'Monday',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 22,
            spacing: 2,
            frontColor: COLORS.bluish_green,
          },
          { value: 55, frontColor: COLORS.lightGreen },
          {
            value: 44,
            spacing: 2,
            label: 'Tuesday',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 44,
            spacing: 2,
            frontColor: COLORS.bluish_green,
          },
          { value: 22, frontColor: COLORS.lightGreen },
          {
            value: 10,
            spacing: 2,
            label: 'Wednesday',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 10,
            spacing: 2,
            frontColor: COLORS.bluish_green,
          },
          { value: 20, frontColor: COLORS.lightGreen },
          {
            value: 30,
            spacing: 2,
            label: 'Thursday',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 11,
            spacing: 2,
            frontColor: COLORS.bluish_green,
          },
          { value: 67, frontColor: COLORS.lightGreen },
          {
            value: 10,
            spacing: 2,
            label: 'Friday',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.primary,
          },
          {
            value: 40,
            spacing: 2,
            frontColor: COLORS.bluish_green,
          },
          { value: 20, frontColor: COLORS.lightGreen },
        ]
      : [
          {
            value: revenueData?.datasets?.[0].data?.[0],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: revenueData?.datasets?.[1]?.data?.[0],
            spacing: 2,
            label: revenueData?.labels?.[0],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.bluish_green,
          },
          {
            value: revenueData?.datasets?.[2].data?.[0],
            frontColor: COLORS.lightGreen,
          },
          {
            value: revenueData?.datasets?.[0]?.data?.[1],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: revenueData?.datasets?.[1]?.data?.[1],
            spacing: 2,
            label: revenueData?.labels?.[1],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.bluish_green,
          },
          {
            value: revenueData?.datasets?.[2].data?.[1],
            frontColor: COLORS.lightGreen,
          },
          {
            value: revenueData?.datasets?.[0]?.data?.[2],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: revenueData?.datasets?.[1]?.data?.[2],
            spacing: 2,
            label: revenueData?.labels?.[2],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.bluish_green,
          },
          {
            value: revenueData?.datasets?.[2].data?.[2],
            frontColor: COLORS.lightGreen,
          },
          {
            value: revenueData?.datasets?.[0]?.data?.[3],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: revenueData?.datasets?.[1]?.data?.[3],
            spacing: 2,
            label: revenueData?.labels?.[3],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.bluish_green,
          },
          {
            value: revenueData?.datasets?.[2].data?.[3],
            frontColor: COLORS.lightGreen,
          },
          {
            value: revenueData?.datasets?.[0]?.data?.[4],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: revenueData?.datasets?.[1]?.data?.[4],
            spacing: 2,
            label: revenueData?.labels?.[4],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.bluish_green,
          },
          {
            value: revenueData?.datasets?.[2].data?.[4],
            frontColor: COLORS.lightGreen,
          },
          {
            value: revenueData?.datasets?.[0]?.data?.[5],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: revenueData?.datasets?.[1]?.data?.[5],
            spacing: 2,
            label: revenueData?.labels?.[5],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.bluish_green,
          },
          {
            value: revenueData?.datasets?.[2].data?.[5],
            frontColor: COLORS.lightGreen,
          },
          {
            value: revenueData?.datasets?.[0]?.data?.[6],
            spacing: 2,
            frontColor: COLORS.primary,
          },
          {
            value: revenueData?.datasets?.[1]?.data?.[6],
            spacing: 2,
            label: revenueData?.labels?.[6],
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.bluish_green,
          },
          {
            value: revenueData?.datasets?.[2].data?.[6],
            frontColor: COLORS.lightGreen,
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
        xAxisColor={'#1FB3FF'}
        yAxisTextStyle={{ color: '#275AFF', fontSize: 11 }}
        noOfSections={4}
        maxValue={100}
        yAxisLength={400}
        height={barHei}
        width={barWid}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
