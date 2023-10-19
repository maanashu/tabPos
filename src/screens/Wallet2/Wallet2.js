import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SF, SH } from '@/theme';
import { styles } from '@/screens/Wallet2/Wallet2.styles';
import { getCustomerDummy } from '@/constants/flatListData';
import { strings } from '@/localization';
import {
  bell,
  search_light,
  wallet,
  scn,
  newCalendar,
  cardIcon,
  cashIcon,
  jbricon,
  Fonts,
} from '@/assets';
import moment from 'moment';
import { DaySelector, InvoiceDetail, ScreenWrapper } from '@/components';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import { getCustomers } from '@/selectors/CustomersSelector';
import Graph from './Components/Graph';
import { getTotakTraDetail, getTotalTra, getTotalTraType } from '@/actions/WalletAction';
import { getWallet } from '@/selectors/WalletSelector';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useRef } from 'react';
import { getOrderData } from '@/actions/AnalyticsAction';
import { WeeklyTransaction } from './Components/WeeklyTransaction';
import Modal from 'react-native-modal';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import {
  getOrdersByInvoiceId,
  getOrdersByInvoiceIdSuccess,
  scanBarCode,
} from '@/actions/DashboardAction';

export function Wallet2() {
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  const [invoiceDetail, setInvoiceDetail] = useState(false);
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getWalletData = useSelector(getWallet);
  const getCustomerData = useSelector(getCustomers);
  const getTotalTraData = getWalletData?.getTotalTra;
  const getCustomerStatitics = getCustomerData?.getCustomers;
  const getTotalTraDetail = getWalletData?.getTotakTraDetail;
  const transactionTypeArray = getWalletData?.getTotalTraType;
  const [orderModel, setOrderModel] = useState(false);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const values =
    getCustomerStatitics === undefined
      ? Object.values(getCustomerDummy)
      : Object.values(getCustomerStatitics);

  const [selectId, setSelectId] = useState(2);
  const [selectId2, setSelectId2] = useState(2);
  const [selectTime, setSelectTime] = useState({ value: 'week' });
  const time = selectTime?.value;
  const [dateformat, setDateformat] = useState('');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(new Date());
  const [historytype, setHistorytype] = useState('all');
  const [walletHome, setWalletHome] = useState(true);
  const [weeklyTransaction, setWeeklyTrasaction] = useState(false);
  const [transcationTypeId, setTranscationTypeId] = useState(1);
  const [transaction, setTransaction] = useState({ mode_of_payment: 'all' });
  const [fromHome, setFromHome] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [sku, setSku] = useState();

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const startDated = moment(startDate).format('YYYY-MM-DD');
  const endDated = moment(endDate).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState('');

  const currentStartDate = moment().startOf('month').format('MMM D');
  const currentEndDate = moment().endOf('month').format('MMM D, YYYY');
  const dateRange = `${currentStartDate} - ${currentEndDate}`;
  const maxDate = new Date(2030, 6, 3);
  const formateDate = { start_date: startDated, end_date: endDated };

  const onPresFun1 = (value) => {
    // setShow(false);
    // setDate(new Date());
    setSelectedStartDate('');
    setSelectedEndDate('');
    dispatch(getTotalTra(value, sellerID, formateDate));
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getTotalTra(time, sellerID, formateDate));
    }
  }, [isFocused, selectDate, time]);

  const onLoad = useSelector((state) => isLoadingSelector([TYPES.GET_ORDER_DATA], state));

  let desiredModeOfPayment = historytype; // Replace with the desired mode_of_payment value or "all"
  let filteredData;

  if (desiredModeOfPayment === 'all') {
    filteredData = getTotalTraDetail;
  } else {
    filteredData = getTotalTraDetail.filter(
      (item) => item.mode_of_payment === desiredModeOfPayment
    );
  }
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
        return 'Pickup';
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
    }
  };

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
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const fullDate = moment(selectedDate).format('MM/DD/YYYY');
    setDate(fullDate);
    setFormattedDate(formattedDate);
  };
  const onDateApply = (selectedDate) => {
    const formateDate = moment(selectedDate).format('YYYY-MM-DD');
    if (weeklyTransaction) {
      setSelectId2(0);
      dispatch(getTotakTraDetail(formateDate, sellerID, 'all'));
    } else {
      setSelectId(0);
      dispatch(getTotalTra(null, sellerID, formateDate));
    }
    setShow(false);
  };
  const onCancelPressCalendar = () => {
    if (weeklyTransaction) {
      setSelectId2(0);
      dispatch(getTotakTraDetail(null, sellerID, 'all'));
    } else {
      setSelectId(2);
      dispatch(getTotalTra('week', sellerID, null));
    }
    setDateformat('');
    setDate(new Date());
    setFormattedDate(new Date());
    setShow(false);
  };
  const getFormattedTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // const maxDate = getFormattedTodayDate();
  const onCancelFun = () => {
    setShow(false);
    setDateformat('');
    setDate(new Date());
    setSelectId(2);
    dispatch(getTotalTra('week', sellerID, dateformat));
  };

  const aboutTransactionData = [
    {
      aboutTransaction: 'Total',
      price: getTotalTraData?.data?.total.toFixed(2) ?? '0',
      img: null,
      id: '1',
      type: 'all',
    },
    {
      aboutTransaction: 'JBR Coin',
      price: getTotalTraData?.data?.jbr.toFixed(2) ?? '0',
      img: jbricon,
      id: '2',
      type: 'jbr',
    },

    {
      aboutTransaction: 'Cash',
      price: getTotalTraData?.data?.cash.toFixed(2) ?? '0',
      img: cashIcon,
      id: '3',
      type: 'cash',
    },
    {
      aboutTransaction: 'Card',
      price: getTotalTraData?.data?.card.toFixed(2) ?? '0',
      img: cardIcon,
      id: '4',
      type: 'card',
    },
  ];

  const closeHandler = () => {
    setInvoiceDetail(false);
    setWeeklyTrasaction(true);
  };
  const onSearchInvoiceHandler = (text) => {
    if (text) {
      setSku(text);
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        if (text.includes('Invoice_') || text.includes('invoice_')) {
          dispatch(scanBarCode(text));
        } else {
          dispatch(getOrdersByInvoiceId(text));
        }
      }, 500);
    } else {
      setSku('');
      dispatch(getOrdersByInvoiceIdSuccess({}));
    }
  };
  const bodyView = () => {
    if (invoiceDetail) {
      return (
        <InvoiceDetail
          {...{
            mapRef,
            closeHandler,
          }}
        />
      );
    } else if (walletHome) {
      return (
        <>
          <View style={styles.headerMainView}>
            <View style={styles.deliveryView}>
              <Image source={wallet} style={[styles.truckStyle, { marginLeft: 10 }]} />
              <Text style={styles.deliveryText}>{strings.wallet.wallet}</Text>
            </View>
            <View style={styles.deliveryView}>
              <TouchableOpacity
                onPress={() =>
                  navigate(NAVIGATION.notificationsList, {
                    screen: NAVIGATION.wallet2,
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
                    style={styles.textInputStyles}
                    placeholderTextColor={COLORS.darkGray}
                    onChangeText={(text) => onSearchInvoiceHandler(text)}
                  />
                </View>
                <Image source={scn} style={styles.scnStyle} />
              </View>
            </View>
          </View>

          <View style={styles.walletHomeBodyCon}>
            <View style={styles.displayFlex}>
              <Text style={styles.trancationHeading}>{strings.wallet.totalTransections}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <DaySelector
                    onPresFun={onPresFun1}
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
                {/* <TouchableOpacity
                  style={[
                    styles.homeCalenaderBg,
                    {
                      backgroundColor: selectId == 0 ? COLORS.primary : COLORS.textInputBackground,
                    },
                  ]}
                  onPress={() => setShow(!show)}
                >
                  <Image
                    source={newCalendar}
                    style={[
                      styles.calendarStyle,
                      { tintColor: selectId == 0 ? COLORS.white : COLORS.darkGray },
                    ]}
                  />
                </TouchableOpacity> */}
                {/* <DateTimePickerModal
                  mode={'date'}
                  isVisible={show}
                  onConfirm={onChangeDate}
                  onCancel={() => onCancelFun()}
                  maximumDate={new Date()}
                /> */}
              </View>
            </View>
            <View>
              <FlatList
                data={aboutTransactionData}
                extraData={aboutTransactionData}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.custometrCon}
                      onPress={() => {
                        setWeeklyTrasaction(true);
                        setWalletHome(false);
                        setFromHome(item?.type);
                      }}
                    >
                      <View style={styles.flexAlign}>
                        {index === 0 ? null : (
                          <Image source={item.img} style={styles.newCustomer} />
                        )}

                        <View style={{ paddingHorizontal: moderateScale(7) }}>
                          <Text style={styles.customerCount}>
                            {index === 1 ? '' : '$'}
                            {item.price}
                          </Text>
                          <Text style={styles.newCustomerHeading}>{item.aboutTransaction}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
                horizontal
                contentContainerStyle={styles.contentContainerStyle}
                scrollEnabled={false}
              />
            </View>
            <View style={[styles.displayFlex, { marginTop: ms(20) }]}>
              <Text style={styles.transactions}>{strings.wallet.transactions}</Text>
              {/* <TouchableOpacity
                onPress={() => {
                  setWeeklyTrasaction(true), setWalletHome(false);
                }}
                style={styles.viewButtonCon}
              >
                <Text style={styles.viewAll}>{strings.reward.viewAll}</Text>
              </TouchableOpacity> */}
            </View>
            <View>
              <Graph />
            </View>
          </View>
        </>
      );
    } else if (weeklyTransaction) {
      return (
        <WeeklyTransaction
          comeFrom={fromHome}
          backHandler={() => {
            setWeeklyTrasaction(false);
            setWalletHome(true);
          }}
          orderClickHandler={async (orderId, comingFrom) => {
            setFromHome(comingFrom);
            const res = await dispatch(getOrderData(orderId));
            if (res?.type === 'GET_ORDER_DATA_SUCCESS') {
              setWeeklyTrasaction(false);
              setInvoiceDetail(true);
            }
          }}
          selectTime={selectTime}
          selectId={selectId}
          setSelectId={setSelectId}
          setSelectTime={setSelectTime}
          setSelectDate={setSelectDate}
          selectDate={selectDate}
          // setSelectedEndDate={setSelectedEndDate}
          // setSelectedStartDate={setSelectDate}
          // startDate={startDate}
          // endDate={endDate}
          // dateRange={dateRange}
          // selectedStartDate={selectedStartDate}
          // selectedEndDate={selectedEndDate}
          // setSelectDate={setSelectDate}
          // selectDate={selectDate}
        />
      );
    }
  };
  return (
    <ScreenWrapper>
      <View style={weeklyTransaction ? styles.bgWhitecontainer : styles.container}>
        {bodyView()}
      </View>
      {onLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
        </View>
      ) : null}
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
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
