import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS, SH, SW, SF } from '@/theme';
import { styles } from '@/screens/Customers2/Customers2.styles';
import { getCustomerDummy, newCustomerData, newCustomerDataLoader } from '@/constants/flatListData';
import { strings } from '@/localization';
import {
  bell,
  notifications,
  search_light,
  leftBack,
  location,
  crossButton,
  ticket,
  box,
  dropRight,
  users,
  Fonts,
  willis,
  deliverCheck,
  track,
  angela2,
  contact,
  userImage,
  newCustomer,
  returnCustomer,
  onlineCutomer,
  blueLocation,
  shop_light,
  greyRadioArr,
  radioArrBlue,
  cusBarClr,
  customersGraph,
  storeTracker,
  locationTracker,
  walkinCustomer,
} from '@/assets';
import { BarChartCom, DaySelector, ScreenWrapper, Spacer } from '@/components';
import { moderateScale, ms, verticalScale } from 'react-native-size-matters';
import { UserProfile, UserDetails, Users } from '@/screens/Customers/Components';
import { Table } from 'react-native-table-component';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { useEffect } from 'react';
import { getCustomer, getOrderUser, getUserOrder } from '@/actions/CustomersAction';
import { getCustomers } from '@/selectors/CustomersSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/CustomersTypes';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import moment from 'moment';
import { getAnalytics } from '@/selectors/AnalyticsSelector';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { DELIVERY_MODE } from '@/constants/enums';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import Graph from './Components/Graph';
import AllUsers from './Components/AllUsers';

moment.suppressDeprecationWarnings = true;

export function Customers2() {
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
    if (allUsers) {
      return <AllUsers backHandler={() => setAllUsers(false)} />;
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
      <View style={allUsers ? styles.containerWhite : styles.container}>{bodyView()}</View>
    </ScreenWrapper>
  );
}
