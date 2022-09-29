import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Spacer, Button } from '@/components';
import { SH } from '@/theme';
import { Fonts, dropdown } from '@/assets';
import { styles } from './VerifyPhone.styles';
import { strings } from '@/localization';
import CountryPicker from 'react-native-country-picker-modal';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function VerifyPhone() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const onChangePhoneNumber = phone => {
    setPhoneNumber(phone);
  };

  const verifyPhoneHandler = () => {
    navigate(NAVIGATION.verifyOtp);
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Spacer space={SH(100)} />
        <View style={styles.verifyContainer}>
          <Spacer space={SH(40)} />
          <View></View>
          <Text style={styles.header}>{strings.verifyPhone.heading}</Text>
          <Spacer space={SH(6)} />
          <Text style={styles.subHeading}>
            {strings.verifyPhone.subHeading}
          </Text>
          <Spacer space={SH(6)} />
          <View style={styles.textInputView}>
            <CountryPicker
              onSelect={code => {
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
              maxLength={10}
              returnKeyType="done"
              keyboardType="number-pad"
              value={phoneNumber}
              onChangeText={onChangePhoneNumber}
              style={styles.textInputContainer}
              placeholder={strings.verifyPhone.placeHolderText}
            />
          </View>
          <View style={{ flex: 1 }} />
          <Button
            onPress={verifyPhoneHandler}
            title={strings.verifyPhone.button}
            textStyle={phoneNumber ? styles.selectedText : styles.buttonText}
            style={phoneNumber ? styles.submitButton : styles.button}
          />
          <Spacer space={SH(40)} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
