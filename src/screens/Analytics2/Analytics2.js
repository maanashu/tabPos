import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, Text, Platform, Dimensions } from 'react-native';

import { DaySelector, ScreenWrapper, Spacer } from '@/components';

import { styles } from './Analytics2.styles';
import { MainScreen } from './Components/MainScreen';
import { TotalProfit } from './Components/TotalProfit';
import {
  analyticsReport,
  profit,
  revenueTotal,
  totalSales,
  channel,
  averageOrder,
  productSelling,
  locationSales,
  totalCost,
  totalOrders,
  filterday,
  crossButton,
  cross,
  calendar,
  dropdown,
  Fonts,
} from '@/assets';
import Modal from 'react-native-modal';
import { COLORS, SF, SH, SW } from '@/theme';
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
import CalendarPicker from 'react-native-calendar-picker';
import CalendarPickerModal from './Components/CalendarPicker';
import moment from 'moment';
import { useCallback } from 'react';

export function Analytics2() {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [selectedScreen, setselectedScreen] = useState('MainScreen');
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({ value: 'week' });
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [channels, setChannels] = useState(false);
  const [channelValue, setChannelValue] = useState(null);
  const [channelItem, setChannelItem] = useState([
    { label: 'B2B', value: 'B2B' },
    { label: 'POS', value: 'POS' },
    { label: 'B2C', value: 'B2C' },
  ]);
  const [orderSelectId, setOrderSelectId] = useState(2);
  const [backTime, setBackTime] = useState();

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
  const handleOnPressNext = () => {
    // Perform actions when "Next" button is pressed
    console.log('Next button pressed');
  };
  const getSelectedData = () => {
    if (filter?.value === 'undefined') {
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
  const data = getSelectedData();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAnalyticStatistics(sellerID, data));
    dispatch(getAnalyticOrderGraphs(sellerID, data));
    dispatch(getTotalOrder(sellerID, data));
    dispatch(getTotalInventory(sellerID, data));
    dispatch(getSoldProduct(sellerID, data));
    getData();
  }, [filter]);

  const orderOnPress = (value) => {
    dispatch(getAnalyticStatistics(sellerID, value));
    dispatch(getAnalyticOrderGraphs(sellerID, value));
    dispatch(getTotalOrder(sellerID, value));
    dispatch(getTotalInventory(sellerID, value));
    dispatch(getSoldProduct(sellerID, value));
    storeData(value);
  };

  const onDateChange = (date, type) => {
    const Date = moment(date).format('YYYY-MM-DD');
    if (type === 'END_DATE') {
      setSelectedEndDate(Date);
    } else {
      setSelectedStartDate(Date);
      setSelectedEndDate(null);
    }
  };
  const onSelect = () => {
    const body = {
      start_date: startDate,
      end_date: endDated,
    };
    dispatch(getAnalyticStatistics(sellerID, body));
    setShowCalendarModal(false);
    setFilter('');
    setOrderSelectId('');
  };

  const goBack = () => {
    setselectedScreen('MainScreen');
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
      />
    ),
    ['TotalProfit']: <TotalProfit onPress={goBack} />,
    ['Revenue']: <Revenue onPress={goBack} />,
    ['TotalCost']: <TotalCost onPress={goBack} />,
    ['TotalDeliveryOrders']: <TotalDeliveryOrders onPress={goBack} />,
    ['TotalShippingOrders']: <TotalShippingOrders onPress={goBack} />,
    ['TotalProductSold']: <TotalProductSold onPress={goBack} />,
    ['TotalOrders']: <TotalOrders onPress={goBack} />,
    ['TotalPosOrder']: <TotalPosOrder onPress={goBack} />,
    ['TotalInventory']: <TotalInventory onPress={goBack} />,
  };

  const screenChangeView = () => {
    return renderScreen[selectedScreen];
  };

  return (
    <ScreenWrapper>
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
            <View
              style={[
                styles.flexDirectionRow,
                {
                  position: 'absolute',
                  right: ms(0),
                  top: ms(10),
                  height: ms(20),
                  alignItems: 'center',
                },
              ]}
            >
              <TouchableOpacity
                onPress={() => setShowCalendarModal(!showCalendarModal)}
                style={[
                  styles.headerView,
                  { borderColor: selectedStartDate ? COLORS.primary : COLORS.gerySkies },
                ]}
              >
                <Image source={calendar} style={styles.calenderImage} />
                <Text style={styles.dateText}>
                  {startDate
                    ? moment(startDate).format('YYYY-MM-DD') +
                      ' - ' +
                      moment(endDate).format('YYYY-MM-DD')
                    : 'Date Select'}
                </Text>
              </TouchableOpacity>
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
              />
            </View>
          </View>
          <Spacer space={ms(5)} />

          <View style={styles.flexDirectionRow}>
            <View style={styles.container}>{screenChangeView()}</View>

            <View style={styles.rightSideView}>
              {/* <TouchableOpacity
                  style={styles.bucketBackgorund}
                  onPress={() => setShowModal(!showModal)}
                >
                  <Image source={analyticsReport} style={styles.sideBarImage} />
                </TouchableOpacity>
                <Spacer space={SH(25)} /> */}
              <Spacer space={SH(10)} />
              <TouchableOpacity
                disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalProfit'
                        ? COLORS.primary
                        : getPosUser?.user_roles?.length > 0
                        ? COLORS.mid_grey
                        : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalProfit')}
              >
                <Image
                  source={profit}
                  style={[
                    styles.sideBarImage,
                    { tintColor: selectedScreen === 'TotalProfit' ? COLORS.white : COLORS.black },
                  ]}
                />
              </TouchableOpacity>

              <Spacer space={SH(25)} />
              <TouchableOpacity
                disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'Revenue'
                        ? COLORS.primary
                        : getPosUser?.user_roles?.length > 0
                        ? COLORS.mid_grey
                        : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('Revenue')}
              >
                <Image
                  source={revenueTotal}
                  style={[
                    styles.sideBarImage,
                    { tintColor: selectedScreen === 'Revenue' ? COLORS.white : COLORS.black },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                disabled={getPosUser?.user_roles?.length > 0 ? true : false}
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalCost'
                        ? COLORS.primary
                        : getPosUser?.user_roles?.length > 0
                        ? COLORS.mid_grey
                        : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalCost')}
              >
                <Image
                  source={totalCost}
                  style={[
                    styles.sideBarImage,
                    { tintColor: selectedScreen === 'TotalCost' ? COLORS.white : COLORS.black },
                  ]}
                />
              </TouchableOpacity>

              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalPosOrder' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalPosOrder')}
              >
                <Image
                  source={channel}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor: selectedScreen === 'TotalPosOrder' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />

              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalDeliveryOrders' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalDeliveryOrders')}
              >
                <Image
                  source={averageOrder}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor:
                        selectedScreen === 'TotalDeliveryOrders' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalShippingOrders' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalShippingOrders')}
              >
                <Image
                  source={totalSales}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor:
                        selectedScreen === 'TotalShippingOrders' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalOrders' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalOrders')}
              >
                <Image
                  source={totalOrders}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor: selectedScreen === 'TotalOrders' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalInventory' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalInventory')}
              >
                <Image
                  source={locationSales}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor: selectedScreen === 'TotalInventory' ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
              <Spacer space={SH(25)} />
              <TouchableOpacity
                style={[
                  styles.bucketBackgorund,
                  {
                    backgroundColor:
                      selectedScreen === 'TotalProductSold' ? COLORS.primary : COLORS.white,
                  },
                ]}
                onPress={() => setselectedScreen('TotalProductSold')}
              >
                <Image
                  source={productSelling}
                  style={[
                    styles.sideBarImage,
                    {
                      tintColor:
                        selectedScreen === 'TotalProductSold' ? COLORS.white : COLORS.black,
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
          <View
            style={{
              backgroundColor: COLORS.white,
              width: windowWidth * 0.6,
              height: windowHeight - SW(30),
              alignSelf: 'center',
              paddingVertical: SH(10),
              paddingHorizontal: SW(5),
              borderRadius: SW(5),
            }}
          >
            <CalendarPickerModal
              onPress={() => setShowCalendarModal(false)}
              onDateChange={onDateChange}
              handleOnPressNext={handleOnPressNext}
              onSelectedDate={onSelect}
            />
          </View>
        </Modal>
        <Modal
          // isVisible={showModal}
          statusBarTranslucent
        >
          <View style={styles.modalView}>
            <View style={styles.flexAlign}>
              <Text style={styles.headerText}>{'Analytics Reports'}</Text>
              <TouchableOpacity style={styles.imageView} onPress={() => setShowModal(false)}>
                <Image source={analyticsReport} style={styles.headerImage} />
              </TouchableOpacity>
            </View>
            <Spacer space={SH(25)} />

            <View style={styles.flexAlign}>
              <Image source={profit} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Profit'}</Text>
              </View>
            </View>
            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={revenueTotal} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Revenue'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={totalSales} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Sales'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={channel} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Sales by Channel'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={averageOrder} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Average Order Value'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={productSelling} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Top Selling Products'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={locationSales} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Sales by Locations'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={totalOrders} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Orders'}</Text>
              </View>
            </View>

            <Spacer space={SH(15)} />

            <View style={styles.flexAlign}>
              <Image source={totalCost} style={styles.subImages} />
              <View style={styles.marginLeft4}>
                <Text style={styles.costText}>$ 2050</Text>
                <Text style={styles.subTitle}>{'Total Costs'}</Text>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={showFilterModal}
          statusBarTranslucent
          animationIn={'slideInRight'}
          animationInTiming={600}
          animationOutTiming={300}
        >
          <View style={styles.modalView}>
            <View style={[styles.flexAlign, { alignSelf: 'flex-end' }]}>
              {/* <Text style={styles.headerText}>{'Filter'}</Text> */}
              <TouchableOpacity style={styles.imageView} onPress={() => setShowFilterModal(false)}>
                <Image source={cross} style={styles.headerImage} />
              </TouchableOpacity>
            </View>
            <Spacer space={SH(20)} />
            <TouchableOpacity
              onPress={() => {
                setFilter('week');
                setShowFilterModal(false);
              }}
            >
              <Text
                style={{
                  fontSize: SF(20),
                  marginHorizontal: SW(5),
                  color: filter === 'week' ? COLORS.primary : COLORS.black,
                }}
              >
                {'Week'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('month');
                setShowFilterModal(false);
              }}
            >
              <Text
                style={{
                  fontSize: SF(20),
                  marginHorizontal: SW(5),
                  color: filter === 'month' ? COLORS.primary : COLORS.black,
                  marginVertical: SH(10),
                }}
              >
                {'Month'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setFilter('year');
                setShowFilterModal(false);
              }}
            >
              <Text
                style={{
                  fontSize: SF(20),
                  marginHorizontal: SW(5),
                  color: filter === 'year' ? COLORS.primary : COLORS.black,
                }}
              >
                {'Year'}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
}
