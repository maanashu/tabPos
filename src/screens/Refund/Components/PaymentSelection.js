import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { moderateScale, moderateVerticalScale, ms, verticalScale } from 'react-native-size-matters';

import {
  returnProduct,
  returnProductSuccess,
  getProductsBySkuSuccess,
} from '@/actions/DashboardAction';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { SF, SH, COLORS, SW, ShadowStyles } from '@/theme';
import InvoiceDetails from './InvoiceDetails';
import BackButton from '@/components/BackButton';
import ReturnConfirmation from './ReturnConfirmation';
import { RECIPE_DATA } from '@/constants/flatListData';
import { CustomKeyboard } from '@/screens/PosRetail3/CustomKeyBoard';
import {
  cardPayment,
  cash,
  crossButton,
  deliveryIcon,
  dropdown,
  Fonts,
  qrCodeIcon,
} from '@/assets';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import { Images } from '@/assets/new_icon';
import BlurredModal from '@/components/BlurredModal';

const { width, height } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;

const PaymentSelection = ({
  backHandler,
  orderData,
  order,
  applicableForAllItems,
  shouldRefundDeliveryAmount,
  applyEachItem,
  payableAmount,
  subTotal,
  totalTaxes,
  deliveryShippingTitle,
  deliveryShippingCharges,
  total,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [flag, setFlag] = useState('US');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [isReturnConfirmation, setIsReturnConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isCashOrder = orderData?.order?.mode_of_payment === strings.returnOrder.cash;

  const paymentMethodData = [];

  paymentMethodData.push(
    {
      title: 'debit/credit',
      icon: Images.debitCardIcon,
      id: 3,
      color:
        orderData?.order?.mode_of_payment === 'card' ? COLORS.light_sky_blue : COLORS.torquoise,
      backgroundColor:
        orderData?.order?.mode_of_payment === 'card' ? COLORS.torquoise : COLORS.light_sky_blue,
      amount: orderData?.order?.mode_of_payment === 'card' ? '$' + payableAmount.toFixed(2) : 'J0',
      borderColor:
        orderData?.order?.mode_of_payment === 'card' ? COLORS.transparent : COLORS.light_skyblue,
      opacity: orderData?.order?.mode_of_payment === 'card' ? 1 : 0.5,
    },
    {
      title: 'cash',
      icon: Images.cashFlowIcon,
      id: 1,
      color:
        orderData?.order?.mode_of_payment === 'cash' ? COLORS.light_green : COLORS.medium_green,
      backgroundColor:
        orderData?.order?.mode_of_payment === 'cash' ? COLORS.success_green : COLORS.light_green,
      amount: orderData?.order?.mode_of_payment === 'cash' ? '$' + payableAmount.toFixed(2) : '$0',
      borderColor:
        orderData?.order?.mode_of_payment === 'cash' ? COLORS.transparent : COLORS.success_green,
      opacity: orderData?.order?.mode_of_payment === 'cash' ? 1 : 0.5,
    },
    {
      title: 'jobr coin',
      icon: Images.jbrFlowIcon,
      id: 2,
      color: orderData?.order?.mode_of_payment === 'jbr' ? COLORS.sky_grey : COLORS.navy_blue,
      backgroundColor:
        orderData?.order?.mode_of_payment === 'jbr' ? COLORS.navy_blue : COLORS.sky_grey,
      amount: orderData?.order?.mode_of_payment === 'jbr' ? '$' + payableAmount.toFixed(2) : '$0',
      borderColor:
        orderData?.order?.mode_of_payment === 'jbr' ? COLORS.transparent : COLORS.light_purple,
      opacity: orderData?.order?.mode_of_payment === 'jbr' ? 1 : 0.5,
    }
  );
  const receiptData = [
    {
      title: 'SMS',
      icon: Images.smsReceipt,
      tintColor: selectedRecipeIndex === 0 ? COLORS.white : COLORS.redish_brown,
      color: selectedRecipeIndex === 0 ? COLORS.white : COLORS.redish_brown,
      backgroundColor: selectedRecipeIndex === 0 ? COLORS.orange_bright : COLORS.light_yellow,
    },
    {
      title: 'E-mail',
      icon: Images.emailReceipt,
      tintColor: selectedRecipeIndex === 1 ? COLORS.white : COLORS.redish_brown,
      color: selectedRecipeIndex === 1 ? COLORS.white : COLORS.redish_brown,
      backgroundColor: selectedRecipeIndex === 1 ? COLORS.orange_bright : COLORS.light_yellow,
    },

    {
      title: 'No, thanks',
      icon: Images.nothanksReceipt,
      tintColor: selectedRecipeIndex === 2 ? COLORS.white : COLORS.redish_brown,
      color: selectedRecipeIndex === 2 ? COLORS.white : COLORS.redish_brown,
      backgroundColor: selectedRecipeIndex === 2 ? COLORS.orange_bright : COLORS.light_yellow,
    },
  ];

  const onCheckSelectedReceipt = (index) => {
    if (index === 0) {
      setIsPhoneVisible(true);
      setPhoneNumber('');
    } else if (index === 1) {
      setIsEmailVisible(true);
      setEmail('');
    } else {
    }
  };

  const renderRecipeMethod = ({ item, index }) => {
    const selectedMethod = selectedRecipeIndex === index ? COLORS.primary : COLORS.darkGray;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          onCheckSelectedReceipt(index);
          setSelectedRecipeIndex(index);
        }}
        style={[styles._payBYBoxContainerReceipe, { borderColor: selectedMethod }]}
      >
        <Text style={[styles._payByMethodReceipe, { color: selectedMethod }]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const closeHandler = () => {
    setSelectedRecipeIndex(null);
    setIsPhoneVisible(false);
  };

  const onReturnHandler = () => {
    if (
      !orderData ||
      !order ||
      !orderData.order ||
      !orderData.order.mode_of_payment ||
      (isCashOrder && selectedRecipeIndex === null)
    ) {
      alert('Please select e-recipe method');
      return;
    }
    const products =
      order?.map((item) => ({
        id: item?.product_id,
        qty: item?.qty ?? 1,
        write_off_qty: item?.write_off_qty,
        add_to_inventory_qty: item?.add_to_inventory_qty,
        refund_value: `${
          applicableForAllItems || applyEachItem ? item?.totalRefundAmount : item?.price * item?.qty
        }`,
      })) || [];

    const data = {
      order_id: orderData.order_id,
      products,
      total_taxes: totalTaxes,
      total_refund_amount: total,
      return_reason: 'testing reason',
      ...(selectedRecipeIndex === 0 && {
        full_phone_number: countryCode + phoneNumber,
      }),
      ...(selectedRecipeIndex === 1 && { email }),
    };

    if (shouldRefundDeliveryAmount) {
      let deliveryShippingParamKey;
      if (deliveryShippingTitle === 'Delivery Charges') {
        deliveryShippingParamKey = 'delivery_charge';
      } else {
        deliveryShippingParamKey = 'shipping_charge';
      }
      data[deliveryShippingParamKey] = deliveryShippingCharges;
    }

    const callback = (res) => {
      if (res) {
        setIsLoading(false);
        setIsReturnConfirmation(true);
      } else {
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    dispatch(returnProduct(data, 'refundPaymentSelection', callback));
  };

  const onPressreturn = () => {
    setIsReturnConfirmation(false);
    dispatch(returnProductSuccess({}));
    dispatch(getProductsBySkuSuccess({}));
    navigation.navigate('SearchScreen', { screen: 'return' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <BackButton onPress={backHandler} title={'Back'} style={styles.backIconStyle} />
        <Spacer space={ms(60)} />

        <View style={styles.headerRowStyle}>
          <Text style={styles._totalAmountTitle}>{strings.returnOrder.totalReturnAmount}</Text>

          <View style={{ flexDirection: 'row', marginTop: ms(2) }}>
            <Text style={styles._dollarSymbol}>{'-' + strings.returnOrder.dollar}</Text>
            <Text style={styles._amount}>{payableAmount?.toFixed(2)}</Text>
          </View>
        </View>
        <Text style={styles.returnPaymentMethod}>{'Select a method of payment to refund.'}</Text>
        <View style={styles.paymentMethodViewStyle}>
          <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            {paymentMethodData.map((item, index) => (
              <View
                key={index}
                style={[
                  styles._payBYBoxContainer,
                  {
                    backgroundColor: item?.backgroundColor,
                    borderColor: item?.borderColor,
                    opacity: item?.opacity,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={item.icon}
                    style={[styles._payByIcon, { tintColor: item?.color }]}
                  />
                  <Text style={[styles._payByMethod, { color: item?.color }]}>{item.title}</Text>
                </View>

                <View style={{ flex: 1 }} />
                {index === 2 && (
                  // <Text style={styles._payByMethod(selectedPaymentIndex, index)}>
                  //   5464 6487 7484 93034
                  // </Text>
                  <Image
                    source={Images.cardDot}
                    style={{
                      width: ms(80),
                      height: ms(15),
                      resizeMode: 'contain',
                      tintColor: item?.color,
                    }}
                  />
                )}
                <Spacer space={SH(10)} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={[styles._payByAmount, { color: item?.color }]}>{item?.amount}</Text>
                </View>
              </View>
            ))}
          </View>

          <Spacer space={SH(30)} backgroundColor={COLORS.transparent} />

          {isCashOrder && (
            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
              <Image
                source={deliveryIcon}
                style={{ resizeMode: 'contain', height: ms(20), width: ms(20) }}
              />
              <Text
                style={[
                  styles.returnPaymentMethod,
                  {
                    marginVertical: ms(10),
                    color: COLORS.navy_blue,
                    fontFamily: Fonts.Medium,
                    fontSize: ms(11),
                  },
                ]}
              >
                {'Send your e-receipt?'}
              </Text>
            </View>
          )}

          {isCashOrder && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {receiptData.map((item, index) => (
                <TouchableOpacity
                  onPress={() => {
                    onCheckSelectedReceipt(index);
                    setSelectedRecipeIndex(index);
                  }}
                  key={index}
                  style={[
                    styles._payBYBoxContainerReceipe,
                    { backgroundColor: item?.backgroundColor },
                  ]}
                >
                  <Image
                    source={item.icon}
                    style={[styles.recipeIcon, { tintColor: item?.tintColor }]}
                  />
                  <Spacer space={SH(10)} />
                  <Text style={[styles._payByMethodReceipe, { color: item?.color }]}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Spacer space={SH(60)} backgroundColor={COLORS.transparent} />

          <TouchableOpacity
            onPress={() => onReturnHandler()}
            style={[
              styles.buttonStyle,
              isCashOrder ?? {
                backgroundColor: selectedRecipeIndex ? COLORS.navy_blue : COLORS.input_border,
              },
            ]}
          >
            <Text
              style={[
                styles.buttonTextStyle,
                {
                  marginRight: ms(5),
                },
              ]}
            >
              {'Continue Return'}
            </Text>
            <Image
              source={Images.shoppingReturn}
              style={{ resizeMode: 'contain', height: ms(15), width: ms(15) }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <InvoiceDetails
          orderList={order}
          orderData={orderData}
          subTotal={subTotal}
          totalTaxes={totalTaxes}
          deliveryShippingTitle={deliveryShippingTitle}
          deliveryShippingCharges={deliveryShippingCharges}
          total={total}
          applicableForAllItems={applicableForAllItems}
          applyEachItem={applyEachItem}
          shouldRefundDeliveryAmount={shouldRefundDeliveryAmount}
        />
      </View>

      <ReturnConfirmation
        isVisible={isReturnConfirmation}
        setIsVisible={setIsReturnConfirmation}
        order={orderData}
        onPressHandler={onPressreturn}
      />

      {/* phone popup */}

      <BlurredModal isVisible={isPhoneVisible}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            // alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <View style={styles.emailModalContainer}>
            {/* <View style={{ borderWidth: 1 }}> */}
            <View style={styles.modalHeaderCon}>
              <TouchableOpacity style={styles.crossButtonCon} onPress={() => closeHandler()}>
                <Image source={crossButton} style={styles.crossButton} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingHorizontal: ms(12) }}>
              <Image source={Images.phone} style={styles.emailIcon} />
              <Text style={styles.emailRec}>
                What phone number do we {`\n`} send the e-receipt to?
              </Text>
              <Spacer space={SH(25)} />
              <Text style={styles.newCusAdd}>{'Phone Number'}</Text>

              <View style={styles.textInputView}>
                <CountryPicker
                  onSelect={(code) => {
                    setFlag(code.cca2);
                    if (code.callingCode?.length > 0) {
                      setCountryCode('+' + code.callingCode.flat());
                    } else {
                      setCountryCode('');
                    }
                  }}
                  countryCode={flag}
                  withFilter
                  withCallingCode
                />
                <Image source={dropdown} style={styles.dropDownIcon} />
                <Text style={styles.countryCodeText}>{countryCode}</Text>
                <TextInput
                  maxLength={10}
                  returnKeyType="done"
                  keyboardType="number-pad"
                  value={phoneNumber.trim()}
                  onChangeText={(text) => setPhoneNumber(text)}
                  style={styles.textInputContainer}
                  placeholder={strings.verifyPhone.placeHolderText}
                  placeholderTextColor={COLORS.light_purple}
                  // showSoftInputOnFocus={false}
                />
              </View>
              <View style={{ flex: 1 }} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity style={styles.cancelButtonCon} onPress={() => closeHandler()}>
                  <Text style={styles.cancelText}>{'Cancel'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addToCartButtonCon}
                  onPress={() => {
                    setIsPhoneVisible(false);
                    setPhoneNumber(phoneNumber);
                  }}
                >
                  <Text style={[styles.cancelText, { color: COLORS.white }]}>
                    {'Send E-receipt'}
                  </Text>
                  {/* <Image source={Images.addProduct} style={styles.plusIconAdd} /> */}
                </TouchableOpacity>
              </View>
              <Spacer space={SH(25)} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </BlurredModal>

      {/* <ReactNativeModal isVisible={isPhoneVisible}>
        <View style={styles.calendarSettingModalContainer}>
          <View>
            <View style={styles.textInputView}>
              <CountryPicker
                onSelect={(code) => {
                  setFlag(code.cca2);
                  if (code.callingCode?.length > 0) {
                    setCountryCode('+' + code.callingCode.flat());
                  } else {
                    setCountryCode('');
                  }
                }}
                countryCode={flag}
                withFilter
                withCallingCode
              />
              <Image source={dropdown} style={styles.dropDownIcon} />
              <Text style={styles.countryCodeText}>{countryCode}</Text>
              <TextInput
                maxLength={15}
                returnKeyType="done"
                keyboardType="number-pad"
                value={phoneNumber.trim()}
                onChangeText={(text) => setPhoneNumber(text)}
                style={styles.textInputContainer}
                placeholder={strings.verifyPhone.placeHolderText}
                placeholderTextColor={COLORS.darkGray}
                showSoftInputOnFocus={false}
              />
            </View>
            <CustomKeyboard
              maxCharLength={15}
              enteredValue={phoneNumber}
              setEnteredValue={setPhoneNumber}
              onClosePress={closeHandler}
              onPayNowPress={() => {
                setIsPhoneVisible(false);
                setPhoneNumber(phoneNumber);
              }}
            />
          </View>
        </View>
      </ReactNativeModal> */}

      <BlurredModal isVisible={isEmailVisible}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            // alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <View style={styles.emailModalContainer}>
            {/* <View style={{ borderWidth: 1 }}> */}
            <View style={styles.modalHeaderCon}>
              <TouchableOpacity
                style={styles.crossButtonCon}
                onPress={() => {
                  setIsEmailVisible(false);
                  setSelectedRecipeIndex(null);
                  setEmail('');
                }}
              >
                <Image source={crossButton} style={styles.crossButton} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingHorizontal: ms(12) }}>
              <Image source={Images.email} style={styles.emailIcon} />
              <Text style={styles.emailRec}>
                What e-mail address do we {`\n`} send the e-receipt to?
              </Text>
              <Spacer space={SH(25)} />
              <Text style={styles.newCusAdd}>{'E-mail Address'}</Text>

              <View style={styles.inputContainer}>
                <Image source={Images.email} style={styles.emailIconInput} />
                <TextInput
                  style={styles.textInput}
                  placeholder="you@you.mail"
                  value={email?.trim()}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.light_purple}
                />
                {/* <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() => {
                    getTipPress();
                    // payNowHandler(),
                    payNowByphone(selectedTipAmount);
                    attachUserByEmail(email);
                  }}
                >
                  <Text style={styles.payNowButtonText}>Pay Now</Text>
                </TouchableOpacity> */}
              </View>
              <View style={{ flex: 1 }} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TouchableOpacity
                  style={styles.cancelButtonCon}
                  onPress={() => {
                    setIsEmailVisible(false), setSelectedRecipeIndex(null);
                  }}
                >
                  <Text style={styles.cancelText}>{'Cancel'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addToCartButtonCon}
                  onPress={() => {
                    setIsEmailVisible(false);
                    setEmail(email);
                  }}
                >
                  <Text style={[styles.cancelText, { color: COLORS.white }]}>
                    {'Send E-receipt'}
                  </Text>
                  {/* <Image source={Images.addProduct} style={styles.plusIconAdd} /> */}
                </TouchableOpacity>
              </View>
              <Spacer space={SH(25)} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </BlurredModal>

      {isLoading ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <ActivityIndicator color={COLORS.navy_blue} size="large" style={styles.loader} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.textInputBackground,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerRowStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconStyle: {
    top: ms(10),
    left: ms(10),
    backgroundColor: 'transparent',
    zIndex: 999,
  },
  leftContainer: {
    flex: 0.68,
    backgroundColor: COLORS.white,
    borderRadius: ms(10),
  },
  rightContainer: {
    flex: 0.3,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  loaderViewStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  selectTipsHeader: {
    borderTopEndRadius: 8,
    borderTopLeftRadius: 8,
    paddingVertical: verticalScale(6),
    backgroundColor: COLORS.blue_shade,
  },
  _totalAmountTitle: {
    fontSize: ms(12),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  _dollarSymbol: {
    fontSize: ms(20),
    // marginTop: ms(2),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  _amount: {
    fontSize: ms(20),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  buttonStyle: {
    // height: ms(35),
    borderRadius: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: ms(15),
    backgroundColor: COLORS.navy_blue,
    marginBottom: ms(25),
    flexDirection: 'row',
    padding: ms(10),
    alignSelf: 'center',
  },
  buttonTextStyle: {
    fontSize: ms(12),
    color: COLORS.white,
    fontFamily: Fonts.Medium,
  },
  returnPaymentMethod: {
    fontSize: ms(10),
    color: COLORS.light_blue2,
    fontFamily: Fonts.Regular,
    paddingHorizontal: ms(12),
    textAlign: 'center',
    marginTop: ms(5),
  },
  paymentMethodViewStyle: {
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: ms(20),
    marginHorizontal: ms(30),
    backgroundColor: COLORS.white,
  },
  _payBYBoxContainer: {
    borderWidth: 1,
    borderRadius: ms(6),
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: ms(4),
    justifyContent: 'center',
    borderColor: COLORS.primary,
    width: Platform.OS === 'ios' ? ms(95) : ms(127),
    height: Platform.OS === 'ios' ? ms(100) : ms(120),
  },
  _payByTitle: {
    fontSize: ms(9),
    marginBottom: ms(3),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  _payByMethod: {
    fontSize: ms(14),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  _payByAmount: {
    fontSize: ms(10),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  _payByIcon: {
    width: ms(22),
    height: ms(22),
    marginTop: ms(8),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  _payBYBoxContainerReceipe: {
    borderWidth: 1,
    height: ms(45),
    borderRadius: ms(6),
    alignItems: 'center',
    marginHorizontal: ms(4),
    justifyContent: 'center',
    borderColor: COLORS.solidGrey,
    width: Platform.OS === 'ios' ? ms(95) : ms(127),
  },
  _payByMethodReceipe: {
    fontSize: ms(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  eReceiptViewStyle: {
    paddingTop: 5,
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  calendarSettingModalContainer: {
    width: width * 0.4,
    height: height * 0.84,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 7,
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: moderateVerticalScale(7),
    paddingVertical: verticalScale(15),
    position: 'absolute',
  },
  textInputView: {
    paddingHorizontal: SW(4),
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: height * 0.08,
    width: width * 0.33,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 5,
  },
  dropDownIcon: {
    width: 7,
    height: 7,
    resizeMode: 'contain',
  },
  countryCodeText: {
    color: COLORS.black,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(8),
  },
  textInputContainer: {
    color: COLORS.black,
    fontSize: SF(16),
    fontFamily: Fonts.Italic,
    width: width * 0.2,
  },

  //email modal
  emailModalContainer: {
    width: ms(280),
    height: ms(250),
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: ms(22),
    // alignItems: 'center',
    ...ShadowStyles.shadow,
  },
  modalHeaderCon: {
    width: ms(280),
    height: SH(30),
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: ms(15),
    marginTop: ms(15),
  },
  crossButton: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  crossButtonCon: {
    width: SW(13),
    height: SW(13),
    // justifyContent: 'center',
    alignItems: 'center',
    tintColor: COLORS.navy_blue,
  },
  modalDataCon: {
    width: windowWidth * 0.38,
    alignSelf: 'center',
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  twoStepText: {
    fontSize: SF(25),
    fontFamily: Fonts.MaisonBold,
    color: COLORS.black,
    textAlign: 'left',
  },
  inputContainer: {
    paddingHorizontal: SW(4),
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    height: ms(40),
    borderRadius: ms(20),
    fontFamily: Fonts.Medium,
    borderColor: COLORS.light_purple,
    color: COLORS.navy_blue,
    marginTop: ms(3),
  },
  textInput: {
    flex: 1,
    height: ms(40),
    fontSize: ms(10),
    paddingHorizontal: 15,
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  payNowButton: {
    height: ms(30),
    width: ms(70),
    backgroundColor: COLORS.darkGray,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal:ms(5)
  },
  emailIcon: {
    width: ms(25),
    height: ms(25),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  emailIconInput: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
    tintColor: COLORS.lavender,
  },
  emailRec: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.navy_blue,
    fontSize: ms(13),
    textAlign: 'center',
    marginTop: ms(3),
  },
  newCusAdd: {
    color: COLORS.navy_blue,
    fontSize: ms(8),
    fontFamily: Fonts.Medium,
    marginVertical: ms(4),
  },
  cancelButtonCon: {
    height: ms(38),
    flex: 0.4,
    backgroundColor: COLORS.input_border,
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonCon: {
    height: ms(38),
    flex: 0.55,
    backgroundColor: COLORS.navy_blue,
    borderRadius: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cancelText: {
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    fontSize: ms(10),
  },

  payNowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  _payBYBoxContainer: {
    borderWidth: 1,
    height: ms(90),
    width: Platform.OS === 'ios' ? ms(125) : ms(157),
    flexShrink: 1,
    flex: 1,
    marginHorizontal: ms(4),
    borderRadius: ms(9),
    padding: ms(6),
  },
  _payBYBoxContainerEmpty: {
    height: ms(125),
    width: ms(170),
    margin: ms(3),
    alignItems: 'center',
    padding: ms(10),
  },
  _payByTitle: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(9),
    marginBottom: ms(3),
  },
  _payByMethod: {
    fontFamily: Fonts.Medium,
    fontSize: ms(9),
  },
  _payByAmount: {
    fontFamily: Fonts.Medium,
    fontSize: ms(10),
    marginTop: ms(2),
  },
  _payByIcon: {
    height: ms(18),
    width: ms(18),
    resizeMode: 'contain',
  },

  _payBYBoxContainerReceipe: {
    borderColor: COLORS.faded_yellow,
    borderWidth: 1,
    height: ms(60),
    width: Platform.OS === 'ios' ? ms(100) : ms(100),
    // flexShrink: 1,
    // flex: 1,
    margin: ms(3),
    borderRadius: ms(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeIcon: {
    height: ms(18),
    width: ms(18),
    resizeMode: 'contain',
  },
  _payByMethodReceipe: {
    fontFamily: Fonts.Medium,
    fontSize: ms(10),
  },
});

export default memo(PaymentSelection);
