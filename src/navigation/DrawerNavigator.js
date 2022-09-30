import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { COLORS, SF, SH, SW } from '@/theme';
import { verticalScale } from 'react-native-size-matters';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import {
  Fonts,
  deliveryTruck,
  logo_icon,
  retail,
  parachuteBox,
  calendar,
  analytics,
  wallet,
  tray,
  users,
  reward,
  settings,
  power
} from '@/assets';

export function DrawerNavigator(props) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerMainView}
    >
      <SafeAreaView style={styles.drawerMainView}>
        <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          label=""
          
          icon={({ focused, color, size }) => (
            <Image
              source={logo_icon}
              style={styles.iconStyle}
            />
          )}
        />
        <DrawerItem
          onPress={() => { navigate(NAVIGATION.retails) }}
          label=""
          icon={({ focused, color, size }) => (
            <Image
              source={retail}
              style={styles.iconStyle}
            />
          )}
        />
        <DrawerItem
          onPress={() => { navigate(NAVIGATION.deliveryOrder) }}
          label=""
          icon={({ focused, color, size }) => (
            <Image
              source={deliveryTruck}
              style={styles.iconStyle}
            />
          )}
        />
        <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          onPress={() => alert('coming soon')}
          label="" 
          
          icon={({ focused, color, size }) => (
            <Image
              source={parachuteBox}
              style={styles.iconStyle}
            />
          )}
        />
        <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          onPress={() => alert('coming soon')}
          label=""
          
          icon={({ focused, color, size }) => (
            <Image
              source={calendar}
              style={styles.iconStyle}
            />
          )}
        />
        <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          onPress={() => alert('coming soon')}
          label=""
          
          icon={({ focused, color, size }) => (
            <Image
              source={analytics}
              style={styles.iconStyle}
            />
          )}
        />
        <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          onPress={() => alert('coming soon')}
          label=""
          
          icon={({ focused, color, size }) => (
            <Image
              source={wallet}
              style={styles.iconStyle}
            />
          )}
        />
         <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          onPress={() => alert('coming soon')}
          label=""
          
          icon={({ focused, color, size }) => (
            <Image
              source={tray}
              style={styles.iconStyle}
            />
          )}
        />
           <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          onPress={() => alert('coming soon')}
          label=""
          
          icon={({ focused, color, size }) => (
            <Image
              source={users}
              style={styles.iconStyle}
            />
          )}
        />
           <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          onPress={() => alert('coming soon')}
          label=""
          
          icon={({ focused, color, size }) => (
            <Image
              source={reward}
              style={styles.iconStyle}
            />
          )}
        />
           <DrawerItem
          // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
          onPress={() => alert('coming soon')}
          label=""
          
          icon={({ focused, color, size }) => (
            <Image
              source={settings}
              style={styles.iconStyle}
            />
          )}
        />
        <View style={{ backgroundColor:COLORS.textInputBackground, position:'absolute', bottom:0, left:0}}>
            <DrawerItem
              // onPress={() => { navigate(NAVIGATION.mydeliveries) }}
              onPress={() => alert('coming soon')}
              label=""
              
              icon={({ focused, color, size }) => (
                <Image
                  source={power}
                  style={styles.powerStyle}
                />
              )}
            />
        </View>
          
      </SafeAreaView>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerMainView: {
    flex: 1,
    backgroundColor: COLORS.text,
  },
  iconStyle: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  powerStyle:{
    width: SW(6),
    height: SW(6),
    resizeMode: 'contain',
  },
  labelStyles: {
    color: COLORS.white,
    fontFamily: Fonts.MaisonRegular,
    fontSize: SF(14),
    left: -25,
  },
});
