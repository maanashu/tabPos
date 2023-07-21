import React, { useEffect, useState } from 'react';
import {
  View,
  Alert,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';

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
  power,
  bluetray,
  blueCalender,
  blueSetting,
} from '@/assets';
import { COLORS, SF, SW } from '@/theme';
import { NAVIGATION } from '@/constants';
import { getUser } from '@/selectors/UserSelectors';
import { navigate } from '@/navigation/NavigationRef';
import { logoutFunction } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { logoutUserFunction } from '@/actions/UserActions';
import { getDashboard } from '@/selectors/DashboardSelector';
import { endTrackingSession } from '@/actions/CashTrackingAction';
import {
  addSellingSelection,
  getDrawerSessionSuccess,
} from '@/actions/DashboardAction';
import { cartScreenTrue, getUserDetailSuccess } from '@/actions/RetailAction';

const windowHeight = Dimensions.get('window').height;

export function DrawerNavigator(props) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getUserData = useSelector(getUser);
  const getDashboardData = useSelector(getDashboard);
  const getSessionObj = getDashboardData?.getSesssion;
  const selection = getDashboardData?.selection;

  const [active, setActive] = useState('dashBoard');

  const profileObj = {
    openingBalance: getSessionObj?.opening_balance,
    closeBalance: getSessionObj?.cash_balance,
    profile: getSessionObj?.seller_details?.user_profiles?.profile_photo,
    name: getSessionObj?.seller_details?.user_profiles?.firstname,
    id: getSessionObj?.id,
  };

  useEffect(() => {
    getSelectedOption();
  }, [selection]);

  const getSelectedOption = async () => {
    if (selection || selection !== undefined) {
      if (selection === 1) {
        setActive('posRetail');
      } else {
        setActive('delivery');
      }
    }
  };

  const merchantEndSesion = async () => {
    const data = {
      amount: parseInt(profileObj?.closeBalance),
      drawerId: profileObj?.id,
      transactionType: 'end_tracking_session',
      modeOfcash: 'cash_out',
    };

    const res = await dispatch(endTrackingSession(data));
    if (res?.type === 'END_TRACKING_SUCCESS') {
      dispatch(getDrawerSessionSuccess(null));
      logoutHandler();
    } else {
      alert('something went wrong');
    }
  };

  const logoutHandler = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutUserFunction());
          dispatch(logoutFunction());
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView
      {...props}
      vertical
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <ScrollView>
        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'dashBoard' ? true : false}
          onPress={() => {
            setActive('dashBoard');
            navigate(NAVIGATION.dashBoard);
            dispatch(addSellingSelection());
          }}
          icon={({ focused, color, size }) => (
            <Image
              style={styles.iconStyle}
              source={focused ? logo_icon : logo_icon}
            />
          )}
        />

        <DrawerItem
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
            <Image
              source={focused ? retail : greyRetail}
              style={styles.iconStyle}
            />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'delivery' ? true : false}
          onPress={() => {
            setActive('delivery');
            dispatch(addSellingSelection());
            navigate(NAVIGATION.deliveryOrder);
          }}
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? blueTruck : deliveryTruck}
              style={styles.iconStyle}
            />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'para' ? true : false}
          onPress={() => {
            setActive('para');
            dispatch(addSellingSelection());
            navigate(NAVIGATION.shippingOrder);
          }}
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? bluepara : parachuteBox}
              style={styles.iconStyle}
            />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'calender' ? true : false}
          onPress={() => {
            setActive('calender');
            navigate(NAVIGATION.calender);
            dispatch(addSellingSelection());
          }}
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? blueCalender : calendar}
              style={styles.iconStyle}
            />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'analytics' ? true : false}
          onPress={() => {
            setActive('analytics');
            navigate(NAVIGATION.analytics);
            dispatch(addSellingSelection());
          }}
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? blueanalytics : analytics}
              style={styles.iconStyle}
            />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'wallet' ? true : false}
          onPress={() => {
            setActive('wallet');
            navigate(NAVIGATION.wallet);
            dispatch(addSellingSelection());
          }}
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? bluewallet : wallet}
              style={styles.iconStyle}
            />
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
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? bluetray : tray}
              style={styles.iconStyle}
            />
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
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? blueusers : users}
              style={styles.iconStyle}
            />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'setting' ? true : false}
          onPress={() => {
            setActive('setting');
            navigate(NAVIGATION.setting);
            dispatch(addSellingSelection());
          }}
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? blueSetting : settings}
              style={focused ? styles.iconStyle2 : styles.iconStyle}
            />
          )}
        />

        <DrawerItem
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
            <Image
              source={focused ? retail : greyRetail}
              style={styles.iconStyle}
            />
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'shippingOrder2' ? true : false}
          onPress={() => {
            setActive('shippingOrder2');
            navigate(NAVIGATION.shippingOrder2);
            // dispatch(addSellingSelection());
            // dispatch(cartScreenTrue({ state: false }));
            // dispatch(getUserDetailSuccess([]));
          }}
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? bluepara : parachuteBox}
              style={styles.iconStyle}
            />
          )}
        />
        {/* <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'analytics2' ? true : false}
          onPress={() => {
            setActive('analytics2');
            navigate(NAVIGATION.analytics2);
            dispatch(addSellingSelection());
          }}
          icon={({ focused, color, size }) => (
            <Image
              source={focused ? blueanalytics : analytics}
              style={styles.iconStyle}
            />
          )}
        /> */}

        {getUserData?.posLoginData?.id !=
        getAuth?.merchantLoginData?.id ? null : (
          <View style={styles.endSessionViewStyle}>
            <DrawerItem
              label={''}
              onPress={() => merchantEndSesion()}
              icon={({ focused, color, size }) => (
                <Image source={power} style={styles.iconStyle} />
              )}
            />
          </View>
        )}
      </ScrollView>
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
});
