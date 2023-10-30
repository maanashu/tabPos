import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { Fonts } from '@/assets';
import { COLORS } from '@/theme';

const AddedCartItemsCard = ({ item, index }) => {
  const productSize = item?.product_details?.supply?.attributes?.filter(
    (item) => item?.name === 'Size'
  );
  const productColor = item?.product_details?.supply?.attributes?.filter(
    (item) => item?.name === 'Color'
  );

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.count}>{item?.qty}</Text>
        <View style={{ marginLeft: ms(10) }}>
          <Text style={[styles.itemName, { width: ms(80) }]} numberOfLines={1}>
            {item?.product_details?.name}
          </Text>
          <View style={styles.belowSubContainer}>
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
      <Text style={styles.priceTitle}>
        ${item?.product_details?.supply?.supply_prices?.selling_price.toFixed(2) ?? '0.00'}
      </Text>
    </View>
  );
};

export default AddedCartItemsCard;

const styles = StyleSheet.create({
  container: {
    borderColor: COLORS.washGrey,
    borderWidth: 1,
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
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6.2),
  },
  itemName: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(5),
  },
  belowSubContainer: {
    flexDirection: 'row',
    marginTop: ms(2),
    alignItems: 'center',
  },
  colorsTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(4.2),
  },
  sizeTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(4.2),
    marginLeft: ms(10),
  },
  priceTitle: {
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(6),
    marginLeft: ms(10),
  },
});
