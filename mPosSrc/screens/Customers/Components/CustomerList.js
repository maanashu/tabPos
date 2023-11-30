import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import { ms } from 'react-native-size-matters';
import {
  bell,
  search_light,
  leftBack,
  calendar1,
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight,
  userImage,
  Fonts,
  crossButton,
  filter,
} from '@/assets';
import { Spacer } from '@/components';
import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import moment from 'moment';

import { Table } from 'react-native-table-component';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUserOrder, searchCustomer } from '@/actions/CustomersAction';
import { getCustomers } from '@/selectors/CustomersSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/CustomersTypes';
import { PAGINATION_DATA } from '@/constants/enums';
import Modal from 'react-native-modal';

import { debounce } from 'lodash';
import { useCallback } from 'react';
import { Header, ScreenWrapper } from '@mPOS/components';
import styles from './styles';
import { Images } from '@mPOS/assets';
import SearchList from './SearchList';
import { commonNavigate, MPOS_NAVIGATION } from '@common/commonImports';
import { height } from '@/theme/ScalerDimensions';

export function CustomerList(props) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCustomerData = useSelector(getCustomers);
  const areaData = getCustomerData?.getArea?.data;

  const [show, setShow] = useState(false);
  const customerArray = getCustomerData?.getUserOrder?.data ?? [];
  const payloadLength = Object.keys(getCustomerData?.getUserOrder)?.length ?? 0;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [dateformat, setDateformat] = useState('');
  const [date, setDate] = useState();
  const [formatedDate, setFormatedDate] = useState();
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(10);
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);
  const [page, setPage] = useState(1);
  const [ind, setInd] = useState();
  const [indexStart, setIndexStart] = useState();
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [dropdownSelect, setDropdownSelect] = useState('none');
  const onchangeValue = (value) => setDropdownSelect(value);
  const [selectId, setSelectId] = useState(2);
  const [selectTime, setSelectTime] = useState(props?.route?.params?.filter || 'week');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [searchedAppointments, setSearchedCustomer] = useState([]);
  const time = selectTime;
  const [filterVal, setFilterVal] = useState('week');
  const [saveCustomerId, setSaveCustomerId] = useState(props?.route?.params?.customer_id || '');
  const [saveCustomeType, setSaveCustomerType] = useState(
    props?.route?.params?.customer_type || ''
  );
  const [selectedId, setSelectedId] = useState(saveCustomerId === undefined ? 1 : saveCustomerId);
  const [customerType, setCustomerType] = useState(
    saveCustomeType === undefined ? 'all_customers' : saveCustomeType
  );
  const onPresFun = () => {
    setFormatedDate();
    setDate();
  };

  const areaSelector = [
    areaData?.map((item, index) => ({
      label: item?.state,
      value: item?.state,
    })),
  ];

  const getFormattedTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const maxDate = getFormattedTodayDate();

  const paginationData = {
    total: getCustomerData?.getUserOrder?.total ?? '0',
    totalPages: getCustomerData?.getUserOrder?.total_pages ?? '0',
    perPage: getCustomerData?.getUserOrder?.per_page ?? '0',
    currentPage: getCustomerData?.getUserOrder?.current_page ?? '0',
  };
  useEffect(() => {
    const data = {
      sellerID: sellerID,
      customerType: customerType,
      page: page,
      limit: paginationModalValue,
      dayWisefilter: time,
    };
    dispatch(getUserOrder(data));
  }, [time, selectedId, paginationModalValue, page]);

  const paginationInchandler = () => {
    setPage(page + 1);
    setInd(ind + 1);
  };

  const paginationDechandler = () => {
    setPage(page - 1);
    setInd(ind - 1);
  };
  const startIndex = (page - 1) * paginationModalValue + 1;
  const endIndex = page * paginationModalValue;

  const isCustomerLoad = useSelector((state) => isLoadingSelector([TYPES.GET_USER_ORDER], state));

  const onChangeDate = (selectedDate) => {
    setDefaultDate(selectedDate);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const fullDate = moment(selectedDate).format('MM/DD/YYYY');
    setDateformat(formattedDate);
    setDate(formattedDate);
  };

  const dummyCustomerData = [
    {
      id: 1,
      name: 'All Customers',
      type: 'all_customers',
    },
    {
      id: 2,
      name: 'New Customers',
      type: 'new_customers',
    },
    {
      id: 3,
      name: 'Returning Customers',
      type: 'returning_customers',
    },
    {
      id: 4,
      name: 'Online Customers',
      type: 'online_customers',
    },
    {
      id: 5,
      name: 'Walkin Customers',
      type: 'walkin_customers',
    },
  ];
  const Item = ({ item, onPress, backgroundColor, color }) => (
    <TouchableOpacity style={[styles.horizontalCustomerCon, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.horizCustomerText, { color }]}>{item.name}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? COLORS.primary : COLORS.textInputBackground;
    const color = item.id === selectedId ? COLORS.white : COLORS.dark_grey;

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id), setCustomerType(item?.type);
        }}
        backgroundColor={backgroundColor}
        color={color}
      />
    );
  };

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

  const profileClickHandler = (item, index) => {
    commonNavigate(MPOS_NAVIGATION.userProfile, {
      userDetail: item,
      data: { customerType, time },
      index,
    });
  };

  return (
    <ScreenWrapper>
      <Header
        backRequired
        title={'Back'}
        filter
        onValueChange={(item) => {
          setSelectTime(item);
        }}
        defaultFilterVal={selectTime}
      />
      <Spacer space={ms(5)} />
      <View
        style={{
          marginLeft: ms(16),
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: ms(10),
        }}
      >
        <FlatList
          data={dummyCustomerData}
          extraData={dummyCustomerData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.searchContainer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              setShowSearchModal(true);
              setSearchedCustomer([]);
              setSearchedText('');
            }}
            style={[styles.container]}
          >
            <Image source={Images.search} style={styles.searchIcon} resizeMode="contain" />
            <TextInput
              style={styles.inputStyle}
              placeholder="Search here"
              editable={false}
              onPressIn={() => {
                setShowSearchModal(true);
                setSearchedCustomer([]);
                setSearchedText('');
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterContainer}>
          <Image source={filter} resizeMode="contain" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(10)} />

      <View style={{ zIndex: -9 }}>
        <Table>
          <View style={[styles.tableDataHeaderCon]}>
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeft}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
                <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>Name</Text>
              </View>
              <View style={styles.tableHeaderRight}>
                <View style={styles.tableHeaderRightInner}>
                  <Text style={styles.tableTextHeader}>Total orders</Text>
                </View>
                {/* <View style={styles.tableHeaderRightInner}>
                  <Text style={styles.tableTextHeader}>Total Products </Text>
                </View> */}
                <View style={styles.tableHeaderRightInner}>
                  <Text style={styles.tableTextHeader}>Lifetime spent</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              zIndex: -9,
              height: Platform.OS === 'android' ? height - ms(225) : height - ms(300),
              backgroundColor: COLORS.white,
              borderBottomLeftRadius: ms(10),
              borderBottomRightRadius: ms(10),
              marginHorizontal: ms(11),
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {isCustomerLoad ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : customerArray?.length === 0 ? (
                <View style={{ marginTop: 80 }}>
                  <Text style={styles.userNotFound}>User not found</Text>
                </View>
              ) : (
                customerArray?.map((item, index) => {
                  const currentIndex = startIndex + index;
                  // setIndexStart(index);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.tableDataCon, { zIndex: -99 }]}
                      activeOpacity={0.7}
                      onPress={() => profileClickHandler(item, index)}
                      // onPress={profileClickHandler}
                    >
                      <View style={styles.displayFlex}>
                        <View style={styles.tableHeaderLeft}>
                          <Text style={styles.tableTextDataFirst}>
                            {/* {ind == 0 ? '' : ind} */}
                            {/* {index + paginationData?.currentPage * paginationData?.currentPage === 1
                            ? 0
                            : paginationModalValue} */}
                            {currentIndex}
                          </Text>
                          <View style={[styles.flexAlign, { marginLeft: 10 }]}>
                            <Image
                              source={
                                item?.user_details?.profile_photo == null ||
                                item?.user_details?.profile_photo == ''
                                  ? userImage
                                  : { uri: item?.user_details?.profile_photo }
                              }
                              style={styles.lovingStyleData}
                            />
                            {/* <Image source={userImage} style={styles.lovingStyleData} /> */}
                            <View
                              style={{
                                flexDirection: 'column',
                                marginLeft: ms(5),
                                marginRight: ms(5),
                              }}
                            >
                              <Text style={styles.tableTextDataName}>
                                {item?.user_details?.firstname == undefined
                                  ? 'Unknown'
                                  : item?.user_details?.firstname}
                              </Text>
                              {item?.user_details ? (
                                <Text
                                  style={[styles.tableTextDataAdd, { color: COLORS.gerySkies }]}
                                  numberOfLines={1}
                                >
                                  {item?.user_details?.current_address?.city}{' '}
                                  {item?.user_details?.current_address?.zipcode}
                                </Text>
                              ) : (
                                <Text></Text>
                              )}
                            </View>
                          </View>
                        </View>
                        <View style={styles.tableHeaderRight}>
                          <View style={styles.tableHeaderRightInner}>
                            <Text style={styles.tableTextData} numberOfLines={1}>
                              {item?.total_orders}
                            </Text>
                            {/* <Text style={styles.tableTextData} numberOfLines={1}>
                              {item?.total_products}
                            </Text> */}
                          </View>
                          {/* <View style={styles.tableHeaderRightInner}>
                            <Text style={styles.tableTextData} numberOfLines={1}>
                              {item?.total_products}
                            </Text>
                          </View> */}
                          <View style={styles.tableHeaderRightInner}>
                            <Text style={styles.tableTextData} numberOfLines={1}>
                              {'$'}
                              {item?.life_time_spent.toFixed(2)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })
              )}
            </ScrollView>
          </View>
        </Table>
      </View>
      <Modal isVisible={showSearchModal}>
        <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center' }}>
          <View
            style={{
              marginHorizontal: ms(10),
              // marginVertical: ms(60),
              backgroundColor: 'white',
              borderRadius: ms(10),
              paddingHorizontal: ms(20),
              paddingVertical: ms(30),
              minHeight: '70%',
              // justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: ms(10), right: ms(7) }}
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
            <SearchList
              searchedAppointments={searchedAppointments}
              profileHandler={(item, customerId, customerTypes, index) => {
                profileClickHandler(item, index);
                setShowSearchModal(false);
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScreenWrapper>
  );
}
