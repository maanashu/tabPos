// CustomAlert.js

import React from 'react';
import { Alert } from 'react-native';

const CustomAlert = ({
  title = 'Alert',
  description = '',
  onYesPress = () => {},
  onNoPress = () => {},
  yesButtonTitle = 'Yes',
  noButtonTitle = 'No',
}) => {
  Alert.alert(
    title,
    description,
    [
      {
        text: noButtonTitle,
        onPress: onNoPress,
        style: 'cancel',
      },
      {
        text: yesButtonTitle,
        onPress: onYesPress,
        style: 'default',
      },
    ],
    { cancelable: false }
  );
};

export default CustomAlert;
