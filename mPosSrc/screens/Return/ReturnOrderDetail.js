import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  FlatList,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';

import { Images } from '@mPOS/assets';
import { COLORS, Fonts, SH } from '@/theme';
import OrderTotal from './Components/OrderTotal';
import { Header, Spacer } from '@mPOS/components';
import ManualEntry from './Components/ManualEntry';
import { getProductByUpc } from '@/actions/DeliveryAction';

import styles from './styles';
import { strings } from '@mPOS/localization';
import { minus, plus } from '@/assets';
import { amountFormat, formattedPrice } from '@/utils/GlobalMethods';

export function ReturnOrderDetail(props) {
  const dispatch = useDispatch();
  const orderData = props?.route?.params?.data;
  const customerDetail = orderData?.order?.seller_details?.user_profiles;
  const [productUpc, setProductUpc] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setOrderDetails(orderData?.order?.order_details);
  }, [orderData]);

  const getDeliveryType = (type) => {
    switch (type) {
      case '1':
        return strings.return.delivery;
      case '3':
        return strings.return.inStore;
      case '4':
        return strings.return.shipping;
      case '2':
        return strings.return.reservation;
      default:
        return strings.return.inStore;
    }
  };
  const onChangeHandler = (text) => {
    setProductUpc(text);
    if (text?.length >= 12) {
      dispatch(getProductByUpc(text, handleCheckBox));
    }
  };

  const handleCheckBox = (productId) => {
    const index = orderData?.order?.order_details?.findIndex(
      (detail) => detail?.product_id == productId
    );

    if (index !== -1) {
      const updatedOrderDetails = [...orderDetails];
      updatedOrderDetails[index].isChecked = !updatedOrderDetails[index].isChecked;
      setOrderDetails(updatedOrderDetails);
      setProductUpc('');
      setOrderDetails(updatedOrderDetails);
    } else {
      alert('Product not found in the order');
    }
  };

  // const checkboxHandler = (id, count) => {
  //   const getArray = orderDetails?.findIndex((attr) => attr?.id === id);
  //   if (getArray !== -1) {
  //     const newProdArray = [...orderDetails];
  //     if (newProdArray[0]?.attributes?.length > 0) {
  //       newProdArray[getArray].qty = count;
  //       newProdArray[getArray].isChecked = !newProdArray[getArray].isChecked;
  //       setOrderDetails(newProdArray);
  //       setIsShowAttributeModal(false);
  //     } else {
  //       newProdArray[getArray].isChecked = !newProdArray[getArray].isChecked;
  //       setOrderDetails(newProdArray);
  //     }
  //   } else {
  //     alert('Product not found in the order');
  //   }
  // };

  //TODO : Need to fix this
  const updateQuantity = (operation, index) => {
    // Retrieve the order detail at the specified index
    const orderDetail = orderData?.order?.order_details[index];

    // If order detail is not found or operation is invalid, exit early
    if (!orderDetail || (operation !== '-' && operation !== '+')) {
      return;
    }

    // Retrieve the current quantity of the product at the specified index
    const currentQty = orderDetails[index]?.qty;

    // If operation is decrement and quantity is already at minimum, exit early
    if (operation === '-' && currentQty <= 1) {
      return;
    }

    // If operation is increment and quantity is already at maximum, exit early
    if (operation === '+' && currentQty >= orderDetail.qty) {
      return;
    }

    // Clone the products array
    const updatedProducts = [...orderDetails];

    // Clone the product object at the specified index
    const updatedProduct = { ...updatedProducts[index] };

    // Update the quantity based on the operation
    updatedProduct.qty += operation === '-' ? -1 : 1;

    // Update the product at the specified index
    updatedProducts[index] = updatedProduct;

    // Update the state with the updated products array
    setOrderDetails(updatedProducts);
  };

  const renderOrderProducts = ({ item, index }) => (
    <View style={styles.orderproductView}>
      <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
        <Image
          source={item?.product_image ? { uri: item?.product_image } : Images.userImage}
          style={styles.userImageStyle}
        />
        <View style={{ paddingLeft: 10, width: ms(60) }}>
          <Text
            numberOfLines={1}
            style={[styles.nameTextStyle, { fontFamily: Fonts.Medium, textAlign: 'left' }]}
          >
            {item?.product_name ?? '-'}
          </Text>
        </View>
      </View>
      <Text style={[styles.nameTextStyle, { fontFamily: Fonts.Regular, color: COLORS.darkGray }]}>
        {amountFormat(item?.price)}
      </Text>
      <View style={{ borderWidth: 1, paddingHorizontal: ms(8) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: ms(14),
              alignItems: 'center',
              height: ms(15),
              justifyContent: 'center',
            }}
            onPress={() => updateQuantity('-', index)}
          >
            <Image source={minus} style={{ height: ms(14), aspectRatio: 1 }} resizeMode="contain" />
          </TouchableOpacity>
          <View
            style={{
              paddingHorizontal: ms(5),
              borderLeftWidth: ms(1),
              borderRightWidth: ms(1),
              marginHorizontal: ms(8),
            }}
          >
            <Text style={{ fontSize: ms(11) }}>{item?.qty}</Text>
          </View>

          <TouchableOpacity
            style={{
              width: ms(14),
              alignItems: 'center',
              height: ms(15),
              justifyContent: 'center',
            }}
            onPress={() => updateQuantity('+', index)}
          >
            <Image source={plus} style={{ height: ms(14), aspectRatio: 1 }} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
        {`${amountFormat(item?.price * item?.qty)}` ?? '-'}
      </Text>
      {item?.isChecked ? (
        <TouchableOpacity
          style={styles.checkBoxViewStyle}
          onPress={() => {
            handleCheckBox(item?.product_id, item?.qty);
          }}
        >
          <Image
            source={Images.mark}
            style={[styles.checkboxIconStyle, { tintColor: COLORS.primary }]}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.checkBoxViewStyle}
          onPress={() => {
            handleCheckBox(item?.product_id, item?.qty);
          }}
        >
          <Image source={Images.blankCheckBox} style={styles.checkboxIconStyle} />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header backRequired title={strings.profile.header} />

      <View style={styles.userDetailView}>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={
              customerDetail?.profile_photo ? { uri: customerDetail?.profile_photo } : Images.user
            }
            style={styles.profileImageStyle}
          />
          <View style={{ paddingLeft: 10, marginRight: ms(30) }}>
            <Text style={styles.nameTextStyle}>
              {`${customerDetail?.firstname ?? ''} ${customerDetail?.lastname ?? '-'}`}
            </Text>
            <Text style={styles.addressTextStyle}>{`${
              customerDetail?.current_address?.street_address ?? ''
            } ${customerDetail?.current_address?.city ?? '-'} ${
              customerDetail?.current_address?.state ?? ''
            } ${customerDetail?.current_address?.country ?? ''}`}</Text>
          </View>
        </View>

        <Spacer space={SH(20)} />

        <View style={styles.cancelButtonStyle}>
          <Text style={styles.cancelButtonText}>
            {getDeliveryType(orderData?.order?.delivery_option)}
          </Text>
        </View>
      </View>

      <Spacer space={SH(15)} />

      <View style={styles.getProductDetailView}>
        <View style={styles.scanProductView}>
          <TextInput
            value={productUpc}
            maxLength={12}
            placeholder={'Scan barcode of each item returned'}
            style={styles.scanTextInputStyle}
            onChangeText={onChangeHandler}
          />
        </View>
        <TouchableOpacity onPress={() => setIsVisible(true)} style={styles.manualView}>
          <Text style={styles.orderDateText}>{'Manual Entry'}</Text>
        </TouchableOpacity>
      </View>

      <Spacer space={SH(15)} />

      <View style={{ height: ms(80) }}>
        <FlatList
          scrollEnabled
          data={orderDetails}
          renderItem={renderOrderProducts}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ paddingBottom: 30 }}
        />
      </View>
      <Spacer space={SH(15)} />

      <OrderTotal {...{ orderData, orderDetails }} />

      <ReactNativeModal
        isVisible={isVisible}
        style={styles.modalStyle}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
      >
        <ManualEntry {...{ setIsVisible }} />
      </ReactNativeModal>
    </SafeAreaView>
  );
}
