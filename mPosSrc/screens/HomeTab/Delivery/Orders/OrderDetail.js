import React, { useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native';

import dayjs from 'dayjs';
import { ms } from 'react-native-size-matters';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SH } from '@/theme';
import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import OrderTotal from '../Components/OrderTotal';
import ProductList from '../Components/ProductList';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { getAuthData } from '@/selectors/AuthSelector';
import { acceptOrder } from '@/actions/DeliveryAction';
import { MPOS_NAVIGATION } from '@common/commonImports';
import mapCustomStyle from '@mPOS/components/MapCustomStyles';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { FullScreenLoader, Header, Spacer } from '@mPOS/components';

import styles from './styles';
import ReactNativeModal from 'react-native-modal';
import StatusDrawer from '../Components/StatusDrawer';
import { useState } from 'react';

export function OrderDetail(props) {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const orderData = props?.route?.params?.data;
  const customerDetail = orderData?.user_details;
  const deliveryDate = dayjs(orderData?.invoices?.delivery_date).format('DD MMM YYYY') || '';
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [isStatusDrawer, setIsStatusDrawer] = useState(false);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const onPressAcceptHandler = () => {
    const data = {
      orderId: orderData?.id,
      status: parseInt(orderData?.status) + 1,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, orderData?.status, (res) => {
        if (res?.msg) {
          goBack();
        }
      })
    );
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));

  const setHeaderText = (value) => {
    switch (value) {
      case '0':
        return strings.orderStatus.reviewOrders;
      case '1':
        return strings.orderStatus.ordersToAccepted;
      case '2':
        return strings.orderStatus.ordersToPrepared;
      case '3':
        return strings.orderStatus.assignedDriver;
      case '4':
        return strings.orderStatus.ordersPickedUp;
      case '5':
        return strings.orderStatus.ordersDelivered;
      case '7,8':
        return strings.orderStatus.ordersRejected;
      default:
        return strings.orderStatus.deliveryReturns;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <Header backRequired title={strings.profile.header} /> */}
      <Header
        orders
        backRequired
        title={strings.profile.header}
        rightIconOnpress={() => setIsStatusDrawer(true)}
      />

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
          <View style={styles.cancelButtonStyle}>
            <Text style={styles.cancelButtonText}>{strings.buttonStatus.cancelledBySeller}</Text>
          </View>
        ) : (
          <View style={styles.deliveryDetailsView}>
            <View style={{ flex: 0.35 }}>
              <Text style={styles.deliveryTypeText}>{deliveryDate}</Text>
            </View>

            <View style={styles.deliveryTimeViewStyle}>
              <Image source={Images.clockIcon} style={styles.clockImageStyle} />
              <Text
                style={[styles.deliveryTypeText, { paddingLeft: ms(4) }]}
              >{`${orderData?.preffered_delivery_start_time} ${orderData?.preffered_delivery_end_time}`}</Text>
            </View>
          </View>
        )}
      </View>

      <Spacer space={SH(15)} />

      {orderData?.status === 3 || orderData?.status === 4 || orderData?.status === 5 ? (
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
            region={{
              latitude: orderData?.coordinates?.[0] ?? 0.0,
              longitude: orderData?.coordinates?.[1] ?? 0.0,
              latitudeDelta: 0.0992,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: orderData?.coordinates?.[0] ?? 0.0,
                longitude: orderData?.coordinates?.[1] ?? 0.0,
              }}
            >
              <View>
                <Image source={Images.deliveryHomeIcon} style={styles.mapMarkerStyle} />
              </View>
            </Marker>
          </MapView>

          <Spacer space={SH(10)} />

          <View style={styles.driverViewStyle}>
            <View>
              <Text style={styles.driverStatusTextStyle}>
                {orderData?.status === 3
                  ? strings.orderStatus.driverAssigned
                  : orderData?.status === 4
                  ? strings.orderStatus.driverOnTheWay
                  : strings.orderStatus.delivered}
              </Text>
              <Text style={styles.driverArrivalTimeText}>
                {orderData?.status === 5
                  ? dayjs(orderData?.status_desc?.status_5_updated_at).format(
                      'DD MMM, YYYY  |  hh:mm a'
                    )
                  : null}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.trackButtonStyle}
              onPress={() => navigate(MPOS_NAVIGATION.deliveryStatus, { data: orderData })}
            >
              <Text style={styles.trackTextStyle}>{strings.delivery.track}</Text>
              <Image source={Images.track} style={styles.trackImageStyle} />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <Spacer space={SH(10)} />

      <ProductList {...{ orderData }} />

      <Spacer space={SH(20)} backgroundColor={COLORS.transparent} />

      <OrderTotal {...{ orderData, onPressAcceptHandler }} />

      {isLoading ? <FullScreenLoader /> : null}
      <ReactNativeModal
        isVisible={isStatusDrawer}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        onBackdropPress={() => setIsStatusDrawer(false)}
      >
        <StatusDrawer
          closeModal={() => setIsStatusDrawer(false)}
          selected={(value) => {
            setHeaderText(value);
            setSelectedStatus(value);
          }}
          selectedStatusOrder={selectedStatus}
        />
      </ReactNativeModal>
    </SafeAreaView>
  );
}
