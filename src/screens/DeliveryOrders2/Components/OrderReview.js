import React, { memo } from 'react';
import {
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import { COLORS } from '@/theme';
import { ms } from 'react-native-size-matters';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewDefault } from '@/actions/DeliveryAction';
import { getPendingOrders } from '@/actions/DashboardAction';
import { getAuthData } from '@/selectors/AuthSelector';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 2;

const OrderReview = ({
  renderOrderToReview,
  emptyComponent,
  headerComponent,
  getDeliveryData,
  isOrderLoading,
}) => {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    dispatch(getReviewDefault(0, 1));
    dispatch(getPendingOrders(sellerID));
  };

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
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={COLORS.primary} // Change the color of the loading spinner
                title="Pull to Refresh" // Optional, you can customize the text
              />
            }
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
