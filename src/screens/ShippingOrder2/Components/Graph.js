import React from 'react';
import { View, Text, FlatList, ActivityIndicator, Dimensions } from 'react-native';

import { ms } from 'react-native-size-matters';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';

import styles from '../ShippingOrder2.styles';
import { BarChart } from 'react-native-gifted-charts';
import { Spacer } from '@/components';

const Graph = ({ graphData, renderGraphItem, isDeliveryOrder, outputData }) => {
  return (
    <View style={styles.graphViewStyle}>
      <View>
        <Text style={styles.numberOrdersText}>{strings.deliveryOrders.orderNumber}</Text>

        <FlatList
          horizontal
          data={graphData}
          scrollEnabled={false}
          renderItem={renderGraphItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <Spacer space={SH(20)} />

      {isDeliveryOrder ? (
        <View
          style={{
            height: ms(150),
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
            xAxisThickness={1}
            yAxisThickness={1}
            xAxisType={'dashed'}
            yAxisType={'dashed'}
            yAxisTextStyle={{ color: COLORS.darkGray, fontSize: 11 }}
            yAxisLength={350}
            height={ms(130)}
            width={Dimensions.get('window').width * 0.5}
          />
        </View>
      )}
    </View>
  );
};

export default Graph;
