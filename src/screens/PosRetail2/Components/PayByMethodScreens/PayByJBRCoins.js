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
import { Spacer } from '@/components';
import { Fonts, QR, crossButton } from '@/assets';
import moment from 'moment';
import { styles } from '../../PosRetail2.styles';
import { COLORS, SH } from '@/theme';
import { getRetail } from '@/selectors/RetailSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { walletGetByPhone, requestCheckSuccess, requestMoneySuccess } from '@/actions/RetailAction';

moment.suppressDeprecationWarnings = true;

export const PayByJBRCoins = ({
  crossHandler,
  totalPayment,
  sendRequestFun,
  setWalletIdInp,
  walletIdInp,
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
  const getCartAmount = getRetailData?.getAllCart?.amount;
  const requestStatus = getRetailData?.requestCheck;
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

  // const createOrderHandler = () => {
  //   const data = {
  //     cartid: getRetailData?.getAllCart?.id,
  //     userId: customer?.user_id,
  //     tips: totalPayment,
  //     modeOfPayment: 'jbr',
  //   };
  //   const callback = (response) => {
  //     if (response) {
  //       onPressContinue(saveCartData, data);
  //     }
  //   };
  //   dispatch(createOrder(data, callback));
  //   dispatch(clearCheck());
  // };

  const walletIdInpFun = (walletIdInp) => {
    if (walletIdInp?.length > 9) {
      dispatch(walletGetByPhone(walletIdInp));
      Keyboard.dismiss();
    }
  };

  // useEffect(() => {
  //   let interval;
  //   if (requestStatus !== 'approved') {
  //     interval = setInterval(() => {
  //       const data = {
  //         requestId: requestId,
  //       };
  //       dispatch(requestCheck(data));
  //     }, 10000);
  //   } else {
  //     clearInterval(interval);
  //   }
  //   return () => clearInterval(interval);
  // }, [abc]);

  useEffect(() => {
    if (requestStatus === 'approved') {
      setCheckStatus(true);
      setAbc(false);
      setRequest(false);
    }
  }, [requestStatus]);

  // const sendRequestFun = async () => {
  //   const data = {
  //     amount: finalSendAmount,
  //     wallletAdd: walletUser?.wallet_address,
  //   };
  //   const res = await dispatch(requestMoney(data));
  //   if (res?.type === 'REQUEST_MONEY_SUCCESS') {
  //     setWalletIdInp('');
  //     setRequestId(res?.payload?._id);
  //     const data = {
  //       requestId: res?.payload?._id,
  //     };
  //     const response = await dispatch(requestCheck(data));
  //     if (response?.type === 'REQUEST_CHECK_SUCCESS') {
  //       setAbc(true);
  //       setRequest(true);
  //     }
  //   }
  // };

  return (
    <View style={styles.scanPopUpCon}>
      <View style={styles.scanPopHeader}>
        <TouchableOpacity style={styles.crossBg} onPress={crossHandler}>
          <Image source={crossButton} style={styles.crossButton} />
        </TouchableOpacity>
      </View>
      <View style={[styles._centerContainer, { justifyContent: 'flex-start' }]}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Spacer space={SH(10)} />
          <Text
            style={[
              styles._totalAmountTitle,
              { fontFamily: Fonts.SemiBold, color: COLORS.dark_grey },
            ]}
          >
            {'Scan to Pay'}
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles._amount}>JBR {(totalPayment * 100).toFixed(0)}</Text>
            <Text style={styles._usdText}>USD ${totalPayment}</Text>
          </View>
        </View>
        <View style={{ width: '60%' }}>
          <View style={{ margin: ms(5), alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
              <Image source={{ uri: getWalletQr }} style={{ height: ms(110), width: ms(110) }} />
            </View>

            <View style={[styles._inputMain, { width: ms(310) }]}>
              <View style={styles._orContainer}>
                <View style={styles._borderView} />
                <Text style={styles._orText}>Or</Text>
                <View style={styles._borderView} />
              </View>

              <View>
                <Text style={styles._sendPaymentText}>Send payment request to your wallet</Text>
                <View style={styles._inputSubView}>
                  <TextInput
                    placeholder="803-238-2630"
                    keyboardType="number-pad"
                    style={styles._inputCashContainer}
                    value={walletIdInp}
                    onChangeText={setWalletIdInp}
                    placeholderTextColor={COLORS.solid_grey}
                    maxLength={10}
                  />
                  <TouchableOpacity
                    // onPress={onPressContinue}
                    // disabled={walletUser?.step >= 2 && walletIdInp?.length > 9 ? false : true}
                    style={[
                      styles._sendRequest,
                      // {
                      //   opacity: walletUser?.step >= 2 && walletIdInp?.length > 9 ? 1 : 0.7,
                      // },
                    ]}
                    onPress={() => sendRequestFun(walletIdInp)}
                  >
                    <Text style={[styles._tipText, { color: COLORS.solid_green }]}>
                      Send Request
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
