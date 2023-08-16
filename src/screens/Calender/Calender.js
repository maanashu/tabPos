import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  bell,
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
import { getAppointment, getStaffUsersList } from '@/actions/AppointmentAction';
import { getAppointmentSelector } from '@/selectors/AppointmentSelector';
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AppointmentTypes';
import { useIsFocused } from '@react-navigation/native';
import CustomEventCell from './Components/CustomEventCell';
import CustomHoursCell from './Components/CustomHoursCell';
import CalendarHeaderWithOptions from './Components/CalendarHeaderWithOptions';
import EventItemCard from './Components/EventItemCard';
import CalendarSettingModal from './Components/CalendarSettingModal';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import EventDetailModal from './Components/EventDetailModal';
import { getSettings, upadteApi } from '@/actions/SettingAction';
import { getSetting } from '@/selectors/SettingSelector';

moment.suppressDeprecationWarnings = true;

export function Calender(props) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const getSettingData = useSelector(getSetting);
  const defaultSettingsForCalendar = getSettingData?.getSetting;
  const getCalenderData = useSelector(getAppointmentSelector);
  const getAppointmentList = getCalenderData?.getAppointment;
  const getAppointmentByStaffIdList = getCalenderData?.geAppointmentById;
  const getStaffUsers = getCalenderData?.staffUsers;
  const appointmentPages = getCalenderData?.pages;
  const [storeItem, setStoreItem] = useState();
  const [extractedAppointment, setExtractedAppointment] = useState([]);
  const [showRequestsView, setshowRequestsView] = useState(false);
  const [isCalendarSettingModalVisible, setisCalendarSettingModalVisible] = useState(false);
  const [showEmployeeHeader, setshowEmployeeHeader] = useState(false);
  const [showEventDetailModal, setshowEventDetailModal] = useState(false);
  const [eventData, setEventData] = useState({});

  const [week, setWeek] = useState(true);
  const [month, setMonth] = useState(false);
  const [day, setDay] = useState(false);
  const [isAMPM, setisAMPM] = useState(defaultSettingsForCalendar?.time_format === '12' ?? true);

  const [calendarDate, setCalendarDate] = useState(moment());
  const [calendarMode, setCalendarMode] = useState(
    defaultSettingsForCalendar?.calender_view ?? CALENDAR_MODES.WEEK
  );

  const [selectedStaffEmployeeId, setSelectedStaffEmployeeId] = useState(null);
  const [selectedStaffData, setSelectedStaffData] = useState(null);

  //Pagination for appointments
  const [pageNumber, setPageNumber] = useState(1);

  const getAppointmentList2 = getAppointmentList?.filter((item) => item.status !== 3);

  // Only show appointments on calendar which are approved
  const getApprovedAppointments = getAppointmentList?.filter((item) => item.status === 1);

  // Will be used to show list of all unaccepted appointments
  const appointmentListArr = getAppointmentList2?.filter((item) => item.status !== 1);

  const totalAppointmentCountOfStaff =
    getStaffUsers?.reduce((total, user) => total + user.appointment_counts, 0) || 0;

  const data = {
    zipcode: storeItem?.current_address?.zipcode,
    street: storeItem?.current_address?.street_address,
    city: storeItem?.current_address?.city,
    state: storeItem?.current_address?.state,
    country: storeItem?.current_address?.country,
  };

  const getAppointmentsForSelectedStaff = () => {
    const filteredAppointments = getApprovedAppointments?.filter(
      (appointments) => appointments?.pos_user_id === selectedStaffEmployeeId
    );

    return filteredAppointments;
  };

  useEffect(() => {
    if (isFocused || showRequestsView) {
      dispatch(getAppointment(pageNumber));
    }
  }, [isFocused, pageNumber, showRequestsView]);

  useEffect(() => {
    if (selectedStaffEmployeeId) {
      getAppointmentsForSelectedStaff();
    }
  }, [selectedStaffEmployeeId]);

  useEffect(() => {
    if (isFocused) {
      dispatch(getStaffUsersList());
      dispatch(getSettings());
    }
  }, [isFocused]);

  useEffect(() => {
    if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.DAY) {
      dayHandler();
    } else if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.WEEK) {
      weekHandler();
    } else if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.MONTH) {
      monthHandler();
    }
  }, [defaultSettingsForCalendar]);

  useEffect(() => {
    if (getApprovedAppointments) {
      const approvedAppointmentsFor = selectedStaffEmployeeId
        ? getAppointmentsForSelectedStaff()
        : getApprovedAppointments;

      const extractedAppointmentEvents = approvedAppointmentsFor.map((booking) => {
        const startDateTime = new Date(booking.start_date_time);
        const endDateTime = new Date(booking.end_date_time);

        return {
          title: booking.appointment_details[0]?.product_name || 'NULL',
          start: startDateTime,
          end: endDateTime,
          completeData: booking,
        };
      });

      setExtractedAppointment(extractedAppointmentEvents);
    }
  }, [getAppointmentList, selectedStaffEmployeeId]);

  const nextMonth = () => setCalendarDate(calendarDate.clone().add(1, calendarMode));
  const prevMonth = () => setCalendarDate(calendarDate.clone().subtract(1, calendarMode));

  const weekHandler = () => {
    setCalendarMode(CALENDAR_MODES.WEEK);
    setWeek(true);
    setMonth(false);
    setDay(false);
  };
  const monthHandler = () => {
    setCalendarMode(CALENDAR_MODES.MONTH);
    setMonth(true);
    setWeek(false);
    setDay(false);
  };
  const dayHandler = () => {
    setCalendarMode(CALENDAR_MODES.DAY);
    setDay(true);
    setMonth(false);
    setWeek(false);
  };

  const onPressSaveCalendarSettings = (calendarPreferences) => {
    if (calendarPreferences?.defaultCalendarMode === CALENDAR_MODES.DAY) {
      dayHandler();
    } else if (calendarPreferences?.defaultCalendarMode === CALENDAR_MODES.WEEK) {
      weekHandler();
    } else if (calendarPreferences?.defaultCalendarMode === CALENDAR_MODES.MONTH) {
      monthHandler();
    }
    setisAMPM(calendarPreferences?.defaultTimeFormat);

    const data = {
      calender_view: calendarPreferences?.defaultCalendarMode,
      time_format: calendarPreferences?.defaultTimeFormat ? '12' : '24',
      accept_appointment_request: calendarPreferences?.defaultAppointmentRequestMode,
      employee_color_set: calendarPreferences?.defaultEmployeesColorSet,
    };
    dispatch(upadteApi(data));
  };

  const getFormattedHeaderDate = () => {
    if (calendarMode === CALENDAR_MODES.MONTH || calendarMode === CALENDAR_MODES.WEEK) {
      return calendarDate.format('MMM YYYY');
    } else if (calendarMode === CALENDAR_MODES.DAY) {
      return calendarDate.format('DD MMM YYYY');
    }
  };
  const isRequestLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_APPOINTMENTS], state)
  );

  const eventItem = ({ item, index }) => {
    return <EventItemCard item={item} index={index} />;
  };

  const handleEndReached = () => {
    if (!selectedStaffEmployeeId) {
      if (appointmentPages?.currentPages < appointmentPages?.totalPages) {
        setPageNumber(pageNumber + 1);
      }
    }
  };

  const renderLoader = () => {
    // Render the loader component when loading more data is in progress.
    return isRequestLoading ? <ActivityIndicator size="large" color="#000000" /> : null;
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

  const employeeHeader = () => {
    const staffUsers = selectedStaffEmployeeId ? [selectedStaffData] : getStaffUsers;
    return (
      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.headerScrollContainer,
            { paddingLeft: calendarMode === CALENDAR_MODES.MONTH ? 0 : ms(25) },
          ]}
        >
          {staffUsers?.map((item, index) => {
            const userProfile = item?.user?.user_profiles;
            const userRoles = item?.user?.user_roles[0]?.role?.name;
            return (
              <View style={styles.headerEmployeeCard} key={index}>
                <Image
                  source={{
                    uri: userProfile?.profile_photo,
                  }}
                  style={[styles.headerEmployeeImage, { borderColor: item?.color_code }]}
                />
                <View style={{ marginLeft: ms(5) }}>
                  <Text style={styles.headerEmployeeName}>
                    {userProfile?.firstname + ' ' + userProfile?.lastname}
                  </Text>
                  <Text style={styles.headerEmployeeDesignation}>{userRoles}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
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
                ampm={isAMPM}
                swipeEnabled={false}
                date={calendarDate}
                mode={calendarMode}
                events={extractedAppointment}
                height={windowHeight * 0.91}
                {...(showEmployeeHeader
                  ? {
                      renderHeader: () => employeeHeader(),
                      renderHeaderForMonthView: () => employeeHeader(),
                    }
                  : {})}
                headerContainerStyle={{
                  height: calendarMode === CALENDAR_MODES.MONTH ? 'auto' : ms(38),
                  backgroundColor: COLORS.textInputBackground,
                  paddingTop: ms(5),
                }}
                dayHeaderHighlightColor={COLORS.dayHighlight}
                hourComponent={CustomHoursCell}
                onPressEvent={(event) => {
                  setEventData(event);
                  if (calendarMode === CALENDAR_MODES.MONTH) {
                    dayHandler();
                    setCalendarDate(moment(event.start));
                  } else {
                    setshowEventDetailModal(true);
                  }
                }}
                renderEvent={(event, touchableOpacityProps, allEvents) =>
                  CustomEventCell(event, touchableOpacityProps, allEvents, calendarMode)
                }
              />
            </View>
          </View>
          {/* Right tab container */}
          <View style={styles.rightTabContainer}>
            <TouchableOpacity
              onPress={() => {
                setSelectedStaffEmployeeId(null);
                if (appointmentListArr?.length === 0) {
                  setshowRequestsView(false);
                } else {
                  setshowRequestsView(!showRequestsView);
                }
              }}
              style={[
                styles.requestCalendarContainer,
                {
                  backgroundColor: showRequestsView ? COLORS.white : COLORS.textInputBackground,
                },
              ]}
            >
              <View>
                <Image source={calendarIcon} style={styles.requestCalendarIcon} />
                <View style={styles.requestEventBadgeContainer}>
                  <Text style={styles.RequestEventBadgeText}>
                    {appointmentListArr?.length ?? 0}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ flex: 1, alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => {
                  setSelectedStaffEmployeeId(null);
                  if (selectedStaffEmployeeId) {
                    setshowEmployeeHeader(true);
                  } else {
                    setshowEmployeeHeader(!showEmployeeHeader);
                  }
                }}
                style={[
                  styles.alignmentCalendarContainer,
                  {
                    backgroundColor:
                      showEmployeeHeader && !selectedStaffEmployeeId
                        ? COLORS.white
                        : COLORS.textInputBackground,
                  },
                ]}
              >
                <Image source={todayCalendarIcon} style={styles.asignessCalendarImage} />
                <View style={styles.circularBadgeContainer}>
                  <Text style={styles.asigneesBadgeText}>{totalAppointmentCountOfStaff}</Text>
                </View>
              </TouchableOpacity>
              <FlatList
                data={getStaffUsers}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: ms(40) }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => {
                  const userProfile = item?.user?.user_profiles;
                  const posUserId = item?.user?.unique_uuid;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedStaffEmployeeId((prev) => {
                          if (prev === posUserId) {
                            setSelectedStaffEmployeeId(null);
                            setshowEmployeeHeader(false);
                          } else {
                            setshowEmployeeHeader(true);
                            setSelectedStaffEmployeeId(posUserId);
                          }
                        });
                        setSelectedStaffData(item);
                      }}
                      style={[
                        styles.renderItemContainer,
                        {
                          backgroundColor:
                            selectedStaffEmployeeId === posUserId
                              ? COLORS.white
                              : COLORS.textInputBackground,
                        },
                      ]}
                    >
                      <View>
                        <Image
                          source={{
                            uri: userProfile?.profile_photo,
                          }}
                          style={[styles.employeeImages, { borderColor: item?.color_code }]}
                        />

                        <View
                          style={[styles.circularBadgeEmployee, { borderColor: item?.color_code }]}
                        >
                          <Text style={styles.badgeTextEmployee}>{item?.appointment_counts}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />

              <TouchableOpacity
                onPress={() => setisCalendarSettingModalVisible(true)}
                style={styles.CalendarSettingsContainer}
              >
                <Image source={calendarSettingsIcon} style={styles.calendarIconSettings} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {showRequestsView && (
          <View style={styles.notificationCon}>
            {isRequestLoading && pageNumber === 1 ? (
              <View style={{ marginTop: 50 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : (
              <View style={{ marginBottom: ms(40) }}>
                <Text style={styles._requestTitle}>
                  {`Request (${
                    selectedStaffEmployeeId
                      ? getAppointmentByStaffIdList?.length ?? 0
                      : appointmentListArr?.length ?? 0
                  })`}
                </Text>
                <FlatList
                  extraData={getAppointmentByStaffIdList || appointmentListArr}
                  data={selectedStaffEmployeeId ? getAppointmentByStaffIdList : appointmentListArr}
                  keyExtractor={(_, index) => index}
                  renderItem={eventItem}
                  onEndReached={handleEndReached}
                  onEndReachedThreshold={0.1} // Adjust this value as per your requirements
                  ListFooterComponent={renderLoader}
                />
              </View>
            )}
          </View>
        )}

        <CalendarSettingModal
          isVisible={isCalendarSettingModalVisible}
          setIsVisible={setisCalendarSettingModalVisible}
          currentCalendarMode={calendarMode}
          currentTimeFormat={isAMPM}
          onPressSave={(calendarPreferences) => {
            onPressSaveCalendarSettings(calendarPreferences);
          }}
        />

        <EventDetailModal
          {...{ eventData, showEventDetailModal, setshowEventDetailModal, dispatch }}
        />
      </View>
    </ScreenWrapper>
  );
}
