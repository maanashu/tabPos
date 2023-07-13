import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  bell,
  notifications,
  search_light,
  roundCalender,
  calendarIcon,
  todayCalendarIcon,
  calendarSettingsIcon,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS } from '@/theme';
import { ScreenWrapper } from '@/components';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import { Calendar } from '@/components/CustomCalendar';
import { CALENDAR_MODES } from '@/constants/enums';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointment } from '@/actions/AppointmentAction';
import { getAppointmentSelector } from '@/selectors/AppointmentSelector';
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AppointmentTypes';
import { useIsFocused } from '@react-navigation/native';
import CustomEventCell from './Components/CustomEventCell';
import CustomHoursCell from './Components/CustomHoursCell';
import CalendarHeaderWithOptions from './Components/CalendarHeaderWithOptions';
import ScheduleDetailModal from './Components/ScheduleDetailModal';
import EventItemCard from './Components/EventItemCard';
import CalendarSettingModal from './Components/CalendarSettingModal';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import EventDetailModal from './Components/EventDetailModal';

moment.suppressDeprecationWarnings = true;

export function Calender(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getCalenderData = useSelector(getAppointmentSelector);
  const getAppointmentList = getCalenderData?.getAppointment;
  const [storeItem, setStoreItem] = useState();
  const [extractedAppointment, setExtractedAppointment] = useState([]);
  const [showRequestsView, setshowRequestsView] = useState(false);
  const [isCalendarSettingModalVisible, setisCalendarSettingModalVisible] =
    useState(false);

  const [showEventDetailModal, setshowEventDetailModal] = useState(false);
  const [eventData, setEventData] = useState({});

  const getAppointmentList2 = getAppointmentList?.filter(
    item => item.status !== 3
  );

  // Only show appointments on calendar which are approved
  const getApprovedAppointments = getAppointmentList?.filter(
    item => item.status === 1
  );

  // Will be used to show list of all appointments
  const appointmentListArr = getAppointmentList2?.filter(
    item => item.status !== 1
  );

  const data = {
    zipcode: storeItem?.current_address?.zipcode,
    street: storeItem?.current_address?.street_address,
    city: storeItem?.current_address?.city,
    state: storeItem?.current_address?.state,
    country: storeItem?.current_address?.country,
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(getAppointment());
    }
  }, [isFocused]);

  useEffect(() => {
    if (getApprovedAppointments) {
      const extractedAppointmentEvents = getApprovedAppointments.map(
        booking => {
          const startDateTime = new Date(booking.start_date_time);
          const endDateTime = new Date(booking.end_date_time);

          return {
            title: booking.appointment_details[0]?.product_name || 'NULL',
            start: startDateTime,
            end: endDateTime,
            completeData: booking,
          };
        }
      );

      setExtractedAppointment(extractedAppointmentEvents);
    }
  }, [getAppointmentList]);

  const [schduleDetail, setSchduleDetail] = useState(false);
  const [week, setWeek] = useState(true);
  const [month, setMonth] = useState(false);
  const [day, setDay] = useState(false);

  const [calendarDate, setCalendarDate] = useState(moment());
  const [calendarMode, setCalendarMode] = useState(CALENDAR_MODES.WEEK);

  const nextMonth = () =>
    setCalendarDate(calendarDate.clone().add(1, calendarMode));
  const prevMonth = () =>
    setCalendarDate(calendarDate.clone().subtract(1, calendarMode));

  const weekHandler = () => {
    setCalendarMode(CALENDAR_MODES.WEEK);
    setWeek(!week);
    setMonth(false);
    setDay(false);
  };
  const monthHandler = () => {
    setCalendarMode(CALENDAR_MODES.MONTH);
    setMonth(!month);
    setWeek(false);
    setDay(false);
  };
  const dayHandler = () => {
    setCalendarMode(CALENDAR_MODES.DAY);
    setDay(!day);
    setMonth(false);
    setWeek(false);
  };

  const getFormattedHeaderDate = () => {
    if (
      calendarMode === CALENDAR_MODES.MONTH ||
      calendarMode === CALENDAR_MODES.WEEK
    ) {
      return calendarDate.format('MMM YYYY');
    } else if (calendarMode === CALENDAR_MODES.DAY) {
      return calendarDate.format('DD MMM YYYY');
    }
  };
  const isRequestLoading = useSelector(state =>
    isLoadingSelector([TYPES.GET_APPOINTMENTS], state)
  );

  const eventItem = ({ item, index }) => {
    return <EventItemCard item={item} index={index} />;
  };

  const schduleDetailModal = () => {
    return (
      <ScheduleDetailModal
        {...{
          schduleDetail,
          setSchduleDetail,
          storeItem,
          data,
        }}
      />
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
          <TouchableOpacity
            onPress={() =>
              navigate(NAVIGATION.notificationsList, {
                screen: NAVIGATION.calender,
              })
            }
          >
            <Image source={bell} style={[styles.truckStyle, { right: 25 }]} />
          </TouchableOpacity>
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
    <ScreenWrapper>
      <View style={styles.container}>
        {customHeader()}
        <View style={[styles.calenderContainer, { flexDirection: 'row' }]}>
          <View style={styles.calenderCon}>
            <CalendarHeaderWithOptions
              {...{
                prevMonth,
                getFormattedHeaderDate,
                nextMonth,
                day,
                dayHandler,
                week,
                weekHandler,
                month,
                monthHandler,
              }}
            />

            <View style={styles._calendarContainer}>
              <Calendar
                ampm
                swipeEnabled={false}
                date={calendarDate}
                mode={calendarMode}
                events={extractedAppointment}
                height={windowHeight * 0.91}
                headerContainerStyle={{
                  height:
                    calendarMode === CALENDAR_MODES.MONTH ? 'auto' : ms(38),
                  backgroundColor: COLORS.textInputBackground,
                  paddingTop: ms(5),
                }}
                dayHeaderHighlightColor={COLORS.dayHighlight}
                hourComponent={CustomHoursCell}
                onPressEvent={event => {
                  setEventData(event);
                  setshowEventDetailModal(true);
                }}
                renderEvent={CustomEventCell}
              />
            </View>
          </View>
          <View style={styles.rightTabContainer}>
            <TouchableOpacity
              onPress={() => {
                if (appointmentListArr?.length === 0) {
                  setshowRequestsView(false);
                } else {
                  setshowRequestsView(!showRequestsView);
                }
              }}
              style={styles.requestCalendarContainer}
            >
              <View>
                <Image
                  source={calendarIcon}
                  style={styles.requestCalendarIcon}
                />
                <View style={styles.requestEventBadgeContainer}>
                  <Text style={styles.RequestEventBadgeText}>
                    {appointmentListArr?.length ?? 0}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.alignmentCalendarContainer}>
                <Image
                  source={todayCalendarIcon}
                  style={styles.asignessCalendarImage}
                />
                <View style={styles.circularBadgeContainer}>
                  <Text style={styles.asigneesBadgeText}>{0}</Text>
                </View>
              </TouchableOpacity>
              <FlatList
                data={[1, 2, 3, 4, 5]}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: ms(40) }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity style={styles.renderItemContainer}>
                      <Image
                        source={{
                          uri: `https://xsgames.co/randomusers/avatar.php?g=male`,
                        }}
                        style={styles.employeeImages}
                      />

                      <View style={styles.circularBadgeEmployee}>
                        <Text style={styles.badgeTextEmployee}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

              <TouchableOpacity
                onPress={() => setisCalendarSettingModalVisible(true)}
                style={styles.CalendarSettingsContainer}
              >
                <Image
                  source={calendarSettingsIcon}
                  style={styles.calendarIconSettings}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showRequestsView && (
          <View style={styles.notificationCon}>
            {isRequestLoading ? (
              <View style={{ marginTop: 50 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : appointmentListArr?.length === 0 ? (
              <View>
                <Text style={styles.requestNotFound}>Request not found</Text>
              </View>
            ) : (
              <View style={{ marginBottom: ms(40) }}>
                <Text style={styles._requestTitle}>
                  {`Request (${appointmentListArr?.length ?? 0})`}
                </Text>
                <FlatList
                  data={appointmentListArr}
                  keyExtractor={(_, index) => index}
                  renderItem={eventItem}
                />
              </View>
            )}
          </View>
        )}

        <CalendarSettingModal
          isVisible={isCalendarSettingModalVisible}
          setIsVisible={setisCalendarSettingModalVisible}
        />

        <EventDetailModal
          {...{ eventData, showEventDetailModal, setshowEventDetailModal }}
        />

        {schduleDetailModal()}
      </View>
    </ScreenWrapper>
  );
}
