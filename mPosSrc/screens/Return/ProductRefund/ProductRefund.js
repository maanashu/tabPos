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
  editIcon,
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
import ReactNativeModal from 'react-native-modal';
import PartialRefund from '../Components/PartialRefund';
import EditPrice from '../Components/EditPrice';

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
  const [inventoryModal, setInventoryModal] = useState(false);
  const [isPartialRefund, setIsPartialRefund] = useState(false);
  const [isEditPrice, setIsEditPrice] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [selectedIndex, setSelectedIndex] = useState();

  const [isCheckConfirmationModalVisible, setIsCheckConfirmationModalVisible] = useState(false);

  const orderData = props?.route?.params?.data;
  const orderList = props?.route?.params?.list;

  const finalOrder = JSON.parse(JSON.stringify(orderData));
  finalOrder.order.order_details = orderList;

  console.log(JSON.stringify(finalOrder));

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

  const renderProductItem = ({ item, index }) => {
    console.log(item);
    return (
      <View style={styles.productMainViewStyle}>
        <View
          style={{
            paddingHorizontal: ms(5),
            flexDirection: 'row',
            flex: 0.05,
          }}
        >
          <Image source={{ uri: item?.product_image }} style={styles.productImageStyle} />

          <View style={{ paddingHorizontal: ms(10) }}>
            <Text style={styles.blueListDataText} numberOfLines={2}>
              {item?.product_name ?? '-'}
            </Text>

            <Text style={styles.skuNumber}>{item?.product_details?.sku ?? '-'}</Text>

            <Text
              style={[styles.blueListDataText, { fontFamily: Fonts.Regular }]}
              numberOfLines={1}
            >
              {`$${item?.price ?? '0'}  x  ${item?.qty}`}
            </Text>

            {item?.refundAmount ? (
              <View style={{ marginTop: ms(10), flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.refundAmountText}>{'Refund Amount:'}</Text>

                <Text style={styles.productCartBody}>{item?.refundAmount}</Text>
              </View>
            ) : null}
          </View>

          <View style={styles.editPriceViewStyle}>
            <TouchableOpacity
              onPress={() => {
                setIsEditPrice(true);
                setSelectedItem(item);
                setSelectedIndex(index);
              }}
            >
              <Image source={editIcon} style={styles.editIconStyle} />
            </TouchableOpacity>

            <Text style={styles.priceTextStyle}>{`$${item?.price * item?.qty}`}</Text>
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

  const getFinalRefundAmount = (val) => {
    console.log(JSON.stringify(val));
    setIsEditPrice(false);
    setOrders(val);
  };

  const onPresspartialHandler = (key, newText, item) => {
    console.log(JSON.stringify('key---------------------', key));
    console.log(JSON.stringify('newText============', newText));
    console.log(JSON.stringify('item=============', item));
  };

  return (
    <View style={styles.container}>
      <Header backRequired title={strings.deliveryOrders.back} />

      <Spacer space={SH(10)} />

      <TouchableOpacity onPress={() => setIsPartialRefund(true)} style={styles.partialButtonStyle}>
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

      <ReactNativeModal isVisible={isPartialRefund}>
        <PartialRefund
          setIsVisible={() => setIsPartialRefund(false)}
          // onPressApplyRefund={onPressRefundHandler}
        />
      </ReactNativeModal>

      <ReactNativeModal isVisible={isEditPrice}>
        <EditPrice
          setIsVisible={() => setIsEditPrice(false)}
          selected={selectedItem}
          index={selectedIndex}
          productsList={orders}
          saveRefundAmount={getFinalRefundAmount}
        />
      </ReactNativeModal>
    </View>
  );
}
