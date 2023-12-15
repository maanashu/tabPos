import dayjs from 'dayjs';
import * as React from 'react';
import { Text, View, ViewStyle } from 'react-native';

import { u } from '../commonStyles';
import { WeekNum } from '../interfaces';
import { useTheme } from '../theme/ThemeContext';
import { getDatesInWeek } from '../utils/datetime';
import { typedMemo } from '../utils/react';
import { Fonts } from '@/assets';
import { ms } from 'react-native-size-matters';

export interface CalendarHeaderForMonthViewProps {
  weekStartsOn: WeekNum;
  locale: string;
  style: ViewStyle;
}

function _CalendarHeaderForMonthView({
  locale,
  weekStartsOn,
  style,
}: CalendarHeaderForMonthViewProps) {
  const dates = getDatesInWeek(new Date(), weekStartsOn, locale);
  const todayWeekNum = dayjs().day();

  const theme = useTheme();

  return (
    <View style={[theme.isRTL ? u['flex-row-reverse'] : u['flex-row'], style]}>
      {dates.map((date) => (
        <View
          style={{
            flex: 1,
            paddingTop: 2,
            borderRadius: 14,
            backgroundColor: todayWeekNum === date.day() ? '#F5F6FC' : 'transparent',
          }}
          key={date.toISOString()}
        >
          <View style={{ height: ms(30), alignItems: 'center', paddingTop: ms(6) }}>
            <Text
              style={[
                theme.typography.sm,
                u['text-center'],
                {
                  fontFamily: Fonts.SemiBold,
                  color: '#263682',
                },
              ]}
            >
              {date.format('dddd')}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export const CalendarHeaderForMonthView = typedMemo(_CalendarHeaderForMonthView);
