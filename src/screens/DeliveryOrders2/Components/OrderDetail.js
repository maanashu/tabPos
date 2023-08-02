import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, Platform } from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { Fonts, scooter, userImage } from '@/assets';

import styles from '../styles';

const OrderDetail = ({
  userDetail,
  orderDetail,
  renderOrderProducts,
  acceptHandler,
  declineHandler,
  openShippingOrders,
}) => {
  return (
    <View style={styles.orderDetailView}>
      <View style={styles.orderDetailViewStyle}>
        <View style={[styles.locationViewStyle, { width: ms(140) }]}>
          <Image
            source={
              userDetail?.user_details?.profile_photo
                ? { uri: userDetail?.user_details?.profile_photo }
                : userImage
            }
            style={styles.userImageStyle}
          />

          <View style={styles.userNameView}>
            <Text style={[styles.totalTextStyle, { padding: 0 }]}>
              {userDetail?.user_details?.firstname
                ? userDetail?.user_details?.firstname
                : 'user name'}
            </Text>
            <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
              {userDetail?.address}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.locationViewStyle,
            { width: ms(120), right: Platform.OS === 'ios' ? 20 : 15 },
          ]}
        >
          <Image source={scooter} style={styles.scooterImageStyle} />

          <View style={[styles.userNameView, { paddingLeft: 5 }]}>
            <Text
              style={{
                fontFamily: Fonts.Bold,
                fontSize: SF(14),
                color: COLORS.primary,
              }}
            >
              {userDetail?.delivery_details?.title ?? 'ghfgh'}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                fontSize: SF(11),
                color: COLORS.dark_grey,
              }}
            >
              {userDetail?.preffered_delivery_start_time
                ? userDetail?.preffered_delivery_start_time
                : '00.00'}
              {'-'}{' '}
              {userDetail?.preffered_delivery_end_time
                ? userDetail?.preffered_delivery_end_time
                : '00.00'}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: SH(400) }}>
        <FlatList
          scrollEnabled
          data={orderDetail}
          renderItem={renderOrderProducts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}
        />
      </View>

      <View style={styles.orderandPriceView}>
        <View style={{ paddingLeft: 15 }}>
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.totalItem}
            </Text>
            <Text style={styles.itemCountText}>{userDetail?.total_items}</Text>
          </View>

          <Spacer space={SH(15)} />
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.orderDate}
            </Text>
            <Text style={styles.itemCountText}>
              {moment(userDetail?.date).format('DD/MM/YYYY')}
            </Text>
          </View>

          <Spacer space={SH(15)} />
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.orderId}
            </Text>
            <Text style={styles.itemCountText}>{userDetail?.id}</Text>
          </View>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
          <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
            <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
              {strings.deliveryOrders.subTotal}
            </Text>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {userDetail?.actual_amount ? userDetail?.actual_amount : '0'}
            </Text>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {userDetail?.discount ? userDetail?.discount : '0'}
            </Text>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.deliveryOrders.subTotalValue}
            </Text>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {userDetail?.tax ? userDetail?.tax : '0'}
            </Text>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
            <Text style={styles.totalText}>{'$' + userDetail?.payable_amount}</Text>
          </View>

          <Spacer space={SH(15)} />
          {openShippingOrders == 0 || openShippingOrders == 1 || openShippingOrders == 2 ? (
            <View style={styles.shippingOrdersViewStyle}>
              <TouchableOpacity
                onPress={() => declineHandler(userDetail?.id)}
                style={styles.declineButtonStyle}
              >
                <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => acceptHandler(userDetail?.id)}
                style={styles.acceptButtonView}
              >
                <Text style={styles.acceptTextStyle}>{strings.deliveryOrders.accept}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;
