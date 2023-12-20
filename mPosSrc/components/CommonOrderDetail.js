import React, { useRef } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';

import dayjs from 'dayjs';
import { ms } from 'react-native-size-matters';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SF, SH, SW } from '@/theme';
import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
// import OrderTotal from '../Components/OrderTotal';
// import ProductList from '../Components/ProductList';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { getAuthData } from '@/selectors/AuthSelector';
import { acceptOrder, deliOrder, todayOrders } from '@/actions/DeliveryAction';
import { MPOS_NAVIGATION } from '@common/commonImports';
import mapCustomStyle from '@mPOS/components/MapCustomStyles';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { FullScreenLoader, Header, Spacer } from '@mPOS/components';

// import styles from '@mPOS/screens/HomeTab/Delivery/styles';
import ReactNativeModal from 'react-native-modal';
import StatusDrawer from '@mPOS/screens/HomeTab/Delivery/Components/StatusDrawer';
import { useState } from 'react';

import { useEffect } from 'react';
import { getDelivery } from '@/selectors/DeliverySelector';
import { getOrderCount, getReviewDefault } from '@/actions/ShippingAction';
import { ScreenWrapper } from '@/components';
import { Fonts } from '@/assets';
import ProductList from '@mPOS/screens/HomeTab/Delivery/Components/ProductList';
import OrderTotal from '@mPOS/screens/Return/Components/OrderTotal';
import { number } from 'prop-types';

export function CommonOrderDetail(props) {
  const mapRef = useRef();
  const dispatch = useDispatch();
  const deliveryData = useSelector(getDelivery);
  const orders = deliveryData?.getReviewDef ?? [];
  const orderData = props?.route?.params?.data;

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

  const renderProductItem = ({ item, index }) => (
    <View style={styles.productItemViewStyle}>
      <View style={{ justifyContent: 'center' }}>
        <Image
          source={item?.product_image ? { uri: item?.product_image } : Images.noproduct}
          style={styles.productImageStyle}
        />
      </View>

      <View style={styles.productDetailView}>
        <Text numberOfLines={1} style={styles.productnameTextStyle}>
          {item?.product_name}
        </Text>

        <Text style={styles.productQtyPriceText}>{`$${item?.price} X ${item?.qty}`}</Text>
      </View>

      <View style={styles.totalAmountView}>
        <Text style={styles.productQtyPriceText}>{`$${item?.price * item?.qty}`}</Text>
      </View>
    </View>
  );

  return (
    <ScreenWrapper>
      <View style={styles.container}>
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

          {orderData?.delivery_option == '1' ||
            (orderData?.delivery_option == '4' && (
              <>
                <Spacer space={SH(20)} />
                <View style={styles.deliveryDetailsView}>
                  <View style={{ flex: 0.35 }}>
                    {orderData?.shipping_details ? (
                      <Text style={styles.deliveryTypeText}>
                        {orderData?.shipping_details?.title}
                      </Text>
                    ) : orderData?.shipping_details ? (
                      <Text style={styles.deliveryTypeText}>
                        {orderData?.delivery_details?.title}
                      </Text>
                    ) : null}
                  </View>
                  {orderData?.delivery_option == '1' && (
                    <View style={styles.deliveryTimeViewStyle}>
                      <Image source={Images.clockIcon} style={styles.clockImageStyle} />
                      <Text
                        style={[styles.deliveryTypeText, { paddingLeft: ms(4) }]}
                      >{`${orderData?.preffered_delivery_start_time} ${orderData?.preffered_delivery_end_time}`}</Text>
                    </View>
                  )}
                </View>
              </>
            ))}
        </View>
        <Spacer space={SH(10)} />
        {orderData?.delivery_option == '1' ||
          (orderData?.delivery_option == '4' && (
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
                    {dayjs(orderData?.date).format('DD MMM, YYYY  |  hh:mm a')}
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
          ))}

        <Spacer space={SH(10)} />

        {/* <ProductList orderData={orderData} {...{ orderData }} /> */}

        <View>
          <FlatList
            renderItem={renderProductItem}
            data={orderData?.order_details}
            extraData={orderData?.order_details}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
        <View style={{ flex: 1 }} />
        <Spacer space={SH(10)} />
        <View style={styles.billViewStyle}>
          <Text style={styles.totalItemsStyles}>
            {`${strings.delivery.totalItems} ${
              orderData?.order_details?.length > 1
                ? `${orderData?.order_details?.length}`
                : `${orderData?.order_details?.length}`
            }`}
          </Text>
          <View style={styles.horizontalLineStyle} />
          <Spacer space={SH(10)} />
          <View style={styles.orderDetailView}>
            <View style={{ flex: 0.5 }}>
              <Text style={styles.deliveryOrderTextStyle}>{strings.delivery.orderDate}</Text>
              <Text style={[styles.deliveryDateTextStyle, { fontSize: SF(14) }]}>{`${dayjs(
                orderData?.created_at
              ).format('DD/MM/YYYY')}`}</Text>
            </View>

            <View>
              <Text style={styles.deliveryOrderTextStyle}>{strings.delivery.orderid}</Text>
              <Text
                style={[styles.deliveryDateTextStyle, { fontSize: SF(14) }]}
              >{`#${orderData?.id}`}</Text>
            </View>
          </View>
          <View style={styles.horizontalLineStyle} />
          <Spacer space={SH(15)} />
          <View style={styles.amountViewStyle}>
            <Text style={styles.labelTextStyle}>{strings.delivery.subTotal}</Text>
            <Text style={styles.priceValueText}>{`$${
              Number(orderData?.actual_amount)?.toFixed(2) || '0.00'
            }`}</Text>
          </View>
          <Spacer space={SH(4)} />
          <View style={styles.amountViewStyle}>
            <Text style={styles.labelTextStyle}>{strings.delivery.totalTax}</Text>
            <Text style={styles.priceValueText}>{`$${
              Number(orderData?.tax)?.toFixed(2) || '0.00'
            }`}</Text>
          </View>
          <Spacer space={SH(4)} />
          <View style={styles.amountViewStyle}>
            <Text style={styles.labelTextStyle}>{'Tip'}</Text>
            <Text style={styles.priceValueText}>{`$${
              Number(orderData?.tips)?.toFixed(2) || '0.00'
            }`}</Text>
          </View>
          <Spacer space={SH(4)} />
          <View style={styles.amountViewStyle}>
            <Text style={styles.labelTextStyle}>{strings.delivery.discount}</Text>
            <Text style={styles.priceValueText}>{`$${
              Number(orderData?.discount)?.toFixed(2) || '0.00'
            }`}</Text>
          </View>
          <Spacer space={SH(4)} />
          {(orderData?.delivery_charge !== '0' || orderData?.shipping_charge !== '0') && (
            <View style={styles.amountViewStyle}>
              <Text style={styles.labelTextStyle}>
                {orderData?.delivery_charge !== '0'
                  ? strings.deliveryOrders.deliveryCharges
                  : strings.deliveryOrders.shippingCharges}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.priceValueText}>{'$'}</Text>
                <Text style={styles.priceValueText}>
                  {orderData?.delivery_charge !== '0'
                    ? Number(orderData?.delivery_charge)?.toFixed(2)
                    : Number(orderData?.shipping_charge)?.toFixed(2)}
                </Text>
              </View>
            </View>
          )}
          <Spacer space={SH(4)} />
          <View style={styles.dashedHorizontalLine} />
          <Spacer space={SH(15)} />
          <View style={styles.amountViewStyle}>
            <Text style={styles.totalValueText}>{strings.delivery.total}</Text>
            <Text style={styles.totalValueText}>
              ${Number(orderData?.payable_amount)?.toFixed(2 || '0.00')}
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.inputBorder,
    paddingHorizontal: ms(12),
  },
  userDetailView: {
    borderRadius: 5,
    paddingHorizontal: ms(10),
    paddingVertical: ms(18),
    backgroundColor: COLORS.white,
  },
  profileImageStyle: {
    width: SW(36),
    height: SW(36),
    borderRadius: SW(18),
    resizeMode: 'cover',
  },
  productnameTextStyle: {
    fontFamily: Fonts.Medium,
    fontSize: SF(12),
    color: COLORS.solid_grey,
  },
  addressTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.text,
    paddingTop: 2,
  },
  cancelButtonStyle: {
    backgroundColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: ms(10),
    paddingVertical: ms(18),
    marginHorizontal: ms(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryDetailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.dark_grey,
    borderRadius: 5,
    paddingHorizontal: ms(8),
    paddingVertical: ms(12),
    alignItems: 'center',
  },
  deliveryTypeTextStyle: {
    fontSize: SF(11),
    color: COLORS.grayShade,
    fontFamily: Fonts.SemiBold,
  },
  deliveryTypeText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(11),
    color: COLORS.white,
    textAlign: 'center',
  },
  clockImageStyle: {
    width: SW(12),
    height: SW(12),
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  deliveryTimeViewStyle: {
    flex: 0.55,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapViewStyle: {
    height: ms(160),
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
  },
  mapMarkerStyle: {
    height: ms(30),
    width: ms(30),
    resizeMode: 'contain',
  },
  driverViewStyle: {
    backgroundColor: COLORS.inputBorder,
    borderRadius: 10,
    padding: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  driverArrivalTimeText: {
    fontFamily: Fonts.Regular,
    color: COLORS.text,
    fontSize: ms(14),
  },
  trackTextStyle: {
    fontFamily: Fonts.Regular,
    color: COLORS.white,
    fontSize: SF(12),
    paddingHorizontal: ms(5),
  },
  trackButtonStyle: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: ms(9),
    paddingVertical: ms(8),
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackImageStyle: {
    width: SW(16),
    height: SW(16),
    resizeMode: 'contain',
  },
  billViewStyle: {
    height: ms(250),
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: ms(20),
    paddingVertical: ms(10),
  },
  totalItemsStyles: {
    fontSize: SF(16),
    paddingBottom: ms(10),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  horizontalLineStyle: {
    borderWidth: 0.6,
    borderColor: COLORS.inputBorder,
  },
  orderDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  deliveryOrderTextStyle: {
    fontSize: SF(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  deliveryDateTextStyle: {
    fontSize: SF(10),
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
  },
  deliveryOrderTextStyle: {
    fontSize: SF(10),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  amountViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelTextStyle: {
    fontSize: SF(12),
    color: COLORS.text,
    fontFamily: Fonts.MaisonRegular,
  },
  priceValueText: {
    fontSize: SF(12),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  totalValueText: {
    fontSize: SF(16),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonBold,
  },
  productItemViewStyle: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    borderColor: COLORS.inputBorder,
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(12),
    paddingVertical: ms(7),
    justifyContent: 'space-between',

    marginVertical: ms(2),
  },
  productImageStyle: {
    width: ms(50),
    height: ms(50),
    resizeMode: 'cover',
  },
  productDetailView: {
    paddingLeft: ms(10),
    flex: 0.75,
    justifyContent: 'center',
  },
  productImageStyle: {
    width: ms(50),
    height: ms(50),
    resizeMode: 'cover',
  },
  productQtyPriceText: {
    fontSize: SF(12),
    paddingTop: ms(5),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  totalItemsStyles: {
    fontSize: SF(16),
    paddingBottom: ms(10),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  rightArrowIconStyle: {
    width: SW(20),
    height: SW(20),
    resizeMode: 'contain',
  },
  detailMap: {
    height: ms(80),
    width: '100%',
    borderRadius: 10,
  },
});
