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
} from '@/assets';
import { Spacer, TableDropdown } from '@/components';
import { COLORS, SF, SH } from '@/theme';
import { strings } from '@/localization';
import { styles } from '@/screens/Customers2/Customers2.styles';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { getUserOrder } from '@/actions/CustomersAction';
import { getCustomers } from '@/selectors/CustomersSelector';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/CustomersTypes';
import { PAGINATION_DATA } from '@/constants/enums';
const result = Dimensions.get('window').height - 50;

const AllUsers = ({ backHandler, profileClickHandler, saveCustomerId, saveCustomeType }) => {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCustomerData = useSelector(getCustomers);
  const [selectedId, setSelectedId] = useState(saveCustomerId === undefined ? 2 : saveCustomerId);
  const [customerType, setCustomerType] = useState(
    saveCustomeType === undefined ? 'new_customers' : saveCustomeType
  );
  const [show, setShow] = useState(false);
  const customerArray = getCustomerData?.getUserOrder?.data ?? [];
  const payloadLength = Object.keys(getCustomerData?.getUserOrder)?.length;

  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const [dateformat, setDateformat] = useState('');
  const [date, setDate] = useState(new Date());
  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState(10);
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);
  const [page, setPage] = useState(1);
  const [ind, setInd] = useState(0);

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
    };
    dispatch(getUserOrder(data));
  }, [selectedId, paginationModalValue, page]);

  const paginationInchandler = () => {
    setPage(page + 1);
    setInd(ind + 1);
    // if (paginationData?.currentPage <= paginationData?.totalPages) {
    //   setPage(page + 1);
    //   const data = {
    //     sellerID: sellerID,
    //     customerType: customerType,
    //     page: page,
    //     limit: paginationModalValue,
    //   };
    //   // console.log('data', data);
    //   // return;
    //   dispatch(getUserOrder(data));
    // }
  };

  const paginationDechandler = () => {
    setPage(page - 1);
    setInd(ind - 1);
    // if (paginationData?.currentPage < paginationData?.totalPages) {
    //   setPage(page - 1);
    //   const data = {
    //     sellerID: sellerID,
    //     customerType: customerType,
    //     page: page,
    //     limit: paginationModalValue,
    //   };
    //   console.log('data', data);
    //   // return;
    //   dispatch(getUserOrder(data));
    // }
  };

  const isCustomerLoad = useSelector((state) => isLoadingSelector([TYPES.GET_USER_ORDER], state));
  const onChangeDate = (selectedDate) => {
    const currentDate = moment().format('MM/DD/YYYY');
    const selected = moment(selectedDate).format('MM/DD/YYYY');
    if (currentDate === selected) {
      setShow(false);
      const fullDate = new Date(moment(selectedDate).subtract(21, 'years'));
      const changedDate = moment(fullDate).format('MM / DD / YYYY');
      const newDateFormat = moment(fullDate).format('YYYY-MM-DD');
      setDateformat(newDateFormat);
      setDate(changedDate);
    } else {
      setShow(false);
      const month = selectedDate.getMonth() + 1;
      const selectedMonth = month < 10 ? '0' + month : month;
      const day = selectedDate.getDate();
      const selectedDay = day < 10 ? '0' + day : day;
      const year = selectedDate.getFullYear();
      const fullDate = selectedMonth + ' / ' + selectedDay + ' / ' + year;
      const newDateFormat = year + '-' + selectedMonth + '-' + selectedDay;
      setDateformat(newDateFormat);
      setDate(fullDate);
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
      name: 'Walking Customers',
      type: 'walking_customers',
    },
  ];

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

  const Item = ({ item, onPress, backgroundColor, color }) => (
    <TouchableOpacity style={[styles.horizontalCustomerCon, { backgroundColor }]} onPress={onPress}>
      <Text style={[styles.horizCustomerText, { color }]}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerMainView}>
        <TouchableOpacity style={styles.deliveryView} onPress={backHandler}>
          <Image source={leftBack} style={styles.backIcon} />
          <Text style={styles.backTitle}>{'Back'}</Text>
        </TouchableOpacity>
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
      <View style={{ paddingLeft: ms(10) }}>
        <FlatList
          data={dummyCustomerData}
          extraData={dummyCustomerData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
      <Spacer space={SH(10)} />
      {/* Date and Area section */}
      <View style={styles.orderTypeCon}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={styles.datePickerCon} onPress={() => setShow(!show)}>
            <Image source={calendar1} style={styles.calendarStyle} />
            <TextInput
              value={date}
              returnKeyType={'done'}
              pointerEvents={'none'}
              autoCapitalize={'none'}
              editable={false}
              placeholder="Date"
              placeholderTextColor={COLORS.gerySkies}
              style={styles.txtInput}
            />
          </TouchableOpacity>
          <DateTimePickerModal
            mode={'date'}
            isVisible={show}
            onConfirm={onChangeDate}
            onCancel={() => setShow(false)}
            maximumDate={new Date(moment().subtract(21, 'years'))}
          />
          <View style={{ marginHorizontal: moderateScale(10) }}>
            <TableDropdown placeholder="Area" />
          </View>
        </View>
      </View>

      {/*Calendar pagination section */}
      <View
        style={[styles.jbrTypeCon, { zIndex: -1, opacity: payloadLength === 0 ? 0.4 : 1 }]}
        pointerEvents={payloadLength === 0 ? 'none' : 'auto'}
      >
        <View style={styles.paginationEnd}>
          <Text style={[styles.paginationCount, { fontSize: 12 }]}>
            {strings.customers.showResult}
          </Text>
          <View style={{ marginHorizontal: moderateScale(10) }}>
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
              // onSelectItem={item => selectedNo(item.value)}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.unionCon,
              {
                backgroundColor: paginationData?.currentPage == 1 ? COLORS.washGrey : COLORS.white,
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
                  tintColor:
                    paginationData?.currentPage == 1 ? COLORS.gerySkies : COLORS.solid_grey,
                },
              ]}
            />
          </TouchableOpacity>
          <View style={styles.unionCon}>
            <Image source={mask} style={styles.unionStyle} />
          </View>
          <Text style={styles.paginationCount}>{`1-20 of ${paginationData?.total}`}</Text>
          <View style={[styles.unionCon, { backgroundColor: COLORS.white }]}>
            <Image source={maskRight} style={styles.unionStyle} />
          </View>
          <TouchableOpacity
            style={[
              styles.unionCon,
              {
                backgroundColor:
                  paginationData?.currentPage == paginationData?.totalPages
                    ? COLORS.washGrey
                    : COLORS.white,
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
                      ? COLORS.gerySkies
                      : COLORS.solid_grey,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View
            style={[
              styles.tableDataHeaderCon,
              { borderTopWidth: 1, borderColor: COLORS.solidGrey },
            ]}
          >
            <View style={styles.displayFlex}>
              <View style={styles.tableHeaderLeft}>
                <Text style={styles.tableTextHeaFirst}>#</Text>
                <Text style={[styles.tableTextHea, { marginLeft: 30 }]}>Name</Text>
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
            <ScrollView>
              {isCustomerLoad ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
                </View>
              ) : customerArray?.length === 0 ? (
                <View style={{ marginTop: 80 }}>
                  <Text style={styles.userNotFound}>User not found</Text>
                </View>
              ) : (
                customerArray?.map((item, index) => (
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
                          {index + 1}
                        </Text>
                        <View style={[styles.flexAlign, { marginLeft: 10 }]}>
                          {/* <Image
                            source={{ uri: item?.user_details?.profile_photo } ?? userImage}
                            style={styles.lovingStyleData}
                          /> */}
                          <Image source={userImage} style={styles.lovingStyleData} />
                          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Text style={styles.tableTextDataName}>
                              {item?.user_details?.firstname}
                            </Text>
                            {item?.user_details ? (
                              <Text
                                style={[styles.tableTextDataAdd, { color: COLORS.gerySkies }]}
                                numberOfLines={1}
                              >
                                {item?.user_details?.current_address?.street_address},
                                {item?.user_details?.current_address?.city},
                                {item?.user_details?.current_address?.state},
                                {item?.user_details?.current_address?.country},
                                {item?.user_details?.current_address?.postal_code}
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
                ))
              )}
            </ScrollView>
          </View>
        </Table>
      </View>
    </View>
  );
};

export default memo(AllUsers);
