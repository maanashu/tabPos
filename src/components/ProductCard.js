import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import { COLORS, SF, SH, ShadowStyles, SW, TextStyles } from '@/theme';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {
  checkbox,
  checkedCheckbox,
  crossButton,
  dropdown2,
  Fonts,
  marboloPlus,
  marboloRed,
  minus,
  plus,
} from '@/assets';
import { Spacer } from './Spacer';
import { strings } from '@/localization';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import DropDownPicker from 'react-native-dropdown-picker';

export function ProductCard({ productName,productImage,productPrice,ProductBrandName}) {


  return (
    <View style={styles.productContainer}>
    <View style={{ flexDirection: 'row' }}>
      <Image source={productImage} style={styles.marboloStyle} />
      <View style={{ paddingHorizontal: moderateScale(5) }}>
        <Text numberOfLines={1} style={styles.productName}>{productName}</Text>
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
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        // onPress={() => {
        //   setCount(count - 1), setIndexs(index);
        // }}
        style={{ height: SH(35) }}
      >
        <Image source={minus} style={styles.plusBtn} />
      </TouchableOpacity>
  
        <Text style={styles.count}>0</Text>
      <TouchableOpacity
        // onPress={() => {
        //   setCount(count + 1), setIndexs(index);
        // }}
        style={{ height: SH(35) }}
      >
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
    // ...ShadowStyles.shadow2,
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
    width: windowWidth * 0.200,
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
});
