import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import {
  getAllCart,
  getCategory,
  getProductDefault,
} from '@/actions/RetailAction';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '@/theme';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';

export function PosRetail() {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const defaultArrayproduct = getRetailData?.getProductDefault;
  const categoryArray = getRetailData?.categoryList;
  const [selectedScreen, setselectedScreen] = useState('MainScreen');
  const [paymentMethod, setpaymentMethod] = useState('Cash');

  const isFocus = useIsFocused();

  useEffect(() => {
    dispatch(getProductDefault(sellerID));
    dispatch(getCategory(sellerID));
    dispatch(getAllCart());
  }, [isFocus]);

  const isLoading = useSelector(state =>
    isLoadingSelector(
      [
        TYPES.GET_ONE_PRODUCT,
        TYPES.ADDCART,
        TYPES.GET_CLEAR_ALL_CART,
        TYPES.GET_ALL_CART,
      ],
      state
    )
  );

  const renderScreen = {
    ['MainScreen']: (
      <MainScreen
        headercrossHandler={() => alert('abc')}
        checkOutHandler={() => setselectedScreen('CartScreen')}
        productArray={defaultArrayproduct}
        categoryArray={categoryArray}
        sellerID={sellerID}
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
      {isLoading ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator
            color={COLORS.primary}
            size="large"
            style={styles.loader}
          />
        </View>
      ) : null}
    </ScreenWrapper>
  );
}
