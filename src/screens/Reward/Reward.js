import { DaySelector, ScreenWrapper, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { moderateScale } from 'react-native-size-matters';
import { styles } from '@/screens/Reward/Reward.styles';
import { backArrow, notifications, reward, rewardFlower, rewardGraph, search_light, userImage } from '@/assets';
import LinearGradient from 'react-native-linear-gradient';

export function Reward() {
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {/* {weeklyTransaction ? ( */}
        <TouchableOpacity style={styles.backButtonCon}>
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
    return (
      <View style={{ marginHorizontal: moderateScale(1) }}>
        {customHeader()}
        <View style={styles.walletMainCon}>
          <View style={styles.displayflex}>
            <Text style={styles.totalRewardText}>
              {strings.reward.totalReward}
            </Text>
            <View>{/* <DaySelector/> */}</View>
          </View>
          <Text style={styles.jobrCountLabel}>
            {strings.reward.jobrCountLabel} {strings.reward.jobrCountCount}
          </Text>
          <Spacer space={SH(10)} />
          <View style={styles.displayflex}>
            <Image source={rewardGraph} style={styles.rewardGraph} />
            <LinearGradient
              colors={['rgba(39, 90, 255, 1)', 'rgba(255, 255, 255, 1)']}
              style={styles.rewardCon}
            >
              <Image source={rewardFlower} style={styles.rewardFlower}/>
              <View style={styles.rewaurdMainCon}>
                <View style={styles.thirdRewardCon}></View>
                <View style={styles.firstRewardCon}>
                  <View style={styles.userImageBorder}>
                  <Image source={userImage} style={styles.rewardUserFirst}/> 
                  </View>    
                  <Spacer space={SH(10)} /> 
                  <Text style={styles.firstText}>
                     {strings.reward.first}{strings.reward.st}
                  </Text>    
                  <Spacer space={SH(5)} /> 
                  <View style={styles.rewardConPrice}>
                      <View style={styles.displayflex}>
                        <Image source={reward} />
                        <Text>dfghj</Text>
                        
                      </View>
                  </View>
                </View>
                <View style={styles.secondRewardCon}></View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{bodyView()}</View>
    </ScreenWrapper>
  );
}
