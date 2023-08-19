import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';

import { backArrow2 } from '@/assets';
import { strings } from '@/localization';

import styles from '../styles';
import { useDispatch } from 'react-redux';
import { getOrderCount, getReviewDefault } from '@/actions/DeliveryAction';

const Header = ({ viewAllOrder, setViewAllOrder, setIsBack, openShippingOrders, sellerId }) => {
  const dispatch = useDispatch();
  return (
    <>
      {viewAllOrder ? (
        <TouchableOpacity
          onPress={() => {
            setViewAllOrder(false);
            setIsBack(true);
            dispatch(getReviewDefault(openShippingOrders, sellerId, 1));
            dispatch(getOrderCount(sellerId));
          }}
          style={styles.backView}
        >
          <Image source={backArrow2} style={styles.backImageStyle} />
          <Text style={[styles.currentStatusText, { paddingLeft: 0 }]}>
            {strings.deliveryOrders.back}
          </Text>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default Header;
