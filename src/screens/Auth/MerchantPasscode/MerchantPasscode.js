import React, { useState } from 'react';
import { View, Text } from 'react-native';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { TYPES } from '@/Types/Types';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { SH } from '@/theme';
import { digits } from '@/utils/validators';
import { ms } from 'react-native-size-matters';
import { navigate } from '@/navigation/NavigationRef';
import { merchantLogin } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { styles } from '@/screens/Auth/MerchantPasscode/MerchantPasscode.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CELL_COUNT = 4;

export function MerchantPasscode({ route }) {
  const dispatch = useDispatch();
  const getData = useSelector(getAuthData);
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const phone_no = getData?.phoneData?.phoneNumber;
  const country_code = getData?.phoneData?.countryCode;

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.MERCHANT_LOGIN], state));

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
      const data = {
        phone_no: phone_no,
        country_code: country_code,
        pin: value,
      };
      storeSuccessFlag();
      const res = await merchantLogin(data)(dispatch);
      if (res?.type === 'MERCHANT_LOGIN_ERROR') {
        setValue('');
      } else if (res?.type === 'MERCHANT_LOGIN_SUCCESS') {
        setValue('');
        navigate(NAVIGATION.posUsers);
      }
    }
  };

  const storeSuccessFlag = async (value) => {
    try {
      await AsyncStorage.setItem('success-flag', 'true');
    } catch (e) {}
  };

  const renderCell = ({ index }) => {
    const displaySymbol = value[index] ? '*' : '';

    return (
      <View key={index} style={styles.cellRoot} onLayout={getCellOnLayoutHandler(index)}>
        <Text style={styles.cellText}>{displaySymbol}</Text>
      </View>
    );
  };

  return (
    <View
      style={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.verifyContainer}>
          <Spacer space={SH(25)} />

          <Text style={styles.heading}>{strings.verifyOtp.heading}</Text>
          <Spacer space={SH(10)} />
          <Text style={styles.subHeading}>{strings.passcode.heading}</Text>

          <Spacer space={SH(26)} />
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
            FLCntStyle={{
              alignItems: 'flex-start',
              marginLeft: ms(10),
            }}
            maxCharLength={4}
            enteredValue={value}
            setEnteredValue={setValue}
            isButtonLoading={isLoading}
            onPressContinueButton={passcodeHandler}
            screen={'passcode'}
          />
        </View>
      </View>
    </View>
  );
}
