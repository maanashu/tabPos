import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  addToCart,
  addToCartBlue,
  bucket,
  calendar,
  cross,
  filter,
  holdCart,
  plus,
  product,
  scn,
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
import { catTypeData, items } from '@/constants/flatListData';
import { CustomHeader } from './CustomHeader';
import { AddCartModal } from './AddCartModal';
import { AddCartDetailModal } from './AddCartDetailModal';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import {
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
  getMainProductPagination,
  getAllCart,
  getAllCartReset,
  addProductFrom,
  addServiceFrom,
} from '@/actions/RetailAction';
import { getRetail } from '@/selectors/RetailSelectors';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { CartListModal } from './CartListModal';
import { ms } from 'react-native-size-matters';
import { AddServiceCartModal } from './AddServiceCartModal';
import { FilterDropDown } from './FilterDropDown';
import { getAuthData } from '@/selectors/AuthSelector';
import { ServiceFilterDropDown } from './ServiceFilterDropDown';
import { addLocalCart, clearLocalCart, updateCartLength } from '@/actions/CartAction';
import { getCartLength, getLocalCartArray, getServiceCartLength } from '@/selectors/CartSelector';
import { getAllPosUsers } from '@/actions/AuthActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { ServiceCartListModal } from './ServiceCartListModal ';
import { CustomProductAdd } from '@/screens/PosRetail3/Components';
import { Images } from '@/assets/new_icon';
import { imageSource } from '@/utils/GlobalMethods';

export function MainScreen({
  cartScreenHandler,
  checkOutHandler,
  checkOutServiceHandler,
  categoryArray,
  sellerID,
  productArray,
  cartServiceScreenHandler,
  activeCategory,
  addProductscreenShow,
  addServiceScreenShow,
}) {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const [selectedId, setSelectedId] = useState();
  const [selectedItem, setSelectedItem] = useState();
  const [selectedItemQty, setSelectedItemQty] = useState();
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [catTypeId, setCatTypeId] = useState();
  const [addCartModal, setAddCartModal] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [productItem, setProductItem] = useState(null);
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
  const [customProductOpen, setCustomProductOpen] = useState('');

  useEffect(() => {
    if (activeCategory === 'Product') {
      setProductCon(true);
      setServiceCon(false);
    }
    if (activeCategory === 'Service') {
      setProductCon(false);
      setServiceCon(true);
    }
  }, [activeCategory]);
  useEffect(() => {
    setLocalCartArray(LOCAL_CART_ARRAY);
  }, [LOCAL_CART_ARRAY]);

  const products = getRetailData?.products;
  const cartData = getRetailData?.getAllCart;
  const productCartArray = getRetailData?.getAllProductCart;
  const serviceCartArray = getRetailData?.getAllServiceCart;
  const holdProductArray = productCartArray?.filter((item) => item.is_on_hold === true);
  const holdServiceArray = serviceCartArray?.filter((item) => item.is_on_hold === true);
  const cartLength = CART_LENGTH;
  const serviceCartData = getRetailData?.getserviceCart;
  const serviceCartLength = serviceCartData?.appointment_cart_products?.length;
  let arr = [getRetailData?.getAllCart];
  const onEndReachedCalledDuringMomentum = useRef(false);
  const [cartModal, setCartModal] = useState(false);
  const [serviceCartModal, setServiceCartModal] = useState(false);
  const [search, setSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [showProductsFrom, setshowProductsFrom] = useState();
  const mainProductArray = getRetailData?.getMainProduct?.data;
  const mainServicesArray = getRetailData?.getMainServices?.data;
  const servicecCart = getRetailData?.getserviceCart?.appointment_cart_products ?? [];

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
  const [onHold, setOnHold] = useState(false);

  const cartStatusHandler = async () => {
    if (localCartArray.length > 0) {
      const dataToSend = {
        seller_id: sellerID,
        products: localCartArray,
      };
      try {
        // eraseClearCart();
        eraseCart();
        const bulkData = await createBulkcart(dataToSend)(dispatch);
        // if (holdProductArray?.length == 0 || getRetailData?.getAllCart?.length == 0) {
        if (holdProductArray?.length == 0 && Object.keys(getRetailData?.getAllCart)?.length == 0) {
          const data =
            holdProductArray?.length > 0
              ? {
                  status: true,
                  cartId: holdProductArray?.[0]?.id,
                }
              : {
                  status: true,
                  cartId: bulkData?.id,
                };
          dispatch(changeStatusProductCart(data));
        } else {
          const data =
            holdProductArray?.length > 0
              ? {
                  status: holdProductArray?.[0]?.is_on_hold === false ? true : false,
                  cartId: holdProductArray?.[0]?.id,
                }
              : {
                  status: getRetailData?.getAllCart?.is_on_hold === false ? true : false,
                  cartId: bulkData?.id,
                };
          dispatch(changeStatusProductCart(data));
        }
      } catch (error) {
        console.log('catch', error);
      }
    } else {
      console.log('last else');
      // const dataToSend = {
      //   seller_id: sellerID,
      //   products: localCartArray,
      // };
      // eraseCart();
      // const bulkData = await createBulkcart(dataToSend)(dispatch);

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
      //   if (getRetailData?.getAllCart?.poscart_products?.length > 0) {
      //     const cartmatchId = getRetailData?.getAllCart?.poscart_products?.map((obj) => ({
      //       product_id: obj.product_id,
      //       qty: obj.qty,
      //       supply_id: obj.supply_id,
      //       supply_price_id: obj.supply_price_id,
      //     }));
      //     dispatch(addLocalCart(cartmatchId));
      //     setSelectedCartItems(cartmatchId);
      //   }
    }
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
    const data = {
      page: 1,
      limit: 10,
      seller_id: sellerID,
    };
    dispatch(getAllPosUsers(data));
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
          // supply_variant_id: obj?.supply_variant_id,
          ...(obj.supply_variant_id && { supply_variant_id: obj.supply_variant_id }),
        }));
        dispatch(addLocalCart(cartmatchId));
        setSelectedCartItems(cartmatchId);
      } else {
        dispatch(updateCartLength(0));
        dispatch(clearLocalCart());
        setSelectedCartItems([]);
      }
    }
  }, [isFocus, cartData, productCartArray]);

  const cartQtyUpdate = () => {
    if (getRetailData?.getAllCart?.poscart_products?.length > 0) {
      const cartmatchId = getRetailData?.getAllCart?.poscart_products?.map((obj) => ({
        product_id: obj.product_id,
        qty: obj.qty,
        supply_id: obj.supply_id,
        supply_price_id: obj.supply_price_id,
        // supply_variant_id: obj?.supply_variant_id,
        ...(obj.supply_variant_id && { supply_variant_id: obj.supply_variant_id }),
      }));
      dispatch(addLocalCart(cartmatchId));
      setSelectedCartItems(cartmatchId);
    }
  };

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
  const checkAttributes = async (item, index, cartQty) => {
    if (item?.supplies?.[0]?.attributes?.length !== 0) {
      bulkCart();
      const res = await dispatch(getOneProduct(sellerID, item?.id));
      if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
        setSelectedItemQty(item?.cart_qty);
        setSelectedItem(item);
        // setAddCartModal(true);
        setProductIndex(index);
        setProductItem(item);
        addProductscreenShow();
        dispatch(addProductFrom('main'));
      }
    } else {
      onClickAddCart(item, index, cartQty);
    }
  };
  const onClickAddCart = (item, index, cartQty, supplyVarientId) => {
    const mainProductArray = getRetailData?.getMainProduct;

    const cartArray = selectedCartItem;

    const existingItemIndex = cartArray.findIndex((cartItem) => cartItem.product_id === item?.id);
    const DATA = {
      product_id: item?.id,
      qty: 1,
      supply_id: item?.supplies?.[0]?.id,
      supply_price_id: item?.supplies?.[0]?.supply_prices[0]?.id,
    };
    if (supplyVarientId) {
      DATA.supply_variant_id = supplyVarientId;
    }
    if (existingItemIndex === -1) {
      cartArray.push(DATA);
      dispatch(updateCartLength(cartLength + 1));
    } else {
      cartArray[existingItemIndex].qty = cartQty + 1;
    }
    dispatch(addLocalCart(cartArray));

    setSelectedCartItems(cartArray);

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

  const onClickAddCartModal = (item, index, cartQty) => {
    const mainProductArray = getRetailData?.getMainProduct;

    const cartArray = selectedCartItem;

    const existingItemIndex = cartArray.findIndex((cartItem) => cartItem.product_id === item?.id);

    const DATA = {
      product_id: item?.id,
      qty: cartQty,
      supply_id: item?.supplies?.[0]?.id,
      supply_price_id: item?.supplies?.[0]?.supply_prices[0]?.id,
    };
    if (existingItemIndex === -1) {
      cartArray.push(DATA);
      dispatch(updateCartLength(cartLength + 1));
    } else {
      cartArray[existingItemIndex].qty = cartQty;
    }
    setSelectedCartItems(cartArray);
    dispatch(addLocalCart(cartArray));
    ///
    mainProductArray.data[index].cart_qty = cartQty;
    dispatch(getMainProductSuccess(mainProductArray));
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

  const productFun = async (productId, index, item) => {
    bulkCart();
    const isProductMatchArray = localCartArray?.find((data) => data.product_id === item.id);
    const cartAddQty = isProductMatchArray?.qty;
    // Create a new object with updated cart_qty value
    const updatedItem = { ...item };
    if (cartAddQty !== undefined) {
      updatedItem.cart_qty = cartAddQty;
    } else {
      updatedItem.cart_qty = 1;
    }
    const res = await dispatch(getOneProduct(sellerID, productId));
    if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
      setSelectedItemQty(updatedItem?.cart_qty);
      setSelectedItem(item);
      // setAddCartModal(true);
      setProductIndex(index);
      setProductItem(item);
      addProductscreenShow();
      dispatch(addProductFrom('main'));
    }
  };

  const serviceFun = async (serviceId, index) => {
    const res = await dispatch(getOneService(sellerID, serviceId));
    if (res?.type === 'GET_ONE_SERVICE_SUCCESS') {
      // setAddServiceCartModal(true)
      addServiceScreenShow();
      dispatch(addServiceFrom('main'));
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

    const updatedItem = { ...item };
    if (cartAddQty !== undefined) {
      updatedItem.cart_qty = cartAddQty;
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.productCon(updatedItem?.cart_qty)}
        onPress={() => productFun(item.id, index, item)}
        activeOpacity={0.7}
        // onPress={() => checkAttributes(item, index, cartAddQty)}
      >
        <View style={styles.imageBackground}>
          <FastImage
            source={{
              uri: item.image,
              priority: FastImage.priority.normal,
            }}
            style={styles.categoryshoes}
            resizeMode={FastImage.resizeMode.contain}
          />
          {updatedItem?.cart_qty > 0 && (
            <View style={styles.imageInnerView}>
              <Image source={plus} style={[styles.plusButton, { tintColor: COLORS.white }]} />
            </View>
          )}
        </View>

        <View style={{ padding: ms(5) }}>
          <Spacer space={SH(6)} />
          <Text numberOfLines={1} style={styles.productDes}>
            {item.name}
          </Text>
          <Spacer space={SH(6)} />
          <Text numberOfLines={1} style={styles.productSubHead}>
            {item.sub_category?.name}
          </Text>
          <Spacer space={SH(6)} />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <Text numberOfLines={1} style={styles.productPrice}>
              ${item.supplies?.[0]?.supply_prices?.[0]?.selling_price}
            </Text>
            <TouchableOpacity
              onPress={() => checkAttributes(item, index, cartAddQty)}
              style={styles.offerImagebackground}
            >
              <FastImage
                source={Images.cartIcon}
                style={styles.addToCart}
                resizeMode={FastImage.resizeMode.contain}
              />

              {updatedItem.cart_qty > 0 && (
                <View style={styles.productBadge}>
                  <Text style={styles.productBadgeText}>{updatedItem.cart_qty}</Text>
                </View>
              )}
              {/* isProductMatchArray */}
            </TouchableOpacity>
          </View>

          <Spacer space={SH(10)} />
        </View>
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
  const eraseCart = async () => {
    setSelectedCartItems([]);
    dispatch(clearLocalCart());
    dispatch(updateCartLength(0));
    dispatch(getMainProduct());
    setLocalCartArray([]);
    setIsClear(true);
    dispatch(getAllCartReset());
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
      // dispatch(getAllCartReset());
    }
  };

  const isLoadingMore = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ALL_PRODUCT_PAGINATION], state)
  );
  const onLoadMoreProduct = useCallback(() => {
    const totalPages = getRetailData?.getMainProduct?.total_pages;
    const currentPage = getRetailData?.getMainProduct?.current_page;
    if (currentPage < totalPages) {
      const data = {
        page: currentPage + 1,
      };
      dispatch(getMainProductPagination(data));
    }
  }, [getRetailData]);
  // const onLoadMoreProduct = () => {
  //   console.log('sjdhaskdjas', JSON.stringify(getRetailData?.getMainProduct));
  //   // setPage((prevPage) => prevPage + 1);
  //   const totalPages = getRetailData?.getMainProduct?.total_pages;
  //   const currentPage = getRetailData?.getMainProduct?.current_page;
  //   if (currentPage < totalPages) {
  //     // if (!isScrolling) return;
  //     const data = {
  //       // page: page,
  //       page: currentPage + 1,
  //     };
  //     dispatch(getMainProductPagination(data));
  //   }
  // };

  // const debouncedLoadMoreProduct = useDebouncedCallback(onLoadMoreProduct, 300);

  // const renderFooterPost = () => {
  //   return (
  //     <View style={{}}>
  //       {isLoadingMore && (
  //         <ActivityIndicator
  //           style={{ marginVertical: 14 }}
  //           size={'large'}
  //           color={COLORS.blueLight}
  //         />
  //       )}
  //     </View>
  //   );
  // };
  const renderFooterPost = useCallback(
    () => (
      <View
        style={
          {
            // marginBottom: ms(20),
          }
        }
      >
        {isLoadingMore && (
          <ActivityIndicator
            style={{ marginVertical: 14 }}
            size={'large'}
            color={COLORS.blueLight}
          />
        )}
      </View>
    ),
    [isLoadingMore]
  );
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
          <View style={[styles.displayflex2, { flex: 1 }]}>
            <View style={styles.productView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {productCon && getMerchantService?.is_product_exist === true ? (
                  <View style={styles.allProductSection}>
                    <Text style={styles.allProduct}>
                      {strings.posRetail.allProduct} {''}
                      <Text style={styles.productCount}>
                        ({getRetailData?.getMainProduct?.total ?? '0'})
                      </Text>
                    </Text>
                  </View>
                ) : (
                  <View style={styles.allProductSection}>
                    <Text style={styles.allProduct}>
                      {'All Services'}{' '}
                      <Text style={styles.productCount}>
                        ({getRetailData?.getMainServices?.total ?? '0'})
                      </Text>
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
                        placeholderTextColor={COLORS.lavender}
                      />

                      {search?.length > 0 ? (
                        <TouchableOpacity
                          onPress={() => {
                            setSearch(''), dispatch(getMainProduct()), Keyboard.dismiss();
                          }}
                          style={{ marginRight: ms(7) }}
                        >
                          <Image
                            source={cross}
                            style={[styles.sideSearchStyle, styles.crossStyling]}
                          />
                        </TouchableOpacity>
                      ) : null}
                      {/* <TouchableOpacity>
                        <Image source={scn} style={styles.scnStyle} />
                      </TouchableOpacity> */}
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
                        placeholderTextColor={COLORS.lavender}
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
                            ? [styles.prouductAndServiceCon, { backgroundColor: COLORS.navy_blue }]
                            : styles.prouductAndServiceCon
                        }
                        onPress={productHandler}
                      >
                        <Text style={productCon ? styles.productTextBlue : styles.productText}>
                          {'Products'}
                        </Text>
                        <Image source={Images.productsIcon} style={styles.productImageStyle} />
                      </TouchableOpacity>
                    ) : null}
                    {getMerchantService?.is_service_exist ? (
                      <TouchableOpacity
                        style={
                          serviceCon
                            ? [styles.prouductAndServiceCon, { backgroundColor: COLORS.navy_blue }]
                            : styles.prouductAndServiceCon
                        }
                        onPress={serviceHandler}
                      >
                        <Text style={serviceCon ? styles.productTextBlue : styles.productText}>
                          {'Services'}
                        </Text>
                        <Image source={Images.serviceIcon} style={styles.productImageStyle} />
                      </TouchableOpacity>
                    ) : null}
                    {productCon && getMerchantService?.is_product_exist === true ? (
                      <View>
                        <TouchableOpacity
                          style={styles.prouductAndServiceCon}
                          onPress={filterHandler}
                        >
                          <Text
                            style={
                              filterCon
                                ? [styles.productText, { color: COLORS.navy_blue }]
                                : styles.productText
                            }
                          >
                            {'Filter'}
                          </Text>
                          <Image
                            source={Images.filterIcon}
                            style={
                              filterCon
                                ? [styles.productImageStyle, { tintColor: COLORS.navy_blue }]
                                : styles.productImageStyle
                            }
                          />
                          {productFilter > 0 ? (
                            <View style={styles.serviceFilterBadge}>
                              <Text style={styles.filterBadgeText}>{productFilter}</Text>
                            </View>
                          ) : null}
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
                                ? [styles.productText, { color: COLORS.navy_blue }]
                                : styles.productText
                            }
                          >
                            {'Filter'}
                          </Text>
                          <Image
                            source={Images.filterIcon}
                            style={
                              serviceFilterCon
                                ? [styles.productImageStyle, { tintColor: COLORS.primary }]
                                : styles.productImageStyle
                            }
                          />
                          {serviceFilter > 0 ? (
                            <View style={styles.serviceFilterBadge}>
                              <Text style={styles.filterBadgeText}>{serviceFilter}</Text>
                            </View>
                          ) : null}
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
                  data={mainProductArray}
                  extraData={mainProductArray}
                  renderItem={renderItem}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={6}
                  key={6 + 'prds'}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    marginTop: isLoadingMore ? -50 : 0,
                  }}
                  scrollEnabled={true}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={renderFooterPost}
                  onEndReachedThreshold={0.1}
                  onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
                  onMomentumScrollBegin={() => {}}
                  onMomentumScrollEnd={() => {
                    if (onEndReachedCalledDuringMomentum.current) {
                      onLoadMoreProduct();
                      onEndReachedCalledDuringMomentum.current = false;
                    }
                  }}
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
                    const cartMatchService = servicecCart?.find(
                      (data) => data?.product_id === item?.id
                    );
                    return (
                      <View style={styles.serviceCon(cartMatchService?.qty)}>
                        <TouchableOpacity
                          onPress={() => serviceFun(item.id, index)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.avalibleServiceCon}>
                            <FastImage
                              source={{
                                uri: item.image,
                              }}
                              style={styles.serviceImagemain}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                            {cartMatchService?.qty > 0 && (
                              <View style={styles.imageInnerView}>
                                <Image
                                  source={plus}
                                  style={[styles.plusButton, { tintColor: COLORS.white }]}
                                />
                              </View>
                            )}
                          </View>
                          <View style={{ padding: ms(5) }}>
                            <Text
                              numberOfLines={1}
                              style={[styles.productDes, styles.productDesBold]}
                            >
                              {item.name}
                            </Text>
                            <Spacer space={SH(6)} />
                            {item.description && (
                              <Text numberOfLines={2} style={styles.productDes}>
                                {item.description?.replace(/<\/?[^>]+(>|$)|&nbsp;/g, '')}
                              </Text>
                            )}
                            <Spacer space={SH(7)} />
                            <Text numberOfLines={1} style={styles.productPrice}>
                              ${item.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                            </Text>

                            <Spacer space={SH(7)} />
                            <View style={styles.serviceTimeCon}>
                              <Image source={Images.serviceCalendar} style={styles.calendarStyle} />
                              <Text numberOfLines={1} style={styles.serviceTimeText}>
                                Tomorrow at 10:00hrs
                              </Text>
                            </View>
                            <Spacer space={SH(7)} />
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Image source={Images.serviceTime} style={styles.calendarStyle} />
                              {item.supplies?.[0]?.approx_service_time == null ? (
                                <Text numberOfLines={1} style={styles.productDes}>
                                  Estimated Time Not found
                                </Text>
                              ) : (
                                <Text numberOfLines={1} style={styles.productDes}>
                                  Est: {item.supplies?.[0]?.approx_service_time} min
                                </Text>
                              )}
                            </View>
                          </View>
                        </TouchableOpacity>
                        <Spacer space={SH(6)} />
                        <View>
                          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {item?.pos_staff?.map((data, index) => (
                              <Image
                                key={index}
                                source={imageSource(
                                  data?.user?.user_profiles?.profile_photo,
                                  userImage
                                )}
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
                        <Spacer space={SH(6)} />
                      </View>
                    );
                  }}
                  key={5 + 'prds'}
                  keyExtractor={(_, index) => index.toString()}
                  numColumns={5}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    zIndex: -99,
                  }}
                  showsVerticalScrollIndicator={false}
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
                      source={Images.cartIcon}
                      style={
                        cartLength > 0
                          ? [styles.sideBarImage, { tintColor: COLORS.navy_blue }]
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
                  <TouchableOpacity
                    onPress={() => {
                      bulkCart();
                      setNumPadModal((prev) => !prev);
                      setCustomProductOpen('product');
                    }}
                  >
                    <Image source={Images.addProduct} style={styles.sideBarImage} />
                  </TouchableOpacity>

                  <Spacer space={SH(20)} />
                  <TouchableOpacity
                    onPress={() => eraseClearCart()}
                    disabled={cartLength > 0 ? false : true}
                  >
                    <Image
                      source={Images.clearCart}
                      // style={
                      //   cartLength > 0
                      //     ? [styles.sideBarImage]
                      //     : styles.sideBarImage
                      // }
                      style={styles.sideBarImage}
                    />
                  </TouchableOpacity>
                  <Spacer space={SH(20)} />
                  <TouchableOpacity
                    onPress={cartStatusHandler}
                    // disabled={holdProductArray?.length > 0 ? false : true}
                  >
                    <Image
                      source={Images.holdCart}
                      style={
                        holdProductArray?.length > 0
                          ? [styles.sideBarImage, { tintColor: COLORS.navy_blue }]
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
                  style={styles.bucketBackgorund}
                >
                  <Image source={Images.arrowLeftUp} style={styles.mainScreenArrow()} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.rightSideView}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.bucketBackgorund}
                    disabled={serviceCartLength > 0 ? false : true}
                    onPress={() => setServiceCartModal(true)}
                  >
                    <Image
                      source={Images.cartIcon}
                      style={
                        serviceCartLength > 0
                          ? [styles.sideBarImage, { tintColor: COLORS.navy_blue }]
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
                    <TouchableOpacity
                      onPress={() => {
                        setNumPadModal((prev) => !prev);
                        setCustomProductOpen('service');
                      }}
                    >
                      <Image source={Images.addProduct} style={styles.sideBarImage} />
                    </TouchableOpacity>
                  </View>
                  <Spacer space={SH(20)} />
                  <TouchableOpacity
                    onPress={() => dispatch(clearServiceAllCart())}
                    disabled={serviceCartLength > 0 ? false : true}
                  >
                    <Image
                      source={Images.clearCart}
                      // style={
                      //   serviceCartLength > 0
                      //     ? [styles.sideBarImage]
                      //     : styles.sideBarImage
                      // }
                      style={styles.sideBarImage}
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
                      source={Images.holdCart}
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
                  style={styles.bucketBackgorund}
                >
                  <Image source={Images.arrowLeftUp} style={styles.mainScreenArrow()} />
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
        backdropOpacity={0.9}
        backdropColor={COLORS.row_grey}
        onBackdropPress={() => {
          setCartModal(false);
        }}
        onBackButtonPress={() => {
          setCartModal(false);
        }}
      >
        <CartListModal
          cartQtyUpdate={cartQtyUpdate}
          clearCart={eraseClearCart}
          checkOutHandler={() => {
            // bulkCart();
            checkOutHandler();
          }}
          CloseCartModal={() => {
            // bulkCart();
            setCartModal(false);
          }}
          customAddBtn={() => {
            bulkCart();
            setCartModal(false);
            setNumPadModal(true);
            setCustomProductOpen('product');
          }}
        />
      </ReactNativeModal>

      {/* cart list modal end */}

      {/* cart list modal start */}
      <ReactNativeModal
        animationType="fade"
        transparent={true}
        isVisible={numPadModal}
        backdropOpacity={0.9}
        backdropColor={COLORS.row_grey}
        onBackdropPress={() => {
          setNumPadModal(false);
        }}
        onBackButtonPress={() => {
          setNumPadModal(false);
        }}
      >
        <CustomProductAdd
          crossHandler={() => setNumPadModal(false)}
          comeFrom={customProductOpen}
          sellerID={sellerID}
        />
      </ReactNativeModal>

      {/* cart list modal end */}

      {/* cart list modal start */}
      <ReactNativeModal
        animationType="fade"
        transparent={true}
        isVisible={serviceCartModal}
        animationIn={'slideInRight'}
        animationOut={'slideOutRight'}
        backdropOpacity={0.9}
        backdropColor={COLORS.row_grey}
        onBackdropPress={() => {
          setServiceCartModal(false);
        }}
        onBackButtonPress={() => {
          setServiceCartModal(false);
        }}
      >
        {/* {serviceCartModal ? ( */}
        <ServiceCartListModal
          clearCart={() => {
            dispatch(clearServiceAllCart()), setServiceCartModal(false);
          }}
          checkOutHandler={checkOutServiceHandler}
          CloseCartModal={() => setServiceCartModal(false)}
          customAddBtn={() => {
            setServiceCartModal(false);
            setNumPadModal(true);
            setCustomProductOpen('service');
          }}
        />
        {/* ) : (
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            <CustomProductAdd
              crossHandler={() => setNumPadModal(false)}
              comeFrom={customProductOpen}
              sellerID={sellerID}
            />
          </KeyboardAvoidingView>
        )} */}
      </ReactNativeModal>

      {/* cart list modal end */}
      <Modal animationType="fade" transparent={true} isVisible={addCartModal || addCartDetailModal}>
        {addCartDetailModal ? (
          <AddCartDetailModal
            crossHandler={() => setAddCartDetailModal(false)}
            sellerID={sellerID}
            openFrom="main"
            cartQty={selectedItemQty}
            addToLocalCart={onClickAddCart}
            productIndex={productIndex}
            doubleCrossHandler={() => {
              setAddCartDetailModal(false);
              setAddCartModal(false);
            }}
          />
        ) : (
          <AddCartModal
            crossHandler={() => setAddCartModal(false)}
            detailHandler={() => setAddCartDetailModal(true)}
            sellerID={sellerID}
            cartQty={selectedItemQty}
            productIndex={productIndex}
            selectedItem={selectedItem}
            productItem={productItem}
            onClickAddCartModal={onClickAddCartModal}
            addToLocalCart={onClickAddCart}
            backToCartHandler={() => cartScreenHandler()}
            openFrom="main"
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

      {/* <Modal animationType="fade" transparent={true} isVisible={numPadModal} backdropOpacity={0.6}>
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <CustomProductAdd
            crossHandler={() => setNumPadModal(false)}
            comeFrom={customProductOpen}
          />
        </KeyboardAvoidingView>
      </Modal> */}
    </View>
  );
}
