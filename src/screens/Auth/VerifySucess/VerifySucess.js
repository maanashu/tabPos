import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { SH } from '@/theme';
import { Spacer } from '@/components';
import { NAVIGATION } from '@/constants';
import { strings } from '@/localization';
import { verifyIcon, crossButton } from '@/assets';
import { navigate } from '@/navigation/NavigationRef';

import { styles } from '@/screens/Auth/VerifySucess/VerifySucess.styles';

export function VerifySucess() {
  const crossHandler = () => navigate(NAVIGATION.passcode);

  return (
    <View style={styles.bodyCon}>
      <View style={styles.popupContainer}>
        <Spacer space={SH(40)} />

        <Image source={verifyIcon} style={styles.verifyIcon} />

        <Spacer space={SH(60)} />

        <TouchableOpacity style={styles.position} onPress={crossHandler}>
          <Image source={crossButton} style={styles.crossButton} />
        </TouchableOpacity>

        <Text style={[styles.header, styles.success]}>{strings.passcode.success}</Text>

        <Spacer space={SH(15)} />

        <Text style={styles.loginBack}>{strings.passcode.loginBack}</Text>
      </View>
    </View>
  );
}
