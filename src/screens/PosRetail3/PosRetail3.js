import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { AddDiscountToCart, ScreenWrapper, Spacer } from '@/components';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
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
  customerNumber,
  getAllCart,
  getServiceCart,
} from '@/actions/RetailAction';
import { useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { COLORS, SH } from '@/theme';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { crossButton } from '@/assets';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { strings } from '@/localization';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export function PosRetail3() {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getCartAmount = getRetailData?.getAllCart?.amount;
  const cartID2 = getRetailData?.getAllCart?.id;
  const cartData = getRetailData?.getAllCart;

  const finalAmountForDiscount =
    cartData?.amount?.products_price.toFixed(2) - cartData?.amount?.tax.toFixed(2);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const defaultArrayproduct = getRetailData?.getProductDefault;
  const categoryArray = getRetailData?.categoryList;
  const [selectedScreen, setselectedScreen] = useState('MainScreen');

  const [paymentMethod, setpaymentMethod] = useState('Cash');
  const [addNotes, setAddNotes] = useState(false);
  const [notes, setNotes] = useState(getRetailData?.getAllCart?.notes);
  const [addDiscount, setAddDiscount] = useState(false);
  const [page, setPage] = useState(1);
  const [tipAmount, selectTipAmount] = useState();

  const [savedTempCartData, setSavedTempCartData] = useState(null);
  const getCart = getRetailData?.getAllCart;

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
  const [cashPayDetail, setCashPayDetail] = useState();

  useEffect(() => {
    dispatch(getAllCart());
    dispatch(getServiceCart());
  }, [isFocus]);
  useEffect(() => {
    setNotes(getCart?.notes);
    setDescriptionDis(getCart?.discount_desc);
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
    if (amountDis > finalAmountForDiscount || percentDis > finalAmountForDiscount) {
      Toast.show({
        text2: 'Please enter discount less then total amount',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (!cartID2) {
      Toast.show({
        text2: strings.posSale.addItemCart,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (value === '') {
      Toast.show({
        text2: strings.posSale.discountType,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (!amountDis && !percentDis && !discountCode) {
      Toast.show({
        text2: strings.posSale.enterfield,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else if (!descriptionDis) {
      Toast.show({
        text2: strings.posSale.selectDisTitle,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      const data = {
        amountDis: amountDis,
        percentDis: percentDis,
        discountCode: discountCode,
        value: value,
        cartId: cartID2,
        orderAmount: getCartAmount?.total_amount,
        descriptionDis: descriptionDis,
        // descriptionDis:'discount title'
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
      ],
      state
    )
  );

  const renderScreen = {
    ['MainScreen']: (
      <MainScreen
        cartScreenHandler={() => setselectedScreen('CartScreen')}
        sellerID={sellerID}
        headercrossHandler={() => alert('abc')}
        checkOutHandler={() => setselectedScreen('CartScreen')}
        productArray={defaultArrayproduct}
        categoryArray={categoryArray}
        addNotesHandler={addNotesHandler}
        addDiscountHandler={addDiscountHandler}
        onPressPayNow={() => {
          setselectedScreen('CartAmountTips');
        }}
        cartServiceScreenHandler={() => setselectedScreen('CartServiceScreen')}
      />
    ),
    ['CartScreen']: (
      <CartScreen
        crossHandler={() => setselectedScreen('MainScreen')}
        onPressPayNow={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        addNotesHandler={addNotesHandler}
        addDiscountHandler={addDiscountHandler}
      />
    ),

    ['CartServiceScreen']: (
      <CartServiceScreen
        crossHandler={() => setselectedScreen('MainScreen')}
        onPressPayNow={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        addNotesHandler={addNotesHandler}
        addDiscountHandler={addDiscountHandler}
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
        onPressNoTips={() => setselectedScreen('CartAmountPayBy')}
      />
    ),
    ['CartAmountPayBy']: (
      <CartAmountPayBy
        onPressBack={() => setselectedScreen('CartScreen')}
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
        payNowByphone={(tip) => {
          selectTipAmount(tip);
        }}
        cartid={cartID2}
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
        cartDatas={savedTempCartData}
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
                  style={[styles.holdCartCon, styles.addNotesBtn]}
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
                {/* <Text style={styles.addNotes}>Add notes</Text>
          <Spacer space={SH(6)} /> */}
                <TextInput
                  style={styles.addNotesInput}
                  onChangeText={setNotes}
                  value={notes}
                  placeholder="Add Notes"
                  multiline={true}
                />
                <Spacer space={SH(15)} />
                <TouchableOpacity
                  style={[styles.holdCartCon, styles.addNotesBtn]}
                  onPress={() => saveNotesHandler()}
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
