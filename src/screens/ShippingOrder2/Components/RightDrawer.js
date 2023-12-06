import React, { memo, useMemo } from 'react';
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { useSelector } from 'react-redux';
import { ms, verticalScale } from 'react-native-size-matters';

import {
  Cart,
  Delivery,
  Fonts,
  Group,
  NoCard,
  ReturnTruck,
  backIcon,
  cross,
  crossButton,
  crossButton3,
  deliveryBack,
  deliveryClose,
  deliverySending,
  orderAccepted,
  orderPrepared,
  ordersReview,
  printingLabelDrawer,
  revnue,
  task,
  trackDelivery,
} from '@/assets';
import { COLORS, SF, SW, ShadowStyles } from '@/theme';
import { getShipping } from '@/selectors/ShippingSelector';
import { goBack } from '@/navigation/NavigationRef';
import { Spacer } from '@/components';
import { useState } from 'react';

const RightDrawer = ({ onPressDrawerHandler, openShippingOrders }) => {
  const shippingData = useSelector(getShipping);
  const orderStatusCountData = shippingData?.orderStatus;
  const [showFullSideMenu, setShowFullSideMenu] = useState(false);

  // console.log(JSON.stringify(orderStatusCountData), 'order drawer backend values');

  // const statusCount = useMemo(
  //   () => [
  //     {
  //       key: '0',
  //       image: task,
  //       title: 'Orders to Review',
  //       count: orderStatusCountData?.[0]?.count ?? '0',
  //     },
  //     // {
  //     //   key: '1',
  //     //   image: drawerdeliveryTruck,
  //     //   title: 'Accepted',
  //     //   count: orderStatusCountData?.[1]?.count ?? '0',
  //     // },
  //     // {
  //     //   key: '2',
  //     //   image: timer,
  //     //   title: 'Order Preparing ',
  //     //   count: orderStatusCountData?.[2]?.count ?? '0',
  //     // },
  //     {
  //       key: '3',
  //       image: Group,
  //       title: 'Printing Label',
  //       count: orderStatusCountData?.[3]?.count ?? '0',
  //     },
  //     {
  //       key: '4',
  //       image: Delivery,
  //       title: 'Shipped',
  //       count: orderStatusCountData?.[4]?.count ?? '0',
  //     },
  //     {
  //       key: '5',
  //       image: Cart,
  //       title: 'Delivered',
  //       count: orderStatusCountData?.[6]?.count ?? '0',
  //     },
  //     {
  //       key: '7,8',
  //       image: NoCard,
  //       title: 'Rejected/Cancelled',
  //       count: orderStatusCountData?.[6]?.count ?? '0',
  //     },
  //     {
  //       key: '9',
  //       image: ReturnTruck,
  //       title: 'Returned',
  //       count: orderStatusCountData?.[8]?.count ?? '0',
  //     },
  //   ],
  //   [orderStatusCountData]
  // );

  const handleShowMenu = () => {
    setShowFullSideMenu(!showFullSideMenu);
  };

  const statusCountNew = useMemo(
    () => [
      {
        key: '0',
        image: ordersReview,
        title: 'Orders to Review',
        count: orderStatusCountData?.[0]?.count ?? '0',
      },
      {
        key: '1',
        image: orderAccepted,
        title: 'Orders Accepted',
        count: orderStatusCountData?.[1]?.count ?? '0',
      },
      {
        key: '2',
        image: orderPrepared,
        title: 'Order Preparing ',
        count: orderStatusCountData?.[2]?.count ?? '0',
      },
      {
        key: '3',
        image: printingLabelDrawer,
        title: 'Printing Label',
        count: orderStatusCountData?.[3]?.count ?? '0',
      },
      {
        key: '4',
        image: trackDelivery,
        title: 'Track Delivery',
        count: orderStatusCountData?.[4]?.count ?? '0',
      },
      {
        key: '5',
        image: deliverySending,
        title: 'Delivered',
        count: orderStatusCountData?.[5]?.count ?? '0',
      },
      {
        key: '7,8',
        image: deliveryClose,
        title: 'Rejected/Cancelled',
        count: orderStatusCountData?.[6]?.count ?? '0',
      },
      {
        key: '9',
        image: deliveryBack,
        title: 'Returned',
        count: orderStatusCountData?.[7]?.count ?? '0',
      },
    ],
    [orderStatusCountData]
  );

  const showBadge = (item) => {
    const blueBackground = openShippingOrders === item?.key ? COLORS.primary : COLORS.darkGray;

    const rejectedBackground =
      item?.title === 'Rejected/Cancelled' && openShippingOrders === item?.key
        ? COLORS.pink
        : COLORS.darkGray;

    const returnedbackground =
      item?.title === 'Returned' && openShippingOrders === item?.key
        ? COLORS.yellowTweet
        : COLORS.darkGray;

    if (item?.image === Cart) {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[styles.sideBarImage]}
            // style={[styles.sideBarImage, { tintColor: blueBackground }]}
          />
          {/* <View
            style={[
              styles.bucketBadge,
              { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
            ]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View> */}
        </View>
      );
    } else if (item?.image === NoCard) {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[styles.sideBarImage]}
            // style={[styles.sideBarImage, { tintColor: rejectedBackground }]}
          />
          {/* <View
            style={[styles.bucketBadge, { backgroundColor: COLORS.pink, borderColor: COLORS.pink }]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View> */}
        </View>
      );
    } else if (item?.image === ReturnTruck) {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[styles.sideBarImage]}
            //style={[styles.sideBarImage, { tintColor: returnedbackground }]}
          />
          {/* <View
            style={[
              styles.bucketBadge,
              {
                backgroundColor: COLORS.yellowTweet,
                borderColor: COLORS.yellowTweet,
              },
            ]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View> */}
        </View>
      );
    } else {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[
              styles.sideBarImage,
              // {
              //   tintColor:
              //     openShippingOrders === item?.key
              //       ? COLORS.primary
              //       : item?.title === 'Rejected/Cancelled' && openShippingOrders === item?.key
              //       ? COLORS.pink
              //       : item?.title === 'Returned' && openShippingOrders === item?.key
              //       ? COLORS.yellowTweet
              //       : COLORS.darkGray,
              // },
            ]}
          />
          {/* <View
            style={[
              styles.bucketBadge,
              {
                backgroundColor: COLORS.white,
                borderColor: openShippingOrders === item?.key ? COLORS.primary : COLORS.darkGray,
                borderWidth: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.badgetext,
                { color: openShippingOrders === item?.key ? COLORS.primary : COLORS.darkGray },
              ]}
            >
              {item?.count}
            </Text>
          </View> */}
        </View>
      );
    }
  };

  const renderDrawer = ({ item }) => (
    <TouchableOpacity
      disabled={item?.count > 0 ? false : true}
      style={[styles.drawerIconView]}
      onPress={() => onPressDrawerHandler(item?.key)}
    >
      {showBadge(item)}
    </TouchableOpacity>
  );

  const renderHeaderDrawer = () => (
    <View
      style={[
        styles.bucketBackgorund,
        showFullSideMenu && { width: ms(100), height: ms(30), borderRadius: 0 },
      ]}
    >
      <Spacer space={ms(20)} />
      {showFullSideMenu ? (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.light_sky,
            // justifyContent: 'space-evenly',
            paddingHorizontal: ms(6),
            alignItems: 'center',
            height: '100%',
            borderRadius: ms(20),
            width: '100%',
          }}
          onPress={handleShowMenu}
        >
          <Image
            source={crossButton}
            style={[styles.backImageStyle, { tintColor: COLORS.primaryDark }]}
          />
          <Text
            style={{
              color: COLORS.navy_blue,
              fontSize: SF(14),
              fontFamily: Fonts.Medium,
              marginLeft: ms(4),
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
    if (item?.image === deliverySending) {
      return (
        <View style={styles.fullRenderContainer}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: ms(6),
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
    } else if (item?.image === deliveryClose) {
      return (
        <View style={styles.fullRenderContainer}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: ms(6),
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
    } else if (item?.image === deliveryBack) {
      return (
        <View style={styles.fullRenderContainer}>
          <View
            style={{
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: ms(6),
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
              marginVertical: ms(6),
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
      style={[{ marginVertical: ms(2) }]}
      onPress={() => {
        onPressDrawerHandler(item?.key);
        setShowFullSideMenu(false);
      }}
    >
      {showBadgeFull(item)}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.rightSideView, showFullSideMenu && styles.fullSideModal]}>
      <FlatList
        data={statusCountNew}
        ListHeaderComponent={renderHeaderDrawer}
        renderItem={showFullSideMenu ? renderDrawerFull : renderDrawer}
        keyExtractor={(item) => item?.key?.toString()}
        contentContainerStyle={{
          paddingVertical: verticalScale(8),
        }}
      />
    </View>
  );
};

export default memo(RightDrawer);

const styles = StyleSheet.create({
  rightSideView: {
    backgroundColor: COLORS.white,
    borderRadius: ms(30),
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    // flex: 0.98,
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
    width: ms(18),
    height: ms(18),
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
    width: ms(190),
    position: 'absolute',
    right: ms(0),
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: ms(15),
    ...ShadowStyles.shadow,
    paddingTop: ms(10),
  },
});
