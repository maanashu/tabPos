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
import { Button } from '@/components';
import { Fonts, QR, cardPayment, crossButton } from '@/assets';
import moment from 'moment';
import BackButton from '@/components/BackButton';
import { styles } from '../../PosRetail.styles';
import { COLORS } from '@/theme';
import { getRetail } from '@/selectors/RetailSelectors';
import { useSelector } from 'react-redux';

export const PayByJBRCoins = ({ onPressBack, onPressContinue, tipAmount }) => {
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    return totalPayment;
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
      <View style={styles._centerContainer}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={[
              styles._totalAmountTitle,
              { fontFamily: Fonts.SemiBold, color: COLORS.dark_grey },
            ]}
          >
            Scan to Pay
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles._amount}>JBR {totalPayAmount() * 100}</Text>
            <Text style={styles._usdText}>USD ${totalPayAmount()}</Text>
          </View>
        </View>
        <View style={{ width: '60%' }}>
          <View style={{ margin: ms(10), alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', marginTop: ms(10) }}>
              <Image source={QR} style={{ height: ms(100), width: ms(100) }} />
            </View>

            <View style={styles._inputMain}>
              <View style={styles._orContainer}>
                <View style={styles._borderView} />
                <Text style={styles._orText}>Or</Text>
                <View style={styles._borderView} />
              </View>
              <Text style={styles._sendPaymentText}>
                Send payment request to your wallet
              </Text>
              <View style={styles._inputSubView}>
                <TextInput
                  placeholder="Enter wallet address"
                  keyboardType="number-pad"
                  style={styles._inputContainer}
                />
                <TouchableOpacity
                  onPress={onPressContinue}
                  style={styles._sendRequest}
                >
                  <Text
                    style={[styles._tipText, { color: COLORS.solid_green }]}
                  >
                    Send Request
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
