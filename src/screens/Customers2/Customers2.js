import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '@/theme';
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
} from '@/assets';
import { DaySelector, InvoiceDetail, ScreenWrapper } from '@/components';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import { getCustomer, getOrderUser } from '@/actions/CustomersAction';
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

export function Customers2() {
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCustomerData = useSelector(getCustomers);
  const getCustomerStatitics = getCustomerData?.getCustomers;
  const allCustomerObject = getCustomerStatitics?.total_customers ?? {};
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const values =
    getCustomerStatitics === undefined
      ? Object.values(getCustomerDummy)
      : Object.values(allCustomerObject);
  const totalCustomer = values?.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

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

  const closeHandler = () => {
    setInvoiceDetail(false);
    setUserProfile(true);
  };

  const onPresFun = (value) => {
    dispatch(getCustomer(value, sellerID));
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getCustomer(time, sellerID));
    }
  }, [isFocused]);

  const newCustomerData = [
    {
      customertype: 'New Customers',
      count: allCustomerObject?.newCustomer ?? 0,
      img: newCustomer,
      id: '1',
    },
    {
      customertype: 'Returning Customers',
      count: allCustomerObject?.returningCustomer ?? 0,
      img: returnCustomer,
      id: '2',
    },
    {
      customertype: 'Online Customers',
      count: allCustomerObject?.onlineCustomers ?? 0,
      img: onlineCutomer,
      id: '3',
    },
    {
      customertype: 'Walking Customers',
      count: allCustomerObject?.walkingCustomers ?? 0,
      img: walkinCustomer,
      id: '4',
    },
  ];
  const onLoad = useSelector((state) => isLoadingSelector([TYPES.GET_ORDER_DATA], state));

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
              <TouchableOpacity>
                <Image source={bell} style={[styles.truckStyle, { right: 20 }]} />
              </TouchableOpacity>
              <View style={styles.searchView}>
                <Image source={search_light} style={styles.searchImage} />
                <TextInput
                  placeholder={strings.deliveryOrders.search}
                  style={styles.textInputStyles}
                  placeholderTextColor={COLORS.darkGray}
                />
              </View>
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
                    <View style={styles.custometrCon}>
                      <View style={styles.flexAlign}>
                        <Image source={item.img} style={styles.newCustomer} />
                        <View style={{ paddingHorizontal: moderateScale(7) }}>
                          <Text style={styles.customerCount}>{item.count}</Text>
                          <Text style={styles.newCustomerHeading}>{item.customertype}</Text>
                        </View>
                      </View>
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
                <Text style={styles.totalCustomer}>{totalCustomer ?? '0'}</Text>
              </View>
              <TouchableOpacity style={styles.viewButtonCon} onPress={() => setAllUsers(true)}>
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
    </ScreenWrapper>
  );
}
