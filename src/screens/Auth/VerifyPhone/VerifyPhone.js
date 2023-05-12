import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, StatusBar } from 'react-native';
import { Spacer } from '@/components';
import { SH } from '@/theme';
import { dropdown } from '@/assets';
import { styles } from './VerifyPhone.styles';
import { strings } from '@/localization';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { digits } from '@/utils/validators';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { login, verifyPhone } from '@/actions/AuthActions';
import { TYPES } from '@/Types/Types';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';

export function VerifyPhone() {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [flag, setFlag] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const onChangePhoneNumber = phone => {
    setPhoneNumber(phone);
  };
  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.VERIFY_PHONE], state)
  );
  useEffect(() => {
    clearInput();
  }, []);
  const clearInput = () => {
    setPhoneNumber('');
  };

  const verifyPhoneHandler = () => {
    if (phoneNumber && phoneNumber.length > 5 && digits.test(phoneNumber)) {
      dispatch(verifyPhone(phoneNumber, countryCode));
    } else if (phoneNumber && phoneNumber.length < 5) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.validPhone,
        visibilityTime: 2000,
      });
      return;
    } else if (phoneNumber && digits.test(phoneNumber) === false) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.validPhone,
        visibilityTime: 2000,
      });
      return;
    } else {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.enterPhone,
        visibilityTime: 2000,
      });
      return;
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.verifyContainer}>
          <Spacer space={SH(25)} />
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
              maxLength={15}
              returnKeyType="done"
              keyboardType="number-pad"
              value={phoneNumber.trim()}
              onChangeText={onChangePhoneNumber}
              style={styles.textInputContainer}
              placeholder={strings.verifyPhone.placeHolderText}
              placeholderTextColor="#626262"
              showSoftInputOnFocus={false}
            />
          </View>

          <VirtualKeyBoard
            enteredValue={phoneNumber}
            setEnteredValue={setPhoneNumber}
            isButtonLoading={isLoading}
            onPressContinueButton={verifyPhoneHandler}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
