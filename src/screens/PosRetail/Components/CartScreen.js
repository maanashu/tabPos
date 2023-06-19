import React, { useState } from 'react';
import { FlatList, Keyboard, Text, View } from 'react-native';

import { COLORS, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import {
  addDiscountPic,
  borderCross,
  categoryMenu,
  categoryshoes,
  checkArrow,
  cloth,
  columbiaMen,
  crossBg,
  crossButton,
  email,
  eraser,
  Fonts,
  keyboard,
  location,
  minus,
  notess,
  ok,
  pause,
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
import { useDispatch, useSelector } from 'react-redux';
import { getRetail } from '@/selectors/RetailSelectors';
import {
  addTocart,
  clearAllCart,
  clearOneCart,
  getUserDetail,
  getUserDetailSuccess,
  sendInvitation,
} from '@/actions/RetailAction';
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { emailReg } from '@/utils/validators';

export function CartScreen({
  onPressPayNow,
  crossHandler,
  addNotesHandler,
  addDiscountHandler,
}) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  let arr = [getRetailData?.getAllCart];
  const [selectedId, setSelectedId] = useState();
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [catTypeId, setCatTypeId] = useState();
  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];
  const [storeUser, setStoreUser] = useState();
  const [customerPhoneNo, setCustomerPhoneNo] = useState();

  const [userName, setUserName] = useState('');
  const [userPhoneNo, setUserPhoneNo] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAdd, setUserAdd] = useState('');

  const [itemCart, setItemCart] = useState();

  const [count, setCount] = useState(itemCart?.qty ?? '0');

  const [okk, setOkk] = useState(false);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.ADDCART], state)
  );

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
      console.log('data', data);
      dispatch(addTocart(data));
      // dispatch(createCartAction(withoutVariantObject));
    }
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
    setCustomerPhoneNo('');
    setUserAdd('');
  };

  const clearCartHandler = () => {
    dispatch(clearAllCart());
    crossHandler();
  };
  const userDetalLoader = useSelector(state =>
    isLoadingSelector([TYPES.GET_USERDETAIL], state)
  );
  const phoneNumberSearchFun = customerPhoneNo => {
    if (customerPhoneNo?.length > 9) {
      dispatch(getUserDetail(customerPhoneNo));
      Keyboard.dismiss();
    } else if (customerPhoneNo?.length < 10) {
      dispatch(getUserDetailSuccess([]));
    }
  };
  const removeOneCartHandler = productId => {
    const data = {
      cartId: cartData?.id,
      productId: productId,
    };
    dispatch(clearOneCart(data));
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
              <Text
                style={[styles.terryText, { width: SW(70) }]}
                numberOfLines={1}
              >
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
              onPress={() => setOkk(!okk)}
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

  const catTypeFun = id => {
    id === 1
      ? setCategoryModal(true)
      : id === 2
      ? setSubCategoryModal(true)
      : setBrandModal(true);
  };

  //  categoryType -----start
  const catTypeRenderItem = ({ item }) => {
    const backgroundColor = item.id === catTypeId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === catTypeId ? 'white' : 'black';

    return (
      <CatTypeItem
        item={item}
        onPress={() => {
          setCatTypeId(item.id), catTypeFun(item.id);
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
      <Text style={styles.chooseCat}>{item.name}</Text>
      <Image source={categoryMenu} style={styles.categoryMenu} />
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

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity style={styles.productCon}>
      <Image source={categoryshoes} style={styles.categoryshoes} />
      <Spacer space={SH(10)} />
      <Text numberOfLines={1} style={styles.productDes}>
        Made well colored cozy
      </Text>
      <Text numberOfLines={1} style={styles.productDes}>
        short cardigan
      </Text>
      <Spacer space={SH(6)} />
      <Text numberOfLines={1} style={styles.productSubHead}>
        Baby Boy
      </Text>
      <Spacer space={SH(6)} />
      <Text numberOfLines={1} style={styles.productPrice}>
        $5.65
      </Text>
    </TouchableOpacity>
  );

  const addQuantity = qty => {
    setCount(count + 1);
  };

  const minusQuantity = qty => {
    setCount(count - 1);
  };

  return (
    <View>
      <View style={styles.homeScreenCon}>
        <CustomHeader
          iconShow
          crossHandler={() => {
            crossHandler();
            dispatch(getUserDetailSuccess([]));
          }}
        />

        <View style={styles.displayflex2}>
          <View style={styles.itemLIistCon}>
            <Spacer space={SH(3)} />
            <View style={styles.displayflex}>
              <TouchableOpacity
                style={styles.backProScreen}
                onPress={() => {
                  crossHandler();
                  dispatch(getUserDetailSuccess([]));
                }}
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
                onPress={clearCartHandler}
              >
                {/* <Image source={eraser} style={styles.pause} /> */}
                <Text style={styles.holdCart}>
                  {strings.dashboard.clearcart}
                </Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(10)} />
            <View>
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
                  <Image
                    source={addDiscountPic}
                    style={styles.addDiscountPic}
                  />
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
                  {' '}
                  ${cartData?.amount?.tax ?? '0.00'}
                </Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Discount</Text>
                <Text style={[styles.subTotalDollar, { color: COLORS.red }]}>
                  ${cartData?.amount?.discount ?? '0.00'}
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
            </View>
            <View style={{ flex: 1 }} />
            {getuserDetailByNo?.length === 0 || !okk ? (
              <TouchableOpacity
                style={styles.checkoutButtonSideBar}
                onPress={() =>
                  Toast.show({
                    text2: 'Please select the customer',
                    position: 'bottom',
                    type: 'error_toast',
                    visibilityTime: 1500,
                  })
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
                onPress={onPressPayNow}
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
    </View>
  );
}
