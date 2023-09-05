import React from 'react';
import { View, Text, Image, Platform, FlatList, Dimensions, TouchableOpacity } from 'react-native';

import { ms } from 'react-native-size-matters';

import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import { returnOrders } from '@/constants/flatListData';
import { clock, Fonts, pay, pin, rightIcon } from '@/assets';

import styles from '../ShippingOrder2.styles';

const Orders = ({
  height,
  openShippingOrders,
  ordersList,
  viewAllOrders,
  setViewAllOrders,
  setGetOrderDetail,
  renderOrderToReview,
  emptyComponent,
  setUserDetail,
  setOrderId,
}) => {
  const renderReturnOrders = ({ item, index }) => {
    const isSelected = viewAllOrders && item?.key === userDetail?.key;

    const handlePress = () => {
      setViewAllOrders(true);
      setUserDetail(item);
      setOrderId(item?.key);
    };

    const handleExpandPress = () => {
      setUserDetail(item);
      setViewAllOrders(true);
    };

    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          viewAllOrders
            ? [
                styles.showAllOrdersView,
                {
                  alignItems: 'center',
                  width:
                    Platform.OS === 'ios'
                      ? Dimensions.get('window').width / ms(1.1)
                      : Dimensions.get('window').width / ms(1.35),
                },
              ]
            : [styles.orderRowStyle, { alignItems: 'center' }],
          {
            backgroundColor: isSelected ? COLORS.textInputBackground : COLORS.transparent,
            borderColor: isSelected ? COLORS.primary : COLORS.blue_shade,
          },
        ]}
      >
        <Text
          style={[
            styles.nameTextStyle,
            { fontFamily: Fonts.SemiBold, textAlignVertical: 'center', paddingRight: 10 },
          ]}
        >
          {item?.id}
        </Text>
        <View style={[styles.orderDetailStyle, { left: 10 }]}>
          <Text numberOfLines={1} style={styles.nameTextStyle}>
            {item?.name}
          </Text>
          <View style={styles.locationViewStyle}>
            <Image source={pin} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.miles}</Text>
          </View>
        </View>

        <View style={[styles.orderDetailStyle, { left: 10, paddingHorizontal: 12 }]}>
          <Text style={styles.nameTextStyle}>{item?.items}</Text>
          <View style={styles.locationViewStyle}>
            <Image source={pay} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.price}</Text>
          </View>
        </View>

        <Image source={item?.userProfile} style={styles.userImageStyle} />
        <View
          style={[styles.orderDetailStyle, { width: Platform.OS === 'android' ? SW(38) : SW(25) }]}
        >
          <Text
            style={[styles.timeTextStyle, { fontFamily: Fonts.SemiBold, color: COLORS.solid_grey }]}
          >
            {item?.deliveryType}
          </Text>
          <View style={styles.locationViewStyle}>
            <Image source={clock} style={styles.pinImageStyle} />
            <Text style={styles.distanceTextStyle}>{item?.time}</Text>
          </View>
        </View>

        <View
          style={[styles.orderDetailStyle, { width: Platform.OS === 'android' ? SW(38) : SW(25) }]}
        >
          <Text
            style={[styles.timeTextStyle, { fontFamily: Fonts.Regular, color: COLORS.solid_grey }]}
          >
            {item?.returnWithin}
          </Text>
          <View style={styles.locationViewStyle}>
            <Image
              source={clock}
              style={[styles.pinImageStyle, { tintColor: COLORS.yellowTweet }]}
            />
            <Text style={[styles.distanceTextStyle, { color: COLORS.yellowTweet }]}>
              {item?.returnTime}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleExpandPress}
          style={[styles.orderDetailStyle, { width: SH(24) }]}
        >
          <Image source={rightIcon} style={styles.rightIconStyle} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.orderToReviewView, { height: height / 2.35, paddingBottom: ms(10) }]}>
      <View style={styles.headingRowStyle}>
        <Text style={styles.ordersToReviewText}>
          {openShippingOrders === '0'
            ? strings.shippingOrder.reviewOrders
            : openShippingOrders === '1'
            ? strings.shippingOrder.acceptedOrders
            : openShippingOrders === '2'
            ? strings.shippingOrder.prepareOrders
            : openShippingOrders === '3'
            ? 'Printing Labels'
            : openShippingOrders === '4'
            ? strings.orderStatus.shipOrder
            : openShippingOrders === '5'
            ? strings.orderStatus.deliveryOrder
            : openShippingOrders === '7,8'
            ? strings.orderStatus.cancelledOrder
            : strings.orderStatus.returnedOrders}
        </Text>

        {ordersList?.length > 0 || openShippingOrders === '9' ? (
          <TouchableOpacity
            onPress={() => {
              setViewAllOrders(true), setGetOrderDetail('ViewAllScreen');
            }}
            style={styles.viewAllButtonStyle}
          >
            <Text style={styles.viewallTextStyle}>{strings.reward.viewAll}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {openShippingOrders === '9' ? (
        <FlatList
          data={returnOrders}
          renderItem={renderReturnOrders}
          ListEmptyComponent={emptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEnabled={returnOrders?.length > 0 ? true : false}
          extraData={returnOrders}
        />
      ) : (
        <FlatList
          data={ordersList?.slice(0, 4)}
          renderItem={renderOrderToReview}
          ListEmptyComponent={emptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          scrollEnabled={ordersList?.length > 0 ? true : false}
          extraData={ordersList}
        />
      )}
    </View>
  );
};

export default Orders;
