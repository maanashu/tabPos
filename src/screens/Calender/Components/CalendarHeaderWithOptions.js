import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { leftlight, newCalendar, rightlight } from '@/assets';
import { strings } from '@/localization';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';

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
}) => {
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
            <TouchableOpacity style={{ marginLeft: ms(8) }} onPress={onPressCalendarIcon}>
              <Image source={newCalendar} style={styles.calendarIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.flexAlign}>
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
      </View>
    </View>
  );
};

export default CalendarHeaderWithOptions;
