import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { COLORS } from '@/theme';
import PropTypes from 'prop-types';

export function Spacer({ space, horizontal, backgroundColor, style }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        spacerStyle: {
          style: style,
          // backgroundColor: backgroundColor
          //   ? backgroundColor
          //   : COLORS.transparent,
          backgroundColor: COLORS.transparent,
          [horizontal ? 'width' : 'height']: space,
        },
      }),
    [horizontal, space, backgroundColor, style]
  );

  return <View style={[styles.spacerStyle]} />;
}

Spacer.defaultProps = {
  space: 10,
  horizontal: false,
  backgroundColor: COLORS.transparent,
  style: { flex: 1 },
};

Spacer.propTypes = {
  space: PropTypes.number || PropTypes.string,
  horizontal: PropTypes.bool,
  backgroundColor: PropTypes.string,
  style: PropTypes.object,
};
