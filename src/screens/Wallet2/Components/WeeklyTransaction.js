import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { styles } from '@/screens/Wallet2/Wallet2.styles';
import { strings } from '@/localization';
import {
  bell,
  search_light,
  scn,
  newCalendar,
  cardIcon,
  cashIcon,
  jbricon,
  backArrow,
  Union,
  mask,
  maskRight,
  unionRight,
  dropdown2,
  tableArrow,
  Fonts,
} from '@/assets';
import moment from 'moment';
import { DaySelector, Spacer, TableDropdown } from '@/components';
import { moderateScale, ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import { getCustomers } from '@/selectors/CustomersSelector';
import { getTotakTraDetail, getTotalTra, getTotalTraType } from '@/actions/WalletAction';
import { getWallet } from '@/selectors/WalletSelector';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { TYPES } from '@/Types/WalletTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useRef } from 'react';
import { memo } from 'react';
import { DELIVERY_MODE, PAGINATION_DATA, months, weeklyStatus } from '@/constants/enums';
const windowHeight = Dimensions.get('window').height;
import Modal from 'react-native-modal';
import CalendarPickerModal from '@/components/CalendarPickerModal';

export function WeeklyTransaction({
  backHandler,
  orderClickHandler,
  comeFrom,
  selectTime,
  setSelectTime,
  selectId,
  setSelectId,
  selectDate,
  setSelectDate,
}) {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getWalletData = useSelector(getWallet);
  const getCustomerData = useSelector(getCustomers);

  const getTotalTraData = getWalletData?.getTotalTra;
  const getTotalTraDetail = getWalletData?.getTotakTraDetail?.data ?? [];
  const transactionTypeArray = getWalletData?.getTotalTraType;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(10);
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);

  // const [selectId, setSelectId] = useState(2);
  // const [selectTime, setSelectTime] = useState({ value: 'week' });
  const time = selectTime?.value;
  const [page, setPage] = useState(1);

  const [dateformat, setDateformat] = useState('');
  const [date, setDate] = useState();
  const [historytype, setHistorytype] = useState('all');

  const [transcationTypeId, setTranscationTypeId] = useState(
    comeFrom == 'all' ? 1 : comeFrom == 'jbr' ? 2 : comeFrom == 'cash' ? 3 : 4
  );
  const [transaction, setTransaction] = useState({
    modeOfPayment:
      comeFrom == 'all' ? 'all' : comeFrom == 'jbr' ? 'jbr' : comeFrom == 'cash' ? 'cash' : 'card',
  });

  const [show, setShow] = useState(false);
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState();

  const statusSelection = (value) => setStatusSelect(value);
  const [statusSelect, setStatusSelect] = useState('none');

  const orderTypeSelection = (value) => setOrderTypeSelect(value);
  const [orderTypeSelect, setOrderTypeSelect] = useState('none');

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const startDated = moment(startDate).format('YYYY-MM-DD');
  const endDated = moment(endDate).format('YYYY-MM-DD');
  // const [selectDate, setSelectDate] = useState('');

  const currentStartDate = moment().startOf('month').format('MMM D');
  const currentEndDate = moment().endOf('month').format('MMM D, YYYY');
  const dateRange = `${currentStartDate} - ${currentEndDate}`;
  const formateDate = { start_date: startDated, end_date: endDated };
  // console.log('fgkdhfgkd', startDated, endDated);

  const orderTypeArray = [
    {
      label: 'Product',
      value: 'product',
    },
    {
      label: 'Service',
      value: 'service',
    },
  ];

  const paginationData = {
    total: getWalletData?.getTotakTraDetail?.total ?? '0',
    currentPage: getWalletData?.getTotakTraDetail?.current_page ?? '0',
    totalPages: getWalletData?.getTotakTraDetail?.total_pages ?? '0',
    perPage: getWalletData?.getTotakTraDetail?.per_page ?? '0',
  };
  const orderPayloadLength = Object.keys(getWalletData?.getTotakTraDetail)?.length;

  const startIndex = (page - 1) * paginationModalValue + 1;

  const transactionArray = [
    {
      id: 1,
      modeOfPayment: 'all',
      count: transactionTypeArray?.[0]?.count ?? '0',
      type: 'All',
    },
    {
      id: 2,
      modeOfPayment: 'jbr',
      count: transactionTypeArray?.[1]?.count ?? '0',
      type: 'JBR',
    },
    {
      id: 3,
      modeOfPayment: 'cash',
      count: transactionTypeArray?.[3]?.count ?? '0',
      type: 'Cash',
    },
    {
      id: 4,
      modeOfPayment: 'card',
      count: transactionTypeArray?.[2]?.count ?? '0',
      type: 'Card',
    },
  ];

  const onPresFun = (value) => {
    setFormatedDate();
  };

  useEffect(() => {
    const data = {
      dayWiseFilter: time,
      calendarDate: formatedDate,
      sellerID: sellerID,
    };
    dispatch(getTotalTraType(data));
  }, [selectId, formatedDate]);

  const typeSelect = () => {
    if (statusSelect === 'none' && orderTypeSelect === 'none') {
      return {
        transaction_type: transaction?.modeOfPayment,
        page: page,
        limit: paginationModalValue,
      };
    } else if (statusSelect !== 'none' && orderTypeSelect === 'none') {
      return {
        transaction_type: transaction?.modeOfPayment,
        page: page,
        limit: paginationModalValue,
        status: statusSelect,
      };
    } else if (statusSelect === 'none' && orderTypeSelect !== 'none') {
      return {
        transaction_type: transaction?.modeOfPayment,
        page: page,
        limit: paginationModalValue,
        order_type: orderTypeSelect,
      };
    } else if (statusSelect !== 'none' && orderTypeSelect !== 'none') {
      return {
        transaction_type: transaction?.modeOfPayment,
        page: page,
        limit: paginationModalValue,
        status: statusSelect,
        order_type: orderTypeSelect,
      };
    }
  };
  const filterSelect = () => {
    if (selectTime?.value === undefined) {
      return {
        start_date: startDated,
        end_date: endDated,
      };
    } else {
      return {
        filter_by: time,
      };
    }
  };
  const typeSelectData = typeSelect();
  const filterData = filterSelect();
  useEffect(() => {
    dispatch(getTotakTraDetail(sellerID, typeSelectData, filterData));
  }, [
    selectId,
    transaction,
    page,
    paginationModalValue,
    formatedDate,
    orderTypeSelect,
    statusSelect,
    startDated,
    endDated,
    selectDate,
  ]);

  const onDateChange = (date, type) => {
    const formattedDate = moment(date).format('YYYY-MM-DD');
    if (type === 'END_DATE') {
      setSelectedEndDate(formattedDate);
    } else {
      setSelectedStartDate(formattedDate);
      setSelectedEndDate(null);
    }
  };
  const onSelect = () => {
    if (!selectedStartDate && !selectedEndDate) {
      alert('Please Select Date');
    } else if (selectedStartDate && selectedEndDate) {
      setShow(false);
      setSelectTime('');
      setSelectId('');
      setSelectDate(!selectDate);
    } else {
      alert('Please Select End Date');
    }
  };
  const onChangeDate = (selectedDate) => {
    setDefaultDate(selectedDate);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const fullDate = moment(selectedDate).format('MM/DD/YYYY');
    setDate(formattedDate);
  };
  const getFormattedTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const maxDate = new Date(2030, 6, 3);

  const isTotalTraLoad = useSelector((state) => isLoadingSelector([TYPES.GET_TOTAL_TRA], state));

  const isTotalTradetail = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_TRA_DETAIL], state)
  );
  const isTotalTraType = useSelector((state) =>
    isLoadingSelector([TYPES.GET_TOTAL_TRA_TYPE], state)
  );
  let desiredModeOfPayment = historytype; // Replace with the desired mode_of_payment value or "all"
  let filteredData = [];

  const statusFun = (status) => {
    switch (status) {
      case 0:
        return 'Review';
        break;
      case 1:
        return 'Accepted';
        break;
      case 2:
        return 'Prepare';
        break;
      case 3:
        return 'Ready Pickup';
        break;
      case 4:
        return 'Assign';
        break;
      case 5:
        return 'Walkin';
        break;
      case 6:
        return 'Delivered';
        break;
      case 7:
        return 'Cancelled';
        break;
      case 8:
        return 'Rejected';
        break;
      case 9:
        return 'Refunded';
        break;
    }
  };

  const allTransactionItem = ({ item }) => {
    const borderColor = item.id === transcationTypeId ? COLORS.primary : COLORS.solidGrey;
    const color = item.id === transcationTypeId ? COLORS.primary : COLORS.dark_grey;
    const fontFamily = item.id === transcationTypeId ? Fonts.SemiBold : Fonts.Regular;
    return (
      <TransactionSelectItem
        item={item}
        onPress={() => {
          setTranscationTypeId(item.id);
          setTransaction(item);
          // onPresFun3(item.mode_of_payment);
        }}
        borderColor={borderColor}
        color={color}
        fontFamily={fontFamily}
      />
    );
  };

  const TransactionSelectItem = ({ item, onPress, borderColor, color, fontFamily }) => (
    <TouchableOpacity onPress={onPress} style={[styles.allJbrCon, { borderColor }]}>
      {isTotalTraType ? (
        <ActivityIndicator size="small" color={COLORS.primary} />
      ) : (
        <Text style={[styles.allJbrText, { color, fontFamily }]}>
          {item.type} ({item.count})
        </Text>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{ height: windowHeight * 0.95 }}>
      <View style={styles.headerMainView}>
        <TouchableOpacity style={styles.backButtonCon} onPress={backHandler}>
          <Image source={backArrow} style={styles.backButtonArrow} />
          <Text style={styles.backTextStyle}>{strings.posSale.back}</Text>
        </TouchableOpacity>
        <View style={styles.deliveryView}>
          <TouchableOpacity>
            <Image source={bell} style={[styles.truckStyle, { right: 20 }]} />
          </TouchableOpacity>
          <View style={[styles.searchView, { backgroundColor: COLORS.textInputBackground }]}>
            <View style={styles.flexAlign}>
              <Image source={search_light} style={styles.searchImage} />
              <TextInput
                placeholder={strings.wallet.searchHere}
                style={styles.textInputStyles}
                placeholderTextColor={COLORS.darkGray}
              />
            </View>
            <Image source={scn} style={styles.scnStyle} />
          </View>
        </View>
      </View>
      {/* <ScrollView> */}
      <View style={styles.walletTranCon}>
        <View style={styles.displayFlex}>
          <Text style={styles.trancationHeading}>{strings.wallet.totalTransections}</Text>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <DaySelector
                onPresFun={onPresFun}
                selectId={selectId}
                setSelectId={setSelectId}
                setSelectTime={setSelectTime}
              />
            </View>
            <TouchableOpacity
              onPress={() => setShow(!show)}
              style={[
                styles.headerView,
                {
                  borderColor: selectedStartDate ? COLORS.primary : COLORS.gerySkies,
                  marginHorizontal: ms(5),
                },
              ]}
            >
              <Image source={newCalendar} style={styles.calendarStyle} />
              <Text style={startDate ? styles.dateText : styles.dateText2}>
                {startDate
                  ? moment(startDate).format('MMM D') +
                    ' - ' +
                    moment(endDate).format('MMM D, YYYY')
                  : dateRange}
              </Text>
            </TouchableOpacity>
            <Modal
              isVisible={show}
              statusBarTranslucent
              animationIn={'fadeIn'}
              animationInTiming={600}
              animationOutTiming={300}
              onBackdropPress={() => setShow(false)}
            >
              <View style={styles.calendarModalView}>
                <CalendarPickerModal
                  onPress={() => setShow(false)}
                  // onDateChange={onChangeDate}
                  // onSelectedDate={() => onDateApply(formattedDate)}
                  // selectedStartDate={formattedDate}
                  maxDate={maxDate}
                  // onCancelPress={onCancelPressCalendar}
                  allowRangeSelection={true}
                  onDateChange={onDateChange}
                  // handleOnPressNext={handleOnPressNext}
                  onSelectedDate={onSelect}
                  onCancelPress={() => {
                    setShow(false);
                    // setSelectedStartDate('');
                    // setSelectedEndDate('');
                    // setSelectId(2);
                    // setSelectTime({ value: 'week' });
                  }}
                />

                {/* <CalendarPickerModal
                  onPress={() => {
                    setShow(false);
                    setDefaultDate();
                    setSelectId(2);
                    setFormatedDate();
                    setSelectTime({ value: 'week' });
                  }}
                  onDateChange={onChangeDate}
                  onSelectedDate={() => {
                    setShow(false);
                    setSelectId(0);
                    setFormatedDate(date);
                  }}
                  maxDate={maxDate}
                  selectedStartDate={defaultDate}
                  onCancelPress={() => {
                    setShow(false);
                    // setFormatedDate();
                    // setDate();
                    // setSelectId(2);
                    // setSelectTime({ value: 'week' });
                  }}
                /> */}
              </View>
            </Modal>
          </View>
        </View>
      </View>
      <Spacer space={SH(10)} />
      <View style={[styles.allTypeCon]}>
        <FlatList
          data={transactionArray}
          extraData={transactionArray}
          renderItem={allTransactionItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
      {/* </ScrollView> */}
      <View style={styles.orderTypeCon}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <View style={styles.datePickerCon}>
            <Image source={calendar1} style={styles.calendarStyle} />
            <Text style={styles.datePlaceholder}>Date</Text>
          </View> */}

          <View style={{ marginRight: moderateScale(5) }}>
            <TableDropdown placeholder="Status" selected={statusSelection} data={weeklyStatus} />
          </View>
          <>
            <TableDropdown
              placeholder="Order type"
              selected={orderTypeSelection}
              data={orderTypeArray}
            />
          </>
        </View>
      </View>
      <View
        style={[styles.jbrTypeCon, { zIndex: -2, opacity: orderPayloadLength === 0 ? 0.4 : 1 }]}
        pointerEvents={orderPayloadLength === 0 ? 'none' : 'auto'}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <Text style={[styles.paginationCount, { fontSize: 12 }]}>Showing Results</Text>
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
              setOpen={setPaginationModalOpen}
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
            onPress={() => setPage(page - 1)}
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
          <View style={[styles.unionCon, { marginLeft: 7 }]}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <View
            style={{
              width: ms(70),
            }}
          >
            {isTotalTradetail ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={[styles.paginationCount, { paddingHorizontal: 0, alignSelf: 'center' }]}>
                {startIndex} - {startIndex + (getTotalTraDetail?.length - 1)} of{' '}
                {paginationData?.total}
              </Text>
            )}
          </View>
          <View style={[styles.unionCon, { marginRight: 7 }]}>
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
            onPress={() => setPage(page + 1)}
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
        </View>
      </View>
      <View style={{ zIndex: -9 }}>
        <Table>
          <View style={[styles.tableDataHeaderCon, { borderWidth: 1, padding: 0 }]}>
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeft}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
                <Text style={[styles.tableTextHea, { marginLeft: ms(15) }]}>Date</Text>
              </View>
              <View style={styles.tableHeaderRight}>
                <Text numberOfLines={1} style={styles.tableTextHea}>
                  Invoice ID
                </Text>
                <View style={styles.flexAlign}>
                  <Text numberOfLines={1} style={[styles.tableTextHea, { lineHeight: ms(7) }]}>
                    Transaction type
                  </Text>
                  {/* <Image source={tableArrow} style={styles.tableArrow} /> */}
                </View>
                <View style={styles.flexAlign}>
                  <Text numberOfLines={1} style={[styles.tableTextHea, { lineHeight: ms(7) }]}>
                    Payment Method
                  </Text>
                  {/* <Image source={tableArrow} style={styles.tableArrow} /> */}
                </View>
                <Text style={styles.tableTextHea}>Amount</Text>
                <Text style={[styles.tableTextHea, { marginRight: -5 }]}>Refunded</Text>

                <Text style={[styles.tableTextHea, { paddingHorizontal: 25 }]}>Status</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableHeight}>
            <ScrollView>
              {isTotalTradetail ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : getTotalTraDetail?.length === 0 ? (
                <View style={{ marginTop: ms(110) }}>
                  <Text style={styles.userNotFound}>Order not found</Text>
                </View>
              ) : (
                getTotalTraDetail?.map((item, index) => {
                  const currentIndex = startIndex + index;
                  return (
                    <TouchableOpacity
                      style={[styles.tableDataCon, { zIndex: -9 }]}
                      key={index}
                      onPress={() => orderClickHandler(item?.id, transaction?.modeOfPayment)}
                    >
                      <View style={styles.displayFlex}>
                        <View style={styles.tableHeaderLeft}>
                          <Text style={[styles.tableTextDataFirst]}>{currentIndex}</Text>
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 30,
                            }}
                          >
                            <Text style={styles.tableTextData}>
                              {item.created_at
                                ? moment(item.created_at).format('ll')
                                : 'date not found'}
                            </Text>
                            <Text style={[styles.tableTextData, { color: COLORS.gerySkies }]}>
                              {item.created_at
                                ? moment(item.created_at).format('h:mm A')
                                : 'date not found'}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.tableHeaderRight}>
                          <Text
                            style={[styles.tableTextData, { fontSize: SF(12), marginLeft: ms(10) }]}
                          >
                            {item?.invoices?.invoice_number ?? null}
                          </Text>
                          <Spacer horizontal space={ms(20)} />
                          <Text style={styles.tableTextData}>
                            {DELIVERY_MODE[item?.delivery_option]}
                          </Text>
                          <Text style={[styles.tableTextData, { marginLeft: ms(15) }]}>
                            {item?.mode_of_payment}
                          </Text>
                          <Spacer horizontal space={Platform.OS == 'ios' ? ms(15) : ms(25)} />

                          <Text style={styles.tableTextData}>${item?.payable_amount ?? '0'}</Text>
                          {/* <View
                            style={{
                              marginLeft: ms(-15),
                            }}
                          > */}
                          <Text style={styles.tableTextData}>
                            {item.refunded_amount !== null ? '$' + item.refunded_amount : '$0'}
                          </Text>
                          {/* </View> */}
                          <View
                            style={{
                              width: SF(110),
                              borderRadius: ms(3),
                              backgroundColor: COLORS.bluish_green,
                              alignItems: 'center',
                              height: SH(24),
                              justifyContent: 'center',
                              marginLeft: ms(-35),
                            }}
                          >
                            <Text style={styles.tableTextDataCom}>{statusFun(item.status)}</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>
        </Table>
      </View>

      <Spacer space={SH(100)} />
    </View>
  );
}
