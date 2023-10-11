import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { moderateScale, ms, scale, verticalScale } from 'react-native-size-matters';

import {
  Fonts,
  minus,
  plus,
  PaymentDone,
  sellingArrow,
  blankCheckBox,
  checkedCheckboxSquare,
} from '@/assets';
import { Spacer } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import RecheckConfirmation from './RecheckConfirmation';
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { goBack, navigate } from '@/navigation/NavigationRef';
import { CustomHeader } from '@/screens/PosRetail3/Components';
import { getDrawerSessions } from '@/actions/CashTrackingAction';

const { width, height } = Dimensions.get('window');

export function ProductRefund(props) {
  const dispatch = useDispatch();
  const products = props?.route?.params?.productsArray;
  const orderData = props?.route?.params?.orderData;
  const finalOrder = JSON.parse(JSON.stringify(orderData));

  const [orders, setOrders] = useState();
  const [amount, setAmount] = useState('');
  const [applicableIsCheck, setApplicableIsCheck] = useState(false);
  const [applyEachItem, setApplyEachItem] = useState(false);
  const [selectType, setSelectType] = useState('dollar');
  const [buttonText, setButtonText] = useState('Apply Refund');
  const [changeView, setChangeView] = useState('TotalItems');
  const [isCheckConfirmationModalVisible, setIsCheckConfirmationModalVisible] = useState(false);

  useEffect(() => {
    if (orderData) {
      const filterSelectedProducts = finalOrder?.order_details?.filter((e) => e?.isChecked);
      const updatedDataArray = filterSelectedProducts?.map((item) => {
        return { ...item, refundAmount: 0, totalRefundAmount: 0 };
      });
      setOrders(updatedDataArray);
    }
  }, []);

  const refundHandler = (key, newText, item) => {
    const parsedNewText = parseFloat(newText);
    const finalText = isNaN(parsedNewText) ? 0 : parsedNewText;
    const isSmallerThanUnitPrice = finalText <= parseFloat(item?.price);

    const updatedDataArray = orders.map((order, index) => {
      if (index === key) {
        return {
          ...order,
          refundAmount: isSmallerThanUnitPrice ? finalText : '',
          totalRefundAmount: isSmallerThanUnitPrice ? finalText * item.qty : 0.0,
        };
      }
      return order;
    });

    setOrders(updatedDataArray);

    if (!isSmallerThanUnitPrice) {
      alert('Refund amount should not be greater than unit price');
    }
  };

  const addRemoveQty = (symbol, itemIndex) => {
    const updatedOrders = [...orders];
    const selectedItem = updatedOrders[itemIndex];
    const originalOrderArr = products[itemIndex];

    if (symbol === '+' && selectedItem?.qty < originalOrderArr?.qty) {
      selectedItem.qty += 1;
      selectedItem.totalRefundAmount = selectedItem?.qty * selectedItem?.refundAmount;
    } else if (symbol === '-' && selectedItem?.qty > 1) {
      selectedItem.qty -= 1;
      selectedItem.totalRefundAmount = selectedItem?.qty * selectedItem?.refundAmount;
    }
    setOrders(updatedOrders);
  };

  const totalRefundAmount = orders?.reduce((accumulator, currentValue) => {
    const price =
      applicableIsCheck || applyEachItem
        ? currentValue.totalRefundAmount
        : currentValue.price * currentValue.qty;
    const totalRefund = accumulator + price;
    return totalRefund;
  }, 0);

  const calculateRefundTax = () => {
    const calculatedTax = totalRefundAmount * 0.08;
    return calculatedTax || 0;
  };

  const totalRefundableAmount = () => {
    const total_payable_amount = calculateRefundTax() + totalRefundAmount;
    return total_payable_amount || 0;
  };

  const renderProductItem = ({ item, index }) => {
    return (
      <View style={styles.blueListData}>
        <View style={styles.displayflex}>
          <View style={[styles.tableListSide, styles.listLeft]}>
            <Text style={[styles.blueListDataText, styles.cashLabelWhiteHash]}>{index + 1}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image source={{ uri: item?.product_image }} style={styles.columbiaMen} />
              <View style={{ marginLeft: 10 }}>
                <Text style={[styles.blueListDataText, { width: SW(60) }]} numberOfLines={1}>
                  {item?.product_name ?? '-'}
                </Text>
                <Text style={styles.sukNumber}>{item?.product_details?.sku ?? '-'}</Text>
              </View>
            </View>

            <View style={styles.productCartBody}>
              <Text style={styles.blueListDataText} numberOfLines={1}>
                ${item?.price ?? '0'}
              </Text>
            </View>

            {applyEachItem ? (
              <View style={styles.productCartBody}>
                <TextInput
                  style={[
                    styles.productCartBody,
                    {
                      textAlign: 'center',
                      fontFamily: Fonts.Regular,
                      borderRadius: 5,
                      backgroundColor: COLORS.blue_shade,
                      padding: 0,
                      margin: 0,
                    },
                  ]}
                  value={item?.refundAmount}
                  keyboardType={'number-pad'}
                  onChangeText={(text) => {
                    refundHandler(index, text, item);
                  }}
                />
              </View>
            ) : (
              <View style={styles.productCartBody}>
                {amount ? (
                  <Text style={styles.blueListDataText} numberOfLines={1}>
                    {`$${(item?.refundAmount).toFixed(2) ?? 0}`}
                  </Text>
                ) : (
                  <Text style={styles.blueListDataText} numberOfLines={1}>
                    {'-'}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.productCartBody}>
              <View style={styles.listCountCon}>
                <TouchableOpacity
                  style={{
                    width: SW(10),
                    alignItems: 'center',
                  }}
                  onPress={() => addRemoveQty('-', index)}
                >
                  <Image source={minus} style={styles.minus} />
                </TouchableOpacity>

                <Text>{`${item?.qty}`}</Text>

                <TouchableOpacity
                  style={{
                    width: SW(10),
                    alignItems: 'center',
                  }}
                  onPress={() => addRemoveQty('+', index)}
                >
                  <Image source={plus} style={styles.minus} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.productCartBody}>
              <Text style={styles.blueListDataText} numberOfLines={1}>
                $
                {applicableIsCheck || applyEachItem
                  ? (item?.totalRefundAmount).toFixed(2) ?? 0
                  : item.price * item.qty}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const applyRefundHandler = () => {
    if (applicableIsCheck || applyEachItem) {
      if (applicableIsCheck && !amount) {
        alert('Please add refund amount');
      } else if (applyEachItem) {
        const hasCheckedItem = orders?.every((item) => item?.refundAmount !== 0);
        if (hasCheckedItem) {
          setButtonText('Applied');
          dispatch(getDrawerSessions());
        } else {
          alert('Please add refund amount for all items');
        }
      } else {
        setButtonText('Applied');
        dispatch(getDrawerSessions());
      }
    }
  };

  const applyRefundButton = () => {
    const isApplied = buttonText === 'Applied';
    if ((applicableIsCheck || applyEachItem || amount) && isApplied) {
      return (
        <View
          style={[
            styles.applyRefundButton,
            { flexDirection: 'row', paddingHorizontal: ms(12), backgroundColor: 'transparent' },
          ]}
        >
          <Image
            source={PaymentDone}
            style={{
              tintColor: COLORS.primary,
              width: scale(7),
              height: scale(7),
              resizeMode: 'contain',
            }}
          />
          <Text style={[styles.applyRefundButtonText, { color: COLORS.primary }]}>{'Applied'}</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => applyRefundHandler()}
          style={[
            styles.applyRefundButton,
            {
              backgroundColor:
                applicableIsCheck || applyEachItem || amount ? COLORS.primary : COLORS.gerySkies,
            },
          ]}
        >
          <Text style={styles.applyRefundButtonText}>{strings.returnOrder.applyRefund}</Text>
        </TouchableOpacity>
      );
    }
  };

  const getOrdersDetail = () => {
    if (applyEachItem) {
      const newArray = orders.map((obj) => ({
        ...obj,
        ['applyToEachItemKey']: applyEachItem,
      }));
      setOrders(newArray);
      const data = {
        order: orders,
        orderData: finalOrder,
        applyEachItem: applyEachItem,
        applicableForAllItems: applicableIsCheck,
        payableAmount: totalRefundableAmount(),
        subTotal: totalRefundAmount,
        totalTaxes: applyEachItem || applicableIsCheck ? calculateRefundTax().toFixed(2) : 0,
        total: applyEachItem || applicableIsCheck ? totalRefundableAmount().toFixed(2) : 0,
      };
      navigate(NAVIGATION.paymentSelection, { screen: data });
    } else {
      const data = {
        order: orders,
        orderData: finalOrder,
        applyEachItem: applyEachItem,
        applicableForAllItems: applicableIsCheck,
        payableAmount: totalRefundableAmount(),
        subTotal: totalRefundAmount,
        totalTaxes: applyEachItem || applicableIsCheck ? calculateRefundTax().toFixed(2) : 0,
        total: applyEachItem || applicableIsCheck ? totalRefundableAmount().toFixed(2) : 0,
      };
      navigate(NAVIGATION.paymentSelection, { screen: data });
    }
  };

  const formattedReturnPrice = (price) => {
    // Convert price to a number, defaulting to 0 if it's falsy or not a number
    const numericPrice = parseFloat(price) || 0;

    // Format the numeric price with 2 decimal places
    const formattedPrice = numericPrice.toFixed(2);

    // Determine the sign and prepend accordingly
    const sign = numericPrice == 0 ? '' : '-';

    return `${sign}$${formattedPrice}`;
  };

  const deliveryShippingCharges = () => {
    let deliveryCharges;
    let title;
    if (finalOrder?.order?.status === 5 && finalOrder?.order?.delivery_option === '1') {
      deliveryCharges = finalOrder?.order?.delivery_charge;
      title = 'Delivery Charges';
    } else {
      title = '';
      deliveryCharges = 0;
    }
    return { title, deliveryCharges };
  };

  return (
    <View style={styles.container}>
      <>
        <CustomHeader crossHandler={() => props?.route?.params?.onPressBack()} iconShow />

        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <View style={styles.leftMainViewStyle}>
            <View style={styles.rowStyle}>
              {!applyEachItem ? (
                <View style={styles.applicableViewStyle}>
                  {applicableIsCheck ? (
                    <TouchableOpacity
                      onPress={() => {
                        setButtonText('Apply Refund');
                        setAmount('');
                        setApplicableIsCheck(!applicableIsCheck);
                      }}
                    >
                      <Image source={checkedCheckboxSquare} style={styles.checkBoxIconStyle} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setApplicableIsCheck(!applicableIsCheck);
                        setButtonText('Apply Refund');
                        setAmount('');
                      }}
                    >
                      <Image source={blankCheckBox} style={styles.checkBoxIconStyle} />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.applicableTextStyle}>{strings.returnOrder.applicable}</Text>
                </View>
              ) : (
                <View style={styles.applicableViewStyle}>
                  <View>
                    <Image
                      source={blankCheckBox}
                      style={[styles.checkBoxIconStyle, { tintColor: COLORS.solidGrey }]}
                    />
                  </View>
                  <Text style={[styles.applicableTextStyle, { color: COLORS.solidGrey }]}>
                    {strings.returnOrder.applicable}
                  </Text>
                </View>
              )}

              <View style={styles.amountTypeView}>
                <TextInput
                  value={amount}
                  editable={applyEachItem ? false : true}
                  keyboardType={'number-pad'}
                  style={styles.textInputStyle}
                  onChangeText={(text) => {
                    const isPercentageLabel = selectType === strings.returnOrder.percentageLabel;

                    const updatedDataArray = orders?.map((item) => ({
                      ...item,
                      refundAmount: isPercentageLabel
                        ? (item?.price * parseFloat(text)) / 100
                        : parseFloat(text),
                      totalRefundAmount: isPercentageLabel
                        ? (item?.price * parseFloat(text) * item?.qty) / 100
                        : parseFloat(text) * item?.qty,
                    }));

                    setOrders(updatedDataArray);
                    setButtonText('Apply Refund');
                    setAmount(text);
                    setApplicableIsCheck(!!text);
                  }}
                  placeholderTextColor={COLORS.solidGrey}
                  placeholder={selectType === strings.returnOrder.dollarLabel ? '$ 00.00' : '% 0'}
                />

                <View style={styles.typeViewStyle}>
                  <TouchableOpacity
                    disabled={applyEachItem ? true : false}
                    onPress={() => {
                      setSelectType(strings.returnOrder.dollarLabel);
                      setAmount('');
                    }}
                    style={[
                      styles.dollarViewStyle,
                      {
                        backgroundColor:
                          selectType === strings.returnOrder.dollarLabel && applyEachItem
                            ? COLORS.solidGrey
                            : selectType === strings.returnOrder.dollarLabel &&
                              !applyEachItem &&
                              !amount
                            ? COLORS.gerySkies
                            : selectType === strings.returnOrder.dollarLabel &&
                              !applyEachItem &&
                              amount
                            ? COLORS.primary
                            : COLORS.white,
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.applyRefundButtonText,
                        {
                          color:
                            selectType === strings.returnOrder.dollarLabel
                              ? COLORS.white
                              : COLORS.dark_grey,
                        },
                      ]}
                    >
                      {strings.returnOrder.dollar}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={applyEachItem ? true : false}
                    onPress={() => {
                      setSelectType(strings.returnOrder.percentageLabel);
                      setAmount('');
                    }}
                    style={[
                      styles.dollarViewStyle,
                      {
                        paddingHorizontal: 10,
                        backgroundColor:
                          selectType === strings.returnOrder.percentageLabel && applyEachItem
                            ? COLORS.solidGrey
                            : selectType === strings.returnOrder.percentageLabel &&
                              !applyEachItem &&
                              !amount
                            ? COLORS.gerySkies
                            : selectType === strings.returnOrder.percentageLabel &&
                              !applyEachItem &&
                              amount
                            ? COLORS.primary
                            : COLORS.white,
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.applyRefundButtonText,
                        {
                          color:
                            selectType === strings.returnOrder.percentageLabel
                              ? COLORS.white
                              : COLORS.dark_grey,
                        },
                      ]}
                    >
                      {strings.returnOrder.percentage}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {applicableIsCheck ? (
                <View style={styles.applicableViewStyle}>
                  <View>
                    <Image
                      source={blankCheckBox}
                      style={[styles.checkBoxIconStyle, { tintColor: COLORS.solidGrey }]}
                    />
                  </View>
                  <Text style={[styles.applicableTextStyle, { color: COLORS.solidGrey }]}>
                    {strings.returnOrder.applyEachItem}
                  </Text>
                </View>
              ) : (
                <View style={styles.applicableViewStyle}>
                  {applyEachItem ? (
                    <TouchableOpacity
                      onPress={() => {
                        setAmount('');
                        setApplyEachItem(!applyEachItem);
                        setButtonText('Apply Refund');
                      }}
                    >
                      <Image source={checkedCheckboxSquare} style={styles.checkBoxIconStyle} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setAmount('');
                        setApplyEachItem(!applyEachItem);
                        setButtonText('Apply Refund');
                        const updatedDataArray = orders?.map((item, index) => {
                          return { ...item, refundAmount: 0, totalRefundAmount: 0 };
                        });
                        setOrders(updatedDataArray);
                      }}
                    >
                      <Image source={blankCheckBox} style={styles.checkBoxIconStyle} />
                    </TouchableOpacity>
                  )}
                  <Text style={styles.applicableTextStyle}>
                    {strings.returnOrder.applyEachItem}
                  </Text>
                </View>
              )}

              {applyRefundButton()}
            </View>

            <Spacer space={SH(10)} />

            <View style={styles.blueListHeader}>
              <View style={styles.displayflex}>
                <View style={[styles.tableListSide, styles.listLeft]}>
                  <Text style={[styles.cashLabelWhite, styles.cashLabelWhiteHash]}>#</Text>
                  <Text style={styles.cashLabelWhite}>Item</Text>
                </View>
                <View style={styles.productCartBodyRight}>
                  <View style={styles.productCartBody}>
                    <Text style={styles.cashLabelWhite}>Unit Price</Text>
                  </View>
                  <View style={styles.productCartBody}>
                    <Text style={styles.cashLabelWhite}>Refund Amount</Text>
                  </View>
                  <View style={styles.productCartBody}>
                    <Text style={styles.cashLabelWhite}>Quantity</Text>
                  </View>
                  <View style={styles.productCartBody}>
                    <Text style={styles.cashLabelWhite}>Line Total</Text>
                  </View>
                </View>
              </View>
            </View>

            <FlatList
              scrollEnabled
              data={orders}
              extraData={orders}
              renderItem={renderProductItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item?.id?.toString()}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </View>

          <View style={styles.billAmountViewStyle}>
            <Text
              style={styles.totalItemsText}
            >{`${strings.deliveryOrders.totalRefundItems} ${products?.length}`}</Text>

            <Spacer space={SH(10)} />

            <View style={styles.totalViewStyle}>
              <Text style={styles.subTotalText}>{strings.deliveryOrders.subTotal}</Text>
              <Text style={styles.subTotalPrice}>{`${formattedReturnPrice(
                totalRefundAmount
              )}`}</Text>
            </View>

            <Spacer space={SH(10)} />

            <View style={styles.totalViewStyle}>
              <Text style={styles.subTotalText}>{strings.deliveryOrders.totalTax}</Text>
              <Text style={styles.subTotalPrice}>{`${formattedReturnPrice(
                calculateRefundTax()
              )}`}</Text>
            </View>

            <Spacer space={SH(10)} />

            {/* {finalOrder?.order?.status === 5 ? (
              <>
                <Spacer space={SH(10)} />
                <View style={styles.totalViewStyle}>
                  <Text style={styles.subTotalText}>{deliveryShippingCharges().title}</Text>
                  <Text style={styles.subTotalPrice}>{`${
                    applyEachItem || applicableIsCheck
                      ? formattedReturnPrice(deliveryShippingCharges().deliveryCharges)
                      : formattedReturnPrice(0)
                  }`}</Text>
                </View>
                <Spacer space={SH(10)} />
              </>
            ) : null} */}

            {/* <Spacer space={SH(10)} /> */}

            <View style={styles.totalViewStyle}>
              <Text style={[styles.subTotalText, { fontFamily: Fonts.MaisonBold }]}>
                {strings.wallet.total}
              </Text>
              <Text style={[styles.subTotalPrice, { fontFamily: Fonts.MaisonBold }]}>
                {`${formattedReturnPrice(totalRefundableAmount())}`}
              </Text>
            </View>

            <Spacer space={SH(20)} />

            <TouchableOpacity
              onPress={() => setIsCheckConfirmationModalVisible(true)}
              disabled={orders?.length > 0 ? false : true}
              style={[
                styles.nextButtonStyle,
                {
                  backgroundColor: orders?.length > 0 ? COLORS.primary : COLORS.gerySkies,
                },
              ]}
            >
              <Text style={styles.nextTextStyle}>{strings.management.next}</Text>
              <Image source={sellingArrow} style={styles.arrowIconStyle} />
            </TouchableOpacity>

            <Spacer space={SH(20)} />
          </View>
        </View>
      </>

      <RecheckConfirmation
        orderList={orders}
        onPress={(modifiedOrderDetailArr) => {
          setIsCheckConfirmationModalVisible(false);
          setOrders([...modifiedOrderDetailArr]);
          getOrdersDetail();
        }}
        isVisible={isCheckConfirmationModalVisible}
        setIsVisible={setIsCheckConfirmationModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    backgroundColor: COLORS.textInputBackground,
  },
  leftMainViewStyle: {
    flex: 0.75,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: height,
  },
  rowStyle: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ms(7),
    paddingHorizontal: ms(10),
  },
  applicableViewStyle: {
    flexDirection: 'row',
    paddingLeft: ms(8),
    paddingRight: ms(4),
    alignItems: 'center',
  },
  checkBoxIconStyle: {
    width: scale(9),
    height: scale(9),
    resizeMode: 'contain',
  },
  applicableTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: SF(10),
    color: COLORS.dark_grey,
    paddingLeft: ms(1),
    textAlignVertical: 'center',
  },
  typeViewStyle: {
    flexDirection: 'row',
    ...ShadowStyles.shadow2,
    height: SH(34),
  },
  applyRefundButton: {
    backgroundColor: COLORS.gerySkies,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginHorizontal: 15,
  },
  dollarViewStyle: {
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
    height: SH(28),
    alignSelf: 'center',
  },
  applyRefundButtonText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.white,
  },
  amountTypeView: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: 8,
    marginHorizontal: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInputStyle: {
    width: SH(60),
    fontFamily: Fonts.SemiBold,
    fontSize: SF(12),
    color: COLORS.gerySkies,
  },
  blueListHeader: {
    backgroundColor: COLORS.dark_grey,
    height: SH(40),
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableListSide: {
    width: width * 0.15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLeft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cashLabelWhite: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Medium,
  },
  cashLabelWhiteHash: {
    paddingHorizontal: moderateScale(15),
  },
  productCartBodyRight: {
    // width: Platform.OS === 'android' ? ms(330) : ms(255),
    height: ms(20),
    flexDirection: 'row',
  },
  productCartBody: {
    width: Platform.OS === 'android' ? ms(82) : ms(60),
    height: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  blueListData: {
    borderWidth: 1,
    height: SH(48),
    borderRadius: 5,
    borderColor: COLORS.solidGrey,
    justifyContent: 'center',
    marginVertical: verticalScale(2),
    marginHorizontal: 10,
  },
  blueListDataText: {
    color: COLORS.solid_grey,
    fontSize: SF(11),
    fontFamily: Fonts.Regular,
  },
  sukNumber: {
    color: COLORS.solid_grey,
    fontSize: SF(9),
    fontFamily: Fonts.Regular,
  },
  columbiaMen: {
    width: ms(18),
    height: ms(18),
    resizeMode: 'contain',
  },
  totalItemsText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.primary,
    fontSize: SF(16),
  },
  arrowIconStyle: {
    width: SH(24),
    height: SH(24),
    resizeMode: 'contain',
    tintColor: COLORS.white,
    marginLeft: 10,
  },
  subTotalText: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.dark_grey,
    fontSize: SF(14),
  },
  subTotalPrice: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.black,
    fontSize: SF(14),
  },
  nextButtonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: scale(100),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: scale(25),
    borderRadius: 5,
    backgroundColor: COLORS.gerySkies,
  },
  nextTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: SF(16),
    color: COLORS.white,
  },
  totalViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  billAmountViewStyle: {
    justifyContent: 'flex-end',
    paddingBottom: 10,
    flex: 0.23,
    paddingHorizontal: 30,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  listCountCon: {
    borderWidth: 1,
    width: SW(30),
    height: SH(30),
    borderRadius: 3,
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(4),
    alignItems: 'center',
  },
  minus: {
    width: SW(5),
    height: SW(5),
    resizeMode: 'contain',
  },
  editIconStyle: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
});
