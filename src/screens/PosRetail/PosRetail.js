import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { useTheme } from '@react-navigation/native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { ShadowStyles } from '@/theme';
import { strings } from '@/localization';
import { login, TYPES } from '@/actions/UserActions';
import { Button, ErrorView, ScreenWrapper, TextField } from '@/components';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import { crossBg } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import {
  CartAmountPayBy,
  CartAmountTips,
  CartScreen,
  CustomHeader,
  MainScreen,
  PayByCard,
  PayByCash,
  PayByJBRCoins,
} from './Components';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

export function PosRetail() {
  const [selectedScreen, setselectedScreen] = useState('MainScreen');

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
      <PayByCard onPressBack={() => setselectedScreen('CartAmountPayBy')} />
    ),
    ['PayByCash']: (
      <PayByCash onPressBack={() => setselectedScreen('CartAmountPayBy')} />
    ),
    ['PayByJBRCoins']: (
      <PayByJBRCoins onPressBack={() => setselectedScreen('CartAmountPayBy')} />
    ),
  };

  const screenChangeView = () => {
    return renderScreen[selectedScreen];
  };

  return <ScreenWrapper>{screenChangeView()}</ScreenWrapper>;
}
