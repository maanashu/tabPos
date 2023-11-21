import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
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
import { verifyPin } from '@/actions/UserActions';
import { commonNavigate } from '@common/commonImports';
import { TYPES } from '@/Types/Types';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

const CELL_COUNT = 4;

export function OldPin() {
  const dispatch = useDispatch();

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const submit = () => {
    dispatch(
      verifyPin(value, (res) => {
        commonNavigate(NAVIGATION.setPin, {
          key: 'change_pin',
          data: value,
        });
      })
    );
  };

  const renderCell = ({ index }) => {
    const displaySymbol = value[index] ? '*' : '';

    return (
      <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
        <Text style={styles.cellText}>{displaySymbol}</Text>
      </View>
    );
  };

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_PIN], state));

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
      <Button title={'Next'} onPress={submit} style={{ height: SW(55) }} />
      {isLoading && (
        <View style={styles.loaderViewStyle}>
          <ActivityIndicator color={COLORS.primary} size={'large'} style={styles.loaderViewStyle} />
        </View>
      )}
    </ScreenWrapper>
  );
}
