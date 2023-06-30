import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AddDiscountToCart, ScreenWrapper, Spacer } from '@/components';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import {
  CartAmountPayBy,
  CartAmountTips,
  CartScreen,
  CustomHeader,
  FinalPaymentScreen,
  MainScreen,
  PayByCard,
  PayByCash,
  PayByJBRCoins,
} from './Components';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import Modal from 'react-native-modal';
import {
  addDiscountToCart,
  addNotescart,
  getAllCart,
  getCategory,
  getProductDefault,
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

export function PosRetail() {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getCartAmount = getRetailData?.getAllCart?.amount;
  const cartID2 = getRetailData?.getAllCart?.id;
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const defaultArrayproduct = getRetailData?.getProductDefault;
  const categoryArray = getRetailData?.categoryList;

  const [selectedScreen, setselectedScreen] = useState('MainScreen');
  const [paymentMethod, setpaymentMethod] = useState('Cash');
  const [tipAmount, setTipAmount] = useState(0.0);
  const [addNotes, setAddNotes] = useState(false);
  const [notes, setNotes] = useState(getRetailData?.getAllCart?.notes);
  const [addDiscount, setAddDiscount] = useState(false);

  const [savedTempCartData, setSavedTempCartData] = useState(null);

  const [amountDis, setAmountDis] = useState('');
  const [percentDis, setPercentDis] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [descriptionDis, setDescriptionDis] = useState('');
  const [value, setValue] = useState('');
  const [amountCheck, setAmountCheck] = useState(false);
  const [percentageCheck, setPercentageCheck] = useState(false);
  const [discountCheck, setDiscountCheck] = useState(false);
  const [cashPayDetail, setCashPayDetail] = useState();
  useEffect(() => {
    setNotes(getRetailData?.getAllCart?.notes);
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
    if (!cartID2) {
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
        // descriptionDis: descriptionDis,
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

  useEffect(() => {
    dispatch(getProductDefault(sellerID));
    dispatch(getCategory(sellerID));
    dispatch(getAllCart());
  }, [isFocus]);

  const isLoading = useSelector(state =>
    isLoadingSelector(
      [
        TYPES.GET_ONE_PRODUCT,
        TYPES.ADDCART,
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
      ],
      state
    )
  );

  const renderScreen = {
    ['MainScreen']: (
      <MainScreen
        headercrossHandler={() => alert('abc')}
        checkOutHandler={() => setselectedScreen('CartScreen')}
        productArray={defaultArrayproduct}
        categoryArray={categoryArray}
        sellerID={sellerID}
        addNotesHandler={addNotesHandler}
        addDiscountHandler={addDiscountHandler}
      />
    ),
    ['CartScreen']: (
      <CartScreen
        crossHandler={() => setselectedScreen('MainScreen')}
        onPressPayNow={() => {
          setselectedScreen('CartAmountTips');
        }}
        addNotesHandler={addNotesHandler}
        addDiscountHandler={addDiscountHandler}
      />
    ),
    ['CartAmountTips']: (
      <CartAmountTips
        onPressBack={() => setselectedScreen('CartScreen')}
        onPressContinue={tip => {
          setTipAmount(tip);
          setselectedScreen('CartAmountPayBy');
        }}
        sellerID={sellerID}
        onPressNoTips={() => setselectedScreen('CartAmountPayBy')}
      />
    ),
    ['CartAmountPayBy']: (
      <CartAmountPayBy
        onPressBack={() => setselectedScreen('CartAmountTips')}
        tipAmount={tipAmount}
        onPressPaymentMethod={item => {
          if (item.index === 0) {
            setselectedScreen('PayByCard');
          } else if (item.index === 1) {
            setselectedScreen('PayByJBRCoins');
          } else if (item.index === 2) {
            setselectedScreen('PayByCash');
          }
        }}
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
      />
    ),
    ['PayByJBRCoins']: (
      <PayByJBRCoins
        tipAmount={tipAmount}
        onPressBack={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        onPressContinue={(cartData, data) => {
          setpaymentMethod('JBRCoins');
          setSavedTempCartData(cartData?.getAllCart);
          setselectedScreen('FinalPaymentScreen');
          setCashPayDetail(data);
        }}
      />
    ),
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
          <ActivityIndicator
            color={COLORS.primary}
            size="large"
            style={styles.loader}
          />
        </View>
      ) : null}

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={addNotes || addDiscount}
      >
        <KeyboardAvoidingView
        // style={{ flex: 1 }}
        // behavior={Platform.OS === 'ios' ? 'padding' : 100}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
        >
          <ScrollView>
            {addDiscount ? (
              <View style={[styles.addNotesCon, styles.addDiscountConPop]}>
                <View
                  style={[
                    styles.addCartDetailConHeader,
                    styles.addCartDetailConHeader2,
                  ]}
                >
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
                  <Text style={styles.holdCart}>Add Discount</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={[styles.addNotesCon, styles.addNotesCon2]}>
                <View
                  style={[
                    styles.addCartDetailConHeader,
                    styles.addCartDetailConHeader2,
                  ]}
                >
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
                  <Text style={styles.holdCart}>Add Notes</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </ScreenWrapper>
  );
}
