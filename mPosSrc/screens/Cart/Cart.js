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
import { styles } from './styles';
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
  getAllCart,
  getAllProductCart,
  getTip,
} from '@/actions/RetailAction';
import CartAmountByPay from './Components/CartAmountByPay';
import PayByCash from './Components/PayByCash';
import { TYPES } from '@/Types/Types';
import FinalPayment from './Components/FinalPayment';
import { getDrawerSessions } from '@/actions/CashTrackingAction';
import ProductCustomerAdd from './Components/ProductCustomerAdd';
import { NewCustomerAdd } from '@/screens/PosRetail3/Components/NewCustomerAdd';
import JbrCoin from './Components/JbrCoin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
// import { Modal } from 'react-native-paper';

export function Cart() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const productCartData = retailData?.getAllCart;
  const payByCashRef = useRef(null);
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
  const productCartArray = retailData?.getAllProductCart;
  const holdProductArray = productCartArray?.filter((item) => item.is_on_hold === true);
  const isLoading = useSelector((state) =>
    isLoadingSelector(
      [
        TYPES.ADDNOTES,
        TYPES.ADD_DISCOUNT,
        TYPES.GET_ALL_CART,
        TYPES.PRODUCT_UPDATE_PRICE,
        TYPES.CUSTOM_PRODUCT_ADD,
        TYPES.GET_CLEAR_ALL_CART,
        TYPES.UPDATE_CART_BY_TIP,
        TYPES.CREATE_ORDER,
        TYPES.ATTACH_CUSTOMER,
        TYPES.CHANGE_STATUS_PRODUCT_CART,
      ],
      state
    )
  );
  useEffect(() => {
    dispatch(getAllCart());
    dispatch(getAllProductCart());
  }, [isFocused]);

  const payNowHandler = useCallback(() => {
    dispatch(getDrawerSessions());
    dispatch(getTip());
    cartAmountByPayRef.current?.present();
  }, []);
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

  const onRowDidOpen = (rowKey) => {
    console.log('This row opened', rowKey);
  };

  // hold product Function
  const cartStatusHandler = () => {
    const data =
      holdProductArray?.length > 0
        ? {
            status: !holdProductArray?.[0]?.is_on_hold,
            cartId: holdProductArray?.[0]?.id,
          }
        : {
            status: !productCartData?.is_on_hold,
            cartId: productCartData?.id,
          };
    console.log(data);
    dispatch(changeStatusProductCart(data));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.cartScreenHeader]}>
        <View style={styles.serviceCart}>
          <Text style={styles.serviceCartText}>{'Service Cart'}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              opacity: productCartData?.poscart_products?.length > 0 ? 1 : 0.5,
            }}
            pointerEvents={productCartData?.poscart_products?.length > 0 ? 'auto' : 'none'}
          >
            <TouchableOpacity
              style={styles.headerImagecCon}
              onPress={() => setProductCustomerAdd((prev) => !prev)}
            >
              <Image source={Images.addCustomerIcon} style={styles.headerImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerImagecCon}
              onPress={() => setAddNotes((prev) => !prev)}
            >
              <Image source={Images.notes} style={styles.headerImage} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerImagecCon}
              onPress={() => setAddDiscount((prev) => !prev)}
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
          <TouchableOpacity style={styles.headerImagecCon} onPress={cartStatusHandler}>
            <Image source={Images.pause} style={styles.holdImage(holdProductArray)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerImagecCon}
            onPress={() => setCustomProductAdd((prev) => !prev)}
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
            data={productCartData?.poscart_products}
            extraData={productCartData?.poscart_products}
            keyExtractor={(_, index) => index.toString()}
            renderItem={(data) => {
              const productSize = data?.item?.product_details?.supply?.attributes?.filter(
                (item) => item?.name === 'Size'
              );
              const productColor = data?.item?.product_details?.supply?.attributes?.filter(
                (item) => item?.name === 'Color'
              );
              return (
                <View style={styles.cartProductCon}>
                  <View style={[styles.disPlayFlex]}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={{ uri: data?.item?.product_details?.image }}
                        style={{ width: ms(35), height: ms(35) }}
                      />
                      <View style={{ marginLeft: ms(10) }}>
                        <Text style={styles.cartProductName} numberOfLines={1}>
                          {data?.item?.product_details?.name}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                          {productColor?.length > 0 && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Text style={styles.colorName}>Color:</Text>
                              <View
                                style={[
                                  styles.cartColorCon,
                                  {
                                    backgroundColor: productColor?.[0]?.values?.name,
                                  },
                                ]}
                              ></View>
                            </View>
                          )}

                          {productSize?.length > 0 && (
                            <Text style={[styles.colorName, { marginLeft: ms(10) }]}>
                              Size: {productSize?.[0]?.values?.name}
                            </Text>
                          )}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: ms(3),
                          }}
                        >
                          <Text style={[styles.cartPrice, { fontFamily: Fonts.Regular }]}>
                            ${data?.item?.product_details?.supply?.supply_prices?.selling_price}
                          </Text>
                          <Text style={[styles.colorName, { marginLeft: ms(10) }]}>X</Text>
                          <View style={styles.counterCon}>
                            <TouchableOpacity style={styles.cartPlusCon}>
                              <Text style={styles.counterDigit}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.counterDigit}>{data?.item?.qty}</Text>
                            <TouchableOpacity style={styles.cartPlusCon}>
                              <Text style={styles.counterDigit}>+</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
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
                          setPriceChange((prev) => !prev);
                          setCartProduct(data?.item);
                        }}
                      >
                        <Image source={Images.pencil} style={styles.pencil} />
                      </TouchableOpacity>
                      <Text style={[styles.cartPrice, { marginTop: ms(15) }]}>
                        $
                        {data?.item?.product_details?.supply?.supply_prices?.selling_price *
                          data?.item?.qty}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
            renderHiddenItem={() => (
              <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                // onPress={() => deleteRow(rowMap, data.item.key)}
                onPress={() => alert('in Progress')}
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
          <TouchableOpacity style={styles.availablOffercon}>
            <Text style={styles.avaliableofferText}>{strings.cart.availablOffer}</Text>
          </TouchableOpacity>
          <Spacer space={SH(10)} />
          <View style={styles.totalItemCon}>
            <Text style={styles.totalItem}>
              {strings.cart.totalItem} {productCartData?.poscart_products?.length}
            </Text>
          </View>
          <Spacer space={SH(8)} />
          <View style={styles.disPlayFlex}>
            <Text style={styles.subTotal}>Sub Total</Text>
            <Text style={styles.subTotalBold}>
              ${Number(productCartData?.amount?.products_price ?? '0.00')?.toFixed(2)}
            </Text>
          </View>
          <Spacer space={SH(8)} />
          <View style={styles.disPlayFlex}>
            <Text style={styles.subTotal}>Total Taxes</Text>
            <Text style={styles.subTotalBold}>
              ${Number(productCartData?.amount?.tax ?? '0.00')?.toFixed(2)}
            </Text>
          </View>
          <Spacer space={SH(8)} />
          <View style={styles.disPlayFlex}>
            <Text style={styles.subTotal}>{`Discount ${
              productCartData?.discount_flag === 'percentage' ? '(%)' : ''
            } `}</Text>
            <Text style={[styles.subTotalBold, { color: COLORS.red }]}>
              {formattedReturnPrice(productCartData?.amount?.discount)}
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
              ${Number(productCartData?.amount?.total_amount ?? '0.00')?.toFixed(2)}
            </Text>
          </View>
          <Spacer space={SH(15)} />
          <TouchableOpacity
            style={[
              styles.payNowcon,
              {
                opacity: productCartData?.poscart_products?.length > 0 ? 1 : 0.7,
              },
            ]}
            onPress={payNowHandler}
            disabled={productCartData?.poscart_products?.length > 0 ? false : true}
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
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={addDiscount}
        onBackdropPress={() => setAddDiscount(false)}
      >
        {/* <KeyboardAvoidingView>
          <ScrollView> */}
        <AddDiscount discountClose={() => setAddDiscount(false)} />
        {/* </ScrollView>
        </KeyboardAvoidingView> */}
      </Modal>
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

      {/* <Modal visible={customProductAdd}>
        <KeyboardAvoidingView
          behavior="padding"
          // style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <CustomProductAdd customProductClose={() => setCustomProductAdd(false)} />
        </KeyboardAvoidingView>
      </Modal> */}

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={priceChange}
        onBackdropPress={() => setPriceChange(false)}
      >
        <PriceChange priceChangeClose={() => setPriceChange(false)} {...{ cartProduct }} />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={productCustomerAdd}
        onBackdropPress={() => setProductCustomerAdd(false)}
      >
        <ProductCustomerAdd crossHandler={() => setProductCustomerAdd(false)} />
        {/* <NewCustomerAdd /> */}
      </Modal>

      <CartAmountByPay
        {...{ cartAmountByPayRef, cashPayNowHandler, cartAmountByPayCross, jbrCoinSheetshow }}
      />
      <PayByCash {...{ payByCashRef, payByCashhandler, payByCashCrossHandler }} />
      <FinalPayment {...{ finalPaymentRef, finalPaymentCrossHandler, orderCreateData, saveCart }} />

      <JbrCoin {...{ jbrCoinRef, jbrCoinCrossHandler, payByJbrHandler }} />
      {isLoading ? <FullScreenLoader /> : null}
    </SafeAreaView>
  );
}
