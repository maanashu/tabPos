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
import { getAllPosUsers, logoutFunction, merchantLoginSuccess } from '@/actions/AuthActions';
import { configureGoogleCode, getSettings, verifyGoogleCode } from '@/actions/SettingAction';

import { styles } from './POSUsers.styles';
import { useRef } from 'react';
import { useCallback } from 'react';
import { ms } from 'react-native-size-matters';
import ReactNativeModal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

moment.suppressDeprecationWarnings = true;
const CELL_COUNT_SIX = 6;

export function POSUsers({ navigation }) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const getAuth = useSelector(getAuthData);
  const posUserArray = getAuth?.getAllPosUsersData?.pos_staff;
  const posUserArraydata = getAuth?.getAllPosUsersData;
  const sellerID = getAuth?.merchantLoginData?.uniqe_id;
  const TWO_FACTOR = getAuth?.merchantLoginData?.user?.user_profiles?.is_two_fa_enabled;
  const refSix = useBlurOnFulfill({ value, cellCount: CELL_COUNT_SIX });
  const getSettingData = useSelector(getSetting);
  const googleAuthenticator = getSettingData?.getSetting?.google_authenticator_status ?? false;
  const merchantData = getAuth?.merchantLoginData;
  const onEndReachedCalledDuringMomentum = useRef(false);
  const [value, setValue] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoStepModal, setTwoStepModal] = useState(false);
  const [googleAuthScan, setGoogleAuthScan] = useState(false);
  const [sixDigit, setSixDigit] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoadingBottom, setIsLoadingBottom] = useState(false);
  const [isSucessModalVis, setIsSuccessModalVis] = useState(false);
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
    if (TWO_FACTOR) {
      setSixDigit(true);
      setTwoFactorEnabled(true);
      setTwoStepModal(true);
    } else {
      const data = {
        page: 1,
        limit: 10,
        seller_id: sellerID,
      };
      dispatch(getAllPosUsers(data));
    }
  };

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
          confirmLogout();
        },
      },
    ]);
  };

  const confirmLogout = () => {
    if (googleAuthenticator) {
      setTwoFactorEnabled(true);
      setSixDigit(true);
      setIsLogout(true);
    } else {
      dispatch(logoutFunction());
      setIsLogout(false);
      setValue('');
      setTwoFactorEnabled(false);
      setTwoStepModal(false);
      setGoogleAuthScan(false);
      setSixDigit(false);
    }
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
        code: value,
      };
      const verificationFunction = TWO_FACTOR ? verifyGoogleCode : configureGoogleCode;

      const res = await verificationFunction(data)(dispatch);

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
    }
  };

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
                      source={
                        item.user?.user_profiles?.profile_photo
                          ? { uri: item.user?.user_profiles?.profile_photo }
                          : userImage
                      }
                      style={styles.profileImage}
                    />

                    <Text style={styles.firstName} numberOfLines={1}>
                      {`${item.user?.user_profiles?.firstname} ${item.user?.user_profiles?.lastname} `}
                    </Text>
                    <Text style={styles.role} numberOfLines={1}>
                      {item.user?.user_roles?.length > 0
                        ? item.user?.user_roles?.map((item) => item.role?.name)
                        : 'admin'}
                    </Text>

                    {item.user?.api_tokens.length > 0 && (
                      <>
                        <Text style={[styles.dateTime, { marginTop: SH(10) }]}>
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
                      onPress={() =>
                        navigation.navigate(NAVIGATION.loginIntial, {
                          posuserdata: item,
                        })
                      }
                    >
                      <Image source={checkArrow} style={styles.arrowImage} />
                    </TouchableOpacity>
                  </View>
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
          {sixDigit && (
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
