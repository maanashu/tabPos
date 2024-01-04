import React, { useRef } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';

import MapView from 'react-native-maps';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SH } from '@/theme';
import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import OrderTotal from '../Components/OrderTotal';
import ProductList from '../Components/ProductList';
import { MPOS_NAVIGATION } from '@common/commonImports';
import mapCustomStyle from '@mPOS/components/MapCustomStyles';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { FullScreenLoader, Header, Spacer } from '@mPOS/components';
import RNPrint from 'react-native-print';
import styles from './styles';
import { getAuthData } from '@/selectors/AuthSelector';
import {
  acceptOrder,
  acceptOrderMPOS,
  getOrderCount,
  getOrders,
  getReviewDefault,
  getShippingOrderstatistics,
  orderStatusCount,
} from '@/actions/ShippingAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/ShippingOrderTypes';
import ReactNativeModal from 'react-native-modal';
import StatusDrawer from '../Components/StatusDrawer';
import { useState } from 'react';
import { getDelivery } from '@/selectors/DeliverySelector';
import { getShipping } from '@/selectors/ShippingSelector';
import { getPendingOrders } from '@/actions/DashboardAction';
import WebView from 'react-native-webview';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import Pdf from 'react-native-pdf';
import { backArrow2, printer } from '@/assets';

export function ShippingOrderDetail(props) {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const deliveryData = useSelector(getDelivery);
  const getOrdersData = useSelector(getDelivery);
  const ordersData = getOrdersData?.getReviewDef;
  const getAnalyticsData = useSelector(getAnalytics);

  const orderData = ordersData[props?.route?.params?.index ?? 0];
  const orders = orderData ?? {};
  const customerDetail = orderData?.user_details;

  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [isStatusDrawer, setIsStatusDrawer] = useState(false);
  const shippingData = useSelector(getShipping);

  const [openWebView, setOpenWebView] = useState(false);
  const [showLabelPdf, setShowLabelPdf] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const orderStatusCountData = shippingData?.orderStatus;

  const setHeaderText = (value) => {
    switch (value) {
      case '0':
        return strings.orderStatus.reviewOrders;
      case '3':
        return strings.orderStatus.printingLabel;
      case '4':
        return strings.orderStatus.trackOrders;
      case '5':
        return strings.orderStatus.ordersDelivered;
      case '7,8':
        return strings.orderStatus.ordersRejected;
      default:
        return strings.orderStatus.deliveryReturns;
    }
  };
  const onPressAcceptHandler = async () => {
    if (orderData?.status == 3) {
      printLabelHandler(orderData);
    } else {
      const data = {
        orderId: orderData?.id,
        status: orderData?.status === 0 ? 3 : 4,
        sellerID: sellerID,
      };
      const res = await dispatch(
        acceptOrderMPOS(data, data?.status, (res) => {
          if (res?.msg) {
            goBack();
          }
        })
      );

      if (res) {
        setTimeout(() => {
          checkOtherOrder();
        }, 200);
      }
    }
  };

  const onPressDeclineHandler = () => {
    const data = {
      orderId: orderData?.id,
      status: 7,
      sellerID: sellerID,
    };
    dispatch(
      acceptOrderMPOS(data, data?.status, (res) => {
        if (res?.msg) {
          goBack();
        }
      })
    );

    setTimeout(() => {
      checkOtherOrder();
    }, 200);
  };
  const trackOrderHandler = (info) => {
    if (info) {
      setShowLabelPdf(false);
      setPdfUrl('');
      setOpenWebView(true);
    }
  };

  const printLabelHandler = (item) => {
    if (item?.label_url) {
      setShowLabelPdf(true);
      setPdfUrl(item?.label_url);
      setOpenWebView(true);
      const data = {
        orderId: orderData?.id,
        status: 4,
        sellerID: sellerID,
      };
      dispatch(
        acceptOrderMPOS(data, data?.status, (res) => {
          if (res?.msg) {
            goBack();
          }
        })
      );
      // console.log('tesdsdsd', JSON.stringify(res));
      // if (res) {
      //   checkOtherOrder();
      // }
      setTimeout(() => {
        checkOtherOrder();
      }, 150);
    }
  };

  // const checkOtherOrder = () => {
  //   const statusData = shippingData?.orderStatus;
  //   var index = 0;
  //   if (statusData[0].count > 0) {
  //   } else if (statusData[1].count > 0) {
  //     index = 1;
  //   } else if (statusData[2].count > 0) {
  //     index = 2;
  //   } else if (statusData[3].count > 0) {
  //     index = 3;
  //   } else if (statusData[4].count > 0) {
  //     index = 4;
  //   } else if (statusData[5].count > 0) {
  //     index = 5;
  //   } else if (statusData[6].count > 0) {
  //     index = 6;
  //   } else if (parseInt(statusData?.[7]?.count) + parseInt(statusData?.[8]?.count) > 0) {
  //     index = 7;
  //   } else if (statusData[9].count > 0) {
  //     index = 9;
  //   }
  //   dispatch(getOrders(index));
  //   dispatch(getReviewDefault(index));
  //   dispatch(getOrderCount());
  // };

  //New

  const checkOtherOrder = () => {
    const statusData = shippingData?.orderStatus;

    var index = 0;
    if (statusData[0].count > 0) {
      if (statusData[3].count == 1) {
        index = 3;
      } else {
        index = 0;
      }
    } else if (statusData[3].count > 0) {
      if (statusData[3].count == 1) {
        index = 4;
      } else {
        index = 3;
      }
    } else if (statusData[4].count > 0) {
      if (statusData[4].count == 1) {
        index = 5;
      } else {
        index = 4;
      }
    } else if (statusData[5].count > 0) {
      if (statusData[5].count == 1) {
        index = 6;
      } else {
        index = 5;
      }
    } else if (statusData[6].count > 0) {
      if (statusData[6].count == 1) {
        index = 7;
      } else {
        index = 6;
      }
    }
    dispatch(getReviewDefault(index));
    dispatch(getOrders(index));

    // dispatch(getOrderCount());
    // dispatch(getPendingOrders());
  };

  const isLoading = useSelector((state) =>
    isLoadingSelector([TYPES.ACCEPT_ORDER, TYPES.GET_REVIEW_DEF], state)
  );

  const printPdf = async () => {
    await RNPrint.print({ filePath: pdfUrl });
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

      {!openWebView ? (
        <>
          {Object.keys(orders)?.length !== 0 && (
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
                <View>
                  <Text>{strings.buttonStatus.cancelledBySeller}</Text>
                </View>
              ) : (
                <View style={styles.deliveryDetailsView}>
                  <View style={styles.shippingTypeView}>
                    <Image
                      source={{ uri: orderData?.shipping_details?.image }}
                      style={styles.shippingType}
                    />
                    <Text style={styles.deliveryTypeText}>
                      {orderData?.shipping_details?.title}
                    </Text>
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
          )}
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
                    {orderData?.status === 4
                      ? 'Shipping on the way'
                      : strings.orderStatus.delivered}
                  </Text>
                  <Text style={styles.driverArrivalTimeText}>{'In transit'}</Text>
                </View>

                <TouchableOpacity
                  style={styles.trackButtonStyle}
                  onPress={
                    () => trackOrderHandler(getAnalyticsData?.getOrderData?.tracking_info?.url)
                    // navigate(MPOS_NAVIGATION.trackOrder, { id: orderData?.id })
                  }
                >
                  <Text style={styles.trackTextStyle}>{strings.delivery.track}</Text>
                  <Image source={Images.track} style={styles.trackImageStyle} />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <Spacer space={SH(10)} />
          {Object.keys(orders)?.length !== 0 && <ProductList {...{ orderData }} />}

          <Spacer space={SH(20)} />
          {Object.keys(orders)?.length !== 0 && (
            <OrderTotal {...{ orderData, onPressDeclineHandler, onPressAcceptHandler }} />
          )}
        </>
      ) : (
        <View style={[styles.container, { flexDirection: 'column' }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 20,
            }}
          >
            <TouchableOpacity
              style={styles.backView}
              onPress={() => {
                setOpenWebView(false);
                // checkOtherOrder();
                // dispatch(getReviewDefault(checkOtherOrder()));
              }}
            >
              <Image source={backArrow2} style={styles.backImageStyle} />
              <Text style={[styles.currentStatusText, { color: COLORS.white, paddingLeft: 0 }]}>
                {strings.deliveryOrders.back}
              </Text>
            </TouchableOpacity>

            {showLabelPdf && pdfUrl ? (
              <TouchableOpacity style={styles.backView} onPress={printPdf}>
                <Image source={printer} style={styles.backImageStyle} />
                <Text style={[styles.currentStatusText, { color: COLORS.white, paddingLeft: 5 }]}>
                  {'Print'}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <Spacer space={SH(20)} />

          {!showLabelPdf ? (
            <WebView
              source={{ uri: getAnalyticsData?.getOrderData?.tracking_info?.url }}
              style={{ flex: 1, backgroundColor: COLORS.textInputBackground }}
              startInLoadingState
              renderLoading={() => (
                <View style={styles.loader}>
                  <ActivityIndicator size={'large'} color={COLORS.primary} style={styles.loader} />
                </View>
              )}
            />
          ) : null}

          {showLabelPdf && pdfUrl && (
            <Pdf
              trustAllCerts={false}
              activityIndicatorProps={{
                color: COLORS.primary,
                progressTintColor: COLORS.primary,
              }}
              source={{
                uri: pdfUrl,
                cache: true,
              }}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`Number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`Current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link pressed: ${uri}`);
              }}
              style={{
                flex: 1,
              }}
            />
          )}
        </View>
      )}

      {isLoading ? <FullScreenLoader /> : null}
      {/* {orderLoad ? <FullScreenLoader /> : null} */}
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
