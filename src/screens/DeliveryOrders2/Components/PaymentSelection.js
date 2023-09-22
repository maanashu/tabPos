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
import { useDispatch, useSelector } from 'react-redux';
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
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { SF, SH, COLORS, SW } from '@/theme';
import InvoiceDetails from './InvoiceDetails';
import BackButton from '@/components/BackButton';
import ReturnConfirmation from './ReturnConfirmation';
import { RECIPE_DATA } from '@/constants/flatListData';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { CustomKeyboard } from '@/screens/PosRetail3/CustomKeyBoard';
import { cardPayment, cash, crossButton, dropdown, Fonts, qrCodeIcon } from '@/assets';
import { goBack } from '@/navigation/NavigationRef';

const { width, height } = Dimensions.get('window');

export function PaymentSelection(props) {
  console.log('props----', props?.route?.params?.screen);
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

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.RETURN_PRODUCTS], state)
  );

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
        id: item?.id,
        qty: item?.qty ?? 1,
        write_off_qty: item?.write_off_qty,
        add_to_inventory_qty: item?.add_to_inventory_qty,
        refund_value: `${item?.totalRefundAmount}`,
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
    dispatch(
      returnProduct(data, (res) => {
        if (res) {
          setIsReturnConfirmation(true);
        }
      })
    );
  };

  const onPressreturn = () => {
    setIsReturnConfirmation(false);
    dispatch(returnProductSuccess({}));
    dispatch(getProductsBySkuSuccess({}));
    navigation.navigate(NAVIGATION.deliveryOrders2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.selectTipsHeader}>
          <View style={styles.headerRowStyle}>
            <BackButton onPress={() => goBack()} title={'Back'} style={styles.backIconStyle} />

            <Text style={styles._totalAmountTitle}>{strings.returnOrder.totalReturnAmount}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles._dollarSymbol}>{strings.returnOrder.dollar}</Text>
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
                <Text style={styles._payByMethod}>{orderData?.order?.mode_of_payment}</Text>
                <Text style={styles._payByAmount}>{`$${payableAmount?.toFixed(2)}`}</Text>
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
}

const styles = StyleSheet.create({});
