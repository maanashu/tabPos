import React, { memo } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useSelector } from 'react-redux';
import { ms, verticalScale } from 'react-native-size-matters';

import {
  task,
  timer,
  NoCard,
  returnShipping,
  deliveryDriver,
  deliveryShipping,
  deliveryorderProducts,
  RightReturn,
  CrossRight,
  TiltRight,
  BikeRight,
  ClockRight,
  PickupRight,
  TickRight,
  RightSide,
  Maximize,
  backIcon,
  crossButton,
} from '@/assets';
import { COLORS, Fonts, SF, ShadowStyles, SW } from '@/theme';
import { strings } from '@/localization';
import { getDelivery } from '@/selectors/DeliverySelector';
import { useState } from 'react';
import { Spacer } from '@/components';
import { Text } from 'react-native';
import FastImage from 'react-native-fast-image';
const { width, height } = Dimensions.get('window');

const RightSideBar = ({ renderDrawer, viewAllOrder, fullDrawerPress }) => {
  const getDeliveryData = useSelector(getDelivery);
  const [showFullSideMenu, setShowFullSideMenu] = useState(false);

  const deliveryDrawer = [
    {
      key: '0',
      image: TickRight,
      title: strings.orderStatus.reviewOrders,
      count: getDeliveryData?.getOrderCount?.[0]?.count ?? 0,
      tintColor: COLORS.lavender,
    },
    {
      key: '1',
      image: RightSide,
      title: strings.calender.approved,
      count: getDeliveryData?.getOrderCount?.[1]?.count ?? 0,
      tintColor: COLORS.navy_blue,
    },
    {
      key: '2',
      image: ClockRight,
      title: strings.deliveryOrders.orderPrepare,
      count: getDeliveryData?.getOrderCount?.[2]?.count ?? 0,
      tintColor: COLORS.navy_blue,
    },
    {
      key: '3',
      image: BikeRight,
      title: strings.deliveryOrders.readyToPickup,
      count: getDeliveryData?.getOrderCount?.[3]?.count ?? 0,
      tintColor: COLORS.navy_blue,
    },
    {
      key: '4',
      image: PickupRight,
      title: strings.deliveryOrders2.pickedUp,
      count: getDeliveryData?.getOrderCount?.[4]?.count ?? 0,
      tintColor: COLORS.navy_blue,
    },
    {
      key: '5',
      image: TiltRight,
      title: strings.deliveryOrders.delivered,
      count: getDeliveryData?.getOrderCount?.[5]?.count ?? 0,
      tintColor: COLORS.purple,
    },
    {
      key: '7,8',
      image: CrossRight,
      title: strings.deliveryOrders.rejected,
      count:
        parseInt(getDeliveryData?.getOrderCount?.[7]?.count) +
          parseInt(getDeliveryData?.getOrderCount?.[8]?.count) ?? 0,
      tintColor: COLORS.bright_red,
    },
    {
      key: '9',
      image: RightReturn,
      title: strings.deliveryOrders2.returned,
      count: getDeliveryData?.getOrderCount?.[9]?.count ?? 0,
      tintColor: COLORS.orange_bright,
    },
  ];
  const handleShowMenu = () => {
    setShowFullSideMenu(!showFullSideMenu);
  };
  const renderHeaderDrawer = () => (
    <View
      style={[
        styles.bucketBackgorund,
        showFullSideMenu && { width: ms(100), height: ms(30), borderRadius: 0, marginTop: ms(10) },
      ]}
    >
      <Spacer space={ms(20)} />
      {showFullSideMenu ? (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.light_sky,
            // justifyContent: 'space-around',
            alignItems: 'center',
            height: '95%',
            borderRadius: ms(20),
            width: '90%',
            marginBottom: ms(4),
            paddingHorizontal: ms(6),
          }}
          onPress={handleShowMenu}
        >
          <FastImage
            source={crossButton}
            style={[styles.backImageStyle, { tintColor: COLORS.primaryDark }]}
          />
          <Text
            style={{
              color: COLORS.navy_blue,
              fontSize: SF(14),
              fontFamily: Fonts.MaisonRegular,
              marginLeft: ms(6),
            }}
          >
            Collapse
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleShowMenu}>
          <Image source={backIcon} style={styles.backImageStyle} />
        </TouchableOpacity>
      )}

      <Spacer space={ms(30)} />
    </View>
  );
  const showBadgeFull = (item) => {
    if (item?.title === strings.deliveryOrders.delivered) {
      return (
        <View style={styles.fullRenderContainer}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: ms(4),
            }}
          >
            <Image source={item?.image} style={[styles.sideBarImage]} />
          </View>
          <View
            style={{
              width: '85%',
              padding: ms(2),
            }}
          >
            <Text style={[styles.iconTitleFull, { color: COLORS.purple }]}>{item?.title}</Text>
            <View style={[styles.countContainer, { backgroundColor: COLORS.tip_back }]}>
              <View style={[styles.dotStyle, { backgroundColor: COLORS.medium_purple }]}></View>
              <Text style={[styles.countTextStyle, { color: COLORS.purple }]}>{item?.count}</Text>
            </View>
          </View>
        </View>
      );
    } else if (item?.title === strings.deliveryOrders.rejected) {
      return (
        <View style={styles.fullRenderContainer}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              // marginVertical: ms(4),
            }}
          >
            <Image source={item?.image} style={[styles.sideBarImage]} />
          </View>
          <View
            style={{
              width: '85%',
              padding: ms(2),
            }}
          >
            <Text style={[styles.iconTitleFull, { color: COLORS.alert_red }]}>{item?.title}</Text>
            <View style={[styles.countContainer, { backgroundColor: COLORS.light_red }]}>
              <View style={[styles.dotStyle, { backgroundColor: COLORS.blur_red }]}></View>
              <Text style={[styles.countTextStyle, { color: COLORS.alert_red }]}>
                {item?.count}
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (item?.title === strings.deliveryOrders2.returned) {
      return (
        <View style={styles.fullRenderContainer}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: ms(4),
            }}
          >
            <Image source={item?.image} style={[styles.sideBarImage]} />
          </View>
          <View
            style={{
              width: '85%',
              padding: ms(2),
            }}
          >
            <Text style={[styles.iconTitleFull, { color: COLORS.extraYellow }]}>{item?.title}</Text>
            <View style={[styles.countContainer, { backgroundColor: COLORS.light_yellow }]}>
              <View style={[styles.dotStyle, { backgroundColor: COLORS.medium_yellow }]}></View>
              <Text style={[styles.countTextStyle, { color: COLORS.extraYellow }]}>
                {item?.count}
              </Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.fullRenderContainer}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: ms(4),
            }}
          >
            <Image source={item?.image} style={[styles.sideBarImage]} />
          </View>
          <View
            style={{
              width: '85%',
              padding: ms(2),
            }}
          >
            <Text style={styles.iconTitleFull}>{item?.title}</Text>
            <View style={styles.countContainer}>
              <View style={styles.dotStyle}></View>
              <Text style={styles.countTextStyle}>{item?.count}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  const renderDrawerFull = ({ item }) => (
    <TouchableOpacity
      disabled={item?.count > 0 ? false : true}
      style={[{ marginVertical: ms(3) }]}
      onPress={() =>
        // onPressDrawerHandler(item?.key)
        {
          fullDrawerPress(item);
          handleShowMenu();
        }
      }
    >
      {showBadgeFull(item)}
    </TouchableOpacity>
  );
  return (
    // <View
    //   style={[
    //     styles.rightSideView,
    //     // {
    //     //   height: viewAllOrder ? height - 80 : height - 50,
    //     // },
    //   ]}
    // >
    <View style={[styles.rightSideView, showFullSideMenu && styles.fullSideModal]}>
      <FlatList
        scrollEnabled={false}
        data={deliveryDrawer}
        ListHeaderComponent={renderHeaderDrawer}
        renderItem={showFullSideMenu ? renderDrawerFull : renderDrawer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.key.toString()}
        contentContainerStyle={{
          // height: viewAllOrder ? height - 80 : height - 35,
          paddingVertical: verticalScale(8),
        }}
      />
    </View>
  );
};

export default memo(RightSideBar);

const styles = StyleSheet.create({
  rightSideView: {
    borderRadius: ms(30),
    alignItems: 'center',
    width: width * 0.06,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(8),
  },
  drawerIconView: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 5,
    marginVertical: 6,
    width: SW(15),
    height: SW(15),
    borderRadius: 5,
    justifyContent: 'center',
  },
  bucketBackgorund: {
    width: SW(17),
    height: SW(17),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bucketBadge: {
    width: ms(13),
    height: ms(13),
    borderRadius: ms(10),
    position: 'absolute',
    right: 5,
    bottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgetext: {
    color: COLORS.dark_grey,
    fontSize: SF(11),
    fontFamily: Fonts.SemiBold,
  },
  sideBarImage: {
    width: ms(22),
    height: ms(22),
    resizeMode: 'contain',
  },
  backImageStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
    // top: ms(-2),
  },
  fullRenderContainer: {
    flexDirection: 'row',
  },
  countContainer: {
    backgroundColor: COLORS.sky_grey,
    borderRadius: ms(9),
    paddingHorizontal: ms(4),
    paddingVertical: ms(2),
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },

  dotStyle: {
    height: ms(6),
    width: ms(6),
    backgroundColor: COLORS.blue2,
    borderRadius: ms(3),
    marginEnd: ms(5),
  },
  iconTitleFull: {
    color: '#7E8AC1',
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
  },
  countTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(8),
    color: COLORS.textBlue,
  },
  fullSideModal: {
    width: ms(200),
    position: 'absolute',
    right: ms(0),
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    paddingStart: ms(10),
    ...ShadowStyles.shadow,
  },
});
