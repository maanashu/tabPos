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

import { Images } from '@/assets';
import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { Header, Spacer } from '@/components';
import ManualEntry from './Components/ManualEntry';

import styles from './styles';
import { getProductByUpc } from '@/actions/DeliveryAction';

export function ReturnOrderDetail(props) {
  const dispatch = useDispatch();
  const orderData = props?.route?.params?.data;
  const customerDetail = orderData?.order?.user_details?.user_profiles;

  const [productUpc, setProductUpc] = useState('');
  const [orderDetails, setOrderDetails] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

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
            source={item?.product_image ? { uri: item?.product_image } : Images.userImage}
            style={styles.userImageStyle}
          />
          <View style={{ paddingLeft: 10, width: ms(100) }}>
            <Text numberOfLines={1} style={[styles.nameTextStyle, { textAlign: 'left' }]}>
              {item?.product_name ?? '-'}
            </Text>
          </View>
        </View>
        <Text style={[styles.nameTextStyle, { color: COLORS.grayShade }]}>
          {`$${item?.price}` ?? '-'}
        </Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.grayShade }]}>{item?.qty ?? '-'}</Text>
        <Text style={[styles.nameTextStyle, { color: COLORS.grayShade }]}>
          {`$${item?.price * item?.qty}` ?? '-'}
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
              source={Images.darkBlueBox}
              style={[styles.infoIconStyle, { tintColor: COLORS.primary }]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => checkboxHandler(item?.id, item?.qty)}>
            <Image source={Images.blankCheckBox} style={styles.checkboxIconStyle} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

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

          <View style={{ paddingLeft: 10 }}>
            <Text
              style={styles.nameTextStyle}
            >{`${customerDetail?.firstname} ${customerDetail?.lastname}`}</Text>
            <Text
              style={styles.addressTextStyle}
            >{`${customerDetail?.current_address?.street_address}, ${customerDetail?.current_address?.city}, ${customerDetail?.current_address?.state}, ${customerDetail?.current_address?.country}`}</Text>
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

      <View style={{ height: SH(400) }}>
        <FlatList
          scrollEnabled
          data={orderDetails}
          renderItem={renderOrderProducts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 130 }}
        />
      </View>

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
