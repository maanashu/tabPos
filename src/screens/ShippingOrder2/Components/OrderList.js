import React, { memo, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { getDelivery } from '@/selectors/DeliverySelector';
import { clock, Fonts, pay, pin, rightIcon } from '@/assets';
import moment from 'moment';

const OrderList = ({ selectedStatus, onViewAllHandler, selectedOrderDetail }) => {
  const getOrdersData = useSelector(getDelivery);
  const ordersList = getOrdersData?.getReviewDef;
  const [orderId, setOrderId] = useState(ordersList?.[0]?.id ?? '');

  const renderOrderToReview = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        onViewAllHandler(item?.id);
        setOrderId(item?.id);
        selectedOrderDetail(item);
      }}
      style={[
        styles.orderRowStyle,
        {
          backgroundColor: item?.id === orderId ? COLORS.textInputBackground : COLORS.transparent,
          borderColor: item?.id === orderId ? COLORS.primary : COLORS.blue_shade,
        },
      ]}
    >
      <View style={styles.orderDetailStyle}>
        <Text style={styles.nameTextStyle}>{item?.user_details?.firstname ?? '-'}</Text>
        <View style={styles.locationViewStyle}>
          <Image source={pin} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>{item?.distance ?? '-'}</Text>
        </View>
      </View>

      <View style={[styles.orderDetailStyle, { paddingHorizontal: 2 }]}>
        <Text style={styles.nameTextStyle}>
          {item?.order_details?.length > 1
            ? `${item?.order_details?.length} Items`
            : `${item?.order_details?.length} Item`}
        </Text>
        <View style={styles.locationViewStyle}>
          <Image source={pay} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>{item?.payable_amount ?? '00'}</Text>
        </View>
      </View>

      <View style={[styles.orderDetailStyle, { width: SW(50) }]}>
        <Text style={styles.timeTextStyle}>
          {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')}
        </Text>
        <View style={styles.locationViewStyle}>
          <Image source={clock} style={styles.pinImageStyle} />
          <Text style={styles.distanceTextStyle}>
            {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
              item?.preffered_delivery_end_time ?? '00.00'
            }`}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.orderDetailStyle, { width: SH(24) }]}>
        <Image source={rightIcon} style={styles.rightIconStyle} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const emptyComponent = () => (
    <View style={styles.emptyView}>
      <Text style={styles.noOrdersText}>{strings.deliveryOrders2.noOrdersFound}</Text>
    </View>
  );

  return (
    <View style={styles.orderToReviewView}>
      <View style={styles.headingRowStyle}>
        <Text style={styles.ordersToReviewText}>
          {selectedStatus === '0'
            ? strings.shippingOrder.reviewOrders
            : selectedStatus === '1'
            ? strings.shippingOrder.acceptedOrders
            : selectedStatus === '2'
            ? strings.shippingOrder.prepareOrders
            : selectedStatus === '3'
            ? 'Printing Labels'
            : selectedStatus === '4'
            ? strings.orderStatus.shipOrder
            : selectedStatus === '5'
            ? strings.orderStatus.deliveryOrder
            : selectedStatus === '7,8'
            ? strings.orderStatus.cancelledOrder
            : strings.orderStatus.returnedOrders}
        </Text>
      </View>

      <FlatList
        data={ordersList}
        renderItem={renderOrderToReview}
        ListEmptyComponent={emptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEnabled={ordersList?.length > 0 ? true : false}
        extraData={ordersList}
      />
    </View>
  );
};

export default memo(OrderList);

const styles = StyleSheet.create({
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: 5,
    height: SH(65),
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    backgroundColor: COLORS.transparent,
  },
  orderDetailStyle: {
    justifyContent: 'center',
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.solid_grey,
  },
  distanceTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.dark_grey,
    paddingLeft: 5,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinImageStyle: {
    width: SH(16),
    height: SH(16),
    resizeMode: 'contain',
  },
  timeTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.primary,
  },
  orderDetailStyle: {
    justifyContent: 'center',
  },
  rightIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  orderToReviewView: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingBottom: ms(10),
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: SH(15),
  },
  ordersToReviewText: {
    color: COLORS.primary,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
  },
  viewAllButtonStyle: {
    width: SH(70),
    height: SH(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.darkGray,
  },
  viewallTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: ms(20),
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noOrdersText: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(22),
    color: COLORS.primary,
  },
});
