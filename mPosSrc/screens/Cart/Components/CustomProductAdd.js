import React, { memo, useRef, useState } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';
import RBSheet from 'react-native-raw-bottom-sheet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { digitWithDot } from '@/utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import { customProductAdd } from '@/actions/RetailAction';
import { getAuthData } from '@/selectors/AuthSelector';

const CustomProductAdd = ({ customProductClose }) => {
  const dispatch = useDispatch();
  const cartRef = useRef();
  const getAuth = useSelector(getAuthData);
  const [count, setCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [amount, setAmount] = useState('');
  const [productName, setProductName] = useState('');
  const [upcCode, setUpcCode] = useState();
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const addToCartHandler = () => {
    if (!amount) {
      alert('Please enter amount');
    } else if (amount && digitWithDot.test(amount) === false) {
      alert('Please enter valid amount');
    } else if (!productName) {
      alert('Please enter product name');
    } else if (!upcCode) {
      alert('Please enter upc code');
    } else if (upcCode && digitWithDot.test(upcCode) === false) {
      alert('Please enter valid upc code');
    } else {
      const data = {
        price: amount,
        productName: productName,
        upc: upcCode,
        qty: count,
        notes: notes,
      };
      dispatch(customProductAdd(data));
      customProductClose();
    }
  };

  return (
    // <View style={[styles.addDiscountcon]}>
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.addDiscountcon]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.headerViewStyle}>
        <TouchableOpacity onPress={() => customProductClose()}>
          <Image source={Images.cross} style={styles.crossIconStyle} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addToCartButtonStyle} onPress={addToCartHandler}>
          <Text style={styles.addToCartTextStyle}>{strings.cart.addToCart}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentViewStyle}>
        <Text style={styles.titleTextStyle}>{strings.cart.title}</Text>

        <Spacer space={SH(10)} />
        <View style={styles.amountTextStyle}>
          <Text style={styles.dollarSign}>{'$'}</Text>
          <TextInput
            value={amount.toString()}
            onChangeText={setAmount}
            keyboardType={'number-pad'}
            style={styles.amountInput}
            placeholder={strings.cart.amountValue}
            placeholderTextColor={COLORS.row_grey}
          />
        </View>

        <Spacer space={SH(20)} />

        <TextInput
          value={productName}
          onChangeText={setProductName}
          style={styles.productInputStyle}
          placeholder={strings.cart.productName}
          placeholderTextColor={COLORS.gerySkies}
        />

        <Spacer space={SH(20)} />

        <TextInput
          value={upcCode}
          onChangeText={setUpcCode}
          keyboardType={'number-pad'}
          style={styles.productInputStyle}
          placeholder={strings.cart.upcCode}
          placeholderTextColor={COLORS.gerySkies}
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
            onPress={() => setCount(count - 1)}
            disabled={count == 1 ? true : false}
          >
            <Text style={styles.counterText}>-</Text>
          </TouchableOpacity>

          <View style={styles.minusButtonStyle}>
            <Text style={[styles.counterText, styles.counterTextDark]}>{count}</Text>
          </View>

          <TouchableOpacity style={styles.minusButtonStyle} onPress={() => setCount(count + 1)}>
            <Text style={styles.counterText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default memo(CustomProductAdd);

const styles = StyleSheet.create({
  addDiscountcon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(15),
    width: ms(330),
    height: ms(550),
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
  addToCartButtonStyle: {
    borderRadius: 3,
    paddingVertical: SH(10),
    backgroundColor: COLORS.primary,
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
    color: COLORS.solid_grey,
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
    color: COLORS.dark_grey,
    fontSize: SF(14),
    paddingLeft: SW(10),
    borderWidth: 1,
    fontFamily: Fonts.SemiBold,
    backgroundColor: COLORS.white,
    borderColor: COLORS.solidGrey,
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
    borderColor: COLORS.solidGrey,
  },
  quantityContainer: {
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: ms(20),
  },
  minusButtonStyle: {
    borderWidth: 1,
    flex: 1,
    // width: SW(105),
    height: SH(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.solidGrey,
  },
  counterText: {
    fontSize: SH(28),
    color: COLORS.light_border,
    fontFamily: Fonts.Bold,
  },
  counterTextDark: {
    fontSize: ms(20),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
  },
  amountTextStyle: {
    height: SH(55),
    borderRadius: 5,
    paddingLeft: SW(10),
    backgroundColor: COLORS.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountInput: {
    height: SH(55),
    fontSize: SF(16),
    color: COLORS.text,
    fontFamily: Fonts.SemiBold,
    flex: 1,
  },
  dollarSign: {
    fontSize: SF(16),
    color: COLORS.gerySkies,
    fontFamily: Fonts.SemiBold,
    marginBottom: ms(1),
  },
});
