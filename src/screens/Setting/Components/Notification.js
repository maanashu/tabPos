import React, { useState } from 'react';
import { Button, Spacer } from '@/components';
import { strings } from '@/localization';
import { SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from '@/screens/Setting/Setting.styles';
import Modal from 'react-native-modal';
import {
  addIcon,
  blueToothIcon,
  crossButton,
  deviceLogo,
  scanner,
  toggleSecurity,
  trackCamera,
} from '@/assets';
import { deviceDropDownArray } from '@/constants/flatListData';

export function Notification() {

  return (
    <View>
     <Text>NOTIFICATION</Text>
    </View>
  );
}
