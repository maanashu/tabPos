import React, { useEffect, useState } from 'react';
import { Button, ScreenWrapper, Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import {
  Fonts,
  Phone_light,
  addDiscountPic,
  backArrow,
  cashProfile,
  checkArrow,
  clock,
  crossBg,
  crossButton,
  deliveryScooter,
  email,
  eraser,
  keyboard,
  location,
  lockLight,
  notifications,
  ok,
  pause,
  pay,
  pin,
  rightIcon,
  scn,
  search_light,
  sellingArrow,
  sellingBucket,
  sessionEndBar,
  terryProfile,
  userImage,
} from '@/assets';
import { STARTSELLING, homeTableData } from '@/constants/flatListData';
import {
  CartProductList,
  Categories,
  CategoryList,
  Numpad,
  Products,
  ReadyPickupDetails,
  ReadyToPickup,
  SearchScreen,
} from './Components';
import { logoutFunction } from '@/actions/AuthActions';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDrawerSession,
  getDrawerSessionPost,
  getDrawerSessionSuccess,
  getOrderDeliveries,
  getTotalSale,
  getTotalSaleAction,
} from '@/actions/DashboardAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import { getDashboard } from '@/selectors/DashboardSelector';
import { navigate, navigationRef } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { TYPES } from '@/Types/DashboardTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { digits } from '@/utils/validators';
import moment from 'moment';
import { endTrackingSession } from '@/actions/CashTrackingAction';
import { moderateScale } from 'react-native-size-matters';
import { getUser } from '@/selectors/UserSelectors';
import { logoutUserFunction } from '@/actions/UserActions';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function DashBoard({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getUserData = useSelector(getUser);
  const getDelivery = useSelector(getDashboard);
  const getSessionObj = getDelivery?.getSesssion;
  const getPosUser = getUserData?.posLoginData;
  const TotalSale = getDelivery?.getTotalSale;
  const sellerID = getAuth?.merchantLoginData?.uuid;
  const getDeliveryData = getDelivery?.getOrderDeliveries;
  const [searchScreen, setSearchScreen] = useState(false);
  const [trackingSession, setTrackingSession] = useState(false);
  const [amountCount, setAmountCount] = useState();
  const [trackNotes, setTrackNotes] = useState('');
  const [productdetailModal, setProductdetailModal] = useState(false);
  const [selected, setSelected] = useState('categoryList');
  const [yourSessionEndModal, setYourSessionEndModal] = useState(false);
  const [readyPickup, setReadyPickup] = useState(false);
  const [pickupDetails, setPickupDetails] = useState(false);

  const [currentTime, setCurrentTime] = useState(moment().format('HH:mm:ss'));

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
  // const [time, setTime] = useState(Date.now());

  // useEffect(() => {
  //   const interval = setInterval(() => setTime(Date.now()), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(getOrderDeliveries(sellerID));
      startTrackingFun();
      clearInput();
      // dispatch(getTotalSaleAction(sellerID));
    }
  }, [isFocused]);

  const clearInput = () => {
    setAmountCount('');
    setTrackNotes('');
  };

  const startTrackingFun = async () => {
    const res = await dispatch(getDrawerSession());
    // if (res) {
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

  const orderDelveriesLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_ORDER_DELIVERIES], state)
  );
  const getSessionLoad = useSelector(state =>
    isLoadingSelector([TYPES.GET_DRAWER_SESSION], state)
  );

  const logoutHandler = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutFunction());
          // dispatch(logoutUserFunction());
        },
      },
    ]);
  };

  const startSellingHandler = id => {
    if (id === 1) {
      navigate(NAVIGATION.retails);
    } else if (id === 2) {
      navigate(NAVIGATION.deliveryOrder);
    }
  };

  const tableListItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.reviewRenderView]}
      onPress={() => alert('dfghjk')}
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
          <Text style={styles.timeText}>
            {item?.distance ? item?.distance : '0miles'} miles
          </Text>
        </View>
      </View>

      <View style={{ width: SW(25) }}>
        <Text style={styles.nameText}>{item?.order_details?.length} items</Text>
        <View style={styles.timeView}>
          <Image source={pay} style={styles.pinIcon} />
          <Text style={styles.timeText}>
            ${item.payable_amount ? item.payable_amount : '0'}
          </Text>
        </View>
      </View>

      <View style={{ width: SW(50) }}>
        <Text style={[styles.nameText, styles.nameTextBold]}>
          {item?.shipping ? item?.shipping : 'no delivery type'}
        </Text>
        <View style={styles.timeView}>
          <Image source={clock} style={styles.pinIcon} />
          <Text style={styles.timeText}>
            {item?.preffered_delivery_start_time} -{' '}
            {item?.preffered_delivery_end_time}
          </Text>
        </View>
      </View>

      <View style={styles.rightIconStyle}>
        <View style={styles.timeView}>
          <Text style={[styles.nameTextBold, styles.timeSec]}>00:03:56</Text>
          <Image source={rightIcon} style={styles.pinIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const trackinSessionModal = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        isVisible={trackingSession}
      >
        <View style={styles.modalMainView}>
          <View style={styles.headerView}>
            <View style={{ width: SW(140), alignItems: 'center' }}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.session}
              </Text>
            </View>

            {/* <TouchableOpacity onPress={() => {}} style={{ width: SW(10) }}>
            <Image source={crossButton} style={styles.crossIconStyle} />
          </TouchableOpacity> */}
          </View>

          <Spacer space={SH(40)} />
          <View style={styles.countCashView}>
            <Text style={styles.countCashText}>
              {strings.management.countCash}
            </Text>

            <Spacer space={SH(40)} />
            <View>
              <Text style={styles.amountCountedText}>
                {strings.management.amountCounted}
              </Text>
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
              <Text style={styles.amountCountedText}>
                {strings.management.note}
              </Text>
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
            title={strings.management.save}
            textStyle={styles.buttonText}
            style={styles.saveButton}
            onPress={startTrackingSesHandler}
          />
          <Spacer space={SH(40)} />
        </View>
      </Modal>
    );
  };

  const backHandler = () => {
    if (selected === 'numpad') {
      setSelected('cartproductList');
    } else if (selected === 'cartproductList') {
      setSelected('categoryList');
    } else if (selected === 'categories') {
      setSelected('categoryList');
    } else if (selected === 'products') {
      setSelected('categories');
    } else {
      setSearchScreen(false);
    }
  };

  const renderView = {
    ['categoryList']: (
      <CategoryList
        listedHandler={() => setSelected('cartproductList')}
        categoryhandler={() => setSelected('categories')}
      />
    ),
    ['cartproductList']: (
      <CartProductList cartproductListHandler={() => setSelected('numpad')} />
    ),
    ['categories']: (
      <Categories subCategoryHandler={() => setSelected('products')} />
    ),
    ['products']: (
      <Products productClickHandler={() => setProductdetailModal(true)} />
    ),
    ['numpad']: <Numpad />,
  };

  const screenChangeView = () => {
    return renderView[selected];
  };

  const bodyView = () => {
    if (pickupDetails) {
      return (
        <View>
          <ReadyPickupDetails
            backHandler={() => (setPickupDetails(false), setReadyPickup(true))}
          />
        </View>
      );
    } else if (readyPickup) {
      return (
        <View>
          <ReadyToPickup
            backHandler={() => setReadyPickup(false)}
            pickupDetailHandler={() => (
              setReadyPickup(false), setPickupDetails(true)
            )}
          />
        </View>
      );
    } else if (searchScreen) {
      return (
        <View style={[styles.homeScreenCon, styles.backgroundColorSCreen]}>
          <View style={styles.searchScreenHeader}>
            <View style={styles.displayflex}>
              <Text style={styles.cashLabelBold}>Wed 26 Apr , 2023</Text>
              <Text style={styles.cashLabelBold}>Walk-In</Text>
              <Text style={styles.cashLabelBold}>Invoice No. # 3467589</Text>
              <Text style={styles.cashLabelBold}>POS No. #Front-CC01</Text>
              <TouchableOpacity onPress={backHandler}>
                <Image source={crossBg} style={styles.crossBg} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.displayflex2}>
            <View style={styles.itemLIistCon}>{screenChangeView()}</View>

            <View
              pointerEvents="auto"
              style={[
                styles.itemLIistCon,
                styles.rightSideCon,
                // { opacity: 0.1 },
              ]}
            >
              <View style={styles.displayflex}>
                <Image source={keyboard} style={styles.keyboard} />
                <TouchableOpacity
                  style={styles.holdCartCon}
                  onPress={() => setProductdetailModal(true)}
                >
                  <Image source={pause} style={styles.pause} />

                  <Text style={styles.holdCart}>
                    {strings.dashboard.holdCart}
                  </Text>
                </TouchableOpacity>
                <View style={[styles.holdCartCon, styles.dark_greyBg]}>
                  <Image source={eraser} style={styles.pause} />
                  <Text style={styles.holdCart}>
                    {strings.dashboard.clearcart}
                  </Text>
                </View>
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
                      // value={search}
                      // onChangeText={search => (
                      //   setSearch(search), onChangeFun(search)
                      // )}
                      placeholderTextColor={COLORS.solid_grey}
                    />
                  </View>
                </View>
                <View style={styles.nameAddSingleCon}>
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
                </TouchableOpacity>
              </View>
              <Spacer space={SH(10)} />

              <View style={styles.displayflex}>
                <View style={styles.addDiscountCon}>
                  <Image
                    source={addDiscountPic}
                    style={styles.addDiscountPic}
                  />
                  <Text style={styles.addDiscountText}>Add Discount</Text>
                </View>
                <View style={styles.addDiscountCon}>
                  <Image
                    source={addDiscountPic}
                    style={styles.addDiscountPic}
                  />
                  <Text style={styles.addDiscountText}>Add Notes</Text>
                </View>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles.totalItemCon}>
                <Text style={styles.totalItem}>
                  {strings.dashboard.totalItem}
                  {' 10'}
                </Text>
              </View>
              <Spacer space={SH(5)} />
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Sub Total</Text>
                <Text style={styles.subTotalDollar}>$4.00</Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Total VAT</Text>
                <Text style={styles.subTotalDollar}>$4.00</Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Total Taxes</Text>
                <Text style={styles.subTotalDollar}>$4.00</Text>
              </View>
              <View style={[styles.displayflex2, styles.paddVertical]}>
                <Text style={styles.subTotal}>Discount</Text>
                <Text style={styles.subTotalDollar}>$4.00</Text>
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
                <Text style={styles.subTotalDollar}>$4.00</Text>
              </View>
              <View style={{ flex: 1 }} />
              <TouchableOpacity style={styles.checkoutButtonSideBar}>
                <Text style={styles.checkoutText}>
                  {strings.retail.checkOut}
                </Text>
                <Image source={checkArrow} style={styles.checkArrow} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.homeScreenCon}>
          <View style={styles.displayRow}>
            <View style={styles.cashProfileCon}>
              {/* <Spacer space={SH(20)} /> */}
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
              <Text style={styles.posCashier}>POS Cashier</Text>
              <Text style={styles.cashLabel}>
                ID : {getPosUser?.user_profiles?.user_id ?? '0'}
              </Text>
              <Spacer space={SH(12)} />

              <View style={styles.todaySaleCon}>
                <View style={styles.displayflex}>
                  <Text style={styles.todaySale}>
                    {strings.dashboard.todaySale}
                  </Text>
                  <TouchableOpacity
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
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(4)} />
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.cashSaleAmount}
                  </Text>
                  <Text style={styles.cashAmount}>
                    ${TotalSale?.[3]?.total_sale_amount ?? '0.00'}
                  </Text>
                </View>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.cardSaleAmount}
                  </Text>
                  <Text style={styles.cashAmount}>
                    ${TotalSale?.[2]?.total_sale_amount ?? '0.00'}
                  </Text>
                </View>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.jobrCoinSaleAmount}
                  </Text>
                  <Text style={styles.cashAmount}>
                    JOBR {TotalSale?.[1]?.total_sale_amount ?? '0.00'}
                  </Text>
                </View>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles.todaySaleCon}>
                <Text style={styles.todaySale}>
                  {strings.dashboard.cashDrawer}
                </Text>
                <Spacer space={SH(4)} />
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.openBal}
                  </Text>
                  <Text style={styles.cashAmount}>
                    ${profileObj?.openingBalance}
                  </Text>
                </View>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.closeBal}
                  </Text>
                  <Text style={styles.cashAmount}>
                    ${profileObj?.closeBalance}
                  </Text>
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
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.logTime}
                  </Text>
                  <Text style={styles.cashAmount}>
                    {moment(getPosUser?.user_profiles?.updated_at).format(
                      'LTS'
                    )}
                  </Text>
                </View>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.session}
                  </Text>
                  <Text style={styles.cashAmount}>1h 3m</Text>
                </View>
              </View>
              <View style={{ flex: 1 }} />
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
                    // if (navigation) {
                    //   navigation.dispatch(
                    //     CommonActions.reset({
                    //       index: 0,
                    //       routes: [{ name: NAVIGATION.posUsers }],
                    //     })
                    //   );
                    // }
                  } else {
                    alert('something went wrong');
                  }
                }}
              >
                <View style={styles.displayRow}>
                  <Image source={lockLight} style={styles.lockLight} />
                  <Text style={[styles.checkoutText1]}>
                    {strings.dashboard.lockScreen}
                  </Text>
                </View>
              </TouchableOpacity>

              <Spacer space={SH(10)} />
            </View>
            <View style={styles.rightOrderCon}>
              <TouchableOpacity
                style={styles.inputWraper}
                // onPress={() => setSearchScreen(true)}
              >
                <View style={styles.displayRow}>
                  <View>
                    <Image source={search_light} style={styles.searchStyle} />
                  </View>
                  <TextInput
                    placeholder={strings.retail.searchProduct}
                    style={styles.searchInput}
                    editable={false}
                    // value={search}
                    // onChangeText={search => (
                    //   setSearch(search), onChangeFun(search)
                    // )}
                  />
                </View>
                <TouchableOpacity onPress={() => setSearchScreen(true)}>
                  <Image source={scn} style={styles.scnStyle} />
                </TouchableOpacity>
              </TouchableOpacity>
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
                      <Image
                        source={sellingArrow}
                        style={styles.sellingArrow}
                      />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <Spacer space={SH(20)} />

              <View style={styles.homeTableCon}>
                <View>
                  <Text style={styles.deliveries}>
                    {strings.dashboard.deliveries}
                  </Text>
                </View>
                {/* {orderDelveriesLoading ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.indicator} />
                  </View>
                ) : getDeliveryData?.length === 0 ||
                  getDeliveryData === undefined ? (
                  <View>
                    <Text style={styles.requestNotFound}>Orders not found</Text>
                  </View>
                ) : (
                  <FlatList
                    data={getDeliveryData}
                    extraData={getDeliveryData}
                    renderItem={tableListItem}
                    keyExtractor={item => item.id}
                  />
                )} */}
                <TouchableOpacity
                  style={styles.reviewRenderView}
                  onPress={() => setReadyPickup(true)}
                >
                  <View style={{ width: SW(20) }}>
                    <Text style={styles.hashNumber}>#22</Text>
                  </View>
                  <View style={{ width: SW(45) }}>
                    <Text numberOfLines={1} style={styles.nameText}>
                      {'userName'}
                    </Text>
                    <View style={styles.timeView}>
                      <Image source={pin} style={styles.pinIcon} />
                      <Text style={styles.timeText}>{'0miles'} miles</Text>
                    </View>
                  </View>

                  <View style={{ width: SW(25) }}>
                    <Text style={styles.nameText}>items</Text>
                    <View style={styles.timeView}>
                      <Image source={pay} style={styles.pinIcon} />
                      <Text style={styles.timeText}>${'0'}</Text>
                    </View>
                  </View>

                  <View style={{ width: SW(50) }}>
                    <Text style={[styles.nameText, styles.nameTextBold]}>
                      {'no delivery type'}
                    </Text>
                    <View style={styles.timeView}>
                      <Image source={clock} style={styles.pinIcon} />
                      <Text style={styles.timeText}>
                        {'0.00'} - {'0.00'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.rightIconStyle1}>
                    <View style={styles.timeView}>
                      <Text style={[styles.nameTextBold, styles.timeSec]}>
                        00:03:56
                      </Text>
                      <Image source={rightIcon} style={styles.pinIcon} />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {bodyView()}
        {trackinSessionModal()}
      </View>
      {getSessionLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator
            color={COLORS.primary}
            size="large"
            style={styles.loader}
          />
        </View>
      ) : null}
      <Modal
        animationType="fade"
        isVisible={productdetailModal}
        transparent={false}
        backdropOpacity={0.9}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: windowWidth * 0.5,
            height: windowHeight * 0.9,
            position: 'absolute',
            alignSelf: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: SH(70),
              paddingHorizontal: moderateScale(15),
              borderBottomWidth: 1,
              borderColor: COLORS.solidGrey,
            }}
          >
            <TouchableOpacity onPress={() => setProductdetailModal(false)}>
              <Image source={crossButton} style={styles.crossBg} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: '#F5F6F7',
                  width: SH(140),
                  height: SH(48),
                  padding: SH(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: COLORS.black,
                    fontSize: SH(16),
                    fontFamily: Fonts.SemiBold,
                  }}
                >
                  Back To Cart
                </Text>
              </View>

              <View
                style={{
                  width: SH(140),
                  height: SH(48),
                  padding: SH(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: COLORS.primary,
                  borderWidth: 1,
                  marginLeft: SH(10),
                }}
              >
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: SH(16),
                    fontFamily: Fonts.SemiBold,
                  }}
                >
                  Continue
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: COLORS.primary,
                  width: SH(140),
                  height: SH(48),
                  padding: SH(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: SH(10),
                  borderRadius: 3,
                }}
              >
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: SH(16),
                    fontFamily: Fonts.SemiBold,
                  }}
                >
                  Add to Cart
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              width: windowWidth * 0.42,
              alignSelf: 'center',
            }}
          >
            <View style={{ marginTop: SH(10) }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: SH(22),
                  fontFamily: Fonts.Bold,
                }}
              >
                Columbia Men's Rain Jacket{' '}
              </Text>
              <Text
                style={{
                  color: COLORS.dark_grey,
                  fontSize: SH(18),
                  fontFamily: Fonts.Medium,
                }}
              >
                Color:Grey
              </Text>
              <Text
                style={{
                  color: COLORS.dark_grey,
                  fontSize: SH(18),
                  fontFamily: Fonts.Medium,
                }}
              >
                Size:X
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 10,
                  marginVertical: SH(20),
                }}
              >
                <View
                  style={{
                    borderColor: '#D8D8D8',
                    borderWidth: 1,
                    width: SH(200),
                    height: SH(70),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: SH(28), fontFamily: Fonts.Bold }}>
                    -
                  </Text>
                </View>

                <View
                  style={{
                    borderColor: '#D8D8D8',
                    borderWidth: 1,
                    width: SH(200),
                    height: SH(70),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: SH(28), fontFamily: Fonts.Bold }}>
                    1
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: '#D8D8D8',
                    borderWidth: 1,
                    width: SH(200),
                    height: SH(70),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: SH(28), fontFamily: Fonts.Bold }}>
                    +
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    height: SH(2),
                    width: SH(235),
                    backgroundColor: '#D8D8D8',
                  }}
                />
                <Text
                  style={{
                    marginHorizontal: SH(10),
                    fontSize: SH(18),
                    fontFamily: Fonts.Regular,
                    color: COLORS.gerySkies,
                  }}
                >
                  COLORS
                </Text>
                <View
                  style={{
                    height: SH(2),
                    width: SH(235),
                    backgroundColor: '#D8D8D8',
                  }}
                />
              </View>

              <FlatList
                data={[1, 2, 3, 4, 5]}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: SH(142),
                        height: SH(70),
                        borderRadius: SH(10),
                        borderColor: '#E1E3E4',
                        borderWidth: 1,
                        margin: SH(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          marginHorizontal: SH(10),
                          fontSize: SH(20),
                          fontFamily: Fonts.Regular,
                          color: COLORS.gerySkies,
                        }}
                      >
                        Green
                      </Text>
                    </View>
                  );
                }}
                numColumns={4}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    height: SH(2),
                    width: SH(235),
                    backgroundColor: '#D8D8D8',
                  }}
                />
                <Text
                  style={{
                    marginHorizontal: SH(10),
                    fontSize: SH(18),
                    fontFamily: Fonts.Regular,
                    color: COLORS.gerySkies,
                  }}
                >
                  SIZE
                </Text>
                <View
                  style={{
                    height: SH(2),
                    width: SH(235),
                    backgroundColor: '#D8D8D8',
                  }}
                />
              </View>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        width: SH(142),
                        height: SH(70),
                        borderRadius: SH(10),
                        borderColor: '#E1E3E4',
                        borderWidth: 1,
                        margin: SH(5),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: SH(10),
                      }}
                    >
                      <Text
                        style={{
                          marginHorizontal: SH(10),
                          fontSize: SH(20),
                          fontFamily: Fonts.Regular,
                          color: COLORS.gerySkies,
                        }}
                      >
                        XL
                      </Text>
                    </View>
                  );
                }}
                numColumns={4}
              />
            </View>
          </View>
        </View>
        {/* </View> */}
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        isVisible={yourSessionEndModal}
      >
        <View style={styles.yourSessionendCon}>
          <View style={styles.yourSessionendHeader}>
            <Text>{null}</Text>
            <Text style={styles.yourSession}>
              {strings.dashboard.yourSessionEnd}
            </Text>
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
            <Text style={styles.yourSession}>
              {strings.dashboard.yourSessionEnd}
            </Text>
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
              style={[styles.expandOneHourButton, styles.expandTwoHourButton]}
            />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
