import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Keyboard,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';

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
import {
  deviceLogin,
  loginPosUser,
  loginPosUserMPOS,
  loginPosUserSuccess,
} from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { rnBiometrics } from '@mPOS/navigation/Modals';
import { crossButton } from '@/assets';
import { VirtualKeyBoard } from '@mPOS/components/VirtualKeyBoard';
import { getSettings } from '@/actions/SettingAction';
import { useIsFocused } from '@react-navigation/native';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { MPOS_NAVIGATION } from '@common/commonImports';
import { getProfile, reset2fa } from '@/actions/AuthActions';
import DeviceInfo from 'react-native-device-info';
import { getUser } from '@/selectors/UserSelectors';
import { posLoginDetail } from '@/actions/DashboardAction';

export function Login(props) {
  const isFocused = useIsFocused();
  const CELL_COUNT = 4;
  const dispatch = useDispatch();
  const { posUser } = props?.route?.params;
  const deviceId = DeviceInfo.getUniqueId();

  const getAuth = useSelector(getAuthData);
  const getData = useSelector(getAuthData);
  const TWO_FACTOR = posUser?.user?.user_profiles?.is_two_fa_enabled;
  const googleAuthenticator = getAuth?.getProfile?.user_profiles?.is_two_fa_enabled ?? false;

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    DeviceInfo.getUniqueId().then((deviceId) => {
      const hasPosTrue =
        posUser?.user?.user_profiles?.is_biometric &&
        posUser?.user?.user_profiles?.is_biometric?.some(
          (item) => item?.app_name === 'pos' && item?.status === true && item?.device_id == deviceId
        );

      if (hasPosTrue) {
        bioMetricLogin();
      }
    });
  }, []);

  useEffect(() => {
    // dispatch(getAllPosUsers(sellerID));
    if (isFocused) {
      dispatch(getSettings());
      useEffectFun();
    }
  }, [isFocused]);

  const useEffectFun = async () => {
    if (TWO_FACTOR) {
      // setSixDigit(true);
      setTwoFactorEnabled(true);
      // setTwoStepModal(true);
    }
  };
  const onPressHandler = async () => {
    if (!value || value.length < 4) {
      CustomErrorToast({ message: strings.validationMessages.emptyPinCode });
    } else {
      apiFunction();
    }
  };
  const bioMetricLogin = () => {
    rnBiometrics.isSensorAvailable().then((resultObject) => {
      const { available, biometryType } = resultObject;

      if (
        available &&
        (biometryType === BiometryTypes.TouchID || biometryType === BiometryTypes.FaceID)
      ) {
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

  // const promptBioMetricSignin = () => {
  //   let epochTimeSeconds = Math.round(new Date().getTime() / 1000).toString();
  //   let payload = epochTimeSeconds + 'some message';
  //   rnBiometrics
  //     .createSignature({
  //       promptMessage: 'Sign in',
  //       payload: payload,
  //     })
  //     .then(resultObject => {
  //       const { success, signature } = resultObject;

  //       if (success) {
  //         dispatch(deviceLogin(props?.route?.params?.user_id));
  //       }
  //     });
  // };

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
          promptPasscode();
        } else {
        }
      })
      .catch((error) => {
        console.error('Biometric signature error:', error);
      });
  };

  const createKeys = () => {
    rnBiometrics.createKeys().then((resultObject) => {
      const { publicKey } = resultObject;
      promptBioMetricSignin();
    });
  };

  const promptPasscode = () => {
    // if (!twoFactorEnabled) {
    //   navigate(MPOS_NAVIGATION.twoFactorLogin, { deviceLogin: posUser?.user?.id });
    // } else {
    dispatch(deviceLogin(posUser?.user?.id));
    // }
  };

  // const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN_POS_USER], state));
  const apiFunction = async () => {
    setIsLoading(true);
    let data = {
      merchant_id: getData?.merchantLoginData?.uniqe_id,
      pos_user_id: posUser?.user_id.toString(),
      pos_security_pin: value,
    };
    const res = await dispatch(loginPosUserMPOS(data));
    setIsLoading(false);
    if (res?.type !== TYPES.LOGIN_POS_USER_ERROR) {
      // dispatch(posLoginDetail());
      if (TWO_FACTOR) {
        navigate(MPOS_NAVIGATION.twoFactorLogin, { userResponse: res });
      } else {
        dispatch(posLoginDetail());
        dispatch(loginPosUserSuccess(res));
        dispatch(getSettings());
        dispatch(getProfile(res?.id));
      }
    }
  };
  useEffect(() => {
    if (value && value.length >= 4) {
      apiFunction();
    }
  }, [value]);
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
