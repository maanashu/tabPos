import React from 'react';
import { Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import {  catPercent, colorFrame, productMap, revenueGraph } from '@/assets';
import { strings } from '@/localization';
import { styles } from './Analytics.styles';
import {totalOrderData } from '@/constants/flatListData';

import { DaySelector, Spacer } from '@/components';

export function TotalRevenueSub({totalOrderViseHandler, totalRevenueHandler}) {

  const totalOrderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCon}
      onPress={() => totalOrderViseHandler(item)}
    >
      <View style={styles.categoryChildCon}>
        <Text style={styles.categoryCount}>{item.categoryCount}</Text>
        <Text numberOfLines={1} style={styles.categoryText}>{item.category}</Text>
      </View>
      <View style={styles.categoryChildPercent}>
        <Image source={catPercent} style={styles.catPercent} />
        <Text style={styles.percentText}>{item.percentage}</Text>
      </View>
    </TouchableOpacity>
  );


  return (
    <View style={styles.totalProductBodyCon}>
    <View>
      <View style={styles.totalProductDetailCon}>
        <Spacer space={SH(10)} />
        <View style={styles.displayFlex}>
          <Text style={styles.trancationHeading}>
            {strings.analytics.totalRevenue}
          </Text>
          <View>
             <DaySelector/>
          </View>
        </View>
        <Spacer space={SH(2)} />
        <TouchableOpacity
        onPress={totalRevenueHandler}
        >
          <Text
            style={[
              styles.darkBlackText,
              { fontSize: SF(34), color: COLORS.primary },
            ]}
          >
            {strings.analytics.totalRevenueCount}
          </Text>
        </TouchableOpacity>
        <Spacer space={SH(5)} />
        <View>
          <Image source={colorFrame} style={styles.colorFrame} />
          <Spacer space={SH(5)} />
          <Image source={revenueGraph} style={styles.revenueGraph} />
        </View>
      </View>
      <Spacer space={SH(15)} />
      <View style={styles.totalProductDetailCon}>
        <Spacer space={SH(10)} />
        <View style={styles.displayFlex}>
          <View>
            <DaySelector/>
          </View>
          <Text style={styles.trancationHeading}>
            {strings.analytics.totalOrder}
          </Text>
        </View>
        <Spacer space={SH(2)} />
        <Text
          style={[
            styles.darkBlackText,
            {
              fontSize: SF(34),
              color: COLORS.primary,
              alignSelf: 'flex-end',
            },
          ]}
        >
          $8,426,590
        </Text>
        <Spacer space={SH(5)} />
        <View style={styles.productGraphcon}>
          <View style={styles.displayFlex}>
            <View
              style={[
                styles.productCategorychildcon,
                { backgroundColor: 'transparent' },
              ]}
            >
              <View>
                <FlatList
                  data={totalOrderData}
                  renderItem={totalOrderItem}
                  keyExtractor={item => item.id}
                  numColumns={2}
                  scrollEnabled={false}
                />
              </View>
            </View>
            <View>
              <Image source={productMap} style={styles.totalOrderMap} />
            </View>
          </View>
        </View>
      </View>
      <Spacer space={SH(40)} />
    </View>
  </View>
  );
}
