import { Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { cardPayment } from '@/assets';
import moment from 'moment';
import BackButton from '@/components/BackButton';
import { styles } from '../../PosRetail3.styles';
import { getRetail } from '@/selectors/RetailSelectors';
import { useSelector } from 'react-redux';

moment.suppressDeprecationWarnings = true;

export const PayByCard = ({ onPressBack, onPressContinue, tipAmount = 0.0 }) => {
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    return totalPayment.toFixed(2);
  };

  return (
    <SafeAreaView style={styles._innerContainer}>
      <View
        style={[
          styles._topContainer,
          {
            justifyContent: 'center',
            marginLeft: ms(12),
          },
        ]}
      >
        <BackButton
          onPress={onPressBack}
          title={'Back'}
          style={{ top: ms(5), left: ms(0), backgroundColor: 'transparent' }}
        />
      </View>
      <View style={[styles._centerContainer, { marginTop: ms(30) }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles._totalAmountTitle}>Total Payable Amount:</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles._dollarSymbol}>$</Text>
            <Text style={styles._amount}>{totalPayAmount()}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPressContinue} style={styles._bottomCardView}>
          <Image source={cardPayment} style={styles._cardIconView} />
          <Text style={styles._cardSubtitle}>Insert or Tap your card here</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
