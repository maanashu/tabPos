import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Platform, Dimensions } from 'react-native';
import { DaySelector, ScreenWrapper, Spacer } from '@/components';

import { styles } from './Analytics2.styles';
import { MainScreen } from './Components/MainScreen';
import { TotalProfit } from './Components/TotalProfit';
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
  Fonts,
  backArrow2,
} from '@/assets';
import Modal from 'react-native-modal';
import { COLORS, SH } from '@/theme';
import { Revenue } from './Components/Revenue';
import { TotalCost } from './Components/TotalCost';
import { TotalDeliveryOrders } from './Components/TotalDeliveryOrders';
import { TotalShippingOrders } from './Components/TotalShippingOrders';
import { TotalOrders } from './Components/TotalOrders';
import { TotalPosOrder } from './Components/TotalPosOrder';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnalyticOrderGraphs,
  getAnalyticStatistics,
  getOrderData,
  getSoldProduct,
  getTotalInventory,
  getTotalOrder,
} from '@/actions/AnalyticsAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { TotalProductSold } from './Components/TotalProductSold';
import { TotalInventory } from './Components/TotalInventory';
import { getUser } from '@/selectors/UserSelectors';

import DropDownPicker from 'react-native-dropdown-picker';
import { ms } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import moment from 'moment';
import { WeeklyTransaction } from './Components/WeeklyTransaction';
import { useRef } from 'react';
import { InvoiceDetail } from '@/screens/Analytics2/Components/InvoiceDetail';
import { TYPES } from '@/Types/AnalyticsTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
export function Analytics2() {
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
  const startDated = moment(startDate).format('YYYY-MM-DD');
  const endDated = moment(endDate).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState('');

  const currentStartDate = moment().startOf('month').format('MMM D');
  const currentEndDate = moment().endOf('month').format('MMM D, YYYY');
  const dateRange = `${currentStartDate} - ${currentEndDate}`;
  const maxDate = new Date(2030, 6, 3);

  const [weeklyTransaction, setWeeklyTrasaction] = useState(false);
  const [invoiceDetail, setInvoiceDetail] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [appName, setAppName] = useState('');
  const [deliveryOption, setDeliveryOption] = useState();

  const handleOnPressNext = () => {
    // Perform actions when "Next" button is pressed
  };
  const getSelectedData = () => {
    if (filter?.value === undefined) {
      return {
        start_date: startDated,
        end_date: endDated,
        channel: channelValue,
      };
    } else {
      return {
        filter: filter?.value,
        channel: channelValue,
      };
    }
  };

  const getSelectedInventoryData = () => {
    if (filter?.value === undefined) {
      return {
        start_date: startDated,
        end_date: endDated,
      };
    } else {
      return {
        filter: filter?.value,
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
    }, [filter, channelValue, selectDate])
  );

  const orderOnPress = (value) => {
    storeData(value);
    setSelectedStartDate('');
    setSelectedEndDate('');
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
      setShowCalendarModal(false);
      setFilter('');
      setOrderSelectId('');
      setSelectDate(!selectDate);
    } else {
      alert('Please Select End Date');
    }
  };

  const goBack = () => {
    setselectedScreen('MainScreen');
  };

  const onViewInvoiceDetail = async (orderId) => {
    setFromInvoice(false);
    setOrderId(orderId);
    setInvoiceDetail(true);
  };

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
        filter={filter?.value}
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
          // setDeliveryOption(4);
          // setAppName();
        }}
      />
    ),
    ['TotalProductSold']: <TotalProductSold sellerID={sellerID} data={data} />,
    ['TotalOrders']: (
      <TotalOrders
        onPressReview={(item) => {
          setWeeklyTrasaction(true);
          setDate(item);
          // setAppName();
          // setDeliveryOption();
        }}
      />
    ),
    ['TotalPosOrder']: (
      <TotalPosOrder
        onPressReview={(item) => {
          setWeeklyTrasaction(true);
          setDate(item);
          // setAppName('pos');
          // setDeliveryOption();
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
          // appName={appName}
          // deliveryOption={deliveryOption}
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
            <View style={styles.flexDirectionRow}>
              <View>
                <Spacer space={ms(10)} />

                <DaySelector
                  onPresFun={orderOnPress}
                  setSelectTime={setFilter}
                  selectId={orderSelectId}
                  setSelectId={setOrderSelectId}
                />
              </View>
              <View style={styles.calendarView}>
                <TouchableOpacity
                  onPress={() => setShowCalendarModal(!showCalendarModal)}
                  style={[
                    styles.headerView,
                    {
                      borderColor: selectedStartDate ? COLORS.primary : COLORS.gerySkies,
                      marginHorizontal: selectedScreen === 'TotalInventory' ? ms(0) : ms(5),
                    },
                  ]}
                >
                  <Image source={calendar} style={styles.calenderImage} />
                  <Text style={styles.dateText}>
                    {startDate
                      ? moment(startDate).format('MMM D') +
                        ' - ' +
                        moment(endDate).format('MMM D, YYYY')
                      : dateRange}
                  </Text>
                </TouchableOpacity>
                {selectedScreen !== 'TotalInventory' ? (
                  <DropDownPicker
                    ArrowDownIconComponent={({ style }) => (
                      <Image source={dropdown} style={styles.dropDownIcon} />
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
                      fontSize: ms(8),
                    }}
                    zIndex={2000}
                    zIndexInverse={2000}
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
            <Spacer space={ms(5)} />

            <View style={[styles.flexDirectionRow, { zIndex: -999 }]}>
              <View style={styles.container}>{screenChangeView()}</View>

              <View style={styles.rightSideView}>
                <Spacer space={SH(5)} />
                <TouchableOpacity style={styles.bucketBackgorund} onPress={() => goBack()}>
                  <Image source={backArrow2} style={styles.backImageStyle} />
                </TouchableOpacity>

                <Spacer space={SH(25)} />
                <TouchableOpacity
                  disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                  onPress={() => setselectedScreen('Revenue')}
                >
                  <Image
                    source={revenueTotal}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'Revenue'
                            ? COLORS.primary
                            : getPosUser?.user_roles?.length > 0
                            ? COLORS.mid_grey
                            : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={SH(20)} />
                <TouchableOpacity
                  disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                  onPress={() => setselectedScreen('TotalCost')}
                >
                  <Image
                    source={totalSales}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalCost'
                            ? COLORS.primary
                            : getPosUser?.user_roles?.length > 0
                            ? COLORS.mid_grey
                            : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={SH(20)} />
                <TouchableOpacity
                  disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                  // style={[
                  //   styles.bucketBackgorund,
                  //   {
                  //     backgroundColor:
                  //       selectedScreen === 'TotalProfit'
                  //         ? COLORS.primary
                  //         : getPosUser?.user_roles?.length > 0
                  //         ? COLORS.mid_grey
                  //         : COLORS.white,
                  //   },
                  // ]}
                  onPress={() => setselectedScreen('TotalProfit')}
                >
                  <Image
                    source={profit}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalProfit'
                            ? COLORS.primary
                            : getPosUser?.user_roles?.length > 0
                            ? COLORS.mid_grey
                            : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={SH(20)} />
                <TouchableOpacity onPress={() => setselectedScreen('TotalPosOrder')}>
                  <Image
                    source={channel}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalPosOrder' ? COLORS.primary : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={SH(20)} />
                <TouchableOpacity onPress={() => setselectedScreen('TotalDeliveryOrders')}>
                  <Image
                    source={averageOrder}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalDeliveryOrders' ? COLORS.primary : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={SH(20)} />
                <TouchableOpacity onPress={() => setselectedScreen('TotalShippingOrders')}>
                  <Image
                    source={productSelling}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalShippingOrders' ? COLORS.primary : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={SH(20)} />
                <TouchableOpacity onPress={() => setselectedScreen('TotalOrders')}>
                  <Image
                    source={locationSales}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor: selectedScreen === 'TotalOrders' ? COLORS.primary : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={SH(20)} />
                <TouchableOpacity onPress={() => setselectedScreen('TotalInventory')}>
                  <Image
                    source={totalOrders}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalInventory' ? COLORS.primary : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={SH(20)} />
                <TouchableOpacity onPress={() => setselectedScreen('TotalProductSold')}>
                  <Image
                    source={totalCost}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalProductSold' ? COLORS.primary : COLORS.black,
                      },
                    ]}
                  />
                </TouchableOpacity>

                {/* <TouchableOpacity
                style={[styles.filterBackgorund]}
                onPress={() => setShowFilterModal(!showFilterModal)}
              >
                <Image source={filterday} style={[styles.sideBarImage]} />
              </TouchableOpacity> */}
              </View>
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
