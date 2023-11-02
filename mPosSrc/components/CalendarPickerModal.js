import { Images, cross } from '@mPOS/assets';
import { Button, Spacer } from '@mPOS/components';
import { COLORS, Fonts, SH, SW } from '@/theme';
import React, { useState } from 'react';
import { useMemo, memo } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { ms } from 'react-native-size-matters';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CalendarPickerModal = ({
  onPress,
  onDateChange = () => {},
  handleOnPressNext = () => {},
  onSelectedDate = () => {},
  allowRangeSelection,
  maxDate,
  selectedStartDate,
  onCancelPress = () => {},
}) => {
  const minDate = useMemo(() => new Date(2020, 1, 1), []);
  const [selectedDate, setSelectDate] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.flexAlign}>
        {/* <Text style={styles.headerText}>{'Filter'}</Text> */}
        <TouchableOpacity style={styles.imageView} onPress={onPress}>
          <Image source={Images.cross} style={styles.headerImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <CalendarPicker
        selectedStartDate={selectedStartDate}
        startFromMonday={true}
        allowRangeSelection={allowRangeSelection}
        minDate={minDate}
        maxDate={maxDate}
        todayBackgroundColor="white"
        todayTextStyle={'black'}
        selectedDayColor={COLORS.primary}
        selectedDayTextColor="#FFFFFF"
        onDateChange={(date, type) => {
          onDateChange(date, type);
          setSelectDate(date);
        }}
        onPressNext={handleOnPressNext}
        headerWrapperStyle={styles.headerWrapper}
        textStyle={{ fontSize: ms(12) }}
        width={ms(300)}
        height={ms(400)}
        scaleFactor={400}
      />
      {/* <View style={styles.flexDirectionRow}>
        <Button
          onPress={onCancelPress}
          style={styles.cancelButton}
          title={"Cancel"}
          title={"Cancel"}
          textStyle={styles.cancelText}
        />
        <Button
          style={styles.applyButton}
          title={"Apply"}
          title={"Apply"}
          textStyle={styles.applyText}
          onPress={() => {
            onSelectedDate(selectedDate);
          }}
        />
      </View> */}
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          marginHorizontal: ms(20),
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: ms(25),
        }}
      >
        <Button style={{ flex: 1 }} title={'Cancel'} onPress={onCancelPress} />
        <Spacer space={SW(10)} horizontal />
        <Button
          style={{ flex: 1 }}
          title={'Apply'}
          onPress={() => {
            onSelectedDate(selectedDate);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  flexAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: ms(5),
    marginHorizontal: ms(10),
  },
  imageView: {
    backgroundColor: COLORS.inputBorder,
    padding: ms(4),
    marginRight: ms(5),
  },
  headerImage: {
    tintColor: COLORS.darkBlue,
    height: SH(25),
    width: SW(25),
  },
  flexDirectionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: ms(15),
    right: 0,
    left: 0,
  },
  headerWrapper: {
    width: SW(320),
    height: Platform.OS === 'ios' ? ms(50) : ms(60),
  },
  cancelText: {
    color: COLORS.dark_gray,
    color: COLORS.dark_gray,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
  cancelButton: {
    backgroundColor: COLORS.inputBorder,
    height: ms(30),
    width: '40%',
    width: '40%',
    marginTop: ms(10),
    color: COLORS.black,
    marginHorizontal: ms(5),
    fontFamily: Fonts.Regular,
    padding: 0,
  },
  applyText: {
    color: COLORS.white,
    fontSize: ms(11),
    fontFamily: Fonts.Regular,
  },
  applyButton: {
    backgroundColor: COLORS.darkBlue,
    height: ms(30),
    width: '40%',
    width: '40%',
    marginTop: ms(10),
    color: COLORS.white,
    fontFamily: Fonts.Regular,
    padding: 0,
  },
});

export default memo(CalendarPickerModal);
