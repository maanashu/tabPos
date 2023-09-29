import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';
import {
  addDiscountPic,
  addToCart,
  borderCross,
  cartEdit,
  checkArrow,
  cross,
  eraser,
  holdCart,
  newCustomer,
  notess,
  plus,
  rightBack,
  search_light,
  sideKeyboard,
  userImage,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { CustomHeader } from './CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import Modal, { ReactNativeModal } from 'react-native-modal';
import {
  changeStatusServiceCart,
  clearServiceAllCart,
  getAvailableOffer,
  getOneService,
  getServiceCartSuccess,
  serviceUpdatePrice,
  updateServiceCartQty,
} from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { getAuthData } from '@/selectors/AuthSelector';
import moment from 'moment';
import { ms } from 'react-native-size-matters';
import { AddServiceCartModal } from './AddServiceCartModal';
import { useEffect } from 'react';
import { updateServiceCartLength } from '@/actions/CartAction';
import { getServiceCartLength } from '@/selectors/CartSelector';
import { useFocusEffect } from '@react-navigation/core';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { CustomProductAdd } from './CustomProductAdd';
import { NewCustomerAdd } from './NewCustomerAdd';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { NewCustomerAddService } from './NewCustomerAddService';

export function CartServiceScreen({
  onPressPayNow,
  crossHandler,
  addNotesHandler,
  addDiscountHandler,
  getScreen,
}) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const cartServiceData = getRetailData?.getserviceCart;
  const cartServiceId = getRetailData?.getserviceCart?.id;
  let arr = [getRetailData?.getserviceCart];
  const serviceCartArray = getRetailData?.getAllServiceCart;
  const holdServiceArray = serviceCartArray?.filter((item) => item.is_on_hold === true);
  const [addServiceCartModal, setAddServiceCartModal] = useState(false);
  const [serviceItemSave, setServiceItemSave] = useState();
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const availableOfferArray = getRetailData?.availableOffer;
  const [cartSearch, setCartSearch] = useState('');
  const [offerId, setOfferId] = useState();
  const CART_LENGTH = useSelector(getServiceCartLength);
  const [cartEditItem, setCartEditItem] = useState(false);
  const [cartIndex, setCartIndex] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [cartProductId, setCartProductId] = useState();
  const [numPadModal, setNumPadModal] = useState(false);
  const [newCustomerModal, setNewCustomerModal] = useState(false);

  useEffect(() => {
    const data = {
      seller_id: sellerID,
      servicetype: 'service',
    };
    dispatch(getAvailableOffer(data));
  }, []);

  // offline  cart Remove Function
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        backCartLoad();
      };
    }, [])
  );

  const backCartLoad = () => {
    var arr = getRetailData?.getserviceCart;
    if (arr?.appointment_cart_products?.length > 0) {
      const products = arr?.appointment_cart_products?.map((item) => ({
        product_id: item?.product_id,
        qty: item?.qty,
      }));
      const data = {
        updated_products: products,
      };
      dispatch(updateServiceCartQty(data, arr.id));
    }
    // else {
    //   clearCartHandler();
    // }
  };

  function calculatePercentageValue(value, percentage) {
    if (percentage == '') {
      return '';
    }
    const percentageValue = (percentage / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  }

  const removeOneCartHandler = (productId, index) => {
    // const data = {
    //   cartId: cartServiceData?.id,
    //   productId: productId,
    // };
    // dispatch(clearOneserviceCart(data));

    var arr = getRetailData?.getserviceCart;
    if (arr?.appointment_cart_products.length == 1 && index == 0) {
      clearCartHandler();
    } else {
      const product = arr.appointment_cart_products[index];
      const productPrice = product.product_details?.supply?.supply_prices?.selling_price;
      if (product.qty > 0) {
        // arr.amount.total_amount -= productPrice * product.qty;
        arr.amount.products_price -= productPrice * product.qty;
        arr.appointment_cart_products.splice(index, 1);
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

  // cart Update function
  const serviceCartEdit = (data, index) => {
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
        cartid: cartServiceId,
        cartProductId: cartProductId,
        updatedPrice: unitPrice,
      };
      dispatch(serviceUpdatePrice(data));
    }
  };

  // available Offer function
  const serviceFun = async (item) => {
    setOfferId(item?.product?.id);
    const res = await dispatch(getOneService(sellerID, item?.product?.id));
    if (res?.type === 'GET_ONE_SERVICE_SUCCESS') {
      setAddServiceCartModal(true);
    }
  };

  // hold cart Function
  const serviceCartStatusHandler = () => {
    const data =
      holdServiceArray?.length > 0
        ? {
            status: holdServiceArray?.[0]?.is_on_hold === false ? true : false,
            cartId: holdServiceArray?.[0]?.id,
          }
        : {
            status: getRetailData?.getserviceCart?.is_on_hold === false ? true : false,
            cartId: getRetailData?.getserviceCart?.id,
          };
    dispatch(changeStatusServiceCart(data));
  };

  const clearCartHandler = () => {
    dispatch(clearServiceAllCart());
    crossHandler();
    getScreen('Service');
  };

  const closeCustomerAddModal = useCallback(() => setNewCustomerModal(false), []);

  return (
    <View>
      <View style={styles.homeScreenCon}>
        <CustomHeader
          iconShow
          crossHandler={() => {
            crossHandler();
            // dispatch(getUserDetailSuccess([]));
          }}
        />

        <View style={styles.displayflex2}>
          <View style={[styles.itemLIistCon]}>
            <Spacer space={SH(3)} />
            <View style={styles.displayflex}>
              <TouchableOpacity
                style={styles.backProScreen}
                onPress={() => {
                  // backCartLoad();
                  crossHandler();
                  getScreen('Service');
                }}
              >
                <Image source={rightBack} style={styles.arrowStyle} />
                <Text style={[styles.holdCart, { color: COLORS.dark_grey }]}>
                  {strings.posRetail.backServicescreen}
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
                <View style={styles.cartHeaderLeftSide}>
                  <Text style={[styles.cashLabelWhite, styles.cashLabelWhiteHash]}>#</Text>
                  <Text style={styles.ItemHeader}>Item</Text>
                </View>
                <View style={styles.serviceCartRightBody}>
                  <View style={styles.serviceCartBody}>
                    <Text style={styles.cartHeaderBodyRighSide} numberOfLines={1}>
                      Staff Name
                    </Text>
                  </View>
                  <View style={styles.serviceCartBody}>
                    <Text style={styles.cartHeaderBodyRighSide} numberOfLines={1}>
                      Unit Price
                    </Text>
                  </View>
                  <View style={styles.serviceCartBody}>
                    <Text style={styles.cartHeaderBodyRighSide} numberOfLines={1}>
                      Quantity
                    </Text>
                  </View>
                  <View style={styles.serviceCartBody}>
                    <Text style={styles.cartHeaderBodyRighSide} numberOfLines={1}>
                      Line Total
                    </Text>
                  </View>
                  <View style={styles.serviceCartBody}></View>
                </View>
              </View>
            </View>
            {arr?.map((item, index) => (
              <View key={index}>
                {item?.appointment_cart_products?.map((data, ind) => (
                  <View style={[styles.blueListData, { height: SH(70) }]} key={ind}>
                    <View style={styles.displayflex}>
                      <View style={[styles.cartHeaderLeftSide, { alignItems: 'center' }]}>
                        <Text
                          style={[
                            styles.blueListDataText,
                            styles.cashLabelWhiteHash,
                            { textAlignVertical: 'center' },
                          ]}
                        >
                          {ind + 1}
                        </Text>
                        <View
                          style={[
                            styles.ItemHeader,
                            { flexDirection: 'row', alignItems: 'center' },
                          ]}
                        >
                          <Image
                            source={{ uri: data.product_details?.image }}
                            style={styles.cartItemImage}
                          />

                          <View style={{ marginLeft: 10 }}>
                            <Text
                              style={[styles.holdCart, { color: COLORS.dark_grey, width: SW(40) }]}
                              numberOfLines={1}
                            >
                              {data.product_details?.name}
                            </Text>
                            <Text style={[styles.sukNumber, { width: SW(40) }]} numberOfLines={1}>
                              {moment(data?.date).format('LL')} @
                              {data?.start_time + '-' + data?.end_time}
                            </Text>
                            <Text style={styles.sukNumber}>Est: 45 ~ 50 min </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.serviceCartRightBody}>
                        <View style={styles.serviceCartBody}>
                          <View
                            style={[
                              styles.cartBodyRightSide,
                              {
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingLeft: ms(0),
                                opacity: cartIndex === ind && cartEditItem ? 0.3 : 1,
                                width: ms(60),
                                paddingRight: 30,
                              },
                            ]}
                          >
                            <Image
                              source={
                                {
                                  uri: data?.pos_user_details?.user?.user_profiles?.profile_photo,
                                } ?? userImage
                              }
                              style={styles.offerImage}
                            />
                            <Text style={styles.blueListDataText} numberOfLines={1}>
                              {data?.pos_user_details?.user?.user_profiles?.firstname}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.serviceCartBody}>
                          {cartIndex === ind && cartEditItem ? (
                            <TextInput
                              value={unitPrice.toString()}
                              onChangeText={setUnitPrice}
                              style={styles.unitPriceInput}
                              keyboardType="numeric"
                              multiline={false}
                            />
                          ) : (
                            <Text style={styles.blueListDataText}>
                              $
                              {(data?.product_details?.supply?.supply_prices?.selling_price).toFixed(
                                2
                              )}
                            </Text>
                          )}
                        </View>
                        <View style={styles.serviceCartBody}>
                          <Text>1</Text>
                        </View>
                        <View style={styles.serviceCartBody}>
                          <Text style={styles.blueListDataText}>
                            $
                            {(data?.product_details?.supply?.supply_prices?.selling_price).toFixed(
                              2
                            )}
                          </Text>
                        </View>
                        <View style={styles.serviceCartBody}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View>
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
                                  style={styles.cartEditCon}
                                  onPress={() => serviceCartEdit(data, ind)}
                                >
                                  <Image source={cartEdit} style={styles.cartEdit} />
                                </TouchableOpacity>
                              )}
                            </View>
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

            <Spacer space={SH(7)} />
          </View>
          <View style={styles.rightSideCon}>
            <View style={styles.displayflex}>
              <TouchableOpacity
                style={styles.holdCartPad}
                onPress={() => {
                  backCartLoad();
                  setNumPadModal(true);
                }}
              >
                <Image source={plus} style={styles.keyboardIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.holdCartPad}
                // onPress={() => alert('appointment customer add in progress')}
                onPress={() => setNewCustomerModal((prev) => !prev)}
              >
                <Image source={newCustomer} style={styles.keyboardIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.holdCartPad,
                  { borderColor: holdServiceArray?.length > 0 ? COLORS.primary : COLORS.black },
                ]}
                onPress={serviceCartStatusHandler}
              >
                <Image
                  source={holdCart}
                  style={[
                    styles.pause,
                    { tintColor: holdServiceArray?.length > 0 ? COLORS.primary : COLORS.dark_grey },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.holdCartCon} onPress={clearCartHandler}>
                <Image source={eraser} style={[styles.pause, { tintColor: COLORS.dark_grey }]} />
                <Text style={styles.holdCart}>{strings.dashboard.clearcart}</Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(10)} />
            <View>
              <View style={styles.nameAddCon}>
                <View style={styles.avaliableOfferCon}>
                  <Text style={[styles.holdCart, { color: COLORS.white }]}>Available Offer</Text>
                </View>

                <FlatList
                  data={availableOfferArray}
                  extraData={availableOfferArray}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={styles.avaliableOferBodyCon}
                      key={index}
                      onPress={() => serviceFun(item)}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ borderRadius: 4 }}>
                          <Image source={{ uri: item.product?.image }} style={styles.offerImage} />
                        </View>
                        <View style={{ marginLeft: 4 }}>
                          <Text style={[styles.offerText, [{ width: ms(90) }]]} numberOfLines={1}>
                            {item.product?.name}
                          </Text>
                          <Text style={styles.offerPrice}>White/S</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.offerPrice, styles.lineTrought]}>
                              ${item.actual_price_per_pack}
                            </Text>
                            <Text style={styles.offerPriceDark}>${item.offer_price_per_pack}</Text>
                          </View>
                        </View>
                      </View>
                      <Image source={addToCart} style={styles.sideAddToCart} />
                    </TouchableOpacity>
                  )}
                  style={{ flex: 1 }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
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
                    backCartLoad();
                  }}
                  disabled={cartServiceData?.length == 0 ? true : false}
                >
                  <Image source={addDiscountPic} style={styles.addDiscountPic} />
                  <Text style={styles.addDiscountText}>Add Discount</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.addDiscountCon}
                  onPress={() => {
                    addNotesHandler();
                    backCartLoad();
                  }}
                  disabled={cartServiceData?.length == 0 ? true : false}
                >
                  <Image source={notess} style={styles.addDiscountPic} />
                  <Text style={styles.addDiscountText}>Add Notes</Text>
                </TouchableOpacity>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles.totalItemCon}>
                <Text style={styles.totalItem}>
                  {strings.dashboard.totalItem} {cartServiceData?.appointment_cart_products?.length}
                </Text>
              </View>
              <Spacer space={SH(5)} />
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Sub Total</Text>
                <Text style={styles.subTotalDollar}>
                  ${cartServiceData?.amount?.products_price.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Total Taxes</Text>
                <Text style={styles.subTotalDollar}>
                  {' '}
                  ${cartServiceData?.amount?.tax.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>{`Discount ${
                  cartServiceData?.discount_flag === 'percentage' ? '(%)' : ''
                } `}</Text>
                <Text style={[styles.subTotalDollar, { color: COLORS.red }]}>
                  ${' '}
                  {cartServiceData?.amount?.discount === 0
                    ? '0.00'
                    : cartServiceData?.amount?.discount.toFixed(2) ?? '0.00'}
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
                  ${cartServiceData?.amount?.total_amount.toFixed(2) ?? '0.00'}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={[
                styles.checkoutButtonSideBar,
                { opacity: cartServiceData?.appointment_cart_products?.length > 0 ? 1 : 0.7 },
              ]}
              onPress={() => {
                backCartLoad();
                onPressPayNow();
              }}
              disabled={cartServiceData?.appointment_cart_products?.length > 0 ? false : true}
            >
              <Text style={styles.checkoutText}>{strings.posRetail.payNow}</Text>
              <Image source={checkArrow} style={styles.checkArrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal animationType="fade" transparent={true} isVisible={addServiceCartModal}>
        <AddServiceCartModal
          crossHandler={() => setAddServiceCartModal(false)}
          // detailHandler={() => setAddCartDetailModal(true)}
          sellerID={sellerID}
          itemData={serviceItemSave}
          offerId={offerId}
        />
      </Modal>

      <Modal animationType="fade" transparent={true} isVisible={numPadModal}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <CustomProductAdd crossHandler={() => setNumPadModal(false)} comeFrom="service" />
        </KeyboardAvoidingView>
      </Modal>

      <Modal animationType="fade" transparent={true} isVisible={newCustomerModal}>
        <KeyboardAvoidingView behavior="padding">
          <NewCustomerAddService crossHandler={closeCustomerAddModal} />
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
