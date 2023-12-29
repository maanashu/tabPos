import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';

import dayjs from 'dayjs';
import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';

import { Images } from '@mPOS/assets';
import { COLORS, SH } from '@/theme';
import { strings } from '@mPOS/localization';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { FullScreenLoader, Header } from '@mPOS/components';

import styles from './styles';
import StatusDrawer from '../Components/StatusDrawer';
import { getShipping } from '@/selectors/ShippingSelector';
import { getOrders, getReviewDefault } from '@/actions/ShippingAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { SHIPPING_TYPES } from '@mPOS/Types/ShippingTypes';
import { getDelivery } from '@/selectors/DeliverySelector';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import moment from 'moment';

export function ShippingOrderList(props) {
  const dispatch = useDispatch();
  const onEndReachedCalledDuringMomentum = useRef(false);
  const getShippingData = useSelector(getShipping);
  const orders = getShippingData?.orders?.data ?? [];
  const selected = props?.route?.params?.selected;

  const [isStatusDrawer, setIsStatusDrawer] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState();

  const getOrdersData = useSelector(getDelivery);
  const ordersList = getOrdersData?.getReviewDef;
  const [orderId, setOrderId] = useState(ordersList?.[0]?.id ?? '');

  useEffect(() => {
    if (selected) {
      dispatch(getReviewDefault(parseInt(selected)));
      setSelectedStatus(selected?.toString());
    } else {
      dispatch(getReviewDefault(0));
      setSelectedStatus('0');
    }
  }, []);
  const renderOrderItem = ({ item, index }) => {
    console.log('dfsfd', item);
    // const shippingDate = moment.utc(item?.invoices?.delivery_date).format('DD MMM YYYY') || '';
    const shippingDate = moment.utc(item?.date).format('DD MMM YYYY') || '';

    return (
      <TouchableOpacity
        onPress={() =>
          commonNavigate(MPOS_NAVIGATION.shippingOrderDetail, { data: item, index: index })
        }
        style={[styles.orderItemViewStyle, { marginHorizontal: ms(15) }]}
      >
        <View style={{ flex: 0.4 }}>
          <Text style={styles.deliveryOrderTextStyle}>{`${item?.user_details?.firstname}`}</Text>

          <View style={styles.itemAndPaymentView}>
            <Image
              source={Images.pin}
              style={[styles.payIconStyle, { tintColor: COLORS.dark_grey }]}
            />
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
          <Text style={styles.deliveryDateTextStyle}>{shippingDate}</Text>

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

        <View style={{ flex: 0.08 }}>
          <Image source={Images.rightArrow} style={styles.rightArrowIconStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  const paginationData = {
    total: getShippingData?.orders?.total ?? '0',
    totalPages: getShippingData?.orders?.total_pages ?? '0',
    perPage: getShippingData?.orders?.per_page ?? '0',
    currentPage: getShippingData?.orders?.current_page ?? '0',
  };

  const onLoadMoreProduct = useCallback(() => {
    if (paginationData?.currentPage < paginationData?.totalPages) {
      dispatch(getOrders(0, paginationData?.currentPage + 1));
    }
  }, [paginationData]);

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

  const isLoading = useSelector((state) =>
    isLoadingSelector([SHIPPING_TYPES.GET_ORDERS, TYPES.GET_REVIEW_DEF], state)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        orders
        backRequired
        rightIconOnpress={() => setIsStatusDrawer(true)}
        title={setHeaderText(selectedStatus)}
      />

      <FlatList
        data={ordersList}
        extraData={ordersList}
        removeClippedSubviews={true}
        renderItem={renderOrderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: SH(10), flexGrow: 1 }}
        onEndReachedThreshold={0.1}
        onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
        onMomentumScrollEnd={() => {
          if (onEndReachedCalledDuringMomentum.current) {
            onLoadMoreProduct();
            onEndReachedCalledDuringMomentum.current = false;
          }
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyViewStyle}>
            <Text style={styles.todayStatusTextStyle}>{strings.delivery.noOrders}</Text>
          </View>
        )}
      />

      <ReactNativeModal
        isVisible={isStatusDrawer}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
      >
        <StatusDrawer
          selected={(value) => {
            setHeaderText(value);
            setSelectedStatus(value);
          }}
          selectedStatusOrder={selectedStatus}
          closeModal={() => setIsStatusDrawer(false)}
        />
      </ReactNativeModal>

      {isLoading ? <FullScreenLoader /> : null}
    </SafeAreaView>
  );
}
