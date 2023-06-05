import React, { useState } from 'react';
import { FlatList, Keyboard, Text, View } from 'react-native';

import { COLORS, SH } from '@/theme';
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
  ok,
  pause,
  Phone_light,
  plus,
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
  clearAllCart,
  getUserDetail,
  getUserDetailSuccess,
} from '@/actions/RetailAction';
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export function CartScreen({ onPressPayNow, crossHandler }) {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  const [selectedId, setSelectedId] = useState();
  const [categoryModal, setCategoryModal] = useState(false);
  const [subCategoryModal, setSubCategoryModal] = useState(false);
  const [brandModal, setBrandModal] = useState(false);
  const [catTypeId, setCatTypeId] = useState();
  const getuserDetailByNo = getRetailData?.getUserDetail ?? [];
  const [storeUser, setStoreUser] = useState();
  const [customerPhoneNo, setCustomerPhoneNo] = useState();
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
          {/* <TouchableOpacity
            style={styles.okButtonCon}
            onPress={() => setStoreUser(getuserDetailByNo?.[0])}
          >
            <Image source={ok} style={styles.lockLight} />
            <Text style={[styles.okText]}>{strings.dashboard.ok}</Text>
          </TouchableOpacity> */}
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
                // value={search}
                // onChangeText={search => (
                //   setSearch(search), onChangeFun(search)
                // )}
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
                <Image source={Phone_light} style={styles.sideSearchStyle} />
              </View>
              <TextInput
                placeholder="Phone Number"
                style={styles.sideBarsearchInput}
                keyboardType="numeric"
                // value={search}
                // onChangeText={search => (
                //   setSearch(search), onChangeFun(search)
                // )}
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
                <Image source={email} style={styles.sideSearchStyle} />
              </View>
              <TextInput
                placeholder="Email Address"
                style={styles.sideBarsearchInput}
                // value={search}
                // onChangeText={search => (
                //   setSearch(search), onChangeFun(search)
                // )}
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
                // value={search}
                // onChangeText={search => (
                //   setSearch(search), onChangeFun(search)
                // )}
                placeholderTextColor={COLORS.gerySkies}
              />
            </View>
          </View>
          <TouchableOpacity
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

  return (
    <View>
      <View style={styles.homeScreenCon}>
        <CustomHeader
          crossHandler={() => {
            crossHandler();
            dispatch(getUserDetailSuccess([]));
          }}
        />

        <View style={styles.displayflex2}>
          <View style={styles.itemLIistCon}>
            <Spacer space={SH(3)} />
            <View style={styles.displayflex}>
              <Text style={styles.allProduct}>
                All Products <Text style={styles.allProductCount}>(1280)</Text>
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
            {cartData?.poscart_products?.map((item, index) => (
              <View style={styles.blueListData} key={index}>
                <View style={styles.displayflex}>
                  <View style={[styles.tableListSide, styles.listLeft]}>
                    <Text
                      style={[
                        styles.blueListDataText,
                        styles.cashLabelWhiteHash,
                      ]}
                    >
                      {index + 1}
                    </Text>
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Image
                        source={{ uri: item.product_details?.image }}
                        style={styles.columbiaMen}
                      />
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.blueListDataText} numberOfLines={1}>
                          {item.product_details?.name}
                        </Text>
                        <Text style={styles.sukNumber}>
                          SUK: {item.product_details?.sku}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.tableListSide, styles.tableListSide2]}>
                    <Text style={styles.blueListDataText}>
                      $
                      {
                        item.product_details?.supply?.supply_prices
                          ?.selling_price
                      }
                    </Text>
                    <View style={styles.listCountCon}>
                      <Image source={minus} style={styles.minus} />
                      <Text>{item?.qty}</Text>
                      <Image source={plus} style={styles.minus} />
                    </View>
                    <Text style={styles.blueListDataText}>
                      $
                      {item.product_details?.supply?.supply_prices
                        ?.selling_price * item?.qty}
                    </Text>
                    <Image source={borderCross} style={styles.borderCross} />
                  </View>
                </View>
              </View>
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
              <View style={styles.addDiscountCon}>
                <Image source={addDiscountPic} style={styles.addDiscountPic} />
                <Text style={styles.addDiscountText}>Add Discount</Text>
              </View>
              <View style={styles.addDiscountCon}>
                <Image source={addDiscountPic} style={styles.addDiscountPic} />
                <Text style={styles.addDiscountText}>Add Notes</Text>
              </View>
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
            <View style={{ flex: 1 }} />
            {getuserDetailByNo?.length === 0 ? (
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
