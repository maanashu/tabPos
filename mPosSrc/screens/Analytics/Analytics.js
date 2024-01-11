import React, { useCallback, useRef, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Platform, Dimensions } from 'react-native';
import { Header, ScreenWrapper, Spacer } from '@mPOS/components';

import { Images } from '@mPOS/assets';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import CalendarPickerModal from '@mPOS/components/CalendarPickerModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, Fonts } from '@/theme';
import { styles } from './styles';
import { MainScreen } from './Components/MainScreen';
import { ms } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import dayjs from 'dayjs';
import { Revenue } from './Components/Revenue';
import { goBack } from '@mPOS/navigation/NavigationRef';
import { TotalProfit } from './Components/TotalProfit';
import { TotalCost } from './Components/TotalCost';
import { TotalPosOrder } from './Components/TotalPosOrder';
import { TotalDeliveryOrders } from './Components/TotalDeliveryOrders';
import { TotalShippingOrders } from './Components/TotalShippingOrders';
import { TotalProductSold } from './Components/TotalProductSold';
import { TotalInventory } from './Components/TotalInventory';
import { TotalOrders } from './Components/TotalOrders';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUser } from '@/selectors/UserSelectors';
import {
  getAnalyticOrderGraphs,
  getAnalyticStatistics,
  getSoldProduct,
  getTotalInventory,
  getTotalOrder,
} from '@/actions/AnalyticsAction';
import { commonNavigate, MPOS_NAVIGATION } from '@common/commonImports';

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
  const [appName, setAppName] = useState();
  const [deliveryOption, setDeliveryOption] = useState();
  const [orderDate, setOrderDate] = useState(null);

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
      dispatch(getAnalyticStatistics(sellerID, data, 1));
      dispatch(getAnalyticOrderGraphs(sellerID, data));
      dispatch(getTotalOrder(sellerID, data));
      dispatch(getTotalInventory(sellerID, data, 1));
      dispatch(getSoldProduct(sellerID, data, 1));
      getData();
    }, [timeValue, channelValue, selectDate, appName, orderDate, deliveryOption])
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

  const showTransDetail = (item) => {
    if (item) {
      commonNavigate(MPOS_NAVIGATION.transactionList, {
        start_date: item,
        end_date: item,
        transactionType: 'all',
        delivery_option:
          selectedScreen === 'TotalShippingOrders'
            ? 4
            : selectedScreen === 'TotalDeliveryOrders'
            ? 1
            : null,
        app_name: selectedScreen === 'TotalPosOrder' ? 'pos' : null,
      });
    } else {
      commonNavigate(MPOS_NAVIGATION.transactionList, {
        filter_by: timeValue,
        transactionType: 'all',
        delivery_option:
          selectedScreen === 'TotalShippingOrders'
            ? 4
            : selectedScreen === 'TotalDeliveryOrders'
            ? 1
            : null,
        app_name: selectedScreen === 'TotalPosOrder' ? 'pos' : null,
      });
    }
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
    ['TotalProfit']: <TotalProfit sellerID={sellerID} data={data} />,
    ['Revenue']: <Revenue sellerID={sellerID} data={data} />,
    ['TotalCost']: <TotalCost sellerID={sellerID} data={data} />,
    ['TotalDeliveryOrders']: (
      <TotalDeliveryOrders
        onPressReview={(item) => {
          showTransDetail(item);
        }}
      />
    ),
    ['TotalShippingOrders']: (
      <TotalShippingOrders
        onPressReview={(item) => {
          showTransDetail(item);
        }}
      />
    ),
    ['TotalProductSold']: <TotalProductSold sellerID={sellerID} data={data} />,
    ['TotalOrders']: (
      <TotalOrders
        onPressReview={(item) => {
          showTransDetail(item);
        }}
      />
    ),
    ['TotalPosOrder']: (
      <TotalPosOrder
        onPressReview={(item) => {
          showTransDetail(item);
        }}
      />
    ),
    ['TotalInventory']: <TotalInventory />,
  };
  console.log('asfsafas', orderDate);
  const screenChangeView = () => {
    return renderScreen[selectedScreen];
  };

  return (
    <ScreenWrapper>
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
                    borderColor: selectedStartDate ? COLORS.primary : COLORS.gerySkies,
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
                containerStyle={styles.containerStyle}
                style={styles.dropdown}
                arrowIconStyle={styles.arrowIconStyle}
                textStyle={{
                  color: COLORS.white,
                  fontFamily: Fonts.SemiBold,
                  fontSize: ms(12),
                }}
                listItemLabelStyle={{ color: COLORS.black, fontFamily: Fonts.Regular }}
              />
            </View>
            <View style={[styles.calendarView, { marginHorizontal: ms(5) }]}>
              <DropDownPicker
                ArrowDownIconComponent={({ style }) => (
                  <Image source={Images.dropdown} style={styles.dropDownIcon} />
                )}
                // style={[styles.dropdown]}
                // containerStyle={[
                //   styles.containerStyle,
                //   { zIndex: Platform.OS === 'ios' ? 100 : 2, width: ms(90) },
                // ]}
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
                containerStyle={[
                  styles.containerStyle,
                  { width: Platform.OS === 'android' ? ms(95) : ms(98) },
                ]}
                style={styles.dropdown}
                arrowIconStyle={styles.arrowIconStyle}
                textStyle={{
                  color: COLORS.white,
                  fontFamily: Fonts.SemiBold,
                  fontSize: ms(12),
                }}
                listItemLabelStyle={{ color: COLORS.black, fontFamily: Fonts.Regular }}
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
    </ScreenWrapper>
  );
}
