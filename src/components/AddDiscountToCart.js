import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { checkbox, checkedCheckbox, Fonts } from '@/assets';
import { Spacer } from './Spacer';
import { strings } from '@/localization';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function AddDiscountToCart({
  amountDis,
  setAmountDis,
  percentDis,
  setPercentDis,
  discountCode,
  setDiscountCode,
  saveDiscountHandler,
  descriptionDis,
  setDescriptionDis,
  setValue,
}) {
  const [amountCheck, setAmountCheck] = useState(false);
  const [percentageCheck, setPercentageCheck] = useState(false);
  const [discountCheck, setDiscountCheck] = useState(false);

  return (
    <View>
      <View style={styles.adddiscountCon}>
        <View style={{ height: SH(350) }}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Spacer space={SH(12)} />
            <Text style={styles.discountHeader}>
              {strings.posSale.discount}
            </Text>
            <Spacer space={SH(12)} />
            <View
              style={
                amountCheck
                  ? styles.dicountInputWraper2
                  : styles.dicountInputWraper
              }
            >
              <View style={styles.displayFlex}>
                <View style={styles.displayFlex}>
                  <TouchableOpacity
                    onPress={() => (
                      setAmountCheck(!amountCheck),
                      setPercentageCheck(false),
                      setDiscountCheck(false),
                      setValue('Amount'),
                      setPercentDis(''),
                      setDiscountCode('')
                    )}
                  >
                    <Image
                      source={amountCheck ? checkedCheckbox : checkbox}
                      style={styles.checkboxStyle}
                    />
                  </TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    style={
                      amountCheck ? styles.amountLabel2 : styles.amountLabel
                    }
                  >
                    {strings.retail.amountDis}
                  </Text>
                </View>
                <TextInput
                  placeholder="$ 00.00"
                  keyboardType="numeric"
                  style={[
                    styles.amountDiscountInput,
                    { color: amountCheck ? COLORS.primary : COLORS.gerySkies },
                  ]}
                  value={amountDis}
                  onChangeText={setAmountDis}
                  editable={percentageCheck || discountCheck ? false : true}
                />
              </View>
            </View>
            <Spacer space={SH(12)} />
            <View
              style={
                percentageCheck
                  ? styles.dicountInputWraper2
                  : styles.dicountInputWraper
              }
            >
              <View style={styles.displayFlex}>
                <View style={styles.displayFlex}>
                  <TouchableOpacity
                    onPress={() => (
                      setPercentageCheck(!percentageCheck),
                      setAmountCheck(false),
                      setDiscountCheck(false),
                      setValue('Percentage'),
                      setDiscountCode(''),
                      setAmountDis('')
                    )}
                  >
                    <Image
                      source={percentageCheck ? checkedCheckbox : checkbox}
                      style={styles.checkboxStyle}
                    />
                  </TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    style={
                      percentageCheck ? styles.amountLabel2 : styles.amountLabel
                    }
                  >
                    {strings.retail.perDis}
                  </Text>
                </View>
                <TextInput
                  placeholder="0.00%"
                  keyboardType="numeric"
                  style={[
                    styles.amountDiscountInput,
                    {
                      color: percentageCheck
                        ? COLORS.primary
                        : COLORS.gerySkies,
                    },
                  ]}
                  value={percentDis}
                  onChangeText={setPercentDis}
                  editable={discountCheck || amountCheck ? false : true}
                />
              </View>
            </View>
            <Spacer space={SH(12)} />
            <View
              style={
                discountCheck
                  ? styles.dicountInputWraper2
                  : styles.dicountInputWraper
              }
            >
              <View style={styles.displayFlex}>
                <View style={styles.displayFlex}>
                  <TouchableOpacity
                    onPress={() => (
                      setDiscountCheck(!discountCheck),
                      setPercentageCheck(false),
                      setAmountCheck(false),
                      setPercentDis(''),
                      setAmountDis(''),
                      setValue('Code')
                    )}
                  >
                    <Image
                      source={discountCheck ? checkedCheckbox : checkbox}
                      style={styles.checkboxStyle}
                    />
                  </TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    style={
                      discountCheck ? styles.amountLabel2 : styles.amountLabel
                    }
                  >
                    {strings.retail.DisCode}
                  </Text>
                </View>
                <TextInput
                  placeholder="CODE"
                  keyboardType="numeric"
                  style={[
                    styles.amountDiscountInput,
                    {
                      color: discountCheck ? COLORS.primary : COLORS.gerySkies,
                    },
                  ]}
                  value={discountCode}
                  onChangeText={setDiscountCode}
                  editable={percentageCheck || amountCheck ? false : true}
                />
              </View>
            </View>
            <Spacer space={SH(12)} />
            <Text style={styles.discountTitle}> {strings.retail.DisTitle}</Text>
            <Spacer space={SH(12)} />
            <TextInput
              placeholder="Tittle"
              style={styles.discountTitleInput}
              value={descriptionDis}
              onChangeText={setDescriptionDis}
            />
            <Spacer space={SH(12)} />
          </KeyboardAwareScrollView>
        </View>
      </View>

      <Spacer space={SH(12)} />

      <View style={styles.saveButtonCon}>
        <TouchableOpacity
          style={styles.saveNotesButton}
          onPress={saveDiscountHandler}
        >
          <Text style={styles.saveNotesText}>
            {strings.posSale.saveDiscount}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  adddiscountCon: {
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 7,
    paddingHorizontal: moderateScale(8),
  },
  discountHeader: {
    fontSize: SF(24),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
  },
  dicountInputWraper: {
    backgroundColor: COLORS.white,
    height: SH(52),
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
  },
  dicountInputWraper2: {
    backgroundColor: COLORS.light_blue,
    height: SH(52),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
  },
  amountDiscountInput: {
    borderWidth: 1,
    height: SH(38),
    width: SW(40),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    paddingHorizontal: moderateScale(5),
    backgroundColor: COLORS.white,
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
  },
  amountLabel: {
    fontSize: SF(14),
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
    paddingHorizontal: moderateScale(5),
    width: SW(40),
  },
  amountLabel2: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    paddingHorizontal: moderateVerticalScale(5),
    width: SW(40),
  },
  discountTitle: {
    fontSize: SF(16),
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_grey,
  },
  discountTitleInput: {
    backgroundColor: COLORS.white,
    height: SH(52),
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    fontFamily: Fonts.Italic,
    fontSize: SF(14),
  },
  saveNotesButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 3,
    width: SW(40),
    height: SH(45),
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveNotesText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  saveButtonCon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: moderateScale(3),
  },
});
