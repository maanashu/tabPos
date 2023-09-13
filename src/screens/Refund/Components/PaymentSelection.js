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

import { Spacer } from '@/components';
import { strings } from '@/localization';
import { SF, SH, COLORS } from '@/theme';
import InvoiceDetails from './InvoiceDetails';
import BackButton from '@/components/BackButton';
import ReturnConfirmation from './ReturnConfirmation';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { RECIPE_DATA } from '@/constants/flatListData';
import { returnProduct } from '@/actions/DashboardAction';
import { cardPayment, cash, Fonts, qrCodeIcon } from '@/assets';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const { width } = Dimensions.get('window');
let products = [];

const PaymentSelection = ({
  backHandler,
  orderData,
  order,
  applicableForAllItems,
  applyEachItem,
  amount,
}) => {
  const dispatch = useDispatch();
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState();
  const [isReturnConfirmation, setIsReturnConfirmation] = useState(false);

  const onCheckSelectedReceipt = (index) => {
    if (index === 0) {
    }
  };

  const renderRecipeMethod = ({ item, index }) => {
    const selectedMethod = selectedRecipeIndex === index ? COLORS.primary : COLORS.solidGrey;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          // onCheckSelectedReceipt(index);
          setSelectedRecipeIndex(index);
        }}
        style={[styles._payBYBoxContainerReceipe, { borderColor: selectedMethod }]}
      >
        <Text style={[styles._payByMethodReceipe, { color: selectedMethod }]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.RETURN_PRODUCTS], state)
  );

  const onReturnHandler = () => {
    orderData?.order?.order_details?.map((item, index) => {
      if (applyEachItem) {
        order?.map((item, index) => {
          products.push({
            id: item?.id,
            qty: item?.qty ?? 1,
            refund_flag: 'amount',
            refund_value: item?.RefundedAmount,
          });
        });
      } else {
        products.push({
          id: item?.id,
          qty: item?.qty ?? 1,
        });
      }
    });

    const data = applicableForAllItems
      ? {
          order_id: orderData?.order_id,
          products: products,
          refund_flag: 'amount',
          refund_value: amount,
          return_reason: 'testing reason',
        }
      : {
          order_id: orderData?.order_id,
          products: products,
          return_reason: 'testing reason',
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
          <View style={styles.headerRowStyle}>
            <BackButton onPress={backHandler} title={'Back'} style={styles.backIconStyle} />

            <Text style={styles._totalAmountTitle}>{strings.returnOrder.totalReturnAmount}</Text>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles._dollarSymbol}>{strings.returnOrder.dollar}</Text>
              <Text style={styles._amount}>{orderData?.order?.payable_amount}</Text>
            </View>
          </View>
        </View>

        <Spacer space={SH(40)} backgroundColor={COLORS.transparent} />

        <View style={styles.paymentMethodViewStyle}>
          <Text style={styles.returnPaymentMethod}>{strings.returnOrder.returnPaymentMethod}</Text>

          <Spacer space={SH(10)} backgroundColor={COLORS.transparent} />

          <View style={{ alignItems: 'center' }}>
            {orderData?.order?.mode_of_payment ? (
              <TouchableOpacity style={styles._payBYBoxContainer}>
                <Text style={styles._payByTitle}>{strings.returnOrder.payBy}</Text>
                <Text style={styles._payByMethod}>{orderData?.order?.mode_of_payment}</Text>
                <Text style={styles._payByAmount}>{`$${orderData?.order?.payable_amount}`}</Text>
                <Image
                  source={
                    orderData?.order?.mode_of_payment === strings.returnOrder.cash
                      ? cash
                      : orderData?.order?.mode_of_payment === strings.returnOrder.jbr
                      ? qrCodeIcon
                      : cardPayment
                  }
                  style={styles._payByIcon}
                />
              </TouchableOpacity>
            ) : null}
          </View>

          <Spacer space={SH(30)} backgroundColor={COLORS.transparent} />

          {orderData?.order?.mode_of_payment === strings.returnOrder.cash && (
            <Text style={styles.returnPaymentMethod}>{strings.returnOrder.eReceipt}</Text>
          )}

          {orderData?.order?.mode_of_payment === strings.returnOrder.cash && (
            <View style={styles.eReceiptViewStyle}>
              <FlatList
                horizontal
                data={RECIPE_DATA}
                extraData={RECIPE_DATA}
                renderItem={renderRecipeMethod}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
              />
            </View>
          )}

          <Spacer space={SH(60)} backgroundColor={COLORS.transparent} />

          <TouchableOpacity onPress={() => onReturnHandler()} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>{strings.returnOrder.return}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <InvoiceDetails orderData={orderData} />
      </View>

      <ReturnConfirmation
        isVisible={isReturnConfirmation}
        setIsVisible={setIsReturnConfirmation}
        order={orderData}
      />

      {isLoading ? (
        <View style={[styles.loaderViewStyle, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size={'small'} style={styles.loaderViewStyle} />
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
  headerRowStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIconStyle: {
    top: ms(10),
    left: ms(10),
    backgroundColor: 'transparent',
  },
  leftContainer: {
    flex: 0.7,
  },
  rightContainer: {
    flex: 0.28,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  loaderViewStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  selectTipsHeader: {
    borderTopEndRadius: 8,
    borderTopLeftRadius: 8,
    paddingVertical: verticalScale(6),
    backgroundColor: COLORS.blue_shade,
  },
  _totalAmountTitle: {
    fontSize: ms(17),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  _dollarSymbol: {
    fontSize: ms(17),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  _amount: {
    fontSize: ms(25),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  buttonStyle: {
    height: SH(60),
    borderRadius: 5,
    width: width / 2.5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonTextStyle: {
    fontSize: SF(20),
    color: COLORS.white,
    fontFamily: Fonts.SemiBold,
  },
  returnPaymentMethod: {
    fontSize: SF(20),
    color: COLORS.darkGray,
    fontFamily: Fonts.Regular,
    paddingHorizontal: ms(12),
  },
  paymentMethodViewStyle: {
    borderRadius: 7,
    paddingHorizontal: 20,
    paddingVertical: ms(20),
    marginHorizontal: ms(30),
    backgroundColor: COLORS.white,
  },
  _payBYBoxContainer: {
    borderWidth: 1,
    borderRadius: ms(6),
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: ms(4),
    justifyContent: 'center',
    borderColor: COLORS.primary,
    width: Platform.OS === 'ios' ? ms(95) : ms(127),
    height: Platform.OS === 'ios' ? ms(100) : ms(120),
  },
  _payByTitle: {
    fontSize: ms(9),
    marginBottom: ms(3),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  _payByMethod: {
    fontSize: ms(14),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.SemiBold,
  },
  _payByAmount: {
    fontSize: ms(10),
    marginTop: ms(2),
    color: COLORS.primary,
    fontFamily: Fonts.Regular,
  },
  _payByIcon: {
    width: ms(22),
    height: ms(22),
    marginTop: ms(8),
    resizeMode: 'contain',
    tintColor: COLORS.primary,
  },
  _payBYBoxContainerReceipe: {
    borderWidth: 1,
    height: ms(45),
    borderRadius: ms(6),
    alignItems: 'center',
    marginHorizontal: ms(4),
    justifyContent: 'center',
    borderColor: COLORS.solidGrey,
    width: Platform.OS === 'ios' ? ms(95) : ms(127),
  },
  _payByMethodReceipe: {
    fontSize: ms(12),
    color: COLORS.solid_grey,
    fontFamily: Fonts.SemiBold,
  },
  eReceiptViewStyle: {
    paddingTop: 5,
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
});

export default memo(PaymentSelection);
