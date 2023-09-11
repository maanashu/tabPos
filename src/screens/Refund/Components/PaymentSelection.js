import React, { memo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { ms, verticalScale } from 'react-native-size-matters';

import { SF, SH } from '@/theme';
import { Spacer } from '@/components';
import InvoiceDetails from './InvoiceDetails';
import { COLORS } from '../../../theme/Colors';
import BackButton from '@/components/BackButton';
import ReturnConfirmation from './ReturnConfirmation';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { RECIPE_DATA } from '@/constants/flatListData';
import { returnProduct } from '@/actions/DashboardAction';
import { cardPayment, cash, Fonts, qrCodeIcon } from '@/assets';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const { width } = Dimensions.get('window');
let products = [];

const PaymentSelection = ({ backHandler, orderData }) => {
  const dispatch = useDispatch();
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState();
  const [isReturnConfirmation, setIsReturnConfirmation] = useState(false);

  const renderRecipeMethod = ({ item, index }) => {
    const selectedMethod = selectedRecipeIndex === index ? COLORS.primary : COLORS.solidGrey;
    return (
      <TouchableOpacity
        onPress={() => setSelectedRecipeIndex(index)}
        key={index}
        style={[
          styles._payBYBoxContainerReceipe,
          {
            borderWidth: 1,
            borderColor: selectedMethod,
          },
        ]}
      >
        <Text
          style={[
            styles._payByMethodReceipe,
            {
              color: selectedMethod,
            },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.RETURN_PRODUCTS], state)
  );

  const onReturnHandler = () => {
    orderData?.order?.order_details?.map((item, index) => {
      console.log('item', item);
      products.push({ id: item?.product_id, qty: item?.qty });
    });
    const data = {
      order_id: orderData?.order_id,
      products: products,
    };
    dispatch(
      returnProduct(data, (res) => {
        if (res) {
          setIsReturnConfirmation(true);
        }
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.selectTipsHeader}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <BackButton
              onPress={backHandler}
              title={'Back'}
              style={{
                top: ms(10),
                left: ms(10),
                backgroundColor: 'transparent',
              }}
            />
            <Text style={styles._totalAmountTitle}>Total Return Amount:</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles._dollarSymbol}>$</Text>
              <Text style={styles._amount}>{orderData?.order?.payable_amount}</Text>
            </View>
          </View>
        </View>

        <Spacer space={SH(40)} backgroundColor={COLORS.transparent} />
        <View style={styles.paymentMethodViewStyle}>
          <Text style={styles.returnPaymentMethod}>{'Return Payment Method'}</Text>

          <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

          <View style={{ alignItems: 'center' }}>
            {orderData?.order?.mode_of_payment ? (
              <TouchableOpacity
                style={[
                  styles._payBYBoxContainer,
                  {
                    borderWidth: 1,
                    borderColor: COLORS.primary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles._payByTitle,
                    {
                      color: COLORS.primary,
                    },
                  ]}
                >
                  Pay By
                </Text>
                <Text
                  style={[
                    styles._payByMethod,
                    {
                      color: COLORS.primary,
                    },
                  ]}
                >
                  {orderData?.order?.mode_of_payment}
                </Text>
                <Text
                  style={[
                    styles._payByAmount,
                    {
                      color: COLORS.primary,
                    },
                  ]}
                >
                  {`$${orderData?.order?.payable_amount}`}
                </Text>
                <Image
                  source={
                    orderData?.order?.mode_of_payment === 'cash'
                      ? cash
                      : orderData?.order?.mode_of_payment === 'jbr'
                      ? qrCodeIcon
                      : cardPayment
                  }
                  style={[
                    styles._payByIcon,
                    {
                      tintColor: COLORS.primary,
                    },
                  ]}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <Spacer space={SH(30)} backgroundColor={COLORS.transparent} />
          <Text style={styles.returnPaymentMethod}>E-Recipe</Text>
          <View style={{ alignItems: 'center', paddingTop: 5 }}>
            <FlatList
              horizontal
              data={RECIPE_DATA}
              renderItem={renderRecipeMethod}
              extraData={RECIPE_DATA}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </View>

          <Spacer space={SH(60)} backgroundColor={COLORS.transparent} />

          <TouchableOpacity
            onPress={() => {
              onReturnHandler();
            }}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonTextStyle}>{'Return'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <InvoiceDetails orderData={orderData} />
      </View>

      <ReturnConfirmation isVisible={isReturnConfirmation} setIsVisible={setIsReturnConfirmation} />

      {isLoading ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <ActivityIndicator
            color={COLORS.primary}
            size={'small'}
            style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    backgroundColor: COLORS.textInputBackground,
  },
  leftContainer: {
    flex: 0.7,
  },
  rightContainer: {
    flex: 0.28,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  selectTipsHeader: {
    backgroundColor: COLORS.blue_shade,
    borderTopLeftRadius: 8,
    borderTopEndRadius: 8,
    paddingVertical: verticalScale(6),
  },
  _totalAmountTitle: {
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
    fontSize: ms(17),
  },
  _dollarSymbol: {
    fontSize: ms(17),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    marginTop: ms(2),
  },
  _amount: {
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
    fontSize: ms(25),
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    height: SH(60),
    width: width / 2.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
    fontSize: SF(20),
  },
  returnPaymentMethod: {
    fontFamily: Fonts.Regular,
    fontSize: SF(20),
    color: COLORS.darkGray,
    paddingHorizontal: ms(12),
  },
  paymentMethodViewStyle: {
    marginHorizontal: ms(30),
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: ms(20),
    borderRadius: 7,
  },
  _payBYBoxContainer: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    height: Platform.OS === 'ios' ? ms(100) : ms(120),
    width: Platform.OS === 'ios' ? ms(95) : ms(127),
    marginHorizontal: ms(4),
    borderRadius: ms(6),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  _payByTitle: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(9),
    marginBottom: ms(3),
  },
  _payByMethod: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(14),
    marginTop: ms(2),
  },
  _payByAmount: {
    fontFamily: Fonts.Regular,
    color: COLORS.solid_grey,
    fontSize: ms(10),
    marginTop: ms(2),
  },
  _payByIcon: {
    height: ms(22),
    width: ms(22),
    resizeMode: 'contain',
    marginTop: ms(8),
  },
  _payBYBoxContainerReceipe: {
    borderColor: COLORS.solidGrey,
    borderWidth: 1,
    height: ms(45),
    width: Platform.OS === 'ios' ? ms(95) : ms(127),
    marginHorizontal: ms(4),
    borderRadius: ms(6),
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: ms(20),
  },
  _payByMethodReceipe: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(12),
  },
});

export default memo(PaymentSelection);
