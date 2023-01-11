import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { Fonts, minus, plus } from '@/assets';
import { Spacer } from './Spacer';
const windowWidth = Dimensions.get('window').width;

export function ProductCard({
  productName,
  productImage,
  productPrice,
  ProductBrandName,
  cartMinusOnPress,
  cartPlusOnPress,
  productCount,
}) {
  return (
    <View style={styles.productContainer}>
      <View style={{ flexDirection: 'row' }}>
        <Image source={productImage} style={styles.marboloStyle} />
        <View style={{ paddingHorizontal: moderateScale(5) }}>
          <Text numberOfLines={1} style={styles.productName}>
            {productName}
          </Text>
          <Spacer space={SH(3)} />
          <Text style={styles.proSubName}>{ProductBrandName}</Text>
        </View>
      </View>
      <Spacer space={SH(5)} />
      <Text style={styles.size}>Size</Text>
      <Spacer space={SH(5)} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.cartonButton}>Carton</Text>
        <Text style={styles.singlePackBtn}>Single Pack</Text>
      </View>
      <Spacer space={SH(7)} />
      <Text style={styles.size}>Price</Text>
      <Spacer space={SH(5)} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.previousRate}>$5.65</Text>
        <Text style={styles.currentRate}>{productPrice}</Text>
      </View>
      <Spacer space={SH(8)} />
      <View style={styles.hrLine}></View>
      <Spacer space={SH(8)} />
      <View style={styles.productCardcon}>
        <TouchableOpacity onPress={cartMinusOnPress} style={{ height: SH(35) }}>
          <Image source={minus} style={styles.plusBtn} />
        </TouchableOpacity>

        <Text style={styles.count}>{productCount}</Text>
        <TouchableOpacity onPress={cartPlusOnPress} style={{ height: SH(35) }}>
          <Image source={plus} style={styles.plusBtn} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    width: windowWidth * 0.295,
    height: SH(245),
    borderWidth: 1,
    borderColor: COLORS.textInputBackground,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    margin: Platform.OS === 'ios' ? 4 : 11,
    padding: 15,
    elevation: 4,
    shadowColor: '#000000',
    shadowRadius: 4.84,
    shadowOpacity: 0.01,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  productbody: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: windowWidth * 0.94,
  },
  marboloStyle: {
    width: SW(14),
    height: SW(14),
    resizeMode: 'contain',
  },
  productName: {
    fontSize: SF(18),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    width: windowWidth * 0.2,
  },
  proSubName: {
    fontSize: SF(11),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
  },
  size: {
    fontSize: SF(13),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  cartonButton: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: SF(12),
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(2),
    borderRadius: 3,
  },
  singlePackBtn: {
    color: COLORS.gerySkies,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    borderWidth: 1,
    paddingHorizontal: moderateScale(10),
    paddingVertical: verticalScale(2),
    borderRadius: 3,
    borderColor: COLORS.gerySkies,
    marginHorizontal: moderateScale(6),
  },
  previousRate: {
    color: COLORS.gerySkies,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    textDecorationLine: 'line-through',
  },
  currentRate: {
    color: COLORS.solid_grey,
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: moderateScale(4),
  },
  hrLine: {
    borderWidth: 0.5,
    borderColor: COLORS.solidGrey,
  },
  plusBtn: {
    width: SW(24),
    height: SH(24),
    resizeMode: 'contain',
    color: COLORS.darkGray,
  },
  count: {
    fontSize: SF(18),
    color: COLORS.gerySkies,
    paddingHorizontal: moderateScale(10),
    marginBottom: 7,
  },
  productCardcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
