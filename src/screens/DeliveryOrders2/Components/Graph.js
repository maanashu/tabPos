import React from 'react';
import { View, Text, FlatList, Dimensions, ActivityIndicator } from 'react-native';

import { ms } from 'react-native-size-matters';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';

import styles from '../styles';
import { BarChart } from 'react-native-gifted-charts';
import { Spacer } from '@/components';

const Graph = ({ graphData, renderGraphItem, isDeliveryOrder, outputData }) => {
  return (
    <View style={styles.graphViewStyle}>
      <Text style={styles.numberOrdersText}>{strings.shipingOrder.numberOfOrders}</Text>

      <FlatList
        horizontal
        data={graphData}
        scrollEnabled={false}
        renderItem={renderGraphItem}
        showsHorizontalScrollIndicator={false}
      />

      <Spacer space={SH(30)} />

      {isDeliveryOrder ? (
        <View
          style={{
            height: ms(185),
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <View>
          <BarChart
            data={outputData}
            noOfSections={7}
            roundedTop
            // hideRules
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisType={'dashed'}
            yAxisType={'dashed'}
            yAxisTextStyle={{ color: COLORS.darkGray, fontSize: 11 }}
            yAxisLength={350}
            isAnimated
            height={ms(118)}
            width={Dimensions.get('window').width * 0.49}
          />
          <Spacer space={SH(10)} />
        </View>
      )}
    </View>
  );
};

export default Graph;
