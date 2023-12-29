import React from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { COLORS } from '@/theme';
import { Images } from '@mPOS/assets';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { strings } from '@mPOS/localization';
// import { homePageData } from '@mPOS/constants/enums';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { getAuthData } from '@/selectors/AuthSelector';

import styles from '@mPOS/screens/HomeTab/Home/styles';
import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { getDrawerSession, getDrawerSessionPost, homeStatus } from '@/actions/DashboardAction';
import { getDashboard } from '@/selectors/DashboardSelector';
import { getRetail } from '@/selectors/RetailSelectors';
import { cartRun, changeStatusProductCart } from '@/actions/RetailAction';
import { FullScreenLoader } from '@mPOS/components';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { logoutUserFunction } from '@/actions/UserActions';
import ReactNativeModal from 'react-native-modal';
import { digitWithDot } from '@/utils/validators';
import { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { CustomErrorToast } from '@mPOS/components/Toast';

export function Home() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const authData = useSelector(getAuthData);
  const homeStatusSelector = useSelector(getDashboard);
  const homeStatusData = homeStatusSelector?.homeData;
  const merchantServiceProvide = authData?.merchantLoginData?.product_existance_status;
  const merchantData = authData?.merchantLoginData;
  const productCartArray = retailData?.getAllProductCart;
  const holdProductArray = productCartArray?.filter((item) => item.is_on_hold === true);
  const productCartData = retailData?.getAllCart;
  const [trackingSession, setTrackingSession] = useState(false);
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const productCart = retailData?.getAllCart?.poscart_products ?? [];
  const onlyProductCartArray = productCart?.filter((item) => item?.product_type === 'product');
  const onlyServiceCartArray = productCart?.filter((item) => item?.product_type === 'service');

  const holdOnlyProductArray = holdProductArray?.filter((item) => item?.product_type === 'product');
  const holdOnlyServiceArray = holdProductArray?.filter((item) => item?.product_type === 'service');

  const isholdCartLoading = useSelector((state) =>
    isLoadingSelector([TYPES.CHANGE_STATUS_PRODUCT_CART], state)
  );
  const isGetAllProductLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ALL_PRODUCT_CART], state)
  );
  const isGetDrawerSessionLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_DRAWER_SESSION], state)
  );
  const isCreateDrawerSessionLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_DRAWER_SESSION_POST], state)
  );

  // hold cart Function
  const cartStatusHandler = () => {
    const data =
      holdProductArray?.length > 0
        ? {
            status: !holdProductArray?.[0]?.is_on_hold,
            cartId: holdProductArray?.[0]?.id,
          }
        : {
            status: !productCartData?.is_on_hold,
            cartId: productCartData?.id,
          };
    dispatch(
      changeStatusProductCart(data, () => {
        dispatch(
          cartRun(
            onlyProductCartArray?.length >= 1 || holdProductArray?.length >= 1
              ? 'product'
              : onlyServiceCartArray?.length >= 1 || holdProductArray?.length >= 1
              ? 'service'
              : CustomErrorToast({ message: 'cart not found' })
          )
        );
        navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.cart });
      })
    );
  };

  const onPressHandler = (item) => {
    if (item?.title === 'Checkout') {
      navigate(MPOS_NAVIGATION.checkout);
    } else if (item?.title === 'Products') {
      navigate(MPOS_NAVIGATION.retailProducts);
    } else if (item?.title === 'Services') {
      navigate(MPOS_NAVIGATION.retailServices);
    } else if (item?.title === 'Delivery') {
      navigate(MPOS_NAVIGATION.delivery);
    } else if (item?.title === 'Shipping') {
      navigate(MPOS_NAVIGATION.shipping);
    } else if (item?.title === 'Return') {
      navigate(MPOS_NAVIGATION.searchScreen);
    } else if (item?.title === 'Booking') {
      navigate(MPOS_NAVIGATION.booking);
    } else if (item.title === 'On-Hold') {
      cartStatusHandler();
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(homeStatus());
      startTrackingFun();
    }
  }, [isFocused]);

  const startTrackingFun = async () => {
    const res = await dispatch(getDrawerSession());
    if (res?.type === 'GET_DRAWER_SESSION_SUCCESS') {
      setTrackingSession(false);
      setAmount('');
      setNotes('');
    } else {
      setTrackingSession(true);
    }
  };

  const homePageData = [
    merchantServiceProvide?.is_product_exist
      ? {
          key: '1',
          title: 'Products',
          image: Images.products,
          listedProducts: `${homeStatusData?.products_count ?? 0} Products listed`,
        }
      : null,
    merchantServiceProvide?.is_service_exist
      ? {
          key: '2',
          title: 'Services',
          image: Images.services,
          listedProducts: `${homeStatusData?.services_count ?? 0} Services listed`,
        }
      : null,
    merchantServiceProvide?.is_product_exist || merchantServiceProvide?.is_service_exist
      ? {
          key: '3',
          title: 'On-Hold',
          image: Images.hold,
          listedProducts: `Hold  Cart: ${holdProductArray?.length}`,
        }
      : null,
    {
      key: '4',
      title: 'Return',
      image: Images.returnIcon,
      listedProducts: `Incomplete: ${homeStatusData?.return_count ?? 0}`, //'Incomplete: 3',
    },
    {
      key: '5',
      title: 'Delivery',
      image: Images.delivery,
      listedProducts: `Processing: ${homeStatusData?.delivery_orders_count ?? 0}`,
    },
    {
      key: '6',
      title: 'Shipping',
      image: Images.shippingImage,
      listedProducts: `On-going: ${homeStatusData?.shipping_orders_count ?? 0}`,
    },
    {
      key: '7',
      title: 'Booking',
      image: Images.calendar,
      listedProducts: `On-going: ${homeStatusData?.booking_count ?? 0}`,
    },
    // {
    //   key: '8',
    //   title: 'Add Title',
    //   image: Images.addTitle,
    // },
  ].filter(Boolean); // Remove falsy values (null in this case)

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => onPressHandler(item)} style={styles.itemViewStyle}>
      <Image source={item.image} style={styles.imageStyle} />
      <Text style={styles.itemTitleStyle}>{item.title}</Text>

      {item?.title === 'Delivery' || item?.title === 'Shipping' ? (
        <View style={styles.descriptionView}>
          <Image source={Images.dot} style={styles.dotImageStyle} />
          <Text
            style={[
              styles.listedProductsStyle,
              {
                color:
                  item?.title === 'Delivery' || item?.title === 'Shipping'
                    ? COLORS.darkBlue
                    : COLORS.dark_gray,
              },
            ]}
          >
            {item.listedProducts}
          </Text>
        </View>
      ) : (
        <Text
          style={[
            styles.listedProductsStyle,
            {
              color:
                item?.title === 'Delivery' || item?.title === 'Shipping'
                  ? COLORS.darkBlue
                  : COLORS.solid_grey,
              paddingHorizontal: 15,
            },
          ]}
        >
          {item.listedProducts}
        </Text>
      )}
    </TouchableOpacity>
  );

  const startTrackingSesHandler = async () => {
    if (!amount) {
      alert('Please Enter Amount');
    } else if (amount && digitWithDot.test(amount) === false) {
      alert('Please enter valid amount');
    } else if (amount <= 0) {
      alert('Please enter valid amount');
    } else {
      const data = {
        amount: amount,
        notes: notes,
      };
      dispatch(
        getDrawerSessionPost(data, (res) => {
          if (res?.msg == 'Get drawer session!') {
            setTrackingSession(false);
            // dispatch(saveDefaultScreen(true));
          }
        })
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ borderWidth: 0, flexGrow: 1, paddingHorizontal: ms(10) }}>
        <View style={styles.storeNameHeader}>
          <Text style={styles.storeName} numberOfLines={1}>
            {merchantData?.user?.user_profiles?.organization_name}
          </Text>

          <TouchableOpacity onPress={() => navigate(MPOS_NAVIGATION.notificationList)}>
            <Image source={Images.bell} style={styles.bell} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.homePageSearchCon}>
          <Image source={Images.search} style={styles.searchIconStyle} />
          <TextInput
            placeholder={strings.homeTab.placeholder}
            style={styles.searchTextInputStyle}
            placeholderTextColor={COLORS.solid_grey}
          />
        </View> */}

        <FlatList
          numColumns={2}
          data={homePageData}
          renderItem={renderItem}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: ms(110),
          }}
        />
      </View>

      <ReactNativeModal transparent={true} animationType={'fade'} isVisible={trackingSession}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.modalMainView}>
            <View style={styles.headerCon}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(logoutUserFunction());
                }}
              >
                <Image source={Images.cross} style={styles.crossIconStyle} />
              </TouchableOpacity>
              <Text style={styles.startTracking}>{strings.more.startTracking}</Text>
            </View>
            <View style={styles.modalBodyView}>
              <Text style={styles.countCashDrawer}>{strings.more.countCashDrawer}</Text>
              <Text style={styles.amountCounted}>{strings.more.amountCounted}</Text>
              <View style={styles.amountTextStyle}>
                <Text style={styles.dollarSign}>{'$'}</Text>
                <TextInput
                  value={amount.toString()}
                  onChangeText={setAmount}
                  keyboardType={'number-pad'}
                  style={styles.amountInput}
                  placeholder={strings.cart.amountValue}
                  placeholderTextColor={COLORS.solid_grey}
                />
              </View>

              <Text style={styles.amountCounted}>{strings.more.note}</Text>
              <TextInput
                value={notes}
                onChangeText={setNotes}
                style={styles.noteTextStyle}
                placeholder={strings.more.note}
                placeholderTextColor={COLORS.gerySkies}
                multiline={true}
                numberOfLines={3}
              />
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                onPress={startTrackingSesHandler}
                style={[
                  styles.startButton,
                  { backgroundColor: amount ? COLORS.primary : COLORS.gerySkies },
                ]}
              >
                <Text style={styles.startSession}>{strings.more.startSession}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ReactNativeModal>
      {(isholdCartLoading ||
        isGetAllProductLoading ||
        isGetDrawerSessionLoading ||
        isCreateDrawerSessionLoading) && <FullScreenLoader />}
    </SafeAreaView>
  );
}
