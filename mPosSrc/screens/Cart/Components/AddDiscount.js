import React, { memo, useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { moderateScale, ms } from 'react-native-size-matters';
import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { getRetail } from '@/selectors/RetailSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { addDiscountToCart } from '@/actions/RetailAction';

const AddDiscount = ({ discountClose }) => {
  const dispatch = useDispatch();
  const amountInputRef = useRef(null);
  const percentInputRef = useRef(null);
  const discountInputRef = useRef(null);
  const retailData = useSelector(getRetail);
  const cartId = retailData?.getAllCart?.id;
  const productCartData = retailData?.getAllCart;
  const discountRef = useRef();
  const [amountDiscount, setAmountDiscount] = useState(
    productCartData?.discount_flag === 'amount' ? productCartData?.discount_value : ''
  );
  const [percentageDiscount, setPercentageDiscount] = useState(
    productCartData?.discount_flag === 'percentage' ? productCartData?.discount_value : ''
  );
  const [discountCode, setDiscountCode] = useState(
    productCartData?.discount_flag === 'code' ? productCartData?.discount_value : ''
  );

  const [amountCheck, setAmountCheck] = useState(
    productCartData?.discount_flag === 'amount' ? true : false
  );
  const [percentageCheck, setPercentageCheck] = useState(
    productCartData?.discount_flag === 'percentage' ? true : false
  );
  const [codeCheck, setCodeCheck] = useState(
    productCartData?.discount_flag === 'code' ? true : false
  );
  const [descriptionDis, setDescriptionDis] = useState(
    productCartData?.discount_desc ? productCartData?.discount_desc : 'Discount'
  );

  const finalAmountForDiscount =
    productCartData?.amount?.products_price.toFixed(2) - productCartData?.amount?.tax.toFixed(2);

  useEffect(() => {
    discountRef?.current?.open();
  }, []);

  useEffect(() => {
    if (amountCheck) {
      setPercentageDiscount('');
      setDiscountCode('');
    } else if (percentageCheck) {
      setAmountDiscount('');
      setDiscountCode('');
    } else if (setCodeCheck) {
      setAmountDiscount('');
      setPercentageDiscount('');
    }
  }, [amountCheck, percentageCheck, codeCheck]);

  const addDiscountHandler = () => {
    if (!amountDiscount && !percentageDiscount && !discountCode) {
      alert(strings.cart.enterField);
    } else if (amountDiscount > finalAmountForDiscount) {
      alert('Please enter discount less then total amount');
    } else {
      const data = {
        amountDis: amountDiscount,
        percentDis: percentageDiscount,
        discountCode: discountCode,
        value: amountDiscount ? 'amount' : percentageDiscount ? 'percentage' : 'code',
        cartId: cartId,
        orderAmount: productCartData?.amount?.total_amount,
        descriptionDis: descriptionDis,
      };
      dispatch(addDiscountToCart(data));
      discountClose();
    }
  };

  return (
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
              backgroundColor: amountCheck ? COLORS.light_blue : COLORS.white,
              borderColor: amountCheck ? COLORS.primary : COLORS.solidGrey,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setAmountCheck(true);
              setPercentageCheck(false);
              setCodeCheck(false);
              amountInputRef.current.focus();
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
                ref={amountInputRef}
                placeholder={'00.00'}
                keyboardType={'numeric'}
                style={[
                  styles.amountInput,
                  {
                    color: amountDiscount ? COLORS.primary : COLORS.dark_gray,
                  },
                ]}
                onFocus={() => {
                  setAmountCheck(true);
                  setPercentageCheck(false);
                  setCodeCheck(false);
                }}
                value={amountDiscount.toString()}
                onChangeText={setAmountDiscount}
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
              backgroundColor: percentageCheck ? COLORS.light_blue : COLORS.white,
              borderColor: percentageCheck ? COLORS.primary : COLORS.solidGrey,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setAmountCheck(false);
              setPercentageCheck(true);
              setCodeCheck(false);
              percentInputRef.current.focus();
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
                ref={percentInputRef}
                placeholder={'00.00'}
                keyboardType={'numeric'}
                style={[
                  styles.amountInput,
                  {
                    color: percentageDiscount ? COLORS.primary : COLORS.dark_gray,
                  },
                ]}
                value={percentageDiscount}
                onChangeText={setPercentageDiscount}
                placeholderTextColor={COLORS.dark_gray}
                onFocus={() => {
                  setPercentageCheck(true);
                  setAmountCheck(false);
                  setCodeCheck(false);
                }}
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
              backgroundColor: codeCheck ? COLORS.light_blue : COLORS.white,
              borderColor: codeCheck ? COLORS.primary : COLORS.solidGrey,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setAmountCheck(false);
              setPercentageCheck(false);
              setCodeCheck(true);
              discountInputRef.current.focus();
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
                ref={discountInputRef}
                placeholder={'CODE'}
                style={[
                  styles.amountInput,
                  { color: discountCode ? COLORS.primary : COLORS.solid_grey },
                ]}
                value={discountCode}
                onChangeText={setDiscountCode}
                placeholderTextColor={COLORS.solid_grey}
                onFocus={() => {
                  setCodeCheck(true);
                  setPercentageCheck(false);
                  setAmountCheck(false);
                }}
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
          placeholderTextColor={COLORS.gerySkies}
          autoCorrect={false}
          spellCheck={false}
        />

        <Spacer space={SH(15)} />

        <View style={styles.buttonMainContainer}>
          <TouchableOpacity
            style={styles.keepButtonStyle}
            onPress={() => {
              setDiscountCode('');
              setPercentageDiscount('');
              setAmountDiscount('');
              setAmountCheck(false);
              setPercentageCheck(false);
              setCodeCheck(false);
            }}
          >
            <Text style={[styles.counterText, { color: COLORS.solid_grey }]}>
              {strings.profile.Discard}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.clearButtonStyle} onPress={addDiscountHandler}>
            <Text style={[styles.counterText, { color: COLORS.white }]}>
              {strings.cart.addToCart}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(AddDiscount);

const styles = StyleSheet.create({
  addDiscountcon: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    width: ms(350),
    height: ms(450),
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
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  contentViewStyle: {
    paddingVertical: ms(20),
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
    backgroundColor: COLORS.primary,
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
    borderColor: COLORS.solidGrey,
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
    color: COLORS.darkGray,
    paddingHorizontal: moderateScale(5),
  },
  addDiscountInputCon: {
    borderWidth: 1,
    height: SH(38),
    width: SW(120),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: ms(4),
    margin: 0,
    backgroundColor: COLORS.white,
  },
  dollarsign: {
    color: COLORS.solid_grey,
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
    color: COLORS.solid_grey,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
  },
  discountTitle: {
    fontSize: SF(14),
    fontFamily: Fonts.SemiBold,
    color: COLORS.dark_grey,
  },
  discountTitleInput: {
    backgroundColor: COLORS.inputBorder,
    height: SH(52),
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(7),
    fontFamily: Fonts.Italic,
    fontSize: SF(13),
  },
});
