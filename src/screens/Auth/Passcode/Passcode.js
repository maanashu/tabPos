import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import { Spacer, Button } from '@/components';
import { SH } from '@/theme';
import {verifyIcon, crossButton } from '@/assets';
import { styles } from '@/screens/Auth/Passcode/Passcode.styles';
import { strings } from '@/localization';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { mobileReg,digits } from '@/utils/validators';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
const CELL_COUNT = 4;

export function Passcode() {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

 

  const passcodeHandler = () =>{
    if(!value){
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.enterPassCode,
        visibilityTime: 2000
      });
      return;
    }else if (value && value.length < 4){
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.validPasscode,
        visibilityTime: 2000
      });
      return;
    }else if ( value && digits.test(value) === false ){
      Toast.show({
        position: 'bottom',
        type: 'error_toast',
        text2: strings.valiadtion.validPasscode,
        visibilityTime: 2000
      });
      return;
    }else {
        navigate(NAVIGATION.loginIntial)
    }
  }
  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Spacer space={SH(100)} />
      <View style={styles.verifyContainer}>
        <Spacer space={SH(40)} />
        <Text style={styles.subHeading}>{strings.passcode.heading}</Text>
        <Spacer space={SH(40)} />
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={[styles.alignSelfCenter]}
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
      
        <View style={{flex:1}}/>
        <Button
        onPress={passcodeHandler}
          title={strings.verifyPhone.button}
          textStyle={value ? styles.selectedText :  styles.buttonText}
          style={value ? styles.submitButton : styles.button}
        />
          <Spacer space={SH(40)} />
      </View>

    </View>
    </KeyboardAwareScrollView>
  );
}
