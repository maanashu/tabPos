import { Fonts } from '@/assets';
import { COLORS, SH } from '@/theme';
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
  initialSpacing,
}) {
  const barData =
    revenueData === undefined
      ? [
          {
            value: 44,
            spacing: 2,
            label: 'Mon',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.blue_shade,
            intialSapce: 0,
          },
          {
            value: 56,
            spacing: 2,
            frontColor: COLORS.primary,
          },
          { value: 66, frontColor: COLORS.darkGray },
          {
            value: 22,
            spacing: 2,
            label: 'Tue',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.blue_shade,
          },
          {
            value: 55,
            spacing: 2,
            frontColor: COLORS.primary,
          },
          { value: 88, frontColor: COLORS.darkGray },
          {
            value: 99,
            spacing: 2,
            label: 'Wed',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.blue_shade,
          },
          {
            value: 22,
            spacing: 2,
            frontColor: COLORS.primary,
          },
          { value: 55, frontColor: COLORS.darkGray },
          {
            value: 44,
            spacing: 2,
            label: 'Thu',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.blue_shade,
          },
          {
            value: 44,
            spacing: 2,
            frontColor: COLORS.primary,
          },
          { value: 22, frontColor: COLORS.darkGray },
          {
            value: 10,
            spacing: 2,
            label: 'Fri',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.blue_shade,
          },
          {
            value: 10,
            spacing: 2,
            frontColor: COLORS.primary,
          },
          { value: 20, frontColor: COLORS.darkGray },
          {
            value: 30,
            spacing: 2,
            label: 'Sat',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.blue_shade,
          },
          {
            value: 11,
            spacing: 2,
            frontColor: COLORS.primary,
          },
          { value: 67, frontColor: COLORS.darkGray },
          {
            value: 10,
            spacing: 2,
            label: 'Sun',
            labelWidth: 60,
            labelTextStyle: labelTextSty,
            frontColor: COLORS.blue_shade,
          },
          {
            value: 40,
            spacing: 2,
            frontColor: COLORS.primary,
          },
          { value: 20, frontColor: COLORS.darkGray },
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
        yAxisType={'dashed'}
        xAxisColor={`rgba(39, 90, 255, 1)`}
        yAxisTextStyle={{ color: COLORS.darkGray, fontSize: 11 }}
        noOfSections={4}
        maxValue={100}
        yAxisLength={350}
        height={barHei}
        width={barWid}
        initialSpacing={initialSpacing}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
