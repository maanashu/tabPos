import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';

import Price from './Price';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import {
  addProduct,
  blankCheckBox,
  checkboxSec,
  checkboxSecBlue,
  Fonts,
  pay,
  PaymentDone,
  research,
  retail,
  scanNew,
  scooter,
  userImage,
} from '@/assets';
import { useState } from 'react';
import { getProductByUpc } from '@/actions/DeliveryAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { height } from '@/theme/ScalerDimensions';
import { Images } from '@/assets/new_icon';

const OrderDetail = ({ orderData, enableModal, checkboxHandler, onPress }) => {
  const [productUpc, setProductUpc] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setOrderDetails(orderData?.order?.order_details);
  }, [orderData]);

  const getDeliveryType = (type) => {
    switch (type) {
      case '1':
        return strings.deliveryOrders.delivery;
      case '3':
        return strings.returnOrder.inStore;
      case '4':
        return strings.shipping.shippingText;
      case '2':
        return strings.returnOrder.reservation;
      default:
        return strings.returnOrder.inStore;
    }
  };

  const onChangeHandler = (text) => {
    setProductUpc(text);
    if (text?.length >= 12) {
      dispatch(getProductByUpc(text, getProduct));
    }
  };

  const getProduct = (value) => {
    const getArray = orderData?.order?.order_details?.findIndex(
      (attr) => attr?.product_id === value
    );

    if (getArray !== -1) {
      const newProdArray = [...orderData?.order?.order_details];
      newProdArray[getArray].isChecked = !newProdArray[getArray].isChecked;
      setOrderDetails(newProdArray);
      setProductUpc('');
    } else {
      alert('Product not found in the order');
    }
  };

  const renderOrderProducts = ({ item }) => {
    return (
      <View style={styles.orderproductView}>
        <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
          <Image
            source={item?.product_image ? { uri: item?.product_image } : userImage}
            style={styles.userImageStyle}
          />
          <View style={{ paddingLeft: 10, width: ms(100) }}>
            <Text numberOfLines={1} style={[styles.nameTextStyle, { textAlign: 'left' }]}>
              {item?.product_name ?? '-'}
            </Text>
          </View>
        </View>
        <Text style={[styles.nameTextStyle, { color: COLORS.black }]}>
          {`$${item?.price}` ?? '-'}
        </Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.black }]}>{item?.qty ?? '-'}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.black }]}>
          {`$${item?.price * item?.qty}` ?? '-'}
        </Text>

        {item?.isChecked ? (
          <TouchableOpacity onPress={() => checkboxHandler(item?.id, item?.qty)}>
            <Image source={checkboxSecBlue} style={styles.infoIconStyle} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => checkboxHandler(item?.id, item?.qty)}>
            <Image source={checkboxSec} style={styles.checkboxIconStyle} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {orderData !== undefined && Object.keys(orderData).length > 0 && orderData?.order ? (
        <View style={styles.orderMainViewStyle}>
          <View style={styles.orderDetailViewStyle}>
            <View style={[styles.locationViewStyle, { flex: 1 }]}>
              <Image
                style={styles.userImageStyle}
                source={
                  orderData?.order?.user_details?.user_profiles?.profile_photo
                    ? { uri: orderData?.order?.user_details?.user_profiles?.profile_photo }
                    : userImage
                }
              />

              <View style={styles.userNameView}>
                <Text style={[styles.customerName]}>
                  {orderData?.order?.user_details
                    ? `${orderData?.order?.user_details?.user_profiles?.firstname} ${orderData?.order?.user_details?.user_profiles?.lastname}`
                    : 'No Customer'}
                </Text>
              </View>
            </View>

            <View style={[styles.locationViewStyle, { flex: 0.75 }]}>
              <Image source={Images.inStore} style={styles.scooterImageStyle} />

              <Text style={styles.orderTypeStyle}>
                {getDeliveryType(orderData?.order?.delivery_option)}
              </Text>
              <Text style={styles.orderDateText}>
                {orderData?.order?.date
                  ? moment.utc(orderData?.order?.date).format('MM/DD/YYYY')
                  : '-'}
              </Text>
            </View>
          </View>

          <Spacer space={SH(20)} />
          <View style={styles.getProductDetailView}>
            <View style={styles.scanProductView}>
              <TextInput
                value={productUpc}
                placeholder="Scan Barcode of each Item"
                style={styles.orderDateText}
                onChangeText={onChangeHandler}
                placeholderTextColor={COLORS.navy_blue}
              />
              <Image
                source={scanNew}
                resizeMode="contain"
                style={{ height: ms(12), width: ms(12), tintColor: COLORS.sky_blue }}
              />
            </View>

            <TouchableOpacity onPress={enableModal} style={styles.manualView}>
              <Text style={styles.orderDateText}>{'Manual Entry'}</Text>
              <Image
                source={addProduct}
                resizeMode="contain"
                style={{ height: ms(12), width: ms(12), tintColor: COLORS.sky_blue }}
              />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(15)} />
          <View style={{ height: SH(400) }}>
            <FlatList
              scrollEnabled
              data={orderDetails}
              renderItem={renderOrderProducts}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 130 }}
            />
          </View>

          <View style={styles.orderandPriceView}>
            <View style={{ paddingLeft: 15, flex: 1 }}>
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.totalItem}
                </Text>
                <Text style={styles.itemCountText}>{orderData?.order?.total_items ?? '0'}</Text>
              </View>

              <View
                style={{
                  height: ms(0.5),
                  backgroundColor: COLORS.input_border,
                  marginVertical: ms(5),
                  marginRight: ms(15),
                }}
              />

              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderDate}
                </Text>
                <Text style={styles.itemCountText}>
                  {orderData?.order?.date
                    ? moment.utc(orderData?.order?.date).format('DD/MM/YYYY')
                    : '-'}
                </Text>
              </View>

              <View
                style={{
                  height: ms(0.5),
                  backgroundColor: COLORS.input_border,
                  marginVertical: ms(5),
                  marginRight: ms(15),
                }}
              />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderId}
                </Text>
                <Text style={styles.itemCountText}>{`#${orderData?.order?.id}` ?? '-'}</Text>
              </View>

              <View
                style={{
                  height: ms(0.5),
                  backgroundColor: COLORS.input_border,
                  marginVertical: ms(5),
                  marginRight: ms(15),
                }}
              />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'Payment Method'}</Text>
                <View
                  style={[
                    styles.locationViewStyle,
                    {
                      backgroundColor: COLORS.soft_green,
                      paddingHorizontal: ms(4),
                      borderRadius: ms(20),
                      alignSelf: 'flex-start',
                      marginTop: ms(2),
                    },
                  ]}
                >
                  <Image source={pay} style={[styles.pinImageStyle]} />
                  <Text style={styles.itemCountText}>
                    {`${orderData?.order?.mode_of_payment}` ?? '-'}
                  </Text>
                </View>
              </View>
            </View>

            <Price orderData={orderData} onPresshandler={onPress} />
          </View>
        </View>
      ) : Object.keys(orderData).length > 0 && orderData?.order === null ? (
        <View style={styles.searchViewStyle}>
          <Text style={styles.emptyTextStyle}>{'No product found'}</Text>
        </View>
      ) : (
        <View style={styles.searchViewStyle}>
          <Image source={Images.billReceipt} style={styles.researchIconstyle} />
          <Text style={{ fontSize: ms(11), marginVertical: ms(5), color: COLORS.navy_light_blue }}>
            {'No invoice selected'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default memo(OrderDetail);

const styles = StyleSheet.create({
  container: {
    flex: 0.48,
  },
  orderMainViewStyle: {
    flex: 1,
    borderRadius: 10,
    marginBottom: ms(10),
    backgroundColor: COLORS.white,
  },
  orderDetailViewStyle: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: ms(10),
    borderRadius: 10,
    marginTop: ms(10),
  },
  getProductDetailView: {
    marginHorizontal: ms(10),
    flexDirection: 'row',
  },
  userImageStyle: {
    width: SH(36),
    height: SH(36),
    borderRadius: 100,
    resizeMode: 'cover',
  },
  userNameView: {
    paddingLeft: 10,
    flex: 1,
  },
  orderTypeStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(9.5),
    color: COLORS.navy_blue,
    marginHorizontal: ms(6),
  },
  orderDateText: {
    fontFamily: Fonts.Medium,
    fontSize: ms(9),
    color: COLORS.navy_blue,
    marginRight: ms(3),
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.light_blue2,
    paddingTop: ms(2),
  },
  customerName: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(9.5),
    color: COLORS.navy_blue,
  },
  itemCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(11),
    color: COLORS.navy_blue,
  },
  nameTextStyle: {
    fontSize: SF(14),
    textAlign: 'center',
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  locationViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scooterImageStyle: {
    width: SH(26),
    height: SH(26),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  scanProductView: {
    borderRadius: ms(15),
    // alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: ms(15),
    backgroundColor: COLORS.sky_grey,
    // paddingHorizontal: ms(20),
    marginRight: ms(5),
    flex: 0.62,
    height: ms(28),
    flexDirection: 'row',
    alignItems: 'center',
  },
  manualView: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: ms(15),
    // paddingHorizontal: ms(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.input_border,
    flex: 0.38,
    flexDirection: 'row',
    height: ms(28),
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
  infoIconView: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 100,
    width: SH(18),
    height: SH(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconStyle: {
    width: ms(15),
    height: ms(15),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  checkboxIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
    tintColor: COLORS.light_blue2,
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
  varientTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.darkGray,
  },
  searchViewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    // alignSelf: 'center',
    flex: 0.98,
    backgroundColor: COLORS.white,
    borderRadius: ms(5),
  },
  researchIconstyle: {
    width: ms(40),
    height: ms(40),
    resizeMode: 'contain',
  },
  emptyTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
    color: COLORS.primary,
  },
  pinImageStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
});
