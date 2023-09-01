import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

export function Spacer({ space, horizontal, backgroundColor, style }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          [horizontal ? 'width' : 'height']: space,
          backgroundColor: backgroundColor || 'transparent',
          style: style,
        },
      }),
    [horizontal, space, backgroundColor, style]
  );

  return <View style={[styles.spacerStyle]} />;
}
Spacer.defaultProps = {
  space: 10,
  horizontal: false,
  backgroundColor: 'transparent',
  style: { flex: 1 },
};

Spacer.propTypes = {
  space: PropTypes.number || PropTypes.string,
  horizontal: PropTypes.bool,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};
