import React, { memo, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { Collapse } from 'native-base';

const AddDiscount = ({ discountClose }) => {
  const discountRef = useRef();

  const [amountDiscount, setAmountDiscount] = useState('');
  const [percentageDiscount, setPercentageDiscount] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [amountCheck, setAmountCheck] = useState(false);
  const [percentageCheck, setPercentageCheck] = useState(false);
  const [codeCheck, setCodeCheck] = useState(false);
  const [descriptionDis, setDescriptionDis] = useState();

  useEffect(() => {
    discountRef?.current?.open();
  }, []);

  return (
    // <RBSheet
    //   ref={discountRef}
    //   height={ms(500)}
    //   animationType={'fade'}
    //   closeOnDragDown={false}
    //   closeOnPressMask={false}
    //   customStyles={{
    //     container: {...styles.nameBottomSheetContainerStyle},
    //   }}>
    <View style={styles.addDiscountcon}>
      <View style={styles.headerViewStyle}>
        <Text style={styles.clearCartTextStyle}>{strings.cart.addDiscount}</Text>

        <TouchableOpacity onPress={() => discountClose()}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>
      </View>

      <View style={styles.contentViewStyle}>
        <View
          style={[
            styles.discountInputWraper,
            {
              backgroundColor: amountCheck ? COLORS.blueBackground : COLORS.white,
              borderColor: amountCheck ? COLORS.darkBlue : COLORS.light_border,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setAmountCheck(true);
              setPercentageCheck(false);
              setCodeCheck(false);
            }}
            style={styles.displayFlex}
          >
            <View style={styles.displayFlex}>
              <Text numberOfLines={1} style={styles.amountLabel}>
                {strings.cart.amountDiscount}
              </Text>
            </View>
            <View style={styles.addDiscountInputCon}>
              <Text style={styles.dollarsign}>$ </Text>
              <TextInput
                placeholder={'00.00'}
                keyboardType={'numeric'}
                style={[
                  styles.amountInput,
                  { color: amountDiscount ? COLORS.darkBlue : COLORS.dark_gray },
                ]}
                value={amountDiscount}
                onChangeText={setAmountDiscount}
                editable={percentageCheck || codeCheck ? false : true}
                placeholderTextColor={COLORS.dark_gray}
              />
            </View>
          </TouchableOpacity>
        </View>

        <Spacer space={SH(15)} />

        <View
          style={[
            styles.discountInputWraper,
            {
              backgroundColor: percentageCheck ? COLORS.blueBackground : COLORS.white,
              borderColor: percentageCheck ? COLORS.darkBlue : COLORS.light_border,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setAmountCheck(false);
              setPercentageCheck(true);
              setCodeCheck(false);
            }}
            style={styles.displayFlex}
          >
            <View style={styles.displayFlex}>
              <Text numberOfLines={1} style={styles.amountLabel}>
                {strings.cart.percentageDiscount}
              </Text>
            </View>
            <View style={styles.addDiscountInputCon}>
              <TextInput
                placeholder={'00.00'}
                keyboardType={'numeric'}
                style={[
                  styles.amountInput,
                  {
                    color: percentageDiscount ? COLORS.darkBlue : COLORS.dark_gray,
                  },
                ]}
                value={percentageDiscount}
                onChangeText={setPercentageDiscount}
                editable={amountCheck || codeCheck ? false : true}
                placeholderTextColor={COLORS.dark_gray}
              />

              <Text style={styles.dollarsign}>% </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Spacer space={SH(15)} />

        <View
          style={[
            styles.discountInputWraper,
            {
              backgroundColor: codeCheck ? COLORS.blueBackground : COLORS.white,
              borderColor: codeCheck ? COLORS.darkBlue : COLORS.light_border,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setAmountCheck(false);
              setPercentageCheck(false);
              setCodeCheck(true);
            }}
            style={styles.displayFlex}
          >
            <View style={styles.displayFlex}>
              <Text numberOfLines={1} style={styles.amountLabel}>
                {strings.cart.discountCode}
              </Text>
            </View>
            <View style={styles.addDiscountInputCon}>
              <TextInput
                placeholder={'CODE'}
                style={[
                  styles.amountInput,
                  { color: discountCode ? COLORS.darkBlue : COLORS.dark_gray },
                ]}
                value={discountCode}
                onChangeText={setDiscountCode}
                editable={percentageCheck || amountCheck ? false : true}
                placeholderTextColor={COLORS.dark_gray}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Spacer space={SH(20)} />

        <Text style={styles.discountTitle}>{strings.cart.discountTitle}</Text>

        <Spacer space={SH(7)} />
        <TextInput
          placeholder="Tittle"
          style={styles.discountTitleInput}
          value={descriptionDis}
          onChangeText={setDescriptionDis}
          placeholderTextColor={COLORS.placeholderText}
          autoCorrect={false}
          spellCheck={false}
        />

        <Spacer space={SH(15)} />

        <View style={styles.buttonMainContainer}>
          <TouchableOpacity style={styles.keepButtonStyle}>
            <Text style={[styles.counterText, { color: COLORS.dark_gray }]}>
              {strings.profile.Discard}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButtonStyle}>
            <Text style={[styles.counterText, { color: COLORS.white }]}>
              {strings.profile.save}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

    // </RBSheet>
  );
};

export default memo(AddDiscount);

const styles = StyleSheet.create({
  addDiscountcon: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: ms(350),
    height: ms(440),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
    paddingVertical: ms(30),
  },
  nameBottomSheetContainerStyle: {
    borderTopLeftRadius: ms(30),
    borderTopRightRadius: ms(30),
    backgroundColor: COLORS.white,
  },
  headerViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  crossIconStyle: {
    width: SW(24),
    height: SW(24),
    resizeMode: 'contain',
  },
  clearCartTextStyle: {
    fontSize: SF(16),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  contentViewStyle: {
    // paddingHorizontal: ms(20),
    paddingVertical: ms(20),
    // borderWidth: 1,
  },
  notesInputStyle: {
    borderRadius: 5,
    fontFamily: Fonts.Regular,
    color: COLORS.text,
    fontSize: SF(14),
    paddingLeft: SW(10),
    borderWidth: 1,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
    borderColor: COLORS.light_border,
  },
  buttonMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(10),
  },
  keepButtonStyle: {
    height: SH(50),
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.inputBorder,
  },
  clearButtonStyle: {
    height: SH(50),
    width: SW(150),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.darkBlue,
  },
  counterText: {
    fontSize: SF(14),
    color: COLORS.black,
    fontFamily: Fonts.Medium,
  },
  discountInputWraper: {
    backgroundColor: COLORS.white,
    height: SH(55),
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.light_border,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
  },
  displayFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: SF(13),
    fontFamily: Fonts.Regular,
    color: COLORS.dark_gray,
    paddingHorizontal: moderateScale(5),
  },
  addDiscountInputCon: {
    borderWidth: 1,
    height: SH(38),
    width: SW(120),
    borderRadius: 5,
    borderColor: COLORS.light_border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(4),
    margin: 0,
    backgroundColor: COLORS.white,
  },
  dollarsign: {
    color: COLORS.dark_gray,
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
    paddingLeft: 2,
  },
  amountInput: {
    width: SW(100),
    height: SH(35),
    fontSize: SF(12),
    fontFamily: Fonts.SemiBold,
    backgroundColor: COLORS.white,
    color: COLORS.dark_gray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  discountTitle: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.text,
  },
  discountTitleInput: {
    backgroundColor: COLORS.inputBorder,
    height: SH(52),
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    fontFamily: Fonts.Italic,
    fontSize: SF(13),
    // borderWidth: 1,
  },
});
