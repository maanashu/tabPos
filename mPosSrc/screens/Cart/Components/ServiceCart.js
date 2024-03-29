import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { styles } from '../styles';
import { COLORS, Fonts, SH } from '@/theme';
import { ms } from 'react-native-size-matters';
import { Images } from '@mPOS/assets';
import AddNotes from '@mPOS/screens/Cart/Components/AddNotes';
import AddDiscount from '@mPOS/screens/Cart/Components/AddDiscount';
import ClearCart from '@mPOS/screens/Cart/Components/ClearCart';
import CustomProductAdd from '@mPOS/screens/Cart/Components/CustomProductAdd';
import PriceChange from '@mPOS/screens/Cart/Components/PriceChange';
import Modal from 'react-native-modal';
import { strings } from '@mPOS/localization';
import { FullScreenLoader, Spacer } from '@mPOS/components';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { formattedReturnPrice } from '@mPOS/utils/GlobalMethods';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import {
  changeStatusProductCart,
  changeStatusServiceCart,
  clearAllCart,
  clearServiceAllCart,
  getAllCart,
  getAllProductCart,
  getAllServiceCart,
  getAvailableOffer,
  getServiceCart,
  getServiceCartSuccess,
  getTip,
  updateServiceCartQty,
} from '@/actions/RetailAction';
import CartAmountByPay from './CartAmountByPay';
import PayByCash from './PayByCash';
import { TYPES } from '@/Types/Types';
import FinalPayment from './FinalPayment';
import { getDrawerSessions } from '@/actions/CashTrackingAction';
import ProductCustomerAdd from './ProductCustomerAdd';
import { NewCustomerAdd } from '@/screens/PosRetail3/Components/NewCustomerAdd';
import JbrCoin from './JbrCoin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { updateServiceCartLength } from '@/actions/CartAction';
import { getServiceCartLength } from '@/selectors/CartSelector';
import { ReactNativeModal } from 'react-native-modal';
import AvailableOffer from './AvailableOffer';
import { AddServiceCartModal } from '@mPOS/screens/HomeTab/Services/AddServiceCart';
import AddServiceCart from '@mPOS/screens/HomeTab/RetailServices/Components/AddServiceCart';
import moment from 'moment';
import CustomAlert from '@/components/CustomAlert';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION } from '@common/commonImports';
import { amountFormat, convertUTCTimeToCurrentTime } from '@/utils/GlobalMethods';

export function ServiceCart({ cartChangeHandler }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const serviceCartData = retailData?.getAllCart;
  const payByCashRef = useRef(null);
  const availableOfferRef = useRef(null);
  const addServiceCartRef = useRef(null);
  const jbrCoinRef = useRef(null);
  const finalPaymentRef = useRef(null);
  const cartAmountByPayRef = useRef(null);
  const [cartProduct, setCartProduct] = useState();
  const [addNotes, setAddNotes] = useState(false);
  const [addDiscount, setAddDiscount] = useState(false);
  const [clearCart, setClearCart] = useState(false);
  const [customProductAdd, setCustomProductAdd] = useState(false);
  const [priceChange, setPriceChange] = useState(false);
  const [orderCreateData, setOrderCreateData] = useState();
  const [saveCart, setSaveCart] = useState();
  const [productCustomerAdd, setProductCustomerAdd] = useState(false);
  const serviceCartArray = retailData?.getAllProductCart;
  const holdServiceArray = serviceCartArray?.filter((item) => item.is_on_hold === true);
  const CART_LENGTH = useSelector(getServiceCartLength);
  const poscart = serviceCartData?.poscart_products || [];
  const onlyServiceCartArray = poscart?.filter((item) => item?.product_type === 'service');
  const onlyProductCartArray = poscart?.filter((item) => item?.product_type === 'product');
  const productCartArray = retailData?.getAllProductCart;
  const holdProductArray = productCartArray?.filter((item) => item.is_on_hold === true);
  const isLoading = useSelector((state) =>
    isLoadingSelector(
      [
        TYPES.ADDNOTES,
        TYPES.ADD_SERVICE_DISCOUNT,
        // TYPES.GET_SERVICE_CART,
        TYPES.SERVICE_UPDATE_PRICE,
        TYPES.CUSTOM_PRODUCT_ADD,
        TYPES.GET_ALL_CART,
        // TYPES.GET_ALL_SERVICE_CART,
        TYPES.UPDATE_CART_BY_TIP,
        TYPES.ATTACH_SERVICE_CUSTOMER,
        TYPES.CHANGE_STATUS_SERVICE_CART,
        // TYPES.CLEAR_SERVICE_ALL_CART,
        TYPES.CUSTOM_SERVICE_ADD,
        TYPES.GET_AVAILABLE_OFFER,
        TYPES.ATTACH_CUSTOMER,
        TYPES.PRODUCT_UPDATE_PRICE,
        TYPES.CHANGE_STATUS_PRODUCT_CART,
      ],
      state
    )
  );

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => ;
  //   }, [])
  // );

  useEffect(() => {
    dispatch(getAllCart());
    dispatch(getAllProductCart());
    // dispatch(getServiceCart());
    // dispatch(getAllServiceCart());
    if (!isFocused) {
      backCartLoad();
    }
  }, [isFocused]);

  // const payNowHandler = useCallback(() => {
  //   if (Object.keys(serviceCartData?.user_details)?.length === 0) {
  //     setProductCustomerAdd(true);
  //   } else {
  //     dispatch(getDrawerSessions());
  //     dispatch(getTip());
  //     cartAmountByPayRef.current?.present();
  //   }
  // }, []);
  const payNowHandler = () => {
    if (Object.keys(serviceCartData?.user_details)?.length === 0) {
      setProductCustomerAdd(true);
    } else {
      dispatch(getDrawerSessions());
      dispatch(getTip());
      cartAmountByPayRef.current?.present();
    }
  };
  const cartAmountByPayCross = useCallback(() => {
    cartAmountByPayRef.current?.dismiss();
  }, []);

  const cashPayNowHandler = useCallback(() => {
    cartAmountByPayRef.current?.dismiss();
    payByCashRef.current?.present();
  }, []);

  const payByCashhandler = (cartData, data) => {
    setOrderCreateData(data);
    setSaveCart(cartData);
    finalPaymentRef.current?.present();
    payByCashRef.current?.dismiss();
  };

  const payByCashCrossHandler = useCallback(() => {
    payByCashRef.current?.dismiss();
    // cartAmountByPayRef.current?.present();
  }, []);

  const finalPaymentCrossHandler = useCallback(() => {
    finalPaymentRef.current?.dismiss();
    payByCashRef.current?.dismiss();
    cartAmountByPayRef.current?.dismiss();
    navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.home });
    // commonNavigate(MPOS_NAVIGATION.retailProducts);
  }, []);

  const jbrCoinSheetshow = useCallback(() => {
    jbrCoinRef.current.present();
  }, []);

  const jbrCoinCrossHandler = useCallback(() => {
    jbrCoinRef.current.dismiss();
  }, []);

  const payByJbrCoinHandler = (cartData, data) => {
    setOrderCreateData(data);
    setSaveCart(cartData);
    jbrCoinRef.current.dismiss();
    finalPaymentRef.current?.present();
  };

  const payByJbrHandler = (cartData, data) => {
    setOrderCreateData(data);
    setSaveCart(cartData);
    jbrCoinRef.current.dismiss();
    finalPaymentRef.current?.present();
  };

  const onRowDidOpen = (rowKey) => {};

  // hold product Function
  // const cartStatusHandler = () => {
  //   const data =
  //     holdServiceArray?.length > 0
  //       ? {
  //           status: !holdServiceArray?.[0]?.is_on_hold,
  //           cartId: holdServiceArray?.[0]?.id,
  //         }
  //       : {
  //           status: !serviceCartData?.is_on_hold,
  //           cartId: serviceCartData?.id,
  //         };
  //   dispatch(changeStatusServiceCart(data));
  // };

  const cartStatusHandler = () => {
    const data =
      holdProductArray?.length > 0
        ? {
            status: !holdProductArray?.[0]?.is_on_hold,
            cartId: holdProductArray?.[0]?.id,
          }
        : {
            status: !serviceCartData?.is_on_hold,
            cartId: serviceCartData?.id,
          };
    dispatch(changeStatusProductCart(data));
  };

  const backCartLoad = () => {
    const arr = serviceCartData;
    // if (arr?.appointment_cart_products?.length > 0) {
    const products = arr?.poscart_products?.map((item) => ({
      product_id: item?.product_id,
      qty: item?.qty,
    }));
    const data = {
      updated_products: products,
    };
    dispatch(updateServiceCartQty(data, arr.id));
    // }
  };
  function calculatePercentageValue(value, percentage) {
    if (percentage == '') {
      return '';
    }
    const percentageValue = (percentage / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  }
  const removeOneCartHandler = (index) => {
    var arr = retailData?.getAllCart;
    if (arr?.poscart_products?.length == 1 && index == 0) {
      // dispatch(clearServiceAllCart());
      dispatch(clearAllCart());
    } else {
      const product = arr?.poscart_products[index];
      const productPrice = product?.product_details?.supply?.supply_prices?.selling_price;
      if (product?.qty > 0) {
        // arr.amount.total_amount -= productPrice * product.qty;
        arr.amount.products_price -= productPrice * product.qty;
        arr.poscart_products.splice(index, 1);
      }
      const totalAmount = arr.amount.products_price;
      const TAX = calculatePercentageValue(totalAmount, parseInt(arr.amount.tax_percentage));
      arr.amount.tax = parseFloat(TAX);
      arr.amount.total_amount = arr.amount.products_price + arr.amount.tax;

      var DATA = {
        payload: arr,
      };
      dispatch(updateServiceCartLength(CART_LENGTH - 1));
      dispatch(getServiceCartSuccess(DATA));
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.cartScreenHeader]}>
        <TouchableOpacity
          style={styles.serviceCart}
          onPress={() => {
            if (onlyServiceCartArray?.length >= 1) {
              CustomAlert({
                title: 'Alert',
                description: 'Please clear service cart',
                yesButtonTitle: 'Clear cart',
                noButtonTitle: 'Cancel',
                onYesPress: () => {
                  dispatch(clearAllCart());
                },
              });
            } else {
              backCartLoad();
              cartChangeHandler();
            }
          }}
        >
          <Text style={styles.serviceCartText}>{'Product Cart'}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              opacity: onlyServiceCartArray?.length > 0 ? 1 : 0.5,
            }}
            pointerEvents={onlyServiceCartArray?.length > 0 ? 'auto' : 'none'}
          >
            <TouchableOpacity
              style={styles.headerImagecCon}
              onPress={() => {
                backCartLoad();
                setProductCustomerAdd((prev) => !prev);
              }}
            >
              <Image source={Images.addCustomerIcon} style={styles.headerImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerImagecCon}
              onPress={() => {
                backCartLoad();
                setAddNotes((prev) => !prev);
              }}
            >
              <Image source={Images.notes} style={styles.headerImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerImagecCon}
              onPress={() => {
                backCartLoad();
                setAddDiscount((prev) => !prev);
              }}
            >
              <Image source={Images.discountOutline} style={styles.headerImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerImagecCon}
              onPress={() => setClearCart((prev) => !prev)}
            >
              <Image source={Images.ClearEraser} style={styles.headerImage} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.headerImagecCon}
            onPress={() => {
              backCartLoad();
              cartStatusHandler();
            }}
          >
            <Image source={Images.pause} style={styles.holdImage(holdServiceArray)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerImagecCon}
            onPress={() => {
              backCartLoad();
              setCustomProductAdd((prev) => !prev);
            }}
          >
            <Image source={Images.fluent} style={styles.headerImage} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, paddingHorizontal: ms(10) }}>
        <View style={styles.searchMainView}>
          <Image source={Images.search} style={styles.searchIconStyle} />

          <TextInput
            placeholder={strings.homeTab.placeholder}
            style={styles.searchTextInputStyle}
          />
        </View>

        <View style={styles._flatListContainer}>
          <SwipeListView
            showsVerticalScrollIndicator={false}
            data={onlyServiceCartArray}
            extraData={onlyServiceCartArray}
            keyExtractor={(data, index) => data?.item?.id}
            renderItem={(data, ind) => {
              return (
                <View style={styles.cartProductCon} key={data?.item?.index}>
                  <View style={[styles.disPlayFlex]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        source={{ uri: data?.item?.product_details?.image }}
                        style={{ width: ms(35), height: ms(35) }}
                      />
                      <View style={{ marginLeft: ms(10), flex: 0.9 }}>
                        <Text style={styles.cartProductName} numberOfLines={1}>
                          {data?.item?.product_details?.name}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={[styles.cartPrice, { fontFamily: Fonts.Regular }]}>
                            {data?.item?.pos_user_details?.user?.user_profiles?.firstname}
                          </Text>
                          <Text style={styles.verticalRow}>{'|'}</Text>
                          <Text style={[styles.sukNumber, styles.timeitalic]}>
                            {moment.utc(data?.item?.date).format('LL')}
                            {/* {convertUTCTimeToCurrentTime(data?.item?.date)} */}@
                            {data?.item?.start_time + '-' + data?.item?.end_time}
                          </Text>
                        </View>
                        <Spacer space={SH(2)} />
                        {data?.item?.product_details?.supply?.approx_service_time == null ? (
                          <Text style={styles.sukNumber}>Estimated Time Not found</Text>
                        ) : (
                          <Text style={styles.sukNumber}>
                            Est: {data?.item?.product_details?.supply?.approx_service_time} min
                          </Text>
                        )}
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: ms(3),
                          }}
                        >
                          <Text style={[styles.cartPrice, { fontFamily: Fonts.Regular }]}>
                            ${data?.item?.product_details?.supply?.supply_prices?.selling_price}
                          </Text>
                        </View> */}
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          backCartLoad();
                          setPriceChange((prev) => !prev);
                          setCartProduct(data?.item);
                        }}
                      >
                        <Image source={Images.pencil} style={styles.pencil} />
                      </TouchableOpacity>
                      {data?.item?.product_details?.supply?.offer?.offer_price_per_pack &&
                      data?.item?.product_details?.supply?.supply_prices?.selling_price ? (
                        <Text style={[styles.cartPrice, { marginTop: ms(15) }]}>
                          $
                          {data?.item?.product_details?.supply?.offer?.offer_price_per_pack?.toFixed(
                            2
                          )}
                        </Text>
                      ) : (
                        <Text style={[styles.cartPrice, { marginTop: ms(15) }]}>
                          $
                          {data?.item?.product_details?.supply?.supply_prices?.selling_price?.toFixed(
                            2
                          )}
                        </Text>
                      )}
                      {/* <Text style={[styles.cartPrice, { marginTop: ms(15) }]}>
                        $
                        {data?.item?.product_details?.supply?.supply_prices?.selling_price *
                          data?.item?.qty}
                      </Text> */}
                    </View>
                  </View>
                </View>
              );
            }}
            renderHiddenItem={(data, rowMap) => (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                // onPress={() => deleteRow(rowMap, data.item.key)}
                onPress={() => removeOneCartHandler(data.index)}
              >
                <Image
                  source={Images.cross}
                  style={[styles.crossImageStyle, { tintColor: COLORS.white }]}
                />
              </TouchableOpacity>
            )}
            // leftOpenValue={75}
            rightOpenValue={-75}
            previewRowKey={'0'}
            // previewOpenValue={-40}
            previewOpenDelay={3000}
            onRowDidOpen={onRowDidOpen}
            ListEmptyComponent={() => (
              <View style={styles.noDataCon}>
                <Text style={styles.noDataFound}>{strings.cart.noDataFound}</Text>
              </View>
            )}
          />
          {/* )} */}
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            alignSelf: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.availablOffercon}
            onPress={() => {
              backCartLoad();
              const data = {
                servicetype: 'service',
              };
              dispatch(
                getAvailableOffer(data, 'mpos', () => {
                  availableOfferRef?.current?.present();
                })
              );
            }}
          >
            <Text style={styles.avaliableofferText}>{strings.cart.availablOffer}</Text>
          </TouchableOpacity>
          <Spacer space={SH(10)} />
          <View style={styles.totalItemCon}>
            <Text style={styles.totalItem}>
              {strings.cart.totalItem} {serviceCartData?.appointment_cart_products?.length}
            </Text>
          </View>
          <Spacer space={SH(8)} />
          <View style={styles.disPlayFlex}>
            <Text style={styles.subTotal}>Sub Total</Text>
            <Text style={styles.subTotalBold}>
              {amountFormat(serviceCartData?.amount?.products_price)}
            </Text>
          </View>
          <Spacer space={SH(8)} />
          <View style={styles.disPlayFlex}>
            <Text style={styles.subTotal}>Total Taxes</Text>
            <Text style={styles.subTotalBold}>{amountFormat(serviceCartData?.amount?.tax)}</Text>
          </View>
          <Spacer space={SH(8)} />
          <View style={styles.disPlayFlex}>
            <Text style={styles.subTotal}>
              {'Discount'}{' '}
              <Text style={[styles.subTotal, { fontFamily: Fonts.Regular }]}>
                {serviceCartData?.discount_flag === 'percentage'
                  ? `(${serviceCartData?.discount_value}%)`
                  : ''}
              </Text>
            </Text>
            <Text style={[styles.subTotalBold, { color: COLORS.red }]}>
              {formattedReturnPrice(serviceCartData?.amount?.discount)}
            </Text>
          </View>
          <Spacer space={SH(8)} />
          <View
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: COLORS.solidGrey,
            }}
          />
          <Spacer space={SH(8)} />
          <View style={styles.disPlayFlex}>
            <Text style={styles.itemValue}>Item value</Text>
            <Text style={styles.itemValue}>
              {amountFormat(serviceCartData?.amount?.total_amount)}
            </Text>
          </View>
          <Spacer space={SH(15)} />
          <TouchableOpacity
            style={[
              styles.payNowcon,
              {
                opacity: onlyServiceCartArray?.length >= 1 ? 1 : 0.7,
              },
            ]}
            onPress={() => {
              backCartLoad();
              payNowHandler();
            }}
            disabled={onlyServiceCartArray?.length >= 1 ? false : true}
          >
            <Text style={styles.payNowText}>{strings.cart.payNow}</Text>
            <Image source={Images.buttonArrow} style={styles.buttonArrow} />
          </TouchableOpacity>
        </View>
      </View>

      {/* header modal */}
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={addNotes}
        onBackdropPress={() => setAddNotes(false)}
      >
        <AddNotes notesClose={() => setAddNotes(false)} />
      </Modal>
      <ReactNativeModal
        animationType="fade"
        transparent={true}
        isVisible={addDiscount}
        onBackdropPress={() => setAddDiscount(false)}
      >
        <AddDiscount discountClose={() => setAddDiscount(false)} />
      </ReactNativeModal>
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={clearCart}
        onBackdropPress={() => setClearCart(false)}
      >
        <ClearCart cartClose={() => setClearCart(false)} />
      </Modal>
      <Modal animationType="fade" isVisible={customProductAdd}>
        <KeyboardAwareScrollView
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <CustomProductAdd customProductClose={() => setCustomProductAdd(false)} />
        </KeyboardAwareScrollView>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={priceChange}
        onBackdropPress={() => setPriceChange(false)}
      >
        <PriceChange priceChangeClose={() => setPriceChange(false)} {...{ cartProduct }} />
      </Modal>

      <ReactNativeModal
        animationType="fade"
        transparent={true}
        isVisible={productCustomerAdd}
        onBackdropPress={() => setProductCustomerAdd(false)}
      >
        <ProductCustomerAdd crossHandler={() => setProductCustomerAdd(false)} />
        {/* <NewCustomerAdd /> */}
      </ReactNativeModal>

      <CartAmountByPay
        {...{ cartAmountByPayRef, cashPayNowHandler, cartAmountByPayCross, jbrCoinSheetshow }}
      />
      <PayByCash {...{ payByCashRef, payByCashhandler, payByCashCrossHandler }} />
      <FinalPayment {...{ finalPaymentRef, finalPaymentCrossHandler, orderCreateData, saveCart }} />

      <JbrCoin {...{ jbrCoinRef, jbrCoinCrossHandler, payByJbrHandler }} />

      <AvailableOffer
        availableOfferRef={availableOfferRef}
        serviceCartOpen={() => {
          addServiceCartRef?.current?.present();
        }}
      />
      <AddServiceCart {...{ addServiceCartRef }} />
      {/* serviceDetailHanlder */}
      {isLoading ? <FullScreenLoader /> : null}
    </View>
  );
}
