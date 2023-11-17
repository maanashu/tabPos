import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import { ms } from 'react-native-size-matters';
import { getCustomers } from '@/selectors/CustomersSelector';
import { filter, newCustomer, onlineCutomer, returnCustomer, walkinCustomer } from '@/assets';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDummy } from '@/constants/flatListData';
import { Header, ScreenWrapper, Search } from '@mPOS/components';
import Toast from 'react-native-toast-message';
import Graph from './Components/Graph';
import { strings } from '@/localization';
import { getCustomer } from '@/actions/CustomersAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '@/theme';
import { Dimensions } from 'react-native';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';

export function Customers() {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getCustomerData = useSelector(getCustomers);
  const getCustomerStatitics = getCustomerData?.getCustomers;
  const allCustomerObject = getCustomerStatitics?.total_customers ?? getCustomerDummy;
  const totalCustomers = allCustomerObject?.totalCustomer;
  const getAuth = useSelector(getAuthData);

  const [filterVal, setFilterVal] = useState('week');
  const [allUsers, setAllUsers] = useState(false);
  const [saveCustomerId, setSaveCustomerId] = useState();
  const [saveCustomeType, setSaveCustomerType] = useState();
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;

  useEffect(() => {
    if (isFocused) {
      dispatch(getCustomer(filterVal, sellerID));
    }
  }, [filterVal]);

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
      customertype: 'Walkin Customers',
      count: allCustomerObject?.walkingCustomers ?? 0,
      img: walkinCustomer,
      id: '4',
      type: 'walkin_customers',
      cID: 5,
    },
  ];

  const onViewUser = (id, type, count) => {
    if (count == 0) {
      Toast.show({
        text2: 'Customer Not Found',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 1500,
      });
    } else {
      commonNavigate(MPOS_NAVIGATION.customerList);
    }
  };

  return (
    <ScreenWrapper>
      <Header
        title={'Total Customers'}
        filter
        onValueChange={(item) => {
          setFilterVal(item);
        }}
      />
      <View style={{ height: Dimensions.get('window').height * 0.45 }}>
        <FlatList
          data={newCustomerData}
          extraData={newCustomerData}
          style={styles.headerContainer}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => onViewUser(item.cID, item.type, item?.count)}
                style={styles.subContainer}
              >
                <Image source={item.img} style={styles.imageStyle} />
                <View style={{ marginHorizontal: ms(10) }}>
                  <Text style={styles.text2}>{item.count}</Text>
                  <Text style={styles.text}>{item.customertype}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View
        style={{
          marginHorizontal: ms(10),
          backgroundColor: COLORS.white,
          borderRadius: ms(10),
          padding: ms(10),
          marginBottom: ms(10),
        }}
      >
        <Text style={styles.totalCusPrimary}>{strings.customers.totalCustomer}</Text>
        <View style={[styles.displayFlex, { alignItems: 'center' }]}>
          <Text style={styles.totalCustomer}>{totalCustomers ?? '0'}</Text>
          <TouchableOpacity
            style={styles.viewButtonCon}
            onPress={() => onViewUser(1, 'all_customers')}
          >
            <Text style={styles.viewAll}>{strings.reward.viewAll}</Text>
          </TouchableOpacity>
        </View>
        <Graph graphDetail={getCustomerStatitics?.graphData} />
      </View>
    </ScreenWrapper>
  );
}
