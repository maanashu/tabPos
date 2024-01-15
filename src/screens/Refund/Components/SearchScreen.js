import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Text,
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
import { Fonts, scanNew, scn, searchDrawer, search_light } from '@/assets';
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
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { CustomHeader } from '@/screens/PosRetail3/Components';

const windowWidth = Dimensions.get('window').width;

export function SearchScreen(props) {
  const textInputRef = useRef();
  const dispatch = useDispatch();
  const getSearchOrders = useSelector(getDashboard);
  const order = getSearchOrders?.invoiceSearchOrders;
  const param = props?.route?.params?.screen;
  const serachInvoice = props?.route?.params?.invoiceNumber;
  const [sku, setSku] = useState();
  const [isVisibleManual, setIsVisibleManual] = useState(false);
  const [showProductRefund, setShowProductRefund] = useState(false);
  const [isShowAttributeModal, setIsShowAttributeModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [finalOrderDetail, setFinalOrderDetail] = useState([]);
  const [isCheckConfirmationModalVisible, setIsCheckConfirmationModalVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      if (param === 'return' || param === 'Dashboard') {
        setOrderDetail([]);
        setSku();
        setShowProductRefund(false);
        dispatch(getOrdersByInvoiceIdSuccess({}));
      }
    }, [param])
  );

  useEffect(() => {
    if (serachInvoice) {
      setSku(serachInvoice);
      onSearchInvoiceHandler(serachInvoice);
    }
  }, [serachInvoice]);

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
    if (text.includes('Invoice_') || text.includes('invoice_') || text.includes('rtrn_invce_')) {
      dispatch(scanBarCode(text));
    } else {
      dispatch(getOrdersByInvoiceId(text));
    }
  };

  const debouncedSearchInvoice = useCallback(debounce(onSearchInvoiceHandler, 800), []);

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID], state)
  );

  return (
    <View style={styles.container}>
      {!showProductRefund ? (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Header />
            <View style={{ flex: 0.85, marginHorizontal: ms(15) }}>
              <CustomHeader />
            </View>
          </View>
          {/* <Spacer space={SH(20)} /> */}
          <View style={styles.leftViewStyle}>
            <View style={styles.textInputMainViewStyle}>
              <View style={styles.inputWraper}>
                <View style={styles.displayRow}>
                  <Image source={searchDrawer} style={styles.searchStyle} />
                  <TextInput
                    value={sku}
                    ref={textInputRef}
                    style={styles.searchInput}
                    placeholder={'Search invoice here'}
                    onChangeText={(text) => {
                      setSku(text);
                      debouncedSearchInvoice(text);
                    }}
                    placeholderTextColor={COLORS.light_blue2}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => textInputRef.current.focus()}
                  style={{
                    backgroundColor: COLORS.light_blue,
                    padding: ms(5),
                    borderRadius: ms(20),
                  }}
                >
                  <Image source={scanNew} style={styles.scnStyle} />
                </TouchableOpacity>
              </View>

              <Spacer space={SH(25)} />
              {order?.invoice_number ? (
                <Text
                  style={{ marginHorizontal: ms(30), fontSize: ms(11), color: COLORS.navy_blue }}
                >
                  {'Invoices'}
                  <Text style={{ color: COLORS.light_blue2 }}>
                    ({order?.invoice_number ? `${order?.invoice_number}` : ''})
                  </Text>
                </Text>
              ) : null}

              <OrderWithInvoiceNumber orderData={order} />
            </View>

            {((order?.order?.status === 9 ||
              order?.order?.status === 7 ||
              order?.order?.status === 8) &&
              order?.return !== null) ||
            (order?.order === null && order?.return !== null) ? (
              <View style={styles.invoiceContainer}>
                <ReturnOrderInvoice orderDetail={order} />
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
    borderWidth: 1,
    borderRadius: ms(20),
    height: ms(35),
    // width: windowWidth / 2.3,
    borderColor: COLORS.input_border,
    top: 20,
    paddingHorizontal: ms(5),
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: ms(30),
    width: windowWidth / 2.9,
  },
  searchStyle: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: ms(8),
  },
  searchInput: {
    borderRadius: 7,
    height: ms(20),
    width: windowWidth * 0.4,
    fontFamily: Fonts.Italic,
    padding: 0,
    margin: 0,
    color: COLORS.navy_blue,
  },
  scnStyle: {
    width: ms(14),
    height: ms(15),
    resizeMode: 'contain',
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
