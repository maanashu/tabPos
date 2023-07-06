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
import { Button, Spacer } from '@/components';
import {
  Fonts,
  QR,
  cardPayment,
  checkArrow,
  crossButton,
  PaymentDone,
} from '@/assets';
import moment from 'moment';
import BackButton from '@/components/BackButton';
import { styles } from '../../PosRetail.styles';
import { COLORS, SF, SH } from '@/theme';
import { getRetail } from '@/selectors/RetailSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import {
  getWalletId,
  requestCheck,
  requestMoney,
  walletGetByPhone,
  requestCheckSuccess,
  createOrder,
  requestMoneySuccess,
  clearCheck,
} from '@/actions/RetailAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const PayByJBRCoins = ({
  onPressBack,
  onPressContinue,
  tipAmount,
  screen,
}) => {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getRetailData = useSelector(getRetail);
  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];
  const customer = getuserDetailByNo?.[0];
  const getWalletQr = getRetailData?.getWallet?.qr_code;
  const cartData = getRetailData?.getAllCart;
  const walletUser = getRetailData?.walletGetByPhone?.[0];
  console.log(
    'getRetailData?.walletGetByPhone?.[0]',
    getRetailData?.walletGetByPhone?.[0]
  );
  const getCartAmount = getRetailData?.getAllCart?.amount;
  const requestStatus = getRetailData?.requestCheck;
  console.log('requestStatus', requestStatus);
  const [checkStatus, setCheckStatus] = useState(false);
  const [requestId, setRequestId] = useState();
  const sendAmount = getCartAmount?.total_amount;
  const finalSendAmount = Math.floor(sendAmount * 100);
  const saveCartData = { ...getRetailData };
  const [request, setRequest] = useState(false);
  const [abc, setAbc] = useState(false);

  const backFalse = () => {
    setAbc(false);
    setRequest(false);
    setCheckStatus(false);
    dispatch(requestCheckSuccess());
    dispatch(requestMoneySuccess());
  };

  const requestCheckData = getRetailData;
  const [walletIdInp, setWalletIdInp] = useState();

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    // const hundred = totalPayment * 100;
    return totalPayment.toFixed();
  };
  const createOrderHandler = () => {
    const data = {
      cartid: getRetailData?.getAllCart?.id,
      userId: customer?.user_id,
      tips: totalPayAmount() * 100,
      modeOfPayment: 'jbr',
    };
    const callback = response => {
      if (response) {
        onPressContinue(saveCartData, data);
      }
    };
    dispatch(createOrder(data, callback));
    dispatch(clearCheck());
  };

  useEffect(() => {
    dispatch(getWalletId(sellerID));
    dispatch(requestCheckSuccess());
    backFalse();
  }, []);

  const walletIdInpFun = walletIdInp => {
    if (walletIdInp?.length > 9) {
      dispatch(walletGetByPhone(walletIdInp));
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    let interval;
    if (requestStatus !== 'approved') {
      interval = setInterval(() => {
        const data = {
          requestId: requestId,
        };
        dispatch(requestCheck(data));
      }, 10000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [abc]);

  useEffect(() => {
    if (requestStatus === 'approved') {
      setCheckStatus(true);
      setAbc(false);
      setRequest(false);
    }
  }, [requestStatus]);

  const sendRequestFun = async () => {
    const data = {
      amount: finalSendAmount,
      wallletAdd: walletUser?.wallet_address,
    };

    console.log('data', data?.wallletAdd);
    const res = await dispatch(requestMoney(data));
    console.log('--------------', res);
    if (res?.type === 'REQUEST_MONEY_SUCCESS') {
      setWalletIdInp('');
      setRequestId(res?.payload?._id);
      const data = {
        requestId: res?.payload?._id,
      };
      const response = await dispatch(requestCheck(data));
      if (response?.type === 'REQUEST_CHECK_SUCCESS') {
        setAbc(true);
        setRequest(true);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
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
            onPress={() => {
              onPressBack();
              backFalse();
            }}
            title={'Back'}
            style={{ top: ms(5), left: ms(0), backgroundColor: 'transparent' }}
          />
        </View>
        <View style={[styles._centerContainer, { marginTop: ms(30) }]}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={[
                styles._totalAmountTitle,
                { fontFamily: Fonts.SemiBold, color: COLORS.dark_grey },
              ]}
            >
              {checkStatus ? 'Payment Done' : 'Scan to Pay'}
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
                  source={checkStatus ? PaymentDone : { uri: getWalletQr }}
                  style={{ height: ms(110), width: ms(110) }}
                />
              </View>

              <View style={styles._inputMain}>
                <View style={styles._orContainer}>
                  <View style={styles._borderView} />
                  <Text style={styles._orText}>Or</Text>
                  <View style={styles._borderView} />
                </View>
                {request === true ? (
                  <View>
                    <Text
                      style={[
                        styles._totalAmountTitle,
                        {
                          fontFamily: Fonts.SemiBold,
                          color: COLORS.dark_grey,
                          fontSize: SF(15),
                          alignSelf: 'center',
                        },
                      ]}
                    >
                      Payment in progress
                    </Text>
                    <Spacer space={SH(20)} />
                    <TouchableOpacity
                      style={styles.checkoutButtonSideBar}
                      onPress={() => {
                        setRequest(false);
                        setAbc(false);
                      }}
                    >
                      <Text style={styles.checkoutText}>Resend Request</Text>
                    </TouchableOpacity>
                  </View>
                ) : request === false && checkStatus === true ? (
                  <View>
                    <Text
                      style={[
                        styles._totalAmountTitle,
                        {
                          fontFamily: Fonts.SemiBold,
                          color: COLORS.dark_grey,
                          fontSize: SF(15),
                          alignSelf: 'center',
                        },
                      ]}
                    >
                      Payment Done please create order
                    </Text>
                    <Spacer space={SH(20)} />
                    <TouchableOpacity
                      style={styles.checkoutButtonSideBar}
                      onPress={() => createOrderHandler()}
                    >
                      <Text style={styles.checkoutText}>Create order</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <Text style={styles._sendPaymentText}>
                      Send payment request to your wallet
                    </Text>
                    <View style={styles._inputSubView}>
                      <TextInput
                        placeholder="Enter wallet address"
                        keyboardType="number-pad"
                        style={styles._inputCashContainer}
                        onChangeText={walletIdInp => (
                          setWalletIdInp(walletIdInp),
                          walletIdInpFun(walletIdInp)
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
                          style={[
                            styles._tipText,
                            { color: COLORS.solid_green },
                          ]}
                        >
                          Send Request
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};
