import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  RefreshControl,
  Platform,
} from 'react-native';

import moment from 'moment';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import {
  cashProfile,
  clock,
  crossButton,
  lockLight,
  onlineMan,
  pay,
  pin,
  rightIcon,
  scn,
  search_light,
  sellingArrow,
  sellingBucket,
  sessionEndBar,
  productReturn,
  userImage,
  scanSearch,
  boxIcon,
  lockIcon,
  marketplaceIcon,
  cartBlueIcon,
  searchBlueIcon,
  locationSolidIcon,
  moneySolidIcon,
  timeBlueIcon,
  arrowRightIcon,
} from '@/assets';
import {
  addSellingSelection,
  getDrawerSession,
  getDrawerSessionPost,
  getDrawerSessionSuccess,
  getOrderDeliveries,
  getOrdersByInvoiceIdSuccess,
  getPendingOrders,
  getTotalSaleAction,
  onLineOrders,
  posLoginDetail,
  searchProductList,
  getOrderDeliveriesSuccess,
} from '@/actions/DashboardAction';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { digits } from '@/utils/validators';
import { COLORS, SF, SH, SW } from '@/theme';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { PosSearchListModal } from './Components';
import { getUser } from '@/selectors/UserSelectors';
import { navigate } from '@/navigation/NavigationRef';
import { getAuthData } from '@/selectors/AuthSelector';
import { logoutUserFunction } from '@/actions/UserActions';
import { getLoginSessionTime } from '@/utils/GlobalMethods';
import { getDashboard } from '@/selectors/DashboardSelector';
import { Button, ScreenWrapper, Spacer } from '@/components';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { endTrackingSession, getDrawerSessions } from '@/actions/CashTrackingAction';
import { PosSearchDetailModal } from './Components/PosSearchDetailModal';

import { styles } from './DashBoard.styles';
import { getOneProduct, scanProductAdd } from '@/actions/RetailAction';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { log, useAnimatedRef } from 'react-native-reanimated';
import { debounce } from 'lodash';
import { AddCartDetailModal, AddCartModal } from '../PosRetail3/Components';
import { Modal as PaperModal } from 'react-native-paper';
import { Images } from '@/assets/new_icon';
import { ms } from 'react-native-size-matters';

moment.suppressDeprecationWarnings = true;

export function DashBoard({ navigation }) {
  const textInputRef = useRef(null);
  const onEndReachedCalledDuringMomentum = useRef(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getUserData = useSelector(getUser);
  const getDashboardData = useSelector(getDashboard);
  const getProductListArray = getDashboardData?.searchProductList;
  const getLoginDeatil = getDashboardData?.posLoginDetail;
  const getSessionObj = getDashboardData?.getSesssion;
  const getPosUser = getUserData?.posLoginData;
  const onLineOrder = getDashboardData?.onLineOrders?.onLineOrders?.onlineOrders;
  const TotalSale = getDashboardData?.getTotalSale;
  const todayCashAmount = TotalSale?.[3]?.total_sale_amount.toFixed(2);
  const todayJbrAmount = TotalSale?.[1]?.total_sale_amount.toFixed(2);
  const todayCardAmount = TotalSale?.[2]?.total_sale_amount.toFixed(2);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getDeliveryData = getDashboardData?.getOrderDeliveries?.data;
  const [orderDeliveriesData, setOrderDeleveriesData] = useState([]);
  const getDeliveryData2 = getDeliveryData?.filter((item) => item.status <= 3);
  const [trackingSession, setTrackingSession] = useState(false);
  const [amountCount, setAmountCount] = useState();
  const [trackNotes, setTrackNotes] = useState('');
  const [yourSessionEndModal, setYourSessionEndModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [searchModalDetail, setSearchModalDetail] = useState(false);
  const [search, setSearch] = useState();
  const [productDet, setproductDet] = useState();
  const [timeChange, setTimeChange] = useState(true);
  const [page, setPage] = useState(1);
  const [sku, setSku] = useState('');
  const [scan, setScan] = useState(false);
  const [scroll, setScroll] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [addCartModal, setAddCartModal] = useState(false);
  const [addCartDetailModal, setAddCartDetailModal] = useState(false);

  //  order delivery pagination
  const paginationData = {
    total: getDashboardData?.getOrderDeliveries?.total ?? '0',
    totalPages: getDashboardData?.getOrderDeliveries?.total_pages ?? '0',
    perPage: getDashboardData?.getOrderDeliveries?.per_page ?? '0',
    currentPage: getDashboardData?.getOrderDeliveries?.current_page ?? '0',
  };

  useEffect(() => {
    dispatch(getOrderDeliveries(sellerID, 1));
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => setSearch();
    }, [])
  );

  const onLoadMoreProduct = useCallback(() => {
    if (paginationData?.currentPage < paginationData?.totalPages) {
      dispatch(getOrderDeliveries(sellerID, paginationData?.currentPage + 1));
    }
  }, [paginationData]);

  const orderLoad = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDER_DELIVERIES], state)
  );

  const renderFooter = () => {
    return orderLoad ? <ActivityIndicator size="large" color={COLORS.primary} /> : null;
  };

  useEffect(() => {
    setScan(false);
    dispatch(getPendingOrders());
  }, []);

  useEffect(() => {
    if (scan) {
      textInputRef.current.focus();
    }
  }, [scan]);

  const onSetSkuFun = async (sku) => {
    setSku(sku);
    if (sku?.length > 3) {
      const data = {
        seller_id: sellerID,
        upc_code: sku,
        qty: 1,
      };
      const res = await dispatch(scanProductAdd(data))
        .then((res) => {
          setSku('');
          dispatch(getAllCart());
          textInputRef.current.focus();
        })
        .catch((error) => {
          // alert('error');
          setSku('');
          textInputRef.current.focus();
        });
    }
  };

  const STARTSELLING = [
    {
      id: 1,
      heading: 'Start Selling',
      subHeading: 'Scan/Search',
      image: marketplaceIcon,
    },
    {
      id: 2,
      heading: 'Online Orders',
      subHeading: onLineOrder + ' ' + 'Orders',
      image: cartBlueIcon,
    },
  ];

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentTime(moment().format('HH:mm:ss'));
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  const profileObj = {
    openingBalance: getSessionObj?.opening_balance,
    closeBalance: getSessionObj?.cash_balance,
    profile: getSessionObj?.seller_details?.user_profiles?.profile_photo,
    name: getSessionObj?.seller_details?.user_profiles?.firstname,
    id: getSessionObj?.id,
  };

  useEffect(() => {
    if (isFocused) {
      startTrackingFun();
      clearInput();
      dispatch(getTotalSaleAction(sellerID));
      dispatch(posLoginDetail());
      dispatch(onLineOrders(sellerID));
      setSku('');
    }
  }, [isFocused]);

  const clearInput = () => {
    setAmountCount('');
    setTrackNotes('');
  };

  useEffect(() => {
    if (timeChange) {
      orderTime();
    }
  }, [timeChange === true]);

  const orderTime = (estimateTime) => {
    const currentDateTime = new Date();
    const givenTimestamp = new Date(estimateTime);
    const timeDifference = givenTimestamp.getTime() - currentDateTime.getTime();
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const timeFormatted = (
      <View>
        <Text style={[styles.nameTextBold, styles.timeSec]}>
          {hours < 1 ? '00' : hours}:{minutes < 1 ? '00' : minutes}:{seconds < 1 ? '00' : seconds}
        </Text>
      </View>
    );

    return timeFormatted;
  };

  const startTrackingFun = async () => {
    const res = await dispatch(getDrawerSession());
    if (res?.type === 'GET_DRAWER_SESSION_SUCCESS') {
      setTrackingSession(false);
      setAmountCount('');
      setTrackNotes('');
    } else {
      setTrackingSession(true);
    }
  };

  const startTrackingSesHandler = async () => {
    if (!amountCount) {
      alert('Please Enter Amount');
    } else if (amountCount && digits.test(amountCount) === false) {
      alert('Please enter valid amount');
    } else if (amountCount <= 0) {
      alert('Please enter valid amount');
    } else {
      const data = {
        amount: amountCount,
        notes: trackNotes,
      };
      dispatch(getDrawerSessionPost(data));
      setTrackingSession(false);
    }
  };

  const getSessionLoad = useSelector((state) =>
    isLoadingSelector(
      [
        DASHBOARDTYPE.GET_DRAWER_SESSION,
        DASHBOARDTYPE.GET_DRAWER_SESSION_POST,
        DASHBOARDTYPE.START_TRACKING_SESSION,
        DASHBOARDTYPE.SEARCH_PRODUCT_LIST,
      ],
      state
    )
  );

  const startSellingHandler = async (id) => {
    if (id === 1) {
      dispatch(addSellingSelection(id));
      navigate(NAVIGATION.posRetail3);
    } else if (id === 2) {
      dispatch(addSellingSelection(id));
      navigate(NAVIGATION.deliveryOrders2);
    }
  };

  const tableListItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(addSellingSelection(2));
        navigation.navigate(NAVIGATION.deliveryOrders2, { ORDER_DETAIL: item });
      }}
      style={[styles.reviewRenderView]}
    >
      <View style={{ width: SW(20) }}>
        <Text style={styles.hashNumber}>#{item.id}</Text>
      </View>
      <View style={{ width: SW(45) }}>
        <Text numberOfLines={1} style={styles.nameText}>
          {item?.user_details?.firstname ?? 'userName'}
        </Text>
        <View style={styles.timeView}>
          <Image source={locationSolidIcon} style={styles.pinIcon(1)} />
          <Text style={[styles.timeText, { color: COLORS.purple }]}>
            {item?.distance ? item?.distance : '0'} miles
          </Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item?.order_details?.length} items</Text>
        <View style={styles.timeView}>
          <Image source={moneySolidIcon} style={styles.pinIcon(2)} />
          <Text style={[styles.timeText, { color: COLORS.success_green }]}>
            ${item.payable_amount ? item.payable_amount : '0'}
          </Text>
        </View>
      </View>
      {item?.order_type == 'product' ? (
        <View style={{ minWidth: SW(50), maxWidth: SW(70) }}>
          <Text style={styles.nameText}>
            {item?.preffered_delivery_start_time || '-----'} -
            {item?.preffered_delivery_end_time || '-----'}
          </Text>
          <View style={styles.timeView}>
            <Image source={Images.serviceTime} style={styles.pinIcon(3)} />
            <Text
              style={[styles.timeText, styles.nameTextBold, { color: COLORS.light_time }]}
              numberOfLines={1}
            >
              {item?.delivery_details?.title || '-----'}
            </Text>
          </View>
        </View>
      ) : (
        <View style={{ minWidth: SW(50), maxWidth: SW(70) }}></View>
      )}

      <Image source={arrowRightIcon} style={styles.arrowIconRight} />
      <View style={styles.rightIconStyle1}>
        <View style={[styles.timeView, { paddingTop: 0 }]}>
          <Text style={[styles.nameTextBold, { color: COLORS.textBlue }]}>
            {/* {'00:00:00'} */}
            {item.estimated_preparation_time === null
              ? '00:00:00'
              : orderTime(item.estimated_preparation_time)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const trackinSessionModal = () => {
    return (
      <Modal
        transparent={true}
        animationType={'fade'}
        isVisible={trackingSession}
        backdropColor={COLORS.row_grey}
        backdropOpacity={0.9}
      >
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: Platform.OS === 'ios' ? 1 : 0, justifyContent: 'center' }}
        >
          <View style={styles.modalMainView}>
            <View style={styles.headerView}>
              <TouchableOpacity
                style={styles.crossButonBorder}
                onPress={() => dispatch(logoutUserFunction())}
              >
                <Image source={crossButton} style={styles.crossIconStyle} />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <View style={{ alignItems: 'center' }}>
                <Image source={Images.camera} style={styles.cameraIcon} />
                <Text style={styles.startTracking}>{'Start Tracking Session'}</Text>
                <Text style={styles.countCashText}>{'Count Cash in Drawer'}</Text>
              </View>
              <View style={{ flex: 1, padding: ms(20) }}>
                {/* <View style={[styles.countCashView, { borderWidth: 1 }]}> */}
                <Text style={styles.amountCountedText}>{strings.management.amountCounted}</Text>
                <View style={styles.inputCon}>
                  <Text style={styles.dollarSign}>{'$'}</Text>
                  <TextInput
                    // ref={(inputRef) => {
                    //   onInputFocus(inputRef), inputRef;
                    // }}
                    // onFocus={(event) => {
                    //   // setFresh((prev) => !prev);
                    //   setScroll('1');
                    //   // onInputFocus(event.target);
                    // }}
                    placeholder={strings.management.amount}
                    style={styles.inputStyle}
                    placeholderTextColor={COLORS.placeHoldeText}
                    keyboardType="number-pad"
                    value={amountCount}
                    onChangeText={setAmountCount}
                  />
                  <Image source={Images.notFoundIcon} style={styles.notFoundIcon} />
                </View>
                <Text style={styles.hintText}>{'This is a hint text to help user.'}</Text>

                <Spacer space={SH(20)} />
                <View style={styles.inputCon}>
                  <Image source={Images.addNotesIcon} style={styles.notesIcon} />
                  <TextInput
                    // ref={(inputRef) => (onInputFocus(inputRef), inputRef)}
                    onFocus={(event) => {
                      // setFresh((prev) => !prev);
                      setScroll('2');
                      // onInputFocus(event.target);
                    }}
                    placeholder={strings.management.note}
                    style={styles.noteInputStyle}
                    placeholderTextColor={COLORS.placeHoldeText}
                    value={trackNotes}
                    onChangeText={setTrackNotes}
                    multiline={true}
                    numberOfLines={3}
                  />
                </View>

                {/* </View> */}
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  style={styles.startButtonCon(amountCount)}
                  onPress={startTrackingSesHandler}
                >
                  <Text style={styles.startSessionText()}>{'Start Session'}</Text>
                  <Image
                    source={Images.arrowLeftUp}
                    style={[styles.notesIcon, styles.arrowIcon(amountCount)]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    );
  };

  const onChangeFun = async (search) => {
    if (search.length > 2) {
      const res = await dispatch(
        searchProductList(search, sellerID, (res) => {
          // if (Object.keys(res?.invoiceData)?.length > 0) {
          //   alert('dfghjkl;');
          // } else {
          //   setSearchModal(true);
          // }
        })
      );
      setSearchModal(true);
    } else if (search.length < 2) {
      setSearchModal(false);
    }
  };

  const debouncedSearch = useCallback(debounce(onChangeFun, 1000), []);

  const onRefresh = () => {
    dispatch(getOrderDeliveries(sellerID, 1));
    dispatch(getPendingOrders());
  };

  const bodyView = () => (
    <View style={styles.homeScreenCon}>
      <View style={[styles.displayRow, { flex: 1 }]}>
        <View style={styles.cashProfileCon}>
          <View style={{ alignItems: 'center' }}>
            <Spacer space={SH(12)} />
            <View style={styles.cashProfilecon}>
              <Image
                source={
                  getPosUser?.user_profiles?.profile_photo
                    ? { uri: getPosUser?.user_profiles?.profile_photo }
                    : userImage
                }
                style={styles.cashProfile}
              />
            </View>
            <Text style={styles.cashierName}>
              {`${getPosUser?.user_profiles?.firstname} ${getPosUser?.user_profiles?.lastname}`}
            </Text>
            <View style={styles.cashierContainer}>
              <Text style={styles.posCashier}>
                {getPosUser?.user_roles?.length > 0
                  ? getPosUser?.user_roles?.map((item) => item.role?.name)
                  : 'admin'}
              </Text>
              <Spacer horizontal space={12} />
              <View style={styles.cashierIdContainer}>
                <View style={styles.idDotStyle} />
                <Text style={styles.cashLabel}>
                  ID : {getPosUser?.user_profiles?.user_id ?? '0'}
                </Text>
              </View>
            </View>
          </View>
          <Spacer space={SH(10)} />
          <View style={styles.todaySaleCon}>
            <View style={styles.displayflex}>
              <Text style={styles.todaySale}>{strings.dashboard.todaySale}</Text>
            </View>
            <Spacer space={SH(6)} />
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.dashboard.cashSaleAmount}</Text>
              <Text style={styles.cashAmount}>
                {/* ${TotalSale?.[3]?.total_sale_amount ?? '0.00'} */}${todayCashAmount ?? '0.00'}
              </Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.dashboard.cardSaleAmount}</Text>
              <Text style={styles.cashAmount}>${todayCardAmount ?? '0.00'}</Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.saleAmountLable} numberOfLines={1}>
                {strings.dashboard.jobrCoinSaleAmount}
              </Text>
              <Text style={styles.cashAmount}>JOBR {todayJbrAmount ?? '0.00'}</Text>
            </View>
          </View>
          <Spacer space={SH(10)} />
          <View style={styles.todaySaleCon}>
            <Text style={styles.todaySale}>{strings.dashboard.cashDrawer}</Text>
            <Spacer space={SH(6)} />
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.dashboard.openBal}</Text>
              <Text style={styles.cashAmount}>
                ${Number(profileObj?.openingBalance ?? '0.00')?.toFixed(2)}
              </Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.dashboard.closeBal}</Text>
              <Text style={styles.cashAmount}>
                ${Number(profileObj?.closeBalance ?? '0.00')?.toFixed(2)}
              </Text>
            </View>
          </View>
          <Spacer space={SH(24)} />

          <View style={styles.sessionCon}>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={[styles.cashLabel, { color: COLORS.navy_blue }]}>
                {moment().format('dddd')}
                {', '}
                {moment().format('ll')}
              </Text>
              <Text style={[styles.cashLabel, { color: COLORS.navy_blue }]}>
                {moment().format('LTS')}
              </Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={[styles.cashLabel, { color: COLORS.navy_blue }]}>
                {strings.dashboard.logTime}
              </Text>
              <Text style={[styles.cashAmount, { color: COLORS.navy_blue }]}>
                {moment(getLoginDeatil?.updated_at).format('LTS')}
              </Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={[styles.cashLabel, { color: COLORS.navy_blue }]}>
                {strings.dashboard.session}
              </Text>
              <Text style={[styles.cashAmount, { color: COLORS.navy_blue }]}>
                {getLoginSessionTime(moment(getLoginDeatil?.updated_at).format('LTS'))}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={async () => {
              await dispatch(getDrawerSessions());
              navigate('SearchScreen', { screen: 'Dashboard' });
            }}
            style={styles.checkoutButton}
          >
            <View style={styles.btnInnerContainer}>
              <Text style={styles.checkoutText1}>{strings.dashboard.productReturn}</Text>
              <Image source={boxIcon} style={styles.lockLight} />
            </View>
          </TouchableOpacity>

          <Spacer space={SH(10)} />

          <TouchableOpacity
            style={[
              styles.checkoutButton,
              { backgroundColor: COLORS.input_border, borderWidth: 0 },
            ]}
            onPress={async () => {
              const data = {
                amount: parseInt(profileObj?.closeBalance),
                drawerId: profileObj?.id,
                transactionType: 'end_tracking_session',
                modeOfcash: 'cash_out',
              };

              const res = await dispatch(endTrackingSession(data));
              if (res?.type === 'END_TRACKING_SUCCESS') {
                dispatch(getDrawerSessionSuccess(null));
                dispatch(logoutUserFunction());
              } else {
                alert('something went wrong');
              }
            }}
          >
            <View style={styles.btnInnerContainer}>
              <Text style={[styles.checkoutText1]}>{strings.dashboard.lockScreen}</Text>
              <Image source={lockIcon} style={styles.lockLight} />
            </View>
          </TouchableOpacity>

          <Spacer space={SH(10)} />
        </View>
        <View style={styles.rightOrderCon}>
          <View
            style={styles.inputWraper}
            // onPress={() => setSearchScreen(true)}
          >
            <View style={styles.displayRow}>
              <View>
                <Image source={search_light} style={styles.searchStyle} />
              </View>
              {scan ? (
                <TextInput
                  placeholder="Scan Product"
                  style={styles.searchInput}
                  // editable={false}
                  value={sku}
                  onChangeText={(sku) => {
                    onSetSkuFun(sku);
                  }}
                  ref={textInputRef}
                  placeholderTextColor={COLORS.placeHoldeText}
                />
              ) : (
                <TextInput
                  placeholder="Search"
                  style={styles.searchInput}
                  value={search}
                  onChangeText={(search) => {
                    setSearch(search);
                    debouncedSearch(search);
                    // onChangeFun(search);
                  }}
                  placeholderTextColor={COLORS.placeHoldeText}
                />
              )}
            </View>
            <TouchableOpacity
              // onPress={() => textInputRef.current.focus()}
              onPress={() => setScan(!scan)}
            >
              {/* <Image source={scan ? scanSearch : scn} style={styles.scnStyle} /> */}

              <Image source={Images.homeScan} style={styles.scnStyle} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(20)} />

          <View style={styles.displayflex}>
            {STARTSELLING.map((item, index) => (
              <TouchableOpacity
                onPress={() => startSellingHandler(item.id)}
                style={[
                  styles.storeCardCon,
                  {
                    backgroundColor: index === 0 ? COLORS.navy_blue : COLORS.darkSky,
                    marginRight: index === 0 ? ms(10) : ms(0),
                  },
                ]}
                key={index}
              >
                <Image source={item.image} style={styles.sellingBucket} />
                <Spacer space={SH(8)} />
                <Text style={styles.startSelling}>{item.heading}</Text>
                <Spacer space={SH(12)} />
                {index === 0 ? (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={searchBlueIcon} style={styles.searchIconInCard} />
                    <Text style={styles.searchTxtStyle}>Scan / Search</Text>
                  </View>
                ) : (
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.sky_blue,
                      borderRadius: 30,
                      paddingVertical: SH(4),
                      paddingHorizontal: SW(3),
                    }}
                  >
                    <Text style={styles.searchTxtStyle}>{onLineOrder} New Orders</Text>
                  </View>
                )}
                {index == 1 && (
                  <View style={styles.bellBack}>
                    <Image source={Images.bell} style={{ width: ms(15), height: ms(15) }} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Spacer space={SH(20)} />

          <View style={styles.homeTableCon}>
            <View>
              <Text style={styles.deliveries}>{'Order'}</Text>
            </View>
            {getDeliveryData?.length === 0 || (getDeliveryData === undefined && orderLoad) ? (
              <View>
                <Text style={styles.requestNotFound}>Loading...</Text>
              </View>
            ) : getDeliveryData?.length === 0 || getDeliveryData === undefined ? (
              <View>
                <Text style={styles.requestNotFound}>Orders not found</Text>
              </View>
            ) : (
              <FlatList
                data={getDeliveryData}
                extraData={getDeliveryData}
                renderItem={tableListItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                    tintColor={COLORS.primary} // Change the color of the loading spinner
                    title="Pull to Refresh" // Optional, you can customize the text
                  />
                }
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
                ListFooterComponent={renderFooter}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {bodyView()}
        {trackinSessionModal()}
      </View>

      {getSessionLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator size={'large'} style={styles.loader} color={COLORS.primary} />
        </View>
      ) : null}

      <Modal transparent={true} animationType={'fade'} isVisible={yourSessionEndModal}>
        <View style={styles.yourSessionendCon}>
          <View style={styles.yourSessionendHeader}>
            <Text>{null}</Text>
            <Text style={styles.yourSession}>{strings.dashboard.yourSessionEnd}</Text>
            <TouchableOpacity onPress={() => setYourSessionEndModal(false)}>
              <Image source={crossButton} style={styles.crossBg} />
            </TouchableOpacity>
          </View>
          <View style={styles.yourSessionBodyCon}>
            <Spacer space={SH(20)} />
            <Text style={styles.posClose}>POS will Close</Text>
            <Spacer space={SH(10)} />
            <Image source={sessionEndBar} style={styles.sessionEndBar} />
            <Spacer space={SH(10)} />
            <Text style={styles.yourSession}>{strings.dashboard.yourSessionEnd}</Text>
            <Spacer space={SH(20)} />

            <Button
              title={strings.dashboard.expandOneHour}
              textStyle={styles.expandOneHourText}
              style={styles.expandOneHourButton}
            />
            <Spacer space={SH(10)} />
            <Button
              title={strings.dashboard.expandTwoHour}
              textStyle={styles.expandOneHourText}
              style={{
                ...styles.expandOneHourButton,
                ...styles.expandTwoHourButton,
              }}
            />
          </View>
        </View>
      </Modal>

      {/* Search List modal start*/}
      {/* <Modal
        animationType="fade"
        transparent={true}
        isVisible={searchModal || searchModalDetail}
        avoidKeyboard={false}
      > */}

      <PaperModal visible={searchModal}>
        {searchModalDetail ? (
          <PosSearchDetailModal
            backArrowhandler={() => (setSearchModal(true), setSearchModalDetail(false))}
            productData={productDet}
          />
        ) : (
          <KeyboardAvoidingView>
            <PosSearchListModal
              listFalseHandler={() => (setSearchModal(false), setSearch(''))}
              getProductListArray={getProductListArray}
              search={search}
              setSearch={setSearch}
              // onChangeFun={onChangeFun}
              onChangeFun={(search) => {
                debouncedSearch(search);
              }}
              viewDetailHandler={(item) => (
                setSearchModal(false), setSearchModalDetail(true), setproductDet(item)
              )}
              searchFunction={async (productId) => {
                const res = await dispatch(getOneProduct(sellerID, productId));
                if (res?.type === 'GET_ONE_PRODUCT_SUCCESS') {
                  setSearchModal(false);
                  setAddCartModal(true);
                }
              }}
            />
          </KeyboardAvoidingView>
        )}
      </PaperModal>
      {/* Search List modal end*/}

      <PaperModal visible={addCartModal || addCartDetailModal}>
        {addCartDetailModal ? (
          <AddCartDetailModal
            crossHandler={() => {
              setAddCartDetailModal(false);
              setAddCartModal(true);
              // setSearchModal(true);
            }}
            sellerID={sellerID}
            // openFrom="main"
            // cartQty={selectedItemQty}
            // addToLocalCart={onClickAddCart}
            // productIndex={productIndex}
            doubleCrossHandler={() => {
              setAddCartDetailModal(false);
              setAddCartModal(false);
              setSearchModal(true);
            }}
            // openFrom="main"
          />
        ) : (
          <AddCartModal
            crossHandler={() => {
              setAddCartModal(false);
              setSearchModal(true);
            }}
            detailHandler={() => {
              setAddCartModal(false);
              setAddCartDetailModal(true);
            }}
            cartQty={1}
            sellerID={sellerID}
            backToCartHandler={() => {
              setAddCartModal(false);
              setSearchModal(false);
              navigate(NAVIGATION.posRetail3);
            }}

            // openFrom="main"
          />
        )}
      </PaperModal>
    </ScreenWrapper>
  );
}
