import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, ms } from 'react-native-size-matters';

import Header from './Header';
import { Spacer } from '@/components';
import OrderDetail from './OrderDetail';
import ManualEntry from './ManualEntry';
import { COLORS, SH, SW } from '@/theme';
import ProductRefund from './ProductRefund';
import ShowAttributes from './ShowAttributes';
import { Fonts, scn, search_light } from '@/assets';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import RecheckConfirmation from './RecheckConfirmation';
import { getDashboard } from '@/selectors/DashboardSelector';
import OrderWithInvoiceNumber from './OrderWithInvoiceNumber';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getOrdersByInvoiceId, getOrdersByInvoiceIdSuccess } from '@/actions/DashboardAction';

const windowWidth = Dimensions.get('window').width;

export function SearchScreen() {
  let debounceTimeout;
  const textInputRef = useRef();
  const dispatch = useDispatch();
  const getSearchOrders = useSelector(getDashboard);
  const order = getSearchOrders?.invoiceSearchOrders;

  const [sku, setSku] = useState();
  const [isVisibleManual, setIsVisibleManual] = useState(false);
  const [showProductRefund, setShowProductRefund] = useState(false);
  const [isShowAttributeModal, setIsShowAttributeModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState(order?.order?.order_details ?? []);
  const [isCheckConfirmationModalVisible, setIsCheckConfirmationModalVisible] = useState(false);

  useEffect(() => {
    setShowProductRefund(false);
  }, []);

  useEffect(() => {
    setOrderDetail(order?.order?.order_details);
  }, [order?.order?.order_details && sku]);

  const cartHandler = (id, count) => {
    const getArray = orderDetail?.findIndex((attr) => attr?.id === id);
    if (getArray !== -1) {
      const newProdArray = [...orderDetail];
      if (newProdArray[0]?.attributes?.length > 0) {
        newProdArray[getArray].qty = count;
        newProdArray[getArray].isChecked = true;
        setOrderDetail(newProdArray);
        setIsShowAttributeModal(false);
      } else {
        newProdArray[getArray].isChecked = true;
        setOrderDetail(newProdArray);
      }
    } else {
      alert('Product not found in the order');
    }
  };

  const onSearchInvoiceHandler = (text) => {
    console.log('text====', text);
    if (text) {
      setSku(text);
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        dispatch(getOrdersByInvoiceId(text));
      }, 500);
    } else {
      setSku('');
      dispatch(getOrdersByInvoiceIdSuccess({}));
    }
  };

  // const attributesHandler = () => {
  //   const getArray = orderDetail?.findIndex((attr) => attr?.product_id === id);
  //   if (getArray !== -1) {
  //     const newProdArray = [...orderDetail];
  //     console.log('newProdArray====', JSON.stringify(newProdArray));
  //     if (newProdArray[0]?.attributes?.length > 0) {
  //       setOrderDetail(newProdArray);
  //     }
  //     // newProdArray[getArray].isChecked = true;
  //     // setOrderDetail(newProdArray);
  //   } else {
  //     alert('Product not found in the order');
  //   }
  // }

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID], state)
  );

  return (
    <View style={styles.container}>
      {!showProductRefund ? (
        <>
          <Header />
          <Spacer space={SH(20)} />
          <View style={styles.leftViewStyle}>
            <View style={styles.textInputMainViewStyle}>
              <View style={styles.inputWraper}>
                <View style={styles.displayRow}>
                  <Image source={search_light} style={styles.searchStyle} />
                  <TextInput
                    value={sku}
                    ref={textInputRef}
                    style={styles.searchInput}
                    placeholder={'Search invoice here'}
                    onChangeText={(text) => onSearchInvoiceHandler(text)}
                  />
                </View>
                <TouchableOpacity onPress={() => textInputRef.current.focus()}>
                  <Image source={scn} style={styles.scnStyle} />
                </TouchableOpacity>
              </View>

              <Spacer space={SH(25)} />

              <OrderWithInvoiceNumber orderData={order} />
            </View>

            <OrderDetail
              orderData={order}
              checkboxHandler={cartHandler}
              enableModal={() => setIsVisibleManual(true)}
              onPress={() => setIsCheckConfirmationModalVisible(true)}
            />
          </View>

          <ManualEntry
            onPressCart={cartHandler}
            isVisible={isVisibleManual}
            setIsVisible={setIsVisibleManual}
          />

          {order && (
            <ShowAttributes
              order={orderDetail}
              cartHandler={cartHandler}
              isVisible={isShowAttributeModal}
              setIsVisible={setIsShowAttributeModal}
            />
          )}

          <RecheckConfirmation
            orderList={orderDetail}
            onPress={() => {
              setShowProductRefund(true);
              setIsCheckConfirmationModalVisible(false);
            }}
            isVisible={isCheckConfirmationModalVisible}
            setIsVisible={setIsCheckConfirmationModalVisible}
          />

          {isLoading ? (
            <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0,0.2)' }]}>
              <ActivityIndicator color={COLORS.primary} style={styles.loader} size={'large'} />
            </View>
          ) : null}
        </>
      ) : (
        <ProductRefund
          orderData={order}
          orderList={orderDetail}
          backHandler={() => setShowProductRefund(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.textInputBackground,
  },
  loader: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  inputWraper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    marginHorizontal: ms(10),
    borderWidth: 0.5,
    borderRadius: 7,
    height: ms(35),
    width: windowWidth / 2.3,
    borderColor: COLORS.silver_solid,
    top: 20,
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(30),
    width: windowWidth / 2.8,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(5),
  },
  searchInput: {
    borderRadius: 7,
    height: ms(20),
    width: windowWidth * 0.4,
    fontFamily: Fonts.Italic,
    padding: 0,
    margin: 0,
  },
  scnStyle: {
    width: SW(16),
    height: SW(17),
    resizeMode: 'contain',
    right: 5,
  },
  textInputMainViewStyle: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flex: 0.5,
    marginBottom: ms(10),
  },
  leftViewStyle: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: ms(10),
  },
});
