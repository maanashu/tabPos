import React, { useMemo, useRef, useState } from 'react';
import { Images } from '@mPOS/assets';
import { ImageView, Spacer } from '@mPOS/components';
import { COLORS, Fonts } from '@/theme';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ms } from 'react-native-size-matters';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { strings } from '@mPOS/localization';
import { getRetail } from '@/selectors/RetailSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { addProductCart } from '@mPOS/actions/RetailActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { addTocart } from '@/actions/RetailAction';
import CustomBackdrop from '@mPOS/components/CustomBackdrop';
import { useEffect } from 'react';

const ProductDetails = ({ productDetailRef, bothSheetClose, productQuantity }) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const productDetail = getRetailData?.getOneProduct?.product_detail;
  const snapPoints = useMemo(() => ['100%'], []);

  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const Quantity = productQuantity;
  const [count, setCount] = useState(1);
  const withoutHtmlTags = productDetail?.description?.replace(/<\/?[^>]+(>|$)|&nbsp;/g, '');
  useEffect(() => {
    // Update the count state when productQuantity changes
    setCount(productQuantity);
  }, [productQuantity]);
  // Remove special characters and white spaces
  const withoutSpecialCharsAndSpaces = withoutHtmlTags?.trim().replace(/[^\w\s]/gi, '');
  let deliveryOption =
    getRetailData?.getOneProduct?.product_detail?.supplies?.[0]?.delivery_options?.split(',');
  let deliveryOptionImage = deliveryOption?.find((item) => {
    return item == '1';
  });
  let inStoreImage = deliveryOption?.find((item) => {
    return item == '3';
  });
  let shippingImage = deliveryOption?.find((item) => {
    return item == '4';
  });
  const productAddCartHandler = () => {
    const data = {
      seller_id: sellerID,
      service_id: getRetailData?.getOneProduct?.product_detail?.service_id,
      product_id: getRetailData?.getOneProduct?.product_detail?.id,
      qty: count,
      supplyId: getRetailData?.getOneProduct?.product_detail?.supplies?.[0]?.id,
      supplyPriceID:
        getRetailData?.getOneProduct?.product_detail?.supplies?.[0]?.supply_prices[0]?.id,
    };
    dispatch(addTocart(data));
    bothSheetClose();
  };

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {}}
      backdropOpacity={0.5}
      ref={productDetailRef}
      style={[styles.bottomSheetBox]}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <View style={{ flex: 1 }}>
        {Platform.OS === 'ios' && <SafeAreaView />}
        <View style={styles.productHeaderCon}>
          <TouchableOpacity onPress={() => productDetailRef.current.dismiss()}>
            {/* <Image source={Images.cross} style={styles.crossImageStyle} /> */}
          </TouchableOpacity>
          <View style={styles.detailAndAddBtnCon}>
            <TouchableOpacity
              onPress={() => productDetailRef.current.dismiss()}
              style={styles.backView}
            >
              <Text style={[styles.detailText, styles.backText]}>{strings.retail.back}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              // onPress={() =>
              //   navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.cart })
              // }
              onPress={productAddCartHandler}
              style={[styles.detailView, styles.cartView]}
            >
              <Text style={styles.cartText}>{strings.retail.addCart}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productCartBody}>
          <BottomSheetScrollView>
            <View style={styles.ImageView}>
              <ImageView
                imageUrl={productDetail?.image}
                style={styles.detailImage}
                imageStyle={{ borderRadius: ms(5) }}
              />
              <View style={{ marginLeft: ms(10) }}>
                <Text style={[styles.detailHeaderText, { width: ms(270) }]}>
                  {productDetail?.name}
                </Text>
                <Text style={[styles.categoryText, { width: ms(270) }]}>
                  {productDetail?.category?.name} {'>'} {productDetail?.sub_category?.name}
                </Text>
                <Text style={styles.detailDescription}>{withoutSpecialCharsAndSpaces}</Text>
              </View>
            </View>
            <View style={styles.priceView}>
              <Text style={styles.priceText}>{'Price'}</Text>
              <Text style={styles.amountText}>
                ${productDetail?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
              </Text>
            </View>
            <Spacer space={ms(10)} />
            <View style={styles.tableContainer}>
              <View style={styles.tableView}>
                <Text style={styles.tableSectionText}>{'SKU'}</Text>
                <Text style={styles.tableSectionData}>{productDetail?.sku || 'NA'}</Text>
              </View>
              <View style={styles.lineSeprator} />

              <View style={styles.tableView}>
                <Text style={styles.tableSectionText}>{'Barcode'}</Text>
                <Text style={styles.tableSectionData}>{productDetail?.barcode}</Text>
              </View>
              <View style={styles.lineSeprator} />

              <View style={styles.tableView}>
                <Text style={styles.tableSectionText}>{'Unit Type'}</Text>
                <Text style={[styles.tableSectionData, { textTransform: 'capitalize' }]}>
                  {productDetail?.type}
                </Text>
              </View>
              <View style={styles.lineSeprator} />

              <View style={styles.tableView}>
                <Text style={styles.tableSectionText}>{'Unit Weight'}</Text>
                <Text style={styles.tableSectionData}>
                  {' '}
                  {productDetail?.weight + ' ' + productDetail?.weight_unit}
                </Text>
              </View>
              <View style={styles.lineSeprator} />

              <View style={styles.tableView}>
                <Text style={styles.tableSectionText}>{'Other locations'}</Text>
                <Text style={styles.tableSectionData}>{'NA'}</Text>
              </View>
            </View>

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
            {/* 
            <Text style={styles.stockText}>{"Stock on Hand"}</Text>
            <View style={styles.lineSeprator} />

            <Spacer space={ms(15)} />
            <View style={styles.lineSeprator} />
            <Spacer space={ms(10)} />
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.reOrderText}>{"Reorder Point"}</Text>
              <Text>{"10"}</Text>
            </View> */}
            <Text style={styles.availableForSell}>{strings.retail.availableForSell}</Text>
            <View style={styles.toggleView}>
              <Text style={styles.inStoreText}>{strings.retail.inStore}</Text>
              <Image
                source={inStoreImage == '3' ? Images.onToggle : Images.offToggle}
                style={styles.toggleImage}
              />
            </View>
            <View style={styles.toggleView}>
              <Text style={styles.inStoreText}>{strings.retail.onlineDelivery}</Text>
              <Image
                source={deliveryOptionImage == '1' ? Images.onToggle : Images.offToggle}
                style={styles.toggleImage}
              />
            </View>
            <View style={styles.toggleView}>
              <Text style={styles.inStoreText}>{strings.retail.onlineShipping}</Text>
              <Image
                source={shippingImage == '4' ? Images.onToggle : Images.offToggle}
                style={styles.toggleImage}
              />
            </View>
          </BottomSheetScrollView>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  bottomSheetBox: {
    overflow: 'hidden',
  },
  productHeaderCon: {
    borderBottomWidth: 1,
    height: ms(60),
    borderColor: COLORS.solidGrey,
    paddingHorizontal: ms(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  crossImageStyle: {
    width: ms(26),
    height: ms(26),
    resizeMode: 'contain',
  },
  detailAndAddBtnCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailView: {
    borderWidth: 1,
    width: ms(90),
    height: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(3),
    borderColor: COLORS.darkBlue,
  },
  cartView: {
    backgroundColor: COLORS.primary,
    marginLeft: ms(10),
    borderWidth: 0,
  },
  backView: {
    width: ms(90),
    height: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(3),
    backgroundColor: COLORS.inputBorder,
  },
  cartText: {
    color: COLORS.white,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
  },
  detailText: {
    color: COLORS.darkBlue,
    fontSize: ms(11),
    fontFamily: Fonts.SemiBold,
  },
  backText: {
    color: COLORS.dark_grey,
  },
  productCartBody: {
    flex: 1,
    paddingHorizontal: ms(10),
    paddingVertical: ms(10),
  },
  priceView: {
    backgroundColor: COLORS.washGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: ms(10),
    borderRadius: ms(5),
    paddingHorizontal: ms(10),
  },
  priceText: {
    color: COLORS.solid_grey,
    fontSize: ms(13),
    fontFamily: Fonts.Medium,
  },
  amountText: {
    color: COLORS.black,
    fontSize: ms(15),
    fontFamily: Fonts.SemiBold,
  },
  tableContainer: {
    borderWidth: 1,
    borderRadius: ms(5),
    borderColor: COLORS.solidGrey,
    paddingVertical: ms(5),
    paddingHorizontal: ms(10),
  },
  tableView: {
    flexDirection: 'row',
    marginVertical: ms(5),
  },
  tableSectionText: {
    flex: 1,
    color: COLORS.solid_grey,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
  tableSectionData: {
    color: COLORS.solid_grey,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
  lineSeprator: {
    height: ms(1),
    backgroundColor: COLORS.solidGrey,
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
  plusSignCon: {
    height: ms(45),
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minusImage: {
    height: ms(18),
    width: ms(18),
    resizeMode: 'contain',
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
  countText: {
    color: COLORS.black,
    fontSize: ms(17),
    fontFamily: Fonts.Medium,
  },
  stockText: {
    fontSize: ms(15),
    color: COLORS.black,
    fontFamily: Fonts.SemiBold,
    marginVertical: ms(10),
  },
  reOrderText: {
    flex: 1,
    paddingHorizontal: ms(10),
    fontFamily: Fonts.Italic,
  },
  toggleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: ms(12),
    borderColor: COLORS.solidGrey,
    borderRadius: ms(5),
    height: ms(35),
    marginVertical: ms(6),
  },
  toggleImage: {
    height: ms(20),
    width: ms(20),
    resizeMode: 'contain',
  },
  inStoreText: {
    fontSize: ms(13),
    color: COLORS.solid_grey,
    fontFamily: Fonts.MaisonRegular,
  },
  availableForSell: {
    fontSize: ms(13),
    color: COLORS.solid_grey,
    fontFamily: Fonts.Regular,
  },
  ImageView: {
    marginBottom: ms(20),
    flexDirection: 'row',
  },
  detailImage: {
    height: ms(80),
    width: ms(60),
    resizeMode: 'contain',
  },
  detailHeaderText: {
    flex: 1,
    fontSize: ms(14),
    fontFamily: Fonts.Bold,
    color: COLORS.black,
  },
  categoryText: {
    fontSize: ms(12),
    color: COLORS.dark_grey,
    fontFamily: Fonts.Regular,
  },
  detailDescription: {
    fontSize: ms(11),
    color: COLORS.dark_grey,
    marginTop: ms(2),
    fontFamily: Fonts.Regular,
  },
});
