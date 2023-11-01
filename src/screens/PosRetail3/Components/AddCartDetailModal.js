import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { Fonts, bell, toggleSecBlue, vectorOff } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { ms } from 'react-native-size-matters';
import { addTocart } from '@/actions/RetailAction';

export function AddCartDetailModal({
  crossHandler,
  sellerID,
  openFrom,
  addToLocalCart,
  productItem,
  productIndex,
  doubleCrossHandler,
}) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const productDetail = getRetailData?.getOneProduct?.product_detail;
  const stockHandArray = productDetail?.supplies?.[0]?.supply_variants;

  // Remove HTML tags
  const withoutHtmlTags = productDetail?.description?.replace(/<\/?[^>]+(>|$)|&nbsp;/g, '');

  // Remove special characters and white spaces
  const withoutSpecialCharsAndSpaces = withoutHtmlTags?.trim().replace(/[^\w\s]/gi, '');

  let deliveryOption =
    getRetailData?.getOneProduct?.product_detail?.supplies?.[0]?.delivery_options?.split(',');
  let deliveryOptionImage = deliveryOption?.find((item) => {
    return item === '1';
  });
  let inStoreImage = deliveryOption.find((item) => {
    return item === '3';
  });
  let shippingImage = deliveryOption.find((item) => {
    return item === '4';
  });

  const addToCartHandler = async () => {
    const data = {
      seller_id: sellerID,
      service_id: productDetail?.service_id,
      product_id: productDetail?.id,
      qty: 1,
      supplyId: productDetail?.supplies?.[0]?.id,
      supplyPriceID: productDetail?.supplies?.[0]?.supply_prices[0]?.id,
    };
    openFrom === 'main' && addToLocalCart(productItem, productIndex, 1);
    dispatch(addTocart(data));
    doubleCrossHandler();
  };

  return (
    <View style={styles.addCartDetailCon}>
      <View style={styles.addCartDetailConHeader}>
        <Text style={[styles.jacketName, { width: SW(120) }]} numberOfLines={1}>
          {productDetail?.name}
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={[styles.backTocartCon]} onPress={crossHandler}>
            <Text style={styles.backTocartText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartCon} onPress={addToCartHandler}>
            <Text style={styles.addTocartText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.addCartDetailBody}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.clothProfileCon]}>
            <Image source={{ uri: productDetail?.image }} style={styles.profileCloth} />
            <View style={styles.profileClothDes}>
              <Text style={[styles.jacketName, { fontSize: SF(15) }]}>{productDetail?.name}</Text>
              <Text style={styles.clothProfileSubHead}>
                {productDetail?.category?.name} {'>'} {productDetail?.sub_category?.name}
              </Text>
              <Text style={[styles.clothProfileDes, styles.discriptionWidth]}>
                {withoutSpecialCharsAndSpaces}
              </Text>
            </View>
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.priceCon}>
            <Text style={[styles.jacketName, { fontFamily: Fonts.Regular }]}>Price</Text>
            <Text style={styles.jacketName}>
              ${productDetail?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
            </Text>
          </View>
          <Spacer space={SH(20)} />
          <View style={styles.skuCon}>
            <View style={styles.skuConBody}>
              <Text style={styles.sku}>SKU</Text>
              <Text style={styles.sku}>{productDetail?.sku}</Text>
            </View>
            <View style={styles.skuConBody}>
              <Text style={styles.sku}>Barcode</Text>
              <Text style={styles.sku}>{productDetail?.barcode}</Text>
            </View>
            <View style={styles.skuConBody}>
              <Text style={styles.sku}>Unit Type</Text>
              <Text style={[styles.sku, { textTransform: 'capitalize' }]}>
                {productDetail?.type}{' '}
              </Text>
            </View>
            <View style={styles.skuConBody}>
              <Text style={styles.sku}>Unit Weight</Text>
              <Text style={styles.sku}>
                {productDetail?.weight + ' ' + productDetail?.weight_unit}
              </Text>
            </View>
            <View style={[styles.skuConBody, { borderColor: COLORS.white }]}>
              <Text style={styles.sku}>Other locations</Text>
              <Text style={styles.sku}>{'NA'}</Text>
            </View>
          </View>
          {/* Stock on hand section start */}
          <Spacer space={SH(20)} />
          {productDetail?.supplies?.[0]?.supply_variants?.length > 0 ? (
            <View style={styles.skuCon}>
              <View style={styles.skuConBody}>
                <Text style={[styles.jacketName, { fontSize: SF(15) }]}>Stock on Hand</Text>
              </View>
              <Spacer space={SH(20)} />

              <View style={styles.ScrollableMainCon}>
                {/* <View style={styles.selectColorCon}>
                <View style={styles.colorArea}></View>
                <Text style={styles.sku}>Hyper Blue</Text>
              </View> */}
                <Spacer space={SH(15)} />

                <FlatList
                  data={stockHandArray}
                  extraData={stockHandArray}
                  renderItem={({ item, index }) => {
                    const variant = JSON.parse(item?.attribute_variant?.variants);
                    const productSize = variant?.filter((item) => item.attribute_name === 'Size');
                    const productColor = variant?.filter((item) => item.attribute_name === 'Color');

                    return (
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={[styles.imageView, { borderColor: COLORS.solidGrey }]}>
                          <Image source={{ uri: item.image }} style={styles.scrollImage} />
                        </View>
                        <View style={[styles.sizeSelectItemCon]}>
                          <View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Text style={styles.detailColorSize}>color :</Text>
                              <View
                                style={{
                                  width: ms(8),
                                  height: ms(8),
                                  borderRadius: ms(2),
                                  backgroundColor: productColor?.[0]?.attribute_value_name,
                                  marginHorizontal: ms(3),
                                }}
                              ></View>
                            </View>

                            <Text style={styles.detailColorSize}>
                              Size : {productSize?.[0]?.attribute_value_name}
                            </Text>
                          </View>

                          <Text
                            style={[
                              styles.detailColorSize,
                              {
                                fontFamily: Fonts.SemiBold,
                                color: item?.stock <= 10 ? COLORS.red : COLORS.solid_grey,
                              },
                            ]}
                          >
                            {item?.stock}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => alert('in progress')}
                          style={[
                            styles.sizeSelectItemCon,
                            styles.adminItemCon,
                            { opacity: item?.stock <= 10 ? 1 : 0.4 },
                          ]}
                          disabled={item?.stock <= 10 ? false : true}
                        >
                          <Image source={bell} style={[styles.bell]} />
                          <Text style={styles.detailColorSize}>Remind Admin</Text>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  showsVerticalScrollIndicator={false}
                  ListHeaderComponent={() => (
                    <View style={[styles.displayflex, { width: ms(190), marginLeft: ms(50) }]}>
                      <Text style={[styles.jacketName, { fontSize: SF(14) }]}>Color/Size</Text>
                      <Text style={[styles.jacketName, { fontSize: SF(14) }]}>Stock</Text>
                    </View>
                  )}
                />
              </View>

              <Spacer space={SH(20)} />
              <View style={[styles.skuConBody, styles.reOrderBody]}>
                <Text style={[styles.sku, { fontFamily: Fonts.Italic }]}>Reorder Point</Text>
                <Text style={[styles.sku, { fontFamily: Fonts.Italic }]}>10</Text>
              </View>
            </View>
          ) : null}

          {/* Available for selling section start */}
          <Spacer space={SH(20)} />
          <View style={styles.sizeSelectItemCona}>
            <Spacer space={SH(15)} />
            <Text style={styles.sku}>Available for Selling</Text>
            <Spacer space={SH(10)} />
            <View style={styles.inStoreBody}>
              <Text style={styles.inStoreText}>In store</Text>
              <Image
                source={inStoreImage === '3' ? toggleSecBlue : vectorOff}
                style={styles.toggleSecBlue}
              />
            </View>
            <Spacer space={SH(8)} />
            <View style={styles.inStoreBody}>
              <Text style={styles.inStoreText}>Online - delivery</Text>
              <Image
                source={deliveryOptionImage === '1' ? toggleSecBlue : vectorOff}
                style={styles.toggleSecBlue}
              />
            </View>
            <Spacer space={SH(8)} />
            <View style={styles.inStoreBody}>
              <Text style={styles.inStoreText}>Online - Shipping</Text>
              <Image
                source={shippingImage === '4' ? toggleSecBlue : vectorOff}
                style={styles.toggleSecBlue}
              />
            </View>

            <Spacer space={SH(8)} />
          </View>

          {/* Available for selling section end */}
        </ScrollView>
      </View>
    </View>
  );
}
