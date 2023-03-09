
import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export function Reward() {
  return (
    <View>
       <LineChart
      data={{
       labels: ["January", "February", "March", "April", "May", "June"],
       datasets: [
        
        {
          data: [20, 45, 28, 80, 99, 43],
          color: () => `rgba(31, 179, 255, 1)`,
          strokeWidth: 3,
         
        },
        // {
        //   data: [20, 70, 28, 80, 99, 43],
        //   color: () => `rgba(39, 90, 255, 1)`,
        //   withShadow: false,
        //   strokeWidth: 3, // optional
        // }
       ]
     }}
     width={Dimensions.get('window').width * 0.42}
     height={190}
     chartConfig={{
       decimalPlaces: 0,
       backgroundColor: '#000',
       backgroundGradientFrom: '#fff',
       backgroundGradientTo: '#fff',
       decimalPlaces: 2,
       color: () => `rgba(31, 179, 255, 0)`,
       labelColor: (opacity = 1) =>
         `rgba(98, 98, 98, ${opacity})`,
       style: {
         borderRadius: 16,
       },
      
       useShadowColorFromDataset: false,
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
