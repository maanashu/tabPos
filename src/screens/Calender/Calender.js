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
  Fonts,
  notifications,
  search_light,
  watchLogo,
  roundCalender,
  iImage,
  ok,
  calendarIcon,
  todayCalendarIcon,
  calendarSettingsIcon,
} from '@/assets';
import { strings } from '@/localization';
import { COLORS, SH } from '@/theme';
import { Spacer, ScreenWrapper } from '@/components';
import { styles } from '@/screens/Calender/Calender.styles';
import { ms } from 'react-native-size-matters';
import { Calendar } from '@/components/CustomCalendar';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { CALENDAR_MODES } from '@/constants/enums';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeAppointmentStatus,
  getAppointment,
} from '@/actions/AppointmentAction';
import { getAuthData } from '@/selectors/AuthSelector';
import { getAppointmentSelector } from '@/selectors/AppointmentSelector';
import { ActivityIndicator } from 'react-native';
import { isLoadingSelector } from '@/selectors/StatusSelectors';
import { TYPES } from '@/Types/AppointmentTypes';
import { APPOINTMENT_STATUS } from '@/constants/status';
import { useIsFocused } from '@react-navigation/native';
import CustomEventCell from './Components/CustomEventCell';
import CustomHoursCell from './Components/CustomHoursCell';
import CalendarHeaderWithOptions from './Components/CalendarHeaderWithOptions';
import ScheduleDetailModal from './Components/ScheduleDetailModal';

export function Calender(props) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const getAuth = useSelector(getAuthData);
  const getCalenderData = useSelector(getAppointmentSelector);
  const getAppointmentList = getCalenderData?.getAppointment;
  const [storeItem, setStoreItem] = useState();
  const [extractedAppointment, setExtractedAppointment] = useState([]);
  const [showRequestsView, setshowRequestsView] = useState(false);
  const getAppointmentList2 = getAppointmentList?.filter(
    item => item.status === 0 || item.status === 1 || item.status === 2
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
    let extractedAppointmentEvents = [];
    if (getAppointmentList) {
      getAppointmentList2.map(booking => {
        const startDateTime = new Date(booking.start_date_time);
        const endDateTime = new Date(booking.end_date_time);

        extractedAppointmentEvents = [
          ...extractedAppointmentEvents,
          {
            title:
              getAppointmentList[0].appointment_details[0].product_name ??
              'NULL',
            start: startDateTime,
            end: endDateTime,
            completeData: getAppointmentList[0] ?? {},
          },
        ];
      });
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

  const renderEmptyProducts = () => {
    <View>
      <Text>empty</Text>
    </View>;
  };

  const notificationItem = ({ item }) => (
    <View style={styles.notificationchildCon}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.requestFor} numberOfLines={1}>
          {strings.calender.requestFor}{' '}
          <Text style={styles.requestTextName}>
            {item.appointment_details?.[0]?.product_name}{' '}
            {item.appointment_details?.length >= 2 ? 'and more' : null}
          </Text>
        </Text>
        <TouchableOpacity
          style={styles.iImageCon}
          onPress={() => (setSchduleDetail(true), setStoreItem(item))}
        >
          <Image source={iImage} style={styles.iImage} />
        </TouchableOpacity>
      </View>
      <Spacer space={SH(3)} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={watchLogo} style={styles.watch} />
        <Text style={styles.timeLabel}>
          {strings.calender.timeLabel}{' '}
          <Text style={{ fontFamily: Fonts.SemiBold }}>
            {item.start_time}
            {'-'}
            {item.end_time}
          </Text>
        </Text>
      </View>
      <Spacer space={SH(3)} />
      <View style={{ flexDirection: 'row' }}>
        <Image source={roundCalender} style={styles.roundCalender} />
        <Text style={styles.timeLabel}>
          {strings.calender.dateLabel}{' '}
          <Text style={{ fontFamily: Fonts.SemiBold }}>
            {moment(item.date).format('dddd')}, {moment(item.date).format('ll')}
          </Text>
        </Text>
      </View>
      <Spacer space={SH(15)} />
      <View style={{ flexDirection: 'row' }}>
        {item?.status === 1 ? (
          <View style={styles.approveButtonCon}>
            <View style={styles.flexAlign}>
              <Text style={styles.approveText}>
                {strings.calender.approved}
              </Text>
              <Image source={ok} style={styles.lockLight} />
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => {
              const appointmentID =
                item.appointment_details[0]?.appointment_id ?? '';

              dispatch(
                changeAppointmentStatus(
                  appointmentID,
                  APPOINTMENT_STATUS.ACCEPTED_BY_SELLER
                )
              );
            }}
            style={styles.approveButtonCon}
          >
            <Text style={styles.approveText}>{strings.calender.approve}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            const appointmentID =
              item.appointment_details[0]?.appointment_id ?? '';

            dispatch(
              changeAppointmentStatus(
                appointmentID,
                APPOINTMENT_STATUS.REJECTED_BY_SELLER
              )
            );
          }}
          style={styles.noButtonCon}
        >
          {isRequestLoading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.approveText}>{strings.calender.cancel}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

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
          <Image
            source={notifications}
            style={[styles.truckStyle, { right: 25 }]}
          />
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

            <View
              style={{
                flex: 1,
                marginLeft: ms(10),
                borderRightWidth: ms(10),
                borderRightColor: COLORS.textInputBackground,
              }}
            >
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
                renderEvent={CustomEventCell}
              />
            </View>
          </View>
          <View style={styles.rightTabContainer}>
            <TouchableOpacity
              onPress={() => {
                setshowRequestsView(!showRequestsView);
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
                    {getAppointmentList2?.length ?? 0}
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
                  <Text style={styles.asigneesBadgeText}>0</Text>
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

              <TouchableOpacity style={styles.CalendarSettingsContainer}>
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
            ) : getAppointmentList2?.length === 0 ? (
              <View>
                <Text style={styles.requestNotFound}>Request not found</Text>
              </View>
            ) : (
              <FlatList
                data={getAppointmentList2}
                extraData={getAppointmentList2}
                renderItem={notificationItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={renderEmptyProducts}
              />
            )}
          </View>
        )}

        {schduleDetailModal()}
      </View>
    </ScreenWrapper>
  );
}
