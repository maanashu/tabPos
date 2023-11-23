import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
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
import { getAuthData } from '@/selectors/AuthSelector';
import { verifyOldPin } from '@/actions/AuthActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { CustomButton } from '@mPOS/components/CustomButton';

const CELL_COUNT = 4;

export function OldPin(props) {
  const disptach = useDispatch();
  const getData = useSelector(getAuthData);
  const profileData = getData;
  // console.log('prodile dataa', JSON.stringify(profileData));

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isLoading, setIsLoading] = useState(false);
  // const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_OLD_PIN], state));

  console.log('sadsdas', isLoading);
  const submit = async () => {
    if (!value) {
      Toast.show({
        text2: strings.validationMessages.enterPin,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
      return;
    }
    //  else if (value != profileData?.user_profiles?.security_pin) {
    //   Toast.show({
    //     text2: 'Old pin does not match',
    //     position: 'bottom',
    //     type: 'error_toast',
    //     visibilityTime: 2000,
    //   });
    // }
    else {
      setIsLoading(true);
      const res = await disptach(verifyOldPin(value));
      console.log('adasda', res);
      if (res?.status_code == '200') {
        navigate(NAVIGATION.setPin, {
          key: 'change_pin',
          data: value,
        });
      }
      setIsLoading(false);
    }
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
      <CustomButton
        pending={isLoading}
        // onPress={() => navigate(NAVIGATION.reSetPin, { data: 'Pin' })}
        title={'Next'}
        onPress={submit}
        style={{ height: SW(55) }}
      />
    </ScreenWrapper>
  );
}
