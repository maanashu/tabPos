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

export function SideCartDet({ onPressPayNow, crossHandler }) {
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

  return (
    <View style={{ borderWidth: 1 }}>
      <View style={styles.nameAddCon}>
        <View style={styles.sideBarInputWraper}>
          <View style={styles.displayRow}>
            <View>
              <Image source={search_light} style={styles.sideSearchStyle} />
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
          {strings.dashboard.totalItem} {cartData?.poscart_products?.length}
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
  );
}
