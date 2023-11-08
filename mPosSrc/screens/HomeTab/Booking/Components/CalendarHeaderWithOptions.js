import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { calendarIcon, leftlight, list, newCalendar, rightlight } from '@/assets';
import { strings } from '@/localization';
import { ms } from 'react-native-size-matters';
import { CALENDAR_VIEW_MODES } from '@/constants/enums';
import { COLORS, Fonts } from '@/theme';
import DropDownPicker from 'react-native-dropdown-picker';
import { Images } from '@mPOS/assets';
import { styles } from '../styles';

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
  time,
  setTime,
  timeValue,
  setTimeValue,
  timeItem,
  setTimeItem,
  onPressCalendarIcon = () => {},
  shouldShowCalendarModeOptions = true,
  calendarViewMode,
  onPressCalendarViewMode = () => {},
  onPressListViewMode = () => {},
}) => {
  console.log('shfjhjsdhf', timeValue);
  return (
    <View style={styles.calenderHeader}>
      <View style={styles.displayFlex}>
        <View style={styles.monthlySchduel}>
          <View style={styles.displayFlex}>
            <TouchableOpacity style={styles.arrowButtonStl} onPress={prevMonth}>
              <Image source={leftlight} style={styles.leftLight} />
            </TouchableOpacity>
            <Text style={styles.monthlySchduleDate}>{`${getFormattedHeaderDate()}`}</Text>
            <TouchableOpacity style={styles.arrowButtonStl} onPress={nextMonth}>
              <Image source={rightlight} style={styles.leftLight} />
            </TouchableOpacity>

            {shouldShowCalendarModeOptions && (
              <View style={[styles.calendarView, { marginHorizontal: ms(5) }]}>
                <DropDownPicker
                  ArrowDownIconComponent={({ style }) => (
                    <Image source={Images.dropdown} style={styles.dropDownIcon} />
                  )}
                  style={[styles.dropdown]}
                  containerStyle={[
                    styles.containerStyle,
                    { zIndex: Platform.OS === 'ios' ? 100 : 2, width: ms(90) },
                  ]}
                  open={time}
                  value={timeValue}
                  items={timeItem}
                  setOpen={setTime}
                  setValue={setTimeValue}
                  setItems={setTimeItem}
                  placeholder="Weekly"
                  placeholderStyle={{
                    color: '#A7A7A7',
                    fontFamily: Fonts.Regular,
                    fontSize: ms(10),
                  }}
                  zIndex={2000}
                  zIndexInverse={2000}
                />
              </View>
            )}

            <TouchableOpacity
              style={{
                marginLeft: ms(8),
                backgroundColor: COLORS.white,
                padding: ms(5),
                borderRadius: ms(4),
              }}
              onPress={onPressCalendarIcon}
            >
              <Image source={newCalendar} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Appointment View type */}
        <View
          style={[
            styles.flexAlign,
            {
              zIndex: -99,
              position: 'absolute',
              right: 10,
            },
          ]}
        >
          <TouchableOpacity
            style={
              calendarViewMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW
                ? styles.clickedButtonCon
                : styles.unClickedButtonCon
            }
            onPress={onPressCalendarViewMode}
          >
            <Image
              source={calendarIcon}
              style={[
                styles.calendarIconView,
                {
                  tintColor:
                    calendarViewMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW
                      ? COLORS.white
                      : COLORS.darkGray,
                },
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={
              calendarViewMode === CALENDAR_VIEW_MODES.LIST_VIEW
                ? styles.clickedButtonCon
                : styles.unClickedButtonCon
            }
            onPress={onPressListViewMode}
          >
            <Image
              source={list}
              style={[
                styles.calendarIcon,
                {
                  tintColor:
                    calendarViewMode === CALENDAR_VIEW_MODES.LIST_VIEW
                      ? COLORS.white
                      : COLORS.darkGray,
                },
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CalendarHeaderWithOptions;
