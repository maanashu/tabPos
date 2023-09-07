import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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

  const cartProducts =
    cartType == 'Product' ? cartData?.poscart_products : cartData?.appointment_cart_products;

  const totalPayAmount = () => {
    const cartAmount = cartData?.amount?.total_amount ?? '0.00';
    const totalPayment = tipamount
      ? parseFloat(cartAmount) + parseFloat(tipamount)
      : parseFloat(cartAmount);
    return totalPayment.toFixed(2);
  };

  const payAmount = totalPayAmount();
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

            <View style={styles._flatListContainer}>
              <FlatList
                data={cartProducts}
                style={{ width: '100%' }}
                renderItem={({ item, index }) => <AddedCartItemsCard item={item} index={index} />}
              />
            </View>

            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Sub-Total</Text>
              <Text style={styles._subTotalPrice}>
                ${cartData?.amount?.products_price?.toFixed(2) ?? '0.00'}
              </Text>
            </View>

            <View style={styles._horizontalLine} />
            {/* <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Shipping Charge</Text>
              <Text style={styles._subTotalPrice}>$0.00</Text>
            </View> */}
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Discount</Text>
              <Text style={styles._subTotalPrice}>
                ${cartData?.amount?.discount?.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Tips</Text>
              <Text style={styles._subTotalPrice}>${tipamount}</Text>
            </View>
            <View style={styles._horizontalLine} />
            <View style={styles._subTotalContainer}>
              <Text style={styles._substotalTile}>Total Taxes</Text>
              <Text style={styles._subTotalPrice}>
                ${cartData?.amount?.tax?.toFixed(2) ?? '0.00'}
              </Text>
            </View>
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
                ${totalPayAmount()}
              </Text>
            </View>
            {/* <View style={styles._horizontalLine} /> */}
            <View style={[styles._horizontalLine, { height: ms(1), marginTop: ms(5) }]} />

            <View style={styles._paymentTitleContainer}>
              <Text style={styles._payTitle}>Payment option: </Text>
              <Text style={styles._paySubTitle}>{payDetail?.modeOfPayment}</Text>
            </View>
            <Text style={styles._commonPayTitle}>
              {moment().format('ddd DD MMM, YYYY')} {moment().format('hh:mm A')}
            </Text>
            <Text style={styles._commonPayTitle}>Walk-In</Text>
            <Text style={styles._commonPayTitle}>Invoice No. # 3467589</Text>
            <Text style={styles._commonPayTitle}>
              POS No. {getUserData?.posLoginData?.pos_number}
            </Text>
            <Text style={styles._commonPayTitle}>User ID : ****128</Text>

            <Text style={styles._thankyou}>Thank You</Text>
            <Image source={barcode} style={styles._barCodeImage} />
            {/* <Text style={styles._barCode}>ABC-abc-1234</Text> */}
            <Image source={logo_full} style={styles.logoFull} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
