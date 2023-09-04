import React, { memo } from 'react';
import { View, Dimensions, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

import { COLORS } from '@/theme';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 2;

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
        <View style={styles.orderToReviewView}>
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

const styles = StyleSheet.create({
  loaderViewStyle: {
    borderRadius: 10,
    height: twoEqualView,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  orderToReviewView: {
    borderRadius: 10,
    height: twoEqualView,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
