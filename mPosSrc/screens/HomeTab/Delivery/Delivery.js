import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import {
  getOrders,
  todayOrders,
  getGraphOrders,
  getDeliveryTypesOrders,
  getOrderstatistics,
  getOrderCount,
} from '@mPOS/actions/DeliveryActions';
import { Images } from '@mPOS/assets';
import { COLORS, SH } from '@/theme';
import Graph from './Components/Graph';
import { strings } from '@mPOS/localization';
import { NAVIGATION } from '@mPOS/constants';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { DELIVERY_TYPES } from '@mPOS/Types/DeliveryTypes';
import OrderConvertion from './Components/OrderConvertion';
import { getDelivery } from '@mPOS/selectors/DeliverySelector';
import { Header, ScreenWrapper, Spacer } from '@mPOS/components';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import DeliveryTypeOrders from './Components/DeliveryTypeOrders';

import styles from './styles';
import { RefreshControl } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import StatusDrawer from './Components/StatusDrawer';

export function Delivery() {
  const dispatch = useDispatch();
  const deliveryData = useSelector(getDelivery);
  const todayDeliveryOrders = deliveryData?.todayOrderStatus?.[0]?.count ?? '0';
  const orders = deliveryData?.orders?.data ?? [];

  const [refreshing, setRefreshing] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('0');
  const [isStatusDrawer, setIsStatusDrawer] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(todayOrders());
      dispatch(getDeliveryTypesOrders());
      dispatch(getOrders(0));
      dispatch(getGraphOrders());
      dispatch(getOrderstatistics());
      dispatch(getOrderCount());
    }, [])
  );

  const renderOrderItem = ({ item, index }) => {
    const deliveryDate = dayjs(item?.invoices?.delivery_date).format('DD MMM YYYY') || '';
    return (
      <TouchableOpacity
        style={styles.orderItemViewStyle}
        onPress={() => navigate(NAVIGATION.orderDetail, { data: item })}
      >
        <View style={{ flex: 0.4 }}>
          <Text style={styles.deliveryOrderTextStyle}>{`${item?.user_details?.firstname}`}</Text>

          <View style={styles.itemAndPaymentView}>
            <Image source={Images.pin} style={[styles.payIconStyle, { tintColor: COLORS.text }]} />
            <Text style={styles.priceTextStyle}>{`$${
              item?.distance ? `${item.distance} miles` : '0'
            }`}</Text>
          </View>
        </View>

        <View style={{ flex: 0.25 }}>
          <Text style={styles.deliveryOrderTextStyle}>
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
              style={[styles.payIconStyle, { tintColor: COLORS.darkBlue }]}
            />
            <Text style={styles.priceTextStyle}>{`$${item?.payable_amount}`}</Text>
          </View>
        </View>

        <View style={{ flex: 0.06 }}>
          <Image source={Images.rightArrow} style={styles.rightArrowIconStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  const isDeliveryOrder = useSelector((state) =>
    isLoadingSelector(
      [DELIVERY_TYPES.TODAY_ORDER_STATUS, DELIVERY_TYPES.GET_DELIVERY_TYPES_ORDERS],
      state
    )
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    dispatch(todayOrders());
    dispatch(getDeliveryTypesOrders());
    dispatch(getOrders(0));
    dispatch(getGraphOrders());
    dispatch(getOrderstatistics());
    dispatch(getOrderCount());
    setRefreshing(false);
  }, []);

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
    <ScreenWrapper>
      <Header
        backRequired
        title={strings.profile.header}
        orders
        rightIconOnpress={() => setIsStatusDrawer(true)}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.darkBlue, COLORS.darkBlue]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.todayStatusTextStyle}>{strings.delivery.todayStatus}</Text>

          <View style={styles.deliveryOrderViewStyle}>
            <Text style={styles.deliveryOrderTextStyle}>{strings.delivery.deliveryOrder}</Text>
            {isDeliveryOrder ? (
              <View style={styles.loaderView}>
                <ActivityIndicator size={'small'} color={COLORS.darkBlue} />
              </View>
            ) : (
              <Text style={styles.deliveryOrderTextStyle}>{todayDeliveryOrders ?? '0'}</Text>
            )}
          </View>

          <Spacer space={SH(20)} backgroundColor={COLORS.transparent} />

          <DeliveryTypeOrders {...{ isDeliveryOrder }} />
        </View>

        <Spacer space={SH(15)} backgroundColor={COLORS.transparent} />

        <View style={styles.ordersHeaderStyle}>
          <Text style={styles.orderTextStyle}>{setHeaderText(selectedStatus)}</Text>

          {orders?.length > 0 ? (
            <TouchableOpacity
              style={styles.viewAllButtonStyle}
              onPress={() => navigate(NAVIGATION.orderList, { selected: selectedStatus })}
            >
              <Text style={styles.viewAllTextStyle}>{strings.delivery.viewAll}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        <Spacer space={SH(15)} backgroundColor={COLORS.transparent} />

        <View style={styles.ordersContainer}>
          <FlatList
            data={orders?.slice(0, 4)}
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
