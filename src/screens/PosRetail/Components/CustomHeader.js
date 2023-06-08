import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '@/screens/PosRetail/PosRetail.styles';
import { cloth, crossButton, search_light } from '@/assets';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import moment from 'moment';

export function CustomHeader({ crossHandler, iconShow }) {
  return (
    <View style={styles.searchScreenHeader}>
      <View style={styles.displayflex}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.cashLabelBold}>
            {moment().format('ddd DD MMM, YYYY')}
          </Text>
          <View style={styles._border} />
          <Text style={styles.cashLabelBold}>{moment().format('hh:mm A')}</Text>
          <View style={styles._border} />
        </View>

        <Text style={styles.cashLabelBold}>Walk-In</Text>
        <View style={styles._border} />
        <Text style={styles.cashLabelBold}>Invoice No. # 3467589</Text>
        <Text style={styles.cashLabelBold}>POS No. #Front-CC01</Text>
        {iconShow ? (
          <TouchableOpacity onPress={crossHandler}>
            <Image source={crossButton} style={styles.crossBg} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}
