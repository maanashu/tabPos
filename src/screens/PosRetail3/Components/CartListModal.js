import React from 'react';
import { ActivityIndicator, Platform, Text, View } from 'react-native';

import { COLORS, SF, SH, SW } from '@/theme';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { borderCross, minus, plus } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import {
  addTocart,
  changeStatusProductCart,
  clearAllCart,
  clearOneCart,
  getAllCart,
  getAllCartSuccess,
  updateCartQty,
} from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getCartLength } from '@/selectors/CartSelector';
import { clearLocalCart, updateCartLength } from '@/actions/CartAction';
import { ms } from 'react-native-size-matters';
import { Images } from '@/assets/new_icon';
import { useEffect } from 'react';

export function CartListModal({ checkOutHandler, clearCart, cartQtyUpdate, cartListModalOff }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  let arr = [getRetailData?.getAllCart];

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_ALL_CART], state));
  const isLoadingCart = useSelector((state) => isLoadingSelector([TYPES.CREATE_BULK_CART], state));

  const productCartArray = getRetailData?.getAllProductCart;
  const holdProductArray = productCartArray?.filter((item) => item.is_on_hold === true);
  const CART_LENGTH = useSelector(getCartLength);

  const updateQuantity = (cartId, productId, operation, index) => {
    var arr = getRetailData?.getAllCart;
    const product = arr?.poscart_products[index];
    const productPrice = product.product_details.price;
    const restProductQty = product?.product_details?.supply?.rest_quantity;
    if (operation === '+') {
      if (restProductQty > product.qty) {
        product.qty += 1;
        arr.amount.total_amount += productPrice;
        arr.amount.products_price += productPrice;
      } else {
        alert('There are no more quantity left to add');
      }
    } else if (operation === '-') {
      if (product.qty > 0) {
        if (product.qty == 1) {
          arr?.poscart_products.splice(index, 1);
          dispatch(updateCartLength(CART_LENGTH - 1));
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
    setTimeout(() => {
      cartQtyUpdate();
    }, 1000);
  };

  const clearCartHandler = async () => {
    dispatch(clearAllCart());
    cartListModalOff();
    // dispatch(clearLocalCart());
    // setTimeout(() => {
    //   crossHandler();
    // }, 2000);
  };
  const removeOneCartHandler = (productId, index) => {
    var arr = getRetailData?.getAllCart;
    if (arr?.poscart_products.length == 1 && index == 0) {
      clearCartHandler();
    } else {
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
      dispatch(updateCartLength(CART_LENGTH - 1));
      dispatch(getAllCartSuccess(DATA));
    }
  };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       updateQty();
  //     };
  //   }, [])
  // );
  useEffect(() => {
    if (!isFocused) {
      updateQty();
    }
  }, [isFocused]);

  const updateQty = () => {
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
  // const clearCartHandler = () => {
  //   dispatch(clearAllCart());
  //   dispatch(clearLocalCart());
  //   // setTimeout(() => {
  //   //   crossHandler();
  //   // }, 1500);
  // };
  const eraseClearCart = async () => {
    clearCart();
    // dispatch(clearAllCart())
  };

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
      {isLoading || isLoadingCart ? (
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
                    {item?.poscart_products?.map((data, ind) => (
                      <View style={styles.shortCartListData} key={ind}>
                        <View style={styles.displayflex}>
                          <View style={styles.shorttableListSide}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <View
                                style={{
                                  padding: ms(4),
                                  borderRadius: ms(5),
                                  backgroundColor: COLORS.textInputBackground,
                                }}
                              >
                                <Image
                                  source={{ uri: data.product_details?.image }}
                                  style={styles.columbiaMen}
                                />
                              </View>

                              <View style={{ marginLeft: 10 }}>
                                <Text
                                  style={[styles.blueListDataText, { width: SW(35) }]}
                                  numberOfLines={1}
                                >
                                  {data.product_details?.name}
                                </Text>
                                <Text style={styles.sukNumber}>White/S</Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.ShorttableListSide2}>
                            <Text
                              style={[styles.blueListDataText, { width: ms(35) }]}
                              numberOfLines={1}
                            >
                              ${data?.product_details?.supply?.supply_prices?.selling_price}
                            </Text>
                            <View style={styles.listCountCon}>
                              <TouchableOpacity
                                style={{
                                  width: ms(10),
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                onPress={() => updateQuantity(item?.id, data?.id, '-', ind)}
                                disabled={data.qty == 1 ? true : false}
                              >
                                <Image source={minus} style={styles.minus} />
                              </TouchableOpacity>
                              <View style={styles.dataQtyCon}>
                                <Text style={styles.dataQty}>{data.qty}</Text>
                              </View>

                              <TouchableOpacity
                                style={{
                                  width: ms(11),
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
                                data.product_details?.supply?.supply_prices?.selling_price *
                                data?.qty
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
              </ScrollView>
            </View>

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
export default React.memo(CartListModal);
