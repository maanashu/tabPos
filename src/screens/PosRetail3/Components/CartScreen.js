import React, { useState } from 'react';
import { Alert, FlatList, Keyboard, Text, View } from 'react-native';

import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  addDiscountPic,
  addToCart,
  borderCross,
  checkArrow,
  cross,
  eraser,
  holdCart,
  minus,
  notess,
  plus,
  rightBack,
  search_light,
  sideKeyboard,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CustomHeader } from './CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import {
  changeStatusProductCart,
  clearAllCart,
  getAllCartSuccess,
  getAvailableOffer,
  getOneProduct,
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
import { useEffect } from 'react';

export function CartScreen({ onPressPayNow, crossHandler, addNotesHandler, addDiscountHandler }) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
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

  console.log('cartData-----------', cartData);

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.ADDCART], state));

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
  useEffect(() => {
    const data = {
      seller_id: sellerID,
      servicetype: 'product',
    };
    dispatch(getAvailableOffer(data));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        var arr = getRetailData?.getAllCart;
        if (arr?.poscart_products.length > 0) {
          const products = arr?.poscart_products.map((item) => ({
            product_id: item?.product_id,
            qty: item?.qty,
          }));

          const data = {
            updated_products: products,
          };
          dispatch(updateCartQty(data, arr.id));
        } else {
          clearCartHandler();
        }
      };
    }, [])
  );

  const productFun = async (item) => {
    setOfferId(item?.product?.id);
    const res = await dispatch(getOneProduct(sellerID, item?.product?.id));
    if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
      setAddCartModal(true);
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
    const productPrice = product.product_details.price;

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

  const clearCartHandler = () => {
    dispatch(clearAllCart());
    crossHandler();
  };
  const removeOneCartHandler = (productId, index) => {
    // const data = {
    //   cartId: cartData?.id,
    //   productId: productId,
    // };
    // dispatch(clearOneCart(data));

    //Mukul code----->

    var arr = getRetailData?.getAllCart;
    const product = arr?.poscart_products[index];
    const productPrice = product.product_details.price;
    if (product.qty > 0) {
      arr.amount.total_amount -= productPrice * product.qty;
      arr.amount.products_price -= productPrice * product.qty;
      arr?.poscart_products.splice(index, 1);
    }
    var DATA = {
      payload: arr,
    };
    dispatch(getAllCartSuccess(DATA));
  };

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
                  crossHandler();
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
                <View style={[styles.tableListSide, styles.tableListSide2]}>
                  <Text style={styles.cashLabelWhite}>Unit Price</Text>
                  <Text style={styles.cashLabelWhite}>Quantity</Text>
                  <Text style={styles.cashLabelWhite}>Line Total</Text>
                  <Text style={{ color: COLORS.primary }}>1</Text>
                </View>
              </View>
            </View>
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
                            <Text style={styles.sukNumber}>UPC: {data?.product_details?.upc}</Text>
                          </View>
                        </View>
                      </View>
                      <View style={[styles.tableListSide, styles.tableListSide2]}>
                        <Text
                          style={[styles.blueListDataText, { width: SW(20) }]}
                          numberOfLines={1}
                        >
                          ${data?.product_details?.supply?.supply_prices?.selling_price}
                        </Text>
                        <View style={styles.listCountCon}>
                          <TouchableOpacity
                            style={{
                              width: SW(10),
                              alignItems: 'center',
                            }}
                            onPress={() => updateQuantity(item?.id, data?.id, '-', ind)}
                          >
                            <Image source={minus} style={styles.minus} />
                          </TouchableOpacity>
                          {/* {isLoading ? (
                            <ActivityIndicator size="small" color={COLORS.primary} />
                          ) : (
                            <Text>{data.qty}</Text>
                          )} */}
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
                        <Text style={styles.blueListDataText}>
                          $
                          {(
                            data.product_details?.supply?.supply_prices?.selling_price * data?.qty
                          ).toFixed(2)}
                        </Text>
                        <TouchableOpacity
                          style={{
                            width: SW(8),
                            height: SH(40),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => removeOneCartHandler(data.id, ind)}
                        >
                          <Image source={borderCross} style={styles.borderCross} />
                        </TouchableOpacity>
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
                //   onPress={() => setProductdetailModal(true)}
              >
                <Image source={sideKeyboard} style={styles.keyboardIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.holdCartCon,
                  { borderColor: holdProductArray?.length > 0 ? COLORS.primary : COLORS.black },
                ]}
                onPress={cartStatusHandler}
              >
                <Image
                  source={holdCart}
                  style={[
                    styles.pause,
                    { tintColor: holdProductArray?.length > 0 ? COLORS.primary : COLORS.dark_grey },
                  ]}
                />

                <Text
                  style={[
                    styles.holdCart,
                    { color: holdProductArray?.length > 0 ? COLORS.primary : COLORS.dark_grey },
                  ]}
                >
                  {strings.dashboard.holdCart}
                </Text>
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

                {/* <View style={[styles.availbleOfferScroll, { borderWidth: 1 }]}>
                  <ScrollView
                    scrollEnabled={true}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{ flexGrow: 1 }}
                  >
                    {availableOfferArray?.length === 0 ? (
                      <View>
                        <Text style={styles.noDataText}>No Data</Text>
                      </View>
                    ) : (
                      [1, 2, 3, 4, 5, 6]?.map((item, index) => (
                        <TouchableOpacity
                          style={styles.avaliableOferBodyCon}
                          key={index}
                          onPress={() => productFun(item.id)}
                        >
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ borderRadius: 4 }}>
                              <Image
                                source={{ uri: item.product?.image }}
                                style={styles.offerImage}
                              />
                            </View>
                            <View style={{ marginLeft: 4 }}>
                              <Text
                                style={[styles.offerText, { width: ms(110) }]}
                                numberOfLines={1}
                              >
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
                      ))
                    )}
                    availableOfferArray
                  </ScrollView>
                </View> */}
                <FlatList
                  data={availableOfferArray}
                  extraData={availableOfferArray}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.avaliableOferBodyCon}
                        key={index}
                        onPress={() => productFun(item)}
                      >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ borderRadius: 4 }}>
                            <Image
                              source={{ uri: item.product?.image }}
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
                  keyExtractor={(item, index) => index}
                  contentContainerStyle={styles.availbleOfferScroll}
                  scrollEnabled={true}
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
                <TouchableOpacity style={styles.addDiscountCon} onPress={addDiscountHandler}>
                  <Image source={addDiscountPic} style={styles.addDiscountPic} />
                  <Text style={styles.addDiscountText}>Add Discount</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addDiscountCon} onPress={addNotesHandler}>
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
              {/* <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Total VAT</Text>
                <Text style={styles.subTotalDollar}>$0.00</Text>
              </View> */}
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Total Taxes</Text>
                <Text style={styles.subTotalDollar}>
                  {' '}
                  ${cartData?.amount?.tax.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Discount</Text>
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
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={[styles.checkoutButtonSideBar]} onPress={onPressPayNow}>
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
          />
        )}
      </Modal>
    </View>
  );
}
