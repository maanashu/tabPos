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
  SafeAreaView,
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
} from '@/assets';
import {
  endTrackingSession,
  getDrawerSession,
  getDrawerSessionById,
  getDrawerSessions,
  getExpectedCashbyDrawerId,
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

// import OrderWithInvoiceNumber from '../Refund/Components/OrderWithInvoiceNumber';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { Loader } from '@/components/Loader';
// import WalletInvoice from '../Wallet2/Components/WalletInvoice';
import { getDashboard } from '@/selectors/DashboardSelector';
import { getUser } from '@/selectors/UserSelectors';
import { logoutFunction } from '@/actions/AuthActions';
import { Images } from '@mPOS/assets';
import { goBack } from '@mPOS/navigation/NavigationRef';
import { styles } from './Management.styles';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { SessionHistoryTable, SummaryHistory } from './Components';
import { amountFormat } from '@/utils/GlobalMethods';

moment.suppressDeprecationWarnings = true;

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
  const [isHistory, setIsHistory] = useState(false);
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

  // const cashTotalNet =
  //   Number(drawerData?.drawerHistory?.cash_in?.total) +
  //   Number(drawerData?.drawerHistory?.cash_out?.total);

  const cashTotalNet = drawerData?.drawerHistory?.net_amount;

  // alert(cashOut?.total);
  const [countFirst, setCountFirst] = useState();
  const [countThird, setCountThird] = useState(0);

  // const discrepancy = SessionData?.cashBalance - countFirst;

  const [endBalance, setEndBalance] = useState();

  const [leaveId, setLeaveId] = useState(1);

  const [leaveDatas, setLeaveData] = useState(0);
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
  //expected
  const [expectedCashValue, setExpectedCashValue] = useState(0);
  const [cashInValue, setCashInValue] = useState(0);
  const [cashOutValue, setCashOutValue] = useState(0);
  const [jobrSummarryValue, setJobrSummaryValue] = useState(0);
  const [cardSummaryValue, setCardSummaryValue] = useState(0);

  const discrepancy = expectedCashValue - countFirst;
  // Format the date and time as per your requirements
  const formattedDateTime = currentDateTime.format('M/D/YYYY h:mm a');
  const formattedDate = currentDateTime.format('M/D/YYYY');

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
      // title: SessionData?.cashBalance,
      title: expectedCashValue,
    },
  ];

  const Item = ({ item, onPress, borderColor, color }) => (
    <TouchableOpacity onPress={onPress} style={[styles.selectAmountCon, { borderColor }]}>
      <Text style={[styles.cashDrawerText, { color }]}>${item.title}</Text>
    </TouchableOpacity>
  );

  const leaveDataItem = ({ item }) => {
    const borderColor = item.id === leaveId ? COLORS.primary : COLORS.solidGrey;
    const color = item.id === leaveId ? COLORS.primary : COLORS.solid_grey;

    return (
      <Item
        item={item}
        // onPress={() => (setLeaveId(item.id), setLeaveData(item?.title))}
        onPress={() => (setLeaveId(item.id), setLeaveData(item?.title), setCountThird(item?.title))}
        borderColor={borderColor}
        color={color}
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

  const countCashFirst = async () => {
    if (countFirst && digits.test(countFirst) === false) {
      alert('Please enter valid amount');
    } else if (countFirst <= 0) {
      alert('Please enter valid amount');
    } else {
      // setEndSession(false),

      // setCashSummary(true);
      const res = await dispatch(getExpectedCashbyDrawerId(SessionData?.id));
      console.log('Testtsss', JSON.stringify(res));
      if (res?.status_code == 200) {
        setEndSession(false);
        setExpectedCashValue(res?.payload?.remainingCash);
        setCashInValue(res?.payload?.cashIn);
        setCashOutValue(res?.payload?.cashOut);
        setJobrSummaryValue(res?.payload?.remainingJbrCoin);
        setCardSummaryValue(res?.payload?.remainingCardAmount);
        setCashSummary(true);
      }
    }
  };

  // const endTrackingHandler = async () => {
  //   const data = countThird
  //     ? {
  //         amount: parseInt(countThird),
  //         drawerId: SessionData?.id,
  //         transactionType: 'end_tracking_session',
  //         modeOfcash: 'cash_out',
  //       }
  //     : {
  //         amount: leaveDatas,
  //         drawerId: SessionData?.id,
  //         transactionType: 'end_tracking_session',
  //         modeOfcash: 'cash_out',
  //       };

  //   const res = await endTrackingSession(data)(dispatch);
  //   setClickAmount(data?.amount);
  //   if (res) {
  //     // dispatch(getDrawerSession());
  //     // setLeaveData('')
  //     dispatch(getPaymentDrawerSessions());
  //     setEndBalance(res?.payload?.getSessionHistory?.payload);
  //     setEndSelectAmount(false), setRemoveUsd(true);
  //   }
  // };
  const endTrackingHandler = async () => {
    const data = countThird
      ? {
          amount: parseInt(countThird),
          drawerId: SessionData?.id,
          transactionType: 'end_tracking_session',
          modeOfcash: 'cash_out',
        }
      : {
          amount: parseInt(countThird),
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

      dispatch(getDrawerSessionById(res?.payload?.getSessionHistory?.payload?.drawer_id));
      setCardCoinSummary(false);
      setEndSession(false);
      setCashSummary('');
      setSummaryHistory(true), setHistoryHeader(true);
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
    if (text.includes('Invoice_') || text.includes('invoice_') || text.includes('rtrn_invce_')) {
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
  const lockScreenHandler = async () => {
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
  };

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        <TouchableOpacity
          style={styles.backButtonCon}
          onPress={() => {
            viewSession ? setViewSession(false) : setSessionHistory(false);
          }}
        >
          <Image source={backArrow} style={styles.backButtonArrow} />
          <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const Header = ({ onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.headerMainView}>
        <Image source={Images.back} style={styles.backImageStyle} />
        <Text style={styles.headerText}>{strings.batchManagement.header}</Text>
      </TouchableOpacity>
    );
  };
  const HeaderSummary = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (isHistory) {
            setSummaryHistory(false);
            setSessionHistory(true);
          } else {
            // goBack();
            dispatch(logoutUserFunction());
          }
        }}
        style={[styles.headerMainView, { paddingHorizontal: SW(1), marginLeft: SW(20) }]}
      >
        <Image source={Images.back} style={styles.backImageStyle} />
        <Text style={styles.headerText}>{strings.batchManagement.back}</Text>
      </TouchableOpacity>
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
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView contentContainerStyle={styles.modalMainView}>
            <View
              style={[
                styles.headerView,
                { backgroundColor: removeCash ? COLORS.black : COLORS.primary },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  setAddCashInput('');
                  setAddCash(false), setdifferentState(false);
                }}
                style={{ width: SW(10) }}
              >
                <Image
                  source={crossButton}
                  style={[styles.crossIconStyle, { tintColor: COLORS.white }]}
                />
              </TouchableOpacity>
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={[
                    styles.trackingButtonText,
                    { fontSize: SF(16), color: COLORS.white, marginLeft: SW(10) },
                  ]}
                >
                  {removeCash ? strings.management.removeCash : strings.management.addCash}
                </Text>
              </View>
            </View>

            <Spacer space={SH(20)} />
            <View style={styles.countCashView}>
              <Text style={styles.countCashText}>
                {removeCash ? strings.management.cashRemove : strings.management.cashAdd}
              </Text>

              <Spacer space={SH(20)} />
              <View>
                <Text style={styles.amountCountedText}>{strings.management.cashAmount}</Text>
                <TextInput
                  placeholder={strings.management.amount}
                  style={styles.inputStyle}
                  placeholderTextColor={COLORS.solid_grey}
                  keyboardType="number-pad"
                  value={addCashInput}
                  onChangeText={setAddCashInput}
                />
              </View>

              <Spacer space={SH(20)} />
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
              <Spacer space={SH(20)} />
              {/* <View>
                <Text style={styles.amountCountedText}>{strings.management.transactionType}</Text>
                <View style={styles.addCashDrop}>
         
                  <TextInput
                    editable={false}
 
                    style={styles.noteInputStyle}
                    placeholderTextColor={COLORS.gerySkies}
                    value={removeCash ? 'Manual Cash Out' : 'Manual Cash In'}
                   
                  />
                </View>
              </View> */}
            </View>

            {/* <Spacer space={SH(90)} /> */}
            {/* <View style={{ flex: 1 }} /> */}
            <Button
              title={strings.management.confirm}
              textStyle={styles.buttonText}
              style={[
                styles.saveButton,
                { backgroundColor: addCashInput !== '' ? COLORS.primary : COLORS.gerySkies },
              ]}
              // onPress={() => {
              //   setAddCash(false);
              // }}
              onPress={addCashHandler}
            />
            <Spacer space={SH(40)} />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const endSessionFunction = () => {
    if (endSession) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={() => {
                setEndSession(false);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endCashTrackingSession}
              </Text>
            </View>
          </View>
          {/* <View style={styles.calculatorView}> */}
          {/* <Image source={Calculator} style={styles.calculatorStyle} /> */}
          {/* </View> */}

          <View>
            <Spacer space={SH(20)} />
            <Image
              source={Calculator}
              style={[styles.calculatorStyle, { height: 100, width: 100, alignSelf: 'center' }]}
            />
            <Spacer space={SH(40)} />
            <View style={{ paddingHorizontal: SW(15) }}>
              <Text style={[styles.countCashText, { fontFamily: Fonts.MaisonBold }]}>
                {strings.management.countCash}
              </Text>
              <Spacer space={SH(20)} />
              <View>
                <Text style={styles.amountCountedText}>{strings.management.enterAmount}</Text>
                <Spacer space={SH(5)} />
                <TextInput
                  style={styles.inputStyle}
                  placeholder={strings.management.amount}
                  placeholderTextColor={COLORS.solid_grey}
                  value={countFirst}
                  onChangeText={setCountFirst}
                  keyboardType="number-pad"
                />
              </View>
              <Spacer space={SH(60)} />
            </View>
            <Spacer space={SH(60)} />
            {/* <View style={{ flex: 1 }} /> */}
            <Button
              style={[styles.saveButton, countFirst !== '' && { backgroundColor: COLORS.primary }]}
              textStyle={styles.buttonText}
              title={strings.management.next}
              // onPress={() => (setEndSession(false), setCashSummary(true))}
              onPress={countCashFirst}
            />
          </View>
        </View>
      );
    } else if (cashSummary) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={() => {
                setCashSummary(false), setEndSession(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endCashTrackingSession}
              </Text>
            </View>
          </View>
          {/* <View style={styles.calculatorView}>
            <Image source={CalculatorColor} style={styles.calculatorStyle} />
          </View> */}
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(30)} />
            <Image
              source={CalculatorColor}
              style={[styles.calculatorStyle, { height: 100, width: 100, alignSelf: 'center' }]}
            />
            <Spacer space={SH(50)} />
            <View>
              <Text style={[styles.countCashText]}>{strings.management.cashSummary}</Text>
              <Spacer space={SH(15)} />
              <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              />
              <Spacer space={SH(15)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={[styles.amountExpect]}>{strings.management.amountexpect}</Text>
                <Text style={styles.amountExpect}>
                  {'USD $'}
                  {expectedCashValue}
                  {/* {SessionData?.cashBalance} */}
                </Text>
              </View>
              <Spacer space={SH(12.5)} />
              <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
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
              <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              />
              <Spacer space={SH(12.5)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text
                  style={[
                    styles.amountExpect,
                    { color: discrepancy < 0 ? COLORS.red : COLORS.dark_grey },
                  ]}
                >
                  {strings.management.discrepancy}
                </Text>
                <Text
                  style={[
                    styles.amountExpect,
                    { color: discrepancy < 0 ? COLORS.red : COLORS.dark_grey },
                  ]}
                >
                  {discrepancy < 0 ? '-' : null} {'USD'} $
                  {discrepancy < 0 ? Math.abs(discrepancy).toFixed(2) : discrepancy?.toFixed(2)}
                </Text>
              </View>
            </View>
            <Spacer space={SH(60)} />
            <Button
              style={[styles.saveButtonNew, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.next}
              onPress={() => {
                setCashSummary(false), setEndSelectAmount(true);
                setCountThird(0), setLeaveId(1), setLeaveData('0');
              }}
            />
          </View>
        </View>
      );
    } else if (endSelectAmount) {
      return (
        <View style={[styles.absoluteZero, { height: WINDOW_HEIGHT / 1.2 }]}>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={() => {
                setEndSelectAmount(false), setCashSummary(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endCashTrackingSession}
              </Text>
            </View>
          </View>
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(30)} />
            <Image
              source={CalculatorColor}
              style={[styles.calculatorStyle, { height: 100, width: 100, alignSelf: 'center' }]}
            />
            <Spacer space={SH(30)} />
            <View>
              <Text style={[styles.countCashText, { fontFamily: Fonts.Bold }]}>
                {strings.management.selectAmountDra}
              </Text>
              <Spacer space={SH(5)} />
              <Spacer space={SH(1)} backgroundColor={COLORS.faded_grey} />
              <Spacer space={SH(15)} />

              <FlatList
                data={leaveData}
                extraData={leaveData}
                renderItem={leaveDataItem}
                keyExtractor={(item) => item.id}
                // horizontal
              />
              <Spacer space={SH(25)} />
              <View>
                <Text style={[styles.amountCountedText, { fontFamily: Fonts.Bold }]}>
                  {strings.management.countAmount}
                </Text>
                <Spacer space={SH(15)} />
                <Text style={[styles.amountCountedText, { fontSize: SF(12) }]}>
                  {strings.management.enterAmount}
                </Text>
                <Spacer space={SH(5)} />
                <TextInput
                  style={styles.inputStyle}
                  placeholder={strings.management.amount}
                  placeholderTextColor={COLORS.solid_grey}
                  value={countThird}
                  // onChangeText={(countThird) => (setCountThird(countThird), setLeavFun(countThird))}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    // Filter out non-numeric characters
                    const numericValue = text.replace(/[^0-9]/g, '');
                    if (numericValue <= parseInt(expectedCashValue)) {
                      setLeaveId(null);
                      setCountThird(numericValue), setLeavFun(numericValue);
                    }
                  }}
                />
              </View>
            </View>
            <Spacer space={SH(30)} />
            <View style={{ flex: 1 }} />
            <Button
              style={[styles.saveButtonNew, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.next}
              // onPress={() => (setEndSelectAmount(false), setRemoveUsd(true))}
              // onPress={endTrackingHandler}
              onPress={() => {
                // setEndBalance(res?.payload?.getSessionHistory?.payload);
                setEndSelectAmount(false), setRemoveUsd(true);
              }}
            />
          </View>
        </View>
      );
    } else if (removeUsd) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <TouchableOpacity
              // onPress={() => {
              //   setRemoveUsd(false), setEndSelectAmount(true);
              // }}
              // onPress={() => {
              //   setRemoveUsd(false), setSummaryHistory(true), setHistoryHeader(true);
              //   // setViewSession(false),
              //   // dispatch(getDrawerSession());
              // }}

              onPress={() => {
                setRemoveUsd(false), setEndSelectAmount(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.confirm}
              </Text>
            </View>
          </View>
          <Spacer space={SH(100)} />
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(60)} />
            <View>
              <Text style={styles.removerDarkText}>
                Remove USD $ {countThird ?? leaveDatas} from drawer
              </Text>
              <Spacer space={SH(21)} />
              <Text style={styles.removerDarkTextRegular}>
                Amount left in drawer: USD {console.log('poopopop', parseInt(expectedCashValue))}
                {console.log('countt', parseInt(countThird))}
                {`$${parseInt(expectedCashValue) - parseInt(countThird)} `}
              </Text>
            </View>
            <Spacer space={SH(150)} />
            <Button
              style={[styles.saveButtonNew, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={'Confirm'}
              onPress={() => {
                setRemoveUsd(false);
                setCardCoinSummary(true);
                // dispatch(getDrawerSessionById(endBalance?.drawer_id));
                // setEndSession(false);
                // setCashSummary('');

                // setSummaryHistory(true),
                // setHistoryHeader(true);
                // setCardCoinSummary(true);
                // setRemoveUsd(false);
              }}
            />
          </View>
        </View>
      );
    } else if (cardCoinSummary) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={() => {
                setCardCoinSummary(false);
                setRemoveUsd(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endCashTrackingSession}
              </Text>
            </View>
          </View>
          {/* <View style={styles.calculatorView}>
            <Image source={CalculatorColor} style={styles.calculatorStyle} />
          </View> */}
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(20)} />
            <Image
              source={CalculatorColor}
              style={[styles.calculatorStyle, { height: 100, width: 100, alignSelf: 'center' }]}
            />
            <Spacer space={SH(40)} />
            <View>
              <Text style={[styles.countCashText]}>{strings.management.cardSummary}</Text>
              <Spacer space={SH(15)} />
              <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              />
              <Spacer space={SH(15)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>{strings.management.amountText}</Text>
                <Text style={styles.amountExpect}>
                  {'$'}
                  {cardSummaryValue}
                  {/* {cardSum} */}
                </Text>
              </View>
              <Spacer space={SH(12.5)} />
            </View>
            <Spacer space={SH(30)} />
            <View>
              <Text style={[styles.countCashText]}>{strings.management.jbrCoinSummary}</Text>
              <Spacer space={SH(15)} />
              <Spacer
                space={Platform.OS == 'ios' ? SH(0.3) : SH(1)}
                backgroundColor={COLORS.gerySkies}
              />
              <Spacer space={SH(15)} />
              <View style={[styles.displayFlex, { alignItems: 'flex-start' }]}>
                <Text style={styles.amountExpect}>{strings.management.amountText}</Text>
                <Text style={styles.amountExpect}>
                  {'$'}
                  {jobrSummarryValue}

                  {/* {jbrCoinSum} */}
                </Text>
              </View>
              <Spacer space={SH(12.5)} />
            </View>
            <Spacer space={SH(60)} />
            <Button
              style={[styles.saveButtonNew, { backgroundColor: COLORS.primary, width: '100%' }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.confirm}
              onPress={() => {
                endTrackingHandler();
                // dispatch(getDrawerSessionById(endBalance?.drawer_id));
                // setCardCoinSummary(false);
                // setEndSession(false);
                // setCashSummary('');
                // setSummaryHistory(true), setHistoryHeader(true);
              }}
            />
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
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="always"
            contentContainerStyle={[styles.modalMainView, { width: '100%' }]}
          >
            {endSessionFunction()}
          </KeyboardAwareScrollView>
        </SafeAreaView>
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
          setViewSession={setViewSession}
          setSessionHistory={setSessionHistory}
          isHistory={isHistory}
        />
      );
    } else if (summaryHistory) {
      return (
        <View>
          <HeaderSummary />
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
        <View>
          <Header
            onPress={() => {
              if (isHistory) {
                setSummaryHistory(true);
              } else {
                setViewSession(false);
              }
            }}
          />
          <View style={styles.sessionMainView}>
            <Spacer space={SH(10)} />
            <View style={styles.sessionView}>
              <View>
                <Text style={styles.cashDrawerText}>{strings.batchManagement.batch}</Text>

                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID} {SessionData?.id}
                </Text>
              </View>

              <Text style={[styles.drawerIdText, { top: 2 }]}>
                {moment.utc().format('dddd, Do MMMM YYYY')}
                {/* {moment.utc(SessionData?.createDate)?.format('dddd, MMMM Do YYYY | h:mm a')} */}
              </Text>
            </View>

            <Spacer space={SH(30)} />
            <View>
              <View>
                <Text style={styles.usdText}>
                  {strings.management.usd}
                  {/* {Number(SessionData?.cashBalance)?.toFixed(2)} */}
                  {amountFormat(cashTotalNet?.toFixed(2), true)}
                </Text>
              </View>
              <Text
                style={[styles.cashDrawerText, { fontFamily: Fonts.Regular, textAlign: 'center' }]}
              >
                {strings.management.expected}
              </Text>
            </View>

            <Spacer space={SH(20)} />
            <View style={[styles.buttonView]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setAddCash(true), setRemoveCash(false), setdifferentState(true);
                }}
                style={styles.addCashView}
              >
                <Text style={styles.sessionHistoryText}>{strings.management.addCash}</Text>
              </TouchableOpacity>
              <Spacer space={SH(15)} />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setAddCash(true), setRemoveCash(true);
                }}
                style={styles.removeCashView}
              >
                <Text style={styles.cashDrawerText}>{strings.management.removeCash}</Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(20)} />
          </View>

          <Spacer space={SH(20)} />
          <View style={styles.buttonView}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.cashPaymentsText}>{strings.management.cashPayments}</Text>
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
                      source={viewCashInArray ? up : down}
                      resizeMode="contain"
                      style={{ height: ms(12), width: ms(12), marginLeft: ms(5) }}
                    />
                  </View>
                  <Text style={styles.cashDrawerText}>
                    {strings.management.usd}
                    {amountFormat(cashIn?.total?.toFixed(2), true)}
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
                          source={dropdown}
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
                        {amountFormat(cashIn?.sales?.total.toFixed(2), true)}
                      </Text>
                    </TouchableOpacity>
                    {salesExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashIn?.sales?.cash.toFixed(2))}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashIn?.sales?.card.toFixed(2), true)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashIn?.sales?.jobr_coin.toFixed(2), true)}
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
                          source={dropdown}
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
                        {amountFormat(cashIn?.manual?.total.toFixed(2), true)}
                      </Text>
                    </TouchableOpacity>
                    {manualInExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashIn?.manual?.cash.toFixed(2), true)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashIn?.manual?.card.toFixed(2), true)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashIn?.manual?.jobr_coin.toFixed(2), true)}
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
                      source={viewCashOutArray ? up : down}
                      resizeMode="contain"
                      style={{ height: ms(12), width: ms(12), marginLeft: ms(5) }}
                    />
                  </View>
                  <Text style={styles.cashDrawerText}>
                    {strings.management.usd}
                    {amountFormat(cashOut?.total?.toFixed(2) ?? '0', true)}
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
                          source={dropdown}
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
                        {amountFormat(cashOut?.refund?.total.toFixed(2), true)}
                      </Text>
                    </TouchableOpacity>
                    {salesOutExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashOut?.refund?.cash.toFixed(2), true)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashOut?.refund?.card.toFixed(2), true)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashOut?.refund?.jobr_coin.toFixed(2), true)}
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
                          source={dropdown}
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
                        {amountFormat(cashOut?.manual?.total.toFixed(2), true)}
                      </Text>
                    </TouchableOpacity>
                    {manualOutExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashOut?.manual?.cash?.toFixed(2), true)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashOut?.manual?.card?.toFixed(2), true)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {amountFormat(cashOut?.manual?.jobr_coin?.toFixed(2), true)}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                )}

                <View style={[styles.paymentOptionsView, { borderBottomWidth: 0 }]}>
                  <Text style={styles.cashDrawerText}>{strings.management.netPayment}</Text>
                  <Text style={styles.cashDrawerText}>
                    {strings.management.usd}
                    {amountFormat(cashTotalNet?.toFixed(2), true)}
                    {/* {SessionData?.cashBalance} */}
                  </Text>
                </View>
              </ScrollView>
            </View>
          </View>

          {/* <Spacer space={SH(40)} /> */}
          <View style={{ flex: 1 }} />
          <Button
            onPress={() => {
              //  setEndSession(true),
              //  setCountFirst('');
              setViewSession(false);
              setCloseBatch(true);
            }}
            style={styles.buttonStyle}
            textStyle={[styles.cashDrawerText, { color: COLORS.red }]}
            title={strings.management.endSession}
          />
          <Spacer space={SH(40)} />
        </View>
      );
    } else if (closeBatch) {
      return (
        <View style={{ flex: 1, paddingHorizontal: ms(20) }}>
          <Header
            onPress={() => {
              setCloseBatch(false), setViewSession(true);
            }}
          />

          <View style={{ backgroundColor: COLORS.white, padding: ms(16), borderRadius: ms(8) }}>
            <View
              style={{
                justifyContent: 'space-between',
                minHeight: ms(40),
                paddingHorizontal: ms(5),
              }}
            >
              <View>
                <Text
                  style={[styles.trackingButtonText, { fontSize: SF(16), fontFamily: Fonts.Bold }]}
                >
                  {strings.management.endCashTrackingSession}
                </Text>
                <Spacer space={SH(5)} />
                <Text style={[styles.trackingButtonText]}>
                  {strings.management.drawerID} {SessionData?.id}
                </Text>
              </View>
              <Text style={[styles.trackingButtonText]}>{'Today ' + formattedDateTime}</Text>
            </View>
            <Spacer space={SH(20)} />
            <View
              style={[
                styles.cashDrawerView,
                {
                  padding: ms(20),
                  width: '100%',
                  backgroundColor: COLORS.white,
                  borderWidth: 0.5,
                  borderColor: COLORS.gerySkies,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingVertical: SH(14),
                  borderRadius: 5,
                },
              ]}
            >
              <View style={{ width: '50%' }}>
                <Text style={styles.cashDrawerText}>{strings.management.batch}</Text>
                <Spacer space={SH(4)} />
                <Text style={styles.cashDrawerText}>{formattedDate}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setEndSession(true), setCountFirst('');
                }}
                style={styles.closeBatchButtonView}
              >
                <Text style={styles.closeBatchButtonText}>{strings.management.closeBatch}</Text>
              </TouchableOpacity>
            </View>
            <Spacer space={SH(30)} />
            <View style={[styles.cashDrawerView, { padding: ms(30), width: '100%' }]}>
              <View>
                <Text style={styles.loggedInAsText}>{strings.management.loggedInAs}</Text>
                <Spacer space={SH(15)} />
                <View style={{}}>
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
                  <View style={{ marginTop: ms(5) }}>
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
              <View>
                <Spacer space={SH(30)} />
                <TouchableOpacity
                  style={styles.lockScreenButton}
                  onPress={() => {
                    lockScreenHandler();
                  }}
                >
                  <View style={styles.displayRow}>
                    <Image source={lockLight} style={styles.lockLight} />
                    <Text style={styles.checkoutText1}>{strings.dashboard.lockScreen}</Text>
                  </View>
                </TouchableOpacity>
                <Spacer space={SH(15)} />
                <TouchableOpacity style={styles.lockScreenButton} onPress={() => logoutHandler()}>
                  <View style={styles.displayRow}>
                    <Image source={powerAuth} style={styles.lockLight} />
                    <Text style={styles.checkoutText1}>{strings.posUsersList.logOut}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View>
          <Header onPress={() => goBack()} />
          {drawerActivity?.length === 0 ? (
            <View style={[styles.cashDrawerView, { backgroundColor: 'red' }]}>
              <View>
                <Text style={styles.cashDrawerText}>{strings.batchManagement.batch}</Text>
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
            <View style={[styles.cashDrawerView, { backgroundColor: COLORS.white }]}>
              <View>
                <Text style={styles.cashDrawerText}>{strings.batchManagement.batch}</Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID} {SessionData?.id}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setViewSession(true);
                  setIsHistory(false);
                  dispatch(getDrawerSessions());
                }}
                style={styles.viewSessionButtonView}
              >
                <Text style={styles.viewSessionButtonText}>
                  {strings.management.viewSession.toUpperCase()}
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
                    {strings.management.session.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          <Spacer space={SH(30)} />
          <TouchableOpacity
            style={styles.sessionHistoryView}
            onPress={
              () => {
                setSessionHistory(true), setIsHistory(true);
              }
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
      <View style={styles.container}>
        {/* {summaryHistory || closeBatch ? null : Header()} */}
        {contentFunction()}
        {trackinSessionModal()}
        {addCashModal()}
        {endSessionModal()}
      </View>

      {drawerSessLoad || createActivityLoad || oneHistoryLoad || onSeachLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
        </View>
      ) : null}
    </ScreenWrapper>
  );
}
