import React, { memo, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { moderateScale, ms, scale, verticalScale } from 'react-native-size-matters';

import {
  Fonts,
  plus,
  minus,
  PaymentDone,
  sellingArrow,
  blankCheckBox,
  checkboxSecBlue,
  borderCross,
  arrowRightTop,
} from '@/assets';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import PaymentSelection from './PaymentSelection';
import { COLORS, SH, SF, SW, ShadowStyles } from '@/theme';
import { CustomHeader } from '@/screens/PosRetail3/Components';
import { getDrawerSessions } from '@/actions/CashTrackingAction';
import ReactNativeModal from 'react-native-modal';
import InventoryProducts from './InventoryProducts';
import RecheckConfirmation from './RecheckConfirmation';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import Header from './Header';

const { width, height } = Dimensions.get('window');

const ProductRefund = ({ backHandler, orderList, orderData }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');
  const [applicableIsCheck, setApplicableIsCheck] = useState(false);
  const [applyEachItem, setApplyEachItem] = useState(false);
  const [selectType, setSelectType] = useState('dollar');
  const [buttonText, setButtonText] = useState('Apply Refund');
  const [changeView, setChangeView] = useState('TotalItems');
  const [isRefundDeliveryAmount, setIsRefundDeliveryAmount] = useState(false);
  const [orders, setOrders] = useState();
  const [selectedItem, setSelectedItem] = useState('');
  const [inventoryModal, setInventoryModal] = useState(false);

  const [isCheckConfirmationModalVisible, setIsCheckConfirmationModalVisible] = useState(false);

  const finalOrder = JSON.parse(JSON.stringify(orderData));
  finalOrder.order.order_details = orderList;

  useEffect(() => {
    if (orderData?.order) {
      // finalOrder.order.order_details = orderList; //Replace orders array with selected orders

      const filterSelectedProducts = finalOrder?.order?.order_details?.filter((e) => e?.isChecked);
      const updatedDataArray = filterSelectedProducts.map((item) => {
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
    // Create a copy of the orders array to avoid mutating the original state
    const updatedOrders = [...orders];

    // Find the selected item in the copy
    const selectedItem = updatedOrders[itemIndex];
    const originalOrderArr = orderList[itemIndex];

    if (symbol === '+' && selectedItem.qty < originalOrderArr.qty) {
      // Increase the qty of the selected item
      selectedItem.qty += 1;
      selectedItem.totalRefundAmount = selectedItem.qty * selectedItem.refundAmount;
    } else if (symbol === '-' && selectedItem.qty > 1) {
      // Decrease the qty of the selected item, but ensure it doesn't go below 0
      selectedItem.qty -= 1;
      selectedItem.totalRefundAmount = selectedItem.qty * selectedItem.refundAmount;
    }
    // Update the state with the modified copy of the orders array
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
    let deliveryCharges;
    if (finalOrder?.order?.delivery_charge !== '0') {
      deliveryCharges = finalOrder?.order?.delivery_charge;
    } else if (finalOrder?.order?.shipping_charge !== '0') {
      deliveryCharges = finalOrder?.order?.shipping_charge;
    } else {
      deliveryCharges = 0;
    }
    if (!isRefundDeliveryAmount) {
      deliveryCharges = 0;
    }
    const total_payable_amount =
      parseFloat(deliveryCharges) + calculateRefundTax() + totalRefundAmount;
    return total_payable_amount || 0;
  };

  const deliveryShippingCharges = () => {
    let deliveryCharges;
    let title;
    if (finalOrder?.order?.delivery_charge !== '0') {
      deliveryCharges = finalOrder?.order?.delivery_charge;
      title = 'Delivery Charges';
    } else if (finalOrder?.order?.shipping_charge !== '0') {
      deliveryCharges = finalOrder?.order?.shipping_charge;
      title = 'Shipping Charges';
    } else {
      title = '';
      deliveryCharges = '0';
    }
    return { title, deliveryCharges };
  };

  const renderProductItem = ({ item, index }) => (
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
            <View style={{ marginLeft: ms(5) }}>
              <Text style={[styles.blueListDataText]} numberOfLines={2}>
                {item?.product_name ?? '-'}
              </Text>
              <Text style={styles.sukNumber}>{item?.product_details?.sku ?? ''}</Text>
            </View>
          </View>
        </View>

        <View style={styles.productCartBodyRight}>
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
            <Text style={styles.blueListDataText}>x{`${item?.qty}`}</Text>

            {/* <View style={styles.listCountCon}>
              <TouchableOpacity
                style={{
                  // width: SW(10),
                  alignItems: 'center',
                }}
                onPress={() => addRemoveQty('-', index)}
              >
                <Image source={minus} style={styles.minus} />
              </TouchableOpacity>
              <Text>{`${item?.qty}`}</Text>
              <TouchableOpacity
                style={{
                  // width: SW(10),
                  alignItems: 'center',
                }}
                onPress={() => addRemoveQty('+', index)}
              >
                <Image source={plus} style={styles.minus} />
              </TouchableOpacity>
            </View> */}
          </View>

          <View style={styles.productCartBody}>
            <Text style={styles.blueListDataText} numberOfLines={1}>
              $
              {applicableIsCheck || applyEachItem
                ? (item?.totalRefundAmount).toFixed(2) ?? 0
                : item.price * item.qty}
            </Text>
          </View>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => {
                setOrders((prevState) => {
                  const removedArr = prevState.filter((data) => data !== item);
                  return removedArr;
                });
              }}
              style={styles.removeContainer}
            >
              <Image source={borderCross} style={styles.removeIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const applyRefundHandler = () => {
    if (applicableIsCheck || applyEachItem) {
      if (applicableIsCheck && amount == '') {
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
            { flexDirection: 'row', paddingHorizontal: ms(10), backgroundColor: 'transparent' },
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
                applicableIsCheck || applyEachItem || amount
                  ? COLORS.navy_blue
                  : COLORS.input_border,
            },
          ]}
        >
          <Text
            style={[
              styles.applyRefundButtonText,
              {
                color:
                  applicableIsCheck || applyEachItem || amount ? COLORS.white : COLORS.navy_blue,
              },
            ]}
          >
            {strings.returnOrder.applyRefund}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const getOrdersDetail = () => {
    if (applyEachItem) {
      const newArray = orders.map((obj) => ({
        ...obj, // Copy all existing key-value pairs
        ['applyToEachItemKey']: applyEachItem, //
      }));
      setOrders(newArray);
      setChangeView('PaymentScreen');
    } else {
      setChangeView('PaymentScreen');
    }
  };

  return (
    <View style={styles.container}>
      {changeView === 'TotalItems' ? (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Header />
            <View style={{ flex: 0.85, marginHorizontal: ms(15) }}>
              <CustomHeader />
            </View>
          </View>

          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              flex: 0.98,
              backgroundColor: COLORS.white,
              borderRadius: ms(10),
              paddingHorizontal: ms(15),
              paddingVertical: ms(15),
            }}
          >
            <View style={styles.leftMainViewStyle}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: ms(11),
                      color: COLORS.navy_blue,
                      fontFamily: Fonts.SemiBold,
                      alignSelf: 'flex-start',
                      letterSpacing: -1,
                    }}
                  >
                    {'Refunds'}
                    <Text style={{ color: COLORS.light_blue2, letterSpacing: -1 }}>
                      ({orders?.length})
                    </Text>
                  </Text>
                  <Text
                    style={{
                      color: COLORS.navy_blue,
                      marginTop: ms(2),
                      fontSize: ms(8),
                      letterSpacing: -1,
                      width: ms(90),
                    }}
                  >
                    {'Select the items to refund.'}
                  </Text>
                </View>

                <View style={[styles.rowStyle, { position: 'absolute', right: ms(0) }]}>
                  {finalOrder?.order?.delivery_charge !== '0' ||
                    (finalOrder?.order?.shipping_charge !== '0' && (
                      <>
                        <TouchableOpacity
                          onPress={() => {
                            setIsRefundDeliveryAmount(!isRefundDeliveryAmount);
                          }}
                        >
                          <Image
                            source={isRefundDeliveryAmount ? checkboxSecBlue : blankCheckBox}
                            style={styles.checkBoxIconStyle}
                          />
                        </TouchableOpacity>
                        <Text style={styles.applicableTextStyle}>
                          {'Refund ' + deliveryShippingCharges().title}
                        </Text>
                      </>
                    ))}

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
                          <Image source={checkboxSecBlue} style={styles.checkBoxIconStyle} />
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
                      <Text style={styles.applicableTextStyle}>
                        {strings.returnOrder.applicableForAll}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.applicableViewStyle}>
                      <View>
                        <Image
                          source={blankCheckBox}
                          style={[styles.checkBoxIconStyle, { tintColor: COLORS.navy_blue }]}
                        />
                      </View>
                      <Text style={[styles.applicableTextStyle, { color: COLORS.navy_blue }]}>
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
                        const isPercentageLabel =
                          selectType === strings.returnOrder.percentageLabel;

                        const updatedDataArray = orders?.map((item) => {
                          let newPrice = isPercentageLabel
                            ? (text * item.price) / 100
                            : parseFloat(text);

                          // Check if the entered price is less than the current item price
                          if (newPrice >= parseFloat(item.price)) {
                            newPrice = parseFloat(item.price); // Retain the current item price
                          }

                          return {
                            ...item,
                            refundAmount: newPrice,
                            totalRefundAmount: newPrice * item.qty,
                          };
                        });

                        setOrders(updatedDataArray);
                        setButtonText('Apply Refund');
                        setAmount(text);
                        setApplicableIsCheck(!!text);
                      }}
                      placeholderTextColor={COLORS.faded_purple}
                      placeholder={
                        selectType === strings.returnOrder.dollarLabel ? '$ 00.00' : '% 0'
                      }
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
                                ? COLORS.input_border
                                : selectType === strings.returnOrder.dollarLabel &&
                                  !applyEachItem &&
                                  !amount
                                ? COLORS.input_border
                                : selectType === strings.returnOrder.dollarLabel &&
                                  !applyEachItem &&
                                  amount
                                ? COLORS.navy_blue
                                : COLORS.input_border,
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
                                selectType === strings.returnOrder.dollarLabel && applyEachItem
                                  ? COLORS.navy_blue
                                  : selectType === strings.returnOrder.dollarLabel &&
                                    !applyEachItem &&
                                    !amount
                                  ? COLORS.navy_blue
                                  : selectType === strings.returnOrder.dollarLabel &&
                                    !applyEachItem &&
                                    amount
                                  ? COLORS.white
                                  : COLORS.navy_blue,
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
                            paddingHorizontal: ms(2),
                            backgroundColor:
                              selectType === strings.returnOrder.percentageLabel && applyEachItem
                                ? COLORS.input_border
                                : selectType === strings.returnOrder.percentageLabel &&
                                  !applyEachItem &&
                                  !amount
                                ? COLORS.input_border
                                : selectType === strings.returnOrder.percentageLabel &&
                                  !applyEachItem &&
                                  amount
                                ? COLORS.navy_blue
                                : COLORS.input_border,
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
                                selectType === strings.returnOrder.percentageLabel && applyEachItem
                                  ? COLORS.navy_blue
                                  : selectType === strings.returnOrder.percentageLabel &&
                                    !applyEachItem &&
                                    !amount
                                  ? COLORS.navy_blue
                                  : selectType === strings.returnOrder.percentageLabel &&
                                    !applyEachItem &&
                                    amount
                                  ? COLORS.white
                                  : COLORS.navy_blue,
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
                          <Image source={checkboxSecBlue} style={styles.checkBoxIconStyle} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            setAmount('');
                            setApplyEachItem(!applyEachItem);
                            setButtonText('Apply Refund');
                            const updatedDataArray = orders.map((item, index) => {
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
              </View>

              <Spacer space={ms(15)} />

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
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: ms(20),
                      }}
                    >
                      <View
                        style={{
                          borderColor: COLORS.light_blue2,
                          borderWidth: 1,
                          backgroundColor: COLORS.input_border,
                          borderRadius: ms(2),
                        }}
                      >
                        <Image
                          source={minus}
                          resizeMode="contain"
                          style={{ height: ms(12), width: ms(12), tintColor: COLORS.light_blue2 }}
                        />
                      </View>
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
              <View style={styles.totalViewStyle}>
                <Text
                  style={styles.totalItemsText}
                >{`${strings.deliveryOrders.itemsRefunded} `}</Text>
                <Text
                  style={[
                    styles.totalItemsText,
                    { justifyContent: 'flex-start', alignSelf: 'flex-start', textAlign: 'left' },
                  ]}
                >{`${orderList?.length}`}</Text>
              </View>

              <View style={styles.horizontalLine} />

              <View style={styles.totalViewStyle}>
                <Text style={styles.subTotalText}>{strings.deliveryOrders.subTotal}</Text>
                <Text style={styles.subTotalPrice}>{`${formattedReturnPrice(
                  totalRefundAmount
                )}`}</Text>
              </View>

              <View style={styles.totalViewStyle}>
                <Text style={styles.subTotalText}>{strings.deliveryOrders.totalTax}</Text>
                <Text style={styles.subTotalPrice}>{`${formattedReturnPrice(
                  calculateRefundTax()
                )}`}</Text>
              </View>
              <View style={styles.horizontalLine} />

              {finalOrder?.order?.delivery_charge !== '0' ||
              (finalOrder?.order?.shipping_charge !== '0' && isRefundDeliveryAmount) ? (
                <>
                  <View style={styles.totalViewStyle}>
                    <Text style={styles.subTotalText}>{deliveryShippingCharges().title}</Text>
                    <Text style={styles.subTotalPrice}>{`${formattedReturnPrice(
                      deliveryShippingCharges().deliveryCharges
                    )}`}</Text>
                  </View>
                  <Spacer space={SH(10)} />
                </>
              ) : null}

              {/* <Spacer space={SH(10)} /> */}

              <View style={styles.totalViewStyle}>
                <Text style={[styles.totalItemsText, { fontFamily: Fonts.MaisonBold }]}>
                  {strings.wallet.total}
                </Text>
                <Text style={[styles.totalItemsText, { fontFamily: Fonts.MaisonBold }]}>
                  {`${formattedReturnPrice(totalRefundableAmount())}`}
                </Text>
              </View>

              <Spacer space={SH(20)} />

              <TouchableOpacity
                onPress={() => {
                  if (applicableIsCheck && amount == '') {
                    alert('Please enter the refund amount');
                  } else if ((applicableIsCheck || applyEachItem) && buttonText == 'Apply Refund') {
                    alert('Please apply refund');
                  } else {
                    if (finalOrder?.order?.order_type === 'service') {
                      setIsCheckConfirmationModalVisible(false);
                      getOrdersDetail();
                    } else {
                      setIsCheckConfirmationModalVisible(true);
                    }
                  }
                }}
                disabled={orders?.length > 0 ? false : true}
                style={[
                  styles.saveButtonTax,
                  {
                    backgroundColor: orders?.length > 0 ? COLORS.navy_blue : COLORS.light_blue2,
                    // borderWidth: orders?.length > 0 ? 0 : 1,
                    // borderColor: COLORS.navy_blue,
                  },
                ]}
              >
                <Text style={[styles.saveButtonText]}>{'Confirm'}</Text>
                <Image source={arrowRightTop} style={styles.arrowButton} />
              </TouchableOpacity>

              <Spacer space={SH(20)} />
            </View>
          </View>
        </>
      ) : (
        <PaymentSelection
          order={orders}
          orderData={finalOrder}
          applyEachItem={applyEachItem}
          applicableForAllItems={applicableIsCheck}
          shouldRefundDeliveryAmount={isRefundDeliveryAmount}
          backHandler={() => setChangeView('TotalItems')}
          payableAmount={totalRefundableAmount()}
          subTotal={totalRefundAmount}
          totalTaxes={calculateRefundTax().toFixed(2)}
          deliveryShippingTitle={deliveryShippingCharges().title}
          deliveryShippingCharges={deliveryShippingCharges().deliveryCharges}
          total={totalRefundableAmount().toFixed(2)}
        />
      )}

      <ReactNativeModal
        isVisible={inventoryModal}
        style={{
          width: Dimensions.get('window').width / 2.5,
          borderRadius: 10,
          alignSelf: 'center',
          backgroundColor: COLORS.white,
        }}
      >
        <InventoryProducts
          onPressCrossHandler={() => setInventoryModal(false)}
          clickedItem={selectedItem}
        />
      </ReactNativeModal>

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
};

const styles = StyleSheet.create({
  removeIcon: { width: ms(14), height: ms(14), resizeMode: 'contain' },
  removeContainer: {
    height: ms(20),
    width: ms(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ms(10),
  },
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    backgroundColor: COLORS.textInputBackground,
  },
  leftMainViewStyle: {
    flex: 0.58,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    height: height,
  },
  rowStyle: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: ms(7),
    paddingHorizontal: ms(2),
  },
  applicableViewStyle: {
    flexDirection: 'row',
    paddingLeft: ms(2),
    paddingRight: ms(2),
    alignItems: 'center',
  },
  checkBoxIconStyle: {
    width: scale(11),
    height: scale(11),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  applicableTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
    color: COLORS.navy_blue,
    paddingHorizontal: ms(1),
    textAlignVertical: 'center',
    letterSpacing: -1,
  },
  typeViewStyle: {
    flexDirection: 'row',
    ...ShadowStyles.shadow2,
    // height: ms(34),
    paddingVertical: ms(4),
  },
  applyRefundButton: {
    backgroundColor: COLORS.gerySkies,
    borderRadius: ms(15),
    paddingHorizontal: 8,
    paddingVertical: 10,
    marginLeft: ms(2),
    marginRight: ms(2),
  },
  dollarViewStyle: {
    paddingHorizontal: 13,
    alignItems: 'center',
    justifyContent: 'center',
    height: ms(15),
    alignSelf: 'center',
  },
  applyRefundButtonText: {
    fontFamily: Fonts.Regular,
    fontSize: SF(12),
    color: COLORS.white,
  },
  amountTypeView: {
    borderWidth: 1,
    borderRadius: ms(10),
    borderColor: COLORS.input_border,
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
    color: COLORS.navy_blue,
    maxHeight: ms(30),
  },
  blueListHeader: {
    backgroundColor: COLORS.white,
    height: SH(40),
    borderRadius: 5,
    justifyContent: 'center',
    marginHorizontal: ms(0),
  },
  displayflex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tableListSide: {
    width: width * 0.3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listLeft: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cashLabelWhite: {
    color: COLORS.light_blue2,
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
    width: Platform.OS === 'android' ? ms(80) : ms(60),
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
    color: COLORS.navy_blue,
    fontSize: ms(8),
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
    borderRadius: ms(5),
  },
  totalItemsText: {
    fontFamily: Fonts.MaisonBold,
    color: COLORS.navy_blue,
    fontSize: SF(16),
    // width: ms(150),
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: COLORS.navy_blue,
    borderStyle: 'dashed',
    marginVertical: ms(10),
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
    color: COLORS.light_blue2,
    fontSize: SF(14),
  },
  subTotalPrice: {
    fontFamily: Fonts.MaisonRegular,
    color: COLORS.light_blue2,
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
    // flex: 0.3,
    paddingHorizontal: 30,
    backgroundColor: COLORS.input_border,
    alignSelf: 'flex-end',
    width: ms(280),
    borderRadius: ms(10),
    paddingTop: 30,
    position: 'absolute',
    right: ms(20),
    bottom: ms(15),
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
  saveButtonTax: {
    backgroundColor: COLORS.navy_blue,
    // flex: 1,
    marginLeft: ms(10),
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: ms(100),
    paddingVertical: ms(5),
    alignSelf: 'flex-end',
  },
  saveButtonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: ms(11),
    fontFamily: Fonts.MaisonRegular,
    letterSpacing: -1,
  },

  arrowButton: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
    // tintColor: COLORS.solid_grey,
  },
});

export default memo(ProductRefund);
