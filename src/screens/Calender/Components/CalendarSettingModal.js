import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Fonts, calendarSettingsIcon, crossButton } from '@/assets';
import { COLORS, SF } from '@/theme';
import { ms } from 'react-native-size-matters';
import Modal from 'react-native-modal';
import {
  APPOINTMENT_REQUEST_MODE,
  CALENDAR_MODES,
  CALENDAR_TIME_FORMAT,
  EMPLOYEES_COLOR_SET_MODE,
} from '@/constants/enums';
import { useSelector } from 'react-redux';
import { getSetting } from '@/selectors/SettingSelector';
import { height, width } from '@/theme/ScalerDimensions';
import { Images } from '@/assets/new_icon';
import { Spacer } from '@/components';

const CalendarSettingModal = ({
  isVisible,
  setIsVisible,
  currentCalendarMode,
  currentTimeFormat,
  onPressSave = () => {},
}) => {
  const getSettingData = useSelector(getSetting);
  const defaultSettingsForCalendar = getSettingData?.getSetting;
  const [defaultCalendarMode, setDefaultCalendarMode] = useState(currentCalendarMode);
  const [defaultTimeFormat, setDefaultTimeFormat] = useState(currentTimeFormat);
  const [defaultAppointmentRequestMode, setDefaultAppointmentRequestMode] = useState(
    defaultSettingsForCalendar?.accept_appointment_request ?? APPOINTMENT_REQUEST_MODE.MANUAL
  );
  const [defaultEmployeesColorSet, setDefaultEmployeesColorSet] = useState(
    defaultSettingsForCalendar?.employee_color_set ?? EMPLOYEES_COLOR_SET_MODE.DEFAULT
  );
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.11}
      style={{ position: 'absolute', right: width * 0.04, top: height * 0.05 }}
    >
      <View style={styles.calendarSettingModalContainer}>
        <View style={styles.preferanceHeader}>
          <Image source={calendarSettingsIcon} resizeMode="contain" style={styles.settingIcon} />
          <Text style={styles.title}>Preferences</Text>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(false);
            }}
          >
            <Image source={crossButton} resizeMode="contain" style={styles.settingIcon} />
          </TouchableOpacity>
        </View>
        {/* <View style={styles.mainOptionTitleContainer} /> */}

        <View style={{ marginTop: ms(15) }}>
          <Text style={styles.substitle}>Default Calendar View</Text>
          <Spacer space={ms(3)} />

          <View style={styles.subContainerCheckBox}>
            <TouchableOpacity
              onPress={() => setDefaultCalendarMode(CALENDAR_MODES.DAY)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultCalendarMode === CALENDAR_MODES.DAY
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
              />

              <Text style={styles.checkboxTitle}>Day View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDefaultCalendarMode(CALENDAR_MODES.WEEK)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultCalendarMode === CALENDAR_MODES.WEEK
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
              />
              <Text style={styles.checkboxTitle}>Week View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setDefaultCalendarMode(CALENDAR_MODES.MONTH)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultCalendarMode === CALENDAR_MODES.MONTH
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
              />
              <Text style={styles.checkboxTitle}>Month View</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainOptionTitleContainer} />
        <View>
          <Text style={styles.substitle}>Time Format</Text>

          <Spacer space={ms(3)} />
          <View style={styles.subContainerCheckBox}>
            <TouchableOpacity
              onPress={() => setDefaultTimeFormat(CALENDAR_TIME_FORMAT.TWELVE_HOUR)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultTimeFormat === CALENDAR_TIME_FORMAT.TWELVE_HOUR
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
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
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
              />
              <Text style={styles.checkboxTitle}>24 Hours</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainOptionTitleContainer} />

        <View>
          <Text style={styles.substitle}>Appointment Request</Text>

          <Spacer space={ms(3)} />

          <View style={styles.subContainerCheckBox}>
            <TouchableOpacity
              onPress={() => setDefaultAppointmentRequestMode(APPOINTMENT_REQUEST_MODE.MANUAL)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultAppointmentRequestMode === APPOINTMENT_REQUEST_MODE.MANUAL
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
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
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
              />
              <Text style={styles.checkboxTitle}>Accept Automatically</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainOptionTitleContainer} />

        <View>
          <Text style={styles.substitle}>Employee's Color Set</Text>

          <Spacer space={ms(3)} />
          <View style={styles.subContainerCheckBox}>
            <TouchableOpacity
              onPress={() => setDefaultEmployeesColorSet(EMPLOYEES_COLOR_SET_MODE.DEFAULT)}
              style={styles.checkboxContainer}
            >
              <Image
                source={
                  defaultEmployeesColorSet === EMPLOYEES_COLOR_SET_MODE.DEFAULT
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
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
                    ? Images.radioFilled
                    : Images.radioBlank
                }
                style={styles.checkboxIcon}
                resizeMode="contain"
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
            <Text style={styles.declineText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              const calendarSettings = {
                defaultCalendarMode: defaultCalendarMode,
                defaultTimeFormat: defaultTimeFormat,
                defaultAppointmentRequestMode: defaultAppointmentRequestMode,
                defaultEmployeesColorSet: defaultEmployeesColorSet,
              };
              onPressSave(calendarSettings);
              setIsVisible(false);
            }}
            style={[styles.acceptbtnContainer]}
          >
            <Text style={styles.approveText}>Save Changes</Text>
            <Image
              source={Images.arrowUpRightIcon}
              resizeMode="contain"
              style={styles.arrowImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CalendarSettingModal;

const styles = StyleSheet.create({
  checkboxTitle: {
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    fontSize: ms(7),
    marginLeft: ms(5),
  },
  checkboxIcon: { height: ms(10), width: ms(10) },
  checkboxContainer: { flexDirection: 'row', flex: 1 },
  subContainerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: ms(7),
  },
  substitle: {
    fontFamily: Fonts.Medium,
    color: COLORS.navy_blue,
    fontSize: ms(8),
  },
  mainOptionTitleContainer: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.light_purple,
    marginVertical: ms(10),
  },
  title: { fontFamily: Fonts.Medium, fontSize: ms(10), color: COLORS.navy_blue },
  calendarSettingModalContainer: {
    width: ms(290),
    height: ms(310),
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
    height: ms(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.input_border,
    borderRadius: ms(30),
    width: ms(110),
  },
  acceptbtnContainer: {
    height: ms(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.navy_blue,
    borderRadius: ms(30),
    marginLeft: ms(8),
    width: ms(110),
    flexDirection: 'row',
  },
  approveText: {
    color: COLORS.white,
    fontSize: SF(12),
    fontFamily: Fonts.Regular,
  },
  declineText: {
    fontFamily: Fonts.Medium,
    fontSize: ms(8),
    color: COLORS.navy_blue,
  },
  preferanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingIcon: {
    height: ms(18),
    width: ms(18),
    tintColor: COLORS.navy_blue,
  },
  arrowImage: {
    height: 20,
    width: 20,
    tintColor: COLORS.sky_blue,
    top: 1,
    left: 3,
  },
});
