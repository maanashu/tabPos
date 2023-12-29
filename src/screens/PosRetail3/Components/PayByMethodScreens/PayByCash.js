import {
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ms } from 'react-native-size-matters';
import { Button, Spacer } from '@/components';
import { Fonts, barcode, logo_full } from '@/assets';
import moment from 'moment';
import BackButton from '@/components/BackButton';
import { styles } from '../../PosRetail3.styles';
import { COLORS, SH } from '@/theme';
import { getRetail } from '@/selectors/RetailSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, createServiceOrder } from '@/actions/RetailAction';
import AddedCartItemsCard from '@/components/AddedCartItemsCard';
import { number } from 'prop-types';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import { amountFormat, formattedReturnPrice } from '@/utils/GlobalMethods';
import { CustomHeader } from '../CustomHeader';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { FullScreenLoader } from '@mPOS/components';

moment.suppressDeprecationWarnings = true;

export const PayByCash = ({
  onPressBack,
  onPressContinue,
  onPressServiceContinue,
  tipAmount,
  cartDatas,
  cartType,
}) => {
  const dispatch = useDispatch();
  const getUserData = useSelector(getUser);
  const getRetailData = useSelector(getRetail);
  // const cartData =
  //   cartType == 'Product' ? getRetailData?.getAllCart : getRetailData?.getserviceCart;
  const cartData = cartType == 'Product' ? getRetailData?.getAllCart : getRetailData?.getAllCart;
  const [amount, setAmount] = useState();
  const [selectedId, setSelectedId] = useState(1);
  const [cashRate, setCashRate] = useState();
  const cartProducts = cartDatas?.poscart_products;
  const getAuthdata = useSelector(getAuthData);
  const merchantDetails = getAuthdata?.merchantLoginData?.user;

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    // const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    const totalPayment = parseFloat(cartAmount);
    return totalPayment.toFixed(2);
    // return amountFormat(totalPayment);
  };

  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];
  const customer = getuserDetailByNo?.[0];

  const invoiceData = [
    {
      title: 'Payment Option',
      data: 'Cash',
      id: 1,
    },
    {
      title: 'Date',
      data: moment().format('ddd') + ' ' + moment().format('L'),
      id: 2,
    },
    {
      title: 'Mode',
      data: 'Walk-In',
      id: 3,
    },
    {
      title: 'POS No.',
      data: getUserData?.posLoginData?.pos_number,
      id: 4,
    },
    {
      title: 'User ID',
      data: getUserData?.posLoginData?.id,
      id: 5,
    },
  ];

  const saveCartData = { ...getRetailData };
  const valueTen = '10.00';
  const valueTwenty = '20.00';
  const roundUpValue = (value) => {
    if (value <= 12.96) {
      return 20;
    } else if (value <= 15) {
      return 20;
    } else {
      // Default to rounding to the nearest 10 (30 for values > 21)
      return Math.ceil(value / 10) * 10;
    }
  };

  const isLoadingUpdateCartByTip = useSelector((state) =>
    isLoadingSelector([TYPES.UPDATE_CART_BY_TIP], state)
  );
  const isLoadingCreateOrder = useSelector((state) =>
    isLoadingSelector([TYPES.CREATE_ORDER], state)
  );
  const isLoadingGetCart = useSelector((state) => isLoadingSelector([TYPES.GET_ALL_CART], state));

  const createOrderHandler = () => {
    if (cartType == 'Product') {
      const data = {
        cartid: cartData.id,
        tips: amount === undefined || amount === '' ? cashRate : amount,
        modeOfPayment: 'cash',
      };
      const callback = (response) => {
        if (response) {
          onPressContinue(saveCartData, data);
        }
      };
      dispatch(createOrder(data, callback));
      setCashRate(localyPay?.usd);
    } else {
      // const data = {
      //   serviceCartId: cartData.id,
      //   tips: amount === undefined || amount === '' ? cashRate : amount,
      //   modeOfPayment: 'cash',
      // };
      // const callback = (response) => {
      //   if (response) {
      //     onPressServiceContinue(saveCartData, data);
      //   }
      // };
      // dispatch(createServiceOrder(data, callback));
      // setCashRate(localyPay?.usd);
      const data = {
        cartid: cartData.id,
        tips: amount === undefined || amount === '' ? cashRate : amount,
        modeOfPayment: 'cash',
      };
      const callback = (response) => {
        if (response) {
          onPressContinue(saveCartData, data);
        }
      };
      dispatch(createOrder(data, callback));
      setCashRate(localyPay?.usd);
    }
  };
  // const createOrderHandler = () => {
  //   if (cartType == 'Product') {
  //     const data = {
  //       cartid: cartData.id,
  //       tips: amount === undefined || amount === '' ? cashRate : amount,
  //       modeOfPayment: 'cash',
  //     };
  //     const callback = (response) => {
  //       if (response) {
  //         onPressContinue(saveCartData, data);
  //       }
  //     };
  //     dispatch(createOrder(data, callback));
  //     setCashRate(localyPay?.usd);
  //   } else {
  //     const data = {
  //       serviceCartId: cartData.id,
  //       tips: amount === undefined || amount === '' ? cashRate : amount,
  //       modeOfPayment: 'cash',
  //     };
  //     const callback = (response) => {
  //       if (response) {
  //         onPressServiceContinue(saveCartData, data);
  //       }
  //     };
  //     dispatch(createServiceOrder(data, callback));
  //     setCashRate(localyPay?.usd);
  //   }
  // };
  const renderItem = ({ item }) => {
    const borderColor = item.id === selectedId ? COLORS.navy_blue : COLORS.transparentBlue;

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setCashRate(item.usd);
          setlocalyPay(item);
        }}
        borderColor={borderColor}
      />
    );
  };

  const Item = ({ item, onPress, borderColor, textColor, index }) => {
    const formattedNumber = amountFormat(Math.round(item.usd * 100) / 100);
    // const formattedNumber = (Math.round(item.usd * 100) / 100).toFixed(2);
    return (
      <TouchableOpacity
        style={[styles._boxView, { flexDirection: 'row', borderColor }]}
        onPress={onPress}
      >
        {/* <Text style={styles._usdText}>$</Text> */}
        <Text style={[styles._usdText, { color: COLORS.navy_blue }]}>{formattedNumber}</Text>
      </TouchableOpacity>
    );
  };

  function findGreaterCurrencyNotes(targetValue, currencyNotes) {
    const greaterNotes = currencyNotes.filter((note) => note > targetValue);
    return greaterNotes;
  }

  const currencyNotes = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 5000];
  const targetValue = totalPayAmount();
  const greaterNotes = findGreaterCurrencyNotes(targetValue, currencyNotes);

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
  const [localyPay, setlocalyPay] = useState(selectCashArray?.[0]);

  useEffect(() => {
    setCashRate(
      selectedId === 1
        ? selectCashArray?.[0]?.usd
        : selectedId === 2
        ? selectCashArray?.[1]?.usd
        : selectCashArray?.[2]?.usd
    );
  }, [selectedId, selectCashArray]);

  return (
    <SafeAreaView style={styles._innerContainer}>
      <CustomHeader />

      <View style={[styles.displayflex, { flex: 1 }]}>
        <View style={[styles.leftCon, { height: '100%' }]}>
          <BackButton
            onPress={onPressBack}
            title={'Back'}
            style={{
              // top: ms(10),
              // left: ms(10),
              backgroundColor: 'transparent',
            }}
          />

          <View
            style={{
              marginTop: ms(40),
              paddingHorizontal: ms(20),
            }}
          >
            {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles._totalAmountTitle}>Total Payable Amount:</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles._dollarSymbol}>$</Text>
                <Text style={styles._amount}>{totalPayAmount()}</Text>
              </View>
            </View> */}
            <View style={styles._bottomContainer}>
              <View style={{ margin: ms(10) }}>
                <Text style={styles._selectTips}>Received Amount</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: ms(10),
                    justifyContent: 'space-between',
                  }}
                >
                  <FlatList
                    data={selectCashArray}
                    extraData={selectCashArray}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    horizontal
                    scrollEnabled={false}
                    contentContainerStyle={{
                      flex: 1,
                      justifyContent: 'space-between',
                    }}
                  />
                </View>

                <TextInput
                  placeholder="Other Amount"
                  keyboardType="number-pad"
                  style={styles._inputOtherAmount}
                  value={amount}
                  onChangeText={setAmount}
                  placeholderTextColor={COLORS.navy_blue}
                />

                {/* <View style={[styles._inputMain, { borderWidth: 1 }]}>
                  
                </View> */}
                <Button
                  onPress={() => {
                    // onPressContinue
                    createOrderHandler();
                  }}
                  title={'Continue'}
                  style={{
                    borderRadius: ms(22),
                    height: ms(40),
                    width: '100%',
                    marginTop: ms(10),
                    backgroundColor:
                      amount || selectedId ? COLORS.navy_blue : COLORS.textInputBackground,
                  }}
                  textStyle={{
                    fontFamily: Fonts.SemiBold,
                    color: amount || selectedId ? COLORS.white : COLORS.dark_grey,
                  }}
                />
              </View>
            </View>
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
                // data={
                //   cartType == 'Product'
                //     ? cartData?.poscart_products
                //     : cartData?.appointment_cart_products
                // }
                data={
                  cartType == 'Product' ? cartData?.poscart_products : cartData?.poscart_products
                }
                style={{ width: '100%' }}
                renderItem={({ item, index }) => <AddedCartItemsCard item={item} index={index} />}
              />
            </View>

            <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
              <FlatList
                data={invoiceData}
                numColumns={3}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      width: ms(58),
                      height: ms(30),
                      justifyContent: 'space-between',
                      marginTop: ms(15),
                    }}
                  >
                    <Text style={styles._payTitle}>{item.title}</Text>
                    <Spacer space={SH(7)} />
                    <Text style={styles._paySubTitle}>{item.data}</Text>
                  </View>
                )}
              />
            </View>
            <Spacer space={SH(10)} />
            <View style={[styles._horizontalLine, { width: '100%', borderStyle: 'dashed' }]} />
            <Spacer space={SH(15)} />
            <View style={{ width: '85%', alignSelf: 'center' }}>
              <View style={styles._subTotalContainer}>
                <Text style={styles._payTitle}>Sub-Total</Text>
                <Text style={styles._payTitle}>
                  {amountFormat(cartData?.amount?.products_price)}
                </Text>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._payTitle}>Discount</Text>
                <Text style={styles._payTitle}>
                  {formattedReturnPrice(cartData?.amount?.discount)}
                </Text>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._payTitle}>Tips</Text>
                {/* <Text style={styles._payTitle}>${tipamount.toFixed(2) ?? '0.00'}</Text> */}
                <Text style={styles._payTitle}>{amountFormat(cartData?.amount?.tip)}</Text>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._payTitle}>Total Taxes</Text>
                <Text style={styles._payTitle}>{amountFormat(cartData?.amount?.tax)} </Text>
              </View>
              <Spacer space={SH(15)} />
              <View style={styles._subTotalContainer}>
                <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                  Total
                </Text>
                <View style={styles.totalView}>
                  <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                    {/* ${totalPayAmount() ?? '0.00'}
                     */}
                    {amountFormat(totalPayAmount())}
                  </Text>
                </View>
              </View>
              <Spacer space={SH(15)} />
              <Image source={logo_full} style={styles.logoFull} />
              <Image
                source={{ uri: cartData?.barcode } ?? barcode}
                style={[styles._barCodeImage, { alignSelf: 'center' }]}
              />
            </View>
          </View>
        </View>
      </View>
      {(isLoadingUpdateCartByTip || isLoadingCreateOrder || isLoadingGetCart) && (
        <FullScreenLoader />
      )}
    </SafeAreaView>
  );
};
