import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';

import Price from './Price';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { blankCheckBox, Fonts, PaymentDone, research, scooter, userImage } from '@/assets';
import { useState } from 'react';
import { getProductByUpc } from '@/actions/DeliveryAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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
      default:
        return strings.returnOrder.reservation;
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
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          {`$${item?.price}` ?? '-'}
        </Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>{item?.qty ?? '-'}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
          {`$${item?.actual_price}` ?? '-'}
        </Text>

        {item?.isChecked ? (
          <TouchableOpacity
            style={{
              width: SH(25),
              height: SH(25),
              resizeMode: 'contain',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => checkboxHandler(item?.id, item?.qty)}
          >
            <Image
              source={PaymentDone}
              style={[styles.infoIconStyle, { tintColor: COLORS.primary }]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => checkboxHandler(item?.id, item?.qty)}>
            <Image source={blankCheckBox} style={styles.checkboxIconStyle} />
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
                <Text style={[styles.totalTextStyle, { padding: 0 }]}>{'No Customer'}</Text>
              </View>
            </View>

            <View style={[styles.locationViewStyle, { flex: 0.55 }]}>
              <Image source={scooter} style={styles.scooterImageStyle} />

              <View style={[styles.userNameView, { paddingLeft: 5 }]}>
                <Text style={styles.orderTypeStyle}>
                  {getDeliveryType(orderData?.order?.delivery_option)}
                </Text>
                <Text style={styles.orderDateText}>
                  {orderData?.order?.date
                    ? moment(orderData?.order?.date).format('MM/DD/YYYY')
                    : '-'}
                </Text>
              </View>
            </View>
          </View>

          <Spacer space={SH(15)} />
          <View style={styles.getProductDetailView}>
            <View style={styles.scanProductView}>
              <TextInput
                value={productUpc}
                maxLength={12}
                placeholder="Scan barcode of each item returned"
                style={styles.orderDateText}
                onChangeText={onChangeHandler}
              />
            </View>

            <TouchableOpacity onPress={enableModal} style={styles.manualView}>
              <Text style={styles.orderDateText}>{'Manual Entry'}</Text>
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

              <Spacer space={SH(15)} />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderDate}
                </Text>
                <Text style={styles.itemCountText}>
                  {orderData?.order?.date
                    ? moment(orderData?.order?.date).format('DD/MM/YYYY')
                    : '-'}
                </Text>
              </View>

              <Spacer space={SH(15)} />
              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>
                  {strings.shippingOrder.orderId}
                </Text>
                <Text style={styles.itemCountText}>{`#${orderData?.order?.id}` ?? '-'}</Text>
              </View>
              <Spacer space={SH(15)} />

              <View>
                <Text style={[styles.totalTextStyle, { paddingTop: 0 }]}>{'Payment Method'}</Text>
                <Text style={styles.itemCountText}>
                  {`${orderData?.order?.mode_of_payment}` ?? '-'}
                </Text>
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
          <Image source={research} style={styles.researchIconstyle} />
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
    paddingHorizontal: 20,
    marginHorizontal: ms(10),
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: ms(10),
    backgroundColor: COLORS.textInputBackground,
  },
  getProductDetailView: {
    marginHorizontal: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontFamily: Fonts.Bold,
    fontSize: SF(14),
    color: COLORS.primary,
  },
  orderDateText: {
    fontFamily: Fonts.Medium,
    fontSize: SF(11),
    color: COLORS.dark_grey,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
    paddingTop: ms(2),
  },
  itemCountText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.dark_grey,
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
  },
  scanProductView: {
    paddingVertical: 15,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(22),
    backgroundColor: COLORS.blue_shade,
    paddingHorizontal: ms(20),
    marginRight: ms(5),
    flex: 1,
  },
  manualView: {
    borderWidth: 3,
    backgroundColor: COLORS.white,
    borderRadius: 7,
    paddingHorizontal: ms(22),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ms(20),
    borderColor: COLORS.blue_shade,
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
    width: SH(15),
    height: SH(15),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  checkboxIconStyle: {
    width: SH(25),
    height: SH(25),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
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
    alignSelf: 'center',
    flex: 1,
  },
  researchIconstyle: {
    width: SH(210),
    height: SH(210),
    resizeMode: 'contain',
  },
  emptyTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
    color: COLORS.primary,
  },
});
