import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import {
  bell,
  search_light,
  roundCalender,
  calendarIcon,
  todayCalendarIcon,
  calendarSettingsIcon,
  crossButton,
  Fonts,
  backArrow,
  cross,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import { ScreenWrapper, Spacer } from '@/components';
import { ms } from 'react-native-size-matters';
import { Calendar } from '@/components/CustomCalendar';
import { CALENDAR_MODES, CALENDAR_VIEW_MODES } from '@/constants/enums';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAppointmentStatus,
  getAppointment,
  getStaffUsersList,
  searchAppointments,
} from '@/actions/AppointmentAction';
import Modal from 'react-native-modal';
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

import EventDetailModal from './Components/EventDetailModal';
import { getSettings, upadteApi } from '@/actions/SettingAction';
import { getSetting } from '@/selectors/SettingSelector';
import { APPOINTMENT_STATUS } from '@/constants/status';
import ReScheduleDetailModal from './Components/ReScheduleDetailModal';
import ListViewItem from './Components/ListViewComponents/ListViewItem';
import ListViewHeader from './Components/ListViewComponents/ListViewHeader';
import { Modal as PaperModal } from 'react-native-paper';
import { useRef } from 'react';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { NAVIGATION } from '@mPOS/constants';
import { styles } from './styles';
import { Images } from '@mPOS/assets';
import CalendarPickerModal from '@mPOS/components/CalendarPickerModal';
import { Calendar as MonthCalendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

const groupAppointmentsByDate = (data) => {
  const groupedAppointments = {};

  for (const appointment of data) {
    const date = new Date(appointment.date);
    const dayOfWeek = date.getDay(); // Get the day of the week (0 to 6)
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDate =
      days[dayOfWeek] +
      ' ' +
      date.getDate() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getFullYear();

    if (!groupedAppointments[formattedDate]) {
      groupedAppointments[formattedDate] = [];
    }
    groupedAppointments[formattedDate].push(appointment);
  }

  return groupedAppointments;
};

export function Booking() {
  const windowHeight = Dimensions.get('window').height;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const maxDate = new Date(2030, 6, 3);
  const getSettingData = useSelector(getSetting);
  const defaultSettingsForCalendar = getSettingData?.getSetting;
  const getCalenderData = useSelector(getAppointmentSelector);
  const getAppointmentList = getCalenderData?.getAppointment;
  const getAppointmentByStaffIdList = getCalenderData?.geAppointmentById;
  const getStaffUsers = getCalenderData?.staffUsers;
  const appointmentPages = getCalenderData?.pages;
  const [extractedAppointment, setExtractedAppointment] = useState([]);
  const [showRequestsView, setshowRequestsView] = useState(false);
  const [isCalendarSettingModalVisible, setisCalendarSettingModalVisible] = useState(false);
  const [showEmployeeHeader, setshowEmployeeHeader] = useState(false);
  const [employeeHeaderLayouts, setEmployeeHeaderLayouts] = useState([]);
  const [showEventDetailModal, setshowEventDetailModal] = useState(false);
  const [eventData, setEventData] = useState({});

  const [showRescheduleTimeModal, setshowRescheduleTimeModal] = useState(false);
  const [selectedPosStaffCompleteData, setSelectedPosStaffCompleteData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const searchAppoinmentInputRef = useRef(null);
  const [isLoadingSearchAppoinment, setIsLoadingSearchAppoinment] = useState(false);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchedAppointments, setSearchedAppointments] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [isAMPM, setisAMPM] = useState(defaultSettingsForCalendar?.time_format === '12' ?? true);
  const [calendarViewMode, setCalendarViewMode] = useState(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
  const [calendarDate, setCalendarDate] = useState(moment());
  const [shouldShowCalendarModeOptions, setshouldShowCalendarModeOptions] = useState(true);

  const [selectedStaffEmployeeId, setSelectedStaffEmployeeId] = useState(null);
  const [selectedStaffData, setSelectedStaffData] = useState(null);

  const [showMiniCalendar, setshowMiniCalendar] = useState(false);
  const [showMiniBookingRequest, setShowMiniBookingRequest] = useState(false);

  const [time, setTime] = useState(false);
  const [timeValue, setTimeValue] = useState(defaultSettingsForCalendar?.calender_view ?? 'week');
  const [timeItem, setTimeItem] = useState([
    { label: 'Today', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ]);
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [appointmentDate, setAppointmentDate] = useState([]);

  useEffect(() => {
    const grouped = groupAppointmentsByDate(getAppointmentList);
    setGroupedAppointments(grouped);
    const markedDates = Object.keys(grouped).map((el) => {
      const date = el.split(' ')[1];
      return moment.utc(date, 'dddd DD/MM/YYYY').format('YYYY-MM-DD');
    });
    setAppointmentDate(markedDates);
  }, [getAppointmentList]);

  //Pagination for appointments
  const [pageNumber, setPageNumber] = useState(1);
  const getAppointmentList2 = getAppointmentList?.filter((item) => item.status !== 3);
  // Only show appointments on calendar which are approved/Check-In/Completed/CancelledByCustomer
  const getApprovedAppointments = getAppointmentList?.filter(
    (item) => item.status === 1 || item.status === 2 || item.status === 3
  );

  // Will be used to show list of all unaccepted appointments
  const appointmentListArr = getAppointmentList2?.filter((item) => item.status === 0);

  const totalAppointmentCountOfStaff =
    getStaffUsers?.reduce((total, user) => total + user.appointment_counts, 0) || 0;

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
      onPressListViewMode();
    }
  }, [isFocused]);

  useEffect(() => {
    if (timeValue === CALENDAR_VIEW_MODES.CALENDAR_VIEW) {
      if (defaultSettingsForCalendar?.calender_view === 'day') {
        setTimeValue('day');
      } else if (defaultSettingsForCalendar?.calender_view === 'week') {
        setTimeValue('week');
      } else if (defaultSettingsForCalendar?.calender_view === 'month') {
        setTimeValue('month');
      }
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
          title: booking?.product_name || 'NULL',
          start: startDateTime,
          end: endDateTime,
          completeData: booking,
        };
      });

      setExtractedAppointment(extractedAppointmentEvents);
    }
  }, [getAppointmentList, selectedStaffEmployeeId]);

  const isSendCheckinOTPLoading = useSelector((state) =>
    isLoadingSelector([TYPES.SEND_CHECKIN_OTP], state)
  );

  const isChangeStatusLoading = useSelector((state) =>
    isLoadingSelector([TYPES.CHANGE_APPOINTMENT_STATUS], state)
  );

  const nextMonth = () => setCalendarDate(calendarDate.clone().add(1, timeValue));
  const prevMonth = () => setCalendarDate(calendarDate.clone().subtract(1, timeValue));

  const onPressCalendarViewMode = () => {
    setCalendarViewMode(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
    setshouldShowCalendarModeOptions(true);
    setTimeValue('week');
  };
  const onPressListViewMode = () => {
    setCalendarViewMode(CALENDAR_VIEW_MODES.LIST_VIEW);
    setshouldShowCalendarModeOptions(false);
    setTimeValue('day');
    setSelectedStaffEmployeeId(null);
    setshowEmployeeHeader(false);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await dispatch(getAppointment(pageNumber));
    setRefreshing(false);
  }, []);

  const getAppointmentsByDate = useMemo(() => {
    const filteredAppointmentsByDate = getAppointmentList?.filter(
      (appointment) =>
        moment.utc(appointment?.date).format('L') === moment.utc(calendarDate).format('L')
    );
    return filteredAppointmentsByDate;
  }, [calendarDate, getCalenderData]);

  const onPressSaveCalendarSettings = (calendarPreferences) => {
    if (calendarPreferences?.defaultCalendarMode === 'day') {
      setTimeValue('day');
    } else if (calendarPreferences?.defaultCalendarMode === 'week') {
      setTimeValue('week');
    } else if (calendarPreferences?.defaultCalendarMode === 'month') {
      setTimeValue('month');
    }
    setisAMPM(calendarPreferences?.defaultTimeFormat);

    const data = {
      calender_view: timeValue,
      time_format: calendarPreferences?.defaultTimeFormat ? '12' : '24',
      accept_appointment_request: calendarPreferences?.defaultAppointmentRequestMode,
      employee_color_set: calendarPreferences?.defaultEmployeesColorSet,
    };
    dispatch(upadteApi(data));
  };

  const getFormattedHeaderDate = () => {
    if (timeValue === 'month' || timeValue === 'week') {
      return calendarDate.format('MMM YYYY');
    } else if (timeValue === 'day') {
      return calendarDate.format('DD MMM YYYY');
    }
  };
  const isRequestLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_APPOINTMENTS], state)
  );

  function convertArrayToMarkedDates(array) {
    const convertedObject = {};

    array.forEach((element) => {
      convertedObject[element] = { marked: true, dotColor: COLORS.primary };
    });

    return convertedObject;
  }

  const eventItem = ({ item, index }) => {
    return <EventItemCard item={item} index={index} />;
  };

  const onSearchAppoinment = (searchText) => {
    if (searchText != '') {
      setSearchedAppointments([]);
    }
    const callback = (searchData) => {
      if (searchData === null) {
        setSearchedAppointments([]);
      } else {
        setSearchedAppointments(searchData?.data);
      }
      setIsLoadingSearchAppoinment(false);
    };
    dispatch(searchAppointments(pageNumber, searchText, callback));
  };

  const debouncedSearchAppointment = useCallback(debounce(onSearchAppoinment, 300), []);

  const renderListViewItem = ({ item, index }) => {
    const appointmentId = item?.id;
    return (
      <ListViewItem
        item={item}
        index={index}
        isChangeStatusLoading={isChangeStatusLoading}
        // isSendCheckinOTPLoading={isSendCheckinOTPLoading}
        onPressCheckin={() => {
          setSelectedPosStaffCompleteData(item);
          dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.CHECKED_IN));
          // dispatch(sendCheckinOTP(appointmentId)).then(() => {
          //   setshowVerifyOTPModal(true);
          // });
        }}
        onPressEdit={() => {
          setSelectedPosStaffCompleteData(item);
          setshowRescheduleTimeModal(true);
        }}
        onPressMarkComplete={() => {
          dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.COMPLETED));
        }}
      />
    );
  };

  const renderGroupedListViewItem = ({ item, index }) => {
    return (
      <View style={{ flex: 0.4 }}>
        {console.log('first', item[0])}
        <Text
          style={{ fontSize: ms(14), fontFamily: Fonts.SemiBold, color: COLORS.black, padding: 10 }}
        >
          {item[0]}
        </Text>
        {item[1].map((appointment) => {
          const appointmentId = appointment?.id;
          return (
            <ListViewItem
              item={appointment}
              index={index}
              isChangeStatusLoading={isChangeStatusLoading}
              // isSendCheckinOTPLoading={isSendCheckinOTPLoading}
              onPressCheckin={() => {
                setSelectedPosStaffCompleteData(appointment);
                dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.CHECKED_IN));
                // dispatch(sendCheckinOTP(appointmentId)).then(() => {
                //   setshowVerifyOTPModal(true);
                // });
              }}
              onPressEdit={() => {
                setSelectedPosStaffCompleteData(appointment);
                setshowRescheduleTimeModal(true);
              }}
              onPressMarkComplete={() => {
                dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.COMPLETED));
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderSearchListViewItem = ({ item, index }) => {
    const appointmentId = item?.id;
    return (
      <ListViewItem
        item={item}
        index={index}
        isChangeStatusLoading={isChangeStatusLoading}
        onPressCheckin={async () => {
          setSelectedPosStaffCompleteData(item);
          await dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.CHECKED_IN));
          onSearchAppoinment(searchedText);
        }}
        onPressEdit={() => {
          setSelectedPosStaffCompleteData(item);
          setshowRescheduleTimeModal(true);
          onSearchAppoinment(searchedText);
        }}
        onPressMarkComplete={async () => {
          await dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.COMPLETED));
          onSearchAppoinment(searchedText);
        }}
        onPressAccept={() => {
          onSearchAppoinment(searchedText);
        }}
        onPressReject={() => {
          onSearchAppoinment(searchedText);
        }}
        timeStyle={{ width: Platform.OS === 'android' ? ms(70) : ms(60) }}
      />
    );
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
          <TouchableOpacity onPress={goBack}>
            <Image source={Images.back} style={styles.truckStyle} />
          </TouchableOpacity>
          <Text style={styles.deliveryText}>{'Bookings'}</Text>
        </View>
        <View style={[styles.deliveryView, { marginHorizontal: ms(10) }]}>
          {/* <TouchableOpacity
          onPress={() =>
            navigate(NAVIGATION.notificationsList, {
              screen: NAVIGATION.calender,
            })
          }
          >
            <Image source={bell} style={[styles.truckStyle, { right: 25 }]} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{ marginRight: ms(10) }}
            onPress={() => {
              setShowSearchModal(true);
              setSearchedAppointments([]);
              setSearchedText('');
              setTimeout(() => {
                searchAppoinmentInputRef.current.focus();
              }, 300);
            }}
          >
            <Image source={search_light} style={styles.searchImage} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedStaffEmployeeId(null);
              setshowRequestsView(!showRequestsView);
            }}
            style={[
              styles.requestCalendarContainer,
              {
                backgroundColor: COLORS.textInputBackground,
              },
            ]}
          >
            <View>
              <Image source={calendarIcon} style={styles.requestCalendarIcon} />
              <View style={styles.requestEventBadgeContainer}>
                <Text style={styles.RequestEventBadgeText}>{appointmentListArr?.length ?? 0}</Text>
              </View>
            </View>
          </TouchableOpacity>
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
            { paddingLeft: timeValue === 'month' ? 0 : ms(25) },
          ]}
        >
          {staffUsers?.map((item, index) => {
            const userProfile = item?.user?.user_profiles;
            const userRoles = item?.user?.user_roles[0]?.role?.name;
            return (
              <View
                style={styles.headerEmployeeCard}
                key={index}
                onLayout={(event) => {
                  const { x, y, width, height } = event.nativeEvent.layout;
                  if (!employeeHeaderLayouts[index]?.width) {
                    const array = [...employeeHeaderLayouts];
                    array[index] = {
                      ...event.nativeEvent.layout,
                      user_id: userProfile?.user_id,
                      firstname: userProfile?.firstname,
                    };
                    setEmployeeHeaderLayouts(array);
                  }
                }}
              >
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
        {/* <View style={[styles.calenderContainer, { flexDirection: 'row' }]}> */}
        <View style={[styles.calenderCon]}>
          <CalendarHeaderWithOptions
            {...{
              prevMonth,
              getFormattedHeaderDate,
              nextMonth,
              calendarViewMode,
              shouldShowCalendarModeOptions,
            }}
            onPressCalendarIcon={() => {
              setshowMiniCalendar(true);
            }}
            onPressCalendarViewMode={onPressCalendarViewMode}
            onPressListViewMode={onPressListViewMode}
            time={time}
            timeValue={timeValue}
            timeItem={timeItem}
            setTime={setTime}
            setTimeValue={(value) => {
              setTimeValue(value);
            }}
            setTimeItem={setTimeItem}
          />
          <View
            style={[
              styles._calendarContainer,
              // timeValue === 'month' ? { height: windowHeight * 0.9 } : { flex: 1 },
            ]}
          >
            {calendarViewMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW ? (
              timeValue !== 'month' ? (
                <>
                  <Calendar
                    ampm={isAMPM}
                    swipeEnabled={false}
                    date={calendarDate}
                    mode={timeValue}
                    events={extractedAppointment}
                    height={windowHeight * 0.5}
                    {...(showEmployeeHeader
                      ? {
                          renderHeader: () => employeeHeader(),
                          renderHeaderForMonthView: () => employeeHeader(),
                        }
                      : {})}
                    headerContainerStyle={{
                      height: ms(55),
                      backgroundColor: COLORS.white,
                      paddingTop: ms(2),
                    }}
                    calendarCellStyle={{ padding: ms(5) }}
                    dayHeaderHighlightColor={COLORS.dayHighlight}
                    hourComponent={CustomHoursCell}
                    isEventOrderingEnabled={false}
                    onPressEvent={(event) => {
                      setEventData(event);
                      if (timeValue === 'month') {
                        dayHandler();
                        setCalendarDate(moment(event.start));
                      } else {
                        setshowEventDetailModal(true);
                      }
                    }}
                    renderEvent={(event, touchableOpacityProps, allEvents) =>
                      CustomEventCell(
                        event,
                        touchableOpacityProps,
                        allEvents,
                        timeValue,
                        employeeHeaderLayouts,
                        showEmployeeHeader
                      )
                    }
                  />
                </>
              ) : (
                <>
                  <MonthCalendar
                    hideArrows
                    initialDates={new Date(calendarDate)}
                    // markedDates={{
                    //   [appointmentDate]: { marked: true, dotColor: COLORS.primary },
                    //   ['2023-11-15']: { marked: true, dotColor: COLORS.primary },
                    // }}
                    markedDates={convertArrayToMarkedDates(appointmentDate)}
                    headerStyle={{ height: ms(0) }}
                    theme={{ todayTextColor: COLORS.primary }}
                  />
                  <FlatList
                    data={Object.entries(groupedAppointments)} // Convert the object to an array
                    keyExtractor={(item) => item[0]} // Use the date as the key
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    renderItem={renderGroupedListViewItem}
                    ListEmptyComponent={() => (
                      <Text style={styles.noAppointmentEmpty}>
                        There are no appointments on this day
                      </Text>
                    )}
                    // inverted
                    // style={{ height: windowHeight * 0.7 }}
                  />
                </>
              )
            ) : (
              <FlatList
                data={getAppointmentsByDate}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={<ListViewHeader />}
                renderItem={renderListViewItem}
                ListEmptyComponent={() => (
                  <Text style={styles.noAppointmentEmpty}>
                    There are no appointments on this day
                  </Text>
                )}
              />
            )}
          </View>
        </View>

        {showRequestsView && (
          <View style={styles.notificationCon}>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center' }}>
              <Text
                style={{
                  color: COLORS.black,
                  fontSize: ms(16),
                  marginHorizontal: ms(10),
                  fontFamily: Fonts.SemiBold,
                }}
              >
                {'Booking'}
              </Text>
              <TouchableOpacity
                style={{
                  padding: ms(4),
                  borderWidth: 1,
                  borderRadius: ms(2),
                  borderColor: COLORS.gerySkies,
                }}
                onPress={() => setshowRequestsView(false)}
              >
                <Image source={cross} style={styles.crossReq} />
              </TouchableOpacity>
            </View>
            <Spacer space={ms(20)} />
            <View style={styles.deviderList} />

            <TouchableOpacity
              style={{ flexDirection: 'row', marginVertical: ms(10) }}
              onPress={() => {
                setShowMiniBookingRequest(true);
                setshowRequestsView(false);
              }}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ms(14), color: COLORS.black, fontFamily: Fonts.SemiBold }}>
                  {appointmentListArr?.length}
                </Text>
                <Text
                  style={{ fontSize: ms(12), color: COLORS.darkGray, fontFamily: Fonts.Regular }}
                >
                  {'Booking to Review'}
                </Text>
              </View>
              <Image source={calendarIcon} style={styles.bookingSideImage} />
            </TouchableOpacity>
            <View style={styles.deviderList} />

            <TouchableOpacity
              onPress={() => {
                setCalendarViewMode(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
                setshouldShowCalendarModeOptions(true);
                setSelectedStaffEmployeeId(null);
                if (selectedStaffEmployeeId) {
                  setshowEmployeeHeader(true);
                  setshowRequestsView(false);
                  setShowMiniBookingRequest(false);
                } else {
                  setshowEmployeeHeader(!showEmployeeHeader);
                  setshowRequestsView(false);
                  setShowMiniBookingRequest(false);
                }
              }}
              style={[
                {
                  flexDirection: 'row',
                  marginVertical: ms(10),
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: ms(14), color: COLORS.black, fontFamily: Fonts.SemiBold }}>
                  {totalAppointmentCountOfStaff}
                </Text>
                <Text
                  style={{ fontSize: ms(12), color: COLORS.darkGray, fontFamily: Fonts.Regular }}
                >
                  {'Booking Accepted'}
                </Text>
              </View>
              <Image source={todayCalendarIcon} style={styles.asignessCalendarImage} />
            </TouchableOpacity>
            <View style={styles.deviderList} />
            <FlatList
              data={getStaffUsers}
              showsVerticalScrollIndicator={false}
              style={{ marginBottom: ms(40) }}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => {
                const userProfile = item?.user?.user_profiles;
                const posUserId = item?.user?.unique_uuid;
                return (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setCalendarViewMode(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
                        setSelectedStaffEmployeeId((prev) => {
                          if (prev === posUserId) {
                            setSelectedStaffEmployeeId(null);
                            setshowEmployeeHeader(false);
                            setshowRequestsView(false);
                            setShowMiniBookingRequest(false);
                          } else {
                            setshowEmployeeHeader(true);
                            setSelectedStaffEmployeeId(posUserId);
                            setshowRequestsView(false);
                            setShowMiniBookingRequest(false);
                          }
                        });
                        setSelectedStaffData(item);
                      }}
                      style={[styles.renderItemContainer]}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: ms(14),
                            color: COLORS.black,
                            fontFamily: Fonts.SemiBold,
                          }}
                        >
                          {item?.appointment_counts}
                        </Text>
                        <Text
                          style={{
                            fontSize: ms(12),
                            color: COLORS.darkGray,
                            fontFamily: Fonts.Regular,
                          }}
                        >
                          {userProfile?.firstname + ' ' + userProfile?.lastname}
                        </Text>
                      </View>
                      <Image
                        source={{
                          uri: userProfile?.profile_photo,
                        }}
                        style={[styles.employeeImages, { borderColor: item?.color_code }]}
                      />
                    </TouchableOpacity>
                    <View style={styles.deviderList} />
                  </View>
                );
              }}
              ListEmptyComponent={() => (
                <Text style={styles.noAppointmentEmpty}>There are no appointments on this day</Text>
              )}
            />
            <TouchableOpacity
              onPress={() => {
                setshowRequestsView(false);
                setShowMiniBookingRequest(false);
                setisCalendarSettingModalVisible(true);
              }}
              style={styles.CalendarSettingsContainer}
            >
              <Text
                style={{
                  fontSize: ms(12),
                  color: COLORS.darkGray,
                  flex: 1,
                  fontFamily: Fonts.Regular,
                }}
              >
                {'Calendar Setting'}
              </Text>
              <Image source={calendarSettingsIcon} style={styles.calendarIconSettings} />
            </TouchableOpacity>
          </View>
        )}

        <CalendarSettingModal
          isVisible={isCalendarSettingModalVisible}
          setIsVisible={setisCalendarSettingModalVisible}
          currentCalendarMode={timeValue}
          currentTimeFormat={isAMPM}
          onPressSave={(calendarPreferences) => {
            onPressSaveCalendarSettings(calendarPreferences);
          }}
        />

        <EventDetailModal
          {...{ eventData, showEventDetailModal, setshowEventDetailModal, dispatch }}
        />

        <Modal
          isVisible={showMiniCalendar}
          statusBarTranslucent
          animationIn={'slideInRight'}
          animationInTiming={600}
          animationOutTiming={300}
        >
          <View style={styles.calendarModalView}>
            <CalendarPickerModal
              allowRangeSelection={false}
              maxDate={maxDate}
              selectedStartDate={calendarDate}
              onPress={() => setshowMiniCalendar(false)}
              onSelectedDate={(date) => {
                setCalendarDate(moment(date));
                setshowMiniCalendar(false);
              }}
              onCancelPress={() => {
                setshowMiniCalendar(false);
              }}
            />
          </View>
        </Modal>

        <PaperModal visible={showSearchModal}>
          <View style={styles.searchAppointmentModalContainer}>
            <TouchableOpacity
              style={styles.closeSearchBtn}
              onPress={() => {
                setShowSearchModal(false);
                setSearchedText('');
                setIsLoadingSearchAppoinment(false);
              }}
            >
              <Image source={crossButton} style={styles.closeImageSearchBtn} />
            </TouchableOpacity>
            <View style={[styles.searchView, { marginVertical: ms(10) }]}>
              <Image source={search_light} style={styles.searchImage} />
              <TextInput
                ref={searchAppoinmentInputRef}
                placeholder={'Search appointments with service name, customer name or phone number'}
                style={styles.textInputStyle}
                placeholderTextColor={COLORS.darkGray}
                value={searchedText}
                onChangeText={(searchText) => {
                  setIsLoadingSearchAppoinment(true);
                  setSearchedText(searchText);
                  debouncedSearchAppointment(searchText);
                }}
              />
            </View>
            {isLoadingSearchAppoinment ? (
              <ActivityIndicator size="large" color={COLORS.indicator} />
            ) : (
              <FlatList
                data={searchedAppointments}
                extraData={searchedAppointments}
                keyExtractor={(_, index) => index.toString()}
                ListHeaderComponent={searchedAppointments?.length > 0 && <ListViewHeader />}
                renderItem={renderSearchListViewItem}
                ListEmptyComponent={() => (
                  <Text style={styles.noAppointmentEmpty}>There are no appointments</Text>
                )}
              />
            )}
          </View>
        </PaperModal>

        <Modal
          isVisible={showMiniBookingRequest}
          statusBarTranslucent
          animationIn={'slideInRight'}
          animationInTiming={600}
          animationOutTiming={300}
        >
          <View
            style={[
              styles.calendarModalView,
              {
                height: selectedStaffEmployeeId
                  ? getAppointmentByStaffIdList?.length === 1
                    ? windowHeight * 0.52
                    : windowHeight * 0.9
                  : appointmentListArr?.length === 1
                  ? windowHeight * 0.52
                  : windowHeight * 0.9,
              },
            ]}
          >
            {isRequestLoading && pageNumber === 1 ? (
              <View style={{ marginTop: 50 }}>
                <ActivityIndicator size="large" color={COLORS.indicator} />
              </View>
            ) : (
              <View style={{}}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles._requestTitle}>
                    {`Request (${
                      selectedStaffEmployeeId
                        ? getAppointmentByStaffIdList?.length ?? 0
                        : appointmentListArr?.length ?? 0
                    })`}
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: ms(4),
                      borderWidth: 1,
                      borderRadius: ms(2),
                      borderColor: COLORS.gerySkies,
                      position: 'absolute',
                      right: ms(10),
                      top: ms(10),
                    }}
                    onPress={() => setShowMiniBookingRequest(false)}
                  >
                    <Image source={cross} style={styles.crossReq} />
                  </TouchableOpacity>
                </View>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  extraData={appointmentListArr}
                  data={selectedStaffEmployeeId ? getAppointmentByStaffIdList : appointmentListArr}
                  keyExtractor={(_, index) => index}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  renderItem={eventItem}
                  onEndReached={handleEndReached}
                  onEndReachedThreshold={0.1} // Adjust this value as per your requirements
                  ListFooterComponent={renderLoader}
                  style={{ marginBottom: ms(25) }}
                  ListEmptyComponent={() => (
                    <Text style={[styles.noAppointmentEmpty]}>
                      There are no appointment Request
                    </Text>
                  )}
                />
              </View>
            )}
          </View>
        </Modal>

        <ReScheduleDetailModal
          showRecheduleModal={showRescheduleTimeModal}
          setShowRescheduleModal={setshowRescheduleTimeModal}
          appointmentData={selectedPosStaffCompleteData}
          setshowEventDetailModal={setshowEventDetailModal}
        />
      </View>
    </ScreenWrapper>
  );
}
