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
import { digitWithDot } from '@/utils/validators';
import { CustomErrorToast } from '@mPOS/components/Toast';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';
import { createOrder, createServiceOrder } from '@/actions/RetailAction';

const PayByCash = ({ payByCashRef, payByCashhandler, payByCashCrossHandler }) => {
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const presentCart = retailData?.cartFrom;
  // const cartData = presentCart === 'product' ? retailData?.getAllCart : retailData?.getserviceCart;
  const cartData = presentCart === 'product' ? retailData?.getAllCart : retailData?.getAllCart;

  const productDetail = retailData?.getOneProduct;
  const attributeArray = productDetail?.product_detail?.supplies?.[0]?.attributes;
  const [keyboardStatus, setKeyboardStatus] = useState('60%');
  const snapPoints = useMemo(() => [keyboardStatus], [keyboardStatus]);
  const [selectedId, setSelectedId] = useState(1);
  const saveCartData = cartData;
  const [amount, setAmount] = useState();

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    // const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    const totalPayment = parseFloat(cartAmount);
    return totalPayment.toFixed(2);
  };

  function findGreaterCurrencyNotes(targetValue, currencyNotes) {
    const greaterNotes = currencyNotes.filter((note) => note > targetValue);
    return greaterNotes;
  }

  const currencyNotes = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 5000];
  const targetValue = totalPayAmount();
  const greaterNotes = findGreaterCurrencyNotes(targetValue, currencyNotes);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('90%');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('60%');
    });
  }, []);

  const isLoad = useSelector((state) =>
    isLoadingSelector(
      [TYPES.GET_ALL_CART, TYPES.CREATE_ORDER, TYPES.CREATE_SERVICE_ORDER, TYPES.GET_SERVICE_CART],
      state
    )
  );

  // const createOrderHandler = () => {
  //   if (amount && digitWithDot.test(amount) === false) {
  //     CustomErrorToast({ message: 'Please enter valid amount' });
  //   } else {
  //     if (presentCart === 'product') {
  //       const data = {
  //         cartid: cartData.id,
  //         tips: amount === undefined || amount === '' ? cashRate : amount,
  //         modeOfPayment: 'cash',
  //       };
  //       const callback = (response) => {
  //         if (response) {
  //           payByCashhandler(saveCartData, data);
  //         }
  //       };
  //       dispatch(createOrder(data, callback));
  //     } else {
  //       const data = {
  //         serviceCartId: cartData.id,
  //         tips: amount === undefined || amount === '' ? cashRate : amount,
  //         modeOfPayment: 'cash',
  //       };
  //       const callback = (response) => {
  //         if (response) {
  //           payByCashhandler(saveCartData, data);
  //         }
  //       };
  //       dispatch(createServiceOrder(data, callback));
  //     }
  //   }
  // };
  const createOrderHandler = () => {
    if (amount && digitWithDot.test(amount) === false) {
      CustomErrorToast({ message: 'Please enter valid amount' });
    } else {
      const data = {
        cartid: cartData.id,
        tips: amount === undefined || amount === '' ? cashRate : amount,
        modeOfPayment: 'cash',
      };
      const callback = (response) => {
        if (response) {
          payByCashhandler(saveCartData, data);
        }
      };
      dispatch(createOrder(data, callback));
    }
  };

  const selectCashArray = [
    {
      id: 1,
      usd: totalPayAmount(),
    },
    {
      id: 2,
      usd: greaterNotes[0] <= 5000 ? greaterNotes[0] : totalPayAmount(),
    },
    {
      id: 3,
      usd: greaterNotes[1] <= 5000 ? greaterNotes[1] : totalPayAmount(),
    },
  ];
  const [cashRate, setCashRate] = useState(selectCashArray?.[0]?.usd);

  useEffect(() => {
    setCashRate(selectCashArray?.[0]?.usd);
  }, [cartData]);

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {
        setSelectedId(1);
        setAmount();
        setCashRate(selectCashArray?.[0]);
        payByCashCrossHandler();
      }}
      backdropOpacity={0.5}
      ref={payByCashRef}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      // stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <BottomSheetScrollView>
        <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
          <View style={styles.productHeaderCon}>
            <TouchableOpacity onPress={() => payByCashCrossHandler()}>
              <Image source={Images.cross} style={styles.crossImageStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.payableAmountCon}>
            <Text style={styles.payableAmount}>Total Payable Amount:</Text>
            <Text style={styles.darkPaybleAmount}>${totalPayAmount()}</Text>
          </View>
          <View style={styles.receivedAmountCon}>
            <Text style={styles.receivedAmountText}>Received Amount</Text>
            <View style={styles.cashSelectCon}>
              {selectCashArray?.map((item, index) => {
                const formattedNumber = (Math.round(item.usd * 100) / 100).toString();
                return (
                  <TouchableOpacity
                    style={[
                      styles.cashSelectBodyCon,
                      {
                        borderColor:
                          selectedId === item.id ? COLORS.primary : COLORS.textInputBackground,
                        backgroundColor:
                          selectedId === item.id ? COLORS.blue_shade : COLORS.textInputBackground,
                      },
                    ]}
                    onPress={() => {
                      setSelectedId(item.id);
                      setCashRate(item.usd);
                    }}
                  >
                    <Text style={styles.cashCardCoin}>${formattedNumber}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TextInput
              style={styles.otherAmountInput}
              placeholder="Other amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="number-pad"
            />

            <TouchableOpacity style={styles.payNowCon} onPress={createOrderHandler}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.payNowText}>{'Pay Now'}</Text>
                <Image source={Images.buttonArrow} style={styles.buttonArrow} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetScrollView>
      {isLoad && <FullScreenLoader />}
    </BottomSheetModal>
  );
};

export default PayByCash;

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
  payableAmountCon: {
    alignItems: 'center',
  },
  payableAmount: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(15),
  },
  darkPaybleAmount: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.primary,
    fontSize: ms(25),
    marginTop: ms(5),
  },

  payNowCon: {
    height: ms(50),
    backgroundColor: COLORS.primary,
    marginTop: ms(20),
    borderRadius: ms(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  payNowText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.white,
    fontSize: ms(13),
  },
  buttonArrow: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    marginLeft: ms(5),
  },
  borderBlue: {
    borderColor: COLORS.primary,
  },
  blueText: {
    color: COLORS.primary,
  },

  receivedAmountCon: {
    borderWidth: 1,
    borderColor: COLORS.solidGrey,
    flex: 1,
    marginVertical: ms(20),
    borderRadius: ms(5),
    paddingVertical: ms(20),
    paddingHorizontal: ms(10),
    // alignItems: "center",
  },
  receivedAmountText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(17),
    alignSelf: 'center',
  },
  cashSelectCon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: ms(20),
  },
  cashSelectBodyCon: {
    height: ms(60),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(5),
    // flexGrow: 0.3,
    flexGrow: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  cashCardCoin: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
  },
  otherAmountInput: {
    height: ms(50),
    borderWidth: 1,
    borderRadius: ms(5),
    paddingLeft: ms(10),
    borderColor: COLORS.solidGrey,
    color: COLORS.text,
    fontFamily: Fonts.Italic,
  },
});
