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
import { SF, SH, COLORS, SW } from '@/theme';
import InvoiceDetails from './InvoiceDetails';
import BackButton from '@/components/BackButton';
import ReturnConfirmation from './ReturnConfirmation';
import { RECIPE_DATA } from '@/constants/flatListData';
import { CustomKeyboard } from '@/screens/PosRetail3/CustomKeyBoard';
import { cardPayment, cash, crossButton, dropdown, Fonts, qrCodeIcon } from '@/assets';
import { formattedReturnPrice } from '@/utils/GlobalMethods';

const { width, height } = Dimensions.get('window');

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
    if (!orderData || !order || !orderData.order || !orderData.order.mode_of_payment) {
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
        <View style={styles.selectTipsHeader}>
          <View style={styles.headerRowStyle}>
            <BackButton onPress={backHandler} title={'Back'} style={styles.backIconStyle} />

            <Text style={styles._totalAmountTitle}>{strings.returnOrder.totalReturnAmount}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles._dollarSymbol}>{'-' + strings.returnOrder.dollar}</Text>
              <Text style={styles._amount}>{payableAmount?.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <Spacer space={SH(40)} backgroundColor={COLORS.transparent} />

        <View style={styles.paymentMethodViewStyle}>
          <Text style={styles.returnPaymentMethod}>{strings.returnOrder.returnPaymentMethod}</Text>

          <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

          <View style={{ alignItems: 'center' }}>
            {orderData?.order?.mode_of_payment ? (
              <TouchableOpacity style={styles._payBYBoxContainer}>
                <Text style={styles._payByTitle}>{strings.returnOrder.payBy}</Text>
                <Text style={styles._payByMethod}>
                  {(orderData?.order?.mode_of_payment).toUpperCase()}
                </Text>
                <Text style={styles._payByAmount}>{`${formattedReturnPrice(payableAmount)}`}</Text>
                <Image
                  source={
                    orderData?.order?.mode_of_payment === strings.returnOrder.cash
                      ? cash
                      : orderData?.order?.mode_of_payment === strings.returnOrder.jbr
                      ? qrCodeIcon
                      : cardPayment
                  }
                  style={styles._payByIcon}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <Spacer space={SH(30)} backgroundColor={COLORS.transparent} />

          {orderData?.order?.mode_of_payment === strings.returnOrder.cash && (
            <Text style={styles.returnPaymentMethod}>{strings.returnOrder.eReceipt}</Text>
          )}

          {orderData?.order?.mode_of_payment === strings.returnOrder.cash && (
            <View style={styles.eReceiptViewStyle}>
              <FlatList
                horizontal
                data={RECIPE_DATA}
                extraData={RECIPE_DATA}
                renderItem={renderRecipeMethod}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
              />
            </View>
          )}

          <Spacer space={SH(60)} backgroundColor={COLORS.transparent} />

          <TouchableOpacity onPress={() => onReturnHandler()} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>{strings.returnOrder.return}</Text>
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

      <ReactNativeModal isVisible={isPhoneVisible}>
        <View style={styles.calendarSettingModalContainer}>
          <View>
            <View style={styles.textInputView}>
              <CountryPicker
                onSelect={(code) => {
                  setFlag(code.cca2);
                  if (code.callingCode !== []) {
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
      </ReactNativeModal>

      <ReactNativeModal isVisible={isEmailVisible}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <View style={styles.emailModalContainer}>
            <View>
              <View style={styles.modalHeaderCon}>
                <View style={styles.flexRow}>
                  <Text style={[styles.twoStepText, { fontFamily: Fonts.SemiBold }]}>
                    {strings.retail.eRecipeEmail}
                  </Text>
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
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="you@you.mail"
                  value={email.trim()}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.solidGrey}
                />
                <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() => {
                    setIsEmailVisible(false);
                    setEmail(email);
                  }}
                >
                  <Text style={styles.payNowButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ReactNativeModal>

      {isLoading ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
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
  },
  leftContainer: {
    flex: 0.7,
  },
  rightContainer: {
    flex: 0.28,
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
    fontSize: ms(17),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  _dollarSymbol: {
    fontSize: ms(17),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  _amount: {
    fontSize: ms(25),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  buttonStyle: {
    height: SH(60),
    borderRadius: 5,
    width: width / 2.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonTextStyle: {
    fontSize: SF(20),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  returnPaymentMethod: {
    fontSize: SF(20),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: ms(12),
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
  emailModalContainer: {
    width: ms(350),
    height: ms(160),
    backgroundColor: 'white',
    paddingVertical: ms(15),
    alignSelf: 'center',
    borderRadius: ms(10),
    alignItems: 'center',
  },
  modalHeaderCon: {
    height: SH(80),
    width: ms(300),
    justifyContent: 'center',
  },
  crossButton: {
    width: SW(9),
    height: SW(9),
    resizeMode: 'contain',
  },
  crossButtonCon: {
    width: SW(13),
    height: SW(13),
    alignItems: 'center',
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
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: ms(300),
    height: ms(40),
    marginTop: ms(25),
    padding: 15,
  },
  textInput: {
    flex: 1,
    height: 45,
    fontSize: ms(10),
    paddingHorizontal: 15,
  },
  payNowButton: {
    height: ms(30),
    width: ms(70),
    backgroundColor: COLORS.darkGray,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payNowButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default memo(PaymentSelection);
