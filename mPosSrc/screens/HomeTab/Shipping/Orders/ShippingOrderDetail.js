import React, { useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';

import dayjs from 'dayjs';
import MapView from 'react-native-maps';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { SH } from '@/theme';
import { FullScreenLoader, Header, Spacer } from '@mPOS/components';

import styles from './styles';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';

import mapCustomStyle from '@mPOS/components/MapCustomStyles';

import { getAuthData } from '@mPOS/selectors/AuthSelector';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import { DELIVERY_TYPES } from '@mPOS/Types/DeliveryTypes';
import OrderTotal from '../Components/OrderTotal';
import ProductList from '../Components/ProductList';
import { SHIPPING_TYPES } from '@mPOS/Types/ShippingTypes';
import { acceptOrder, getOrders } from '@mPOS/actions/ShippingActions';

export function ShippingOrderDetail(props) {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const orderData = props?.route?.params?.data;
  const customerDetail = orderData?.user_details;
  const shippingDate = dayjs(orderData?.invoices?.delivery_date).format('DD MMM YYYY') || '';

  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const onPressAcceptHandler = () => {
    const data = {
      orderId: orderData?.id,
      status: orderData?.status === 0 ? 3 : 4,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, data?.status, (res) => {
        if (res?.msg) {
          goBack();
        }
      })
    );
  };

  const isLoading = useSelector((state) => isLoadingSelector([SHIPPING_TYPES.ACCEPT_ORDER], state));

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

        {orderData?.status === 7 ? (
          <View style={styles.cancelButtonStyle}>
            <Text style={styles.cancelButtonText}>{strings.buttonStatus.cancelledByuser}</Text>
          </View>
        ) : orderData?.status === 8 ? (
          <View>
            <Text>{strings.buttonStatus.cancelledBySeller}</Text>
          </View>
        ) : (
          <View style={styles.deliveryDetailsView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flex: 0.45,
              }}
            >
              <Image
                source={{ uri: orderData?.shipping_details?.image }}
                style={styles.shippingType}
              />
              <Text style={styles.deliveryTypeText}>{orderData?.shipping_details?.title}</Text>
            </View>

            <View style={styles.deliveryTimeViewStyle}>
              <Image source={Images.clockIcon} style={styles.clockImageStyle} />
              <Text style={[styles.deliveryTypeText, { paddingLeft: ms(4) }]}>{`${
                orderData?.preffered_delivery_start_time ?? '00 -'
              } ${orderData?.preffered_delivery_end_time ?? '00'}`}</Text>
            </View>
          </View>
        )}
      </View>

      <Spacer space={SH(15)} />

      {orderData?.status === 4 || orderData?.status === 5 ? (
        <View style={styles.mapViewStyle}>
          <MapView
            ref={mapRef}
            style={styles.detailMap}
            customMapStyle={mapCustomStyle}
            showCompass
            initialRegion={{
              latitude: orderData?.coordinates?.[0] ?? 0.0,
              longitude: orderData?.coordinates?.[1] ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
          ></MapView>

          <Spacer space={SH(10)} />

          <View style={styles.driverViewStyle}>
            <View>
              <Text style={styles.driverStatusTextStyle}>
                {orderData?.status === 4 ? 'Shipping on the way' : strings.orderStatus.delivered}
              </Text>
              <Text style={styles.driverArrivalTimeText}>{'In transit'}</Text>
            </View>

            <TouchableOpacity
              style={styles.trackButtonStyle}
              onPress={() => navigate(MPOS_NAVIGATION.trackOrder, { id: orderData?.id })}
            >
              <Text style={styles.trackTextStyle}>{strings.delivery.track}</Text>
              <Image source={Images.track} style={styles.trackImageStyle} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <Spacer space={SH(10)} />
      <ProductList {...{ orderData }} />

      <Spacer space={SH(20)} />

      <OrderTotal {...{ orderData, onPressAcceptHandler }} />

      {isLoading ? <FullScreenLoader /> : null}
    </SafeAreaView>
  );
}
