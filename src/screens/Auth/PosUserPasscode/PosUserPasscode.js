import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
  isLastFilledCell,
  MaskSymbol,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { COLORS, Fonts, SH } from '@/theme';
import { TYPES } from '@/Types/Types';
import { Spacer } from '@/components';
import { crossButton, userImage } from '@/assets';
import { strings } from '@/localization';
import { digits } from '@/utils/validators';
import { goBack } from '@/navigation/NavigationRef';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { loginPosUser } from '@/actions/UserActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import { styles } from '@/screens/Auth/PosUserPasscode/PosUserPasscode.styles';
import CustomHeaderPOSUsers from '../components/CustomHeaderPOSUsers';
import { forgot2fa, reset2fa } from '@/actions/AuthActions';
import { MPOS_NAVIGATION } from '@common/commonImports';
import { navigationRef } from '@mPOS/navigation/NavigationRef';

const CELL_COUNT = 4;

export function PosUserPasscode({ route }) {
  const dispatch = useDispatch();
  const getData = useSelector(getAuthData);
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
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const { posuser } = route.params;

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN_POS_USER], state));

  const passcodeHandler = async () => {
    if (!value) {
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.enterPassCode,
        visibilityTime: 2000,
      });
      return;
    } else if (value && value.length < 4) {
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
      let data = {
        merchant_id: getData?.merchantLoginData?.uniqe_id,
        pos_user_id: posuser.user_id.toString(),
        pos_security_pin: value,
      };
      dispatch(loginPosUser(data));
      // const res = await dispatch(loginPosUser(data));

      // if (res?.token) {
      //   if (!res?.user_profiles?.is_two_fa_enabled) {
      //     navigate(MPOS_NAVIGATION.twoFactorLogin, { userResponse: res });
      //   } else {
      //     dispatch(loginPosUserSuccess(res));
      //     dispatch(getSettings());
      //     dispatch(getProfile(res?.id));
      //   }
      // }
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

  // const passcodeHandlerFive = async () => {
  //   if (!forgotValue) {
  //     Toast.show({
  //       position: 'bottom',
  //       type: 'error_toast',
  //       text2: strings.valiadtion.enterPassCode,
  //       visibilityTime: 2000,
  //     });
  //     return;
  //   } else if (forgotValue && forgotValue.length < 5) {
  //     Toast.show({
  //       position: 'bottom',
  //       type: 'error_toast',
  //       text2: strings.valiadtion.validPasscode,
  //       visibilityTime: 2000,
  //     });
  //     return;
  //   } else if (forgotValue && digits.test(forgotValue) === false) {
  //     Toast.show({
  //       position: 'bottom',
  //       type: 'error_toast',
  //       text2: strings.valiadtion.validPasscode,
  //       visibilityTime: 2000,
  //     });
  //     return;
  //   } else {
  //     const data = {
  //       verification_id: verificationId,
  //       verification_otp: forgotValue,
  //     };
  //     const res = await dispatch(reset2fa(data, merchantToken));
  //     console.log('response', res);
  //     if (res?.status_code == 201) {
  //       setQRCodeUrl(res?.payload?.qrCode);
  //       setForgotPinScreen(false);
  //     }
  //   }
  // };
  // const onForgotPin = async () => {
  //   setSixDigit(false);
  //   setValue('');
  //   setForgotPinScreen(true);
  //   const res = await dispatch(forgot2fa(merchantToken));
  //   console.log(res);
  //   if (res?.status_code == 200) {
  //     setVerificationId(res?.payload?.verification_id);
  //   }
  // };
  // const onBackPressHandler = (type) => {
  //   if (type == 'Forgot') {
  //     setSixDigit(true);
  //     setForgotValue('');
  //     setIsForgot(false);
  //   }
  // };

  return (
    <View
      style={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* <View style={{ alignItems: 'center' }}>
          <Text style={styles.welcomeTo}>
            Welcome to <Text style={{ fontFamily: Fonts.SemiBold }}>JOBR POS</Text>
          </Text>
        </View> */}

        <View style={styles.verifyContainer}>
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <Spacer space={SH(16)} />

          <View style={{ alignItems: 'center' }}>
            <Image
              source={
                posuser.user?.user_profiles?.profile_photo
                  ? { uri: posuser.user?.user_profiles?.profile_photo }
                  : userImage
              }
              style={styles.profileImage}
            />

            <Spacer space={SH(10)} />
            <Text style={styles.firstName} numberOfLines={1}>
              {`${posuser.user?.user_profiles?.firstname} ${posuser.user?.user_profiles?.lastname} `}
            </Text>
            <Spacer space={SH(6)} />
            <Text style={styles.role} numberOfLines={3}>
              {posuser.user?.user_roles?.map((data, index) => {
                if (index === posuser.user?.user_roles?.length - 1) {
                  return `${data.role?.name}`;
                } else {
                  return `${data.role?.name}, `;
                }
              })}
            </Text>
          </View>
          <Spacer space={SH(16)} />

          <CodeField
            ref={ref}
            {...prop}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.alignSelfCenter}
            showSoftInputOnFocus={false}
            keyboardType={'number-pad'}
            textContentType={'oneTimeCode'}
            renderCell={renderCell}
          />

          <VirtualKeyBoard
            maxCharLength={4}
            enteredValue={value}
            setEnteredValue={setValue}
            isButtonLoading={isLoading}
            onPressContinueButton={passcodeHandler}
          />
          <Spacer space={SH(20)} />
          {/* </ScrollView> */}
        </View>
      </View>
    </View>
  );
}
