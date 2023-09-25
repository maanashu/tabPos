import React, { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';

import Modal from 'react-native-modal';

import { COLORS, SF, SH, SW } from '@/theme';
import { List } from 'react-native-paper';
import { moderateScale, ms } from 'react-native-size-matters';
import {
  allien,
  calendar1,
  down,
  dropdown,
  dropdown2,
  Fonts,
  roundCalender,
  up,
  userImage,
} from '@/assets';
import { strings } from '@/localization';
import { styles } from '@/screens/Management/Management.styles';
import { Spacer, TableDropdown } from '@/components';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
const windowWidth = Dimensions.get('window').width;
import DropDownPicker from 'react-native-dropdown-picker';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import { DarkTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionHistory } from '@/actions/CashTrackingAction';
import { width } from '@/theme/ScalerDimensions';
import { transactionDataList } from '@/constants/flatListData';
import { getCashTracking } from '@/selectors/CashTrackingSelector';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
const windowHeight = Dimensions.get('window').height;

moment.suppressDeprecationWarnings = true;

export function SessionHistoryTable({
  tableTouchHandler,
  tableDataArray,
  sessionHistoryLoad,
  // oneItemSend,
  setSessionHistoryArray,
}) {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [dateformat, setDateformat] = useState('');
  const [show, setShow] = useState(false);
  const [staffSelect, setStaffSelect] = useState('');
  const [formattedDate, setFormattedDate] = useState(new Date());
  const staffSelection = (value) => setStaffSelect(value);
  const getAuth = useSelector(getAuthData);
  const posUserArray = getAuth?.getAllPosUsers;
  var posUsers = [];
  if (posUserArray.length > 0) {
    const mappedArray = posUserArray.map((item) => {
      return { label: item?.user?.user_profiles?.firstname, value: item?.user?.unique_uuid };
    });
    posUsers = mappedArray;
  }

  console.log('DSASDASD', JSON.stringify(posUsers));

  const getFormattedTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const maxDate = getFormattedTodayDate();
  // const onChangeDate = (selectedDate) => {
  //   setSessionHistoryArray([]);
  //   const currentDate = moment().format('MM/DD/YYYY');
  //   const selected = moment(selectedDate).format('MM/DD/YYYY');
  //   setShow(false);
  //   const month = selectedDate.getMonth() + 1;
  //   const selectedMonth = month < 10 ? '0' + month : month;
  //   const day = selectedDate.getDate();
  //   const selectedDay = day < 10 ? '0' + day : day;
  //   const year = selectedDate.getFullYear();
  //   const fullDate = selectedMonth + ' / ' + selectedDay + ' / ' + year;
  //   const newDateFormat = year + '-' + selectedMonth + '-' + selectedDay;
  //   setDateformat(newDateFormat);
  //   setDate(fullDate);
  //   if (newDateFormat) {
  //     dispatch(getSessionHistory(newDateFormat));
  //   }
  // };
  // const onCancelFun = () => {
  //   setShow(false);
  //   setDateformat('');
  //   setDate(new Date());
  //   dispatch(getSessionHistory());
  // };

  //New calendar changes

  const onChangeDate = (selectedDate) => {
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const fullDate = moment(selectedDate).format('MM/DD/YYYY');
    setDate(fullDate);
    setFormattedDate(formattedDate);
  };
  const onDateApply = (selectedDate) => {
    // setSessionHistoryArray([]);
    // const currentDate = moment().format('MM/DD/YYYY');
    // const selected = moment(selectedDate).format('MM/DD/YYYY');
    // setShow(false);
    // const month = selectedDate?.getMonth() + 1;
    // const selectedMonth = month < 10 ? '0' + month : month;
    // const day = selectedDate.getDate();
    // const selectedDay = day < 10 ? '0' + day : day;
    // const year = selectedDate.getFullYear();
    // const fullDate = selectedMonth + ' / ' + selectedDay + ' / ' + year;
    // const newDateFormat = year + '-' + selectedMonth + '-' + selectedDay;
    // setDateformat(newDateFormat);
    // setDate(fullDate);
    setShow(false);
    const newDateFormat = moment(selectedDate).format('YYYY-MM-DD');
    if (newDateFormat) {
      const fullDate = moment(selectedDate).format('YYYY/MM/DD');
      setDateformat(newDateFormat);
      setDate(fullDate);
      dispatch(getSessionHistory(newDateFormat));
    }
  };
  const onCancelPressCalendar = () => {
    setShow(false);
    setDateformat('');
    setDate(new Date());
    dispatch(getSessionHistory());
  };
  useEffect(() => {
    const newDateFormat = moment(formattedDate).format('YYYY-MM-DD');
    dispatch(getSessionHistory(newDateFormat, staffSelect));
  }, [staffSelect]);

  // const tableDataArrayReverse = tableDataArray?.reverse();
  const tableDataArrayReverse = tableDataArray?.slice().reverse();
  // console.log('sdasdas', JSON.stringify(tableDataArrayReverse));
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.sessionHistory}>{strings.management.sessionHistory}</Text>
      <Spacer space={SH(20)} />
      <View style={styles.datePickerContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.datePickerCon} onPress={() => setShow(!show)}>
            <Image source={calendar1} style={styles.calendarStyle} />
            <TextInput
              value={date}
              returnKeyType={'done'}
              pointerEvents={'none'}
              autoCapitalize={'none'}
              editable={false}
              placeholder="Date"
              placeholderTextColor={COLORS.gerySkies}
              style={styles.txtInput}
            />
          </TouchableOpacity>
          {/* <DateTimePickerModal
            mode={'date'}
            isVisible={show}
            onConfirm={onChangeDate}
            onCancel={() => onCancelFun()}
            maximumDate={new Date()}
          /> */}

          <View style={{ marginHorizontal: moderateScale(10) }}>
            <TableDropdown placeholder="Select Staff" selected={staffSelection} data={posUsers} />
          </View>
        </View>
      </View>
      <View style={[styles.tableMainView]}>
        <Table>
          <View
            style={[
              styles.tableDataHeaderConNew,
              { borderTopWidth: 1, borderColor: COLORS.solidGrey },
            ]}
          >
            <View style={styles.profileheaderUnderView}>
              {/* <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}> */}
              <View style={{ alignItems: 'center', justifyContent: 'center', marginStart: ms(15) }}>
                <Text style={[styles.tableTextHeader]}>#</Text>
              </View>

              {/* </View> */}
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Date
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Start
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Ends
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Ended By
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={2}>
                  Session Started
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={2}>
                  Total {`\n`}Cash In
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={2}>
                  Total {`\n`}Cash Out
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={2}>
                  Counted {`\n`}cash
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={2}>
                  Session Ended
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: windowHeight * 0.67 }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {sessionHistoryLoad ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : tableDataArrayReverse?.length === 0 ? (
                <View style={{ marginTop: 80 }}>
                  <Text style={styles.userNotFound}>History not found</Text>
                </View>
              ) : (
                tableDataArrayReverse?.map((item, index) => (
                  <TouchableOpacity
                    style={styles.tableDataCon}
                    onPress={
                      () => tableTouchHandler(item)

                      // ,oneItemSend(item)
                    }
                    key={index}
                  >
                    <View style={styles.profileheaderUnderData}>
                      {/* <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}> */}
                      <Text style={[styles.tableTextData]}>{index + 1}</Text>
                      {/* </View> */}
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData}>
                          {moment(item.created_at).format('YYYY/MM/DD') ?? ''}
                        </Text>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData} numberOfLines={1}>
                          {item.start_session == null
                            ? ''
                            : moment(item.start_session).format('hh:mm A') ?? ''}
                        </Text>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData} numberOfLines={1}>
                          {item.end_session == null
                            ? ''
                            : moment(item.end_session).format('hh:mm A') ?? ''}
                        </Text>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={{ uri: item?.pos_user_detail?.user_profiles?.profile_photo }}
                            style={{
                              width: ms(15),
                              height: ms(15),
                              resizeMode: 'contain',
                              borderRadius: 100,
                              // marginLeft: ms(-15),
                            }}
                          />
                          <Text style={[styles.tableTextData, { marginLeft: ms(5) }]}>
                            {item?.pos_user_detail?.user_profiles?.firstname}
                          </Text>
                        </View>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData} numberOfLines={1}>
                          ${item.start_tracking_session}
                          {'.00'}
                        </Text>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData} numberOfLines={1}>
                          ${item.add_cash}
                          {'.00'}
                        </Text>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData} numberOfLines={1}>
                          ${item.removed_cash}
                          {'.00'}
                        </Text>
                      </View>
                      <View style={styles.profileheaderChildView}>
                        <Text style={styles.tableTextData} numberOfLines={1}>
                          ${item.counted_cash}
                          {'.00'}
                        </Text>
                      </View>
                      <View style={[styles.profileheaderChildView]}>
                        <Text style={[styles.tableTextData]} numberOfLines={1}>
                          {item.end_tracking_session < 0 ? '-' : null} $
                          {item.end_tracking_session < 0
                            ? Math.abs(item.end_tracking_session)
                            : item.end_tracking_session}
                          {'.00'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </ScrollView>
          </View>
        </Table>
      </View>
      {/* {show && ( */}
      <Modal
        isVisible={show}
        statusBarTranslucent
        animationIn={'bounceIn'}
        animationOut={'fadeOut'}
        // animationInTiming={600}
        // animationOutTiming={300}
        onBackdropPress={() => setShow(false)}
      >
        <View style={styles.calendarModalView}>
          <CalendarPickerModal
            onPress={() => setShow(false)}
            onDateChange={onChangeDate}
            onSelectedDate={() => onDateApply(formattedDate)}
            selectedStartDate={formattedDate}
            maxDate={maxDate}
            onCancelPress={onCancelPressCalendar}
          />
        </View>
      </Modal>
      {/* )} */}
    </View>
  );
}
export function SummaryHistory({ historyHeader, sessionHistoryArray }) {
  const [expandedItems, setExpandedItems] = useState([]);
  const [expandedCashOutItems, setExpandedCashOutItems] = useState([]);
  const [viewCashInArray, setViewCashInArray] = useState(true);
  const [viewCashOutArray, setViewCashOutArray] = useState(true);
  const drawerData = useSelector(getCashTracking);

  const toggleExpansion = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    console.log('expanded ', newExpandedItems);
    setExpandedItems(newExpandedItems);
  };
  const toggleExpansionCashOut = (index) => {
    const newExpandedItems = [...expandedCashOutItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedCashOutItems(newExpandedItems);
  };

  const finalCashInArray = sessionHistoryArray?.drawer_activites.filter(
    (item) => item.mode_of_cash === 'cash_in'
  );

  // const sessionCashCount = finalCashInArray?.map((item) => item.amount);
  // const sessionCashSum = sessionCashCount?.reduce((partialSum, a) => partialSum + a, 0);
  // const finalCashOutArray = sessionHistoryArray?.drawer_activites.filter(
  //   (item) => item.mode_of_cash === 'cash_out'
  // );
  // const sessionCashOutCount = finalCashOutArray?.map((item) => item.amount);
  // const sessionCashOutSum = sessionCashOutCount?.reduce((partialSum, a) => partialSum + a, 0);

  const cashInArray = sessionHistoryArray?.drawerActivity?.filter(
    (item) => item.mode_of_cash === 'cash_in'
  );
  const cashCount = cashInArray?.map((item) => item.amount);
  const cashSum = cashCount?.reduce((partialSum, a) => partialSum + a, 0);
  const cashOutArray = sessionHistoryArray?.drawerActivity?.filter(
    (item) => item.mode_of_cash === 'cash_out'
  );
  const cashOutCount = cashOutArray?.map((item) => item.amount);
  const cashOutSum = cashOutCount?.reduce((partialSum, a) => partialSum + a, 0);

  const reverseArray = sessionHistoryArray?.drawer_activites.reverse();
  const [salesExpandedView, setSalesExpandedView] = useState(false);
  const [salesOutExpandedView, setSalesOutExpandedView] = useState(false);
  const [manualInExpandedView, setManualInExpandedView] = useState(false);
  const [manualOutExpandedView, setManualOutExpandedView] = useState(false);

  const [delieveryFeeInExpandedView, setDelieveryFeeInExpandedView] = useState(false);
  const [delieveryFeeOutExpandedView, setDelieveryFeeOutExpandedView] = useState(false);
  const [shippingFeeInExpandedView, setShippingFeeInExpandedView] = useState(false);
  const [shippingFeeOutExpandedView, setShippingFeeOutExpandedView] = useState(false);

  const cashIn = drawerData?.drawerHistory?.cash_in;
  const cashOut = drawerData?.drawerHistory?.cash_out;

  // console.log('finalchat', JSON.stringify(reverseArray));

  const correctWay = (transaction_type) => {
    if (transaction_type === 'start_tracking_session') {
      return 'Start tracking session';
    } else if (transaction_type === 'manual_cash_in') {
      return 'Manual';
    } else if (transaction_type === 'manual_cash_out') {
      return 'Manual';
    } else if (transaction_type === 'counted_cash') {
      return 'Counted Cash';
    } else if (transaction_type === 'counted_cash') {
      return 'Counted Cash';
    } else if (transaction_type === 'delivery_charge') {
      return 'Delivery charge';
    } else if (transaction_type === 'shipping_charge') {
      return 'Shipping charge';
    } else if (transaction_type === 'sales') {
      return 'Sales';
    } else if (transaction_type === 'refund') {
      return 'Refund';
    } else if (transaction_type === 'end_tracking_session') {
      return 'End tracking session';
    }
  };
  return (
    <View style={historyHeader ? styles.bodyContainer : styles.bodyContainer2}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Spacer space={SH(20)} />
        <Text style={styles.allCashText}>{strings.management.allCash}</Text>
        <View>
          {/* <TouchableOpacity
            style={styles.totalCashHeader}
            onPress={() => setViewCashInArray((prev) => !prev)}
          >
            <View style={styles.flexAlign}>
              <Text style={styles.sectionListHeader}>{strings.management.totalCashIn}</Text>
              <Image
                source={viewCashInArray ? up : down}
                resizeMode="contain"
                style={{ height: ms(12), width: ms(12), marginLeft: ms(5) }}
              />
            </View>
            <Text style={styles.sectionListHeader}>
              {strings.management.usd}
              {sessionCashSum ?? '0'}
              {'.00'}
            </Text>
          </TouchableOpacity> */}
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
              {cashIn?.total ?? '0'}
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
                      salesExpandedView ? styles.activeDropDownPayment : styles.dropDownPayment
                    }
                    // style={styles.dropDownPayment}
                  />
                </View>
                <Text style={styles.paymentBodyText}>
                  {strings.management.usd}
                  {cashIn?.sales?.total}
                </Text>
              </TouchableOpacity>
              {salesExpandedView && (
                <View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashIn?.sales?.cash}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Card'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashIn?.sales?.card}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashIn?.sales?.jobr_coin}
                    </Text>
                  </View>
                </View>
              )}
              {/* <View style={styles.paymentBodyCon}>
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
            </>
          )}

          {viewCashInArray && (
            <>
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
                      manualInExpandedView ? styles.activeDropDownPayment : styles.dropDownPayment
                    }
                    // style={styles.dropDownPayment}
                  />
                </View>
                <Text style={styles.paymentBodyText}>
                  {strings.management.usd}
                  {cashIn?.manual?.total}
                </Text>
              </TouchableOpacity>
              {manualInExpandedView && (
                <View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashIn?.manual?.cash}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Card'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashIn?.manual?.card}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashIn?.manual?.jobr_coin}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}

          {viewCashInArray && (
            <>
              <TouchableOpacity
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
            </>
          )}

          {viewCashInArray && (
            <>
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
              {cashOut?.total ?? '0'}
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
                      salesOutExpandedView ? styles.activeDropDownPayment : styles.dropDownPayment
                    }
                  />
                </View>
                <Text style={styles.paymentBodyText}>
                  {strings.management.usd}
                  {cashOut?.refund?.total}
                </Text>
              </TouchableOpacity>
              {salesOutExpandedView && (
                <View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.refund?.cash}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Card'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.refund?.card}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.refund?.jobr_coin}
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
                      manualOutExpandedView ? styles.activeDropDownPayment : styles.dropDownPayment
                    }
                  />
                </View>
                <Text style={styles.paymentBodyText}>
                  {strings.management.usd}
                  {cashOut?.manual?.total}
                </Text>
              </TouchableOpacity>
              {manualOutExpandedView && (
                <View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.manual?.cash}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Card'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.manual?.card}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.manual?.jobr_coin}
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
                  {cashOut?.delivery_fees?.total}
                </Text>
              </TouchableOpacity>
              {delieveryFeeOutExpandedView && (
                <View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Cash'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.delivery_fees?.cash}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'Card'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.delivery_fees?.card}
                    </Text>
                  </View>
                  <View style={[styles.paymentBodyCon, { paddingLeft: SW(10) }]}>
                    <Text style={styles.paymentBodyText}>{'JBR Coin'}</Text>

                    <Text style={styles.paymentBodyText}>
                      {strings.management.usd}
                      {cashOut?.delivery_fees?.jobr_coin}
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
          )}
          <View style={styles.netPaymentHeader}>
            <Text style={styles.sectionListHeader}>{strings.management.netPayment}</Text>
            <Text style={styles.sectionListHeader}>
              {strings.management.totalCash}
              {/* {sessionHistoryArray?.cash_balance} */}
              {cashIn?.total + cashOut?.total}
              {'.00'}
            </Text>
          </View>
          <Spacer space={SH(60)} />

          <Spacer space={SH(50)} />
        </View>
      </ScrollView>
    </View>
  );
}

export function TransactionDropDown({ selected }) {
  const [cityModalOpen, setCityModelOpen] = useState(false);
  const [cityModalValue, setCityModalValue] = useState(null);
  const [cityItems, setCityItems] = useState(transactionDataList);
  return (
    <DropDownPicker
      dropDownDirection="BOTTOM"
      ArrowUpIconComponent={({ style }) => <Image source={dropdown2} style={styles.dropDownIcon} />}
      ArrowDownIconComponent={({ style }) => (
        <Image source={dropdown2} style={styles.dropDownIcon} />
      )}
      style={styles.dropdown}
      containerStyle={[styles.containerStyle, { zIndex: Platform.OS === 'ios' ? 100 : 2 }]}
      listMode="SCROLLVIEW"
      // scrollViewProps={{
      //   nestedScrollEnabled: true,
      // }}
      dropDownContainerStyle={[
        styles.dropDownContainerStyle,
        { zIndex: Platform.OS === 'ios' ? 999 : 2, borderWidth: 1 },
      ]}
      open={cityModalOpen}
      value={cityModalValue}
      items={cityItems}
      setOpen={setCityModelOpen}
      setValue={setCityModalValue}
      setItems={setCityItems}
      placeholder={strings.management.transactionType}
      placeholderStyle={{ color: '#A7A7A7' }}
      onSelectItem={(item) => selected(item.value)}
    />
  );
}
