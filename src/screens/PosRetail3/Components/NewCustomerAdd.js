import React, { useState } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
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
import { getUserDetail, getUserDetailSuccess, sendInvitation } from '@/actions/RetailAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { useCallback } from 'react';
import { memo } from 'react';
import { useEffect } from 'react';
import { emailReg } from '@/utils/validators';

export const NewCustomerAdd = memo(({ crossHandler, comeFrom, sellerID }) => {
  const dispatch = useDispatch();
  const getRetailData = useSelector(getRetail);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const [monthDays, setmonthDays] = useState([]);
  const getuserDetailByNo = getRetailData?.getUserDetail;
  const [defaultFlag, setDefaultFlag] = useState('US');
  const [defaultCountryCode, setDefaultCountryCode] = useState('+1');
  const [defaultPhoneNumber, setDefaultPhoneNumber] = useState(
    getuserDetailByNo?.[0]?.phone_number
  );
  const [detailArea, setDetailArea] = useState(false);

  const customerPhoneSearchFun = useCallback(
    (customerphoneNumber) => {
      setSearchCustomer(customerphoneNumber);
      if (customerphoneNumber?.length > 9) {
        dispatch(getUserDetail(customerphoneNumber));
        Keyboard.dismiss();
        setDetailArea(true);
      } else if (customerphoneNumber?.length < 10) {
        dispatch(getUserDetailSuccess([]));
        setDetailArea(false);
      }
    },
    [searchCustomer]
  );

  const userDetalLoader = useSelector((state) => isLoadingSelector([TYPES.GET_USERDETAIL], state));

  const saveCustomer = () => {
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
        userPhoneNo: searchCustomer,
        userFirstname: firstName,
        userLastName: lastName,
        userEmailAdd: email,
      };
      dispatch(sendInvitation(data));
      clearInput();
      crossHandler();
    }
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

  return (
    <View style={[styles.customProductCon, { height: ms(330) }]}>
      <View style={styles.headerConCustomProduct}>
        {/* <Text style={styles.zeroText}>New Product Add to Cart</Text> */}
        <TouchableOpacity onPress={crossHandler}>
          <Image
            source={crossButton}
            style={[styles.crossButton, { tintColor: COLORS.solid_grey }]}
          />
        </TouchableOpacity>
        {getuserDetailByNo?.length == 0 && !detailArea ? null : getuserDetailByNo?.length > 0 &&
          detailArea ? null : (
          <TouchableOpacity
            style={[styles.addToCartCon, styles.newCutomersaveCon]}
            onPress={() => saveCustomer()}
          >
            <Text style={styles.addTocartText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ padding: ms(15) }}>
        <Text style={[styles.zeroText, { fontSize: ms(10), marginBottom: ms(5) }]}>Customer</Text>
        <Spacer space={SH(7)} />

        <View style={styles.searchCustomerCon}>
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
        </View>
        {userDetalLoader ? null : getuserDetailByNo?.length > 0 && detailArea ? (
          <Text style={[styles.customerNotSystem, { color: COLORS.primary }]}>
            {strings.retail.alreadyInsystem}
          </Text>
        ) : getuserDetailByNo?.length == 0 && !detailArea ? null : (
          <Text style={styles.customerNotSystem}>{strings.retail.customerNotSystem}</Text>
        )}

        <Spacer space={SH(7)} />
        {userDetalLoader ? (
          <View style={{ marginTop: ms(50) }}>
            <ActivityIndicator size="small" color={COLORS.primary} />
          </View>
        ) : (
          <View>
            {getuserDetailByNo?.length > 0 && detailArea ? (
              <View>
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
                      {getuserDetailByNo?.[0]?.first_name}
                    </Text>
                  </View>
                  <View style={{ width: ms(140) }}>
                    <Text style={styles.customerDarkLabel}>{strings.retail.lastName}</Text>
                    <Text style={styles.customerLightdata}>
                      {getuserDetailByNo?.[0]?.last_name}
                    </Text>
                  </View>
                </View>
                <Spacer space={SH(18)} />
                <View>
                  <Text style={styles.customerDarkLabel}>{strings.retail.phoneNumber}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }} pointerEvents="none">
                    <CountryPicker
                      countryCode={getuserDetailByNo?.[0]?.country ?? 'US'}
                      // withFilter
                      // withCallingCode
                      // disableNativeModal={true}
                      visible={false}
                    />
                    <Image source={dropdown} style={styles.dropDownIcon} />
                    {/* <Text style={styles.countryCodeText}>{countryCode}</Text> */}
                    <TextInput
                      maxLength={15}
                      returnKeyType={'done'}
                      keyboardType={'number-pad'}
                      value={getuserDetailByNo?.[0]?.phone_number}
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
                  <Text style={styles.customerLightdata}>{getuserDetailByNo?.[0]?.email}</Text>
                </View>
              </View>
            ) : getuserDetailByNo?.length == 0 && !detailArea ? null : (
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
                    placeholderTextColor={COLORS.gerySkies}
                    // showSoftInputOnFocus={false}
                  />
                </View>
                <Spacer space={SH(12)} />
                <Text style={styles.newCusAdd}>{strings.retail.emailAdd}</Text>
                <TextInput
                  placeholder="Email Here"
                  style={styles.phoneCodeNewCustomerView}
                  placeholderTextColor={COLORS.row_grey}
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
                  <View>
                    <Text style={styles.newCusAdd}>{strings.retail.firstName}</Text>
                    <TextInput
                      placeholder={strings.retail.name}
                      style={styles.newFirstName}
                      placeholderTextColor={COLORS.row_grey}
                      value={firstName}
                      onChangeText={setFirstName}
                    />
                  </View>

                  <View>
                    <Text style={styles.newCusAdd}>{strings.retail.lastName}</Text>
                    <TextInput
                      placeholder={strings.retail.name}
                      style={styles.newFirstName}
                      placeholderTextColor={COLORS.row_grey}
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
    </View>
  );
});