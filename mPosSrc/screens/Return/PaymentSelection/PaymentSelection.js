import { ScreenWrapper } from '@/components';
import { Images } from '@mPOS/assets';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import styles from './styles';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';

export function PaymentSelection({ closeSheet }) {
  return (
    <ScreenWrapper>
      <TouchableOpacity onPress={closeSheet} style={styles.crossIconViewStyle}>
        <Image source={Images.cross} style={styles.crossButtonStyle} />
      </TouchableOpacity>

      <View style={styles.amountMainViewStyle}>
        <Text style={styles.totalAmountLabelStyle}>{strings.returnOrder.totalReturnAmount}</Text>
        <Text style={styles.amountTextStyle}>{'$34.05'}</Text>
      </View>

      <View style={styles.selectPaymentMethodViewStyle}>
        <Text style={styles.selectPaymentTextStyle}>{strings.returnOrder.selectPayment}</Text>

        <View style={styles.paymentMethodViewStyle}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Images.cash} style={styles.cashIconStyle} />
            <Text style={styles.paymentMethodTextStyle}>{strings.returnOrder.cash}</Text>
          </View>

          <View>
            <Text style={styles.paymentTextStyle}>{'$34.05'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.selectPaymentMethodViewStyle}>
        <Text style={styles.selectPaymentTextStyle}>{strings.returnOrder.eReceipt}</Text>

        <View style={styles.receiptViewStyle}>
          <TouchableOpacity style={styles.smsViewStyle}>
            <Text style={styles.ereceiptTextStyle}>{strings.returnOrder.sms}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smsViewStyle}>
            <Text style={styles.ereceiptTextStyle}>{strings.returnOrder.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.smsViewStyle}>
            <Text style={styles.ereceiptTextStyle}>{strings.returnOrder.noReceipe}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButtonStyle}>
        <Text style={styles.confirmReturnTextStyle}>{strings.returnOrder.confirmReturn}</Text>
        <Image source={Images.buttonArrow} style={styles.buttonArrowStyle} />
      </TouchableOpacity>
    </ScreenWrapper>
  );
}
