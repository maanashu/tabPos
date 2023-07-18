import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { styles } from '../PosRetail2.styles';
import { Button } from '@/components';
import BackButton from '../../../components/BackButton';
import {
  Fonts,
  cardPayment,
  crossButton,
  moneyIcon,
  qrCodeIcon,
} from '@/assets';
import moment from 'moment';
import { COLORS } from '@/theme';
import { useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { CustomHeader } from './CustomHeader';

moment.suppressDeprecationWarnings = true;

const DATA = [
  { title: 'Card', icon: cardPayment },
  { title: 'JBR Coin', icon: qrCodeIcon },
  { title: 'Cash', icon: moneyIcon },
];

export const CartAmountPayBy = ({
  onPressBack,
  onPressPaymentMethod,
  tipAmount = 0.0,
}) => {
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    return totalPayment.toFixed(2);
  };

  const totalAmountByPaymentMethod = index => {
    if (index === 0) {
      return `$${totalPayAmount()}`;
    } else if (index === 1) {
      return `JBR ${Math.round(totalPayAmount()) * 100}`;
    } else {
      return `$${totalPayAmount()}`;
    }
  };

  return (
    <SafeAreaView style={styles._innerContainer}>
      {/* <View style={styles._topContainer}>
        <Text style={styles._date}>{moment().format('ddd DD MMM, YYYY')}</Text>
        <View style={styles._border} />
        <Text style={styles._date}>{moment().format('hh:mm A')}</Text>
        <View style={styles._border} />
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          Walk-In
        </Text>
        <View style={styles._border} />
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          Invoice No. # 3467589
        </Text>
        <Text style={[styles._date, { marginHorizontal: ms(25) }]}>
          POS No. #Front-CC01
        </Text>

        <TouchableOpacity style={styles._cross}>
          <Image
            source={crossButton}
            style={{ resizeMode: 'contain', height: ms(12), width: ms(12) }}
          />
        </TouchableOpacity>
      </View> */}
      <CustomHeader iconShow={true} crossHandler={onPressBack} />
      <View style={styles._centerContainer}>
        <BackButton title={'Back'} onPress={onPressBack} />
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles._totalAmountTitle}>Total Payable Amount:</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles._dollarSymbol}>$</Text>
            <Text style={styles._amount}>{totalPayAmount()}</Text>
          </View>
        </View>
        <View
          style={{
            marginTop: ms(30),
            flexDirection: 'row',
          }}
        >
          {DATA.map((item, index) => (
            <TouchableOpacity
              onPress={() =>
                onPressPaymentMethod({ method: item.title, index: index })
              }
              key={index}
              style={styles._payBYBoxContainer}
            >
              <Text style={styles._payByTitle}>Pay By</Text>
              <Text style={styles._payByMethod}>{item.title}</Text>
              <Text style={styles._payByAmount}>
                {totalAmountByPaymentMethod(index)}
              </Text>
              <Image source={item.icon} style={styles._payByIcon} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};
