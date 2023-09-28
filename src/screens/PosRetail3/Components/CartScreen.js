import React, { useState, useEffect } from 'react';
import {
  Image,
  TextInput,
  Keyboard,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  addDiscountPic,
  addToCart,
  borderCross,
  cartEdit,
  checkArrow,
  cross,
  eraser,
  holdCart,
  minus,
  newCustomer,
  notess,
  plus,
  rightBack,
  search_light,
  sideKeyboard,
} from '@/assets';
import { CustomHeader } from './CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import {
  changeStatusProductCart,
  clearAllCart,
  getAllCartSuccess,
  getAvailableOffer,
  getOneProduct,
  getUserDetailSuccess,
  productUpdatePrice,
  updateCartQty,
} from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { useFocusEffect } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { ms } from 'react-native-size-matters';
import { AddCartDetailModal } from './AddCartDetailModal';
import { AddCartModal } from './AddCartModal';
import Modal from 'react-native-modal';
import { updateCartLength } from '@/actions/CartAction';
import { getCartLength } from '@/selectors/CartSelector';
import { FlatList } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CustomProductAdd } from './CustomProductAdd';
import { NewCustomerAdd } from './NewCustomerAdd';
import { useCallback } from 'react';
import { useMemo } from 'react';

export function CartScreen({
  onPressPayNow,
  crossHandler,
  addNotesHandler,
  addDiscountHandler,
  getScreen,
}) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  const cartId = cartData?.id;
  let arr = [getRetailData?.getAllCart];
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const productCartArray = getRetailData?.getAllProductCart;
  const holdProductArray = productCartArray?.filter((item) => item.is_on_hold === true);
  const availableOfferArray = getRetailData?.availableOffer;
  const [cartSearch, setCartSearch] = useState('');
  const [addCartModal, setAddCartModal] = useState(false);
  const [addCartDetailModal, setAddCartDetailModal] = useState(false);
  const [offerId, setOfferId] = useState();
  const CART_LENGTH = useSelector(getCartLength);
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.ADDCART], state));
  const [unitPrice, setUnitPrice] = useState();
  const [cartEditItem, setCartEditItem] = useState(false);
  const [cartIndex, setCartIndex] = useState();
  const [cartProductId, setCartProductId] = useState();
  const [numPadModal, setNumPadModal] = useState(false);
  const [newCustomerModal, setNewCustomerModal] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [productItem, setProductItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    const data = {
      seller_id: sellerID,
      servicetype: 'product',
    };
    dispatch(getAvailableOffer(data));
    dispatch(getUserDetailSuccess([]));
  }, []);

  // hold cart Function
  const cartStatusHandler = () => {
    const data =
      holdProductArray?.length > 0
        ? {
            status: holdProductArray?.[0]?.is_on_hold === false ? true : false,
            cartId: holdProductArray?.[0]?.id,
          }
        : {
            status: getRetailData?.getAllCart?.is_on_hold === false ? true : false,
            cartId: getRetailData?.getAllCart?.id,
          };
    dispatch(changeStatusProductCart(data));
  };

  // offline cart handler function
  const beforeDiscountCartLoad = () => {
    var arr = getRetailData?.getAllCart;
    if (arr?.poscart_products?.length > 0) {
      const products = arr?.poscart_products.map((item) => ({
        product_id: item?.product_id,
        qty: item?.qty,
      }));
      const data = {
        updated_products: products,
      };
      dispatch(updateCartQty(data, arr.id));
    } else {
      // clearCartHandler();
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        beforeDiscountCartLoad();
      };
    }, [])
  );

  const productFun = async (item, index) => {
    beforeDiscountCartLoad();
    setOfferId(item?.id);
    const res = await dispatch(getOneProduct(sellerID, item?.product?.id, item?.id));
    if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
      setAddCartModal(true);
      setProductIndex(index);
      setProductItem(item);
      setSelectedItem(item);
    }
  };

  //  update cart function
  const cartProductedit = (data, index) => {
    beforeDiscountCartLoad();
    setCartProductId(data?.id);
    setCartIndex(index);
    setCartEditItem(true);
    setUnitPrice((data?.product_details?.supply?.supply_prices?.selling_price).toFixed(2));
  };

  const saveCartEditFun = () => {
    if (!unitPrice || unitPrice == 0) {
      Toast.show({
        text2: 'Please Enter Amount',
        position: 'top',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      setCartEditItem(false);
      const data = {
        cartid: cartId,
        cartProductId: cartProductId,
        updatedPrice: unitPrice,
      };
      dispatch(productUpdatePrice(data));
    }
  };

  function calculatePercentageValue(value, percentage) {
    if (percentage == '') {
      return '';
    }
    const percentageValue = (percentage / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  }
  const updateQuantity = (cartId, productId, operation, index) => {
    var arr = getRetailData?.getAllCart;
    const product = arr?.poscart_products[index];
    // const productPrice = product.product_details.price;
    const productPrice = product.product_details?.supply?.supply_prices?.selling_price;

    if (operation === '+') {
      product.qty += 1;
      arr.amount.total_amount += productPrice;
      arr.amount.products_price += productPrice;
      const totalAmount = arr.amount.products_price;
      const TAX = calculatePercentageValue(totalAmount, parseInt(arr.amount.tax_percentage));
      arr.amount.tax = parseFloat(TAX); // Update tax value
      arr.amount.total_amount = totalAmount + parseFloat(TAX); // Update total_amount including tax
    } else if (operation === '-') {
      if (product.qty > 0) {
        if (product.qty === 1) {
          arr?.poscart_products.splice(index, 1);
          dispatch(updateCartLength(CART_LENGTH - 1));
        }
        product.qty -= 1;

        arr.amount.products_price -= productPrice;
        const totalAmount = arr.amount.products_price;

        const TAX = calculatePercentageValue(totalAmount, parseInt(arr.amount.tax_percentage));

        arr.amount.tax = parseFloat(TAX); // Update tax value
        arr.amount.total_amount = totalAmount + parseFloat(TAX); // Update total_amount including tax
      }
    }
    var DATA = {
      payload: arr,
    };
    dispatch(getAllCartSuccess(DATA));
  };
  const clearCartHandler = async () => {
    const res = await dispatch(clearAllCart());
    setTimeout(() => {
      crossHandler();
    }, 2000);
  };
  const removeOneCartHandler = (productId, index) => {
    var arr = getRetailData?.getAllCart;
    if (arr?.poscart_products.length == 1 && index == 0) {
      clearCartHandler();
    } else {
      const product = arr?.poscart_products[index];
      // const productPrice = product.product_details.price;
      const productPrice = product.product_details?.supply?.supply_prices?.selling_price;
      if (product.qty > 0) {
        arr.amount.total_amount -= productPrice * product.qty;
        arr.amount.products_price -= productPrice * product.qty;
        arr?.poscart_products.splice(index, 1);
      }
      const totalAmount = arr.amount.products_price;
      const TAX = calculatePercentageValue(totalAmount, parseInt(arr.amount.tax_percentage));
      arr.amount.tax = parseFloat(TAX); // Update tax value
      arr.amount.total_amount = totalAmount + parseFloat(TAX);
      var DATA = {
        payload: arr,
      };
      dispatch(updateCartLength(CART_LENGTH - 1));
      dispatch(getAllCartSuccess(DATA));
    }
  };

  const closeCustomerAddModal = useCallback(() => {
    setNewCustomerModal(false);
    dispatch(getUserDetailSuccess([]));
  }, []);

  const comeFrom = useMemo(() => 'Product', []);

  return (
    <View>
      <View style={styles.homeScreenCon}>
        <CustomHeader
          iconShow
          crossHandler={() => {
            crossHandler();
          }}
        />

        <View style={styles.displayflex2}>
          <View style={[styles.itemLIistCon]}>
            <Spacer space={SH(3)} />
            <View style={styles.displayflex}>
              <TouchableOpacity
                style={styles.backProScreen}
                onPress={() => {
                  crossHandler();
                  getScreen('Product');
                  // dispatch(getUserDetailSuccess([]));
                }}
              >
                <Image source={rightBack} style={styles.arrowStyle} />
                <Text style={[styles.holdCart, { color: COLORS.dark_grey }]}>
                  {strings.posRetail.backProdscreen}
                </Text>
              </TouchableOpacity>
              <View style={[styles.barcodeInputWraper, styles.cartSearchInputWraper]}>
                <View style={styles.displayRow}>
                  <View>
                    <Image source={search_light} style={styles.sideSearchStyle} />
                  </View>
                  <TextInput
                    placeholder="Search by Barcode, SKU, Name"
                    style={[styles.sideBarsearchInput, styles.searchCartInput]}
                    value={cartSearch}
                    onChangeText={setCartSearch}
                    placeholderTextColor={COLORS.gerySkies}
                  />
                  {cartSearch?.length > 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setCartSearch(''), Keyboard.dismiss();
                      }}
                    >
                      <Image source={cross} style={[styles.sideSearchStyle, styles.crossStyling]} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
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
                    <Text style={styles.cashLabelWhite}>Quantity</Text>
                  </View>
                  <View style={styles.productCartBody}>
                    <Text style={styles.cashLabelWhite}>Line Total</Text>
                  </View>
                  <View style={styles.productCartBody}></View>
                </View>
              </View>
            </View>
            <ScrollView>
              {arr?.map((item, index) => (
                <View key={index}>
                  {item?.poscart_products?.map((data, ind) => (
                    <View style={styles.blueListData} key={ind}>
                      <View style={styles.displayflex}>
                        <View style={[styles.tableListSide, styles.listLeft]}>
                          <Text style={[styles.blueListDataText, styles.cashLabelWhiteHash]}>
                            {ind + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              source={{ uri: data.product_details?.image }}
                              style={styles.columbiaMen}
                            />
                            <View style={{ marginLeft: 10 }}>
                              <Text
                                style={[styles.blueListDataText, { width: SW(40) }]}
                                numberOfLines={1}
                              >
                                {data.product_details?.name}
                              </Text>
                              <Text style={styles.sukNumber}>
                                UPC: {data?.product_details?.upc}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.productCartBodyRight}>
                          <View style={styles.productCartBody}>
                            {cartIndex === ind && cartEditItem ? (
                              <TextInput
                                value={unitPrice}
                                onChangeText={setUnitPrice}
                                style={[styles.unitPriceInput]}
                                keyboardType="numeric"
                              />
                            ) : (
                              <Text style={styles.blueListDataText} numberOfLines={1}>
                                ${data?.product_details?.supply?.supply_prices?.selling_price}
                              </Text>
                            )}
                          </View>
                          <View style={styles.productCartBody}>
                            <View
                              style={styles.listCountCon}
                              pointerEvents={cartEditItem ? 'none' : 'auto'}
                            >
                              <TouchableOpacity
                                style={{
                                  width: SW(10),
                                  alignItems: 'center',
                                }}
                                onPress={() => updateQuantity(item?.id, data?.id, '-', ind)}
                                disabled={data.qty == 1 ? true : false}
                              >
                                <Image source={minus} style={styles.minus} />
                              </TouchableOpacity>
                              <Text>{data.qty}</Text>
                              <TouchableOpacity
                                style={{
                                  width: SW(10),
                                  alignItems: 'center',
                                }}
                                onPress={() => updateQuantity(item?.id, data?.id, '+', ind)}
                              >
                                <Image source={plus} style={styles.minus} />
                              </TouchableOpacity>
                            </View>
                          </View>
                          <View style={styles.productCartBody}>
                            <Text style={styles.blueListDataText}>
                              $
                              {(
                                data.product_details?.supply?.supply_prices?.selling_price *
                                data?.qty
                              ).toFixed(2)}
                            </Text>
                          </View>
                          <View style={styles.productCartBody}>
                            <View
                              style={{
                                width: ms(45),
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                              }}
                            >
                              {cartIndex === ind && cartEditItem ? (
                                <TouchableOpacity
                                  style={[
                                    styles.saveButtonCon,
                                    {
                                      backgroundColor: unitPrice
                                        ? COLORS.primary
                                        : COLORS.textInputBackground,
                                    },
                                  ]}
                                  onPress={saveCartEditFun}
                                  disabled={unitPrice ? false : true}
                                >
                                  <Text
                                    style={[
                                      styles.saveText,
                                      { color: unitPrice ? COLORS.white : COLORS.darkGray },
                                    ]}
                                  >
                                    Save
                                  </Text>
                                </TouchableOpacity>
                              ) : (
                                <TouchableOpacity
                                  style={[styles.cartEditCon, { marginRight: ms(14) }]}
                                  onPress={() => cartProductedit(data, ind)}
                                >
                                  <Image source={cartEdit} style={styles.cartEdit} />
                                </TouchableOpacity>
                              )}

                              <TouchableOpacity onPress={() => removeOneCartHandler(data.id, ind)}>
                                <Image source={borderCross} style={styles.borderCross} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
            <Spacer space={SH(7)} />
          </View>
          <View style={styles.rightSideCon}>
            <View style={styles.displayflex}>
              <TouchableOpacity
                style={styles.holdCartPad}
                onPress={() => {
                  beforeDiscountCartLoad();
                  setNumPadModal((prev) => !prev);
                }}
              >
                <Image source={plus} style={styles.keyboardIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.holdCartPad}
                onPress={() => setNewCustomerModal((prev) => !prev)}
              >
                <Image source={newCustomer} style={styles.keyboardIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.holdCartPad,
                  { borderColor: holdProductArray?.length > 0 ? COLORS.primary : COLORS.black },
                ]}
                onPress={cartStatusHandler}
              >
                <Image
                  source={holdCart}
                  style={[
                    styles.keyboardIcon,
                    { tintColor: holdProductArray?.length > 0 ? COLORS.primary : COLORS.dark_grey },
                  ]}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.holdCartCon} onPress={clearCartHandler}>
                <Image source={eraser} style={[styles.pause, { tintColor: COLORS.dark_grey }]} />
                <Text style={styles.holdCart}>{strings.dashboard.clearcart}</Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(10)} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameAddCon}>
                <View style={styles.avaliableOfferCon}>
                  <Text style={[styles.holdCart, { color: COLORS.white }]}>Available Offer</Text>
                </View>

                <FlatList
                  data={availableOfferArray}
                  extraData={availableOfferArray}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.avaliableOferBodyCon}
                        key={index}
                        onPress={() => productFun(item, index)}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ borderRadius: 4 }}>
                            <Image
                              source={{ uri: item?.product?.image }}
                              style={styles.offerImage}
                            />
                          </View>
                          <View style={{ marginLeft: 4 }}>
                            <Text style={[styles.offerText, { width: ms(90) }]} numberOfLines={1}>
                              {item.product?.name}
                            </Text>
                            <Text style={styles.offerPrice}>White/S</Text>
                            <View style={{ flexDirection: 'row' }}>
                              <Text style={[styles.offerPrice, styles.lineTrought]}>
                                ${item.actual_price_per_pack}
                              </Text>
                              <Text style={styles.offerPriceDark}>
                                ${item.offer_price_per_pack}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <Image source={addToCart} style={styles.sideAddToCart} />
                      </TouchableOpacity>
                    );
                  }}
                  style={{ flex: 1 }}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={styles.availbleOfferScroll}
                  ListEmptyComponent={() => (
                    <View style={styles.noProductText}>
                      <Text style={[styles.emptyListText, { fontSize: SF(16) }]}>
                        {strings.valiadtion.noData}
                      </Text>
                    </View>
                  )}
                />
              </View>
              <Spacer space={SH(10)} />
              <View style={styles.displayflex}>
                <TouchableOpacity
                  style={styles.addDiscountCon}
                  onPress={() => {
                    addDiscountHandler();
                    beforeDiscountCartLoad();
                  }}
                  disabled={cartData?.poscart_products?.length > 0 ? false : true}
                >
                  <Image source={addDiscountPic} style={styles.addDiscountPic} />
                  <Text style={styles.addDiscountText}>Add Discount</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addDiscountCon}
                  onPress={() => {
                    addNotesHandler();
                    beforeDiscountCartLoad();
                  }}
                  disabled={cartData?.poscart_products?.length > 0 ? false : true}
                >
                  <Image source={notess} style={styles.addDiscountPic} />
                  <Text style={styles.addDiscountText}>Add Notes</Text>
                </TouchableOpacity>
              </View>

              <Spacer space={SH(10)} />

              <View style={styles.totalItemCon}>
                <Text style={styles.totalItem}>
                  {strings.dashboard.totalItem} {cartData?.poscart_products?.length}
                </Text>
              </View>

              <Spacer space={SH(5)} />

              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Sub Total</Text>
                <Text style={styles.subTotalDollar}>
                  ${cartData?.amount?.products_price.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Total Taxes</Text>
                <Text style={styles.subTotalDollar}>
                  ${cartData?.amount?.tax.toFixed(2) ?? '0.00'}
                </Text>
              </View>

              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>{`Discount ${
                  cartData?.discount_flag === 'percentage' ? '(%)' : ''
                } `}</Text>
                <Text style={[styles.subTotalDollar, { color: COLORS.red }]}>
                  ${' '}
                  {cartData?.amount?.discount === 0
                    ? '0.00'
                    : cartData?.amount?.discount.toFixed(2) ?? '0.00'}
                </Text>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderStyle: 'dashed',
                  borderColor: COLORS.solidGrey,
                }}
              />

              <Spacer space={SH(5)} />
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.itemValue}>Item value</Text>
                <Text style={[styles.subTotalDollar, styles.itemValueBold]}>
                  ${cartData?.amount?.total_amount.toFixed(2) ?? '0.00'}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.checkoutButtonSideBar,
                { opacity: cartData?.poscart_products?.length > 0 ? 1 : 0.7 },
              ]}
              onPress={() => {
                onPressPayNow();
                beforeDiscountCartLoad();
              }}
              disabled={cartData?.poscart_products?.length > 0 ? false : true}
            >
              <Text style={styles.checkoutText}>{strings.posRetail.payNow}</Text>
              <Image source={checkArrow} style={styles.checkArrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} isVisible={addCartModal || addCartDetailModal}>
        {addCartDetailModal ? (
          <AddCartDetailModal crossHandler={() => setAddCartDetailModal(false)} />
        ) : (
          <AddCartModal
            crossHandler={() => setAddCartModal(false)}
            detailHandler={() => setAddCartDetailModal(true)}
            sellerID={sellerID}
            offerId={offerId}
            openFrom="cart"
            productIndex={productIndex}
            selectedItem={selectedItem}
            cartQty={1}

            // cartQty={selectedItemQty}
            // productIndex={productIndex}
            // selectedItem={selectedItem}
            // onClickAddCartModal={onClickAddCartModal}
          />
        )}
      </Modal>

      <Modal animationType="fade" transparent={true} isVisible={numPadModal}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <CustomProductAdd crossHandler={() => setNumPadModal(false)} comeFrom="product" />
        </KeyboardAvoidingView>
      </Modal>

      <Modal animationType="fade" transparent={true} isVisible={newCustomerModal}>
        <KeyboardAvoidingView behavior="padding">
          <NewCustomerAdd crossHandler={closeCustomerAddModal} comeFrom={comeFrom} />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
