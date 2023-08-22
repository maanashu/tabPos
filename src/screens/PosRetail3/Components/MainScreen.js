import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  addToCart,
  addToCartBlue,
  bucket,
  categoryMenu,
  cross,
  filter,
  holdCart,
  keyboard,
  multipleImag,
  product,
  search_light,
  services,
  sideArrow,
  sideEarser,
  sideKeyboard,
  userImage,
} from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Modal, { ReactNativeModal } from 'react-native-modal';
import { CategoryModal } from './CategoryModal';
import { SubCatModal } from './SubCatModal';
import { BrandModal } from './BrandModal';
import { catTypeData, productServiceFilter } from '@/constants/flatListData';
import { CustomHeader } from './CustomHeader';
import { AddCartModal } from './AddCartModal';
import { AddCartDetailModal } from './AddCartDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
  addToServiceCart,
  addTocart,
  changeStatusProductCart,
  changeStatusServiceCart,
  clearAllCart,
  clearServiceAllCart,
  getBrand,
  getCategory,
  getMainProduct,
  getMainServices,
  getOneProduct,
  getOneService,
  getServiceCategory,
  getServiceSubCategory,
  getSubCategory,
  getMainProductSuccess,
  createBulkcart,
  getAllCart,
  getAllCartSuccess,
  getAllProductPaginationSuccess,
  getMainProductPagination,
} from '@/actions/RetailAction';
import { getRetail } from '@/selectors/RetailSelectors';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { CartListModal } from './CartListModal';
import { ms } from 'react-native-size-matters';
import { AddServiceCartModal } from './AddServiceCartModal';
import { items, subItems } from '@/constants/staticData';
import { FilterDropDown } from './FilterDropDown';
import { getAuthData } from '@/selectors/AuthSelector';
import { ServiceFilterDropDown } from './ServiceFilterDropDown';
import { NumericPad } from './NumericPad';
import { addLocalCart, clearLocalCart, updateCartLength } from '@/actions/CartAction';
import { getCartLength, getLocalCartArray, getServiceCartLength } from '@/selectors/CartSelector';
import { getAllPosUsers } from '@/actions/AuthActions';
import { json } from 'stream/consumers';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';

export function MainScreen({
  cartScreenHandler,
  checkOutHandler,
  categoryArray,
  sellerID,
  productArray,
  cartServiceScreenHandler,
}) {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [selectedId, setSelectedId] = useState();
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [catTypeId, setCatTypeId] = useState();
  const [addCartModal, setAddCartModal] = useState(false);
  const [addServiceCartModal, setAddServiceCartModal] = useState(false);

  const [addCartDetailModal, setAddCartDetailModal] = useState(false);
  const getAuthdata = useSelector(getAuthData);
  const [numPadModal, setNumPadModal] = useState(false);
  const [serviceNumPadModal, setServiceNumPadModal] = useState(false);
  const [goToCart, setGoToCart] = useState(false);
  const getMerchantService = getAuthdata?.merchantLoginData?.product_existance_status;
  const CART_LENGTH = useSelector(getCartLength);
  const SERVICE_CART_LENGTH = useSelector(getServiceCartLength);
  const getRetailData = useSelector(getRetail);
  const LOCAL_CART_ARRAY = useSelector(getLocalCartArray);

  const [localCartArray, setLocalCartArray] = useState(LOCAL_CART_ARRAY);

  console.log('-0-0-0', CART_LENGTH);

  useEffect(() => {
    setLocalCartArray(LOCAL_CART_ARRAY);
  }, [LOCAL_CART_ARRAY]);

  const products = getRetailData?.products;
  const cartData = getRetailData?.getAllCart;
  const productCartArray = getRetailData?.getAllProductCart;
  const serviceCartArray = getRetailData?.getAllServiceCart;
  const holdProductArray = productCartArray?.filter((item) => item.is_on_hold === true);
  const holdServiceArray = serviceCartArray?.filter((item) => item.is_on_hold === true);

  // const cartLength = cartData?.poscart_products?.length;
  const cartLength = CART_LENGTH;
  const serviceCartData = getRetailData?.getserviceCart;
  const serviceCartLength = serviceCartData?.appointment_cart_products?.length;
  //  const serviceCartLength = CART_LENGTH;
  let arr = [getRetailData?.getAllCart];
  const [cartModal, setCartModal] = useState(false);
  const [search, setSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [showProductsFrom, setshowProductsFrom] = useState();
  const mainProductArray = getRetailData?.getMainProduct?.data;
  const mainServicesArray = getRetailData?.getMainServices?.data;
  const cartmatchId = getRetailData?.getAllCart?.poscart_products?.map((obj) => ({
    product_id: obj.product_id,
    qty: obj.qty,
  }));
  const [productServiceType, setProductServiceType] = useState(1);
  const [cateoryView, setCateoryView] = useState(false);
  const [productFilter, setProductFilter] = useState(0);

  const [serviceFilter, setServiceFilter] = useState(0);

  const [hitBulk, setHitBulk] = useState(true);

  const [selectedCartItem, setSelectedCartItems] = useState([]);
  const filterMenuData = JSON.parse(JSON.stringify(catTypeData));

  const [filterMenuTitle, setfilterMenuTitle] = useState(filterMenuData);

  const [isFilterDataSeclectedOfIndex, setisFilterDataSeclectedOfIndex] = useState();

  const [selectedCatID, setselectedCatID] = useState(null);
  const [selectedSubCatID, setselectedSubCatID] = useState(null);
  const [selectedBrandID, setselectedBrandID] = useState(null);
  const [isClear, setIsClear] = useState(false);
  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAdd, setUserAdd] = useState('');

  const [page, setPage] = useState(1);

  const [productCon, setProductCon] = useState(true);
  const [serviceCon, setServiceCon] = useState(false);
  const [filterCon, setFilterCon] = useState(false);
  const [serviceFilterCon, setServiceFilterCon] = useState(false);
  const [serviceItemSave, setServiceItemSave] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCart, setShowCart] = useState(getRetailData?.trueCart?.state || false);
  const [isScrolling, setIsScrolling] = useState(false);

  const cartStatusHandler = () => {
    const data =
      holdProductArray?.length > 0
        ? {
            status: holdProductArray?.[0]?.is_on_hold === false ? true : false,
            cartId: holdProductArray?.[0]?.id,
          }
        : {
            status: getRetailData?.getAllCart?.is_on_hold === false ? true : false,
            cartId: getRetailData?.getAllCart?.id,
          };
    dispatch(changeStatusProductCart(data));
  };
  const serviceCartStatusHandler = () => {
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

  useEffect(() => {
    dispatch(getCategory(sellerID));
    dispatch(getSubCategory(sellerID));
    dispatch(getBrand(sellerID));
  }, []);

  useEffect(() => {
    dispatch(getServiceCategory(sellerID));
    dispatch(getServiceSubCategory(sellerID));
    dispatch(getAllPosUsers(sellerID));
  }, []);

  useEffect(() => {
    setfilterMenuTitle(originalFilterData);
    setisFilterDataSeclectedOfIndex(null);
    setTimeout(() => {
      setshowProductsFrom(productArray);
    }, 1000);
  }, [isFocus]);

  useEffect(() => {
    // dispatch(getMainProduct())
    // dispatch(getProductDefault(sellerID, page));
    if (products) {
      setshowProductsFrom(products);
    }
  }, [products]);

  useEffect(() => {
    dispatch(getMainProduct());
    dispatch(getMainServices());
  }, [isClear]);

  const onChangeFun = (search) => {
    setSearch(search);
    if (search?.length > 3) {
      const searchName = {
        search: search,
      };
      dispatch(getMainProduct(searchName));
    } else if (search?.length === 0) {
      dispatch(getMainProduct());
    }
  };
  const onServiceFind = (search) => {
    setServiceSearch(search);
    if (search?.length > 3) {
      const searchName = {
        search: search,
      };
      dispatch(getMainServices(searchName));
    } else if (search?.length === 0) {
      dispatch(getMainServices());
    }
  };

  useEffect(() => {
    if (isFocus) {
      if (getRetailData?.getAllCart?.poscart_products?.length > 0) {
        const cartmatchId = getRetailData?.getAllCart?.poscart_products?.map((obj) => ({
          product_id: obj.product_id,
          qty: obj.qty,
          supply_id: obj.supply_id,
          supply_price_id: obj.supply_price_id,
        }));
        dispatch(addLocalCart(cartmatchId));
        setSelectedCartItems(cartmatchId);
      } else {
        dispatch(updateCartLength(0));
        dispatch(clearLocalCart());
        setSelectedCartItems([]);
      }
    }
  }, [isFocus]);

  // useEffect(()=>{
  //   console.log('onfocus',localCartArray.length)
  //   return  () => {
  //   console.log('onblur',localCartArray.length)

  //     if (localCartArray?.length > 0 && !isClear) {
  //       console.log("Calll=-=-=-=-==-=-=-",isClear)
  //        bulkCart()
  //      }
  //     };
  // },[localCartArray])

  const bulkCart = async () => {
    if (localCartArray.length > 0) {
      const dataToSend = {
        seller_id: sellerID,
        products: localCartArray,
      };
      try {
        dispatch(createBulkcart(dataToSend));
      } catch (error) {}
    }
  };

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

  const onClickAddCart = (item, index, cartQty) => {
    const mainProductArray = getRetailData?.getMainProduct;
    const cartArray = selectedCartItem;

    const existingItemIndex = cartArray.findIndex((cartItem) => cartItem.product_id === item?.id);

    const DATA = {
      product_id: item?.id,
      qty: 1,
      supply_id: item?.supplies?.[0]?.id,
      supply_price_id: item?.supplies?.[0]?.supply_prices[0]?.id,
    };
    if (existingItemIndex === -1) {
      cartArray.push(DATA);
      dispatch(updateCartLength(cartLength + 1));
    } else {
      cartArray[existingItemIndex].qty = cartQty + 1;
    }
    setSelectedCartItems(cartArray);
    dispatch(addLocalCart(cartArray));
    ///

    mainProductArray.data[index].cart_qty += 1;
    dispatch(getMainProductSuccess(mainProductArray));

    //-------------OLD_CODE------------
    // const data = {
    //   seller_id: sellerID,
    //   supplyId: item?.supplies?.[0]?.id,
    //   supplyPriceID: item?.supplies?.[0]?.supply_prices[0]?.id,
    //   product_id: item?.id,
    //   service_id: item?.service_id,
    //   qty: 1,
    // };
    // dispatch(addTocart(data));
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

  const productFun = async (productId) => {
    const res = await dispatch(getOneProduct(sellerID, productId));
    if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
      setAddCartModal(true);
    }
  };

  const serviceFun = async (serviceId) => {
    const res = await dispatch(getOneService(sellerID, serviceId));
    if (res?.type === 'GET_ONE_SERVICE_SUCCESS') {
      setAddServiceCartModal(true);
    }
  };

  // const serviceFun = (item) => {
  //   setServiceItemSave(item);
  //   setAddServiceCartModal(true);
  // };

  const userInputClear = () => {
    setUserEmail('');
    setUserName('');
    // setCustomerPhoneNo('');
    setUserAdd('');
  };
  const onCloseCartModal = () => {
    setCartModal(false);
  };

  const renderItem = ({ item, index }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        index={index}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const Item = ({ item, index }) => {
    const isProductMatchArray = localCartArray?.find((data) => data.product_id === item.id);
    const cartAddQty = isProductMatchArray?.qty;
    // Create a new object with updated cart_qty value

    const updatedItem = { ...item };
    if (cartAddQty !== undefined) {
      updatedItem.cart_qty = cartAddQty;
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.productCon}
        onPress={() => productFun(item.id)}
        activeOpacity={0.7}
      >
        {/* <Image source={{ uri: item.image }} style={styles.categoryshoes} /> */}

        <FastImage
          source={{
            uri: item.image,
            priority: FastImage.priority.normal,
          }}
          style={styles.categoryshoes}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Spacer space={SH(10)} />
        <Text numberOfLines={2} style={styles.productDes}>
          {item.name}
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
          <TouchableOpacity
            // activeOpacity={1}
            onPress={() => onClickAddCart(item, index, cartAddQty)}
          >
            <FastImage
              source={isProductMatchArray ? addToCartBlue : addToCart}
              style={styles.addToCart}
              resizeMode={FastImage.resizeMode.contain}
            />
            {/* -----New_In progress_CODE------- */}
            {updatedItem.cart_qty > 0 && (
              <View style={styles.productBadge}>
                <Text style={styles.productBadgeText}>{updatedItem.cart_qty}</Text>
              </View>
            )}
            {/* {cartAddQty>0 &&
           <View 
           style={styles.productBadge}>
               <Text style={styles.productBadgeText}>{cartAddQty}</Text>
            </View>
          } */}

            {/* -----OLD_CODE------- */}
            {/* {isProductMatchArray ? (
              <View style={styles.productBadge}>
                <Text style={styles.productBadgeText}>{cartAddQty}</Text>
              </View>
            ) : null} */}
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const productHandler = () => {
    setProductCon(true);
    setServiceCon(false);
  };
  const serviceHandler = () => {
    setServiceCon(true);
    setProductCon(false);
    setFilterCon(false);
  };
  const filterHandler = () => {
    setFilterCon(!filterCon);
    setServiceFilterCon(false);
  };

  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
  };

  const eraseClearCart = async () => {
    setSelectedCartItems([]);
    dispatch(clearLocalCart());
    dispatch(updateCartLength(0));
    dispatch(getMainProduct());
    setLocalCartArray([]);
    setIsClear(true);

    if (getRetailData?.getAllCart?.poscart_products?.length > 0) {
      dispatch(clearAllCart());
    }
  };

  const isLoadingMore = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ALL_PRODUCT_PAGINATION], state)
  );
  const onLoadMoreProduct = () => {
    // if (isLoadingMore || !isScrolling) return;
    setPage(page + 1);
    dispatch(getMainProductPagination(page));
  };

  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoadingMore && (
          <ActivityIndicator
            style={{ marginVertical: 14 }}
            size={'large'}
            color={COLORS.blueLight}
          />
        )}
      </View>
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => dispatch(getMainProduct());
    }, [])
  );
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.homeScreenCon}>
        <CustomHeader
          iconShow={showCart ? true : false}
          crossHandler={() => {
            setShowCart(false);
          }}
        />
        {getMerchantService?.is_product_exist === false &&
        getMerchantService?.is_service_exist === false ? (
          <View style={styles.noproductServiceCon}>
            <Text style={styles.noProductAndService}>
              This Seller does not have any products and services
            </Text>
          </View>
        ) : (
          <View style={styles.displayflex2}>
            <View style={styles.productView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {productCon && getMerchantService?.is_product_exist === true ? (
                  <View style={styles.allProductSection}>
                    <Text style={styles.allProduct}>{strings.posRetail.allProduct}</Text>
                    <Text style={styles.productCount}>
                      ({getRetailData?.getMainProduct?.total ?? '0'})
                    </Text>
                  </View>
                ) : (
                  <View style={styles.allProductSection}>
                    <Text style={styles.allProduct}>{'All Services'}</Text>
                    <Text style={styles.productCount}>
                      {' '}
                      ({getRetailData?.getMainServices?.total ?? '0'})
                    </Text>
                  </View>
                )}
                {productCon && getMerchantService?.is_product_exist === true ? (
                  <View style={styles.barcodeInputWraper}>
                    <View style={styles.displayRow}>
                      <View>
                        <Image source={search_light} style={styles.sideSearchStyle} />
                      </View>
                      <TextInput
                        placeholder="Search by Barcode, SKU, Name"
                        style={styles.sideBarsearchInput}
                        value={search}
                        onChangeText={(search) => onChangeFun(search)}
                        placeholderTextColor={COLORS.gerySkies}
                      />
                      {search?.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setSearch(''), dispatch(getMainProduct()), Keyboard.dismiss();
                          }}
                        >
                          <Image
                            source={cross}
                            style={[styles.sideSearchStyle, styles.crossStyling]}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                ) : (
                  <View style={styles.barcodeInputWraper}>
                    <View style={styles.displayRow}>
                      <View>
                        <Image source={search_light} style={styles.sideSearchStyle} />
                      </View>
                      <TextInput
                        placeholder="Search by Barcode, SKU, Name"
                        style={styles.sideBarsearchInput}
                        value={serviceSearch}
                        onChangeText={(serviceSearch) => onServiceFind(serviceSearch)}
                        placeholderTextColor={COLORS.gerySkies}
                      />
                      {serviceSearch?.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setServiceSearch(''), dispatch(getMainServices()), Keyboard.dismiss();
                          }}
                        >
                          <Image
                            source={cross}
                            style={[styles.sideSearchStyle, styles.crossStyling]}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </View>
                )}

                <View>
                  <View style={styles.displayflex}>
                    {getMerchantService?.is_product_exist ? (
                      <TouchableOpacity
                        style={
                          productCon
                            ? [styles.prouductAndServiceCon, { borderColor: COLORS.primary }]
                            : styles.prouductAndServiceCon
                        }
                        onPress={productHandler}
                      >
                        <Image
                          source={product}
                          style={
                            productCon ? styles.productImageStyleBlue : styles.productImageStyle
                          }
                        />
                        <Text style={productCon ? styles.productTextBlue : styles.productText}>
                          {'Products'}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    {getMerchantService?.is_service_exist ? (
                      <TouchableOpacity
                        style={
                          serviceCon
                            ? [styles.prouductAndServiceCon, { borderColor: COLORS.primary }]
                            : styles.prouductAndServiceCon
                        }
                        onPress={serviceHandler}
                      >
                        <Image
                          source={services}
                          style={
                            serviceCon ? styles.productImageStyleBlue : styles.productImageStyle
                          }
                        />
                        <Text style={serviceCon ? styles.productTextBlue : styles.productText}>
                          {'Services'}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    {productCon && getMerchantService?.is_product_exist === true ? (
                      <View>
                        <TouchableOpacity
                          style={
                            filterCon
                              ? [styles.prouductAndServiceCon, { borderColor: COLORS.primary }]
                              : styles.prouductAndServiceCon
                          }
                          onPress={filterHandler}
                        >
                          <Text
                            style={
                              filterCon
                                ? [styles.productText, { color: COLORS.primary }]
                                : styles.productText
                            }
                          >
                            {'Filter'}
                          </Text>
                          <View>
                            <Image
                              source={filter}
                              style={
                                filterCon
                                  ? [styles.productImageStyle, { tintColor: COLORS.primary }]
                                  : styles.productImageStyle
                              }
                            />
                            {productFilter > 0 ? (
                              <View style={styles.filterBadge}>
                                <Text style={styles.filterBadgeText}>{productFilter}</Text>
                              </View>
                            ) : null}
                          </View>
                        </TouchableOpacity>
                        {filterCon ? (
                          // <View style={styles.categoryFilterCon}>
                          <FilterDropDown
                            data={items}
                            sellerid={sellerID}
                            productFilterCount={setProductFilter}
                            backfilterValue={productFilter}
                            closeHandler={() => setFilterCon(false)}
                            // settleFunction={() => {
                            //   dispatch(getCategory(sellerID));
                            //   dispatch(getSubCategory(sellerID));
                            //   dispatch(getBrand(sellerID));
                            // }}

                            // productArrayLength={() => setProductfilterLength(productfilterLength)}
                          />
                        ) : // </View>
                        null}
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={
                            serviceFilterCon
                              ? [styles.prouductAndServiceCon, { borderColor: COLORS.primary }]
                              : styles.prouductAndServiceCon
                          }
                          onPress={() => setServiceFilterCon(!serviceFilterCon)}
                        >
                          <Text
                            style={
                              serviceFilterCon
                                ? [styles.productText, { color: COLORS.primary }]
                                : styles.productText
                            }
                          >
                            {'Filter'}
                          </Text>
                          <View>
                            <Image
                              source={filter}
                              style={
                                serviceFilterCon
                                  ? [styles.productImageStyle, { tintColor: COLORS.primary }]
                                  : styles.productImageStyle
                              }
                            />
                            {serviceFilter > 0 ? (
                              <View style={styles.filterBadge}>
                                <Text style={styles.filterBadgeText}>{serviceFilter}</Text>
                              </View>
                            ) : null}
                          </View>
                        </TouchableOpacity>
                        {serviceFilterCon ? (
                          // <View style={styles.categoryFilterCon}>
                          <ServiceFilterDropDown
                            data={items}
                            sellerid={sellerID}
                            serviceFilterCount={setServiceFilter}
                            backfilterValue={serviceFilter}
                            closeHandler={() => setServiceFilterCon(false)}
                          />
                        ) : // </View>
                        null}
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <Spacer space={SH(10)} />
              {/* <View style={styles.hr} /> */}
              <Spacer space={SH(10)} />

              {productCon && getMerchantService?.is_product_exist === true ? (
                <FlatList
                  //  key={localCartArray}
                  data={mainProductArray}
                  extraData={mainProductArray}
                  renderItem={renderItem}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={7}
                  contentContainerStyle={{
                    // flexGrow: 1,
                    justifyContent: 'space-between',
                    zIndex: -99,
                  }}
                  scrollEnabled={true}
                  ListFooterComponent={renderFooterPost}
                  // onEndReached={onLoadMoreProduct}
                  // onEndReachedThreshold={0.5}
                  // onMomentumScrollBegin={() => {
                  //   setIsScrolling(true);
                  // }}
                  // onMomentumScrollEnd={() => {
                  //   setIsScrolling(false);
                  // }}
                  ListEmptyComponent={() => (
                    <View style={styles.noProductText}>
                      <Text style={[styles.emptyListText, { fontSize: SF(25) }]}>
                        No Data found
                      </Text>
                    </View>
                  )}
                  style={{ zIndex: -99 }}
                />
              ) : (
                <FlatList
                  data={mainServicesArray}
                  extraData={mainServicesArray}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.productCon}
                        onPress={() => serviceFun(item.id)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.avalibleServiceCon}>
                          <FastImage
                            source={{
                              uri: item.image,
                            }}
                            style={styles.categoryshoes}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                          <View style={{ flex: 1 }} />
                          <View style={styles.availableTimeCon}>
                            <Text style={styles.availableTime}>Available: Tue @ 2:00 pm </Text>
                          </View>
                        </View>
                        <Spacer space={SH(5)} />
                        <Text numberOfLines={2} style={styles.productDes}>
                          {item.name}
                        </Text>
                        <Spacer space={SH(6)} />
                        <Text numberOfLines={1} style={styles.productSubHead}>
                          Est: 45 ~ 50 min
                        </Text>
                        <Spacer space={SH(6)} />
                        <View>
                          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {item?.pos_staff?.map((data, index) => (
                              <Image
                                key={index}
                                source={
                                  { uri: data?.user?.user_profiles?.profile_photo } ?? userImage
                                }
                                style={{
                                  width: ms(15),
                                  height: ms(15),
                                  resizeMode: 'contain',
                                  marginRight: -1,
                                  borderRadius: 50,
                                }}
                              />
                            ))}
                          </ScrollView>
                        </View>
                        {/* <Image
                        source={multipleImag}
                        style={{ width: ms(50), height: ms(15), resizeMode: 'cover' }}
                      /> */}
                        <View style={styles.displayflex}>
                          <Text numberOfLines={1} style={styles.productPrice}>
                            ${item.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                          </Text>
                          <View>
                            <FastImage
                              source={addToCart}
                              style={styles.addToCart}
                              resizeMode="contain"
                            />
                            {/* {isProductMatchArray ? (
                          <View style={styles.productBadge}>
                            <Text style={styles.productBadgeText}>{cartAddQty}</Text>
                          </View>
                        ) : null} */}
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index}
                  numColumns={7}
                  contentContainerStyle={{
                    // flexGrow: 1,
                    justifyContent: 'space-between',
                    zIndex: -99,
                  }}
                  scrollEnabled={true}
                  ListEmptyComponent={() => (
                    <View style={styles.noProductText}>
                      <Text style={[styles.emptyListText, { fontSize: SF(25) }]}>
                        {strings.valiadtion.noData}
                      </Text>
                    </View>
                  )}
                  style={{ zIndex: -99 }}
                />
              )}
            </View>
            {productCon && getMerchantService?.is_product_exist === true ? (
              <View style={styles.rightSideView}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.bucketBackgorund}
                    disabled={cartLength > 0 ? false : true}
                    onPress={() => {
                      bulkCart(), setCartModal(true);
                    }}
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
                  <View>
                    <TouchableOpacity onPress={() => setNumPadModal(!numPadModal)}>
                      <Image
                        source={sideKeyboard}
                        style={[styles.sideBarImage, { tintColor: COLORS.dark_grey }]}
                      />
                    </TouchableOpacity>
                    {numPadModal ? (
                      <View
                        style={{
                          width: ms(240),
                          height: ms(280),
                          position: 'absolute',
                          right: 60,
                          top: -20,
                          backgroundColor: COLORS.textInputBackground,
                          borderRadius: 5,
                        }}
                      >
                        <NumericPad
                          maxCharLength={15}
                          enteredValue={search}
                          setEnteredValue={setSearch}
                          // onClosePress={closeHandler}
                          // onPayNowPress={() => {
                          //   // payNowHandler();
                          //   payNowByphone(selectedTipAmount);
                          //   attachUserByPhone(phoneNumber);
                          // }}
                        />
                      </View>
                    ) : null}
                  </View>
                  <Spacer space={SH(20)} />
                  <TouchableOpacity
                    onPress={() => eraseClearCart()}
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
                  <TouchableOpacity
                    onPress={cartStatusHandler}
                    // disabled={holdProductArray?.length > 0 ? false : true}
                  >
                    <Image
                      source={holdCart}
                      style={
                        holdProductArray?.length > 0
                          ? [styles.sideBarImage, { tintColor: COLORS.primary }]
                          : styles.sideBarImage
                      }
                    />
                    <View
                      style={
                        holdProductArray?.length > 0
                          ? [styles.holdBadge, styles.holdBadgePrimary]
                          : styles.holdBadge
                      }
                    >
                      <Text
                        style={
                          holdProductArray?.length > 0
                            ? [styles.holdBadgetext, { color: COLORS.white }]
                            : styles.holdBadgetext
                        }
                      >
                        {holdProductArray?.length}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  disabled={cartLength > 0 ? false : true}
                  onPress={() => {
                    bulkCart();
                    setTimeout(() => {
                      cartScreenHandler();
                    }, 200);
                  }}
                  style={
                    cartLength > 0
                      ? [styles.bucketBackgorund, { backgroundColor: COLORS.primary }]
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
            ) : (
              <View style={styles.rightSideView}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.bucketBackgorund}
                    disabled={serviceCartLength > 0 ? false : true}
                    // onPress={() => setCartModal(true)}
                  >
                    <Image
                      source={bucket}
                      style={
                        serviceCartLength > 0
                          ? [styles.sideBarImage, { tintColor: COLORS.primary }]
                          : styles.sideBarImage
                      }
                    />
                    <View
                      style={
                        serviceCartLength > 0
                          ? [styles.bucketBadge, styles.bucketBadgePrimary]
                          : styles.bucketBadge
                      }
                    >
                      <Text
                        style={
                          serviceCartLength > 0
                            ? [styles.badgetext, { color: COLORS.white }]
                            : styles.badgetext
                        }
                      >
                        {serviceCartLength ?? '0'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Spacer space={SH(25)} />
                  <View>
                    <TouchableOpacity onPress={() => setServiceNumPadModal(!serviceNumPadModal)}>
                      <Image
                        source={sideKeyboard}
                        style={[styles.sideBarImage, { tintColor: COLORS.dark_grey }]}
                      />
                    </TouchableOpacity>
                    {serviceNumPadModal ? (
                      <View
                        style={{
                          width: ms(240),
                          height: ms(280),
                          position: 'absolute',
                          right: 60,
                          top: -20,
                          backgroundColor: COLORS.textInputBackground,
                          borderRadius: 5,
                        }}
                      >
                        <NumericPad
                          maxCharLength={15}
                          enteredValue={serviceSearch}
                          setEnteredValue={setServiceSearch}
                          // onClosePress={closeHandler}
                          // onPayNowPress={() => {
                          //   // payNowHandler();
                          //   payNowByphone(selectedTipAmount);
                          //   attachUserByPhone(phoneNumber);
                          // }}
                        />
                      </View>
                    ) : null}
                  </View>
                  <Spacer space={SH(20)} />
                  <TouchableOpacity
                    onPress={() => dispatch(clearServiceAllCart())}
                    disabled={cartLength > 0 ? false : true}
                  >
                    <Image
                      source={sideEarser}
                      style={
                        serviceCartLength > 0
                          ? [styles.sideBarImage, { tintColor: COLORS.dark_grey }]
                          : styles.sideBarImage
                      }
                    />
                  </TouchableOpacity>
                  <Spacer space={SH(20)} />
                  <TouchableOpacity
                    onPress={() => {
                      serviceCartStatusHandler();
                      // setGoToCart(true)
                    }}
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
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  disabled={serviceCartLength > 0 ? false : true}
                  onPress={cartServiceScreenHandler}
                  style={
                    serviceCartLength > 0
                      ? [styles.bucketBackgorund, { backgroundColor: COLORS.primary }]
                      : styles.bucketBackgorund
                  }
                >
                  <Image
                    source={sideArrow}
                    style={
                      serviceCartLength > 0
                        ? [styles.sideBarImage, { tintColor: COLORS.white }]
                        : styles.sideBarImage
                    }
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* cart list modal start */}
      <ReactNativeModal
        animationType="fade"
        transparent={true}
        isVisible={cartModal}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
      >
        <CartListModal
          clearCart={eraseClearCart}
          checkOutHandler={checkOutHandler}
          CloseCartModal={() => setCartModal(false)}
        />
      </ReactNativeModal>

      {/* cart list modal end */}
      <Modal animationType="fade" transparent={true} isVisible={addCartModal || addCartDetailModal}>
        {addCartDetailModal ? (
          <AddCartDetailModal crossHandler={() => setAddCartDetailModal(false)} />
        ) : (
          <AddCartModal
            crossHandler={() => setAddCartModal(false)}
            detailHandler={() => setAddCartDetailModal(true)}
            sellerID={sellerID}
            backToCartHandler={() => cartScreenHandler()}
          />
        )}
      </Modal>

      {/* cart list modal end */}
      <Modal animationType="fade" transparent={true} isVisible={addServiceCartModal}>
        <AddServiceCartModal
          crossHandler={() => setAddServiceCartModal(false)}
          // detailHandler={() => setAddCartDetailModal(true)}
          sellerID={sellerID}
          itemData={serviceItemSave}
          backToCartHandler={() => cartServiceScreenHandler()}
        />
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={categoryModal || subCategoryModal || brandModal}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 100}
          // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 100}
        >
          <ScrollView>
            <View>
              {categoryModal ? (
                <CategoryModal
                  cancelCategory={() => {
                    setselectedCatID(null);
                    setCategoryModal(false);
                    dispatch(getMainProduct());
                    setfilterMenuTitle((prevData) => {
                      const newData = [...prevData];
                      newData[0].isSelected = false;
                      newData[0].name = originalFilterData[0].name;
                      return newData;
                    });
                  }}
                  crossHandler={() => setCategoryModal(false)}
                  categoryArray={categoryArray}
                  onSelectCategory={(selectedCat) => {
                    setselectedCatID(selectedCat.id);
                    const categoryID = {
                      category_ids: selectedCat.id,
                    };
                    dispatch(getMainProduct(categoryID));
                    setSearch(''); // Clear the search input product

                    setisFilterDataSeclectedOfIndex(0);
                    setfilterMenuTitle((prevData) => {
                      const newData = [...prevData];

                      // Set Category
                      newData[0].name = selectedCat.name;
                      newData[0].isSelected = true;

                      // Reset SubCategory selections
                      newData[1].isSelected = false;
                      newData[1].name = originalFilterData[1].name;

                      // Reset Brand selections
                      newData[2].isSelected = false;
                      newData[2].name = originalFilterData[2].name;

                      return newData;
                    });

                    setCategoryModal(false);
                  }}
                />
              ) : subCategoryModal ? (
                <SubCatModal
                  cancelSubCategory={() => {
                    setselectedSubCatID(null);
                    setSubCategoryModal(false);
                    dispatch(getMainProduct());
                    setfilterMenuTitle((prevData) => {
                      const newData = [...prevData];
                      newData[1].isSelected = false;
                      newData[1].name = originalFilterData[1].name;
                      return newData;
                    });
                  }}
                  crossHandler={() => setSubCategoryModal(false)}
                  onSelectSubCategory={(selectedSubCat) => {
                    const subCategoryID = {
                      sub_category_ids: selectedSubCat.id,
                    };
                    dispatch(getMainProduct(subCategoryID));
                    setSearch(''); // Clear the search input product
                    setselectedSubCatID(selectedSubCat.id);
                    setisFilterDataSeclectedOfIndex(1); // Enable Selection of subcategory if any category is selected

                    setfilterMenuTitle((prevData) => {
                      const newData = [...prevData];

                      // Set SubCategory
                      newData[1].name = selectedSubCat.name;
                      newData[1].isSelected = true;

                      // Reset category selections
                      newData[0].isSelected = false;
                      newData[0].name = originalFilterData[0].name;

                      // Reset brand selections
                      newData[2].isSelected = false;
                      newData[2].name = originalFilterData[2].name;

                      return newData;
                    });
                    setSubCategoryModal(false);
                  }}
                />
              ) : (
                <BrandModal
                  cancelBrand={() => {
                    setselectedBrandID(null);
                    setBrandModal(false);
                    dispatch(getMainProduct());
                    setfilterMenuTitle((prevData) => {
                      const newData = [...prevData];
                      newData[2].isSelected = false;
                      newData[2].name = originalFilterData[2].name;
                      return newData;
                    });
                  }}
                  crossHandler={() => setBrandModal(false)}
                  onSelectbrands={(selectedBrand) => {
                    setselectedBrandID(selectedBrand.id);
                    const brandID = {
                      brand_id: selectedBrand.id,
                    };
                    dispatch(getMainProduct(brandID));
                    setSearch(''); // Clear the search input product
                    setisFilterDataSeclectedOfIndex(1); // Enable Selection of subcategory if any category is selected

                    setfilterMenuTitle((prevData) => {
                      const newData = [...prevData];
                      newData[2].name = selectedBrand.name;
                      newData[2].isSelected = true;

                      // Reset category selections
                      newData[0].isSelected = false;
                      newData[0].name = originalFilterData[0].name;

                      // Reset subCategory selections
                      newData[1].isSelected = false;
                      newData[1].name = originalFilterData[1].name;
                      return newData;
                    });
                    setBrandModal(false);
                  }}
                />
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}
