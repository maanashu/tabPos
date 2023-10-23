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

  const totalCustomers = allCustomerObject?.onlineCustomers + allCustomerObject?.walkingCustomers;

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

  const closeHandler = () => {
    setInvoiceDetail(false);
    setUserProfile(true);
  };

  const onPresFun = (value) => {
    dispatch(getCustomer(value, sellerID));
  };

  useEffect(() => {
    dispatch(getArea());
    dispatch(getStoreLocation());
  }, []);

  useEffect(() => {
    if (isFocused) {
      dispatch(getCustomer(time, sellerID));
    }
  }, [isFocused]);

  const onSearchAppoinment = (searchText) => {
    if (searchText != '') {
      setSearchedCustomer([]);
    }
    const callback = (searchData) => {
      setSearchedCustomer(searchData?.data);
    };

    const data = {
      sellerID: sellerID,
      customerType: customerType,
      calenderDate: undefined,
      dayWisefilter: time,
      area: 'none',
      search: searchText,
    };

    dispatch(getUserOrder(data, callback));
  };
  const debouncedSearchAppointment = useCallback(debounce(onSearchAppoinment, 300), []);

  const newCustomerData = [
    {
      customertype: 'New Customers',
      count: allCustomerObject?.newCustomer ?? 0,
      img: newCustomer,
      id: '1',
      type: 'new_customers',
      cID: 2,
    },
    {
      customertype: 'Returning Customers',
      count: allCustomerObject?.returningCustomer ?? 0,
      img: returnCustomer,
      id: '2',
      type: 'returning_customers',
      cID: 3,
    },
    {
      customertype: 'Online Customers',
      count: allCustomerObject?.onlineCustomers ?? 0,
      img: onlineCutomer,
      id: '3',
      type: 'online_customers',
      cID: 4,
    },
    {
      customertype: 'Walking Customers',
      count: allCustomerObject?.walkingCustomers ?? 0,
      img: walkinCustomer,
      id: '4',
      type: 'walking_customers',
      cID: 5,
    },
  ];
  const onLoad = useSelector((state) => isLoadingSelector([TYPES.GET_ORDER_DATA], state));
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
        />
      );
    } else {
      return (
        <View>
          <View style={styles.headerMainView}>
            <View style={styles.deliveryView}>
              <Image source={users} style={[styles.truckStyle, { marginLeft: 10 }]} />
              <Text style={styles.deliveryText}>{strings.customers.users}</Text>
            </View>
            <View style={styles.deliveryView}>
              <TouchableOpacity
                onPress={() =>
                  navigate(NAVIGATION.notificationsList, { screen: NAVIGATION.customers2 })
                }
              >
                <Image source={bell} style={[styles.truckStyle, { right: 20 }]} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.searchView}
                onPress={() => {
                  setShowSearchModal(true);
                  setSearchedCustomer([]);
                  setSearchedText('');
                }}
              >
                <Image source={search_light} style={styles.searchImage} />
                <View
                  style={{
                    height: SH(40),
                    width: SW(70),
                    paddingLeft: 5,
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{ color: COLORS.darkGray, fontSize: ms(10), fontFamily: Fonts.Regular }}
                  >
                    {strings.deliveryOrders.search}
                  </Text>
                </View>
                {/* <TextInput
                  placeholder={strings.deliveryOrders.search}
                  style={styles.textInputStyles}
                  placeholderTextColor={COLORS.darkGray}
                /> */}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.homeBodyCon}>
            <View style={styles.totalCustomerCon}>
              <Text style={styles.totalCustomerFirst}>Total Customers</Text>
              <View>
                <DaySelector
                  onPresFun={onPresFun}
                  selectId={selectId}
                  setSelectId={setSelectId}
                  setSelectTime={setSelectTime}
                />
              </View>
            </View>

            <View>
              <FlatList
                data={newCustomerData}
                extraData={newCustomerData}
                renderItem={({ item, index }) => {
                  return (
                    <View style={[styles.custometrCon, styles.flexAlignNew]}>
                      <TouchableOpacity
                        onPress={() => onViewUser(item.cID, item.type, item?.count)}
                        style={styles.flexAlign}
                      >
                        <Image source={item.img} style={styles.newCustomer} />
                        <View style={{ paddingHorizontal: moderateScale(7) }}>
                          <Text style={styles.customerCount}>{item.count}</Text>
                          <Text style={styles.newCustomerHeading}>{item.customertype}</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={(item) => item.id}
                horizontal
                contentContainerStyle={styles.contentContainerStyle}
                scrollEnabled={false}
              />
            </View>

            <View style={[styles.displayFlex, { marginTop: ms(10) }]}>
              <View>
                <Text style={styles.totalCusPrimary}>{strings.customers.totalCustomer}</Text>
                <Text style={styles.totalCustomer}>{totalCustomers ?? '0'}</Text>
              </View>
              <TouchableOpacity
                style={styles.viewButtonCon}
                onPress={() => onViewUser(1, 'all_customers')}
              >
                <Text style={styles.viewAll}>{strings.reward.viewAll}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Graph graphDetail={getCustomerStatitics?.graphData} />
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <ScreenWrapper>
      <View
        style={allUsers || userProfile || userDetails ? styles.containerWhite : styles.container}
      >
        {bodyView()}
      </View>
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
            <View style={[styles.searchView, { marginVertical: ms(10) }]}>
              <Image source={search_light} style={styles.searchImage} />
              <TextInput
                placeholder={strings.deliveryOrders.search}
                style={styles.textInputStyle}
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
              profileClickHandler={(item, customerId, customerTypes) => {
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
    </ScreenWrapper>
  );
}
