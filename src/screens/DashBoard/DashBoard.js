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
  cashProfile,
  checkArrow,
  clock,
  crossButton,
  lockLight,
  pay,
  pin,
  rightIcon,
  scn,
  search_light,
  sellingArrow,
  sellingBucket,
} from '@/assets';
import { STARTSELLING, homeTableData } from '@/constants/flatListData';
import { SearchScreen } from './Components';
import { logoutFunction } from '@/actions/AuthActions';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDrawerSession,
  getDrawerSessionPost,
  getOrderDeliveries,
} from '@/actions/DashboardAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { useIsFocused } from '@react-navigation/native';
import { getDashboard } from '@/selectors/DashboardSelector';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { TYPES } from '@/Types/DashboardTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { digits } from '@/utils/validators';
const windowWidth = Dimensions.get('window').width;

export function DashBoard() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getDelivery = useSelector(getDashboard);
  const getSessionObj = getDelivery?.getSesssion;
  const sellerID = getAuth?.getProfile?.unique_uuid;
  const getDeliveryData = getDelivery?.getOrderDeliveries;
  const [searchScreen, setSearchScreen] = useState(false);
  const [trackingSession, setTrackingSession] = useState(false);
  const [amountCount, setAmountCount] = useState();
  const [trackNotes, setTrackNotes] = useState('');

  useEffect(() => {
    if (isFocused) {
      dispatch(getOrderDeliveries(sellerID));
      startTrackingFun();
    }
  }, [isFocused]);

  const startTrackingFun = () => {
    dispatch(getDrawerSession());
    if (
      Object.keys(getSessionObj === undefined ? {} : getSessionObj)?.length ===
        0 ||
      getSessionObj === undefined
    ) {
      setTrackingSession(true);
    } else if (
      Object.keys(getSessionObj === undefined ? {} : getSessionObj)?.length >= 1
    ) {
      setTrackingSession(false);
      setAmountCount('');
      setTrackNotes('');
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
  const isloading = () => {};

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
    <TouchableOpacity style={[styles.reviewRenderView]}>
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

  const bodyView = () => {
    if (searchScreen) {
      return (
        <View>
          <SearchScreen crossBgHandler={() => setSearchScreen(false)} />
        </View>
      );
    } else {
      return (
        <View style={styles.homeScreenCon}>
          <View style={styles.displayRow}>
            <View style={styles.cashProfileCon}>
              {/* <Spacer space={SH(20)} /> */}
              {/* <View style={styles.cashProfilecon}> */}
              <Image source={cashProfile} style={styles.cashProfile} />
              {/* </View> */}
              <Text style={styles.cashierName}>Rebecca R. Russell</Text>
              <Text style={styles.posCashier}>POS Cashier</Text>
              <Text style={styles.cashLabel}>ID : 3579EN</Text>
              <Spacer space={SH(12)} />

              <View style={styles.todaySaleCon}>
                <Text style={styles.todaySale}>
                  {strings.dashboard.todaySale}
                </Text>
                <Spacer space={SH(4)} />
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.cashSaleAmount}
                  </Text>
                  <Text style={styles.cashAmount}>$400.50</Text>
                </View>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.cardSaleAmount}
                  </Text>
                  <Text style={styles.cashAmount}>$400.50</Text>
                </View>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.jobrCoinSaleAmount}
                  </Text>
                  <Text style={styles.cashAmount}>JOBR 400.50</Text>
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
                  <Text style={styles.cashAmount}>$400.50</Text>
                </View>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.closeBal}
                  </Text>
                  <Text style={styles.cashAmount}>$400.50</Text>
                </View>
              </View>
              <Spacer space={SH(10)} />
              <View style={styles.profileHrRow}></View>
              <Spacer space={SH(10)} />

              <View style={styles.sessionCon}>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>Today 25 April, 2023</Text>
                  <Text style={styles.cashLabel}>11:14:23 AM</Text>
                </View>
                <View style={[styles.displayflex, styles.paddingV]}>
                  <Text style={styles.cashLabel}>
                    {strings.dashboard.logTime}
                  </Text>
                  <Text style={styles.cashAmount}>11:14:23 AM</Text>
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
                // onPress={() => logoutHandler()}
                onPress={() => setTrackingSession(true)}
              >
                <View style={styles.displayRow}>
                  <Image source={lockLight} style={styles.lockLight} />
                  <Text style={[styles.checkoutText]}>
                    {strings.dashboard.lockScreen}
                  </Text>
                </View>
              </TouchableOpacity>

              <Spacer space={SH(10)} />
            </View>
            <View style={styles.rightOrderCon}>
              <TouchableOpacity
                style={styles.inputWraper}
                onPress={() => setSearchScreen(true)}
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
                <TouchableOpacity>
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
                <Text style={styles.deliveries}>
                  {strings.dashboard.deliveries}
                </Text>
                {orderDelveriesLoading ? (
                  <View style={{ marginTop: 50 }}>
                    <ActivityIndicator size="large" color={COLORS.indicator} />
                  </View>
                ) : getDeliveryData?.length === 0 ? (
                  <View>
                    <Text style={styles.requestNotFound}>orders not found</Text>
                  </View>
                ) : (
                  <FlatList
                    data={getDeliveryData}
                    extraData={getDeliveryData}
                    renderItem={tableListItem}
                    keyExtractor={item => item.id}
                  />
                )}
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
    </ScreenWrapper>
  );
}
