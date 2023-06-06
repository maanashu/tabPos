import {
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ms } from 'react-native-size-matters';
import { Button } from '@/components';
import { Fonts, QR, cardPayment, crossButton } from '@/assets';
import moment from 'moment';
import BackButton from '@/components/BackButton';
import { styles } from '../../PosRetail.styles';
import { COLORS } from '@/theme';
import { getRetail } from '@/selectors/RetailSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import {
  getWalletId,
  requestMoney,
  walletGetByPhone,
} from '@/actions/RetailAction';

export const PayByJBRCoins = ({ onPressBack, onPressContinue, tipAmount }) => {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getRetailData = useSelector(getRetail);
  const getWalletQr = getRetailData?.getWallet?.qr_code;
  const cartData = getRetailData?.getAllCart;
  const walletUser = getRetailData?.walletGetByPhone?.[0];
  const getCartAmount = getRetailData?.getAllCart?.amount;
  // console.log('walletUser', walletUser);

  const [walletIdInp, setWalletIdInp] = useState();

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    return totalPayment.toFixed();
  };

  useEffect(() => {
    dispatch(getWalletId(sellerID));
  }, []);

  const walletIdInpFun = walletIdInp => {
    if (walletIdInp?.length > 9) {
      dispatch(walletGetByPhone(walletIdInp));
      Keyboard.dismiss();
    }
  };
  const sendRequestFun = () => {
    const data = {
      amount: getCartAmount?.total_amount,
      wallletAdd: walletUser?.wallet_address,
    };
    console.log('-----------', data);

    dispatch(requestMoney(data));
    setWalletIdInp('');
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
              <Image
                source={{ uri: getWalletQr }}
                style={{ height: ms(110), width: ms(110) }}
              />
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
                  onChangeText={walletIdInp => (
                    setWalletIdInp(walletIdInp), walletIdInpFun(walletIdInp)
                  )}
                  value={walletIdInp}
                />
                <TouchableOpacity
                  // onPress={onPressContinue}
                  disabled={
                    walletUser?.step >= 2 && walletIdInp?.length > 9
                      ? false
                      : true
                  }
                  style={[
                    styles._sendRequest,
                    {
                      opacity:
                        walletUser?.step >= 2 && walletIdInp?.length > 9
                          ? 1
                          : 0.7,
                    },
                  ]}
                  onPress={() => sendRequestFun()}
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
