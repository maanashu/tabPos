import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Text, View } from 'react-native';

import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import {
  addDiscountPic,
  addToCart,
  borderCross,
  categoryMenu,
  checkArrow,
  email,
  keyboard,
  location,
  minus,
  notess,
  ok,
  Phone_light,
  plus,
  rightBack,
  search_light,
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
import { log } from 'react-native-reanimated';

export function MainScreen({
  checkOutHandler,
  headercrossHandler,
  productArray,
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
  let arr = [getRetailData?.getAllCart];

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

  const [okk, setOkk] = useState(getRetailData?.trueCustomer?.state || false);

  const [productDetail, setProductDetail] = useState();

  const isProductLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_PRODUCT_DEF, TYPES.GET_PRODUCT], state)
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
  const phoneNumberSearchFun = customerPhoneNo => {
    if (customerPhoneNo?.length > 9) {
      // checkOutHandler();
      dispatch(getUserDetail(customerPhoneNo));
      Keyboard.dismiss();
    } else if (customerPhoneNo?.length < 10) {
      dispatch(getUserDetailSuccess([]));
    }
  };

  useEffect(() => {
    // dispatch(customerNumber({ number: '' }));
    // dispatch(getUserDetailSuccess([]));
    setfilterMenuTitle(originalFilterData);
    setisFilterDataSeclectedOfIndex(null);
    setTimeout(() => {
      setshowProductsFrom(productArray);
    }, 1000);
  }, [isFocus]);

  useEffect(() => {
    dispatch(getProductDefault(sellerID, page));
    if (products) {
      setshowProductsFrom(products);
    }
  }, [products]);

  // paginatio  section start

  const handleMoreData = () => {
    setPage(prevPage => prevPage + 1);
    dispatch(getProductDefault(sellerID, page));
  };

  // paginatio  section end

  const productFun = async productId => {
    const res = await dispatch(getOneProduct(sellerID, productId));
    if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
      setAddCartModal(true);
    }
  };
  const removeOneCartHandler = productId => {
    const data = {
      cartId: cartData?.id,
      productId: productId,
    };
    dispatch(clearOneCart(data));
  };

  const addCustomerHandler = () => {
    if (!userName) {
      Toast.show({
        position: 'top',
        type: 'error_toast',
        text2: 'Please enter user Name',
        visibilityTime: 2000,
      });
    } else if (!userEmail) {
      Toast.show({
        position: 'top',
        type: 'error_toast',
        text2: 'Please enter user Email',
        visibilityTime: 2000,
      });
    } else if (userEmail && emailReg.test(userEmail) === false) {
      Toast.show({
        position: 'top',
        type: 'error_toast',
        text2: 'Please enter valid Email',
        visibilityTime: 2000,
      });
    } else if (!userAdd) {
      Toast.show({
        position: 'top',
        type: 'error_toast',
        text2: 'Please enter user Address',
        visibilityTime: 2000,
      });
    } else {
      const data = {
        userPhoneNo: customerPhoneNo,
        userFirstname: userName,
        userEmailAdd: userEmail,
      };
      dispatch(sendInvitation(data));
      userInputClear();
    }
  };
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

  const changeView = () => {
    if (getuserDetailByNo?.length > 0) {
      return (
        <View>
          <View style={styles.nameAddSingleCon}>
            <View style={styles.displayRow}>
              <Image source={terryProfile} style={styles.Phonelight} />
              <Text style={styles.terryText}>
                {getuserDetailByNo?.[0]?.first_name}
              </Text>
            </View>
          </View>
          <View style={styles.nameAddSingleCon}>
            <View style={styles.displayRow}>
              <Image source={Phone_light} style={styles.Phonelight} />
              <Text style={styles.terryText}>
                {getuserDetailByNo?.[0]?.phone_number}
              </Text>
            </View>
          </View>
          <View style={styles.nameAddSingleCon}>
            <View style={styles.displayRow}>
              <Image source={email} style={styles.Phonelight} />
              <Text style={styles.terryText}>
                {getuserDetailByNo?.[0]?.email}
              </Text>
            </View>
          </View>
          <View style={styles.nameAddSingleCon}>
            <View style={styles.displayRow}>
              <Image source={location} style={styles.Phonelight} />
              <Text style={styles.terryText} numberOfLines={1}>
                {getuserDetailByNo?.[0]?.city},{getuserDetailByNo?.[0]?.address}
                ,{getuserDetailByNo?.[0]?.state} {getuserDetailByNo?.[0]?.zip}
              </Text>
            </View>
          </View>
          {okk ? (
            <TouchableOpacity
              style={styles.okButtonCon}
              // onPress={() => setStoreUser(getuserDetailByNo?.[0])}
              onPress={() => {
                dispatch(getUserDetailSuccess([]));
                setOkk(false);
              }}
            >
              <Text style={[styles.okText]}>Cancel Customer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.okButtonCon}
              // onPress={() => setStoreUser(getuserDetailByNo?.[0])}
              onPress={() => {
                setOkk(!okk), dispatch(customerTrue({ state: true }));
              }}
            >
              <Image source={ok} style={styles.lockLight} />
              <Text style={[styles.okText]}>{strings.dashboard.ok}</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else if (
      getuserDetailByNo?.length === 0 &&
      // sendInventer &&
      customerPhoneNo?.length > 9
    ) {
      return (
        <View>
          <View
            style={[
              styles.sideBarInputWraper,
              { backgroundColor: COLORS.textInputBackground },
            ]}
          >
            <View style={styles.displayRow}>
              <View>
                <Image source={terryProfile} style={styles.sideSearchStyle} />
              </View>
              <TextInput
                placeholder="Name"
                style={styles.sideBarsearchInput}
                value={userName}
                onChangeText={setUserName}
                placeholderTextColor={COLORS.gerySkies}
              />
            </View>
          </View>
          {/* <View
          style={[
            styles.sideBarInputWraper,
            { backgroundColor: COLORS.textInputBackground },
          ]}
        >
          <View style={styles.displayRow}>
            <View>
              <Image source={Phone_light} style={styles.sideSearchStyle} />
            </View>
            <TextInput
              placeholder="Phone Number"
              style={styles.sideBarsearchInput}
              keyboardType="numeric"
              value={userPhoneNo}
              onChangeText={setUserPhoneNo}
              placeholderTextColor={COLORS.gerySkies}
            />
          </View>
        </View> */}
          <View
            style={[
              styles.sideBarInputWraper,
              { backgroundColor: COLORS.textInputBackground },
            ]}
          >
            <View style={styles.displayRow}>
              <View>
                <Image source={email} style={styles.sideSearchStyle} />
              </View>
              <TextInput
                placeholder="Email Address"
                style={styles.sideBarsearchInput}
                value={userEmail}
                onChangeText={setUserEmail}
                placeholderTextColor={COLORS.gerySkies}
              />
            </View>
          </View>
          <View
            style={[
              styles.sideBarInputWraper,
              { backgroundColor: COLORS.textInputBackground },
            ]}
          >
            <View style={styles.displayRow}>
              <View>
                <Image source={location} style={styles.sideSearchStyle} />
              </View>
              <TextInput
                placeholder="Address"
                style={styles.sideBarsearchInput}
                value={userAdd}
                onChangeText={setUserAdd}
                placeholderTextColor={COLORS.gerySkies}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={addCustomerHandler}
            style={[styles.okButtonCon, { backgroundColor: COLORS.dark_grey }]}
          >
            <Text style={[styles.okText]}>Add Customer</Text>
          </TouchableOpacity>
        </View>
      );
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
          } else if (
            (item.id === 2 && isFilterDataSeclectedOfIndex === 0) ||
            item.isSelected === true
          ) {
            setCatTypeId(item.id);
            dispatch(getSubCategory(sellerID, selectedCatID));
            setSubCategoryModal(true);
          } else if (item.id === 3 && isFilterDataSeclectedOfIndex === 1) {
            setCatTypeId(item.id);
            dispatch(getBrand(sellerID, selectedSubCatID));
            setBrandModal(true);
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
          { tintColor: item.isSelected && COLORS.solid_green },
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
          {/* {`$${item?.price}`} */}$
          {item.supplies?.[0]?.supply_prices?.[0]?.selling_price}
        </Text>
        <TouchableOpacity onPress={() => onClickAddCart(item)}>
          <Image source={addToCart} style={styles.addToCart} />
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={styles.homeScreenCon}>
        <CustomHeader
          iconShow={showCart ? true : false}
          crossHandler={() => setShowCart(false)}
        />

        <View style={styles.displayflex2}>
          {showCart ? (
            <View style={styles.itemLIistCon}>
              <Spacer space={SH(3)} />
              <View style={styles.displayflex}>
                <TouchableOpacity
                  style={styles.backProScreen}
                  // onPress={() => {
                  //   crossHandler();
                  //   dispatch(getUserDetailSuccess([]));
                  // }}
                  onPress={() => setShowCart(false)}
                >
                  <Image source={rightBack} style={styles.arrowStyle} />
                  <Text style={[styles.holdCart, { color: COLORS.dark_grey }]}>
                    {strings.posRetail.backProdscreen}
                  </Text>
                </TouchableOpacity>
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
              <View style={styles.blueListHeader}>
                <View style={styles.displayflex}>
                  <View style={[styles.tableListSide, styles.listLeft]}>
                    <Text
                      style={[styles.cashLabelWhite, styles.cashLabelWhiteHash]}
                    >
                      #
                    </Text>
                    <Text style={styles.cashLabelWhite}>Item</Text>
                  </View>
                  <View style={[styles.tableListSide, styles.tableListSide2]}>
                    <Text style={styles.cashLabelWhite}>Unit Price</Text>
                    <Text style={styles.cashLabelWhite}>Quantity</Text>
                    <Text style={styles.cashLabelWhite}>Line Total</Text>
                    <Text style={{ color: COLORS.primary }}>1</Text>
                  </View>
                </View>
              </View>
              {arr?.map((item, index) => (
                <>
                  {item?.poscart_products?.map((data, ind) => (
                    <View style={styles.blueListData} key={ind}>
                      <View style={styles.displayflex}>
                        <View style={[styles.tableListSide, styles.listLeft]}>
                          <Text
                            style={[
                              styles.blueListDataText,
                              styles.cashLabelWhiteHash,
                            ]}
                          >
                            {ind + 1}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              source={{ uri: data.product_details?.image }}
                              style={styles.columbiaMen}
                            />
                            <View style={{ marginLeft: 10 }}>
                              <Text
                                style={[
                                  styles.blueListDataText,
                                  { width: SW(80) },
                                ]}
                                numberOfLines={1}
                              >
                                {data.product_details?.name}
                              </Text>
                              <Text style={styles.sukNumber}>
                                SUK: {data?.product_details?.sku}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View
                          style={[styles.tableListSide, styles.tableListSide2]}
                        >
                          <Text style={styles.blueListDataText}>
                            $
                            {
                              data?.product_details?.supply?.supply_prices
                                ?.selling_price
                            }
                          </Text>
                          <View style={styles.listCountCon}>
                            <TouchableOpacity
                              style={{
                                width: SW(10),
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                updateQuantity(item?.id, data?.id, '-')
                              }
                            >
                              <Image source={minus} style={styles.minus} />
                            </TouchableOpacity>
                            {isLoading ? (
                              <ActivityIndicator
                                size="small"
                                color={COLORS.primary}
                              />
                            ) : (
                              <Text>{data.qty}</Text>
                            )}
                            <TouchableOpacity
                              style={{
                                width: SW(10),
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                updateQuantity(item?.id, data?.id, '+')
                              }
                            >
                              <Image source={plus} style={styles.minus} />
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.blueListDataText}>
                            $
                            {(
                              data.product_details?.supply?.supply_prices
                                ?.selling_price * data?.qty
                            ).toFixed(2)}
                          </Text>
                          <TouchableOpacity
                            style={{
                              width: SW(8),
                              height: SH(40),
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => removeOneCartHandler(data.id)}
                          >
                            <Image
                              source={borderCross}
                              style={styles.borderCross}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}
                </>
              ))}

              <Spacer space={SH(7)} />
            </View>
          ) : (
            <View style={styles.itemLIistCon}>
              <View>
                <FlatList
                  data={filterMenuTitle}
                  extraData={filterMenuTitle}
                  renderItem={catTypeRenderItem}
                  keyExtractor={item => item.id}
                  horizontal
                  contentContainerStyle={styles.contentContainer}
                />
              </View>
              <Spacer space={SH(15)} />
              <View style={styles.displayflex}>
                <Text style={styles.allProduct}>
                  All Products{' '}
                  <Text style={styles.allProductCount}>
                    ({productArray?.length ?? '0'})
                  </Text>
                </Text>
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

              <Spacer space={SH(15)} />
              <View style={styles.productBodyCon}>
                <View style={styles.productListHeight}>
                  {isProductLoading ? (
                    <View style={{ marginTop: 100 }}>
                      <ActivityIndicator
                        size="large"
                        color={COLORS.indicator}
                      />
                    </View>
                  ) : productArray?.length === 0 ? (
                    <View style={styles.noProductText}>
                      <Text
                        style={[styles.emptyListText, { fontSize: SF(25) }]}
                      >
                        {strings.valiadtion.noProduct}
                      </Text>
                    </View>
                  ) : (
                    <FlatList
                      data={showProductsFrom || productArray}
                      renderItem={renderItem}
                      keyExtractor={(item, index) => index}
                      extraData={showProductsFrom}
                      numColumns={5}
                      // onEndReached={handleMoreData}
                      // onEndReachedThreshold={0.1}
                      // ListFooterComponent={() => {
                      //   return (
                      //     <ActivityIndicator
                      //       size="large"
                      //       color={COLORS.primary}
                      //     />
                      //   );
                      // }}

                      // horizontal
                      // contentContainerStyle={{
                      //   flexGrow: 1,
                      //   justifyContent: 'space-between',
                      // }}
                    />
                  )}
                </View>
              </View>
            </View>
          )}

          <View
            pointerEvents={cartData?.length === 0 ? 'none' : 'auto'}
            style={[
              styles.rightSideCon,
              { opacity: cartData?.length === 0 ? 0.1 : 1 },
            ]}
          >
            <View style={styles.displayflex}>
              <Image source={keyboard} style={styles.keyboard} />
              <TouchableOpacity
                style={styles.holdCartCon}
                //   onPress={() => setProductdetailModal(true)}
              >
                {/* <Image source={pause} style={styles.pause} /> */}

                <Text style={styles.holdCart}>
                  {strings.dashboard.holdCart}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.holdCartCon, styles.dark_greyBg]}
                onPress={() => {
                  dispatch(clearAllCart()), setShowCart(false);
                }}
              >
                {/* <Image source={eraser} style={styles.pause} /> */}
                <Text style={styles.holdCart}>
                  {strings.dashboard.clearcart}
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles.nameAddCon}>
              <View style={styles.sideBarInputWraper}>
                <View style={styles.displayRow}>
                  <View>
                    <Image
                      source={search_light}
                      style={styles.sideSearchStyle}
                    />
                  </View>
                  <TextInput
                    placeholder="803-238-2630"
                    style={styles.sideBarsearchInput}
                    keyboardType="numeric"
                    value={customerPhoneNo}
                    onChangeText={customerPhoneNo => {
                      setCustomerPhoneNo(customerPhoneNo);
                      phoneNumberSearchFun(customerPhoneNo);
                    }}
                    placeholderTextColor={COLORS.solid_grey}
                    maxLength={10}
                  />
                </View>
              </View>
              {userDetalLoader ? (
                <View style={{ marginTop: 40, alignSelf: 'center' }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : (
                changeView()
              )}
              {/* <View style={styles.nameAddSingleCon}>
                <View style={styles.displayRow}>
                  <Image source={terryProfile} style={styles.Phonelight} />
                  <Text style={styles.terryText}>Terry Moore</Text>
                </View>
              </View>
              <View style={styles.nameAddSingleCon}>
                <View style={styles.displayRow}>
                  <Image source={Phone_light} style={styles.Phonelight} />
                  <Text style={styles.terryText}>803-238-2630</Text>
                </View>
              </View>
              <View style={styles.nameAddSingleCon}>
                <View style={styles.displayRow}>
                  <Image source={email} style={styles.Phonelight} />
                  <Text style={styles.terryText}>
                    mailto:harryrady@jourrapide.com
                  </Text>
                </View>
              </View>
              <View style={styles.nameAddSingleCon}>
                <View style={styles.displayRow}>
                  <Image source={location} style={styles.Phonelight} />
                  <Text style={styles.terryText}>4849 Owagner Lane</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.okButtonCon}>
                <Image source={ok} style={styles.lockLight} />
                <Text style={[styles.okText]}>{strings.dashboard.ok}</Text>
              </TouchableOpacity> */}
            </View>
            <Spacer space={SH(10)} />
            <View
              style={{
                borderWidth: 1,
                //   borderStyle: 'dashed',
                borderColor: COLORS.solidGrey,
              }}
            />
            <Spacer space={SH(10)} />
            <View style={styles.displayflex}>
              <TouchableOpacity
                style={styles.addDiscountCon}
                onPress={addDiscountHandler}
              >
                <Image source={addDiscountPic} style={styles.addDiscountPic} />
                <Text style={styles.addDiscountText}>Add Discount</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addDiscountCon}
                onPress={addNotesHandler}
              >
                <Image source={notess} style={styles.addDiscountPic} />
                <Text style={styles.addDiscountText}>Add Notes</Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(10)} />
            <View style={styles.totalItemCon}>
              <Text style={styles.totalItem}>
                {strings.dashboard.totalItem}{' '}
                {cartData?.poscart_products?.length}
              </Text>
            </View>
            <Spacer space={SH(5)} />
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.subTotal}>Sub Total</Text>
              <Text style={styles.subTotalDollar}>
                ${cartData?.amount?.products_price ?? '0.00'}
              </Text>
            </View>
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.subTotal}>Total VAT</Text>
              <Text style={styles.subTotalDollar}>$0.00</Text>
            </View>
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.subTotal}>Total Taxes</Text>
              <Text style={styles.subTotalDollar}>
                ${cartData?.amount?.tax ?? '0.00'}
              </Text>
            </View>
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.subTotal}>Discount</Text>
              <Text style={[styles.subTotalDollar, { color: COLORS.red }]}>
                $
                {cartData?.amount?.discount === 0
                  ? '0.00'
                  : cartData?.amount?.discount.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: COLORS.solidGrey,
              }}
            />
            <Spacer space={SH(5)} />
            <View style={[styles.displayflex2, styles.paddVertical]}>
              <Text style={styles.itemValue}>Item value</Text>
              <Text style={[styles.subTotalDollar, styles.itemValueBold]}>
                ${cartData?.amount?.total_amount ?? '0.00'}
              </Text>
            </View>
            <View style={{ flex: 1 }} />
            {!showCart ? (
              <TouchableOpacity
                style={styles.checkoutButtonSideBar}
                // onPress={() => checkOutHandler()}
                onPress={() => {
                  setShowCart(true), dispatch(cartScreenTrue({ state: true }));
                }}
              >
                <Text style={styles.checkoutText}>
                  {strings.retail.checkOut}
                </Text>
                <Image source={checkArrow} style={styles.checkArrow} />
              </TouchableOpacity>
            ) : getuserDetailByNo?.length === 0 || !okk ? (
              <TouchableOpacity
                style={styles.checkoutButtonSideBar}
                onPress={
                  () =>
                    Toast.show({
                      text2: 'Please select the customer',
                      position: 'bottom',
                      type: 'error_toast',
                      visibilityTime: 1500,
                    })
                  // onPressPayNow()
                }
              >
                <Text style={styles.checkoutText}>
                  {strings.retail.checkOut}
                </Text>
                <Image source={checkArrow} style={styles.checkArrow} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.checkoutButtonSideBar,
                  { opacity: getuserDetailByNo?.length === 0 ? 0.5 : 1 },
                ]}
                onPress={() => {
                  onPressPayNow();
                  // dispatch(customerNumber({ number: customerPhoneNo }));
                }}
                disabled={getuserDetailByNo?.length === 0 ? true : false}
              >
                <Text style={styles.checkoutText}>
                  {strings.posRetail.payNow}
                </Text>
                <Image source={checkArrow} style={styles.checkArrow} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={categoryModal || subCategoryModal || brandModal}
      >
        <View>
          {categoryModal ? (
            <CategoryModal
              crossHandler={() => setCategoryModal(false)}
              categoryArray={categoryArray}
              onSelectCategory={selectedCat => {
                dispatch(getProduct(selectedCat.id, null, null, sellerID));

                setselectedCatID(selectedCat.id);

                setisFilterDataSeclectedOfIndex(0); // Enable Selection of subcategory if any category is selected

                setfilterMenuTitle(prevData => {
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
              crossHandler={() => setSubCategoryModal(false)}
              onSelectSubCategory={selectedSubCat => {
                dispatch(
                  getProduct(selectedCatID, selectedSubCat.id, null, sellerID)
                );
                setselectedSubCatID(selectedSubCat.id);
                setisFilterDataSeclectedOfIndex(1); // Enable Selection of subcategory if any category is selected

                setfilterMenuTitle(prevData => {
                  const newData = [...prevData];

                  // Set SubCategory
                  newData[1].name = selectedSubCat.name;
                  newData[1].isSelected = true;

                  // Reset Brand selections
                  newData[2].isSelected = false;
                  newData[2].name = originalFilterData[2].name;

                  return newData;
                });

                setSubCategoryModal(false);
              }}
            />
          ) : (
            <BrandModal
              crossHandler={() => setBrandModal(false)}
              onSelectbrands={selectedBrand => {
                dispatch(
                  getProduct(
                    selectedCatID,
                    selectedSubCatID,
                    selectedBrand.id,
                    sellerID
                  )
                );
                setselectedBrandID(selectedBrand.id);
                setisFilterDataSeclectedOfIndex(1); // Enable Selection of subcategory if any category is selected

                setfilterMenuTitle(prevData => {
                  const newData = [...prevData];
                  newData[2].name = selectedBrand.name;
                  newData[2].isSelected = true;
                  return newData;
                });
                setBrandModal(false);
              }}
            />
          )}
        </View>
      </Modal>

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
