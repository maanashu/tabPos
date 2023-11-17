import React, { useRef, useState, useCallback } from 'react';
import { View, TouchableOpacity, Image, Text, Platform } from 'react-native';

import moment from 'moment';
import Modal from 'react-native-modal';
import { ms } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  calendar,
  dropdown,
  Fonts,
  backIcon,
  profitIcon,
  revnue,
  posOrders,
  deliveryIcon,
  shippingIcon,
  totalOrder,
  inventory,
  soldProduct,
  totalCostIcon,
} from '@/assets';
import { MainScreen } from './Components/MainScreen';
import { TotalProfit } from './Components/TotalProfit';
import { DaySelector, ScreenWrapper, Spacer } from '@/components';

import {
  getAnalyticOrderGraphs,
  getAnalyticStatistics,
  getSoldProduct,
  getTotalInventory,
  getTotalOrder,
} from '@/actions/AnalyticsAction';
import { COLORS, SH } from '@/theme';
import { Revenue } from './Components/Revenue';
import { TotalCost } from './Components/TotalCost';
import { getAuthData } from '@/selectors/AuthSelector';
import { TotalOrders } from './Components/TotalOrders';
import { TotalPosOrder } from './Components/TotalPosOrder';
import { TotalInventory } from './Components/TotalInventory';
import { TotalProductSold } from './Components/TotalProductSold';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import { TotalDeliveryOrders } from './Components/TotalDeliveryOrders';
import { TotalShippingOrders } from './Components/TotalShippingOrders';
import { getUser } from '@/selectors/UserSelectors';
import { WeeklyTransaction } from './Components/WeeklyTransaction';
import { InvoiceDetail } from '@/screens/Analytics2/Components/InvoiceDetail';

import { styles } from './Analytics2.styles';

export function Analytics2() {
  const mapRef = useRef(null);
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
  const [appName, setAppName] = useState();
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
      dispatch(getAnalyticStatistics(sellerID, data, 1));
      dispatch(getAnalyticOrderGraphs(sellerID, data));
      dispatch(getTotalOrder(sellerID, data));
      dispatch(getTotalInventory(sellerID, data, 1));
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
          setDeliveryOption(4);
          setAppName();
        }}
      />
    ),
    ['TotalProductSold']: <TotalProductSold sellerID={sellerID} data={data} />,
    ['TotalOrders']: (
      <TotalOrders
        onPressReview={(item) => {
          setWeeklyTrasaction(true);
          setDate(item);
          setAppName();
          setDeliveryOption();
        }}
      />
    ),
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
                      borderColor: selectedStartDate ? COLORS.navy_blue : COLORS.white,
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
                    ArrowDownIconComponent={() => (
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
                      color: COLORS.navy_blue,
                      fontFamily: Fonts.Regular,
                      fontSize: ms(8),
                    }}
                    zIndex={2000}
                    zIndexInverse={2000}
                    textStyle={{ color: COLORS.navy_blue }}
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
                <Spacer space={ms(10)} />
                <TouchableOpacity onPress={() => goBack()}>
                  <Image source={backIcon} style={styles.backImageStyle} />
                </TouchableOpacity>

                <Spacer space={ms(10)} />
                <TouchableOpacity
                  disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                  onPress={() => setselectedScreen('Revenue')}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'Revenue'
                          ? COLORS.sky_grey
                          : getPosUser?.user_roles?.length > 0
                          ? COLORS.mid_grey
                          : COLORS.white,
                    },
                  ]}
                >
                  <Image
                    source={revnue}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'Revenue'
                            ? COLORS.navy_blue
                            : getPosUser?.user_roles?.length > 0
                            ? COLORS.mid_grey
                            : COLORS.light_blue2,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={ms(2)} />

                <TouchableOpacity
                  disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                  onPress={() => setselectedScreen('TotalCost')}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalCost'
                          ? COLORS.sky_grey
                          : getPosUser?.user_roles?.length > 0
                          ? COLORS.mid_grey
                          : COLORS.white,
                    },
                  ]}
                >
                  <Image
                    source={totalCostIcon}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalCost'
                            ? COLORS.navy_blue
                            : getPosUser?.user_roles?.length > 0
                            ? COLORS.mid_grey
                            : COLORS.light_blue2,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={ms(2)} />
                <TouchableOpacity
                  disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalProfit'
                          ? COLORS.sky_grey
                          : getPosUser?.user_roles?.length > 0
                          ? COLORS.mid_grey
                          : COLORS.white,
                    },
                  ]}
                  onPress={() => setselectedScreen('TotalProfit')}
                >
                  <Image
                    source={profitIcon}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalProfit'
                            ? COLORS.navy_blue
                            : getPosUser?.user_roles?.length > 0
                            ? COLORS.mid_grey
                            : COLORS.light_blue2,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={ms(2)} />
                <TouchableOpacity
                  onPress={() => setselectedScreen('TotalPosOrder')}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalPosOrder' ? COLORS.sky_grey : COLORS.white,
                    },
                  ]}
                >
                  <Image
                    source={posOrders}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalPosOrder'
                            ? COLORS.navy_blue
                            : COLORS.light_blue2,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={ms(2)} />
                <TouchableOpacity
                  onPress={() => setselectedScreen('TotalDeliveryOrders')}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalDeliveryOrders' ? COLORS.sky_grey : COLORS.white,
                    },
                  ]}
                >
                  <Image
                    source={deliveryIcon}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalDeliveryOrders'
                            ? COLORS.navy_blue
                            : COLORS.light_blue2,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={ms(2)} />

                <TouchableOpacity
                  onPress={() => setselectedScreen('TotalShippingOrders')}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalShippingOrders' ? COLORS.sky_grey : COLORS.white,
                    },
                  ]}
                >
                  <Image
                    source={shippingIcon}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalShippingOrders'
                            ? COLORS.navy_blue
                            : COLORS.light_blue2,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={ms(2)} />

                <TouchableOpacity
                  onPress={() => setselectedScreen('TotalOrders')}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalOrders' ? COLORS.sky_grey : COLORS.white,
                    },
                  ]}
                >
                  <Image
                    source={totalOrder}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalOrders' ? COLORS.navy_blue : COLORS.light_blue2,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={ms(2)} />

                <TouchableOpacity
                  onPress={() => setselectedScreen('TotalInventory')}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalInventory' ? COLORS.sky_grey : COLORS.white,
                    },
                  ]}
                >
                  <Image
                    source={inventory}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalInventory'
                            ? COLORS.navy_blue
                            : COLORS.light_blue2,
                      },
                    ]}
                  />
                </TouchableOpacity>

                <Spacer space={ms(2)} />
                <TouchableOpacity
                  onPress={() => setselectedScreen('TotalProductSold')}
                  style={[
                    styles.bucketBackgorund,
                    {
                      backgroundColor:
                        selectedScreen === 'TotalProductSold' ? COLORS.sky_grey : COLORS.white,
                    },
                  ]}
                >
                  <Image
                    source={soldProduct}
                    style={[
                      styles.sideBarImage,
                      {
                        tintColor:
                          selectedScreen === 'TotalProductSold'
                            ? COLORS.navy_blue
                            : COLORS.light_blue2,
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
