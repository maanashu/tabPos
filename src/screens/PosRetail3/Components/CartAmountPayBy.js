import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ms, verticalScale } from 'react-native-size-matters';
import { styles } from '../PosRetail3.styles';
import { Button, Spacer } from '@/components';
import BackButton from '../../../components/BackButton';
import CountryPicker from 'react-native-country-picker-modal';
import AddedCartItemsCard from '../../../components/AddedCartItemsCard';
import {
  Fonts,
  cardPayment,
  crossButton,
  moneyIcon,
  qrCodeIcon,
  barcode,
  dropdown,
  keyboard,
} from '@/assets';
import moment from 'moment';
import { COLORS, SF, SH } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { CustomHeader } from './CustomHeader';
import { useState } from 'react';
import PhonePopUp from '../PhonePopUp';
import Modal, { ReactNativeModal } from 'react-native-modal';
import { strings } from '@/localization';
import { CustomKeyboard } from '../CustomKeyBoard';
import { PayByJBRCoins } from './PayByMethodScreens/PayByJBRCoins';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { digits } from '@/utils/validators';
import {
  attachCustomer,
  getQrCodee,
  getTip,
  getWalletId,
  requestCheck,
  requestMoney,
  walletGetByPhone,
  requestCheckSuccess,
  createOrder,
} from '@/actions/RetailAction';
import { useEffect } from 'react';
import { getAuthData } from '@/selectors/AuthSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
moment.suppressDeprecationWarnings = true;

const DATA = [
  { title: 'Cash', icon: moneyIcon },
  { title: 'JBR Coin', icon: qrCodeIcon },
  { title: 'Card', icon: cardPayment },
];

const RECIPE_DATA = [
  { title: 'SMS', icon: cardPayment },
  { title: 'Email', icon: cardPayment },
  { title: 'No e-recipe', icon: cardPayment },
];

export const CartAmountPayBy = ({
  onPressBack,
  onPressPaymentMethod,
  payDetail,
  payNowByphone,
  cartid,
  cartType,
  onPressContinue,
}) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);

  const cartData =
    cartType == 'Product' ? getRetailData?.getAllCart : getRetailData?.getserviceCart;
  const qrcodeData = useSelector(getRetail).qrKey;
  const cartProducts = cartData?.poscart_products;
  const saveCartData = { ...getRetailData };

  const [selectedTipIndex, setSelectedTipIndex] = useState(null);
  const [selectedTipAmount, setSelectedTipAmount] = useState('0.00');

  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [selectedRecipeMethod, setSelectedRecipeMethod] = useState(null);
  const [phonePopVisible, setPhonePopVisible] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [qrPopUp, setQrPopUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const [walletIdInp, setWalletIdInp] = useState();
  const [walletFlag, setWalletFlag] = useState('US');
  const [walletCountryCode, setWalletCountryCode] = useState('+1');
  const walletUser = getRetailData?.walletGetByPhone?.[0];
  const getWalletQr = getRetailData?.getWallet?.qr_code;
  const sellerID = getAuthData?.merchantLoginData?.uniqe_id;
  const [requestId, setRequestId] = useState();
  const requestStatus = getRetailData?.requestCheck;
  const [status, setstatus] = useState('');
  const getTips = getRetailData?.getTips;
  const isFocused = useIsFocused();
  const tipsArr = [
    getTips?.first_tips ?? 18,
    getTips?.second_tips ?? 20,
    getTips?.third_tips ?? 22,
  ];
  const TIPS_DATA = [
    { title: getTips?.first_tips ?? 18, icon: cardPayment, percent: getTips?.first_tips ?? '18' },
    {
      title: getTips?.second_tips ?? 20,
      icon: cardPayment,
      percent: getTips?.second_tips ?? '20',
    },
    { title: getTips?.third_tips ?? 22, icon: cardPayment, percent: getTips?.third_tips ?? '22' },
    { title: '', icon: cardPayment, percent: 'No Tip' },
  ];

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment =
      parseFloat(cartAmount) + parseFloat(selectedTipAmount === '' ? '0.0' : selectedTipAmount);
    return totalPayment.toFixed(2);
  };

  useEffect(() => {
    dispatch(getWalletId(sellerID));
    dispatch(getTip(sellerID));
    dispatch(getQrCodee(cartData?.id));
  }, []);

  // useEffect(() => {
  //   dispatch(requestCheckSuccess(''));
  // }, []);

  const isLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_WALLET_PHONE, TYPES.ATTACH_CUSTOMER], state)
  );
  useEffect(() => {
    let interval;
    if (requestStatus !== 'approved') {
      interval = setInterval(() => {
        setRequestId((requestId) => {
          const data = {
            requestId: requestId,
          };
          // Alert.alert('kojojoj');
          dispatch(requestCheck(data));
          return requestId;
        });
      }, 10000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocused]);
  const walletInputFun = (phoneNumber) => {
    setWalletIdInp(phoneNumber);
    if (phoneNumber?.length > 9) {
      if (phoneNumber && digits.test(phoneNumber) === false) {
        alert(strings.valiadtion.validPhone);
        return;
      } else {
        dispatch(walletGetByPhone(phoneNumber));
        Keyboard.dismiss();
      }
    }
  };

  const sendRequestFun = async () => {
    const data = {
      amount: (totalPayAmount() * 100).toFixed(0),
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

  const jobrSavePercent = (value, percent) => {
    if (percent == '') {
      return '';
    }
    const percentageValue = (percent / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  };
  const totalAmountByPaymentMethod = (index) => {
    if (index === 0) {
      return `$${totalPayAmount()}`;
    } else if (index === 1) {
      return `JBR ${(totalPayAmount() * 100).toFixed(0)}`;
    } else {
      return `$${totalPayAmount()}`;
    }
  };

  function calculatePercentageValue(value, percentage) {
    if (percentage == '') {
      return '';
    }
    const percentageValue = (percentage / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  }
  const onChangePhoneNumber = (phone) => {
    setPhoneNumber(phone);
  };
  const payNowHandler = () => {
    onPressPaymentMethod({
      method: 'PayBy' + selectedPaymentMethod,
      index: selectedPaymentIndex,
    });
  };

  const attachUserByPhone = async (customerNo) => {
    if (customerNo === '') {
      alert('Please Enter Phone Number');
    } else {
      const data = {
        cartId: cartid,
        phoneNo: customerNo,
      };
      const res = await dispatch(attachCustomer(data));
      if (res?.type === 'ATTACH_CUSTOMER_SUCCESS') {
        onPressPaymentMethod({
          method: 'PayBy' + selectedPaymentMethod,
          index: selectedPaymentIndex,
        });
        setPhonePopVisible(false);
      }
    }
  };

  const attachUserByEmail = async (customerEmail) => {
    if (customerEmail === '') {
      alert('Please Enter Email');
    } else {
      const data = {
        cartId: cartid,
        phoneEmail: customerEmail,
      };
      const res = await dispatch(attachCustomer(data));
      if (res?.type === 'ATTACH_CUSTOMER_SUCCESS') {
        onPressPaymentMethod({
          method: 'PayBy' + selectedPaymentMethod,
          index: selectedPaymentIndex,
        });
        setEmailModal(false);
      }
    }
  };

  const closeHandler = () => {
    setSelectedRecipeIndex(null);
    setPhonePopVisible(false);
  };

  const requestFun = (phoneNumber) => {
    if (phoneNumber && phoneNumber.length > 5 && digits.test(phoneNumber)) {
      dispatch(walletGetByPhone(phoneNumber));
      alert('In progress');
    } else if (phoneNumber && phoneNumber.length < 5) {
      alert(strings.valiadtion.validPhone);
      return;
    } else if (phoneNumber && digits.test(phoneNumber) === false) {
      alert(strings.valiadtion.validPhone);
      return;
    } else {
      alert(strings.valiadtion.enterPhone);
      return;
    }
  };

  const createOrderHandler = () => {
    const data = {
      cartid: cartData.id,
      tips: (totalPayAmount() * 100).toFixed(0),
      modeOfPayment: 'jbr',
    };
    const callback = (response) => {
      if (response) {
        onPressContinue(saveCartData, data);
        setQrPopUp(false);
      }
    };
    dispatch(createOrder(data, callback));
  };

  return (
    <SafeAreaView style={styles._innerContainer}>
      <View style={styles.displayflex}>
        <View style={styles.leftCon}>
          <View style={styles.selectTipsHeader}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <BackButton
                onPress={onPressBack}
                title={'Back'}
                style={{
                  top: ms(10),
                  left: ms(10),
                  backgroundColor: 'transparent',
                }}
              />
              <Text style={styles._totalAmountTitle}>Total Payable Amount:</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles._dollarSymbol}>$</Text>
                <Text style={styles._amount}>
                  {cartData?.amount?.total_amount.toFixed(2) ?? '0.00'}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, paddingHorizontal: ms(18) }}>
            <View style={{ marginTop: ms(10) }}>
              <Text style={styles.selectTips}>Select Tips</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {TIPS_DATA.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      // onPressPaymentMethod({ method: item.title, index: index }),
                      const tipAmount = calculatePercentageValue(
                        cartData?.amount?.total_amount,
                        item.title
                      );
                      {
                        item.percent === 'No Tip'
                          ? setSelectedTipAmount('0.00')
                          : setSelectedTipAmount(tipAmount);
                      }

                      setSelectedTipIndex(index);
                    }}
                    key={index}
                    style={[
                      styles._payBYBoxContainerTip,
                      {
                        borderWidth: 1,
                        borderColor: selectedTipIndex === index ? COLORS.primary : COLORS.solidGrey,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles._payByMethodTip,
                        {
                          color: selectedTipIndex === index ? COLORS.primary : COLORS.solid_grey,
                        },
                      ]}
                    >
                      {item.percent}
                      {item.percent === 'No Tip' ? '' : '%'}
                    </Text>
                    {index !== 3 && (
                      <Text
                        style={[
                          styles._payByAmountTip,
                          {
                            color: selectedTipIndex === index ? COLORS.primary : COLORS.solid_grey,
                          },
                        ]}
                      >
                        {'USD $'}
                        {calculatePercentageValue(cartData?.amount?.total_amount, item.title)}
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            {selectedTipIndex !== null ? (
              <View
                style={{
                  marginTop: ms(7),
                }}
              >
                <Text style={styles.selectTips}>Select Payment Method</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {DATA.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        // index==1 && onPressPaymentMethod({ method: item.title, index: index })
                        setSelectedPaymentIndex(index);
                        setSelectedRecipeIndex(null);
                        setSelectedPaymentMethod(item.title);
                      }}
                      key={index}
                      style={[
                        styles._payBYBoxContainer,
                        {
                          borderWidth: 1,
                          borderColor:
                            selectedPaymentIndex === index ? COLORS.primary : COLORS.solidGrey,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles._payByTitle,
                          {
                            color:
                              selectedPaymentIndex === index ? COLORS.primary : COLORS.solid_grey,
                          },
                        ]}
                      >
                        Pay By
                      </Text>
                      <Text
                        style={[
                          styles._payByMethod,
                          {
                            color:
                              selectedPaymentIndex === index ? COLORS.primary : COLORS.solid_grey,
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={[
                          styles._payByAmount,
                          {
                            color:
                              selectedPaymentIndex === index ? COLORS.primary : COLORS.solid_grey,
                          },
                        ]}
                      >
                        {totalAmountByPaymentMethod(index)}
                      </Text>
                      <Image
                        source={item.icon}
                        style={[
                          styles._payByIcon,
                          {
                            tintColor:
                              selectedPaymentIndex === index ? COLORS.primary : COLORS.solid_grey,
                          },
                        ]}
                      />
                      {index == 1 && (
                        <View style={styles.saveView}>
                          <Text style={styles.saveText}>Save 1%</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles._payBYBoxContainerEmpty} />
            )}
            {selectedPaymentIndex !== null && selectedPaymentIndex !== 1 && (
              <View
                style={{
                  marginTop: ms(7),
                }}
              >
                <Text style={styles.selectTips}>E-Recipe</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {RECIPE_DATA.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        // onPressPaymentMethod({ method: item.title, index: index }),
                        setSelectedRecipeIndex(index);
                        setSelectedRecipeMethod(item.title);
                        if (index == 0) {
                          setPhonePopVisible(true);
                          setPhoneNumber('');
                        } else if (index == 1) {
                          setEmailModal(true);
                        } else if (index == 2) {
                          payNowHandler(), payNowByphone(selectedTipAmount);
                        }
                      }}
                      key={index}
                      style={[
                        styles._payBYBoxContainerReceipe,
                        {
                          borderWidth: 1,
                          borderColor:
                            selectedRecipeIndex === index ? COLORS.primary : COLORS.solidGrey,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles._payByMethodReceipe,
                          {
                            color:
                              selectedRecipeIndex === index ? COLORS.primary : COLORS.solid_grey,
                          },
                        ]}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {selectedPaymentIndex == 1 && (
              <TouchableOpacity style={styles.jobrSaveView} onPress={() => setQrPopUp(true)}>
                <Text style={styles.youSave}>You save</Text>
                <View style={styles.jbrContainer}>
                  <Text style={styles.jbrText}>JBR</Text>
                  <Text style={styles.savePercent}>
                    {jobrSavePercent(cartData?.amount?.total_amount ?? '0.00', 1)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.rightCon}>
          <View style={[{ height: '100%', alignItems: 'center' }]}>
            <Text style={styles._kSubCenterContainer}>Primark</Text>
            <Text style={styles._kAddress}>63 Ivy Road, Hawkville, GA, USA 31036</Text>
            <Text style={styles._kNumber}>+123-456-7890</Text>

            <View style={styles._flatListContainer}>
              <FlatList
                data={
                  cartType == 'Product'
                    ? cartData.poscart_products
                    : cartData?.appointment_cart_products
                }
                style={{ width: '100%' }}
                renderItem={({ item, index }) => <AddedCartItemsCard item={item} index={index} />}
              />
            </View>

            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Sub-Total</Text>
              <Text style={styles._subTotalPrice}>${cartData?.amount?.products_price}</Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Discount ( MIDApril100)</Text>
              <Text style={styles._subTotalPrice}>$0.00</Text>
            </View>

            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Shipping Charge</Text>
              <Text style={styles._subTotalPrice}>$0.00</Text>
            </View>
            {/* <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Tips</Text>
              <Text style={styles._subTotalPrice}>${tipAmount}</Text>
            </View> */}
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text
                style={[styles._substotalTile, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
              >
                Total
              </Text>
              <Text
                style={[styles._subTotalPrice, { fontSize: ms(6), fontFamily: Fonts.SemiBold }]}
              >
                ${totalPayAmount() ?? '0.00'}
              </Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={[styles._horizontalLine, { height: ms(2), marginTop: ms(15) }]} />

            <View style={styles._paymentTitleContainer}>
              <Text style={styles._payTitle}>Payment option: </Text>
              <Text style={styles._paySubTitle}>{'Cash'}</Text>
            </View>
            <Text style={styles._commonPayTitle}>Wed 26 Apr , 2023 6:27 AM</Text>
            <Text style={styles._commonPayTitle}>Walk-In</Text>
            <Text style={styles._commonPayTitle}>Invoice No. # 3467589</Text>
            <Text style={styles._commonPayTitle}>POS No. #Front-CC01</Text>
            <Text style={styles._commonPayTitle}>User ID : ****128</Text>
            <Spacer space={SH(10)} />
            <Text style={styles._thankyou}>Thank You</Text>
            <Image source={barcode} style={styles._barCodeImage} />
            <Text style={styles._barCode}>ABC-abc-1234</Text>
          </View>
        </View>
      </View>

      {/* Phone PopUp */}
      <Modal isVisible={phonePopVisible}>
        <View style={styles.calendarSettingModalContainer}>
          <View>
            <View style={styles.textInputView}>
              <CountryPicker
                onSelect={(code) => {
                  setFlag(code.cca2);
                  if (code.callingCode !== []) {
                    setCountryCode('+' + code.callingCode.flat());
                  } else {
                    setCountryCode('');
                  }
                }}
                countryCode={flag}
                withFilter
                withCallingCode
              />
              <Image source={dropdown} style={styles.dropDownIcon} />
              <Text style={styles.countryCodeText}>{countryCode}</Text>
              <TextInput
                maxLength={15}
                returnKeyType="done"
                keyboardType="number-pad"
                value={phoneNumber.trim()}
                onChangeText={onChangePhoneNumber}
                style={styles.textInputContainer}
                placeholder={strings.verifyPhone.placeHolderText}
                placeholderTextColor={COLORS.darkGray}
                showSoftInputOnFocus={false}
              />
            </View>
            <CustomKeyboard
              maxCharLength={15}
              enteredValue={phoneNumber}
              setEnteredValue={setPhoneNumber}
              onClosePress={closeHandler}
              onPayNowPress={() => {
                // payNowHandler();
                payNowByphone(selectedTipAmount);
                attachUserByPhone(phoneNumber);
              }}
            />
          </View>
          {isLoading ? (
            <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
              <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
            </View>
          ) : null}
        </View>
      </Modal>
      <Modal isVisible={emailModal}>
        <KeyboardAwareScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <View style={styles.emailModalContainer}>
            <View>
              <View style={styles.modalHeaderCon}>
                <View style={styles.flexRow}>
                  <Text style={[styles.twoStepText, { fontFamily: Fonts.SemiBold }]}>
                    {strings.retail.eRecipeEmail}
                  </Text>
                  <TouchableOpacity
                    style={styles.crossButtonCon}
                    onPress={() => {
                      setEmailModal(false), setSelectedRecipeIndex(null), setEmail('');
                    }}
                  >
                    <Image source={crossButton} style={styles.crossButton} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  placeholder="you@you.mail"
                  value={email.trim()}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.solidGrey}
                />
                <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() => {
                    // payNowHandler(),
                    payNowByphone(selectedTipAmount);
                    attachUserByEmail(email);
                  }}
                >
                  <Text style={styles.payNowButtonText}>Pay Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            {isLoading ? (
              <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
                <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
              </View>
            ) : null}
          </View>
        </KeyboardAwareScrollView>
      </Modal>

      {/* qr code scan pop */}
      <ReactNativeModal isVisible={qrPopUp}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 100}
        >
          <ScrollView>
            <View style={styles.scanPopUpCon}>
              <>
                <View style={styles.scanPopHeader}>
                  <TouchableOpacity
                    style={styles.crossBg}
                    onPress={() => {
                      setQrPopUp(false);
                      dispatch(requestCheckSuccess(''));
                    }}
                  >
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
                      <Text style={styles._amount}>JBR {(totalPayAmount() * 100).toFixed(0)}</Text>
                      <Text style={styles._usdText}>USD ${totalPayAmount()}</Text>
                    </View>
                  </View>
                  <View style={{ width: '60%' }}>
                    <View style={{ margin: ms(5), alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
                        <Image
                          source={{ uri: qrcodeData?.qr_code }}
                          style={{ height: ms(110), width: ms(110) }}
                        />
                      </View>

                      <View style={[styles._inputMain, { width: ms(310) }]}>
                        <View style={styles._orContainer}>
                          <View style={styles._borderView} />
                          <Text style={styles._orText}>Or</Text>
                          <View style={styles._borderView} />
                        </View>
                        {requestStatus == 'approved' ? (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                              marginTop: verticalScale(10),
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 40,

                                textAlign: 'center',
                                color: 'green',
                              }}
                            >
                              Payment Approved
                            </Text>

                            <TouchableOpacity
                              onPress={createOrderHandler}
                              style={{
                                backgroundColor: 'blue',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 10,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 40,
                                  color: '#FFFFFF',
                                }}
                              >
                                Create Order
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View>
                            <Text style={styles._sendPaymentText}>
                              Send payment request to your wallet
                            </Text>
                            <View style={styles._inputSubView}>
                              <View style={styles.textInputView2}>
                                <CountryPicker
                                  onSelect={(code) => {
                                    setWalletFlag(code.cca2);
                                    if (code.callingCode !== []) {
                                      setWalletCountryCode('+' + code.callingCode.flat());
                                    } else {
                                      setWalletCountryCode('');
                                    }
                                  }}
                                  countryCode={walletFlag}
                                  withFilter
                                  withCallingCode
                                />
                                <Image source={dropdown} style={styles.dropDownIcon} />
                                <Text style={styles.countryCodeText}>{walletCountryCode}</Text>
                                <TextInput
                                  maxLength={15}
                                  returnKeyType="done"
                                  keyboardType="number-pad"
                                  value={walletIdInp?.trim()}
                                  onChangeText={(walletIdInp) => walletInputFun(walletIdInp)}
                                  style={styles.textInputContainer}
                                  placeholder={strings.verifyPhone.placeHolderText}
                                  placeholderTextColor={COLORS.darkGray}
                                  // showSoftInputOnFocus={false}
                                />
                              </View>

                              <TouchableOpacity
                                // onPress={onPressContinue}
                                disabled={
                                  walletUser?.step >= 2 && walletIdInp?.length > 9 ? false : true
                                }
                                style={[
                                  styles._sendRequest,
                                  {
                                    opacity:
                                      walletUser?.step >= 2 && walletIdInp?.length > 9 ? 1 : 0.7,
                                  },
                                ]}
                                onPress={() => sendRequestFun(walletIdInp)}
                              >
                                <Text style={[styles._tipText, { color: COLORS.solid_green }]}>
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
              </>
              {isLoading ? (
                <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
                  <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
                </View>
              ) : null}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ReactNativeModal>
    </SafeAreaView>
  );
};
