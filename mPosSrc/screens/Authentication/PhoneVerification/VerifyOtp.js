import React, { useState } from 'react';
import { Text, Image, View, Keyboard, SafeAreaView, ActivityIndicator } from 'react-native';

import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { COLORS, SH } from '@/theme';
import { Images } from '@mPOS/assets';
import { TYPES } from '@/Types/Types';
import { strings } from '@mPOS/localization';
import { Button, Spacer } from '@mPOS/components';
import { VerificationComponent } from './Components';
import { merchantLogin } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { goBack } from '@mPOS/navigation/NavigationRef';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import styles from './styles';
import { useEffect } from 'react';

export function VerifyOtp() {
  const dispatch = useDispatch();
  const getData = useSelector(getAuthData);
  const phone_no = getData?.phoneData?.phoneNumber;
  const phone_code = getData?.phoneData?.countryCode;

  const CELL_COUNT = 4;
  const [value, setValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const submit = () => {
    if (!value) {
      CustomErrorToast({ message: strings.validationMessages.emptyOtp });
    } else if (value && value.length < 4) {
      CustomErrorToast({ message: strings.validationMessages.otpLengthError });
    } else {
      apiFunction();
    }
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.MERCHANT_LOGIN], state));
  const apiFunction = async () => {
    const data = {
      type: 'phone',
      country_code: phone_code,
      phone_no: phone_no,
      pin: value,
    };
    dispatch(merchantLogin(data));
  };
  useEffect(() => {
    if (value && value.length >= 4) {
      apiFunction();
    }
  }, [value]);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Spacer space={SH(104)} />

        <Image source={Images.verifyOtp} style={styles.phoneImageStyle} />

        <Spacer space={SH(24)} />
        <Text style={styles.verifyNumberText}>{strings.phoneNumber.verify}</Text>

        <Text style={styles.phoneNumberTextStyle}>{strings.phoneNumber.phoneNumber}</Text>

        <Text style={styles.enterOtpTextStyle}>{strings.phoneNumber.enterOtp}</Text>

        <Spacer space={SH(20)} />
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          autoFocus={true}
          returnKeyType={'done'}
          cellCount={CELL_COUNT}
          onChangeText={setValue}
          keyboardType={'number-pad'}
          textContentType={'oneTimeCode'}
          onSubmitEditing={Keyboard.dismiss}
          rootStyle={styles.alignSelfCenter}
          renderCell={({ index, symbol, isFocused }) => {
            const displaySymbol = value[index] ? '*' : '';
            return (
              <View key={index} style={[styles.cellRoot]} onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.cellText}>{isFocused ? <Cursor /> : displaySymbol}</Text>
              </View>
            );
          }}
        />

        <View style={styles.container} />

        <Spacer space={SH(20)} />

        <Button
          onPress={submit}
          title={strings.phoneNumber.verifyButton}
          textStyle={{ color: value ? COLORS.white : COLORS.dark_grey }}
          style={{
            backgroundColor: value ? COLORS.primary : COLORS.textInputBackground,
          }}
        />

        <Spacer space={SH(20)} />

        <Button
          onPress={() => goBack()}
          title={strings.profile.header}
          textStyle={{ color: COLORS.dark_grey }}
          style={{ backgroundColor: COLORS.textInputBackground }}
        />
      </KeyboardAwareScrollView>

      <ReactNativeModal
        isVisible={showModal}
        animationIn={'slideInRight'}
        animationOut={'slideOutLeft'}
      >
        <VerificationComponent {...{ setShowModal }} />
      </ReactNativeModal>

      {isLoading ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator color={COLORS.primary} size={'large'} style={styles.loaderViewStyle} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
