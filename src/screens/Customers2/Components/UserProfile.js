import React, { useState, memo, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import {
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight,
  userImage,
  toggle,
  arrowLeftUp,
  new_location,
  new_phone,
  new_email,
  Gift_Card,
  editProfile,
  new_camera,
  addIcon,
  addToCartBlue,
  addProduct,
  email_new,
} from '@/assets';
import { Spacer, TableDropdown } from '@/components';
import { COLORS, SF, SH, SW } from '@/theme';
import { strings } from '@/localization';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { styles } from '@/screens/Customers2/Customers2.styles';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Col, Table } from 'react-native-table-component';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getCustomers } from '@/selectors/CustomersSelector';
import { DELIVERY_MODE, PAGINATION_DATA, months } from '@/constants/enums';
import { TYPES } from '@/Types/CustomersTypes';
import { useEffect } from 'react';
import { getAcceptMarketing, getOrderUser, marketingUpdate } from '@/actions/CustomersAction';
import { useMemo } from 'react';
import { useCallback } from 'react';
import moment from 'moment';
import Modal from 'react-native-modal';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP } from '@/constants/ApiKey';

const result = Dimensions.get('window').height - 50;
const windowWidth = Dimensions.get('window').width;

const UserProfile = ({ backHandler, userDetail, orderClickHandler, pointHandler }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const ref = useRef(null);
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getCustomerData = useSelector(getCustomers);
  const storeLocationData = getCustomerData?.getStoreLocation?.data;
  const marketingData = getCustomerData?.getAcceptMarketing;
  const ordersbyUserData = getCustomerData?.getOrderUser;
  const [ordersByUser, setOrdersByUser] = useState(getCustomerData?.getOrderUser?.data ?? []);

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  const [paginationModalOpen, setPaginationModalOpen] = useState(false);
  const [paginationModalValue, setPaginationModalValue] = useState('10');
  const [paginationModalItems, setPaginationModalItems] = useState(PAGINATION_DATA);
  const [page, setPage] = useState(1);
  const [selectedYearData, setselectedYearData] = useState(null);
  const [selectedMonthData, setselectedMonthData] = useState(null);
  const storeLocation = (value) => setLocationSelect(value);
  const [locationSelect, setLocationSelect] = useState('none');

  const monthSelection = (value) => setMonthSelect(value);
  const [monthSelect, setMonthSelect] = useState('none');

  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [flag, setFlag] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [streetAddress, setStreetAddress] = useState('');
  const storeLocationArray = [
    storeLocationData?.map((item, index) => ({
      label: item?.city,
      value: item?.city,
    })),
  ];
  const [apt, setApt] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    const data = {
      userid: userDetail?.user_details?.id,
      sellerid: sellerID,
    };
    dispatch(getAcceptMarketing(data));
  }, []);

  const toggleHandler = async () => {
    const data = {
      user_id: userDetail?.user_details?.id.toString(),
      seller_id: sellerID.toString(),
      accept: Object.keys(marketingData)?.length == 0 ? true : marketingData?.accept ? false : true,
    };
    const res = await dispatch(marketingUpdate(data));
    if (res?.type === 'GET_MARKETINGUPDATE_SUCCESS') {
      const data = {
        userid: userDetail?.user_details?.id,
        sellerid: sellerID,
      };
      dispatch(getAcceptMarketing(data));
    }
  };

  const startIndex = useMemo(
    () => (page - 1) * paginationModalValue + 1,
    [page, paginationModalValue]
  );

  const data = {
    firstName: userDetail?.user_details?.firstname,
    phoneNumber: userDetail?.user_details?.phone_number,
    profilePhoto: userDetail?.user_details?.profile_photo,
    userEmail: userDetail?.user_details?.email,
    streetAdd: userDetail?.user_details?.current_address?.custom_address,
    city: userDetail?.user_details?.current_address?.city,
    state: userDetail?.user_details?.current_address?.state,
    country: userDetail?.user_details?.current_address?.country,
    postalCode: userDetail?.user_details?.current_address?.postal_code,
  };
  const paginationData = {
    total: getCustomerData?.getOrderUser?.total ?? '0',
    currentPage: getCustomerData?.getOrderUser?.current_page ?? '0',
    totalPages: getCustomerData?.getOrderUser?.total_pages ?? '0',
    perPage: getCustomerData?.getOrderUser?.per_page ?? '0',
  };

  const orderPayloadLength = Object.keys(getCustomerData?.getOrderUser)?.length;

  const paginationInchandler = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const paginationDechandler = () => {
    setPage(page - 1);
    // setInd(ind - 1);
  };

  useEffect(() => {
    const data = {
      userId: userDetail?.user_id,
      sellerID: sellerID,
      page: page,
      limit: paginationModalValue,
      month: monthSelect,
      storeLocation: locationSelect,
    };
    dispatch(getOrderUser(data));
  }, [paginationModalValue, page, monthSelect, locationSelect]);

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  const isOrderUserLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ORDER_USER], state)
  );

  const getAddress = (data, details, place_id = null) => {
    const addressDetails = details?.address_components;
    const { lat, lng } = details?.geometry?.location;
    setLatitude(lat);
    setLongitude(lng);

    for (var i = 0; i < addressDetails.length; i++) {
      if (addressDetails[i].types[0] == 'country') {
        setCountry(addressDetails?.[i]?.long_name);
      }

      if (addressDetails[i].types[0] == 'postal_code') {
        setZipCode(addressDetails?.[i]?.long_name);
      }

      if (addressDetails[i].types[0] == 'administrative_area_level_1') {
        setState(addressDetails?.[i]?.long_name);
      }

      if (
        addressDetails[i].types[0] == 'administrative_area_level_2' ||
        addressDetails[i].types[0] == 'administrative_area_level_3' ||
        addressDetails[i].types[0] == 'locality'
      ) {
        setCity(addressDetails?.[i]?.long_name);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.headerMainView, { paddingLeft: ms(10) }]}>
        <View style={styles.deliveryView}>
          <TouchableOpacity onPress={backHandler} style={{ marginRight: ms(5) }}>
            <Image source={arrowLeftUp} style={styles.backButtonArrow} />
          </TouchableOpacity>
          <Text style={styles.deliveryText}>{'User Profile'}</Text>
        </View>
        {/* <TouchableOpacity style={styles.displayFlex} onPress={() => setShowEditModal(true)}>
          <Text style={styles.editButtonText}>{strings.customers.Edit}</Text>
          <Image source={editProfile} style={styles.Phonelight} />
        </TouchableOpacity> */}
      </View>

      <View style={styles.profileCon}>
        <View style={{ flexDirection: 'row', flex: 1.8, alignItems: 'center' }}>
          <Image
            source={
              data?.profilePhoto == null || data?.profilePhoto == ''
                ? userImage
                : { uri: data?.profilePhoto }
            }
            style={styles.lovingStyle}
          />
          <View style={{ paddingHorizontal: moderateScale(10) }}>
            <Text style={styles.angelaText}>{data?.firstName}</Text>
            <Spacer space={SH(5)} />

            {userDetail?.user_details?.current_address ? (
              <View style={styles.flexAlign}>
                <Image source={new_location} style={styles.Phonelight} />

                <Text style={[styles.adressText, { width: windowWidth * 0.25 }]} numberOfLines={1}>
                  {data?.streetAdd} {data?.city} {data?.state} {data?.country}
                  {data?.postalCode}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <Spacer space={SH(5)} />
          {userDetail?.user_details?.phone_number ? (
            <View style={styles.flexAlign}>
              <Image source={new_phone} style={styles.Phonelight} />
              <Text style={styles.adressText}>{data?.phoneNumber}</Text>
            </View>
          ) : null}
          <Spacer space={SH(10)} />
          {userDetail?.user_details?.email ? (
            <View style={styles.flexAlign}>
              <Image source={new_email} style={styles.Phonelight} />
              <Text style={styles.adressText}>{data?.userEmail}</Text>
            </View>
          ) : null}
        </View>

        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            marginTop: ms(5),
          }}
        >
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: COLORS.orange,
              borderRadius: ms(15),
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingHorizontal: ms(10),
              paddingVertical: ms(2),
              backgroundColor: COLORS.cream_yellow,
            }}
            onPress={pointHandler}
          >
            <View style={styles.flexAlign}>
              <Image source={Gift_Card} style={styles.rewardStyle} />
              <Text style={styles.pointText}>{strings.customers.point}</Text>
            </View>
          </TouchableOpacity>
          <Spacer space={SH(5)} />
          <View style={[styles.acceptCon]}>
            <View style={styles.flexAlign}>
              <TouchableOpacity style={styles.toggleBtnCon} onPress={toggleHandler}>
                <Image
                  source={toggle}
                  style={
                    Object.keys(marketingData)?.length == 0
                      ? styles.toggleBtnStyle2
                      : marketingData?.accept == true
                      ? styles.toggleBtnStyle
                      : styles.toggleBtnStyle2
                  }
                />
              </TouchableOpacity>
              <Text style={styles.acceptMarketText}>{strings.customers.acceptMarket}</Text>
            </View>
          </View>
        </View>
      </View>

      <Spacer space={SH(10)} />
      <View style={styles.orderTypeCon}>
        <View style={styles.flexAlign}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ marginHorizontal: moderateScale(5) }}>
              <TableDropdown placeholder="Month" selected={monthSelection} data={months} />
              {/* <MonthYearPicker
              showAllMonths={true}
              dateType={DATE_TYPE.MONTH}
              placeholder={'Month'}
              containerStyle={{ marginRight: 10 }}
              defaultValue={moment().month() + 1}
              defaultYear={selectedYearData?.value ?? moment().year()}
              onSelect={(monthData) => {
                setselectedMonthData(monthData);
              }}
              dropdownStyle={{ height: SH(35), borderColor: COLORS.solidGrey }}
            /> */}
            </View>
            <>
              <TableDropdown
                placeholder="Store location"
                selected={storeLocation}
                data={storeLocationArray?.[0]}
              />
            </>
          </View>

          <View
            style={[styles.jbrTypeCon, { zIndex: -1, opacity: orderPayloadLength === 0 ? 0.4 : 1 }]}
            pointerEvents={orderPayloadLength === 0 ? 'none' : 'auto'}
          >
            <View style={styles.paginationEnd}>
              <Text style={[styles.paginationCount]}>{strings.customers.showResult}</Text>
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
                      tintColor:
                        paginationData?.currentPage == 1 ? COLORS.graySky : COLORS.navy_blue,
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
                      tintColor:
                        paginationData?.currentPage == 1 ? COLORS.graySky : COLORS.navy_blue,
                    },
                  ]}
                />
              </View>
              <View
                style={{
                  width: ms(60),
                  marginRight: ms(7),
                }}
              >
                {isOrderUserLoading ? (
                  <ActivityIndicator size="small" color={COLORS.navy_blue} />
                ) : (
                  <Text
                    style={[styles.paginationCount, { paddingHorizontal: 0, alignSelf: 'center' }]}
                  >
                    {startIndex} - {startIndex + (ordersByUser?.length - 1)} of{' '}
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
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View style={[styles.tableDataHeaderCon]}>
            <View style={styles.profileheaderUnderView}>
              <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.tableTextHeader, { marginRight: ms(25) }]}>#</Text>
                  <Text style={styles.tableTextHeader}>Invoice Id</Text>
                </View>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Date
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={2}>
                  Store location
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Responsible
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  No. of items
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Amount
                </Text>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Sales type
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: ms(290) }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {isOrderUserLoading ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.navy_blue} />
                </View>
              ) : ordersByUser?.length === 0 ? (
                <View style={{ marginTop: 80 }}>
                  <Text style={styles.userNotFound}>Order not found</Text>
                </View>
              ) : (
                ordersByUser?.map((item, index) => {
                  const currentIndex = startIndex + index;
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[styles.tableDataCon, { zIndex: -99 }]}
                      onPress={() => orderClickHandler(item)}
                    >
                      <View style={styles.profileheaderUnderView}>
                        <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.tableTextData, { marginRight: ms(30) }]}>
                              {currentIndex}
                            </Text>
                            <Text style={styles.tableTextData}>
                              {item?.invoices?.invoice_number}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData}>
                            {item.created_at ? moment(item.created_at).format('DD/MM/YYYY') : ''}
                          </Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {item?.seller_details?.current_address?.city}
                          </Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          {item?.delivery_option == 4 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={
                                  item?.shipping_details?.image == null ||
                                  item?.shipping_details?.image == ''
                                    ? userImage
                                    : { uri: item?.shipping_details?.image }
                                }
                                style={{
                                  width: ms(17),
                                  height: ms(17),
                                  resizeMode: 'contain',
                                  borderRadius: 50,
                                }}
                              />
                              <Text style={[styles.tableTextStyle]} numberOfLines={2}>
                                {item?.shipping_details?.title}
                              </Text>
                            </View>
                          ) : item?.delivery_option == 3 || item?.delivery_option == 2 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={
                                  item?.pos_user_details?.profile_photo == null ||
                                  item?.pos_user_details?.profile_photoe == ''
                                    ? userImage
                                    : { uri: item?.pos_user_details?.profile_photo }
                                }
                                style={{
                                  width: ms(15),
                                  height: ms(15),
                                  resizeMode: 'contain',
                                }}
                              />
                              <Text style={styles.tableTextStyle}>
                                {item?.pos_user_details?.firstname}
                              </Text>
                            </View>
                          ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={
                                  item?.driver_details?.profile_photo == null ||
                                  item?.driver_details?.profile_photo == ''
                                    ? userImage
                                    : { uri: item?.driver_details?.profile_photo }
                                }
                                style={{
                                  width: ms(15),
                                  height: ms(15),
                                  resizeMode: 'contain',
                                }}
                              />
                              <Text style={[styles.tableTextStyle]}>
                                {item?.driver_details?.firstname}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            {item?.total_items ?? '1'}
                          </Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            ${item?.payable_amount}
                          </Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <View
                            style={[
                              styles.saleTypeButtonCon,
                              {
                                backgroundColor:
                                  DELIVERY_MODE[item?.delivery_option] === 'Delivery'
                                    ? COLORS.tip_back
                                    : DELIVERY_MODE[item?.delivery_option] === 'Shipping'
                                    ? COLORS.light_skyblue
                                    : COLORS.input_border,
                              },
                            ]}
                          >
                            <Text
                              style={[
                                styles.tableTextData,
                                {
                                  color:
                                    DELIVERY_MODE[item?.delivery_option] === 'Delivery'
                                      ? COLORS.purple
                                      : DELIVERY_MODE[item?.delivery_option] === 'Shipping'
                                      ? COLORS.dark_skyblue
                                      : COLORS.navy_blue,
                                  paddingLeft: 0,
                                },
                              ]}
                            >
                              {DELIVERY_MODE[item?.delivery_option]}
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
      <Modal isVisible={showEditModal} onBackdropPress={() => setShowEditModal(false)}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <View
            style={{
              marginHorizontal: ms(40),
              backgroundColor: COLORS.white,
              borderRadius: ms(5),
              paddingHorizontal: ms(20),
              paddingVertical: ms(20),
              // minHeight: '90%',
              flexDirection: 'row',
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.input_border,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  padding: ms(5),
                  borderRadius: ms(20),
                }}
              >
                <Image
                  source={new_camera}
                  resizeMode="contain"
                  style={{ height: ms(20), width: ms(20) }}
                />
              </TouchableOpacity>
              <Text style={styles.headerText}>{'Add New Store Employee'}</Text>

              <View style={{ flexDirection: 'row', marginTop: ms(20) }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: ms(10), color: COLORS.navy_blue }}>{'First Name'}</Text>
                  <View style={styles.textInputView}>
                    <TextInput
                      returnKeyType={'done'}
                      keyboardType={'default'}
                      value={name.trim()}
                      onChangeText={(text) => {
                        setName(text);
                      }}
                      style={[styles.textInputContainer]}
                      placeholder={'First Name'}
                      placeholderTextColor={COLORS.navy_light_blue}
                      // showSoftInputOnFocus={false}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginLeft: ms(8) }}>
                  <Text style={{ fontSize: ms(9), color: COLORS.navy_blue }}>{'Last Name'}</Text>
                  <View style={styles.textInputView}>
                    <TextInput
                      returnKeyType={'done'}
                      keyboardType={'default'}
                      value={name.trim()}
                      onChangeText={(text) => {
                        setName(text);
                      }}
                      style={[styles.textInputContainer]}
                      placeholder={'Last Name'}
                      placeholderTextColor={COLORS.navy_light_blue}
                      // showSoftInputOnFocus={false}
                    />
                  </View>
                </View>
              </View>
              <Text style={{ fontSize: ms(9), color: COLORS.navy_blue }}>{'Phone Number'}</Text>

              <View style={styles.textInputView}>
                <CountryPicker
                  withFilter
                  withCallingCode
                  countryCode={flag}
                  onSelect={(code) => {
                    setFlag(code.cca2);
                    if (code?.callingCode?.length > 0) {
                      setCountryCode('+' + code.callingCode.flat());
                    } else {
                      setCountryCode('');
                    }
                  }}
                />

                <Text style={styles.codeText}>{countryCode}</Text>

                <TextInput
                  maxLength={10}
                  value={phoneNumber}
                  autoCorrect={false}
                  returnKeyType={'done'}
                  keyboardType={'number-pad'}
                  style={styles.textInputContainer}
                  onChangeText={(phone) => setPhoneNumber(phone)}
                  placeholderTextColor={COLORS.navy_light_blue}
                  placeholder={strings.verifyPhone.placeHolderText}
                />
              </View>

              <Text style={{ fontSize: ms(9), color: COLORS.navy_blue }}>{'Email-Address'}</Text>
              <View style={styles.textInputView}>
                <Image
                  source={email_new}
                  resizeMode="contain"
                  style={{ width: ms(12), aspectRatio: 1 }}
                />
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={emailAddress}
                  onChangeText={(text) => {
                    setEmailAddress(text);
                  }}
                  style={[styles.textInputContainer, { marginHorizontal: ms(5) }]}
                  placeholder={'Email'}
                  placeholderTextColor={COLORS.navy_light_blue}
                  // showSoftInputOnFocus={false}
                />
              </View>

              <View style={{ flexDirection: 'row', marginTop: ms(20) }}>
                <TouchableOpacity
                  style={styles.continueBtnCon}
                  onPress={() => setShowEditModal(false)}
                >
                  <Text style={styles.detailBtnCon}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addToCartCon} onPress={() => {}}>
                  <Text style={styles.addTocartText}>Add Employee</Text>
                  <Image
                    resizeMode="contain"
                    style={{ width: ms(20), aspectRatio: 1, tintColor: COLORS.aqua }}
                    source={addProduct}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={{
                width: ms(2),
                backgroundColor: COLORS.light_blue,
                marginHorizontal: ms(20),
                marginBottom: ms(10),
              }}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.phoneText}>{'Street Address'}</Text>
              <GooglePlacesAutocomplete
                ref={ref}
                fetchDetails
                autoFocus={false}
                listViewDisplayed={true}
                returnKeyType={'search'}
                placeholder={'Street Address'}
                enablePoweredByContainer={false}
                query={{
                  language: 'en',
                  type: 'address',
                  key: GOOGLE_MAP.API_KEYS,
                }}
                onPress={(data, details) => {
                  setStreetAddress(data.structured_formatting.main_text);
                  getAddress(data, details);
                }}
                styles={{
                  textInput: styles.textInputView,
                  textInputContainer: styles.textInputContainer,
                }}
                textInputProps={{
                  editable: true,
                  value: streetAddress,
                  onChange: (text) => setStreetAddress(text),
                  placeholderTextColor: COLORS.light_blue2,
                }}
              />

              <Text style={styles.phoneText}>{'Apartment/Suite'}</Text>
              <View style={styles.textInputView}>
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={apt}
                  onChangeText={(text) => {
                    setApt(text);
                  }}
                  style={styles.textInputContainer}
                  placeholder={'Apartment/Suite'}
                  placeholderTextColor={COLORS.navy_light_blue}
                />
              </View>

              <Text style={styles.phoneText}>{'Country'}</Text>
              <View style={styles.textInputView}>
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={country}
                  onChangeText={(text) => {
                    setCountry(text);
                  }}
                  style={[styles.textInputContainer]}
                  placeholder={'Country'}
                  placeholderTextColor={COLORS.navy_light_blue}
                />
              </View>

              <Text style={styles.phoneText}>{'State'}</Text>
              <View style={styles.textInputView}>
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={state}
                  onChangeText={(text) => {
                    setState(text);
                  }}
                  style={[styles.textInputContainer]}
                  placeholder={'State'}
                  placeholderTextColor={COLORS.navy_light_blue}
                />
              </View>

              <Text style={styles.phoneText}>{'City'}</Text>
              <View style={styles.textInputView}>
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={city}
                  onChangeText={(text) => {
                    setCity(text);
                  }}
                  style={[styles.textInputContainer]}
                  placeholder={'City'}
                  placeholderTextColor={COLORS.navy_light_blue}
                />
              </View>

              <Text style={styles.phoneText}>{'Zip Code'}</Text>
              <View style={styles.textInputView}>
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={zipCode}
                  onChangeText={(text) => {
                    setZipCode(text);
                  }}
                  style={[styles.textInputContainer]}
                  placeholder={'Zip Code'}
                  placeholderTextColor={COLORS.navy_light_blue}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Modal>
    </View>
  );
};

export default memo(UserProfile);
