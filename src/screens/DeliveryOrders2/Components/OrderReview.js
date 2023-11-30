import React, { memo, useState } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '@/theme';
import { getAuthData } from '@/selectors/AuthSelector';
import { getReviewDefault } from '@/actions/DeliveryAction';
import { getPendingOrders } from '@/actions/DashboardAction';
import { ms } from 'react-native-size-matters';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 2.2;

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
    dispatch(getReviewDefault(0));
    dispatch(getPendingOrders());
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
                tintColor={COLORS.primary}
                title="Pull to Refresh"
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
    borderRadius: ms(10),
    height: twoEqualView,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
