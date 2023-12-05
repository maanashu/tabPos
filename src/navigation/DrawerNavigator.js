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
  userImage,
} from '@/assets';
import { COLORS, SF, SW } from '@/theme';
import { NAVIGATION } from '@/constants';
import { getUser } from '@/selectors/UserSelectors';
import { navigate } from '@/navigation/NavigationRef';
import { getDashboard } from '@/selectors/DashboardSelector';
import { addSellingSelection } from '@/actions/DashboardAction';
import { Images } from '@/assets/new_icon';
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
        setActive('posRetail3');
      } else if (selection === 2) {
        setActive('deliveryOrders2');
      } else {
        setActive('dashBoard');
      }
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      bounces={false}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ width: '100%', left: -6 }}
      >
        <DrawerItem
          label={''}
          pressColor={COLORS.transparent}
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
                style={[styles.iconStyle(), { tintColor: COLORS.navy_blue }]}
                source={Images.jbrLogo}
              />
            </View>
          )}
        />
        <DrawerItem
          label={''}
          activeBackgroundColor={COLORS.transparent}
          focused={active === 'posRetail3' ? true : false}
          // onPress={() => {
          //   setActive('posRetail3');
          //   navigate(NAVIGATION.posRetail3);
          //   // dispatch(addSellingSelection());
          //   // dispatch(cartScreenTrue({ state: false }));
          //   // dispatch(getUserDetailSuccess([]));
          // }}
          icon={({ focused }) => (
            <View style={styles.iconBackgroud(focused)}>
              <Image
                source={focused ? userImage : userImage}
                style={[styles.iconStyle(focused), styles.iconStyleUser]}
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
            // dispatch(addSellingSelection());
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
          }}
          icon={({ focused }) => {
            return getDashboardData?.pendingOrders?.delivery_count ? (
              <View style={styles.iconBackgroud(focused)}>
                <View>
                  <Image
                    source={focused ? blueTruck : deliveryTruck}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.countViewStyle}>
                    <Text style={styles.countTextStyle}>
                      {getDashboardData?.pendingOrders?.delivery_count}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.iconBackgroud(focused)}>
                <Image
                  source={focused ? blueTruck : deliveryTruck}
                  style={styles.iconStyle(focused)}
                />
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
          }}
          icon={({ focused }) => {
            return getDashboardData?.pendingOrders?.shipping_count ? (
              <View style={styles.iconBackgroud(focused)}>
                <View>
                  <Image
                    source={focused ? bluepara : parachuteBox}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.countViewStyle}>
                    <Text style={styles.countTextStyle}>
                      {getDashboardData?.pendingOrders?.shipping_count}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.iconBackgroud(focused)}>
                <Image
                  source={focused ? bluepara : parachuteBox}
                  style={styles.iconStyle(focused)}
                />
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
                  <Image
                    source={focused ? blueCalender : calendar}
                    style={styles.iconStyle(focused)}
                  />
                  <View style={styles.countViewStyle}>
                    <Text style={styles.countTextStyle}>
                      {getDashboardData?.pendingOrders?.appointment_count}
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.iconBackgroud(focused)}>
                <Image
                  source={focused ? blueCalender : calendar}
                  style={styles.iconStyle(focused)}
                />
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
              <Image
                source={focused ? blueanalytics : analytics}
                style={styles.iconStyle(focused)}
              />
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
              <Image source={focused ? bluewallet : wallet} style={styles.iconStyle(focused)} />
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
              <Image source={focused ? bluetray : tray} style={styles.iconStyle(focused)} />
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
              <Image source={focused ? blueusers : users} style={styles.iconStyle(focused)} />
            </View>
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
              <View style={styles.iconBackgroud(focused)}>
                <Image
                  source={focused ? blueSetting : settings}
                  style={styles.iconStyle(focused)}
                />
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
      {/* {getAuth?.merchantLoginData?.id === getUserData?.posLoginData?.id ? (
        <View style={styles.endSessionViewStyle}>
          <DrawerItem
            label={''}
            onPress={() => merchantEndSesion()}
            icon={({ focused, color, size }) => <Image source={power} style={styles.iconStyle(focused)} />}
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
    // alignItems: 'flex-start',
    left: 0,
    right: 0,
    width: SW(25),
    // paddingVertical: ms(10),
    backgroundColor: COLORS.white,
    borderRadius: ms(60),
    flex: 1,
    marginVertical: ms(15),
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
    width: ms(20),
    height: ms(20),
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
    right: -10,
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
      padding: ms(5),
    };
  },
});
