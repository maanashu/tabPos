import React from 'react';
import { View, Text } from 'react-native';
i;
import { ScreenWrapper } from '@/components';

import moment from 'moment';

moment.suppressDeprecationWarnings = true;
import { styles } from '../Analytics2.styles';

export function TotalProfit() {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text>{'Total Profit'}</Text>
      </View>
    </ScreenWrapper>
  );
}
