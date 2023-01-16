import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { COLORS} from '@/theme';
import { strings } from '@/localization';
import { styles } from './ShippingOrder.styles';

export function BottomSheet() {

  return (
    <View>
             <View style={styles.rowView}>
                <Text style={styles.subTotal}>
                  {strings.deliveryOrders.subTotal}
                </Text>
                <Text style={styles.subTotalValue}>
                  {strings.deliveryOrders.subTotalValue}
                </Text>
              </View>

              <View style={styles.rowView}>
                <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
                  {strings.deliveryOrders.discount}
                </Text>
                <Text style={styles.discountValue}>
                  {strings.deliveryOrders.discountValue}
                </Text>
              </View>
              <View
                style={styles.bottomDashedRow}
              />
              <View style={styles.rowView}>
                <Text style={[styles.subTotal, { color: COLORS.darkGray }]}>
                  {strings.deliveryOrders.tax}
                </Text>
                <Text style={styles.discountValue}>
                  {strings.deliveryOrders.subTotalValue}
                </Text>
              </View>

              <View style={styles.rowView}>
                <Text style={styles.totalLabel}>
                  {strings.deliveryOrders.total}
                </Text>
                <Text style={styles.totalValue}>
                  {strings.deliveryOrders.totalValue}
                </Text>
              </View>

              <View style={styles.rowView}>
                <Text style={styles.discountValue}>
                  {strings.deliveryOrders.items}
                </Text>
              </View>
             </View>
  );
}
