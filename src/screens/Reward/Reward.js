import { ScreenWrapper, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SH } from '@/theme';
import React, { useState } from 'react';
import { StyleSheet, View,Text, Dimensions, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import { moderateScale } from 'react-native-size-matters';
import { styles } from '@/screens/Reward/Reward.styles';
import { backArrow, notifications, search_light } from '@/assets';

export function Reward() {

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {/* {weeklyTransaction ? ( */}
          <TouchableOpacity
            style={styles.backButtonCon}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        {/* ) : ( */}
          {/* <View style={styles.deliveryView}>
            <Image source={wallet2} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.wallet.wallet}</Text>
          </View> */}
        {/* )} */}

        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 20 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyles}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  const bodyView = () => {
      return(
        <View style={{ marginHorizontal: moderateScale(1), borderWidth:1}}>
          {  customHeader()}
          <View style={styles.walletMainCon}>

          </View>
          </View>
      )
  }
  
  
  return (
    <ScreenWrapper>
    <View style={styles.container}>{bodyView()}</View>
  </ScreenWrapper>
   
   
  );
}





