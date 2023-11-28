import React, { memo } from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useSelector } from 'react-redux';
import { ms, verticalScale } from 'react-native-size-matters';

import {
  task,
  timer,
  NoCard,
  returnShipping,
  deliveryDriver,
  deliveryShipping,
  deliveryorderProducts,
  RightReturn,
  CrossRight,
  TiltRight,
  BikeRight,
  ClockRight,
  PickupRight,
  TickRight,
  RightSide,
  Maximize,
} from '@/assets';
import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { getDelivery } from '@/selectors/DeliverySelector';

const { width, height } = Dimensions.get('window');

const RightSideBar = ({ renderDrawer, viewAllOrder }) => {
  const getDeliveryData = useSelector(getDelivery);

  const deliveryDrawer = [
    {
      key: '0',
      image: TickRight,
      title: strings.orderStatus.reviewOrders,
      count: getDeliveryData?.getOrderCount?.[0]?.count ?? 0,
      tintColor: COLORS.lavender,
    },
    {
      key: '1',
      image: RightSide,
      title: strings.calender.approved,
      count: getDeliveryData?.getOrderCount?.[1]?.count ?? 0,
      tintColor: COLORS.navy_blue,
    },
    {
      key: '2',
      image: ClockRight,
      title: strings.deliveryOrders.orderPrepare,
      count: getDeliveryData?.getOrderCount?.[2]?.count ?? 0,
      tintColor: COLORS.navy_blue,
    },
    {
      key: '3',
      image: BikeRight,
      title: strings.deliveryOrders.readyToPickup,
      count: getDeliveryData?.getOrderCount?.[3]?.count ?? 0,
      tintColor: COLORS.navy_blue,
    },
    {
      key: '4',
      image: PickupRight,
      title: strings.deliveryOrders2.pickedUp,
      count: getDeliveryData?.getOrderCount?.[4]?.count ?? 0,
      tintColor: COLORS.navy_blue,
    },
    {
      key: '5',
      image: TiltRight,
      title: strings.deliveryOrders.delivered,
      count: getDeliveryData?.getOrderCount?.[5]?.count ?? 0,
      tintColor: COLORS.purple,
    },
    {
      key: '7,8',
      image: CrossRight,
      title: strings.deliveryOrders.rejected,
      count:
        parseInt(getDeliveryData?.getOrderCount?.[7]?.count) +
          parseInt(getDeliveryData?.getOrderCount?.[8]?.count) ?? 0,
      tintColor: COLORS.bright_red,
    },
    {
      key: '9',
      image: RightReturn,
      title: strings.deliveryOrders2.returned,
      count: getDeliveryData?.getOrderCount?.[9]?.count ?? 0,
      tintColor: COLORS.orange_bright,
    },
  ];

  return (
    <View
      style={[
        styles.rightSideView,
        // {
        //   height: viewAllOrder ? height - 80 : height - 50,
        // },
      ]}
    >
      <FlatList
        scrollEnabled={false}
        data={deliveryDrawer}
        renderItem={renderDrawer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.key.toString()}
        // contentContainerStyle={{
        //   height: viewAllOrder ? height - 80 : height - 35,
        // }}
      />
    </View>
  );
};

export default memo(RightSideBar);

const styles = StyleSheet.create({
  rightSideView: {
    borderRadius: ms(30),
    alignItems: 'center',
    width: width * 0.06,
    backgroundColor: COLORS.white,
    paddingVertical: verticalScale(6),
  },
});
