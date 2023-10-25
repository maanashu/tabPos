import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  bell,
  crossButton,
  Fonts,
  notifications,
  rightIcon,
  search_light,
  tray,
  backArrow,
  dropdown2,
  Calculator,
  CalculatorColor,
  dropdown,
  down,
  up,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, ScreenWrapper, Spacer } from '@/components';
import { styles } from '@/screens/Management/Management.styles';

import {
  SessionHistoryTable,
  SummaryHistory,
  TransactionDropDown,
} from '@/screens/Management/Components';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import {
  endTrackingSession,
  getDrawerSession,
  getDrawerSessionById,
  getDrawerSessions,
  getPaymentDrawerSessions,
  getSessionHistory,
  sendSessionHistory,
  trackSessionSave,
} from '@/actions/CashTrackingAction';
import { getCashTracking } from '@/selectors/CashTrackingSelector';
import moment from 'moment';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/CashtrackingTypes';
import { digits } from '@/utils/validators';
import { FlatList } from 'react-native';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { logoutUserFunction } from '@/actions/UserActions';
import { ms } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

moment.suppressDeprecationWarnings = true;

export function Management() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const drawerData = useSelector(getCashTracking);
  const [sessionHistoryArray, setSessionHistoryArray] = useState(
    drawerData?.getSessionHistory ?? []
  );

  const drawerActivity = drawerData?.getDrawerSession?.drawer_activites;
  const historyById = drawerData?.getDrawerSessionById?.[0];
  const [addCash, setAddCash] = useState(false);
  const [cashSummary, setCashSummary] = useState('');
  const [saveSession, setSaveSession] = useState('');
  const [removeCash, setRemoveCash] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const [viewSession, setViewSession] = useState(false);
  const [summaryHistory, setSummaryHistory] = useState(false);
  const [selectAmount, setSelectAmount] = useState('0');
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
  const cashInArray = drawerActivity?.filter((item) => item.mode_of_cash === 'cash_in');
  const cashCount = cashInArray?.map((item) => item.amount);
  const cashSum = cashCount?.reduce((partialSum, a) => partialSum + a, 0);
  const cashOutArray = drawerActivity?.filter((item) => item.mode_of_cash === 'cash_out');
  const cashOutCount = cashOutArray?.map((item) => item.amount);
  const cashOutSum = cashOutCount?.reduce((partialSum, a) => partialSum + a, 0);
  const onchangeValue = (value) => setDropdownSelect(value);
  const addCashValue = (value) => setAddCashDropDown(value);
  const [differentState, setdifferentState] = useState(false);
  const [addCashInput, setAddCashInput] = useState('');
  const [mergedDataa, setMergedData] = useState();
  const [userHistory, setUserHistory] = useState();
  const [isCashIn, setIsCashIn] = useState(null);
  const SessionData = {
    id: drawerData?.getDrawerSession?.id,
    cashBalance: drawerData?.getDrawerSession?.cash_balance ?? '0',
    createDate: drawerData?.getDrawerSession?.created_at,
  };
  const cashIn = drawerData?.drawerHistory?.cash_in;
  const cashOut = drawerData?.drawerHistory?.cash_out;
  const cashTotalNet =
    Number(drawerData?.drawerHistory?.cash_in?.total) +
    Number(drawerData?.drawerHistory?.cash_out?.total);
  const cashOutNet = Number(drawerData?.drawerHistory?.cash_out?.total);
  // alert(cashOut?.total);
  const [countFirst, setCountFirst] = useState();
  const [countThird, setCountThird] = useState();

  const discrepancy = SessionData?.cashBalance - countFirst;

  const [endBalance, setEndBalance] = useState();

  const [leaveId, setLeaveId] = useState(1);

  const [leaveDatas, setLeaveData] = useState('0');
  const [clickAmount, setClickAmount] = useState();

  const [expandedItems, setExpandedItems] = useState([]);
  const [viewCashInArray, setViewCashInArray] = useState(false);
  const [viewCashOutArray, setViewCashOutArray] = useState(false);
  const [salesExpandedView, setSalesExpandedView] = useState(false);
  const [salesOutExpandedView, setSalesOutExpandedView] = useState(false);

  const [manualInExpandedView, setManualInExpandedView] = useState(false);
  const [manualOutExpandedView, setManualOutExpandedView] = useState(false);

  const [delieveryFeeInExpandedView, setDelieveryFeeInExpandedView] = useState(false);
  const [delieveryFeeOutExpandedView, setDelieveryFeeOutExpandedView] = useState(false);
  const [shippingFeeInExpandedView, setShippingFeeInExpandedView] = useState(false);
  const [shippingFeeOutExpandedView, setShippingFeeOutExpandedView] = useState(false);

  // Function to toggle the expansion state of an item
  const toggleExpansion = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

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
        onPress={() => (setLeaveId(item.id), setLeaveData(item?.title))}
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
  const addRemoveLoad = useSelector((state) =>
    isLoadingSelector([TYPES.TRACK_SESSION_SAVE], state)
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

    // navigate(NAVIGATION.dashBoard);
    // setSummaryHistory(false),
    //   setViewSession(false),
    //   contentFunction(),
    //   setNewTrackingSession(true);
    // setHistoryHeader(false);
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
            <Image source={tray} style={styles.truckStyle} />
            <Text style={styles.deliveryText}>{strings.management.cashTracking}</Text>
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
            <Image source={bell} style={[styles.truckStyle, { right: 25 }]} />
          </TouchableOpacity>
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
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
        <KeyboardAwareScrollView contentContainerStyle={styles.modalMainView}>
          <View
            style={[
              styles.headerView,
              { backgroundColor: removeCash ? COLORS.black : COLORS.primary },
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
              <Image
                source={crossButton}
                style={[styles.crossIconStyle, { tintColor: COLORS.white }]}
              />
            </TouchableOpacity>
          </View>

          <Spacer space={SH(20)} />
          <View style={styles.countCashView}>
            <Text style={styles.countCashText}>
              {removeCash ? strings.management.amountRemoved : strings.management.amountAdded}
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
            <View>
              <Text style={styles.amountCountedText}>{strings.management.transactionType}</Text>
              <View style={styles.addCashDrop}>
                {/* <TransactionDropDown 
                isCashIn={true}
                selected={addCashValue} /> */}
                <TextInput
                  editable={false}
                  // placeholder={"Manual Cash In"}
                  style={styles.noteInputStyle}
                  placeholderTextColor={COLORS.gerySkies}
                  value={removeCash ? 'Manual Cash Out' : 'Manual Cash In'}
                  // onChangeText={setTrackNotes}
                />
              </View>
            </View>
          </View>

          {/* <Spacer space={SH(90)} /> */}
          <View style={{ flex: 1 }} />
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
      </Modal>
    );
  };

  const endSessionFunction = () => {
    if (endSession) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endCashTrackingSession}
              </Text>
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
          <View style={styles.calculatorView}>
            <Image source={Calculator} style={styles.calculatorStyle} />
          </View>

          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(60)} />
            <View>
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
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endCashTrackingSession}
              </Text>
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
          <View style={styles.calculatorView}>
            <Image source={CalculatorColor} style={styles.calculatorStyle} />
          </View>
          <View style={styles.trackingBodyCon}>
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
                <Text style={styles.amountExpect}>{strings.management.amountexpect}</Text>
                <Text style={styles.amountExpect}>
                  {'USD $'}
                  {SessionData?.cashBalance}
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
                  {discrepancy < 0 ? Math.abs(discrepancy) : discrepancy}
                </Text>
              </View>
            </View>
            <Spacer space={SH(60)} />
            <Button
              style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.next}
              onPress={() => {
                setCashSummary(false), setEndSelectAmount(true);
                setCountThird(''), setLeaveId(1), setLeaveData('0');
              }}
            />
          </View>
        </View>
      );
    } else if (endSelectAmount) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.endCashTrackingSession}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setEndSelectAmount(false), setCashSummary(true);
              }}
              style={{ width: SW(10) }}
            >
              <Image source={crossButton} style={styles.crossIconStyle} />
            </TouchableOpacity>
          </View>
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(60)} />
            <View>
              <Text style={[styles.countCashText, { fontFamily: Fonts.MaisonRegular }]}>
                {strings.management.selectAmountDra}
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
                <Text style={styles.amountCountedText}>{strings.management.otherAmount}</Text>
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
                  onChangeText={(countThird) => (setCountThird(countThird), setLeavFun(countThird))}
                  keyboardType="numeric"
                />
              </View>
            </View>
            <Spacer space={SH(30)} />
            <View style={{ flex: 1 }} />
            <Button
              style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={strings.management.next}
              // onPress={() => (setEndSelectAmount(false), setRemoveUsd(true))}
              onPress={endTrackingHandler}
            />
          </View>
        </View>
      );
    } else if (removeUsd) {
      return (
        <View style={styles.absoluteZero}>
          <View style={styles.headerView}>
            <View style={styles.centerSw}>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.management.confirm}
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
          <Spacer space={SH(100)} />
          <View style={styles.trackingBodyCon}>
            <Spacer space={SH(60)} />
            <View>
              <Text style={styles.removerDarkText}>
                Remove USD $ {clickAmount ?? '0'} from drawer
              </Text>
              <Spacer space={SH(21)} />
              <Text style={styles.removerDarkTextRegular}>
                Amount left in drawer: USD ${endBalance?.amount}
              </Text>
            </View>

            <View style={{ flex: 0.5 }} />
            <Button
              style={[styles.saveButton, { backgroundColor: COLORS.primary }]}
              textStyle={[styles.buttonText, { color: COLORS.white }]}
              title={'Confirm'}
              onPress={() => {
                dispatch(getDrawerSessionById(endBalance?.drawer_id));
                setRemoveUsd(false),
                  setEndSession(false),
                  setCashSummary(''),
                  setSummaryHistory(true),
                  setHistoryHeader(true);
              }}
            />
          </View>
        </View>
      );
    }
  };

  const endSessionModal = () => {
    return (
      <Modal transparent isVisible={endSession || cashSummary || endSelectAmount || removeUsd}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={styles.modalMainView}
        >
          {endSessionFunction()}
        </KeyboardAwareScrollView>
      </Modal>
    );
  };

  const contentFunction = (props) => {
    if (sessionHistory) {
      return (
        <SessionHistoryTable
          tableTouchHandler={tableTouchHandler}
          tableDataArray={sessionHistoryArray}
          sessionHistoryLoad={sessionHistoryLoad}
          // oneItemSend={setUserHistory}
          setSessionHistoryArray={setSessionHistoryArray}
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
                    <Text style={[styles.summaryText, { color: COLORS.primary }]}>
                      {moment(historyById?.created_at).format('LL')}
                    </Text>
                  </Text>
                ) : (
                  <Text style={styles.summaryText}>
                    {strings.management.summary}{' '}
                    <Text style={[styles.summaryText, { color: COLORS.primary }]}>
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
        <View>
          <View style={styles.sessionMainView}>
            <View style={styles.sessionView}>
              <View>
                <Text style={styles.cashDrawerText}>{strings.management.cashDrawer}</Text>
                <Text style={styles.drawerIdText}>
                  {strings.management.drawerID} {SessionData?.id}
                </Text>
              </View>

              <Text style={[styles.drawerIdText, { top: 2 }]}>
                {moment(SessionData?.createDate).format('dddd, MMMM Do YYYY | h:mm a')}
              </Text>
            </View>

            <Spacer space={SH(10)} />
            <View>
              <View>
                <Text style={styles.usdText}>
                  {strings.management.usd}
                  {Number(SessionData?.cashBalance)?.toFixed(2)}
                </Text>
              </View>
              <Text
                style={[styles.cashDrawerText, { fontFamily: Fonts.Regular, textAlign: 'center' }]}
              >
                {strings.management.expected}
              </Text>
            </View>

            <Spacer space={SH(25)} />
            <View style={[styles.buttonView, { flexDirection: 'row' }]}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  setAddCash(true), setRemoveCash(false), setdifferentState(true);
                }}
                style={styles.addCashView}
              >
                <Text style={styles.sessionHistoryText}>{strings.management.addCash}</Text>
              </TouchableOpacity>
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
            <Spacer space={SH(35)} />
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
                    {cashSum.toFixed(2) ?? '0'}
                  </Text>
                </TouchableOpacity>
                {viewCashInArray && (
                  <>
                    {/* {cashInArray?.map((item, index) => (
                      <View key={index}>
                        <TouchableOpacity
                          style={styles.paymentBodyCon}
                          onPress={() => toggleExpansion(index)}
                        >
                          <View style={styles.flexAlign}>
                            <Text style={styles.paymentBodyText}>{item.transaction_type}</Text>
                            <Image
                              source={dropdown}
                              resizeMode="contain"
                              style={
                                expandedItems[index]
                                  ? styles.activeDropDownPayment
                                  : styles.dropDownPayment
                              }
                            />
                          </View>
                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {item.amount}
                          </Text>
                        </TouchableOpacity>
                        {expandedItems[index] && (
                          <View>
                            <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                              <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                              <Text style={styles.paymentBodyText}>
                                {strings.management.usd}
                                {item.amount}
                              </Text>
                            </View>
                            <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                              <Text style={styles.paymentBodyText}>{'Card'}</Text>

                              <Text style={styles.paymentBodyText}>
                                {strings.management.usd}
                                {item.amount}
                              </Text>
                            </View>
                            <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                              <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                              <Text style={styles.paymentBodyText}>
                                {strings.management.usd}
                                {item.amount}
                              </Text>
                            </View>
                          </View>
                        )}
                      </View>
                    ))} */}
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

                    {/* <TouchableOpacity
                      style={styles.paymentBodyCon}
                      onPress={() => setDelieveryFeeInExpandedView((prev) => !prev)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Delivery Fees'}</Text>
                        <Image
                          source={dropdown}
                          resizeMode="contain"
                          style={
                            delieveryFeeInExpandedView
                              ? styles.activeDropDownPayment
                              : styles.dropDownPayment
                          }
                          // style={styles.dropDownPayment}
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashIn?.delivery_fees?.total}
                      </Text>
                    </TouchableOpacity>
                    {delieveryFeeInExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.delivery_fees?.cash}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.delivery_fees?.card}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.delivery_fees?.jobr_coin}
                          </Text>
                        </View>
                      </View>
                    )}

                    <TouchableOpacity
                      style={styles.paymentBodyCon}
                      onPress={() => setShippingFeeInExpandedView((prev) => !prev)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Shipping Fees'}</Text>
                        <Image
                          source={dropdown}
                          resizeMode="contain"
                          style={
                            shippingFeeInExpandedView
                              ? styles.activeDropDownPayment
                              : styles.dropDownPayment
                          }
                          // style={styles.dropDownPayment}
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashIn?.shipping_fees?.total}
                      </Text>
                    </TouchableOpacity>
                    {shippingFeeInExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.shipping_fees?.cash}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.shipping_fees?.card}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashIn?.shipping_fees?.jobr_coin}
                          </Text>
                        </View>
                      </View>
                    )} */}

                    {/* <View
                      style={styles.paymentBodyCon}
                      // onPress={() => toggleExpansion(index)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Manual'}</Text>
                        <Image
                          source={dropdown}
                          resizeMode="contain"
                          // style={
                          //   expandedItems[index]
                          //     ? styles.activeDropDownPayment
                          //     : styles.dropDownPayment
                          // }
                          style={styles.dropDownPayment}
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashIn?.manual}
                      </Text>
                    </View> */}
                    {/* <View>
                            <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                              <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                              <Text style={styles.paymentBodyText}>
                                {strings.management.usd}
                                {item.amount}
                              </Text>
                            </View>
                            <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                              <Text style={styles.paymentBodyText}>{'Card'}</Text>

                              <Text style={styles.paymentBodyText}>
                                {strings.management.usd}
                                {item.amount}
                              </Text>
                            </View>
                            <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                              <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                              <Text style={styles.paymentBodyText}>
                                {strings.management.usd}
                                {item.amount}
                              </Text>
                            </View>
                          </View> */}
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
                    {cashOutSum.toFixed(2) ?? '0'}
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
                    {/* <TouchableOpacity style={styles.paymentBodyCon}>
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Manual'}</Text>
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
                        {cashOut?.manual}
                      </Text>
                    </TouchableOpacity> */}
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
                {/* 
                {viewCashOutArray && (
                  <>
                    <TouchableOpacity
                      style={styles.paymentBodyCon}
                      onPress={() => setDelieveryFeeOutExpandedView((prev) => !prev)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Delivery Fees'}</Text>
                        <Image
                          source={dropdown}
                          resizeMode="contain"
                          style={
                            delieveryFeeOutExpandedView
                              ? styles.activeDropDownPayment
                              : styles.dropDownPayment
                          }
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashOut?.delivery_fees?.total.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                    {delieveryFeeOutExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.delivery_fees?.cash.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.delivery_fees?.card.toFixed(2)}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.delivery_fees?.jobr_coin.toFixed(2)}
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
                      onPress={() => setShippingFeeOutExpandedView((prev) => !prev)}
                    >
                      <View style={styles.flexAlign}>
                        <Text style={styles.paymentBodyText}>{'Shipping Fees'}</Text>
                        <Image
                          source={dropdown}
                          resizeMode="contain"
                          style={
                            shippingFeeOutExpandedView
                              ? styles.activeDropDownPayment
                              : styles.dropDownPayment
                          }
                        />
                      </View>
                      <Text style={styles.paymentBodyText}>
                        {strings.management.usd}
                        {cashOut?.shipping_fees?.total}
                      </Text>
                    </TouchableOpacity>
                    {shippingFeeOutExpandedView && (
                      <View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.shipping_fees?.cash}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'Card'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.shipping_fees?.card}
                          </Text>
                        </View>
                        <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                          <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                          <Text style={styles.paymentBodyText}>
                            {strings.management.usd}
                            {cashOut?.shipping_fees?.jobr_coin}
                          </Text>
                        </View>
                      </View>
                    )}
                  </>
                )} */}
                <View style={[styles.paymentOptionsView, { borderBottomWidth: 0 }]}>
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
          <View style={{ flex: 1 }} />
          <Button
            onPress={() => {
              setEndSession(true), setCountFirst('');
            }}
            style={styles.buttonStyle}
            textStyle={[styles.cashDrawerText, { color: COLORS.red }]}
            title={strings.management.endSession}
          />
          <Spacer space={SH(40)} />
        </View>
      );
    } else {
      return (
        <View>
          {drawerActivity?.length === 0 ? (
            <View style={styles.cashDrawerView}>
              <View>
                <Text style={styles.cashDrawerText}>{strings.management.cashDrawer}</Text>
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
              <View>
                <Text style={styles.cashDrawerText}>{strings.management.cashDrawer}</Text>
                <Text style={styles.drawerIdText}>
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
      <View style={styles.container}>
        {summaryHistory ? null : customHeader()}
        {contentFunction()}
        {trackinSessionModal()}
        {addCashModal()}
        {endSessionModal()}
      </View>
      {drawerSessLoad || createActivityLoad || oneHistoryLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
        </View>
      ) : null}
    </ScreenWrapper>
  );
}
