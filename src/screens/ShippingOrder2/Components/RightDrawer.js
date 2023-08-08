import React from 'react';
import { View, FlatList } from 'react-native';
import styles from '../ShippingOrder2.styles';

const RightDrawer = ({ height, statusCount, renderDrawer }) => {
  return (
    <View style={[styles.rightSideView, { height: height - 80 }]}>
      <FlatList
        data={statusCount}
        renderItem={renderDrawer}
        keyExtractor={(item) => item.key.toString()}
      />
    </View>
  );
};

export default RightDrawer;
