import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { COLORS, SH, SW } from '@/theme';
import { styles } from '@/screens/Customers2/Customers2.styles';
import { getCustomerDummy } from '@/constants/flatListData';
import { strings } from '@/localization';
import {
  bell,
  search_light,
  users,
  newCustomer,
  returnCustomer,
  onlineCutomer,
  walkinCustomer,
  Fonts,
  crossButton,
  bellDrawer,
  searchDrawer,
  incomingOrders,
  blankCheckBox,
  onlinecustomer,
  returnedOrders,
  newCalendar,
  scanNew,
  mark,
  newCheck,
  newUsers,
  newCustomerUser,
  newReturningCustomer,
  onlineUser,
  newWalkingCustomer,
  calendarDrawer,
} from '@/assets';
import { DaySelector, InvoiceDetail, ScreenWrapper } from '@/components';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import {
  getArea,
  getCustomer,
  getOrderUser,
  getStoreLocation,
  getUserOrder,
  searchCustomer,
} from '@/actions/CustomersAction';
import { getCustomers } from '@/selectors/CustomersSelector';
import Graph from './Components/Graph';
import AllUsers from './Components/AllUsers';
import UserProfile from './Components/UserProfile';
import { useRef } from 'react';
import { getOrderData } from '@/actions/AnalyticsAction';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AnalyticsTypes';
import UserDetail from './Components/UserDetail';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import Modal from 'react-native-modal';
import CustomerListView from './Components/CustomerListView';
import { debounce } from 'lodash';
import { Spacer } from '@mPOS/components';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import moment from 'moment';

export function Customers2() {
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCustomerData = useSelector(getCustomers);
  const getCustomerStatitics = getCustomerData?.getCustomers;
  const allCustomerObject = getCustomerStatitics?.total_customers ?? getCustomerDummy;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const values =
    getCustomerStatitics === undefined
      ? Object.values(getCustomerDummy)
      : Object.values(allCustomerObject);
  const totalCustomer = values?.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const totalCustomers = allCustomerObject?.totalCustomer;

  const [allUsers, setAllUsers] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [userData, setUserData] = useState();
  const [invoiceDetail, setInvoiceDetail] = useState(false);
  const [saveCustomerId, setSaveCustomerId] = useState();
  const [saveCustomeType, setSaveCustomerType] = useState();
  const [selectId, setSelectId] = useState(2);
  const [selectTime, setSelectTime] = useState({ value: 'week' });
  const time = selectTime?.value;
  const [orderId, setOrderId] = useState();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [searchedAppointments, setSearchedCustomer] = useState([]);
  const [customerType, setCustomerType] = useState(
    saveCustomeType === undefined ? 'all_customers' : saveCustomeType
  );
  const [newCustomerCheck, setNewCustomerCheck] = useState(true);
  const [onlineCustomerCheck, setOnlineCustomerCheck] = useState(true);
  const [walkCustomerCheck, setWalkCustomerCheck] = useState(true);

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const startDated = moment(startDate).format('YYYY-MM-DD');
  const endDated = moment(endDate).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState('');
  const maxDate = new Date(2030, 6, 3);

  const closeHandler = () => {
    setInvoiceDetail(false);
    setUserProfile(true);
  };
  const filterHandler = () => {
    if (time === undefined) {
      return {
        start_date: startDated,
        end_date: endDated,
      };
    } else {
      return {
        filter: time,
      };
    }
  };

  const data = filterHandler();

  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(getCustomer(data, sellerID));
  //   }, [selectTime, selectDate])
  // );

  const onPresFun = (value) => {
    setSelectedStartDate('');
    setSelectedEndDate('');
  };

  useEffect(() => {
    dispatch(getArea());
    dispatch(getStoreLocation());
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(getCustomer(data, sellerID));
    }
  }, [isFocused, selectTime, selectDate]);

  const onSearchAppoinment = (searchText) => {
    if (searchText != '') {
      setSearchedCustomer([]);
    }
    const callback = (searchData) => {
      setSearchedCustomer(searchData?.data);
    };

    const data = {
      sellerID: sellerID,
      customerType: 'all_customers',
      calenderDate: undefined,
      dayWisefilter: time,
      area: 'none',
      search: searchText,
    };

    dispatch(searchCustomer(data, callback));
  };
  const debouncedSearchAppointment = useCallback(debounce(onSearchAppoinment, 300), [time]);

  const newCustomerData = [
    {
      customertype: 'New Customers',
      count: allCustomerObject?.newCustomer ?? 0,
      img: newCustomerUser,
      id: '1',
      type: 'new_customers',
      cID: 2,
      backgroundColor: COLORS.cream_yellow,
      color: COLORS.redish_brown,
    },
    {
      customertype: 'Returning Customers',
      count: allCustomerObject?.returningCustomer ?? 0,
      img: newReturningCustomer,
      id: '2',
      type: 'returning_customers',
      cID: 3,
      backgroundColor: COLORS.light_purple,
      color: COLORS.navy_blue,
    },
    {
      customertype: 'Online Customers',
      count: allCustomerObject?.onlineCustomers ?? 0,
      img: onlineUser,
      id: '3',
      type: 'online_customers',
      cID: 4,
      backgroundColor: COLORS.light_green,
      color: COLORS.medium_green,
    },
    {
      customertype: 'Walkin Customers',
      count: allCustomerObject?.walkingCustomers ?? 0,
      img: newWalkingCustomer,
      id: '4',
      type: 'walkin_customers',
      cID: 5,
      backgroundColor: COLORS.light_skyblue,
      color: COLORS.torquoise,
    },
  ];

  const onLoad = useSelector((state) => isLoadingSelector([TYPES.GET_ORDER_DATA], state));

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
      setSelectTime('');
      setSelectId('');
      setSelectDate(!selectDate);
    } else {
      alert('Please Select End Date');
    }
  };

  const onViewUser = (id, type, count) => {
    if (count == 0) {
      Toast.show({
        text2: 'Customer Not Found',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      setSaveCustomerId(id);
      setSaveCustomerType(type);
      setAllUsers(true);
    }
  };

  const bodyView = () => {
    if (userDetails) {
      return (
        <UserDetail
          orderId={orderId}
          backHandler={() => {
            setUserDetails(false);
            setUserProfile(true);
          }}
          userDetail={userData}
          // orderClickHandler={async (item) => {
          //   const res = await dispatch(getOrderData(item?.id));
          //   if (res?.type === 'GET_ORDER_DATA_SUCCESS') {
          //     if (item?.delivery_option == 3) {
          //       alert('hiiiiiiiiiiiii');
          //     } else {
          //       setUserProfile(false);
          //       setInvoiceDetail(true);
          //     }
          //   } else {
          //     Toast.show({
          //       text2: 'Something went wrong',
          //       position: 'bottom',
          //       type: 'error_toast',
          //       visibilityTime: 1500,
          //     });
          //   }
          // }}
        />
      );
    } else if (invoiceDetail) {
      return (
        <InvoiceDetail
          {...{
            mapRef,
            closeHandler,
          }}
        />
      );
    } else if (userProfile) {
      return (
        <UserProfile
          pointHandler={() => {
            setUserProfile(false);
            setUserDetails(true);
          }}
          backHandler={() => {
            setUserProfile(false);
            setAllUsers(true);
          }}
          userDetail={userData}
          orderClickHandler={async (item) => {
            const res = await dispatch(getOrderData(item?.id));
            if (res?.type === 'GET_ORDER_DATA_SUCCESS') {
              setUserProfile(false);
              setInvoiceDetail(true);
            } else {
              Toast.show({
                text2: 'Something went wrong',
                position: 'bottom',
                type: 'error_toast',
                visibilityTime: 1500,
              });
            }
          }}

          // orderClickHandler={async (item) => {
          //   if (item?.delivery_option == 3 || item?.delivery_option == 2) {
          //     setUserProfile(false);
          //     setUserDetails(true);
          //     setOrderId(item?.id);
          //   } else {
          //     const res = await dispatch(getOrderData(item?.id));
          //     if (res?.type === 'GET_ORDER_DATA_SUCCESS') {
          //       setUserProfile(false);
          //       setInvoiceDetail(true);
          //     } else {
          //       Toast.show({
          //         text2: 'Something went wrong',
          //         position: 'bottom',
          //         type: 'error_toast',
          //         visibilityTime: 1500,
          //       });
          //     }
          //   }
          // }}
        />
      );
    } else if (allUsers) {
      return (
        <AllUsers
          saveCustomerId={saveCustomerId}
          saveCustomeType={saveCustomeType}
          backHandler={() => setAllUsers(false)}
          profileClickHandler={(item, customerId, customerTypes) => {
            setSaveCustomerId(customerId);
            setSaveCustomerType(customerTypes);
            setAllUsers(false);
            setUserProfile(true);
            setUserData(item);
            // dispatch(getOrderUser(item?.user_id, sellerID));
          }}
          setSaveCustomerId={setSaveCustomerId}
          setSaveCustomerType={setSaveCustomerType}
          setAllUsers={setAllUsers}
          setUserProfile={setUserProfile}
          setUserData={setUserData}
        />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.headerMainView}>
            <View style={styles.deliveryView}>
              <Image source={newUsers} style={[styles.userStyle]} />
              <Text style={styles.deliveryText}>{'Total Customers'}</Text>
            </View>
            <View style={styles.deliveryView}>
              <DaySelector
                onPresFun={onPresFun}
                selectId={selectId}
                setSelectId={setSelectId}
                setSelectTime={setSelectTime}
              />

              <TouchableOpacity
                onPress={() => setShowCalendarModal(!showCalendarModal)}
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
                  navigate(NAVIGATION.notificationsList, { screen: NAVIGATION.customers2 })
                }
                style={{ marginHorizontal: ms(5) }}
              >
                <Image source={bellDrawer} style={styles.truckStyle} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchView}
                onPress={() => {
                  setShowSearchModal(true);
                  setSearchedCustomer([]);
                  setSearchedText('');
                }}
              >
                <Image source={searchDrawer} style={styles.searchImage} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.searchView, { marginLeft: ms(10) }]}
                onPress={() => {
                  setShowSearchModal(true);
                  setSearchedCustomer([]);
                  setSearchedText('');
                }}
              >
                <Image source={scanNew} style={styles.searchImage} />
              </TouchableOpacity>
            </View>
          </View>

          <Text
            style={{
              fontSize: ms(9),
              color: COLORS.navy_light_blue,
              position: 'absolute',
              top: ms(35),
              left: ms(35),
            }}
          >
            {'All the following data is gathered weekly.'}
          </Text>

          <View style={styles.homeBodyCon}>
            <View>
              <FlatList
                data={newCustomerData}
                extraData={newCustomerData}
                renderItem={({ item, index }) => {
                  return (
                    <View style={[styles.custometrCon, { backgroundColor: item.backgroundColor }]}>
                      <TouchableOpacity
                        onPress={() => onViewUser(item.cID, item.type, item?.count)}
                        style={{ alignItems: 'flex-start' }}
                      >
                        <Image
                          source={item.img}
                          style={[styles.newCustomer, { tintColor: item?.color }]}
                        />

                        <Text style={[styles.customerCount, { color: item?.color }]}>
                          {item.count}
                        </Text>
                        <Text style={[styles.newCustomerHeading, { color: item?.color }]}>
                          {item.customertype}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
                horizontal
                scrollEnabled={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainerStyle}
              />
            </View>

            <View style={[styles.flexAlign, { marginTop: ms(10) }]}>
              <Text style={styles.totalCusPrimary}>{strings.customers.totalCustomer}</Text>
              <Text style={styles.totalCustomer}>{totalCustomers ?? '0'}</Text>
              <TouchableOpacity
                style={styles.viewButtonCon}
                onPress={() => onViewUser(1, 'all_customers')}
              >
                <Text style={styles.viewAll}>{strings.reward.viewAll}</Text>
              </TouchableOpacity>
              <View style={styles.flexRow}>
                <TouchableOpacity
                  style={styles.checkboxViewStyle}
                  onPress={() => setNewCustomerCheck((prev) => !prev)}
                >
                  <View
                    style={[
                      styles.imageView,
                      { borderColor: COLORS.medium_yellow, backgroundColor: COLORS.light_yellow },
                    ]}
                  >
                    <Image
                      source={newCustomerCheck ? newCheck : blankCheckBox}
                      style={[
                        styles.checkboxIconStyle,
                        { tintColor: newCustomerCheck ? COLORS.yellow : COLORS.transparent },
                      ]}
                    />
                  </View>
                  <Text style={[styles.varientTextStyle, { color: COLORS.yellow }]}>
                    New Customers
                  </Text>
                  {/* returnedOrders */}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.checkboxViewStyle}
                  onPress={() => setOnlineCustomerCheck((prev) => !prev)}
                >
                  <View style={styles.imageView}>
                    <Image
                      source={onlineCustomerCheck ? newCheck : blankCheckBox}
                      style={[
                        styles.checkboxIconStyle,
                        {
                          tintColor: onlineCustomerCheck ? COLORS.medium_green : COLORS.transparent,
                        },
                      ]}
                    />
                  </View>
                  <Text style={[styles.varientTextStyle, { color: COLORS.medium_green }]}>
                    Online Customers
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.checkboxViewStyle, { marginRight: 0 }]}
                  onPress={() => setWalkCustomerCheck((prev) => !prev)}
                >
                  <View
                    style={[
                      styles.imageView,
                      { borderColor: COLORS.aqua, backgroundColor: COLORS.light_sky },
                    ]}
                  >
                    <Image
                      source={walkCustomerCheck ? newCheck : blankCheckBox}
                      style={[
                        styles.checkboxIconStyle,
                        { tintColor: walkCustomerCheck ? COLORS.aqua : COLORS.transparent },
                      ]}
                    />
                  </View>
                  <Text style={[styles.varientTextStyle, { color: COLORS.aqua }]}>
                    Wallking customer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Graph
              graphDetail={getCustomerStatitics?.graphData}
              newCustomerCheck={newCustomerCheck}
              walkCustomerCheck={walkCustomerCheck}
              onlineCustomerCheck={onlineCustomerCheck}
            />
          </View>
        </View>
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
      <Modal isVisible={showSearchModal}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <View
            style={{
              marginHorizontal: ms(40),
              marginVertical: ms(40),
              backgroundColor: 'white',
              borderRadius: ms(5),
              paddingHorizontal: ms(20),
              paddingVertical: ms(20),
              minHeight: '70%',
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
                  debouncedSearchAppointment(searchText);
                }}
              />
            </View>
            <CustomerListView
              searchedAppointments={searchedAppointments}
              profileHandler={(item, customerId, customerTypes) => {
                setSaveCustomerId(customerId);
                setSaveCustomerType(customerTypes);
                setAllUsers(true);
                setUserProfile(true);
                setUserData(item);
                setShowSearchModal(false);
                // dispatch(getOrderUser(item?.user_id, sellerID));
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {onLoad ? (
        <View style={[styles.loader, { backgroundColor: 'rgba(0,0,0, 0.3)' }]}>
          <ActivityIndicator color={COLORS.navy_blue} size="large" style={styles.loader} />
        </View>
      ) : null}
      <Modal
        isVisible={showCalendarModal}
        statusBarTranslucent
        animationIn={'fadeIn'}
        animationInTiming={600}
        animationOutTiming={300}
        onBackdropPress={() => setShowCalendarModal(false)}
      >
        <View style={styles.calendarModalView}>
          <CalendarPickerModal
            onPress={() => setShowCalendarModal(false)}
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
              setShowCalendarModal(false);
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
