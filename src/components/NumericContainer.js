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
import { COLORS, SF, SH, SW } from '@/theme';
import { moderateScale } from 'react-native-size-matters';
import {dollar, Fonts, minus, plus } from '@/assets';
import { Spacer } from './Spacer';
import { strings } from '@/localization';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function NumericContainer() {
  const [amount, setAmount] = useState();
  const [title, setTitle] = useState()

  return (
    <View style={{ height: windowHeight, paddingBottom: 60 }}>
    <Spacer space={SH(20)} />
    <View style={styles.inputWraper2}>
      <View style={styles.flexAlign}>
        <Image source={dollar} style={styles.searchStyle} />
        <TextInput
          placeholder="0.00"
          placeholderTextColor="black"
          value={amount}
          onChangeText={setAmount}
          style={styles.amountInput}
          keyboardType='numeric'
        />
      </View>
    </View>
    <Spacer space={SH(20)} />
    <TextInput
      placeholder="Tittle"
      value={title}
      onChangeText={setTitle}
      style={styles.titleInput}
    />
    <Spacer space={SH(20)} />
    <TouchableOpacity style={styles.addButtonCon}>
      <Text style={styles.addButtonText}>{strings.retail.addNotes}</Text>
    </TouchableOpacity>
    <View style={{ flex: 1 }} />
    <View style={styles.directionInRow}>
      <View style={[styles.addCartButton, styles.addcountButton]}>
        <Image source={minus} style={styles.minusBtn2} />
        <Text style={styles.addCartText}>0</Text>
        <Image
          source={plus}
          style={[styles.minusBtn2, styles.plusCartBtn]}
        />
      </View>
      <View
        style={
          amount && title
            ? styles.addCartButtonFill
            : styles.addCartButton
        }
      >
        <Text
          style={
            amount && title
              ? styles.addCartBtnTextsubmit
              : styles.addCartBtnText
          }
        >
          {strings.retail.addTocart}
        </Text>
      </View>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  amountInput: {
    borderRadius: 7,
    width: windowWidth * 0.55,
    fontSize: SF(20),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  titleInput: {
    borderWidth: 1,
    height: SH(65),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: moderateScale(10),
    fontFamily: Fonts.Regular,
    fontSize: SF(18),
    justifyContent: 'center',
  },
  addButtonCon: {
    borderWidth: 1,
    height: SH(55),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
  },
  directionInRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addCartButton: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    width: SW(104),
    height: SH(55),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addCartButtonFill: {
    backgroundColor: COLORS.black,
    width: SW(114),
    height: SH(55),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addcountButton: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: COLORS.textInputBackground,
    borderColor: 'transparent',
  },
  inputWraper2: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    flexDirection: 'row',
    alignItems: 'center',
    // width: SW(208),
    height: SH(65),
    justifyContent: 'space-between',
  },
  minusBtn2: {
    tintColor: COLORS.mid_grey,
    width: SW(24),
    height: SH(24),
    resizeMode: 'contain',
  },
  plusCartBtn: {
    tintColor: COLORS.darkGray,
  },
  addCartText: {
    fontSize: SF(20),
    color: COLORS.mid_grey,
  },
  addCartBtnTextsubmit: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
  },
  addCartBtnText: {
    fontSize: SF(16),
    fontFamily: Fonts.Regular,
  },
  flexAlign:{
    flexDirection: 'row',
     alignItems: 'center' 
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
});
