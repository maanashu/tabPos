import React, { memo } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Fonts } from '@/assets';
import { COLORS, SF } from '@/theme';
import { strings } from '@/localization';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { getDelivery } from '@/selectors/DeliverySelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const TodayOrderStatus = () => {
  const getDeliveryData = useSelector(getDelivery);
  const todayOrderStatusData = getDeliveryData?.todayOrderStatus;

  const orderStatusLoading = useSelector((state) =>
    isLoadingSelector([TYPES.TODAY_ORDER_STATUS], state)
  );

  return (
    <View style={styles.orderStatusViewStyle}>
      <Text style={styles.orderStatusText}>{strings.deliveryOrders2.orderStatus}</Text>

      <View style={styles.todayOrdersViewStyle}>
        <Text style={styles.todayOrderText}>{strings.deliveryOrders2.deliveryOrders}</Text>

        {orderStatusLoading ? (
          <View style={styles.loaderView}>
            <ActivityIndicator color={COLORS.primary} size={'small'} />
          </View>
        ) : (
          <Text style={[styles.todayOrderText, { paddingVertical: ms(16) }]}>
            {todayOrderStatusData?.[0]?.count ?? '0'}
          </Text>
        )}
      </View>
    </View>
  );
};

export default memo(TodayOrderStatus);

const styles = StyleSheet.create({
  orderStatusViewStyle: {
    borderRadius: 10,
    paddingVertical: ms(12),
    alignItems: 'flex-start',
    width: Dimensions.get('window').width / 4,
    backgroundColor: COLORS.white,
  },
  orderStatusText: {
    fontSize: SF(16),
    paddingLeft: ms(15),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  loaderView: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: ms(16),
    justifyContent: 'center',
  },
  todayOrdersViewStyle: {
    flexDirection: 'row',
    paddingRight: 20,
    width: Dimensions.get('window').width / 6.5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todayOrderText: {
    fontSize: SF(14),
    paddingLeft: ms(15),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
});
