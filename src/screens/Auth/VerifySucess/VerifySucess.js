import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { Spacer, Button } from '@/components';
import { SH, COLORS } from '@/theme';
import { verifyIcon, crossButton } from '@/assets';
import { styles } from '@/screens/Auth/VerifySucess/VerifySucess.styles';
import Modal from 'react-native-modal';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { color } from 'react-native-reanimated';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { mobileReg } from '@/utils/validators';
import { isLoadingSelector } from '@/selectors/StatusSelectors';

export function VerifySucess() {

   const crossHandler = () => {
    navigate(NAVIGATION.passcode)
   }
  return (
    <View style={styles.bodyCon}>
       <View style={styles.popupContainer}>
        <Spacer space={SH(40)} />
            <Image source={verifyIcon} style={styles.verifyIcon}/>
            <Spacer space={SH(60)} />
            <TouchableOpacity style={styles.position} onPress={crossHandler}>
              <Image source={crossButton} style={styles.crossButton}/>
            </TouchableOpacity>
            <Text style={[styles.header, styles.success]}>{strings.passcode.success}</Text>
            <Spacer space={SH(15)} />
            <Text style={styles.loginBack}>{strings.passcode.loginBack}</Text>
        </View>
    </View>
  );
}
