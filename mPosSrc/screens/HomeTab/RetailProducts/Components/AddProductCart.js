import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { Spacer } from '@mPOS/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { strings } from '@mPOS/localization';
import { ms } from 'react-native-size-matters';
import { Colors } from '@mPOS/constants/enums';
import ProductDetails from './ProductDetails';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { addProductCart } from '@mPOS/actions/RetailActions';
import { CustomErrorToast } from '@mPOS/components/Toast';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';
import { getAuthData } from '@/selectors/AuthSelector';
import { addTocart, checkSuppliedVariant } from '@/actions/RetailAction';

const AddProductCart = ({
  addProductCartRef,
  productDetailHanlder,
  onClickAddCartModal,
  selectedItem,
  productIndex,
  cartQty,
  addToLocalCart,
  productItem,
}) => {
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const productDetail = retailData?.getOneProduct;
  const attributeArray = productDetail?.product_detail?.supplies?.[0]?.attributes;

  const sizeArray = attributeArray?.filter((item) => item.name === 'Size');
  const colorArray = attributeArray?.filter((item) => item.name === 'Color');

  const [colorSelectId, setColorSelectId] = useState(null);
  const [sizeSelectId, setSizeSelectId] = useState(null);
  const [count, setCount] = useState(cartQty == 0 || cartQty == undefined ? 1 : cartQty);
  const [productDetailExpand, setProductDetailExpand] = useState(false);
  const snapPoints = useMemo(() => ['90%'], []);
  const [colorName, setColorName] = useState();
  const [sizeName, setSizeName] = useState();
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  useEffect(() => {
    setColorSelectId(null);
    setSizeSelectId(null);
  }, []);

  const addToCartHandler = async () => {
    if (attributeArray?.length === 0) {
      retailData?.addOpenFrom == 'main' && onClickAddCartModal(selectedItem, productIndex, count);
      const data = {
        seller_id: sellerID,
        service_id: productDetail?.product_detail?.service_id,
        product_id: productDetail?.product_detail?.id,
        qty: count,
        supplyId: productDetail?.product_detail?.supplies?.[0]?.id,
        supplyPriceID: productDetail?.product_detail?.supplies?.[0]?.supply_prices[0]?.id,
      };
      retailData?.addOpenFrom == 'main' && addToLocalCart(productItem, productIndex, count);
      dispatch(addTocart(data));
      addProductCartRef.current.dismiss();
    } else {
      if (colorArray?.length >= 1 && colorSelectId === null) {
        CustomErrorToast({ message: 'Please select the color' });
      } else if (sizeArray?.length >= 1 && sizeSelectId === null) {
        CustomErrorToast({ message: 'Please select the Size' });
      } else {
        const attrIds = [
          {
            order: attributeArray.findIndex((attr) => attr?.name?.toLowerCase() === 'size'),
            id: sizeSelectId,
          },
          {
            order: attributeArray.findIndex((attr) => attr?.name?.toLowerCase() === 'color'),
            id: colorSelectId,
          },
        ];

        const data = {
          colorAndSizeId: attrIds
            .sort((a, b) => a.order - b.order)
            .filter((ele) => ele.order != -1)
            .map((el) => el.id)
            .join(),
          supplyId: productDetail?.product_detail?.supplies?.[0]?.id,
        };
        retailData?.addOpenFrom == 'main' && onClickAddCartModal(selectedItem, productIndex, count);
        const res = await dispatch(checkSuppliedVariant(data));
        if (res?.type === 'CHECK_SUPPLIES_VARIANT_SUCCESS') {
          const data = {
            seller_id: sellerID,
            service_id: productDetail?.product_detail?.service_id,
            product_id: productDetail?.product_detail?.id,
            qty: count,
            supplyId: productDetail?.product_detail?.supplies?.[0]?.id,
            supplyPriceID: productDetail?.product_detail?.supplies?.[0]?.supply_prices[0]?.id,
            supplyVariantId: res?.payload?.id,
          };
          dispatch(addTocart(data));
          addProductCartRef.current.dismiss();
          retailData?.addOpenFrom == 'main' &&
            addToLocalCart(selectedItem, productIndex, count, data?.supplyVariantId);
        }
      }
    }
  };

  // Color Select section
  const renderColorItem = ({ item }) => {
    const borderColor = item.id === colorSelectId ? COLORS.primary : COLORS.silver_solid;
    const color = item.id === colorSelectId ? COLORS.primary : COLORS.black;
    return (
      <ColorItem
        item={item}
        onPress={() => {
          setColorSelectId(colorSelectId === item.id ? null : item.id);
          setColorName(item.name);
        }}
        borderColor={borderColor}
        textColor={color}
      />
    );
  };
  const ColorItem = ({ item, onPress, borderColor, textColor }) => (
    <TouchableOpacity style={[styles.colorNameView, { borderColor }]} onPress={onPress}>
      <Text style={[styles.colorText, { color: textColor }]}>{item?.name}</Text>
    </TouchableOpacity>
  );

  //Size Select section
  const renderSizeItem = ({ item }) => {
    const borderColor = item.id === sizeSelectId ? COLORS.primary : COLORS.silver_solid;
    const color = item.id === sizeSelectId ? COLORS.primary : COLORS.black;
    return (
      <SizeItem
        item={item}
        onPress={() => {
          setSizeSelectId(sizeSelectId === item.id ? null : item.id);
          setSizeName(item.name);
        }}
        borderColor={borderColor}
        textColor={color}
      />
    );
  };
  const SizeItem = ({ item, onPress, borderColor, textColor }) => (
    <TouchableOpacity style={[styles.colorNameView, { borderColor }]} onPress={onPress}>
      <Text style={[styles.colorText, { color: textColor }]}>{item?.name}</Text>
    </TouchableOpacity>
  );

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {
        setColorSelectId(null);
        setSizeSelectId(null);
        setCount(1);
      }}
      backdropOpacity={0.5}
      ref={addProductCartRef}
      style={[styles.bottomSheetBox]}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.productHeaderCon}>
          <TouchableOpacity onPress={() => addProductCartRef.current.dismiss()}>
            <Image source={Images.cross} style={styles.crossImageStyle} />
          </TouchableOpacity>
          <View style={styles.detailAndAddBtnCon}>
            <TouchableOpacity onPress={productDetailHanlder} style={styles.detailView}>
              <Text style={styles.detailText}>{strings.retail.detail}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() =>
              //   navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.cart })
              // }
              onPress={addToCartHandler}
              style={[styles.detailView, styles.cartView]}
            >
              <Text style={styles.cartText}>{strings.retail.addCart}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productCartBody}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.flexDirectionRow}>
              <Text style={styles.headerText}>{productDetail?.product_detail?.name}</Text>
              {/* <Text style={styles.headerText}>
                {productDetail?.product_detail?.category?.name}
              </Text> */}
              {productDetail?.product_detail?.supplies?.[0]?.supply_prices?.[0]?.offer_price &&
              productDetail?.product_detail?.supplies?.[0]?.supply_prices?.[0]?.actual_price ? (
                <Text style={styles.amount}>
                  ${productDetail?.product_detail?.supplies?.[0]?.supply_prices?.[0]?.offer_price}
                </Text>
              ) : (
                <Text style={styles.amount}>
                  ${productDetail?.product_detail?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                </Text>
              )}
            </View>
            <Spacer space={ms(2)} />
            {colorSelectId === null ? (
              <Text>{null}</Text>
            ) : (
              <Text style={styles.selectColorSize}>{`Color: ${colorName}`}</Text>
            )}

            <Spacer space={ms(2)} />
            {sizeSelectId === null ? (
              <Text>{null}</Text>
            ) : (
              <Text style={styles.selectColorSize}>{`Size: ${sizeName}`}</Text>
            )}

            {colorArray?.[0]?.values?.length >= 1 ? (
              <>
                <Spacer space={ms(10)} />
                <View style={styles.sepratorView}>
                  <View style={styles.lineSeprator} />
                  <Text style={styles.sepratorText}>{'COLORS'}</Text>
                  <View style={styles.lineSeprator} />
                </View>
              </>
            ) : null}

            <FlatList
              data={colorArray?.[0]?.values}
              extraData={colorArray?.[0]?.values}
              renderItem={renderColorItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              numColumns={4}
              contentContainerStyle={{
                paddingVertical: ms(10),
              }}
            />
            {sizeArray?.[0]?.values?.length >= 1 ? (
              <>
                <Spacer space={ms(5)} />
                <View style={styles.sepratorView}>
                  <View style={styles.lineSeprator} />
                  <Text style={styles.sepratorText}>{'Size'}</Text>
                  <View style={styles.lineSeprator} />
                </View>
              </>
            ) : null}

            <FlatList
              data={sizeArray?.[0]?.values}
              extraData={sizeArray?.[0]?.values}
              renderItem={renderSizeItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              numColumns={4}
              contentContainerStyle={{
                paddingVertical: ms(10),
              }}
            />
            <Spacer space={ms(15)} />
            <View style={styles.counterCon}>
              <TouchableOpacity
                style={styles.plusSignCon}
                onPress={() => setCount(count - 1)}
                disabled={count == 1 ? true : false}
              >
                <Image source={Images.minus} style={styles.minusImage} />
              </TouchableOpacity>

              <View style={styles.countCon}>
                <Text style={styles.countText}>{count}</Text>
              </View>
              <TouchableOpacity style={styles.plusSignCon} onPress={() => setCount(count + 1)}>
                <Image source={Images.plus} style={styles.minusImage} />
              </TouchableOpacity>
            </View>
            <Spacer space={ms(15)} />
            <View style={styles.productDetailCon}>
              <View style={styles.productDetailBody}>
                <TouchableOpacity
                  onPress={() => setProductDetailExpand(!productDetailExpand)}
                  style={styles.detailTouchArea}
                >
                  <Text style={styles.productDetails}>{strings.retail.productDetails}</Text>
                  <Image
                    source={Images.darkDropdownIcon}
                    style={
                      productDetailExpand ? styles.expandDropdownIcon : styles.darkDropdownIcon
                    }
                  />
                </TouchableOpacity>
              </View>
              {productDetailExpand ? (
                <View style={{ marginTop: ms(5) }}>
                  <View style={styles.productDetailChild}>
                    <Text style={styles.detailKey}>{'Sleeve Length'}</Text>
                    <Text style={styles.detailName}>{'Long Sleeves'}</Text>
                  </View>
                  <View style={styles.productDetailChild}>
                    <Text style={styles.detailKey}>{'Sleeve Length'}</Text>
                    <Text style={styles.detailName}>{'Long Sleeves'}</Text>
                  </View>
                </View>
              ) : null}
            </View>
            <Spacer space={ms(15)} />
            <View style={styles.productDetailCon}>
              <View style={styles.productDetailBody}>
                <TouchableOpacity style={styles.detailTouchArea}>
                  <Text style={styles.productDetails}>{strings.retail.materialSupply}</Text>
                  <Image source={Images.darkDropdownIcon} style={styles.darkDropdownIcon} />
                </TouchableOpacity>
              </View>
            </View>
            <Spacer space={ms(15)} />
            <View style={styles.productDetailCon}>
              <View style={styles.productDetailBody}>
                <TouchableOpacity style={styles.detailTouchArea}>
                  <Text style={styles.productDetails}>{strings.retail.careGuide}</Text>
                  <Image source={Images.darkDropdownIcon} style={styles.darkDropdownIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default AddProductCart;

const styles = StyleSheet.create({
  productHeaderCon: {
    borderBottomWidth: 1,
    height: ms(60),
    borderColor: COLORS.solidGrey,
    paddingHorizontal: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailAndAddBtnCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCartBody: {
    flex: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
  },
  colorText: {
    fontSize: ms(12),
    fontFamily: Fonts.Regular,
  },
  colorNameView: {
    borderWidth: 1,
    width: ms(78),
    height: ms(35),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: ms(5),
    marginTop: ms(5),
    marginHorizontal: ms(4),
  },
  counterCon: {
    borderWidth: 1,
    height: ms(45),
    borderRadius: ms(3),
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rbSheetContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  detailView: {
    borderWidth: 1,
    width: ms(90),
    height: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(3),
    borderColor: COLORS.primary,
  },
  cartView: {
    backgroundColor: COLORS.primary,
    marginLeft: ms(10),
    borderWidth: 0,
  },
  cartText: {
    color: COLORS.white,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
  },
  detailText: {
    color: COLORS.primary,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: ms(16),
    color: COLORS.black,
    fontFamily: Fonts.Bold,
    width: ms(290),
  },
  amount: {
    fontSize: ms(16),
    color: COLORS.black,
    fontFamily: Fonts.Bold,
  },
  sepratorView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sepratorText: {
    marginHorizontal: ms(10),
    color: COLORS.solidGrey,
    fontSize: ms(14),
    fontFamily: Fonts.Regular,
  },
  lineSeprator: {
    height: ms(1),
    backgroundColor: COLORS.solidGrey,
    flex: 1,
  },
  minusImage: {
    height: ms(18),
    width: ms(18),
    resizeMode: 'contain',
  },

  countText: {
    color: COLORS.black,
    fontSize: ms(17),
    fontFamily: Fonts.Medium,
  },
  countCon: {
    borderStartWidth: 1,
    borderEndWidth: 1,
    flex: 0.4,
    height: ms(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.solidGrey,
  },
  plusSignCon: {
    height: ms(45),
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDetailCon: {
    borderWidth: 1,
    minHeight: ms(38),
    borderRadius: ms(3),
    borderColor: COLORS.solidGrey,
    paddingVertical: ms(5),
  },
  productDetailBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(3),
    marginHorizontal: ms(10),
  },
  productDetails: {
    color: COLORS.dark_grey,
    fontSize: ms(14),
    fontFamily: Fonts.SemiBold,
  },
  darkDropdownIcon: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
  },
  expandDropdownIcon: {
    width: ms(20),
    height: ms(20),
    resizeMode: 'contain',
    transform: [{ rotate: '180deg' }],
    tintColor: COLORS.primary,
  },
  detailKey: {
    color: COLORS.darkGray,
    fontSize: ms(12),
    fontFamily: Fonts.Regular,
  },
  detailName: {
    color: COLORS.black,
    fontSize: ms(12),
    fontFamily: Fonts.Medium,
  },
  productDetailChild: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: ms(5),
    marginHorizontal: ms(20),
  },
  detailTouchArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  crossImageStyle: {
    width: ms(26),
    height: ms(26),
    resizeMode: 'contain',
  },
  bottomSheetBox: {
    overflow: 'hidden',
  },
  selectColorSize: {
    color: COLORS.dark_grey,
    fontSize: ms(12),
    fontFamily: Fonts.Medium,
  },
});
