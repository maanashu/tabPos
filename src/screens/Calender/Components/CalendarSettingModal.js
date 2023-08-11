import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Fonts, radioSelect, radioUnSelect } from '@/assets';
import { COLORS, SF } from '@/theme';
import { ms } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {
  APPOINTMENT_REQUEST_MODE,
  CALENDAR_MODES,
  CALENDAR_TIME_FORMAT,
  EMPLOYEES_COLOR_SET_MODE,
} from '@/constants/enums';

const CalendarSettingModal = ({ isVisible, setIsVisible, onPressSave = () => {} }) => {
  const [defaultCalendarMode, setDefaultCalendarMode] = useState(CALENDAR_MODES.WEEK);
  const [defaultTimeFormat, setDefaultTimeFormat] = useState(CALENDAR_TIME_FORMAT.TWELVE_HOUR);
  const [defaultAppointmentRequestMode, setDefaultAppointmentRequestMode] = useState(
    APPOINTMENT_REQUEST_MODE.MANUAL
  );
  const [defaultEmployeesColorSet, setDefaultEmployeesColorSet] = useState(
    EMPLOYEES_COLOR_SET_MODE.DEFAULT
  );
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.calendarSettingModalContainer}>
        <Text style={styles.title}>Preference</Text>
        <View style={styles.mainOptionTitleContainer} />

        <View style={{ marginTop: ms(15) }}>
          <Text style={styles.substitle}>Default Calendar View</Text>

          <View style={styles.subContainerCheckBox}>
            <TouchableOpacity
              onPress={() => setDefaultCalendarMode(CALENDAR_MODES.DAY)}
              style={styles.checkboxContainer}
            >
              <Image
                source={defaultCalendarMode === CALENDAR_MODES.DAY ? radioSelect : radioUnSelect}
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>Day View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDefaultCalendarMode(CALENDAR_MODES.WEEK)}
              style={styles.checkboxContainer}
            >
              <Image
                source={defaultCalendarMode === CALENDAR_MODES.WEEK ? radioSelect : radioUnSelect}
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>Week View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDefaultCalendarMode(CALENDAR_MODES.MONTH)}
              style={styles.checkboxContainer}
            >
              <Image
                source={defaultCalendarMode === CALENDAR_MODES.MONTH ? radioSelect : radioUnSelect}
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>Month View</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: ms(15) }}>
          <Text style={styles.substitle}>Time Format</Text>

          <View style={styles.subContainerCheckBox}>
            <TouchableOpacity
              onPress={() => setDefaultTimeFormat(CALENDAR_TIME_FORMAT.TWELVE_HOUR)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultTimeFormat === CALENDAR_TIME_FORMAT.TWELVE_HOUR
                    ? radioSelect
                    : radioUnSelect
                }
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>12 Hours(AM/PM)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDefaultTimeFormat(CALENDAR_TIME_FORMAT.TWENTY_FOUR_HOURS)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultTimeFormat === CALENDAR_TIME_FORMAT.TWENTY_FOUR_HOURS
                    ? radioSelect
                    : radioUnSelect
                }
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>24 Hours</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: ms(15) }}>
          <Text style={styles.substitle}>Appointment Request</Text>

          <View style={styles.subContainerCheckBox}>
            <TouchableOpacity
              onPress={() => setDefaultAppointmentRequestMode(APPOINTMENT_REQUEST_MODE.MANUAL)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultAppointmentRequestMode === APPOINTMENT_REQUEST_MODE.MANUAL
                    ? radioSelect
                    : radioUnSelect
                }
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>Accept Manually</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDefaultAppointmentRequestMode(APPOINTMENT_REQUEST_MODE.AUTOMATIC)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultAppointmentRequestMode === APPOINTMENT_REQUEST_MODE.AUTOMATIC
                    ? radioSelect
                    : radioUnSelect
                }
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>Accept Automatically</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: ms(15) }}>
          <Text style={styles.substitle}>Employee's Color Set</Text>

          <View style={styles.subContainerCheckBox}>
            <TouchableOpacity
              onPress={() => setDefaultEmployeesColorSet(EMPLOYEES_COLOR_SET_MODE.DEFAULT)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultEmployeesColorSet === EMPLOYEES_COLOR_SET_MODE.DEFAULT
                    ? radioSelect
                    : radioUnSelect
                }
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDefaultEmployeesColorSet(EMPLOYEES_COLOR_SET_MODE.MANUAL)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultEmployeesColorSet === EMPLOYEES_COLOR_SET_MODE.MANUAL
                    ? radioSelect
                    : radioUnSelect
                }
                style={styles.checkboxIcon}
              />
              <Text style={styles.checkboxTitle}>Manual</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles._btnContainer}>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
            style={styles.declineBtnContainer}
          >
            <Text style={styles.declineText}>Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const calendatSettings = {
                defaultCalendarMode: defaultCalendarMode,
                defaultTimeFormat: defaultTimeFormat,
                defaultAppointmentRequestMode: defaultAppointmentRequestMode,
                defaultEmployeesColorSet: defaultEmployeesColorSet,
              };
              onPressSave(calendatSettings);
              setIsVisible(false);
            }}
            style={[styles.acceptbtnContainer]}
          >
            <Text style={styles.approveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarSettingModal;

const styles = StyleSheet.create({
  checkboxTitle: {
    fontFamily: Fonts.Regular,
    color: COLORS.darkGray,
    fontSize: ms(7),
    marginLeft: ms(5),
  },
  checkboxIcon: { height: ms(10), width: ms(10), resizeMode: 'contain' },
  checkboxContainer: { flexDirection: 'row', flex: 1 },
  subContainerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: ms(7),
  },
  substitle: {
    fontFamily: Fonts.Regular,
    color: COLORS.black,
    fontSize: ms(7),
  },
  mainOptionTitleContainer: {
    height: 2,
    width: '100%',
    backgroundColor: COLORS.textInputBackground,
    marginVertical: ms(5),
  },
  title: { fontFamily: Fonts.SemiBold, fontSize: ms(8), color: COLORS.black },
  calendarSettingModalContainer: {
    width: ms(290),
    height: ms(300),
    backgroundColor: 'white',
    padding: ms(10),
    paddingVertical: ms(15),
    alignSelf: 'center',
    borderRadius: ms(10),
  },
  _btnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: ms(10),
    alignSelf: 'center',
  },
  declineBtnContainer: {
    height: ms(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.textInputBackground,
    flex: 1,
    borderRadius: ms(3),
  },
  acceptbtnContainer: {
    height: ms(25),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: ms(3),
    marginLeft: ms(8),
  },
  approveText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  declineText: {
    fontFamily: Fonts.Regular,
    fontSize: ms(8),
    color: COLORS.dark_grey,
  },
});
