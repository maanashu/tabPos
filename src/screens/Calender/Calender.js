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
  circleTick,
  checkInIcon,
  new_location,
  clock,
  userImage,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import { Button, ScreenWrapper, Spacer } from '@/components';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import { Calendar } from '@/components/CustomCalendar';
import { CALENDAR_MODES, CALENDAR_VIEW_MODES } from '@/constants/enums';
import moment from 'moment';
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
import CalendarHeaderWithOptions from './Components/CalendarHeaderWithOptionsNew';
import EventItemCard from './Components/EventItemCard';
import CalendarSettingModal from './Components/CalendarSettingModal';
import { navigate } from '@/navigation/NavigationRef';
import { NAVIGATION } from '@/constants';
import EventDetailModal from './Components/EventDetailModal';
import { getSettings, upadteApi } from '@/actions/SettingAction';
import { getSetting } from '@/selectors/SettingSelector';
import { APPOINTMENT_STATUS } from '@/constants/status';
import ReScheduleDetailModal from './Components/ReScheduleDetailModal';
import ListViewItem from './Components/ListViewComponents/ListViewItem';
import ListViewHeader from './Components/ListViewComponents/ListViewHeader';
import CalendarPickerModal from '@/components/CalendarPickerModal';
import { Modal as PaperModal, Portal, Provider } from 'react-native-paper';
import { useRef } from 'react';
import { BlurView } from '@react-native-community/blur';
import BlurredModal from '@/components/BlurredModal';
import ProfileImage from '@/components/ProfileImage';
import { CustomHeader } from '../PosRetail3/Components';
import { CalendarCustomHeader } from './Components/CalendarCustomHeader';
import { Images } from '@/assets/new_icon';
import MiniCalendarPickup from '@/components/MiniCalendarPickup';

moment.suppressDeprecationWarnings = true;

export function Calender() {
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
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
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [showRescheduleTimeModal, setshowRescheduleTimeModal] = useState(false);
  const [selectedPosStaffCompleteData, setSelectedPosStaffCompleteData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [monthDays, setMonthDays] = useState([]);
  const searchAppoinmentInputRef = useRef(null);
  const [isLoadingSearchAppoinment, setIsLoadingSearchAppoinment] = useState(false);

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isCheckIn, setcheckIn] = useState(false);
  const [formattedTime, setFormattedTime] = useState(false);
  const [searchedAppointments, setSearchedAppointments] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  const [week, setWeek] = useState(true);
  const [month, setMonth] = useState(false);
  const [day, setDay] = useState(false);
  const [isAMPM, setisAMPM] = useState(defaultSettingsForCalendar?.time_format === '12' ?? true);
  const [calendarViewMode, setCalendarViewMode] = useState(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
  const [calendarDate, setCalendarDate] = useState(moment());
  const [calendarMode, setCalendarMode] = useState(
    defaultSettingsForCalendar?.calender_view ?? CALENDAR_MODES.WEEK
  );
  const [shouldShowCalendarModeOptions, setshouldShowCalendarModeOptions] = useState(true);

  const [selectedStaffEmployeeId, setSelectedStaffEmployeeId] = useState(null);
  const [selectedStaffData, setSelectedStaffData] = useState(null);

  const [showMiniCalendar, setshowMiniCalendar] = useState(false);

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
    getCurrentMonthDays();
  }, [isFocused, pageNumber, showRequestsView, calendarDate]);

  const getCurrentMonthDays = () => {
    const date = new Date(calendarDate);
    const year = date.getFullYear();
    const month = date.getMonth();

    // Get the total number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const monthDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const fullDateFortheDay = new Date(year, month, day);
      const dayName = weekDays[fullDateFortheDay.getDay()];
      const objDay = { fullDateFortheDay, day, dayName };

      monthDays.push(objDay);
    }
    setMonthDays(monthDays);
  };

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
    if (calendarMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW) {
      if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.DAY) {
        dayHandler();
      } else if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.WEEK) {
        weekHandler();
      } else if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.MONTH) {
        monthHandler();
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

  const onPressCalendarViewMode = () => {
    setCalendarViewMode(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
    setshouldShowCalendarModeOptions(true);
    weekHandler();
  };
  const onPressListViewMode = () => {
    setCalendarViewMode(CALENDAR_VIEW_MODES.LIST_VIEW);
    setshouldShowCalendarModeOptions(false);
    dayHandler();
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
        moment.utc(appointment?.date).local().format('L') ===
        moment.utc(calendarDate).local().format('L')
    );
    return filteredAppointmentsByDate;
  }, [calendarDate, getCalenderData]);

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
    return calendarDate.format('MMM YYYY');
    // if (calendarMode === CALENDAR_MODES.MONTH || calendarMode === CALENDAR_MODES.WEEK) {
    //   return calendarDate.format('MMM YYYY');
    // } else if (calendarMode === CALENDAR_MODES.DAY) {
    //   return calendarDate.format('DD MMM YYYY');
    // }
  };
  const isRequestLoading = useSelector((state) =>
    isLoadingSelector([TYPES.GET_APPOINTMENTS], state)
  );

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

  const calculateTime = (item) => {
    const startMoment = moment(item?.start_date_time);
    const endMoment = moment(item?.end_date_time);
    const duration = moment.duration(endMoment.diff(startMoment));

    const startFormattedTime = startMoment.format('h:mm A');
    const endFormattedTime = moment(item?.end_date_time).format('h:mm A');

    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) % 60;

    const newFormattedTime = `${startFormattedTime} - ${endFormattedTime} (${hours} hrs ${minutes} mins)`;
    setFormattedTime(newFormattedTime);
  };
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
          // dispatch(changeAppointmentStatus(appointmentId, APPOINTMENT_STATUS.CHECKED_IN));
          // alert('ok');
          calculateTime(item);
          setcheckIn(true);

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

  const renderMonthItem = ({ item, index }) => {
    const isSelected = calendarDate.date() == item.day;

    return (
      <TouchableOpacity
        style={{
          width: (windowWidth * 0.84 - monthDays.length * ms(2)) / monthDays.length,
          borderRadius: ms(4),
          borderWidth: ms(1),
          borderColor: '#F5F6FC',
          paddingHorizontal: ms(1),
          paddingVertical: ms(4),
          marginRight: ms(2),
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: isSelected ? '#263682' : 'transparent',
        }}
        onPress={() => {
          setCalendarDate(moment(item.fullDateFortheDay));
        }}
      >
        <Text style={{ color: isSelected ? '#F5F6FC' : COLORS.light_blue2, fontSize: ms(8) }}>
          {item.day}
        </Text>
      </TouchableOpacity>
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
          <TouchableOpacity
            style={styles.searchView}
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
            <View
              style={{
                height: SH(40),
                width: SW(70),
                paddingLeft: 5,
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: COLORS.darkGray, fontSize: ms(10), fontFamily: Fonts.Regular }}>
                {strings.deliveryOrders.search}
              </Text>
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
            { paddingLeft: calendarMode === CALENDAR_MODES.MONTH ? 0 : ms(25) },
          ]}
        >
          {staffUsers?.map((item, index) => {
            const userProfile = item?.user?.user_profiles;
            const userRoles = item?.user?.user_roles[0]?.role?.name;
            const posUserId = item?.user?.unique_uuid;
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedStaffEmployeeId((prev) => {
                    if (prev === posUserId) {
                      setSelectedStaffEmployeeId(null);
                    } else {
                      // setshowEmployeeHeader(true);
                      setSelectedStaffEmployeeId(posUserId);
                    }
                  });
                  setSelectedStaffData(item);
                }}
                style={[
                  styles.headerEmployeeCard,
                  {
                    borderColor:
                      selectedStaffEmployeeId === posUserId
                        ? item?.color_code
                        : COLORS.neutral_blue,
                  },
                ]}
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
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <CalendarCustomHeader />
      <View style={styles.container}>
        {/* {customHeader()} */}
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
                calendarViewMode,
                shouldShowCalendarModeOptions,
              }}
              onPressCalendarIcon={() => {
                setshowMiniCalendar(!showMiniCalendar);
              }}
              onPressNotification={() => {
                navigate(NAVIGATION.notificationsList, {
                  screen: NAVIGATION.calender,
                });
              }}
              onPressSearch={() => {
                setShowSearchModal(true);
                setSearchedAppointments([]);
                setSearchedText('');
                setTimeout(() => {
                  searchAppoinmentInputRef.current.focus();
                }, 300);
              }}
              onPressCalendarViewMode={onPressCalendarViewMode}
              onPressListViewMode={onPressListViewMode}
            />
            {showMiniCalendar && (
              <>
                <View style={styles.calendarModalView}>
                  <MiniCalendarPickup
                    allowRangeSelection={false}
                    maxDate={maxDate}
                    selectedStartDate={calendarDate}
                    onPress={() => setshowMiniCalendar(false)}
                    onSelectedDate={(date) => {
                      setCalendarDate(moment(date));
                      // setshowMiniCalendar(false);
                    }}
                    onCancelPress={() => {
                      setshowMiniCalendar(false);
                    }}
                  />
                </View>
                <Spacer space={ms(5)} />
              </>
            )}
            <View style={styles._calendarContainer}>
              {calendarViewMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW ? (
                <Calendar
                  ampm={isAMPM}
                  swipeEnabled={false}
                  date={calendarDate}
                  mode={calendarMode}
                  events={extractedAppointment}
                  hourRowHeight={ms(50)}
                  height={windowHeight * 0.91}
                  {...(showEmployeeHeader
                    ? {
                        renderHeader: () => employeeHeader(),
                        renderHeaderForMonthView: () => employeeHeader(),
                      }
                    : {})}
                  headerContainerStyle={{
                    height: calendarMode === CALENDAR_MODES.MONTH ? 'auto' : ms(38),
                    backgroundColor: COLORS.white,
                    paddingTop: ms(5),
                  }}
                  dayHeaderHighlightColor={COLORS.dayHighlight}
                  hourComponent={CustomHoursCell}
                  isEventOrderingEnabled={false}
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
                    CustomEventCell(
                      event,
                      touchableOpacityProps,
                      allEvents,
                      calendarMode,
                      employeeHeaderLayouts,
                      showEmployeeHeader
                    )
                  }
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    borderBottomLeftRadius: ms(10),
                    borderBottomRightRadius: ms(10),
                  }}
                >
                  {/* List View Header */}
                  <View style={{ backgroundColor: COLORS.white, paddingHorizontal: ms(10) }}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      horizontal
                      data={monthDays}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={renderMonthItem}
                    />
                    <Spacer space={ms(8)} />
                    <View style={styles._mListViewDateHeaderContainer}>
                      <Text style={styles._mListViewDayName}>
                        {moment(calendarDate).format('dddd')}
                      </Text>
                      <Spacer space={ms(5)} horizontal />
                      <Text style={styles._mListViewDate}>
                        {moment(calendarDate).format('Do') ?? moment().format('Do')}
                      </Text>
                    </View>
                  </View>

                  {/* List View Appointments */}
                  <FlatList
                    data={getAppointmentsByDate}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={<ListViewHeader />}
                    renderItem={renderListViewItem}
                    ListEmptyComponent={() => (
                      <Text style={styles.noAppointmentEmpty}>
                        There are no appointments on this day
                      </Text>
                    )}
                  />
                </View>
              )}
            </View>
          </View>
          {/* Right tab container */}
          <View style={styles.rightTabContainer}>
            <TouchableOpacity>
              <Image
                source={Images.backIcon}
                resizeMode="contain"
                style={{ height: ms(22), width: ms(22) }}
              />
            </TouchableOpacity>
            <Spacer space={ms(20)} />

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
              <View style={{ position: 'absolute', top: ms(5), left: ms(6) }}>
                <Image source={Images.calendarIcon} style={styles.requestCalendarIcon} />
                <View style={styles.requestEventBadgeContainer}>
                  <Text style={styles.RequestEventBadgeText}>
                    {appointmentListArr?.length ?? 0}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Image
                source={Images.backIcon}
                resizeMode="contain"
                style={{ height: ms(22), width: ms(22) }}
              />
            </TouchableOpacity> */}

            <View style={{ flex: 1, alignItems: 'center' }}>
              {/* <TouchableOpacity
                onPress={() => {
                  setCalendarViewMode(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
                  setshouldShowCalendarModeOptions(true);
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
              </TouchableOpacity> */}
              <Spacer space={ms(20)} />
              <FlatList
                data={getStaffUsers}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: ms(40) }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                  const userProfile = item?.user?.user_profiles;
                  const posUserId = item?.user?.unique_uuid;
                  const imageUrl = item?.user?.user_profiles?.profile_photo;
                  const isPng = imageUrl?.toLowerCase().endsWith('.png');
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCalendarViewMode(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
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
                      style={styles.renderItemContainer}
                    >
                      <View>
                        <ProfileImage
                          source={{
                            uri: userProfile?.profile_photo,
                          }}
                          style={styles.employeeImages}
                        />

                        <View style={styles.circularBadgeEmployee}>
                          <Text style={styles.badgeTextEmployee}>{item?.appointment_counts}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
              <TouchableOpacity
                style={styles.usersIconView}
                onPress={() => {
                  setCalendarViewMode(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
                  setshouldShowCalendarModeOptions(true);
                  setSelectedStaffEmployeeId(null);
                  if (selectedStaffEmployeeId) {
                    setshowEmployeeHeader(true);
                  } else {
                    setshowEmployeeHeader(!showEmployeeHeader);
                  }
                }}
              >
                <Image
                  source={Images.usersThree}
                  resizeMode="contain"
                  style={styles.usersIconStyle}
                />
                <View style={styles.totalUsersCountContainer}>
                  <Text style={styles.countUsers}>{getStaffUsers?.length || '0'}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setisCalendarSettingModalVisible(true)}
                style={styles.CalendarSettingsContainer}
              >
                <Image source={Images.settingsOutline} style={styles.calendarIconSettings} />
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
                <View
                  style={[styles.rowAlignedJustified, { marginLeft: ms(10), marginTop: ms(5) }]}
                >
                  <View style={styles.rowAligned}>
                    <Image
                      source={Images.calendarIcon}
                      style={styles.requestCalendarIconSmall}
                      resizeMode="contain"
                    />

                    <View style={styles.requestCountView}>
                      <Text style={styles.requestText}>
                        {selectedStaffEmployeeId
                          ? getAppointmentByStaffIdList?.length ?? 0
                          : appointmentListArr?.length ?? 0}
                      </Text>
                    </View>
                    <Text style={styles._requestTitle}>{`Requests`}</Text>
                  </View>

                  <TouchableOpacity onPress={() => setshowRequestsView(false)}>
                    <Image
                      source={crossButton}
                      style={[styles.closeIcon, { marginRight: ms(10) }]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
                <FlatList
                  extraData={appointmentListArr}
                  data={selectedStaffEmployeeId ? getAppointmentByStaffIdList : appointmentListArr}
                  keyExtractor={(_, index) => index}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  renderItem={eventItem}
                  onEndReached={handleEndReached}
                  onEndReachedThreshold={0.1} // Adjust this value as per your requirements
                  ListFooterComponent={renderLoader}
                  showsVerticalScrollIndicator={false}
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

        {/* <Modal
          isVisible={showMiniCalendar}
          statusBarTranslucent
          animationIn={'slideInRight'}
          animationInTiming={600}
          animationOutTiming={300}
          onBackdropPress={() => setshowMiniCalendar(false)}
        > */}

        {/* </Modal> */}

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

        <ReScheduleDetailModal
          showRecheduleModal={showRescheduleTimeModal}
          setShowRescheduleModal={setshowRescheduleTimeModal}
          appointmentData={selectedPosStaffCompleteData}
          setshowEventDetailModal={setshowEventDetailModal}
        />

        {/**
         * Design Check-in Modal
         * It is in Progress/unfinished due to change of preority
         */}
        <BlurredModal isVisible={isCheckIn}>
          <View style={styles.checkInModalContainer}>
            <TouchableOpacity style={styles.closeIconView} onPress={() => setcheckIn(false)}>
              <Image source={crossButton} resizeMode="contain" style={styles.closeIcon} />
            </TouchableOpacity>
            <Image source={checkInIcon} style={styles.checkInIcon} />
            <Text style={styles.checkInText}>Check In</Text>
            <Text style={styles.subHeadingText}>Confirm the details of your appointment</Text>

            <View style={styles.serviceDetailContainer}>
              <View style={styles.rowJustified}>
                <Text style={styles.customerText}>Customer:</Text>
                <Text style={styles.unpaidText}>
                  {selectedPosStaffCompleteData?.mode_of_payment == 'cash' ? 'Unpaid' : 'Paid'}
                </Text>
              </View>

              <View style={styles.customerProfileView}>
                <ProfileImage
                  source={{
                    uri: selectedPosStaffCompleteData?.user_details?.profile_photo || null,
                  }}
                  style={styles.customerProfileImage}
                />
                <View style={{ marginLeft: ms(5) }}>
                  <Text style={styles.customerNameText}>
                    {`${selectedPosStaffCompleteData?.user_details?.firstname} ${selectedPosStaffCompleteData?.user_details?.lastname}`}
                  </Text>
                  <Spacer space={ms(5)} />
                  <View style={[styles.rowAligned, {}]}>
                    <Image source={new_location} style={styles.eventAddressIcon} />
                    <View style={{ width: '85%' }}>
                      <Text
                        style={styles.addressText}
                      >{`${selectedPosStaffCompleteData?.user_details?.current_address?.city}, ${selectedPosStaffCompleteData?.user_details?.current_address?.state}`}</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.requestedServicesView}>
                <Text style={styles.servicesRequested}>Services requested:</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginLeft: ms(5) }}
                >
                  <View style={styles.rowAligned}>
                    {/* {[0, 1, 2, 3, 4, 5].map((item, index) => ( */}
                    <View style={styles.scrollableServicesView}>
                      <Text style={styles.servicesName}>
                        {selectedPosStaffCompleteData?.product_name}
                      </Text>
                    </View>
                    {/* ))} */}
                  </View>
                </ScrollView>
              </View>

              <View style={styles.serviceTimeView}>
                <Text style={styles.servicesRequested}>Service Time</Text>

                <Spacer space={ms(10)} />
                <View style={styles.rowAligned}>
                  <View style={styles.rowAligned}>
                    <Image
                      style={styles.serviceTimeIcons}
                      resizeMode="contain"
                      source={Images.calendarIcon}
                    />
                    <Text style={styles.serviceTimeText}>
                      {moment
                        .utc(selectedPosStaffCompleteData?.start_date_time)
                        .format('dddd, DD/MM/YYYY')}
                    </Text>
                  </View>
                  <Spacer horizontal space={ms(10)} />
                  <View style={styles.rowAligned}>
                    <Image style={styles.serviceTimeIcons} resizeMode="contain" source={clock} />
                    <Text style={styles.serviceTimeText}>{formattedTime}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.dashedLine} />
              <View style={styles.rowAlignedJustified}>
                <Text style={styles.totalPrice}>Total</Text>
                <Text
                  style={styles.totalPrice}
                >{`$ ${selectedPosStaffCompleteData?.actual_price}`}</Text>
              </View>
            </View>
            <Spacer space={ms(5)} />

            <View style={styles.rowAlignedJustified}>
              <TouchableOpacity style={styles.declineButtonStyle} onPress={() => setcheckIn(false)}>
                <Text style={styles.declineText}>Decline</Text>
              </TouchableOpacity>
              <Spacer horizontal space={ms(10)} />
              <TouchableOpacity
                style={styles.acceptButtonStyle}
                onPress={() => {
                  dispatch(
                    changeAppointmentStatus(
                      selectedPosStaffCompleteData?.id,
                      APPOINTMENT_STATUS.CHECKED_IN
                    )
                  );
                  setcheckIn(false);
                }}
              >
                <Text style={styles.acceptText}>Confirm</Text>
                <Image style={styles.rightArrowStyle} source={Images.arrowUpRightIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </BlurredModal>
      </View>
    </ScreenWrapper>
  );
}
