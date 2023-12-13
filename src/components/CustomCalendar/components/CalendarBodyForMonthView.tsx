import calendarize from 'calendarize';
import dayjs from 'dayjs';
import * as React from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { u } from '../commonStyles';
import { useNow } from '../hooks/useNow';
import { usePanResponder } from '../hooks/usePanResponder';
import {
  CalendarCellStyle,
  CalendarCellTextStyle,
  EventCellStyle,
  EventRenderer,
  HorizontalDirection,
  ICalendarEventBase,
  WeekNum,
} from '../interfaces';
import { useTheme } from '../theme/ThemeContext';
import { getWeeksWithAdjacentMonths } from '../utils/datetime';
import { typedMemo } from '../utils/react';
import { CalendarEventForMonthView } from './CalendarEventForMonthView';
import { ms } from 'react-native-size-matters';

interface CalendarBodyForMonthViewProps<T extends ICalendarEventBase> {
  containerHeight: number;
  targetDate: dayjs.Dayjs;
  events: T[];
  style: ViewStyle;
  eventCellStyle?: EventCellStyle<T>;
  calendarCellStyle?: CalendarCellStyle;
  calendarCellTextStyle?: CalendarCellTextStyle;
  hideNowIndicator?: boolean;
  showAdjacentMonths: boolean;
  onPressCell?: (date: Date) => void;
  onPressDateHeader?: (date: Date) => void;
  onPressEvent?: (event: T) => void;
  onSwipeHorizontal?: (d: HorizontalDirection) => void;
  renderEvent?: EventRenderer<T>;
  maxVisibleEventCount: number;
  weekStartsOn: WeekNum;
  eventMinHeightForMonthView: number;
  moreLabel: string;
  sortedMonthView: boolean;
}

function _CalendarBodyForMonthView<T extends ICalendarEventBase>({
  containerHeight,
  targetDate,
  style,
  onPressCell,
  onPressDateHeader,
  events,
  onPressEvent,
  eventCellStyle,
  calendarCellStyle,
  calendarCellTextStyle,
  onSwipeHorizontal,
  hideNowIndicator,
  showAdjacentMonths,
  renderEvent,
  maxVisibleEventCount,
  weekStartsOn,
  eventMinHeightForMonthView,
  moreLabel,
  sortedMonthView,
}: CalendarBodyForMonthViewProps<T>) {
  const { now } = useNow(!hideNowIndicator);
  const [calendarWidth, setCalendarWidth] = React.useState<number>(0);

  const panResponder = usePanResponder({
    onSwipeHorizontal,
  });

  const weeks = showAdjacentMonths
    ? getWeeksWithAdjacentMonths(targetDate, weekStartsOn)
    : calendarize(targetDate.toDate(), weekStartsOn);

  const minCellHeight = containerHeight / 5 - 30;
  const theme = useTheme();

  const getCalendarCellStyle = React.useMemo(
    () => (typeof calendarCellStyle === 'function' ? calendarCellStyle : () => calendarCellStyle),
    [calendarCellStyle]
  );

  const getCalendarCellTextStyle = React.useMemo(
    () =>
      typeof calendarCellTextStyle === 'function'
        ? calendarCellTextStyle
        : () => calendarCellTextStyle,
    [calendarCellTextStyle]
  );

  const sortedEvents = React.useCallback(
    (day: dayjs.Dayjs) => {
      return sortedMonthView
        ? events
            .filter(({ start, end }) =>
              day.isBetween(dayjs(start).startOf('day'), dayjs(end).endOf('day'), null, '[)')
            )
            .sort((a, b) => {
              if (dayjs(a.start).isSame(b.start, 'day')) {
                const aDuration = dayjs.duration(dayjs(a.end).diff(dayjs(a.start))).days();
                const bDuration = dayjs.duration(dayjs(b.end).diff(dayjs(b.start))).days();
                return bDuration - aDuration;
              }
              return a.start.getTime() - b.start.getTime();
            })
        : events.filter(({ start, end }) =>
            day.isBetween(dayjs(start).startOf('day'), dayjs(end).endOf('day'), null, '[)')
          );
    },
    [events, sortedMonthView]
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        {
          height: containerHeight,
          marginTop: 16,
        },
        u['flex-column'],
        u['flex-1'],
        // u['border-b'],
        // u['border-l'],
        // u['border-r'],
        u['rounded'],
        { borderColor: theme.palette.gray['200'] },
        style,
      ]}
      onLayout={({ nativeEvent: { layout } }) => setCalendarWidth(layout.width)}
      {...panResponder.panHandlers}
    >
      {weeks.map((week, i) => (
        <View
          key={i}
          style={[
            u['flex-1'],
            theme.isRTL ? u['flex-row-reverse'] : u['flex-row'],
            Platform.OS === 'android' && style, // TODO: in Android, backgroundColor is not applied to child components
            {
              minHeight: minCellHeight,
            },
          ]}
        >
          {week
            .map((d) =>
              showAdjacentMonths ? targetDate.date(d) : d > 0 ? targetDate.date(d) : null
            )
            .map((date, ii) => (
              <TouchableOpacity
                onPress={() => date && onPressCell && onPressCell(date.toDate())}
                style={[
                  u['border-t'],
                  theme.isRTL && ii > 0 && u['border-r'],
                  !theme.isRTL && ii > 0 && u['border-l'],
                  // { borderColor: theme.palette.gray['200'] },
                  u['p-2'],
                  u['flex-1'],
                  u['flex-column'],
                  {
                    minHeight: minCellHeight,
                    // borderRadius: ms(4),
                    borderColor: '#E4E6F2',
                    borderWidth: 1,
                    borderRadius: 10,
                  },
                  {
                    ...getCalendarCellStyle(date?.toDate(), i),
                  },
                ]}
                key={ii}
              >
                <View style={{ flex: 1 }}>
                  {[1, 2, 3, 4, 5].map((item) => (
                    <View
                      key={item}
                      style={[
                        {
                          borderStyle: 'dotted',
                          borderWidth: 1,
                          flex: 1,
                          borderColor: theme.palette.gray['300'],
                        },
                      ]}
                    />
                  ))}
                </View>

                <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                  {date &&
                    sortedEvents(date).reduce((elements, event, index, events) => {
                      if (index > maxVisibleEventCount) {
                        return elements; // Don't render more events than the limit
                      }
                      if (index === maxVisibleEventCount) {
                        return [
                          ...elements,
                          <Text
                            key={index}
                            style={[
                              theme.typography.moreLabel,
                              { marginTop: 2, color: theme.palette.moreLabel },
                            ]}
                          >
                            {moreLabel.replace(
                              '{moreCount}',
                              `${events.length - maxVisibleEventCount}`
                            )}
                          </Text>,
                        ];
                      }

                      return [
                        // ...elements,
                        <CalendarEventForMonthView
                          allEvents={events}
                          key={index}
                          event={event}
                          eventCellStyle={eventCellStyle}
                          onPressEvent={onPressEvent}
                          renderEvent={renderEvent}
                          date={date}
                          dayOfTheWeek={ii}
                          calendarWidth={calendarWidth}
                          isRTL={theme.isRTL}
                          eventMinHeightForMonthView={50}
                          showAdjacentMonths={showAdjacentMonths}
                        />,
                      ];
                    }, [] as JSX.Element[])}
                </View>

                <TouchableOpacity
                  onPress={() =>
                    date &&
                    (onPressDateHeader
                      ? onPressDateHeader(date.toDate())
                      : onPressCell && onPressCell(date.toDate()))
                  }
                  style={{
                    // backgroundColor: '#FFFFFF',
                    borderColor: '#D7DEFF',
                    borderWidth: 1,
                    alignSelf: 'flex-end',
                    padding: 4,
                    borderRadius: 4,
                    position: 'absolute',
                    right: 12,
                    top: 12,
                  }}
                >
                  <Text
                    style={[
                      { textAlign: 'center' },
                      theme.typography.sm,
                      {
                        // color:
                        //   date?.format('YYYY-MM-DD') === now.format('YYYY-MM-DD')
                        //     ? theme.palette.primary.main
                        //     : date?.month() !== targetDate.month()
                        //     ? theme.palette.gray['500']
                        //     : theme.palette.gray['800'],

                        color: '#263682',
                      },
                      {
                        ...getCalendarCellTextStyle(date?.toDate(), i),
                      },
                    ]}
                  >
                    {date &&
                      (date.format('D')?.length > 1 ? date.format('D') : '0' + date.format('D'))}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
        </View>
      ))}
    </ScrollView>
  );
}

export const CalendarBodyForMonthView = typedMemo(_CalendarBodyForMonthView);
