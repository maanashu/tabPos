import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';

import { backArrow2 } from '@/assets';
import { strings } from '@/localization';

import styles from '../styles';

const Header = ({ viewAllOrders, setViewAllOrders,setIsBack }) => {
  return (
    <>
      {viewAllOrders ? (
        <TouchableOpacity onPress={() => {
          setViewAllOrders(false),setIsBack(true)}} style={styles.backView}>
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
