import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail2/PosRetail2.styles';
import {
  borderCross,
  bucket,
  checkArrow,
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
import { addTocart, clearAllCart, clearOneCart } from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';

export function CartListModal({ checkOutHandler }) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  let arr = [getRetailData?.getAllCart];
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.ADDCART], state)
  );

  const updateQuantity = (cartId, productId, operation) => {
    const updatedArr = [...arr];

    const cartItem = updatedArr
      .find(item => item.id === cartId)
      ?.poscart_products.find(product => product.id === productId);

    if (cartItem) {
      if (operation === '+') {
        cartItem.qty += 1;
      } else if (operation === '-') {
        cartItem.qty -= 1;
      }
      const data = {
        seller_id: cartItem?.product_details?.supply?.seller_id,
        supplyId: cartItem?.supply_id,
        supplyPriceID: cartItem?.supply_price_id,
        product_id: cartItem?.product_id,
        service_id: cartItem?.service_id,
        qty: cartItem?.qty,
      };
      dispatch(addTocart(data));
      // dispatch(createCartAction(withoutVariantObject));
    }
  };
  const removeOneCartHandler = productId => {
    const data = {
      cartId: cartData?.id,
      productId: productId,
    };
    dispatch(clearOneCart(data));
  };

  return (
    <View style={styles.cartListModalView}>
      <View style={styles.displayRow}>
        <TouchableOpacity style={styles.bucketBackgorund}>
          <Image
            source={bucket}
            style={[styles.sideBarImage, { tintColor: COLORS.primary }]}
          />
          <View style={[styles.bucketBadge, styles.bucketBadgePrimary]}>
            <Text style={[styles.badgetext, { color: COLORS.white }]}>
              {cartData?.poscart_products?.length ?? '0'}
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.carttoAdd}>Cart to add</Text>
      </View>
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
                            <Image
                              source={{ uri: data.product_details?.image }}
                              style={styles.columbiaMen}
                            />
                            <View style={{ marginLeft: 10 }}>
                              <Text
                                style={[
                                  styles.blueListDataText,
                                  { width: SW(35) },
                                ]}
                                numberOfLines={1}
                              >
                                {data.product_details?.name}
                              </Text>
                              <Text style={styles.sukNumber}>White/S</Text>
                            </View>
                          </View>
                        </View>
                        <View style={styles.ShorttableListSide2}>
                          <Text style={styles.blueListDataText}>
                            $
                            {
                              data?.product_details?.supply?.supply_prices
                                ?.selling_price
                            }
                          </Text>
                          <View style={styles.listCountCon}>
                            <TouchableOpacity
                              style={{
                                width: SW(10),
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                updateQuantity(item?.id, data?.id, '-')
                              }
                            >
                              <Image source={minus} style={styles.minus} />
                            </TouchableOpacity>
                            {isLoading ? (
                              <ActivityIndicator
                                size="small"
                                color={COLORS.primary}
                              />
                            ) : (
                              <Text>{data.qty}</Text>
                            )}
                            <TouchableOpacity
                              style={{
                                width: SW(10),
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                updateQuantity(item?.id, data?.id, '+')
                              }
                            >
                              <Image source={plus} style={styles.minus} />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.blueListDataText}>
                            ${' '}
                            {(
                              data.product_details?.supply?.supply_prices
                                ?.selling_price * data?.qty
                            ).toFixed(2)}
                          </Text>
                          <TouchableOpacity
                            style={{
                              width: SW(8),
                              height: SH(40),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => removeOneCartHandler(data.id)}
                          >
                            <Image
                              source={borderCross}
                              style={styles.borderCross}
                            />
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
                ${cartData?.amount?.total_amount ?? '0.00'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButtonSideBar}
              onPress={checkOutHandler}
            >
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
            <TouchableOpacity onPress={() => dispatch(clearAllCart())}>
              <Image
                source={sideEarser}
                style={[styles.sideBarImage, { tintColor: COLORS.dark_grey }]}
              />
            </TouchableOpacity>
            <Spacer space={SH(20)} />
            <View>
              <Image
                source={holdCart}
                style={[styles.sideBarImage, { tintColor: COLORS.dark_grey }]}
              />
              <View style={styles.holdBadge}>
                <Text style={styles.holdBadgetext}>0</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
