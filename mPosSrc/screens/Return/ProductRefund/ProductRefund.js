import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Dimensions, TouchableOpacity, FlatList } from 'react-native';

import { useDispatch } from 'react-redux';
import { ms, scale } from 'react-native-size-matters';

import {
  Fonts,
  plus,
  minus,
  PaymentDone,
  borderCross,
  checkedCheckboxSquare,
  blankCheckBox,
  sellingArrow,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import { getDrawerSessions } from '@/actions/CashTrackingAction';
import { Images } from '@mPOS/assets';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { ScreenWrapper, Spacer } from '@/components';
import styles from './styles';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import { Header } from '@mPOS/components';

const { width, height } = Dimensions.get('window');

export function ProductRefund(props) {
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

  const orderData = props?.route?.params?.data;
  const orderList = props?.route?.params?.list;

  const finalOrder = JSON.parse(JSON.stringify(orderData));
  finalOrder.order.order_details = orderList;

  useEffect(() => {
    if (orderData?.order) {
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

    const updatedDataArray = orders?.map((order, index) => {
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
    const originalOrderArr = orderList[itemIndex];

    if (symbol === '+' && selectedItem.qty < originalOrderArr.qty) {
      selectedItem.qty += 1;
      selectedItem.totalRefundAmount = selectedItem.qty * selectedItem.refundAmount;
    } else if (symbol === '-' && selectedItem.qty > 1) {
      selectedItem.qty -= 1;
      selectedItem.totalRefundAmount = selectedItem.qty * selectedItem.refundAmount;
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
    let deliveryCharges;
    if (finalOrder?.order?.status === 5 && finalOrder?.order?.delivery_option === '1') {
      deliveryCharges = finalOrder?.order?.delivery_charge;
    } else if (finalOrder?.order?.status === 5 && finalOrder?.order?.delivery_option === '3') {
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
    if (finalOrder?.order?.status === 5 && finalOrder?.order?.delivery_option === '1') {
      deliveryCharges = finalOrder?.order?.delivery_charge;
      title = 'Delivery Charges';
    } else if (finalOrder?.order?.status === 5 && finalOrder?.order?.delivery_option === '3') {
      deliveryCharges = finalOrder?.order?.shipping_charge;
      title = 'Shipping Charges';
    } else {
      title = '';
      deliveryCharges = '0';
    }
    return { title, deliveryCharges };
  };

  const renderProductItem = ({ item, index }) => (
    <View style={styles.productMainViewStyle}>
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: ms(5),
          flexDirection: 'row',
        }}
      >
        <Image source={{ uri: item?.product_image }} style={styles.productImageStyle} />

        <View style={{ paddingHorizontal: ms(10) }}>
          <Text style={styles.blueListDataText} numberOfLines={2}>
            {item?.product_name ?? '-'}
          </Text>
          <Text style={styles.skuNumber}>{item?.product_details?.sku ?? '-'}</Text>

          <Text style={[styles.blueListDataText, { fontFamily: Fonts.Regular }]} numberOfLines={1}>
            {`$${item?.price ?? '0'}  x  ${item?.qty}`}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.refundAmountText}>{'Refund Amount:'}</Text>

            <TextInput
              style={styles.productCartBody}
              value={item?.refundAmount}
              keyboardType={'number-pad'}
              onChangeText={(text) => {
                refundHandler(index, text, item);
              }}
            />
          </View>
        </View>
      </View>

      {/* <View style={styles.displayflex}>
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
      </View> */}
    </View>
  );

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
            source={Images.tick}
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
        ...obj, // Copy all existing key-value pairs
        ['applyToEachItemKey']: applyEachItem, //
      }));
      setOrders(newArray);
      commonNavigate(MPOS_NAVIGATION.paymentSelection);
    } else {
      commonNavigate(MPOS_NAVIGATION.paymentSelection);
    }
  };

  return (
    <View style={styles.container}>
      <Header backRequired title={strings.deliveryOrders.back} />

      <Spacer space={SH(10)} />

      <TouchableOpacity style={styles.partialButtonStyle}>
        <Text style={styles.partialButtonTextStyle}>{strings.returnOrder.partialReturn}</Text>
      </TouchableOpacity>

      <Spacer space={SH(20)} />

      <FlatList
        scrollEnabled
        data={orders}
        extraData={orders}
        renderItem={renderProductItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item?.id?.toString()}
        contentContainerStyle={styles.contentContainerStyle}
      />

      {/* <View style={styles.leftMainViewStyle}>
        <View style={styles.rowStyle}>
          {finalOrder?.order?.delivery_charge == '0' ||
            (finalOrder?.order?.shipping_charge == '0' && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setIsRefundDeliveryAmount(!isRefundDeliveryAmount);
                  }}
                >
                  <Image
                    source={isRefundDeliveryAmount ? checkedCheckboxSquare : blankCheckBox}
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

                const updatedDataArray = orders.map((item) => ({
                  ...item,
                  refundAmount: isPercentageLabel
                    ? (item.price * parseFloat(text)) / 100
                    : parseFloat(text),
                  totalRefundAmount: isPercentageLabel
                    ? (item.price * parseFloat(text) * item.qty) / 100
                    : parseFloat(text) * item.qty,
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
                        : selectType === strings.returnOrder.dollarLabel && !applyEachItem && amount
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
                    const updatedDataArray = orders.map((item, index) => {
                      return { ...item, refundAmount: 0, totalRefundAmount: 0 };
                    });
                    setOrders(updatedDataArray);
                  }}
                >
                  <Image source={blankCheckBox} style={styles.checkBoxIconStyle} />
                </TouchableOpacity>
              )}
              <Text style={styles.applicableTextStyle}>{strings.returnOrder.applyEachItem}</Text>
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
              <View style={styles.productCartBody}>
                <Text style={styles.cashLabelWhite}></Text>
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
        >{`${strings.deliveryOrders.totalRefundItems} ${orderList?.length}`}</Text>

        <Spacer space={SH(10)} />

        <View style={styles.totalViewStyle}>
          <Text style={styles.subTotalText}>{strings.deliveryOrders.subTotal}</Text>
          <Text style={styles.subTotalPrice}>{`${formattedReturnPrice(totalRefundAmount)}`}</Text>
        </View>

        <Spacer space={SH(10)} />

        <View style={styles.totalViewStyle}>
          <Text style={styles.subTotalText}>{strings.deliveryOrders.totalTax}</Text>
          <Text style={styles.subTotalPrice}>{`${formattedReturnPrice(
            calculateRefundTax()
          )}`}</Text>
        </View>

        {finalOrder?.order?.status === 5 && isRefundDeliveryAmount ? (
          <>
            <Spacer space={SH(10)} />
            <View style={styles.totalViewStyle}>
              <Text style={styles.subTotalText}>{deliveryShippingCharges().title}</Text>
              <Text style={styles.subTotalPrice}>{`${formattedReturnPrice(
                deliveryShippingCharges().deliveryCharges
              )}`}</Text>
            </View>
            <Spacer space={SH(10)} />
          </>
        ) : null}

        <Spacer space={SH(10)} />

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
          onPress={() => {
            if (finalOrder?.order?.order_type === 'service') {
              setIsCheckConfirmationModalVisible(false);
              getOrdersDetail();
            } else {
              setIsCheckConfirmationModalVisible(true);
            }
          }}
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
      </View> */}
    </View>
  );
}
