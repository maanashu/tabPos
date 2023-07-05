import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { rightlight } from '@/assets';
import { ChartKit, Spacer } from '@/components';
import { styles } from '../Analytics.styles';

export function HomeGraph({
  header,
  subHeader,
  productGraphObject,
  homeGraphHandler,
  arrayLength,
  productLoader,
  hideHeader,
  chartStyle,
}) {
  return (
    <View style={[styles.totalProductCon, chartStyle && styles.graphRevenue]}>
      <Spacer space={SH(20)} />
      {hideHeader ? (
        <></>
      ) : (
        <View style={styles.displayFlex}>
          <View>
            <Text style={styles.darkBlackText}>{header}</Text>
            <Text style={[styles.darkBlackText, { fontSize: SF(32) }]}>
              {header === 'Total Products' ? null : '$'}
              {subHeader}
            </Text>
          </View>
          <TouchableOpacity onPress={homeGraphHandler}>
            <Image source={rightlight} style={styles.rightlight} />
          </TouchableOpacity>
        </View>
      )}
      <Spacer space={SH(5)} />
      {productLoader ? (
        <View style={{ marginTop: 50 }}>
          <ActivityIndicator size="large" color={COLORS.indicator} />
        </View>
      ) : chartStyle ? (
        <ChartKit
          productGraphObject={productGraphObject}
          arrayLength={arrayLength}
          chartStyle
        />
      ) : (
        <ChartKit
          productGraphObject={productGraphObject}
          arrayLength={arrayLength}
        />
      )}
    </View>
  );
}
