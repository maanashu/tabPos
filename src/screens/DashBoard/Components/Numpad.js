import React, { useState } from 'react';
import { Spacer } from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH, SW } from '@/theme';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { styles } from '@/screens/DashBoard/DashBoard.styles';
import {
  borderCross,
  columbiaMen,
  minus,
  plus,
  scn,
  search_light,
} from '@/assets';

export function Numpad({ cartproductListHandler }) {
  return (
    <View>
      <View style={styles.inputWraper2}>
        <View style={styles.displayRow}>
          <View>
            <Image source={search_light} style={styles.searchStyle} />
          </View>
          <TextInput
            placeholder={strings.retail.searchProduct}
            style={styles.searchInput}
          />
        </View>
        <TouchableOpacity>
          <Image source={scn} style={styles.scnStyle} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(10)} />
      {/* changeList start */}

      <View>
        <Text>In progress</Text>
      </View>

      {/* changeList end */}
    </View>
  );
}
