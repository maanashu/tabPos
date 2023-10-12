import React, { useEffect, useState, memo } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import { ms, scale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '@/theme';
import { strings } from '@/localization';
import { todayOrders } from '@/actions/DeliveryAction';
import { getDelivery } from '@/selectors/DeliverySelector';
import { expressType, Fonts, oneHourType, twoHourType } from '@/assets';

const CurrentStatus = () => {
  const dispatch = useDispatch();
  const getDeliveryData = useSelector(getDelivery);
  const [deliverytypes, setDeliveryTypes] = useState();

  useEffect(() => {
    dispatch(todayOrders());

    const deliveryTypes = [
      {
        key: '1',
        image: expressType,
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[0]?.delivery_type_title ?? 'Express Delivery',
        count: getDeliveryData?.deliveringOrder?.[0]?.count ?? 0,
      },
      {
        key: '2',
        image: oneHourType,
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[1]?.delivery_type_title ?? '1 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[1]?.count ?? 0,
      },
      {
        key: '3',
        image: twoHourType,
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[2]?.delivery_type_title ?? '2 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[2]?.count ?? 0,
      },
    ];
    setDeliveryTypes(deliveryTypes);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemMainViewStyle}>
      <Image source={item?.image} style={styles.deliveryTypeImage} />

      <View style={styles.deliveryTypeDetails}>
        <Text style={styles.deliveryTypeText}>{item?.delivery_type_title}</Text>
        <Text style={styles.totalTextStyle}>{item?.count}</Text>
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
    flex: 1,
    paddingTop: 15,
    borderRadius: 10,
    paddingBottom: ms(5),
    backgroundColor: COLORS.white,
  },
  currentStatusText: {
    fontSize: scale(6),
    color: COLORS.text,
    paddingLeft: ms(12),
    fontFamily: Fonts.SemiBold,
  },
  itemMainViewStyle: {
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: ms(3),
    paddingVertical: ms(5),
    marginHorizontal: ms(12),
    paddingHorizontal: ms(8),
    borderColor: COLORS.solidGrey,
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
    color: COLORS.darkGray,
    fontFamily: Fonts.SemiBold,
  },
  totalTextStyle: {
    paddingTop: ms(3),
    fontSize: scale(4),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
});
