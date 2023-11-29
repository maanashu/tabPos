import React, { useState, memo } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';

import {
  leftBack,
  dropdown2,
  Union,
  mask,
  maskRight,
  unionRight,
  userImage,
  toggle,
  reward2,
  email,
  Phone_light,
  location,
  filter,
  crossButton,
} from '@/assets';
import { Spacer, TableDropdown } from '@/components';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table } from 'react-native-table-component';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getCustomers } from '@/selectors/CustomersSelector';
import { DELIVERY_MODE, PAGINATION_DATA, months } from '@/constants/enums';

const result = Dimensions.get('window').height - 50;
const twoEqualView = result / 1.8;
import { TYPES } from '@/Types/CustomersTypes';
import { useEffect } from 'react';
import {
  getAcceptMarketing,
  getOrderUser,
  marketingUpdate,
  updateUserProfile,
} from '@/actions/CustomersAction';
import MonthYearPicker, { DATE_TYPE } from '@/components/MonthYearPicker';
import { useMemo } from 'react';
import { useCallback } from 'react';
import moment from 'moment';
import { Header, ScreenWrapper } from '@mPOS/components';
import styles from './styles';
import { height } from '@/theme/ScalerDimensions';
import { Images } from '@mPOS/assets';
import { commonNavigate, MPOS_NAVIGATION } from '@common/commonImports';
import Modal from 'react-native-modal';
import CountryPicker from 'react-native-country-picker-modal';
import { strings } from '@mPOS/localization';
import { getUser } from '@/selectors/UserSelectors';

export function UserProfile(props) {
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getCustomerData = useSelector(getCustomers);
  const getUserData = useSelector(getUser);
  const getPosUser = getUserData?.posLoginData;
  const posUsers = getAuth?.getAllPosUsersData;

  const [ordersByUser, setOrdersByUser] = useState(getCustomerData?.getOrderUser?.data ?? []);
  const userDetail = props?.route?.params?.userDetail;
  const [posStaffId, setPosStaffId] = useState();
  const [roleId, setRoleId] = useState();

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  const [paginationModalValue, setPaginationModalValue] = useState(20);
  const [page, setPage] = useState(1);
  const [locationSelect, setLocationSelect] = useState('none');
  const [monthSelect, setMonthSelect] = useState('none');
  const [showEditModal, setShowEditModal] = useState(false);
  const [flag, setFlag] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState(
    userDetail?.user_details?.current_address?.phone_no || ''
  );
  const [countryCode, setCountryCode] = useState(
    userDetail?.user_details?.current_address?.phone_code || '+1'
  );
  const [name, setName] = useState(userDetail?.user_details?.firstname || '');
  const [emailAddress, setEmailAddress] = useState(userDetail?.user_details?.email || '');
  const [streetAddress, setStreetAddress] = useState(
    userDetail?.user_details?.current_address?.custom_address || ''
  );

  const [apt, setApt] = useState(userDetail?.user_details?.current_address?.address_type || '');
  const [zipCode, setZipCode] = useState(userDetail?.user_details?.zipcode || '');

  const posStaffID = () => {
    posUsers?.pos_staff?.map((item) => {
      if (item?.user_id === getPosUser?.id) {
        return setPosStaffId(item?.id), setRoleId(item?.user?.user_roles[0]?.role_id);
      }
    });
  };

  useEffect(() => {
    const data = {
      userid: userDetail?.user_details?.id,
      sellerid: userDetail?.seller_details?.id,
    };
    dispatch(getAcceptMarketing(data));
    posStaffID();
  }, [posStaffId, roleId]);

  const startIndex = useMemo(
    () => (page - 1) * paginationModalValue + 1,
    [page, paginationModalValue]
  );

  const data = {
    firstName: userDetail?.user_details?.firstname,
    phoneNumber: userDetail?.user_details?.phone_number,
    profilePhoto: userDetail?.user_details?.profile_photo,
    userEmail: userDetail?.user_details?.email,
    streetAdd: userDetail?.user_details?.current_address?.street_address,
    city: userDetail?.user_details?.current_address?.city,
    state: userDetail?.user_details?.current_address?.state,
    country: userDetail?.user_details?.current_address?.country,
    postalCode: userDetail?.user_details?.current_address?.zipcode,
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

  const handleOrderDetail = (item) => {
    if (item?.delivery_option == '1') {
      commonNavigate(MPOS_NAVIGATION.orderDetail, { data: item });
    } else if (item?.delivery_option == '4') {
      commonNavigate(MPOS_NAVIGATION.shippingOrderDetail, { data: item });
    } else if (item?.delivery_option == '3') {
      commonNavigate(MPOS_NAVIGATION.orderDetail, { data: item });
    }
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(userDetail?.user_details?.current_address?.country || null);
  const [items, setItems] = useState([
    { label: 'US', value: 'us' },
    { label: 'INDIA', value: 'india' },
    { label: 'AUSTRALIA', value: 'australia' },
  ]);
  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState(null);
  const [stateItems, setStateItems] = useState([
    { label: 'US', value: 'us' },
    { label: 'INDIA', value: 'india' },
    { label: 'AUSTRALIA', value: 'australia' },
  ]);

  const saveHandler = () => {
    const data = {
      pos_staff_id: posStaffId,
      firstname: name,
      phone_number: phoneNumber,
      email: emailAddress,
      role_id: roleId,
      phone_code: countryCode,
      custom_address: streetAddress,
      address_type: apt,
      country: value,
      city: value,
      state: stateValue,
      zipCode: zipCode,
    };
    dispatch(updateUserProfile(data));
    setShowEditModal(false);
  };

  return (
    <ScreenWrapper>
      <Header backRequired title={'Back'} edit editHandler={() => setShowEditModal(true)} />

      <View style={styles.profileCon}>
        <Image
          source={
            data?.profilePhoto == null || data?.profilePhoto == ''
              ? userImage
              : { uri: data?.profilePhoto }
          }
          style={styles.lovingStyle}
        />
        <View style={{ paddingHorizontal: moderateScale(10) }}>
          <Text style={styles.angelaText}>{data?.firstName ? data?.firstName : 'Unknown'}</Text>
          <Spacer space={SH(5)} />
          <View style={styles.flexAlign}>
            <Image source={Phone_light} style={styles.Phonelight} />
            <Text style={styles.adressText}>{data?.phoneNumber}</Text>
          </View>
          <Spacer space={SH(5)} />
          <View style={styles.flexAlign}>
            <Image source={email} style={styles.Phonelight} />
            <Text style={styles.adressText}>{data?.userEmail}</Text>
          </View>
          <Spacer space={SH(5)} />
          <View style={styles.flexAlign}>
            <Image source={location} style={styles.Phonelight} />
            {userDetail?.user_details?.current_address ? (
              <Text style={styles.adressText} numberOfLines={1}>
                {data?.streetAdd} {data?.city} {data?.state} {data?.country} {data?.postalCode}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              // setShowSearchModal(true);
              // setSearchedCustomer([]);
              // setSearchedText('');
            }}
            style={[styles.container]}
          >
            <Image source={Images.search} style={styles.searchIcon} resizeMode="contain" />
            <TextInput
              style={styles.inputStyle}
              placeholder="Search here"
              editable={false}
              onPressIn={() => {
                // setShowSearchModal(true);
                // setSearchedCustomer([]);
                // setSearchedText('');
              }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterContainer}>
          <Image source={filter} resizeMode="contain" style={styles.filterIcon} />
        </TouchableOpacity>
      </View>

      <View style={{ zIndex: -9 }}>
        <Table>
          <View style={[styles.tableDataHeaderCon]}>
            <View style={styles.profileheaderUnderView}>
              <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[styles.tableTextHeader, { marginRight: ms(10) }]}>#</Text>
                  <Text style={styles.tableTextHeader} numberOfLines={1}>
                    Date
                  </Text>
                </View>
              </View>
              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader}>Order id#</Text>
              </View>

              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader}>Partner</Text>
              </View>

              <View style={styles.profileheaderChildView}>
                <Text style={styles.tableTextHeader} numberOfLines={1}>
                  Amount
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: Platform.OS === 'android' ? height - ms(287) : height - ms(360),
              backgroundColor: COLORS.white,
              borderBottomLeftRadius: ms(10),
              borderBottomRightRadius: ms(10),
              marginHorizontal: ms(11),
            }}
          >
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {isOrderUserLoading ? (
                <View style={{ marginTop: 100 }}>
                  <ActivityIndicator size="large" color={COLORS.indicator} />
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
                      onPress={() => handleOrderDetail(item)}
                    >
                      <View style={styles.profileheaderUnderView}>
                        <View style={[styles.profileheaderChildView, { alignItems: 'flex-start' }]}>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.tableTextData, { marginRight: ms(10) }]}>
                              {currentIndex}
                            </Text>
                            <Text style={styles.tableTextData}>
                              {item.created_at ? moment(item.created_at).format('ll') : ''}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData}>{item.id}</Text>
                        </View>
                        <View style={styles.profileheaderChildView}>
                          {item?.delivery_option == 4 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={{ uri: item?.shipping_details?.image }}
                                style={{
                                  width: ms(17),
                                  height: ms(17),
                                  resizeMode: 'contain',
                                  borderRadius: 50,
                                }}
                              />
                              <Text
                                style={[styles.tableTextData, { marginLeft: ms(3) }]}
                                numberOfLines={2}
                              >
                                {item?.shipping_details?.title}
                              </Text>
                            </View>
                          ) : item?.delivery_option == 3 || item?.delivery_option == 2 ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={{ uri: item?.pos_user_details?.profile_photo }}
                                style={{ width: ms(15), height: ms(15), resizeMode: 'contain' }}
                              />
                              <Text style={styles.tableTextData}>
                                {item?.pos_user_details?.firstname}
                              </Text>
                            </View>
                          ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Image
                                source={{ uri: item?.driver_details?.profile_photo }}
                                style={{ width: ms(15), height: ms(15), resizeMode: 'contain' }}
                              />
                              <Text style={styles.tableTextData}>
                                {item?.driver_details?.firstname}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View style={styles.profileheaderChildView}>
                          <Text style={styles.tableTextData} numberOfLines={1}>
                            ${item?.payable_amount}
                          </Text>
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

      <Modal isVisible={showEditModal}>
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
              onPress={() => setShowEditModal(false)}
            >
              <Image source={crossButton} style={{ height: ms(20), width: ms(20) }} />
            </TouchableOpacity>
            <Text style={styles.phoneText}>{'Name'}</Text>

            <View style={styles.textInputView}>
              <TextInput
                maxLength={15}
                returnKeyType={'done'}
                keyboardType={'default'}
                value={name.trim()}
                onChangeText={(text) => {
                  setName(text);
                }}
                style={styles.textInputContainer}
                placeholder={'Name'}
                placeholderTextColor={COLORS.darkGray}
                // showSoftInputOnFocus={false}
              />
            </View>
            <Text>{'Phone Number'}</Text>

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
                placeholderTextColor={COLORS.gerySkies}
                placeholder={strings.phoneNumber.numberText}
              />
            </View>
            <Text style={styles.phoneText}>{'Email-Address'}</Text>

            <View style={styles.textInputView}>
              <TextInput
                maxLength={15}
                returnKeyType={'done'}
                keyboardType={'default'}
                value={emailAddress}
                onChangeText={(text) => {
                  setEmailAddress(text);
                }}
                style={styles.textInputContainer}
                placeholder={'Email'}
                placeholderTextColor={COLORS.darkGray}
                // showSoftInputOnFocus={false}
              />
            </View>
            <Text style={styles.phoneText}>{'Street Address'}</Text>

            <View style={styles.textInputView}>
              <TextInput
                maxLength={15}
                returnKeyType={'done'}
                keyboardType={'default'}
                value={streetAddress}
                onChangeText={(text) => {
                  setStreetAddress(text);
                }}
                style={styles.textInputContainer}
                placeholder={'Street Address'}
                placeholderTextColor={COLORS.darkGray}
                // showSoftInputOnFocus={false}
              />
            </View>
            <Text style={styles.phoneText}>{'Apartment/Suite'}</Text>

            <View style={styles.textInputView}>
              <TextInput
                maxLength={15}
                returnKeyType={'done'}
                keyboardType={'default'}
                value={apt}
                onChangeText={(text) => {
                  setApt(text);
                }}
                style={styles.textInputContainer}
                placeholder={'Apartment/Suite'}
                placeholderTextColor={COLORS.darkGray}
                // showSoftInputOnFocus={false}
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: ms(8) }}>{'Country'}</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={styles.dropDownContainerStyle}
                  style={styles.dropdownStyle}
                  arrowIconStyle={styles.arrowIconStyle}
                  textStyle={{
                    color: COLORS.black,
                    fontFamily: Fonts.Regular,
                    fontSize: ms(10),
                  }}
                  listItemLabelStyle={{ color: COLORS.black }}
                  zIndex={999}
                  placeholder={userDetail?.user_details?.current_address?.country || 'Country'}
                />
              </View>
              <View style={{ flex: 1, marginLeft: ms(10) }}>
                <Text style={{ marginBottom: ms(8) }}>{'State'}</Text>
                <DropDownPicker
                  open={stateOpen}
                  value={stateValue}
                  items={stateItems}
                  setOpen={setStateOpen}
                  setValue={setStateValue}
                  setItems={setStateItems}
                  containerStyle={styles.dropDownContainerStyle}
                  style={styles.dropdownStyle}
                  arrowIconStyle={styles.arrowIconStyle}
                  textStyle={{
                    color: COLORS.black,
                    fontFamily: Fonts.Regular,
                    fontSize: ms(10),
                  }}
                  listItemLabelStyle={{ color: COLORS.black }}
                  zIndex={999}
                  placeholder={userDetail?.user_details?.current_address?.state || 'State'}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: ms(8) }}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: ms(8) }}>{'City'}</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={styles.dropDownContainerStyle}
                  style={styles.dropdownStyle}
                  arrowIconStyle={styles.arrowIconStyle}
                  textStyle={{
                    color: COLORS.black,
                    fontFamily: Fonts.Regular,
                    fontSize: ms(10),
                  }}
                  listItemLabelStyle={{ color: COLORS.black }}
                  zIndex={999}
                  placeholder={userDetail?.user_details?.current_address?.city || 'City'}
                />
              </View>
              <View style={{ flex: 1, marginLeft: ms(10) }}>
                <Text style={{ marginBottom: ms(8) }}>{'Zip Code'}</Text>
                <TextInput
                  maxLength={15}
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={zipCode}
                  onChangeText={(text) => {
                    setZipCode(text);
                  }}
                  style={[
                    styles.textInputContainer,
                    { backgroundColor: COLORS.textInputBackground, paddingHorizontal: ms(10) },
                  ]}
                  placeholder={'Zip Code'}
                  placeholderTextColor={COLORS.darkGray}
                  // showSoftInputOnFocus={false}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: ms(10) }}>
              <TouchableOpacity
                style={styles.continueBtnCon}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.detailBtnCon}>Discard</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addToCartCon} onPress={saveHandler}>
                <Text style={styles.addTocartText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </ScreenWrapper>
  );
}