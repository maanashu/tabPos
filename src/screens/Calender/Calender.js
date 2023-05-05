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
  watchLogo,
  charlene,
  roundCalender,
  email,
  schdule,
  leftlight,
  rightlight,
  greenCalender,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SF, SW, SH } from '@/theme';
import { Button, Spacer } from '@/components';
import { styles } from '@/screens/Calender/Calender.styles';
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

export function Calender(props) {
  const [schduleDetail, setSchduleDetail] = useState(false);
  const [week, setWeek] = useState(true);
  const [month, setMonth] = useState(false);
  const [day, setDay] = useState(false);

  const weekHandler = () => {
    setWeek(!week);
    setMonth(false);
    setDay(false);
  };
  const monthHandler = () => {
    setMonth(!month);
    setWeek(false);
    setDay(false);
  };
  const dayHandler = () => {
    setDay(!day);
    setMonth(false);
    setWeek(false);
  };

  const notificationItem = ({ item }) => (
    <View style={styles.notificationchildCon}>
      <Text style={styles.requestFor}>
        {strings.calender.requestFor}{' '}
        <Text style={{ fontFamily: Fonts.SemiBold, color: COLORS.black }}>
          {item.notificationType}
        </Text>
      </Text>
      <Spacer space={SH(3)} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={watchLogo} style={styles.watch} />
        <Text style={styles.timeLabel}>
          {strings.calender.timeLabel}{' '}
          <Text style={{ fontFamily: Fonts.SemiBold }}>
            {item.notificationTime}
          </Text>
        </Text>
      </View>
      <Spacer space={SH(3)} />
      <View style={{ flexDirection: 'row' }}>
        <Image source={roundCalender} style={styles.roundCalender} />
        <Text style={styles.timeLabel}>
          {strings.calender.dateLabel}{' '}
          <Text style={{ fontFamily: Fonts.SemiBold }}>
            {item.notificationDate}
          </Text>
        </Text>
      </View>
      <Spacer space={SH(15)} />
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={styles.approveButtonCon}
          onPress={() => setSchduleDetail(!schduleDetail)}
        >
          <Text style={styles.approveText}>{strings.calender.accept}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.noButtonCon}>
          <Text style={styles.approveText}>{strings.calender.decline}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const schduleDetailModal = () => {
    return (
      <Modal transparent isVisible={schduleDetail}>
        <View style={styles.modalMainView}>
          <View style={styles.headerView}>
            <View style={styles.headerBody}>
              <Text>{null}</Text>
              <Text style={[styles.trackingButtonText, { fontSize: SF(16) }]}>
                {strings.calender.scheduledetails}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSchduleDetail(false);
                }}
                style={{ width: SW(2) }}
              >
                <Image source={crossButton} style={styles.crossIconStyle} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingHorizontal: moderateScale(15) }}>
            <Spacer space={SH(30)} />
            <View style={styles.flexAlign}>
              <Image source={charlene} style={styles.charlene} />
              <View style={{ paddingHorizontal: moderateScale(10) }}>
                <Text style={styles.charleneName}>{strings.calender.name}</Text>
                <View style={styles.flexAlign}>
                  <Image source={location} style={styles.location} />
                  <Text style={styles.address}>{strings.calender.addr}</Text>
                </View>
                <View style={styles.flexAlign}>
                  <Image source={Phone_light} style={styles.location} />
                  <Text style={styles.address}>
                    {strings.calender.mobileNo}
                  </Text>
                </View>
                <View style={styles.flexAlign}>
                  <Image source={email} style={styles.location} />
                  <Text style={styles.address}>{strings.calender.email}</Text>
                </View>
              </View>
            </View>
            <Spacer space={SH(30)} />
            <Text style={styles.appointment}>
              {strings.calender.appointment}
            </Text>
            <Spacer space={SH(15)} />
            <View>
              <Text style={styles.service}>{strings.calender.service}</Text>
              <Spacer space={SH(8)} />
              <Text style={styles.serviceType}>{strings.calender.service}</Text>
            </View>
            <Spacer space={SH(30)} />
            <View>
              <View style={styles.displayFlex}>
                <Text style={styles.service}>{strings.calender.apt}</Text>
                <View style={styles.upcomingCon}>
                  <Text style={styles.upcomingText}>
                    {strings.calender.upcoming}
                  </Text>
                </View>
              </View>
              <Spacer space={SH(8)} />
              <Text style={styles.serviceType}>{strings.calender.aptDate}</Text>
            </View>
            <Spacer space={SH(30)} />
            <View>
              <Text style={styles.service}>{strings.calender.conform}</Text>
              <Spacer space={SH(8)} />
              <Text style={styles.serviceType}>
                {strings.calender.conformDate}
              </Text>
            </View>
            <Spacer space={SH(30)} />
            <View>
              <Text style={styles.service}>{strings.calender.paidAmount}</Text>
              <Spacer space={SH(8)} />
              <Text style={styles.serviceType}>{strings.calender.jbr}</Text>
            </View>
            <Spacer space={SH(50)} />
          </View>
        </View>
      </Modal>
    );
  };
  const customHeader = () => {
    return (
      <View style={styles.headerMainView}>
        <View style={styles.deliveryView}>
          <Image source={roundCalender} style={styles.truckStyle} />
          <Text style={styles.deliveryText}>{strings.calender.calender}</Text>
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
      <View style={[styles.displayFlex, styles.calenderContainer]}>
        <View style={styles.calenderCon}>
          <View style={styles.calenderHeader}>
            <View style={styles.displayFlex}>
              <View style={styles.monthlySchduel}>
                <View style={styles.displayFlex}>
                  <Image source={leftlight} style={styles.leftLight} />
                  <Text style={styles.monthlySchduleDate}>
                    Oct 23 - Oct 29, 2022
                  </Text>
                  <Image source={rightlight} style={styles.leftLight} />
                </View>
              </View>
              <View style={styles.flexAlign}>
                <TouchableOpacity
                  style={
                    day ? styles.clickedButtonCon : styles.unClickedButtonCon
                  }
                  onPress={dayHandler}
                >
                  <Text style={day ? styles.checkedText : styles.unCheckedText}>
                    {strings.calender.day}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    week ? styles.clickedButtonCon : styles.unClickedButtonCon
                  }
                  onPress={weekHandler}
                >
                  <Text
                    style={week ? styles.checkedText : styles.unCheckedText}
                  >
                    {strings.calender.week}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    month ? styles.clickedButtonCon : styles.unClickedButtonCon
                  }
                  onPress={monthHandler}
                >
                  <Text
                    style={month ? styles.checkedText : styles.unCheckedText}
                  >
                    {strings.calender.month}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text>{null}</Text>
            </View>
          </View>
          <Image source={schdule} style={styles.schdule} />
        </View>
        <View style={styles.notificationCon}>
          <View>
            <FlatList
              data={notificationData}
              renderItem={notificationItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
      </View>
      {schduleDetailModal()}
    </View>
  );
}
