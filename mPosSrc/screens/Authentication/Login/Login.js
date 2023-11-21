import React, { useEffect, useState } from 'react';
import { View, Text, Keyboard, SafeAreaView, ActivityIndicator } from 'react-native';

import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SH } from '@/theme';
import { strings } from '@mPOS/localization';
import Header from './Components/Header';
import { Button, Spacer } from '@mPOS/components';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { BiometryTypes } from 'react-native-biometrics';

import { styles } from '@mPOS/screens/Authentication/Login/styles';
import { getAuthData } from '@/selectors/AuthSelector';
import { deviceLogin, loginPosUser } from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { rnBiometrics } from '@mPOS/navigation/Modals';

export function Login(props) {
  const CELL_COUNT = 4;
  const dispatch = useDispatch();
  const { posUser } = props?.route?.params;
  const getData = useSelector(getAuthData);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const hasPosTrue =
    posUser?.user?.user_profiles?.is_biometric &&
    posUser?.user?.user_profiles?.is_biometric?.some(
      (item) => item?.app_name === 'pos' && item?.status === true
    );

  useEffect(() => {
    if (hasPosTrue) {
      bioMetricLogin();
    }
  }, [hasPosTrue]);

  const onPressHandler = () => {
    if (!value || value.length < 4) {
      CustomErrorToast({ message: strings.validationMessages.emptyPinCode });
    } else {
      let data = {
        merchant_id: getData?.merchantLoginData?.uniqe_id,
        pos_user_id: posUser?.user_id.toString(),
        pos_security_pin: value,
      };
      dispatch(loginPosUser(data));
    }
  };

  const bioMetricLogin = () => {
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;

      if (available && biometryType === BiometryTypes.TouchID) {
        checkBioMetricKeyExists();
      } else if (available && biometryType === BiometryTypes.FaceID) {
        checkBioMetricKeyExists();
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        checkBioMetricKeyExists();
      } else {
        setBioMetricsAvailable(false);
      }
    });
  };

  const checkBioMetricKeyExists = () => {
    rnBiometrics.biometricKeysExist().then((resultObject) => {
      const { keysExist } = resultObject;
      if (keysExist) {
        promptBioMetricSignin();
      } else {
        createKeys();
      }
    });
  };

  const promptBioMetricSignin = () => {
    let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
    let payload = epochTimeSeconds + 'some message';
    rnBiometrics
      .createSignature({
        promptMessage: 'Sign in',
        payload: payload,
      })
      .then((resultObject) => {
        const { success, signature } = resultObject;

        if (success) {
          dispatch(deviceLogin(posUser?.user?.id));
        }
      });
  };

  const createKeys = () => {
    rnBiometrics.createKeys().then((resultObject) => {
      const { publicKey } = resultObject;
      promptBioMetricSignin();
      // sendPublicKeyToServer(publicKey);
    });
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN_POS_USER], state));

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.formContainer}>
        <Text style={styles.enterPinTextStyle}>{strings.login.enterPasscode}</Text>

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
          renderCell={({ index, symbol, isFocused }) => {
            const displaySymbol = value[index] ? '*' : '';
            return (
              <View key={index} style={[styles.cellRoot]} onLayout={getCellOnLayoutHandler(index)}>
                <Text style={styles.cellText}>{isFocused ? <Cursor /> : displaySymbol}</Text>
              </View>
            );
          }}
        />
      </View>

      <View style={styles.container} />

      <Button
        onPress={onPressHandler}
        title={strings.phoneNumber.button}
        textStyle={{ color: value ? COLORS.white : COLORS.dark_grey }}
        style={[
          styles.buttonStyle,
          { backgroundColor: value ? COLORS.primary : COLORS.textInputBackground },
        ]}
      />

      {isLoading ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator color={COLORS.primary} size={'large'} style={styles.loaderViewStyle} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
