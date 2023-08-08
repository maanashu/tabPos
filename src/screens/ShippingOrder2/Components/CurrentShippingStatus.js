import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { strings } from '@/localization';

import styles from '../ShippingOrder2.styles';

const CurrentShippingStatus = ({ todayStatus, renderItem }) => (
  <View style={styles.currentStatusView}>
    <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>
    <FlatList
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      data={todayStatus?.todayCurrentStatus}
    />
  </View>
);

export default CurrentShippingStatus;
