import React from 'react';
import { View, Text } from 'react-native';
import { strings } from '@/localization';
import styles from '../styles';

const TodayOrderStatus = ({ todayOrderStatusData }) => {
  return (
    <View style={styles.shippingStatusViewStyle}>
      <Text style={styles.shippingStatusText}>{strings.deliveryOrders2.orderStatus}</Text>

      <View style={styles.shippingOrdersViewStyle}>
        <Text style={styles.shippedOrderText}>{strings.analytics.deliveryOrder}</Text>
        <Text style={styles.shippedOrderText}>{todayOrderStatusData?.[0]?.count}</Text>
      </View>

      <View style={styles.shippingOrdersViewStyle}>
        <Text style={styles.shippedOrderText}>{strings.deliveryOrders2.pickupOrders}</Text>
        <Text style={styles.shippedOrderText}>{todayOrderStatusData?.[1]?.count}</Text>
      </View>
    </View>
  );
};

export default TodayOrderStatus;
