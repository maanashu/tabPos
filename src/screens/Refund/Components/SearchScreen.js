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
import { debounce } from 'lodash';
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
import {
  getOrdersByInvoiceId,
  getOrdersByInvoiceIdSuccess,
  scanBarCode,
} from '@/actions/DashboardAction';
import ReturnOrderInvoice from './ReturnOrderInvoice';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { useCallback } from 'react';

const windowWidth = Dimensions.get('window').width;

export function SearchScreen(props) {
  let debounceTimeout;
  const textInputRef = useRef();
  const dispatch = useDispatch();
  const getSearchOrders = useSelector(getDashboard);
  const order = getSearchOrders?.invoiceSearchOrders;
  const param = props?.route?.params?.screen;
  const orderReciept = useSelector(getAnalytics);
  const [sku, setSku] = useState();
  const [isVisibleManual, setIsVisibleManual] = useState(false);
  const [showProductRefund, setShowProductRefund] = useState(false);
  const [isShowAttributeModal, setIsShowAttributeModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [finalOrderDetail, setFinalOrderDetail] = useState([]);
  const [isCheckConfirmationModalVisible, setIsCheckConfirmationModalVisible] = useState(false);

  useEffect(() => {
    if (param === 'return' || param === 'Dashboard') {
      setOrderDetail([]);
      setSku();
      setShowProductRefund(false);
      dispatch(getOrdersByInvoiceIdSuccess({}));
    }
  }, [param]);

  useEffect(() => {
    setShowProductRefund(false);
  }, []);

  useEffect(() => {
    setOrderDetail(order?.order?.order_details);
  }, [order, sku]);

  const cartHandler = (id, count) => {
    const getArray = orderDetail?.findIndex((attr) => attr?.id === id);
    if (getArray !== -1) {
      const newProdArray = [...orderDetail];
      if (newProdArray[0]?.attributes?.length > 0) {
        newProdArray[getArray].qty = count;
        newProdArray[getArray].isChecked = !newProdArray[getArray].isChecked;
        setOrderDetail(newProdArray);
        setIsShowAttributeModal(false);
      } else {
        newProdArray[getArray].isChecked = !newProdArray[getArray].isChecked;
        setOrderDetail(newProdArray);
      }
    } else {
      alert('Product not found in the order');
    }
  };

  const onSearchInvoiceHandler = (text) => {
    console.log('searched invoice text: ' + text);
    if (text.includes('Invoice_') || text.includes('invoice_')) {
      dispatch(scanBarCode(text));
    } else {
      dispatch(getOrdersByInvoiceId(text));
    }
  };

  const debouncedSearchInvoice = useCallback(debounce(onSearchInvoiceHandler, 800), []);

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID], state)
  );

  const isLoadingInvoice = useSelector((state) => isLoadingSelector([TYPES.GET_ORDER_DATA], state));

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
                    onChangeText={(text) => {
                      setSku(text);
                      debouncedSearchInvoice(text);
                    }}
                  />
                </View>
                <TouchableOpacity onPress={() => textInputRef.current.focus()}>
                  <Image source={scn} style={styles.scnStyle} />
                </TouchableOpacity>
              </View>

              <Spacer space={SH(25)} />

              <OrderWithInvoiceNumber orderData={order} />
            </View>

            {order?.order?.status === 9 && orderReciept?.getOrderData ? (
              <View style={styles.invoiceContainer}>
                <ReturnOrderInvoice orderDetail={orderReciept?.getOrderData} />
              </View>
            ) : (
              <OrderDetail
                orderData={order}
                checkboxHandler={cartHandler}
                enableModal={() => setIsVisibleManual(true)}
                onPress={() => setShowProductRefund(true)}
              />
            )}
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
            onPress={(modifiedOrderDetailArr) => {
              setShowProductRefund(true);
              setIsCheckConfirmationModalVisible(false);
              setFinalOrderDetail([...modifiedOrderDetailArr]);
            }}
            isVisible={isCheckConfirmationModalVisible}
            setIsVisible={setIsCheckConfirmationModalVisible}
          />

          {isLoading || isLoadingInvoice ? (
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
  invoiceContainer: { flex: 0.48, backgroundColor: COLORS.white, marginBottom: ms(10) },
});
