import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { ms } from 'react-native-size-matters';
import { Button } from '@/components';
import { crossButton } from '@/assets';
import moment from 'moment';
import BackButton from '@/components/BackButton';
import { styles } from '../../PosRetail.styles';
import { COLORS } from '@/theme';
import { getRetail } from '@/selectors/RetailSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '@/actions/RetailAction';

export const PayByCash = ({ onPressBack, onPressContinue, tipAmount }) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  const [selectedId, setSelectedId] = useState(1);
  const [cashRate, setCashRate] = useState();

  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];
  const customer = getuserDetailByNo?.[0];

  const saveCartData = { ...getRetailData };
  const valueTen = 10;

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = parseFloat(cartAmount) + parseFloat(tipAmount);
    return totalPayment.toFixed(2);
  };

  const createOrderHandler = () => {
    const data = {
      cartid: getRetailData?.getAllCart?.id,
      userId: customer?.user_id,
      tips: tipAmount,
      modeOfPayment: 'cash',
    };
    console.log('data', data);
    const callback = response => {
      if (response) {
        onPressContinue(saveCartData);
      }
    };
    dispatch(createOrder(data, callback));
  };
  const renderItem = ({ item }) => {
    const borderColor =
      item.id === selectedId ? COLORS.primary : COLORS.transparentBlue;

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

  const Item = ({ item, onPress, borderColor, textColor }) => (
    <TouchableOpacity
      style={[styles._boxView, { flexDirection: 'row', borderColor }]}
      onPress={onPress}
    >
      <Text style={styles._usdText}>USD</Text>
      <Text style={[styles._usdText, { color: COLORS.primary }]}>
        {' '}
        ${item.usd}
      </Text>
    </TouchableOpacity>
  );

  const selectCashArray = [
    {
      id: 1,
      usd: totalPayAmount(),
    },
    {
      id: 2,
      usd: totalPayAmount(),
    },
    {
      id: 3,
      usd: totalPayAmount(),
    },
  ];

  return (
    <SafeAreaView style={styles._innerContainer}>
      <View
        style={[
          styles._topContainer,
          {
            justifyContent: 'center',
            marginLeft: ms(12),
          },
        ]}
      >
        <BackButton
          onPress={onPressBack}
          title={'Back'}
          style={{ top: ms(5), left: ms(0), backgroundColor: 'transparent' }}
        />
      </View>
      <View style={styles._centerContainer}>
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

            <View style={{ flexDirection: 'row', marginTop: ms(10) }}>
              {/* {[1, 2, 3].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles._boxView, { flexDirection: 'row' }]}
                >
                  <Text style={styles._usdText}>USD</Text>
                  <Text style={[styles._usdText, { color: COLORS.primary }]}>
                    {' '}
                    ${totalPayAmount()}
                  </Text>
                </TouchableOpacity>
              ))} */}
              <FlatList
                data={selectCashArray}
                extraData={selectCashArray}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
              />
            </View>

            <View style={styles._inputMain}>
              <View style={styles._inputSubView}>
                <TextInput
                  placeholder="Other amount"
                  keyboardType="number-pad"
                  style={styles._inputContainer}
                />
              </View>
            </View>
            <Button
              onPress={() => {
                // onPressContinue
                createOrderHandler();
              }}
              title={'Continue'}
              style={{ height: ms(40), width: '98%', marginTop: ms(10) }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
