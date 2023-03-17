import React from 'react';
import { StyleSheet, View,Text, Dimensions } from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

export function Reward() {
  const barData = [
    {
      value: 100,
      spacing: 4,
      labelWidth: 40,
      labelTextStyle: {color: '#3C444D'},
      frontColor: '#275AFF',
    },
    {
      value: 50,
      spacing: 4,
      label: 'Jan',
      labelWidth: 50,
      labelTextStyle: {color: 'gray'},
      frontColor: '#1FB3FF',
    },
    {value: 10, frontColor: '#1CD3FF'},
    {
      value: 50,
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {
      value: 50,
      label: 'Feb',
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    
    {value: 40, frontColor: '#ED6665'},
    {
      value: 75,
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {
      value: 75,
      label: 'Mar',
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 25, frontColor: '#ED6665'},
    {
      value: 30,
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {
      value: 30,
      label: 'Apr',
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 60,
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {
      value: 60,
      label: 'May',
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 65,
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {
      value: 65,
      label: 'Jun',
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
    {
      value: 65,
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {
      value: 65,
      label: 'Jun',
      spacing: 4,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
  ];
  return (
    <View style={{borderWidth:1, height:400}}>
       <BarChart
          data={barData}
          barWidth={20}
          spacing={30}
          roundedTop
          // hideRules
          xAxisThickness={1}
          yAxisThickness={0}
          xAxisType={'dashed'}
          xAxisColor={'#1FB3FF'}
          yAxisTextStyle={{color: '#275AFF'}}
          noOfSections={4}
          maxValue={100}
          // style={{borderWidth:1, width:400, height:500}}
          // stepH
          // stepHeight={300}
          yAxisLength={400}
          height={350}
        />
    </View>
  );
}



