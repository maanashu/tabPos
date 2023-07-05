import * as React from 'react';
import { Text, TextStyle, View } from 'react-native';

import { u } from '../commonStyles';
import { useTheme } from '../theme/ThemeContext';
import { formatHour } from '../utils/datetime';
import { objHasContent } from '../utils/object';

interface HourGuideColumnProps {
  cellHeight: number;
  hour: number;
  ampm: boolean;
  hourStyle: TextStyle;
  hourComponent?: (formattedHour: string) => React.ReactNode;
}

const _HourGuideColumn = ({
  cellHeight,
  hour,
  ampm,
  hourStyle = {},
  hourComponent,
}: HourGuideColumnProps) => {
  const theme = useTheme();
  const textStyle = React.useMemo(
    () => ({
      color: theme.palette.gray[500],
      fontSize: theme.typography.xs.fontSize,
    }),
    [theme]
  );

  const formattedHour = formatHour(hour, ampm);

  const renderDefaultComponent = () => (
    <View style={{ height: cellHeight }}>
      <Text
        style={[
          objHasContent(hourStyle) ? hourStyle : textStyle,
          u['text-center'],
        ]}
      >
        {formattedHour}
      </Text>
    </View>
  );

  return (
    <>
      {hourComponent ? (
        <View style={{ height: cellHeight }}>
          {hourComponent(formattedHour)}
        </View>
      ) : (
        renderDefaultComponent()
      )}
    </>
  );
};
export const HourGuideColumn = React.memo(_HourGuideColumn, () => true);
