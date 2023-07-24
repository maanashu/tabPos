import React from 'react';
import { View } from 'react-native';

import { ScreenWrapper } from '@/components';

import { styles } from './Analytics2.styles';
import { MainScreen } from './Components/MainScreen';

export function Analytics2() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <MainScreen />
      </View>
    </ScreenWrapper>
  );
}
