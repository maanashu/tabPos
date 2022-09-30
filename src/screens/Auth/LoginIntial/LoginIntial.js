import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Spacer, Button } from '@/components';
import { SH } from '@/theme';
import { Fonts, profilePic } from '@/assets';
import { styles } from '@/screens/Auth/LoginIntial/LoginIntial.styles';
import { strings } from '@/localization';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

export function LoginIntial() {

const  loginIntialHandler = () => {
  //  navigate('Retails', {screen : 'Retails'})
  navigate(NAVIGATION.retails)
}
 
  return (
      <View style={styles.container}>
        <Spacer space={SH(100)} />
        <View style={styles.verifyContainer}>
          <Spacer space={SH(80)} />
          <Text style={styles.header}>{strings.loginIntial.heading}</Text>
          <Spacer space={SH(25)} />
          <Image source={profilePic} style={styles.profilePic}/>
          <Spacer space={SH(25)} />
          <Text style={styles.darksmallText}>{strings.loginIntial.name}</Text>
          <Spacer space={SH(15)} />
          <Text style={styles.darksmallText}>{strings.loginIntial.id}</Text>
          <Spacer space={SH(15)} />
          <Text style={styles.lightsmallText}>{strings.loginIntial.date}</Text>
          <Spacer space={SH(8)} />
          <Text style={styles.lightsmallText}>{strings.loginIntial.time}</Text>
          <View style={{ flex: 1 }} />
          <Button
            onPress={loginIntialHandler}
            title={strings.verifyPhone.button}
            textStyle={styles.selectedText}
            style={styles.submitButton}
          />
          <Spacer space={SH(40)} />
        </View>
      </View>
  );
}
