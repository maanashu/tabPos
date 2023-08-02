import React, { useEffect, useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
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
import { getSetting } from '@/selectors/SettingSelector';
import { useDispatch, useSelector } from 'react-redux';
import { getGoogleCode, getSettings, upadteApi, verifyGoogleCode } from '@/actions/SettingAction';
import { TYPES } from '@/Types/SettingTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
const CELL_COUNT = 6;
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { digits } from '@/utils/validators';

export function Security() {
  const dispatch = useDispatch();
  const getSettingData = useSelector(getSetting);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const googleAuthenticator = getSettingData?.getSetting?.google_authenticator_status;
  const googleCode = getSettingData?.getGoogleCode;
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [googleAuthStart, setGoogleAuthStart] = useState(false);
  const [googleAuthScan, setGoogleAuthScan] = useState(false);
  const [sixDigit, setSixDigit] = useState(false);
  const [googleAuthicator, setGoogleAuthicator] = useState(googleAuthenticator);
  const qrCodeLoad = useSelector((state) => isLoadingSelector([TYPES.GET_GOOGLE_CODE], state));

  // console.log('googleAuthenticator', getSettingData);

  useEffect(() => {
    if (getSettingData?.getSetting) {
      setGoogleAuthicator(getSettingData?.getSetting?.google_authenticator_status);
    }
  }, [getSettingData?.getSetting]);

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
      const data = {
        token: value,
        status: googleAuthicator ? false : true,
      };

      const res = await dispatch(verifyGoogleCode(data));
      if (res?.type === 'VERIFY_GOOGLE_CODE_SUCCESS') {
        setValue('');
        dispatch(getSettings());
        setSixDigit(false);
      } else if (res === undefined) {
        setValue('');
      }
    }
  };

  const toggleBtnHandler = () => {
    if (googleAuthicator === false) {
      setTwoStepModal(true), dispatch(getGoogleCode());
    } else {
      setGoogleAuthScan(true);
      dispatch(getGoogleCode());
    }
  };

  return (
    <View>
      <View style={[styles.flexRow, { height: SW(8) }]}>
        <Text style={styles.HeaderLabelText}>{strings.settings.security}</Text>
      </View>
      <Spacer space={SH(20)} />
      {sixDigit ? (
        <View style={styles.verifyContainer}>
          <Spacer space={SH(25)} />
          <View style={[styles.flexRow, styles.flexWidth]}>
            <Text>{''}</Text>
            <Text style={styles.subHeading}>{'Enter 6-Digit code'}</Text>
            <TouchableOpacity onPress={() => setSixDigit(false)}>
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
            renderCell={({ index, symbol, isFocused }) => (
              <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
                <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
              </View>
            )}
          />

          <VirtualKeyBoard
            maxCharLength={6}
            enteredValue={value}
            setEnteredValue={setValue}
            onPressContinueButton={passcodeHandler}
          />
        </View>
      ) : (
        <View style={styles.securityMainCon}>
          <View style={styles.securityBodyCon}>
            <View style={[styles.dispalyRow, { alignItems: 'flex-start' }]}>
              <Image source={securityLogo} style={styles.securityLogo} />
              <View style={styles.twoStepVerifiCon}>
                <Text style={styles.twoStepText}>{strings.settings.twoStepVerifiCon}</Text>
                <Spacer space={SH(10)} />
                <Text style={styles.securitysubhead}>{strings.settings.securitysubhead}</Text>
                <Spacer space={SH(20)} />
                <View style={styles.twoStepMemberCon}>
                  <View style={styles.flexRow}>
                    <View style={styles.dispalyRow}>
                      <Image source={teamMember} style={styles.teamMember} />
                      <View style={styles.marginLeft}>
                        <Text style={[styles.twoStepText, { fontSize: SF(14) }]}>
                          {strings.settings.teamMemeber}
                        </Text>
                        <Text style={[styles.securitysubhead, { fontSize: SF(12) }]}>
                          {strings.settings.memeberEnable}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.vectorIconCon}
                      onPress={() => toggleBtnHandler()}
                    >
                      <Image
                        source={googleAuthicator ? vector : vectorOff}
                        style={styles.toggleSecurity}
                      />
                    </TouchableOpacity>
                  </View>
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
            </View>
          </View>
        ) : (
          <View style={styles.modalMainView}>
            <View style={styles.modalHeaderCon}>
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
            </View>
          </View>
        )}
      </Modal>
    </View>
  );
}
