import dayjs from 'dayjs';
import * as React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { u } from '../commonStyles';
import { CalendarCellStyle } from '../interfaces';
import { useTheme } from '../theme/ThemeContext';
import { COLORS } from '@/theme';

interface HourGuideCellProps {
  cellHeight: number;
  onPress: (d: dayjs.Dayjs) => void;
  date: dayjs.Dayjs;
  hour: number;
  index: number;
  calendarCellStyle?: CalendarCellStyle;
}

const _HourGuideCell = ({
  cellHeight,
  onPress,
  date,
  hour,
  index,
  calendarCellStyle,
}: HourGuideCellProps) => {
  const theme = useTheme();

  const getCalendarCellStyle = React.useMemo(
    () =>
      typeof calendarCellStyle === 'function'
        ? calendarCellStyle
        : () => calendarCellStyle,
    [calendarCellStyle]
  );

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(date.hour(hour).minute(0))}
    >
      <View
        style={[
          // u['border-l'],
          // u['border-b'],
          { borderColor: theme.palette.gray['200'] },
          { height: cellHeight + 12 },
          { ...getCalendarCellStyle(date.toDate(), index) },
        ]}
      >
        {[1, 2, 3, 4].map(item => (
          <View
            key={item}
            style={[
              u['border-l'],
              u['border-b'],
              u['border-r'],
              { borderColor: COLORS.textInputBackground },
              {
                height: cellHeight / 4,
                marginHorizontal: 3,
                marginTop: 3,
                borderRadius: 2,
              },
              { ...getCalendarCellStyle(date.toDate(), index) },
            ]}
          />
        ))}
      </View>
    </TouchableWithoutFeedback>
  );
};

export const HourGuideCell = React.memo(_HourGuideCell);
