import Toast from 'react-native-toast-message';

export const CustomErrorToast = ({message}) => {
  Toast.show({
    position: 'bottom',
    type: 'error_toast',
    visibilityTime: 1500,
    text2: message,
  });
};

export const CustomSuccessToast = ({message}) => {
  Toast.show({
    position: 'bottom',
    type: 'success_toast',
    visibilityTime: 1500,
    text2: message,
  });
};
