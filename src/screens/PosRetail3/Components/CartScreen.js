import React, { useState, useEffect } from 'react';
import {
  Image,
  TextInput,
  Keyboard,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { cartEdit, cross, crossButton, minus, plus, search_light } from '@/assets';
import { CustomHeader } from './CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import {
  addProductFrom,
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
import { getAuthData } from '@/selectors/AuthSelector';
import { ms } from 'react-native-size-matters';
import { AddCartDetailModal } from './AddCartDetailModal';
import { AddCartModal } from './AddCartModal';
import Modal from 'react-native-modal';
import { updateCartLength } from '@/actions/CartAction';
import { getCartLength } from '@/selectors/CartSelector';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { CustomProductAdd } from './CustomProductAdd';
import { NewCustomerAdd } from './NewCustomerAdd';
import { useCallback } from 'react';
import { useMemo } from 'react';
import {
  amountFormat,
  amountLocalString,
  formattedReturnPrice,
  getProductFinalPrice,
  getProductPrice,
} from '@/utils/GlobalMethods';
import { Images } from '@/assets/new_icon';
import { FullScreenLoader } from '@mPOS/components';
import BlurredModal from '@/components/BlurredModal';

export function CartScreen({
  onPressPayNow,
  crossHandler,
  addNotesHandler,
  addDiscountHandler,
  getScreen,
  addProductscreenShow,
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
  const availableOfferArray = getRetailData?.availableOffer?.data;

  const [cartSearch, setCartSearch] = useState('');
  const [addCartModal, setAddCartModal] = useState(false);
  const [addCartDetailModal, setAddCartDetailModal] = useState(false);
  const [offerId, setOfferId] = useState();
  const CART_LENGTH = useSelector(getCartLength);
  const [unitPrice, setUnitPrice] = useState();
  const [cartEditItem, setCartEditItem] = useState(false);
  const [cartIndex, setCartIndex] = useState();
  const [cartProductId, setCartProductId] = useState();
  const [numPadModal, setNumPadModal] = useState(false);
  const [newCustomerModal, setNewCustomerModal] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [productItem, setProductItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState();

  const availableOfferLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_AVAILABLE_OFFER], state)
  );
  const isLoadingGetAllCart = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ALL_CART], state)
  );
  const isLoadingAddCart = useSelector((state) => isLoadingSelector([TYPES.ADDCART], state));

  const isLoadingBulkCart = useSelector((state) =>
    isLoadingSelector([TYPES.CREATE_BULK_CART], state)
  );

  const isLoadingOneProduct = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ONE_PRODUCT], state)
  );

  const isLoadingAddDiscount = useSelector((state) =>
    isLoadingSelector([TYPES.ADD_DISCOUNT], state)
  );
  const isLoadingAddNote = useSelector((state) => isLoadingSelector([TYPES.ADDNOTES], state));

  const isLoadingAddCustomProduct = useSelector((state) =>
    isLoadingSelector([TYPES.CUSTOM_PRODUCT_ADD], state)
  );
  const isLoadingHoldCart = useSelector((state) =>
    isLoadingSelector([TYPES.CHANGE_STATUS_PRODUCT_CART], state)
  );
  const isLoadingAttachCustomer = useSelector((state) =>
    isLoadingSelector([TYPES.ATTACH_CUSTOMER], state)
  );

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

  useEffect(() => {
    const data = {
      seller_id: sellerID,
      servicetype: 'product',
    };
    dispatch(getAvailableOffer(data, 'pos'));
    dispatch(getUserDetailSuccess({}));
  }, []);

  const productPopupFun = async (productId) => {
    const res = await dispatch(getOneProduct(sellerID, productId));
    if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
      setAddCartModal(true);
    }
  };

  // hold cart Function
  const cartStatusHandler = () => {
    beforeDiscountCartLoad();
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

  const productFun = async (item, index) => {
    beforeDiscountCartLoad();
    // setOfferId(item?.id);
    const res = await dispatch(getOneProduct(sellerID, item?.id));
    if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
      // setAddCartModal(true);
      setProductIndex(index);
      setProductItem(item);
      setSelectedItem(item);
      addProductscreenShow();
      dispatch(addProductFrom('cart'));
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

  const calculateOrderAmount = (cart) => {
    if (cart?.poscart_products) {
      var subTotalAmount = cartData?.poscart_products?.reduce((acc, curr) => {
        const productPrice = getProductFinalPrice(curr);

        return acc + productPrice;

        // return acc + productPrice * curr.qty;
      }, 0);
      // var subTotalAmount = cartData?.amout?.total_amount;

      var discountAmount = 0;
      var deliveryFee = 0;
      var taxesAndOtherCharges = 0;

      // if coupon applied
      // if (objCoupon) {
      //   const couponDetail = objCoupon;
      //   if (couponDetail.discount_percentage) {
      //     discountAmount =
      //       (subTotalAmount * couponDetail.discount_percentage) / 100;
      //     discountAmount = Number(discountAmount).toFixed(2);
      //   }

      //   if (
      //     couponDetail.max_discount &&
      //     discountAmount > couponDetail.max_discount
      //   ) {
      //     discountAmount = couponDetail.max_discount;
      //   }
      // }

      // var productsDiscountAmount = cartData?.cart_products?.reduce(
      //   (acc, curr) =>
      //     acc +
      //     (curr.product_details?.supply?.supply_prices?.offer_price
      //       ? curr.product_details?.supply?.supply_prices?.actual_price -
      //         curr.product_details?.supply?.supply_prices?.offer_price
      //       : 0) *
      //       curr.qty,
      //   0
      // );

      // if (productsDiscountAmount > 0) {
      //   discountAmount = discountAmount + productsDiscountAmount;
      // }

      // if (cartData?.amout?.tax_percentage) {
      //   taxesAndOtherCharges =
      //     ((subTotalAmount - discountAmount) *
      //       cartData?.amout?.tax_percentage) /
      //     100;
      // }

      taxesAndOtherCharges = parseFloat(
        calculatePercentageValue(subTotalAmount, parseInt(cart.amount.tax_percentage))
      );

      var totalOrderAmount = subTotalAmount - discountAmount + deliveryFee + taxesAndOtherCharges;

      cart.amount.tax = parseFloat(taxesAndOtherCharges); // Update tax value
      cart.amount.total_amount = totalOrderAmount;
      cart.amount.products_price = subTotalAmount;

      var DATA = {
        payload: cart,
      };
      dispatch(getAllCartSuccess(DATA));
    }
  };

  const updateQuantity = (cartId, productId, operation, index, suppliesPrice) => {
    var arr = getRetailData?.getAllCart;
    const product = arr?.poscart_products[index];
    const restProductQty = product?.product_details?.supply?.rest_quantity;

    if (operation === '+') {
      if (restProductQty > product.qty) {
        product.qty += 1;
        calculateOrderAmount(arr);
      } else {
        alert('There are no more quantity left to add');
      }
      // Update total_amount including tax
    } else if (operation === '-') {
      if (product.qty > 0) {
        if (product.qty === 1) {
          arr?.poscart_products.splice(index, 1);
          dispatch(updateCartLength(CART_LENGTH - 1));
        }
        product.qty -= 1;
        calculateOrderAmount(arr);
      }
    }
  };

  const clearCartHandler = async () => {
    const res = await dispatch(clearAllCart());
    setTimeout(() => {
      crossHandler();
    }, 2000);
  };
  const removeOneCartHandler = (productId, index, data) => {
    const offeyKey = data?.product_details?.supply?.supply_offers;
    var arr = getRetailData?.getAllCart;
    if (arr?.poscart_products?.length == 1 && index == 0) {
      clearCartHandler();
    } else {
      if (offeyKey?.length > 0) {
        const product = arr?.poscart_products[index];
        const productPrice = getProductFinalPrice(data);
        if (product.qty > 0) {
          arr.amount.total_amount -= productPrice;
          arr.amount.products_price -= productPrice;
          arr?.poscart_products.splice(index, 1);
        }
      } else {
        const product = arr?.poscart_products[index];
        const productPrice = product.product_details?.supply?.supply_prices?.selling_price;
        if (product.qty > 0) {
          arr.amount.total_amount -= productPrice * product.qty;
          arr.amount.products_price -= productPrice * product.qty;
          arr?.poscart_products.splice(index, 1);
        }
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
    dispatch(getUserDetailSuccess({}));
  }, []);

  const cartidFrom = useMemo(() => cartData?.id, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.homeScreenCon}>
        <CustomHeader
          iconShow
          crossHandler={() => {
            beforeDiscountCartLoad();
            crossHandler();
          }}
        />

        <View style={[styles.displayflex2, { flex: 1 }]}>
          <View style={[styles.itemLIistCon]}>
            <Spacer space={SH(3)} />
            <View style={styles.displayflex}>
              <TouchableOpacity
                style={styles.backProScreen}
                onPress={() => {
                  beforeDiscountCartLoad();
                  crossHandler();
                  getScreen('Product');
                  // dispatch(getUserDetailSuccess([]));
                }}
              >
                <Image source={Images.arrowLeftUp} style={styles.arrowStyle} />
                <Text style={styles.fullCartText}>{'Full Cart'}</Text>
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
                    placeholderTextColor={COLORS.lavender}
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
            <View style={{ borderWidth: 0.5, borderColor: COLORS.light_purple }}></View>
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
            {/* <ScrollView
              style={{ borderWidth: 1, paddingBottom: ms(20), height: ms(200) }}
              nestedScrollEnabled={true}
            > */}
            <View style={{ marginBottom: ms(60) }}>
              <ScrollView style={{ paddingBottom: ms(40) }} showsVerticalScrollIndicator={false}>
                {arr?.map((item, index) => (
                  <View key={index}>
                    {item?.poscart_products?.map((data, ind) => {
                      const suppliesPrice = data?.product_details?.supply?.supply_prices;
                      return (
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
                                  marginVertical: ms(3),
                                }}
                              >
                                <View style={styles.cartImageCon}>
                                  <Image
                                    source={{ uri: data.product_details?.image }}
                                    style={styles.columbiaMen}
                                  />
                                </View>
                                <View style={{ marginLeft: 10 }}>
                                  <Text
                                    style={[styles.blueListDataText, { width: SW(40) }]}
                                    numberOfLines={3}
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
                                  <Text numberOfLines={1} style={styles.productPrice}>
                                    {amountFormat(
                                      getProductPrice(
                                        data.product_details?.supply?.supply_offers,
                                        data.product_details?.supply?.supply_prices?.selling_price,
                                        data.qty
                                      )
                                    )}
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
                                      width: ms(10),
                                      alignItems: 'center',
                                    }}
                                    onPress={() =>
                                      updateQuantity(item?.id, data?.id, '-', ind, suppliesPrice)
                                    }
                                    disabled={data.qty == 1 ? true : false}
                                  >
                                    <Image source={minus} style={styles.minus} />
                                  </TouchableOpacity>
                                  <View style={styles.dataQtyCon}>
                                    <Text style={styles.dataQty}>{data.qty}</Text>
                                  </View>

                                  <TouchableOpacity
                                    style={{
                                      width: ms(10),
                                      alignItems: 'center',
                                    }}
                                    onPress={() =>
                                      updateQuantity(item?.id, data?.id, '+', ind, suppliesPrice)
                                    }
                                  >
                                    <Image source={plus} style={styles.minus} />
                                  </TouchableOpacity>
                                </View>
                              </View>
                              <View style={styles.productCartBody}>
                                <Text style={styles.blueListDataText}>
                                  {amountFormat(getProductFinalPrice(data))}
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
                                            ? COLORS.navy_blue
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

                                  <TouchableOpacity
                                    onPress={() => removeOneCartHandler(data.id, ind, data)}
                                  >
                                    <Image source={crossButton} style={styles.borderCross} />
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* </ScrollView> */}
            <Spacer space={SH(7)} />
          </View>
          <View style={styles.rightSideCon}>
            <View style={[styles.displayflex, { justifyContent: 'space-around' }]}>
              <TouchableOpacity
                style={styles.holdCartPad}
                onPress={() => {
                  beforeDiscountCartLoad();
                  setNumPadModal((prev) => !prev);
                }}
              >
                <Image source={Images.cartIconPlus} style={styles.keyboardIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.holdCartCon} onPress={clearCartHandler}>
                <Image source={Images.cartDelete} style={styles.keyboardIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.holdCartPad,
                  //
                ]}
                onPress={cartStatusHandler}
              >
                <Image
                  source={Images.cartHold}
                  style={[
                    styles.keyboardIcon,
                    // {
                    //   tintColor: holdProductArray?.length > 0 ? COLORS.navy_blue : COLORS.dark_grey,
                    // },
                  ]}
                />
                <View
                  style={{
                    width: ms(10),
                    height: ms(10),
                    borderColor: COLORS.navy_blue,
                    borderWidth: 1,
                    position: 'absolute',
                    bottom: 3,
                    right: 3,
                    borderRadius: ms(10),
                    backgroundColor: COLORS.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: COLORS.navy_blue,
                  }}
                >
                  <Text style={{ color: COLORS.white, fontSize: ms(5) }}>
                    {holdProductArray?.length}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.holdCartPad}
                onPress={() => {
                  beforeDiscountCartLoad();
                  setNewCustomerModal((prev) => !prev);
                }}
              >
                <Image source={Images.addCustomer} style={styles.keyboardIcon} />
              </TouchableOpacity>
            </View>
            <Spacer space={SH(10)} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameAddCon}>
                <View style={styles.avaliableOfferCon}>
                  <Image source={Images.availableOffer} style={styles.addDiscountPic()} />
                  <Text style={[styles.holdCart, { color: COLORS.coffee }]}>Available Offer</Text>
                  <View></View>
                </View>
                {availableOfferLoad ? (
                  <View style={{ marginTop: ms(30) }}>
                    <ActivityIndicator size="small" color={COLORS.navy_blue} />
                  </View>
                ) : (
                  <FlatList
                    data={availableOfferArray ?? []}
                    extraData={availableOfferArray ?? []}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={styles.avaliableOferBodyCon}
                          key={index}
                          onPress={() => productFun(item, index)}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                            <Image source={{ uri: item?.image }} style={styles.offerImage} />

                            <View style={{ paddingHorizontal: ms(3), flex: 1 }}>
                              <Text style={styles.offerText} numberOfLines={1}>
                                {item?.name}
                              </Text>
                              {/* <Text
                                style={[styles.offerText, styles.offerTextYellow]}
                                numberOfLines={1}
                              >
                                Yellow / M
                              </Text> */}
                              <Spacer space={SH(3)} />
                              {item?.supplies?.[0]?.supply_prices?.[0]?.actual_price &&
                              item?.supplies?.[0]?.supply_prices?.[0]?.offer_price ? (
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={[styles.offerPrice, styles.lineTrought]}>
                                    ${item?.supplies?.[0]?.supply_prices?.[0]?.actual_price}
                                  </Text>
                                  <Text style={[styles.offerPriceDark, { marginLeft: ms(3) }]}>
                                    ${item?.supplies?.[0]?.supply_prices?.[0]?.offer_price}
                                  </Text>
                                </View>
                              ) : (
                                <View style={{ flexDirection: 'row' }}>
                                  <Text style={styles.offerPriceDark}>
                                    ${item?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                                  </Text>
                                </View>
                              )}
                              <Spacer space={SH(3)} />
                              <Text
                                style={[styles.offerText, styles.offerTextYellow]}
                                numberOfLines={1}
                              >
                                Offer qty :{' '}
                                {item?.supplies?.[0]?.supply_prices?.[0]?.offer_applicable_qty ||
                                  '0'}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.offerImagebackground}>
                            <Image source={Images.cartIcon} style={styles.sideAddToCart} />
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                    refreshControl={
                      <RefreshControl
                        // refreshing={isRefreshing}
                        onRefresh={() => {
                          const data = {
                            seller_id: sellerID,
                            servicetype: 'product',
                          };
                          dispatch(getAvailableOffer(data, 'pos'));
                        }}
                        tintColor={COLORS.primary} // Change the color of the loading spinner
                        title="Pull to Refresh" // Optional, you can customize the text
                      />
                    }
                    style={{ flex: 1 }}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    // keyExtractor={(item) => item.id}
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
                )}
              </View>

              <View style={[styles.displayflex, { marginVertical: ms(7) }]}>
                <TouchableOpacity
                  style={styles.addDiscountCon()}
                  onPress={() => {
                    beforeDiscountCartLoad();
                    addDiscountHandler();
                  }}
                  disabled={cartData?.poscart_products?.length > 0 ? false : true}
                >
                  <Image source={Images.discounticon} style={styles.addDiscountPic('discount')} />
                  <Text style={styles.addDiscountText('discount')}>Add Discount</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addDiscountCon('addnotes')}
                  onPress={() => {
                    beforeDiscountCartLoad();
                    addNotesHandler();
                  }}
                  disabled={cartData?.poscart_products?.length > 0 ? false : true}
                >
                  <Image source={Images.addNotes} style={styles.addDiscountPic()} />
                  <Text style={styles.addDiscountText()}>Add Notes</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.discountCon}>
                <View style={[styles.displayflex2, styles.paddVertical]}>
                  <Text style={styles.subTotal}>Sub Total</Text>
                  <Text style={styles.subTotalDollar}>
                    {amountFormat(cartData?.amount?.products_price)}
                    {/* ${cartData?.amount?.products_price.toFixed(2) ?? '0.00'} */}
                  </Text>
                </View>
                <View style={[styles.displayflex2, styles.paddVertical]}>
                  <Text style={styles.subTotal}>{`Discount ${
                    cartData?.discount_flag === 'percentage' ? '(%)' : ''
                  } `}</Text>
                  <Text style={[styles.subTotalDollar, { color: COLORS.red }]}>
                    {formattedReturnPrice(cartData?.amount?.discount)}
                  </Text>
                </View>

                <View style={[styles.displayflex2, styles.paddVertical]}>
                  <Text style={styles.subTotal}>Total Taxes</Text>
                  <Text style={styles.subTotalDollar}>{amountFormat(cartData?.amount?.tax)}</Text>
                </View>

                <View
                  style={{
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: COLORS.solidGrey,
                    marginVertical: ms(10),
                  }}
                />

                <View style={[styles.displayflex2, styles.paddVertical]}>
                  <Text style={styles.itemValue}>Total</Text>
                  <Text style={styles.itemValue}>
                    {amountFormat(cartData?.amount?.total_amount)}
                  </Text>
                </View>

                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  style={[
                    styles.checkoutButtonSideBar,
                    {
                      opacity: cartData?.poscart_products?.length > 0 ? 1 : 0.7,
                      height: ms(35),
                      flex: 0,
                    },
                  ]}
                  onPress={() => {
                    beforeDiscountCartLoad();
                    onPressPayNow();
                  }}
                  disabled={cartData?.poscart_products?.length > 0 ? false : true}
                >
                  <Text style={styles.checkoutText}>{strings.posRetail.procedtoCheckout}</Text>
                  {/* <Image source={checkArrow} style={styles.checkArrow} /> */}
                  <Image source={Images.arrowLeftUp} style={styles.mainScreenArrow('cart')} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <BlurredModal
        animationType="fade"
        transparent={true}
        isVisible={addCartModal || addCartDetailModal}
      >
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
      </BlurredModal>

      <BlurredModal animationType="fade" transparent={true} isVisible={numPadModal}>
        {/* <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}> */}
        <CustomProductAdd crossHandler={() => setNumPadModal(false)} comeFrom="product" />
        {/* </KeyboardAvoidingView> */}
      </BlurredModal>
      <BlurredModal animationType="fade" transparent={true} isVisible={newCustomerModal}>
        <NewCustomerAdd crossHandler={closeCustomerAddModal} cartid={cartidFrom} />
      </BlurredModal>
      {(isLoadingGetAllCart ||
        isLoadingAddCart ||
        isLoadingBulkCart ||
        isLoadingOneProduct ||
        isLoadingAddDiscount ||
        isLoadingAddNote ||
        isLoadingHoldCart ||
        isLoadingAddCustomProduct ||
        isLoadingAttachCustomer) && <FullScreenLoader />}
    </View>
  );
}
