import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { COLORS, SH } from '@/theme';
import { strings } from '@/localization';
import { Spacer } from '@/components';

import { styles } from '@/screens/PosRetail/PosRetail.styles';
import { cloth, crossButton, search_light } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export function CustomHeader({ crossHandler }) {
  return (
    <View style={styles.searchScreenHeader}>
      <View style={styles.displayflex}>
        <Text style={styles.cashLabelBold}>Wed 26 Apr , 2023</Text>
        <Text style={styles.cashLabelBold}>Walk-In</Text>
        <Text style={styles.cashLabelBold}>Invoice No. # 3467589</Text>
        <Text style={styles.cashLabelBold}>POS No. #Front-CC01</Text>
        <TouchableOpacity onPress={crossHandler}>
          <Image source={crossButton} style={styles.crossBg} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
