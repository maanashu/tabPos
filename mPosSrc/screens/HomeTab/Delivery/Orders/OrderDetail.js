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
import { acceptOrder, deliOrder, todayOrders } from '@/actions/DeliveryAction';
import { MPOS_NAVIGATION } from '@common/commonImports';
import mapCustomStyle from '@mPOS/components/MapCustomStyles';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { FullScreenLoader, Header, Spacer } from '@mPOS/components';

import styles from './styles';
import ReactNativeModal from 'react-native-modal';
import StatusDrawer from '../Components/StatusDrawer';
import { useState } from 'react';

import { useEffect } from 'react';
import { getDelivery } from '@/selectors/DeliverySelector';
import { getOrderCount, getReviewDefault } from '@/actions/ShippingAction';

export function OrderDetail(props) {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const deliveryData = useSelector(getDelivery);
  const [orderList, setOrderList] = useState([]);
  const statusCount = deliveryData?.getOrderCount;
  const orders = deliveryData?.getReviewDef ?? [];
  const orderData = orders[props?.route?.params?.index ?? 0];
  // const orderData = props?.route?.params?.data;

  const customerDetail = orderData?.user_details;
  const deliveryDate =
    dayjs(orderData?.invoices?.delivery_date).format('DD MMM YYYY') &&
    dayjs(orderData?.invoices?.created_at).format('DD MMM YYYY');
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [isStatusDrawer, setIsStatusDrawer] = useState(false);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));
  const orderLoad = useSelector((state) =>
    isLoadingSelector([TYPES.TODAY_ORDER_STATUS, TYPES.DELIVERING_ORDER], state)
  );
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
    setTimeout(() => {
      checkOtherOrder();
    }, 500);
  };

  const checkOtherOrder = () => {
    const statusData = deliveryData?.getOrderCount;
    var index = 0;
    if (statusData[0].count > 0) {
    } else if (statusData[1].count > 0) {
      index = 1;
    } else if (statusData[2].count > 0) {
      index = 2;
    } else if (statusData[3].count > 0) {
      index = 3;
    } else if (statusData[4].count > 0) {
      index = 4;
    } else if (statusData[5].count > 0) {
      index = 5;
    } else if (statusData[6].count > 0) {
      index = 6;
    } else if (parseInt(statusCount?.[7]?.count) + parseInt(statusCount?.[8]?.count) > 0) {
      index = 7;
    } else if (statusData[9].count > 0) {
      index = 9;
    }
    dispatch(getReviewDefault(index));
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
      {orders.length > 0 && (
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
              >{`${customerDetail?.current_address?.street_address}\n${customerDetail?.current_address?.city}\n${customerDetail?.current_address?.state}, ${customerDetail?.current_address?.country}`}</Text>
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
      )}

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
      {orders.length > 0 && (
        <ProductList
          orderData={orderData}
          // {...{ orderData }}
        />
      )}

      <Spacer space={SH(20)} backgroundColor={COLORS.transparent} />

      {orders.length > 0 && (
        <OrderTotal
          orderData={orderData}
          onPressAcceptHandler={onPressAcceptHandler}

          // {...{ orderData, onPressAcceptHandler }}
        />
      )}
      {orders.length == 0 && (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.todayStatusTextStyle}>{strings.delivery.noOrders}</Text>
        </View>
      )}
      {isLoading ? <FullScreenLoader /> : null}
      {orderLoad ? <FullScreenLoader /> : null}

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
