import React, { memo, useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail2/PosRetail2.styles';
import {
  addDiscountPic,
  addToCart,
  borderCross,
  bucket,
  categoryMenu,
  checkArrow,
  clothes,
  email,
  holdCart,
  keyboard,
  location,
  minus,
  notess,
  ok,
  Phone_light,
  plus,
  rightBack,
  search_light,
  sideArrow,
  sideEarser,
  sideKeyboard,
  terryProfile,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { CategoryModal } from './CategoryModal';
import { SubCatModal } from './SubCatModal';
import { BrandModal } from './BrandModal';
import { catTypeData } from '@/constants/flatListData';
import { CustomHeader } from './CustomHeader';
import { AddCartModal } from './AddCartModal';
import { AddCartDetailModal } from './AddCartDetailModal';
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES } from '@/Types/Types';
import {
  addTocart,
  cartScreenTrue,
  clearAllCart,
  clearOneCart,
  customerNumber,
  customerTrue,
  getAllCart,
  getBrand,
  getCategory,
  getMainProduct,
  getOneProduct,
  getProduct,
  getProductDefault,
  getSubCategory,
  getUserDetail,
  getUserDetailSuccess,
  sendInvitation,
} from '@/actions/RetailAction';
import { getRetail } from '@/selectors/RetailSelectors';
import { useIsFocused } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { emailReg } from '@/utils/validators';
import { cond, log } from 'react-native-reanimated';
import { CartListModal } from './CartListModal';

export function MainScreen({
  cartScreenHandler,
  checkOutHandler,
  headercrossHandler,
  categoryArray,
  sellerID,
  addNotesHandler,
  addDiscountHandler,
  onPressPayNow,
}) {
  const [selectedId, setSelectedId] = useState();
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [catTypeId, setCatTypeId] = useState();
  const [addCartModal, setAddCartModal] = useState(false);
  const [addCartDetailModal, setAddCartDetailModal] = useState(false);

  const getRetailData = useSelector(getRetail);
  const products = getRetailData?.products;
  const cartData = getRetailData?.getAllCart;
  // console.log('cartData', JSON.stringify(cartData));
  const cartLength = cartData?.poscart_products?.length;
  console.log('cartLength', cartLength);
  const productArray = getRetailData?.getMainProduct;
  // console.log('productArray', JSON.stringify(productArray));
  let arr = [getRetailData?.getAllCart];
  const [cartModal, setCartModal] = useState(false);

  const matchId = cartData?.poscart_products?.filter(item => item?.product_id);

  const [customerPhoneNo, setCustomerPhoneNo] = useState();

  const [showProductsFrom, setshowProductsFrom] = useState();

  const filterMenuData = JSON.parse(JSON.stringify(catTypeData));

  const [filterMenuTitle, setfilterMenuTitle] = useState(filterMenuData);

  const [isFilterDataSeclectedOfIndex, setisFilterDataSeclectedOfIndex] =
    useState();

  const [selectedCatID, setselectedCatID] = useState(null);
  const [selectedSubCatID, setselectedSubCatID] = useState(null);
  const [selectedBrandID, setselectedBrandID] = useState(null);
  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAdd, setUserAdd] = useState('');

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  useEffect(() => {
    if (selectedCatID) {
      setselectedCatID(selectedCatID);
    }
  }, [selectedCatID]);
  useEffect(() => {
    if (cartLength === 0 || cartLength === undefined) {
      setCartModal(false);
    }
  }, [cartLength]);

  const [okk, setOkk] = useState(getRetailData?.trueCustomer?.state || false);

  const [productDetail, setProductDetail] = useState();

  const isProductLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_MAIN_PRODUCT], state)
  );
  const userDetalLoader = useSelector(state =>
    isLoadingSelector([TYPES.GET_USERDETAIL], state)
  );
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.ADDCART], state)
  );

  const [showCart, setShowCart] = useState(
    getRetailData?.trueCart?.state || false
  );

  useEffect(() => {
    dispatch(getMainProduct(sellerID));
  }, []);

  const onClickAddCart = item => {
    const data = {
      seller_id: sellerID,
      supplyId: item?.supplies?.[0]?.id,
      supplyPriceID: item?.supplies?.[0]?.supply_prices[0]?.id,
      product_id: item?.id,
      service_id: item?.service_id,
      qty: 1,
    };
    dispatch(addTocart(data));
  };

  const originalFilterData = [
    {
      id: 1,
      name: 'Choose category',
    },
    {
      id: 2,
      name: 'Choose Sub categories ',
    },
    {
      id: 3,
      name: 'Choose Brand',
    },
  ];

  const productFun = useCallback(
    async productId => {
      const res = await dispatch(getOneProduct(sellerID, productId));
      if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
        setAddCartModal(true);
      }
    },
    [sellerID]
  );

  const userInputClear = () => {
    setUserEmail('');
    setUserName('');
    // setCustomerPhoneNo('');
    setUserAdd('');
  };

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

  //  categoryType -----start
  const catTypeRenderItem = ({ item }) => {
    const backgroundColor = item.id === catTypeId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === catTypeId ? 'white' : 'black';

    return (
      <CatTypeItem
        item={item}
        onPress={() => {
          if (item.id === 1) {
            setCatTypeId(item.id);
            setCategoryModal(true);
            // dispatch(getCategory(sellerID));
          } else if (
            item.id === 2
            // && isFilterDataSeclectedOfIndex === 0) ||
            // item.isSelected === true
          ) {
            setCatTypeId(item.id);
            // dispatch(getSubCategory(sellerID));
            setSubCategoryModal(true);
          } else if (
            item.id === 3
            //  && isFilterDataSeclectedOfIndex === 1
          ) {
            setBrandModal(true);
            setCatTypeId(item.id);
            // dispatch(getBrand(sellerID));
          }
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
  const CatTypeItem = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity
      style={styles.chooseCategoryCon}
      onPress={onPress}
      //   onPress={() => setCategoryModal(true)}
    >
      <Text style={styles.chooseCat} numberOfLines={1}>
        {item.name}
      </Text>
      <Image
        source={categoryMenu}
        style={[
          styles.categoryMenu,
          // { tintColor: item.isSelected && COLORS.solid_green },
        ]}
      />
    </TouchableOpacity>
  );
  //  categoryType -----end

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const Item = ({ item }) => (
    <TouchableOpacity
      style={styles.productCon}
      onPress={() => productFun(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.categoryshoes} />
      <Spacer space={SH(10)} />
      <Text numberOfLines={1} style={styles.productDes}>
        {item.name}
      </Text>
      <Text numberOfLines={1} style={styles.productDes}>
        short cardigan
      </Text>
      <Spacer space={SH(6)} />
      <Text numberOfLines={1} style={styles.productSubHead}>
        {item.sub_category?.name}
      </Text>
      <Spacer space={SH(6)} />
      <TouchableOpacity style={styles.displayflex}>
        <Text numberOfLines={1} style={styles.productPrice}>
          ${item.supplies?.[0]?.supply_prices?.[0]?.selling_price}
        </Text>
        {/* addToCartBlue */}
        <TouchableOpacity onPress={() => onClickAddCart(item)}>
          <Image source={addToCart} style={styles.addToCart} />
          {/* <View style={styles.productBadge}>
            <Text style={styles.productBadgeText}>{item.id}</Text>
          </View> */}
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.homeScreenCon}>
        <CustomHeader
          iconShow={showCart ? true : false}
          crossHandler={() => setShowCart(false)}
        />
        <View style={styles.displayflex2}>
          <View style={styles.productView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ marginRight: 15 }}>
                <Text style={styles.allProduct}>
                  {strings.posRetail.allProduct}
                </Text>
                <Text style={styles.productCount}>
                  ({productArray?.length ?? '0'})
                </Text>
              </View>
              <View>
                <FlatList
                  data={[
                    { name: 'category', id: 1 },
                    { name: 'Subcategory', id: 2 },
                    { name: 'brands', id: 3 },
                  ]}
                  // extraData={filterMenuTitle}
                  renderItem={catTypeRenderItem}
                  keyExtractor={item => item.id}
                  horizontal
                  // contentContainerStyle={styles.contentContainer}
                />
              </View>
              <View style={styles.barcodeInputWraper}>
                <View style={styles.displayRow}>
                  <View>
                    <Image
                      source={search_light}
                      style={styles.sideSearchStyle}
                    />
                  </View>
                  <TextInput
                    placeholder="Search by Barcode, SKU, Name"
                    style={styles.sideBarsearchInput}
                    // value={search}
                    // onChangeText={search => (
                    //   setSearch(search), onChangeFun(search)
                    // )}
                    placeholderTextColor={COLORS.gerySkies}
                  />
                </View>
              </View>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles.hr} />
            <Spacer space={SH(10)} />
            {isProductLoading ? (
              <View style={{ marginTop: 100 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : (
              <FlatList
                data={productArray}
                extraData={productArray}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                numColumns={7}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                scrollEnabled={true}
                ListEmptyComponent={() => (
                  <View style={styles.noProductText}>
                    <Text style={[styles.emptyListText, { fontSize: SF(25) }]}>
                      {strings.valiadtion.noProduct}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
          <View style={styles.rightSideView}>
            <View style={{ flexDirection: 'column', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.bucketBackgorund}
                disabled={cartLength > 0 ? false : true}
                onPress={() => setCartModal(true)}
              >
                <Image
                  source={bucket}
                  style={
                    cartLength > 0
                      ? [styles.sideBarImage, { tintColor: COLORS.primary }]
                      : styles.sideBarImage
                  }
                />
                <View
                  style={
                    cartLength > 0
                      ? [styles.bucketBadge, styles.bucketBadgePrimary]
                      : styles.bucketBadge
                  }
                >
                  <Text
                    style={
                      cartLength > 0
                        ? [styles.badgetext, { color: COLORS.white }]
                        : styles.badgetext
                    }
                  >
                    {cartLength ?? '0'}
                  </Text>
                </View>
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <Image source={sideKeyboard} style={styles.sideBarImage} />
              <Spacer space={SH(20)} />
              <TouchableOpacity
                onPress={() => dispatch(clearAllCart())}
                disabled={cartLength > 0 ? false : true}
              >
                <Image
                  source={sideEarser}
                  style={
                    cartLength > 0
                      ? [styles.sideBarImage, { tintColor: COLORS.dark_grey }]
                      : styles.sideBarImage
                  }
                />
              </TouchableOpacity>
              <Spacer space={SH(20)} />
              <View>
                <Image source={holdCart} style={styles.sideBarImage} />
                <View style={styles.holdBadge}>
                  <Text style={styles.holdBadgetext}>0</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              disabled={cartLength > 0 ? false : true}
              onPress={cartScreenHandler}
              style={
                cartLength > 0
                  ? [
                      styles.bucketBackgorund,
                      { backgroundColor: COLORS.primary },
                    ]
                  : styles.bucketBackgorund
              }
            >
              <Image
                source={sideArrow}
                style={
                  cartLength > 0
                    ? [styles.sideBarImage, { tintColor: COLORS.white }]
                    : styles.sideBarImage
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* cart list modal start */}
      <Modal animationType="fade" transparent={true} isVisible={cartModal}>
        <CartListModal checkOutHandler={checkOutHandler} />
      </Modal>

      {/* cart list modal end */}
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={addCartModal || addCartDetailModal}
      >
        {addCartDetailModal ? (
          <AddCartDetailModal
            crossHandler={() => setAddCartDetailModal(false)}
          />
        ) : (
          <AddCartModal
            crossHandler={() => setAddCartModal(false)}
            detailHandler={() => setAddCartDetailModal(true)}
            sellerID={sellerID}
          />
        )}
      </Modal>
    </View>
  );
}
