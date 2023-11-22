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
  ActivityIndicator,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import { Images } from '@mPOS/assets';
import { FullScreenLoader, ImageView, Spacer } from '@mPOS/components';
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
import {
  addTocart,
  checkSuppliedVariant,
  getOneProduct,
  getOneService,
} from '@/actions/RetailAction';
import { clothes } from '@/assets';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';

const AvailableOffer = ({ availableOfferRef, serviceCartOpen, productCartOpen }) => {
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const getAuth = useSelector(getAuthData);
  const presentCart = retailData?.cartFrom;
  console.log('presentCart', presentCart);
  const productDetail = retailData?.getOneProduct;
  const addServiceCartRef = useRef(null);
  const availableOfferArray = retailData?.availableOffer?.data;
  const attributeArray = productDetail?.product_detail?.supplies?.[0]?.attributes;

  const sizeArray = attributeArray?.filter((item) => item.name === 'Size');
  const colorArray = attributeArray?.filter((item) => item.name === 'Color');

  const [colorSelectId, setColorSelectId] = useState(null);
  const [sizeSelectId, setSizeSelectId] = useState(null);
  const [count, setCount] = useState(1);
  const [productDetailExpand, setProductDetailExpand] = useState(false);
  const snapPoints = useMemo(() => ['90%', '95%'], []);
  const [colorName, setColorName] = useState();
  const [sizeName, setSizeName] = useState();
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  useEffect(() => {
    setColorSelectId(null);
    setSizeSelectId(null);
  }, []);
  const productLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_AVAILABLE_OFFER, TYPES.GET_ONE_SERVICE], state)
  );

  return (
    <BottomSheetModal
      backdropComponent={CustomBackdrop}
      detached
      bottomInset={0}
      onDismiss={() => {
        setColorSelectId(null);
        setSizeSelectId(null);
      }}
      backdropOpacity={0.5}
      ref={availableOfferRef}
      style={[styles.bottomSheetBox]}
      snapPoints={snapPoints}
      enableDismissOnClose
      enablePanDownToClose
      stackBehavior={'replace'}
      handleComponent={() => <View />}
    >
      <View style={{ flex: 1, backgroundColor: COLORS.textInputBackground }}>
        <View style={styles.productHeaderCon}>
          <TouchableOpacity onPress={() => availableOfferRef.current.dismiss()}>
            <Image source={Images.cross} style={styles.crossImageStyle} />
          </TouchableOpacity>
          <Text style={styles.availableOfferText}>{'Available offers'}</Text>
        </View>
        <View style={[styles.productCartBody]}>
          <FlatList
            data={availableOfferArray || []}
            extraData={availableOfferArray || []}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={async () => {
                  const res =
                    (await presentCart) === 'product'
                      ? dispatch(getOneProduct(sellerID, item.id))
                      : dispatch(getOneService(sellerID, item.id));
                  if (
                    (res?.type === presentCart) === 'product'
                      ? 'GET_ONE_PRODUCT_SUCCESS'
                      : 'GET_ONE_SERVICE_SUCCESS'
                  ) {
                    presentCart === 'product' ? productCartOpen() : serviceCartOpen();
                  }
                }}
                style={[styles.productDetailMainView, { marginTop: index === 0 ? ms(0) : ms(5) }]}
              >
                <View style={styles.imageDetailView}>
                  <ImageView
                    imageUrl={item?.image}
                    style={styles.productImageStyle}
                    imageStyle={{ borderRadius: ms(5) }}
                  />
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Text style={styles.productNameText} numberOfLines={1}>
                      {item?.name}
                    </Text>
                    {/* <Text style={styles.genderTextStyle} numberOfLines={1}>
                        {'item?.category?.name'}
                      </Text> */}
                    {item?.supplies?.[0]?.supply_prices?.[0]?.actual_price &&
                    item?.supplies?.[0]?.supply_prices?.[0]?.offer_price ? (
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.actualPrice} numberOfLines={1}>
                          ${item?.supplies?.[0]?.supply_prices?.[0]?.actual_price}
                        </Text>
                        <Text style={styles.priceTextStyle} numberOfLines={1}>
                          ${item?.supplies?.[0]?.supply_prices?.[0]?.offer_price}
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.priceTextStyle} numberOfLines={1}>
                        <Text style={styles.offerPriceDark}>
                          ${item?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <TouchableOpacity style={[styles.addView]}>
                  <Image source={Images.addTitle} resizeMode="contain" style={[styles.addImage]} />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: ms(50),
            }}
            ListEmptyComponent={() => (
              <View style={styles.noProductCon}>
                <Text style={styles.noProduct}>{strings.retail.noProduct}</Text>
              </View>
            )}
            ListFooterComponent={() => (
              <View>
                {/* {productLoad && <ActivityIndicator size="large" color={COLORS.darkBlue} />} */}
              </View>
            )}
          />
        </View>
        {productLoad ? <FullScreenLoader /> : null}
        {/* <FullScreenLoader /> */}
      </View>
    </BottomSheetModal>
  );
};

export default AvailableOffer;

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

  productCartBody: {
    flex: 1,
    // paddingHorizontal: ms(10),
    paddingVertical: ms(10),
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

  productDetails: {
    color: COLORS.dark_grey,
    fontSize: ms(14),
    fontFamily: Fonts.SemiBold,
  },

  crossImageStyle: {
    width: ms(26),
    height: ms(26),
    resizeMode: 'contain',
  },
  bottomSheetBox: {
    overflow: 'hidden',
  },
  productDetailMainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  imageDetailView: {
    flex: 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: ms(10),
    // justifyContent: "center",
  },
  productImageStyle: {
    width: ms(48),
    height: ms(48),
    borderRadius: 5,
    resizeMode: 'contain',
  },
  productNameText: {
    fontFamily: Fonts.Medium,
    fontSize: ms(14),
    color: COLORS.black,
  },
  genderTextStyle: {
    fontFamily: Fonts.Regular,
    fontSize: ms(11),
    color: COLORS.dark_grey,
    paddingTop: 2,
  },
  priceTextStyle: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(13),
    color: COLORS.solid_grey,
  },
  actualPrice: {
    fontFamily: Fonts.Regular,
    fontSize: ms(13),
    color: COLORS.darkGray,
    textDecorationLine: 'line-through',
    marginRight: ms(3),
  },
  addView: {
    padding: ms(4),
    borderWidth: 1,
    borderRadius: ms(5),
    borderColor: COLORS.textInputBackground,
  },
  addImage: {
    height: ms(30),
    width: ms(30),
  },
  noProductCon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProduct: {
    fontSize: ms(17),
    color: COLORS.red,
    fontFamily: Fonts.MaisonRegular,
    marginTop: ms(50),
  },
  availableOfferText: {
    fontSize: ms(14),
    color: COLORS.darkGray,
    fontFamily: Fonts.Medium,
  },
});
