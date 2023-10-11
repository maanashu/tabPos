import React, { memo, useRef, useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';

import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import { NAVIGATION } from '@/constants';
import CustomerDetails from './CustomerDetails';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { navigate } from '@/navigation/NavigationRef';
import { getProductByUpc } from '@/actions/DeliveryAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { blankCheckBox, Fonts, PaymentDone, userImage } from '@/assets';

const { width } = Dimensions.get('window');

const ReturnedOrderDetail = ({ orderDetail }) => {
  const dispatch = useDispatch();
  const textInputRef = useRef();
  const [productUpc, setProductUpc] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    setOrderDetails(orderDetail?.order_details);
  }, []);

  const doneHandler = () => {
    const hasCheckedItem = orderDetails?.some((item) => item.isChecked === true);
    if (hasCheckedItem) {
      navigate(NAVIGATION.productRefund, {
        productsArray: orderDetail?.order_details,
        orderData: orderDetail,
      });
    } else {
      alert('Please select atleast one product');
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
          <View style={{ paddingLeft: 10, width: ms(80) }}>
            <Text numberOfLines={1} style={styles.nameTextStyle}>
              {item?.product_name ?? '-'}
            </Text>
            <Text style={styles.varientTextStyle}>{`${item?.product_details?.sku ?? '-'}`}</Text>
          </View>
        </View>

        <View
          style={[
            styles.shippingOrderHeader,
            { paddingTop: 0, width: ms(80), justifyContent: 'space-between' },
          ]}
        >
          <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
            {item?.price ?? '0'}
          </Text>
          <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
            {`X ${item?.qty}` ?? '0'}
          </Text>
          <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
            {orderDetail?.actual_amount}
          </Text>
        </View>

        {item?.isChecked ? (
          <TouchableOpacity onPress={() => getProduct(item?.product_id)}>
            <Image
              source={PaymentDone}
              style={[styles.infoIconStyle, { tintColor: COLORS.primary }]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => getProduct(item?.product_id)}>
            <Image source={blankCheckBox} style={styles.infoIconStyle} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const onChangeHandler = (text) => {
    setProductUpc(text);
    if (text?.length > 0) {
      dispatch(getProductByUpc(text, getProduct));
    }
  };

  const getProduct = (value) => {
    const getArray = orderDetails?.findIndex((attr) => attr?.product_id === value);

    if (getArray !== -1) {
      const newProdArray = [...orderDetails];
      newProdArray[getArray].isChecked = !newProdArray[getArray].isChecked;
      setOrderDetails(newProdArray);
      setProductUpc('');
    } else {
      alert('Product not found in the order');
    }
  };

  const isProductLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_PRODUCT_BY_UPC], state)
  );

  return (
    <View style={styles.orderDetailView}>
      <CustomerDetails orderDetail={orderDetail} />

      <Spacer space={SH(8)} />
      <View style={styles.scanBarCodeView}>
        <TextInput
          value={productUpc}
          ref={textInputRef}
          maxLength={12}
          keyboardType={'number-pad'}
          style={styles.scanBarCodeView}
          placeholder={strings.returnOrder.scanbarCode}
          onChangeText={(text) => onChangeHandler(text)}
        />
      </View>

      <View style={{ height: SH(400) }}>
        <FlatList
          scrollEnabled
          data={orderDetails ?? []}
          renderItem={renderOrderProducts}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
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

            <TouchableOpacity onPress={doneHandler} style={styles.acceptButtonView}>
              <Text style={styles.acceptTextStyle}>{'Done'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {isProductLoading ? (
        <View style={[styles.loaderStyle, { backgroundColor: 'rgba(0,0,0,0.1)' }]}>
          <ActivityIndicator color={COLORS.primary} size={'small'} style={styles.loaderStyle} />
        </View>
      ) : null}
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

  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(7.2),
    color: COLORS.solid_grey,
    paddingTop: ms(2),
  },
  scanBarCodeView: {
    height: ms(30),
    borderRadius: 5,
    width: width / 3,
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
    paddingHorizontal: 15,
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
    width: SH(28),
    height: SH(28),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoIconStyle: {
    width: SH(20),
    height: SH(20),
    resizeMode: 'contain',
    tintColor: COLORS.darkGray,
  },
  loaderStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
});
