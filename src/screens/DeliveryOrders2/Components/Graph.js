import React, { useState } from 'react';
import { View, Text, Dimensions, FlatList } from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import CheckBox from '@react-native-community/checkbox';

import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { labels, graphOptions } from '@/constants/staticData';

import styles from '../styles';

const Graph = () => {
  const [graph, setGraph] = useState(graphOptions);

  const changeValue = (index) => {
    let list = graphOptions;
    list[index].checked = !list[index].checked;
    setGraph(list);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.shippingDrawerView}>
      <CheckBox
        disabled={false}
        value={graph[index].checked}
        onValueChange={() => changeValue(index)}
      />
      <Text>{item?.title}</Text>
    </View>
  );

  return (
    <View style={styles.graphViewStyle}>
      <Text style={styles.numberOrdersText}>{strings.shipingOrder.numberOfOrders}</Text>

      <FlatList
        horizontal
        data={graph}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <LineChart
        bezier
        fromZero
        height={285}
        segments={10}
        withDots={false}
        withShadow={false}
        data={{
          labels: labels,
          // legend: legends,
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
        width={Dimensions.get('window').width * 0.53}
        chartConfig={{
          decimalPlaces: 0,
          backgroundColor: COLORS.black,
          backgroundGradientFrom: COLORS.white,
          backgroundGradientTo: COLORS.white,
          propsForLabels: styles.shippingDrawerTitleText,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(60, 68, 77, ${opacity})`,
        }}
      />
    </View>
  );
};

export default Graph;
