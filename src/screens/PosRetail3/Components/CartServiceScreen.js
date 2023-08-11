import React, { useState } from 'react';
import { Keyboard, Text, View } from 'react-native';

import { COLORS, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  addDiscountPic,
  addToCart,
  borderCross,
  checkArrow,
  clothes,
  cross,
  eraser,
  holdCart,
  minus,
  notess,
  plus,
  rightBack,
  search_light,
  sideKeyboard,
  userImage,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { CustomHeader } from './CustomHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import {
  changeStatusServiceCart,
  clearAllCart,
  clearServiceAllCart,
  getAllCartSuccess,
  getServiceCartSuccess,
  getUserDetail,
  getUserDetailSuccess,
  sendInvitation,
  updateCartQty,
} from '@/actions/RetailAction';
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { emailReg } from '@/utils/validators';
import { useFocusEffect } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import moment from 'moment';

export function CartServiceScreen({
  onPressPayNow,
  crossHandler,
  addNotesHandler,
  addDiscountHandler,
}) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartServiceData = getRetailData?.getserviceCart;
  let arr = [getRetailData?.getserviceCart];
  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];
  const [customerPhoneNo, setCustomerPhoneNo] = useState();
  const serviceCartArray = getRetailData?.getAllServiceCart;
  const holdServiceArray = serviceCartArray?.filter((item) => item.is_on_hold === true);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAdd, setUserAdd] = useState('');
  const [cartSearch, setCartSearch] = useState('');

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.ADDCART], state));

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

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       var arr = getRetailData?.getAllCart;
  //       if (arr.poscart_products.length > 0) {
  //         const products = arr.poscart_products.map((item) => ({
  //           product_id: item?.product_id,
  //           qty: item?.qty,
  //         }));

  //         const data = {
  //           updated_products: products,
  //         };
  //         dispatch(updateCartQty(data, arr.id));
  //       } else {
  //         clearCartHandler();
  //       }
  //     };
  //   }, [])
  // );

  const updateQuantity = (cartId, productId, operation, index) => {
    // const updatedArr = [...arr];

    // const cartItem = updatedArr
    //   .find(item => item.id === cartId)
    //   ?.poscart_products.find(product => product.id === productId);

    //   if (cartItem) {
    //   if (operation === '+') {
    //     cartItem.qty += 1;
    //   } else if (operation === '-') {
    //     cartItem.qty -= 1;
    //   }
    //   const data = {
    //     seller_id: cartItem?.product_details?.supply?.seller_id,
    //     supplyId: cartItem?.supply_id,
    //     supplyPriceID: cartItem?.supply_price_id,
    //     product_id: cartItem?.product_id,
    //     service_id: cartItem?.service_id,
    //     qty: cartItem?.qty,
    //   };

    //   dispatch(addTocart(data));
    //   // dispatch(createCartAction(withoutVariantObject));
    // }

    //Mukul code----->

    var arr = getRetailData?.getAllCart;
    const product = arr?.poscart_products[index];
    const productPrice = product.product_details.price;

    if (operation === '+') {
      product.qty += 1;
      arr.amount.total_amount += productPrice;
      arr.amount.products_price += productPrice;
    } else if (operation === '-') {
      if (product.qty > 0) {
        if (product.qty == 1) {
          arr?.poscart_products.splice(index, 1);
        }
        product.qty -= 1;
        arr.amount.total_amount -= productPrice;
        arr.amount.products_price -= productPrice;
      }
    }
    var DATA = {
      payload: arr,
    };
    dispatch(getAllCartSuccess(DATA));
  };

  const clearCartHandler = () => {
    dispatch(clearServiceAllCart());
    crossHandler();
  };

  const removeOneCartHandler = (productId, index) => {
    // const data = {
    //   cartId: cartServiceData?.id,
    //   productId: productId,
    // };
    // console.log('data', data);
    // return;

    // dispatch(clearOneCart(data));

    //Mukul code----->

    var arr = getRetailData?.getserviceCart;
    const product = arr.appointment_cart_products[index];
    const productPrice = product.product_details.price;
    if (product.qty > 0) {
      arr.amount.total_amount -= productPrice * product.qty;
      arr.amount.products_price -= productPrice * product.qty;
      arr.appointment_cart_products.splice(index, 1);
    }
    var DATA = {
      payload: arr,
    };
    dispatch(getServiceCartSuccess(DATA));
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
                <View style={styles.cartHeaderLeftSide}>
                  <Text style={[styles.cashLabelWhite, styles.cashLabelWhiteHash]}>#</Text>
                  <Text style={styles.ItemHeader}>Item</Text>
                </View>
                <View style={styles.cartHeaderRightSide}>
                  <Text style={styles.cartHeaderBodyRightSide} numberOfLines={1}>
                    Staff Name
                  </Text>
                  <Text style={styles.cartHeaderBodyRightSide} numberOfLines={1}>
                    Unit Price
                  </Text>
                  <Text style={styles.cartHeaderBodyRightSide} numberOfLines={1}>
                    Quantity
                  </Text>
                  <Text style={styles.cartHeaderBodyRightSide} numberOfLines={1}>
                    Line Total
                  </Text>
                  <Text style={styles.cartHeaderBodyRightSide} numberOfLines={1}>
                    {null}
                  </Text>
                </View>
              </View>
            </View>
            {arr?.map((item, index) => (
              <View key={index}>
                {item?.appointment_cart_products?.map((data, ind) => (
                  <View style={[styles.blueListData, { height: SH(70) }]} key={ind}>
                    <View style={styles.displayflex}>
                      <View style={styles.cartHeaderLeftSide}>
                        <Text style={[styles.blueListDataText, styles.cashLabelWhiteHash]}>
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
                            <Text style={[styles.sukNumber, { width: SW(50) }]} numberOfLines={1}>
                              {moment(data?.date).format('LL')} @
                              {data?.start_time + '-' + data?.end_time}
                            </Text>
                            <Text style={styles.sukNumber}>Est: 45 ~ 50 min </Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.cartHeaderRightSide}>
                        <View
                          style={[
                            styles.cartBodyRightSide,
                            { flexDirection: 'row', alignItems: 'center' },
                          ]}
                        >
                          <Image
                            source={
                              { uri: data?.pos_user_details?.user?.user_profiles?.profile_photo } ??
                              userImage
                            }
                            style={styles.offerImage}
                          />
                          <Text
                            style={[styles.blueListDataText, { marginLeft: 3, width: SW(20) }]}
                            numberOfLines={1}
                          >
                            {data?.pos_user_details?.user?.user_profiles?.firstname}
                          </Text>
                        </View>
                        <Text style={[styles.cartBodyRightSide]} numberOfLines={1}>
                          $
                          {(data?.product_details?.supply?.supply_prices?.selling_price).toFixed(2)}
                        </Text>
                        <Text style={styles.cartBodyRightSide}>1</Text>

                        <Text style={styles.cartBodyRightSide} numberOfLines={1}>
                          $
                          {(data?.product_details?.supply?.supply_prices?.selling_price).toFixed(2)}
                        </Text>
                        <TouchableOpacity
                          style={[styles.cartBodyRightSide, { alignItems: 'center' }]}
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
              <TouchableOpacity style={styles.holdCartCon} onPress={serviceCartStatusHandler}>
                <Image source={holdCart} style={styles.pause} />

                <Text style={styles.holdCart}>{strings.dashboard.holdCart}</Text>
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
                {[1, 2, 3].map((item, index) => (
                  <View style={styles.avaliableOferBodyCon}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={{ borderRadius: 4 }}>
                        <Image source={clothes} style={styles.offerImage} />
                      </View>
                      <View style={{ marginLeft: 4 }}>
                        <Text style={styles.offerText}>Marbolo red pack</Text>
                        <Text style={styles.offerPrice}>White/S</Text>
                        <Text style={styles.offerPrice}>
                          $6.56 <Text style={styles.offerPriceDark}>$6.56</Text>
                        </Text>
                      </View>
                    </View>
                    <Image source={addToCart} style={styles.sideAddToCart} />
                  </View>
                ))}
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
                <Text style={styles.subTotal}>Total VAT</Text>
                <Text style={styles.subTotalDollar}>$0.00</Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Total Taxes</Text>
                <Text style={styles.subTotalDollar}>
                  {' '}
                  ${cartServiceData?.amount?.tax.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              {/* <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Discount</Text>
                <Text style={[styles.subTotalDollar, { color: COLORS.red }]}>
                  ${' '}
                  {cartServiceData?.amount?.discount === 0
                    ? '0.00'
                    : cartData?.amount?.discount.toFixed(2) ?? '0.00'}
                </Text>
              </View> */}
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
            <TouchableOpacity style={[styles.checkoutButtonSideBar]} onPress={onPressPayNow}>
              <Text style={styles.checkoutText}>{strings.posRetail.payNow}</Text>
              <Image source={checkArrow} style={styles.checkArrow} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
