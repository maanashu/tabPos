import React, { useState } from 'react';
import { Text, Image, View, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Images } from '@mPOS/assets';
import { COLORS, SH } from '@/theme';
import { TYPES } from '@/Types/Types';
import { strings } from '@mPOS/localization';
import { Button, Spacer } from '@mPOS/components';
import { verifyPhone } from '@/actions/AuthActions';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import styles from './styles';

export function EnterPhoneNumber() {
  const dispatch = useDispatch();
  const [flag, setFlag] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');

  const onChangePhoneNumber = (phone) => setPhoneNumber(phone);

  const submit = () => {
    if (!phoneNumber) {
      CustomErrorToast({
        message: strings.validationMessages.emptyPhoneNumber,
      });
    } else {
      dispatch(verifyPhone(phoneNumber, countryCode));
    }
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_PHONE], state));

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Spacer space={SH(54)} />

        <Image source={Images.jobrLogo} style={styles.JobrLogoImageStyle} />

        <Spacer space={SH(54)} />

        <Image source={Images.phoneImage} style={styles.phoneImageStyle} />

        <Spacer space={SH(44)} />

        <Text style={styles.enterPhoneTextStyle}>{strings.phoneNumber.enterPhone}</Text>

        <Text style={styles.sendotpTextStyle}>{strings.phoneNumber.sendOtp}</Text>

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
            onChangeText={onChangePhoneNumber}
            placeholderTextColor={COLORS.gerySkies}
            placeholder={strings.phoneNumber.numberText}
          />
        </View>

        <View style={styles.container} />
        <Spacer space={SH(32)} />

        <Button
          onPress={submit}
          title={strings.phoneNumber.button}
          textStyle={{ color: phoneNumber ? COLORS.white : COLORS.dark_grey }}
          style={{
            backgroundColor: phoneNumber ? COLORS.primary : COLORS.textInputBackground,
          }}
        />
      </KeyboardAwareScrollView>

      {isLoading ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator color={COLORS.primary} size={'large'} style={styles.loaderViewStyle} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
