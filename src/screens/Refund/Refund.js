import React, { useEffect, useState } from 'react';
import { DaySelector, ScreenWrapper, Spacer, TableDropdown } from '@/components';
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
  ActivityIndicator,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { styles } from '@/screens/Refund/Refund.styles';
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
  search_light,
  tableProfile,
  unionRight,
  userImage,
  wallet2,
  bell,
} from '@/assets';
import LinearGradient from 'react-native-linear-gradient';
import { Table } from 'react-native-table-component';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
const windowWidth = Dimensions.get('window').width;
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { getRewardGraph, getRewardUser, getRewardedUsersList } from '@/actions/RewardAction';
import { useIsFocused } from '@react-navigation/native';
import { getAuthData } from '@/selectors/AuthSelector';
import { getReward } from '@/selectors/RewardSelectors';
import { TYPES } from '@/Types/RewardTypes';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { BarChart } from 'react-native-chart-kit';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import { SearchScreen } from './Components';

moment.suppressDeprecationWarnings = true;

export function Refund() {
  const dispatch = useDispatch();
  const [selectedsScreen, setSelectedsScreen] = useState('SearchScreen');

  const renderScreen = {
    ['SearchScreen']: <SearchScreen />,
  };

  const screenChangeView = () => {
    return renderScreen[selectedsScreen];
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>{screenChangeView()}</View>
    </ScreenWrapper>
  );
}
