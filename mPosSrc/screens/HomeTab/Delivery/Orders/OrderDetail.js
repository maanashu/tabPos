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
import { getOrderCount, getReviewDefault } from '@/actions/DeliveryAction';
import VerifyPickupOtpModal from '../Components/VerifyPickupOtpModal';
import moment from 'moment';

export function OrderDetail(props) {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const deliveryData = useSelector(getDelivery);
  const [orderList, setOrderList] = useState([]);
  const statusCount = deliveryData?.getOrderCount;
  const orders = deliveryData?.getReviewDef ?? [];
  const orderData = orders[props?.route?.params?.index ?? 0];
  // const orderData = props?.route.params.data;
  // console.log('orderData', JSON.stringify(orderData));

  // const orderData = props?.route?.params?.data;
  const [pickupModalVisible, setPickupModalVisible] = useState(false);
  const customerDetail = orderData?.user_details;
  const deliveryDate =
    moment.utc(orderData?.invoices?.delivery_date).format('DD MMM YYYY') &&
    moment.utc(orderData?.invoices?.created_at).format('DD MMM YYYY');
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [isStatusDrawer, setIsStatusDrawer] = useState(false);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.ACCEPT_ORDER], state));
  const orderLoad = useSelector((state) =>
    isLoadingSelector([TYPES.TODAY_ORDER_STATUS, TYPES.DELIVERING_ORDER], state)
  );
  console.log('ordsdedsd', JSON.stringify(orderData));
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
    if (orderData?.delivery_option == '3' && orderData?.status == '2') {
      setPickupModalVisible(true);
    } else {
      acceptOrderFn('normal');
    }
  };

  const checkOtherOrder = () => {
    const statusData = deliveryData?.getOrderCount;
    let index = 0;
    for (let i = 0; i < statusData.length; i++) {
      const currentCount = statusData[i].count;
      if (currentCount > 0) {
        if (currentCount === 1 && i !== statusData.length - 1) {
          index = i + 1;
        } else {
          index = i;
        }
        break;
      }
    }

    dispatch(getReviewDefault(index));
  };

  // const checkOtherOrder = () => {
  //   const statusData = deliveryData?.getOrderCount;
  //   console.log('STATUSSS', JSON.stringify(statusData));
  //   var index = 0;
  //   if (statusData[0].count > 0) {
  //   } else if (statusData[1].count > 0) {
  //     if (statusData[1].count == 1) {
  //       index = 1 + 1;
  //     } else {
  //       index = 1;
  //     }
  //   } else if (statusData[2].count > 0) {
  //     if (statusData[1].count == 1) {
  //       index = 2 + 1;
  //     } else {
  //       index = 2;
  //     }
  //   } else if (statusData[3].count > 0) {
  //     if (statusData[1].count == 1) {
  //       index = 3 + 1;
  //     } else {
  //       index = 3;
  //     }
  //   } else if (statusData[4].count > 0) {
  //     if (statusData[1].count == 1) {
  //       index = 4 + 1;
  //     } else {
  //       index = 4;
  //     }
  //   } else if (statusData[5].count > 0) {
  //     if (statusData[1].count == 1) {
  //       index = 5 + 1;
  //     } else {
  //       index = 5;
  //     }
  //   } else if (statusData[6].count > 0) {
  //     if (statusData[1].count == 1) {
  //       index = 6 + 1;
  //     } else {
  //       index = 6;
  //     }
  //   } else if (parseInt(statusCount?.[7]?.count) + parseInt(statusCount?.[8]?.count) > 0) {
  //     if (statusData[1].count == 1) {
  //       index = 9;
  //     } else {
  //       index = 7;
  //     }
  //   } else if (statusData[9].count > 0) {
  //     index = 9;
  //   }
  //   console.log('STATUSSS_INDEX', JSON.stringify(index));

  //   dispatch(getReviewDefault(index));
  // };

  const changeOrderStatusAfterPickup = (id) => {
    setPickupModalVisible(false);
    acceptOrderFn('pickup');
  };

  const acceptOrderFn = (type) => {
    const data = {
      orderId: orderData?.id,
      status: type == 'pickup' ? 5 : parseInt(orderData?.status) + 1,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrder(data, orderData?.status, (res) => {
        console.log('red=-=-=-=-=-', res);
        if (res?.msg) {
          goBack();
        }
      })
    );
    setTimeout(() => {
      checkOtherOrder();
    }, 200);
  };

  const declineHandler = () => {
    const data = {
      orderId: orderData?.id,
      status: 8,
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
    }, 100);
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
      {orders?.length > 0 ? (
        <>
          {orders?.length > 0 && customerDetail !== null && (
            <View style={styles.userDetailView}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={
                    customerDetail?.profile_photo
                      ? { uri: customerDetail?.profile_photo }
                      : Images.user
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
                  <Text style={styles.cancelButtonText}>
                    {strings.buttonStatus.cancelledByuser}
                  </Text>
                </View>
              ) : orderData?.status === 8 ? (
                <View style={styles.cancelButtonStyle}>
                  <Text style={styles.cancelButtonText}>
                    {strings.buttonStatus.cancelledBySeller}
                  </Text>
                </View>
              ) : (
                <View style={styles.deliveryDetailsView}>
                  <View style={{ flex: 0.35 }}>
                    <Text style={styles.deliveryTypeText}>{deliveryDate}</Text>
                  </View>

                  {orderData?.delivery_option !== '3' && (
                    <View style={styles.deliveryTimeViewStyle}>
                      <Image source={Images.clockIcon} style={styles.clockImageStyle} />
                      <Text style={[styles.deliveryTypeText, { paddingLeft: ms(4) }]}>
                        {`${orderData?.preffered_delivery_start_time} ${orderData?.preffered_delivery_end_time}`}
                      </Text>
                    </View>
                  )}
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
                      : orderData?.delivery_option == '3'
                      ? strings.orderStatus.pickedUp
                      : strings.orderStatus.delivered}
                  </Text>
                  <Text style={styles.driverArrivalTimeText}>
                    {orderData?.status === 5
                      ? moment
                          .utc(orderData?.status_desc?.status_5_updated_at)
                          .format('DD MMM, YYYY  |  hh:mm a')
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
              declineHandler={declineHandler}
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
          <VerifyPickupOtpModal
            visible={pickupModalVisible}
            orderData={orderData}
            changeOrderStatus={() => changeOrderStatusAfterPickup(orderData?.id)}
            onClose={() => setPickupModalVisible(!pickupModalVisible)}
          />
        </>
      ) : (
        <View style={styles.emptyViewStyle}>
          <Text style={styles.todayStatusTextStyle}>{strings.delivery.noOrders}</Text>
        </View>
      )}
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
