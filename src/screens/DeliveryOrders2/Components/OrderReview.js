import React, { memo } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import { COLORS } from '@/theme';

import styles from '../styles';

const OrderReview = ({
  renderOrderToReview,
  emptyComponent,
  headerComponent,
  getDeliveryData,
  isOrderLoading,
}) => {
  return (
    <>
      {isOrderLoading ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <View style={[styles.orderToReviewView]}>
          <FlatList
            scrollEnabled={getDeliveryData?.getReviewDef?.length > 0 ? true : false}
            renderItem={renderOrderToReview}
            ListEmptyComponent={emptyComponent}
            ListHeaderComponent={headerComponent}
            showsVerticalScrollIndicator={false}
            data={getDeliveryData?.getReviewDef?.slice(0, 3)}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      )}
    </>
  );
};

export default memo(OrderReview);
