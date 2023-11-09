import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TextInput, View } from 'react-native';

import CountryPicker from 'react-native-country-picker-modal';

import { COLORS, Fonts, SF, SW } from '@/theme';
import { CustomKeyboard } from '@/screens/PosRetail3/CustomKeyBoard';
import { memo } from 'react';
import { moderateScale, moderateVerticalScale, ms, verticalScale } from 'react-native-size-matters';
import { strings } from '@/localization';
import { useState } from 'react';
import { dropdown } from '@/assets';

const { width, height } = Dimensions.get('window');

const SmsReceipt = ({ closeModal }) => {
  const [flag, setFlag] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  return (
    <View style={styles.calendarSettingModalContainer}>
      <View style={styles.textInputView}>
        <CountryPicker
          onSelect={(code) => {
            setFlag(code.cca2);
            if (code.callingCode?.length > 0) {
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
          maxLength={10}
          returnKeyType="done"
          keyboardType="number-pad"
          value={phoneNumber.trim()}
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.textInputContainer}
          placeholder={strings.verifyPhone.placeHolderText}
          placeholderTextColor={COLORS.darkGray}
          showSoftInputOnFocus={false}
        />
      </View>

      <CustomKeyboard
        maxCharLength={10}
        enteredValue={phoneNumber}
        setEnteredValue={setPhoneNumber}
        onClosePress={closeModal}
        onPayNowPress={() => {
          closeModal(countryCode, phoneNumber);
          setPhoneNumber(phoneNumber);
        }}
      />
    </View>
  );
};

export default memo(SmsReceipt);

const styles = StyleSheet.create({
  calendarSettingModalContainer: {
    flex: 1 / 1.3,
    backgroundColor: 'white',
    borderRadius: 7,
    alignItems: 'center',
    paddingVertical: verticalScale(15),
  },
  textInputView: {
    paddingHorizontal: ms(10),
    borderWidth: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: ms(40),
    width: ms(250),
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: 5,
  },
  dropDownIcon: {
    width: 7,
    height: 7,
    resizeMode: 'contain',
  },
  countryCodeText: {
    color: COLORS.black,
    fontSize: SF(18),
    fontFamily: Fonts.Regular,
    paddingHorizontal: moderateScale(8),
  },
  textInputContainer: {
    color: COLORS.black,
    fontSize: SF(16),
    fontFamily: Fonts.Italic,
    width: ms(150),
  },
});
