import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';
import { cardPayment, moneyIcon, qrCodeIcon } from '@/assets';
import { Images } from '@mPOS/assets';
import { FullScreenLoader, Spacer } from '@mPOS/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@mPOS/localization';
import { ms } from 'react-native-size-matters';
import { Colors } from '@/constants/enums';
import ProductDetails from './ProductDetails';
import { navigate } from '@/navigation/NavigationRef';
import { MPOS_NAVIGATION } from '@/constants';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
// import { addProductCart, checkSuppliedVariant } from '@/actions/RetailActions';
// import { CustomErrorToast } from '@/components/Toast';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';
import { height } from '@/theme/ScalerDimensions';
import CountryPicker from 'react-native-country-picker-modal';
import { attachCustomer, getAllCart, updateCartByTip } from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { digitWithDot, emailReg, mobileReg } from '@/utils/validators';

const CartAmountByPay = ({
  addProductCartRef,
  cartAmountByPayRef,
  productDetailHanlder,
  cashPayNowHandler,
  cartAmountByPayCross,
}) => {
  const payByCashRef = useRef(null);
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const productDetail = retailData?.getOneProduct;
  const attributeArray = productDetail?.product_detail?.supplies?.[0]?.attributes;
  const cartData = retailData?.getAllCart;
  const getTips = retailData?.getTips;
  const [selectedTipIndex, setSelectedTipIndex] = useState(null);
  const [selectedTipAmount, setSelectedTipAmount] = useState('0.00');
  const [tipData, setTipData] = useState('0.00');

  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);

  const sizeArray = attributeArray?.filter((item) => item.name === 'Size');
  const colorArray = attributeArray?.filter((item) => item.name === 'Color');

  const [colorSelectId, setColorSelectId] = useState(null);
  const [sizeSelectId, setSizeSelectId] = useState(null);
  const [count, setCount] = useState(1);
  const [productDetailExpand, setProductDetailExpand] = useState(false);
  const snapPoints = useMemo(() => ['90%', '100%'], []);
  const [colorName, setColorName] = useState();
  const [sizeName, setSizeName] = useState();
  const [smsSection, setSmsSection] = useState(false);
  const [emailSection, setEmailSection] = useState(false);

  const [flag, setFlag] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (cartData?.user_details) {
      setEmail(cartData?.user_details?.email ?? '');
      setPhoneNumber(cartData?.user_details?.phone_no ?? '');
      setCountryCode(cartData?.user_details?.phone_code ?? '+1');
    }
  }, [cartData?.user_details]);

  useEffect(() => {
    setColorSelectId(null);
    setSizeSelectId(null);
  }, []);

  const TIPS_DATA = [
    { title: getTips?.first_tips ?? 18, percent: getTips?.first_tips ?? '18' },
    {
      title: getTips?.second_tips ?? 20,
      percent: getTips?.second_tips ?? '20',
    },
    { title: getTips?.third_tips ?? 22, percent: getTips?.third_tips ?? '22' },
    { title: '', percent: 'No Tips' },
  ];

  function calculatePercentageValue(value, percentage) {
    if (percentage == '') {
      return '';
    }
    const percentageValue = (percentage / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  }

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment =
      parseFloat(cartAmount) + parseFloat(selectedTipAmount === '' ? '0.0' : selectedTipAmount);

    return totalPayment.toFixed(2);
  };
  const totalAmountByPaymentMethod = (index) => {
    if (index === 0) {
      return `$${totalPayAmount()}`;
    } else if (index === 1) {
      return `JBR ${(totalPayAmount() * 100).toFixed(0)}`;
    } else {
      return `$${totalPayAmount()}`;
    }
  };

  const ERECIPE_DATA = [
    {
      id: 1,
      title: 'SMS',
    },
    {
      id: 2,
      title: 'Email',
    },
    {
      id: 3,
      title: 'No e-recipe',
    },
  ];

  const PAYMENT_SELECT_DATA = [
    {
      title: 'Cash',
      icon: moneyIcon,
      id: 1,
    },
    {
      title: 'JBR Coin',
      icon: qrCodeIcon,
      // status: true,
      id: 2,
    },
    {
      title: 'Card',
      icon: cardPayment,
      id: 3,
    },
  ];

  const getTipPress = async () => {
    const data = {
      tip: selectedTipAmount.toString(),
      cartId: cartData.id,
    };
    const res = await dispatch(updateCartByTip(data));
    if (res?.type === 'UPDATE_CART_BY_TIP_SUCCESS') {
      cashPayNowHandler();
      dispatch(getAllCart());
    }
  };

  const isLoad = useSelector((state) =>
    isLoadingSelector([TYPES.UPDATE_CART_BY_TIP, TYPES.ATTACH_CUSTOMER], state)
  );

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {
        setSelectedTipAmount('0.00');
        setSelectedTipIndex(null);
        setSelectedPaymentIndex(null);
        cartAmountByPayCross();
      }}
      backdropOpacity={0.5}
      ref={cartAmountByPayRef}
      style={[styles.bottomSheetBox]}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      // stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <BottomSheetScrollView>
        <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
          {Platform.OS === 'ios' && <SafeAreaView />}
          <View style={styles.productHeaderCon}>
            <TouchableOpacity onPress={() => cartAmountByPayCross()}>
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.payableAmountCon}>
            <Text style={styles.payableAmount}>Total Payable Amount:</Text>
            <Text style={styles.darkPaybleAmount}>
              ${Number(cartData?.amount?.total_amount ?? '0.00')?.toFixed(2)}
            </Text>
          </View>
          {selectedPaymentIndex !== null && selectedPaymentIndex === 1 && (
            <View style={styles.jbrSaveCon}>
              <Text style={styles.youSave}>You Save</Text>
              <Text style={styles.saveJbr}>JBR 29</Text>
            </View>
          )}
          <View style={styles.selectTipsCon}>
            <View style={styles.selectTipsHeader}>
              <Text style={styles.selectTips}>{'Select Tips'}</Text>
            </View>
            <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
              <Text style={styles.payableAmount}>
                {/* ${calculatePercentageValue(cartData?.amount?.products_price, tipData?.title)}
                 */}
                ${selectedTipAmount}
              </Text>
              <View style={styles.erecipeCon}>
                {TIPS_DATA?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setTipData(item);
                      const tipAmount = calculatePercentageValue(
                        cartData?.amount?.products_price,
                        item.title
                      );
                      {
                        item.percent === 'No Tips'
                          ? setSelectedTipAmount('0.00')
                          : setSelectedTipAmount(tipAmount);
                      }
                      setSelectedTipIndex(index);
                    }}
                    key={index}
                    style={
                      selectedTipIndex === index
                        ? styles.selectTipBodySelect
                        : styles.selectTipBodyCon
                    }
                  >
                    <Text
                      style={[
                        styles._payByMethodTip,
                        {
                          color: selectedTipIndex === index ? COLORS.primary : COLORS.solid_grey,
                        },
                      ]}
                    >
                      {item.percent}
                      {item.percent === 'No Tips' ? '' : '%'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          {selectedTipIndex !== null ? (
            <View>
              <Spacer space={SH(10)} />
              <Text style={styles.selectTips}>{'Select Payment Method'}</Text>
              <View>
                {PAYMENT_SELECT_DATA?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPaymentId(item.id);
                      setSelectedPaymentIndex(index);
                      setSelectedRecipeIndex(null);
                      setSelectedPaymentMethod(item.title);
                    }}
                    style={[
                      styles.selectPaymentBody,
                      {
                        borderColor:
                          selectedPaymentIndex === index ? COLORS.primary : COLORS.solidGrey,
                        ...(index === 1 && { height: ms(90) }),
                      },
                    ]}
                    key={index}
                  >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                          source={item.icon}
                          style={[
                            styles._payByIcon,
                            {
                              tintColor:
                                selectedPaymentIndex === index ? COLORS.primary : COLORS.darkGray,
                            },
                          ]}
                        />
                        <Text
                          style={[
                            styles.cashCardCoin,
                            {
                              color:
                                selectedPaymentIndex === index ? COLORS.primary : COLORS.dark_grey,
                              marginLeft: ms(5),
                            },
                          ]}
                        >
                          {item?.title}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.payableAmount,
                          {
                            color:
                              selectedPaymentIndex === index ? COLORS.primary : COLORS.dark_grey,
                          },
                        ]}
                      >
                        {totalAmountByPaymentMethod(index)}
                      </Text>
                    </View>
                    {index === 1 && (
                      <View style={styles.saveViewCon}>
                        <Text style={styles.saveViewText}>{'Save 1%'}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : null}
          {selectedPaymentIndex !== null && selectedPaymentIndex === 0 && (
            <View>
              <Spacer space={SH(20)} />
              <Text style={styles.selectTips}>{'E-Recipe '}</Text>
              <View style={styles.erecipeCon}>
                {ERECIPE_DATA?.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedRecipeIndex(index);
                      // setPhoneNumber(), setEmail();
                      if (item.title == 'No e-recipe') {
                        getTipPress();
                      }
                    }}
                    style={[
                      styles.smsCon,
                      {
                        flex: index === 2 ? 0.4 : 0.27,
                        borderColor:
                          selectedRecipeIndex === index ? COLORS.primary : COLORS.solidGrey,
                      },
                    ]}
                    key={index}
                  >
                    <Text
                      style={[
                        styles.cashCardCoin,
                        {
                          color: selectedRecipeIndex === index ? COLORS.primary : COLORS.dark_grey,
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {/* sms  section */}
          {selectedPaymentIndex !== null &&
            selectedPaymentIndex === 0 &&
            selectedRecipeIndex === 0 && (
              <>
                <View style={{ marginTop: ms(15) }}>
                  <Text style={styles.erecipeSms}>{strings.cart.erecipeSms}</Text>
                  <View style={styles.textInputView}>
                    <CountryPicker
                      withFilter
                      withCallingCode
                      countryCode={flag}
                      onSelect={(code) => {
                        setFlag(code.cca2);
                        if (code?.callingCode?.length > 0) {
                          setCountryCode('+' + code.callingCode.flat());
                        } else {
                          setCountryCode('');
                        }
                      }}
                    />

                    <Text style={styles.codeText}>{countryCode}</Text>

                    <TextInput
                      maxLength={10}
                      value={phoneNumber?.toString()}
                      autoCorrect={false}
                      returnKeyType={'done'}
                      keyboardType={'number-pad'}
                      style={styles.textInputContainer}
                      onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                      placeholderTextColor={COLORS.gerySkies}
                      placeholder={strings.phoneNumber.numberText}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.payNowCon}
                  onPress={async () => {
                    if (!phoneNumber) {
                      CustomErrorToast({ message: 'Please enter phone number' });
                    } else if (
                      phoneNumber &&
                      mobileReg.test(phoneNumber) === false &&
                      phoneNumber?.length < 10
                    ) {
                      CustomErrorToast({ message: 'Please enter valid phone number' });
                    } else {
                      const data = {
                        tip: selectedTipAmount.toString(),
                        cartId: cartData.id,
                      };
                      const res = await dispatch(updateCartByTip(data));
                      if (res?.type === 'UPDATE_CART_BY_TIP_SUCCESS') {
                        const data = {
                          cartId: cartData?.id,
                          phoneNo: phoneNumber,
                          countryCode: countryCode,
                        };
                        const res = await dispatch(attachCustomer(data));
                        if (res?.type === 'ATTACH_CUSTOMER_SUCCESS') {
                          cashPayNowHandler();
                        }
                      }
                    }
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.payNowText}>{'Pay Now'}</Text>
                    <Image source={Images.buttonArrow} style={styles.buttonArrow} />
                  </View>
                </TouchableOpacity>
              </>
            )}
          {/* email  section */}
          {selectedPaymentIndex !== null &&
            selectedPaymentIndex === 0 &&
            selectedRecipeIndex === 1 && (
              <>
                <View style={{ marginTop: ms(15) }}>
                  <Text style={styles.erecipeSms}>{strings.cart.erecipeEmail}</Text>
                  <View style={styles.textInputView}>
                    <Image source={Images.email} style={styles.emailIcon} />

                    <TextInput
                      value={email?.trim()}
                      autoCorrect={false}
                      returnKeyType={'done'}
                      style={styles.textInputContainer}
                      onChangeText={(email) => setEmail(email)}
                      placeholderTextColor={COLORS.gerySkies}
                      placeholder={strings.profile.emailAddress}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.payNowCon}
                  onPress={async () => {
                    if (!email) {
                      CustomErrorToast({ message: 'Please enter email' });
                    } else if (email && emailReg.test(email) === false) {
                      CustomErrorToast({ message: 'Please enter valid email' });
                    } else {
                      const data = {
                        tip: selectedTipAmount.toString(),
                        cartId: cartData.id,
                      };
                      const res = await dispatch(updateCartByTip(data));
                      if (res?.type === 'UPDATE_CART_BY_TIP_SUCCESS') {
                        const data = {
                          cartId: cartData?.id,
                          phoneEmail: email,
                        };
                        const res = await dispatch(attachCustomer(data));
                        if (res?.type === 'ATTACH_CUSTOMER_SUCCESS') {
                          cashPayNowHandler();
                        }
                      }
                    }
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.payNowText}>{'Pay Now'}</Text>
                    <Image source={Images.buttonArrow} style={styles.buttonArrow} />
                  </View>
                </TouchableOpacity>
              </>
            )}
          {/* {selectedPaymentIndex !== null &&
            selectedPaymentIndex === 0 &&
            selectedRecipeIndex === 2 && (
              <TouchableOpacity style={styles.payNowCon} onPress={() => alert('emailHandler')}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.payNowText}>{'Pay Now'}</Text>
                  <Image source={Images.buttonArrow} style={styles.buttonArrow} />
                </View>
              </TouchableOpacity>
            )} */}
          {/* jbr coin pay now button */}
          {selectedPaymentIndex !== null && selectedPaymentIndex === 1 && (
            <TouchableOpacity style={styles.payNowCon} onPress={() => alert('jbr coin')}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.payNowText}>{'Pay Now'}</Text>
                <Image source={Images.buttonArrow} style={styles.buttonArrow} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </BottomSheetScrollView>
      {isLoad && <FullScreenLoader />}
    </BottomSheetModal>
  );
};

export default CartAmountByPay;

const styles = StyleSheet.create({
  productHeaderCon: {
    height: ms(60),
    paddingHorizontal: ms(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: ms(10),
  },
  crossImageStyle: {
    width: ms(26),
    height: ms(26),
    resizeMode: 'contain',
  },
  payableAmountCon: {
    alignItems: 'center',
  },
  payableAmount: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(15),
  },
  darkPaybleAmount: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: ms(25),
    marginTop: ms(5),
  },
  selectTipsCon: {
    marginTop: ms(20),
    height: ms(130),
    borderWidth: 1,
    borderColor: COLORS.textInputBackground,
    borderRadius: ms(5),
  },
  selectTipsHeader: {
    height: ms(40),
    backgroundColor: COLORS.textInputBackground,
    borderTopEndRadius: ms(5),
    borderTopLeftRadius: ms(5),
    justifyContent: 'center',
    paddingHorizontal: ms(10),
    marginBottom: ms(5),
  },
  selectTips: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
  },
  selectTipBodyCon: {
    flex: 0.5,
    height: ms(40),
    borderRadius: ms(4),
    marginHorizontal: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.textInputBackground,
  },
  selectTipBodySelect: {
    flex: 0.5,
    borderWidth: 1,
    height: ms(40),
    borderRadius: ms(4),
    marginHorizontal: ms(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.blue_shade,
    borderColor: COLORS.primary,
  },
  _payByMethodTip: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(12),
    // marginTop: ms(4),
  },
  selectPaymentBody: {
    marginTop: ms(10),
    height: ms(50),
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    borderRadius: ms(5),
    paddingHorizontal: ms(12),
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    justifyContent: 'center',
  },

  cashCardCoin: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
  },
  smsCon: {
    borderWidth: 1,
    height: ms(60),
    borderRadius: ms(5),
    borderColor: COLORS.solidGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  erecipeCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(10),
  },
  payNowCon: {
    height: ms(50),
    backgroundColor: COLORS.primary,
    marginTop: ms(10),
    borderRadius: ms(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: ms(20),
  },
  payNowText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: ms(13),
  },
  buttonArrow: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    marginLeft: ms(5),
  },
  borderBlue: {
    borderColor: COLORS.primary,
  },
  blueText: {
    color: COLORS.primary,
  },
  _payByIcon: {
    height: ms(25),
    width: ms(25),
    resizeMode: 'contain',
  },
  saveViewCon: {
    height: ms(30),
    borderRadius: ms(5),
    backgroundColor: COLORS.textInputBackground,
    marginVertical: ms(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveViewText: {
    fontFamily: Fonts.Medium,
    color: COLORS.dark_grey,
    fontSize: ms(13),
  },
  jbrSaveCon: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    height: ms(70),
    borderRadius: ms(5),
    marginTop: ms(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  youSave: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.primary,
    fontSize: ms(15),
  },
  saveJbr: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: ms(20),
  },
  erecipeSms: {
    fontFamily: Fonts.Regular,
    color: COLORS.dark_grey,
    fontSize: ms(13),
  },
  textInputView: {
    marginTop: ms(10),
    borderWidth: 1,
    height: SH(55),
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    width: SW(350),
    alignSelf: 'center',
    paddingHorizontal: SW(12),
    borderColor: COLORS.solidGrey,
  },
  codeText: {
    fontSize: SF(18),
    color: COLORS.black,
    fontFamily: Fonts.Regular,
  },
  textInputContainer: {
    width: SW(270),
    fontSize: SF(16),
    color: COLORS.black,
    fontFamily: Fonts.Italic,
    paddingHorizontal: SW(10),
  },
  emailIcon: {
    height: ms(20),
    width: ms(20),
    resizeMode: 'contain',
  },
});
