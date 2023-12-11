import { FlatList, Image, SafeAreaView, Text, View } from 'react-native';
import React from 'react';
import { ms } from 'react-native-size-matters';
import { styles } from '../PosRetail3.styles';
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

export const FinalPaymentScreen = ({
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

  // const cartProducts =
  //   cartType == 'Product' ? cartData?.poscart_products : cartData?.appointment_cart_products;
  const cartProducts =
    cartType == 'Product' ? cartData?.poscart_products : cartData?.poscart_products;

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

          <View style={styles._kUpperContainer}>
            <View style={styles._kContainer}>
              <Text style={[styles._totalAmountTitle, { fontSize: ms(15) }]}>Paid Amount:</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles._dollarSymbol, { fontSize: ms(15) }]}>
                  {paymentMethod === 'Card' || paymentMethod === 'Cash' ? '$' : 'JBR'}
                </Text>
                {cartType == 'Service' ? (
                  <Text style={styles._amount}>{payDetail?.tips}</Text>
                ) : (
                  <Text style={styles._amount}>{payDetail?.tips}</Text>
                )}
              </View>
              {paymentMethod === 'Cash' && (
                <>
                  <View style={styles._cashRemainView} />
                  <Text style={styles._cashRemainText}>Change Due: ${changeDue.toFixed(2)}</Text>
                </>
              )}
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                width: '70%',
                position: 'absolute',
                bottom: ms(20),
                justifyContent: 'center',
              }}
            ></View> */}
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
            <Text style={[styles._commonPayTitle, styles.boldInvoice]}>
              Invoice No. #{orderInvoice?.invoices?.invoice_number}
            </Text>
            <View style={styles._flatListContainer}>
              <FlatList
                data={cartProducts}
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
                  ${cartData?.amount?.products_price?.toFixed(2) ?? '0.00'}
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
                <Text style={styles._payTitle}>${tipamount.toFixed(2)}</Text>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles._subTotalContainer}>
                <Text style={styles._payTitle}>Total Taxes</Text>
                <Text style={styles._payTitle}>${cartData?.amount?.tax.toFixed(2) ?? '0.00'}</Text>
              </View>
              <Spacer space={SH(15)} />
              <View style={styles._subTotalContainer}>
                <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                  Total
                </Text>
                <View style={styles.totalView}>
                  <Text style={[styles._payTitle, { fontFamily: Fonts.Medium, fontSize: ms(11) }]}>
                    {/* ${totalPayAmount() ?? '0.00'} */}$
                    {cartData?.amount?.total_amount.toFixed(2) || '0.00'}
                  </Text>
                </View>
              </View>
              <Spacer space={SH(15)} />
              <Image source={logo_full} style={styles.logoFull} />
              <Image
                source={{ uri: cartData?.barcode } ?? barcode}
                style={[styles._barCodeImage, { alignSelf: 'center', tintColor: COLORS.navy_blue }]}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
