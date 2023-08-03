import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { strings } from '@/localization';
import styles from '../ShippingOrder2.styles';

const CurrentShippingStatus = ({ todayStatus, renderItem }) => {
  return (
    <View style={styles.currentStatusView}>
      <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>
      <FlatList data={todayStatus?.todayCurrentStatus} renderItem={renderItem} />
    </View>
  );
};

export default CurrentShippingStatus;
