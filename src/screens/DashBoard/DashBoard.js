import React, { useEffect, useRef, useState } from 'react';
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
  Platform,
} from 'react-native';

import moment from 'moment';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';

import { useDebouncedCallback } from 'use-lodash-debounce';

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
import { endTrackingSession } from '@/actions/CashTrackingAction';
import { PosSearchDetailModal } from './Components/PosSearchDetailModal';

import { styles } from './DashBoard.styles';
import { scanProductAdd } from '@/actions/RetailAction';

moment.suppressDeprecationWarnings = true;

export function DashBoard({ navigation }) {
  const textInputRef = useRef(null);
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

  //  order delivery pagination

  const onLoadMoreOrder = () => {
    const totalPages = getDashboardData?.getOrderDeliveries?.total_pages;
    if (page <= totalPages) {
      setPage((prevPage) => prevPage + 1);
      // if (!isScrolling) return;
      dispatch(getOrderDeliveries(sellerID, page));
    }
  };

  const debouncedLoadMoreOrder = useDebouncedCallback(onLoadMoreOrder, 300);

  useEffect(() => {
    setPage(1);
  }, [isFocused]);

  const renderFooterPost = () => {
    return (
      <View style={{}}>
        {isLoading && (
          <ActivityIndicator
            style={{ marginVertical: 14 }}
            size={'large'}
            color={COLORS.blueLight}
          />
        )}
      </View>
    );
  };

  const isLoading = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDER_DELIVERIES], state)
  );

  useEffect(() => {
    setScan(false);
    dispatch(getPendingOrders(sellerID));
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
      heading: 'START SELLING',
      subHeading: 'Scan/Search',
      image: sellingBucket,
    },
    {
      id: 2,
      heading: 'ONLINE ORDERS ',
      subHeading: onLineOrder + ' ' + 'Orders',
      image: onlineMan,
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
      dispatch(getOrderDeliveries(sellerID, page));
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
    isLoadingSelector([DASHBOARDTYPE.GET_DRAWER_SESSION], state)
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

  const tableListItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NAVIGATION.deliveryOrders2, { isViewAll: true, ORDER_DETAIL: item })
      }
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
          <Image source={pin} style={styles.pinIcon} />
          <Text style={styles.timeText}>{item?.distance ? item?.distance : '0miles'} miles</Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item?.order_details?.length} items</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>${item.payable_amount ? item.payable_amount : '0'}</Text>
        </View>
      </View>
      <View style={{ width: SW(50) }}>
        <Text style={[styles.nameText, styles.nameTextBold]} numberOfLines={1}>
          {item?.delivery_details?.title}
        </Text>
        <View style={styles.timeView}>
          <Image source={clock} style={styles.pinIcon} />
          <Text style={styles.timeText}>
            {item?.preffered_delivery_start_time} - {item?.preffered_delivery_end_time}
          </Text>
        </View>
      </View>
      <View style={styles.rightIconStyle1}>
        <View style={styles.timeView}>
          <Text style={[styles.nameTextBold, styles.timeSec]}>
            {item.estimated_preparation_time === null
              ? '00:00:00'
              : orderTime(item.estimated_preparation_time)}
          </Text>
          <Image source={rightIcon} style={styles.pinIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const trackinSessionModal = () => {
    return (
      <Modal transparent={true} animationType={'fade'} isVisible={trackingSession}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 100}
        >
          <ScrollView>
            <View style={styles.modalMainView}>
              <View style={styles.headerView}>
                <View style={styles.sessionViewStyle}>
                  <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                    {strings.management.session}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.crossButonBorder}
                  onPress={() => dispatch(logoutUserFunction())}
                >
                  <Image source={crossButton} style={styles.crossIconStyle} />
                </TouchableOpacity>
              </View>

              <Spacer space={SH(40)} />
              <View style={styles.countCashView}>
                <Text style={styles.countCashText}>{strings.management.countCash}</Text>

                <Spacer space={SH(40)} />
                <View>
                  <Text style={styles.amountCountedText}>{strings.management.amountCounted}</Text>
                  <TextInput
                    placeholder={strings.management.amount}
                    style={styles.inputStyle}
                    placeholderTextColor={COLORS.solid_grey}
                    keyboardType="number-pad"
                    value={amountCount}
                    onChangeText={setAmountCount}
                  />
                </View>
                <Spacer space={SH(40)} />
                <View>
                  <Text style={styles.amountCountedText}>{strings.management.note}</Text>
                  <TextInput
                    placeholder={strings.management.note}
                    style={styles.noteInputStyle}
                    placeholderTextColor={COLORS.gerySkies}
                    value={trackNotes}
                    onChangeText={setTrackNotes}
                    multiline={true}
                    numberOfLines={3}
                  />
                </View>
                <Spacer space={SH(20)} />
              </View>
              <View style={{ flex: 1 }} />
              <Button
                title={strings.management.startSession}
                textStyle={{
                  ...styles.buttonText,
                  ...{ color: amountCount ? COLORS.white : COLORS.darkGray },
                }}
                style={{
                  ...styles.saveButton,
                  ...{
                    backgroundColor: amountCount ? COLORS.primary : COLORS.textInputBackground,
                  },
                }}
                onPress={startTrackingSesHandler}
              />
              <Spacer space={SH(40)} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  const onChangeFun = (search) => {
    if (search.length > 3) {
      dispatch(searchProductList(search, sellerID));
      setSearchModal(true);
    } else if (search.length < 3) {
      setSearchModal(false);
    }
  };

  const bodyView = () => (
    <View style={styles.homeScreenCon}>
      <View style={styles.displayRow}>
        <View style={styles.cashProfileCon}>
          <Spacer space={SH(12)} />
          <View style={styles.cashProfilecon}>
            <Image
              source={
                getPosUser?.user_profiles?.profile_photo
                  ? { uri: getPosUser?.user_profiles?.profile_photo }
                  : cashProfile
              }
              style={styles.cashProfile}
            />
          </View>
          <Text style={styles.cashierName}>
            {getPosUser?.user_profiles?.firstname ?? 'username'}
          </Text>
          <Text style={styles.posCashier}>
            {getPosUser?.user_roles?.length > 0
              ? getPosUser?.user_roles?.map((item) => item.role?.name)
              : 'admin'}
          </Text>
          <Text style={styles.cashLabel}>ID : {getPosUser?.user_profiles?.user_id ?? '0'}</Text>
          <Spacer space={SH(10)} />

          <View style={styles.todaySaleCon}>
            <View style={styles.displayflex}>
              <Text style={styles.todaySale}>{strings.dashboard.todaySale}</Text>
              {/* <TouchableOpacity
                    style={{
                      width: SW(30),
                      height: SW(8),
                      backgroundColor: COLORS.primary,
                      color: COLORS.white,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 3,
                    }}
                    onPress={() => setYourSessionEndModal(true)}
                  >
                    <Text style={{ color: COLORS.white }}>Your Session</Text>
                  </TouchableOpacity> */}
            </View>
            <Spacer space={SH(4)} backgroundColor={COLORS.textInputBackground} />
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
            <Spacer space={SH(4)} backgroundColor={COLORS.textInputBackground} />
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.dashboard.openBal}</Text>
              <Text style={styles.cashAmount}>${profileObj?.openingBalance}</Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.dashboard.closeBal}</Text>
              <Text style={styles.cashAmount}>${profileObj?.closeBalance}</Text>
            </View>
          </View>
          <Spacer space={SH(10)} />
          <View style={styles.profileHrRow}></View>
          <Spacer space={SH(10)} />

          <View style={styles.sessionCon}>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>
                {moment().format('dddd')}
                {', '}
                {moment().format('ll')}
              </Text>
              <Text style={styles.cashLabel}>{moment().format('LTS')}</Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.dashboard.logTime}</Text>
              <Text style={styles.cashAmount}>
                {moment(getLoginDeatil?.updated_at).format('LTS')}
              </Text>
            </View>
            <View style={[styles.displayflex, styles.paddingV]}>
              <Text style={styles.cashLabel}>{strings.dashboard.session}</Text>
              <Text style={styles.cashAmount}>
                {getLoginSessionTime(moment(getLoginDeatil?.updated_at).format('LTS'))}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            onPress={() => {
              dispatch(getOrdersByInvoiceIdSuccess({}));
              navigate(NAVIGATION.refund, { screen: 'intial' });
            }}
            style={styles.checkoutButton}
          >
            <View style={styles.displayRow}>
              <Image source={productReturn} style={styles.lockLight} />
              <Text style={styles.checkoutText1}>{strings.dashboard.productReturn}</Text>
            </View>
          </TouchableOpacity>

          <Spacer space={SH(10)} />

          <TouchableOpacity
            style={styles.checkoutButton}
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
            <View style={styles.displayRow}>
              <Image source={lockLight} style={styles.lockLight} />
              <Text style={[styles.checkoutText1]}>{strings.dashboard.lockScreen}</Text>
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
              {/* {scan ? ( */}
              <TextInput
                placeholder="Scan Product"
                style={styles.searchInput}
                // editable={false}
                value={sku}
                onChangeText={(sku) => {
                  onSetSkuFun(sku);
                }}
                ref={textInputRef}
              />
              {/* ) : ( */}
              {/* <TextInput
                placeholder="Search"
                style={styles.searchInput}
                value={search}
                onChangeText={(search) => {
                  setSearch(search);
                  onChangeFun(search);
                }}
              /> */}
              {/* )} */}
            </View>
            <TouchableOpacity
              onPress={() => textInputRef.current.focus()}
              // onPress={() => setScan(!scan)}
            >
              {/* <Image source={scan ? scanSearch : scn} style={styles.scnStyle} /> */}
              <Image source={scn} style={styles.scnStyle} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(20)} />

          <View style={styles.displayflex}>
            {STARTSELLING.map((item, index) => (
              <View style={styles.storeCardCon} key={index}>
                <Image source={item.image} style={styles.sellingBucket} />
                <Spacer space={SH(8)} />
                <Text style={styles.startSelling}>{item.heading}</Text>
                <Spacer space={SH(4)} />
                <Text style={styles.scanSer}>{item.subHeading}</Text>
                <Spacer space={SH(12)} />
                <TouchableOpacity
                  style={styles.arrowBtnCon}
                  onPress={() => startSellingHandler(item.id)}
                >
                  <Image source={sellingArrow} style={styles.sellingArrow} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <Spacer space={SH(20)} />

          <View style={styles.homeTableCon}>
            <View>
              <Text style={styles.deliveries}>{strings.dashboard.deliveries}</Text>
            </View>
            {getDeliveryData?.length === 0 || getDeliveryData === undefined ? (
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
                // ListFooterComponent={renderFooterPost}
                // onEndReached={debouncedLoadMoreOrder}
                // onEndReachedThreshold={1}
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
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={searchModal || searchModalDetail}
        avoidKeyboard={false}
      >
        {searchModalDetail ? (
          <PosSearchDetailModal
            backArrowhandler={() => (setSearchModal(true), setSearchModalDetail(false))}
            productData={productDet}
          />
        ) : (
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <PosSearchListModal
              listFalseHandler={() => (setSearchModal(false), setSearch(''))}
              getProductListArray={getProductListArray}
              search={search}
              setSearch={setSearch}
              onChangeFun={onChangeFun}
              viewDetailHandler={(item) => (
                setSearchModal(false), setSearchModalDetail(true), setproductDet(item)
              )}
              // item={}
            />
          </KeyboardAvoidingView>
        )}
      </Modal>
      {/* Search List modal end*/}
    </ScreenWrapper>
  );
}
