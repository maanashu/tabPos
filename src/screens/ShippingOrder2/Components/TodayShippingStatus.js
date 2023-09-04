import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import styles from '../ShippingOrder2.styles';

const TodayShippingStatus = ({ todayStatus }) => {
  const orderStatusLoading = useSelector((state) =>
    isLoadingSelector([TYPES.TODAY_ORDER_STATUS], state)
  );

  return (
    <View style={styles.shippingStatusViewStyle}>
      <Text style={styles.shippingStatusText}>{strings.shippingOrder.shippingStatus}</Text>

      {orderStatusLoading ? (
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            paddingVertical: ms(16),
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator color={COLORS.primary} size={'small'} />
        </View>
      ) : (
        <>
          <View style={styles.shippingOrdersViewStyle}>
            <Text style={styles.shippedOrderText}>{strings.shippingOrder.shippingOrders}</Text>
            <Text style={styles.shippedOrderText}>{todayStatus?.[0]?.count ?? '0'}</Text>
          </View>

          <View style={styles.shippingOrdersViewStyle}>
            <Text style={styles.shippedOrderText}>{strings.orderStatus.shipOrder}</Text>
            <Text style={styles.shippedOrderText}>{todayStatus?.[1]?.count ?? '0'}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default TodayShippingStatus;
