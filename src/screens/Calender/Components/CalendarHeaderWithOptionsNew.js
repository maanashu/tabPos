import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import {
  bookings,
  bookingsCalender,
  bookingsNotification,
  bookingsSearch,
  listview,
  leftArrow,
  rightArrow,
} from '@/assets';
import { strings } from '@/localization';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import { COLORS, SH, SW } from '@/theme';
import { CALENDAR_VIEW_MODES } from '@/constants/enums';
import { Spacer } from '@/components';
import { Images } from '@/assets/new_icon';

const CalendarHeaderWithOptions = ({
  prevMonth,
  getFormattedHeaderDate,
  nextMonth,
  day,
  dayHandler,
  week,
  weekHandler,
  month,
  monthHandler,
  onPressCalendarIcon = () => {},
  shouldShowCalendarModeOptions = true,
  calendarViewMode,
  onPressCalendarViewMode = () => {},
  onPressListViewMode = () => {},
  onPressNotification = () => {},
  onPressSearch = () => {},
}) => {
  return (
    <View style={styles.calenderHeader}>
      <View style={styles.displayFlex}>
        <View style={styles.monthlySchduelNew}>
          <View style={styles.displayFlex}>
            <Image source={bookings} style={styles.leftLight} />
            <Text style={styles.title1}>{`Bookings`}</Text>
            <Spacer space={ms(4)} horizontal />

            <TouchableOpacity
              onPress={onPressCalendarIcon}
              style={[styles.row, styles.rowHorizonCenter, styles.buttonCalender]}
            >
              <TouchableOpacity style={styles.arrowButtonStl} onPress={prevMonth}>
                <Image source={leftArrow} style={styles.leftLight} />
              </TouchableOpacity>
              <Text style={styles.monthlySchduleDate}>{`${getFormattedHeaderDate()}`}</Text>
              <TouchableOpacity style={styles.arrowButtonStl} onPress={nextMonth}>
                <Image source={rightArrow} style={styles.leftLight} />
              </TouchableOpacity>
            </TouchableOpacity>
            <Spacer space={ms(5)} horizontal />

            {shouldShowCalendarModeOptions && (
              <View style={[styles.flexAlign, styles.calenderModeView]}>
                <TouchableOpacity
                  style={day ? styles.clickedButtonCon : styles.unClickedButtonCon}
                  onPress={dayHandler}
                >
                  <Text style={day ? styles.checkedText : styles.unCheckedText}>
                    {strings.calender.day}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={week ? styles.clickedButtonCon : styles.unClickedButtonCon}
                  onPress={weekHandler}
                >
                  <Text style={week ? styles.checkedText : styles.unCheckedText}>
                    {strings.calender.week}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={month ? styles.clickedButtonCon : styles.unClickedButtonCon}
                  onPress={monthHandler}
                >
                  <Text style={month ? styles.checkedText : styles.unCheckedText}>
                    {strings.calender.month}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{ flex: 1 }} />

        <View style={styles.deliveryView}>
          <TouchableOpacity onPress={onPressNotification}>
            <Image source={bookingsNotification} style={[styles.truckStyle]} />
          </TouchableOpacity>
          <Spacer space={ms(16)} horizontal />
          <TouchableOpacity onPress={onPressNotification}>
            <Image source={bookingsSearch} style={[styles.truckStyle]} />
          </TouchableOpacity>
        </View>
        <Spacer space={ms(8)} horizontal />

        {/* Appointment View type */}
        <View style={styles.flexAlign}>
          <TouchableOpacity
            style={
              calendarViewMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW
                ? styles.clickedButtonCon
                : styles.unClickedButtonCon
            }
            onPress={onPressCalendarViewMode}
          >
            <Image
              source={Images.calendarIcon}
              style={[styles.calenderModeIcons, { tintColor: COLORS.navy_blue }]}
            />
            <Spacer space={ms(8)} horizontal />
            <Text
              style={
                calendarViewMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW
                  ? styles.checkedText
                  : styles.unCheckedText
              }
            >
              {'Calendar View'}
            </Text>
          </TouchableOpacity>
          <Spacer space={ms(8)} horizontal />
          <TouchableOpacity
            style={
              calendarViewMode === CALENDAR_VIEW_MODES.LIST_VIEW
                ? styles.clickedButtonCon
                : styles.unClickedButtonCon
            }
            onPress={onPressListViewMode}
          >
            <Image source={listview} style={styles.calenderModeIcons} />
            <Spacer space={ms(8)} horizontal />
            <Text
              style={
                calendarViewMode === CALENDAR_VIEW_MODES.LIST_VIEW
                  ? styles.checkedText
                  : styles.unCheckedText
              }
            >
              {'List View'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CalendarHeaderWithOptions;
