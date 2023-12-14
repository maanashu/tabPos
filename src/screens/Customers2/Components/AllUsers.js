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
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight,
  userImage,
  crossButton,
  searchDrawer,
  bellDrawer,
  calendarDrawer,
  arrowLeftUp,
  newCalendar,
  scanNew,
} from '@/assets';
import { DaySelector, Spacer, TableDropdown } from '@/components';
import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { styles } from '@/screens/Customers2/Customers2.styles';
import moment from 'moment';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
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
import CalendarPickerModal from '@/components/CalendarPickerModal';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { debounce } from 'lodash';
import CustomerListView from './CustomerListView';
import { useCallback } from 'react';
import { TYPES as Types } from '@/Types/AnalyticsTypes';

const AllUsers = ({
  backHandler,
  profileClickHandler,
  saveCustomerId,
  saveCustomeType,
  setSaveCustomerId,
  setSaveCustomerType,
  setAllUsers,
  setUserProfile,
  setUserData,
}) => {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCustomerData = useSelector(getCustomers);
  const areaData = getCustomerData?.getArea?.data;
  const [selectedId, setSelectedId] = useState(saveCustomerId === undefined ? 1 : saveCustomerId);
  const [customerType, setCustomerType] = useState(
    saveCustomeType === undefined ? 'all_customers' : saveCustomeType
  );
  const [show, setShow] = useState(false);
  const customerArray = getCustomerData?.getUserOrder?.data ?? [];
  const payloadLength = Object.keys(getCustomerData?.getUserOrder)?.length ?? 0;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [dateformat, setDateformat] = useState('');
  const [date, setDate] = useState();
  const [formatedDate, setFormatedDate] = useState();
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState('10');
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);
  const [page, setPage] = useState(1);
  const [ind, setInd] = useState();
  const [indexStart, setIndexStart] = useState();
  const [defaultDate, setDefaultDate] = useState(new Date());
  const [dropdownSelect, setDropdownSelect] = useState('none');
  const onchangeValue = (value) => setDropdownSelect(value);
  const [selectId, setSelectId] = useState(2);
  const [selectTime, setSelectTime] = useState({ value: 'week' });
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [searchedAppointments, setSearchedCustomer] = useState([]);

  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toString() : '';
  const startDated = moment(startDate).format('YYYY-MM-DD');
  const endDated = moment(endDate).format('YYYY-MM-DD');
  const [selectDate, setSelectDate] = useState('');
  const maxDateCalendar = new Date();

  const time = selectTime?.value;
  const onLoad = useSelector((state) => isLoadingSelector([Types.GET_ORDER_DATA], state));

  const onPresFun = () => {
    setFormatedDate();
    setDate();
    setSelectedStartDate('');
    setSelectedEndDate('');
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
      area: dropdownSelect,
      calenderDate: formatedDate,
      dayWisefilter: time,
      start_date: startDated,
      end_date: endDated,
    };
    dispatch(getUserOrder(data));
  }, [time, selectedId, paginationModalValue, page, dropdownSelect, formatedDate]);

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
  // const onChangeDate = (selectedDate) => {
  //   const currentDate = moment().format('MM/DD/YYYY');
  //   const selected = moment(selectedDate).format('MM/DD/YYYY');
  //   if (currentDate === selected) {
  //     setShow(false);
  //     const fullDate = new Date(moment(selectedDate).subtract(21, 'years'));
  //     const changedDate = moment(fullDate).format('MM / DD / YYYY');
  //     const newDateFormat = moment(fullDate).format('YYYY-MM-DD');
  //     setDateformat(newDateFormat);
  //     setDate(changedDate);
  //   } else {
  //     setShow(false);
  //     const month = selectedDate.getMonth() + 1;
  //     const selectedMonth = month < 10 ? '0' + month : month;
  //     const day = selectedDate.getDate();
  //     const selectedDay = day < 10 ? '0' + day : day;
  //     const year = selectedDate.getFullYear();
  //     const fullDate = selectedMonth + ' / ' + selectedDay + ' / ' + year;
  //     const newDateFormat = year + '-' + selectedMonth + '-' + selectedDay;
  //     setDateformat(newDateFormat);
  //     setDate(fullDate);
  //   }
  // };
  const onChangeDate = (selectedDate) => {
    setDefaultDate(selectedDate);
    const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
    const fullDate = moment(selectedDate).format('MM/DD/YYYY');
    setDateformat(formattedDate);
    setDate(formattedDate);
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
      setSelectTime('');
      setSelectId('');
      setFormatedDate();
      setDate();
      setSelectDate(!selectDate);
    } else {
      alert('Please Select End Date');
    }
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

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? COLORS.navy_blue : COLORS.white;
    const color = item.id === selectedId ? COLORS.white : COLORS.navy_blue;
    const borderColor = item.id === selectedId ? COLORS.transparent : COLORS.light_purple;

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id), setCustomerType(item?.type);
        }}
        backgroundColor={backgroundColor}
        color={color}
        borderColor={borderColor}
      />
    );
  };

  const Item = ({ item, onPress, backgroundColor, color, borderColor }) => (
    <TouchableOpacity
      style={[styles.horizontalCustomerCon, { backgroundColor, borderColor, borderWidth: 1 }]}
      onPress={onPress}
    >
      <Text style={[styles.horizCustomerText, { color }]}>{item.name}</Text>
    </TouchableOpacity>
  );

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

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.headerMainView, { paddingLeft: ms(5) }]}>
        <View style={styles.deliveryView}>
          <TouchableOpacity onPress={backHandler} style={{ marginRight: ms(5) }}>
            <Image source={arrowLeftUp} style={styles.backButtonArrow} />
          </TouchableOpacity>
          <Text style={styles.deliveryText}>{'Users'}</Text>
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

      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: ms(2.7) }}>
        {/* Date and Area section */}
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <TouchableOpacity
            style={[
              styles.datePickerCon,
              {
                backgroundColor: date ? COLORS.navy_blue : COLORS.white,
              },
            ]}
            onPress={() => {
              if (!dateformat) {
                const dates = moment(new Date()).format('MM/DD/YYY');
                setDate(dates);
              }
              setShow(!show);
            }}
          >
            <Image
              source={calendarDrawer}
              style={[
                styles.calendarStyle,
                {
                  tintColor: date ? COLORS.sky_grey : COLORS.navy_blue,
                },
              ]}
            />
            <TextInput
              value={date}
              returnKeyType={'done'}
              pointerEvents={'none'}
              autoCapitalize={'none'}
              editable={false}
              placeholder="Date"
              placeholderTextColor={COLORS.navy_blue}
              style={[
                styles.txtInput,
                { padding: 0, marginLeft: ms(2), color: date ? COLORS.sky_grey : COLORS.navy_blue },
              ]}
            />
            <Image
              source={dropdown2}
              style={[styles.dropDownIconPagination, { marginRight: ms(2) }]}
            />
          </TouchableOpacity>

          <Modal
            isVisible={show}
            statusBarTranslucent
            animationIn={'fadeIn'}
            animationInTiming={600}
            animationOutTiming={300}
            onBackdropPress={() => setShow(false)}
          >
            <View style={styles.calendarModalView}>
              <CalendarPickerModal
                onPress={() => {
                  setShow(false);
                  // setFormatedDate();
                }}
                onDateChange={onChangeDate}
                onSelectedDate={() => {
                  setShow(false);
                  setFormatedDate(date);
                  setSelectId(0);
                }}
                maxDate={maxDate}
                selectedStartDate={defaultDate}
                onCancelPress={() => {
                  setShow(false);
                  setFormatedDate();
                  setDate();
                  setSelectId(2);
                  setSelectTime({ value: 'week' });
                }}
              />
            </View>
          </Modal>
          <View style={{}}>
            <TableDropdown
              selected={onchangeValue}
              placeholder="Area"
              data={areaSelector?.[0]}
              containerStyle={{ width: ms(70), borderRadius: ms(5) }}
            />
          </View>
        </View>

        {/*Calendar pagination section */}
        <View
          style={[
            styles.jbrTypeCon,
            { opacity: payloadLength === 0 ? 0.4 : 1, paddingHorizontal: ms(10.5) },
          ]}
          pointerEvents={payloadLength === 0 ? 'none' : 'auto'}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Text style={[styles.paginationCount]}>Showing Results</Text>
            <View style={{ marginHorizontal: moderateScale(2) }}>
              <DropDownPicker
                ArrowUpIconComponent={({ style }) => (
                  <Image source={dropdown2} style={styles.dropDownIconPagination} />
                )}
                ArrowDownIconComponent={({ style }) => (
                  <Image source={dropdown2} style={styles.dropDownIconPagination} />
                )}
                style={styles.dropdown}
                containerStyle={[
                  styles.containerStylePagination,
                  { zIndex: Platform.OS === 'ios' ? 20 : 1 },
                ]}
                dropDownContainerStyle={styles.dropDownContainerStyle}
                listItemLabelStyle={styles.listItemLabelStyle}
                labelStyle={styles.labelStyle}
                selectedItemLabelStyle={styles.selectedItemLabelStyle}
                open={paginationModalOpen}
                value={paginationModalValue}
                items={paginationModalItems}
                setOpen={() => setPaginationModalOpen(!paginationModalOpen)}
                setValue={setPaginationModalValue}
                setItems={setPaginationModalItems}
                placeholder="10"
                placeholderStyle={styles.placeholderStylePagination}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.unionCon,
                {
                  backgroundColor:
                    paginationData?.currentPage == 1 ? COLORS.sky_grey : COLORS.white,
                  borderWidth: 1,
                  borderColor:
                    paginationData?.currentPage == 1 ? COLORS.transparent : COLORS.light_purple,
                },
              ]}
              onPress={paginationDechandler}
              disabled={paginationData?.currentPage == 1 ? true : false}
            >
              <Image
                source={Union}
                style={[
                  styles.unionStyle,
                  {
                    tintColor: paginationData?.currentPage == 1 ? COLORS.graySky : COLORS.navy_blue,
                  },
                ]}
              />
            </TouchableOpacity>
            <View
              style={[
                styles.unionCon,
                {
                  backgroundColor:
                    paginationData?.currentPage == 1 ? COLORS.sky_grey : COLORS.white,
                  borderWidth: 1,
                  borderColor:
                    paginationData?.currentPage == 1 ? COLORS.transparent : COLORS.light_purple,
                },
              ]}
            >
              <Image
                source={mask}
                style={[
                  styles.unionStyle,
                  {
                    tintColor: paginationData?.currentPage == 1 ? COLORS.graySky : COLORS.navy_blue,
                  },
                ]}
              />
            </View>
            <View
              style={{
                width: ms(50),
                marginRight: ms(7),
              }}
            >
              {isCustomerLoad ? (
                <ActivityIndicator size="small" color={COLORS.navy_blue} />
              ) : (
                <Text
                  style={[styles.paginationCount, { paddingHorizontal: 0, alignSelf: 'center' }]}
                >
                  {startIndex} - {startIndex + (customerArray?.length - 1)} of{' '}
                  {paginationData?.total}
                </Text>
              )}
            </View>

            <View
              style={[
                styles.unionCon,
                {
                  backgroundColor:
                    paginationData?.currentPage == paginationData?.totalPages
                      ? COLORS.sky_grey
                      : COLORS.white,
                  borderWidth: 1,
                  borderColor:
                    paginationData?.currentPage == paginationData?.totalPages
                      ? COLORS.transparent
                      : COLORS.light_purple,
                },
              ]}
            >
              <Image
                source={maskRight}
                style={[
                  styles.unionStyle,
                  {
                    tintColor:
                      paginationData?.currentPage == paginationData?.totalPages
                        ? COLORS.graySky
                        : COLORS.navy_blue,
                  },
                ]}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.unionCon,
                {
                  backgroundColor:
                    paginationData?.currentPage == paginationData?.totalPages
                      ? COLORS.sky_grey
                      : COLORS.white,
                  borderWidth: 1,
                  borderColor:
                    paginationData?.currentPage == paginationData?.totalPages
                      ? COLORS.transparent
                      : COLORS.light_purple,
                },
              ]}
              onPress={paginationInchandler}
              disabled={paginationData?.currentPage == paginationData?.totalPages ? true : false}
            >
              <Image
                source={unionRight}
                style={[
                  styles.unionStyle,
                  {
                    tintColor:
                      paginationData?.currentPage == paginationData?.totalPages
                        ? COLORS.graySky
                        : COLORS.navy_blue,
                  },
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Spacer space={ms(20)} />

      <View
        style={{
          paddingHorizontal: ms(10),
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: -1,
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

      <Spacer space={SH(10)} />

      <View style={{ zIndex: -9 }}>
        <Table>
          <View style={[styles.tableDataHeaderCon]}>
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeft}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
                <Text style={[styles.tableTextHea, { marginLeft: ms(30) }]}>Name</Text>
              </View>
              <View style={styles.tableHeaderRight}>
                <View style={styles.tableHeaderRightInner}>
                  <Text style={styles.tableTextHeader}>Total orders</Text>
                </View>
                <View style={styles.tableHeaderRightInner}>
                  <Text style={styles.tableTextHeader}>Total Products </Text>
                </View>
                <View style={styles.tableHeaderRightInner}>
                  <Text style={styles.tableTextHeader}>Lifetime spent</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ zIndex: -9, height: ms(290) }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {isCustomerLoad ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.navy_blue} />
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
                      onPress={() => profileClickHandler(item, selectedId, customerType)}
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
                          <View style={[styles.flexAlign, { marginLeft: ms(10) }]}>
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
                            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                              <Text style={styles.tableTextDataName}>
                                {item?.user_details?.firstname == undefined
                                  ? 'Unknown'
                                  : item?.user_details?.firstname}
                              </Text>
                              {item?.user_details ? (
                                <Text
                                  style={[styles.tableTextDataAdd, { color: COLORS.purple }]}
                                  numberOfLines={1}
                                >
                                  {item?.user_details?.current_address?.city},
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
                          </View>
                          <View style={styles.tableHeaderRightInner}>
                            <Text style={styles.tableTextData} numberOfLines={1}>
                              {item?.total_products}
                            </Text>
                          </View>
                          <View style={styles.tableHeaderRightInner}>
                            <Text style={styles.tableTextData} numberOfLines={1}>
                              {'$'}
                              {item?.life_time_spent?.toFixed(2)}
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
            maxDate={maxDateCalendar}
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
    </View>
  );
};

export default memo(AllUsers);
