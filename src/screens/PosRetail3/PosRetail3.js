import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AddDiscountToCart, ScreenWrapper, Spacer } from '@/components';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  AddProductScreen,
  AddServiceScreen,
  CartAmountPayBy,
  CartAmountTips,
  CartScreen,
  CartServiceScreen,
  FinalPaymentScreen,
  MainScreen,
  PayByCard,
  PayByCash,
  PayByCash2,
} from '@/screens/PosRetail3/Components';

import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import Modal from 'react-native-modal';
import {
  addDiscountToCart,
  addNotescart,
  addServiceDiscountToCart,
  addServiceNotescart,
  customerNumber,
  getAllCart,
  getAllProductCart,
  getAllServiceCart,
  getMainProduct,
  getMainServices,
  getServiceCart,
} from '@/actions/RetailAction';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { COLORS, SH } from '@/theme';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { crossButton } from '@/assets';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { strings } from '@/localization';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getDrawerSessions } from '@/actions/CashTrackingAction';

export function PosRetail3() {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const getCartAmount = getRetailData?.getAllCart?.amount;
  const cartID2 = getRetailData?.getAllCart?.id;
  const servicCartId = getRetailData?.getAllCart?.id;
  const cartData = getRetailData?.getAllCart;
  const getCart = getRetailData?.getAllCart;
  const getServicecart = getRetailData?.getserviceCart;
  const getServiceCartAmount = getRetailData?.getAllCart?.amount;
  const finalAmountForDiscount =
    cartData?.amount?.products_price.toFixed(2) - cartData?.amount?.tax.toFixed(2);
  const finalServiceAmountForDiscount =
    getServicecart?.amount?.products_price?.toFixed(2) - getServicecart?.amount?.tax?.toFixed(2);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const defaultArrayproduct = getRetailData?.getProductDefault;
  const categoryArray = getRetailData?.categoryList;
  const [selectedScreen, setselectedScreen] = useState('MainScreen');
  // const [selectedScreen, setselectedScreen] = useState('CartAmountPayBy');
  const [paymentMethod, setpaymentMethod] = useState('Cash');
  const [addNotes, setAddNotes] = useState(false);
  const [notes, setNotes] = useState(getRetailData?.getAllCart?.notes);
  const [serviceNotes, setServiceNotes] = useState(getRetailData?.getAllCart?.notes);
  const [addDiscount, setAddDiscount] = useState(false);
  const [addServiceDiscount, setAddServiceDiscount] = useState(false);
  const [page, setPage] = useState(1);
  const [tipAmount, selectTipAmount] = useState();
  const [fromWhichCart, setFromWhichCart] = useState('Product');
  const [comingScreen, setComingScreen] = useState();
  const [mainBackscreen, setMainBackScreen] = useState();
  const [addServiceNotes, setAddServiceNotes] = useState(false);

  const [savedTempCartData, setSavedTempCartData] = useState(null);
  const [visitCart, setVisitCart] = useState(false);

  const [cashPayDetail, setCashPayDetail] = useState();
  const [activeScreen, setActiveScreen] = useState();
  const [selectTips, setSelectTips] = useState();

  useFocusEffect(
    React.useCallback(() => {
      return () => setselectedScreen('MainScreen');
      // return () => setselectedScreen('CartAmountPayBy');
    }, [])
  );

  useEffect(() => {
    dispatch(getMainProduct());
    dispatch(getMainServices());
  }, []);

  // service Add discount start

  const [serviceAmountDis, setServiceAmountDis] = useState(
    getServicecart?.discount_flag === 'amount' ? getServicecart?.discount_value : ''
  );

  const [servicePercentDis, setServicePercentDis] = useState(
    getServicecart?.discount_flag === 'percentage' ? getServicecart?.discount_value : ''
  );
  const [serviceDiscountCode, setServiceDiscountCode] = useState(
    getServicecart?.discount_flag === 'code' ? getServicecart?.discount_value : ''
  );
  const [serviceDescriptionDis, setServiceDescriptionDis] = useState(
    getServicecart?.discount_desc ?? 'Discount'
  );
  const [serviceValue, setServiceValue] = useState(
    getServicecart?.discount_flag === 'amount'
      ? 'amount'
      : getServicecart?.discount_flag === 'percentage'
      ? 'percentage'
      : getServicecart?.discount_flag === 'code'
      ? 'code'
      : ''
  );
  const [serviceAmountCheck, setServiceAmountCheck] = useState(
    getServicecart?.discount_flag === 'amount' ? true : false
  );
  const [servicePercentageCheck, setServicePercentageCheck] = useState(
    getServicecart?.discount_flag === 'percentage' ? true : false
  );
  const [serviceDiscountCheck, setServiceDiscountCheck] = useState(
    getServicecart?.discount_flag === 'code' ? true : false
  );

  useEffect(() => {
    setServiceNotes(getCart?.notes);
    setServiceDescriptionDis(getCart?.discount_desc === null ? 'Discount' : getCart?.discount_desc);
    setServicePercentageCheck(getCart?.discount_flag === 'percentage' ? true : false);
    setServiceAmountCheck(getCart?.discount_flag === 'amount' ? true : false);
    setServiceDiscountCheck(getCart?.discount_flag === 'code' ? true : false);
    setServiceAmountDis(getCart?.discount_flag === 'amount' ? getCart?.discount_value : '');
    setServicePercentDis(getCart?.discount_flag === 'percentage' ? getCart?.discount_value : '');
    setServiceDiscountCode(getCart?.discount_flag === 'code' ? getCart?.discount_value : '');
    setServiceValue(
      getCart?.discount_flag === 'amount'
        ? 'amount'
        : getCart?.discount_flag === 'percentage'
        ? 'percentage'
        : getCart?.discount_flag === 'code'
        ? 'code'
        : ''
    );
  }, [getRetailData?.getAllCart]);

  const clearServiceInput = () => {
    setServiceNotes('');
    setServiceAmountDis('');
    setServicePercentDis('');
    setServiceDiscountCode('');
    setServiceValue('');
    setServiceDescriptionDis('');
    if (serviceAmountCheck) {
      setServiceAmountCheck(false);
    } else if (servicePercentageCheck) {
      setServicePercentageCheck(false);
    } else if (serviceDiscountCheck) {
      setServiceDiscountCheck(false);
    }
  };

  const saveServiceDiscountHandler = () => {
    if (
      serviceAmountDis > finalServiceAmountForDiscount
      //  ||percentDis > finalServiceAmountForDiscount
    ) {
      alert('Please enter discount less then total amount');
    } else if (!getRetailData?.getAllCart?.id) {
      alert(strings.posSale.addItemCart);
    } else if (serviceValue === '') {
      alert(strings.posSale.discountType);
    } else if (!serviceAmountDis && !servicePercentDis && !serviceDiscountCode) {
      alert(strings.posSale.enterfield);
    }
    // else if (!serviceDescriptionDis) {
    //   alert(strings.posSale.selectDisTitle);
    // }
    else {
      const data = {
        amountDis: serviceAmountDis,
        percentDis: servicePercentDis,
        discountCode: serviceDiscountCode,
        value: serviceValue,
        cartId: getRetailData?.getAllCart?.id,
        orderAmount: getServiceCartAmount?.total_amount,
        descriptionDis: serviceDescriptionDis,
      };

      dispatch(addServiceDiscountToCart(data));
      // dispatch(addDiscountToCart(data));
      clearServiceInput();
      setAddServiceDiscount(false);
    }
  };

  // service Add discount end

  const [amountDis, setAmountDis] = useState(
    getCart?.discount_flag === 'amount' ? getCart?.discount_value : ''
  );
  const [percentDis, setPercentDis] = useState(
    getCart?.discount_flag === 'percentage' ? getCart?.discount_value : ''
  );
  const [discountCode, setDiscountCode] = useState(
    getCart?.discount_flag === 'code' ? getCart?.discount_value : ''
  );
  const [descriptionDis, setDescriptionDis] = useState(getCart?.discount_desc);
  const [value, setValue] = useState(
    getCart?.discount_flag === 'amount'
      ? 'amount'
      : getCart?.discount_flag === 'percentage'
      ? 'percentage'
      : getCart?.discount_flag === 'code'
      ? 'code'
      : ''
  );

  const [amountCheck, setAmountCheck] = useState(
    getCart?.discount_flag === 'amount' ? true : false
  );
  const [percentageCheck, setPercentageCheck] = useState(
    getCart?.discount_flag === 'percentage' ? true : false
  );
  const [discountCheck, setDiscountCheck] = useState(
    getCart?.discount_flag === 'code' ? true : false
  );

  useEffect(() => {
    dispatch(getAllCart());
    // dispatch(getServiceCart());
    dispatch(getAllProductCart());
    // dispatch(getAllServiceCart());
  }, [isFocus]);
  useEffect(() => {
    setNotes(getCart?.notes);
    setDescriptionDis(getCart?.discount_desc === null ? 'Discount' : getCart?.discount_desc);
    setPercentageCheck(getCart?.discount_flag === 'percentage' ? true : false);
    setAmountCheck(getCart?.discount_flag === 'amount' ? true : false);
    setDiscountCheck(getCart?.discount_flag === 'code' ? true : false);
    setAmountDis(getCart?.discount_flag === 'amount' ? getCart?.discount_value : '');
    setPercentDis(getCart?.discount_flag === 'percentage' ? getCart?.discount_value : '');
    setDiscountCode(getCart?.discount_flag === 'code' ? getCart?.discount_value : '');
    setValue(
      getCart?.discount_flag === 'amount'
        ? 'amount'
        : getCart?.discount_flag === 'percentage'
        ? 'percentage'
        : getCart?.discount_flag === 'code'
        ? 'code'
        : ''
    );
  }, [getRetailData?.getAllCart]);

  const clearInput = () => {
    setNotes('');
    setAmountDis('');
    setPercentDis('');
    setDiscountCode('');
    setValue('');
    setDescriptionDis('');
    if (amountCheck) {
      setAmountCheck(false);
    } else if (percentageCheck) {
      setPercentageCheck(false);
    } else if (discountCheck) {
      setDiscountCheck(false);
    }
  };
  const saveDiscountHandler = () => {
    if (amountDis > finalAmountForDiscount) {
      alert('Please enter discount less then total amount');
    } else if (!cartID2) {
      alert(Pleastrings.posSale.addItemCart);
    } else if (value === '') {
      alert(strings.posSale.discountType);
    } else if (!amountDis && !percentDis && !discountCode) {
      alert(strings.posSale.enterfield);
    }
    //  else if (!descriptionDis) {
    //   alert(strings.posSale.selectDisTitle);
    // }
    else {
      const data = {
        amountDis: amountDis,
        percentDis: percentDis,
        discountCode: discountCode,
        value: value,
        cartId: cartID2,
        orderAmount: getCartAmount?.total_amount,
        descriptionDis: descriptionDis,
      };
      dispatch(addDiscountToCart(data));
      clearInput();
      setAddDiscount(false);
    }
  };

  const isFocus = useIsFocused();

  const addNotesHandler = () => {
    setAddNotes(true);
  };
  const addDiscountHandler = () => {
    setAddDiscount(true);
  };

  const getScreenFunction = (value) => {
    setActiveScreen(value);
  };

  useEffect(() => {
    dispatch(customerNumber({ number: '' }));
  }, []);

  const saveNotesHandler = () => {
    if (!notes) {
      Toast.show({
        text2: strings.posSale.pleaseAddNotes,
        position: 'top',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      const data = {
        cartId: cartID2,
        notes: notes,
      };
      dispatch(addNotescart(data));
      setNotes('');
      setAddNotes(false);
    }
  };

  const isLoading = useSelector((state) =>
    isLoadingSelector(
      [
        TYPES.GET_ONE_PRODUCT,
        TYPES.GET_ONE_SERVICE,
        // TYPES.ADDCART,
        TYPES.GET_CLEAR_ALL_CART,
        TYPES.GET_ALL_CART,
        TYPES.GET_WALLET_PHONE,
        TYPES.GET_CLEAR_ONE_CART,
        TYPES.REQUEST_MONEY,
        TYPES.CREATE_ORDER,
        TYPES.ADDNOTES,
        TYPES.ADD_DISCOUNT,
        TYPES.CHECK_SUPPLIES_VARIANT,
        TYPES.GET_TIPS,
        TYPES.CLEAR_SERVICE_ALL_CART,
        TYPES.GET_SERVICE_CART,
        TYPES.ADD_SERVICE_CART,
        TYPES.CHANGE_STATUS_PRODUCT_CART,
        TYPES.GET_MAIN_PRODUCT,
        TYPES.GET_ALL_SERVICE_CART,
        TYPES.CHANGE_STATUS_SERVICE_CART,
        TYPES.ADD_SERVICE_DISCOUNT,
        TYPES.GET_MAIN_SERVICES,
        TYPES.PRODUCT_UPDATE_PRICE,
        TYPES.SERVICE_UPDATE_PRICE,
        TYPES.CUSTOM_PRODUCT_ADD,
        TYPES.CUSTOM_SERVICE_ADD,
        TYPES.ATTACH_SERVICE_CUSTOMER,
        TYPES.ATTACH_CUSTOMER,
        TYPES.CREATE_SERVICE_ORDER,
        TYPES.UPDATE_CART_BY_TIP,
      ],
      state
    )
  );

  const renderScreen = {
    ['MainScreen']: (
      <MainScreen
        cartScreenHandler={() => {
          setVisitCart(true), setselectedScreen('CartScreen');
        }}
        sellerID={sellerID}
        headercrossHandler={() => alert('abc')}
        checkOutHandler={() => {
          setVisitCart(true), setselectedScreen('CartScreen');
        }}
        checkOutServiceHandler={() => {
          setVisitCart(true), setselectedScreen('CartServiceScreen');
        }}
        productArray={defaultArrayproduct}
        categoryArray={categoryArray}
        addNotesHandler={addNotesHandler}
        addDiscountHandler={addDiscountHandler}
        onPressPayNow={() => {
          setselectedScreen('CartAmountTips');
        }}
        cartServiceScreenHandler={() => setselectedScreen('CartServiceScreen')}
        activeCategory={activeScreen}
        addProductscreenShow={() => setselectedScreen('AddProductScreen')}
        addServiceScreenShow={() => setselectedScreen('AddServiceScreen')}
      />
    ),
    ['CartScreen']: (
      <CartScreen
        crossHandler={() => setselectedScreen('MainScreen')}
        onPressPayNow={() => {
          setFromWhichCart('Product');
          setselectedScreen('CartAmountPayBy');
          setComingScreen('CartScreen');
          dispatch(getDrawerSessions());
        }}
        addNotesHandler={addNotesHandler}
        addDiscountHandler={addDiscountHandler}
        getScreen={(value) => getScreenFunction(value)}
        addProductscreenShow={() => setselectedScreen('AddProductScreen')}
      />
    ),

    ['CartServiceScreen']: (
      <CartServiceScreen
        crossHandler={() => setselectedScreen('MainScreen')}
        onPressPayNow={() => {
          setFromWhichCart('Service');
          setselectedScreen('CartAmountPayBy');
          setComingScreen('CartServiceScreen');
          dispatch(getDrawerSessions());
        }}
        addNotesHandler={() => setAddServiceNotes(true)}
        addDiscountHandler={() => setAddServiceDiscount(true)}
        getScreen={(value) => getScreenFunction(value)}
        addServiceScreenShow={() => setselectedScreen('AddServiceScreen')}
      />
    ),
    ['CartAmountTips']: (
      <CartAmountTips
        onPressBack={() => setselectedScreen('MainScreen')}
        onPressContinue={(tip) => {
          setTipAmount(tip);
          setselectedScreen('CartAmountPayBy');
        }}
        sellerID={sellerID}
        cartType={fromWhichCart}
        onPressNoTips={() => setselectedScreen('CartAmountPayBy')}
      />
    ),
    ['CartAmountPayBy']: (
      <CartAmountPayBy
        onPressBack={() =>
          comingScreen === 'CartScreen'
            ? setselectedScreen('CartScreen')
            : setselectedScreen('CartServiceScreen')
        }
        tipAmount={tipAmount}
        onPressPaymentMethod={(item) => {
          if (item.index === 0) {
            setselectedScreen('PayByCash');
          } else if (item.index === 1) {
            setselectedScreen('PayByJBRCoins');
          } else if (item.index === 2) {
            setselectedScreen('PayByCard');
          }
        }}
        selectValueTake={(paymentSelect, tipSelect) => {
          // console.log('------', paymentSelect, tipSelect);
          setSelectTips(tipSelect);
        }}
        payNowByphone={(tip) => {
          selectTipAmount(tip);
        }}
        cartid={cartID2}
        cartType={fromWhichCart}
        onPressContinue={(cartData, data) => {
          setpaymentMethod('Jbr');
          setSavedTempCartData(cartData?.getAllCart);
          setselectedScreen('FinalPaymentScreen');
          setCashPayDetail(data);
        }}
        onPressServiceContinue={(cartData, data) => {
          setpaymentMethod('Jbr');
          setSavedTempCartData(cartData?.getserviceCart);
          setselectedScreen('FinalPaymentScreen');
          setCashPayDetail(data);
        }}
        tipsSelected={selectTips}
      />
    ),
    ['PayByCard']: (
      <PayByCard
        tipAmount={tipAmount}
        onPressBack={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        // onPressContinue={() => {
        //   setpaymentMethod('Card');
        //   setselectedScreen('FinalPaymentScreen');
        // }}
        cartType={fromWhichCart}
      />
    ),
    ['PayByCash']: (
      <PayByCash
        tipAmount={tipAmount}
        onPressBack={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        onPressContinue={(cartData, data) => {
          setpaymentMethod('Cash');
          setSavedTempCartData(cartData?.getAllCart);
          setselectedScreen('FinalPaymentScreen');
          setCashPayDetail(data);
        }}
        onPressServiceContinue={(cartData, data) => {
          setpaymentMethod('Cash');
          setSavedTempCartData(cartData?.getserviceCart);
          setselectedScreen('FinalPaymentScreen');
          setCashPayDetail(data);
        }}
        cartDatas={savedTempCartData}
        cartType={fromWhichCart}
        // tipsSelected={selectTips}
      />
    ),
    // ['PayByJBRCoins']: (
    //   <PayByJBRCoins
    //     tipAmount={tipAmount}
    //     onPressBack={() => {
    //       setselectedScreen('CartAmountPayBy');
    //     }}
    //     onPressContinue={(cartData, data) => {
    //       setpaymentMethod('JBRCoins');
    //       setSavedTempCartData(cartData?.getAllCart);
    //       setselectedScreen('FinalPaymentScreen');
    //       setCashPayDetail(data);
    //     }}
    //   />
    // ),
    ['FinalPaymentScreen']: (
      <FinalPaymentScreen
        tipAmount={tipAmount}
        onPressBack={() => setselectedScreen('MainScreen')}
        paymentMethod={paymentMethod}
        cartData={savedTempCartData}
        payDetail={cashPayDetail}
        cartType={fromWhichCart}
      />
    ),
    ['AddProductScreen']: (
      <AddProductScreen
        backHandler={() =>
          getRetailData?.addProductFrom == 'main'
            ? (setselectedScreen('MainScreen'), getScreenFunction('Product'))
            : setselectedScreen('CartScreen')
        }
      />
    ),
    ['AddServiceScreen']: (
      <AddServiceScreen
        backHandler={() =>
          getRetailData?.addServiceFrom == 'main'
            ? (setselectedScreen('MainScreen'), getScreenFunction('Service'))
            : setselectedScreen('CartServiceScreen')
        }
      />
    ),
  };

  const screenChangeView = () => {
    return renderScreen[selectedScreen];
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{screenChangeView()}</View>

      {isLoading ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
        </View>
      ) : null}

      <Modal animationType="fade" transparent={true} isVisible={addNotes || addDiscount}>
        <KeyboardAvoidingView
        // style={{ flex: 1 }}
        // behavior={Platform.OS === 'ios' ? 'padding' : 100}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
        >
          <ScrollView>
            {addDiscount ? (
              <View style={[styles.addNotesCon, styles.addDiscountConPop]}>
                <View style={[styles.addCartDetailConHeader, styles.addCartDetailConHeader2]}>
                  <Text style={styles.jacketName}>Add Discount</Text>
                  <TouchableOpacity onPress={() => setAddDiscount(false)}>
                    <Image source={crossButton} style={styles.crossBg} />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(15)} />
                <AddDiscountToCart
                  amountDis={amountDis}
                  setAmountDis={setAmountDis}
                  percentDis={percentDis}
                  setPercentDis={setPercentDis}
                  discountCode={discountCode}
                  setDiscountCode={setDiscountCode}
                  descriptionDis={descriptionDis}
                  setDescriptionDis={setDescriptionDis}
                  setValue={setValue}
                  value={value}
                  clearInput={clearInput}
                  amountCheck={amountCheck}
                  setAmountCheck={setAmountCheck}
                  percentageCheck={percentageCheck}
                  setPercentageCheck={setPercentageCheck}
                  discountCheck={discountCheck}
                  setDiscountCheck={setDiscountCheck}
                />
                <Spacer space={SH(10)} />
                <TouchableOpacity
                  style={styles.addDiscountcon}
                  onPress={() => saveDiscountHandler()}
                >
                  <Text style={[styles.holdCart, { color: COLORS.white }]}>Add Discount</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.addNotesCon, styles.addNotesCon2]}>
                <View style={[styles.addCartDetailConHeader, styles.addCartDetailConHeader2]}>
                  <Text style={styles.jacketName}>Add Notes</Text>
                  <TouchableOpacity onPress={() => setAddNotes(false)}>
                    <Image source={crossButton} style={styles.crossBg} />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(15)} />
                <TextInput
                  style={styles.addNotesInput1}
                  onChangeText={setNotes}
                  value={notes}
                  placeholder="Add Notes"
                  multiline={true}
                  placeholderTextColor={COLORS.light_purple}
                />
                <Spacer space={SH(15)} />
                <TouchableOpacity style={styles.addDiscountcon} onPress={() => saveNotesHandler()}>
                  <Text style={[styles.holdCart, { color: COLORS.white }]}>Add Notes</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={addServiceNotes || addServiceDiscount}
      >
        <KeyboardAvoidingView
        // style={{ flex: 1 }}
        // behavior={Platform.OS === 'ios' ? 'padding' : 100}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
        >
          <ScrollView>
            {addServiceDiscount ? (
              <View style={[styles.addNotesCon, styles.addDiscountConPop]}>
                <View style={[styles.addCartDetailConHeader, styles.addCartDetailConHeader2]}>
                  <Text style={styles.jacketName}>Add Discount</Text>
                  <TouchableOpacity onPress={() => setAddServiceDiscount(false)}>
                    <Image source={crossButton} style={styles.crossBg} />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(15)} />
                <AddDiscountToCart
                  amountDis={serviceAmountDis}
                  setAmountDis={setServiceAmountDis}
                  percentDis={servicePercentDis}
                  setPercentDis={setServicePercentDis}
                  discountCode={serviceDiscountCode}
                  setDiscountCode={setServiceDiscountCode}
                  descriptionDis={serviceDescriptionDis}
                  setDescriptionDis={setServiceDescriptionDis}
                  setValue={setServiceValue}
                  value={serviceValue}
                  clearInput={clearServiceInput}
                  amountCheck={serviceAmountCheck}
                  setAmountCheck={setServiceAmountCheck}
                  percentageCheck={servicePercentageCheck}
                  setPercentageCheck={setServicePercentageCheck}
                  discountCheck={serviceDiscountCheck}
                  setDiscountCheck={setServiceDiscountCheck}
                />
                <Spacer space={SH(10)} />
                <TouchableOpacity
                  style={[styles.holdCartCon, styles.addNotesBtn, { borderWidth: 0 }]}
                  onPress={() => saveServiceDiscountHandler()}
                  // onPress={() => saveDiscountHandler()}
                >
                  <Text style={[styles.holdCart, { color: COLORS.white }]}>Add Discount</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.addNotesCon, styles.addNotesCon2]}>
                <View style={[styles.addCartDetailConHeader, styles.addCartDetailConHeader2]}>
                  <Text style={styles.jacketName}>Add Notes</Text>
                  <TouchableOpacity onPress={() => setAddServiceNotes(false)}>
                    <Image source={crossButton} style={styles.crossBg} />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(15)} />
                <TextInput
                  style={styles.addNotesInput1}
                  onChangeText={setServiceNotes}
                  value={serviceNotes}
                  placeholder="Add Notes"
                  multiline={true}
                  placeholderTextColor={COLORS.light_purple}
                />
                <Spacer space={SH(15)} />
                <TouchableOpacity
                  style={[styles.holdCartCon, styles.addNotesBtn]}
                  // onPress={() => saveServiceNotesHandler()}
                  onPress={() => {
                    if (!serviceNotes) {
                      alert(strings.posSale.pleaseAddNotes);
                    } else {
                      const data = {
                        cartId: servicCartId,
                        notes: serviceNotes,
                      };
                      // dispatch(addServiceNotescart(data));
                      dispatch(addNotescart(data));
                      setServiceNotes('');
                      setAddServiceNotes(false);
                    }
                  }}
                >
                  <Text style={[styles.holdCart, { color: COLORS.white }]}>Add Notes</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </ScreenWrapper>
  );
}
