import React, { useState } from 'react';
import { View, Text, Keyboard, SafeAreaView, ActivityIndicator } from 'react-native';

import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';

import { COLORS, SH } from '@/theme';
import { strings } from '@mPOS/localization';
import Header from './Components/Header';
import { Button, Spacer } from '@mPOS/components';
import { CustomErrorToast } from '@mPOS/components/Toast';

import { styles } from '@mPOS/screens/Authentication/Login/styles';
import { getAuthData } from '@/selectors/AuthSelector';
import { loginPosUser } from '@/actions/UserActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';

export function Login(props) {
  const CELL_COUNT = 4;
  const dispatch = useDispatch();
  const { posUser } = props?.route?.params;
  const getData = useSelector(getAuthData);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onPressHandler = () => {
    if (!value || value.length < 4) {
      CustomErrorToast({ message: strings.validationMessages.emptyPinCode });
    } else {
      let data = {
        merchant_id: getData?.merchantLoginData?.uniqe_id,
        pos_user_id: posUser?.user_id.toString(),
        pos_security_pin: value,
      };
      dispatch(loginPosUser(data));
    }
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.LOGIN_POS_USER], state));

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <View style={styles.formContainer}>
        <Text style={styles.enterPinTextStyle}>{strings.login.enterPasscode}</Text>

        <Spacer space={SH(20)} />
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          autoFocus={true}
          returnKeyType={'done'}
          cellCount={CELL_COUNT}
          onChangeText={setValue}
          keyboardType={'number-pad'}
          textContentType={'oneTimeCode'}
          onSubmitEditing={Keyboard.dismiss}
          renderCell={({ index, symbol, isFocused }) => (
            <View
              key={index}
              style={[
                styles.cellRoot,
                {
                  borderColor: isFocused ? COLORS.primary : COLORS.solidGrey,
                  borderWidth: isFocused ? 1.5 : 1,
                },
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.container} />

      <Button
        onPress={onPressHandler}
        title={strings.phoneNumber.button}
        textStyle={{ color: value ? COLORS.white : COLORS.dark_grey }}
        style={[
          styles.buttonStyle,
          { backgroundColor: value ? COLORS.primary : COLORS.textInputBackground },
        ]}
      />

      {isLoading ? (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator color={COLORS.primary} size={'large'} style={styles.loaderViewStyle} />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
