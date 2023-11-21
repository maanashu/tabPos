import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Spacer, Header, ScreenWrapper } from '@mPOS/components';
import { strings } from '@mPOS/localization';
import { styles } from './ReEnterPin.styles';
import { SH, SW, TextStyles, COLORS } from '@/theme';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { changeOldPin } from '@/actions/UserActions';

import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { MPOS_NAVIGATION } from '@common/commonImports';
import { TYPES } from '@/Types/Types';
import { getAuthData } from '@/selectors/AuthSelector';

const CELL_COUNT = 4;

export function ReEnterPin(props) {
  const dispatch = useDispatch();
  const authdata = useSelector(getAuthData);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const isLoading = useSelector((state) => isLoadingSelector([TYPES.CHANGE_OLD_PIN], state));

  const countryCode = props.route && props.route.params && props.route.params.countryCode;
  const phoneNumber = props.route && props.route.params && props.route.params.phoneNumber;
  const otp = props.route && props.route.params && props.route.params.otp;
  const newPin = props.route && props.route.params && props.route.params.data;

  const submit = () => {
    if (!value) {
      Toast.show({
        text2: 'Please enter security pin',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
    } else if (value != newPin) {
      Toast.show({
        text2: 'Pin does not match',
        position: 'bottom',
        type: 'error_toast',
        visibilityTime: 2000,
      });
    } else {
      if (props?.route?.params?.key == 'change_pin') {
        dispatch(
          changeOldPin({
            old_pin: authdata?.getProfile?.user_profiles?.security_pin,
            new_pin: value,
          })
        )
          .then(() =>
            props.navigation.navigate(MPOS_NAVIGATION.bottomTab, { screen: MPOS_NAVIGATION.more })
          )
          .catch({});
      } else {
        // dispatch(forgetPin(phoneNumber, countryCode, otp, value));
      }
    }
  };

  const renderCell = ({ index }) => {
    const displaySymbol = value[index] ? '*' : '';

    return (
      <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
        <Text style={styles.cellText}>{displaySymbol}</Text>
      </View>
    );
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
          renderCell={renderCell}
        />
      </View>
      <View style={{ flex: 1 }} />

      <Button title={'Next'} pending={isLoading} onPress={submit} style={{ height: SW(55) }} />
    </ScreenWrapper>
  );
}
