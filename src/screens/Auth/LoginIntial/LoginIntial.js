import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Spacer, Button } from '@/components';
import { SF, SH } from '@/theme';
import { clay, crossButton, userImage } from '@/assets';
import { styles } from '@/screens/Auth/LoginIntial/LoginIntial.styles';
import { strings } from '@/localization';
import { useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { NAVIGATION } from '@/constants';
import { goBack } from '@/navigation/NavigationRef';

moment.suppressDeprecationWarnings = true;

export function LoginIntial({ route }) {
  const getData = useSelector(getAuthData);
  const { posuserdata } = route.params;
  const navigation = useNavigation();

  const loginIntialHandler = () => {
    navigation.navigate(NAVIGATION.posUserPasscode, {
      posuser: posuserdata,
      from: 'loginInitial',
    });
    // if (getData?.merchantLoginData?.user_profile?.wallet_steps >= 5) {
    //   navigation.navigate(NAVIGATION.posUserPasscode, {
    //     posuser: posuserdata,
    //     from: 'loginInitial',
    //   });
    // } else {
    //   Toast.show({
    //     text2: 'Please First complete Wallet Steps',
    //     position: 'bottom',
    //     type: 'error_toast',
    //     visibilityTime: 1500,
    //   });
    // }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Spacer space={SH(100)} />
      <View>
        <View style={styles.verifyContainer}>
          <View style={{ alignItems: 'center' }}>
            <Spacer space={SH(20)} />
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => goBack()}
            >
              <Image source={crossButton} style={styles.cross} />
            </TouchableOpacity>
            <Spacer space={SH(30)} />
            <Text style={styles.header}>{strings.loginIntial.heading}</Text>
            <Spacer space={SH(25)} />
            <Image
              source={
                { uri: posuserdata?.user?.user_profiles?.profile_photo } ??
                userImage
              }
              style={styles.profilePic}
            />
            <Spacer space={SH(25)} />
            <Text style={styles.darksmallText}>
              {posuserdata.user?.user_profiles.firstname}
            </Text>
            <Spacer space={SH(5)} />
            <Text style={styles.role}>
              {posuserdata.user?.user_roles?.length > 0
                ? posuserdata.user?.user_roles?.map(
                    (item, index) => item.role?.name
                  )
                : 'admin'}
            </Text>
            <Spacer space={SH(15)} />
            {posuserdata.user?.api_tokens.length > 0 && (
              <>
                <Text style={styles.lightsmallText}>
                  {moment(posuserdata.user?.api_tokens[0].updated_at).format(
                    'dddd, DD MMM YYYY'
                  )}
                </Text>
                <Spacer space={SH(8)} />
                <Text style={styles.lightsmallText}>
                  Time{' '}
                  {moment(posuserdata.user?.api_tokens[0].updated_at).format(
                    'hh:mm a'
                  )}
                </Text>
              </>
            )}
            <Spacer space={SH(8)} />
            <View style={{ flex: 1 }} />
            <Button
              onPress={loginIntialHandler}
              title={strings.verifyPhone.button}
              textStyle={styles.selectedText}
              style={styles.submitButton}
            />
            <Spacer space={SH(20)} />
          </View>
        </View>
      </View>
    </View>
  );
}
