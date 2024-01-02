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

import { Button, Spacer } from '@mPOS/components';
import { CustomErrorToast } from '@mPOS/components/Toast';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { BiometryTypes } from 'react-native-biometrics';

// import { styles } from '@mPOS/screens/Authentication/Login/styles';
import { getAuthData } from '@/selectors/AuthSelector';
import { deviceLogin, loginPosUser, loginPosUserSuccess } from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { rnBiometrics } from '@mPOS/navigation/Modals';
import { checkArrow, crossButton } from '@/assets';

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
import { forgot2fa, getProfile, reset2fa } from '@/actions/AuthActions';
import { styles } from '../../POSUsers/POSUsers.styles';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

export function TwoFactorLogin(props) {
  const isFocused = useIsFocused();
  const CELL_COUNT = 4;
  const CELL_COUNT_SIX = 6;

  const CELL_COUNT_Five = 5;
  const dispatch = useDispatch();
  const { userResponse } = props?.route?.params;

  const getAuth = useSelector(getAuthData);
  // const posUserArray = getAuth?.getAllPosUsersData?.pos_staff;
  // const posUserArraydata = getAuth?.getAllPosUsersData;
  // const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  // const TWO_FACTOR = getAuth?.merchantLoginData?.user?.user_profiles?.is_two_fa_enabled;

  const refSix = useBlurOnFulfill({ value, cellCount: CELL_COUNT_SIX });
  const refFive = useBlurOnFulfill({ value, cellCount: CELL_COUNT_Five });
  const getSettingData = useSelector(getSetting);
  const googleAuthenticator = getSettingData?.getSetting?.google_authenticator_status ?? false;
  const [googleAuthicator, setGoogleAuthicator] = useState(googleAuthenticator);
  // const merchantData = getAuth?.merchantLoginData;
  // const onEndReachedCalledDuringMomentum = useRef(false);
  // const [factorEnable, setFactorEnable] = useState(null);
  // const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  // const [twoStepModal, setTwoStepModal] = useState(false);
  // const [googleAuthScan, setGoogleAuthScan] = useState(false);
  const [sixDigit, setSixDigit] = useState(false);
  // const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');

  const [forgotPinScreen, setForgotPinScreen] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [QRCodeUrl, setQRCodeUrl] = useState(null);
  const [isForgot, setIsForgot] = useState(null);
  const [forgotValue, setForgotValue] = useState('');
  const [qrCodeScreen, setQrCodeScreen] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (isFocused) {
      setSixDigit(true);
      setForgotPinScreen(false);
      // dispatch(getSettings());
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
  const reset2faLoader = useSelector((state) => isLoadingSelector([TYPES.RESET_2FA], state));

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
      console.log('userResponse', userResponse);
      const authToken = userResponse?.token;
      // const verificationFunction = verifyGoogleCodeMPOS;
      const verificationFunction = googleAuthicator ? verifyGoogleCode : configureGoogleCode;
      const res = await verificationFunction(data, authToken)(dispatch);
      console.log('resss', res);
      setIsLoading(false);
      if (res?.status_code === 201) {
        dispatch(loginPosUserSuccess(userResponse));
        dispatch(getSettings());
        dispatch(getProfile(userResponse?.id));
      } else if (res === undefined) {
        setValue('');
      }
    }
  };

  const onForgotPin = async () => {
    setSixDigit(false);
    setForgotPinScreen(true);
    const authToken = userResponse?.token;
    const res = await dispatch(forgot2fa(authToken));
    console.log(res);
    if (res?.status_code == 200) {
      setVerificationId(res?.payload?.verification_id);
    }
  };
  const passcodeHandlerFive = async () => {
    if (!forgotValue) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.enterPassCode,
        visibilityTime: 2000,
      });
      return;
    } else if (forgotValue && forgotValue.length < 5) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.validPasscode,
        visibilityTime: 2000,
      });
      return;
    } else if (forgotValue && digits.test(forgotValue) === false) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.validPasscode,
        visibilityTime: 2000,
      });
      return;
    } else {
      const data = {
        verification_id: verificationId,
        verification_otp: forgotValue,
      };
      const authToken = userResponse?.token;

      const res = await dispatch(reset2fa(data, authToken));
      if (res?.status_code == 201) {
        setQRCodeUrl(res?.payload?.qrCode);
        setForgotPinScreen(false);
        setForgotValue('');
        setQrCodeScreen(true);
      }
    }
  };
  const onBackPressHandler = (type) => {
    if (type == 'Forgot') {
      setForgotPinScreen(false);
      setQrCodeScreen(false);
      setSixDigit(true);
      setForgotValue('');
      setIsForgot(false);
    }
  };
  const crossHandler = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerSix}>
        {sixDigit ? (
          <View style={styles.verifyContainerSix}>
            <Spacer space={SH(25)} />
            <View style={[styles.flexRowSix, styles.flexWidthSix]}>
              <Text>{''}</Text>
              <Text style={styles.subHeadingSix}>{'Enter 6-Digit code'}</Text>
              {/* <TouchableOpacity onPress={() => crossHandler()}>
                <Image source={crossButton} style={styles.crossSix} />
              </TouchableOpacity> */}
              <Text>{''}</Text>
            </View>

            <Spacer space={SH(40)} />

            <CodeField
              ref={refSix}
              {...prop}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT_SIX}
              rootStyle={styles.alignSelfCenterSix}
              showSoftInputOnFocus={false}
              keyboardType={'number-pad'}
              textContentType={'oneTimeCode'}
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={styles.cellRootSix}
                >
                  <Text style={styles.cellTextSix}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />

            <VirtualKeyBoard
              maxCharLength={6}
              enteredValue={value}
              setEnteredValue={setValue}
              onPressContinueButton={passcodeHandler}
            />
            <TouchableOpacity style={styles.forgotPin} onPress={() => onForgotPin()}>
              <Text style={styles.forgotPinText}>Forgot Pin</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.verifyContainerSix}>
            {forgotPinScreen ? (
              <>
                <Spacer space={SH(25)} />
                <View style={[styles.flexRowSix, styles.flexWidthSix]}>
                  <Text>{''}</Text>
                  <Text style={styles.subHeadingSix}>{'Enter forgot 5-Digit code'}</Text>
                  <TouchableOpacity onPress={() => onBackPressHandler('Forgot')}>
                    <Image source={crossButton} style={styles.crossSix} />
                  </TouchableOpacity>
                </View>

                <Spacer space={SH(40)} />

                <CodeField
                  ref={refFive}
                  {...prop}
                  value={forgotValue}
                  onChangeText={setForgotValue}
                  cellCount={CELL_COUNT_Five}
                  rootStyle={styles.alignSelfCenterSix}
                  showSoftInputOnFocus={false}
                  keyboardType={'number-pad'}
                  textContentType={'oneTimeCode'}
                  renderCell={({ index, symbol, isFocused }) => (
                    <View
                      onLayout={getCellOnLayoutHandler(index)}
                      key={index}
                      style={styles.cellRootSix}
                    >
                      <Text style={styles.cellTextSix}>
                        {symbol || (isFocused ? <Cursor /> : null)}
                      </Text>
                    </View>
                  )}
                />

                <VirtualKeyBoard
                  maxCharLength={5}
                  enteredValue={forgotValue}
                  setEnteredValue={setForgotValue}
                  onPressContinueButton={passcodeHandlerFive}
                  onBackPressHandler={() => {
                    onBackPressHandler('Forgot');
                  }}
                  screen="PickupPin"
                />
                <ActivityIndicator
                  size={'large'}
                  color={COLORS.navy_blue}
                  animating={reset2faLoader}
                  style={{ position: 'absolute', top: '50%' }}
                />
              </>
            ) : (
              <View style={styles.firstBox}>
                <View style={[styles.flexRowSix, styles.flexWidthSix]}>
                  <Text>{''}</Text>
                  <Text style={styles.subHeadingSix}>{'Scan the code '}</Text>
                  <TouchableOpacity onPress={() => onBackPressHandler('Forgot')}>
                    <Image source={crossButton} style={styles.crossSix} />
                  </TouchableOpacity>
                </View>
                {QRCodeUrl == null ? (
                  <ActivityIndicator size="large" color={COLORS.navy_blue} />
                ) : (
                  <Image source={{ uri: QRCodeUrl }} style={styles.scurityScan} />
                )}
                <Spacer space={SH(30)} />

                <TouchableOpacity
                  style={[styles.nextButtonNew, { backgroundColor: COLORS.navy_blue }]}
                  onPress={() => {
                    setSixDigit(true);
                    setIsForgot(true);
                  }}
                >
                  <Text style={[styles.checkoutText, { color: COLORS.white }]}>
                    {strings.settings.next}
                  </Text>
                  <Image
                    source={checkArrow}
                    style={[styles.checkArrow, { tintColor: COLORS.white }]}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>
      {isLoading ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator color={COLORS.primary} size={'large'} style={styles.loaderViewStyle} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
