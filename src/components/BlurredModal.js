import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';

const BlurredModal = ({
  isVisible,
  blurType,
  blurAmount,
  fallbackColor,
  children,
  ...modalProps
}) => {
  return (
    <Modal isVisible={isVisible} style={{ margin: 0 }} backdropOpacity={0} {...modalProps}>
      <BlurView
        blurType={blurType || 'light'} // Default to 'light' if blurType is not provided
        blurAmount={blurAmount || 15} // Default blur amount to 15 if not provided
        reducedTransparencyFallbackColor={fallbackColor || 'white'} // Default fallback color to white if not provided
        style={styles.absolute}
        pointerEvents="none"
      />
      {children}
    </Modal>
  );
};

export default memo(BlurredModal);

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
