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
  showSingleButton = false,
}) => {
  const buttons = [];

  if (!showSingleButton) {
    buttons.push({
      text: noButtonTitle,
      onPress: onNoPress,
      style: 'cancel',
    });
  }

  buttons.push({
    text: yesButtonTitle,
    onPress: onYesPress,
    style: 'default',
  });

  Alert.alert(title, description, buttons, { cancelable: false });
};

export default CustomAlert;
