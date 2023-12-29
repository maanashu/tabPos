import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Platform,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';

import moment from 'moment';
import { debounce } from 'lodash';
import Modal from 'react-native-modal';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  bell,
  crossButton,
  Fonts,
  rightIcon,
  search_light,
  tray,
  backArrow,
  Calculator,
  CalculatorColor,
  dropdown,
  down,
  up,
  wallet,
  scn,
  productReturn,
  lockLight,
  powerAuth,
  userImage,
  plusDrawer,
  plus,
  addMoney,
  removeMoney,
  lock,
  lockDrawer,
  logOutDrawer,
  crossDrawer,
  cross,
  moneySearch,
  info,
  bellDrawer,
  searchDrawer,
  arrowUp,
  arrowDown,
  arrowUpRound,
  arrowDownRound,
  arrowRightTop,
  PlusCircle,
  Message,
} from '@/assets';
import {
  endTrackingSession,
  getDrawerSession,
  getDrawerSessionById,
  getDrawerSessions,
  getPaymentDrawerSessions,
  sendSessionHistory,
  trackSessionSave,
} from '@/actions/CashTrackingAction';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { digits } from '@/utils/validators';
import { COLORS, SF, SW, SH } from '@/theme';
import { TYPES } from '@/Types/CashtrackingTypes';
import { navigate } from '@/navigation/NavigationRef';
import { logoutUserFunction } from '@/actions/UserActions';
import { Button, ScreenWrapper, Spacer } from '@/components';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getCashTracking } from '@/selectors/CashTrackingSelector';
import {
  getDrawerSessionSuccess,
  getOrdersByInvoiceId,
  scanBarCode,
} from '@/actions/DashboardAction';
import { SessionHistoryTable, SummaryHistory } from '@/screens/Management/Components';

import { styles } from '@/screens/Management/Management.styles';
import OrderWithInvoiceNumber from '../Refund/Components/OrderWithInvoiceNumber';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { Loader } from '@/components/Loader';
import WalletInvoice from '../Wallet2/Components/WalletInvoice';
import { getDashboard } from '@/selectors/DashboardSelector';
import { getUser } from '@/selectors/UserSelectors';
import { logoutFunction } from '@/actions/AuthActions';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import Header from '@/components/Header';

moment.suppressDeprecationWarnings = true;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export function Management() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const drawerData = useSelector(getCashTracking);
  const getSearchOrders = useSelector(getDashboard);
  const searchData = getSearchOrders?.invoiceSearchOrders;
  const drawerActivity = drawerData?.getDrawerSession?.drawer_activites;
  const historyById = drawerData?.getDrawerSessionById?.[0];

  const getUserData = useSelector(getUser);
  const getPosUser = getUserData?.posLoginData;

  const getDashboardData = useSelector(getDashboard);
  const getSessionObj = getDashboardData?.drawerSession;
  const [sessionHistoryArray, setSessionHistoryArray] = useState(
    drawerData?.getSessionHistory ?? []
  );
  const [addCash, setAddCash] = useState(false);
  const [cashSummary, setCashSummary] = useState('');
  const [saveSession, setSaveSession] = useState('');
  const [removeCash, setRemoveCash] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [viewSession, setViewSession] = useState(false);
  const [summaryHistory, setSummaryHistory] = useState(false);
  const [cardCoinSummary, setCardCoinSummary] = useState(false);
  const [trackingSession, setTrackingSession] = useState(false);
  const [newTrackingSession, setNewTrackingSession] = useState(false);
  const [sessionHistory, setSessionHistory] = useState(false);
  const [historyHeader, setHistoryHeader] = useState(false);
  const [endSelectAmount, setEndSelectAmount] = useState(false);
  const [removeUsd, setRemoveUsd] = useState(false);
  const [amountCount, setAmountCount] = useState();
  const [trackNotes, setTrackNotes] = useState('');
  const [dropdownSelect, setDropdownSelect] = useState();
  const [addCashDropDown, setAddCashDropDown] = useState();
  const [sku, setSku] = useState();
  const cashInArray = drawerActivity?.filter((item) => item.mode_of_cash === 'cash_in');
  const cashCount = cashInArray?.map((item) => item.amount);
  const cashSum = cashCount?.reduce((partialSum, a) => partialSum + a, 0);
  const cashOutArray = drawerActivity?.filter((item) => item.mode_of_cash === 'cash_out');
  const cashOutCount = cashOutArray?.map((item) => item.amount);
  const cashOutSum = cashOutCount?.reduce((partialSum, a) => partialSum + a, 0);
  const [differentState, setdifferentState] = useState(false);
  const [addCashInput, setAddCashInput] = useState('');
  const [userHistory, setUserHistory] = useState();
  const SessionData = {
    id: drawerData?.getDrawerSession?.id,
    cashBalance: drawerData?.getDrawerSession?.cash_balance ?? '0',
    createDate: drawerData?.getDrawerSession?.created_at,
  };
  const cashIn = drawerData?.drawerHistory?.cash_in;
  const cashOut = drawerData?.drawerHistory?.cash_out;

  const cardSum =
    cashIn?.sales?.card +
    cashIn?.manual?.card +
    cashIn?.delivery_fees?.card +
    cashIn?.shipping_fees?.card;
  const jbrCoinSum =
    cashIn?.sales?.jobr_coin +
    cashIn?.manual?.jobr_coin +
    cashIn?.delivery_fees?.jobr_coin +
    cashIn?.shipping_fees?.jobr_coin;

  const cashTotalNet =
    Number(drawerData?.drawerHistory?.cash_in?.total) +
    Number(drawerData?.drawerHistory?.cash_out?.total);
  // alert(cashOut?.total);
  const [countFirst, setCountFirst] = useState();
  const [countThird, setCountThird] = useState();

  const discrepancy = SessionData?.cashBalance - countFirst;

  const [endBalance, setEndBalance] = useState();

  const [leaveId, setLeaveId] = useState(1);

  const [leaveDatas, setLeaveData] = useState('0');
  const [clickAmount, setClickAmount] = useState();
  const [showInvoice, setShowInvoice] = useState(false);
  const [viewCashInArray, setViewCashInArray] = useState(false);
  const [viewCashOutArray, setViewCashOutArray] = useState(false);
  const [salesExpandedView, setSalesExpandedView] = useState(false);
  const [salesOutExpandedView, setSalesOutExpandedView] = useState(false);
  const [manualInExpandedView, setManualInExpandedView] = useState(false);
  const [manualOutExpandedView, setManualOutExpandedView] = useState(false);
  const [closeBatch, setCloseBatch] = useState(false);
  const currentDateTime = moment();

  // Format the date and time as per your requirements
  const formattedDateTime = currentDateTime.format('M/D/YYYY h:mm a');

  const profileObj = {
    openingBalance: getSessionObj?.opening_balance,
    closeBalance: getSessionObj?.cash_balance,
    profile: getSessionObj?.seller_details?.user_profiles?.profile_photo,
    name: getSessionObj?.seller_details?.user_profiles?.firstname,
    id: getSessionObj?.id,
  };
  // Function to toggle the expansion state of an item
  const setLeavFun = (countThird) => {
    if (countThird) {
      setLeaveId(null);
    } else {
      setLeaveId(1);
    }
  };

  const leaveData = [
    {
      id: 1,
      title: 0,
    },
    {
      id: 2,
      title: SessionData?.cashBalance,
    },
  ];

  const Item = ({ item, onPress, borderColor, color, borderWidth }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.selectAmountCon,
        { borderColor, backgroundColor: COLORS.sky_grey, borderRadius: 100, borderWidth },
      ]}
    >
      <Text style={[styles.cashDrawerText, { color }]}>${item.title}</Text>
    </TouchableOpacity>
  );

  const leaveDataItem = ({ item }) => {
    const borderColor = item.id === leaveId ? COLORS.navy_blue : null;
    const color = item.id === leaveId ? COLORS.navy_blue : COLORS.navy_blue;
    const borderWidth = item.id === leaveId ? 1 : null;
    return (
      <Item
        item={item}
        onPress={() => (setLeaveId(item.id), setLeaveData(item?.title))}
        borderColor={borderColor}
        color={color}
        borderWidth={borderWidth}
      />
    );
  };

  const drawerSessLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_DRAWER_SESSION], state)
  );

  const createActivityLoad = useSelector((state) =>
    isLoadingSelector([TYPES.TRACK_SESSION_SAVE], state)
  );

  const sessionHistoryLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_SESSION_HISTORY], state)
  );

  const sendEmailLoad = useSelector((state) =>
    isLoadingSelector([TYPES.SEND_SESSION_HISTORY], state)
  );

  const oneHistoryLoad = useSelector((state) => isLoadingSelector([TYPES.GET_SESSION_BYID], state));

  const onSeachLoad = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID], state)
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(getDrawerSessions());
      dispatch(getPaymentDrawerSessions());
    }
    if (drawerData?.getSessionHistory) {
      setSessionHistoryArray(drawerData?.getSessionHistory);
    }
    return () => {
      setViewCashInArray(false);
      setViewCashOutArray(false);
    };
  }, [drawerData?.getSessionHistory, isFocused]);

  const startTrackingSesHandler = async () => {
    if (!amountCount) {
      alert('Please Enter Amount');
    } else if (amountCount && digits.test(amountCount) === false) {
      alert('Please enter valid amount');
    } else if (amountCount <= 0) {
      alert('Please enter valid amount');
    } else {
      const data = {
        drawerId: SessionData?.id,
        amount: amountCount,
        notes: trackNotes,
        transactionType: 'start_tracking_session',
        modeOfcash: 'cash_in',
      };
      const res = await dispatch(trackSessionSave(data));
      if (res) {
        dispatch(getPaymentDrawerSessions());
        dispatch(getDrawerSession());
        setTrackingSession(false);
        setSaveSession('save');
        clearInput();
      }
    }
  };

  const addCashHandler = async () => {
    if (!addCashInput) {
      alert('Please Enter Amount');
    } else if (addCashInput && digits.test(addCashInput) === false) {
      alert('Please enter valid amount');
    } else if (addCashInput <= 0) {
      alert('Please enter valid amount');
    }
    // else if (!addCashDropDown) {
    //   alert('Please Select Transaction type');
    // }
    else {
      const data = differentState
        ? {
            drawerId: SessionData?.id,
            amount: addCashInput,
            notes: trackNotes,
            // transactionType: addCashDropDown,
            transactionType: 'manual_cash_in',
            modeOfcash: 'cash_in',
          }
        : {
            drawerId: SessionData?.id,
            amount: addCashInput,
            notes: trackNotes,
            transactionType: addCashDropDown,
            transactionType: 'manual_cash_out',
            modeOfcash: 'cash_out',
          };

      const res = await dispatch(trackSessionSave(data));
      if (res) {
        dispatch(getDrawerSessions());
        dispatch(getPaymentDrawerSessions());
        setAddCash(false);
        clearInput();
      }
    }
  };

  const countCashFirst = () => {
    if (countFirst && digits.test(countFirst) === false) {
      alert('Please enter valid amount');
    } else if (countFirst <= 0) {
      alert('Please enter valid amount');
    } else {
      setEndSession(false), setCashSummary(true);
    }
  };

  const endTrackingHandler = async () => {
    const data = countThird
      ? {
          amount: parseInt(countThird),
          drawerId: SessionData?.id,
          transactionType: 'end_tracking_session',
          modeOfcash: 'cash_out',
        }
      : {
          amount: leaveDatas,
          drawerId: SessionData?.id,
          transactionType: 'end_tracking_session',
          modeOfcash: 'cash_out',
        };

    const res = await endTrackingSession(data)(dispatch);
    setClickAmount(data?.amount);
    if (res) {
      // dispatch(getDrawerSession());
      // setLeaveData('')
      dispatch(getPaymentDrawerSessions());
      setEndBalance(res?.payload?.getSessionHistory?.payload);
      setEndSelectAmount(false), setRemoveUsd(true);
    }
  };

  const clearInput = () => {
    setAmountCount('');
    setTrackNotes('');
    setAddCashInput('');
    setAddCashDropDown();
    setDropdownSelect();
    setdifferentState(false);
  };

  const tableTouchHandler = (item) => {
    setUserHistory(item);
    setSessionHistory(false), setSummaryHistory(true);
    dispatch(getPaymentDrawerSessions(item.id));
  };

  const emailButtonHandler = async () => {
    const data = await sendSessionHistory(SessionData?.id)(dispatch);
    if (data) {
      dispatch(logoutUserFunction());
      setSummaryHistory(false), setSummaryHistory(false), setViewSession(false);
      setHistoryHeader(false);
      setViewSession(false);
      setHistoryHeader(false);
    }
  };

  const onSearchInvoiceHandler = (text) => {
    if (text.includes('Invoice_') || text.includes('invoice_')) {
      dispatch(scanBarCode(text));
    } else {
      if (text?.length > 0) {
        dispatch(
          getOrdersByInvoiceId(text, (res) => {
            setShowInvoice(true);
          })
        );
      } else {
        setShowInvoice(false);
      }
    }
  };

  const debouncedSearchInvoice = useCallback(debounce(onSearchInvoiceHandler, 800), []);
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
          confirmLogout();
        },
      },
    ]);
  };

  const confirmLogout = () => {
    // if (googleAuthenticator) {
    //   setTwoFactorEnabled(true);
    //   setSixDigit(true);
    //   setIsLogout(true);
    // } else {
    dispatch(logoutFunction());
    // setIsLogout(false);
    // setValue('');
    // setTwoFactorEnabled(false);
    // setTwoStepModal(false);
    // setGoogleAuthScan(false);
    // setSixDigit(false);
    // }
  };
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        {sessionHistory || viewSession ? (
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              viewSession ? setViewSession(false) : setSessionHistory(false);
            }}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.deliveryView}>
            <Image source={moneySearch} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.management.salesTracking}</Text>
          </View>
        )}
        <View style={styles.deliveryView}>
          <TouchableOpacity
            onPress={() =>
              navigate(NAVIGATION.notificationsList, {
                screen: NAVIGATION.management,
              })
            }
          >
            <Image source={bellDrawer} style={[styles.truckStyle, { right: 25 }]} />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image source={searchDrawer} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.searchInHistory}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.navy_blue}
              onChangeText={(text) => {
                setSku(text);
                debouncedSearchInvoice(text);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const trackinSessionModal = () => {
    return (
      <Modal transparent isVisible={trackingSession}>
        <View style={styles.modalMainView}>
          <View style={styles.headerView}>
            <View style={{ width: SW(140), alignItems: 'center' }}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.session}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setTrackingSession(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />
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
              />
            </View>
            {/* <TransactionDropDown selected={onchangeValue} /> */}
            <Spacer space={SH(20)} />
            {/* <View>
              <Text style={styles.amountCountedText}>
                {strings.management.transactionType}
              </Text>
              <View style={{ flex: 1 }}>
             
              </View>
            </View> */}
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

  const addCashModal = () => {
    return (
      <Modal transparent isVisible={addCash}>
        <KeyboardAwareScrollView contentContainerStyle={[styles.modalMainView, { width: SW(150) }]}>
          <View
            style={[
              styles.headerView,
              // { backgroundColor: removeCash ? COLORS.black : COLORS.primary },
            ]}
          >
            <View style={{ width: SW(135), alignItems: 'center' }}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16), color: COLORS.white }]}>
                {removeCash ? strings.management.removeCash : strings.management.addCash}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setAddCashInput('');
                setAddCash(false), setdifferentState(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={[styles.crossIconStyle, { right: SW(5) }]} />
            </TouchableOpacity>
          </View>

          {/* <Spacer space={SH(20)} /> */}
          <View style={styles.countCashView}>
            <Image
              source={removeCash ? removeMoney : addMoney}
              style={[styles.addMoneyStyle, removeCash && { tintColor: COLORS.orange }]}
            />
            <Spacer space={SH(20)} />
            <Text style={styles.countCashText}>
              {removeCash ? strings.management.removeCash : strings.management.addCash}
            </Text>
            <Spacer space={SH(10)} />
            <Text
              style={[
                styles.amountCountedText,
                { textAlign: 'center', color: COLORS.navy_blue, fontSize: SH(20) },
              ]}
            >
              {strings.management.enterAmount}
            </Text>
            <Spacer space={SH(20)} />
            <View>
              <Text style={styles.amountCountedText}>{strings.management.enterAmount}</Text>
              <Spacer space={SH(5)} />
              <TextInput
                placeholder={strings.management.amount}
                style={styles.inputStyle}
                placeholderTextColor={COLORS.navy_blue}
                keyboardType="number-pad"
                value={addCashInput}
                // onChangeText={(text) => {
                //   if (text.replace(/[^0-9]/g, '')) {
                //     setAddCashInput(text);
                //   }
                // }}
                onChangeText={(text) => {
                  // Filter out non-numeric characters
                  const numericValue = text.replace(/[^0-9]/g, '');
                  setAddCashInput(numericValue);
                }}
              />
            </View>

            <Spacer space={SH(20)} />
            <View>
              <Text style={styles.amountCountedText}>{strings.management.hintText}</Text>
              <Spacer space={SH(5)} />
              <View
                style={[styles.noteInputStyleNew, { flexDirection: 'row', alignItems: 'center' }]}
              >
                <Image
                  source={Message}
                  style={[
                    styles.crossIconStyle,
                    { right: SW(5), tintColor: COLORS.lavender, marginStart: ms(10) },
                  ]}
                />

                <TextInput
                  placeholder={strings.management.note}
                  style={{
                    width: SW(105),
                    height: SH(60),
                    borderRadius: 5,
                    fontFamily: Fonts.Italic,
                    fontSize: SF(16),
                    color: COLORS.navy_blue,
                  }}
                  // style={styles.noteInputStyleNew}
                  placeholderTextColor={COLORS.navy_blue}
                  value={trackNotes}
                  onChangeText={setTrackNotes}
                />
              </View>
            </View>
            <Spacer space={SH(20)} />
            {/* <View>
              <Text style={styles.amountCountedText}>{strings.management.transactionType}</Text>
              <View style={styles.addCashDrop}>
               
                <TextInput
                  editable={false}
                  // placeholder={"Manual Cash In"}
                  style={styles.noteInputStyle}
                  placeholderTextColor={COLORS.gerySkies}
                  value={removeCash ? 'Manual Cash Out' : 'Manual Cash In'}
                  // onChangeText={setTrackNotes}
                />
              </View>
            </View> */}
          </View>

          {/* <Spacer space={SH(90)} /> */}
          {/* <View style={{ flex: 1 }} /> */}
          <Button
            title={strings.management.save}
            textStyle={styles.buttonText}
            style={[
              styles.saveButton,
              {
                backgroundColor: addCashInput !== '' ? COLORS.navy_blue : COLORS.gerySkies,
                borderRadius: 100,
              },
            ]}
            // onPress={() => {
            //   setAddCash(false);
            // }}
            onPress={addCashHandler}
          />
          <Spacer space={SH(40)} />
        </KeyboardAwareScrollView>
      </Modal>
    );
  };

  const endSessionFunction = () => {
    if (endSession) {
      return (
        <View style={[styles.absoluteZero]}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}></Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setEndSession(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>

          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(15)} />
            <Image source={moneySearch} style={styles.calculatorStyle} />
            <Spacer space={SH(25)} />
            <View>
              <Text style={[styles.countCashText, { fontFamily: Fonts.MaisonBold }]}>
                {strings.management.endCashTrackingSession}
              </Text>
              <Spacer space={SH(45)} />
              <View>
                <Text style={styles.amountCountedText}>{strings.management.enterAmount}</Text>
                <Spacer space={SH(5)} />
                <TextInput
                  style={styles.inputStyle}
                  placeholder={strings.management.amount}
                  placeholderTextColor={COLORS.navy_blue}
                  value={countFirst}
                  // onChangeText={setCountFirst}
                  keyboardType="number-pad"
                  onChangeText={(text) => {
                    // Filter out non-numeric characters
                    const numericValue = text.replace(/[^0-9]/g, '');
                    setCountFirst(numericValue);
                  }}
                />
              </View>
              <Spacer space={SH(80)} />
            </View>

            <TouchableOpacity
              disabled={countCashFirst == ''}
              activeOpacity={0.5}
              onPress={() => {
                countCashFirst();
                // setEndSession(false), setCashSummary(true);
              }}
              style={[
                styles.nextButtonEnd,
                { position: 'absolute', bottom: ms(30) },
                countFirst == '' && { backgroundColor: 'grey' },
              ]}
            >
              <Text style={styles.sessionHistoryTextNew}>{strings.management.next}</Text>
              <Image source={arrowRightTop} style={styles.crossImage} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (cashSummary) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}></Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setCashSummary(false), setEndSession(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>

          <View style={styles.trackingBodyCon}>
            <Image source={moneySearch} style={styles.calculatorStyle} />
            <Spacer space={SH(5)} />
            <Text style={[styles.countCashText, { textAlign: 'center' }]}>
              {strings.management.endCashTrackingSession}
            </Text>
            <Spacer space={SH(30)} />
            <View>
              <Text style={[styles.countCashText, { textAlign: 'left' }]}>
                {strings.management.cashSummary}
              </Text>
              <Spacer space={SH(15)} />
              {/* <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              /> */}
              <View
                style={{
                  borderColor: COLORS.navy_blue,
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  // height: 1,
                }}
              />
              <Spacer space={SH(15)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>{strings.management.amountexpect}</Text>
                <Text style={styles.amountExpect}>
                  {'USD $'}
                  {SessionData?.cashBalance}
                </Text>
              </View>
              <Spacer space={SH(12.5)} />
              {/* <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              /> */}
              <View
                style={{
                  borderColor: COLORS.navy_blue,
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  // height: 1,
                }}
              />
              <Spacer space={SH(12.5)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>{strings.management.amountCounted}</Text>
                <Text style={styles.amountExpect}>
                  {'USD $'}
                  {countFirst}
                </Text>
              </View>

              <Spacer space={SH(12.5)} />
              {/* <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              /> */}
              <View
                style={{
                  borderColor: COLORS.navy_blue,
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  // height: 1,
                }}
              />
              <Spacer space={SH(12.5)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text
                  style={[
                    styles.amountExpect,
                    { color: discrepancy < 0 ? COLORS.red : COLORS.navy_blue },
                  ]}
                >
                  {strings.management.discrepancy}
                </Text>
                <Text
                  style={[
                    styles.amountExpect,
                    { color: discrepancy < 0 ? COLORS.red : COLORS.navy_blue },
                  ]}
                >
                  {discrepancy < 0 ? '-' : null} {'USD'} $
                  {discrepancy < 0 ? Math.abs(discrepancy) : discrepancy}
                </Text>
              </View>
            </View>

            {/* <Button
              style={[styles.saveButton, { backgroundColor: COLORS.navy_blue, borderRadius: 100 }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.next}
              onPress={() => {
                setCashSummary(false), setEndSelectAmount(true);
                setCountThird(''), setLeaveId(1), setLeaveData('0');
              }}
            /> */}

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                setCashSummary(false), setEndSelectAmount(true);
                setCountThird(''), setLeaveId(1), setLeaveData('0');
              }}
              style={[styles.nextButtonEnd, { position: 'absolute', bottom: ms(15) }]}
            >
              <Text style={styles.sessionHistoryTextNew}>{strings.management.next}</Text>
              <Image source={arrowRightTop} style={styles.crossImage} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (endSelectAmount) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {/* {strings.management.endCashTrackingSession} */}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setEndSelectAmount(false), setCashSummary(true);
              }}
              style={{ width: SW(12) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.trackingBodyCon}>
            <Image source={moneySearch} style={styles.calculatorStyle} />
            <Spacer space={SH(30)} />
            <View>
              <Text style={[styles.countCashText, { fontFamily: Fonts.MaisonBold }]}>
                {strings.management.endCashTrackingSession}
              </Text>
              <Spacer space={SH(20)} />

              <FlatList
                data={leaveData}
                extraData={leaveData}
                renderItem={leaveDataItem}
                keyExtractor={(item) => item.id}
                horizontal
              />
              <Spacer space={SH(25)} />
              <View>
                {/* <Text style={styles.amountCountedText}>{strings.management.otherAmount}</Text> */}
                <Spacer space={SH(8)} />
                <Text style={[styles.amountCountedText, { fontSize: SF(12) }]}>
                  {strings.management.otherAmount}
                </Text>
                <Spacer space={SH(5)} />
                <TextInput
                  style={styles.inputStyle}
                  placeholder={strings.management.amount}
                  placeholderTextColor={COLORS.navy_blue}
                  value={countThird}
                  // onChangeText={(countThird) => (setCountThird(countThird), setLeavFun(countThird))}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    // Filter out non-numeric characters
                    const numericValue = text.replace(/[^0-9]/g, '');
                    setCountThird(numericValue), setLeavFun(numericValue);
                  }}
                />
              </View>
            </View>
            <Spacer space={SH(30)} />
            {/* <View style={{ flex: 1 }} /> */}
            {/* <Button
              style={[styles.saveButton, { backgroundColor: COLORS.navy_blue, borderRadius: 100 }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.next}
              // onPress={() => (setEndSelectAmount(false), setRemoveUsd(true))}
              onPress={endTrackingHandler}
            /> */}

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={endTrackingHandler}
              style={styles.nextButtonEnd}
            >
              <Text style={styles.sessionHistoryTextNew}>{strings.management.next}</Text>
              <Image source={arrowRightTop} style={styles.crossImage} />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (removeUsd) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {/* {strings.management.confirm} */}
              </Text>
            </View>
            <TouchableOpacity
              // onPress={() => {
              //   setRemoveUsd(false), setEndSelectAmount(true);
              // }}
              onPress={() => {
                setRemoveUsd(false), setSummaryHistory(true), setHistoryHeader(true);
                // setViewSession(false),
                // dispatch(getDrawerSession());
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(30)} />
          <View style={styles.trackingBodyCon}>
            <Image source={info} style={styles.infoStyle} />
            <Spacer space={SH(25)} />
            <View>
              <Text style={styles.removerDarkText}>
                Are you sure you want to remove USD $ {clickAmount ?? '0'} from the drawer?
                {/* Remove USD $ {clickAmount ?? '0'} from drawer */}
              </Text>
              <Spacer space={SH(21)} />
              <Text style={styles.removerDarkTextRegular}>
                Amount left in drawer:
                {/* USD ${endBalance?.amount} */}
              </Text>
              <Spacer space={SH(40)} />
              <Text style={styles.removerDarkText}>${endBalance?.amount}</Text>
            </View>

            <View style={{ flex: 0.5 }} />
            <Button
              style={[styles.saveButton, { backgroundColor: COLORS.orange, borderRadius: 100 }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={'Confirm'}
              onPress={() => {
                // dispatch(getDrawerSessionById(endBalance?.drawer_id));
                setRemoveUsd(false);
                // setEndSession(false);
                // setCashSummary('');

                // setSummaryHistory(true),
                // setHistoryHeader(true);
                setCardCoinSummary(true);
              }}
            />
          </View>
        </View>
      );
    } else if (cardCoinSummary) {
      return (
        <View style={{ flex: 1, height: WINDOW_HEIGHT / 1.2 }}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(0) }]}>
                {/* {strings.management.endCashTrackingSession} */}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setCardCoinSummary(false);
                setRemoveUsd(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
          {/* <View style={styles.calculatorView}> */}
          {/* </View> */}
          <View style={[styles.trackingBodyCon]}>
            <Image source={moneySearch} style={styles.calculatorStyle} />
            <Spacer space={SH(15)} />
            <Text style={[styles.countCashText, { fontFamily: Fonts.MaisonBold }]}>
              {strings.management.closeBatch}
            </Text>
            <Spacer space={SH(30)} />
            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                padding: SH(20),
                borderColor: COLORS.navy_blue,
              }}
            >
              <Text style={[styles.countCashText, { textAlign: 'left' }]}>
                {strings.management.cardSummary}
              </Text>
              <Spacer space={SH(15)} />
              {/* <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              /> */}
              <View
                style={{
                  borderColor: COLORS.navy_blue,
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  // height: 1,
                }}
              />
              <Spacer space={SH(15)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>{strings.management.amountText}</Text>
                <Text style={styles.amountExpect}>
                  {'$'}
                  {cardSum}
                </Text>
              </View>
              <Spacer space={SH(12.5)} />
            </View>
            <Spacer space={SH(20)} />
            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                padding: SH(20),
                borderColor: COLORS.navy_blue,
              }}
            >
              <Text style={[styles.countCashText, { textAlign: 'left' }]}>
                {strings.management.jbrCoinSummary}
              </Text>
              <Spacer space={SH(15)} />
              {/* <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              /> */}
              <View
                style={{
                  borderColor: COLORS.navy_blue,
                  borderStyle: 'dashed',
                  borderWidth: 0.5,
                  // height: 1,
                }}
              />
              <Spacer space={SH(15)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>{strings.management.amountText}</Text>
                <Text style={styles.amountExpect}>
                  {'$'}
                  {jbrCoinSum}
                </Text>
              </View>
              <Spacer space={SH(12.5)} />
            </View>
            <Spacer space={SH(30)} />
            {/* <Button
              style={[styles.saveButton, { backgroundColor: COLORS.navy_blue, borderRadius: 100 }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.confirm}
              onPress={() => {
                dispatch(getDrawerSessionById(endBalance?.drawer_id));
                setCardCoinSummary(false);
                setEndSession(false);
                setCashSummary('');
                setSummaryHistory(true), setHistoryHeader(true);
              }}
            /> */}
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                dispatch(getDrawerSessionById(endBalance?.drawer_id));
                setCardCoinSummary(false);
                setEndSession(false);
                setCashSummary('');
                setSummaryHistory(true), setHistoryHeader(true);
              }}
              style={styles.cancelBatch}
            >
              <Text style={styles.sessionHistoryTextNew}>{strings.management.closeBatch}</Text>
              <Image
                source={crossDrawer}
                style={[styles.crossImage, { tintColor: COLORS.white }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  const endSessionModal = () => {
    return (
      <Modal
        transparent
        isVisible={endSession || cashSummary || endSelectAmount || removeUsd || cardCoinSummary}
      >
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={[
            styles.modalMainView,
            endSession && { minHeight: windowHeight - 300 },
          ]}
        >
          {endSessionFunction()}
        </KeyboardAwareScrollView>
      </Modal>
    );
  };

  const contentFunction = () => {
    if (sessionHistory) {
      return (
        <SessionHistoryTable
          tableTouchHandler={tableTouchHandler}
          tableDataArray={sessionHistoryArray}
          sessionHistoryLoad={sessionHistoryLoad}
          // oneItemSend={setUserHistory}
          setSessionHistoryArray={setSessionHistoryArray}
          setSessionHistory={setSessionHistory}
        />
      );
    } else if (summaryHistory) {
      return (
        <View>
          <View style={styles.summaryHeaderCon}>
            <View style={styles.displayFlex}>
              {historyHeader === true ? (
                <TouchableOpacity
                  style={styles.backButtonCon}
                  onPress={() => {
                    setSummaryHistory(false), setViewSession(false);
                    setHistoryHeader(false);
                    // dispatch(getDrawerSession());
                    // navigate(NAVIGATION.dashBoard);
                    dispatch(logoutUserFunction());
                  }}
                >
                  <Image source={backArrow} style={styles.backButtonArrow} />
                  <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.backButtonCon}
                  onPress={() => {
                    setSummaryHistory(false);
                    setSessionHistory(true);
                    setHistoryHeader(false);
                  }}
                >
                  <Image source={backArrow} style={styles.backButtonArrow} />
                  <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
                </TouchableOpacity>
              )}

              <View>
                {historyHeader === true ? (
                  <Text style={styles.summaryText}>
                    {strings.management.summary}{' '}
                    <Text style={[styles.summaryText, { color: COLORS.navy_blue }]}>
                      {moment(historyById?.created_at).format('LL')}
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.summaryText}>
                    {strings.management.summary}{' '}
                    <Text style={[styles.summaryText, { color: COLORS.navy_blue }]}>
                      {moment(userHistory?.created_at).format('LL')}
                    </Text>
                  </Text>
                )}
              </View>
              <View>
                <Text>{null}</Text>
              </View>
            </View>
          </View>
          <SummaryHistory
            historyHeader={historyHeader}
            // sessionHistoryArray={userHistory}
            sessionHistoryArray={historyHeader === true ? historyById : userHistory}

            // emailButtonHandler={emailButtonHandler}
          />
          <View>
            <Spacer space={SH(20)} />
            {historyHeader === true ? (
              <Button
                disable={sendEmailLoad}
                title={strings.management.sendEmailButton}
                textStyle={[styles.buttonText, { color: COLORS.darkGray }]}
                style={styles.senEmailButton}
                onPress={emailButtonHandler}
              />
            ) : null}
          </View>
        </View>
      );
    } else if (viewSession) {
      return (
        <View
          style={{
            borderWidth: 0.5,
            borderColor: COLORS.navy_blue,
            borderRadius: 20,
            width: WINDOW_WIDTH - 190,
            alignSelf: 'center',
          }}
        >
          <View style={styles.sessionMainView}>
            <View style={styles.sessionView}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.cashDrawerText}>{strings.management.batch}</Text>

                <Text
                  style={[
                    styles.drawerIdText,
                    { left: SW(20), color: COLORS.purple, fontFamily: Fonts.Regular },
                  ]}
                >
                  {strings.management.drawerID} {SessionData?.id}
                </Text>
              </View>

              <View style={{ backgroundColor: 'white', padding: SH(10), borderRadius: 100 }}>
                <Text
                  style={[
                    styles.drawerIdText,
                    {
                      top: 2,
                    },
                  ]}
                >
                  {moment.utc().format('dddd, Do MMMM YYYY')}
                  {/* {moment(SessionData?.createDate).format('dddd, MMMM Do YYYY | h:mm a')} */}
                  {/* const currentTime = moment.utc().format('h:mm A');
               const currentDate = moment.utc().format('dddd, Do MMMM YYYY'); */}
                </Text>
              </View>
            </View>

            <Spacer space={SH(10)} />
            <View>
              <View>
                <Text style={styles.usdTextNew}>
                  {strings.management.usd}
                  {Number(SessionData?.cashBalance)?.toFixed(2)}
                </Text>
              </View>
              <Spacer space={SH(15)} />
              <Text
                style={[
                  styles.cashDrawerTextNew,
                  { fontFamily: Fonts.Regular, textAlign: 'center' },
                ]}
              >
                {strings.management.expected}
              </Text>
            </View>

            <Spacer space={SH(25)} />
            <View style={[styles.buttonView, { flexDirection: 'row', justifyContent: 'center' }]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setAddCash(true), setRemoveCash(true);
                }}
                style={styles.removeCashViewNew}
              >
                <Text style={styles.cashDrawerNew}>{strings.management.removeCash}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setAddCash(true), setRemoveCash(false), setdifferentState(true);
                }}
                style={styles.addCashViewNew}
              >
                <Text style={styles.sessionHistoryTextNew}>{strings.management.addCash}</Text>
                <Image
                  source={PlusCircle}
                  style={{
                    height: ms(20),
                    width: ms(20),
                    resizeMode: 'contain',
                    marginHorizontal: ms(4),
                  }}
                />
              </TouchableOpacity>
            </View>
            <Spacer space={SH(35)} />
          </View>

          <Spacer space={SH(20)} />
          <View style={styles.buttonView}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.cashPaymentsNew}>{strings.management.cashPayments}</Text>
              <Text>{''}</Text>
            </View>

            <View style={styles.scrolCon}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                  style={styles.paymentOptionsView}
                  onPress={() => setViewCashInArray((prev) => !prev)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.cashDrawerText, { fontFamily: Fonts.Medium }]}>
                      {strings.management.totalCashIn}
                    </Text>
                    <Image
                      source={viewCashInArray ? arrowUpRound : arrowDownRound}
                      resizeMode="contain"
                      style={{ height: ms(12), width: ms(12), marginLeft: ms(5) }}
                    />
                  </View>
                  <Text style={styles.cashDrawerText}>
                    {strings.management.usd}
                    {cashSum?.toFixed(2) ?? '0'}
                  </Text>
                </TouchableOpacity>
                {viewCashInArray && (
                  <>
                    <TouchableOpacity
                      style={styles.paymentBodyCon}
                      onPress={() => setSalesExpandedView((prev) => !prev)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Sales'}</Text>
                        <Image
                          source={arrowDown}
                          resizeMode="contain"
                          style={
                            salesExpandedView
                              ? styles.activeDropDownPayment
                              : styles.dropDownPayment
                          }
                          // style={styles.dropDownPayment}
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashIn?.sales?.total.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                    {salesExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.sales?.cash.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.sales?.card.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.sales?.jobr_coin.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    )}

                    <TouchableOpacity
                      style={styles.paymentBodyCon}
                      onPress={() => setManualInExpandedView((prev) => !prev)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Manual'}</Text>
                        <Image
                          source={arrowDown}
                          resizeMode="contain"
                          style={
                            manualInExpandedView
                              ? styles.activeDropDownPayment
                              : styles.dropDownPayment
                          }
                          // style={styles.dropDownPayment}
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashIn?.manual?.total.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                    {manualInExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.manual?.cash.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.manual?.card.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.manual?.jobr_coin.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                )}
                <TouchableOpacity
                  style={styles.paymentOptionsView}
                  onPress={() => setViewCashOutArray((prev) => !prev)}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.cashDrawerText, { fontFamily: Fonts.Medium }]}>
                      {strings.management.totalCashOut}
                    </Text>
                    <Image
                      source={viewCashOutArray ? arrowUpRound : arrowDownRound}
                      resizeMode="contain"
                      style={{ height: ms(12), width: ms(12), marginLeft: ms(5) }}
                    />
                  </View>
                  <Text style={styles.cashDrawerText}>
                    {strings.management.usd}
                    {cashOutSum?.toFixed(2) ?? '0'}
                  </Text>
                </TouchableOpacity>
                {viewCashOutArray && (
                  <>
                    <TouchableOpacity
                      style={styles.paymentBodyCon}
                      onPress={() => setSalesOutExpandedView((prev) => !prev)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Refund'}</Text>
                        <Image
                          source={arrowDown}
                          resizeMode="contain"
                          style={
                            salesOutExpandedView
                              ? styles.activeDropDownPayment
                              : styles.dropDownPayment
                          }
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashOut?.refund?.total.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                    {salesOutExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.refund?.cash.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.refund?.card.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.refund?.jobr_coin.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                )}

                {viewCashOutArray && (
                  <>
                    <TouchableOpacity
                      style={styles.paymentBodyCon}
                      onPress={() => setManualOutExpandedView((prev) => !prev)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Manual'}</Text>
                        <Image
                          source={arrowDown}
                          resizeMode="contain"
                          style={
                            manualOutExpandedView
                              ? styles.activeDropDownPayment
                              : styles.dropDownPayment
                          }
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashOut?.manual?.total.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                    {manualOutExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.manual?.cash.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.manual?.card.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.manual?.jobr_coin.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                )}

                <View
                  style={[
                    styles.paymentOptionsView,
                    {
                      borderRadius: 100,
                      backgroundColor: COLORS.sky_grey,
                      paddingHorizontal: SH(20),
                      alignItems: 'center',
                      // width: '100%',
                    },
                  ]}
                >
                  <Text style={styles.cashDrawerText}>{strings.management.netPayment}</Text>
                  <Text style={styles.cashDrawerText}>
                    {strings.management.usd}
                    {cashTotalNet.toFixed(2)}
                    {/* {SessionData?.cashBalance} */}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>

          {/* <Spacer space={SH(40)} /> */}
          {/* <View style={{ flex: 1.5 }} /> */}
          {/* <Button
            onPress={() => {
              //  setEndSession(true),
              //  setCountFirst('');
              setViewSession(false);
              setCloseBatch(true);
            }}
            style={[
              styles.buttonStyle,
              {
                backgroundColor: COLORS.navy_blue,
                borderRadius: 100,
                width: SW(100),
                alignSelf: 'flex-end',
                marginHorizontal: SW(5),
                height: SH(60),
                width: SW(70),
                bottom: -20,
              },
            ]}
            textStyle={[styles.cashDrawerText, { color: COLORS.white }]}
            title={strings.management.closeBatch}
          /> */}

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              setViewSession(false);
              setCloseBatch(true);
            }}
            style={styles.closeBatchButton}
          >
            <Text style={styles.sessionHistoryTextNew}>{strings.management.closeBatch}</Text>
            <Image source={crossDrawer} style={styles.crossImage} />
          </TouchableOpacity>
          <Spacer space={SH(10)} />
        </View>
      );
    } else if (closeBatch) {
      return (
        <View style={{ flex: 1, padding: ms(10) }}>
          <TouchableOpacity
            style={styles.backButtonCon}
            onPress={() => {
              setCloseBatch(false);
              setViewSession(true);
            }}
          >
            <Image source={backArrow} style={styles.backButtonArrow} />
            <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
          </TouchableOpacity>
          {/* <Spacer space={SH(50)} /> */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              minHeight: ms(40),
              paddingHorizontal: ms(5),
            }}
          >
            <View>
              <Text
                style={[styles.trackingButtonText, { fontSize: SF(18), fontFamily: Fonts.Bold }]}
              >
                {strings.management.endCashTrackingSession}
              </Text>
              <Spacer space={SH(5)} />
              <Text style={[styles.trackingButtonText, { fontSize: SF(14), marginLeft: -2 }]}>
                {' '}
                {strings.management.drawerID} {SessionData?.id}
              </Text>
            </View>
            <Text style={[styles.trackingButtonText, { fontSize: SF(14), marginLeft: -2 }]}>
              {'Today ' + formattedDateTime}
            </Text>
          </View>
          <View
            style={[
              styles.cashDrawerView,
              {
                padding: ms(30),
                width: '100%',
                backgroundColor: COLORS.sky_grey,
                // borderWidth: 0.5,
                // borderColor: COLORS.gerySkies,
                borderRadius: 100,
                paddingVertical: SH(15),
              },
            ]}
          >
            <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
              <Text style={styles.cashDrawerText}>{strings.management.batch}</Text>
              {/* <Text style={styles.cashDrawerText}>{strings.management.batch}</Text> */}
            </View>
            <TouchableOpacity
              onPress={() => {
                setEndSession(true), setCountFirst('');
              }}
              style={styles.closeBatchButtonView}
            >
              <View style={styles.displayRow}>
                <Text style={styles.closeBatchButtonText}>{strings.management.closeBatch}</Text>

                <Image source={cross} style={[styles.cross]} />
              </View>
            </TouchableOpacity>
          </View>
          <Spacer space={SH(30)} />
          <View
            style={[
              styles.cashDrawerView,
              { padding: ms(40), width: '100%', borderRadius: 40, paddingVertical: 30 },
            ]}
          >
            <View>
              <Text style={styles.loggedInAsText}>{strings.management.loggedInAs}</Text>
              <Spacer space={SH(30)} />
              <View style={{ flexDirection: 'row' }}>
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
                <View style={{ marginHorizontal: ms(10), marginTop: ms(5) }}>
                  <Text style={styles.cashierName}>
                    {`${getPosUser?.user_profiles?.firstname} ${getPosUser?.user_profiles?.lastname}`}
                  </Text>
                  <Text style={styles.posCashier}>
                    {getPosUser?.user_roles?.length > 0
                      ? getPosUser?.user_roles?.map((item) => item.role?.name)
                      : 'admin'}
                  </Text>
                  <Text style={styles.cashLabel}>
                    ID : {getPosUser?.user_profiles?.user_id ?? '0'}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Spacer space={SH(30)} />
              <TouchableOpacity
                style={styles.lockScreenButton}
                onPress={async () => {
                  const data = {
                    amount: parseInt(getSessionObj?.opening_balance),
                    drawerId: getSessionObj?.id,
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
                  <Text style={styles.checkoutText1}>{strings.dashboard.lockScreen}</Text>
                  <Image source={lockDrawer} style={[styles.lockLight]} />
                </View>
              </TouchableOpacity>
              <Spacer space={SH(15)} />
              <TouchableOpacity
                style={[styles.lockScreenButton, { backgroundColor: COLORS.navy_blue }]}
                onPress={() => logoutHandler()}
              >
                <View style={styles.displayRow}>
                  <Text style={[styles.checkoutText1, { color: COLORS.white }]}>
                    {strings.posUsersList.logOut}
                  </Text>
                  <Image source={logOutDrawer} style={[styles.lockLight]} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          {drawerActivity?.length === 0 ? (
            <View style={styles.cashDrawerView}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.cashDrawerText}>{strings.management.batch}</Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID} {SessionData?.id}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setTrackingSession(!trackingSession);
                }}
                style={styles.trackingButtonView}
              >
                <Text style={styles.trackingButtonText}>
                  {strings.management.session.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.cashDrawerView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.cashDrawerText}>{strings.management.batch}</Text>
                <Text style={styles.drawerIdPurple}>
                  {strings.management.drawerID} {SessionData?.id}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setViewSession(true);
                  dispatch(getDrawerSessions());
                }}
                style={styles.viewSessionButtonView}
              >
                <Text style={styles.viewSessionButtonText}>
                  {/* {strings.management.viewSession.toUpperCase()} */}
                  {strings.management.viewSession}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {newTrackingSession ? (
            <View>
              <Spacer space={SH(30)} />
              <View style={styles.cashDrawerView}>
                <View>
                  <Text style={styles.cashDrawerText}>{strings.management.cashDrawer}</Text>
                  <Text style={styles.drawerIdText}>{strings.management.drawerID2}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    //   setTrackingSession(!trackingSession);
                    alert('coming soon');
                  }}
                  style={styles.trackingButtonView}
                >
                  <Text style={styles.trackingButtonText}>
                    {/* {strings.management.session.toUpperCase()} */}
                    {strings.management.session}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <Spacer space={SH(30)} />
          <TouchableOpacity
            style={styles.sessionHistoryView}
            onPress={
              () => setSessionHistory(true)
              // dispatch(getSessionHistory()
            }
          >
            <Text style={styles.sessionHistoryText}>{strings.management.sessionHistory}</Text>
            <Image source={rightIcon} style={styles.rightIconStyle} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <ScreenWrapper>
      <Header />

      {showInvoice ? (
        <>
          <View style={styles.headerMainView}>
            <View style={styles.deliveryView}>
              <TouchableOpacity onPress={() => setShowInvoice(false)}>
                <Image source={backArrow} style={[styles.truckStyle, { marginLeft: 10 }]} />
              </TouchableOpacity>
              <Image source={wallet} style={[styles.truckStyle, { marginLeft: 10 }]} />
              <Text style={styles.deliveryText}>{strings.wallet.orderDetail}</Text>
            </View>
            <View style={styles.deliveryView}>
              <TouchableOpacity
                onPress={() =>
                  navigate(NAVIGATION.notificationsList, {
                    screen: NAVIGATION.management,
                  })
                }
              >
                <Image source={bell} style={[styles.truckStyle, { right: 20 }]} />
              </TouchableOpacity>
              <View style={styles.searchView}>
                <View style={styles.flexAlign}>
                  <Image source={search_light} style={styles.searchImage} />
                  <TextInput
                    value={sku}
                    placeholder={strings.wallet.searchHere}
                    style={styles.textInputStyle}
                    placeholderTextColor={COLORS.darkGray}
                    onChangeText={(text) => {
                      setSku(text);
                      debouncedSearchInvoice(text);
                    }}
                  />
                </View>
                <Image source={scn} style={styles.scnStyle} />
              </View>
            </View>
          </View>

          {onSeachLoad ? (
            <View style={{ marginTop: SH(50) }}>
              <Loader />
            </View>
          ) : (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <View style={{ flex: 0.8 }}>
                <OrderWithInvoiceNumber orderData={searchData} />
              </View>
              <Spacer horizontal={SW(10)} />
              <View style={styles.invoiceContainer}>
                <WalletInvoice orderDetail={searchData} />
              </View>
            </View>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <Spacer space={SH(5)} />
          {summaryHistory || closeBatch || sessionHistory ? null : customHeader()}
          {contentFunction()}
          {trackinSessionModal()}
          {addCashModal()}
          {endSessionModal()}
        </View>
      )}
      {drawerSessLoad || createActivityLoad || oneHistoryLoad || onSeachLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
        </View>
      ) : null}
    </ScreenWrapper>
  );
}
