import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import {
  addToCart,
  addToCartBlue,
  bucket,
  categoryMenu,
  cloth,
  clothes,
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
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { TYPES } from '@/Types/Types';
import {
  addToServiceCart,
  addTocart,
  clearAllCart,
  clearServiceAllCart,
  getBrand,
  getCategory,
  getMainProduct,
  getMainServices,
  getOneProduct,
  getSubCategory,
} from '@/actions/RetailAction';
import { getRetail } from '@/selectors/RetailSelectors';
import { useIsFocused } from '@react-navigation/native';
import { CartListModal } from './CartListModal';
import { log } from 'react-native-reanimated';
import { ms } from 'react-native-size-matters';

export function MainScreen({
  cartScreenHandler,
  checkOutHandler,
  categoryArray,
  sellerID,
  productArray,
  cartServiceScreenHandler,
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
  const cartLength = cartData?.poscart_products?.length;
  const serviceCartData = getRetailData?.getserviceCart;
  const serviceCartLength = serviceCartData?.appointment_cart_products?.length;
  let arr = [getRetailData?.getAllCart];
  const [cartModal, setCartModal] = useState(false);
  const [search, setSearch] = useState('');

  const [showProductsFrom, setshowProductsFrom] = useState();

  const mainProductArray = getRetailData?.getMainProduct?.data;
  const mainServicesArray = getRetailData?.getMainServices?.data;

  const cartmatchId = getRetailData?.getAllCart?.poscart_products?.map((obj) => ({
    product_id: obj.product_id,
    qty: obj.qty,
  }));
  const [productServiceType, setProductServiceType] = useState(1);
  const [cateoryView, setCateoryView] = useState(false);
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
  }, []);

  const onChangeFun = (search) => {
    setSearch(search);
    if (search?.length > 3) {
      const searchName = {
        search: search,
      };
      dispatch(getMainProduct(searchName));
    } else if (search?.length >= 3) {
      dispatch(getMainProduct());
    }
  };
  const isProductLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_MAIN_PRODUCT], state)
  );

  const filterMenuData = JSON.parse(JSON.stringify(catTypeData));

  const [filterMenuTitle, setfilterMenuTitle] = useState(filterMenuData);

  const [isFilterDataSeclectedOfIndex, setisFilterDataSeclectedOfIndex] = useState();

  const [selectedCatID, setselectedCatID] = useState(null);
  const [selectedSubCatID, setselectedSubCatID] = useState(null);
  const [selectedBrandID, setselectedBrandID] = useState(null);
  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAdd, setUserAdd] = useState('');

  const [page, setPage] = useState(1);

  const [productCon, setProductCon] = useState(true);
  const [serviceCon, setServiceCon] = useState(false);
  const [filterCon, setFilterCon] = useState(false);

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

  const [showCart, setShowCart] = useState(getRetailData?.trueCart?.state || false);

  const onClickAddCart = (item) => {
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

  const onClickServiceCart = (item) => {
    const data = {
      seller_id: sellerID,
      supplyId: item?.supplies?.[0]?.id,
      supplyPriceID: item?.supplies?.[0]?.supply_prices[0]?.id,
      product_id: item?.id,
    };
    dispatch(addToServiceCart(data));
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

  const userInputClear = () => {
    setUserEmail('');
    setUserName('');
    // setCustomerPhoneNo('');
    setUserAdd('');
  };
  const onCloseCartModal = () => {
    setCartModal(false);
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
            dispatch(getCategory(sellerID));
          } else if (
            item.id === 2
            // && isFilterDataSeclectedOfIndex === 0) ||
            // item.isSelected === true
          ) {
            setCatTypeId(item.id);
            dispatch(getSubCategory(sellerID));
            setSubCategoryModal(true);
          } else if (
            item.id === 3
            //  && isFilterDataSeclectedOfIndex === 1
          ) {
            setBrandModal(true);
            setCatTypeId(item.id);
            dispatch(getBrand(sellerID));
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
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.chooseCat} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.listed}>{'0'} listed</Text>
      </View>

      <FastImage
        source={categoryMenu}
        style={[
          styles.categoryMenu,
          { tintColor: item.isSelected ? COLORS.solid_green : COLORS.black },
        ]}
        resizeMode={FastImage.resizeMode.contain}
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

  const Item = ({ item }) => {
    const isProductMatchArray = cartmatchId?.find((data) => data.product_id === item.id);
    const cartAddQty = isProductMatchArray?.qty;
    return (
      <TouchableOpacity
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
        {/* <Text numberOfLines={1} style={styles.productDes}>
        short cardigan
      </Text> */}
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
            <Image
              source={isProductMatchArray ? addToCartBlue : addToCart}
              style={styles.addToCart}
            />
            {isProductMatchArray ? (
              <View style={styles.productBadge}>
                <Text style={styles.productBadgeText}>{cartAddQty}</Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const ProductServiceItem = ({ item, color, onPress, index }) => (
    <TouchableOpacity
      style={[styles.prouductAndServiceCon, { borderColor: color }]}
      onPress={onPress}
    >
      {index === 2 ? (
        <>
          <Text style={[styles.productText, { color: color }]}>{item.title}</Text>
          <Image source={item.image} style={[styles.productImageStyle, { tintColor: color }]} />
        </>
      ) : (
        <>
          <Image source={item.image} style={[styles.productImageStyle, { tintColor: color }]} />
          <Text style={[styles.productText, { color: color }]}>{item.title}</Text>
        </>
      )}
    </TouchableOpacity>
  );

  const prouductServiceFun = (index) => {
    if (index === 2) {
      setCateoryView(!cateoryView);
    }
  };

  const productHandler = () => {
    setProductCon(true);
    setServiceCon(false);
  };
  const serviceHandler = () => {
    setServiceCon(true);
    setProductCon(false);
  };
  const filterHandler = () => {
    setFilterCon(!filterCon);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.homeScreenCon}>
        <CustomHeader iconShow={showCart ? true : false} crossHandler={() => setShowCart(false)} />
        <View style={styles.displayflex2}>
          <View style={styles.productView}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {productCon ? (
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
              {/* <View>
                <FlatList
                  data={filterMenuTitle}
                  extraData={filterMenuTitle}
                  renderItem={catTypeRenderItem}
                  keyExtractor={(item) => item.id}
                  horizontal
                  // contentContainerStyle={styles.contentContainer}
                />
              </View> */}
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
                      <Image source={cross} style={[styles.sideSearchStyle, styles.crossStyling]} />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
              <View>
                {/* <FlatList
                  data={productServiceFilter}
                  keyExtractor={(item) => item.id}
                  horizontal
                  renderItem={({ item, index }) => {
                    const color = item.id === productServiceType ? COLORS.primary : COLORS.darkGray;

                    return (
                      <ProductServiceItem
                        item={item}
                        onPress={() => {
                          setProductServiceType(item.id), prouductServiceFun(index);
                        }}
                        color={color}
                        index={index}
                      />
                    );
                  }}
                /> */}
                <View style={styles.displayflex}>
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
                      style={productCon ? styles.productImageStyleBlue : styles.productImageStyle}
                    />
                    <Text style={productCon ? styles.productTextBlue : styles.productText}>
                      {'Products'}
                    </Text>
                  </TouchableOpacity>

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
                      style={serviceCon ? styles.productImageStyleBlue : styles.productImageStyle}
                    />
                    <Text style={serviceCon ? styles.productTextBlue : styles.productText}>
                      {'Services'}
                    </Text>
                  </TouchableOpacity>

                  <View>
                    <TouchableOpacity style={styles.prouductAndServiceCon} onPress={filterHandler}>
                      <Text style={styles.productText}>{'Filter'}</Text>
                      <Image source={filter} style={styles.productImageStyle} />
                    </TouchableOpacity>
                    {filterCon ? (
                      <View style={styles.categoryFilterCon}>
                        <Text>In progress</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
            <Spacer space={SH(10)} />
            {/* <View style={styles.hr} /> */}
            <Spacer space={SH(10)} />

            {productCon ? (
              isProductLoading ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                <FlatList
                  data={mainProductArray}
                  extraData={mainProductArray}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index}
                  numColumns={7}
                  contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between',
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
              )
            ) : isProductLoading ? (
              <View style={{ marginTop: 100 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : (
              <FlatList
                data={mainServicesArray}
                extraData={mainServicesArray}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.productCon}
                      // onPress={() => productFun(item.id)}
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

                      <Text numberOfLines={2} style={styles.productDes}>
                        {item.name}
                      </Text>
                      <Spacer space={SH(6)} />
                      <Text numberOfLines={1} style={styles.productSubHead}>
                        Est: 45 ~ 50 min
                      </Text>
                      <Spacer space={SH(6)} />
                      <Image
                        source={multipleImag}
                        style={{ width: ms(50), height: ms(15), resizeMode: 'cover' }}
                      />
                      <View style={styles.displayflex}>
                        <Text numberOfLines={1} style={styles.productPrice}>
                          ${item.supplies?.[0]?.supply_prices?.[0]?.selling_price}
                        </Text>
                        <TouchableOpacity onPress={() => onClickServiceCart(item)}>
                          <Image source={addToCart} style={styles.addToCart} />
                          {/* {isProductMatchArray ? (
                          <View style={styles.productBadge}>
                            <Text style={styles.productBadgeText}>{cartAddQty}</Text>
                          </View>
                        ) : null} */}
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item, index) => index}
                numColumns={7}
                contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'space-between',
                  zIndex: -99,
                }}
                scrollEnabled={true}
                ListEmptyComponent={() => (
                  <View style={styles.noProductText}>
                    <Text style={[styles.emptyListText, { fontSize: SF(25) }]}>
                      {strings.valiadtion.noProduct}
                    </Text>
                  </View>
                )}
                style={{ zIndex: -99 }}
              />
            )}
          </View>
          {productCon ? (
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
                <Image source={sideKeyboard} style={styles.sideBarImage} />
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
                <View>
                  <Image source={holdCart} style={styles.sideBarImage} />
                  <View style={styles.holdBadge}>
                    <Text style={styles.holdBadgetext}>0</Text>
                  </View>
                </View>
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
          />
        )}
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
