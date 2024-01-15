import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import { Images } from '@mPOS/assets';
import { FullScreenLoader } from '@mPOS/components';
import { COLORS, Fonts } from '@/theme';
import { ms } from 'react-native-size-matters';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { digitWithDot, digits } from '@/utils/validators';
import { CustomErrorToast } from '@mPOS/components/Toast';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';
import {
  createOrder,
  getAllCart,
  paymentRequestCancel,
  qrcodestatus,
  qrCodeStatusSuccess,
  requestCheck,
  requestCheckSuccess,
  requestMoney,
  walletGetByPhone,
} from '@/actions/RetailAction';
import { strings } from '@mPOS/localization';
import CountryPicker from 'react-native-country-picker-modal';
import { dropdown } from '@/assets';
import { useIsFocused } from '@react-navigation/native';
import { memo } from 'react';
import { amountFormat } from '@/utils/GlobalMethods';

const JbrCoin = ({ jbrCoinRef, jbrCoinCrossHandler, payByJbrHandler }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const qrcodeData = useSelector(getRetail).qrKey;
  const walletUser = retailData?.walletGetByPhone?.[0];
  const cartData = retailData?.getAllCart;
  const productDetail = retailData?.getOneProduct;
  const [flag, setFlag] = useState('US');
  const [walletCountryCode, setWalletCountryCode] = useState('+1');
  const [walletIdInp, setWalletIdInp] = useState();
  const [spacing, setSpacing] = useState(false);
  const [sendRequest, setsendRequest] = useState(false);
  const [requestId, setRequestId] = useState();
  const [duration, setDuration] = useState(120);
  const requestStatus = retailData?.requestCheck;
  const qrStatus = retailData.qrStatuskey;
  const saveCartData = cartData;

  const snapPoints = useMemo(() => ['82%'], []);

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount || '0.00';
    const totalPayment =
      parseFloat(cartAmount) +
      parseFloat(cartData?.amount?.tip === '' ? '0.0' : cartData?.amount?.tip);

    return totalPayment.toFixed(2);
  };

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  useEffect(() => {
    dispatch(requestCheckSuccess(''));
    dispatch(qrCodeStatusSuccess(''));
  }, []);

  useEffect(() => {
    let timer;

    if (sendRequest && duration > 0) {
      timer = setInterval(() => setDuration(duration - 1), 1000);
    } else if (duration == 0) {
      setsendRequest(false);
      setDuration(120);
    }
    return () => clearInterval(timer);
  }, [sendRequest, duration]);

  // useEffect(() => {
  //   dispatch(getAllCart());
  //   alert('ghjklghjkl');
  // }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setSpacing(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setSpacing(false);
    });
  }, []);

  const isLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ALL_CART, TYPES.GET_WALLET_PHONE, TYPES.CREATE_ORDER], state)
  );

  const walletInputFun = (phoneNumber) => {
    setWalletIdInp(phoneNumber);
    if (phoneNumber?.length > 9) {
      if (phoneNumber && digits.test(phoneNumber) === false) {
        CustomErrorToast({ message: strings.cart.validPhone });
        return;
      } else {
        const data = walletCountryCode + phoneNumber;
        dispatch(walletGetByPhone(data));
        Keyboard.dismiss();
      }
    }
  };

  const sendRequestFun = async () => {
    setsendRequest(true);
    const data = {
      // amount: (totalPayAmount() * 100).toFixed(0),
      amount: (cartData?.amount?.total_amount * 100).toFixed(0),
      wallletAdd: walletUser?.wallet_address,
    };

    const res = await dispatch(requestMoney(data)).then((res) => {
      setRequestId(res?.payload?._id);
      const data = {
        requestId: res?.payload?._id,
      };
      dispatch(requestCheck(data));
    });
  };

  useEffect(() => {
    let interval;

    if (requestStatus !== 'success' && sendRequest) {
      interval = setInterval(() => {
        setRequestId((requestId) => {
          const data = {
            requestId: requestId,
          };
          dispatch(requestCheck(data));
          return requestId;
        });
      }, 10000);
    } else if (requestStatus == 'success' && sendRequest) {
      createOrderHandler();
      clearInterval(interval);
    } else if (retailData?.qrStatuskey?.status !== 'success' && sendRequest == false) {
      interval = setInterval(() => {
        dispatch(qrcodestatus(cartData.id));
      }, 5000);
    } else if (retailData?.qrStatuskey?.status == 'success' && sendRequest == false) {
      createOrderHandler();
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [
    isFocused,
    requestStatus == 'success',
    retailData?.qrStatuskey?.status == 'success',
    sendRequest,
  ]);

  const createOrderHandler = () => {
    const data = {
      cartid: cartData.id,
      // tips: (totalPayAmount() * 100).toFixed(0),
      tips: (cartData?.amount?.total_amount * 100).toFixed(0),
      modeOfPayment: 'jbr',
    };
    const callback = (response) => {
      if (response) {
        payByJbrHandler(saveCartData, data);
        // jbrCoinCrossHandler();
      }
    };
    dispatch(createOrder(data, callback));
    dispatch(requestCheckSuccess(''));
    setsendRequest(false);
  };

  useEffect(() => {
    if (requestStatus == 'approved') {
      createOrderHandler();
    }
  }, [requestStatus]);

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {
        sendRequest && dispatch(paymentRequestCancel(requestId));
        // setWalletIdInp('');
        dispatch(requestCheckSuccess(''));
        dispatch(qrCodeStatusSuccess(''));
        setWalletIdInp('');
        setsendRequest(false);
        //  && alert('Payment Request cancel');
        setDuration(120);
      }}
      backdropOpacity={0.5}
      ref={jbrCoinRef}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      // stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <BottomSheetScrollView>
        <View
          style={{ flex: 1, paddingHorizontal: ms(10), paddingBottom: spacing ? ms(320) : ms(20) }}
        >
          <View style={styles.productHeaderCon}>
            <TouchableOpacity
              onPress={() => {
                sendRequest && dispatch(paymentRequestCancel(requestId));
                jbrCoinCrossHandler();
                dispatch(requestCheckSuccess(''));
                dispatch(qrCodeStatusSuccess(''));
                setWalletIdInp('');
                setsendRequest(false);
                // sendRequest && alert('Payment request cancel');
                setDuration(120);
              }}
            >
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.scanToPay}>{strings.cart.scanToPay}</Text>
            <Text style={styles.jbrAmount}>
              JBR{amountFormat(cartData?.amount?.total_amount * 100, 'notSign')}
            </Text>
            <Text style={styles.scanToPay}>{amountFormat(cartData?.amount?.total_amount)} USD</Text>
            <Image
              blurRadius={sendRequest ? 2.5 : 0}
              source={{ uri: qrcodeData?.qr_code }}
              style={styles.barcode}
            />

            <View style={styles.moneyfasterCon}>
              <Text style={styles.moneyfaster}>{strings.cart.moneyfaster}</Text>
            </View>
            <View style={styles.sepratorView}>
              <View style={styles.lineSeprator} />
              <Text style={styles.sepratorText}>{'Or'}</Text>
              <View style={styles.lineSeprator} />
            </View>
            <Text style={styles.moneyfaster}>{strings.cart.requestYourWallet}</Text>
            <View style={styles.inputCon}>
              <View style={styles.inputCountryCode}>
                <CountryPicker
                  onSelect={(code) => {
                    setFlag(code.cca2);
                    setWalletIdInp('');
                    if (code.callingCode?.length > 0) {
                      setWalletCountryCode('+' + code.callingCode.flat());
                    } else {
                      setWalletCountryCode('');
                      setWalletIdInp('');
                    }
                  }}
                  countryCode={flag}
                  withFilter
                  withCallingCode
                />

                <Image source={dropdown} style={styles.dropDownIcon} />

                <Text style={styles.countryCodeText}>{walletCountryCode}</Text>

                <TextInput
                  maxLength={15}
                  returnKeyType={'done'}
                  keyboardType={'number-pad'}
                  value={walletIdInp?.trim()}
                  onChangeText={(walletIdInp) => walletInputFun(walletIdInp)}
                  style={styles.textInputContainer}
                  placeholder={strings.phoneNumber.numberText}
                  placeholderTextColor={COLORS.silver_solid}
                />
              </View>
              <TouchableOpacity
                onPress={() => sendRequestFun(walletIdInp)}
                style={[
                  styles.sendRequest,
                  {
                    opacity:
                      walletUser?.step >= 2 && walletIdInp?.length > 9 && !sendRequest ? 1 : 0.7,
                  },
                ]}
                disabled={
                  walletUser?.step >= 2 && walletIdInp?.length > 9 && !sendRequest ? false : true
                }
              >
                <Text style={styles.sendRequestText}>{strings.cart.sendRequest}</Text>
              </TouchableOpacity>
            </View>
            {sendRequest && (
              <Text
                style={{
                  fontSize: ms(14),
                  textAlign: 'center',
                  fontFamily: Fonts.MaisonBold,
                  color: '#8F8E93',
                }}
              >
                {formatTime(duration)}
              </Text>
            )}
          </View>
        </View>
      </BottomSheetScrollView>
      {isLoad && <FullScreenLoader />}
    </BottomSheetModal>
  );
};

export default memo(JbrCoin);

const styles = StyleSheet.create({
  productHeaderCon: {
    height: ms(60),
    paddingHorizontal: ms(10),
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderRadius: ms(10),
  },
  crossImageStyle: {
    width: ms(26),
    height: ms(26),
    resizeMode: 'contain',
  },
  scanToPay: {
    fontFamily: Fonts.Medium,
    fontSize: ms(16),
    color: COLORS.solid_grey,
    alignSelf: 'center',
  },
  jbrAmount: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(20),
    color: COLORS.primary,
    marginVertical: ms(3),
    alignSelf: 'center',
  },
  barcode: {
    width: ms(200),
    height: ms(200),
    resizeMode: 'contain',
    marginVertical: ms(20),
    alignSelf: 'center',
  },
  moneyfasterCon: {
    backgroundColor: COLORS.textInputBackground,
    height: ms(50),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(5),
  },
  moneyfaster: {
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    color: COLORS.solid_grey,
  },
  sepratorView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ms(30),
  },
  sepratorText: {
    marginHorizontal: ms(10),
    color: COLORS.solid_grey,
    fontSize: ms(14),
    fontFamily: Fonts.SemiBold,
  },
  lineSeprator: {
    height: ms(1),
    backgroundColor: COLORS.solidGrey,
    flex: 1,
  },
  inputCon: {
    borderWidth: 1,
    marginVertical: ms(7),
    borderColor: COLORS.solidGrey,
    borderRadius: ms(5),
    height: ms(55),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: ms(10),
    alignItems: 'center',
  },
  sendRequest: {
    backgroundColor: COLORS.dark_grey,
    borderRadius: ms(5),
    height: ms(40),
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputCountryCode: {
    height: ms(40),
    flex: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownIcon: {
    width: ms(7),
    height: ms(7),
    resizeMode: 'contain',
  },
  textInputContainer: {
    flex: 1,
    fontFamily: Fonts.Italic,
    fontSize: ms(13),
    color: COLORS.solid_grey,
  },
  countryCodeText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    color: COLORS.solid_grey,
    marginHorizontal: ms(5),
  },
  sendRequestText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(10),
    color: COLORS.solid_green,
  },
});
