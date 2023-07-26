import React from 'react';
import { Text, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { rightlight } from '@/assets';
import { NewChartKit, Spacer } from '@/components';
import { styles } from '../Analytics2.styles';

export function HomeGraph({
  header,
  subHeader,
  analyticGraphObject,
  homeGraphHandler,
  arrayLength,
  onPress,
}) {
  return (
    <View style={styles.totalProductCon}>
      <Spacer space={SH(20)} />
      <View style={styles.displayFlex}>
        <View>
          <Text style={styles.darkBlackText}>{header}</Text>
          <Text style={[styles.darkBlackText, { fontSize: SF(24) }]}>
            {header === 'Total Products' ? null : '$'}
            {subHeader}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={onPress}>
        <NewChartKit analyticGraphObject={analyticGraphObject} arrayLength={arrayLength} />
      </TouchableOpacity>
    </View>
  );
}
