import React, { memo } from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';

import { useSelector } from 'react-redux';
import { verticalScale } from 'react-native-size-matters';

import {
  task,
  timer,
  NoCard,
  returnShipping,
  deliveryDriver,
  deliveryShipping,
  deliveryorderProducts,
} from '@/assets';
import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { getDelivery } from '@/selectors/DeliverySelector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const RightSideBar = ({ renderDrawer, viewAllOrder }) => {
  const getDeliveryData = useSelector(getDelivery);

  const deliveryDrawer = [
    {
      key: '0',
      image: task,
      title: strings.orderStatus.reviewOrders,
      count: getDeliveryData?.getOrderCount?.[0]?.count ?? 0,
    },
    {
      key: '1',
      image: deliveryorderProducts,
      title: strings.calender.approved,
      count: getDeliveryData?.getOrderCount?.[1]?.count ?? 0,
    },
    {
      key: '2',
      image: timer,
      title: strings.deliveryOrders.orderPrepare,
      count: getDeliveryData?.getOrderCount?.[2]?.count ?? 0,
    },
    {
      key: '3',
      image: deliveryDriver,
      title: strings.deliveryOrders.readyToPickup,
      count: getDeliveryData?.getOrderCount?.[3]?.count ?? 0,
    },
    {
      key: '4',
      image: deliveryShipping,
      title: strings.deliveryOrders2.pickedUp,
      count: getDeliveryData?.getOrderCount?.[4]?.count ?? 0,
    },
    {
      key: '5',
      image: deliveryorderProducts,
      title: strings.deliveryOrders.delivered,
      count: getDeliveryData?.getOrderCount?.[5]?.count ?? 0,
    },
    {
      key: '7,8',
      image: NoCard,
      title: strings.deliveryOrders.rejected,
      count: getDeliveryData?.getOrderCount?.[7]?.count ?? 0,
    },
    {
      key: '9',
      image: returnShipping,
      title: strings.deliveryOrders2.returned,
      count: 0,
    },
  ];

  return (
    <View
      style={[
        styles.rightSideView,
        {
          height: viewAllOrder ? windowHeight - 80 : windowHeight - 35,
        },
      ]}
    >
      <FlatList
        scrollEnabled={false}
        data={deliveryDrawer}
        renderItem={renderDrawer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.key.toString()}
        contentContainerStyle={{
          height: viewAllOrder ? windowHeight - 80 : windowHeight - 35,
        }}
      />
    </View>
  );
};

export default memo(RightSideBar);

const styles = StyleSheet.create({
  rightSideView: {
    borderRadius: 10,
    alignItems: 'center',
    width: windowWidth * 0.06,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(6),
  },
});
