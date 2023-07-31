import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { strings } from '@/localization';
import styles from '../styles';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { COLORS } from '@/theme';
import { useSelector } from 'react-redux';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { ms } from 'react-native-size-matters';

const TodayOrderStatus = ({ todayOrderStatusData }) => {
  const orderStatusLoading = useSelector((state) =>
    isLoadingSelector([TYPES.TODAY_ORDER_STATUS], state)
  );

  return (
    <View style={styles.shippingStatusViewStyle}>
      <Text style={styles.shippingStatusText}>{strings.deliveryOrders2.orderStatus}</Text>
      {orderStatusLoading ? (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            marginVertical: ms(20),
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        </View>
      ) : (
        <>
          <View style={styles.shippingOrdersViewStyle}>
            <Text style={styles.shippedOrderText}>{strings.analytics.deliveryOrder}</Text>
            <Text style={styles.shippedOrderText}>{todayOrderStatusData?.[0]?.count}</Text>
          </View>

          <View style={styles.shippingOrdersViewStyle}>
            <Text style={styles.shippedOrderText}>{strings.deliveryOrders2.pickupOrders}</Text>
            <Text style={styles.shippedOrderText}>{todayOrderStatusData?.[1]?.count}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default TodayOrderStatus;
