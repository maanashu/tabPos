import React, { memo } from 'react';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { Fonts, iImage, scooter, userImage } from '@/assets';
import { productList } from '@/constants/flatListData';
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProductByUpc } from '@/actions/DeliveryAction';

const { width, height } = Dimensions.get('window');

const ReturnedOrderDetail = ({ orderDetail, doneHandler }) => {
  const dispatch = useDispatch();
  const textInputRef = useRef();
  const [productUpc, setProductUpc] = useState('');

  const renderOrderProducts = ({ item, index }) => {
    return (
      <View style={styles.orderproductView}>
        <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
          <Image
            source={item?.product_image ? { uri: item?.product_image } : userImage}
            style={styles.userImageStyle}
          />
          <View style={{ paddingLeft: 10, width: ms(100) }}>
            <Text style={styles.nameTextStyle}>{item?.product_name ?? '-'}</Text>
            <Text style={styles.varientTextStyle}>{`${item?.product_details?.sku ?? '-'}`}</Text>
          </View>
        </View>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.price ?? '0'}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.qty ?? '0'}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          {orderDetail?.actual_amount}
        </Text>

        <View style={styles.infoIconView}>
          <Image source={iImage} style={styles.infoIconStyle} />
        </View>
      </View>
    );
  };

  const onChangeHandler = (text) => {
    setProductUpc(text);
    dispatch(getProductByUpc(text));
  };

  return (
    <View style={styles.orderDetailView}>
      <View style={styles.orderDetailViewStyle}>
        <View style={[styles.locationViewStyle, { flex: 1 }]}>
          <Image
            source={
              orderDetail?.user_details?.profile_photo
                ? { uri: orderDetail?.user_details?.profile_photo }
                : userImage
            }
            style={styles.userImageStyle}
          />

          <View style={styles.userNameView}>
            <Text style={[styles.totalTextStyle, { padding: 0 }]}>
              {`${orderDetail?.user_details?.firstname} ${orderDetail?.user_details?.lastname}`}
            </Text>
            <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
              {`${orderDetail?.user_details?.current_address?.street_address}, ${orderDetail?.user_details?.current_address?.city}`}
            </Text>
            <Text style={[styles.badgetext, { fontFamily: Fonts.Medium }]}>
              {`${orderDetail?.user_details?.current_address?.state}, ${orderDetail?.user_details?.current_address?.country}`}
            </Text>
          </View>
        </View>

        <View style={[styles.locationViewStyle, { flex: 0.55 }]}>
          <Image source={scooter} style={styles.scooterImageStyle} />

          <View style={[styles.userNameView, { paddingLeft: 5 }]}>
            <Text
              style={{
                fontFamily: Fonts.Bold,
                fontSize: SF(14),
                color: COLORS.primary,
              }}
            >
              {moment(orderDetail?.invoices?.delivery_date).format('DD MMM YYYY')}
            </Text>
            <Text
              style={{
                fontFamily: Fonts.Medium,
                fontSize: SF(11),
                color: COLORS.dark_grey,
              }}
            >
              {`${orderDetail?.preffered_delivery_start_time ?? '-'} - ${
                orderDetail?.preffered_delivery_end_time ?? '-'
              }`}
            </Text>
          </View>
        </View>
      </View>

      <Spacer space={SH(8)} />
      <View style={styles.scanBarCodeView}>
        <TextInput
          value={productUpc}
          ref={textInputRef}
          style={styles.scanBarCodeView}
          placeholder={strings.returnOrder.scanbarCode}
          onChangeText={(text) => onChangeHandler(text)}
        />
      </View>

      <View style={{ height: SH(400) }}>
        <FlatList
          scrollEnabled
          data={orderDetail?.order_details ?? []}
          renderItem={renderOrderProducts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        />
      </View>

      <View style={styles.orderandPriceView}>
        <View style={{ paddingLeft: 15, flex: 1 }}>
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.totalItem}
            </Text>
            <Text style={styles.itemCountText}>{orderDetail?.total_items ?? '0'}</Text>
          </View>

          <Spacer space={SH(15)} />
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.orderDate}
            </Text>
            <Text style={styles.itemCountText}>
              {moment(orderDetail?.invoices?.delivery_date).format('DD/MM/YYYY')}
            </Text>
          </View>

          <Spacer space={SH(15)} />
          <View>
            <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
              {strings.shippingOrder.orderId}
            </Text>
            <Text style={styles.itemCountText}>{`#${orderDetail?.id}`}</Text>
          </View>
        </View>

        <View style={styles.subTotalView}>
          <View style={[styles.orderDetailsView, { paddingTop: 0 }]}>
            <Text style={[styles.invoiceText, { color: COLORS.solid_grey }]}>
              {strings.deliveryOrders.subTotal}
            </Text>
            <Text style={[styles.totalTextStyle, { paddingTop: 0, fontFamily: Fonts.MaisonBold }]}>
              ${orderDetail?.total_sale_price ?? '0'}
            </Text>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.discount}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {`$${orderDetail?.discount ?? '0'}`}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.deliveryCharges}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {`$${orderDetail?.delivery_charge ?? '0'}`}
              </Text>
            </View>
          </View>

          <View style={styles.orderDetailsView}>
            <Text style={styles.invoiceText}>{strings.deliveryOrders.tax}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.totalTextStyle, { paddingTop: 0, color: COLORS.darkGray }]}>
                {`$${orderDetail?.tax ?? '0'}`}
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
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.totalText, { paddingTop: 0 }]}>{`$${
                orderDetail?.payable_amount ?? '0'
              }`}</Text>
            </View>
          </View>

          <Spacer space={SH(15)} />

          <View style={[styles.locationViewStyle, { justifyContent: 'center' }]}>
            <TouchableOpacity style={styles.declineButtonStyle}>
              <Text style={styles.declineTextStyle}>{'Later'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.acceptButtonView} onPress={() => doneHandler()}>
              <Text style={styles.acceptTextStyle}>{'Done'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(ReturnedOrderDetail);

const styles = StyleSheet.create({
  orderDetailView: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 0.9,
  },
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: ms(10),
    backgroundColor: COLORS.textInputBackground,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
  },
  userNameView: {
    paddingLeft: 10,
    flex: 1,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
    paddingTop: ms(2),
  },
  badgetext: {
    color: COLORS.dark_grey,
    fontSize: ms(5.5),
    fontFamily: Fonts.SemiBold,
  },
  scanBarCodeView: {
    height: ms(30),
    borderRadius: 5,
    width: width / 2.8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue_shade,
    fontSize: SF(11),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  scanBarCodeTextStyle: {
    fontSize: SF(11),
    textAlign: 'center',
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    paddingLeft: ms(5),
  },
  orderandPriceView: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: ms(5),
    alignSelf: 'center',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  itemCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark_grey,
  },
  subTotalView: {
    paddingHorizontal: ms(10),
    backgroundColor: COLORS.textInputBackground,
    paddingVertical: ms(8),
    width:
      Platform.OS === 'android'
        ? Dimensions.get('window').width / 5
        : Dimensions.get('window').width / 4.5,
    borderRadius: 10,
  },
  orderDetailsView: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  invoiceText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(12),
    color: COLORS.darkGray,
  },
  totalTextStyle2: {
    paddingTop: 0,
    fontSize: SF(12),
    lineHeight: ms(8),
    color: COLORS.darkGray,
  },
  totalText: {
    fontFamily: Fonts.MaisonBold,
    fontSize: SF(18),
    color: COLORS.solid_grey,
  },
  acceptButtonView: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginLeft: 10,
    paddingHorizontal: ms(18),
  },
  acceptTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  declineButtonStyle: {
    height: SH(48),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 5,
    paddingHorizontal: ms(18),
  },
  declineTextStyle: {
    textAlign: 'center',
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.primary,
  },
  orderproductView: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderColor: COLORS.blue_shade,
  },
  shippingOrderHeader: {
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.solid_grey,
  },
  varientTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  infoIconView: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 100,
    width: SH(18),
    height: SH(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconStyle: {
    width: SH(10),
    height: SH(10),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
});
