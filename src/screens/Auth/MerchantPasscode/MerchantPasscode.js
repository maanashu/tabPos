import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Spacer } from '@/components';
import { SH } from '@/theme';
import { styles } from '@/screens/Auth/MerchantPasscode/MerchantPasscode.styles';
import { strings } from '@/localization';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { digits } from '@/utils/validators';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { getAuthData } from '@/selectors/AuthSelector';
import { login, loginPosUser, merchantLogin } from '@/actions/AuthActions';
import { TYPES } from '@/Types/Types';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';

import { useNavigation } from '@react-navigation/native';
import { NAVIGATION } from '@/constants';
import { navigate } from '@/navigation/NavigationRef';

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
  const { posuser, from } = route.params;

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.MERCHANT_LOGIN], state)
  );

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
      const res = await dispatch(merchantLogin(data));
      if (res?.type === 'LOGIN_ERROR') {
        setValue('');
      } else if (res?.type === 'LOGIN_SUCCESS') {
        setValue('');
        navigate(NAVIGATION.posUsers);
      }
    }
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.verifyContainer}>
          <Spacer space={SH(25)} />
          <Text style={styles.subHeading}>{strings.passcode.heading}</Text>
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
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={styles.cellRoot}
              >
                <Text style={styles.cellText}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />

          <VirtualKeyBoard
            maxCharLength={4}
            enteredValue={value}
            setEnteredValue={setValue}
            isButtonLoading={isLoading}
            onPressContinueButton={passcodeHandler}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
