import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from 'react-native-size-matters';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

import { SH } from '@/theme';
import { TYPES } from '@/Types/Types';
import { Spacer } from '@/components';
import { crossButton } from '@/assets';
import { strings } from '@/localization';
import { digits } from '@/utils/validators';
import { goBack } from '@/navigation/NavigationRef';
import { loginPosUser } from '@/actions/UserActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

import { styles } from '@/screens/Auth/PosUserPasscode/PosUserPasscode.styles';

const CELL_COUNT = 4;

export function PosUserPasscode({ route }) {
  const dispatch = useDispatch();
  const getData = useSelector(getAuthData);
  const [value, setValue] = useState('');
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
    }
  };

  return (
    <View
      style={{ flexGrow: 1 }}
      keyboardShouldPersistTaps={'handled'}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.verifyContainer}>
          <Spacer space={SH(20)} />
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', paddingRight: moderateScale(10) }}
            onPress={() => goBack()}
          >
            <Image source={crossButton} style={styles.cross} />
          </TouchableOpacity>

          <Text style={styles.subHeading}>{strings.passcode.heading}</Text>

          <Spacer space={SH(25)} />

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
            renderCell={({ index, symbol, isFocused }) => (
              <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
                <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
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
    </View>
  );
}
