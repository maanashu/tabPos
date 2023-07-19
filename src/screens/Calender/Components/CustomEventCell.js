import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { getStartEndFormattedDate } from '@/utils/GlobalMethods';
import { styles } from '../Calender.styles';

const CustomEventCell = (event, touchableOpacityProps) => {
  const profilePic = event?.completeData?.user_details?.profile_photo;
  return (
    <TouchableOpacity
      {...touchableOpacityProps}
      style={[...touchableOpacityProps.style, styles.eventContainer]}
    >
      <View style={{}}>
        {profilePic && (
          <View style={styles.profilePicContainer}>
            <Image
              source={{ uri: profilePic }}
              style={styles.eventProfilePic}
            />
          </View>
        )}
      </View>
      <Text style={styles.startEndDate}>
        {getStartEndFormattedDate(event.start)}
      </Text>
      <Text style={styles.eventTitle}>{event.title}</Text>
    </TouchableOpacity>
  );
};

export default CustomEventCell;
