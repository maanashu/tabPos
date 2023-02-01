import React from 'react';
import { Text, View } from 'react-native';
import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { styles } from './DeliveryOrder.styles';

export function BottomSheet({ subTotal, tax, total, item, discount }) {
  return (
    <View>
      <View style={styles.rowView}>
        <Text style={styles.subTotal}>{strings.deliveryOrders.subTotal}</Text>
        <Text style={styles.subTotalValue}>${subTotal}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
          {strings.deliveryOrders.discount}
        </Text>
        <Text style={styles.discountValue}>-${discount}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
          {strings.deliveryOrders.tax}
        </Text>
        <Text style={styles.discountValue}>${tax}</Text>
      </View>
      <View style={styles.subtotalRow} />
      <View style={styles.rowView}>
        <Text style={styles.totalLabel}>{strings.deliveryOrders.total}</Text>
        <Text style={styles.totalValue}>${total}</Text>
      </View>

      <View style={styles.rowView}>
        <Text style={styles.discountValue}>
          {item} {strings.deliveryOrders.items}
        </Text>
      </View>
    </View>
  );
}
