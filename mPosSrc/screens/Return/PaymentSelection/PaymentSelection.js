import { ScreenWrapper } from '@/components';
import { Images } from '@mPOS/assets';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, SafeAreaView } from 'react-native';
import styles from './styles';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import { cardPayment, cash, qrCodeIcon } from '@/assets';
import ReactNativeModal from 'react-native-modal';
import SmsReceipt from '../Components/SmsReceipt';
import EmailReceipt from '../Components/EmailReceipt';
import { COLORS } from '@/theme';

const PaymentSelection = ({
  closeSheet,
  data,
  totalRefundAmount,
  totalTaxes,
  deliveryShippingTitle,
  deliveryShippingCharges,
  total,
  payableAmount,
}) => {
  const isCashOrder = data?.order?.mode_of_payment === strings.returnOrder.cash;

  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isNoReceiptVisible, setIsNoReceiptVisible] = useState(false);
  const [eReceiptMethod, setEReceiptMethod] = useState();

  const refundHandler = () => {
    if (
      !data ||
      !data?.order ||
      !data?.order?.mode_of_payment ||
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
          closeModal={(val) => {
            setIsPhoneVisible(false), console.log(val);
          }}
        />
      </ReactNativeModal>

      <ReactNativeModal isVisible={isEmailVisible}>
        <EmailReceipt
          closeModal={(val) => {
            setIsEmailVisible(false), console.log(val);
          }}
        />
      </ReactNativeModal>
    </View>
  );
};

export default PaymentSelection;
