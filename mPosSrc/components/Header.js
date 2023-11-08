import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { COLORS, Fonts, SH, SW } from '@/theme';
import { Images } from '@mPOS/assets';
import { ms } from 'react-native-size-matters';
import DropDownPicker from 'react-native-dropdown-picker';
import { goBack } from '@mPOS/navigation/NavigationRef';
import Modal from 'react-native-modal';
import CalendarPickerModal from './CalendarPickerModal';
import dayjs from 'dayjs';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export function Header({
  title,
  style,
  backRequired,
  rightIcon,
  notification,
  orders,
  filter,
  filterValue,
  onValueChange,
  imgStyle = {},
  rightIconOnpress,
  calendar,
  defaultFilterVal,
  dates = {},
}) {
  const maxDate = new Date(2023, 10, 29);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedDate, setSelectDate] = useState('');

  const [items, setItems] = useState([
    { label: 'Today', value: 'today' },
    { label: 'Weekly', value: 'week' },
    { label: 'Monthly', value: 'month' },
  ]);
  const defVal = () => {
    switch (defaultFilterVal) {
      case 'today':
        return 'Today';
        break;
      case 'week':
        return 'Weekly';
        break;
      case 'month':
        return 'Monthly';
        break;

      default:
        return 'Weekly';
        break;
    }
  };
  const handleCalendar = () => {
    setIsCalendarVisible((prev) => !prev);
  };

  const onSelectDate = () => {
    if (!startDate) {
      alert('Please select a date');
    } else if (!endDate) {
      alert('Please select end date');
    } else {
      setIsCalendarVisible(false);
      dates({
        start_date: startDate,
        end_date: endDate,
      });
    }
  };

  const onDateChange = (date, type) => {
    const formattedDate = dayjs(date).format('YYYY-MM-DD');
    switch (type) {
      case 'START_DATE':
        setStartDate(formattedDate);
        setEndDate();
        break;
      case 'END_DATE':
        setEndDate(formattedDate);
        break;
      default:
        setSelectDate(formattedDate);
        break;
    }
  };

  const clearField = () => {
    setEndDate('');
    setStartDate('');
    setSelectDate('');
  };

  const handleCloseCalendar = () => {
    setIsCalendarVisible(false);
    clearField();
  };

  return (
    <View style={styles.container}>
      {backRequired ? (
        <TouchableOpacity onPress={() => goBack()} style={styles.row}>
          <Image source={Images.back} resizeMode="contain" style={styles.backIcon} />
          <Text style={styles.regularTextStyle}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.boldText}>{title}</Text>
        </View>
      )}
      <View style={styles.row}>
        {notification && (
          <TouchableOpacity style={styles.rightIconView}>
            <Image source={Images.bell} style={styles.bell} resizeMode="contain" />
          </TouchableOpacity>
        )}
        {orders && (
          <TouchableOpacity onPress={rightIconOnpress} style={styles.rightIconView}>
            <Image source={Images.products} style={styles.bell} resizeMode="contain" />
          </TouchableOpacity>
        )}
        {calendar && (
          <TouchableOpacity style={styles.calendarView} onPress={handleCalendar}>
            <Image
              source={Images.calendar2}
              style={styles.calendarIconStyle}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {filter && (
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            onChangeValue={(item) => {
              onValueChange(item);
            }}
            setItems={setItems}
            placeholder={defVal()}
            containerStyle={styles.dropDownContainerStyle}
            style={styles.dropdownStyle}
            arrowIconStyle={styles.arrowIconStyle}
            textStyle={{
              color: COLORS.white,
              fontFamily: Fonts.Regular,
              fontSize: ms(10),
            }}
            listItemLabelStyle={{ color: COLORS.black }}
            zIndex={999}
            TickIconComponent={() => {}}
          />
        )}

        <Modal
          isVisible={isCalendarVisible}
          statusBarTranslucent
          animationIn={'fadeIn'}
          animationInTiming={600}
          animationOutTiming={300}
        >
          <View style={styles.calendarModalView}>
            <CalendarPickerModal
              onPress={handleCloseCalendar}
              onDateChange={onDateChange}
              onSelectedDate={onSelectDate}
              allowRangeSelection={true}
              maxDate={maxDate}
              onCancelPress={handleCloseCalendar}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
}

Header.propTypes = {
  style: PropTypes.object,
  iconstyle: PropTypes.object,
};

Header.defaultProps = {
  style: null,
  iconstyle: null,
  tabView: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: ms(60),
    width: '100%',
    paddingLeft: ms(16),
    paddingRight: ms(11),
    paddingVertical: ms(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 999,
  },
  regularTextStyle: {
    fontFamily: Fonts.Medium,
    fontSize: ms(14),
    color: COLORS.solid_grey,
  },
  backIcon: {
    height: ms(24),
    width: ms(24),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bell: {
    width: ms(24),
    height: ms(24),
  },
  rightIconView: {
    marginHorizontal: ms(5),
  },
  boldText: {
    fontFamily: Fonts.SemiBold,
    fontSize: ms(14),
    color: COLORS.solid_grey,
  },
  dropDownContainerStyle: {
    borderWidth: 0,
    width: ms(88),
    zIndex: 999,
  },
  dropdownStyle: {
    minHeight: ms(28),
    borderWidth: 0,
    borderRadius: ms(5),
    backgroundColor: COLORS.primary,
    width: ms(88),
    zIndex: 999,
  },
  arrowIconStyle: {
    height: ms(16),
    width: ms(16),
    tintColor: COLORS.white,
    marginLeft: SW(-5),
  },
  calendarView: {
    backgroundColor: COLORS.white,
    height: ms(28),
    borderRadius: ms(5),
    width: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: ms(10),
  },
  calendarIconStyle: {
    height: ms(23),
    width: ms(23),
    padding: ms(5),
    tintColor: COLORS.primary,
  },
  calendarModalView: {
    backgroundColor: COLORS.white,
    width: windowWidth - SW(30),
    height: windowHeight * 0.6,
    alignSelf: 'center',
    paddingVertical: SH(10),
    paddingHorizontal: SW(5),
    borderRadius: SW(5),
    // flex: 1,
  },

  // maincontainer: {
  //   height: SH(50),
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   ...ShadowStyles.shadow,
  //   backgroundColor: COLORS.white,
  //   alignSelf: 'center',
  //   paddingRight: 15,
  //   justifyContent: 'space-between',
  //   width: Dimensions.get('window').width,
  // },
  // container: {
  //   right: SW(2),
  //   alignSelf: 'center',
  //   position: 'absolute',
  // },
  // title: {
  //   fontSize: SF(14),
  //   color: COLORS.dark_gray,
  //   fontFamily: Fonts.SemiBold,
  // },
  // emptyView: {
  //   width: SH(31),
  //   height: '100%',
  // },
  // backViewStyle: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // rightImageStyle: {
  //   width: SW(24),
  //   height: SW(24),
  //   resizeMode: 'contain',
  // },
});
