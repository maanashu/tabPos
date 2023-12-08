import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  arrowRightTop,
  cashShippingNew,
  clock,
  fedexNew,
  fedx,
  Fonts,
  pay,
  pin,
  pinShippingNew,
  rightIcon,
  thunder,
} from '@/assets';
import { getDelivery } from '@/selectors/DeliverySelector';
import moment from 'moment';

const { height } = Dimensions.get('window');

const Orders = ({ selectedStatus, onViewAllHandler }) => {
  const getOrdersData = useSelector(getDelivery);
  const ordersList = getOrdersData?.getReviewDef;

  const renderOrderToReview = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => onViewAllHandler(item.id)} style={styles.orderRowStyle}>
        <View style={{ width: SW(12), alignItems: 'center', alignSelf: 'center' }}>
          <Text
            style={{
              fontFamily: Fonts.SemiBold,
              fontSize: ms(6),
              textAlignVertical: 'center',
              color: COLORS.dark_grey,
            }}
          >
            {`#${item?.id}`}
          </Text>
        </View>

        <View style={[styles.orderDetailStyle, { width: undefined }]}>
          <Text style={styles.nameTextStyle}>{item?.user_details?.firstname ?? '-'}</Text>
          <View style={[styles.locationViewStyle, { backgroundColor: COLORS.tip_back }]}>
            <Image source={pinShippingNew} style={[styles.pinImageStyle]} />
            <Text style={[styles.distanceTextStyle, { color: COLORS.purple }]}>
              {item?.distance ? `${item.distance} miles` : '0'}
            </Text>
          </View>
        </View>

        <View style={[styles.orderDetailStyle, { paddingHorizontal: 2, width: undefined }]}>
          <Text style={styles.nameTextStyle}>
            {item?.order_details?.length > 1
              ? `${item?.order_details?.length} Items`
              : `${item?.order_details?.length} Item`}
          </Text>
          <View style={[styles.locationViewStyle, { backgroundColor: COLORS.alarm_success_50 }]}>
            <Image source={cashShippingNew} style={[styles.pinImageStyle]} />
            <Text style={[styles.distanceTextStyle, { color: COLORS.green_new }]}>
              {item?.payable_amount ?? '00'}
            </Text>
          </View>
        </View>

        <View style={styles.rowContainerStyle}>
          <Image
            source={
              item?.shipping_details?.image ? { uri: item?.shipping_details?.image } : fedexNew
            }
            style={[styles.shippingTypeImage, { margin: 2 }]}
          />
          <View style={[styles.orderDetailStyle, { width: undefined }]}>
            <Text style={[styles.nameTextStyle]}>
              {item?.shipping_details?.title}
              {/* {item?.invoice?.delivery_date ?? moment(item?.created_at).format('DD MMM YYYY')} */}
            </Text>
            {/* <View style={[styles.locationViewStyle, { backgroundColor: COLORS.light_yellow }]}>
              <Image source={thunder} style={[styles.pinImageStyle]} />
              <Text style={[styles.distanceTextStyle, { color: COLORS.dark_yellow }]}>
                {`${item?.preffered_delivery_start_time ?? '00.00'} - ${
                  item?.preffered_delivery_end_time ?? '00.00'
                }`}
              </Text>
            </View> */}
          </View>
        </View>

        <TouchableOpacity
          onPress={() => onViewAllHandler(item.id)}
          style={[styles.orderDetailStyle, { width: SH(24) }]}
        >
          <Image
            source={arrowRightTop}
            style={{ height: ms(13), width: ms(13), tintColor: COLORS.primaryDark }}
          />
          {/* <Image source={rightIcon} style={styles.rightIconStyle} /> */}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

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
            ? strings.shippingOrder.ordersReview
            : selectedStatus === '1'
            ? strings.shippingOrder.acceptedOrders
            : selectedStatus === '2'
            ? strings.shippingOrder.prepareOrders
            : selectedStatus === '3'
            ? 'Printing Labels'
            : selectedStatus === '4'
            ? strings.orderStatus.trackingOrders
            : selectedStatus === '5'
            ? strings.orderStatus.deliveryOrder
            : selectedStatus === '7,8'
            ? strings.orderStatus.cancelledOrder
            : strings.orderStatus.returnedOrders}
        </Text>

        {ordersList?.length > 0 || selectedStatus === '9' ? (
          <TouchableOpacity onPress={onViewAllHandler} style={styles.viewAllButtonStyle}>
            <Text style={styles.viewallTextStyle}>{strings.reward.seeAll}</Text>

            <Image
              source={arrowRightTop}
              style={{ height: ms(13), width: ms(13), tintColor: COLORS.lavenders }}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={ordersList?.slice(0, 3)}
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

export default memo(Orders);

const styles = StyleSheet.create({
  orderRowStyle: {
    borderWidth: 1,
    borderRadius: 10,
    height: SH(65),
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderColor: COLORS.blue_shade,
    backgroundColor: COLORS.transparent,
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.solid_grey,
  },
  distanceTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(9),
    color: COLORS.orange_bright,
    paddingHorizontal: 5,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.light_yellow,
    paddingVertical: ms(1),
    borderRadius: 10,
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
    width: SW(30),
    justifyContent: 'center',
  },
  rightIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  orderToReviewView: {
    borderRadius: ms(10),
    backgroundColor: COLORS.white,
    // height: height / 2.35,
    // paddingBottom: ms(10),
    flex: 0.495,
    // marginBottom: ms(10),
  },
  headingRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: SH(15),
  },
  ordersToReviewText: {
    color: COLORS.navy_blue,
    fontSize: SF(18),
    fontFamily: Fonts.MaisonBold,
  },
  viewAllButtonStyle: {
    width: SH(70),
    height: SH(28),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    // backgroundColor: COLORS.darkGray,
  },
  viewallTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(14),
    color: COLORS.lavenders,
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
    color: COLORS.navy_blue,
  },
  shippingTypeImage: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
    borderRadius: ms(5),
    marginRight: ms(4),
    borderColor: COLORS.sky_grey,
    borderWidth: 1,
  },
  rowContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
