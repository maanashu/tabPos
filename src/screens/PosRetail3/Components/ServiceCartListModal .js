import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

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
import { changeStatusServiceCart, clearOneserviceCart } from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { getCartLength } from '@/selectors/CartSelector';
import moment from 'moment';

export function ServiceCartListModal({ checkOutHandler, CloseCartModal, clearCart }) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getserviceCart;
  let arr = [getRetailData?.getserviceCart];
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.GET_ALL_CART], state));
  const serviceCartArray = getRetailData?.getAllServiceCart;
  const holdServiceArray = serviceCartArray?.filter((item) => item.is_on_hold === true);
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
  const removeOneCartHandler = (productId, index) => {
    const data = {
      cartId: cartData?.id,
      productId: productId,
    };
    if (index === 0) {
      dispatch(clearOneserviceCart(data));
      CloseCartModal();
    } else {
      dispatch(clearOneserviceCart(data));
    }
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
  return (
    <View style={styles.cartListModalView}>
      <View style={styles.displayRow}>
        <TouchableOpacity style={styles.bucketBackgorund}>
          <Image source={bucket} style={[styles.sideBarImage, { tintColor: COLORS.primary }]} />
          <View style={[styles.bucketBadge, styles.bucketBadgePrimary]}>
            <Text style={[styles.badgetext, { color: COLORS.white }]}>
              {cartData?.appointment_cart_products?.length ?? '0'}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.carttoAdd}>Cart</Text>
        <TouchableOpacity
          disabled={isLoading}
          style={styles.crossView}
          onPress={() => CloseCartModal()}
        >
          <Image source={crossButton} style={[styles.crossImage]} />
        </TouchableOpacity>
      </View>

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
              <ScrollView>
                {arr?.map((item, index) => (
                  <View key={index}>
                    {item?.appointment_cart_products?.map((data, ind) => (
                      <View style={[styles.shortCartListData, { height: SH(80) }]} key={ind}>
                        <View style={styles.displayflex}>
                          <View style={styles.shorttableListSide}>
                            <View
                              style={{
                                flexDirection: 'row',
                                // alignItems: 'center',
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
                            <Text style={styles.blueListDataText}>
                              ${data?.product_details?.supply?.supply_prices?.selling_price}
                            </Text>
                            <Text>{data.qty}</Text>
                            {/* <View style={styles.listCountCon}>
                              <TouchableOpacity
                                style={{
                                  width: SW(10),
                                  alignItems: 'center',
                                }}
                                onPress={() => updateQuantity(item?.id, data?.id, '-', ind)}
                              >
                                <Image source={minus} style={styles.minus} />
                              </TouchableOpacity>
                              <Text>{data.qty}</Text>
                             {isLoading ? (
                          <ActivityIndicator size="small" color={COLORS.primary} />
                        ) : (
                          <Text>{data.qty}</Text>
                        )} *
                              <TouchableOpacity
                                style={{
                                  width: SW(10),
                                  alignItems: 'center',
                                }}
                                onPress={() => updateQuantity(item?.id, data?.id, '+', ind)}
                              >
                                <Image source={plus} style={styles.minus} />
                              </TouchableOpacity>
                            </View> */}
                            <Text style={styles.blueListDataText}>
                              ${' '}
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

            <View style={{ flex: 1 }} />
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
            </View>
          </View>

          <View style={styles.cartListIconBody}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <Image
                source={sideKeyboard}
                style={[styles.sideBarImage, { tintColor: COLORS.dark_grey }]}
              />
              <Spacer space={SH(20)} />
              <TouchableOpacity
                onPress={() => {
                  // eraseClearCart(),
                  CloseCartModal();
                }}
              >
                <Image
                  source={sideEarser}
                  style={[styles.sideBarImage, { tintColor: COLORS.dark_grey }]}
                />
              </TouchableOpacity>
              <Spacer space={SH(20)} />
              <TouchableOpacity
                onPress={cartStatusHandler}
                // disabled={getRetailData?.getAllCart?.id === 'undefined' ? false : true}
              >
                <Image
                  source={holdCart}
                  style={
                    holdServiceArray?.length > 0
                      ? [styles.sideBarImage, { tintColor: COLORS.primary }]
                      : styles.sideBarImage
                  }
                />
                <View
                  style={
                    holdServiceArray?.length > 0
                      ? [styles.holdBadge, styles.holdBadgePrimary]
                      : styles.holdBadge
                  }
                >
                  <Text
                    style={
                      holdServiceArray?.length > 0
                        ? [styles.holdBadgetext, { color: COLORS.white }]
                        : styles.holdBadgetext
                    }
                  >
                    {holdServiceArray?.length}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}
export default React.memo(ServiceCartListModal);
