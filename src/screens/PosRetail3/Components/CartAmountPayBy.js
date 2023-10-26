import {
  ActivityIndicator,
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
import { moderateScale, ms, verticalScale } from 'react-native-size-matters';
import { styles } from '../PosRetail3.styles';
import { Spacer } from '@/components';
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
  logo_full,
} from '@/assets';
import moment from 'moment';
import { COLORS, SF, SH } from '@/theme';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { useState } from 'react';
import Modal, { ReactNativeModal } from 'react-native-modal';
import { strings } from '@/localization';
import { CustomKeyboard } from '../CustomKeyBoard';
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
  attachServiceCustomer,
  updateCartByTip,
  createServiceOrder,
  qrcodestatus,
  qrCodeStatusSuccess,
  Servicesqrcodestatus,
  getAllCart,
  getServiceCart,
} from '@/actions/RetailAction';
import { useEffect } from 'react';
import { getAuthData } from '@/selectors/AuthSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import { DATA } from '@/constants/flatListData';
import { getUser } from '@/selectors/UserSelectors';
import { getSetting } from '@/selectors/SettingSelector';
import { formattedReturnPrice } from '@/utils/GlobalMethods';

moment.suppressDeprecationWarnings = true;

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
  onPressServiceContinue,
}) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getUserData = useSelector(getUser);
  const updateData = useSelector(getRetail).updateQuantityy;
  const getSettingData = useSelector(getSetting);
  // console.log('getSetting data', JSON.stringify(getSettingData));
  // jbrcoin: getSettingData?.getSetting?.accept_jbr_coin_payment,
  // cash: getSettingData?.getSetting?.accept_cash_payment,
  // card: getSettingData?.getSetting?.accept_card_payment,
  const paymentMethodData = [];

  if (Object.keys(getSettingData?.getSetting).length > 0) {
    paymentMethodData.push(
      {
        title: 'Cash',
        icon: moneyIcon,
        status: getSettingData.getSetting.accept_cash_payment,
        id: 1,
      },
      {
        title: 'JBR Coin',
        icon: qrCodeIcon,
        status: true,
        id: 2,
      },
      {
        title: 'Card',
        icon: cardPayment,
        status: getSettingData.getSetting.accept_card_payment,
        id: 3,
      }
    );
  } else {
    paymentMethodData.push({
      title: 'JBR Coin',
      icon: qrCodeIcon,
      status: true,
      id: 2,
    });
  }

  const receiptData = [{ title: 'No e-recipe', icon: cardPayment }];
  if (getSettingData?.getSetting?.invoice_email_send_status) {
    receiptData.unshift({ title: 'Email', icon: cardPayment });
  }
  if (getSettingData?.getSetting?.invoice_sms_send_status) {
    receiptData.unshift({ title: 'SMS', icon: cardPayment });
  }

  const filteredPaymentMethods = paymentMethodData.filter((item) => item.status);
  const getAuthdata = useSelector(getAuthData);

  // const [loading, setloading] = useState(false);
  const tipLoading = useSelector((state) => isLoadingSelector([TYPES.UPDATE_CART_BY_TIP], state));
  const cartData =
    cartType == 'Product' ? getRetailData?.getAllCart : getRetailData?.getserviceCart;
  console.log(JSON.stringify(cartData));
  const qrcodeData = useSelector(getRetail).qrKey;
  const cartProducts = cartData?.poscart_products;
  const saveCartData = { ...getRetailData };
  const serviceCartId = getRetailData?.getserviceCart?.id;
  const servicCartId = getRetailData?.getserviceCart?.id;
  const [selectedTipIndex, setSelectedTipIndex] = useState(null);
  const [selectedTipAmount, setSelectedTipAmount] = useState('0.00');
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [selectedRecipeMethod, setSelectedRecipeMethod] = useState(null);
  const [phonePopVisible, setPhonePopVisible] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [qrPopUp, setQrPopUp] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState(cartData?.user_details?.email ?? '');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState(cartData?.user_details?.phone_code ?? '+1');
  const [walletIdInp, setWalletIdInp] = useState();
  const [walletFlag, setWalletFlag] = useState('US');
  const [walletCountryCode, setWalletCountryCode] = useState('+1');
  const walletUser = getRetailData?.walletGetByPhone?.[0];
  const getWalletQr = getRetailData?.getWallet?.qr_code;
  const sellerID = getAuthdata?.merchantLoginData?.uniqe_id;
  const [requestId, setRequestId] = useState();
  const requestStatus = getRetailData?.requestCheck;
  const merchantDetails = getAuthdata?.merchantLoginData?.user;
  const qrStatus = getRetailData.qrStatuskey;
  const [status, setstatus] = useState('');
  const [sendRequest, setsendRequest] = useState(false);
  const [duration, setDuration] = useState(120);
  const [paused, setPaused] = useState(true);
  const getTips = getRetailData?.getTips;
  const isFocused = useIsFocused();

  // useEffect(() => {
  //   dispatch(getAllCart());
  // }, []);

  useEffect(() => {
    if (cartData?.user_details) {
      setEmail(cartData?.user_details?.email ?? '');
      setPhoneNumber(cartData?.user_details?.phone_no ?? '');
    }
  }, [cartData?.user_details]);

  const DATA = [
    { title: 'Cash', icon: moneyIcon },
    { title: 'JBR Coin', icon: qrCodeIcon },
    { title: 'Card', icon: cardPayment },
  ];

  const TIPS_DATA = [
    { title: getTips?.first_tips ?? 18, icon: cardPayment, percent: getTips?.first_tips ?? '18' },
    {
      title: getTips?.second_tips ?? 20,
      icon: cardPayment,
      percent: getTips?.second_tips ?? '20',
    },
    { title: getTips?.third_tips ?? 22, icon: cardPayment, percent: getTips?.third_tips ?? '22' },
    { title: '', icon: cardPayment, percent: 'No Tips' },
  ];

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment =
      parseFloat(cartAmount) + parseFloat(selectedTipAmount === '' ? '0.0' : selectedTipAmount);

    return totalPayment.toFixed(2);
  };

  const getTipPress = async () => {
    if (cartType == 'Product') {
      const data = {
        tip: selectedTipAmount.toString(),
        cartId: cartData.id,
      };
      const res = await dispatch(updateCartByTip(data));
      if (res?.type === 'UPDATE_CART_BY_TIP_SUCCESS') {
        dispatch(getQrCodee(cartData?.id));
        // setQrPopUp(true);
        dispatch(getAllCart());
      }
    } else {
      const data = {
        tip: selectedTipAmount.toString(),
        cartId: serviceCartId,
        services: 'services',
      };
      const res = await dispatch(updateCartByTip(data));

      if (res?.type === 'UPDATE_CART_BY_TIP_SUCCESS') {
        const data = {
          services: 'services',
        };
        dispatch(getQrCodee(serviceCartId, data));
        // setQrPopUp(true);
        dispatch(getServiceCart());
      }
    }
  };

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

  useEffect(() => {
    dispatch(getWalletId(sellerID));
    dispatch(getTip(sellerID));
  }, []);

  useEffect(() => {
    dispatch(requestCheckSuccess(''));
    dispatch(qrCodeStatusSuccess(''));
  }, []);

  const qrcodePaymentstatus = () => {
    dispatch(qrcodestatus(cartData.id));
  };

  const isLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_WALLET_PHONE, TYPES.ATTACH_CUSTOMER, TYPES.CREATE_ORDER], state)
  );
  useEffect(() => {
    let interval;

    if (requestStatus !== 'success' && sendRequest) {
      interval = setInterval(() => {
        setRequestId((requestId) => {
          const data = {
            requestId: requestId,
          };
          dispatch(requestCheck(data));
          // Alert.alert('1  condition');
          // createOrderHandler();

          return requestId;
        });
      }, 10000);
    } else if (requestStatus == 'success' && sendRequest) {
      cartType == 'Service' ? serviceOrderHandler() : createOrderHandler();
      // Alert.alert('2  condition');
      clearInterval(interval);
    } else if (qrStatus?.status !== 'success' && qrPopUp && sendRequest == false) {
      interval = setInterval(() => {
        cartType == 'Service'
          ? dispatch(Servicesqrcodestatus(cartData.id))
          : dispatch(qrcodestatus(cartData.id));
        // Alert.alert('3 condition', sendRequest);
      }, 5000);
    } else if (qrStatus?.status == 'success' && qrPopUp && sendRequest == false) {
      cartType == 'Service' ? serviceOrderHandler() : createOrderHandler();
      // Alert.alert('4 condition');
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isFocused, requestStatus == 'success', qrStatus?.status == 'success', qrPopUp, sendRequest]);

  const walletInputFun = (phoneNumber) => {
    setWalletIdInp(phoneNumber);
    if (phoneNumber?.length > 9) {
      if (phoneNumber && digits.test(phoneNumber) === false) {
        alert(strings.valiadtion.validPhone);
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
  const payNowHandler = () => {
    onPressPaymentMethod({
      method: 'PayBy' + selectedPaymentMethod,
      index: selectedPaymentIndex,
    });
  };

  const attachUserByPhone = async (customerNo) => {
    if (customerNo === '') {
      alert('Please Enter Phone Number');
    } else if (cartType == 'Product') {
      const data = {
        cartId: cartid,
        phoneNo: customerNo,
        countryCode: countryCode,
      };
      const res = await dispatch(attachCustomer(data));
      if (res?.type === 'ATTACH_CUSTOMER_SUCCESS') {
        onPressPaymentMethod({
          method: 'PayBy' + selectedPaymentMethod,
          index: selectedPaymentIndex,
        });
        setPhonePopVisible(false);
      }
    } else {
      const data = {
        cartId: servicCartId,
        phoneNo: customerNo,
        countryCode: countryCode,
      };
      const res = await dispatch(attachServiceCustomer(data));
      if (res?.type === 'ATTACH_SERVICE_CUSTOMER_SUCCESS') {
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
    } else if (cartType == 'Product') {
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
    } else {
      const data = {
        cartId: servicCartId,
        phoneEmail: customerEmail,
      };
      const res = await dispatch(attachServiceCustomer(data));
      if (res?.type === 'ATTACH_SERVICE_CUSTOMER_SUCCESS') {
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
    dispatch(requestCheckSuccess(''));
    setsendRequest(false);
  };

  const serviceOrderHandler = () => {
    const data = {
      serviceCartId: cartData?.id,
      modeOfPayment: 'jbr',
      tipsAddAnount: (totalPayAmount() * 100).toFixed(0),
    };
    const callback = (response) => {
      if (response) {
        onPressServiceContinue(saveCartData, data);
        setQrPopUp(false);
      }
    };

    dispatch(createServiceOrder(data, callback));
    dispatch(requestCheckSuccess(''));
    setsendRequest(false);
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
                        cartData?.amount?.products_price,
                        item.title
                      );
                      {
                        item.percent === 'No Tips'
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
                      {item.percent === 'No Tips' ? '' : '%'}
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
                        {'$'}
                        {calculatePercentageValue(cartData?.amount?.products_price, item.title)}
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
                <View
                  style={{
                    flexDirection: 'row',

                    //  justifyContent: filteredPaymentMethods.length > 2 ? 'space-evenly' : null,
                  }}
                >
                  {filteredPaymentMethods.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        // index==1 && onPressPaymentMethod({ method: item.title, index: index })
                        setSelectedPaymentId(item.id);
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
                      {index == 1 ? (
                        <View
                          style={[
                            styles.saveView,
                            {
                              backgroundColor:
                                selectedPaymentIndex === index
                                  ? COLORS.blue_shade
                                  : COLORS.textInputBackground,
                            },
                          ]}
                        >
                          <Text
                            style={
                              selectedPaymentIndex === index
                                ? styles.saveText1dark
                                : styles.saveText1
                            }
                          >
                            Save 1%
                          </Text>
                        </View>
                      ) : (
                        <View style={[styles.saveView, { backgroundColor: COLORS.white }]}></View>
                      )}
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
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles._payBYBoxContainerEmpty} />
            )}
            {selectedPaymentIndex !== null && selectedPaymentId !== 2 && (
              <View
                style={{
                  marginTop: ms(7),
                }}
              >
                <Text style={styles.selectTips}>E-Recipe</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    //  justifyContent: 'space-between'
                  }}
                >
                  {receiptData.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        // onPressPaymentMethod({ method: item.title, index: index }),
                        setSelectedRecipeIndex(index);
                        setSelectedRecipeMethod(item.title);
                        if (item.title == 'SMS') {
                          setPhonePopVisible(true);
                          // setPhoneNumber('');
                          //getTipPress();
                        } else if (item.title == 'Email') {
                          setEmailModal(true);
                          //getTipPress();
                        } else if (item.title == 'No e-recipe') {
                          getTipPress(), payNowHandler(), payNowByphone(selectedTipAmount);
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

            {selectedPaymentId == 2 && (
              <TouchableOpacity
                isLoading={true}
                style={styles.jobrSaveView}
                onPress={() => {
                  getTipPress();
                  setQrPopUp(true);
                }}
              >
                {tipLoading ? (
                  <ActivityIndicator color={COLORS.primary} size="large"></ActivityIndicator>
                ) : (
                  <View>
                    <Text style={styles.youSave}>You save</Text>

                    <View style={styles.jbrContainer}>
                      <Text style={styles.jbrText}>JBR</Text>
                      <Text style={styles.savePercent}>
                        {jobrSavePercent(cartData?.amount?.total_amount ?? '0.00', 1)}
                      </Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.rightCon}>
          <View style={[{ height: '100%', alignItems: 'center' }]}>
            <Text style={styles._kSubCenterContainer}>
              {merchantDetails?.user_profiles?.organization_name}
            </Text>
            <Text
              style={styles._kAddress}
            >{`${merchantDetails?.user_profiles?.current_address?.street_address}, ${merchantDetails?.user_profiles?.current_address?.city}, ${merchantDetails?.user_profiles?.current_address?.state}, ${merchantDetails?.user_profiles?.current_address?.country}, ${merchantDetails?.user_profiles?.current_address?.zipcode}`}</Text>
            <Text style={styles._kNumber}>{merchantDetails?.user_profiles?.full_phone_number}</Text>

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
              <Text style={styles._subTotalPrice}>
                ${cartData?.amount?.products_price?.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Discount</Text>
              <Text style={styles._subTotalPrice}>
                {formattedReturnPrice(cartData?.amount?.discount)}
              </Text>
            </View>

            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Total Taxes</Text>
              <Text style={styles._subTotalPrice}>
                ${cartData?.amount?.tax.toFixed(2) ?? '0.00'}
              </Text>
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
            <Text style={styles._commonPayTitle}>
              {moment().format('ddd DD MMM, YYYY')} {moment().format('hh:mm A')}
            </Text>
            <Text style={styles._commonPayTitle}>Walk-In</Text>
            {/* <Text style={styles._commonPayTitle}>Invoice No. # 3467589</Text> */}
            <Text style={styles._commonPayTitle}>
              POS No. {getUserData?.posLoginData?.pos_number}
            </Text>
            <Text style={styles._commonPayTitle}>User ID : ****128</Text>
            <Spacer space={SH(5)} />
            <Text style={styles._thankyou}>Thank You</Text>
            <Image source={{ uri: cartData?.barcode } ?? barcode} style={styles._barCodeImage} />
            <Image source={logo_full} style={styles.logoFull} />
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
                maxLength={10}
                returnKeyType="done"
                keyboardType="number-pad"
                value={phoneNumber?.toString()}
                onChangeText={setPhoneNumber}
                style={styles.textInputContainer}
                placeholder={strings.verifyPhone.placeHolderText}
                placeholderTextColor={COLORS.darkGray}
                showSoftInputOnFocus={false}
              />
            </View>
            <CustomKeyboard
              maxCharLength={15}
              enteredValue={phoneNumber?.toString()}
              setEnteredValue={setPhoneNumber}
              onClosePress={closeHandler}
              onPayNowPress={() => {
                getTipPress();
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
                      setEmailModal(false), setSelectedRecipeIndex(null);
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
                  value={email?.trim()}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  placeholderTextColor={COLORS.solidGrey}
                />
                <TouchableOpacity
                  style={styles.payNowButton}
                  onPress={() => {
                    getTipPress();
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scanPopUpCon}>
              <>
                <View style={styles.scanPopHeader}>
                  <TouchableOpacity
                    style={styles.crossBg}
                    onPress={() => {
                      setQrPopUp(false);
                      dispatch(requestCheckSuccess(''));
                      dispatch(qrCodeStatusSuccess(''));
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
                      {/* <Text style={styles._amount}>JBR {(totalPayAmount() * 100).toFixed(0)}</Text> */}
                      {/* <Text style={styles._usdText}>USD ${totalPayAmount()}</Text> */}
                      <Text style={styles._amount}>
                        JBR {(cartData?.amount?.total_amount * 100).toFixed(0)}
                      </Text>
                      <Text style={styles._usdText}>
                        USD ${cartData?.amount?.total_amount.toFixed(2) ?? '0.00'}
                      </Text>
                    </View>
                  </View>
                  <View style={{ width: '60%' }}>
                    <View style={{ margin: ms(5), alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', marginTop: ms(5) }}>
                        <Image
                          blurRadius={sendRequest ? 10 : 0}
                          source={{ uri: qrcodeData?.qr_code }}
                          style={{
                            height: ms(180),
                            width: ms(180),
                          }}
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
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 20,

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
                                padding: moderateScale(5),
                                borderRadius: moderateScale(5),
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: moderateScale(10),
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
                                  walletUser?.step >= 2 && walletIdInp?.length > 9 && !sendRequest
                                    ? false
                                    : true
                                }
                                style={[
                                  styles._sendRequest,
                                  {
                                    opacity:
                                      walletUser?.step >= 2 &&
                                      walletIdInp?.length > 9 &&
                                      !sendRequest
                                        ? 1
                                        : 0.7,
                                  },
                                ]}
                                onPress={() => sendRequestFun(walletIdInp)}
                              >
                                <Text style={[styles._tipText, { color: COLORS.solid_green }]}>
                                  {sendRequest ? 'Request Sent' : 'Send Request'}
                                </Text>
                              </TouchableOpacity>
                              {sendRequest ? (
                                <Text
                                  style={{
                                    fontSize: moderateScale(10),
                                    textAlign: 'center',
                                    fontFamily: Fonts.MaisonBold,
                                    color: '#8F8E93',
                                  }}
                                >
                                  {formatTime(duration)}
                                </Text>
                              ) : null}
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
