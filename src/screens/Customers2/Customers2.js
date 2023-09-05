import React, { useState } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
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
import { InvoiceDetail, ScreenWrapper } from '@/components';
import { moderateScale, ms } from 'react-native-size-matters';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import { getCustomer, getOrderUser } from '@/actions/CustomersAction';
import { getCustomers } from '@/selectors/CustomersSelector';
import moment from 'moment';
import Graph from './Components/Graph';
import AllUsers from './Components/AllUsers';
import UserProfile from './Components/UserProfile';
import { useRef } from 'react';
import { getOrderData } from '@/actions/AnalyticsAction';

moment.suppressDeprecationWarnings = true;

export function Customers2() {
  const mapRef = useRef(null);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCustomerData = useSelector(getCustomers);
  const getCustomerStatitics = getCustomerData?.getCustomers;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const values =
    getCustomerStatitics === undefined
      ? Object.values(getCustomerDummy)
      : Object.values(getCustomerStatitics);
  const totalCustomer = values?.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const [allUsers, setAllUsers] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [userData, setUserData] = useState();
  const [invoiceDetail, setInvoiceDetail] = useState(false);
  const [trackingView, setTrackingView] = useState(false);
  const [openShippingOrders, setOpenShippingOrders] = useState('0');

  const location = getAuth?.merchantLoginData?.user?.user_profiles?.current_address;
  const singleOrderDetail = [];

  const closeHandler = () => {
    setInvoiceDetail(false);
    setUserProfile(true);
  };

  const sourceCoordinate = {
    latitude: 30.67995,
    longitude: 76.72211,
  };
  const latitude = parseFloat(0.0);
  const longitude = parseFloat(0.0);
  const destinationCoordinate = {
    latitude: 0.0,
    longitude: 0.0,
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getCustomer(sellerID));
    }
  }, [isFocused]);

  const newCustomerData = [
    {
      customertype: 'New Customers',
      count: getCustomerStatitics?.new_customers_count ?? 0,
      img: newCustomer,
      id: '1',
    },
    {
      customertype: 'Returning Customers',
      count: getCustomerStatitics?.returning_customers_count ?? 0,
      img: returnCustomer,
      id: '2',
    },
    {
      customertype: 'Online Customers',
      count: getCustomerStatitics?.online_customers_count ?? 0,
      img: onlineCutomer,
      id: '3',
    },
    {
      customertype: 'Walking Customers',
      count: getCustomerStatitics?.shipping_customers_count ?? 0,
      img: walkinCustomer,
      id: '4',
    },
  ];

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
    } else if (userProfile) {
      return (
        <UserProfile
          backHandler={() => {
            setUserProfile(false);
            setAllUsers(true);
          }}
          userDetail={userData}
          orderClickHandler={(item) => {
            setUserProfile(false);
            setInvoiceDetail(true);
            dispatch(getOrderData(item));
          }}
        />
      );
    } else if (allUsers) {
      return (
        <AllUsers
          backHandler={() => setAllUsers(false)}
          profileClickHandler={(item) => {
            setAllUsers(false);
            setUserProfile(true);
            setUserData(item);
            dispatch(getOrderUser(item?.user_id, sellerID));
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
              <Graph />
            </View>
          </View>
        </View>
      );
    }
  };
  return (
    <ScreenWrapper>
      <View style={allUsers || userProfile ? styles.containerWhite : styles.container}>
        {bodyView()}
      </View>
    </ScreenWrapper>
  );
}
