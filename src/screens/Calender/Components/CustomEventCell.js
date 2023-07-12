import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { getStartEndFormattedDate } from '@/utils/GlobalMethods';
import { styles } from '../Calender.styles';

const CustomEventCell = (event, touchableOpacityProps) => {
  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={[...touchableOpacityProps.style, styles.eventContainer]}
    >
      <Text style={styles.eventTitle}>{event.title}</Text>
      <Text style={styles.startEndDate}>
        {getStartEndFormattedDate(event.start)}
      </Text>
      <Text style={styles.startEndDate}>
        {getStartEndFormattedDate(event.end)}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomEventCell;
