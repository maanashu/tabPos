import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { styles } from './styles';
import { ClothCollection, ProductData } from '@mPOS/constants/enums';
import { COLORS } from '@/theme';
import { ms } from 'react-native-size-matters';
import Search from './Components/Search';
import { Images } from '@mPOS/assets';
import AddProductCart from './Components/AddProductCart';
import { getProduct } from '@mPOS/actions/RetailActions';
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import { isLoadingSelector } from '@mPOS/selectors/StatusSelectors';
import { strings } from '@mPOS/localization';
import ProductDetails from './Components/ProductDetails';
import { FullScreenLoader, Header, ImageView, ScreenWrapper } from '@mPOS/components';
import { debounce } from 'lodash';
import {
  cartRun,
  createBulkcart,
  getBrand,
  getCategory,
  getMainProduct,
  getMainProductPagination,
  getMainProductSuccess,
  getOneProduct,
  getSubCategory,
} from '@/actions/RetailAction';
import { TYPES } from '@/Types/Types';
import { getAuthData } from '@/selectors/AuthSelector';
import Modal from 'react-native-modal';
import ProductFilter from './Components/ProductFilter';
import { Fonts } from '@/assets';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION } from '@common/commonImports';
import { getCartLength, getLocalCartArray } from '@/selectors/CartSelector';
import { addLocalCart, clearLocalCart, updateCartLength } from '@/actions/CartAction';
import { useIsFocused } from '@react-navigation/native';

export function RetailProducts(props) {
  const isFocus = useIsFocused();
  const onEndReachedCalledDuringMomentum = useRef(false);
  const getAuth = useSelector(getAuthData);
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const cartData = retailData?.getAllCart;
  const productCartArray = retailData?.getAllProductCart;
  const productCart = retailData?.getAllCart?.poscart_products ?? [];
  const productCartLength = productCart?.length;
  const productData = retailData?.getMainProduct;
  const addProductCartRef = useRef(null);
  const productDetailRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState('');
  const data = props?.route?.params?.item;
  const [isSelected, setSelected] = useState(false);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [productFilterCount, setProductFilterCount] = useState(0);
  const [rootServiceId, setRootServiceId] = useState(null);
  const [subCategorySelectId, setSubCategorySelectId] = useState(null);
  const LOCAL_CART_ARRAY = useSelector(getLocalCartArray);
  const [localCartArray, setLocalCartArray] = useState(LOCAL_CART_ARRAY);
  const [selectedCartItem, setSelectedCartItems] = useState([]);
  const CART_LENGTH = useSelector(getCartLength);
  const cartLength = CART_LENGTH;
  const [selectedItem, setSelectedItem] = useState();
  const [productIndex, setProductIndex] = useState(0);
  const [selectedItemQty, setSelectedItemQty] = useState();
  const [productItem, setProductItem] = useState(null);
  useEffect(() => {
    setLocalCartArray(LOCAL_CART_ARRAY);
  }, [LOCAL_CART_ARRAY]);

  const productDetailHanlder = () => {
    productDetailRef.current.present();
  };
  const bothSheetClose = () => {
    productDetailRef.current.dismiss();
    addProductCartRef.current.dismiss();
  };
  const [productSearch, setProductSearch] = useState('');
  const [productFilter, setProductFilter] = useState(false);

  useEffect(() => {
    const ids = {
      ...(rootServiceId && { category_ids: rootServiceId }),
      ...(subCategorySelectId && { sub_category_ids: subCategorySelectId }),
    };
    dispatch(getMainProduct(ids));
  }, [rootServiceId, subCategorySelectId]);

  useEffect(() => {
    dispatch(getCategory(sellerID));
    dispatch(getSubCategory(sellerID));
    dispatch(getBrand(sellerID));
  }, []);
  useEffect(() => {
    // dispatch(getProduct({}, 1));
    dispatch(getMainProduct());
  }, []);
  const productLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_MAIN_PRODUCT, TYPES.GET_ALL_PRODUCT_PAGINATION], state)
  );

  const productSearchFun = async (search) => {
    if (search?.length > 2) {
      const searchName = {
        search: search,
      };
      dispatch(getProduct(searchName, 1));
    } else if (search?.length === 0) {
      dispatch(getProduct({}, 1));
    }
  };

  const debounceProduct = useCallback(debounce(productSearchFun, 1000), []);

  const productPagination = {
    total: productData?.total ?? '0',
    totalPages: productData?.total_pages ?? '0',
    perPage: productData?.per_page ?? '0',
    currentPage: productData?.current_page ?? '0',
  };

  const onLoadMoreProduct = useCallback(() => {
    const totalPages = retailData?.getMainProduct?.total_pages;
    const currentPage = retailData?.getMainProduct?.current_page;
    if (currentPage < totalPages) {
      const data = {
        page: currentPage + 1,
      };
      dispatch(getMainProductPagination(data));
    }
  }, [retailData]);

  // locally work function

  useEffect(() => {
    if (isFocus) {
      if (retailData?.getAllCart?.poscart_products?.length > 0) {
        const cartmatchId = retailData?.getAllCart?.poscart_products?.map((obj) => ({
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
    if (retailData?.getAllCart?.poscart_products?.length > 0) {
      const cartmatchId = retailData?.getAllCart?.poscart_products?.map((obj) => ({
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
  const checkAttributes = async (item, index, cartQty) => {
    if (item?.supplies?.[0]?.attributes?.length !== 0) {
      bulkCart();
      const res = await dispatch(getOneProduct(sellerID, item.id));
      if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
        addProductCartRef.current.present();
        setSelectedItemQty(item?.cart_qty);
        setSelectedItem(item);
        setProductIndex(index);
        setProductItem(item);
      }
    } else {
      onClickAddCart(item, index, cartQty);
    }
  };
  const onClickAddCart = (item, index, cartQty, supplyVarientId) => {
    const mainProductArray = retailData?.getMainProduct;
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

    mainProductArray.data[index].cart_qty += 1;
    dispatch(getMainProductSuccess(mainProductArray));
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

  const renderRootServiceItem = ({ item, index }) => {
    const color = item.id === rootServiceId ? COLORS.primary : COLORS.darkGray;
    const fonts = item.id === rootServiceId ? Fonts.SemiBold : Fonts.Regular;
    return (
      <RootServiceItem
        item={item}
        onPress={() =>
          rootServiceId === item.id ? setRootServiceId(null) : setRootServiceId(item.id)
        }
        textColor={color}
        fonts={fonts}
      />
    );
  };

  const RootServiceItem = ({ item, onPress, textColor, fonts }) => (
    <TouchableOpacity onPress={onPress} style={[styles.categoryMainView]}>
      <Text style={[styles.categoryTitleText, { color: textColor, fontFamily: fonts }]}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSubCategoryItem = ({ item, index }) => {
    const color = item.id === subCategorySelectId ? COLORS.primary : COLORS.darkGray;
    const fonts = item.id === subCategorySelectId ? Fonts.SemiBold : Fonts.Regular;
    return (
      <SubCategoryItem
        item={item}
        onPress={() =>
          subCategorySelectId === item.id
            ? setSubCategorySelectId(null)
            : setSubCategorySelectId(item.id)
        }
        textColor={color}
        fonts={fonts}
      />
    );
  };
  const SubCategoryItem = ({ item, onPress, textColor, fonts }) => (
    <TouchableOpacity onPress={onPress} style={[styles.categoryMainView]}>
      <Text style={[styles.categoryTitleText, { color: textColor, fontFamily: fonts }]}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item, index }) => {
    const isProductMatchArray = localCartArray?.find((data) => data.product_id === item.id);
    const cartAddQty = isProductMatchArray?.qty;

    const updatedItem = { ...item };
    if (cartAddQty !== undefined) {
      updatedItem.cart_qty = cartAddQty;
    }
    return (
      <TouchableOpacity
        onPress={async () => {
          const res = await dispatch(getOneProduct(sellerID, item.id));
          if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
            addProductCartRef.current.present();
            setSelectedItemQty(updatedItem?.cart_qty);
            setSelectedItem(item);
            setProductIndex(index);
            setProductItem(item);
          }
        }}
        style={[styles.productDetailMainView, { marginTop: index === 0 ? ms(0) : ms(5) }]}
      >
        <View style={styles.imageDetailView}>
          {/* <Image source={{ uri: item?.image }} style={styles.productImageStyle} /> */}
          <ImageView
            imageUrl={item?.image}
            style={styles.productImageStyle}
            imageStyle={{ borderRadius: ms(5) }}
          />
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <Text style={styles.productNameText} numberOfLines={1}>
              {item?.name}
            </Text>
            <Text style={styles.genderTextStyle} numberOfLines={1}>
              {item?.category?.name}
            </Text>
            <Text style={styles.priceTextStyle} numberOfLines={1}>
              ${item?.supplies?.[0]?.supply_prices?.[0]?.selling_price}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addView()}
          // onPress={async () => {
          //   const res = await dispatch(getOneProduct(sellerID, item.id));
          //   if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
          //     addProductCartRef.current.present();
          //   }
          // }}
          onPress={() => checkAttributes(item, index, cartAddQty)}
        >
          <Image
            source={Images.addTitle}
            resizeMode="contain"
            style={[
              styles.addImage,
              {
                tintColor: index === 0 ? COLORS.darkBlue : COLORS.dark_grey,
              },
            ]}
          />
        </TouchableOpacity>
        {updatedItem.cart_qty > 0 && (
          <TouchableOpacity style={styles.countView}>
            <Text style={styles.countText}>{updatedItem.cart_qty}</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  const isLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ONE_PRODUCT, TYPES.ADDCART, TYPES.GET_ALL_CART], state)
  );
  const categoryLoad = useSelector((state) => isLoadingSelector([TYPES.GET_CATEGORY], state));
  const subCategoryLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_SUB_CATEGORY], state)
  );

  useEffect(() => {
    if (!isFocus) {
      dispatch(getMainProduct());
    }
  }, [isFocus]);

  const onClickAddCartModal = (item, index, cartQty) => {
    const mainProductArray = retailData?.getMainProduct;

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

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={{ backgroundColor: COLORS.white }}>
          <Header
            backRequired
            backFunction={() => {
              bulkCart();
              goBack();
            }}
            title={`Back`}
            cartIcon
            cartHandler={() => {
              bulkCart();
              dispatch(cartRun('product'));
              navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.cart });
            }}
            cartLength={cartLength}
          />
          {categoryLoad ? (
            <View style={[styles.contentContainerStyle, { height: ms(20) }]}>
              <Text style={styles.loading}>{'Loading...'}</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={retailData?.categoryList ?? []}
              renderItem={renderRootServiceItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={styles.contentContainerStyle}
            />
          )}

          <View style={styles.lineSeprator} />
          <View
            style={{
              borderWidth: 0.5,
              paddingHorizontal: ms(10),
              flex: 0.6,
              borderColor: COLORS.washGrey,
              backgroundColor: COLORS.washGrey,
            }}
          />
          {subCategoryLoad ? (
            <View style={[styles.contentContainerStyle, { height: ms(20) }]}>
              <Text style={styles.loading}>{'Loading...'}</Text>
            </View>
          ) : (
            <FlatList
              horizontal
              data={retailData?.subCategories ?? []}
              renderItem={renderSubCategoryItem}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={styles.contentContainerStyle}
            />
          )}
        </View>

        <Search
          value={productSearch}
          onChangeText={(productSearch) => {
            setProductSearch(productSearch);
            debounceProduct(productSearch);
          }}
          filterHandler={() => setProductFilter(true)}
          selectFilterCount={productFilterCount}
        />

        {/* <Spacer space={SH(15)} /> */}

        <FlatList
          data={productData?.data ?? []}
          extraData={productData?.data ?? []}
          renderItem={renderProductItem}
          keyExtractor={(item, index) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 10,
          }}
          ListEmptyComponent={() => (
            <View style={styles.noProductCon}>
              <Text style={styles.noProduct}>{strings.retail.noProduct}</Text>
            </View>
          )}
          onEndReachedThreshold={0.1}
          onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
          onMomentumScrollBegin={() => {}}
          onMomentumScrollEnd={() => {
            if (onEndReachedCalledDuringMomentum.current) {
              onLoadMoreProduct();
              onEndReachedCalledDuringMomentum.current = false;
            }
          }}
          removeClippedSubviews={true}
          ListFooterComponent={() => (
            <View>{productLoad && <ActivityIndicator size="large" color={COLORS.darkBlue} />}</View>
          )}
        />

        <AddProductCart
          {...{
            addProductCartRef,
            productDetailHanlder,
            onClickAddCartModal,
            selectedItem,
            productIndex,
            productItem,
          }}
          cartQty={selectedItemQty}
          addToLocalCart={onClickAddCart}
        />
        <ProductDetails {...{ productDetailRef, bothSheetClose }} />
        <Modal
          style={{ margin: 0 }}
          animationType="fade"
          transparent={true}
          isVisible={productFilter}
          onBackdropPress={() => setProductFilter(false)}
          animationIn="slideInRight"
          animationOut="slideOutRight"
        >
          <ProductFilter
            crossHandler={() => setProductFilter(false)}
            productFilterCount={setProductFilterCount}
            backfilterValue={productFilterCount}
          />
          {/* <NewCustomerAdd /> */}
        </Modal>

        {isLoading ? <FullScreenLoader /> : null}
      </View>
    </ScreenWrapper>
  );
}
