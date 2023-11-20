import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Button, Spacer, Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { styles } from './SetPin.styles';
import { COLORS, SW, SH, TextStyles } from '@/theme';
import { navigate } from '@mPOS/navigation/NavigationRef';
import { NAVIGATION } from '@mPOS/constants';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { NormalAlert } from '@/utils/GlobalMethods';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getAuthData } from '@/selectors/UserSelectors';

const CELL_COUNT = 4;

export function SetPin(props) {
  // const getData = useSelector(getAuthData);
  // const profileData = getData?.userProfile;
  const countryCode = props.route && props.route.params && props.route.params.countryCode;
  const phoneNumber = props.route && props.route.params && props.route.params.phoneNumber;
  const otp = props.route && props.route.params && props.route.params.value;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const submit = () => {
    navigate(NAVIGATION.reSetPin, {
      key: 'Pin',
      data: value,
      otp: otp,
      countryCode: countryCode,
      phoneNumber: phoneNumber,
    });
    return;
    if (!value) {
      Toast.show({
        text2: 'Please enter pin',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
    } else if (
      props?.route?.params?.key == 'change_pin' &&
      value == profileData?.user_profiles?.security_pin
    ) {
      Toast.show({
        text2: 'New pin should be different from current',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
    } else {
      if (props?.route?.params?.key == 'change_pin') {
        navigate(NAVIGATION.reSetPin, {
          key: 'change_pin',
          data: value,
        });
      } else {
        navigate(NAVIGATION.reSetPin, {
          key: 'Pin',
          data: value,
          otp: otp,
          countryCode: countryCode,
          phoneNumber: phoneNumber,
        });
      }
    }
  };
  return (
    <ScreenWrapper>
      <Header title={strings.setPin.setUpPin} subTitle={strings.setPin.subTitle} backRequired />
      <View style={styles.formContainer}>
        <Text style={[TextStyles.text, { color: COLORS.text }]}>{strings.setPin.setNewPin}</Text>
        <Spacer space={SH(20)} />
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.containerOtp}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />
      </View>
      <View style={{ flex: 1 }} />
      <Button
        // onPress={() => navigate(NAVIGATION.reSetPin, { data: 'Pin' })}
        title={'Next'}
        onPress={submit}
        style={{ height: SW(55) }}
      />
    </ScreenWrapper>
  );
}
