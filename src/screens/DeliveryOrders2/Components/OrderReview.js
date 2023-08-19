import React from 'react';
import { COLORS } from '@/theme';
import { View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { ms } from 'react-native-size-matters';
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
        <View
          style={{
            height: Dimensions.get('window').height / ms(1.17),
            backgroundColor: COLORS.white,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}
        >
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <View
          style={[
            styles.orderToReviewView,
            { height: Dimensions.get('window').height / ms(1.17), paddingBottom: ms(10) },
          ]}
        >
          <FlatList
            scrollEnabled={getDeliveryData?.getReviewDef?.length > 0 ? true : false}
            renderItem={renderOrderToReview}
            ListEmptyComponent={emptyComponent}
            ListHeaderComponent={headerComponent}
            showsVerticalScrollIndicator={false}
            data={getDeliveryData?.getReviewDef}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
      )}
    </>
  );
};

export default OrderReview;
