import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';

import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import RBSheet from 'react-native-raw-bottom-sheet';

import { COLORS, SH } from '@/theme';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { Fonts, editIcon } from '@/assets';
import EditPrice from '../Components/EditPrice';
import PartialRefund from '../Components/PartialRefund';
import { Header } from '@mPOS/components';
import { formattedReturnPrice } from '@/utils/GlobalMethods';
import RecheckConfirmation from '../Components/RecheckConfirmation';
import PaymentSelection from '../PaymentSelection/PaymentSelection';

import styles from './styles';
import { useDispatch } from 'react-redux';
import { getDrawerSessions } from '@/actions/CashTrackingAction';

export function ProductRefund(props) {
  const dispatch = useDispatch();
  const productDetailRef = useRef();
  const [isRefundDeliveryAmount, setIsRefundDeliveryAmount] = useState(false);
  const [orders, setOrders] = useState();
  const [isPartialRefund, setIsPartialRefund] = useState(false);
  const [isEditPrice, setIsEditPrice] = useState(false);
  const [applyEachItem, setApplyEachItem] = useState(false);
  const [selectType, setSelectType] = useState('dollar');
  const [buttonText, setButtonText] = useState('Apply Refund');
  const [changeView, setChangeView] = useState('TotalItems');
  const [selectedItem, setSelectedItem] = useState();
  const [selectedIndex, setSelectedIndex] = useState();
  const [isApplyAmount, setIsApplyAmount] = useState();
  const [modifiedArray, setModifiedArray] = useState();
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

  const totalRefundAmount = orders?.reduce((accumulator, currentValue) => {
    const price =
      isApplyAmount === 'applicableForAllItems' || isApplyAmount === 'applyForEachItem'
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
    if (finalOrder?.order?.delivery_charge != '0') {
      deliveryCharges = finalOrder?.order?.delivery_charge;
    } else if (finalOrder?.order?.shipping_charge != '0') {
      deliveryCharges = finalOrder?.order?.shipping_charge;
    } else {
      deliveryCharges = 0;
    }
    const total_payable_amount =
      parseFloat(deliveryCharges) + calculateRefundTax() + totalRefundAmount;

    return total_payable_amount || 0;
  };

  const deliveryShippingCharges = () => {
    let deliveryCharges;
    let title;
    if (finalOrder?.order?.delivery_charge != '0') {
      deliveryCharges = finalOrder?.order?.delivery_charge;
      title = 'Delivery Charges';
    } else if (finalOrder?.order?.shipping_charge != '0') {
      deliveryCharges = finalOrder?.order?.shipping_charge;
      title = 'Shipping Charges';
    } else {
      title = '';
      deliveryCharges = '0';
    }
    return { title, deliveryCharges };
  };

  const renderProductItem = ({ item, index }) => {
    return (
      <View style={styles.productMainViewStyle}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: ms(10),
          }}
        >
          <View>
            <Image source={{ uri: item?.product_image }} style={styles.productImageStyle} />
          </View>

          <View style={{ marginHorizontal: ms(10), width: ms(200) }}>
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
              style={{ flex: 0.5 }}
              onPress={() => {
                setIsEditPrice(true);
                setSelectedItem(item);
                setSelectedIndex(index);
              }}
            >
              <Image source={editIcon} style={styles.editIconStyle} />
            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'flex-end',
                flex: 0.5,
                alignItems: 'flex-end',
              }}
            >
              <Text style={styles.priceTextStyle}>{`$${item?.price * item?.qty}`}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const applyRefundHandler = (val) => {
    setIsApplyAmount('applicableForAllItems');
    setIsPartialRefund(false);
    setOrders(val);
  };

  const getFinalRefundAmount = (val) => {
    setIsEditPrice(false);
    setOrders(val);
    setIsApplyAmount('applyForEachItem');
  };
  const getOrdersDetail = () => {
    if (applyEachItem) {
      const newArray = orders.map((obj) => ({
        ...obj, // Copy all existing key-value pairs
        ['applyToEachItemKey']: applyEachItem, //
      }));
      setOrders(newArray);
      // setChangeView('PaymentScreen');
      productDetailRef?.current?.open();
    } else {
      // setChangeView('PaymentScreen');
      productDetailRef?.current?.open();
    }
  };

  return (
    <View style={styles.container}>
      <Header backRequired title={strings.deliveryOrders.back} />

      <Spacer space={SH(10)} />

      <TouchableOpacity onPress={() => setIsPartialRefund(true)} style={styles.partialButtonStyle}>
        <Text style={styles.partialButtonTextStyle}>{strings.returnOrder.partialReturn}</Text>
      </TouchableOpacity>

      <Spacer space={SH(20)} />

      <View style={{ height: ms(390) }}>
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

      <View style={styles.billViewStyle}>
        <Text
          style={styles.totalItemsText}
        >{`${strings.deliveryOrders.totalRefundItems} ${orders?.length}`}</Text>

        <Spacer space={SH(10)} />

        <View style={styles.amountViewStyle}>
          <Text style={styles.labelTextStyle}>{strings.deliveryOrders.subTotal}</Text>
          <Text style={styles.priceValueText}>{`${formattedReturnPrice(totalRefundAmount)}`}</Text>
        </View>

        <Spacer space={SH(10)} />

        <View style={styles.amountViewStyle}>
          <Text style={styles.labelTextStyle}>{strings.deliveryOrders.totalTax}</Text>
          <Text style={styles.priceValueText}>{`${formattedReturnPrice(
            calculateRefundTax()
          )}`}</Text>
        </View>

        {finalOrder?.order?.delivery_charge !== '0' ||
        finalOrder?.order?.shipping_charge !== '0' ? (
          <>
            <Spacer space={SH(10)} />
            <View style={styles.amountViewStyle}>
              <Text style={styles.labelTextStyle}>{deliveryShippingCharges().title}</Text>
              <Text style={styles.priceValueText}>{`${formattedReturnPrice(
                deliveryShippingCharges().deliveryCharges
              )}`}</Text>
            </View>
            <Spacer space={SH(10)} />
          </>
        ) : null}

        <Spacer space={SH(10)} />

        <View style={styles.amountViewStyle}>
          <Text style={[styles.labelTextStyle, { fontFamily: Fonts.MaisonBold }]}>
            {strings.wallet.total}
          </Text>
          <Text style={[styles.totalValueText, { fontFamily: Fonts.MaisonBold }]}>
            {`${formattedReturnPrice(totalRefundableAmount())}`}
          </Text>
        </View>

        <Spacer space={SH(20)} />

        <TouchableOpacity
          onPress={() => {
            dispatch(getDrawerSessions());
            if (finalOrder?.order?.order_type === 'service') {
              setIsCheckConfirmationModalVisible(false);
              getOrdersDetail();
            } else {
              setIsCheckConfirmationModalVisible(true);
            }
          }}
          disabled={orders?.length > 0 ? false : true}
          style={[styles.buttonStyle, { backgroundColor: COLORS.primary }]}
        >
          <Text
            style={[styles.buttonTextStylem, { color: COLORS.white, fontFamily: Fonts.SemiBold }]}
          >
            {strings.management.next}
          </Text>
        </TouchableOpacity>

        <Spacer space={SH(20)} />
      </View>

      <ReactNativeModal isVisible={isPartialRefund}>
        <PartialRefund
          setIsVisible={() => setIsPartialRefund(false)}
          productsList={orders}
          onPressApplyRefund={applyRefundHandler}
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

      <ReactNativeModal isVisible={isCheckConfirmationModalVisible}>
        <RecheckConfirmation
          isVisible={isCheckConfirmationModalVisible}
          setIsVisible={setIsCheckConfirmationModalVisible}
          orderList={orders}
          onPress={(modifiedOrderDetailArr) => {
            setModifiedArray([...modifiedOrderDetailArr]);
            setIsCheckConfirmationModalVisible(false);
            setTimeout(() => {
              productDetailRef.current?.open();
            }, 500);
          }}
        />
      </ReactNativeModal>

      <RBSheet
        ref={productDetailRef}
        height={ms(550)}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: ms(10),
          },
        }}
      >
        <PaymentSelection
          closeSheet={() => productDetailRef?.current?.close()}
          data={finalOrder}
          totalRefundAmount={totalRefundAmount}
          totalTaxes={calculateRefundTax().toFixed(2)}
          deliveryShippingTitle={deliveryShippingCharges().title}
          deliveryShippingCharges={deliveryShippingCharges().deliveryCharges}
          total={totalRefundableAmount().toFixed(2)}
          payableAmount={totalRefundableAmount()}
          isApplyAmount={isApplyAmount}
        />
      </RBSheet>
    </View>
  );
}
