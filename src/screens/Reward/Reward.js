import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SectionList,
  ViewComponent,
  Dimensions,
  FlatList
} from 'react-native';
import Modal from 'react-native-modal';

import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, DaySelector, Spacer } from '@/components';
import { styles } from '@/screens/Reward/Reward.styles';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { goBack } from '@/navigation/NavigationRef';

const windowWidth = Dimensions.get('window').width;

export function Reward() {



  return (
    <View style={styles.container}>
     {/* <DaySelector/>
      */}
      <View style={{alignSelf:'center'}}>
        <Text>comimg soon</Text>
      </View>
    </View>
  );
}

