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
  revnue,
  task,
} from '@/assets';
import { COLORS, SF, SW } from '@/theme';
import { getShipping } from '@/selectors/ShippingSelector';
import { goBack } from '@/navigation/NavigationRef';
import { Spacer } from '@/components';

const RightDrawer = ({ onPressDrawerHandler, openShippingOrders }) => {
  const shippingData = useSelector(getShipping);
  const orderStatusCountData = shippingData?.orderStatus;

  const statusCount = useMemo(
    () => [
      {
        key: '0',
        image: task,
        title: 'Orders to Review',
        count: orderStatusCountData?.[0]?.count ?? '0',
      },
      // {
      //   key: '1',
      //   image: drawerdeliveryTruck,
      //   title: 'Accepted',
      //   count: orderStatusCountData?.[1]?.count ?? '0',
      // },
      // {
      //   key: '2',
      //   image: timer,
      //   title: 'Order Preparing ',
      //   count: orderStatusCountData?.[2]?.count ?? '0',
      // },
      {
        key: '3',
        image: Group,
        title: 'Printing Label',
        count: orderStatusCountData?.[3]?.count ?? '0',
      },
      {
        key: '4',
        image: Delivery,
        title: 'Shipped',
        count: orderStatusCountData?.[4]?.count ?? '0',
      },
      {
        key: '5',
        image: Cart,
        title: 'Delivered',
        count: orderStatusCountData?.[6]?.count ?? '0',
      },
      {
        key: '7,8',
        image: NoCard,
        title: 'Rejected/Cancelled',
        count: orderStatusCountData?.[6]?.count ?? '0',
      },
      {
        key: '9',
        image: ReturnTruck,
        title: 'Returned',
        count: orderStatusCountData?.[8]?.count ?? '0',
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
            style={[styles.sideBarImage, { tintColor: blueBackground }]}
          />
          <View
            style={[
              styles.bucketBadge,
              { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
            ]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View>
        </View>
      );
    } else if (item?.image === NoCard) {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[styles.sideBarImage, { tintColor: rejectedBackground }]}
          />
          <View
            style={[styles.bucketBadge, { backgroundColor: COLORS.pink, borderColor: COLORS.pink }]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View>
        </View>
      );
    } else if (item?.image === ReturnTruck) {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[styles.sideBarImage, { tintColor: returnedbackground }]}
          />
          <View
            style={[
              styles.bucketBadge,
              {
                backgroundColor: COLORS.yellowTweet,
                borderColor: COLORS.yellowTweet,
              },
            ]}
          >
            <Text style={[styles.badgetext, { color: COLORS.white }]}>{item?.count}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.bucketBackgorund}>
          <Image
            source={item?.image}
            style={[
              styles.sideBarImage,
              {
                tintColor:
                  openShippingOrders === item?.key
                    ? COLORS.primary
                    : item?.title === 'Rejected/Cancelled' && openShippingOrders === item?.key
                    ? COLORS.pink
                    : item?.title === 'Returned' && openShippingOrders === item?.key
                    ? COLORS.yellowTweet
                    : COLORS.darkGray,
              },
            ]}
          />
          <View
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
          </View>
        </View>
      );
    }
  };

  const renderDrawer = ({ item }) => (
    <TouchableOpacity
      disabled={item?.count > 0 ? false : true}
      style={styles.drawerIconView}
      onPress={() => onPressDrawerHandler(item?.key)}
    >
      {showBadge(item)}
    </TouchableOpacity>
  );

  return (
    <View style={styles.rightSideView}>
      <FlatList
        data={statusCount}
        renderItem={renderDrawer}
        keyExtractor={(item) => item?.key?.toString()}
      />
      {/* <Spacer space={ms(10)} />
      <TouchableOpacity onPress={() => goBack()}>
        <Image source={backIcon} style={styles.backImageStyle} />
      </TouchableOpacity>

      <Spacer space={ms(30)} />
      <TouchableOpacity
        // disabled={getPosUser?.user_roles?.length > 0 ? true : false}
        // onPress={() => setselectedScreen('Revenue')}
        style={[styles.bucketBackgorund]}
      >
        <Image source={revnue} style={[styles.sideBarImage]} />
      </TouchableOpacity>

      <Spacer space={ms(2)} />

      <TouchableOpacity
        // disabled={getPosUser?.user_roles?.length > 0 ? true : false}
        // onPress={() => setselectedScreen('Revenue')}
        style={[styles.bucketBackgorund]}
      >
        <Image source={revnue} style={[styles.sideBarImage]} />
      </TouchableOpacity>
      <Spacer space={ms(2)} />
      <TouchableOpacity
        // disabled={getPosUser?.user_roles?.length > 0 ? true : false}
        // onPress={() => setselectedScreen('Revenue')}
        style={[styles.bucketBackgorund]}
      >
        <Image source={revnue} style={[styles.sideBarImage]} />
      </TouchableOpacity>

      <Spacer space={ms(2)} />
      <TouchableOpacity style={[styles.bucketBackgorund]}>
        <Image source={revnue} style={[styles.sideBarImage]} />
      </TouchableOpacity> */}
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
    //flex: 0.98,
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
    width: ms(10),
    height: ms(10),
    resizeMode: 'contain',
    // top: ms(-2),
  },
});
