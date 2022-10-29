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
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal';
import {
  crossButton,
  Fonts,
  notifications,
  rightIcon,
  search_light,
  tray,
  backArrow,
  calendar1,
  dropdown2,
  roundCalender,
  allien
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, Spacer } from '@/components';
import { styles } from '@/screens/Calender/Calender.styles';
import { moderateScale } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { goBack } from '@/navigation/NavigationRef';

const windowWidth = Dimensions.get('window').width;
import {
  sessionHistoryTableHeading,
  sessionHistoryTableData
} from '@/constants/flatListData';


export function Calender(props) {
 
 


  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
       
            <View style={styles.deliveryView}>
          <Image source={calendar1} style={styles.truckStyle} />
          <Text style={styles.deliveryText}>
            {strings.calender.calender}
          </Text>
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
      <View style={styles.displayFlex}>
          <View style={styles.calenderCon}>
             <Text>xvbnm</Text>
          </View>
          <View style={styles.notificationCon}>
             <Spacer space={SH(10)}/>
             <Text style={styles.requestFor}>{strings.calender.requestFor} <Text style={{fontFamily:Fonts.SemiBold}}>{strings.calender.hairCut}</Text></Text>
             <Text style={styles.requestFor}>{strings.calender.timeLabel} <Text style={{fontFamily:Fonts.SemiBold}}>{strings.calender.time}</Text></Text>
             <Text style={styles.requestFor}>{strings.calender.dateLabel} <Text style={{fontFamily:Fonts.SemiBold}}>{strings.calender.date}</Text></Text>
             <Spacer space={SH(15)}/>
             <View style={{flexDirection:'row',}}>
                <View style={styles.approveButtonCon}>
                    <Text style={styles.approveText}>{strings.calender.approve}</Text>
                </View> 
                <View style={styles.noButtonCon}>
                    <Text style={styles.approveText}>{strings.calender.no}</Text>
                </View> 
             </View>
          </View>
      </View>
    </View>
  );
}

