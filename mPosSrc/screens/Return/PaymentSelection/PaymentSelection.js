import { Images } from '@mPOS/assets';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import { cardPayment, cash, qrCodeIcon } from '@/assets';
import ReactNativeModal from 'react-native-modal';
import SmsReceipt from '../Components/SmsReceipt';
import EmailReceipt from '../Components/EmailReceipt';
import { COLORS } from '@/theme';
import { useDispatch } from 'react-redux';
import { returnProduct } from '@/actions/DashboardAction';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { ActivityIndicator } from 'react-native';

const PaymentSelection = ({
  closeSheet,
  data,
  order,
  totalRefundAmount,
  totalTaxes,
  deliveryShippingTitle,
  deliveryShippingCharges,
  total,
  payableAmount,
  isApplyAmount,
}) => {
  const dispatch = useDispatch();
  const isCashOrder = data?.order?.mode_of_payment === strings.returnOrder.cash;

  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isNoReceiptVisible, setIsNoReceiptVisible] = useState(false);
  const [eReceiptMethod, setEReceiptMethod] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const refundHandler = () => {
    if (isCashOrder && eReceiptMethod === 0) {
      alert('Please select e-recipe method');
      return;
    }
    const products =
      order?.map((item) => ({
        id: item?.product_id,
        qty: item?.qty ?? 1,
        write_off_qty: item?.write_off_qty ?? 0,
        add_to_inventory_qty: item?.add_to_inventory_qty ?? 0,
        refund_value: `${
          isApplyAmount === 'applicableForAllItems' || isApplyAmount === 'applyForEachItem'
            ? item?.totalRefundAmount
            : item?.price * item?.qty
        }`,
      })) || [];

    const dataObj = {
      order_id: data?.order_id,
      products,
      total_taxes: totalTaxes,
      total_refund_amount: total,
      return_reason: 'testing reason',
      ...(eReceiptMethod === 1 && {
        full_phone_number: countryCode + phone,
      }),
      ...(eReceiptMethod === 2 && { email }),
    };

    const callback = (res) => {
      if (res) {
        setIsLoading(false);
        alert('Order returned successfully');
        commonNavigate(MPOS_NAVIGATION.home);
      } else {
        setIsLoading(false);
      }
      // setIsLoading(true);
    };
    setIsLoading(true);
    dispatch(returnProduct(dataObj, 'refundPaymentSelection', callback));
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={closeSheet} style={styles.crossIconViewStyle}>
        <Image source={Images.cross} style={styles.crossButtonStyle} />
      </TouchableOpacity>

      <View style={styles.amountMainViewStyle}>
        <Text style={styles.totalAmountLabelStyle}>{strings.returnOrder.totalReturnAmount}</Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles._dollarSymbol}>{'-' + strings.returnOrder.dollar}</Text>
          <Text style={styles.amountTextStyle}>{payableAmount?.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.selectPaymentMethodViewStyle}>
        <Text style={styles.selectPaymentTextStyle}>{strings.returnOrder.selectPayment}</Text>

        <View style={{ marginTop: ms(10), alignItems: 'center' }}>
          {data?.order?.mode_of_payment ? (
            <TouchableOpacity style={styles._payBYBoxContainer}>
              <Text style={styles._payByTitle}>{strings.returnOrder.payBy}</Text>
              <Text style={styles._payByMethod}>
                {(data?.order?.mode_of_payment).toUpperCase()}
              </Text>
              <Text style={styles._payByAmount}>{`${formattedReturnPrice(payableAmount)}`}</Text>
              <Image
                source={
                  isCashOrder
                    ? cash
                    : data?.order?.mode_of_payment === strings.returnOrder.jbr
                    ? qrCodeIcon
                    : cardPayment
                }
                style={styles._payByIcon}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {isCashOrder ? (
        <View style={styles.selectPaymentMethodViewStyle}>
          <Text style={styles.selectPaymentTextStyle}>{strings.returnOrder.eReceipt}</Text>

          <View style={styles.receiptViewStyle}>
            <TouchableOpacity
              onPress={() => {
                setIsPhoneVisible(true);
                setIsEmailVisible(false);
                setIsNoReceiptVisible(false);
                setEReceiptMethod(1);
              }}
              style={[
                styles.smsViewStyle,
                {
                  borderColor: isPhoneVisible ? COLORS.primary : COLORS.solidGrey,
                  borderWidth: isPhoneVisible ? 1 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.ereceiptTextStyle,
                  { color: isPhoneVisible ? COLORS.primary : COLORS.dark_grey },
                ]}
              >
                {strings.returnOrder.sms}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsPhoneVisible(false);
                setIsEmailVisible(true);
                setIsNoReceiptVisible(false);
                setEReceiptMethod(2);
              }}
              style={[
                styles.smsViewStyle,
                {
                  borderColor: isEmailVisible ? COLORS.primary : COLORS.solidGrey,
                  borderWidth: isEmailVisible ? 1 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.ereceiptTextStyle,
                  { color: isEmailVisible ? COLORS.primary : COLORS.dark_grey },
                ]}
              >
                {strings.returnOrder.email}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsPhoneVisible(false);
                setIsEmailVisible(false);
                setIsNoReceiptVisible(true);
                setEReceiptMethod(3);
              }}
              style={[
                styles.smsViewStyle,
                {
                  borderColor: isNoReceiptVisible ? COLORS.primary : COLORS.solidGrey,
                  borderWidth: isNoReceiptVisible ? 1 : 1,
                },
              ]}
            >
              <Text
                style={[
                  styles.ereceiptTextStyle,
                  { color: isNoReceiptVisible ? COLORS.primary : COLORS.dark_grey },
                ]}
              >
                {strings.returnOrder.noReceipe}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <View style={{ flex: 1 }} />

      <TouchableOpacity onPress={refundHandler} style={styles.confirmButtonStyle}>
        <Text style={styles.confirmReturnTextStyle}>{strings.returnOrder.confirmReturn}</Text>
        <Image source={Images.buttonArrow} style={styles.buttonArrowStyle} />
      </TouchableOpacity>

      <ReactNativeModal isVisible={isPhoneVisible}>
        <SmsReceipt
          closeModal={(code, val) => {
            setIsPhoneVisible(false), setCountryCode(code);
            setPhone(val);
          }}
        />
      </ReactNativeModal>

      <ReactNativeModal isVisible={isEmailVisible}>
        <EmailReceipt
          closeModal={(val) => {
            setIsEmailVisible(false);
          }}
          onUpdateEmail={(email) => setEmail(email)}
        />
      </ReactNativeModal>

      {isLoading ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
        </View>
      ) : null}
    </View>
  );
};

export default PaymentSelection;
