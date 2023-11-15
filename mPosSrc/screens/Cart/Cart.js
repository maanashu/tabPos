import React from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './styles';
import { ProductCart } from './Components/ProductCart';
import { ScreenWrapper } from '@mPOS/components';
import { ServiceCart } from './Components/ServiceCart';
import { useState } from 'react';
import { cartRun } from '@/actions/RetailAction';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';

export function Cart() {
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState();
  const retailData = useSelector(getRetail);
  const presentCart = retailData?.cartFrom;
  return (
    <ScreenWrapper style={styles.container}>
      {showCart ? (
        <ServiceCart
          cartChangeHandler={() => {
            setShowCart(false);
            dispatch(cartRun('product'));
          }}
        />
      ) : (
        <ProductCart
          cartChangeHandler={() => {
            setShowCart(true);
            dispatch(cartRun('service'));
          }}
        />
      )}
    </ScreenWrapper>
  );
}
