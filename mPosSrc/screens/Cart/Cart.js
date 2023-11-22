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
import { useEffect } from 'react';

export function Cart() {
  const dispatch = useDispatch();

  const retailData = useSelector(getRetail);
  const presentCart = retailData?.cartFrom;
  const [showCart, setShowCart] = useState(presentCart === 'service' ? true : false);
  console.log(showCart, presentCart);
  useEffect(() => {
    setShowCart(presentCart === 'service' ? true : false);
  }, []);

  return (
    <ScreenWrapper style={styles.container}>
      {presentCart === 'service' ? (
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
