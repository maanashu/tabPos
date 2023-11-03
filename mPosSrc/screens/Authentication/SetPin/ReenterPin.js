import React, { useState } from 'react';
import { View, Text, Keyboard, SafeAreaView } from 'react-native';

import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import { SH, COLORS } from '@/theme';
import { strings } from '@mPOS/localization';
import { MPOS_NAVIGATION, commonNavigate } from '@common/commonImports';
import { Button, Spacer } from '@mPOS/components';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { CustomErrorToast } from '@mPOS/components/Toast';
import Header from '@mPOS/screens/Authentication/SetPin/Components/Header';
import PinSuccessComponent from '@mPOS/screens/Authentication/SetPin/Components/PinSuccessComponent';

import { styles } from '@mPOS/screens/Authentication/SetPin/styles';

export function ReenterPin(props) {
  const CELL_COUNT = 4;
  const code = props?.route?.params?.pinCode;
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const [value, setValue] = useState('');
  const [enableModal, setEnableModal] = useState(false);
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const submit = async () => {
    if (!value || value.length < 4) {
      CustomErrorToast({ message: strings.validationMessages.emptyPinCode });
    } else if (value !== code) {
      CustomErrorToast({ message: strings.validationMessages.pinNotMatch });
    } else {
      setEnableModal(true);
    }
  };

  const cancelHandler = () => setValue('');

  const loginHandlerFunction = () => {
    setEnableModal(false);
    navigate(MPOS_NAVIGATION.login);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header clearInput={cancelHandler} />

      <View style={styles.formContainer}>
        <Text style={styles.enterPinTextStyle}>{strings.setPin.reenterPin}</Text>

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

      <View style={styles.container} />

      <Button
        onPress={submit}
        title={strings.phoneNumber.button}
        textStyle={{ color: value ? COLORS.white : COLORS.text }}
        style={[
          styles.buttonStyle,
          { backgroundColor: value ? COLORS.primary : COLORS.inputBorder },
        ]}
      />

      <PinSuccessComponent {...{ enableModal }} loginHandler={loginHandlerFunction} />
    </SafeAreaView>
  );
}
