import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import { Spacer, Button } from '@/components';
import { SH } from '@/theme';
import {verifyIcon, crossButton } from '@/assets';
import { styles } from '@/screens/Auth/Passcode/Passcode.styles';
import { strings } from '@/localization';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 4;

export function Passcode() {
  const [verifyPopup, setVerifyPopup] = useState(false)
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const popupHandler = () => {
    setVerifyPopup(!verifyPopup)
  }

 useEffect(() => {
  setVerifyPopup(true)
 }, [])
 
 

  const passcodeHandler = () =>{
     navigate(NAVIGATION.loginIntial)
  }
  return (
    <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
  >
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

      <Modal
        animationType="fade"
        transparent={false}
        isVisible={verifyPopup}
      >
        <View style={styles.popupContainer}>
        <Spacer space={SH(40)} />
            <Image source={verifyIcon} style={styles.verifyIcon}/>
            <Spacer space={SH(60)} />
            <TouchableOpacity style={styles.position} onPress={popupHandler}>
              <Image source={crossButton} style={styles.crossButton}/>
            </TouchableOpacity>
            <Text style={[styles.header, styles.success]}>{strings.passcode.success}</Text>
            <Spacer space={SH(15)} />
            <Text style={styles.loginBack}>{strings.passcode.loginBack}</Text>
        </View>
      </Modal>
    </View>
    </KeyboardAwareScrollView>
  );
}
