import React from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';

import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  Fonts,
  borderCross,
  bucket,
  checkArrow,
  crossButton,
  holdCart,
  minus,
  plus,
  sideEarser,
  sideKeyboard,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import {
  changeStatusServiceCart,
  clearOneserviceCart,
  clearServiceAllCart,
  getServiceCartSuccess,
  updateServiceCartQty,
} from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { getCartLength, getServiceCartLength } from '@/selectors/CartSelector';
import moment from 'moment';
import { updateServiceCartLength } from '@/actions/CartAction';
import { useFocusEffect } from '@react-navigation/native';
import { Images } from '@/assets/new_icon';
import { ms } from 'react-native-size-matters';

export function ServiceCartListModal({ checkOutHandler, CloseCartModal, clearCart, customAddBtn }) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getserviceCart;
  let arr = [getRetailData?.getserviceCart];
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_ALL_CART], state));
  const serviceCartArray = getRetailData?.getAllServiceCart;
  const holdServiceArray = serviceCartArray?.filter((item) => item.is_on_hold === true);
  const CART_LENGTH = useSelector(getServiceCartLength);

  function calculatePercentageValue(value, percentage) {
    if (percentage == '') {
      return '';
    }
    const percentageValue = (percentage / 100) * parseFloat(value);
    return percentageValue.toFixed(2) ?? 0.0;
  }

  const cartStatusHandler = () => {
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

  const removeOneCartHandler = (productId, index) => {
    var arr = getRetailData?.getserviceCart;
    if (arr?.appointment_cart_products.length == 1 && index == 0) {
      dispatch(clearServiceAllCart());
      CloseCartModal();
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

    // const data = {
    //   cartId: cartData?.id,
    //   productId: productId,
    // };
    // if (index === 0) {
    //   dispatch(clearOneserviceCart(data));
    //   CloseCartModal();
    // } else {
    //   dispatch(clearOneserviceCart(data));
    // }
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       var arr = getRetailData?.getAllCart;

  //       if (arr?.poscart_products?.length > 0) {
  //         const products = arr?.poscart_products.map((item) => ({
  //           product_id: item?.product_id,
  //           qty: item?.qty,
  //         }));

  //         const data = {
  //           updated_products: products,
  //         };
  //         dispatch(updateCartQty(data, arr.id));
  //       } else {
  //         // clearCartHandler();
  //       }
  //     };
  //   }, [])
  // );
  const formattedReturnPrice = (price) => {
    // Convert price to a number, defaulting to 0 if it's falsy or not a number
    const numericPrice = parseFloat(price) || 0;

    // Format the numeric price with 2 decimal places
    const formattedPrice = numericPrice.toFixed(2);

    // Determine the sign and prepend accordingly
    const sign = numericPrice == 0 ? '' : '-';

    return `${sign}$${formattedPrice}`;
  };
  return (
    <View style={styles.cartListModalView}>
      {isLoading ? (
        <ActivityIndicator size={'large'} animating color={COLORS.primary} />
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={styles.shortestCartListBody}>
            <View style={styles.shortCartListHeight}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {arr?.map((item, index) => (
                  <View key={index}>
                    {item?.appointment_cart_products?.map((data, ind) => (
                      <View style={[styles.shortCartListData, { height: SH(80) }]} key={ind}>
                        <View style={styles.displayflex}>
                          <View style={styles.shorttableListSide}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Image
                                source={{ uri: data.product_details?.image }}
                                style={styles.serviceCartImage}
                              />
                              <View style={{ marginLeft: 10 }}>
                                <Text
                                  style={[styles.blueListDataText, { width: SW(35) }]}
                                  numberOfLines={1}
                                >
                                  {data.product_details?.name}
                                </Text>
                                <Text
                                  style={[styles.shortServiceItalic, { width: SW(35) }]}
                                  numberOfLines={1}
                                >
                                  {moment(data?.date).format('LL')} @
                                  {data?.start_time + '-' + data?.end_time}
                                </Text>
                                <Text style={styles.sukNumber}>Est: 45 ~ 50 min </Text>
                                <Text style={styles.sukNumber}>
                                  Staff:{' '}
                                  <Text style={{ fontFamily: Fonts.SemiBold }}>
                                    {data?.pos_user_details?.user?.user_profiles?.firstname}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.ShorttableListSide2}>
                            {data?.product_details?.supply?.offer?.offer_price_per_pack &&
                            data?.product_details?.supply?.supply_prices?.selling_price ? (
                              <Text style={styles.blueListDataText}>
                                $
                                {data?.product_details?.supply?.offer?.offer_price_per_pack?.toFixed(
                                  2
                                )}
                              </Text>
                            ) : (
                              <Text style={styles.blueListDataText}>
                                $
                                {data?.product_details?.supply?.supply_prices?.selling_price?.toFixed(
                                  2
                                )}
                              </Text>
                            )}
                            <Text>{data.qty}</Text>

                            {data?.product_details?.supply?.offer?.offer_price_per_pack &&
                            data?.product_details?.supply?.supply_prices?.selling_price ? (
                              <Text style={styles.blueListDataText}>
                                $
                                {data?.product_details?.supply?.offer?.offer_price_per_pack?.toFixed(
                                  2
                                )}
                              </Text>
                            ) : (
                              <Text style={styles.blueListDataText}>
                                $
                                {data?.product_details?.supply?.supply_prices?.selling_price?.toFixed(
                                  2
                                )}
                              </Text>
                            )}
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
              </ScrollView>
            </View>

            {/* <View style={{ flex: 1 }} />
            <View style={styles.displayflex}>
              <View>
                <Text style={styles.blueListDataText}>Item Value</Text>

                <Text style={[styles.productPrice, { fontSize: SF(20) }]}>
                  ${cartData?.amount?.total_amount.toFixed(2) ?? '0.00'}
                </Text>
              </View>
              <TouchableOpacity style={styles.checkoutButtonSideBar} onPress={checkOutHandler}>
                <Text style={styles.checkoutText}>Checkout</Text>
                <Image source={checkArrow} style={styles.checkArrow} />
              </TouchableOpacity>
            </View> */}
            <View
              style={{
                height: Platform.OS === 'ios' ? ms(108) : ms(132),
                paddingHorizontal: ms(30),
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderTopWidth: 1,
                  paddingTop: ms(5),
                  borderColor: COLORS.light_purple,
                }}
              >
                <View style={[styles.displayflex2, styles.paddVertical]}>
                  <Text style={styles.subTotal}>Sub Total</Text>
                  <Text style={styles.subTotalDollar}>
                    ${cartData?.amount?.products_price.toFixed(2) ?? '0.00'}
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
                  <Text style={styles.subTotalDollar}>
                    ${cartData?.amount?.tax.toFixed(2) ?? '0.00'}
                  </Text>
                </View>
                <View style={[styles.displayflex2, styles.paddVertical]}>
                  <Text style={styles.itemValue}>Total</Text>
                  <Text style={styles.itemValue}>
                    ${cartData?.amount?.total_amount.toFixed(2) ?? '0.00'}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.checkoutButtonSideBar, { marginTop: ms(7) }]}
                  onPress={checkOutHandler}
                >
                  <Text style={styles.checkoutText}>Proceed to checkout</Text>
                  <Image source={Images.arrowUpRightIcon} style={styles.checkArrow} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
export default React.memo(ServiceCartListModal);
