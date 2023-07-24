import { getAllPosUsers, logoutFunction, merchantLoginSuccess } from '@/actions/AuthActions';
import { checkArrow, powerAuth, userImage } from '@/assets';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { COLORS, SH, SW, SF } from '@/theme';
import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert, Image } from 'react-native';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './POSUsers.styles';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { ActivityIndicator } from 'react-native';
import { ScreenWrapper, Spacer } from '@/components';
import Modal from 'react-native-modal';
import { useIsFocused } from '@react-navigation/native';
import { checkboxSec, crossButton, googleAuth } from '@/assets';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
import { getAuthData } from '@/selectors/AuthSelector';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getSetting } from '@/selectors/SettingSelector';
import { getGoogleCode, verifyGoogleCode } from '@/actions/SettingAction';

moment.suppressDeprecationWarnings = true;
const CELL_COUNT_SIX = 6;
import { digits } from '@/utils/validators';

export function POSUsers({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const getAuth = useSelector(getAuthData);
  const [value, setValue] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const posUserArray = getAuth?.getAllPosUsers;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const posUserArrayReverse = posUserArray?.reverse();

  const refSix = useBlurOnFulfill({ value, cellCount: CELL_COUNT_SIX });
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [googleAuthStart, setGoogleAuthStart] = useState(false);
  const [googleAuthScan, setGoogleAuthScan] = useState(false);
  const [sixDigit, setSixDigit] = useState(false);
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const getSettingData = useSelector(getSetting);
  const qrCodeLoad = useSelector((state) => isLoadingSelector([TYPES.GET_GOOGLE_CODE], state));
  const googleAuthenticator = getSettingData?.getSetting?.google_authenticator_status;
  const googleCode = getSettingData?.getGoogleCode;

  const merchantData = getAuth?.merchantLoginData;
  useEffect(() => {
    if (isFocused) {
      if (merchantData?.google_authenticator_status) {
        setTwoFactorEnabled(true);
        setTwoStepModal(true);
        dispatch(getGoogleCode());
      } else {
        dispatch(getAllPosUsers(sellerID));
      }
    }
  }, [isFocused]);

  const getPosUserLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ALL_POS_USERS], state)
  );

  const logoutHandler = () => {
    Alert.alert('Logout', 'Are you sure you want to logout ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          dispatch(logoutFunction());
        },
      },
    ]);
  };

  const passcodeHandlerSix = async () => {
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
        status: true,
      };
      const res = await dispatch(verifyGoogleCode(data));
      if (res?.type === 'VERIFY_GOOGLE_CODE_SUCCESS') {
        var updatedData = merchantData;
        updatedData.google_authenticator_status = false;
        dispatch(merchantLoginSuccess(updatedData));
        setValue('');
        setTwoFactorEnabled(false);
        setTwoStepModal(false);
        setGoogleAuthScan(false);
        setSixDigit(false);
        dispatch(getAllPosUsers(sellerID));
      } else if (res === undefined) {
        setValue('');
      }
    }
  };
  // const getCode=()=>{
  //       setGoogleAuthScan(true);
  //       dispatch(getGoogleCode());
  // }

  return (
    <ScreenWrapper>
      {!twoFactorEnabled ? (
        <View style={styles.container}>
          <View style={styles.flexRow}>
            <Text style={styles.posLoginHeader}>{strings.posUsersList.heading}</Text>
            <TouchableOpacity style={styles.logoutCon} onPress={() => logoutHandler()}>
              <Image source={powerAuth} style={styles.powerAuth} />
              <Text style={styles.logOut}>{strings.posUsersList.logOut}</Text>
            </TouchableOpacity>
          </View>

          {getPosUserLoading ? (
            <View style={{ marginTop: 50 }}>
              <ActivityIndicator size="large" color={COLORS.indicator} />
            </View>
          ) : posUserArray?.length === 0 ? (
            <View style={{ marginTop: 100 }}>
              <Text style={styles.posUserNot}>Pos user not found</Text>
            </View>
          ) : (
            <FlatList
              numColumns={4}
              data={posUserArray}
              extraData={posUserArray}
              scrollEnabled={true}
              contentContainerStyle={{ flexGrow: 1 }}
              style={{ height: '100%' }}
              renderItem={({ item }) => {
                return (
                  <View style={styles.posUserCon}>
                    <Spacer space={SH(10)} />
                    <Image
                      source={{ uri: item.user?.user_profiles?.profile_photo } ?? userImage}
                      style={styles.profileImage}
                    />
                    <Text style={styles.firstName}>{item.user?.user_profiles?.firstname}</Text>
                    <Text style={styles.role} numberOfLines={1}>
                      {item.user?.user_roles?.length > 0
                        ? item.user?.user_roles?.map((item, index) => item.role?.name)
                        : 'admin'}
                    </Text>
                    {item.user?.api_tokens.length > 0 && (
                      <>
                        <Text style={[styles.dateTime, { marginTop: SH(20) }]}>
                          {moment(item.user?.api_tokens[0].updated_at).format('dddd, DD MMM YYYY')}
                        </Text>
                        <Text style={styles.dateTime}>
                          {moment(item.user?.api_tokens[0].updated_at).format('hh:mm a')}
                        </Text>
                      </>
                    )}
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity
                      style={styles.arrowButonCon}
                      onPress={
                        () =>
                          // getAuth?.merchantLoginData?.user_profile?.wallet_steps >=
                          // 4
                          //   ?
                          navigation.navigate(NAVIGATION.loginIntial, {
                            posuserdata: item,
                          })

                        // : Toast.show({
                        //     text2: 'Merchant wallet not exits',
                        //     position: 'bottom',
                        //     type: 'error_toast',
                        //     visibilityTime: 1500,
                        //   })
                      }
                    >
                      <Image source={checkArrow} style={styles.arrowImage} />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}
        </View>
      ) : (
        <View style={styles.containerSix}>
          {sixDigit ? (
            <View style={styles.verifyContainerSix}>
              <Spacer space={SH(25)} />
              <View style={[styles.flexRowSix, styles.flexWidthSix]}>
                <Text>{''}</Text>
                <Text style={styles.subHeadingSix}>{'Enter 6-Digit code'}</Text>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(logoutFunction()), setSixDigit(false);
                  }}
                >
                  <Image source={crossButton} style={styles.crossSix} />
                </TouchableOpacity>
              </View>
              <Spacer space={SH(40)} />
              <CodeField
                ref={refSix}
                {...prop}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT_SIX}
                rootStyle={[styles.alignSelfCenterSix]}
                showSoftInputOnFocus={false}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
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
                onPressContinueButton={passcodeHandlerSix}
              />
            </View>
          ) : (
            <Modal
              animationType="fade"
              transparent={true}
              isVisible={twoStepModal || googleAuthScan}
            >
              {googleAuthScan ? (
                <View style={styles.modalMainView}>
                  <View style={styles.modalHeaderCon}>
                    <View style={styles.flexRowSix}>
                      <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                        {strings.settings.enableSecurity}
                      </Text>
                      <TouchableOpacity
                        style={styles.crossButtonCon}
                        onPress={() => {
                          dispatch(logoutFunction()), setGoogleAuthScan(false);
                        }}
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
                    <View style={styles.flexRowSix}>
                      <Text style={[styles.twoStepText, { fontSize: SF(20) }]}>
                        {strings.settings.enableSecurity}
                      </Text>
                      <TouchableOpacity
                        style={styles.crossButtonCon}
                        onPress={() => {
                          dispatch(logoutFunction()), setTwoStepModal(false);
                        }}
                      >
                        <Image source={crossButton} style={styles.crossButton} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.modalDataCon}>
                    <Spacer space={SH(50)} />
                    <Text style={styles.firstDownloader}>
                      {strings.settings.firstDownloader}
                      <Text style={styles.primaryClr}>Google Play Store </Text>
                      or the <Text style={styles.primaryClr}>iOS App Store</Text>
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
                          <Text
                            style={[styles.firstDownloader, { fontSize: SF(11), width: SW(120) }]}
                          >
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
          )}
        </View>
      )}
    </ScreenWrapper>
  );
}
