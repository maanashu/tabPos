import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { Fonts, userImage, newUsers, powerAuth } from '@/assets';
import { COLORS, SF, SW } from '@/theme';
import { NAVIGATION } from '@/constants';
import { getUser } from '@/selectors/UserSelectors';
import { navigate } from '@/navigation/NavigationRef';
import { getDashboard } from '@/selectors/DashboardSelector';
import { Images } from '@/assets/new_icon';
import { ADMIN } from '@/utils/GlobalMethods';
const windowHeight = Dimensions.get('window').height;
import { logoutFunction } from '@/actions/AuthActions';
import { logoutUserFunction } from '@/actions/UserActions';
import { endTrackingSession, getDrawerSessions } from '@/actions/CashTrackingAction';
import { addSellingSelection, getDrawerSessionSuccess } from '@/actions/DashboardAction';

export function DrawerNavigator(props) {
  const dispatch = useDispatch();
  const getUserData = useSelector(getUser);
  const getDashboardData = useSelector(getDashboard);
  const selection = getDashboardData?.selection;
  const [active, setActive] = useState('dashBoard');
  const getPosUser = getUserData?.posLoginData;
  const getSessionObj = getDashboardData?.getSesssion;

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
      if (selection === 0) {
        setActive('dashBoard');
      } else if (selection === 1) {
        setActive('posRetail3');
      } else if (selection === 2) {
        setActive('deliveryOrders2');
      } else if (selection === 3) {
        setActive('shippingOrder2');
      }
    }
  };
  const onPressLogoutHandler = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          const data = {
            amount: parseInt(profileObj?.closeBalance),
            drawerId: profileObj?.id,
            transactionType: 'end_tracking_session',
            modeOfcash: 'cash_out',
          };
          console.log('data', data);
          const res = await dispatch(endTrackingSession(data));
          if (res?.type === 'END_TRACKING_SUCCESS') {
            // dispatch(getDrawerSessionSuccess(null));
            // dispatch(logoutUserFunction());
            dispatch(logoutFunction());
          } else {
            alert('something went wrong');
          }
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      bounces={false}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={{ width: '100%' }}>
        <DrawerItem
          label={''}
          pressColor={COLORS.transparent}
          activeBackgroundColor={COLORS.transparent}
          // focused={active === 'dashBoard' ? true : false}
          // onPress={() => {
          //   setActive('dashBoard');
          //   navigate(NAVIGATION.dashBoard);
          //   dispatch(addSellingSelection());
          // }}
          icon={({ focused }) => (
            <View style={styles.iconBackgroud()}>
              <Image
                style={[styles.iconStyle(), { tintColor: COLORS.navy_blue }]}
                source={Images.jbrLogo}
              />
            </View>
          )}
        />
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
            <View style={styles.iconBackgroud()}>
              <Image
                // source={focused ? userImage : userImage}
                source={
                  getPosUser?.user_profiles?.profile_photo
                    ? { uri: getPosUser?.user_profiles?.profile_photo }
                    : userImage
                }
                style={[styles.iconStyleUser]}
              />
            </View>
          )}
        />

        <DrawerItem
          label={''}
          // pressColor={COLORS.transparent}
          // pressOpacity={0}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'posRetail3' ? true : false}
          onPress={() => {
            setActive('posRetail3');
            navigate(NAVIGATION.posRetail3);
            dispatch(addSellingSelection());
            // dispatch(cartScreenTrue({ state: false }));
            // dispatch(getUserDetailSuccess([]));
          }}
          icon={({ focused }) => (
            <View style={styles.iconBackgroud(focused)}>
              <Image source={Images.retailIcon} style={styles.iconStyle(focused)} />
            </View>
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'deliveryOrders2' ? true : false}
          onPress={() => {
            setActive('deliveryOrders2');
            navigate(NAVIGATION.deliveryOrders2);
            dispatch(addSellingSelection());
          }}
          icon={({ focused }) => {
            return getDashboardData?.pendingOrders?.delivery_count ? (
              <View style={styles.iconBackgroud(focused)}>
                <View>
                  <Image source={Images.deliverySideIcon} style={styles.iconStyle(focused)} />
                  <View style={styles.countViewStyle}>
                    <Text style={styles.countTextStyle}>
                      {getDashboardData?.pendingOrders?.delivery_count}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.iconBackgroud(focused)}>
                <Image source={Images.deliverySideIcon} style={styles.iconStyle(focused)} />
              </View>
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
            dispatch(addSellingSelection());
          }}
          icon={({ focused }) => {
            return getDashboardData?.pendingOrders?.shipping_count ? (
              <View style={styles.iconBackgroud(focused)}>
                <View>
                  <Image source={Images.shippingSideIcon} style={styles.iconStyle(focused)} />
                  <View style={styles.countViewStyle}>
                    <Text style={styles.countTextStyle}>
                      {getDashboardData?.pendingOrders?.shipping_count}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.iconBackgroud(focused)}>
                <Image source={Images.shippingSideIcon} style={styles.iconStyle(focused)} />
              </View>
            );
          }}
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
          icon={({ focused }) => {
            return getDashboardData?.pendingOrders?.appointment_count ? (
              <View style={styles.iconBackgroud(focused)}>
                <View>
                  <Image source={Images.calendarSideIcon} style={styles.iconStyle(focused)} />
                  <View style={styles.countViewStyle}>
                    <Text style={styles.countTextStyle}>
                      {getDashboardData?.pendingOrders?.appointment_count}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.iconBackgroud(focused)}>
                <Image source={Images.calendarSideIcon} style={styles.iconStyle(focused)} />
              </View>
            );
          }}
        />

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
            <View style={styles.iconBackgroud(focused)}>
              <Image source={Images.analyticsSideIcon} style={styles.iconStyle(focused)} />
            </View>
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'wallet2' ? true : false}
          onPress={() => {
            setActive('wallet2');
            navigate(NAVIGATION.wallet2);
          }}
          icon={({ focused }) => (
            <View style={styles.iconBackgroud(focused)}>
              <Image source={Images.walletIcon} style={styles.iconStyle(focused)} />
            </View>
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
            <View style={styles.iconBackgroud(focused)}>
              <Image source={Images.cashTrackingSideIcon} style={styles.iconStyle(focused)} />
            </View>
          )}
        />

        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'customers2' ? true : false}
          onPress={() => {
            setActive('customers2');
            navigate(NAVIGATION.customers2);
            dispatch(addSellingSelection());
          }}
          icon={({ focused }) => (
            <View style={styles.iconBackgroud(focused)}>
              <Image source={newUsers} style={styles.iconStyle(focused)} />
            </View>
          )}
        />

        {ADMIN()?.length > 0 && (
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
              <View style={styles.iconBackgroud(focused)}>
                <Image source={Images.settingIcon} style={styles.iconStyle(focused)} />
              </View>
            )}
          />
        )}

        {/* <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'refund' ? true : false}
          onPress={() => {
            setActive('refund');
            navigate(NAVIGATION.refund);
          }}
          icon={({ focused }) => (
            <Image source={focused ? blueusers : users} style={styles.iconStyle(focused)} />
          )}
        /> */}
      </ScrollView>
      {ADMIN()?.length > 0 && (
        <View style={styles.endSessionViewStyle}>
          <DrawerItem
            label={''}
            onPress={() => onPressLogoutHandler()}
            icon={({ focused, color, size }) => (
              <Image
                source={powerAuth}
                style={{
                  marginRight: ms(10),
                  marginTop: ms(2),
                  width: ms(13),
                  height: ms(13),
                  tintColor: COLORS.navy_blue,
                }}
              />
            )}
          />
        </View>
      )}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  endSessionViewStyle: {
    backgroundColor: COLORS.textInputBackground,
    position: 'absolute',
    left: 10,
    bottom: 5,
    width: ms(30),
    height: ms(30),
    borderRadius: ms(50),
  },
  contentContainerStyle: {
    // alignItems: 'flex-start',
    left: 0,
    right: 0,
    width: SW(25),
    // paddingVertical: ms(10),
    backgroundColor: COLORS.white,
    borderRadius: ms(60),
    flex: 1,
    marginVertical: ms(10),
  },
  drawerMainView: {
    flex: 1,
    backgroundColor: COLORS.text,
    alignSelf: 'center',
  },
  iconStyle: (focused) => {
    return {
      width: ms(16),
      height: ms(16),
      resizeMode: 'contain',
      // left: ms(2),
      tintColor: focused ? COLORS.navy_blue : COLORS.light_blue2,
    };
  },
  iconStyleUser: {
    width: ms(22),
    height: ms(22),
    borderRadius: ms(25),
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
    bottom: -2,
    right: -5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
    borderColor: COLORS.light_blue2,
    borderWidth: 1,
  },
  countTextStyle: {
    color: COLORS.light_blue2,
    fontSize: SF(8),
    fontFamily: Fonts.SemiBold,
  },
  iconBackgroud: (focused) => {
    return {
      borderRadius: ms(7),
      backgroundColor: focused ? COLORS.textInputBackground : 'transparent',
      paddingHorizontal: ms(5),
      paddingVertical: ms(3),
      left: Platform.OS === 'ios' ? ms(-4) : ms(2.3),
    };
  },
});
