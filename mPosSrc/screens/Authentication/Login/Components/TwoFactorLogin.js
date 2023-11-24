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
import Header from './Header';
import { Button, Spacer } from '@mPOS/components';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { BiometryTypes } from 'react-native-biometrics';

import { styles } from '@mPOS/screens/Authentication/Login/styles';
import { getAuthData } from '@/selectors/AuthSelector';
import { deviceLogin, loginPosUser, loginPosUserSuccess } from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { rnBiometrics } from '@mPOS/navigation/Modals';
import { crossButton } from '@/assets';
import { VirtualKeyBoard } from '@mPOS/components/VirtualKeyBoard';
import {
  configureGoogleCode,
  getSettings,
  verifyGoogleCode,
  verifyGoogleCodeMPOS,
} from '@/actions/SettingAction';
import { useIsFocused } from '@react-navigation/native';
import { getSetting } from '@/selectors/SettingSelector';
import { useRef } from 'react';
import { digits } from '@/utils/validators';
import { getProfile } from '@/actions/AuthActions';

export function TwoFactorLogin(props) {
  const isFocused = useIsFocused();
  const CELL_COUNT = 4;
  const CELL_COUNT_SIX = 6;
  const dispatch = useDispatch();
  const { userResponse } = props?.route?.params;

  const getAuth = useSelector(getAuthData);
  const posUserArray = getAuth?.getAllPosUsersData?.pos_staff;
  const posUserArraydata = getAuth?.getAllPosUsersData;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const TWO_FACTOR = getAuth?.merchantLoginData?.user?.user_profiles?.is_two_fa_enabled;

  const refSix = useBlurOnFulfill({ value, cellCount: CELL_COUNT_SIX });
  const getSettingData = useSelector(getSetting);
  const googleAuthenticator = getSettingData?.getSetting?.google_authenticator_status ?? false;
  const [googleAuthicator, setGoogleAuthicator] = useState(googleAuthenticator);
  const merchantData = getAuth?.merchantLoginData;
  const onEndReachedCalledDuringMomentum = useRef(false);
  const [factorEnable, setFactorEnable] = useState(null);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [googleAuthScan, setGoogleAuthScan] = useState(false);
  const [sixDigit, setSixDigit] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (isFocused) {
      dispatch(getSettings());
      // useEffectFun();
    }
  }, [isFocused]);

  // const useEffectFun = async () => {
  //   if (TWO_FACTOR) {
  //     setSixDigit(true);
  //     setTwoFactorEnabled(true);
  //     setTwoStepModal(true);
  //   }
  // };

  // const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN_POS_USER], state));
  const renderCell = ({ index }) => {
    const displaySymbol = value[index] ? '*' : '';

    return (
      <View key={index} style={styles.cellRoot} onLayout={getCellOnLayoutHandler(index)}>
        <Text style={styles.cellText}>{displaySymbol}</Text>
      </View>
    );
  };
  const passcodeHandler = async () => {
    if (!value) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.enterPassCode,
        visibilityTime: 2000,
      });
      return;
    } else if (value && value.length < 6) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.validPasscode,
        visibilityTime: 2000,
      });
      return;
    } else if (value && digits.test(value) === false) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.validPasscode,
        visibilityTime: 2000,
      });
      return;
    } else {
      setIsLoading(true);
      const data = {
        code: value,
      };
      const authToken = userResponse?.token;
      const verificationFunction = verifyGoogleCodeMPOS;
      const res = await verificationFunction(data, authToken)(dispatch);
      // console.log('Dsaasd--TWO_FACTOR', res);
      setIsLoading(false);
      if (res?.data?.status_code === 201) {
        dispatch(loginPosUserSuccess(userResponse));
        dispatch(getSettings());
        dispatch(getProfile(userResponse?.id));
      } else if (res === undefined) {
        setValue('');
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.verifyContainer}>
        <Spacer space={SH(25)} />
        <View style={[styles.flexRow]}>
          <Text>{''}</Text>
          <Text style={styles.subHeading}>{'Enter 6-Digit code'}</Text>
        </View>
        <Spacer space={SH(40)} />
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT_SIX}
          rootStyle={[styles.alignSelfCenter]}
          showSoftInputOnFocus={false}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />

        <VirtualKeyBoard
          maxCharLength={6}
          enteredValue={value}
          setEnteredValue={setValue}
          onPressContinueButton={passcodeHandler}
        />
      </View>

      {isLoading ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator color={COLORS.primary} size={'large'} style={styles.loaderViewStyle} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
