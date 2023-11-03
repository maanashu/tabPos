import React, { useState } from 'react';
import { View, Text, Keyboard, SafeAreaView } from 'react-native';

import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { COLORS, SH } from '@/theme';
import { strings } from '@mPOS/localization';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { Button, Spacer } from '@mPOS/components';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { CustomErrorToast } from '@mPOS/components/Toast';
import Header from '@mPOS/screens/Authentication/SetPin/Components/Header';

import { styles } from '@mPOS/screens/Authentication/SetPin/styles';

export function SetNewPin() {
  const CELL_COUNT = 4;
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
      navigate(MPOS_NAVIGATION.reenterPin, { pinCode: value });
    }
  };

  const cancelHandler = () => setValue('');

  return (
    <SafeAreaView style={styles.container}>
      <Header clearInput={cancelHandler} />

      <View style={styles.formContainer}>
        <Text style={styles.enterPinTextStyle}>{strings.setPin.enterPin}</Text>

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
                  borderColor: isFocused ? COLORS.primary : COLORS.light_border,
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

      <View style={{ flex: 1 }} />

      <Button
        onPress={onPressHandler}
        title={strings.phoneNumber.button}
        textStyle={{ color: value ? COLORS.white : COLORS.text }}
        style={[
          styles.buttonStyle,
          { backgroundColor: value ? COLORS.primary : COLORS.inputBorder },
        ]}
      />
    </SafeAreaView>
  );
}
