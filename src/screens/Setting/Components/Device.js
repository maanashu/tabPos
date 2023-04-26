import React, { useState } from 'react';
import {
  DaySelector,
  ScreenWrapper,
  Spacer,
  TableDropdown,
} from '@/components';
import { strings } from '@/localization';
import { COLORS, SF, SH } from '@/theme';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from '@/screens/Setting/Setting.styles';
import {
  Union,
  backArrow,
  calendar1,
  dropdown2,
  location,
  mask,
  maskRight,
  notifications,
  reward,
  rewardFlower,
  rewardGraph,
  right_light,
  search_light,
  security,
  tableProfile,
  unionRight,
  userImage,
  wallet2,
} from '@/assets';
import LinearGradient from 'react-native-linear-gradient';
import { Table } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';

const windowWidth = Dimensions.get('window').width;
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { settingLabelData } from '@/constants/flatListData';

export function Device() {
 
  return (
      <View>
          <Text>Device world first</Text>
      </View>
  );
}
