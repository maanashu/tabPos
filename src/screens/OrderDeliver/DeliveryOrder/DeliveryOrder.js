import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import { Spacer, Button } from '@/components';
import { SH } from '@/theme';
import { Fonts, deliveryTruck, crossButton} from '@/assets';
import { styles } from './DeliveryOrder.styles';
import { strings } from '@/localization';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';

export function DeliveryOrder() {
  return (
    <View style={styles.container}>
       <Text>DeliveryOrder</Text>
    </View>
  );
}
