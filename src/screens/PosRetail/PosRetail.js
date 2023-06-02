import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScreenWrapper } from '@/components';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import {
  CartAmountPayBy,
  CartAmountTips,
  CartScreen,
  CustomHeader,
  FinalPaymentScreen,
  MainScreen,
  PayByCard,
  PayByCash,
  PayByJBRCoins,
} from './Components';

export function PosRetail() {
  const [selectedScreen, setselectedScreen] = useState('FinalPaymentScreen');
  const [paymentMethod, setpaymentMethod] = useState('Cash');

  const renderScreen = {
    ['MainScreen']: (
      <MainScreen
        headercrossHandler={() => alert('abc')}
        checkOutHandler={() => setselectedScreen('CartScreen')}
      />
    ),
    ['CartScreen']: (
      <CartScreen
        crossHandler={() => setselectedScreen('MainScreen')}
        onPressPayNow={() => setselectedScreen('CartAmountTips')}
      />
    ),
    ['CartAmountTips']: (
      <CartAmountTips
        onPressBack={() => setselectedScreen('CartScreen')}
        onPressContinue={() => setselectedScreen('CartAmountPayBy')}
      />
    ),
    ['CartAmountPayBy']: (
      <CartAmountPayBy
        onPressBack={() => setselectedScreen('CartAmountTips')}
        onPressPaymentMethod={item => {
          if (item.index === 0) {
            setselectedScreen('PayByCard');
          } else if (item.index === 1) {
            setselectedScreen('PayByJBRCoins');
          } else if (item.index === 2) {
            setselectedScreen('PayByCash');
          }
        }}
      />
    ),
    ['PayByCard']: (
      <PayByCard
        onPressBack={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        onPressContinue={() => {
          setpaymentMethod('Card');
          setselectedScreen('FinalPaymentScreen');
        }}
      />
    ),
    ['PayByCash']: (
      <PayByCash
        onPressBack={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        onPressContinue={() => {
          setpaymentMethod('Cash');
          setselectedScreen('FinalPaymentScreen');
        }}
      />
    ),
    ['PayByJBRCoins']: (
      <PayByJBRCoins
        onPressBack={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        onPressContinue={() => {
          setpaymentMethod('JBRCoins');
          setselectedScreen('FinalPaymentScreen');
        }}
      />
    ),
    ['FinalPaymentScreen']: (
      <FinalPaymentScreen
        onPressBack={() => setselectedScreen('CartAmountPayBy')}
        paymentMethod={paymentMethod}
      />
    ),
  };

  const screenChangeView = () => {
    return renderScreen[selectedScreen];
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{screenChangeView()}</View>
    </ScreenWrapper>
  );
}
