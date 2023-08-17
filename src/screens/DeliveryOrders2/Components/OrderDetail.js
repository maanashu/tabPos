import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

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
  trackHandler,
  isProductDetailLoading,
}) => {
  return (
    <View style={styles.orderDetailView}>
      <View style={styles.orderDetailViewStyle}>
        <View style={[styles.locationViewStyle, { flex: 1 }]}>
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

        <View style={[styles.locationViewStyle, { flex: 0.5 }]}>
          <Image source={scooter} style={styles.scooterImageStyle} />

          <View style={[styles.userNameView, { paddingLeft: 5 }]}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: Fonts.Bold,
                fontSize: ms(6),
                color: COLORS.primary,
              }}
            >
              {'Express Delivery'}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                fontSize: ms(5.7),
                color: COLORS.dark_grey,
              }}
            >
              {'Immediately'}
            </Text>
            {/* <Text
              style={{
                fontFamily: Fonts.Bold,
                fontSize: SF(14),
                color: COLORS.primary,
              }}
            >
              {userDetail?.invoice?.delivery_date ?? ''}
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
            </Text> */}
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
        <View style={{ paddingLeft: 15, flex: 1 }}>
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
              {userDetail?.date ? moment(userDetail?.date).format('DD/MM/YYYY') : '00:00'}
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

        <View style={styles.subTotalView}>
          <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
            <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
              {strings.deliveryOrders.subTotal}
            </Text>
            <Text style={[styles.totalTextStyle, { paddingTop: 0, fontFamily: Fonts.MaisonBold }]}>
              ${userDetail?.actual_amount ? Number(userDetail?.actual_amount).toFixed(2) : '0'}
            </Text>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.totalTextStyle2}>{'$'}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {userDetail?.discount ? Number(userDetail?.discount).toFixed(2) : '0'}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.otherFees}</Text>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.totalTextStyle2}>{'$'}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {'0.00'}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.totalTextStyle2}>{'$'}</Text>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {userDetail?.tax ? Number(userDetail?.tax).toFixed(2) : '0'}
              </Text>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: COLORS.solidGrey,
              borderStyle: 'dashed',
              marginTop: ms(5),
            }}
          />
          <View style={styles.orderDetailsView}>
            <Text style={styles.totalText}>{strings.deliveryOrders.total}</Text>
            <View style={styles.flexDirectionRow}>
              <Text
                style={[
                  styles.totalTextStyle2,
                  { fontFamily: Fonts.MaisonBold, fontSize: SF(13), color: COLORS.solid_grey },
                ]}
              >
                {'$'}
              </Text>
              <Text style={[styles.totalText, { paddingTop: 0 }]}>
                {Number(userDetail?.payable_amount).toFixed(2)}
              </Text>
            </View>
          </View>

          <Spacer space={SH(15)} />

          <View style={styles.shippingOrdersViewStyle}>
            {openShippingOrders == '0' ? (
              <TouchableOpacity
                onPress={() => declineHandler(userDetail?.id)}
                style={styles.declineButtonStyle}
              >
                <Text style={styles.declineTextStyle}>{strings.calender.decline}</Text>
              </TouchableOpacity>
            ) : null}

            {openShippingOrders === '0' ||
            openShippingOrders === '1' ||
            openShippingOrders === '2' ? (
              <TouchableOpacity
                onPress={() => acceptHandler(userDetail?.id)}
                style={styles.acceptButtonView}
              >
                <Text style={styles.acceptTextStyle}>
                  {' '}
                  {openShippingOrders === '0'
                    ? strings.buttonStatus.reviewButton
                    : openShippingOrders === '1'
                    ? strings.buttonStatus.preparedButton
                    : openShippingOrders === '2'
                    ? strings.buttonStatus.prepareButton
                    : ''}
                </Text>
              </TouchableOpacity>
            ) : null}

            {openShippingOrders >= '3' && (
              <TouchableOpacity
                onPress={() => trackHandler()}
                style={[styles.acceptButtonView, { width: ms(100) }]}
              >
                {isProductDetailLoading ? (
                  <ActivityIndicator size={'small'} color={COLORS.white} />
                ) : (
                  <Text style={styles.acceptTextStyle}>{strings.buttonStatus.prepareButton}</Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;
