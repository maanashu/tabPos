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
import { COLORS, SF, SH, ShadowStyles, SW } from '@/theme';
import { moderateScale, ms } from 'react-native-size-matters';
import {
  allien,
  arrowDown,
  arrowLeftUp,
  calendar1,
  calendarDrawer,
  cashProfile,
  down,
  dropdown,
  dropdown2,
  Fonts,
  mask,
  maskRight,
  Union,
  unionRight,
  up,
} from '@/assets';
import { strings } from '@/localization';
import { styles } from '@/screens/Management/Management.styles';
import { Spacer } from '@/components';
import { Table } from 'react-native-table-component';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import { DarkTheme, DataTable } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionHistory } from '@/actions/CashTrackingAction';
import { width } from '@/theme/ScalerDimensions';
import { transactionDataList } from '@/constants/flatListData';
import { getCashTracking } from '@/selectors/CashTrackingSelector';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
const windowHeight = Dimensions.get('window').height;

import DropDownPicker from 'react-native-dropdown-picker';
import { PAGINATION_DATA } from '@/constants/enums';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/CashtrackingTypes';
import { TableDropdown } from './TableDropdown';
import { goBack } from '@/navigation/NavigationRef';

moment.suppressDeprecationWarnings = true;

export function SessionHistoryTable({
  tableTouchHandler,
  // tableDataArray,
  sessionHistoryLoad,
  // oneItemSend,
  setSessionHistoryArray,
  setSessionHistory,
}) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const drawerData = useSelector(getCashTracking);
  const sessionHistoryData = drawerData?.getSessionHistory;
  const tableDataArray = drawerData?.getSessionHistory?.data ?? [];
  const payloadLength = Object.keys(drawerData?.getSessionHistory)?.length ?? 0;
  const [show, setShow] = useState(false);
  const [staffSelect, setStaffSelect] = useState('none');
  const [formattedDate, setFormattedDate] = useState(new Date());
  const staffSelection = (value) => setStaffSelect(value);

  const posUserArray = getAuth?.getAllPosUsersData?.pos_staff;
  var posUsers = [];
  if (posUserArray.length > 0) {
    const mappedArray = posUserArray.map((item) => {
      return { label: item?.user?.user_profiles?.firstname, value: item?.user?.unique_uuid };
    });
    posUsers = mappedArray;
  }
  const [page, setPage] = useState(1);
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(10);
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);

  const [dateformat, setDateformat] = useState('');
  const [date, setDate] = useState();
  const [formatedDate, setFormatedDate] = useState();
  const [defaultDate, setDefaultDate] = useState(new Date());
  const isHistoryLoad = useSelector((state) =>
    isLoadingSelector([TYPES.GET_SESSION_HISTORY], state)
  );
  const startIndex = (page - 1) * paginationModalValue + 1;
  const [ind, setInd] = useState();

  const paginationData = {
    total: sessionHistoryData?.total ?? '0',
    totalPages: sessionHistoryData?.total_pages ?? '0',
    perPage: sessionHistoryData?.per_page ?? '0',
    currentPage: sessionHistoryData?.current_page ?? '0',
  };
  function isNegative(value) {
    const numberValue = parseFloat(value);
    return !isNaN(numberValue) && numberValue < 0;
  }

  useEffect(() => {
    const data = {
      page: page,
      limit: paginationModalValue,
      calenderDate: formatedDate,
      staffId: staffSelect,
    };
    dispatch(getSessionHistory(data));
  }, [page, paginationModalValue, formatedDate, staffSelect]);

  const getFormattedTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const maxDate = getFormattedTodayDate();

  //New calendar changes

  const onChangeDate = (selectedDate) => {
    setDefaultDate(selectedDate);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const fullDate = moment(selectedDate).format('MM/DD/YYYY');
    setDateformat(formattedDate);
    setDate(formattedDate);
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: SW(5) }}>
      <Spacer space={SH(20)} />
      <View style={styles.datePickerContainerNew}>
        <TouchableOpacity
          onPress={() => setSessionHistory(false)}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <Image source={arrowLeftUp} style={styles.arrowLeftUp} />

          <Text style={styles.sessionHistory}>{strings.management.sessionHistory}</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // alignSelf: 'flex-end',
            justifyContent: 'flex-end',
            flex: 1,
          }}
        >
          <TouchableOpacity style={styles.datePickerConNew} onPress={() => setShow(!show)}>
            <Image source={calendarDrawer} style={styles.calendarStyleNew} />
            <TextInput
              value={date}
              returnKeyType={'done'}
              pointerEvents={'none'}
              autoCapitalize={'none'}
              editable={false}
              placeholder="Date"
              placeholderTextColor={COLORS.navy_blue}
              style={[styles.txtInput, { color: COLORS.navy_blue }]}
            />
            <Image source={arrowDown} style={styles.dropIcon} />
          </TouchableOpacity>
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <TableDropdown placeholder="Select Staff" selected={staffSelection} data={posUsers} />
          </View>
        </View>
      </View>

      {/* <View
        style={[styles.jbrTypeConNew, { zIndex: -1, opacity: payloadLength === 0 ? 0.4 : 1 }]}
        pointerEvents={payloadLength === 0 ? 'none' : 'auto'}
      > */}
      {/* <View style={styles.paginationEnd}>
          <Text style={[styles.paginationCount, { fontSize: 12 }]}>
            {strings.customers.showResult}
          </Text>
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <DropDownPicker
              ArrowUpIconComponent={({ style }) => (
                <Image source={dropdown2} style={styles.dropDownIconPagination} />
              )}
              ArrowDownIconComponent={({ style }) => (
                <Image source={dropdown2} style={styles.dropDownIconPagination} />
              )}
              style={styles.dropdown}
              containerStyle={[
                styles.containerStylePagination,
                { zIndex: Platform.OS === 'ios' ? 20 : 1 },
              ]}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              listItemLabelStyle={styles.listItemLabelStyle}
              labelStyle={styles.labelStyle}
              selectedItemLabelStyle={styles.selectedItemLabelStyle}
              open={paginationModalOpen}
              value={paginationModalValue}
              items={paginationModalItems}
              setOpen={() => setPaginationModalOpen(!paginationModalOpen)}
              setValue={setPaginationModalValue}
              setItems={setPaginationModalItems}
              placeholder="10"
              placeholderStyle={styles.placeholderStylePagination}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.unionCon,
              {
                backgroundColor: paginationData?.currentPage == 1 ? COLORS.washGrey : COLORS.white,
              },
            ]}
            onPress={() => {
              setPage(page - 1);
              setInd(ind - 1);
            }}
            disabled={paginationData?.currentPage == 1 ? true : false}
          >
            <Image
              source={Union}
              style={[
                styles.unionStyle,
                {
                  tintColor:
                    paginationData?.currentPage == 1 ? COLORS.gerySkies : COLORS.solid_grey,
                },
              ]}
            />
          </TouchableOpacity>
          <View style={styles.unionCon}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <View
            style={{
              width: ms(70),
            }}
          >
            {isHistoryLoad ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={[styles.paginationCount, { paddingHorizontal: 0, alignSelf: 'center' }]}>
                {startIndex} - {startIndex + (tableDataArray?.length - 1)} of{' '}
                {paginationData?.total}
              </Text>
            )}
          </View>
          <View style={[styles.unionCon, { backgroundColor: COLORS.washGrey }]}>
            <Image
              source={maskRight}
              style={[styles.unionStyle, { tintColor: COLORS.gerySkies }]}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.unionCon,
              {
                backgroundColor:
                  paginationData?.currentPage == paginationData?.totalPages
                    ? COLORS.washGrey
                    : COLORS.white,
              },
            ]}
            onPress={() => {
              setPage(page + 1);
              setInd(ind + 1);
            }}
            disabled={paginationData?.currentPage == paginationData?.totalPages ? true : false}
          >
            <Image
              source={unionRight}
              style={[
                styles.unionStyle,
                {
                  tintColor:
                    paginationData?.currentPage == paginationData?.totalPages
                      ? COLORS.gerySkies
                      : COLORS.solid_grey,
                },
              ]}
            />
          </TouchableOpacity>
        </View> */}
      {/* </View> */}
      <Spacer space={SH(20)} />
      <View style={[styles.tableMainView]}>
        {/* <Table>
          <View
            style={[
              styles.tableDataHeaderConNew,
              { borderTopWidth: 1, borderColor: COLORS.solidGrey },
            ]}
          >
            <View style={styles.profileheaderUnderView}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginStart: ms(15) }}>
                <Text style={[styles.tableTextHeader]}>#</Text>
              </View>
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
                <Text style={styles.tableTextHeader} numberOfLines={2}>
                  Ended By System
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

          <View style={{ height: windowHeight * 0.65 }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {sessionHistoryLoad ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : tableDataArray?.length === 0 ? (
                <View style={{ marginTop: 80 }}>
                  <Text style={styles.userNotFound}>History not found</Text>
                </View>
              ) : (
                tableDataArray?.map((item, index) => {
                  const currentIndex = startIndex + index;
                  return (
                    <TouchableOpacity
                      style={styles.tableDataCon}
                      onPress={
                        () => tableTouchHandler(item)

                 
                      }
                      key={index}
                    >
                      <View style={styles.profileheaderUnderData}>
                       
                        <Text style={[styles.tableTextData]}>{currentIndex}</Text>

                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData}>
                            {moment(item.created_at).format('YYYY/MM/DD') ?? ''}
                          </Text>
                        </View>
                        <View style={[styles.profileheaderChildView, { marginLeft: SW(-5) }]}>
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

                              }}
                            />
                            <Text style={[styles.tableTextData, { marginLeft: ms(5) }]}>
                         
                              {item?.pos_user_detail?.user_profiles?.firstname == undefined
                                ? 'System Ended'
                                : item?.pos_user_detail?.user_profiles?.firstname}
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
                        <View style={[styles.profileheaderChildView, { marginLeft: SW(-3) }]}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            ${item.removed_cash}
                            {'.00'}
                          </Text>
                        </View>
                        <View style={[styles.profileheaderChildView, { marginLeft: SW(-3) }]}>
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
                  );
                })
              )}
            </ScrollView>
          </View>
        </Table> */}

        <DataTable>
          <DataTable.Header style={{ borderBottomColor: COLORS.white }}>
            <DataTable.Title textStyle={styles.tableHeaderStyle}>{'#   ' + 'Date'}</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderStyle}>Starts</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderStyle}>Ends</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderStyle}>Ended By</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderStyle}>Session Started</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderStyle}>Total Cash In</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderStyle}>Total Cash Out</DataTable.Title>
            <DataTable.Title textStyle={styles.tableHeaderStyle}>Counted Cash</DataTable.Title>
            <DataTable.Title numberOfLines={2} textStyle={styles.tableHeaderStyle}>
              Session Ended
            </DataTable.Title>
          </DataTable.Header>

          {tableDataArray?.map((item, index) => (
            <DataTable.Row
              style={styles.tableRowStyle}
              key={item.key}
              onPress={() => {
                tableTouchHandler(item);
              }}
            >
              {/* <DataTable.Cell>{index + 1}</DataTable.Cell> */}
              <DataTable.Cell>
                {index + 1 + '   '}
                {moment(item.created_at).format('YYYY/MM/DD') ?? ''}
              </DataTable.Cell>
              <DataTable.Cell>
                {item.start_session == null
                  ? ''
                  : moment(item.start_session).format('hh:mm A') ?? ''}
              </DataTable.Cell>
              <DataTable.Cell>
                {item.end_session == null ? '' : moment(item.end_session).format('hh:mm A') ?? ''}
              </DataTable.Cell>

              <DataTable.Cell>
                <View style={styles.profileheaderChildView}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={
                        item?.pos_user_detail?.user_profiles?.profile_photo == null
                          ? cashProfile
                          : {
                              uri: item?.pos_user_detail?.user_profiles?.profile_photo,
                            }
                      }
                      style={{
                        width: ms(15),
                        height: ms(15),
                        resizeMode: 'contain',
                        borderRadius: 100,
                        marginLeft: ms(-5),
                      }}
                    />
                    <DataTable.Cell>
                      {/* {item?.pos_user_detail?.user_profiles?.firstname} */}
                      {item?.pos_user_details?.user_profiles?.firstname == undefined
                        ? 'System Ended'
                        : item?.pos_user_details?.user_profiles?.firstname}
                    </DataTable.Cell>
                  </View>
                </View>
              </DataTable.Cell>
              <DataTable.Cell>
                ${item.start_tracking_session}
                {'.00'}
              </DataTable.Cell>

              <DataTable.Cell>
                ${item.add_cash}
                {'.00'}
              </DataTable.Cell>
              <DataTable.Cell>
                ${item.removed_cash}
                {'.00'}
              </DataTable.Cell>
              <DataTable.Cell>
                ${item.counted_cash}
                {'.00'}
              </DataTable.Cell>

              <DataTable.Cell
                style={{
                  backgroundColor:
                    item.end_tracking_session < 0 ? COLORS.cream_yellow : COLORS.sky_grey,
                  height: 20,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  elevation: 10,
                  shadowColor: '#000000',
                  shadowRadius: 1,
                  shadowOpacity: 0.1,
                  shadowOffset: {
                    width: 1,
                    height: 1,
                  },
                }}
              >
                {item.end_tracking_session < 0 ? '-' : null} $
                {item.end_tracking_session < 0
                  ? Math.abs(item.end_tracking_session)
                  : item.end_tracking_session}
                {'.00'}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>

      <Modal
        isVisible={show}
        statusBarTranslucent
        animationIn={'bounceIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => setShow(false)}
      >
        <View style={styles.calendarModalView}>
          <CalendarPickerModal
            onPress={() => {
              setShow(false);
            }}
            onDateChange={onChangeDate}
            onSelectedDate={() => {
              setShow(false);
              setFormatedDate(date);
            }}
            selectedStartDate={formattedDate}
            maxDate={maxDate}
            onCancelPress={() => {
              setShow(false);
              setFormatedDate();
              setDate();
            }}
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

  // const totalNetPayment =
  //   drawerData?.drawerHistory?.cash_in?.total + drawerData?.drawerHistory?.cash_out?.total;

  const totalNetPayment = drawerData?.drawerHistory?.net_amount;

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
              {cashIn?.total.toFixed(2) ?? '0'}
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

          {/* {viewCashInArray && (
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
          )} */}

          {/* {viewCashInArray && (
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
          )} */}

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
              {cashOut?.total.toFixed(2) ?? '0'}
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
                    source={dropdown}
                    resizeMode="contain"
                    style={
                      manualOutExpandedView ? styles.activeDropDownPayment : styles.dropDownPayment
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

          {/* {viewCashOutArray && (
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
          )} */}

          {/* {viewCashOutArray && (
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
          <View style={styles.netPaymentHeader}>
            <Text style={[styles.sectionListHeader, { color: COLORS.navy_blue }]}>
              {strings.management.netPayment}
            </Text>
            <Text style={[styles.sectionListHeader, { color: COLORS.navy_blue }]}>
              {strings.management.totalCash}
              {/* {sessionHistoryArray?.cash_balance} */}
              {totalNetPayment.toFixed(2)}
              {/* {'.00'} */}
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
