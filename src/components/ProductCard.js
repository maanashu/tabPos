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
  ProductHandler
}) {
  return (
    <TouchableOpacity style={styles.productContainer} onPress={ProductHandler}>
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
        <View style={styles.cartonButtonCon}>
          <Text style={styles.cartonButton}>Carton</Text>
        </View>
        <View style={styles.singlePackBtnCon}>
          <Text style={styles.singlePackBtn}>Single Pack</Text>
        </View>
      </View>
      <Spacer space={SH(7)} />
      <Text style={styles.size}>Price</Text>
      <Spacer space={SH(5)} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.previousRate}>$5.65</Text>
        <Text style={styles.currentRate}>${productPrice}</Text>
      </View>
      <Spacer space={SH(8)} />
      <View style={styles.hrLine}></View>
      <Spacer space={SH(12)} />
      <View style={styles.productCardcon}>
        <TouchableOpacity onPress={cartMinusOnPress} style={{ height: SH(35) }}>
          <Image source={minus} style={styles.plusBtn} />
        </TouchableOpacity>

        <Text style={styles.count}>{productCount?.qty ? productCount?.qty : 0 }</Text>
        <TouchableOpacity onPress={cartPlusOnPress} style={{ height: SH(35) }}>
          <Image source={plus} style={styles.plusBtn} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productContainer: {
    width: windowWidth * 0.295,
    height: SH(240),
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
  cartonButtonCon: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    width: SW(22),
    height: SH(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartonButton: {
    color: COLORS.white,
    fontSize: SF(12),
    // paddingVertical: verticalScale(2),
  },
  singlePackBtnCon: {
    borderRadius: 3,
    borderColor: COLORS.gerySkies,
    alignItems: 'center',
    borderWidth: 1,
    width: SW(35),
    height: SH(25),
    marginLeft: 10,
    justifyContent: 'center',
  },
  singlePackBtn: {
    color: COLORS.gerySkies,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
    // paddingVertical: verticalScale(2),
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
