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
  backArrow,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SH, SW } from '@/theme';
import { ScreenWrapper } from '@/components';
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
import CalendarPickerModal from '@/components/CalendarPickerModal';
import { Modal as PaperModal } from 'react-native-paper';
import { useRef } from 'react';
import { goBack, navigate } from '@mPOS/navigation/NavigationRef';
import { NAVIGATION } from '@mPOS/constants';
import dayjs from 'dayjs';
import { styles } from './styles';
import { Images } from '@mPOS/assets';

dayjs.suppressDeprecationWarnings = true;

export function Booking() {
  const windowHeight = Dimensions.get('window').height;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const maxDate = new Date(2030, 6, 3);
  const getSettingData = useSelector(getSetting);
  const defaultSettingsForCalendar = getSettingData?.getSetting;
  console.log('gasdjgsjd', defaultSettingsForCalendar?.calender_view);
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
  const [week, setWeek] = useState(true);
  const [month, setMonth] = useState(false);
  const [day, setDay] = useState(false);
  const [isAMPM, setisAMPM] = useState(defaultSettingsForCalendar?.time_format === '12' ?? true);
  const [calendarViewMode, setCalendarViewMode] = useState(CALENDAR_VIEW_MODES.CALENDAR_VIEW);
  const [calendarDate, setCalendarDate] = useState(dayjs());
  const [calendarMode, setCalendarMode] = useState(
    defaultSettingsForCalendar?.calender_view ?? 'week'
  );
  const [shouldShowCalendarModeOptions, setshouldShowCalendarModeOptions] = useState(true);

  const [selectedStaffEmployeeId, setSelectedStaffEmployeeId] = useState(null);
  const [selectedStaffData, setSelectedStaffData] = useState(null);

  const [showMiniCalendar, setshowMiniCalendar] = useState(false);

  const [time, setTime] = useState(false);
  const [timeValue, setTimeValue] = useState('week');
  const [timeItem, setTimeItem] = useState([
    { label: 'Today', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ]);
  console.log('calendarMode', calendarMode);

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

  // useEffect(() => {
  //   if (calendarMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW) {
  //     if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.DAY) {
  //       dayHandler();
  //     } else if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.WEEK) {
  //       weekHandler();
  //     } else if (defaultSettingsForCalendar?.calender_view === CALENDAR_MODES.MONTH) {
  //       monthHandler();
  //     }
  //   }
  // }, [defaultSettingsForCalendar]);

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
      (appointment) => dayjs(appointment?.date).format('L') === dayjs(calendarDate).format('L')
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
          <TouchableOpacity onPress={goBack}>
            <Image source={Images.back} style={styles.truckStyle} />
          </TouchableOpacity>
          <Text style={styles.deliveryText}>{'Booking'}</Text>
        </View>
        <View style={styles.deliveryView}>
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
            // style={styles.searchView}
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
            {/* <View
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
            </View> */}
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
              // day,
              // dayHandler,
              // week,
              // weekHandler,
              // month,
              // monthHandler,
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
          <View style={styles._calendarContainer}>
            {calendarViewMode === CALENDAR_VIEW_MODES.CALENDAR_VIEW ? (
              <Calendar
                ampm={isAMPM}
                swipeEnabled={false}
                date={calendarDate}
                mode={timeValue}
                events={extractedAppointment}
                height={windowHeight * 0.98}
                {...(showEmployeeHeader
                  ? {
                      renderHeader: () => employeeHeader(),
                      renderHeaderForMonthView: () => employeeHeader(),
                    }
                  : {})}
                headerContainerStyle={{
                  height: timeValue === 'month' ? 'auto' : ms(55),
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
                    setCalendarDate(dayjs(event.start));
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
            ) : (
              <FlatList
                data={getAppointmentsByDate}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                keyExtractor={(_, index) => index.toString()}
                // ListHeaderComponent={<ListViewHeader />}
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
        {/* Right tab container */}
        {/* <View style={styles.rightTabContainer}>
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
              </TouchableOpacity>
              <FlatList
                data={getStaffUsers}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: ms(40) }}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => {
                  const userProfile = item?.user?.user_profiles;
                  const posUserId = item?.user?.unique_uuid;
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
          </View> */}
        {/* </View> */}

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
                  extraData={appointmentListArr}
                  data={selectedStaffEmployeeId ? getAppointmentByStaffIdList : appointmentListArr}
                  keyExtractor={(_, index) => index}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
                setCalendarDate(dayjs(date));
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
