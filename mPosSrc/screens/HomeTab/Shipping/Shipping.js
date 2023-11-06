import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import dayjs from 'dayjs';
import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { Images } from '@mPOS/assets';
import { COLORS, SH } from '@/theme';
import Graph from './Components/Graph';
import { MPOS_NAVIGATION } from '@common/commonImports';
import { strings } from '@mPOS/localization';
import StatusDrawer from './Components/StatusDrawer';
import { navigate } from '@mPOS/navigation/NavigationRef';
import OrderConvertion from './Components/OrderConvertion';
import { Header, ScreenWrapper, Spacer } from '@mPOS/components';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';

import styles from './styles';
import { getShipping } from '@/selectors/ShippingSelector';
import {
  getGraphOrders,
  getOrderCount,
  getReviewDefault,
  getShippingOrderstatistics,
  todayCurrentStatus,
  todayShippingStatus,
} from '@/actions/ShippingAction';
import { TYPES } from '@/Types/ShippingOrderTypes';
import { getAuthData } from '@/selectors/AuthSelector';

export function Shipping() {
  const dispatch = useDispatch();
  const getShippingData = useSelector(getShipping);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const orders = getShippingData?.orders?.data;
  const shippingOrders = getShippingData?.todayShippingStatus?.[0]?.count;
  const shippedOrders = getShippingData?.todayShippingStatus?.[1]?.count;
  const shippingTypeOrders = getShippingData?.todayCurrentStatus;

  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [isStatusDrawer, setIsStatusDrawer] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(todayShippingStatus());
      dispatch(todayCurrentStatus());
      dispatch(getReviewDefault(0));
      dispatch(getGraphOrders());
      dispatch(getShippingOrderstatistics());
      dispatch(getOrderCount());
    }, [])
  );

  const isShippingOrder = useSelector((state) =>
    isLoadingSelector([TYPES.TODAY_SHIPPING_STATUS, TYPES.TODAY_CURRENT_STATUS], state)
  );

  const renderShippingItem = ({ item, index }) => (
    <View style={styles.deliveryItemViewStyle}>
      {isShippingOrder ? (
        <View style={[styles.deliveryItemViewStyle, { borderWidth: 0, paddingVertical: 0 }]}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <>
          <View>
            <Image source={{ uri: item?.shipping_image }} style={styles.deliveryTypeIconStyle} />
          </View>

          <View style={{ paddingLeft: ms(10) }}>
            <Text style={styles.deliveryTypeTextStyle}>{item?.shiping_name.toUpperCase()}</Text>
            <Text style={styles.deliveryTypeCountTextStyle}>{item?.count}</Text>
          </View>
        </>
      )}
    </View>
  );

  const renderOrderItem = ({ item, index }) => {
    const deliveryDate = dayjs(item?.invoices?.delivery_date).format('DD MMM YYYY') || '';
    return (
      <View style={styles.orderItemViewStyle}>
        <View style={{ flex: 0.4 }}>
          <Text style={styles.shippingOrderTextStyle}>{`${item?.user_details?.firstname}`}</Text>

          <View style={styles.itemAndPaymentView}>
            <Image
              source={Images.pin}
              style={[styles.payIconStyle, { tintColor: COLORS.darkGray }]}
            />
            <Text style={styles.priceTextStyle}>{`$${
              item?.distance ? `${item.distance} miles` : '0'
            }`}</Text>
          </View>
        </View>

        <View style={{ flex: 0.25 }}>
          <Text style={styles.shippingOrderTextStyle}>
            {item?.order_details?.length > 1
              ? `${item?.order_details?.length} Items`
              : `${item?.order_details?.length} Item`}
          </Text>

          <View style={styles.itemAndPaymentView}>
            <Image source={Images.pay} style={styles.payIconStyle} />
            <Text style={styles.priceTextStyle}>{`$${item?.actual_amount}`}</Text>
          </View>
        </View>

        <View style={{ flex: 0.3 }}>
          <Text style={styles.deliveryDateTextStyle}>{deliveryDate}</Text>

          <View style={styles.itemAndPaymentView}>
            <Image
              source={Images.clockIcon}
              style={[styles.payIconStyle, { tintColor: COLORS.primary }]}
            />
            <Text style={styles.priceTextStyle}>{`${
              item?.preffered_delivery_start_time ?? '00 -'
            } ${item?.preffered_delivery_end_time ?? '00'}`}</Text>
          </View>
        </View>

        <View style={{ flex: 0.06 }}>
          <Image source={Images.rightArrow} style={styles.rightArrowIconStyle} />
        </View>
      </View>
    );
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dispatch(todayShippingStatus());
    dispatch(todayCurrentStatus());
    dispatch(getReviewDefault(0));
    dispatch(getGraphOrders());
    dispatch(getShippingOrderstatistics());
    setRefreshing(false);
  }, []);

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

  return (
    <ScreenWrapper>
      <Header
        orders
        backRequired
        title={strings.profile.header}
        rightIconOnpress={() => setIsStatusDrawer(true)}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary, COLORS.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.todayStatusTextStyle}>{strings.shipping.todayShippingStatus}</Text>

          <View style={styles.shippingOrderViewStyle}>
            <Text style={styles.shippingOrderTextStyle}>{strings.shipping.shippingOrders}</Text>
            {isShippingOrder ? (
              <View style={styles.loaderView}>
                <ActivityIndicator size={'small'} color={COLORS.primary} />
              </View>
            ) : (
              <Text style={styles.shippingOrderTextStyle}>{shippingOrders ?? '0'}</Text>
            )}
          </View>

          <View style={styles.shippingOrderViewStyle}>
            <Text style={styles.shippingOrderTextStyle}>{strings.shipping.shippedOrders}</Text>
            {isShippingOrder ? (
              <View style={styles.loaderView}>
                <ActivityIndicator size={'small'} color={COLORS.primary} />
              </View>
            ) : (
              <Text style={styles.shippingOrderTextStyle}>{shippedOrders ?? '0'}</Text>
            )}
          </View>

          <View style={{ marginTop: SH(20) }}>
            <FlatList
              data={shippingTypeOrders}
              extraData={shippingTypeOrders}
              renderItem={renderShippingItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

        <Spacer space={SH(15)} backgroundColor={COLORS.transparent} />

        <View style={styles.ordersHeaderStyle}>
          <Text style={styles.orderTextStyle}>{setHeaderText(selectedStatus)}</Text>

          {orders?.length > 0 ? (
            <TouchableOpacity
              style={styles.viewAllButtonStyle}
              onPress={() =>
                navigate(MPOS_NAVIGATION.shippingOrderList, {
                  selected: selectedStatus,
                })
              }
            >
              <Text style={styles.viewAllTextStyle}>{strings.delivery.viewAll}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <Spacer space={SH(15)} backgroundColor={COLORS.transparent} />

        <View style={styles.ordersContainer}>
          <FlatList
            data={orders?.slice(0, 4) ?? []}
            extraData={orders}
            renderItem={renderOrderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View style={styles.emptyViewStyle}>
                <Text style={styles.todayStatusTextStyle}>{strings.delivery.noOrders}</Text>
              </View>
            )}
          />
        </View>

        <Spacer space={SH(15)} backgroundColor={COLORS.transparent} />

        <Graph />

        <Spacer space={SH(15)} backgroundColor={COLORS.transparent} />

        <OrderConvertion />
      </ScrollView>

      <ReactNativeModal
        isVisible={isStatusDrawer}
        animationIn={'slideInRight'}
        animationOut={'slideOutLeft'}
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
    </ScreenWrapper>
  );
}
