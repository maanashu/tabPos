import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {  SF, SH } from '@/theme';
import {
  rightlight,
} from '@/assets';
import { ChartKit, Spacer } from '@/components';
import { styles } from '../Analytics.styles';

export function HomeGraph({ header, subHeader, productGraphObject,homeGraphHandler, arrayLength}) {
  
  return (
    <View style={styles.totalProductCon}>
      <Spacer space={SH(20)} />
      <View style={styles.displayFlex}>
        <View>
          <Text style={styles.darkBlackText}>{header}</Text>
          <Text style={[styles.darkBlackText, { fontSize: SF(32) }]}>
           {header === 'Total Products' ? null : '$'}{subHeader}
          </Text>
        </View>
        <TouchableOpacity
         onPress={homeGraphHandler}
         >
          <Image source={rightlight} style={styles.rightlight} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(5)} />
      <ChartKit
      productGraphObject={productGraphObject}
      arrayLength={arrayLength}
      />
    </View>
  );
}
