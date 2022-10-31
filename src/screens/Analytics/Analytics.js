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
  FlatList,
  Dimensions,
} from 'react-native';
import {
  crossButton,
  Fonts,
  notifications,
  Phone_light,
  search_light,
  location,
  backArrow,
  calendar1,
  charlene,
  roundCalender,
  email,
  schdule,
  leftlight,
  rightlight
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, Spacer } from '@/components';
import { styles } from '@/screens/Analytics/Analytics.styles';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { goBack } from '@/navigation/NavigationRef';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
import {
  sessionHistoryTableHeading,
  sessionHistoryTableData,
  notificationData,
} from '@/constants/flatListData';
export function Analytics(props) {

  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        <View style={styles.deliveryView}>
          <Image source={roundCalender} style={styles.truckStyle} />
          <Text style={styles.deliveryText}>{strings.analytics.header}</Text>
        </View>
        <View style={styles.deliveryView}>
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 25 }]}
          />
          <View style={styles.searchView}>
            <Image source={search_light} style={styles.searchImage} />
            <TextInput
              placeholder={strings.deliveryOrders.search}
              style={styles.textInputStyle}
              placeholderTextColor={COLORS.darkGray}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {customHeader()}
        {/* <View style={{paddingHorizontal:moderateScale(8)}}>
             <View style={styles.totalProductCon}>
                
             </View>
        </View> */}
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>In progress</Text>
        </View>
    </View>
  );
}
