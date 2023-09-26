import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { getShipping } from '@/selectors/ShippingSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const TodayShippingStatus = () => {
  const todayStatus = useSelector(getShipping);

  const orderStatusLoading = useSelector((state) =>
    isLoadingSelector([TYPES.TODAY_ORDER_STATUS], state)
  );

  return (
    <View style={styles.shippingStatusViewStyle}>
      <Text style={styles.shippingStatusText}>{strings.shippingOrder.shippingStatus}</Text>

      {orderStatusLoading ? (
        <View style={styles.loaderViewStyle}>
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

export default memo(TodayShippingStatus);

const styles = StyleSheet.create({
  shippingStatusViewStyle: {
    borderRadius: 10,
    marginTop: SH(15),
    paddingVertical: ms(12),
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
  },
  shippingStatusText: {
    fontSize: SF(16),
    paddingLeft: ms(15),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  loaderViewStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: ms(16),
    justifyContent: 'center',
  },
  shippingOrdersViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shippedOrderText: {
    fontSize: SF(14),
    paddingTop: ms(10),
    paddingLeft: ms(15),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
});
