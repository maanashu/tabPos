import React, { memo, useRef, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';

const CustomProductAdd = ({ customProductClose }) => {
  const cartRef = useRef();

  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');
  const [productName, setProductName] = useState('');

  // useEffect(() => {
  //   cartRef?.current?.open();
  // }, []);

  return (
    // <RBSheet
    //   ref={cartRef}
    //   height={ms(500)}
    //   animationType={'fade'}
    //   closeOnDragDown={false}
    //   closeOnPressMask={false}
    //   customStyles={{
    //     container: {...styles.nameBottomSheetContainerStyle},
    //   }}>

    <View style={styles.addDiscountcon}>
      <KeyboardAwareScrollView>
        <View style={styles.headerViewStyle}>
          <TouchableOpacity onPress={() => customProductClose()}>
            <Image source={Images.cross} style={styles.crossIconStyle} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.addToCartButtonStyle}>
            <Text style={styles.addToCartTextStyle}>{strings.cart.addToCart}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentViewStyle}>
          <Text style={styles.titleTextStyle}>{strings.cart.title}</Text>

          <Spacer space={SH(10)} />

          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType={'number-pad'}
            style={styles.amountTextStyle}
            placeholder={strings.cart.amountValue}
          />

          <Spacer space={SH(20)} />

          <TextInput
            value={productName}
            onChangeText={setProductName}
            style={styles.productInputStyle}
            placeholder={strings.cart.productName}
          />

          <Spacer space={SH(20)} />

          <TextInput
            multiline
            value={notes}
            numberOfLines={6}
            onChangeText={setNotes}
            style={styles.notesInputStyle}
            placeholder={strings.cart.addNotes}
          />

          {/* <Spacer space={SH(20)} /> */}

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.minusButtonStyle}
              onPress={() => (count > 0 ? setCount(count - 1) : null)}
            >
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>

            <View style={styles.minusButtonStyle}>
              <Text style={styles.counterText}>{count}</Text>
            </View>

            <TouchableOpacity style={styles.minusButtonStyle} onPress={() => setCount(count + 1)}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>

    // </RBSheet>
  );
};

export default memo(CustomProductAdd);

const styles = StyleSheet.create({
  addDiscountcon: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: ms(350),
    height: ms(500),
    alignSelf: 'center',
    paddingHorizontal: moderateScale(15),
    paddingVertical: ms(30),
    // borderWidth: 1,
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
  addToCartButtonStyle: {
    borderRadius: 3,
    paddingVertical: SH(10),
    backgroundColor: COLORS.darkBlue,
    paddingHorizontal: SW(10),
  },
  addToCartTextStyle: {
    fontSize: SF(12),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  contentViewStyle: {
    paddingVertical: ms(20),
  },
  titleTextStyle: {
    fontSize: SF(16),
    paddingTop: SH(10),
    color: COLORS.dark_gray,
    fontFamily: Fonts.SemiBold,
  },
  amountTextStyle: {
    height: SH(55),
    borderRadius: 5,
    fontSize: SF(16),
    color: COLORS.text,
    paddingLeft: SW(10),
    fontFamily: Fonts.MaisonRegular,
    backgroundColor: COLORS.inputBorder,
  },
  productInputStyle: {
    height: SH(55),
    borderRadius: 5,
    color: COLORS.text,
    fontSize: SF(14),
    paddingLeft: SW(10),
    borderWidth: 1,
    fontFamily: Fonts.Regular,
    backgroundColor: COLORS.white,
    borderColor: COLORS.light_border,
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
  quantityContainer: {
    flexDirection: 'row',
    marginTop: ms(20),
  },
  minusButtonStyle: {
    borderWidth: 1,
    width: SW(105),
    height: SH(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.light_border,
  },
  counterText: {
    fontSize: SH(28),
    color: COLORS.black,
    fontFamily: Fonts.Bold,
  },
});
