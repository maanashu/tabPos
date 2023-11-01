import React, { memo } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import { useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import { Images } from '@mPOS/assets';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { getDelivery } from '@mPOS/selectors/DeliverySelector';

const DeliveryTypeOrders = ({ isDeliveryOrder }) => {
  const deliveryData = useSelector(getDelivery);
  const deliveryTypeOrders = deliveryData?.deliveryTypesOrders ?? [];

  const renderDeliveryItem = ({ item, index }) => (
    <View style={styles.deliveryItemViewStyle}>
      {isDeliveryOrder ? (
        <View style={styles.loaderView}>
          <ActivityIndicator size={'small'} color={COLORS.darkBlue} />
        </View>
      ) : (
        <>
          <View>
            <Image
              source={
                item?.delivery_type_title === strings.delivery.express
                  ? Images.expressDelivery
                  : item?.delivery_type_title === strings.delivery.oneHour
                  ? Images.oneHourDelivery
                  : Images.twoHourDelivery
              }
              style={styles.deliveryTypeIconStyle}
            />
          </View>

          <View style={{ paddingLeft: ms(10) }}>
            <Text style={styles.deliveryTypeTextStyle}>{item?.delivery_type_title}</Text>
            <Text style={styles.deliveryTypeCountTextStyle}>{item?.count}</Text>
          </View>
        </>
      )}
    </View>
  );

  return (
    <FlatList
      data={deliveryTypeOrders}
      extraData={deliveryTypeOrders}
      renderItem={renderDeliveryItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default memo(DeliveryTypeOrders);

const styles = StyleSheet.create({
  deliveryItemViewStyle: {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ms(6),
    paddingVertical: ms(5),
    paddingHorizontal: ms(10),
    borderColor: COLORS.light_border,
  },
  loaderView: {
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ms(6),
    paddingHorizontal: ms(10),
    borderColor: COLORS.light_border,
  },
  deliveryTypeIconStyle: {
    width: SW(40),
    height: SH(30),
    resizeMode: 'contain',
  },
  deliveryTypeTextStyle: {
    fontSize: SF(11),
    color: COLORS.grayShade,
    fontFamily: Fonts.SemiBold,
  },
  deliveryTypeCountTextStyle: {
    fontSize: SF(14),
    paddingTop: ms(5),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
});
