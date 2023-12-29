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
import StatusDrawer from '../Components/StatusDrawer';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { FullScreenLoader, Header } from '@mPOS/components';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';

import styles from './styles';
import { getDelivery } from '@/selectors/DeliverySelector';
import { getOrders, getReviewDefault } from '@/actions/DeliveryAction';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import moment from 'moment';

export function OrderList(props) {
  const dispatch = useDispatch();
  const onEndReachedCalledDuringMomentum = useRef(false);
  const getDeliveryData = useSelector(getDelivery);
  const orders = getDeliveryData?.getReviewDef ?? [];
  const params = props?.route?.params?.selected;

  const [isStatusDrawer, setIsStatusDrawer] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(params ?? '0');

  useEffect(() => {
    dispatch(getReviewDefault(params ? params : 0));
  }, []);

  const renderOrderItem = ({ item, index }) => {
    const deliveryDate =
      item?.delivery_option == '3'
        ? moment.utc(item?.created_at).local().format('DD MMM YYYY')
        : moment.utc(item?.date).local().format('DD MMM YYYY');
    return (
      <TouchableOpacity
        onPress={() =>
          navigate(
            selectedStatus === '9'
              ? MPOS_NAVIGATION.returnOrderDetail
              : MPOS_NAVIGATION.orderDetail,
            {
              data: item,
              index: index,
            }
          )
        }
        style={[styles.orderItemViewStyle, { marginHorizontal: ms(15) }]}
      >
        <View style={{ flex: 0.35 }}>
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

        <View style={{ flex: 0.22 }}>
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

        <View style={{ flex: 0.45 }}>
          <Text style={styles.deliveryDateTextStyle}>{deliveryDate}</Text>
          {item?.preffered_delivery_start_time !== null ||
            (item?.preffered_delivery_end_time !== null && (
              <View style={styles.itemAndPaymentView}>
                <Image
                  source={Images.clockIcon}
                  style={[styles.payIconStyle, { tintColor: COLORS.primary }]}
                />
                <Text
                  style={styles.priceTextStyle}
                >{`${item?.preffered_delivery_start_time} ${item?.preffered_delivery_end_time}`}</Text>
              </View>
            ))}
        </View>

        <View style={{ flex: 0.06 }}>
          <Image source={Images.rightArrow} style={styles.rightArrowIconStyle} />
        </View>
      </TouchableOpacity>
    );
  };

  const paginationData = {
    total: orders?.total ?? '0',
    totalPages: orders?.total_pages ?? '0',
    perPage: orders?.per_page ?? '0',
    currentPage: orders?.current_page ?? '0',
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

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_REVIEW_DEF], state));

  return (
    <SafeAreaView style={styles.container}>
      <Header
        orders
        backRequired
        rightIconOnpress={() => setIsStatusDrawer(true)}
        title={setHeaderText(selectedStatus)}
      />

      <FlatList
        data={orders}
        extraData={orders}
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

      {isLoading ? <FullScreenLoader /> : null}
    </SafeAreaView>
  );
}
