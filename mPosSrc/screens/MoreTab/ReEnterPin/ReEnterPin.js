import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Button, Spacer, Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { styles } from './ReEnterPin.styles';
import { SH, SW, TextStyles, COLORS } from '@/theme';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
  Cursor,
} from 'react-native-confirmation-code-field';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { errorsSelector } from '@/selectors/ErrorSelectors';
import { changeOldPin, forgetPin, TYPES } from '@/actions/UserActions';
import { getAuthData } from '@/selectors/UserSelectors';
import { useNavigation } from '@react-navigation/native';

import { Toast } from 'react-native-toast-message/lib/src/Toast';

const CELL_COUNT = 4;

export function ReEnterPin(props) {
  const dispatch = useDispatch();
  // const getData = useSelector(getAuthData);
  // const navigation = useNavigation();
  // const profileData = getData?.userProfile;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  // const isLoading = useSelector((state) => isLoadingSelector([TYPES.FORGET_PIN], state));

  // const errors = useSelector((state) => errorsSelector([TYPES.FORGET_PIN], state), shallowEqual);
  // const isLoadingChangePin = useSelector((state) =>
  //   isLoadingSelector([TYPES.CHANGE_OLD_PIN], state)
  // );

  const countryCode = props.route && props.route.params && props.route.params.countryCode;
  const phoneNumber = props.route && props.route.params && props.route.params.phoneNumber;
  const otp = props.route && props.route.params && props.route.params.otp;
  const newPin = props.route && props.route.params && props.route.params.data;
  console.log('props', props.navigation);

  const submit = () => {
    return;
    if (!value) {
      Toast.show({
        text2: strings.validation.enterPin,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
    } else if (value != newPin) {
      Toast.show({
        text2: strings.validation.samePin,
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
    } else {
      if (props?.route?.params?.key == 'change_pin') {
        dispatch(
          changeOldPin({
            old_pin: profileData?.user_profiles?.security_pin,
            new_pin: value,
          })
        )
          .then(() => props.navigation.navigate('homeNav', { screen: 'More' }))
          .catch({});
      } else {
        dispatch(forgetPin(phoneNumber, countryCode, otp, value));
      }
    }
  };
  return (
    <ScreenWrapper>
      <Header title={strings.setPin.setUpPin} subTitle={strings.setPin.subTitle} backRequired />
      <View style={styles.formContainer}>
        <Text style={[TextStyles.text, { color: COLORS.text }]}>{strings.setPin.reNewPin}</Text>
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
        title={'Next'}
        // pending={isLoading || isLoadingChangePin}
        onPress={submit}
        style={{ height: SW(55) }}
      />
    </ScreenWrapper>
  );
}
