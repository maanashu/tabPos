import React, { useState, useEffect } from 'react';
import {
  Alert,
  Image,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { COLORS, Fonts, SH } from '@/theme';
import { TYPES } from '@/Types/Types';
import { crossButton, verifyGreen } from '@/assets';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { digits } from '@/utils/validators';
import { ScreenWrapper, Spacer } from '@/components';
import { getAuthData } from '@/selectors/AuthSelector';
import { getSetting } from '@/selectors/SettingSelector';
import { checkArrow, powerAuth, userImage } from '@/assets';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import {
  forgot2fa,
  getAllPosUsers,
  logoutFunction,
  merchantLoginSuccess,
  reset2fa,
} from '@/actions/AuthActions';
import { configureGoogleCode, getSettings, verifyGoogleCode } from '@/actions/SettingAction';

import { styles } from './POSUsers.styles';
import { useRef } from 'react';
import { useCallback } from 'react';
import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomHeader } from '@/screens/PosRetail3/Components';
import CustomHeaderPOSUsers from '../components/CustomHeaderPOSUsers';

moment.suppressDeprecationWarnings = true;
const CELL_COUNT_SIX = 6;
const CELL_COUNT_Five = 5;

export function POSUsers({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const getAuth = useSelector(getAuthData);
  const posUserArray = getAuth?.getAllPosUsersData?.pos_staff;
  const posUserArraydata = getAuth?.getAllPosUsersData;

  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const TWO_FACTOR = getAuth?.merchantLoginData?.user?.user_profiles?.is_two_fa_enabled;
  const refSix = useBlurOnFulfill({ value, cellCount: CELL_COUNT_SIX });
  const refFive = useBlurOnFulfill({ value, cellCount: CELL_COUNT_Five });
  const getSettingData = useSelector(getSetting);
  const googleAuthenticator = getSettingData?.getSetting?.google_authenticator_status ?? false;
  const googleCode = getSettingData?.getGoogleCode;
  const merchantData = getAuth?.merchantLoginData;
  const onEndReachedCalledDuringMomentum = useRef(false);
  const [value, setValue] = useState('');
  const [forgotValue, setForgotValue] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [googleAuthScan, setGoogleAuthScan] = useState(false);
  const [sixDigit, setSixDigit] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const [isSucessModalVis, setIsSuccessModalVis] = useState(false);
  const [forgotPinScreen, setForgotPinScreen] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [QRCodeUrl, setQRCodeUrl] = useState(null);
  const [isForgot, setIsForgot] = useState(null);
  const merchantToken = merchantData?.token;
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const getSuccessFlag = async () => {
    try {
      const successFlag = await AsyncStorage.getItem('success-flag');
      if (successFlag) {
        setIsSuccessModalVis(true);
        setTimeout(() => {
          setIsSuccessModalVis(false);
        }, 3000);
        await AsyncStorage.removeItem('success-flag');
      }
    } catch (error) {}
  };

  useEffect(() => {
    getSuccessFlag();
  }, []);

  useEffect(() => {
    // dispatch(getAllPosUsers(sellerID));
    if (isFocused) {
      dispatch(getSettings());
      useEffectFun();
    }
  }, [isFocused]);

  const useEffectFun = async () => {
    // if (TWO_FACTOR) {
    //   setSixDigit(true);
    //   setTwoFactorEnabled(true);
    //   setTwoStepModal(true);
    // } else {
    const data = {
      page: 1,
      limit: 10,
      seller_id: sellerID,
    };
    dispatch(getAllPosUsers(data));
    // }
  };

  const getPosUserLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_ALL_POS_USERS], state)
  );
  const qrCodeLoad = useSelector((state) => isLoadingSelector([TYPES.GET_GOOGLE_CODE], state));
  const forgot2faLoader = useSelector((state) => isLoadingSelector([TYPES.FORGOT_2FA], state));
  const reset2faLoader = useSelector((state) => isLoadingSelector([TYPES.RESET_2FA], state));

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
          confirmLogout();
        },
      },
    ]);
  };

  const confirmLogout = () => {
    // if (googleAuthenticator) {
    //   setTwoFactorEnabled(true);
    //   setSixDigit(true);
    //   setIsLogout(true);
    // } else {
    dispatch(logoutFunction());
    setIsLogout(false);
    setValue('');
    setTwoFactorEnabled(false);
    setTwoStepModal(false);
    setGoogleAuthScan(false);
    setSixDigit(false);
    // }
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
      enableSixAPIFunction();
    }
  };
  const enableSixAPIFunction = async () => {
    const data = {
      code: value,
    };
    const verificationFunction = TWO_FACTOR ? verifyGoogleCode : configureGoogleCode;

    const res = await verificationFunction(data, merchantToken)(dispatch);

    if (res?.msg === 'Code verified successfully') {
      if (isLogout) {
        dispatch(logoutFunction());
        setIsLogout(false);
        setValue('');
        setTwoFactorEnabled(false);
        setTwoStepModal(false);
        setGoogleAuthScan(false);
        setSixDigit(false);
      } else {
        var updatedData = merchantData;
        updatedData.user.user_profiles.is_two_fa_enabled = false;
        dispatch(merchantLoginSuccess(updatedData));
        setValue('');
        setTwoFactorEnabled(false);
        setTwoStepModal(false);
        setGoogleAuthScan(false);
        setSixDigit(false);
        const data = {
          page: 1,
          limit: 10,
          seller_id: sellerID,
        };
        dispatch(getAllPosUsers(data));
      }
    } else if (res === undefined) {
      setValue('');
    }
  };
  useEffect(() => {
    if (value && value.length >= 6) {
      enableSixAPIFunction();
    }
  }, [value]);
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
      forgotApiFunction();
    }
  };
  const forgotApiFunction = async () => {
    const data = {
      verification_id: verificationId,
      verification_otp: forgotValue,
    };
    const res = await dispatch(reset2fa(data, merchantToken));
    if (res?.status_code == 201) {
      setQRCodeUrl(res?.payload?.qrCode);
      setForgotPinScreen(false);
    }
  };
  useEffect(() => {
    if (forgotValue && forgotValue.length >= 5) {
      forgotApiFunction();
    }
  }, [forgotValue]);
  const crossHandler = () => {
    if (isLogout) {
      setTwoFactorEnabled(false);
      setSixDigit(false);
      setIsLogout(false);
    } else {
      dispatch(logoutFunction());
    }
  };
  // const isLoadingBottom = useSelector((state) =>
  //   isLoadingSelector([TYPES.GET_ALL_POS_USERS_PAGE], state)
  // );

  const renderStaffFooter = useCallback(
    () => (
      <View
        style={{
          marginBottom: ms(20),
        }}
      >
        {isLoadingBottom && (
          <ActivityIndicator
            style={{ marginVertical: 14 }}
            size={'large'}
            color={COLORS.blueLight}
          />
        )}
      </View>
    ),
    [isLoadingBottom]
  );
  const onLoadMoreProduct = useCallback(async () => {
    if (posUserArraydata?.current_page < posUserArraydata?.total_pages) {
      setIsLoadingBottom(true);
      const data = {
        page: posUserArraydata?.current_page + 1,
        limit: 10,
        seller_id: sellerID,
      };
      const Data = await dispatch(getAllPosUsers(data));
      if (Data) {
        setIsLoadingBottom(false);
      }
    }
  }, [posUserArray]);

  const onForgotPin = async () => {
    setSixDigit(false);
    setValue('');
    setForgotPinScreen(true);
    const res = await dispatch(forgot2fa(merchantToken));
    if (res?.status_code == 200) {
      setVerificationId(res?.payload?.verification_id);
    }
  };
  const onBackPressHandler = (type) => {
    if (type == 'Forgot') {
      setSixDigit(true);
      setForgotValue('');
      setIsForgot(false);
    }
  };

  return (
    <ScreenWrapper>
      {!twoFactorEnabled ? (
        <View style={styles.container}>
          <Spacer space={SH(10)} />
          <CustomHeaderPOSUsers showUserName={false} {...{ logoutHandler }} logoutButton />
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.welcomeTo}>
              Welcome to <Text style={{ fontFamily: Fonts.SemiBold }}>JOBR POS</Text>{' '}
            </Text>
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
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
              style={{
                height: '100%',
                marginHorizontal: ms(60),
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(NAVIGATION.posUserPasscode, {
                        posuser: item,
                        from: 'loginInitial',
                      })
                    }
                    style={styles.posUserCon}
                  >
                    <Image
                      source={
                        item.user?.user_profiles?.profile_photo
                          ? { uri: item.user?.user_profiles?.profile_photo }
                          : userImage
                      }
                      style={styles.profileImage}
                    />

                    <Spacer space={SH(10)} />
                    <Text style={styles.firstName} numberOfLines={1}>
                      {`${item.user?.user_profiles?.firstname} ${
                        item.user?.user_profiles?.lastname ?? ''
                      } `}
                    </Text>
                    <Spacer space={SH(6)} />
                    <Text style={styles.role} numberOfLines={4}>
                      {item.user?.user_roles?.map((data, index) => {
                        if (index === item.user?.user_roles?.length - 1) {
                          return `${data.role?.name}`;
                        } else {
                          return `${data.role?.name}, `;
                        }
                      })}
                    </Text>

                    <Spacer space={SH(24)} />
                    {item.user?.api_tokens.length > 0 && (
                      <>
                        <Text style={[styles.dateTime]}>
                          {moment(item.user?.api_tokens[0].updated_at).format('dddd, DD MMM YYYY')}
                        </Text>
                        <Text style={styles.dateTime}>
                          {moment(item.user?.api_tokens[0].updated_at).format('hh:mm a')}
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                );
              }}
              ListFooterComponent={renderStaffFooter}
              onEndReachedThreshold={0.1}
              onEndReached={() => (onEndReachedCalledDuringMomentum.current = true)}
              //  onMomentumScrollBegin={() => {}}
              onMomentumScrollEnd={() => {
                if (onEndReachedCalledDuringMomentum.current) {
                  onLoadMoreProduct();
                  onEndReachedCalledDuringMomentum.current = false;
                }
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
                <TouchableOpacity onPress={() => crossHandler()}>
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
                onPressContinueButton={passcodeHandlerSix}
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
      )}
      <ReactNativeModal
        isVisible={isSucessModalVis}
        backdropColor={COLORS.sky_grey}
        backdropOpacity={1}
        style={{
          backgroundColor: COLORS.sky_grey,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            width: ms(250),
            height: ms(200),
            borderRadius: ms(40),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLORS.white,
          }}
        >
          <Image
            style={{
              width: ms(40),
              height: ms(40),
              marginBottom: ms(15),
              resizeMode: 'contain',
            }}
            source={verifyGreen}
          />
          <Text
            style={{
              color: COLORS.navy_blue,
              textAlign: 'center',
              fontFamily: Fonts.Regular,
              fontSize: ms(22, 0.3),
              width: ms(150),
            }}
          >
            Successfully verified
          </Text>
        </View>
      </ReactNativeModal>
    </ScreenWrapper>
  );
}
