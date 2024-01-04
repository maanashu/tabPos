import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { moderateScale, ms, verticalScale } from 'react-native-size-matters';
import { Fonts, clothes, minus, plus, bell } from '@/assets';
import moment from 'moment';

import { CustomHeader } from './CustomHeader';
import { COLORS, SF, SH, SW } from '@/theme';
import { Images } from '@/assets/new_icon';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import { addTocart, checkSuppliedVariant } from '@/actions/RetailAction';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { FullScreenLoader } from '@mPOS/components';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { amountFormat } from '@/utils/GlobalMethods';

moment.suppressDeprecationWarnings = true;

export const AddProductScreen = ({ backHandler }) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const productDetail = getRetailData?.getOneProduct?.product_detail;
  console.log('getRetailData?.getOneProduct', JSON.stringify(getRetailData?.getOneProduct));
  const [colorId, setColorId] = useState(null);
  const [sizeId, setSizeId] = useState(null);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const sizeAndColorArray = productDetail?.supplies?.[0]?.attributes;
  const sizeArray = sizeAndColorArray?.filter((item) => item.name === 'Size');
  const colorArray = sizeAndColorArray?.filter((item) => item.name === 'Color');
  const attrsArr = productDetail?.supplies[0]?.attributes;
  const [count, setCount] = useState(1);
  const restProductQty = productDetail.supplies[0]?.rest_quantity;
  const stockHandArray = productDetail?.supplies?.[0]?.supply_variants;
  // avaiblity option
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

  const isChecksSuppliesVariant = useSelector((state) =>
    isLoadingSelector([TYPES.CHECK_SUPPLIES_VARIANT], state)
  );

  const addToCartHandler = async () => {
    if (productDetail?.supplies?.[0]?.attributes?.length === 0) {
      // openFrom === 'main' && onClickAddCartModal(selectedItem, productIndex, count);

      const data = {
        seller_id: sellerID,
        service_id: productDetail?.service_id,
        product_id: productDetail?.id,
        qty: count,
        supplyId: productDetail?.supplies?.[0]?.id,
        supplyPriceID: productDetail?.supplies?.[0]?.supply_prices[0]?.id,
        // offerId: offerId,
      };
      // openFrom === 'main' && addToLocalCart(productItem, productIndex, count);
      dispatch(addTocart(data));
      backHandler();
    } else {
      if (colorArray?.length >= 1 && colorId === null) {
        CustomErrorToast({ message: 'Please select the Color' });
      } else if (sizeArray?.length >= 1 && sizeId === null) {
        CustomErrorToast({ message: 'Please select the Size' });
      } else {
        const attrIds = [
          { order: attrsArr.findIndex((attr) => attr?.name?.toLowerCase() === 'size'), id: sizeId },
          {
            order: attrsArr.findIndex((attr) => attr?.name?.toLowerCase() === 'color'),
            id: colorId,
          },
        ];

        const data = {
          colorAndSizeId: attrIds
            .sort((a, b) => a.order - b.order)
            .filter((ele) => ele.order != -1)
            .map((el) => el.id)
            .join(),
          supplyId: productDetail?.supplies?.[0]?.id,
        };

        const res = await dispatch(checkSuppliedVariant(data));
        // openFrom === 'main' && onClickAddCartModal(selectedItem, productIndex, count);
        const Data = {
          seller_id: sellerID,
          service_id: productDetail?.service_id,
          product_id: productDetail?.id,
          qty: count,
          supplyId: productDetail?.supplies?.[0]?.id,
          supplyPriceID: productDetail?.supplies?.[0]?.supply_prices[0]?.id,
          supplyVariantId: res?.payload?.id,
        };
        if (res?.type === 'CHECK_SUPPLIES_VARIANT_SUCCESS') {
          // setAddToCartLoader(true);

          const res = await dispatch(addTocart(Data));
          if (res?.msg !== 'Wrong supply variant choosen.') {
            backHandler();
            // openFrom === 'main' &&
            //   addToLocalCart(selectedItem, productIndex, count, Data?.supplyVariantId);
          } else {
            // setAddToCartLoader(false);
            alert('Wrong supply variant choosen.');
          }

          // crossHandler();
        }
      }
    }
  };

  const ColorItem = ({ item, onPress, backgroundColor, style }) => (
    <TouchableOpacity
      style={[
        styles.selectColorItem,
        {
          backgroundColor: item?.name,
          width: style ? ms(50) : ms(20),
          borderColor: style ? COLORS.light_purple : 'transparent',
          height: style ? ms(18) : ms(20),
        },
      ]}
      onPress={onPress}
    ></TouchableOpacity>
  );

  const SizeItem = ({ item, onPress, color, backgroundColor }) => (
    <TouchableOpacity
      style={[
        styles.SizeItem,
        {
          backgroundColor,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.sizeText, { color }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  const productDetailArray = [
    {
      id: 1,
      key: 'SKU',
      value: productDetail?.sku,
    },
    {
      id: 2,
      key: 'Barcode',
      value: productDetail?.barcode,
    },
    {
      id: 3,
      key: 'Unit Type',
      value: productDetail?.type,
    },
    {
      id: 4,
      key: 'Unit Weight',
      value: productDetail?.weight + ' ' + productDetail?.weight_unit,
    },
    {
      id: 5,
      key: 'Other Locations',
      value: 'NA',
    },
  ];
  const availblityArray = [
    {
      id: 1,
      image: Images.storeIcon,
      toggle: inStoreImage === 3 ? Images.toggleOn : Images.toggleOff,
      name: 'Store',
    },
    {
      id: 2,
      image: Images.delivery,
      toggle: deliveryOptionImage === '1' ? Images.toggleOn : Images.toggleOff,
      name: 'Delivery',
    },
    {
      id: 3,
      image: Images.shipping,
      toggle: shippingImage === '4' ? Images.toggleOn : Images.toggleOff,
      name: 'Shipping',
    },
  ];

  return (
    <SafeAreaView style={styles._innerContainer}>
      <CustomHeader />
      <View style={[styles.displayflex, { flex: 1 }]}>
        <View style={styles.leftCon}>
          <View style={{ marginTop: ms(5), flex: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => backHandler()}>
                <Image source={Images.arrowLeftUp} style={styles.leftIcon} />
              </TouchableOpacity>
              <View style={{ marginLeft: ms(7) }}>
                <Text style={styles.addNewProduct}>{'Add a new product'}</Text>
                <Text style={styles.configText}>{'Configure the product to add to cart'}</Text>
              </View>
            </View>
            <View style={styles.imagebackground}>
              <Image source={{ uri: productDetail?.image }} style={styles.productImage} />
              <View style={styles.roundScrollbackground}>
                <Image source={Images.aroundCircule} style={styles.aroundCircule} />
              </View>
            </View>
            <View style={{ alignItems: 'center', marginTop: ms(10) }}>
              <Text style={styles.productName} numberOfLines={2}>
                {productDetail?.name}
              </Text>
              <View style={styles.skuCon}>
                <View style={styles.dot} />
                <Text style={styles.skuText}>{productDetail?.sku}</Text>
              </View>
              {/* {productDetail?.supplies?.[0]?.supply_prices?.[0]?.offer_price &&
              productDetail?.supplies?.[0]?.supply_prices?.[0]?.actual_price ? (
                <Text style={styles.productName}>
                  {amountFormat(productDetail?.supplies?.[0]?.supply_prices?.[0]?.offer_price)}
                </Text>
              ) : (
                <Text style={styles.productName}>
                  {amountFormat(productDetail?.supplies?.[0]?.supply_prices?.[0]?.selling_price)}
                </Text>
              )} */}
              <Text style={styles.productName}>
                {amountFormat(productDetail?.supplies?.[0]?.supply_prices?.[0]?.selling_price)}
              </Text>
              {productDetail?.supplies?.[0]?.supply_prices?.[0]?.offer_applicable_qty && (
                <Text style={[styles.productName, { marginTop: ms(5) }]}>
                  Offer qty :{' '}
                  {productDetail?.supplies?.[0]?.supply_prices?.[0]?.offer_applicable_qty}(
                  {amountFormat(productDetail?.supplies?.[0]?.supply_prices?.[0]?.offer_price)})
                </Text>
              )}
            </View>
            {colorArray?.[0]?.values?.length > 0 && (
              <View style={{ marginTop: ms(5) }}>
                <Text style={[styles.productName, { fontSize: ms(10) }]}>{'Color'}</Text>
                <FlatList
                  data={colorArray?.[0]?.values}
                  extraData={colorArray?.[0]?.values}
                  horizontal
                  keyExtractor={(item, index) => index}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    const backgroundColor =
                      item.id === colorId ? COLORS.navy_blue : COLORS.navy_blue;
                    const style = item.id === colorId ? true : false;
                    return (
                      <ColorItem
                        item={item}
                        onPress={() => {
                          setColorId(colorId === item.id ? null : item.id);
                        }}
                        backgroundColor={backgroundColor}
                        style={style}
                      />
                    );
                  }}
                  contentContainerStyle={{
                    marginVertical: ms(6),
                    alignItems: 'center',
                  }}
                />
              </View>
            )}
            {sizeArray?.[0]?.values?.length > 0 && (
              <View style={{ marginTop: ms(7) }}>
                <Text style={[styles.productName, { fontSize: ms(10) }]}>{'Size'}</Text>
                <FlatList
                  data={sizeArray?.[0]?.values}
                  extraData={sizeArray?.[0]?.values}
                  horizontal
                  keyExtractor={(item, index) => index}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    const backgroundColor = item.id === sizeId ? COLORS.navy_blue : 'transparent';
                    const color = item.id === sizeId ? COLORS.white : COLORS.navy_blue;

                    return (
                      <SizeItem
                        item={item}
                        onPress={() => {
                          setSizeId(sizeId === item.id ? null : item.id);
                        }}
                        backgroundColor={backgroundColor}
                        color={color}
                      />
                    );
                  }}
                  contentContainerStyle={{
                    marginVertical: ms(6),
                    alignItems: 'center',
                  }}
                />
              </View>
            )}

            <View style={styles.counterCon}>
              <TouchableOpacity
                style={styles.bodycounter}
                onPress={() => setCount(count - 1)}
                disabled={count == 1}
              >
                <Image source={minus} style={styles.plusSign} />
              </TouchableOpacity>
              <View style={[styles.bodycounter, styles.bodycounterWidth]}>
                <Text style={[styles.productName, { fontSize: ms(10) }]}>{count}</Text>
              </View>
              <TouchableOpacity
                style={styles.bodycounter}
                onPress={() => {
                  if (restProductQty > count) {
                    setCount(count + 1);
                  } else {
                    alert('There are no more quantity left to add');
                  }
                }}
              >
                <Image source={plus} style={styles.plusSign} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.addButtonCon}
              onPress={addToCartHandler}
              disabled={isChecksSuppliesVariant ? true : false}
            >
              <Text style={[styles.productName, { fontSize: ms(10), color: COLORS.white }]}>
                {'Add item'}
              </Text>
              <Image
                source={Images.cartIcon}
                style={[styles.plusSign, { tintColor: COLORS.sky_blue, marginLeft: ms(4) }]}
              />
              {isChecksSuppliesVariant && (
                <View style={{ marginLeft: ms(10) }}>
                  <ActivityIndicator size="small" color={COLORS.sky_blue} />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.rightCon}>
          <View style={{ marginTop: ms(5), flex: 1 }}>
            <Text style={styles.addNewProduct}>{'Product details'}</Text>
            <View style={{ marginTop: ms(7) }}>
              {productDetailArray?.map((item, index) => (
                <View
                  style={[
                    styles.skuDetailcon,
                    {
                      backgroundColor: index % 2 === 0 ? COLORS.textInputBackground : 'transparent',
                    },
                  ]}
                  key={index}
                >
                  <Text style={[styles.skudetailText, { width: ms(70) }]}>{item.key}</Text>
                  <Text style={[styles.skudetailText, { marginLeft: ms(40) }]}>{item.value}</Text>
                </View>
              ))}
            </View>

            <View style={{ marginTop: ms(10), flex: 1 }}>
              {productDetail?.supplies?.[0]?.supply_variants?.length > 0 && (
                <>
                  <Text style={styles.addNewProduct}>{'Stock on hand'}</Text>
                  <View style={styles.stockOnHandCon}>
                    <FlatList
                      data={stockHandArray}
                      extraData={stockHandArray}
                      renderItem={({ item, index }) => {
                        const variant = JSON.parse(item?.attribute_variant?.variants);
                        const productSize = variant?.filter(
                          (item) => item.attribute_name === 'Size'
                        );
                        const productColor = variant?.filter(
                          (item) => item.attribute_name === 'Color'
                        );

                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              paddingHorizontal: ms(10),
                            }}
                          >
                            <View style={[styles.imageView, { borderColor: COLORS.light_purple }]}>
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
                                    color: item?.stock <= 10 ? COLORS.red : COLORS.navy_blue,
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
                              {/* <Text style={styles.detailColorSize}>Remind Admin</Text> */}
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      showsVerticalScrollIndicator={false}
                      ListHeaderComponent={() => (
                        <View style={[styles.displayflex, { width: ms(150), marginLeft: ms(70) }]}>
                          <Text style={[styles.jacketName, { fontSize: SF(14) }]}>Color/Size</Text>
                          <Text style={[styles.jacketName, { fontSize: SF(14) }]}>Stock</Text>
                        </View>
                      )}
                    />
                    {/* <View>
                  <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7]}
                    horizontal
                    keyExtractor={(item, index) => index}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={styles.stockProduct} key={index}>
                          <Image source={clothes} style={styles.productImage} />
                          <View style={styles.colorNameView}>
                            <Text style={styles.storeText}>{'Yellow'}</Text>
                          </View>
                        </View>
                      );
                    }}
                    contentContainerStyle={{
                      // flex: 1,
                      justifyContent: 'space-between',
                      marginTop: ms(10),
                    }}
                  />
                </View> */}

                    {/* <View style={styles.notifySection}>
                  <View style={styles.notifyBodyCon}>
                    <Text style={styles.storeText}>{'Sizes'}</Text>
                    <Text style={styles.storeText}>{'S'}</Text>
                    <Text style={styles.storeText}>{'M'}</Text>
                    <Text style={styles.storeText}>{'XL'}</Text>
                    <Text style={styles.storeText}>{'XXl'}</Text>
                  </View>
                  <View style={styles.notifyBodyCon}>
                    <Text style={styles.storeText}>{'Stock'}</Text>
                    <Text style={styles.storeText}>{'10'}</Text>
                    <Text style={styles.storeText}>{'3'}</Text>
                    <Text style={styles.storeText}>{'6'}</Text>
                    <Text style={styles.storeText}>{'8'}</Text>
                  </View>
                  <View style={styles.notifyBodyCon}>
                    <Text style={styles.storeText}>{'Notify'}</Text>
                    <Image source={Images.notify} style={styles.bellIcon} />
                    <Image source={Images.notify} style={styles.bellIcon} />
                    <Image source={Images.notify} style={styles.bellIcon} />
                    <Image source={Images.notify} style={styles.bellIcon} />
                  </View>
                </View> */}
                  </View>
                </>
              )}

              <View style={{ marginTop: ms(5) }}>
                <Text style={styles.addNewProduct}>{'Availability'}</Text>
                <FlatList
                  data={availblityArray}
                  horizontal
                  keyExtractor={(item, index) => index}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.avaiblityMainCon}>
                        <Image source={item.image} style={styles.storeIcon} />
                        <Image source={item.toggle} style={styles.toggleIcon} />
                        <Text style={styles.storeText}>{item.name}</Text>
                      </View>
                    );
                  }}
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'space-between',
                    marginTop: ms(7),
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  _innerContainer: {
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
  },
  imageView: {
    borderWidth: 1,
    borderRadius: 5,
    flex: 0.2,
    height: ms(28),
    marginVertical: verticalScale(3),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.light_purple,
  },
  scrollImage: {
    width: ms(30),
    height: ms(30),
    resizeMode: 'contain',
  },
  sizeSelectItemCon: {
    // width: ms(200),
    flex: 0.6,
    height: ms(28),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    marginHorizontal: ms(15),
  },
  displayflex: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // flex: 1,
  },
  leftCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.41,
    marginRight: ms(7),
    // padding: ms(20),
    paddingHorizontal: ms(20),
    paddingVertical: ms(7),
  },
  rightCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(12),
    flex: 0.58,
    marginRight: ms(7),
    paddingVertical: ms(7),
    paddingHorizontal: ms(20),
  },
  leftIcon: {
    width: ms(22),
    height: ms(22),
    resizeMode: 'contain',
    tintColor: COLORS.navy_blue,
  },
  addNewProduct: {
    fontSize: ms(12),
    color: COLORS.navy_blue,
    fontFamily: Fonts.SemiBold,
  },
  configText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
    marginTop: ms(4),
  },
  imagebackground: {
    width: ms(75),
    height: ms(75),
    borderRadius: ms(12),
    alignSelf: 'center',
    backgroundColor: COLORS.textInputBackground,
    marginTop: ms(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundScrollbackground: {
    width: ms(20),
    height: ms(20),
    backgroundColor: COLORS.white,
    borderRadius: ms(15),
    position: 'absolute',
    bottom: -10,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aroundCircule: {
    width: ms(12),
    height: ms(12),
    resizeMode: 'contain',
  },
  productImage: {
    width: ms(45),
    height: ms(45),
    resizeMode: 'contain',
  },
  productName: {
    fontSize: ms(12),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  skuCon: {
    borderWidth: 2,
    width: ms(110),
    borderColor: COLORS.textInputBackground,
    height: ms(22),
    marginVertical: ms(6),
    borderRadius: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: ms(6),
    height: ms(6),
    borderRadius: ms(100),
    backgroundColor: COLORS.base_gray_600,
  },
  skuText: {
    fontSize: ms(10),
    color: COLORS.base_gray_600,
    fontFamily: Fonts.Medium,
    marginLeft: ms(5),
  },
  selectColorItem: {
    width: ms(15),
    height: ms(15),
    borderRadius: ms(50),
    borderWidth: 5,
    marginRight: ms(10),
  },
  SizeItem: {
    width: ms(45),
    height: ms(25),
    borderRadius: ms(50),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ms(10),
  },
  sizeText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  counterCon: {
    borderWidth: 1,
    height: ms(25),
    borderRadius: ms(50),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    marginTop: ms(15),
    flexDirection: 'row',
  },
  bodycounter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodycounterWidth: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.light_purple,
  },
  plusSign: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  addButtonCon: {
    height: ms(30),
    borderRadius: ms(50),
    marginTop: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.navy_blue,
  },
  skuDetailcon: {
    height: ms(14),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: ms(10),
    paddingHorizontal: ms(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  skudetailText: {
    fontSize: ms(8),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Regular,
  },
  stockOnHandCon: {
    borderWidth: 1,
    borderRadius: ms(12),
    borderColor: COLORS.light_purple,
    flex: 1,
    marginTop: ms(10),
    paddingVertical: ms(6),
  },
  avaiblityMainCon: {
    borderWidth: 1,
    borderRadius: ms(8),
    borderColor: COLORS.light_purple,
    height: ms(25),
    maxWidth: ms(105),
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: ms(10),
  },
  storeIcon: {
    width: ms(14),
    height: ms(14),
    resizeMode: 'contain',
  },
  bellIcon: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
  },
  toggleIcon: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    marginHorizontal: ms(4),
  },
  storeText: {
    fontSize: ms(9),
    color: COLORS.navy_blue,
    fontFamily: Fonts.Medium,
  },
  stockProduct: {
    width: ms(60),
    height: ms(70),
    borderWidth: 3,
    borderRadius: ms(12),
    backgroundColor: COLORS.textInputBackground,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: ms(2),
    marginLeft: ms(10),
  },
  colorNameView: {
    height: ms(20),
    backgroundColor: COLORS.light_yellow,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: ms(57),
    // flexShrink: 1,
    borderWidth: 3,
    borderColor: COLORS.light_yellow,
    borderBottomEndRadius: ms(12),
    borderBottomLeftRadius: ms(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifySection: {
    borderWidth: 1,
    height: ms(100),
    width: ms(120),
    borderRadius: ms(12),
    margin: ms(10),
    borderColor: COLORS.light_purple,
    flexDirection: 'row',
  },
  notifyBodyCon: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: ms(5),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  detailColorSize: {
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
    color: COLORS.navy_blue,
  },
  bell: {
    width: SW(7),
    height: SW(7),
    resizeMode: 'contain',
    marginHorizontal: moderateScale(4),
  },
  jacketName: {
    color: COLORS.navy_blue,
    fontSize: SH(18),
    fontFamily: Fonts.Medium,
  },
  adminItemCon: {
    // width: ms(140),
    flex: 0.2,
    height: ms(28),
    borderWidth: 1,
    borderColor: COLORS.light_purple,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(3),
    marginHorizontal: ms(5),
  },
});
