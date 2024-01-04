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
import { getAuthData } from '@/selectors/AuthSelector';
import { getCustomers } from '@/selectors/CustomersSelector';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAP } from '@/constants/ApiKey';
import { TYPES } from '@/Types/CustomersTypes';
import { useEffect } from 'react';
import { getOrderUser, getUserOrder, updateUserProfile } from '@/actions/CustomersAction';
import { useMemo } from 'react';
import moment from 'moment';
import { Header, ScreenWrapper } from '@mPOS/components';
import styles from './styles';
import { height } from '@/theme/ScalerDimensions';
import { Images } from '@mPOS/assets';
import { commonNavigate, MPOS_NAVIGATION } from '@common/commonImports';
import Modal from 'react-native-modal';
import CountryPicker from 'react-native-country-picker-modal';
import { strings } from '@mPOS/localization';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function UserProfile(props) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const getAuth = useSelector(getAuthData);
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const getCustomerData = useSelector(getCustomers);
  const customerArray = getCustomerData?.getUserOrder?.data[props?.route?.params?.index] ?? [];
  const [ordersByUser, setOrdersByUser] = useState(getCustomerData?.getOrderUser?.data ?? []);
  const userDetail = props?.route?.params?.userDetail;
  const user_details = customerArray?.user_details;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setOrdersByUser(getCustomerData?.getOrderUser?.data ?? []);
  }, [getCustomerData?.getOrderUser?.data]);

  const [editId, setEditId] = useState(user_details?.current_address?.address_id || '');

  const [paginationModalValue, setPaginationModalValue] = useState(20);
  const [page, setPage] = useState(1);
  const [locationSelect, setLocationSelect] = useState('none');
  const [monthSelect, setMonthSelect] = useState('none');
  const [showEditModal, setShowEditModal] = useState(false);
  const [flag, setFlag] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState(user_details?.current_address?.phone_no || '');
  const [countryCode, setCountryCode] = useState(user_details?.current_address?.phone_code || '+1');
  const [name, setName] = useState(user_details?.firstname || '');
  const [emailAddress, setEmailAddress] = useState(user_details?.email || '');
  const [streetAddress, setStreetAddress] = useState(
    editId ? user_details?.current_address?.custom_address : ''
  );
  const [apt, setApt] = useState(user_details?.current_address?.address_type || '');
  const [zipCode, setZipCode] = useState(editId ? user_details?.zipcode : '');
  const [city, setCity] = useState(editId ? user_details?.current_address?.city : '');
  const [latitude, setLatitude] = useState(editId ? user_details?.current_address?.latitude : null);
  const [longitude, setLongitude] = useState(
    editId ? user_details?.current_address?.longitude : null
  );
  const [state, setState] = useState(editId ? user_details?.current_address?.state : '');
  const [country, setCountry] = useState(editId ? user_details?.current_address?.country : '');
  const [placeId, setPlaceId] = useState('');

  const startIndex = useMemo(
    () => (page - 1) * paginationModalValue + 1,
    [page, paginationModalValue]
  );

  const data = {
    firstName: user_details?.firstname,
    phoneNumber: user_details?.phone_number,
    profilePhoto: user_details?.profile_photo,
    userEmail: user_details?.email,
    streetAdd: user_details?.current_address?.custom_address,
    city: user_details?.current_address?.city,
    state: user_details?.current_address?.state,
    country: user_details?.current_address?.country,
    postalCode: user_details?.current_address?.zipcode,
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

  // useEffect(() => {
  //   const getCityLocation = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://maps.googleapis.com/maps/api/geocode/json?address=${data?.city},${data?.state}&key=YOUR_GOOGLE_MAPS_API_KEY`
  //       );
  //       if (!response.ok) {
  //         throw new Error('Error fetching city location');
  //       }

  //       const responseData = await response.json();
  //       console.log('ahhasgd', responseData);

  //       if (responseData.status === 'OK' && responseData.results.length > 0) {
  //         const { lat, lng } = responseData.results[0].geometry.location;
  //         setLocation({ latitude: lat, longitude: lng });
  //       } else {
  //         throw new Error('No results found');
  //       }
  //     } catch (error) {
  //       console.log('first', data?.city);
  //       console.error('Error:', error.message);
  //     }
  //   };

  //   getCityLocation();
  // }, []);

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

  useEffect(() => {
    if (user_details?.current_address?.custom_address) {
      ref.current?.setAddressText(streetAddress);
    }
  }, []);

  const saveHandler = () => {
    const id = user_details?.id;
    const data = {
      firstname: name,
      email: emailAddress,
      current_address: {
        street_address: streetAddress,
        address_type: apt,
        country: country,
        city: city,
        state: state,
        zipcode: zipCode,
        latitude,
        longitude,
      },
      address_id: editId,
    };
    const orderData = {
      sellerID: sellerID,
      customerType: props?.route?.params?.data?.customerType,
      page: page,
      limit: paginationModalValue,
      dayWisefilter: props?.route?.params?.data?.time,
    };
    dispatch(updateUserProfile(data, id));
    dispatch(getUserOrder(orderData));
    setShowEditModal(false);
  };

  const getAddress = (data, details, place_id = null) => {
    const addressDetails = details?.address_components;
    const { lat, lng } = details?.geometry?.location;
    setLatitude(lat);
    setLongitude(lng);
    setPlaceId(place_id ? place_id : data.place_id);
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
    <ScreenWrapper>
      <Header backRequired title={'Back'} edit editHandler={() => setShowEditModal(true)} />
      {user_details && (
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
      )}

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
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          style={{
            flex: 1,
            marginVertical: ms(20),
          }}
        >
          <View
            style={{
              marginHorizontal: ms(10),
              // marginVertical: ms(30),
              backgroundColor: 'white',
              borderRadius: ms(10),
              paddingHorizontal: ms(20),
              paddingVertical: ms(30),
              // minHeight: '70%',
              // justifyContent: 'center',
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: ms(8), right: ms(7) }}
              onPress={() => setShowEditModal(false)}
            >
              <Image source={crossButton} style={{ height: ms(20), width: ms(20) }} />
            </TouchableOpacity>
            <Text style={styles.phoneText}>{'Name'}</Text>

            <View style={styles.textInputView}>
              <TextInput
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
                container: styles.placesContainerStyle,
                textInput: styles.textInputView,
                textInputContainer: styles.textInputContainer,
                predefinedPlacesDescription: styles.predefinedStyles,
              }}
              textInputProps={{
                editable: true,
                value: streetAddress,
                onChange: (text) => setStreetAddress(text),
              }}
            />

            {/* <View style={styles.textInputView}>
              <TextInput
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
            </View> */}
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
                placeholderTextColor={COLORS.darkGray}
                // showSoftInputOnFocus={false}
              />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: ms(8) }}>{'Country'}</Text>
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={country}
                  onChangeText={(text) => {
                    setCountry(text);
                  }}
                  style={[
                    styles.textInputContainer,
                    { backgroundColor: COLORS.textInputBackground, paddingHorizontal: ms(10) },
                  ]}
                  placeholder={'Country'}
                  placeholderTextColor={COLORS.darkGray}
                  // showSoftInputOnFocus={false}
                />
              </View>
              <View style={{ flex: 1, marginLeft: ms(10) }}>
                <Text style={{ marginBottom: ms(8) }}>{'State'}</Text>
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={state}
                  onChangeText={(text) => {
                    setState(text);
                  }}
                  style={[
                    styles.textInputContainer,
                    { backgroundColor: COLORS.textInputBackground, paddingHorizontal: ms(10) },
                  ]}
                  placeholder={'State'}
                  placeholderTextColor={COLORS.darkGray}
                  // showSoftInputOnFocus={false}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: ms(8) }}>
              <View style={{ flex: 1 }}>
                <Text style={{ marginBottom: ms(8) }}>{'City'}</Text>
                <TextInput
                  returnKeyType={'done'}
                  keyboardType={'default'}
                  value={city}
                  onChangeText={(text) => {
                    setCity(text);
                  }}
                  style={[
                    styles.textInputContainer,
                    { backgroundColor: COLORS.textInputBackground, paddingHorizontal: ms(10) },
                  ]}
                  placeholder={'City'}
                  placeholderTextColor={COLORS.darkGray}
                  // showSoftInputOnFocus={false}
                />
              </View>
              <View style={{ flex: 1, marginLeft: ms(10) }}>
                <Text style={{ marginBottom: ms(8) }}>{'Zip Code'}</Text>
                <TextInput
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
        </KeyboardAwareScrollView>
      </Modal>
    </ScreenWrapper>
  );
}
