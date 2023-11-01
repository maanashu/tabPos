import React, { useCallback, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Platform, Dimensions } from 'react-native';
import { DaySelector, ScreenWrapper, Spacer } from '@mPOS/components';

import {
  profit,
  revenueTotal,
  totalSales,
  channel,
  averageOrder,
  productSelling,
  locationSales,
  totalCost,
  totalOrders,
  calendar,
  dropdown,
  backArrow2,
  Images,
} from '@mPOS/assets';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnalyticOrderGraphs,
  getAnalyticStatistics,
  getSoldProduct,
  getTotalInventory,
  getTotalOrder,
} from '@mPOS/actions/AnalyticsAction';
import CalendarPickerModal from '@mPOS/components/CalendarPickerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuthData } from '@mPOS/selectors/AuthSelector';
import { getUser } from '@mPOS/selectors/UserSelectors';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, SH, Fonts } from '@/theme';
import { styles } from './styles';
import { MainScreen } from './Components/MainScreen';
import { ms } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import dayjs from 'dayjs';
import { Revenue } from './Components/Revenue';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { NAVIGATION } from '@mPOS/constants';
import { TotalProfit } from './Components/TotalProfit';
import { TotalCost } from './Components/TotalCost';
import { TotalPosOrder } from './Components/TotalPosOrder';
import { TotalDeliveryOrders } from './Components/TotalDeliveryOrders';
import { TotalShippingOrders } from './Components/TotalShippingOrders';
import { TotalProductSold } from './Components/TotalProductSold';
import { TotalInventory } from './Components/TotalInventory';

export function Analytics() {
  const mapRef = useRef(null);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [selectedScreen, setselectedScreen] = useState('MainScreen');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ value: 'week' });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [channels, setChannels] = useState(false);
  const [channelValue, setChannelValue] = useState('all');
  const [fromInVoice, setFromInvoice] = useState(false);
  const [channelItem, setChannelItem] = useState([
    { label: 'ALL', value: 'all' },
    { label: 'B2B', value: 'b2b' },
    { label: 'POS', value: 'pos' },
    { label: 'B2C', value: 'b2c' },
  ]);

  const [time, setTime] = useState(false);
  const [timeValue, setTimeValue] = useState('week');
  const [timeItem, setTimeItem] = useState([
    { label: 'Today', value: 'today' },
    { label: 'Weekly', value: 'week' },
    { label: 'Monthly', value: 'month' },
  ]);
  const [orderSelectId, setOrderSelectId] = useState(2);
  const [backTime, setBackTime] = useState();
  const [date, setDate] = useState('');

  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getUserData = useSelector(getUser);
  const getPosUser = getUserData?.posLoginData;

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('abc', value);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('abc');
      if (value !== null) {
        setBackTime(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const startDated = dayjs(startDate).format('YYYY-MM-DD');
  const endDated = dayjs(endDate).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState('');

  const currentStartDate = dayjs().startOf('month').format('MMM D');
  const currentEndDate = dayjs().endOf('month').format('MMM D, YYYY');
  const dateRange = `${currentStartDate} - ${currentEndDate}`;
  const maxDate = new Date(2030, 6, 3);

  const [weeklyTransaction, setWeeklyTrasaction] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [appName, setAppName] = useState();
  const [deliveryOption, setDeliveryOption] = useState();

  const handleOnPressNext = () => {
    // Perform actions when "Next" button is pressed
  };
  const getSelectedData = () => {
    if (timeValue === '') {
      return {
        start_date: startDated,
        end_date: endDated,
        channel: channelValue,
      };
    } else {
      return {
        filter: timeValue,
        channel: channelValue,
      };
    }
  };

  const getSelectedInventoryData = () => {
    if (timeValue === '') {
      return {
        start_date: startDated,
        end_date: endDated,
      };
    } else {
      return {
        filter: timeValue,
      };
    }
  };
  const data = channelValue ? getSelectedData() : getSelectedInventoryData();

  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getAnalyticStatistics(sellerID, data));
      dispatch(getAnalyticOrderGraphs(sellerID, data));
      dispatch(getTotalOrder(sellerID, data));
      dispatch(getTotalInventory(sellerID, data));
      dispatch(getSoldProduct(sellerID, data, 1));
      getData();
    }, [timeValue, channelValue, selectDate])
  );

  const orderOnPress = (value) => {
    storeData(value);
    setSelectedStartDate('');
    setSelectedEndDate('');
  };
  const onDateChange = (date, type) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
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
      setShowCalendarModal(false);
      setTimeValue('');
      setOrderSelectId('');
      setSelectDate(!selectDate);
    } else {
      alert('Please Select End Date');
    }
  };

  const goBackHandler = () => {
    selectedScreen === 'MainScreen' ? goBack() : setselectedScreen('MainScreen');
  };

  const onViewInvoiceDetail = async (orderId) => {
    setFromInvoice(false);
    setOrderId(orderId);
    setInvoiceDetail(true);
  };
  const headerTitle =
    selectedScreen === 'MainScreen'
      ? 'Back'
      : selectedScreen === 'TotalProfit'
      ? 'Gross Profit'
      : selectedScreen === 'Revenue'
      ? 'Total Revenue'
      : selectedScreen === 'TotalCost'
      ? 'Total Costs'
      : selectedScreen === 'TotalDeliveryOrders'
      ? 'Total Delivery Orders'
      : selectedScreen === 'TotalShippingOrders'
      ? 'Total Shipping Orders'
      : selectedScreen === 'TotalProductSold'
      ? 'Total Product Sold'
      : selectedScreen === 'TotalOrders'
      ? 'Total Orders'
      : selectedScreen === 'TotalInventory'
      ? 'Total Inventory'
      : selectedScreen === 'TotalPosOrder'
      ? 'Total POS Orders'
      : selectedScreen;

  const renderScreen = {
    ['MainScreen']: (
      <MainScreen
        onPressProfit={() => setselectedScreen('TotalProfit')}
        onPressRevenue={() => setselectedScreen('Revenue')}
        onPressCost={() => setselectedScreen('TotalCost')}
        onPressDelivery={() => setselectedScreen('TotalDeliveryOrders')}
        onPressShipping={() => setselectedScreen('TotalShippingOrders')}
        onPressProducts={() => setselectedScreen('TotalProductSold')}
        onPressOrders={() => setselectedScreen('TotalOrders')}
        onPressInventory={() => setselectedScreen('TotalInventory')}
        onPressPosOrder={() => setselectedScreen('TotalPosOrder')}
        filter={timeValue}
        startDated={startDated}
        endDated={endDated}
      />
    ),
    ['TotalProfit']: <TotalProfit />,
    ['Revenue']: <Revenue />,
    ['TotalCost']: <TotalCost />,
    ['TotalDeliveryOrders']: (
      <TotalDeliveryOrders
        onPressReview={(item) => {
          setWeeklyTrasaction(true);
          setDate(item);
          setDeliveryOption(1);
          setAppName();
        }}
      />
    ),
    ['TotalShippingOrders']: (
      <TotalShippingOrders
        onPressReview={(item) => {
          setWeeklyTrasaction(true);
          setDate(item);
          setDeliveryOption(4);
          setAppName();
        }}
      />
    ),
    ['TotalProductSold']: <TotalProductSold sellerID={sellerID} data={data} />,
    // ["TotalOrders"]: (
    //   <TotalOrders
    //     onPressReview={(item) => {
    //       setWeeklyTrasaction(true);
    //       setDate(item);
    //       setAppName();
    //       setDeliveryOption();
    //     }}
    //   />
    // ),
    ['TotalPosOrder']: (
      <TotalPosOrder
        onPressReview={(item) => {
          setWeeklyTrasaction(true);
          setDate(item);
          setAppName('pos');
          setDeliveryOption();
        }}
      />
    ),
    ['TotalInventory']: <TotalInventory />,
  };
  const closeHandler = () => {
    setFromInvoice(true);
    setInvoiceDetail(false);
  };
  const transactionList = () => {
    if (invoiceDetail) {
      return (
        <InvoiceDetail
          {...{
            mapRef,
            closeHandler,
            orderId,
          }}
        />
      );
    } else if (weeklyTransaction) {
      return (
        <WeeklyTransaction
          backHandler={() => {
            setFromInvoice(false);
            setWeeklyTrasaction(false);
          }}
          orderClickHandler={(orderId) => {
            onViewInvoiceDetail(orderId);
          }}
          selectTime={date}
          FromInvoice={fromInVoice}
          appName={appName}
          deliveryOption={deliveryOption}
        />
      );
    }
  };

  const screenChangeView = () => {
    return renderScreen[selectedScreen];
  };

  return (
    <ScreenWrapper>
      {weeklyTransaction ? (
        transactionList()
      ) : (
        <View style={styles.container}>
          <View style={styles.homeMainContainer}>
            <TouchableOpacity onPress={() => goBackHandler()} style={styles.headerMainView}>
              <Image source={Images.back} style={styles.backImage} />
              <Text style={styles.headerText}>{headerTitle}</Text>
            </TouchableOpacity>

            <View style={styles.flexDirectionRow}>
              <View>
                <Spacer space={ms(5)} />
                <TouchableOpacity
                  onPress={() => setShowCalendarModal(!showCalendarModal)}
                  style={[
                    styles.headerView,
                    {
                      borderColor: selectedStartDate ? COLORS.darkBlue : COLORS.placeholderText,
                    },
                  ]}
                >
                  <Image source={Images.calendar2} style={styles.calenderImage} />
                  <Text style={styles.dateText}>
                    {startDate
                      ? dayjs(startDate).format('MMM D') +
                        ' - ' +
                        dayjs(endDate).format('MMM D, YYYY')
                      : dateRange}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.calendarView}>
                <DropDownPicker
                  ArrowDownIconComponent={({ style }) => (
                    <Image source={Images.dropdown} style={styles.dropDownIcon} />
                  )}
                  style={styles.dropdown}
                  containerStyle={[
                    styles.containerStyle,
                    { zIndex: Platform.OS === 'ios' ? 100 : 2 },
                  ]}
                  open={channels}
                  value={channelValue}
                  items={channelItem}
                  setOpen={setChannels}
                  setValue={setChannelValue}
                  setItems={setChannelItem}
                  placeholder="All Channels"
                  placeholderStyle={{
                    color: '#A7A7A7',
                    fontFamily: Fonts.Regular,
                    fontSize: ms(10),
                  }}
                  zIndex={2000}
                  zIndexInverse={2000}
                />
              </View>
              <View style={[styles.calendarView, { marginHorizontal: ms(5) }]}>
                <DropDownPicker
                  ArrowDownIconComponent={({ style }) => (
                    <Image source={Images.dropdown} style={styles.dropDownIcon} />
                  )}
                  style={[styles.dropdown]}
                  containerStyle={[
                    styles.containerStyle,
                    { zIndex: Platform.OS === 'ios' ? 100 : 2, width: ms(90) },
                  ]}
                  open={time}
                  value={timeValue}
                  items={timeItem}
                  setOpen={setTime}
                  setValue={(value) => {
                    setTimeValue(value);
                    setSelectedStartDate('');
                    setSelectedEndDate('');
                  }}
                  setItems={setTimeItem}
                  placeholder="Weekly"
                  placeholderStyle={{
                    color: '#A7A7A7',
                    fontFamily: Fonts.Regular,
                    fontSize: ms(10),
                  }}
                  zIndex={2000}
                  zIndexInverse={2000}
                />
              </View>
            </View>
            <Spacer space={ms(10)} />

            <View style={[styles.flexDirectionRow, { zIndex: -999 }]}>
              <View style={styles.container}>{screenChangeView()}</View>
            </View>
          </View>
          <Modal
            isVisible={showCalendarModal}
            statusBarTranslucent
            animationIn={'slideInRight'}
            animationInTiming={600}
            animationOutTiming={300}
          >
            <View style={styles.calendarModalView}>
              <CalendarPickerModal
                onPress={() => setShowCalendarModal(false)}
                onDateChange={onDateChange}
                handleOnPressNext={handleOnPressNext}
                onSelectedDate={onSelect}
                allowRangeSelection={true}
                maxDate={maxDate}
                onCancelPress={() => setShowCalendarModal(false)}
              />
            </View>
          </Modal>
        </View>
      )}
    </ScreenWrapper>
  );
}
