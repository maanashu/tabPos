import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS, SF, SH, SW } from '@/theme';
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
  backArrow,
  bellDrawer,
  searchDrawer,
  scanNew,
  profitIcon,
  calendarDrawer,
  new_wallet,
  new_JBR_coin,
  new_visa,
  new_cash,
  crossButton,
  arrowLeftUp,
} from '@/assets';
import moment from 'moment';
import { debounce } from 'lodash';
import { DaySelector, InvoiceDetail, ScreenWrapper, Spacer } from '@/components';
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
import OrderWithInvoiceNumber from '../Refund/Components/OrderWithInvoiceNumber';
import { getDashboard } from '@/selectors/DashboardSelector';
import ReturnOrderInvoice from '../Refund/Components/ReturnOrderInvoice';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { DASHBOARDTYPE } from '@/Types/DashboardTypes';
import { Loader } from '@/components/Loader';
import WalletInvoice from './Components/WalletInvoice';
import { height, width } from '@/theme/ScalerDimensions';
import { Images } from '@/assets/new_icon';
import { amountFormat } from '@/utils/GlobalMethods';

export function Wallet2() {
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  const [invoiceDetail, setInvoiceDetail] = useState(false);
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getWalletData = useSelector(getWallet);
  const getCustomerData = useSelector(getCustomers);
  const getSearchOrders = useSelector(getDashboard);
  const searchData = getSearchOrders?.invoiceSearchOrders;
  const orderReciept = useSelector(getAnalytics);
  const order = getSearchOrders?.invoiceSearchOrders;
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
  const [isInvoiceView, setInvoiceView] = useState(false);

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const startDated = moment(startDate).format('YYYY-MM-DD');
  const endDated = moment(endDate).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState('');

  const currentStartDate = moment().startOf('month').format('MMM D');
  const currentEndDate = moment().endOf('month').format('MMM D, YYYY');
  const dateRange = `${currentStartDate} - ${currentEndDate}`;
  const maxDate = new Date();
  const formateDate = { start_date: startDated, end_date: endDated };

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchedText, setSearchedText] = useState('');
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
  const onSeachLoad = useSelector((state) =>
    isLoadingSelector([DASHBOARDTYPE.GET_ORDERS_BY_INVOICE_ID], state)
  );

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
      price: getTotalTraData?.data?.total
        ? getTotalTraData?.data?.total < 0
          ? '-$' + amountFormat(Math.abs(getTotalTraData?.data?.total), 'notSign')
          : amountFormat(getTotalTraData?.data?.total)
        : '$0',
      img: profitIcon,
      id: '1',
      type: 'all',
      backgroundColor: COLORS.cream_yellow,
      color: COLORS.redish_brown,
    },
    {
      aboutTransaction: 'JBR Coin',
      price: amountFormat(getTotalTraData?.data?.jbr, 'noSign'),
      img: new_JBR_coin,
      id: '2',
      type: 'jbr',
      backgroundColor: COLORS.light_purple,
      color: COLORS.navy_blue,
    },

    {
      aboutTransaction: 'Cash',
      price: getTotalTraData?.data?.cash
        ? getTotalTraData?.data?.cash < 0
          ? '-$' + amountFormat(Math.abs(getTotalTraData?.data?.cash), 'notSign')
          : amountFormat(getTotalTraData?.data?.cash)
        : '$0',
      img: new_cash,
      id: '3',
      type: 'cash',
      backgroundColor: COLORS.light_green,
      color: COLORS.dark_green,
    },
    {
      aboutTransaction: 'Card',
      price: getTotalTraData?.data?.card
        ? getTotalTraData?.data?.card < 0
          ? '-$' + amountFormat(Math.abs(getTotalTraData?.data?.card), 'notSign')
          : amountFormat(getTotalTraData?.data?.card)
        : '$0',
      img: new_visa,
      id: '4',
      type: 'card',
      backgroundColor: COLORS.light_skyblue,
      color: COLORS.torquoise,
    },
  ];

  const closeHandler = () => {
    setInvoiceDetail(false);
    setWeeklyTrasaction(true);
  };

  const onSearchInvoiceHandler = (text) => {
    if (text.includes('Invoice_') || text.includes('invoice_')) {
      dispatch(scanBarCode(text));
    } else {
      dispatch(
        getOrdersByInvoiceId(text, (res) => {
          // alert('ok');
          setInvoiceView(true);
          setWalletHome(false);
          setShowSearchModal(false);
        })
      );
    }
  };

  const debouncedSearchInvoice = useCallback(debounce(onSearchInvoiceHandler, 800), []);
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
        <View style={{ flex: 1 }}>
          <View style={styles.headerMainView}>
            <View style={styles.deliveryView}>
              <Image source={new_wallet} style={[styles.userStyle]} />
              <Text style={styles.deliveryText}>{strings.wallet.totalTransections}</Text>
            </View>
            <View style={styles.deliveryView}>
              <DaySelector
                onPresFun={onPresFun1}
                selectId={selectId}
                setSelectId={setSelectId}
                setSelectTime={setSelectTime}
              />

              <TouchableOpacity
                onPress={() => setShow(!show)}
                style={[
                  styles.headerView,
                  {
                    backgroundColor: selectedStartDate ? COLORS.navy_blue : COLORS.sky_grey,
                  },
                ]}
              >
                <Image
                  source={calendarDrawer}
                  style={[
                    styles.calendarStyle,
                    {
                      tintColor: selectedStartDate ? COLORS.sky_grey : COLORS.navy_blue,
                    },
                  ]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigate(NAVIGATION.notificationsList, {
                    screen: NAVIGATION.wallet2,
                  })
                }
                style={{ marginHorizontal: ms(5) }}
              >
                <Image source={bellDrawer} style={styles.truckStyle} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchView}
                onPress={() => {
                  setShowSearchModal(true);
                  setSearchedText('');
                }}
              >
                <Image source={searchDrawer} style={styles.searchImage} />
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={[styles.searchView, { marginLeft: ms(10) }]}
                onPress={() => {
                  setShowSearchModal(true);
                  setSearchedText('');
                }}
              >
                <Image source={scanNew} style={styles.searchImage} />
              </TouchableOpacity> */}
            </View>
          </View>

          <Text
            style={{
              fontSize: ms(9),
              color: COLORS.light_blue2,
              position: 'absolute',
              top: ms(35),
              left: ms(35),
            }}
          >
            {'All the following data is gathered '}
            <Text style={{ color: COLORS.navy_blue }}>
              {time === 'week'
                ? 'weekly'
                : time === 'today'
                ? 'today'
                : time === 'month'
                ? 'monthly'
                : `${startDated} - ${endDated}`}
            </Text>
            .
          </Text>

          <View style={styles.walletHomeBodyCon}>
            <View>
              <FlatList
                data={aboutTransactionData}
                extraData={aboutTransactionData}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={[styles.custometrCon, { backgroundColor: item.backgroundColor }]}
                      onPress={() => {
                        setWeeklyTrasaction(true);
                        setWalletHome(false);
                        setFromHome(item?.type);
                      }}
                    >
                      <Image
                        source={item.img}
                        style={[styles.newCustomer, { tintColor: item.color }]}
                      />

                      <Text style={[styles.customerCount, { color: item.color }]}>
                        {item.price}
                      </Text>
                      <Text style={[styles.newCustomerHeading, { color: item.color }]}>
                        {item.aboutTransaction}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
                horizontal
                contentContainerStyle={styles.contentContainerStyle}
                scrollEnabled={false}
              />
            </View>
            {/* <View style={[styles.displayFlex, { marginTop: ms(20) }]}> */}
            {/* <Text style={styles.transactions}>{strings.wallet.transactions}</Text> */}
            {/* <TouchableOpacity
                onPress={() => {
                  setWeeklyTrasaction(true), setWalletHome(false);
                }}
                style={styles.viewButtonCon}
              >
                <Text style={styles.viewAll}>{strings.reward.viewAll}</Text>
              </TouchableOpacity> */}
            {/* </View> */}
            <View>
              <Graph />
            </View>
          </View>
        </View>
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
          // selectTime={selectTime}
          // selectId={selectId}
          // setSelectId={setSelectId}
          // setSelectTime={setSelectTime}
          //    setSelectDate={setSelectDate}
          //   selectDate={selectDate}
          // setSelectedEndDate={setSelectedEndDate}
          // setSelectedStartDate={setSelectDate}
          // startDatefilter={startDate}
          // endDatefilter={endDate}
          // dateRange={dateRange}
          // selectedStartDate={selectedStartDate}
          // selectedEndDate={selectedEndDate}
          // setSelectDate={setSelectDate}
          // selectDate={selectDate}
        />
      );
    } else if (isInvoiceView) {
      return (
        <>
          <View style={styles.headerMainView}>
            <View style={styles.deliveryView}>
              <TouchableOpacity
                onPress={() => {
                  setWalletHome(true);
                  setInvoiceView(false);
                }}
              >
                <Image source={arrowLeftUp} style={[styles.backButtonArrow, { marginLeft: 10 }]} />
              </TouchableOpacity>
              <Image
                source={new_wallet}
                style={[styles.backButtonArrow, { marginHorizontal: 10 }]}
              />
              <Text style={styles.deliveryText}>{strings.wallet.orderDetail}</Text>
            </View>
            {/* <View style={styles.deliveryView}>
              <TouchableOpacity
                onPress={() =>
                  navigate(NAVIGATION.notificationsList, {
                    screen: NAVIGATION.wallet2,
                  })
                }
              >
                <Image source={bellDrawer} style={[styles.truckStyle, { right: 20 }]} />
              </TouchableOpacity>
              <View style={styles.searchView}>
                <View style={styles.flexAlign}>
                  <Image source={search_light} style={styles.searchImage} />
                  <TextInput
                    value={sku}
                    placeholder={strings.wallet.searchHere}
                    style={styles.textInputStyles}
                    placeholderTextColor={COLORS.darkGray}
                    onChangeText={(text) => {
                      setSku(text);
                      debouncedSearchInvoice(text);
                    }}
                  />
                </View>
                <Image source={scn} style={styles.scnStyle} />
              </View>
            </View> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
            }}
          >
            <View style={{ flex: 0.65, marginRight: ms(10) }}>
              {onSeachLoad ? (
                <View style={{ marginTop: SH(50) }}>
                  <Loader />
                </View>
              ) : (
                <OrderWithInvoiceNumber orderData={searchData} />
              )}
            </View>
            <Spacer horizontal={SW(10)} />

            <View style={styles.invoiceContainer}>
              <WalletInvoice orderDetail={searchData} />
            </View>
          </View>
        </>
      );
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>{bodyView()}</View>
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

      <Modal isVisible={showSearchModal}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View
            style={{
              // marginHorizontal: ms(40),
              // marginVertical: ms(40),
              backgroundColor: 'white',
              borderRadius: ms(5),
              paddingHorizontal: ms(20),
              paddingVertical: ms(20),
              minHeight: '40%',
              position: 'absolute',
              top: ms(20),
              width: '30%',
              right: ms(0),
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: ms(5), right: ms(7) }}
              onPress={() => setShowSearchModal(false)}
            >
              <Image source={crossButton} style={{ height: ms(20), width: ms(20) }} />
            </TouchableOpacity>
            <View style={[styles.searchContainer]}>
              <Image source={searchDrawer} style={styles.searchImage} />
              <TextInput
                placeholder={strings.deliveryOrders.search}
                style={[styles.textInputStyle, { fontSize: ms(10), marginHorizontal: ms(5) }]}
                placeholderTextColor={COLORS.darkGray}
                value={searchedText}
                onChangeText={(searchText) => {
                  // const debouncedSearchInvoice = useCallback(debounce(onSearchInvoiceHandler, 800), []);
                  setSearchedText(searchText);
                  debouncedSearchInvoice(searchText);
                }}
              />
            </View>
            {onSeachLoad && (
              <ActivityIndicator
                color={COLORS.navy_blue}
                size="small"
                style={{ marginTop: ms(20) }}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScreenWrapper>
  );
}
