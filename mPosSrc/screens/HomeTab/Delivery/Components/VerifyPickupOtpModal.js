import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';

import {
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Modal from 'react-native-modal';
import { TYPES } from '@/Types/DeliveringOrderTypes';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { NAVIGATION } from '@/constants';
import { COLORS, SF, SH, ShadowStyles } from '@/theme';
import { digits } from '@/utils/validators';
import { ms } from 'react-native-size-matters';
import { navigate } from '@/navigation/NavigationRef';
import { merchantLogin } from '@/actions/AuthActions';
import { getAuthData } from '@/selectors/AuthSelector';
import { VirtualKeyBoard } from '@/components/VirtualKeyBoard';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { styles } from '@/screens/Auth/MerchantPasscode/MerchantPasscode.styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { verifyPickupOtp } from '@/actions/DeliveryAction';
import { useEffect } from 'react';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const CELL_COUNT = 4;

const VerifyPickupOtpModal = ({ visible, orderData, changeOrderStatus, onClose }) => {
  const dispatch = useDispatch();
  const getData = useSelector(getAuthData);
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [prop, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    // Reset value when the modal closes
    if (!visible) {
      setValue('');
    }
  }, [visible]);

  const isLoading = useSelector((state) => isLoadingSelector([TYPES.VERIFY_PICKUP_OTP], state));

  const passcodeHandler = async () => {
    if (!value) {
      Toast.show({
        position: 'top',
        type: 'error_toast',
        text2: strings.valiadtion.validPin,
        visibilityTime: 2000,
      });
      return;
    } else if (value && value.length < 4) {
      Toast.show({
        position: 'top',
        type: 'error_toast',
        text2: strings.valiadtion.validPin,
        visibilityTime: 2000,
      });
      return;
    } else if (value && digits.test(value) === false) {
      Toast.show({
        position: 'top',
        type: 'error_toast',
        text2: strings.valiadtion.validPin,
        visibilityTime: 2000,
      });
      return;
    } else {
      apiFunction();
    }

    const storeSuccessFlag = async (value) => {
      try {
        await AsyncStorage.setItem('success-flag', 'true');
      } catch (e) {}
    };

    const renderCell = ({ index }) => {
      const displaySymbol = value[index] ? '*' : '';

      return (
        <View key={index} style={styles.cellRoot} onLayout={getCellOnLayoutHandler(index)}>
          <Text style={styles.cellText}>{displaySymbol}</Text>
        </View>
      );
    };
    const apiFunction = async () => {
      const data = {
        order_id: orderData?.id,
        otp: value,
      };

      const res = await verifyPickupOtp(data)(dispatch);
      if (res) {
        setValue('');
        changeOrderStatus();
      }
      // if (res?.type === 'MERCHANT_LOGIN_ERROR') {
      //   setValue('');
      // } else if (res?.type === 'MERCHANT_LOGIN_SUCCESS') {
      //   setValue('');
      //   navigate(NAVIGATION.posUsers);
      // }
    };
  };
  useEffect(() => {
    if (value && value.length >= 4) {
      apiFunction();
    }
  }, [value]);
  return (
    <Modal
      coverScreen
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      style={{
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',

        alignSelf: 'center',

        shadowColor: '#000', // Shadow color
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 5, // Shadow radius
        elevation: 5, // Elevation for Android (in case of Modal)
      }}
    >
      <View
        style={[
          {
            width: '1200%',
            height: '65%%',
            borderColor: 'grey',
            alignSelf: 'center',
            borderRadius: 20,
            alignItems: 'center',
            backgroundColor: COLORS.white,
            ...ShadowStyles.shadow2,
          },
          // { alignItems: 'center', backgroundColor: 'red', justifyContent: 'center' },
        ]}
      >
        <Spacer space={SH(30)} />

        <Text style={[styles.heading, { fontSize: SF(16) }]}>Verify your pickup pin</Text>
        <Spacer space={SH(10)} />
        {/* <Text style={styles.subHeading}>{strings.passcode.heading}</Text> */}

        <Spacer space={SH(26)} />
        <CodeField
          ref={ref}
          {...prop}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.alignSelfCenter}
          showSoftInputOnFocus={false}
          keyboardType={'number-pad'}
          textContentType={'oneTimeCode'}
          renderCell={renderCell}
        />

        <VirtualKeyBoard
          FLCntStyle={{
            alignItems: 'center',
          }}
          maxCharLength={4}
          enteredValue={value}
          setEnteredValue={setValue}
          isButtonLoading={isLoading}
          onPressContinueButton={passcodeHandler}
          screen={'PickupPin'}
          onBackPressHandler={onClose}
        />
      </View>
    </Modal>
  );
};
export default VerifyPickupOtpModal;
