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

export function ReturnOrderDetail(props) {
  console.log('dfgjsdhfksdf dsgdsgs', props);

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

  const checkboxHandler = (id, count) => {
    const getArray = orderDetails?.findIndex((attr) => attr?.id === id);
    if (getArray !== -1) {
      const newProdArray = [...orderDetails];
      if (newProdArray[0]?.attributes?.length > 0) {
        newProdArray[getArray].qty = count;
        newProdArray[getArray].isChecked = !newProdArray[getArray].isChecked;
        setOrderDetails(newProdArray);
        setIsShowAttributeModal(false);
      } else {
        newProdArray[getArray].isChecked = !newProdArray[getArray].isChecked;
        setOrderDetails(newProdArray);
      }
    } else {
      alert('Product not found in the order');
    }
  };

  const renderOrderProducts = ({ item }) => (
    <View style={styles.orderproductView}>
      <View style={[styles.shippingOrderHeader, { paddingTop: 0 }]}>
        <Image
          source={item?.product_image ? { uri: item?.product_image } : Images.userImage}
          style={styles.userImageStyle}
        />
        <View style={{ paddingLeft: 10, width: ms(100) }}>
          <Text
            numberOfLines={1}
            style={[styles.nameTextStyle, { fontFamily: Fonts.Medium, textAlign: 'left' }]}
          >
            {item?.product_name ?? '-'}
          </Text>
        </View>
      </View>

      <Text style={[styles.nameTextStyle, { fontFamily: Fonts.Regular, color: COLORS.darkGray }]}>
        {`$${item?.price}  x  ${item?.qty}`}
      </Text>
      <Text style={[styles.nameTextStyle, { color: COLORS.darkGray }]}>
        {`$${item?.price * item?.qty}` ?? '-'}
      </Text>
      {item?.isChecked ? (
        <TouchableOpacity
          style={styles.checkBoxViewStyle}
          onPress={() => checkboxHandler(item?.id, item?.qty)}
        >
          <Image
            source={Images.mark}
            style={[styles.checkboxIconStyle, { tintColor: COLORS.primary }]}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.checkBoxViewStyle}
          onPress={() => checkboxHandler(item?.id, item?.qty)}
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

      <View style={{ height: SH(250) }}>
        <FlatList
          scrollEnabled
          data={orderDetails}
          renderItem={renderOrderProducts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
        />
      </View>

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
