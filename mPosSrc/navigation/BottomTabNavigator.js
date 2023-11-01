import React from 'react';
import {
  Text,
  View,
  Image,
  Platform,
  Animated,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import { CurvedBottomBar } from 'react-native-curved-bottom-bar';

import { Images } from '@mPOS/assets';
import { NAVIGATION } from '@mPOS/constants';
import { COLORS, Fonts, SF, SW } from '@/theme';
import { Cart, Home, More, Transactions } from '@mPOS/screens';

const BottomTabNavigator = () => {
  const _renderIcon = (routeName, selectedTab) => {
    if (routeName === NAVIGATION.home && selectedTab === NAVIGATION.home) {
      return (
        <View style={styles.renderIconView}>
          <Image
            accessibilityIgnoresInvertColors
            source={Images.home}
            style={[
              styles.iconStyle,
              {
                tintColor:
                  selectedTab === NAVIGATION.home ? COLORS.darkBlue : COLORS.placeholderText,
              },
            ]}
          />
          <Text
            style={[
              styles.routeNameText,
              {
                color: routeName === selectedTab ? COLORS.darkBlue : COLORS.text,
              },
            ]}
          >
            {routeName}
          </Text>
        </View>
      );
    } else if (routeName === NAVIGATION.home && selectedTab !== NAVIGATION.home) {
      return (
        <View style={styles.renderIconView}>
          <Image accessibilityIgnoresInvertColors source={Images.home} style={styles.iconStyle} />
          <Text
            style={[
              styles.routeNameText,
              {
                color: routeName === selectedTab ? COLORS.darkBlue : COLORS.placeholderText,
              },
            ]}
          >
            {routeName}
          </Text>
        </View>
      );
    } else if (routeName === NAVIGATION.cart && selectedTab !== NAVIGATION.cart) {
      return (
        <View style={styles.renderIconView}>
          <Image accessibilityIgnoresInvertColors source={Images.cart} style={[styles.iconStyle]} />
          <Text
            style={[
              styles.routeNameText,
              {
                color: routeName === selectedTab ? COLORS.darkBlue : COLORS.placeholderText,
              },
            ]}
          >
            {routeName}
          </Text>
        </View>
      );
    } else if (routeName === NAVIGATION.cart && selectedTab === NAVIGATION.cart) {
      return (
        <View style={styles.renderIconView}>
          <Image
            accessibilityIgnoresInvertColors
            source={Images.cart}
            style={[
              styles.iconStyle,
              {
                tintColor:
                  selectedTab === NAVIGATION.cart ? COLORS.darkBlue : COLORS.placeholderText,
              },
            ]}
          />
          <Text
            style={[
              styles.routeNameText,
              {
                color: routeName === selectedTab ? COLORS.darkBlue : COLORS.text,
              },
            ]}
          >
            {routeName}
          </Text>
        </View>
      );
    } else if (routeName === NAVIGATION.transactions && selectedTab === NAVIGATION.transactions) {
      return (
        <View style={styles.renderIconView}>
          <Image
            accessibilityIgnoresInvertColors
            source={Images.tabTranaction}
            style={[
              styles.iconStyle,
              {
                tintColor:
                  selectedTab === NAVIGATION.transactions
                    ? COLORS.darkBlue
                    : COLORS.placeholderText,
              },
            ]}
          />
          <Text
            style={[
              styles.routeNameText,
              {
                color: routeName === selectedTab ? COLORS.darkBlue : COLORS.text,
              },
            ]}
          >
            {routeName}
          </Text>
        </View>
      );
    } else if (routeName === NAVIGATION.transactions && selectedTab !== NAVIGATION.transactions) {
      return (
        <View style={styles.renderIconView}>
          <Image
            accessibilityIgnoresInvertColors
            source={Images.tabTranaction}
            style={styles.iconStyle}
          />
          <Text
            style={[
              styles.routeNameText,
              {
                color: routeName === selectedTab ? COLORS.darkBlue : COLORS.placeholderText,
              },
            ]}
          >
            {routeName}
          </Text>
        </View>
      );
    } else if (routeName === NAVIGATION.more && selectedTab === NAVIGATION.more) {
      return (
        <View style={styles.renderIconView}>
          <Image
            accessibilityIgnoresInvertColors
            source={Images.selectedMore}
            style={styles.iconStyle}
          />
          <Text
            style={[
              styles.routeNameText,
              {
                color: routeName === selectedTab ? COLORS.darkBlue : COLORS.text,
              },
            ]}
          >
            {routeName}
          </Text>
        </View>
      );
    } else if (routeName === NAVIGATION.more && selectedTab !== NAVIGATION.more) {
      return (
        <View style={styles.renderIconView}>
          <Image
            accessibilityIgnoresInvertColors
            source={Images.more}
            style={[styles.iconStyle, { tintColor: COLORS.placeholderText }]}
          />
          <Text
            style={[
              styles.routeNameText,
              {
                color: routeName === selectedTab ? COLORS.darkBlue : COLORS.placeholderText,
              },
            ]}
          >
            {routeName}
          </Text>
        </View>
      );
    }
  };

  const renderTabBar = ({ routeName, selectedTab, navigate }) => (
    <TouchableOpacity style={styles.renderTabTouchable} onPress={() => navigate(routeName)}>
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      {/* <NavigationContainer independent={true}> */}
      <CurvedBottomBar.Navigator
        height={55}
        circleWidth={55}
        strokeWidth={0.5}
        borderTopLeftRight
        tabBar={renderTabBar}
        backBehavior={'none'}
        bgColor={COLORS.white}
        strokeColor={'#DDDDDD'}
        initialRouteName={'Home'}
        screenOptions={{ headerShown: false }}
        renderCircle={() => (
          <Animated.View>
            <TouchableOpacity style={styles.btnCircleTouchable}>
              <Image
                source={Images.scan}
                accessibilityIgnoresInvertColors
                style={styles.circleButtonImage}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      >
        <CurvedBottomBar.Screen component={Home} position={'LEFT'} name={NAVIGATION.home} />
        <CurvedBottomBar.Screen position={'LEFT'} component={Cart} name={NAVIGATION.cart} />
        <CurvedBottomBar.Screen
          position={'RIGHT'}
          component={Transactions}
          name={NAVIGATION.transactions}
        />
        <CurvedBottomBar.Screen position={'RIGHT'} component={More} name={NAVIGATION.more} />
      </CurvedBottomBar.Navigator>
      {/* </NavigationContainer> */}
    </SafeAreaView>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  btnCircleTouchable: {
    flex: 1,
    bottom: Platform.OS === 'android' ? 20 : 30,
    justifyContent: 'center',
  },
  circleButtonImage: {
    bottom: 15,
    width: SW(90),
    height: SW(90),
  },
  iconStyle: {
    height: SW(24),
    width: SW(24),
    resizeMode: 'contain',
  },
  renderIconView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeNameText: {
    top: 5,
    fontSize: SF(9.5),
    textAlign: 'center',
    fontFamily: Fonts.MaisonMonoBold,
  },
});
