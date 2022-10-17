import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { COLORS, SF, SW } from '@/theme';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import {
  Fonts,
  deliveryTruck,
  blueTruck,
  logo_icon,
  retail,
  greyRetail,
  parachuteBox,
  bluepara,
  calendar,
  analytics,
  blueanalytics,
  wallet,
  bluewallet,
  tray,
  users,
  blueusers,
  reward,
  settings,
  power
} from '@/assets';

export function DrawerNavigator(props) {

  const [active, setActive] = useState('retail')

  return (
    <DrawerContentScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      horizontal={false}
      vertical
      contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'space-evenly', left: 0, right: 10 }}
      {...props}>
      <DrawerItem
        label=""
        icon={({ focused, color, size }) => (
          <Image source={logo_icon} style={styles.iconStyle} />)} />

      <DrawerItem
        activeBackgroundColor='transparent'
        focused={active === 'retail' ? true : false}
        onPress={() => { setActive('retail'), navigate(NAVIGATION.retails) }}
        label=""
        icon={({ focused, color, size }) => (<Image source={focused ? retail : greyRetail} style={styles.iconStyle} />)} />

      <DrawerItem
        activeBackgroundColor='transparent'
        focused={active === 'delivery' ? true : false}
        onPress={() => { setActive('delivery'), navigate(NAVIGATION.deliveryOrder) }}
        label=""
        icon={({ focused, color, size }) => (<Image source={focused ? blueTruck : deliveryTruck} style={styles.iconStyle} />)} />

      <DrawerItem
        activeBackgroundColor='transparent'
        focused={active === 'para' ? true : false}
        onPress={() => { setActive('para'), navigate(NAVIGATION.shippingOrders) }}
        label=""
        icon={({ focused, color, size }) => (<Image source={focused ? bluepara : parachuteBox} style={styles.iconStyle} />)} />

      <DrawerItem
        onPress={() => { alert('coming soon') }}
        label=""
        icon={({ focused, color, size }) => (
          <Image source={calendar} style={styles.iconStyle} />)} />

      <DrawerItem
        activeBackgroundColor='transparent'
        focused={active === 'analytics' ? true : false}
        onPress={() => { setActive('analytics'), alert('coming soon') }}
        label=""
        icon={({ focused, color, size }) => (<Image source={focused ? blueanalytics : analytics} style={styles.iconStyle} />)} />

      <DrawerItem
        activeBackgroundColor='transparent'
        focused={active === 'wallet' ? true : false}
        onPress={() => { setActive('wallet'), navigate(NAVIGATION.wallet) }}
        label=""
        icon={({ focused, color, size }) => (<Image source={focused ? bluewallet : wallet} style={styles.iconStyle} />)} />

      <DrawerItem
        activeBackgroundColor='transparent'
        focused={active === 'management' ? true : false}
        onPress={() => { setActive('management'), navigate(NAVIGATION.management) }}
        label=""
        icon={({ focused, color, size }) => (
          <Image source={tray} style={styles.iconStyle} />)} />

      <DrawerItem
        activeBackgroundColor='transparent'
        focused={active === 'users' ? true : false}
        onPress={() => { setActive('users'), alert('coming soon') }}
        label=""
        icon={({ focused, color, size }) => (<Image source={focused ? blueusers : users} style={styles.iconStyle} />)} />

      <DrawerItem
        onPress={() => { alert('coming soon') }}
        label=""
        icon={({ focused, color, size }) => (
          <Image source={reward} style={styles.iconStyle} />)} />

      <DrawerItem
        onPress={() => { alert('coming soon') }}
        label=""
        icon={({ focused, color, size }) => (
          <Image source={settings} style={styles.iconStyle} />)} />

      {/* <View style={{ backgroundColor: COLORS.textInputBackground }}> */}
      <DrawerItem
        onPress={() => { alert('coming soon') }}
        label=""
        icon={({ focused, color, size }) => (
          <Image source={power} style={styles.iconStyle} />)} />
      {/* </View> */}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerMainView: {
    flex: 1,
    backgroundColor: COLORS.text,
    alignSelf: 'center',
  },
  iconStyle: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
  },
  powerStyle: {
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
