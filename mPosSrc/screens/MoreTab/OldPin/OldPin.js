import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Button, Spacer, Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { styles } from './OldPin.styles';
import { COLORS, SW, TextStyles } from '@/theme';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { NAVIGATION } from '@mPOS/constants';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { ms } from 'react-native-size-matters';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getAuthData } from '@/selectors/UserSelectors';

const CELL_COUNT = 4;

export function OldPin(props) {
  // const getData = useSelector(getAuthData);
  // const profileData = getData?.userProfile;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const submit = () => {
    navigate(NAVIGATION.setPin, {
      key: 'change_pin',
      data: value,
    });
    return;
    if (!value) {
      Toast.show({
        text2: strings.validation.enterPin,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
      return;
    } else if (value != profileData?.user_profiles?.security_pin) {
      Toast.show({
        text2: 'Old pin does not match',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
    } else
      navigate(NAVIGATION.setPin, {
        key: 'change_pin',
        data: value,
      });
  };
  return (
    <ScreenWrapper>
      <Header title={'Set up PIN'} backRequired />
      <View style={styles.formContainer}>
        <Text style={[TextStyles.text, { color: COLORS.text, fontSize: ms(16) }]}>
          {'Enter your Old PIN'}
        </Text>
        <Spacer space={ms(30)} />
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.containerOtp}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />
      </View>
      <View style={{ flex: 1 }} />
      <Button
        // onPress={() => navigate(NAVIGATION.reSetPin, { data: 'Pin' })}
        title={'Next'}
        onPress={submit}
        style={{ height: SW(55) }}
      />
    </ScreenWrapper>
  );
}
