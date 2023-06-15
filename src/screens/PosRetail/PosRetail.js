import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';

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
  const cartID2 = getRetailData?.getAllCart?.id;
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const defaultArrayproduct = getRetailData?.getProductDefault;
  const categoryArray = getRetailData?.categoryList;

  const [selectedScreen, setselectedScreen] = useState('MainScreen');
  const [paymentMethod, setpaymentMethod] = useState('Cash');
  const [tipAmount, setTipAmount] = useState(0.0);
  const [addNotes, setAddNotes] = useState(false);
  const [notes, setNotes] = useState('');

  const [savedTempCartData, setSavedTempCartData] = useState(null);

  const isFocus = useIsFocused();

  const addNotesHandler = () => {
    setAddNotes(true);
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
        // TYPES.ADDCART,
        TYPES.GET_CLEAR_ALL_CART,
        TYPES.GET_ALL_CART,
        TYPES.GET_WALLET_PHONE,
        TYPES.GET_CLEAR_ONE_CART,
        TYPES.REQUEST_MONEY,
        TYPES.CREATE_ORDER,
        TYPES.ADDNOTES,
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
      />
    ),
    ['CartScreen']: (
      <CartScreen
        crossHandler={() => setselectedScreen('MainScreen')}
        onPressPayNow={() => {
          setselectedScreen('CartAmountTips');
        }}
        addNotesHandler={addNotesHandler}
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
        onPressContinue={cartData => {
          setpaymentMethod('Cash');
          setSavedTempCartData(cartData?.getAllCart);
          setselectedScreen('FinalPaymentScreen');
        }}
      />
    ),
    ['PayByJBRCoins']: (
      <PayByJBRCoins
        tipAmount={tipAmount}
        onPressBack={() => {
          setselectedScreen('CartAmountPayBy');
        }}
        onPressContinue={cartData => {
          setpaymentMethod('JBRCoins');
          setSavedTempCartData(cartData?.getAllCart);
          setselectedScreen('FinalPaymentScreen');
        }}
      />
    ),
    ['FinalPaymentScreen']: (
      <FinalPaymentScreen
        tipAmount={tipAmount}
        onPressBack={() => setselectedScreen('MainScreen')}
        paymentMethod={paymentMethod}
        cartData={savedTempCartData}
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

      <Modal animationType="fade" transparent={true} isVisible={addNotes}>
        <KeyboardAvoidingView
        // style={{ flex: 1 }}
        // behavior={Platform.OS === 'ios' ? 'padding' : 100}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
        >
          <ScrollView>
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
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </ScreenWrapper>
  );
}