import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function ChartKit() {
  return (
   <View>
     <LineChart
    data={{
      labels: [
        'Mon',
        'Tue',
        'Wed',
        'Thr',
        'Fri',
        'Sat',
        'sun',
      ],
      datasets: [
        {
          data: [0, 25, 50, 40, 100, 50, 40],
        },
      ],
    }}
    width={Dimensions.get('window').width * 0.42}
    height={190}
    chartConfig={{
      decimalPlaces: 0,
      backgroundColor: '#000',
      backgroundGradientFrom: '#fff',
      backgroundGradientTo: '#fff',
      decimalPlaces: 2,
      color: () => `rgba(39, 90, 255, 1)`,
      labelColor: (opacity = 1) =>
        `rgba(98, 98, 98, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForBackgroundLines: {
        strokeWidth: 1,
        stroke: '#CCCCCC'
    },
    propsForDots: {
      r: "0",
      strokeWidth: "2",
    }
    }}
    // bezier
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />
   </View>
  );
}

const styles = StyleSheet.create({
  
});
