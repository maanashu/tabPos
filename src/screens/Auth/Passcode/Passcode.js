import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Spacer } from '@/components';
import { SH } from '@/theme';
import { styles } from '@/screens/Auth/Passcode/Passcode.styles';
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
import { login, loginPosUser } from '@/actions/AuthActions';
import { TYPES } from '@/Types/Types';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';

import { CommonActions, useNavigation } from '@react-navigation/native';

const CELL_COUNT = 4;

export function Passcode({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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
    isLoadingSelector([TYPES.LOGIN], state)
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
      if (from === 'loginInitial') {
        let data = {
          merchant_id: getData?.getProfile?.unique_uuid,
          pos_user_id: posuser.id.toString(),
          pos_security_pin: value,
        };

        dispatch(
          loginPosUser(data, res => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'HOME' }],
              })
            );
          })
        );
      } else {
        const data = {
          phone_no: phone_no,
          country_code: country_code,
          pin: value,
        };
        const res = await dispatch(login(data));
        if (res?.type === 'LOGIN_ERROR') {
          setValue('');
        }
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
