import React, { useEffect, useState, memo } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { ms, scale } from 'react-native-size-matters';

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
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[0]?.delivery_type_title ?? 'Express Delivery',
        count: getDeliveryData?.deliveringOrder?.[0]?.count ?? 0,
        image: expressType,
      },
      {
        key: '2',
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[1]?.delivery_type_title ?? '1 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[1]?.count ?? 0,
        image: oneHourType,
      },
      {
        key: '3',
        delivery_type_title:
          getDeliveryData?.deliveringOrder?.[2]?.delivery_type_title ?? '2 hour delivery window',
        count: getDeliveryData?.deliveringOrder?.[2]?.count ?? 0,
        image: twoHourType,
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
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingBottom: ms(10),
    paddingTop: 15,
  },
  currentStatusText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(6),
    color: COLORS.text,
    paddingLeft: ms(12),
  },
  itemMainViewStyle: {
    borderWidth: 1,
    marginHorizontal: ms(12),
    marginVertical: ms(6),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    backgroundColor: COLORS.white,
    paddingHorizontal: ms(8),
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: ms(6),
  },
  deliveryTypeImage: {
    width: ms(16),
    height: ms(16),
    resizeMode: 'contain',
  },
  deliveryTypeDetails: {
    justifyContent: 'center',
    marginHorizontal: ms(10),
    paddingVertical: ms(1),
  },
  deliveryTypeText: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(4),
    color: COLORS.darkGray,
  },
  totalTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: scale(4),
    color: COLORS.solid_grey,
    paddingTop: ms(3),
  },
});
