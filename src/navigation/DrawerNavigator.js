import React, { useEffect, useState } from 'react';
import { View, Image, Platform, Dimensions, StyleSheet, ScrollView, Text } from 'react-native';

import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

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
  settings,
  bluetray,
  blueCalender,
  blueSetting,
} from '@/assets';
import { COLORS, SF, SW } from '@/theme';
import { NAVIGATION } from '@/constants';
import { getUser } from '@/selectors/UserSelectors';
import { navigate } from '@/navigation/NavigationRef';
import { getDashboard } from '@/selectors/DashboardSelector';
import { addSellingSelection } from '@/actions/DashboardAction';

const windowHeight = Dimensions.get('window').height;

export function DrawerNavigator(props) {
  const dispatch = useDispatch();
  const getUserData = useSelector(getUser);

  const getDashboardData = useSelector(getDashboard);
  const selection = getDashboardData?.selection;
  const [active, setActive] = useState('dashBoard');

  useEffect(() => {
    getSelectedOption();
  }, [selection]);

  const getSelectedOption = async () => {
    if (selection || selection !== undefined) {
      if (selection === 1) {
        setActive('posRetail2');
      } else {
        setActive('delivery');
      }
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
      bounces={false}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'dashBoard' ? true : false}
          onPress={() => {
            setActive('dashBoard');
            navigate(NAVIGATION.dashBoard);
            dispatch(addSellingSelection());
          }}
          icon={({ focused }) => (
            <Image style={styles.iconStyle} source={focused ? logo_icon : logo_icon} />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'posRetail3' ? true : false}
          onPress={() => {
            setActive('posRetail3');
            navigate(NAVIGATION.posRetail3);
            // dispatch(addSellingSelection());
            // dispatch(cartScreenTrue({ state: false }));
            // dispatch(getUserDetailSuccess([]));
          }}
          icon={({ focused }) => (
            <Image source={focused ? retail : greyRetail} style={styles.iconStyle} />
          )}
        />

        {/* <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'posRetail2' ? true : false}
          onPress={() => {
            setActive('posRetail2');
            navigate(NAVIGATION.posRetail2);
            // dispatch(addSellingSelection());
            // dispatch(cartScreenTrue({ state: false }));
            // dispatch(getUserDetailSuccess([]));
          }}
          icon={({ focused, color, size }) => (
            <Image source={focused ? retail : greyRetail} style={styles.iconStyle} />
          )}
        /> */}

        {/* <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'posRetail' ? true : false}
          onPress={() => {
            setActive('posRetail');
            navigate(NAVIGATION.posRetail);
            dispatch(addSellingSelection());
            dispatch(cartScreenTrue({ state: false }));
            dispatch(getUserDetailSuccess([]));
          }}
          icon={({ focused, color, size }) => (
            <Image source={focused ? retail : greyRetail} style={styles.iconStyle} />
          )}
        /> */}

        {/* <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'delivery' ? true : false}
          onPress={() => {
            setActive('delivery');
            dispatch(addSellingSelection());
            navigate(NAVIGATION.deliveryOrder);
          }}
          icon={({ focused, color, size }) => (
            <Image source={focused ? blueTruck : deliveryTruck} style={styles.iconStyle} />
          )}
        /> */}

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'deliveryOrders2' ? true : false}
          onPress={() => {
            setActive('deliveryOrders2');
            navigate(NAVIGATION.deliveryOrders2);
          }}
          icon={({ focused }) => {
            return getDashboardData?.pendingOrders?.delivery_count ? (
              <View>
                <Image source={focused ? blueTruck : deliveryTruck} style={styles.iconStyle} />
                <View style={styles.countViewStyle}>
                  <Text style={styles.countTextStyle}>
                    {getDashboardData?.pendingOrders?.delivery_count}
                  </Text>
                </View>
              </View>
            ) : (
              <Image source={focused ? blueTruck : deliveryTruck} style={styles.iconStyle} />
            );
          }}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'shippingOrder2' ? true : false}
          onPress={() => {
            setActive('shippingOrder2');
            navigate(NAVIGATION.shippingOrder2);
          }}
          icon={({ focused }) => {
            return getDashboardData?.pendingOrders?.shipping_count ? (
              <View>
                <Image source={focused ? bluepara : parachuteBox} style={styles.iconStyle} />
                <View style={styles.countViewStyle}>
                  <Text style={styles.countTextStyle}>
                    {getDashboardData?.pendingOrders?.shipping_count}
                  </Text>
                </View>
              </View>
            ) : (
              <Image source={focused ? bluepara : parachuteBox} style={styles.iconStyle} />
            );
          }}
        />

        {/* <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'para' ? true : false}
          onPress={() => {
            setActive('para');
            dispatch(addSellingSelection());
            navigate(NAVIGATION.shippingOrder);
          }}
          icon={({ focused, color, size }) => (
            <Image source={focused ? bluepara : parachuteBox} style={styles.iconStyle} />
          )}
        /> */}

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'calender' ? true : false}
          onPress={() => {
            setActive('calender');
            navigate(NAVIGATION.calender);
            dispatch(addSellingSelection());
          }}
          icon={({ focused }) => {
            return getDashboardData?.pendingOrders?.appointment_count ? (
              <View>
                <Image source={focused ? blueCalender : calendar} style={styles.iconStyle} />
                <View style={styles.countViewStyle}>
                  <Text style={styles.countTextStyle}>
                    {getDashboardData?.pendingOrders?.appointment_count}
                  </Text>
                </View>
              </View>
            ) : (
              <Image source={focused ? blueCalender : calendar} style={styles.iconStyle} />
            );
          }}
        />

        {/* <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'analytics' ? true : false}
          onPress={() => {
            setActive('analytics');
            navigate(NAVIGATION.analytics);
            dispatch(addSellingSelection());
          }}
          icon={({ focused, color, size }) => (
            <Image source={focused ? blueanalytics : analytics} style={styles.iconStyle} />
          )}
        /> */}

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'wallet' ? true : false}
          onPress={() => {
            setActive('wallet');
            navigate(NAVIGATION.wallet);
            dispatch(addSellingSelection());
          }}
          icon={({ focused }) => (
            <Image source={focused ? bluewallet : wallet} style={styles.iconStyle} />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'management' ? true : false}
          onPress={() => {
            setActive('management');
            dispatch(addSellingSelection());
            navigate(NAVIGATION.management);
          }}
          icon={({ focused }) => (
            <Image source={focused ? bluetray : tray} style={styles.iconStyle} />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'users' ? true : false}
          onPress={() => {
            setActive('users');
            navigate(NAVIGATION.customers);
            dispatch(addSellingSelection());
          }}
          icon={({ focused }) => (
            <Image source={focused ? blueusers : users} style={styles.iconStyle} />
          )}
        />
        {getUserData?.posLoginData?.user_roles.length === 0 && (
          <DrawerItem
            label={''}
            activeBackgroundColor={COLORS.transparent}
            focused={active === 'setting' ? true : false}
            onPress={() => {
              setActive('setting');
              navigate(NAVIGATION.setting);
              dispatch(addSellingSelection());
            }}
            icon={({ focused }) => (
              <Image
                source={focused ? blueSetting : settings}
                style={focused ? styles.iconStyle2 : styles.iconStyle}
              />
            )}
          />
        )}

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'analytics2' ? true : false}
          onPress={() => {
            setActive('analytics2');
            navigate(NAVIGATION.analytics2);
            dispatch(addSellingSelection());
          }}
          icon={({ focused }) => (
            <Image source={focused ? blueanalytics : analytics} style={styles.iconStyle} />
          )}
        />
      </ScrollView>
      {/* {getAuth?.merchantLoginData?.id === getUserData?.posLoginData?.id ? (
        <View style={styles.endSessionViewStyle}>
          <DrawerItem
            label={''}
            onPress={() => merchantEndSesion()}
            icon={({ focused, color, size }) => <Image source={power} style={styles.iconStyle} />}
          />
        </View>
      ) : null} */}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  endSessionViewStyle: {
    backgroundColor: COLORS.textInputBackground,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  contentContainerStyle: {
    alignItems: 'flex-start',
    left: 0,
    right: 10,
    width: SW(25),
    height: Platform.OS === 'android' ? windowHeight * 0.95 : windowHeight,
  },
  drawerMainView: {
    flex: 1,
    backgroundColor: COLORS.text,
    alignSelf: 'center',
  },
  iconStyle: {
    width: Platform.OS === 'android' ? SW(9) : SW(10),
    height: Platform.OS === 'android' ? SW(9) : SW(10),
    resizeMode: 'contain',
  },
  iconStyle2: {
    width: Platform.OS === 'android' ? SW(7) : SW(10),
    height: Platform.OS === 'android' ? SW(7) : SW(10),
    marginLeft: 3,
    resizeMode: 'contain',
  },
  iconStyle1: {
    width: Platform.OS === 'android' ? SW(11) : SW(10),
    height: Platform.OS === 'android' ? SW(11) : SW(10),
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
  countViewStyle: {
    width: ms(10),
    height: ms(10),
    borderRadius: ms(5),
    position: 'absolute',
    bottom: 0,
    right: -5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
    borderColor: COLORS.black,
    borderWidth: 1,
  },
  countTextStyle: {
    color: COLORS.dark_grey,
    fontSize: SF(8),
    fontFamily: Fonts.SemiBold,
  },
});
