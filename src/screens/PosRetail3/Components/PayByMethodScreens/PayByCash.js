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
import { Fonts, barcode } from '@/assets';
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
  const getRetailData = useSelector(getRetail);
  const cartData =
    cartType == 'Product' ? getRetailData?.getAllCart : getRetailData?.getserviceCart;
  const [amount, setAmount] = useState();
  const [selectedId, setSelectedId] = useState(1);
  const [cashRate, setCashRate] = useState();
  const cartProducts = cartDatas?.poscart_products;
  const getAuthdata = useSelector(getAuthData);
  const merchantDetails = getAuthdata?.merchantLoginData?.user;

  useEffect(() => {
    setCashRate(selectCashArray[0].usd);
  }, []);

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    return totalPayment.toFixed(2);
  };

  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];
  const customer = getuserDetailByNo?.[0];

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
    } else {
      const data = {
        serviceCartId: cartData.id,
        tips: amount === undefined || amount === '' ? cashRate : amount,
        modeOfPayment: 'cash',
      };
      const callback = (response) => {
        if (response) {
          onPressServiceContinue(saveCartData, data);
        }
      };
      dispatch(createServiceOrder(data, callback));
    }
  };
  const renderItem = ({ item }) => {
    const borderColor = item.id === selectedId ? COLORS.primary : COLORS.transparentBlue;

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id), setCashRate(item.usd);
        }}
        borderColor={borderColor}
      />
    );
  };

  const Item = ({ item, onPress, borderColor, textColor, index }) => {
    const formattedNumber = (Math.round(item.usd * 100) / 100).toString();
    return (
      <TouchableOpacity
        style={[styles._boxView, { flexDirection: 'row', borderColor }]}
        onPress={onPress}
      >
        <Text style={styles._usdText}>$</Text>
        <Text style={[styles._usdText, { color: COLORS.primary }]}> {formattedNumber}</Text>
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
      usd: greaterNotes[0],
    },
    {
      id: 3,
      usd: greaterNotes[1],
    },
  ];

  return (
    <SafeAreaView style={styles._innerContainer}>
      <View style={styles.displayflex}>
        <View style={styles.leftCon}>
          <View style={[styles._topContainer]}>
            <BackButton
              onPress={onPressBack}
              title={'Back'}
              style={{
                top: ms(10),
                left: ms(-10),
                backgroundColor: 'transparent',
              }}
            />
          </View>

          <View
            style={{
              marginTop: ms(20),
              paddingHorizontal: Platform.OS === 'ios' ? ms(30) : ms(70),
            }}
          >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles._totalAmountTitle}>Total Payable Amount:</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles._dollarSymbol}>$</Text>
                <Text style={styles._amount}>{totalPayAmount()}</Text>
              </View>
            </View>
            <View style={styles._bottomContainer}>
              <View style={{ margin: ms(10), alignItems: 'center' }}>
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
                  />
                </View>

                <View style={styles._inputMain}>
                  <View style={styles._inputSubView}>
                    <TextInput
                      placeholder="Other Amount"
                      keyboardType="number-pad"
                      style={styles._inputCashContainer}
                      value={amount}
                      onChangeText={setAmount}
                    />
                  </View>
                </View>
                <Button
                  onPress={() => {
                    // onPressContinue
                    createOrderHandler();
                  }}
                  title={'Continue'}
                  style={{
                    height: ms(40),
                    width: '98%',
                    marginTop: ms(10),
                    backgroundColor:
                      amount || selectedId ? COLORS.primary : COLORS.textInputBackground,
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
                data={cartData?.poscart_products}
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
              <Text style={styles._subTotalPrice}>${cartData?.amount?.discount}</Text>
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
            <Text style={styles._commonPayTitle}>
              {' '}
              {moment().format('ddd DD MMM, YYYY')} {moment().format('hh:mm A')}
            </Text>
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
    </SafeAreaView>
  );
};
