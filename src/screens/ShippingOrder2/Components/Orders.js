import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ms } from 'react-native-size-matters';
import { strings } from '@/localization';
import styles from '../ShippingOrder2.styles';

const Orders = ({
  height,
  openShippingOrders,
  ordersList,
  setViewAllOrders,
  setGetOrderDetail,
  renderOrderToReview,
  emptyComponent,
}) => {
  return (
    <View style={[styles.orderToReviewView, { height: height / 2.35, paddingBottom: ms(10) }]}>
      <View style={styles.headingRowStyle}>
        <Text style={styles.ordersToReviewText}>
          {openShippingOrders === '0'
            ? strings.shippingOrder.reviewOrders
            : openShippingOrders === '1'
            ? strings.shippingOrder.acceptedOrders
            : openShippingOrders === '2'
            ? strings.shippingOrder.prepareOrders
            : openShippingOrders === '3'
            ? 'Printing Labels'
            : openShippingOrders === '4'
            ? strings.orderStatus.shipOrder
            : openShippingOrders === '5'
            ? strings.orderStatus.deliveryOrder
            : openShippingOrders === '7,8'
            ? strings.orderStatus.cancelledOrder
            : strings.orderStatus.returnedOrders}
        </Text>

        {ordersList?.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              setViewAllOrders(true), setGetOrderDetail('ViewAllScreen');
            }}
            style={styles.viewAllButtonStyle}
          >
            <Text style={styles.viewallTextStyle}>{strings.reward.viewAll}</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        data={ordersList?.slice(0, 4)}
        renderItem={renderOrderToReview}
        ListEmptyComponent={emptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEnabled={ordersList?.length > 0 ? true : false}
      />
    </View>
  );
};

export default Orders;
