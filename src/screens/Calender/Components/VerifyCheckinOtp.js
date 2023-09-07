import { memo, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from '../Calender.styles';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Button } from '@/components';
import Modal from 'react-native-modal';
import { ms } from 'react-native-size-matters';
import { COLORS } from '@/theme';
import { Fonts, crossButton } from '@/assets';
import { useDispatch, useSelector } from 'react-redux';
import { sendCheckinOTP, verifyCheckinOTP } from '@/actions/AppointmentAction';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AppointmentTypes';

const VerifyCheckinOtp = ({ isVisible, setIsVisible, appointmentData }) => {
  const dispatch = useDispatch();
  const CELL_COUNT = 5;
  const appointmentId = appointmentData?.id;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const isVerifyCheckinOTPLoading = useSelector((state) =>
    isLoadingSelector([TYPES.VERIFY_CHECKIN_OTP], state)
  );
  const isSendCheckinOTPLoading = useSelector((state) =>
    isLoadingSelector([TYPES.SEND_CHECKIN_OTP], state)
  );

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.verifyOtpContainer}>
        <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.crossEventDetailModal}>
          <Image source={crossButton} style={styles.crossStl} />
        </TouchableOpacity>
        <Text style={{ marginBottom: ms(10), fontFamily: Fonts.SemiBold, fontSize: ms(10) }}>
          Enter OTP to confirm Check-in
        </Text>
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.alignSelfCenter}
          keyboardType={'number-pad'}
          textContentType={'oneTimeCode'}
          renderCell={({ index, symbol, isFocused }) => (
            <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
              <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
            </View>
          )}
        />
        <Text
          onPress={() => {
            dispatch(sendCheckinOTP(appointmentId)).then(() => {
              setValue('');
            });
          }}
          style={{
            fontFamily: Fonts.SemiBold,
            fontSize: ms(9),
            color: COLORS.primary,
            marginTop: ms(15),
          }}
        >
          Resend OTP
        </Text>
        <Button
          pending={isVerifyCheckinOTPLoading || isSendCheckinOTPLoading}
          title={'Confirm OTP'}
          onPress={() => {
            const params = {
              appointment_id: appointmentId,
              otp: value,
            };
            dispatch(verifyCheckinOTP(params));
          }}
          textStyle={{ color: COLORS.white, fontFamily: Fonts.SemiBold, fontSize: ms(9) }}
          style={styles.confirmCheckinOtpBtn}
        />
      </View>
    </Modal>
  );
};

export default memo(VerifyCheckinOtp);
