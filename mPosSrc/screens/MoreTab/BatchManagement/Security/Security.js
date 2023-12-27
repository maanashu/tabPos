import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@mPOS/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import {
  checkArrow,
  checkboxSec,
  crossButton,
  googleAuth,
  securityLogo,
  teamMember,
  vector,
  vectorOff,
} from '@/assets';
import { Header, ScreenWrapper } from '@mPOS/components';

import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import {
  configureGoogleCode,
  configureGoogleCodeMPOS,
  getGoogleCode,
  getSettings,
  upadteApi,
  verifyGoogleCode,
  verifyGoogleCodeMPOS,
} from '@/actions/SettingAction';
import { TYPES } from '@/Types/SettingTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
const CELL_COUNT_Five = 5;
const CELL_COUNT = 6;
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { digits } from '@/utils/validators';
import { getAuthData } from '@/selectors/AuthSelector';
import { forgot2fa, getProfile, merchantLoginSuccess, reset2fa } from '@/actions/AuthActions';
import { styles } from './Security.styles';
import { ms } from 'react-native-size-matters';
import { VirtualKeyBoard } from '@mPOS/components/VirtualKeyBoard';
import { getUser } from '@/selectors/UserSelectors';

export function Security() {
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const refFive = useBlurOnFulfill({ value, cellCount: CELL_COUNT_Five });
  // const googleAuthenticator = getSettingData?.getSetting?.google_authenticator_status ?? false;
  const googleAuthenticator = getAuth?.getProfile?.user_profiles?.is_two_fa_enabled ?? false;
  const googleCode = getSettingData?.getGoogleCode;
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [factorEnable, setFactorEnable] = useState(null);
  const [googleAuthStart, setGoogleAuthStart] = useState(false);
  const [googleAuthScan, setGoogleAuthScan] = useState(false);
  const [sixDigit, setSixDigit] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [googleAuthicator, setGoogleAuthicator] = useState(googleAuthenticator);
  const [enableDisable2fa, setEnableDisable2fa] = useState(null);
  const qrCodeLoad = useSelector((state) => isLoadingSelector([TYPES.GET_GOOGLE_CODE], state));
  const getAuth = useSelector(getAuthData);
  const posData = useSelector(getUser);
  const loginPosUser = posData?.posLoginData;
  const TWO_FACTOR = getAuth?.getProfile?.user_profiles?.is_two_fa_enabled;

  const [forgotPinScreen, setForgotPinScreen] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [QRCodeUrl, setQRCodeUrl] = useState(null);
  const [isForgot, setIsForgot] = useState(null);
  const [forgotValue, setForgotValue] = useState('');
  const [qrCodeScreen, setQrCodeScreen] = useState(false);

  useEffect(() => {
    dispatch(getProfile(loginPosUser?.user_id));
  }, []);
  useEffect(() => {
    if (getSettingData?.getSetting) {
      setGoogleAuthicator(getAuth?.getProfile?.user_profiles?.is_two_fa_enabled ?? false);
    }
  }, [getAuth?.getProfile]);

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
      // const data = {
      //   token: value,
      //   status: googleAuthicator ? false : true,
      // };
      // const res = await dispatch(verifyGoogleCode(data));

      const data = {
        code: value,
      };
      const authToken = loginPosUser?.token;

      const verificationFunction = googleAuthicator ? verifyGoogleCode : configureGoogleCode;

      const res = await verificationFunction(data, authToken)(dispatch);
      if (res?.status_code === 201) {
        // const data = {
        //   app_name: 'pos',
        //   google_authenticator_status: factorEnable,
        // };
        // dispatch(upadteApi(data));
        // dispatch(getSettings());
        dispatch(getProfile(loginPosUser?.user_id));
        setSixDigit(false);
        setValue('');
      } else if (res === undefined) {
        setValue('');
      }
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
      const res = await dispatch(reset2fa(data));
      if (res?.status_code == 201) {
        setQRCodeUrl(res?.payload?.qrCode);
        setForgotPinScreen(false);
        setForgotValue('');
        setQrCodeScreen(true);
      }
    }
  };
  const toggleBtnHandler = (value) => {
    if (googleAuthicator === false) {
      // if (value == true) {
      //   setEnableDisable2fa(false);
      // } else {
      //   setEnableDisable2fa(true);
      // }
      setFactorEnable(true);
      setTwoStepModal(true), dispatch(getGoogleCode());
      setIsDisable(false);
    } else {
      // if (value == true) {
      //   setEnableDisable2fa(false);
      // } else {
      //   setEnableDisable2fa(true);
      // }
      setIsDisable(true);
      setSixDigit(true);
      setFactorEnable(false);
      // setGoogleAuthScan(true);
      // dispatch(getGoogleCode());
    }
  };
  const renderCell = ({ index }) => {
    const displaySymbol = value[index] ? '*' : '';

    return (
      <View key={index} style={styles.cellRoot} onLayout={getCellOnLayoutHandler(index)}>
        <Text style={styles.cellText}>{displaySymbol}</Text>
      </View>
    );
  };
  const onForgotPin = async () => {
    // setSixDigit(false);
    setForgotPinScreen(true);
    const res = await dispatch(forgot2fa());
    console.log(res);
    if (res?.status_code == 200) {
      setVerificationId(res?.payload?.verification_id);
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

  return (
    <SafeAreaView>
      <Header backRequired title={strings?.security.security} />
      <View style={{ paddingHorizontal: SW(20) }}>
        <Spacer space={SH(10)} />
        {sixDigit ? (
          <View
            style={[styles.verifyContainer, !forgotPinScreen && qrCodeScreen && { height: '82%' }]}
          >
            {sixDigit && !forgotPinScreen && !qrCodeScreen ? (
              <>
                <Spacer space={SH(25)} />
                <View style={[styles.flexRow]}>
                  <Text>{''}</Text>
                  <Text style={styles.subHeading}>{'Enter 6-Digit code'}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSixDigit(false), setValue('');
                    }}
                  >
                    <Image source={crossButton} style={styles.cross} />
                  </TouchableOpacity>
                </View>
                <Spacer space={SH(40)} />
                <CodeField
                  ref={ref}
                  {...prop}
                  value={value}
                  onChangeText={setValue}
                  cellCount={CELL_COUNT}
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
                <TouchableOpacity style={styles.forgotPin} onPress={() => onForgotPin()}>
                  <Text style={styles.forgotPinText}>Forgot Pin</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                {forgotPinScreen && !qrCodeScreen ? (
                  <>
                    <Spacer space={SH(25)} />
                    <View style={[styles.flexRowSix, styles.flexWidthSix]}>
                      <Text>{''}</Text>
                      <Text style={styles.subHeadingSix}>{'Enter forgot 5-Digit code'}</Text>
                      <TouchableOpacity onPress={() => onBackPressHandler('Forgot')}>
                        <Image source={crossButton} style={styles.crossSixNew} />
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
                    {/* <ActivityIndicator
                    size={'large'}
                    color={COLORS.navy_blue}
                    animating={reset2faLoader}
                    style={{ position: 'absolute', top: '50%' }}
                  /> */}
                  </>
                ) : (
                  <View style={styles.firstBox}>
                    <View style={[styles.flexRowSix, styles.flexWidthSix]}>
                      <Text>{''}</Text>
                      <Text style={styles.subHeadingSix}>{'Scan the code '}</Text>
                      <TouchableOpacity onPress={() => onBackPressHandler('Forgot')}>
                        <Image source={crossButton} style={styles.crossSixNew} />
                      </TouchableOpacity>
                    </View>
                    {QRCodeUrl == null ? (
                      <ActivityIndicator size="large" color={COLORS.navy_blue} />
                    ) : (
                      <Image source={{ uri: QRCodeUrl }} style={styles.scurityScanNew} />
                    )}
                    <Spacer space={SH(30)} />

                    <TouchableOpacity
                      style={[styles.nextButtonNew, { backgroundColor: COLORS.navy_blue }]}
                      onPress={() => {
                        setSixDigit(true);
                        setIsForgot(true);
                        setForgotPinScreen(false);
                        setQrCodeScreen(false);
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
              </>
            )}
          </View>
        ) : (
          <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
            <View style={styles.twoStepVerifiCon}>
              <Text style={styles.twoStepText}>{strings.settings.twoStepVerifiCon}</Text>
              <Spacer space={SH(10)} />
              <Text style={styles.securitysubhead}>{strings.settings.securitysubhead}</Text>
              <Spacer space={SH(20)} />
              <View style={styles.twoStepMemberCon}>
                <View style={styles.flexRow}>
                  <View style={styles.marginLeft}>
                    <View style={styles.flexRow}>
                      <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                        {strings.settings.teamMemeber}
                      </Text>
                      <TouchableOpacity
                        style={styles.vectorIconCon}
                        onPress={() => toggleBtnHandler(googleAuthicator)}
                      >
                        <Image
                          source={googleAuthicator ? vector : vectorOff}
                          style={styles.toggleSecurity}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                      {strings.settings.memeberEnable}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        <Modal animationType="fade" transparent={true} isVisible={twoStepModal || googleAuthScan}>
          {googleAuthScan ? (
            <View style={styles.modalMainView}>
              <View style={styles.modalHeaderCon}>
                <View style={styles.flexRow}>
                  <Text style={styles.twoStepTextHeading}>{strings.settings.enableSecurity}</Text>
                  <TouchableOpacity
                    style={styles.crossButtonCon}
                    onPress={() => setGoogleAuthScan(false)}
                  >
                    <Image source={crossButton} style={styles.crossButton} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.modalDataCon, { justifyContent: 'center', width: '100%' }]}>
                <View style={styles.scanCodeCon}>
                  <Text style={[styles.firstDownloader, { fontSize: SF(12), textAlign: 'center' }]}>
                    {strings.settings.qrCode}
                  </Text>
                </View>
                <Spacer space={SH(30)} />
                <View style={styles.scurityScanCon}>
                  {qrCodeLoad ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                  ) : (
                    <Image source={{ uri: googleCode?.qrCode }} style={styles.scurityScan} />
                  )}
                </View>
                <Spacer space={SH(30)} />
                <TouchableOpacity
                  style={[styles.checkoutButton, { backgroundColor: COLORS.primary, width: '80%' }]}
                  onPress={() => {
                    setTwoStepModal(false);
                    setGoogleAuthScan(false);
                    setSixDigit(true);
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
            </View>
          ) : (
            <View style={styles.modalMainView}>
              <View style={styles.modalHeaderCon}>
                <View style={styles.flexRow}>
                  <Text style={styles.twoStepTextHeading}>{strings.settings.enableSecurity}</Text>
                  <TouchableOpacity
                    style={styles.crossButtonCon}
                    onPress={() => setTwoStepModal(false)}
                  >
                    <Image source={crossButton} style={styles.crossButton} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.modalDataCon}>
                <Spacer space={SH(50)} />
                <Text style={styles.firstDownloader}>
                  {strings.settings.firstDownloader}
                  <Text style={styles.primaryClr}>Google Play Store </Text>or the{' '}
                  <Text style={styles.primaryClr}>iOS App Store</Text>
                </Text>
                <Spacer space={SH(50)} />

                <TouchableOpacity
                  style={googleAuthStart ? styles.googleAuthConSel : styles.googleAuthCon}
                  onPress={() => setGoogleAuthStart(!googleAuthStart)}
                >
                  <View style={styles.googleDispalyRow}>
                    <Image source={googleAuth} style={styles.googleAuth} />
                    <View style={styles.marginLeft}>
                      <Text style={styles.googleAuthText}>{strings.settings.googleAuth}</Text>
                      <Spacer space={SH(5)} />
                      <Text style={[styles.firstDownloader, { fontSize: SF(11) }]}>
                        {strings.settings.instead}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={{ flex: 1 }} />

                <View style={styles.buttonSetting}>
                  {/* <View style={styles.googleDispalyRow}>
                    <Image source={checkboxSec} style={styles.checkboxSec} />
                    <Text style={[styles.firstDownloader, styles.fontLeft]}>
                      {strings.settings.doLater}
                    </Text>
                  </View> */}
                  <Spacer space={SH(18)} />
                  <TouchableOpacity
                    style={
                      googleAuthStart
                        ? [
                            styles.checkoutButton,
                            { backgroundColor: COLORS.primary, width: '100%' },
                          ]
                        : [styles.checkoutButton, { width: '100%' }]
                    }
                    onPress={() => (setGoogleAuthStart(false), setGoogleAuthScan(true))}
                  >
                    <Text
                      style={
                        googleAuthStart
                          ? [styles.checkoutText, { color: COLORS.white }]
                          : styles.checkoutText
                      }
                    >
                      {strings.settings.next}
                    </Text>
                    <Image
                      source={checkArrow}
                      style={
                        googleAuthStart
                          ? [styles.checkArrow, { tintColor: COLORS.white }]
                          : styles.checkArrow
                      }
                    />
                  </TouchableOpacity>
                  <Spacer space={SH(35)} />
                </View>
              </View>
            </View>
          )}
        </Modal>
      </View>
    </SafeAreaView>
  );
}
