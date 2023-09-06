import React, { memo } from 'react';
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { ms, verticalScale } from 'react-native-size-matters';

import { COLORS, SF, SW } from '@/theme';
import { statusCount } from './OrderCount';
import { Cart, Fonts, NoCard, ReturnTruck } from '@/assets';

const RightDrawer = ({ onPressDrawerHandler, openShippingOrders }) => {
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
          <Image source={item.image} style={[styles.sideBarImage, { tintColor: blueBackground }]} />
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
            source={item.image}
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
            source={item.image}
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
            source={item.image}
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
    <TouchableOpacity style={styles.drawerIconView} onPress={() => onPressDrawerHandler(item?.key)}>
      {showBadge(item)}
    </TouchableOpacity>
  );

  return (
    <View style={styles.rightSideView}>
      <FlatList
        data={statusCount}
        renderItem={renderDrawer}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

export default memo(RightDrawer);

const styles = StyleSheet.create({
  rightSideView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingVertical: verticalScale(6),
    alignItems: 'center',
    flex: 0.98,
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
});
