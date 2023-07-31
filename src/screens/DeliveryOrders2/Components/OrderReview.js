import React from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import styles from '../styles';

const OrderReview = ({ renderOrderToReview, emptyComponent, headerComponent, getDeliveryData }) => {
  return (
    <View style={[styles.orderToReviewView, { height: Dimensions.get('window').height / 2.5 }]}>
      <FlatList
        scrollEnabled={getDeliveryData?.getReviewDef?.length > 0 ? true : false}
        renderItem={renderOrderToReview}
        ListEmptyComponent={emptyComponent}
        ListHeaderComponent={headerComponent}
        showsVerticalScrollIndicator={false}
        data={getDeliveryData?.getReviewDef?.slice(0, 4)}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
};

export default OrderReview;
