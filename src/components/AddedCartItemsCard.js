import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { Fonts } from '@/assets';
import { COLORS } from '@/theme';
import moment from 'moment';
import { amountFormat } from '@/utils/GlobalMethods';

const AddedCartItemsCard = ({ item, index }) => {
  const productSize = item?.product_details?.supply?.attributes?.filter(
    (item) => item?.name === 'Size'
  );
  const productColor = item?.product_details?.supply?.attributes?.filter(
    (item) => item?.name === 'Color'
  );

  const isBookingDateAvailable = item?.date || item?.start_time || item?.end_time;
  const bookingDateTime = `${moment.utc(item?.date).format('DD/MM/YYYY')} @ ${item?.start_time}-${
    item?.end_time
  }`;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.count}>x {item?.qty}</Text>
        <View style={{ marginLeft: ms(10) }}>
          <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
            {item?.product_details?.name}
          </Text>
          <View style={styles.belowSubContainer}>
            {isBookingDateAvailable && <Text style={styles.colorsTitle}>{bookingDateTime}</Text>}

            {productColor?.length > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.colorsTitle}>Colors : </Text>
                <View
                  style={{
                    width: ms(8),
                    height: ms(8),
                    borderRadius: ms(2),
                    backgroundColor: productColor?.[0]?.values?.name,
                  }}
                ></View>
              </View>
            )}

            {productSize?.length > 0 && (
              <Text style={styles.sizeTitle}>Size : {productSize?.[0]?.values?.name}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={{ width: '24%', alignItems: 'flex-end' }}>
        <Text style={styles.priceTitle} numberOfLines={1}>
          {item?.product_details?.supply?.supply_prices?.offer_price
            ? amountFormat(item?.product_details?.supply?.supply_prices?.offer_price)
            : amountFormat(item?.product_details?.supply?.supply_prices?.selling_price)}
        </Text>
      </View>
    </View>
  );
};

export default AddedCartItemsCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ms(8),
    height: ms(28),
    borderRadius: ms(5),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '90%',
    marginTop: ms(5),
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  itemName: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(6),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
    alignItems: 'center',
  },
  colorsTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(6),
  },
  sizeTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(6),
    marginLeft: ms(10),
  },
  priceTitle: {
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
    fontSize: ms(6),
    // marginLeft: ms(10),
  },
});
