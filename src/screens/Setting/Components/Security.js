import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, Linking } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  checkArrow,
  checkboxSec,
  CloudDonwload,
  crossButton,
  GAuth,
  googleAuth,
  Qr,
  securityLogo,
  teamMember,
  twoStepVerification,
  vector,
  vectorOff,
} from '@/assets';
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import {
  configureGoogleCode,
  getGoogleCode,
  getSettings,
  upadteApi,
  verifyGoogleCode,
} from '@/actions/SettingAction';
import { TYPES } from '@/Types/SettingTypes';
import { TYPES as TYPESS } from '@/Types/Types';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
const CELL_COUNT = 6;
const CELL_COUNT_Five = 5;
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
import { ms } from 'react-native-size-matters';
import { Platform } from 'react-native';
import { getUser } from '@/selectors/UserSelectors';

export function Security() {
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const getUserData = useSelector(getUser);
  const posUserData = getUserData?.posLoginData;
  const getAuth = useSelector(getAuthData);

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
  const qrCodeLoad = useSelector((state) => isLoadingSelector([TYPES.GET_GOOGLE_CODE], state));

  const TWO_FACTOR = getAuth?.merchantLoginData?.user?.user_profiles?.is_two_fa_enabled;
  const [forgotPinScreen, setForgotPinScreen] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [QRCodeUrl, setQRCodeUrl] = useState(null);
  const [isForgot, setIsForgot] = useState(null);
  const [forgotValue, setForgotValue] = useState('');
  const [qrCodeScreen, setQrCodeScreen] = useState(false);
  const merchantToken = getAuth?.merchantLoginData?.token;
  const posUserToken = posUserData?.token;

  useEffect(() => {
    dispatch(getProfile(posUserData?.id));
  }, []);
  useEffect(() => {
    if (getAuth?.getProfile) {
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

      // const data = {
      //   code: value,

      // };

      var data = {};
      data = googleAuthicator
        ? {
            code: value,
            disable_2fa: true,
          }
        : {
            code: value,
          };
      const verificationFunction = googleAuthicator ? verifyGoogleCode : configureGoogleCode;
      const res = await verificationFunction(data, posUserToken)(dispatch);
      if (res?.msg === 'Code verified successfully') {
        setValue('');
        // const data = {
        //   app_name: 'pos',
        //   google_authenticator_status: factorEnable,
        // };
        // dispatch(upadteApi(data));
        // dispatch(getSettings());
        dispatch(getProfile(posUserToken?.id));
        setSixDigit(false);
      } else if (res === undefined) {
        setValue('');
      }
    }
  };

  const toggleBtnHandler = () => {
    if (googleAuthicator === false) {
      setFactorEnable(true);
      setTwoStepModal(true), dispatch(getGoogleCode(posUserToken));
      setIsDisable(false);
    } else {
      setIsDisable(true);
      setSixDigit(true);
      setFactorEnable(false);
      // setGoogleAuthScan(true);
      // dispatch(getGoogleCode());
    }
  };
  const forgot2faLoader = useSelector((state) => isLoadingSelector([TYPESS.FORGOT_2FA], state));
  const reset2faLoader = useSelector((state) => isLoadingSelector([TYPESS.RESET_2FA], state));
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
    const res = await dispatch(forgot2fa(posUserToken));
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
      const res = await dispatch(reset2fa(data, posUserToken));
      if (res?.status_code == 201) {
        setQRCodeUrl(res?.payload?.qrCode);
        setForgotPinScreen(false);
        setForgotValue('');
        setQrCodeScreen(true);
      }
    }
  };
  return (
    <View>
      <Spacer space={SH(10)} />
      {sixDigit ? (
        <View style={styles.verifyContainer}>
          {sixDigit && !forgotPinScreen && !qrCodeScreen ? (
            <>
              <Spacer space={SH(25)} />
              <View style={[styles.flexRow, styles.flexWidth]}>
                <Text>{''}</Text>
                <Text style={[styles.subHeading]}>{'Enter 6-Digit code'}</Text>
                <Text></Text>
                {/* <TouchableOpacity
              onPress={() => {
                setSixDigit(false), setValue('');
              }}
            >
              <Image source={crossButton} style={styles.cross} />
            </TouchableOpacity> */}
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
                screen={'PickupPin'}
                onBackPressHandler={() => setSixDigit(false)}
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
          <Image source={twoStepVerification} style={styles.securityLogo} resizeMode="contain" />
          <View style={styles.twoStepVerifiCon}>
            <Text style={styles.twoStepText}>{strings.settings.twoStepVerifiCon}</Text>
            <Spacer space={SH(10)} />
            <Text style={styles.securitysubhead}>{strings.settings.securitysubhead}</Text>
            <Spacer space={SH(20)} />
            <View
              style={[
                styles.twoStepMemberCon,
                { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
              ]}
            >
              <View>
                <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                  {strings.settings.teamMemeber}
                </Text>
                <Spacer space={SH(5)} />

                <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                  {strings.settings.memeberEnable}
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  style={[styles.vectorIconCon, { alignSelf: 'flex-end' }]}
                  onPress={() => toggleBtnHandler()}
                >
                  <Image
                    source={googleAuthicator ? vector : vectorOff}
                    style={[
                      styles.toggleSecurity,
                      googleAuthicator && { tintColor: COLORS.navy_blue },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      <Modal animationType="fade" transparent={true} isVisible={twoStepModal || googleAuthScan}>
        {googleAuthScan ? (
          <View style={styles.modalMainViewNew}>
            <TouchableOpacity
              style={[styles.crossButtonCon, { position: 'absolute', top: 10 }]}
              onPress={() => {
                setTwoStepModal(true), setGoogleAuthScan(false);
              }}
            >
              <Image source={crossButton} style={styles.crossButton} />
            </TouchableOpacity>
            {/* <View style={styles.modalHeaderCon}>
              <View style={styles.flexRow}>
                <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                  {strings.settings.enableSecurity}
                </Text>
                <TouchableOpacity
                  style={styles.crossButtonCon}
                  onPress={() => setGoogleAuthScan(false)}
                >
                  <Image source={crossButton} style={styles.crossButton} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.modalDataCon, { justifyContent: 'center' }]}>
              <View style={styles.scanCodeCon}>
                <Text style={[styles.firstDownloader, { fontSize: SF(11) }]}>
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
                style={[styles.checkoutButton, { backgroundColor: COLORS.primary }]}
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
            </View> */}

            <View style={{ flex: 1 }}>
              <View style={styles.firstBox}>
                <Image source={GAuth} style={{ width: ms(30), height: ms(30) }} />
                <Text style={[styles.twoStepText, { textAlign: 'center' }]}>
                  {strings.settings.enableSecurityNew}
                </Text>
                <Text style={[styles.firstDownloader, { textAlign: 'center' }]}>
                  {strings.settings.securityStep2}
                </Text>
              </View>
            </View>
            <View style={styles.firstBox}>
              {qrCodeLoad ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <Image source={{ uri: googleCode?.qrCode }} style={styles.scurityScan} />
              )}
              <Spacer space={SH(30)} />
              <TouchableOpacity
                style={[styles.nextButtonNew, { backgroundColor: COLORS.navy_blue }]}
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
            {/* <View style={styles.modalHeaderCon}>
              <View style={styles.flexRow}>
                <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                  {strings.settings.enableSecurity}
                </Text>
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
                <View style={styles.dispalyRow}>
                  <Image source={googleAuth} style={styles.googleAuth} />
                  <View style={styles.marginLeft}>
                    <Text style={styles.googleAuthText}>{strings.settings.googleAuth}</Text>
                    <Spacer space={SH(5)} />
                    <Text style={[styles.firstDownloader, { fontSize: SF(11), width: SW(120) }]}>
                      {strings.settings.instead}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={{ flex: 1 }} />

              <View style={styles.buttonSetting}>
                <View style={styles.dispalyRow}>
                  <Image source={checkboxSec} style={styles.checkboxSec} />
                  <Text style={[styles.firstDownloader, styles.fontLeft]}>
                    {strings.settings.doLater}
                  </Text>
                </View>
                <Spacer space={SH(18)} />
                <TouchableOpacity
                  style={
                    googleAuthStart
                      ? [styles.checkoutButton, { backgroundColor: COLORS.primary }]
                      : styles.checkoutButton
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
            </View> */}

            <View style={styles.firstBox}>
              {/* <TouchableOpacity
                style={styles.crossButtonCon}
                onPress={() => setTwoStepModal(false)}
              >
                <Image source={crossButton} style={styles.crossButton} />
              </TouchableOpacity> */}
              {/* <Spacer space={SH(20)} /> */}
              <Image source={GAuth} style={{ width: ms(30), height: ms(30) }} />
              {/* <Spacer space={SH(20)} /> */}
              <Text style={styles.twoStepText}>{strings.settings.enableSecurityNew}</Text>
              {/* <Spacer space={SH(20)} /> */}
              <Text style={styles.firstDownloader}>
                {strings.settings.securityStep1 + `\n`}
                <Text style={styles.primaryClr}>Google Play Store </Text>
                or the <Text style={styles.primaryClr}>iOS App Store</Text>
              </Text>
            </View>
            <View style={styles.secondBox}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    Platform.OS == 'ios'
                      ? 'https://apps.apple.com/au/app/google-authenticator/id388497605'
                      : 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US'
                  )
                }
              >
                <Image source={CloudDonwload} style={{ width: ms(30), height: ms(30) }} />
              </TouchableOpacity>
              <Text style={styles.downloadText}>{strings.settings.donwloadGoogleAuth}</Text>
            </View>

            <View style={styles.thirdBox}>
              <TouchableOpacity onPress={() => setTwoStepModal(false)} style={styles.firstButton}>
                <Text style={styles.buttonText}>{strings.settings.doLater}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => (setGoogleAuthStart(false), setGoogleAuthScan(true))}
                style={styles.secondButton}
              >
                <Text style={[styles.buttonText, { color: COLORS.white }]}>
                  {strings.settings.activate}
                </Text>
                <Image source={Qr} style={{ width: ms(15), height: ms(15), marginLeft: ms(4) }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}
