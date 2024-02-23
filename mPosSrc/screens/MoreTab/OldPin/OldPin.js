import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spacer, Header, ScreenWrapper } from '@mPOS/components';
import { styles } from './OldPin.styles';
import { COLORS, SW, TextStyles } from '@/theme';
import { NAVIGATION } from '@mPOS/constants';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { ms } from 'react-native-size-matters';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getAuthData } from '@/selectors/AuthSelector';
import { verifyOldPin } from '@/actions/AuthActions';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { CustomButton } from '@mPOS/components/CustomButton';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { useEffect } from 'react';

const CELL_COUNT = 4;

export function OldPin(props) {
  const disptach = useDispatch();
  const getData = useSelector(getAuthData);
  const profileData = getData;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [isLoading, setIsLoading] = useState(false);
  // const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_OLD_PIN], state));

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
      apiFunction();
    }
  };
  const apiFunction = async () => {
    setIsLoading(true);
    const res = await disptach(verifyOldPin(value));
    if (res?.status_code == '200') {
      navigate(NAVIGATION.setPin, {
        key: 'change_pin',
        data: value,
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (value && value.length >= 4) {
      apiFunction();
    }
  }, [value]);
  const renderCell = ({ index }) => {
    const displaySymbol = value[index] ? '*' : '';

    return (
      <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
        <Text style={styles.cellText}>{displaySymbol}</Text>
      </View>
    );
  };

  // const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_PIN], state));

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
          renderCell={renderCell}
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
