import React, { memo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Platform,
  SafeAreaView,
} from 'react-native';

import { moderateScale, ms } from 'react-native-size-matters';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Spacer } from '@mPOS/components';
import { strings } from '@/localization';
import { COLORS, Fonts, SF, SH, SW } from '@/theme';
import { digitWithDot, emailReg } from '@/utils/validators';
import { useDispatch, useSelector } from 'react-redux';
import {
  attachCustomer,
  attachServiceCustomer,
  customProductAdd,
  getUserDetail,
  getUserDetailSuccess,
} from '@/actions/RetailAction';
import CountryPicker from 'react-native-country-picker-modal';
import { getRetail } from '@/selectors/RetailSelectors';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { crossButton, dropdown } from '@/assets';

const ProductCustomerAdd = ({ crossHandler }) => {
  const textInputRef = useRef(null);
  const dispatch = useDispatch();
  const retailData = useSelector(getRetail);
  const presentCart = retailData?.cartFrom;
  const cartData = retailData?.getAllCart;
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [searchCustomer, setSearchCustomer] = useState('');
  const getuserDetailByNo = retailData?.getUserDetail;
  const userLength = Object.keys(getuserDetailByNo)?.length;
  const [invitationFirstName, setInvitationFirstName] = useState();
  const [invitationLastName, setInvitationLastName] = useState();
  const [invitationEmail, setInvitationEmail] = useState();
  const [defaultPhoneNumber, setDefaultPhoneNumber] = useState(
    getuserDetailByNo?.full_phone_number
  );
  const [detailArea, setDetailArea] = useState(false);

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

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

  useEffect(() => {
    dispatch(getUserDetailSuccess({}));
    setDetailArea(false);
  }, []);

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
      dispatch(presentCart === 'product' ? attachCustomer(data) : attachCustomer(data));
      clearInput();
      crossHandler();
    }
  };

  const saveCustomer = () => {
    if (getuserDetailByNo?.invitation?.firstName) {
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
      dispatch(attachCustomer(data));
      clearInput();
      crossHandler();
    } else {
      if (!invitationFirstName) {
        alert('Please enter first name');
      } else if (!invitationLastName) {
        alert('Please enter last name');
      } else if (!invitationEmail) {
        alert('Please enter email');
      } else if (invitationEmail && emailReg.test(invitationEmail) === false) {
        alert('Please enter valid  email');
      } else {
        const data = {
          cartId: cartData?.id,
          email: invitationEmail,
          phoneCode: countryCode,
          phoneNumber: searchCustomer,
          firstName: invitationFirstName,
          lastName: invitationLastName,
        };
        dispatch(attachCustomer(data));
        clearInput();
        crossHandler();
      }
    }
  };

  const clearInput = () => {
    setSearchCustomer(''), setFirstName(''), setLastName(''), setLastName('');
  };

  useEffect(() => {
    if (cartData?.user_details) {
      setCountryCode(cartData?.user_details?.phone_code || '+1');
      setSearchCustomer(cartData?.user_details?.phone_no || '');
    }
  }, []);

  useEffect(() => {
    if (getuserDetailByNo?.invitation) {
      setInvitationFirstName(getuserDetailByNo?.invitation?.firstname);
      setInvitationLastName(getuserDetailByNo?.invitation?.lastname);
      setInvitationEmail(getuserDetailByNo?.invitation?.email);
    }
  }, [getuserDetailByNo]);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.customProductCon}>
        <View style={styles.headerConCustomProduct}>
          <Text style={[styles.zeroText, { fontSize: ms(14), marginBottom: ms(5) }]}>Customer</Text>
          <TouchableOpacity onPress={crossHandler}>
            <Image
              source={crossButton}
              style={[styles.crossButton, { tintColor: COLORS.solid_grey }]}
            />
          </TouchableOpacity>
        </View>
        <View style={{ padding: ms(15), flex: 1 }}>
          <View style={styles.searchCustomerCon}>
            <CountryPicker
              onSelect={(code) => {
                setSearchCustomer('');
                setFlag(code.cca2);
                dispatch(getUserDetailSuccess({}));
                setDetailArea(false);
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
              value={searchCustomer}
              // onChangeText={(searchCustomer) => customerPhoneSearchFun(searchCustomer)}
              onChangeText={setSearchCustomer}
              style={styles.searchCustomerInput}
              placeholder="Customer Phone Number"
              placeholderTextColor={COLORS.gerySkies}
              keyboardType="number-pad"
              maxLength={10}
              ref={textInputRef}
            />
          </View>
          {userDetalLoader ? null : userLength > 0 && detailArea ? (
            <Text style={[styles.customerNotSystem, { color: COLORS.primary }]}>
              {strings.retail.alreadyInsystem}
            </Text>
          ) : userLength == 0 && !detailArea ? null : (
            <Text style={styles.customerNotSystem}>{strings.retail.customerNotSystem}</Text>
          )}

          <Spacer space={SH(7)} />
          {userDetalLoader ? (
            <View style={{ marginTop: ms(50) }}>
              <ActivityIndicator size="small" color={COLORS.primary} />
            </View>
          ) : (
            <View>
              {userLength > 0 && detailArea ? (
                getuserDetailByNo?.invitation?.id ? (
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
                        <TextInput
                          // placeholder={strings.retail.name}
                          style={{
                            fontFamily: Fonts.Medium,
                            fontSize: ms(12),
                            color: COLORS.navy_blue,
                            height: ms(30),
                          }}
                          placeholderTextColor={COLORS.grey}
                          value={invitationFirstName?.toString()}
                          onChangeText={setInvitationFirstName}
                          placeholder="First  Name"
                        />
                        {/* <Text style={styles.customerLightdata}>
                          {getuserDetailByNo?.invitation?.firstname}
                        </Text> */}
                      </View>
                      <View style={{ width: ms(140) }}>
                        <Text style={styles.customerDarkLabel}>{strings.retail.lastName}</Text>
                        <TextInput
                          // placeholder={strings.retail.name}
                          style={{
                            fontFamily: Fonts.Medium,
                            fontSize: ms(12),
                            color: COLORS.navy_blue,
                            height: ms(30),
                          }}
                          placeholderTextColor={COLORS.grey}
                          value={invitationLastName?.toString()}
                          onChangeText={setInvitationLastName}
                          placeholder="Last Name"
                        />
                        {/* <Text style={styles.customerLightdata}>
                          {getuserDetailByNo?.invitation?.lastname}
                        </Text> */}
                      </View>
                    </View>
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
                      <TextInput
                        // placeholder={strings.retail.name}
                        style={{
                          fontFamily: Fonts.Medium,
                          fontSize: ms(12),
                          color: COLORS.navy_blue,
                          height: ms(30),
                        }}
                        placeholderTextColor={COLORS.grey}
                        value={invitationEmail?.toString()}
                        onChangeText={setInvitationEmail}
                        placeholder="Email"
                        keyboardType="email-address"
                      />
                      {/* <Text style={styles.customerLightdata}>
                        {getuserDetailByNo?.invitation?.email}
                      </Text> */}
                    </View>
                  </View>
                ) : (
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
                        {getuserDetailByNo?.user_profile.user?.email}
                      </Text>
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
                        placeholder={strings.retail.firstName}
                        style={styles.newFirstName}
                        placeholderTextColor={COLORS.row_grey}
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </View>

                    <View>
                      <Text style={styles.newCusAdd}>{strings.retail.lastName}</Text>
                      <TextInput
                        placeholder={strings.retail.lastName}
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
          <View style={{ flex: 1 }} />
          {searchCustomer?.length > 9 &&
          cartData?.user_details?.phone_no == searchCustomer ? null : (
            <View>
              {userDetalLoader ? null : userLength == 0 && detailArea ? (
                <TouchableOpacity style={styles.addToCartCon} onPress={() => saveAndAddCustomer()}>
                  <Text style={styles.addTocartText}>Save</Text>
                </TouchableOpacity>
              ) : userLength > 0 && detailArea ? (
                <TouchableOpacity style={styles.addToCartCon} onPress={() => saveCustomer()}>
                  <Text style={styles.addTocartText}>Save</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default memo(ProductCustomerAdd);

const styles = StyleSheet.create({
  customProductCon: {
    backgroundColor: COLORS.white,
    borderRadius: ms(15),
    width: ms(330),
    height: ms(490),
    alignSelf: 'center',
    paddingVertical: ms(15),
    marginTop: ms(100),
  },
  headerConCustomProduct: {
    height: ms(40),
    borderColor: COLORS.solidGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ms(12),
  },
  crossButton: {
    width: SW(25),
    height: SW(25),
    resizeMode: 'contain',
  },
  addToCartCon: {
    backgroundColor: COLORS.primary,
    height: SH(55),
    padding: SH(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ms(3),
  },

  zeroText: {
    fontFamily: Fonts.SemiBold,
    color: COLORS.solid_grey,
    fontSize: ms(11),
  },
  searchCustomerCon: {
    borderWidth: 1,
    height: ms(55),
    borderRadius: 10,
    borderColor: COLORS.solidGrey,
    paddingHorizontal: ms(10),
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropDownIcon: {
    width: ms(7),
    height: ms(7),
    resizeMode: 'contain',
  },
  searchCustomerInput: {
    flex: 1,
    fontFamily: Fonts.Italic,
    fontSize: ms(12),
    color: COLORS.solid_grey,
  },
  customerNotSystem: {
    fontFamily: Fonts.Regular,
    fontSize: ms(7),
    color: COLORS.red,
    marginVertical: ms(4),
  },
  customerDarkLabel: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(12),
    color: COLORS.solid_grey,
  },
  customerLightdata: {
    fontFamily: Fonts.Regular,
    fontSize: ms(12),
    color: COLORS.darkGray,
    marginTop: ms(3),
  },
  textInputContainer: {
    color: COLORS.black,
    fontSize: SF(14),
    fontFamily: Fonts.Italic,
    flex: 1,
  },
  newCusAdd: {
    color: COLORS.dark_grey,
    fontSize: ms(10),
    fontFamily: Fonts.Medium,
    marginVertical: ms(6),
  },

  phoneCodeNewCustomerView: {
    paddingHorizontal: ms(10),
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: ms(47),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    fontFamily: Fonts.Italic,
    fontSize: ms(12),
  },

  newFirstName: {
    width: ms(140),
    height: ms(47),
    backgroundColor: COLORS.textInputBackground,
    borderRadius: 5,
    fontFamily: Fonts.Italic,
    paddingHorizontal: ms(10),
    fontSize: ms(12),
  },
  countryCodeText: {
    color: COLORS.solid_grey,
    fontSize: ms(14),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(8),
  },
  addTocartText: {
    color: COLORS.white,
    fontSize: SH(13),
    fontFamily: Fonts.Medium,
  },
});
