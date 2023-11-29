import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import BackButton from '../../../components/BackButton';
import { Fonts, barcode, logo_full } from '@/assets';
import moment from 'moment';
import AddedCartItemsCard from '../../../components/AddedCartItemsCard';
import { useFocusEffect } from '@react-navigation/native';
import { clearServiceAllCart, getServiceCart } from '@/actions/RetailAction';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import { CustomHeader } from './CustomHeader';
import { Spacer } from '@/components';
import { COLORS, SH } from '@/theme';

moment.suppressDeprecationWarnings = true;

export const AddProductScreen = ({
  onPressBack,
  paymentMethod,
  tipAmount,
  cartData,
  payDetail,
  cartType,
}) => {
  const tipData = useSelector(getRetail).tipKey?.payload?.tip;
  const tipamount = Number(tipData);
  const getAuthdata = useSelector(getAuthData);
  const getUserData = useSelector(getUser);
  const merchantDetails = getAuthdata?.merchantLoginData?.user;
  const reatilData = useSelector(getRetail);
  const orderInvoice =
    cartType == 'Product' ? reatilData?.createOrder : reatilData?.createServiceOrder;
  const invoiceData = [
    {
      title: 'Payment Option',
      data: 'Cash',
      id: 1,
    },
    {
      title: 'Date',
      data: moment().format('ddd') + ' ' + moment().subtract(10, 'days').calendar(),
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

  const cartProducts =
    cartType == 'Product' ? cartData?.poscart_products : cartData?.appointment_cart_products;

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = tipamount
      ? parseFloat(cartAmount) + parseFloat(tipamount)
      : parseFloat(cartAmount);
    return totalPayment.toFixed(2);
  };

  // const   payAmount = totalPayAmount();
  const payAmount = cartData?.amount?.total_amount?.toFixed(2);
  const ActualPayAmount = payDetail?.tips;
  const changeDue = parseFloat(ActualPayAmount) - parseFloat(payAmount);

  const dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(clearServiceAllCart());
        dispatch(getServiceCart());
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles._innerContainer}>
      <CustomHeader />
      <View style={[styles.displayflex, { flex: 1 }]}>
        <View style={styles.leftCon}>
          <Text>gbhm</Text>
        </View>
        <View style={styles.rightCon}></View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  _innerContainer: {
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
  },
  displayflex: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
  },
  leftCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.41,
    marginRight: ms(7),
    padding: ms(20),
  },
  rightCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.55,
    marginRight: ms(7),
    paddingVertical: ms(8),
  },
});
