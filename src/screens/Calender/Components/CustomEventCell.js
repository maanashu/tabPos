import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getStartEndFormattedDate } from '@/utils/GlobalMethods';
import { styles } from '../Calender.styles';

const CustomEventCell = (event, touchableOpacityProps) => {
  const posUserDetils = event?.completeData?.pos_user_details;
  const staffDetails = posUserDetils?.user?.user_profiles;
  const colorCode = posUserDetils?.color_code;
  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={[...touchableOpacityProps.style, styles.eventContainer]}
    >
      <View style={{}}>
        {staffDetails?.profile_photo && (
          <View style={[styles.profilePicContainer, { borderColor: colorCode }]}>
            <Image source={{ uri: staffDetails?.profile_photo }} style={styles.eventProfilePic} />
          </View>
        )}
      </View>
      <Text style={styles.startEndDate}>{getStartEndFormattedDate(event.start)}</Text>
      <Text style={styles.eventTitle}>{event.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomEventCell;
