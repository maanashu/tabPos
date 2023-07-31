import React from 'react';
import { View, Text, FlatList } from 'react-native';

import { strings } from '@/localization';

import styles from '../styles';

const CurrentStatus = ({ deliverytypes, renderItem }) => {
  return (
    <View style={styles.currentStatusView}>
      <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>

      <FlatList data={deliverytypes} renderItem={renderItem} />
    </View>
  );
};

export default CurrentStatus;
