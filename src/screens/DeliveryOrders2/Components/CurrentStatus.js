import React, { useEffect, useState, memo } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import { ms, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { todayOrders } from '@/actions/DeliveryAction';
import { getDelivery } from '@/selectors/DeliverySelector';
import {
  BikeFast,
  BikeMedium,
  BikeNormal,
  expressType,
  Fonts,
  Market,
  oneHourType,
  twoHourType,
} from '@/assets';

const CurrentStatus = () => {
  const dispatch = useDispatch();
  const getDeliveryData = useSelector(getDelivery);
  const [deliverytypes, setDeliveryTypes] = useState();

  useEffect(() => {
    dispatch(todayOrders());

    const deliveryTypes = [
      {
        key: '1',
        image: BikeFast,
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[0]?.delivery_type_title ?? 'Express Delivery',
        count: getDeliveryData?.deliveringOrder?.[0]?.count ?? 0,
      },
      {
        key: '2',
        image: BikeMedium,
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[1]?.delivery_type_title ?? '1 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[1]?.count ?? 0,
      },
      {
        key: '3',
        image: BikeNormal,
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[2]?.delivery_type_title ?? '2 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[2]?.count ?? 0,
      },
      {
        key: '4',
        image: Market,
        delivery_type_title: 'Customer Pickups',
        // getDeliveryData?.deliveringOrder?.[2]?.delivery_type_title ?? '2 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[2]?.count ?? 0,
      },
    ];
    setDeliveryTypes(deliveryTypes);
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.itemMainViewStyle, item.key == '4' && { borderColor: COLORS.navy_blue }]}>
      <Image source={item?.image} style={styles.deliveryTypeImage} />

      <View style={styles.deliveryTypeDetails}>
        <Text style={[styles.deliveryTypeText, item.key == '4' && { color: COLORS.navy_blue }]}>
          {item?.delivery_type_title}
        </Text>
        <Text style={[styles.totalTextStyle, item.key == '4' && { color: COLORS.lavender }]}>
          {item?.count}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.currentStatusView}>
      <Text style={styles.currentStatusText}>{strings.shippingOrder.currentStatus}</Text>

      <FlatList
        data={deliverytypes}
        renderItem={renderItem}
        extraData={deliverytypes}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default memo(CurrentStatus);

const styles = StyleSheet.create({
  currentStatusView: {
    flex: 1.8,
    paddingTop: 15,
    borderRadius: ms(10),
    paddingBottom: ms(5),
    backgroundColor: COLORS.white,
  },
  currentStatusText: {
    fontSize: scale(6),
    color: COLORS.navy_blue,
    paddingLeft: ms(12),
    fontFamily: Fonts.SemiBold,
  },
  itemMainViewStyle: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: ms(3),
    paddingVertical: ms(5),
    marginHorizontal: ms(12),
    paddingHorizontal: ms(8),
    borderColor: COLORS.tip_blue,
    backgroundColor: COLORS.white,
  },
  deliveryTypeImage: {
    width: ms(16),
    height: ms(16),
    resizeMode: 'contain',
  },
  deliveryTypeDetails: {
    paddingVertical: ms(1),
    justifyContent: 'center',
    marginHorizontal: ms(10),
  },
  deliveryTypeText: {
    fontSize: scale(4),
    color: COLORS.dark_purple,
    fontFamily: Fonts.SemiBold,
  },
  totalTextStyle: {
    paddingTop: ms(3),
    fontSize: scale(4),
    color: COLORS.tip_border,
    fontFamily: Fonts.SemiBold,
  },
});
