import React, { useEffect, useState } from 'react';
import { View, Text,  Image, StatusBar } from 'react-native';
import { Spacer, Button } from '@/components';
import { SH } from '@/theme';
import {  profilePic } from '@/assets';
import { styles } from '@/screens/Auth/LoginIntial/LoginIntial.styles';
import { strings } from '@/localization';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthData } from '@/selectors/AuthSelector';
import { getProfile } from '@/actions/AuthActions';

import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/Types';
import { ActivityIndicator } from 'react-native-paper';

export function LoginIntial() {
  const dispatch = useDispatch();
  const getData = useSelector(getAuthData);
  const userData = getData?.user?.user_profiles?.profile_photo;
  const id = getData?.user?.user_profiles?.id;
  const profileData = getData?.user?.user_profiles?.profile_photo;
  const userProfile = getData?.getProfile;
  const firstName = getData?.getProfile?.user_profiles?.firstname;
  const lastName = getData?.getProfile?.user_profiles?.lastname;
  const userId = getData?.getProfile?.user_profiles?.id;
  const fullName = firstName + ' ' + lastName;

  const [dt, setDt] = useState(new Date().toLocaleString());
  const [hr, setHr] = useState(new Date().toLocaleString());
  const focus = useIsFocused();
  const navigation = useNavigation();
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  var today = new Date();
  const dateMonthYear =
    today.getDate() +
    ' ' +
    monthNames[today.getMonth()] +
    ' ' +
    today.getFullYear();
  const day = dayNames[today.getDay()];

  const formatAMPM = date => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    var strTime = ampm;
    return strTime;
  };

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().getMinutes());
    }, 1000);
    let secHour = setInterval(() => {
      setHr(new Date().getHours());
    }, 1000);

    return () => clearInterval(secTimer, secHour);
  }, []);
  const hour12 = hr % 12 || 12;

  const loginIntialHandler = () => {
    //  navigate('Retails', {screen : 'Retails'})
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'HOME' }],
      })
    );
  };

  useEffect(() => {
    if (focus) {
      dispatch(getProfile(id));
    }
  }, [focus]);

  const isLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_PROFILE], state)
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Spacer space={SH(100)} />
      <View>
        <View style={styles.verifyContainer}>
          {isLoading ? (
            <View style={{ marginTop: 70 }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Spacer space={SH(40)} />
              <Text style={styles.header}>{strings.loginIntial.heading}</Text>
              <Spacer space={SH(25)} />
              <Image
                source={profileData ? { uri: profileData } : profilePic}
                style={styles.profilePic}
              />
              <Spacer space={SH(25)} />
              <Text style={styles.darksmallText}>{fullName}</Text>
              <Spacer space={SH(15)} />
              <Text style={styles.darksmallText}>
                {strings.loginIntial.id}
                {userId}
              </Text>
              <Spacer space={SH(15)} />
              <Text style={styles.lightsmallText}>
                {strings.loginIntial.date} {day} {dateMonthYear}
              </Text>
              <Spacer space={SH(8)} />
              <Text style={styles.lightsmallText}>
                {strings.loginIntial.time}
                {hour12}:{dt} {formatAMPM(new Date())}
              </Text>
              <Spacer space={SH(8)} />
              <View style={{ flex: 1 }} />
              <Button
                onPress={loginIntialHandler}
                title={strings.verifyPhone.button}
                textStyle={styles.selectedText}
                style={styles.submitButton}
              />
               
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
