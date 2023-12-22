import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ms } from 'react-native-size-matters';
import { COLORS, SF, SH, SW } from '@/theme';
import { Spacer } from '@/components';
import { crossButton, dropdown, search_light } from '@/assets';
import { getRetail } from '@/selectors/RetailSelectors';
import { styles } from '@/screens/PosRetail3/PosRetail3.styles';
import { TextInput } from 'react-native-gesture-handler';
import CountryPicker from 'react-native-country-picker-modal';
import { strings } from '@/localization';
import {
  attachCustomer,
  attachServiceCustomer,
  getUserDetail,
  getUserDetailSuccess,
} from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { useCallback } from 'react';
import { memo } from 'react';
import { emailReg } from '@/utils/validators';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Images } from '@/assets/new_icon';
import { useEffect } from 'react';

export const NewCustomerAddService = memo(({ crossHandler, comeFrom, sellerID }) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const cartData = getRetailData?.getAllCart;
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [monthDays, setmonthDays] = useState([]);
  const getuserDetailByNo = getRetailData?.getUserDetail;
  const userLength = Object.keys(getuserDetailByNo)?.length;
  const [defaultFlag, setDefaultFlag] = useState('US');
  const [defaultCountryCode, setDefaultCountryCode] = useState('+1');
  const [defaultPhoneNumber, setDefaultPhoneNumber] = useState(
    getuserDetailByNo?.full_phone_number
  );
  const [detailArea, setDetailArea] = useState(false);

  useEffect(() => {
    if (searchCustomer?.length > 9) {
      const data = {
        countryCode: countryCode,
        phoneNumber: searchCustomer,
      };
      dispatch(getUserDetail(data));
      Keyboard.dismiss();
      setDetailArea(true);
    } else if (searchCustomer?.length < 10) {
      dispatch(getUserDetailSuccess({}));
      setDetailArea(false);
    }
  }, [searchCustomer?.length > 9]);

  // const customerPhoneSearchFun = useCallback(
  //   (customerphoneNumber) => {
  //     setSearchCustomer(customerphoneNumber);
  //     if (customerphoneNumber?.length > 9) {
  //       const data = {
  //         countryCode: countryCode,
  //         phoneNumber: customerphoneNumber,
  //       };
  //       dispatch(getUserDetail(data));
  //       Keyboard.dismiss();
  //       setDetailArea(true);
  //     } else if (customerphoneNumber?.length < 10) {
  //       dispatch(getUserDetailSuccess({}));
  //       setDetailArea(false);
  //     }
  //   },
  //   [searchCustomer]
  // );

  const userDetalLoader = useSelector((state) => isLoadingSelector([TYPES.GET_USERDETAIL], state));

  const saveAndAddCustomer = () => {
    if (!searchCustomer) {
      alert('Please enter phone number');
    } else if (!email) {
      alert('Please enter email');
    } else if (email && emailReg.test(email) === false) {
      alert('Please enter valid  email');
    } else if (!firstName) {
      alert('Please enter first name');
    } else if (!lastName) {
      alert('Please enter last name');
    } else {
      const data = {
        cartId: cartData?.id,
        email: email,
        phoneCode: countryCode,
        phoneNumber: searchCustomer,
        firstName: firstName,
        lastName: lastName,
      };
      dispatch(attachCustomer(data));
      // dispatch(attachServiceCustomer(data));
      // const data = {
      //   userPhoneNo: searchCustomer,
      //   userFirstname: firstName,
      //   userLastName: lastName,
      //   userEmailAdd: email,
      // };
      // dispatch(sendInvitation(data));
      clearInput();
      crossHandler();
    }
  };

  const saveCustomer = () => {
    const data = getuserDetailByNo?.invitation?.id
      ? {
          cartId: cartData?.id,
          invitationId: getuserDetailByNo?.invitation?.id,
        }
      : {
          cartId: cartData?.id,
          userid: getuserDetailByNo?.user_profile?.user?.unique_uuid,
          customerAdd: 'customerAdd',
        };
    // dispatch(attachServiceCustomer(data));
    dispatch(attachCustomer(data));
    // dispatch(attachCustomerInService(data));
    clearInput();
    crossHandler();
  };

  const clearInput = () => {
    setSearchCustomer(''), setFirstName(''), setLastName(''), setLastName('');
  };

  // const customProduct = () => {
  //   if (comeFrom == 'product') {
  //     if (!amount) {
  //       alert('Please enter amount');
  //     } else if (amount && digits.test(amount) === false) {
  //       alert('Please enter valid amount');
  //     } else if (!productName) {
  //       alert('Please enter product name');
  //     } else {
  //       const data = {
  //         price: amount,
  //         productName: productName,
  //         qty: count,
  //         notes: notes,
  //       };
  //       dispatch(customProductAdd(data));
  //       crossHandler();
  //     }
  //   } else {
  //     if (!amount) {
  //       alert('Please enter amount');
  //     } else if (amount && digits.test(amount) === false) {
  //       alert('Please enter valid amount');
  //     } else if (!productName) {
  //       alert('Please enter product name');
  //     } else if (!selectedTimeSlotData) {
  //       alert('Please select a time slot for the service');
  //       return;
  //     } else {
  //       const data = {
  //         price: amount,
  //         productName: productName,
  //         qty: count,
  //         notes: notes,
  //         date: selectedDate,
  //         startTime: selectedTimeSlotData?.start_time,
  //         endTime: selectedTimeSlotData?.end_time,
  //       };
  //       dispatch(customServiceAdd(data));
  //       crossHandler();
  //     }
  //   }
  // };

  useEffect(() => {
    if (cartData?.user_details) {
      setCountryCode(cartData?.user_details?.phone_code || '+1');
      setSearchCustomer(cartData?.user_details?.phone_no || '');
    }
  }, []);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.addCustomerCon}>
        <View style={styles.headerConCustomProduct}>
          {/* <Text style={styles.zeroText}>New Product Add to Cart</Text> */}
          <TouchableOpacity onPress={crossHandler}>
            <Image
              source={crossButton}
              style={[styles.crossButton, { tintColor: COLORS.solid_grey }]}
            />
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image source={Images.addCustomer} style={styles.addcustomerIcon} />
          <Text style={styles.addcustomerIcon}>{'Add a customer'}</Text>
          <Spacer space={SH(3)} />
          <Text style={styles.createOne}>
            {'Search a customer or'}{' '}
            <Text style={{ color: COLORS.navy_blue }}>{'create a new one.'}</Text>
          </Text>
        </View>
        <View style={{ padding: ms(15) }}>
          <View style={styles.searchCustomerCon}>
            <CountryPicker
              onSelect={(code) => {
                setFlag(code.cca2);
                if (code.callingCode !== []) {
                  setCountryCode('+' + code.callingCode.flat());
                } else {
                  setCountryCode('');
                }
              }}
              countryCode={flag}
              withFilter
              withCallingCode
            />

            <Image source={dropdown} style={styles.dropDownIcon} />
            <Text style={styles.countryCodeText}>{countryCode}</Text>

            <TextInput
              returnKeyType={'done'}
              value={searchCustomer}
              // onChangeText={(searchCustomer) => customerPhoneSearchFun(searchCustomer)}
              onChangeText={setSearchCustomer}
              style={styles.searchCustomerInput}
              placeholder="Customer Phone Number"
              placeholderTextColor={COLORS.gerySkies}
              keyboardType="number-pad"
              maxLength={10}
              // showSoftInputOnFocus={false}
            />
          </View>

          {/* <View style={styles.searchCustomerCon}>
          <Image source={search_light} style={styles.sideSearchStyle} />
          <TextInput
            placeholder="Customer Phone Number"
            style={styles.searchCustomerInput}
            value={searchCustomer}
            onChangeText={(searchCustomer) => customerPhoneSearchFun(searchCustomer)}
            placeholderTextColor={COLORS.gerySkies}
            keyboardType="number-pad"
            maxLength={10}
          />
        </View> */}
          {userDetalLoader ? null : userLength > 0 && detailArea ? (
            <Text style={[styles.customerNotSystem, { color: COLORS.primary }]}>
              {strings.retail.alreadyInsystem}
            </Text>
          ) : userLength == 0 && !detailArea ? null : (
            <Text style={styles.customerNotSystem}>{strings.retail.customerNotSystem}</Text>
          )}

          <Spacer space={SH(7)} />
          {userDetalLoader ? (
            <View style={{ marginTop: ms(20) }}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : (
            <View>
              {userLength > 0 && detailArea ? (
                getuserDetailByNo?.invitation?.id ? (
                  <View style={{}}>
                    <Spacer space={SH(18)} />
                    <View>
                      <Text style={styles.customerDarkLabel}>{strings.retail.phoneNumber}</Text>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        pointerEvents="none"
                      >
                        <CountryPicker
                          countryCode={flag}
                          // withFilter
                          // withCallingCode
                          // disableNativeModal={true}
                          visible={false}
                        />
                        <Image source={dropdown} style={styles.dropDownIcon} />
                        <Text style={styles.countryCodeText}>
                          {getuserDetailByNo?.invitation?.phone_code}
                        </Text>
                        <TextInput
                          maxLength={15}
                          returnKeyType={'done'}
                          keyboardType={'number-pad'}
                          value={getuserDetailByNo?.invitation?.phone_no}
                          onChangeText={setDefaultPhoneNumber}
                          style={styles.textInputContainer}
                          placeholder={strings.verifyPhone.placeHolderText}
                          placeholderTextColor={COLORS.gerySkies}
                          editable={false}
                          // showSoftInputOnFocus={false}
                        />
                      </View>
                    </View>
                    <Spacer space={SH(18)} />
                    <View>
                      <Text style={styles.customerDarkLabel}>{strings.retail.emailAdd}</Text>
                      <Text style={styles.customerLightdata}>
                        {getuserDetailByNo?.invitation?.email}
                      </Text>
                    </View>
                    <Spacer space={SH(20)} />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ width: ms(140) }}>
                        <Text style={styles.customerDarkLabel}>{strings.retail.firstName}</Text>
                        <Text style={styles.customerLightdata}>
                          {getuserDetailByNo?.invitation?.firstname}sssss
                        </Text>
                      </View>
                      <View style={{ width: ms(140) }}>
                        <Text style={styles.customerDarkLabel}>{strings.retail.lastName}</Text>
                        <Text style={styles.customerLightdata}>
                          {getuserDetailByNo?.invitation?.lastname}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View>
                    <Spacer space={SH(18)} />
                    <View>
                      <Text style={styles.customerDarkLabel}>{strings.retail.phoneNumber}</Text>
                      <Spacer space={SH(10)} />
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        pointerEvents="none"
                      >
                        <CountryPicker
                          countryCode={flag}
                          // withFilter
                          // withCallingCode
                          // disableNativeModal={true}
                          visible={false}
                        />
                        <Image source={dropdown} style={styles.dropDownIcon} />
                        <Text style={styles.countryCodeText}>
                          {getuserDetailByNo?.user_profile?.phone_code}
                        </Text>
                        <TextInput
                          maxLength={15}
                          returnKeyType={'done'}
                          keyboardType={'number-pad'}
                          value={getuserDetailByNo?.user_profile?.phone_no}
                          onChangeText={setDefaultPhoneNumber}
                          style={styles.textInputContainer}
                          placeholder={strings.verifyPhone.placeHolderText}
                          placeholderTextColor={COLORS.gerySkies}
                          editable={false}
                          // showSoftInputOnFocus={false}
                        />
                      </View>
                    </View>
                    <Spacer space={SH(18)} />
                    <View>
                      <Text style={styles.customerDarkLabel}>{strings.retail.emailAdd}</Text>
                      <Text style={styles.customerLightdata}>
                        {getuserDetailByNo?.user_profile?.user?.email}
                      </Text>
                    </View>
                    <Spacer space={SH(20)} />
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ width: ms(140) }}>
                        <Text style={styles.customerDarkLabel}>{strings.retail.firstName}</Text>
                        <Text style={styles.customerLightdata}>
                          {getuserDetailByNo?.user_profile?.firstname}
                        </Text>
                      </View>
                      <View style={{ width: ms(140) }}>
                        <Text style={styles.customerDarkLabel}>{strings.retail.lastName}</Text>
                        <Text style={styles.customerLightdata}>
                          {getuserDetailByNo?.user_profile?.lastname}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              ) : userLength == 0 && !detailArea ? null : (
                <View>
                  <Text style={styles.newCusAdd}>{strings.retail.phoneNumber}</Text>
                  <View style={styles.phoneCodeNewCustomerView}>
                    <CountryPicker
                      onSelect={(code) => {
                        setFlag(code.cca2);
                        if (code.callingCode !== []) {
                          setCountryCode('+' + code.callingCode.flat());
                        } else {
                          setCountryCode('');
                        }
                      }}
                      countryCode={flag}
                      withFilter
                      withCallingCode
                    />

                    <Image source={dropdown} style={styles.dropDownIcon} />

                    <Text style={styles.countryCodeText}>{countryCode}</Text>

                    <TextInput
                      maxLength={15}
                      returnKeyType={'done'}
                      keyboardType={'number-pad'}
                      value={searchCustomer}
                      onChangeText={setSearchCustomer}
                      style={styles.textInputContainer}
                      placeholder={strings.verifyPhone.placeHolderText}
                      placeholderTextColor={COLORS.lavender}
                      // showSoftInputOnFocus={false}
                    />
                  </View>
                  <Spacer space={SH(12)} />
                  <Text style={styles.newCusAdd}>{strings.retail.emailAdd}</Text>
                  <TextInput
                    placeholder="Email Here"
                    style={styles.phoneCodeNewCustomerView}
                    placeholderTextColor={COLORS.lavender}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />

                  <Spacer space={SH(12)} />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.newCusAdd}>{strings.retail.firstName}</Text>
                      <TextInput
                        placeholder={strings.retail.firstName}
                        style={[styles.newFirstName, { marginRight: ms(6) }]}
                        placeholderTextColor={COLORS.lavender}
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.newCusAdd}>{strings.retail.lastName}</Text>
                      <TextInput
                        placeholder={strings.retail.firstName}
                        style={styles.newFirstName}
                        placeholderTextColor={COLORS.lavender}
                        value={lastName}
                        onChangeText={setLastName}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
        {searchCustomer?.length > 9 && cartData?.user_details?.phone_no == searchCustomer ? null : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: ms(10),
            }}
          >
            <TouchableOpacity style={styles.cancelButtonCon} onPress={crossHandler}>
              <Text style={styles.cancelText}>{'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addToCartButtonCon}
              disabled={userDetalLoader ? true : false}
              onPress={() =>
                userLength == 0 && detailArea
                  ? saveAndAddCustomer()
                  : userLength > 0 && detailArea
                  ? saveCustomer()
                  : alert('Something went wrong')
              }
            >
              <Text style={[styles.cancelText, { color: COLORS.white }]}>{'Add Costumer'}</Text>
              <Image source={Images.addProduct} style={styles.plusIconAdd} />
            </TouchableOpacity>
          </View>
        )}

        <Spacer space={SH(15)} />
      </View>
    </KeyboardAwareScrollView>
  );
});
