import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  StatusBar,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {
  backArrow,
  checkArrow,
  crossButton,
  Fonts,
  jbrCustomer,
  loader,
  menu,
  minus,
  plus,
  rightlight,
  search_light,
  userImage,
} from '@/assets';
import { ChartKit, Spacer } from '@/components';
import { strings } from '@/localization';
import { styles } from '../Analytics.styles';
const windowHeight = Dimensions.get('window').height;
import { jbritemList } from '@/constants/flatListData';
import { useEffect } from 'react';
import { useState } from 'react';

export function HomeGraph({ header, subHeader, productGraphObject,homeGraphHandler}) {
  
  return (
    <View style={styles.totalProductCon}>
      <Spacer space={SH(20)} />
      <View style={styles.displayFlex}>
        <View>
          <Text style={styles.darkBlackText}>{header}</Text>
          <Text style={[styles.darkBlackText, { fontSize: SF(32) }]}>
          {subHeader}
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
      />
    </View>
  );
}
