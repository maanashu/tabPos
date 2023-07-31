import React from 'react';
import { View, FlatList } from 'react-native';
import styles from '../styles';

const OrderReview = ({ renderOrderToReview, emptyComponent, headerComponent, getDeliveryData }) => {
  return (
    <View style={styles.orderToReviewView}>
      <FlatList
        renderItem={renderOrderToReview}
        ListEmptyComponent={emptyComponent}
        ListHeaderComponent={headerComponent}
        data={getDeliveryData?.getReviewDef?.slice(0, 4)}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default OrderReview;
