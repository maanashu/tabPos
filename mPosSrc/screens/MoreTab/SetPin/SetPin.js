import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
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
} from 'react-native-confirmation-code-field';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getAuthData } from '@/selectors/AuthSelector';

const CELL_COUNT = 4;

export function SetPin(props) {
  const authdata = useSelector(getAuthData);

  const countryCode = props.route && props.route.params && props.route.params.countryCode;
  const phoneNumber = props.route && props.route.params && props.route.params.phoneNumber;
  const otp = props.route && props.route.params && props.route.params.value;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const renderCell = ({ index }) => {
    const displaySymbol = value[index] ? '*' : '';

    return (
      <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
        <Text style={styles.cellText}>{displaySymbol}</Text>
      </View>
    );
  };

  const submit = () => {
    if (!value) {
      Toast.show({
        text2: 'Please enter pin',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
    } else if (props?.route?.params?.key == 'change_pin' && value == props?.route?.params?.data) {
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
          oldPin: props?.route?.params?.data,
        });
      }

      // else {
      //   // navigate(NAVIGATION.reSetPin, {
      //   //   key: 'Pin',
      //   //   data: value,
      //   //   otp: otp,
      //   //   countryCode: countryCode,
      //   //   phoneNumber: phoneNumber,
      //   // });

      //   navigate(NAVIGATION.reSetPin, {
      //     key: 'Pin',
      //     data: value,
      //     otp: otp,
      //     countryCode: countryCode,
      //     phoneNumber: phoneNumber,
      //   });
      //   return;
      // }
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
          renderCell={renderCell}
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
